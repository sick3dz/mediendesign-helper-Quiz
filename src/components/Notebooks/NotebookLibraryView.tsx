import React, { useMemo, useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Search,
  StickyNote,
  ChevronRight,
  Sticker,
  Plus,
  FilePlus2,
  Pencil,
  Trash2,
  Loader2,
} from 'lucide-react';
import { exportNotebookAsPdf } from '../../services/pdfExportService';
import { NOTEBOOK_STICKERS, NOTEBOOKS_CATALOG } from '../../data/notebooksData';
import {
  CustomNotebookPage,
  NotebookDocument,
  NotebookStickerType,
  NotebookStore,
} from '../../types/notebook';
import {
  getAllAnnotatedPages,
  getNotebookAnnotationSummary,
  NotebookNoteSearchHit,
  searchNotebookNotes,
} from '../../services/notebookStorageService';
import { getPdfThumbnailDataUrl } from '../../services/pdfRenderService';
import {
  getMediaObjectUrl,
  renderBlankTemplateToDataUrl,
} from '../../services/customNotebookDbService';

interface Props {
  store: NotebookStore;
  customNotebooks: NotebookDocument[];
  onSelectNotebook: (notebook: NotebookDocument, pageNumber?: number) => void;
  onCreateCustomNotebook: () => void;
  onEditCustomNotebook: (notebook: NotebookDocument) => void;
  onAppendPagesToNotebook: (notebook: NotebookDocument) => void;
  onDeleteCustomNotebook: (notebookId: string) => void;
  onBack: () => void;
}

type FilterMode =
  | 'all'
  | 'eigenes-heft'
  | 'foto-skript'
  | 'pdf-dokument'
  | 'annotated'
  | 'stickers';

const PdfCoverThumb: React.FC<{ pdfUrl: string; pageNumber?: number; title: string }> = ({
  pdfUrl,
  pageNumber = 1,
  title,
}) => {
  const [thumbUrl, setThumbUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    getPdfThumbnailDataUrl(pdfUrl, pageNumber).then((url) => {
      if (active && url) setThumbUrl(url);
    });
    return () => {
      active = false;
    };
  }, [pdfUrl, pageNumber]);

  if (!thumbUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white/10 text-white/90 p-3 text-center">
        <FileText className="w-8 h-8 mb-1.5 opacity-90" />
        <span className="text-[11px] font-semibold leading-tight line-clamp-2">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={thumbUrl}
      alt={`Deckblatt: ${title}`}
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover object-top"
    />
  );
};

const CustomCoverThumb: React.FC<{
  firstPage?: CustomNotebookPage;
  title: string;
}> = ({ firstPage, title }) => {
  const [mediaUrl, setMediaUrl] = useState<string>('');

  const firstMediaId = firstPage && firstPage.kind !== 'blank' ? firstPage.mediaId : '';
  useEffect(() => {
    setMediaUrl('');
    if (!firstPage || firstPage.kind === 'blank') return;
    let active = true;
    getMediaObjectUrl(firstMediaId).then((url) => {
      if (active && url) setMediaUrl(url);
    });
    return () => {
      active = false;
    };
  }, [firstPage?.id, firstPage?.kind, firstMediaId]);

  if (!firstPage) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <BookOpen className="w-7 h-7 opacity-80" />
      </div>
    );
  }

  if (firstPage.kind === 'blank') {
    const { dataUrl } = renderBlankTemplateToDataUrl(
      firstPage.template,
      0,
      220,
      firstPage.paperColor ?? 'white',
      Boolean(firstPage.showDateHeader)
    );
    return (
      <img
        src={dataUrl}
        alt={`Deckblatt: ${title}`}
        className="w-full h-full object-cover object-top"
      />
    );
  }

  if (!mediaUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white/10 text-white/90 p-3 text-center">
        <FileText className="w-7 h-7 mb-1 opacity-90" />
        <span className="text-[11px] font-semibold leading-tight line-clamp-2">{title}</span>
      </div>
    );
  }

  if (firstPage.kind === 'pdf-page') {
    return (
      <PdfCoverThumb
        pdfUrl={mediaUrl}
        pageNumber={firstPage.pdfPageNumber}
        title={title}
      />
    );
  }

  return (
    <img
      src={mediaUrl}
      alt={`Deckblatt: ${title}`}
      className="w-full h-full object-cover object-top"
    />
  );
};

