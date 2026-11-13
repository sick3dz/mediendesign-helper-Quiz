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
} from 'lucide-react';
import { BlankPageTemplate, NotebookDocument } from '../../types/notebook';
import {
  BLANK_PAGE_TEMPLATES,
  CUSTOM_COVER_COLORS,
  CUSTOM_NOTEBOOK_CATEGORIES,
} from '../../data/notebooksData';
import {
  appendPagesToCustomNotebook,
  createCustomNotebook,
  StagedCustomItem,
  updateCustomNotebookMeta,
} from '../../services/customNotebookDbService';
import { inspectPdfBlob } from '../../services/pdfRenderService';

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
  const [stagedItems, setStagedItems] = useState<StagedCustomItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<BlankPageTemplate>('lined');
  const [jumpToNewPage, setJumpToNewPage] = useState<boolean>(defaultJumpToNewPage);

  const [isInspectingFiles, setIsInspectingFiles] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);

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
  };

  const handleAddBlankPages = (count: number) => {
    setErrorMsg(null);
    setStagedItems((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.kind === 'blank' && last.template === selectedTemplate) {
        return prev.map((item, idx) =>
          idx === prev.length - 1 && item.kind === 'blank'
            ? { ...item, count: Math.min(50, item.count + count) }
            : item
        );
      }
      return [
        ...prev,
        {
          tempId: `stg-blank-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          kind: 'blank',
          template: selectedTemplate,
          count,
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

    const resolvedCategory =
      categorySelect === '__custom__' ? customCategory.trim() : categorySelect;

    if (mode === 'create') {
      if (!title.trim()) {
        setErrorMsg('Bitte gib einen Titel für dein neues Heft ein.');
        return;
      }
      if (!resolvedCategory) {
        setErrorMsg('Bitte wähle oder benenne eine Kategorie.');
        return;
      }
      if (stagedItems.length === 0 || totalStagedPages === 0) {
        setErrorMsg(
          'Füge mindestens ein PDF, ein Foto oder eine leere Notizseite hinzu.'
        );
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
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (mode === 'edit-meta' && targetNotebook) {
      if (!title.trim()) {
        setErrorMsg('Der Titel darf nicht leer sein.');
        return;
      }
      if (!resolvedCategory) {
        setErrorMsg('Bitte wähle oder benenne eine Kategorie.');
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
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (mode === 'append' && targetNotebook) {
      if (stagedItems.length === 0 || totalStagedPages === 0) {
        setErrorMsg(
          'Bitte füge mindestens ein PDF, ein Foto oder eine Notizseite hinzu.'
        );
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {(mode === 'create' || mode === 'edit-meta') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Titel des Hefts *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="z. B. Druckvorstufe Mitschrift oder IHK Prüfung 2025"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Kategorie *
                  </label>
                  <select
                    value={categorySelect}
                    onChange={(e) => setCategorySelect(e.target.value)}
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
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="z. B. Typografie"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
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

                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Anzahl anfügen:
                  </span>
                  {[1, 3, 5, 10].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => handleAddBlankPages(qty)}
                      className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 text-xs font-bold cursor-pointer transition-colors min-h-[36px]"
                    >
                      +{qty} {qty === 1 ? 'Seite' : 'Seiten'}
                    </button>
                  ))}
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
                            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                              <NotebookPen className="w-4 h-4" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {item.kind === 'blank'
                                ? `${
                                    BLANK_PAGE_TEMPLATES.find((t) => t.id === item.template)?.label ??
                                    'Notizseite'
                                  } (Vorlage)`
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
    </div>
  );
};
