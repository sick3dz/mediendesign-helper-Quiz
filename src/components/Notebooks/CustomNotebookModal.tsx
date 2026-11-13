import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  FilePlus2,
  FileText,
  ImagePlus,
  Loader2,
  NotebookPen,
  Trash2,
  X,
  AlertCircle,
  Crop as CropIcon,
  Minus,
  Plus,
} from 'lucide-react';
import { BlankPageTemplate, BlankPaperColor, NotebookDocument } from '../../types/notebook';
import { ImageCropModal } from './ImageCropModal';
import {
  BLANK_PAGE_TEMPLATES,
  BLANK_PAPER_COLORS,
  CUSTOM_COVER_COLORS,
  CUSTOM_NOTEBOOK_CATEGORIES,
  getBlankPaperPalette,
} from '../../data/notebooksData';
import {
  appendPagesToCustomNotebook,
  createCustomNotebook,
  renderBlankTemplateToDataUrl,
  StagedCustomItem,
  updateCustomNotebookMeta,
} from '../../services/customNotebookDbService';
import { inspectPdfBlob } from '../../services/pdfRenderService';

const SERRATED_TEETH = 18;
const SERRATED_CLIP_PATH = (() => {
  const pts: string[] = ['0% 0%', '100% 0%', '100% 89%'];
  for (let i = SERRATED_TEETH - 1; i >= 0; i--) {
    const peakX = (((i + 0.5) / SERRATED_TEETH) * 100).toFixed(2);
    const valleyX = ((i / SERRATED_TEETH) * 100).toFixed(2);
    pts.push(`${peakX}% 100%`, `${valleyX}% 89%`);
  }
  return `polygon(${pts.join(', ')})`;
})();

const SERRATED_BORDER_SVG_PATH = (() => {
  const width = 180;
  const valleyY = 57;
  const peakY = 63.5;
  const segs: string[] = [`M 0.5 0.5 H ${width - 0.5} V ${valleyY}`];
  const step = width / SERRATED_TEETH;
  for (let i = SERRATED_TEETH - 1; i >= 0; i--) {
    const peakX = (i + 0.5) * step;
    const valleyX = i === 0 ? 0.5 : i * step;
    segs.push(`L ${peakX.toFixed(2)} ${peakY}`, `L ${valleyX.toFixed(2)} ${valleyY}`);
  }
  segs.push('Z');
  return segs.join(' ');
})();

export type CustomNotebookModalMode = 'create' | 'append' | 'edit-meta';

interface Props {
  mode: CustomNotebookModalMode;
  targetNotebook?: NotebookDocument;
  defaultJumpToNewPage?: boolean;
  onClose: () => void;
  onCompleted: (result: {
    notebook: NotebookDocument;
    jumpToPage?: number;
  }) => void;
}