export const NotebookLibraryView: React.FC<Props> = ({
  store,
  customNotebooks,
  onSelectNotebook,
  onCreateCustomNotebook,
  onEditCustomNotebook,
  onAppendPagesToNotebook,
  onDeleteCustomNotebook,
  onBack,
}) => {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [stickerTypeFilter, setStickerTypeFilter] = useState<NotebookStickerType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [exportingNotebookId, setExportingNotebookId] = useState<string | null>(null);
  const [pdfExportError, setPdfExportError] = useState<string | null>(null);

  const allNotebooks = useMemo(
    () => [...customNotebooks, ...NOTEBOOKS_CATALOG],
    [customNotebooks]
  );

  const noteHitsByBook = useMemo(() => {
    const map = new Map<string, NotebookNoteSearchHit[]>();
    const q = searchQuery.trim();
    if (!q) return map;
    for (const doc of allNotebooks) {
      const effectiveTotal =
        !doc.isCustom && doc.sourceType === 'blatt-blanko'
          ? store.blankPageCountByBook?.[doc.id] ?? doc.totalPages
          : doc.totalPages;
      const hits = searchNotebookNotes(store, doc.id, effectiveTotal, q);
      if (hits.length > 0) {
        map.set(doc.id, hits);
      }
    }
    return map;
  }, [allNotebooks, searchQuery, store]);

  const filteredNotebooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allNotebooks.filter((doc) => {
      const summary = getNotebookAnnotationSummary(store, doc.id);
      const hasNotes = summary.annotatedPages > 0;

      if (filter === 'eigenes-heft' && !doc.isCustom) return false;
      if (filter === 'foto-skript' && doc.sourceType !== 'foto-skript') return false;
      if (filter === 'pdf-dokument' && doc.sourceType !== 'pdf-dokument') return false;
      if (filter === 'annotated' && !hasNotes) return false;

      if (!q) return true;
      const hasNoteMatch = (noteHitsByBook.get(doc.id)?.length ?? 0) > 0;
      return (
        hasNoteMatch ||
        doc.title.toLowerCase().includes(q) ||
        doc.subtitle.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q)
      );
    });
  }, [allNotebooks, filter, noteHitsByBook, searchQuery, store]);

  const stickerOverviewItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const pages = getAllAnnotatedPages(store).filter((p) => p.stickers.length > 0);
    return pages
      .map((item) => {
        const doc = allNotebooks.find((d) => d.id === item.notebookId);
        if (!doc) return null;
        const pageTitle =
          doc.sourceType === 'foto-skript'
            ? doc.imagePages?.[item.pageNumber - 1]?.title
            : doc.sourceType === 'eigenes-heft' || doc.sourceType === 'blatt-blanko'
            ? doc.customPages?.[item.pageNumber - 1]?.title
            : undefined;
        return { ...item, doc, pageTitle };
      })
      .filter((entry): entry is NonNullable<typeof entry> => {
        if (!entry) return false;
        if (
          stickerTypeFilter !== 'all' &&
          !entry.stickers.some((s) => s.type === stickerTypeFilter)
        ) {
          return false;
        }
        if (!q) return true;
        const stickerLabels = entry.stickers
          .map((s) => NOTEBOOK_STICKERS.find((p) => p.type === s.type)?.label || '')
          .join(' ')
          .toLowerCase();
        return (
          entry.doc.title.toLowerCase().includes(q) ||
          entry.doc.category.toLowerCase().includes(q) ||
          (entry.pageTitle?.toLowerCase().includes(q) ?? false) ||
          stickerLabels.includes(q)
        );
      });
  }, [allNotebooks, store, searchQuery, stickerTypeFilter]);

  const totalTotals = useMemo(() => {
    let pages = 0;
    let stickies = 0;
    let stickers = 0;
    let strokes = 0;
    for (const doc of allNotebooks) {
      pages += doc.totalPages;
      const sum = getNotebookAnnotationSummary(store, doc.id);
      stickies += sum.stickyCount;
      stickers += sum.stickerCount;
      strokes += sum.strokeCount;
    }
    return {
      books: allNotebooks.length,
      pages,
      stickies,
      stickers,
      strokes,
    };
  }, [allNotebooks, store]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer mb-1 min-h-[36px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Übersicht</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
            Skripte & PDF-Hefte
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Alle Unterrichtsfotos, Original-PDFs und eigene Hefte zum Blättern, Markieren, Bekleben mit Stickern und Post-its – klassisch ohne KI-Ballast.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium tabular-nums">
            <span>{totalTotals.books} Hefte</span>
            <span aria-hidden="true">·</span>
            <span>{totalTotals.pages} Seiten</span>
            {totalTotals.stickers > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {totalTotals.stickers} Sticker
                </span>
              </>
            )}
            {totalTotals.stickies > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {totalTotals.stickies} Klebezettel
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onCreateCustomNotebook}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Eigenes Heft</span>
          </button>
        </div>
      </div>

      {/* PDF Export Error Banner */}
      {pdfExportError && (
        <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-xs text-rose-700 dark:text-rose-300">
          <span className="font-semibold">{pdfExportError}</span>
          <button
            type="button"
            onClick={() => setPdfExportError(null)}
            className="px-2 py-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 font-bold cursor-pointer shrink-0"
          >
            Schließen
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
          {(
            [
              { id: 'all', label: 'Alle Hefte' },
              {
                id: 'eigenes-heft',
                label:
                  customNotebooks.length > 0
                    ? `Eigene (${customNotebooks.length})`
                    : 'Eigene Hefte',
              },
              { id: 'foto-skript', label: 'Foto-Skripte' },
              { id: 'pdf-dokument', label: 'Original-PDFs' },
              { id: 'annotated', label: 'Mit Notizen' },
              {
                id: 'stickers',
                label:
                  totalTotals.stickers > 0
                    ? `Sticker-Übersicht (${totalTotals.stickers})`
                    : 'Sticker-Übersicht',
              },
            ] as { id: FilterMode; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              filter === 'stickers'
                ? 'Sticker oder Thema suchen...'
                : 'Heft, Thema oder Notiz suchen...'
            }
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 min-h-[40px]"
          />
        </div>
      </div>

      {/* Sticker Overview Mode OR Notebook Shelf Grid */}
      {filter === 'stickers' ? (
        <div className="space-y-4">
          {/* Sticker Category Filter Row */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStickerTypeFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer min-h-[36px] ${
                stickerTypeFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              Alle Sticker
            </button>
            {NOTEBOOK_STICKERS.map((stk) => (
              <button
                key={stk.type}
                onClick={() => setStickerTypeFilter(stk.type)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer min-h-[36px] ${stk.bgClass} ${stk.borderClass} ${stk.textClass} ${
                  stickerTypeFilter === stk.type
                    ? 'ring-2 ring-indigo-500 scale-102'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                <span>{stk.symbol}</span>
                <span>{stk.label}</span>
              </button>
            ))}
          </div>

          {stickerOverviewItems.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center space-y-2">
              <Sticker className="w-9 h-9 text-emerald-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {totalTotals.stickers === 0
                  ? 'Noch keine Sticker auf Skript-Seiten gesetzt'
                  : 'Keine Sticker passend zum Filter gefunden'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Wähle in einem Heft das Sticker-Werkzeug (z. B. Merksatz, Wichtig! oder IHK-Tipp) und tippe auf die gewünschte Stelle – alle markierten Seiten erscheinen hier als direkte Sprungmarken.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stickerOverviewItems.map((entry) => (
                <button
                  key={`${entry.notebookId}::${entry.pageNumber}`}
                  onClick={() => onSelectNotebook(entry.doc, entry.pageNumber)}
                  className="group text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                        <span>{entry.doc.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Seite {entry.pageNumber} / {entry.doc.totalPages}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {entry.doc.title}
                      </h3>
                      {entry.pageTitle && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                          {entry.pageTitle}
                        </p>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0 whitespace-nowrap pt-1">
                      <span>Zur Seite</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  {/* Placed Stickers Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {entry.stickers.map((stk) => {
                      const preset = NOTEBOOK_STICKERS.find((p) => p.type === stk.type);
                      if (!preset) return null;
                      return (
                        <span
                          key={stk.id}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] font-extrabold ${preset.bgClass} ${preset.borderClass} ${preset.textClass}`}
                        >
                          <span>{preset.symbol}</span>
                          <span>{preset.shortLabel}</span>
                        </span>
                      );
                    })}
                    {entry.stickyNotes.length > 0 && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pl-1 tabular-nums">
                        · {entry.stickyNotes.length} Klebezettel
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : filteredNotebooks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <BookOpen className="w-9 h-9 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {filter === 'eigenes-heft' && customNotebooks.length === 0
              ? 'Noch keine eigenen Hefte angelegt'
              : 'Keine passenden Hefte gefunden'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {filter === 'eigenes-heft' && customNotebooks.length === 0
              ? 'Lege dein erstes eigenes Heft mit PDFs, iPad-Fotos oder leeren karierten/linierten Notizseiten an.'
              : 'Passe den Filter oder Suchbegriff an, um alle Skripte und PDFs wieder anzuzeigen.'}
          </p>
          {filter === 'eigenes-heft' && customNotebooks.length === 0 && (
            <button
              type="button"
              onClick={onCreateCustomNotebook}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>Jetzt erstes Heft anlegen</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotebooks.map((doc) => {
            const summary = getNotebookAnnotationSummary(store, doc.id);
            const lastPage = store.lastPageByBook[doc.id] || 1;
            const hasSavedNotes =
              summary.stickyCount > 0 ||
              summary.stickerCount > 0 ||
              summary.strokeCount > 0 ||
              summary.textCount > 0 ||
              summary.imageCount > 0;
            const isDeleting = confirmDeleteId === doc.id;

            const sourceTypeLabel =
              doc.sourceType === 'foto-skript'
                ? 'Foto-Skript'
                : doc.sourceType === 'pdf-dokument'
                ? 'Original-PDF'
                : doc.sourceType === 'blatt-blanko'
                ? 'Blatt Blanko'
                : 'Eigenes Heft';

            const effectiveTotalPages =
              !doc.isCustom && doc.sourceType === 'blatt-blanko'
                ? store.blankPageCountByBook?.[doc.id] ?? doc.totalPages
                : doc.totalPages;
            const firstPageTemplate =
              store.pages[`${doc.id}::1`]?.templateOverride ?? 'blank';
            const firstPagePaperColor =
              store.pages[`${doc.id}::1`]?.paperColorOverride ?? 'white';
            const firstPageShowHeader =
              store.pages[`${doc.id}::1`]?.showDateHeader ?? false;
            const noteHits = noteHitsByBook.get(doc.id) ?? [];
            const targetOpenPage = noteHits.length > 0 ? noteHits[0].pageNumber : undefined;

            return (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-2xl p-4 transition-all hover:shadow-md flex flex-col justify-between gap-3"
              >
                <div
                  onClick={() => onSelectNotebook(doc, targetOpenPage)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.target !== e.currentTarget) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectNotebook(doc, targetOpenPage);
                    }
                  }}
                  className="group text-left cursor-pointer flex gap-4 items-stretch w-full"
                >
                  {/* Booklet Spine & Thumbnail Cover */}
                  <div
                    className={`w-22 sm:w-24 aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${doc.coverColor} relative border border-slate-200/60 dark:border-slate-700/60 shadow-xs`}
                  >
                    {/* Classic Left Spine Accent */}
                    <div className="absolute inset-y-0 left-0 w-2 bg-black/20 z-10" />

                    {doc.sourceType === 'foto-skript' && doc.coverImageUrl ? (
                      <img
                        src={doc.coverImageUrl}
                        alt={doc.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
                          doc.coverRotation === 90 ? 'rotate-90 scale-125' : ''
                        }`}
                      />
                    ) : doc.sourceType === 'eigenes-heft' || doc.sourceType === 'blatt-blanko' ? (
                      <CustomCoverThumb
                        firstPage={
                          doc.customPages?.[0] ?? {
                            id: 'blank-cover',
                            pageNumber: 1,
                            kind: 'blank',
                            template: firstPageTemplate,
                            paperColor: firstPagePaperColor,
                            showDateHeader: firstPageShowHeader,
                            title: 'Blatt Blanko',
                          }
                        }
                        title={doc.title}
                      />
                    ) : doc.pdfUrl ? (
                      <PdfCoverThumb pdfUrl={doc.pdfUrl} title={doc.title} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <ImageIcon className="w-7 h-7 opacity-80" />
                      </div>
                    )}
                  </div>

                  {/* Booklet Details (Zero-Pill Unboxed Metadata) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums truncate">
                        <span className="truncate">{doc.category}</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={
                            doc.isCustom || doc.sourceType === 'blatt-blanko'
                              ? 'text-indigo-600 dark:text-indigo-400 font-semibold shrink-0'
                              : 'shrink-0'
                          }
                        >
                          {sourceTypeLabel}
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {doc.title}
                      </h2>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {doc.subtitle}
                      </p>

                      {noteHits.length > 0 && (
                        <p className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/70 dark:border-indigo-800/60 rounded-lg px-2 py-1 truncate">
                          S. {noteHits[0].pageNumber}: „{noteHits[0].text}“
                          {noteHits.length > 1 ? ` (+${noteHits.length - 1})` : ''}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 tabular-nums truncate">
                        <span>
                          {effectiveTotalPages} {effectiveTotalPages === 1 ? 'Seite' : 'Seiten'}
                        </span>
                        {hasSavedNotes && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                              <StickyNote className="w-3.5 h-3.5 shrink-0" />
                              <span>
                                {summary.stickyCount +
                                  summary.stickerCount +
                                  summary.strokeCount +
                                  summary.textCount +
                                  summary.imageCount}
                              </span>
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            setPdfExportError(null);
                            setExportingNotebookId(doc.id);
                            try {
                              await exportNotebookAsPdf(doc, store);
                            } catch (err) {
                              console.error('PDF-Export fehlgeschlagen:', err);
                              setPdfExportError(
                                err instanceof Error
                                  ? err.message
                                  : `PDF-Export für „${doc.title}“ fehlgeschlagen.`
                              );
                            } finally {
                              setExportingNotebookId(null);
                            }
                          }}
                          disabled={exportingNotebookId === doc.id}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold transition-colors cursor-pointer disabled:opacity-50"
                          title="Gesamtes Heft mit allen Markierungen & Notizen als PDF exportieren"
                        >
                          {exportingNotebookId === doc.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          <span>PDF</span>
                        </button>

                        <span className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 font-bold shrink-0 whitespace-nowrap">
                          <span>{lastPage > 1 ? `S. ${lastPage}` : 'Öffnen'}</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Management Actions Bar (only for user-created custom notebooks) */}
                {doc.isCustom && (
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800">
                    {isDeleting ? (
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-rose-700 dark:text-rose-300">
                          Heft & Dateien löschen?
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmDeleteId(null);
                              onDeleteCustomNotebook(doc.id);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer min-h-[34px]"
                          >
                            Löschen
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer min-h-[34px]"
                          >
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => onAppendPagesToNotebook(doc)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold transition-colors cursor-pointer min-h-[36px]"
                          title="Weitere PDFs, Fotos oder leere Seiten anfügen"
                        >
                          <FilePlus2 className="w-3.5 h-3.5" />
                          <span>+ Seiten</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onEditCustomNotebook(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors cursor-pointer min-h-[36px]"
                            title="Titel, Kategorie oder Cover bearbeiten"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Bearbeiten</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(doc.id)}
                            className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Eigenes Heft löschen"
                            aria-label="Eigenes Heft löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
