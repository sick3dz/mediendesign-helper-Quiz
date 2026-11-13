import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Hand,
  Highlighter,
  LayoutGrid,
  PenTool,
  Redo2,
  RotateCw,
  Sticker,
  StickyNote,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
  X,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  Pencil,
} from 'lucide-react';
import {
  NotebookDocument,
  NotebookStickerType,
  NotebookStore,
  NotebookTool,
  PageAnnotations,
  StickyColor,
} from '../../types/notebook';
import {
  HIGHLIGHTER_COLORS,
  NOTEBOOK_STICKERS,
  PEN_COLORS,
  STICKY_NOTE_STYLES,
} from '../../data/notebooksData';
import { getPageAnnotations } from '../../services/notebookStorageService';
import { getPdfThumbnailDataUrl } from '../../services/pdfRenderService';
import { NotebookPageStage } from './NotebookPageStage';

interface Props {
  notebook: NotebookDocument;
  store: NotebookStore;
  onUpdatePageAnnotations: (
    notebookId: string,
    pageNumber: number,
    annotations: PageAnnotations
  ) => void;
  onPageChange: (notebookId: string, pageNumber: number) => void;
  onBackToLibrary: () => void;
}

const PdfPageThumbnail: React.FC<{
  pdfUrl: string;
  pageNumber: number;
  isActive: boolean;
}> = ({ pdfUrl, pageNumber }) => {
  const [thumb, setThumb] = useState<string>('');

  useEffect(() => {
    let active = true;
    getPdfThumbnailDataUrl(pdfUrl, pageNumber).then((url) => {
      if (active && url) setThumb(url);
    });
    return () => {
      active = false;
    };
  }, [pdfUrl, pageNumber]);

  if (!thumb) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 text-[11px] font-mono tabular-nums">
        {pageNumber}
      </div>
    );
  }

  return (
    <img
      src={thumb}
      alt={`Vorschau Seite ${pageNumber}`}
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover object-top"
    />
  );
};