export const CustomNotebookModal: React.FC<Props> = ({
  mode,
  targetNotebook,
  defaultJumpToNewPage = false,
  onClose,
  onCompleted,
}) => {
  const [title, setTitle] = useState<string>(
    mode === 'edit-meta' && targetNotebook ? targetNotebook.title : ''
  );
  const [subtitle, setSubtitle] = useState<string>(
    mode === 'edit-meta' && targetNotebook ? targetNotebook.subtitle : ''
  );
  const [categorySelect, setCategorySelect] = useState<string>(() => {
    if (mode === 'edit-meta' && targetNotebook) {
      return CUSTOM_NOTEBOOK_CATEGORIES.includes(targetNotebook.category)
        ? targetNotebook.category
        : '__custom__';
    }
    return CUSTOM_NOTEBOOK_CATEGORIES[0];
  });
  const [customCategory, setCustomCategory] = useState<string>(() => {
    if (
      mode === 'edit-meta' &&
      targetNotebook &&
      !CUSTOM_NOTEBOOK_CATEGORIES.includes(targetNotebook.category)
    ) {
      return targetNotebook.category;
    }
    return '';
  });
  const [coverColor, setCoverColor] = useState<string>(
    mode === 'edit-meta' && targetNotebook
      ? targetNotebook.coverColor
      : CUSTOM_COVER_COLORS[0].gradient
  );

  // Page Builder State
  const lastBlankPageInTarget =
    mode === 'append' && targetNotebook?.customPages
      ? [...targetNotebook.customPages].reverse().find((pg) => pg.kind === 'blank')
      : undefined;
  const [stagedItems, setStagedItems] = useState<StagedCustomItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<BlankPageTemplate>(
    lastBlankPageInTarget?.kind === 'blank' ? lastBlankPageInTarget.template : 'lined'
  );
  const [selectedPaperColor, setSelectedPaperColor] = useState<BlankPaperColor>(
    lastBlankPageInTarget?.kind === 'blank'
      ? lastBlankPageInTarget.paperColor ?? 'white'
      : 'white'
  );
  const [showDateHeader, setShowDateHeader] = useState<boolean>(
    lastBlankPageInTarget?.kind === 'blank'
      ? Boolean(lastBlankPageInTarget.showDateHeader)
      : false
  );
  const [blankCountInput, setBlankCountInput] = useState<string>('1');
  const [jumpToNewPage, setJumpToNewPage] = useState<boolean>(defaultJumpToNewPage);
  const [activeCropItem, setActiveCropItem] = useState<StagedCustomItem | null>(null);

  const [isInspectingFiles, setIsInspectingFiles] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [invalidField, setInvalidField] = useState<'title' | 'customCategory' | 'pages' | null>(null);
  const [validationSeq, setValidationSeq] = useState<number>(0);

  const formScrollRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const customCategoryInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (validationSeq === 0) return;
    const scrollEl = formScrollRef.current;
    if (scrollEl) {
      scrollEl.scrollTop = 0;
    }
    const targetInput =
      invalidField === 'title'
        ? titleInputRef.current
        : invalidField === 'customCategory'
        ? customCategoryInputRef.current
        : null;

    const rafId = window.requestAnimationFrame(() => {
      if (formScrollRef.current) {
        formScrollRef.current.scrollTop = 0;
      }
      if (targetInput) {
        targetInput.focus({ preventScroll: true });
        targetInput.scrollIntoView({ block: 'nearest' });
      }
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [validationSeq, invalidField]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !activeCropItem && !isSaving) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCropItem, isSaving, onClose]);

  useEffect(() => {
    return () => {
      for (const url of previewUrlsRef.current) {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      }
      previewUrlsRef.current = [];
    };
  }, []);

  const totalStagedPages = stagedItems.reduce((sum, item) => {
    if (item.kind === 'pdf') return sum + item.pageCount;
    if (item.kind === 'blank') return sum + item.count;
    return sum + 1;
  }, 0);

  const handleSelectPdfs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0) return;

    setErrorMsg(null);
    setIsInspectingFiles(true);
    try {
      const additions: StagedCustomItem[] = [];
      for (const file of files) {
        try {
          const pageCount = await inspectPdfBlob(file);
          additions.push({
            tempId: `stg-pdf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            kind: 'pdf',
            file,
            fileName: file.name,
            pageCount: Math.max(1, pageCount),
          });
        } catch {
          setErrorMsg(
            `Die PDF-Datei „${file.name}“ konnte nicht gelesen werden (bitte prüfen, ob sie unbeschädigt und ohne Passwortschutz ist).`
          );
        }
      }
      if (additions.length > 0) {
        setStagedItems((prev) => [...prev, ...additions]);
        if (mode === 'create' && !title.trim()) {
          const firstName = additions[0].kind === 'pdf' ? additions[0].fileName : '';
          if (firstName) {
            setTitle(firstName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim());
          }
        }
      }
    } finally {
      setIsInspectingFiles(false);
    }
  };

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length === 0) return;

    setErrorMsg(null);
    const additions: StagedCustomItem[] = files.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.push(previewUrl);
      return {
        tempId: `stg-img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        kind: 'image',
        file,
        fileName: file.name,
        previewUrl,
      };
    });

    setStagedItems((prev) => [...prev, ...additions]);
    if (additions.length === 1) {
      setActiveCropItem(additions[0]);
    }
  };

  const parsedBlankCount = parseInt(blankCountInput, 10);
  const resolvedBlankCount = Number.isFinite(parsedBlankCount)
    ? Math.max(1, Math.min(50, parsedBlankCount))
    : 1;

  const stepBlankCount = (delta: -1 | 1) => {
    const next = Math.max(1, Math.min(50, resolvedBlankCount + delta));
    setBlankCountInput(String(next));
  };

  const handleAddBlankPages = (count: number) => {
    const safeCount = Math.max(1, Math.min(50, count));
    setErrorMsg(null);
    setStagedItems((prev) => {
      const last = prev[prev.length - 1];
      if (
        last &&
        last.kind === 'blank' &&
        last.template === selectedTemplate &&
        (last.paperColor ?? 'white') === selectedPaperColor &&
        Boolean(last.showDateHeader) === showDateHeader
      ) {
        return prev.map((item, idx) =>
          idx === prev.length - 1 && item.kind === 'blank'
            ? { ...item, count: Math.min(50, item.count + safeCount) }
            : item
        );
      }
      return [
        ...prev,
        {
          tempId: `stg-blank-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          kind: 'blank',
          template: selectedTemplate,
          paperColor: selectedPaperColor,
          showDateHeader,
          count: safeCount,
        },
      ];
    });
  };

  const handleMoveItem = (index: number, delta: -1 | 1) => {
    setStagedItems((prev) => {
      const nextIdx = index + delta;
      if (nextIdx < 0 || nextIdx >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(index, 1);
      copy.splice(nextIdx, 0, moved);
      return copy;
    });
  };

  const handleRemoveItem = (tempId: string) => {
    setStagedItems((prev) => {
      const target = prev.find((i) => i.tempId === tempId);
      if (target && target.kind === 'image') {
        try {
          URL.revokeObjectURL(target.previewUrl);
        } catch {
          // ignore
        }
      }
      return prev.filter((i) => i.tempId !== tempId);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInvalidField(null);

    const resolvedCategory =
      categorySelect === '__custom__' ? customCategory.trim() : categorySelect;

    if (mode === 'create') {
      if (!title.trim()) {
        setInvalidField('title');
        setErrorMsg('Bitte gib einen Titel für dein neues Heft ein.');
        setValidationSeq((s) => s + 1);
        return;
      }
      if (!resolvedCategory) {
        setInvalidField('customCategory');
        setErrorMsg('Bitte wähle oder benenne eine Kategorie.');
        setValidationSeq((s) => s + 1);
        return;
      }
      if (stagedItems.length === 0 || totalStagedPages === 0) {
        setInvalidField('pages');
        setErrorMsg(
          'Füge mindestens ein PDF, ein Foto oder eine leere Notizseite hinzu.'
        );
        setValidationSeq((s) => s + 1);
        return;
      }

      setIsSaving(true);
      try {
        const created = await createCustomNotebook({
          title,
          subtitle,
          category: resolvedCategory,
          coverColor,
          stagedItems,
        });
        onCompleted({ notebook: created, jumpToPage: 1 });
      } catch (err) {
        setErrorMsg(
          err instanceof Error
            ? err.message
            : 'Heft konnte nicht gespeichert werden.'
        );
        setValidationSeq((s) => s + 1);
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (mode === 'edit-meta' && targetNotebook) {
      if (!title.trim()) {
        setInvalidField('title');
        setErrorMsg('Der Titel darf nicht leer sein.');
        setValidationSeq((s) => s + 1);
        return;
      }
      if (!resolvedCategory) {
        setInvalidField('customCategory');
        setErrorMsg('Bitte wähle oder benenne eine Kategorie.');
        setValidationSeq((s) => s + 1);
        return;
      }
      setIsSaving(true);
      try {
        const updated = await updateCustomNotebookMeta(targetNotebook.id, {
          title,
          subtitle,
          category: resolvedCategory,
          coverColor,
        });
        if (updated) {
          onCompleted({ notebook: updated });
        }
      } catch {
        setErrorMsg('Änderungen konnten nicht gespeichert werden.');
        setValidationSeq((s) => s + 1);
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (mode === 'append' && targetNotebook) {
      if (stagedItems.length === 0 || totalStagedPages === 0) {
        setInvalidField('pages');
        setErrorMsg(
          'Bitte füge mindestens ein PDF, ein Foto oder eine Notizseite hinzu.'
        );
        setValidationSeq((s) => s + 1);
        return;
      }
      setIsSaving(true);
      try {
        const res = await appendPagesToCustomNotebook(targetNotebook.id, stagedItems);
        if (res) {
          onCompleted({
            notebook: res.notebook,
            jumpToPage: jumpToNewPage ? res.firstNewPageNumber : undefined,
          });
        }
      } catch {
        setErrorMsg('Weitere Seiten konnten nicht angefügt werden.');
        setValidationSeq((s) => s + 1);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const modalTitle =
    mode === 'create'
      ? 'Eigenes Heft anlegen'
      : mode === 'append'
      ? `Seiten anfügen · ${targetNotebook?.title ?? ''}`
      : 'Heft-Details bearbeiten';

  return (
    <div
      className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={modalTitle}
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
              {modalTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {mode === 'append'
                ? `Aktuell ${targetNotebook?.totalPages ?? 0} Seiten · Neue PDFs, Fotos oder Notizblätter werden hinten angefügt.`
                : mode === 'edit-meta'
                ? 'Titel, Kategorie, Beschreibung und Buchrücken-Farbe anpassen.'
                : 'PDFs, Fotos und leere Notizseiten beliebig mischen – Speicherung lokal im Browser.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Always-visible Error Banner above scroll container */}
        {errorMsg && (
          <div
            role="alert"
            className="mx-5 mt-3 mb-1 flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold shrink-0"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form
          ref={formScrollRef}
          onSubmit={handleSubmit}
          className="flex-1 min-h-0 overflow-y-auto p-5 space-y-5"
        >
          {(mode === 'create' || mode === 'edit-meta') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Titel des Hefts *
                </label>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (invalidField === 'title') {
                      setInvalidField(null);
                      setErrorMsg(null);
                    }
                  }}
                  placeholder="z. B. Druckvorstufe Mitschrift oder IHK Prüfung 2025"
                  aria-invalid={invalidField === 'title'}
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 transition-colors ${
                    invalidField === 'title'
                      ? 'border-rose-500 ring-2 ring-rose-500/30 focus:ring-rose-500'
                      : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500'
                  }`}
                />
                {invalidField === 'title' && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    Pflichtfeld – bitte einen Hefttitel eingeben.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Kategorie *
                  </label>
                  <select
                    value={categorySelect}
                    onChange={(e) => {
                      setCategorySelect(e.target.value);
                      if (invalidField === 'customCategory') {
                        setInvalidField(null);
                        setErrorMsg(null);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 min-h-[42px]"
                  >
                    {CUSTOM_NOTEBOOK_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__custom__">+ Eigene Kategorie eingeben...</option>
                  </select>
                </div>

                {categorySelect === '__custom__' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                      Name der Kategorie *
                    </label>
                    <input
                      ref={customCategoryInputRef}
                      type="text"
                      value={customCategory}
                      onChange={(e) => {
                        setCustomCategory(e.target.value);
                        if (invalidField === 'customCategory') {
                          setInvalidField(null);
                          setErrorMsg(null);
                        }
                      }}
                      placeholder="z. B. Typografie"
                      aria-invalid={invalidField === 'customCategory'}
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 transition-colors ${
                        invalidField === 'customCategory'
                          ? 'border-rose-500 ring-2 ring-rose-500/30 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                      Kurzbeschreibung (optional)
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="z. B. Dozenten-PDF + Tafelbilder"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>

              {categorySelect === '__custom__' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Kurzbeschreibung (optional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="z. B. Dozenten-PDF + Tafelbilder"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Cover-Akzentfarbe
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {CUSTOM_COVER_COLORS.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setCoverColor(col.gradient)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all min-h-[38px] ${
                        coverColor === col.gradient
                          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 text-slate-900 dark:text-white ring-2 ring-indigo-500/30'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${col.swatch}`} />
                      <span>{col.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Page Builder for Create & Append */}
          {(mode === 'create' || mode === 'append') && (
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {mode === 'append' ? 'Neue Seiten hinzufügen' : 'Seiten zusammenstellen *'}
                </span>
                {totalStagedPages > 0 && (
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {totalStagedPages} {totalStagedPages === 1 ? 'Seite' : 'Seiten'} vorgemerkt
                  </span>
                )}
              </div>

              {/* Hidden Native File Inputs */}
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf,.pdf"
                multiple
                onChange={handleSelectPdfs}
                className="hidden"
              />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleSelectImages}
                className="hidden"
              />

              {/* Upload PDF + Upload Photos Triggers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  disabled={isInspectingFiles || isSaving}
                  className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/70 dark:bg-slate-800/40 text-left transition-colors cursor-pointer min-h-[60px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
                    {isInspectingFiles ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <FilePlus2 className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      PDF-Datei(en) laden
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Alle PDF-Seiten automatisch einbinden
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isSaving}
                  className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/70 dark:bg-slate-800/40 text-left transition-colors cursor-pointer min-h-[60px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <ImagePlus className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Fotos / Bilder laden
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Arbeitsblätter, Tafelbilder, Scans
                    </div>
                  </div>
                </button>
              </div>

              {/* Add Blank / Lined / Grid / Dotted Note Pages */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <NotebookPen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Leere Notizseiten für Stift & Skizzen hinzufügen</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3.5">
                  <div className="flex-1 min-w-0 space-y-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {BLANK_PAGE_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => setSelectedTemplate(tpl.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer min-h-[36px] ${
                            selectedTemplate === tpl.id
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                          title={tpl.description}
                        >
                          {tpl.label}
                        </button>
                      ))}
                    </div>

                    {/* Pastel Paper Color Picker */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Papierfarbe:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {BLANK_PAPER_COLORS.map((col) => {
                          const active = selectedPaperColor === col.id;
                          return (
                            <button
                              key={col.id}
                              type="button"
                              onClick={() => setSelectedPaperColor(col.id)}
                              aria-pressed={active}
                              title={`Papierfarbe: ${col.label}`}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer min-h-[32px] whitespace-nowrap ${
                                active
                                  ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/50 text-slate-900 dark:text-white ring-2 ring-indigo-500/25'
                                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border shrink-0 relative flex items-center justify-center"
                                style={{
                                  backgroundColor: col.bgHex,
                                  borderColor: col.swatchBorder,
                                }}
                              >
                                {col.id !== 'white' && (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: col.marginHex }}
                                  />
                                )}
                              </span>
                              <span>{col.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Thema / Datum Header Toggle */}
                    <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300 cursor-pointer pt-0.5">
                      <input
                        type="checkbox"
                        checked={showDateHeader}
                        onChange={(e) => setShowDateHeader(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Kopfzeile („Thema / Datum“) einblenden</span>
                    </label>
                  </div>

                  {/* Live 1/4 Page Preview with Serrated Bottom Edge */}
                  {(() => {
                    const previewSurface = renderBlankTemplateToDataUrl(
                      selectedTemplate,
                      0,
                      560,
                      selectedPaperColor,
                      showDateHeader
                    );
                    const previewPalette = getBlankPaperPalette(selectedPaperColor);
                    return (
                      <div className="shrink-0 flex flex-col items-start sm:items-end gap-1 pt-0.5">
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                          Vorschau (¼ Seite)
                        </span>
                        <div
                          className="drop-shadow-[0_2px_4px_rgba(15,23,42,0.08)]"
                          aria-label={`Papier-Vorschau: ${
                            BLANK_PAGE_TEMPLATES.find((t) => t.id === selectedTemplate)?.label ??
                            'Notizseite'
                          }, ${previewPalette.label}`}
                        >
                          <div
                            className="relative w-[180px] h-[64px] overflow-hidden select-none"
                            style={{
                              clipPath: SERRATED_CLIP_PATH,
                              backgroundColor: previewPalette.bgHex,
                            }}
                          >
                            <img
                              src={previewSurface.dataUrl}
                              alt="Vorschau Notizseite"
                              draggable={false}
                              className="w-full h-full object-cover object-top pointer-events-none"
                            />
                            <svg
                              viewBox="0 0 180 64"
                              preserveAspectRatio="none"
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full pointer-events-none"
                            >
                              <path
                                d={SERRATED_BORDER_SVG_PATH}
                                fill="none"
                                stroke={previewPalette.swatchBorder}
                                strokeWidth={1.1}
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Seitenzahl:
                  </span>

                  <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => stepBlankCount(-1)}
                      disabled={resolvedBlankCount <= 1}
                      aria-label="Seitenzahl verringern"
                      title="Weniger Seiten"
                      className="w-9 h-9 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={blankCountInput}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                        if (!digitsOnly) {
                          setBlankCountInput('');
                          return;
                        }
                        const num = parseInt(digitsOnly, 10);
                        setBlankCountInput(String(Math.min(50, num)));
                      }}
                      onBlur={() => {
                        setBlankCountInput(String(resolvedBlankCount));
                      }}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setBlankCountInput(String(resolvedBlankCount));
                          handleAddBlankPages(resolvedBlankCount);
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          stepBlankCount(1);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          stepBlankCount(-1);
                        }
                      }}
                      aria-label="Anzahl der leeren Notizseiten"
                      className="w-14 h-9 text-center text-xs font-bold tabular-nums text-slate-900 dark:text-white bg-transparent border-x border-slate-200 dark:border-slate-700 focus:outline-hidden focus:bg-indigo-50/60 dark:focus:bg-indigo-950/40"
                    />

                    <button
                      type="button"
                      onClick={() => stepBlankCount(1)}
                      disabled={resolvedBlankCount >= 50}
                      aria-label="Seitenzahl erhöhen"
                      title="Mehr Seiten"
                      className="w-9 h-9 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBlankCountInput(String(resolvedBlankCount));
                      handleAddBlankPages(resolvedBlankCount);
                    }}
                    title={
                      resolvedBlankCount === 1
                        ? '1 Notizseite hinzufügen'
                        : `${resolvedBlankCount} Notizseiten hinzufügen`
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors min-h-[36px] whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>Hinzufügen</span>
                  </button>
                </div>
              </div>

              {/* Staged Queue */}
              {stagedItems.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Reihenfolge der Seiten-Blöcke:
                  </div>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {stagedItems.map((item, idx) => (
                      <div
                        key={item.tempId}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.kind === 'image' ? (
                            <img
                              src={item.previewUrl}
                              alt={item.fileName}
                              className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                          ) : item.kind === 'pdf' ? (
                            <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                          ) : (
                            <div
                              className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: getBlankPaperPalette(item.paperColor).bgHex,
                                borderColor: getBlankPaperPalette(item.paperColor).swatchBorder,
                                color: getBlankPaperPalette(item.paperColor).marginHex,
                              }}
                            >
                              <NotebookPen className="w-4 h-4" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {item.kind === 'blank'
                                ? `${
                                    BLANK_PAGE_TEMPLATES.find((t) => t.id === item.template)?.label ??
                                    'Notizseite'
                                  } · ${getBlankPaperPalette(item.paperColor).label}${
                                    item.showDateHeader ? ' · Kopfzeile' : ''
                                  }`
                                : item.fileName}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                              {item.kind === 'pdf'
                                ? `PDF · ${item.pageCount} ${item.pageCount === 1 ? 'Seite' : 'Seiten'}`
                                : item.kind === 'image'
                                ? 'Foto · 1 Seite'
                                : `${item.count} ${item.count === 1 ? 'leere Seite' : 'leere Seiten'}`}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMoveItem(idx, -1)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                            title="Nach oben"
                            aria-label="Nach oben"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveItem(idx, 1)}
                            disabled={idx === stagedItems.length - 1}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                            title="Nach unten"
                            aria-label="Nach unten"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          {item.kind === 'image' && (
                            <button
                              type="button"
                              onClick={() => setActiveCropItem(item)}
                              className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer"
                              title="Foto zuschneiden"
                              aria-label="Foto zuschneiden"
                            >
                              <CropIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.tempId)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                            title="Entfernen"
                            aria-label="Entfernen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'append' && defaultJumpToNewPage && (
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={jumpToNewPage}
                    onChange={(e) => setJumpToNewPage(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Nach dem Speichern direkt zur ersten neuen Seite springen</span>
                </label>
              )}

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Hinweis: Große PDFs und Fotos werden direkt im lokalen Browser-Speicher (IndexedDB) abgelegt. Der JSON-App-Backup sichert weiterhin deine Markierungen, Klebezettel und Sticker.
              </p>
            </div>
          )}

          {/* Footer Submit Row */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer min-h-[42px]"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSaving || isInspectingFiles}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer min-h-[42px] shadow-xs"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {mode === 'create'
                  ? `Heft anlegen${totalStagedPages > 0 ? ` (${totalStagedPages} S.)` : ''}`
                  : mode === 'append'
                  ? `Seiten anfügen${totalStagedPages > 0 ? ` (+${totalStagedPages})` : ''}`
                  : 'Änderungen speichern'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {activeCropItem && activeCropItem.kind === 'image' && (
        <ImageCropModal
          isOpen={true}
          imageSrc={activeCropItem.previewUrl}
          imageName={activeCropItem.fileName}
          confirmLabel="Zuschneiden anwenden"
          skipLabel="Ohne Zuschnitt behalten"
          onClose={() => setActiveCropItem(null)}
          onSkipCrop={() => setActiveCropItem(null)}
          onCropCompleted={(croppedBlob) => {
            const targetTempId = activeCropItem.tempId;
            const targetFileName = activeCropItem.fileName;
            const previewToRevoke = activeCropItem.previewUrl;
            const newFile = new File([croppedBlob], targetFileName, {
              type: 'image/jpeg',
            });
            const newPreviewUrl = URL.createObjectURL(croppedBlob);
            previewUrlsRef.current.push(newPreviewUrl);
            setStagedItems((prev) =>
              prev.map((i) =>
                i.tempId === targetTempId
                  ? { ...i, file: newFile, previewUrl: newPreviewUrl }
                  : i
              )
            );
            setActiveCropItem(null);
            window.setTimeout(() => {
              try {
                URL.revokeObjectURL(previewToRevoke);
              } catch {}
            }, 100);
          }}
        />
      )}
    </div>
  );
};
