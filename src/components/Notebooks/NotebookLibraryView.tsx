import React, { useMemo, useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Search,
  StickyNote,
  ChevronRight,
} from 'lucide-react';
import { NOTEBOOKS_CATALOG } from '../../data/notebooksData';
import { NotebookDocument, NotebookStore } from '../../types/notebook';
import { getNotebookAnnotationSummary } from '../../services/notebookStorageService';
import { getPdfThumbnailDataUrl } from '../../services/pdfRenderService';

interface Props {
  store: NotebookStore;
  onSelectNotebook: (notebook: NotebookDocument) => void;
  onBack: () => void;
}

type FilterMode = 'all' | 'foto-skript' | 'pdf-dokument' | 'annotated';

const PdfCoverThumb: React.FC<{ pdfUrl: string; title: string }> = ({ pdfUrl, title }) => {
  const [thumbUrl, setThumbUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    getPdfThumbnailDataUrl(pdfUrl, 1).then((url) => {
      if (active && url) setThumbUrl(url);
    });
    return () => {
      active = false;
    };
  }, [pdfUrl]);

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

export const NotebookLibraryView: React.FC<Props> = ({ store, onSelectNotebook, onBack }) => {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotebooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return NOTEBOOKS_CATALOG.filter((doc) => {
      const summary = getNotebookAnnotationSummary(store, doc.id);
      const hasNotes = summary.annotatedPages > 0;

      if (filter === 'foto-skript' && doc.sourceType !== 'foto-skript') return false;
      if (filter === 'pdf-dokument' && doc.sourceType !== 'pdf-dokument') return false;
      if (filter === 'annotated' && !hasNotes) return false;

      if (!q) return true;
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.subtitle.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q)
      );
    });
  }, [filter, searchQuery, store]);

  const totalTotals = useMemo(() => {
    let pages = 0;
    let stickies = 0;
    let stickers = 0;
    let strokes = 0;
    for (const doc of NOTEBOOKS_CATALOG) {
      pages += doc.totalPages;
      const sum = getNotebookAnnotationSummary(store, doc.id);
      stickies += sum.stickyCount;
      stickers += sum.stickerCount;
      strokes += sum.strokeCount;
    }
    return {
      books: NOTEBOOKS_CATALOG.length,
      pages,
      stickies,
      stickers,
      strokes,
    };
  }, [store]);

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
            Alle Unterrichtsfotos und Original-PDFs zum Blättern, Markieren, Bekleben mit Stickern und Post-its – klassisch ohne KI-Ballast.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium tabular-nums shrink-0">
          <span>{totalTotals.books} Hefte</span>
          <span aria-hidden="true">·</span>
          <span>{totalTotals.pages} Seiten</span>
          {(totalTotals.stickies > 0 || totalTotals.strokes > 0) && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                {totalTotals.stickies} Klebezettel
              </span>
            </>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
          {(
            [
              { id: 'all', label: 'Alle Hefte' },
              { id: 'foto-skript', label: 'Foto-Skripte' },
              { id: 'pdf-dokument', label: 'Original-PDFs' },
              { id: 'annotated', label: 'Mit Notizen' },
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
            placeholder="Heft oder Thema suchen..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 min-h-[40px]"
          />
        </div>
      </div>

      {/* Notebook Shelf Grid */}
      {filteredNotebooks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center space-y-2">
          <BookOpen className="w-9 h-9 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Keine passenden Hefte gefunden
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Passe den Filter oder Suchbegriff an, um alle Skripte und PDFs wieder anzuzeigen.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotebooks.map((doc) => {
            const summary = getNotebookAnnotationSummary(store, doc.id);
            const lastPage = store.lastPageByBook[doc.id] || 1;
            const hasSavedNotes =
              summary.stickyCount > 0 || summary.stickerCount > 0 || summary.strokeCount > 0;

            return (
              <button
                key={doc.id}
                onClick={() => onSelectNotebook(doc)}
                className="group text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-2xl p-4 transition-all hover:shadow-md cursor-pointer flex gap-4 items-stretch"
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
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                      <span>{doc.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{doc.sourceType === 'foto-skript' ? 'Foto-Skript' : 'Original-PDF'}</span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {doc.title}
                    </h2>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {doc.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 tabular-nums truncate">
                      <span>{doc.totalPages} {doc.totalPages === 1 ? 'Seite' : 'Seiten'}</span>
                      {hasSavedNotes && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                            <StickyNote className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {summary.stickyCount + summary.stickerCount + summary.strokeCount} Markierungen
                            </span>
                          </span>
                        </>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 font-bold shrink-0 whitespace-nowrap">
                      <span>{lastPage > 1 ? `S. ${lastPage}` : 'Öffnen'}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