export const NotebookReaderWorkspace: React.FC<Props> = ({
  notebook,
  store,
  onUpdatePageAnnotations,
  onPageChange,
  onBackToLibrary,
}) => {
  const initialPage = Math.max(
    1,
    Math.min(store.lastPageByBook[notebook.id] || 1, notebook.totalPages)
  );
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(notebook.totalPages);

  // Active Tool & Sub-options (Classic GoodNotes)
  const [activeTool, setActiveTool] = useState<NotebookTool>('highlighter');
  const [openToolPopover, setOpenToolPopover] = useState<
    'highlighter' | 'pen' | 'sticky' | 'sticker' | null
  >(null);

  const [penColor, setPenColor] = useState<string>(PEN_COLORS[0].color);
  const [penWidth, setPenWidth] = useState<number>(0.42);
  const [highlighterColor, setHighlighterColor] = useState<string>(HIGHLIGHTER_COLORS[0].color);
  const [highlighterWidth, setHighlighterWidth] = useState<number>(2.4);
  const [stickyColor, setStickyColor] = useState<StickyColor>('yellow');
  const [selectedStickerType, setSelectedStickerType] =
    useState<NotebookStickerType>('merksatz');

  // View controls
  const [zoom, setZoom] = useState<number>(1);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [confirmClearPage, setConfirmClearPage] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState<boolean>(false);
  const [pencilOnlyMode, setPencilOnlyMode] = useState<boolean>(false);
  const userToggledPencilRef = useRef<boolean>(false);

  // Measure viewport stage width cleanly
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const [fitWidth, setFitWidth] = useState<number>(760);

  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;
    const updateSize = () => {
      const avail = el.clientWidth;
      if (avail > 0) {
        const padding = avail < 640 ? 20 : 56;
        const maxFit = isFullscreen ? 1040 : 860;
        setFitWidth(Math.min(maxFit, Math.max(280, avail - padding)));
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [showThumbnails, isFullscreen]);

  // Lock background page scroll while in fullscreen mode, reset collapse on exit
  useEffect(() => {
    if (!isFullscreen) {
      setIsToolbarCollapsed(false);
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  // Undo / Redo Stacks per session
  const [undoStack, setUndoStack] = useState<PageAnnotations[]>([]);
  const [redoStack, setRedoStack] = useState<PageAnnotations[]>([]);

  // Reset Undo/Redo & clear-confirm when page changes
  useEffect(() => {
    setUndoStack([]);
    setRedoStack([]);
    setConfirmClearPage(false);
    onPageChange(notebook.id, currentPage);
  }, [notebook.id, currentPage]);

  const currentAnnotations = getPageAnnotations(store, notebook.id, currentPage);

  const handleCommitAnnotations = useCallback(
    (next: PageAnnotations, recordHistory: boolean = true) => {
      if (recordHistory) {
        setUndoStack((prev) => [...prev.slice(-29), currentAnnotations]);
        setRedoStack([]);
      }
      onUpdatePageAnnotations(notebook.id, currentPage, next);
    },
    [currentAnnotations, notebook.id, currentPage, onUpdatePageAnnotations]
  );

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, currentAnnotations]);
    setUndoStack((prev) => prev.slice(0, -1));
    onUpdatePageAnnotations(notebook.id, currentPage, previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, currentAnnotations]);
    setRedoStack((prev) => prev.slice(0, -1));
    onUpdatePageAnnotations(notebook.id, currentPage, next);
  };

  const handleRotatePage = () => {
    const imageMeta =
      notebook.sourceType === 'foto-skript'
        ? notebook.imagePages?.[currentPage - 1]
        : undefined;
    const currentRot =
      currentAnnotations.rotationOverride !== undefined
        ? currentAnnotations.rotationOverride
        : imageMeta?.defaultRotation ?? 0;
    const nextRot = (currentRot + 90) % 360;
    handleCommitAnnotations(
      { ...currentAnnotations, rotationOverride: nextRot },
      true
    );
  };

  const handleClearCurrentPage = () => {
    handleCommitAnnotations(
      {
        strokes: [],
        stickyNotes: [],
        stickers: [],
        rotationOverride: currentAnnotations.rotationOverride,
      },
      true
    );
    setConfirmClearPage(false);
  };

  const goToPage = (pageNum: number) => {
    const clamped = Math.max(1, Math.min(pageNum, totalPages));
    setCurrentPage(clamped);
    setOpenToolPopover(null);
    stageContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  };

  const selectTool = (tool: NotebookTool) => {
    setConfirmClearPage(false);
    if (tool === 'highlighter' || tool === 'pen' || tool === 'sticky' || tool === 'sticker') {
      if (activeTool === tool) {
        setOpenToolPopover((prev) => (prev === tool ? null : tool));
      } else {
        setActiveTool(tool);
        setOpenToolPopover(tool);
      }
    } else {
      setActiveTool(tool);
      setOpenToolPopover(null);
    }
  };

  // Keyboard navigation (Left/Right arrows & Escape to exit fullscreen)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        goToPage(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        goToPage(currentPage + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentPage, totalPages, isFullscreen]);

  const currentPageTitle =
    notebook.sourceType === 'foto-skript'
      ? notebook.imagePages?.[currentPage - 1]?.title
      : `Seite ${currentPage} von ${totalPages}`;

  const pageAnnotationCount =
    currentAnnotations.strokes.length +
    currentAnnotations.stickyNotes.length +
    currentAnnotations.stickers.length;

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-[60] flex flex-col bg-slate-100 dark:bg-slate-950 h-[100dvh] w-screen overflow-hidden'
          : 'flex flex-col bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm min-h-[76vh]'
      }
    >
      {/* Classic GoodNotes Fixed Top Toolbar (collapsible in Fullscreen) */}
      {(!isFullscreen || !isToolbarCollapsed) && (
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-2.5 sm:px-4 py-2 relative z-40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left Group: Back, Title & Page Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <button
              onClick={onBackToLibrary}
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[40px] whitespace-nowrap shrink-0"
              title="Zurück zur Heft-Übersicht"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Hefte</span>
            </button>

            <button
              onClick={() => setShowThumbnails((prev) => !prev)}
              className={`p-2 rounded-xl transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0 ${
                showThumbnails
                  ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Seitenübersicht ein-/ausblenden"
              aria-label="Seitenübersicht"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <div className="hidden lg:block min-w-0 max-w-[180px] pl-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {notebook.title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {currentPageTitle}
              </div>
            </div>

            {/* Page Flipper (Top-only) */}
            <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800/90 rounded-xl p-0.5 shrink-0">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Vorherige Seite"
                aria-label="Vorherige Seite"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-semibold text-slate-800 dark:text-slate-200 tabular-nums whitespace-nowrap">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer min-h-[36px] whitespace-nowrap"
                title="Nächste Seite"
                aria-label="Nächste Seite"
              >
                <span className="hidden md:inline">Nächste</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Group: Classic GoodNotes Annotation Tools */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => selectTool('hand')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'hand'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Hand / Notizen & Sticker verschieben"
            >
              <Hand className="w-4 h-4" />
              <span className="hidden md:inline">Hand</span>
            </button>

            <button
              onClick={() => selectTool('highlighter')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'highlighter'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Textmarker (nochmal tippen für Farbe & Breite)"
            >
              <Highlighter className="w-4 h-4" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0"
                style={{ backgroundColor: highlighterColor }}
              />
              <span className="hidden md:inline">Marker</span>
            </button>

            <button
              onClick={() => selectTool('pen')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'pen'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Freihand-Stift (nochmal tippen für Farbe & Stärke)"
            >
              <PenTool className="w-4 h-4" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0"
                style={{ backgroundColor: penColor }}
              />
              <span className="hidden md:inline">Stift</span>
            </button>

            <button
              onClick={() => selectTool('eraser')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'eraser'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Radierer für Stift & Textmarker"
            >
              <Eraser className="w-4 h-4" />
              <span className="hidden md:inline">Radierer</span>
            </button>

            <button
              onClick={() => selectTool('sticky')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'sticky'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Klebezettel an Stelle heften (nochmal tippen für Farbe)"
            >
              <StickyNote className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Klebezettel</span>
            </button>

            <button
              onClick={() => selectTool('sticker')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'sticker'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Lern-Sticker auf Seite kleben"
            >
              <Sticker className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Sticker</span>
            </button>

            <span className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-0.5 shrink-0" />

            <button
              onClick={() => {
                userToggledPencilRef.current = true;
                setPencilOnlyMode((prev) => !prev);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                pencilOnlyMode
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={
                pencilOnlyMode
                  ? 'Apple Pencil Schutz aktiv: Nur Stift zeichnet, Finger scrollen & zoomen'
                  : 'Apple Pencil Modus aktivieren (Handballen-Schutz & Finger-Scrollen)'
              }
              aria-pressed={pencilOnlyMode}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nur Stift</span>
            </button>
          </div>

          {/* Right Group: Undo/Redo, Rotate, Zoom, Clear */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Rückgängig"
              aria-label="Rückgängig"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Wiederholen"
              aria-label="Wiederholen"
            >
              <Redo2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleRotatePage}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="Aktuelle Seite um 90° drehen"
              aria-label="Seite drehen"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Herauszoomen"
                aria-label="Herauszoomen"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 tabular-nums cursor-pointer"
                title="Auf Seitenbreite einpassen (100%)"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Hineinzoomen"
                aria-label="Hineinzoomen"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {pageAnnotationCount > 0 && (
              <button
                onClick={() => setConfirmClearPage((prev) => !prev)}
                className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Alle Markierungen dieser Seite löschen"
                aria-label="Seite leeren"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                isFullscreen
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isFullscreen ? 'Vollbild beenden (Esc)' : 'Vollbild mit Toolbar öffnen'}
              aria-label={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden md:inline">Vollbild aus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden md:inline">Vollbild</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Contextual Tool Sub-Bar (Highlighter, Pen, Sticky Note, Stickers) */}
        {openToolPopover && (
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            {openToolPopover === 'highlighter' && (
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  Textmarker-Farbe:
                </span>
                <div className="flex items-center gap-1.5">
                  {HIGHLIGHTER_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setHighlighterColor(c.color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        highlighterColor === c.color
                          ? 'border-slate-900 dark:border-white scale-110'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                      aria-label={c.label}
                    />
                  ))}
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'Schmal', w: 1.5 },
                    { label: 'Mittel', w: 2.4 },
                    { label: 'Breit', w: 3.8 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setHighlighterWidth(opt.w)}
                      className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                        highlighterWidth === opt.w
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {openToolPopover === 'pen' && (
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  Stiftfarbe:
                </span>
                <div className="flex items-center gap-1.5">
                  {PEN_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setPenColor(c.color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        penColor === c.color
                          ? 'border-indigo-500 ring-2 ring-indigo-300 scale-110'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                      aria-label={c.label}
                    />
                  ))}
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'Fein', w: 0.28 },
                    { label: 'Normal', w: 0.42 },
                    { label: 'Kräftig', w: 0.72 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setPenWidth(opt.w)}
                      className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                        penWidth === opt.w
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {openToolPopover === 'sticky' && (
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  Klebezettel-Farbe (auf Seite tippen zum Anheften):
                </span>
                <div className="flex items-center gap-2">
                  {(Object.keys(STICKY_NOTE_STYLES) as StickyColor[]).map((colorKey) => {
                    const style = STICKY_NOTE_STYLES[colorKey];
                    return (
                      <button
                        key={colorKey}
                        onClick={() => setStickyColor(colorKey)}
                        className={`px-3 py-1 rounded-lg border font-semibold cursor-pointer transition-all ${style.bg} ${style.border} ${style.textColor} ${
                          stickyColor === colorKey
                            ? 'ring-2 ring-indigo-500 scale-105'
                            : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        {style.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {openToolPopover === 'sticker' && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300 mr-1">
                  Sticker wählen & auf Seite tippen:
                </span>
                {NOTEBOOK_STICKERS.map((stk) => (
                  <button
                    key={stk.type}
                    onClick={() => setSelectedStickerType(stk.type)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 font-bold cursor-pointer transition-all ${stk.bgClass} ${stk.borderClass} ${stk.textClass} ${
                      selectedStickerType === stk.type
                        ? 'ring-2 ring-indigo-500 scale-105'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span>{stk.symbol}</span>
                    <span>{stk.label}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setOpenToolPopover(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer ml-auto"
              aria-label="Werkzeugleiste schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Inline Confirm Clear Page */}
        {confirmClearPage && (
          <div className="mt-2 pt-2 border-t border-rose-200 dark:border-rose-900/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-rose-700 dark:text-rose-300">
              Alle {pageAnnotationCount} Markierungen, Klebezettel & Sticker auf Seite {currentPage} wirklich entfernen?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearCurrentPage}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
              >
                Ja, Seite leeren
              </button>
              <button
                onClick={() => setConfirmClearPage(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Main Reader Body: Optional Thumbnail Sidebar + Page Stage */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Colored Pull-Tab ("Lasche") in Fullscreen to collapse/expand the top toolbar */}
        {isFullscreen && (
          <button
            type="button"
            onClick={() => setIsToolbarCollapsed((prev) => !prev)}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-b-xl bg-amber-400 hover:bg-amber-300 text-amber-950 border-x border-b border-amber-500/80 shadow-md text-[11px] font-extrabold tracking-wide cursor-pointer transition-colors"
            title={
              isToolbarCollapsed
                ? 'Werkzeugleiste ausklappen'
                : 'Werkzeugleiste einklappen'
            }
            aria-label={
              isToolbarCollapsed
                ? 'Werkzeugleiste ausklappen'
                : 'Werkzeugleiste einklappen'
            }
          >
            {isToolbarCollapsed ? (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Menü</span>
                <span className="opacity-75 tabular-nums">
                  · {currentPage}/{totalPages}
                </span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Einklappen</span>
              </>
            )}
          </button>
        )}

        {showThumbnails && (!isFullscreen || !isToolbarCollapsed) && (
          <aside
            className={`w-48 sm:w-56 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 space-y-2.5 shrink-0 ${
              isFullscreen ? 'max-h-full' : 'max-h-[75vh]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pb-1 border-b border-slate-100 dark:border-slate-800">
              <span>Seitenübersicht</span>
              <button
                onClick={() => setShowThumbnails(false)}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Seitenübersicht schließen"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                const pageAnn = getPageAnnotations(store, notebook.id, pageNum);
                const hasAny =
                  pageAnn.strokes.length > 0 ||
                  pageAnn.stickyNotes.length > 0 ||
                  pageAnn.stickers.length > 0;
                const imgMeta =
                  notebook.sourceType === 'foto-skript'
                    ? notebook.imagePages?.[pageNum - 1]
                    : undefined;

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`group flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="w-full aspect-[3/4] rounded-md overflow-hidden bg-white border border-slate-200 dark:border-slate-700 relative">
                      {notebook.sourceType === 'foto-skript' && imgMeta ? (
                        (() => {
                          const thumbRot =
                            pageAnn.rotationOverride !== undefined
                              ? pageAnn.rotationOverride
                              : imgMeta.defaultRotation ?? 0;
                          const rotClass =
                            thumbRot === 90
                              ? 'rotate-90 scale-125'
                              : thumbRot === 180
                              ? 'rotate-180'
                              : thumbRot === 270
                              ? '-rotate-90 scale-125'
                              : '';
                          return (
                            <img
                              src={imgMeta.imageUrl}
                              alt={`Seite ${pageNum}`}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover object-top ${rotClass}`}
                            />
                          );
                        })()
                      ) : notebook.pdfUrl ? (
                        <PdfPageThumbnail
                          pdfUrl={notebook.pdfUrl}
                          pageNumber={pageNum}
                          isActive={currentPage === pageNum}
                        />
                      ) : null}

                      {hasAny && (
                        <span
                          className="absolute top-1 right-1 px-1 py-0.2 rounded bg-amber-400 text-amber-950 text-[9px] font-extrabold shadow-xs"
                          title="Seite enthält Notizen oder Markierungen"
                        >
                          Notiz
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                      {pageNum}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Scrollable Canvas Stage */}
        <div
          ref={stageContainerRef}
          className="flex-1 overflow-auto bg-slate-200/70 dark:bg-slate-950 relative"
        >
          <NotebookPageStage
            notebook={notebook}
            pageNumber={currentPage}
            annotations={currentAnnotations}
            activeTool={activeTool}
            penColor={penColor}
            penWidth={penWidth}
            highlighterColor={highlighterColor}
            highlighterWidth={highlighterWidth}
            stickyColor={stickyColor}
            selectedStickerType={selectedStickerType}
            zoom={zoom}
            fitWidth={fitWidth}
            pencilOnlyMode={pencilOnlyMode}
            onStylusDetected={() => {
              if (!userToggledPencilRef.current) {
                setPencilOnlyMode(true);
              }
            }}
            onCommitAnnotations={handleCommitAnnotations}
            onDetectedPdfTotalPages={(count) => {
              if (count > 0 && count !== totalPages) {
                setTotalPages(count);
              }
            }}
          />
        </div>
      </div>

      {/* Subtle Bottom Helper Bar (hidden when toolbar is collapsed in Fullscreen) */}
      {(!isFullscreen || !isToolbarCollapsed) && (
        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
          <div className="truncate">
            {pencilOnlyMode && (activeTool === 'pen' || activeTool === 'highlighter' || activeTool === 'eraser')
              ? 'Apple Pencil Schutz aktiv: Nur der Stift zeichnet – Finger scrollen & zoomen ohne Fehlstriche.'
              : (
                <>
                  {activeTool === 'hand' && 'Hand-Modus: Klebezettel & Sticker per Ziehen verschieben oder antippen.'}
                  {activeTool === 'highlighter' && 'Textmarker aktiv: Direkt über wichtige Textstellen streichen.'}
                  {activeTool === 'pen' && 'Stift aktiv: Handschriftliche Notizen oder Unterstreichungen zeichnen.'}
                  {activeTool === 'eraser' && 'Radierer aktiv: Über unerwünschte Stift- oder Markerzüge fahren.'}
                  {activeTool === 'sticky' && 'Klebezettel aktiv: Tippe auf eine Textstelle, um ein Post-it anzuheften.'}
                  {activeTool === 'sticker' && 'Sticker aktiv: Tippe auf die gewünschte Stelle zum Aufkleben.'}
                </>
              )}
          </div>

          <div className="flex sm:hidden items-center gap-1 shrink-0">
            <button
              onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label="Herauszoomen"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="tabular-nums font-bold px-1">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label="Hineinzoomen"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
