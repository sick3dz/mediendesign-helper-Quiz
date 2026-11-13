import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  FilePlus2,
  Type,
  ImagePlus,
  FileText,
  Loader2,
  Keyboard,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Check,
  GripVertical,
  Laptop,
  Search,
  Calendar,
  Plus,
} from 'lucide-react';
import { exportNotebookAsPdf } from '../../services/pdfExportService';
import {
  BlankPageTemplate,
  BlankPaperColor,
  CustomNotebookPage,
  NotebookDocument,
  NotebookImageElement,
  NotebookStickerType,
  NotebookStore,
  NotebookTool,
  PageAnnotations,
  StickyColor,
  TextBoxBackgroundStyle,
} from '../../types/notebook';
import {
  BLANK_PAGE_TEMPLATES,
  BLANK_PAPER_COLORS,
  HIGHLIGHTER_COLORS,
  NOTEBOOK_STICKERS,
  PEN_COLORS,
  STICKY_NOTE_STYLES,
  getBlankPaperPalette,
} from '../../data/notebooksData';
import {
  getPageAnnotations,
  loadNotebookStore,
  searchNotebookNotes,
} from '../../services/notebookStorageService';
import { getPdfThumbnailDataUrl } from '../../services/pdfRenderService';
import {
  getMediaObjectUrl,
  renderBlankTemplateToDataUrl,
  saveEmbeddedImageMedia,
} from '../../services/customNotebookDbService';
import { NotebookPageStage } from './NotebookPageStage';
import { ImageCropModal } from './ImageCropModal';
import { ScrollableColorStrip } from './ScrollableColorStrip';
import {
  isMacLikePlatform,
  NotebookShortcutsModal,
} from './NotebookShortcutsModal';
import {
  getNotebookMaxFitWidth,
  useMacDisplaySettings,
} from '../../services/macDisplaySettingsService';
import { MacDisplaySettingsPanel } from '../MacDisplaySettingsPanel';

interface Props {
  notebook: NotebookDocument;
  initialPage?: number;
  jumpSignal?: { page: number; seq: number };
  store: NotebookStore;
  onUpdatePageAnnotations: (
    notebookId: string,
    pageNumber: number,
    annotations: PageAnnotations
  ) => void;
  onPageChange: (notebookId: string, pageNumber: number) => void;
  onDeletePage?: (notebook: NotebookDocument, pageNumber: number) => Promise<void> | void;
  onMovePage?: (
    notebook: NotebookDocument,
    fromPage: number,
    toPage: number
  ) => Promise<void> | void;
  onChangePageLayout?: (
    notebook: NotebookDocument,
    pageNumber: number,
    template: BlankPageTemplate,
    applyToAllBlank?: boolean,
    paperColor?: BlankPaperColor,
    showDateHeader?: boolean
  ) => Promise<void> | void;
  onQuickAddBlankPage?: (
    notebook: NotebookDocument,
    options: {
      template: BlankPageTemplate;
      paperColor: BlankPaperColor;
      showDateHeader: boolean;
    }
  ) => Promise<void> | void;
  onOpenAppendPages?: () => void;
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
      draggable={false}
      className="w-full h-full object-cover object-top pointer-events-none"
    />
  );
};

const CustomPageThumbnail: React.FC<{
  page: CustomNotebookPage;
  rotation: number;
  templateOverride?: BlankPageTemplate;
  paperColorOverride?: BlankPaperColor;
  showDateHeaderOverride?: boolean;
}> = ({ page, rotation, templateOverride, paperColorOverride, showDateHeaderOverride }) => {
  const [mediaUrl, setMediaUrl] = useState<string>('');

  const pageMediaId = page.kind === 'blank' ? '' : page.mediaId;
  useEffect(() => {
    if (page.kind === 'blank') return;
    let active = true;
    getMediaObjectUrl(pageMediaId).then((url) => {
      if (active && url) setMediaUrl(url);
    });
    return () => {
      active = false;
    };
  }, [page.id, page.kind, pageMediaId]);

  if (page.kind === 'blank') {
    const { dataUrl } = renderBlankTemplateToDataUrl(
      templateOverride ?? page.template,
      rotation,
      220,
      paperColorOverride ?? page.paperColor ?? 'white',
      showDateHeaderOverride ?? page.showDateHeader ?? false
    );
    return (
      <img
        src={dataUrl}
        alt={page.title}
        draggable={false}
        className="w-full h-full object-cover object-top pointer-events-none"
      />
    );
  }

  if (!mediaUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 text-[11px] font-mono tabular-nums">
        {page.pageNumber}
      </div>
    );
  }

  if (page.kind === 'pdf-page') {
    return (
      <PdfPageThumbnail
        pdfUrl={mediaUrl}
        pageNumber={page.pdfPageNumber}
        isActive={false}
      />
    );
  }

  const rotClass =
    rotation === 90
      ? 'rotate-90 scale-125'
      : rotation === 180
      ? 'rotate-180'
      : rotation === 270
      ? '-rotate-90 scale-125'
      : '';

  return (
    <img
      src={mediaUrl}
      alt={page.title}
      draggable={false}
      className={`w-full h-full object-cover object-top pointer-events-none ${rotClass}`}
    />
  );
};

export const NotebookReaderWorkspace: React.FC<Props> = ({
  notebook,
  initialPage: explicitInitialPage,
  jumpSignal,
  store,
  onUpdatePageAnnotations,
  onPageChange,
  onDeletePage,
  onMovePage,
  onChangePageLayout,
  onQuickAddBlankPage,
  onOpenAppendPages,
  onBackToLibrary,
}) => {
  const isBuiltInBlankPad = !notebook.isCustom && notebook.sourceType === 'blatt-blanko';
  const configuredTotalPages = isBuiltInBlankPad
    ? Math.max(1, store.blankPageCountByBook?.[notebook.id] ?? notebook.totalPages)
    : notebook.totalPages;

  const initialPage = Math.max(
    1,
    Math.min(
      explicitInitialPage ?? store.lastPageByBook[notebook.id] ?? 1,
      configuredTotalPages
    )
  );
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(configuredTotalPages);

  useEffect(() => {
    setTotalPages(configuredTotalPages);
  }, [configuredTotalPages]);

  const lastAppliedJumpSeqRef = useRef<number>(0);
  useEffect(() => {
    if (!jumpSignal || jumpSignal.seq === lastAppliedJumpSeqRef.current) return;
    lastAppliedJumpSeqRef.current = jumpSignal.seq;
    const clamped = Math.max(1, Math.min(jumpSignal.page, configuredTotalPages));
    setCurrentPage(clamped);
    stageContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [jumpSignal, configuredTotalPages]);

  // Active Tool & Sub-options (Classic GoodNotes)
  const [activeTool, setActiveTool] = useState<NotebookTool>('hand');
  const [openToolPopover, setOpenToolPopover] = useState<
    'highlighter' | 'pen' | 'text' | 'sticky' | 'sticker' | null
  >(null);

  const [penColor, setPenColor] = useState<string>(PEN_COLORS[0].color);
  const [penWidth, setPenWidth] = useState<number>(0.42);
  const [highlighterColor, setHighlighterColor] = useState<string>(HIGHLIGHTER_COLORS[0].color);
  const [highlighterWidth, setHighlighterWidth] = useState<number>(2.4);
  const [textColor, setTextColor] = useState<string>(PEN_COLORS[1].color);
  const [textSize, setTextSize] = useState<number>(2.0);
  const [textBackgroundStyle, setTextBackgroundStyle] =
    useState<TextBoxBackgroundStyle>('white');
  const [textBold, setTextBold] = useState<boolean>(false);
  const [textItalic, setTextItalic] = useState<boolean>(false);
  const [textUnderline, setTextUnderline] = useState<boolean>(false);
  const [textStrikethrough, setTextStrikethrough] = useState<boolean>(false);
  const [showTextStyleBar, setShowTextStyleBar] = useState<boolean>(false);
  const [stickyColor, setStickyColor] = useState<StickyColor>('yellow');
  const [selectedStickerType, setSelectedStickerType] =
    useState<NotebookStickerType>('merksatz');
  const [stickerScale, setStickerScale] = useState<number>(1);
  const [stickerOpacity, setStickerOpacity] = useState<number>(1);

  const [macSettings] = useMacDisplaySettings();
  const [showDisplaySettingsModal, setShowDisplaySettingsModal] = useState<boolean>(false);

  // View controls
  const [zoom, setZoom] = useState<number>(() => macSettings.defaultNotebookZoom);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [sidebarTab, setSidebarTab] = useState<'pages' | 'stickers' | 'notes'>('pages');
  const [noteSearchQuery, setNoteSearchQuery] = useState<string>('');
  const [isEditingPageNum, setIsEditingPageNum] = useState<boolean>(false);
  const [pageJumpInput, setPageJumpInput] = useState<string>('');
  const pageJumpInputRef = useRef<HTMLInputElement>(null);
  const [sidebarStickerFilter, setSidebarStickerFilter] = useState<NotebookStickerType | 'all'>('all');
  const [confirmClearPage, setConfirmClearPage] = useState<boolean>(false);
  const [isEditPagesOpen, setIsEditPagesOpen] = useState<boolean>(false);
  const [isLayoutPanelOpen, setIsLayoutPanelOpen] = useState<boolean>(false);
  const [confirmDeletePageNum, setConfirmDeletePageNum] = useState<number | null>(null);
  const [isDeletingPage, setIsDeletingPage] = useState<boolean>(false);
  const [isReorderingPage, setIsReorderingPage] = useState<boolean>(false);
  const [dragSourcePageNum, setDragSourcePageNum] = useState<number | null>(null);
  const [dragOverPageNum, setDragOverPageNum] = useState<number | null>(null);
  const [layoutAppliedAllNotice, setLayoutAppliedAllNotice] = useState<boolean>(false);
  const [imageInsertError, setImageInsertError] = useState<string | null>(null);
  const [pdfExportError, setPdfExportError] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState<boolean>(false);
  const [pencilOnlyMode, setPencilOnlyMode] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [isStageCropOpen, setIsStageCropOpen] = useState<boolean>(false);
  const [hasStageSelection, setHasStageSelection] = useState<boolean>(false);
  const [deleteSelectionSignal, setDeleteSelectionSignal] = useState<number>(0);
  const [clearSelectionSignal, setClearSelectionSignal] = useState<number>(0);
  const userToggledPencilRef = useRef<boolean>(false);
  const isMac = isMacLikePlatform();
  const cmdLabel = isMac ? '⌘' : 'Strg+';
  const shiftLabel = isMac ? '⇧' : 'Umschalt+';
  const insertImageInputRef = useRef<HTMLInputElement>(null);
  const [pendingCropQueue, setPendingCropQueue] = useState<
    { file: File; previewUrl: string }[]
  >([]);
  const activePendingCrop = pendingCropQueue[0] ?? null;
  const [selectedImageSignal, setSelectedImageSignal] = useState<{
    id: string;
    seq: number;
  } | undefined>(undefined);

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
        const maxFit = getNotebookMaxFitWidth(macSettings.contentWidth, isFullscreen);
        setFitWidth(Math.min(maxFit, Math.max(280, avail - padding)));
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [showThumbnails, isFullscreen, macSettings.contentWidth]);

  // MacBook Trackpad Pinch & Cmd+Scroll Zoom Guard inside Notebook Stage
  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;
    const handleStageWheel = (e: WheelEvent) => {
      const isPinch = e.ctrlKey;
      const isCmdScroll = e.metaKey;
      if (!isPinch && !isCmdScroll) return;

      const mode = macSettings.notebookPinchMode;
      if (mode === 'block') {
        e.preventDefault();
        return;
      }
      if (mode === 'cmd-only') {
        if (isPinch && !isCmdScroll) {
          e.preventDefault();
          return;
        }
        if (!isCmdScroll) return;
      }

      e.preventDefault();
      if (Math.abs(e.deltaY) < 0.01) return;
      const sensitivity = isPinch ? 0.0065 : 0.0025;
      const rawDelta = Math.max(-0.18, Math.min(0.18, -e.deltaY * sensitivity));
      setZoom((prev) => Math.max(0.75, Math.min(2.5, +(prev + rawDelta).toFixed(2))));
    };
    el.addEventListener('wheel', handleStageWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleStageWheel);
  }, [macSettings.notebookPinchMode]);

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
    setConfirmDeletePageNum(null);
    setDragSourcePageNum(null);
    setDragOverPageNum(null);
    setImageInsertError(null);
    setPdfExportError(null);
    setIsEditingPageNum(false);
    onPageChange(notebook.id, currentPage);
  }, [notebook.id, currentPage]);

  useEffect(() => {
    setIsEditPagesOpen(false);
    setIsLayoutPanelOpen(false);
    setNoteSearchQuery('');
  }, [notebook.id]);

  const currentAnnotations = getPageAnnotations(store, notebook.id, currentPage);

  const handleCommitAnnotations = useCallback(
    (
      next: PageAnnotations,
      recordHistory: boolean = true,
      historyBaseSnapshot?: PageAnnotations
    ) => {
      if (recordHistory) {
        const snapshot = historyBaseSnapshot ?? currentAnnotations;
        setUndoStack((prev) => [...prev.slice(-29), snapshot]);
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
    const customMeta =
      notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko'
        ? notebook.customPages?.[currentPage - 1]
        : undefined;
    const currentRot =
      currentAnnotations.rotationOverride !== undefined
        ? currentAnnotations.rotationOverride
        : imageMeta?.defaultRotation ?? customMeta?.defaultRotation ?? 0;
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
        textBoxes: [],
        images: [],
        rotationOverride: currentAnnotations.rotationOverride,
        templateOverride: currentAnnotations.templateOverride,
        paperColorOverride: currentAnnotations.paperColorOverride,
        showDateHeader: currentAnnotations.showDateHeader,
        headerTopic: undefined,
        headerDate: undefined,
      },
      true
    );
    setConfirmClearPage(false);
  };

  const handleConfirmDeletePage = async (pageNum: number) => {
    if (!onDeletePage || totalPages <= 1 || isDeletingPage) return;
    setIsDeletingPage(true);
    try {
      await onDeletePage(notebook, pageNum);
      setConfirmDeletePageNum(null);
      setConfirmClearPage(false);
      setUndoStack([]);
      setRedoStack([]);
      setCurrentPage((prev) => {
        if (pageNum < prev) return Math.max(1, prev - 1);
        return Math.max(1, Math.min(prev, totalPages - 1));
      });
    } finally {
      setIsDeletingPage(false);
    }
  };

  const handleMovePageInSidebar = async (fromPage: number, toPage: number) => {
    if (
      !onMovePage ||
      totalPages <= 1 ||
      isReorderingPage ||
      isDeletingPage ||
      fromPage === toPage ||
      fromPage < 1 ||
      toPage < 1 ||
      fromPage > totalPages ||
      toPage > totalPages
    ) {
      return;
    }
    setIsReorderingPage(true);
    setConfirmDeletePageNum(null);
    setDragSourcePageNum(null);
    setDragOverPageNum(null);
    try {
      await onMovePage(notebook, fromPage, toPage);
      setUndoStack([]);
      setRedoStack([]);
      setCurrentPage((prev) => {
        if (prev === fromPage) return toPage;
        if (fromPage < toPage && prev > fromPage && prev <= toPage) return prev - 1;
        if (fromPage > toPage && prev >= toPage && prev < fromPage) return prev + 1;
        return prev;
      });
    } finally {
      setIsReorderingPage(false);
    }
  };

  const currentTargetRef = useRef<{ notebookId: string; page: number }>({
    notebookId: notebook.id,
    page: currentPage,
  });
  currentTargetRef.current = { notebookId: notebook.id, page: currentPage };

  const insertImageFilesToCurrentPage = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter(
        (f) =>
          f.type.startsWith('image/') ||
          /\.(png|jpe?g|gif|webp|svg|bmp|heic|heif|avif)$/i.test(f.name)
      );
      if (imageFiles.length === 0) return;

      const targetNotebookId = notebook.id;
      const targetPage = currentPage;
      setImageInsertError(null);

      const added: NotebookImageElement[] = [];
      let firstError: string | null = null;
      for (let idx = 0; idx < imageFiles.length; idx++) {
        const file = imageFiles[idx];
        try {
          const { mediaId, aspectRatio } = await saveEmbeddedImageMedia(
            file,
            file.name
          );
          const offset = (idx % 4) * 4;
          added.push({
            id: `pimg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            mediaId,
            x: Math.min(75, 48 + offset),
            y: Math.min(75, 44 + offset),
            widthPct: 46,
            aspectRatio,
            opacity: 1,
            rotation: 0,
            createdAt: Date.now(),
          });
        } catch (err) {
          console.error('Bild konnte nicht eingefügt werden:', err);
          if (!firstError) {
            firstError =
              err instanceof Error
                ? err.message
                : 'Bild konnte nicht lokal im Browser gespeichert werden.';
          }
        }
      }

      if (firstError) {
        setImageInsertError(firstError);
      }

      if (added.length > 0) {
        const latest = getPageAnnotations(
          loadNotebookStore(),
          targetNotebookId,
          targetPage
        );
        const next: PageAnnotations = {
          ...latest,
          images: [...(latest.images || []), ...added],
        };
        const stillOnTargetPage =
          currentTargetRef.current.notebookId === targetNotebookId &&
          currentTargetRef.current.page === targetPage;

        if (stillOnTargetPage) {
          setUndoStack((prev) => [...prev.slice(-29), latest]);
          setRedoStack([]);
          setActiveTool('hand');
          setOpenToolPopover(null);
          const lastAdded = added[added.length - 1];
          setSelectedImageSignal((prev) => ({
            id: lastAdded.id,
            seq: (prev?.seq ?? 0) + 1,
          }));
        }
        onUpdatePageAnnotations(targetNotebookId, targetPage, next);
      }
    },
    [currentPage, notebook.id, onUpdatePageAnnotations]
  );

  const handleFilesSelectedForInsert = useCallback((files: File[]) => {
    const imageFiles = files.filter(
      (f) =>
        f.type.startsWith('image/') ||
        /\.(png|jpe?g|gif|webp|svg|bmp|heic|heif|avif)$/i.test(f.name)
    );
    if (imageFiles.length === 0) return;
    const queued = imageFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPendingCropQueue((prev) => [...prev, ...queued]);
  }, []);

  // Clipboard image paste support (Ctrl+V / Cmd+V)
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'TEXTAREA' ||
          target.tagName === 'INPUT' ||
          target.isContentEditable)
      ) {
        return;
      }
      const items = Array.from(e.clipboardData?.items ?? []);
      const files: File[] = [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const f = item.getAsFile();
          if (f) files.push(f);
        }
      }
      if (files.length > 0) {
        e.preventDefault();
        handleFilesSelectedForInsert(files);
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [handleFilesSelectedForInsert]);

  const goToPage = (pageNum: number) => {
    const clamped = Math.max(1, Math.min(pageNum, totalPages));
    setCurrentPage(clamped);
    setOpenToolPopover(null);
    stageContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  };

  const selectTool = (tool: NotebookTool) => {
    setConfirmClearPage(false);
    if (
      tool === 'highlighter' ||
      tool === 'pen' ||
      tool === 'text' ||
      tool === 'sticky' ||
      tool === 'sticker'
    ) {
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

  // Mac & Cross-Platform Keyboard Shortcuts (Cmd+Z Undo, Redo, Tools 1-7, Zoom, Rotate, Delete, Fullscreen, Esc)
  const shortcutActionRef = useRef<(e: KeyboardEvent) => void>(() => {});
  shortcutActionRef.current = (e: KeyboardEvent) => {
    // Pause notebook shortcuts while crop modals are open
    if (activePendingCrop || isStageCropOpen) {
      return;
    }

    const mod = e.metaKey || e.ctrlKey;
    const keyLower = e.key.toLowerCase();

    // Display settings modal close
    if (showDisplaySettingsModal) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowDisplaySettingsModal(false);
      }
      return;
    }

    // Shortcuts overview modal toggle/close
    if (showShortcutsModal) {
      if (
        e.key === 'Escape' ||
        e.key === '?' ||
        (mod && !e.altKey && (e.key === '/' || e.key === '?'))
      ) {
        e.preventDefault();
        setShowShortcutsModal(false);
      }
      return;
    }

    // Protect text entry fields (TextBox, StickyNote, search/text inputs) from stealing typing keys
    const isTextEditable = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      if (el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable) {
        return true;
      }
      if (el.tagName === 'INPUT') {
        const type = (el as HTMLInputElement).type;
        return !['range', 'checkbox', 'radio', 'button', 'file'].includes(type);
      }
      return false;
    };

    const targetEl = e.target as HTMLElement | null;
    const activeEl =
      typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;

    if (isTextEditable(targetEl) || isTextEditable(activeEl)) {
      if (e.key === 'Escape') {
        e.preventDefault();
        activeEl?.blur();
        setOpenToolPopover(null);
      }
      return;
    }

    // Open shortcuts reference: ? or Cmd+/
    if (
      (!mod && !e.altKey && e.key === '?') ||
      (mod && !e.altKey && !e.shiftKey && (e.key === '/' || e.key === '?'))
    ) {
      e.preventDefault();
      setShowShortcutsModal(true);
      return;
    }

    // Undo: Cmd+Z (Mac) / Ctrl+Z (Win/Linux)
    if (mod && !e.altKey && !e.shiftKey && keyLower === 'z') {
      e.preventDefault();
      handleUndo();
      return;
    }

    // Redo: Cmd+Shift+Z / Cmd+Y / Ctrl+Shift+Z / Ctrl+Y
    if (
      mod &&
      !e.altKey &&
      ((e.shiftKey && keyLower === 'z') || (!e.shiftKey && keyLower === 'y'))
    ) {
      e.preventDefault();
      handleRedo();
      return;
    }

    // Zoom In / Out / Reset: Cmd + / Cmd - / Cmd 0
    if (mod && !e.altKey && (e.key === '+' || e.key === '=' || e.code === 'Equal' || e.code === 'NumpadAdd')) {
      e.preventDefault();
      setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
      return;
    }
    if (mod && !e.altKey && (e.key === '-' || e.key === '_' || e.code === 'Minus' || e.code === 'NumpadSubtract')) {
      e.preventDefault();
      setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)));
      return;
    }
    if (mod && !e.altKey && !e.shiftKey && (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0')) {
      e.preventDefault();
      setZoom(1);
      return;
    }

    // Fullscreen toggle: F or Cmd+Shift+F
    if (
      (mod && e.shiftKey && !e.altKey && keyLower === 'f') ||
      (!mod && !e.altKey && !e.shiftKey && keyLower === 'f')
    ) {
      e.preventDefault();
      setIsFullscreen((prev) => !prev);
      return;
    }

    // Pages overview sidebar toggle: G or Cmd+Shift+S
    if (
      (mod && e.shiftKey && !e.altKey && keyLower === 's') ||
      (!mod && !e.altKey && !e.shiftKey && keyLower === 'g')
    ) {
      e.preventDefault();
      if (showThumbnails && sidebarTab === 'pages') {
        setShowThumbnails(false);
      } else {
        setSidebarTab('pages');
        setShowThumbnails(true);
      }
      return;
    }

    // Page navigation: ArrowLeft / ArrowRight or Cmd+ArrowLeft / Cmd+ArrowRight
    if (!e.altKey && !e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      if (e.key === 'ArrowLeft') {
        goToPage(currentPage - 1);
      } else {
        goToPage(currentPage + 1);
      }
      return;
    }

    // Rotate page 90°: Shift+R (avoids browser Cmd+R reload)
    if (!mod && !e.altKey && e.shiftKey && keyLower === 'r') {
      e.preventDefault();
      handleRotatePage();
      return;
    }

    // Apple Pencil only toggle: Shift+P
    if (!mod && !e.altKey && e.shiftKey && keyLower === 'p') {
      e.preventDefault();
      userToggledPencilRef.current = true;
      setPencilOnlyMode((prev) => !prev);
      return;
    }

    // Delete selected image, text box or sticker: Backspace / Delete
    if (!mod && !e.altKey && !e.shiftKey && (e.key === 'Backspace' || e.key === 'Delete')) {
      if (hasStageSelection) {
        e.preventDefault();
        setDeleteSelectionSignal((s) => s + 1);
      }
      return;
    }

    // Single-key tool switching (1–7): first press switches cleanly, pressing again toggles options
    if (!mod && !e.altKey && !e.shiftKey) {
      const toolByKey: Record<string, NotebookTool> = {
        '1': 'hand',
        '2': 'highlighter',
        '3': 'pen',
        '4': 'eraser',
        '5': 'text',
        '6': 'sticky',
        '7': 'sticker',
      };
      const targetTool = toolByKey[e.key];
      if (targetTool) {
        e.preventDefault();
        setConfirmClearPage(false);
        const hasPopover =
          targetTool === 'highlighter' ||
          targetTool === 'pen' ||
          targetTool === 'text' ||
          targetTool === 'sticky' ||
          targetTool === 'sticker';
        if (activeTool === targetTool && hasPopover) {
          setOpenToolPopover((prev) => (prev === targetTool ? null : targetTool));
        } else {
          setActiveTool(targetTool);
          setOpenToolPopover(null);
        }
        return;
      }
    }

    // Layered Escape: confirm bar -> tool popover -> stage selection -> fullscreen
    if (e.key === 'Escape') {
      if (confirmClearPage) {
        e.preventDefault();
        setConfirmClearPage(false);
      } else if (openToolPopover) {
        e.preventDefault();
        setOpenToolPopover(null);
      } else if (hasStageSelection) {
        e.preventDefault();
        setClearSelectionSignal((s) => s + 1);
      } else if (isFullscreen) {
        e.preventDefault();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      shortcutActionRef.current(e);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const currentCustomPage =
    notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko'
      ? notebook.customPages?.[currentPage - 1]
      : undefined;

  const isCurrentPageBlankLayout =
    isBuiltInBlankPad || (Boolean(notebook.isCustom) && currentCustomPage?.kind === 'blank');

  const currentBlankTemplate: BlankPageTemplate =
    currentAnnotations.templateOverride ??
    (currentCustomPage?.kind === 'blank' ? currentCustomPage.template : 'blank');

  const currentPaperColor: BlankPaperColor =
    currentAnnotations.paperColorOverride ??
    (currentCustomPage?.kind === 'blank' ? currentCustomPage.paperColor : undefined) ??
    'white';

  const currentShowDateHeader: boolean =
    currentAnnotations.showDateHeader !== undefined
      ? currentAnnotations.showDateHeader
      : currentCustomPage?.kind === 'blank'
      ? Boolean(currentCustomPage.showDateHeader)
      : false;

  const currentPaperPalette = getBlankPaperPalette(currentPaperColor);

  const applySinglePageLayoutChange = (
    nextTpl: BlankPageTemplate,
    nextCol: BlankPaperColor,
    nextHeader: boolean
  ) => {
    setLayoutAppliedAllNotice(false);
    if (isBuiltInBlankPad) {
      handleCommitAnnotations(
        {
          ...currentAnnotations,
          templateOverride: nextTpl === 'blank' ? undefined : nextTpl,
          paperColorOverride: nextCol === 'white' ? undefined : nextCol,
          showDateHeader: nextHeader ? true : undefined,
        },
        true
      );
      return;
    }
    onChangePageLayout?.(notebook, currentPage, nextTpl, false, nextCol, nextHeader);
  };

  const blankPageCountInBook = isBuiltInBlankPad
    ? totalPages
    : (notebook.customPages ?? []).filter((pg) => pg.kind === 'blank').length;

  const canDeletePages =
    Boolean(onDeletePage) && (Boolean(notebook.isCustom) || isBuiltInBlankPad);

  const canMovePages =
    Boolean(onMovePage) && (Boolean(notebook.isCustom) || isBuiltInBlankPad);

  const canEditPages = canDeletePages || canMovePages;

  const canShowLayoutPanel =
    Boolean(onChangePageLayout) && (isCurrentPageBlankLayout || blankPageCountInBook > 0);

  const currentTemplateLabel =
    BLANK_PAGE_TEMPLATES.find((t) => t.id === currentBlankTemplate)?.label ?? 'Blanko';

  const currentPageTitle =
    notebook.sourceType === 'foto-skript'
      ? notebook.imagePages?.[currentPage - 1]?.title
      : currentCustomPage?.title
      ? currentCustomPage.title
      : isBuiltInBlankPad
      ? `${currentTemplateLabel} · Seite ${currentPage} von ${totalPages}`
      : `Seite ${currentPage} von ${totalPages}`;

  const pageAnnotationCount =
    currentAnnotations.strokes.length +
    currentAnnotations.stickyNotes.length +
    currentAnnotations.stickers.length +
    (currentAnnotations.textBoxes?.length || 0) +
    (currentAnnotations.images?.length || 0) +
    (currentAnnotations.headerTopic?.trim() ? 1 : 0) +
    (currentAnnotations.headerDate?.trim() ? 1 : 0);

  const bookStickerPages = Array.from({ length: totalPages }, (_, idx) => idx + 1)
    .map((pageNum) => {
      const ann = getPageAnnotations(store, notebook.id, pageNum);
      return { pageNum, stickers: ann.stickers, stickies: ann.stickyNotes };
    })
    .filter((entry) => entry.stickers.length > 0);

  const totalBookStickers = bookStickerPages.reduce((sum, p) => sum + p.stickers.length, 0);

  const allBookNotes = useMemo(() => {
    const items: {
      notebookId: string;
      pageNumber: number;
      kind: 'sticky' | 'text' | 'header';
      id: string;
      text: string;
    }[] = [];
    for (let p = 1; p <= totalPages; p++) {
      const ann = getPageAnnotations(store, notebook.id, p);
      const headerTopic = (ann.headerTopic || '').trim();
      const headerDate = (ann.headerDate || '').trim();
      if (headerTopic || headerDate) {
        items.push({
          notebookId: notebook.id,
          pageNumber: p,
          kind: 'header',
          id: `hdr-${p}`,
          text: [headerTopic, headerDate].filter(Boolean).join(' · '),
        });
      }
      for (const sticky of ann.stickyNotes) {
        const txt = (sticky.text || '').trim();
        items.push({
          notebookId: notebook.id,
          pageNumber: p,
          kind: 'sticky',
          id: sticky.id,
          text: txt || '(Leerer Klebezettel)',
        });
      }
      for (const box of ann.textBoxes || []) {
        const txt = (box.text || '').replace(/\u200B/g, '').trim();
        if (txt) {
          items.push({
            notebookId: notebook.id,
            pageNumber: p,
            kind: 'text',
            id: box.id,
            text: txt,
          });
        }
      }
    }
    return items;
  }, [store, notebook.id, totalPages]);

  const filteredBookNotes = useMemo(() => {
    if (!noteSearchQuery.trim()) return allBookNotes;
    return searchNotebookNotes(store, notebook.id, totalPages, noteSearchQuery);
  }, [allBookNotes, noteSearchQuery, store, notebook.id, totalPages]);

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
              onClick={() => {
                if (showThumbnails && sidebarTab === 'pages') {
                  setShowThumbnails(false);
                } else {
                  setSidebarTab('pages');
                  setShowThumbnails(true);
                }
              }}
              className={`p-2 rounded-xl transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0 ${
                showThumbnails && sidebarTab === 'pages'
                  ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={`Seitenübersicht ein-/ausblenden (G oder ${cmdLabel}${shiftLabel}S)`}
              aria-label="Seitenübersicht"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (showThumbnails && sidebarTab === 'stickers') {
                  setShowThumbnails(false);
                } else {
                  setSidebarTab('stickers');
                  setShowThumbnails(true);
                }
              }}
              className={`inline-flex items-center gap-1 px-2 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px] shrink-0 ${
                showThumbnails && sidebarTab === 'stickers'
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Sticker-Übersicht dieses Hefts anzeigen"
              aria-label="Sticker-Übersicht"
            >
              <Sticker className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {totalBookStickers > 0 && (
                <span className="text-[11px] font-bold tabular-nums">{totalBookStickers}</span>
              )}
            </button>

            <button
              onClick={() => {
                if (showThumbnails && sidebarTab === 'notes') {
                  setShowThumbnails(false);
                } else {
                  setSidebarTab('notes');
                  setShowThumbnails(true);
                }
              }}
              className={`inline-flex items-center gap-1 px-2 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[40px] shrink-0 ${
                showThumbnails && sidebarTab === 'notes'
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Haftnotizen & Freitexte in diesem Heft durchsuchen"
              aria-label="Notiz-Suche"
            >
              <Search className="w-4 h-4 text-amber-500" />
              {allBookNotes.length > 0 && (
                <span className="text-[11px] font-bold tabular-nums">{allBookNotes.length}</span>
              )}
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
                title="Vorherige Seite (←)"
                aria-label="Vorherige Seite"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {isEditingPageNum ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const parsed = parseInt(pageJumpInput, 10);
                    if (Number.isFinite(parsed) && parsed >= 1) {
                      goToPage(parsed);
                    }
                    setIsEditingPageNum(false);
                  }}
                  className="flex items-center gap-1 px-1"
                >
                  <input
                    ref={pageJumpInputRef}
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageJumpInput}
                    onChange={(e) => setPageJumpInput(e.target.value)}
                    onBlur={() => {
                      const parsed = parseInt(pageJumpInput, 10);
                      if (Number.isFinite(parsed) && parsed >= 1) {
                        goToPage(parsed);
                      }
                      setIsEditingPageNum(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.stopPropagation();
                        setIsEditingPageNum(false);
                      }
                    }}
                    aria-label="Seitenzahl eingeben"
                    className="w-12 px-1.5 py-0.5 text-center text-xs font-bold rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-indigo-400 focus:outline-none tabular-nums"
                  />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                    / {totalPages}
                  </span>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPageJumpInput(String(currentPage));
                    setIsEditingPageNum(true);
                    window.setTimeout(() => {
                      pageJumpInputRef.current?.focus();
                      pageJumpInputRef.current?.select();
                    }, 0);
                  }}
                  className="px-2 py-1 rounded-md text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700/80 tabular-nums whitespace-nowrap cursor-text transition-colors"
                  title="Klicken, um direkt zu einer Seite zu springen"
                >
                  {currentPage} / {totalPages}
                </button>
              )}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer min-h-[36px] whitespace-nowrap"
                title="Nächste Seite (→)"
                aria-label="Nächste Seite"
              >
                <span className="hidden md:inline">Nächste</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {(isBuiltInBlankPad || notebook.isCustom) && onQuickAddBlankPage && (
              <button
                type="button"
                onClick={() =>
                  onQuickAddBlankPage(notebook, {
                    template: currentBlankTemplate,
                    paperColor: currentPaperColor,
                    showDateHeader: currentShowDateHeader,
                  })
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-colors cursor-pointer min-h-[36px] whitespace-nowrap shrink-0"
                title={`Neue Notizseite (${currentTemplateLabel} · ${currentPaperPalette.label}) hinten anfügen`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Notizseite</span>
              </button>
            )}

            {notebook.isCustom && onOpenAppendPages && (
              <button
                type="button"
                onClick={onOpenAppendPages}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-colors cursor-pointer min-h-[36px] whitespace-nowrap shrink-0"
                title="Weitere PDFs, Fotos oder leere Notizseiten hinten anfügen"
              >
                <FilePlus2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+ Seiten</span>
              </button>
            )}

            <button
              type="button"
              onClick={async () => {
                setPdfExportError(null);
                setIsExportingPdf(true);
                try {
                  await exportNotebookAsPdf(notebook, store, (cur, tot) => {
                    setPdfProgress({ current: cur, total: tot });
                  });
                } catch (err) {
                  console.error('PDF-Export fehlgeschlagen:', err);
                  setPdfExportError(
                    err instanceof Error
                      ? err.message
                      : 'PDF-Export konnte nicht abgeschlossen werden.'
                  );
                } finally {
                  setIsExportingPdf(false);
                  setPdfProgress(null);
                }
              }}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-colors cursor-pointer min-h-[36px] whitespace-nowrap shrink-0 disabled:opacity-50"
              title="Gesamtes Heft mit allen Markierungen & Notizen als PDF exportieren"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">
                    {pdfProgress ? `S. ${pdfProgress.current}/${pdfProgress.total}` : 'PDF...'}
                  </span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Als PDF</span>
                </>
              )}
            </button>
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
              title="Hand / Notizen & Sticker verschieben (1)"
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
              title="Textmarker (2 – nochmal tippen für Farbe & Breite)"
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
              title="Freihand-Stift (3 – nochmal tippen für Farbe & Stärke)"
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
              title="Radierer für Stift & Textmarker (4)"
            >
              <Eraser className="w-4 h-4" />
              <span className="hidden md:inline">Radierer</span>
            </button>

            <button
              onClick={() => selectTool('text')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'text'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Textfeld einfügen & tippen (5 – nochmal tippen für Farbe & Größe)"
            >
              <Type className="w-4 h-4" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0"
                style={{ backgroundColor: textColor }}
              />
              <span className="hidden md:inline">Text</span>
            </button>

            <input
              ref={insertImageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                e.target.value = '';
                if (files.length > 0) {
                  handleFilesSelectedForInsert(files);
                }
              }}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => insertImageInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0"
              title={`Bild oder Foto auf diese Seite einfügen (${cmdLabel}V)`}
            >
              <ImagePlus className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span className="hidden sm:inline">Bild</span>
            </button>

            <button
              onClick={() => selectTool('sticky')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                activeTool === 'sticky'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Klebezettel an Stelle heften (6 – nochmal tippen für Farbe)"
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
              title="Lern-Sticker auf Seite kleben (7)"
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
                  ? `Apple Pencil Schutz aktiv (${shiftLabel}P): Nur Stift zeichnet, Finger scrollen & zoomen`
                  : `Apple Pencil Modus aktivieren (${shiftLabel}P)`
              }
              aria-pressed={pencilOnlyMode}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nur Stift</span>
            </button>
          </div>

          {/* Right Group: Undo/Redo, Rotate, Zoom, Clear, Shortcuts, Fullscreen */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title={`Rückgängig (${cmdLabel}Z)`}
              aria-label={`Rückgängig (${cmdLabel}Z)`}
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title={`Wiederholen (${cmdLabel}${shiftLabel}Z oder ${cmdLabel}Y)`}
              aria-label={`Wiederholen (${cmdLabel}${shiftLabel}Z)`}
            >
              <Redo2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleRotatePage}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title={`Aktuelle Seite um 90° drehen (${shiftLabel}R)`}
              aria-label="Seite drehen"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title={`Herauszoomen (${cmdLabel}-)`}
                aria-label="Herauszoomen"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 tabular-nums cursor-pointer"
                title={`Auf Seitenbreite einpassen (${cmdLabel}0)`}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title={`Hineinzoomen (${cmdLabel}+)`}
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
              type="button"
              onClick={() => setShowShortcutsModal(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title={`Tastaturkürzel anzeigen (? oder ${cmdLabel}/)`}
              aria-label="Tastaturkürzel anzeigen"
            >
              <Keyboard className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowDisplaySettingsModal(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="MacBook, Auflösung & Trackpad-Sicherheit anpassen"
              aria-label="MacBook & Anzeige-Einstellungen"
            >
              <Laptop className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[38px] whitespace-nowrap shrink-0 ${
                isFullscreen
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={
                isFullscreen
                  ? 'Vollbild beenden (Esc oder F)'
                  : `Vollbild mit Toolbar öffnen (F oder ${cmdLabel}${shiftLabel}F)`
              }
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
                <ScrollableColorStrip
                  mode="highlighter"
                  variant="toolbar"
                  selectedColor={highlighterColor}
                  onSelectColor={setHighlighterColor}
                />
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
                <ScrollableColorStrip
                  variant="toolbar"
                  selectedColor={penColor}
                  onSelectColor={setPenColor}
                />
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

            {openToolPopover === 'text' && (
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    Textfarbe:
                  </span>
                  <ScrollableColorStrip
                    variant="toolbar"
                    selectedColor={textColor}
                    onSelectColor={setTextColor}
                  />
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <div className="flex items-center gap-1">
                    {[
                      { label: 'Klein', s: 1.5 },
                      { label: 'Normal', s: 2.0 },
                      { label: 'Groß', s: 2.8 },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setTextSize(opt.s)}
                        className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                          textSize === opt.s
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={() => setShowTextStyleBar((prev) => !prev)}
                    aria-expanded={showTextStyleBar}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold border transition-colors cursor-pointer ${
                      showTextStyleBar ||
                      textBold ||
                      textItalic ||
                      textUnderline ||
                      textStrikethrough ||
                      textBackgroundStyle !== 'white'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title="Schriftstil (Fett, Kursiv, Unterstrichen, Hintergrund) aufklappen"
                  >
                    <span>Stil</span>
                    {(textBold ||
                      textItalic ||
                      textUnderline ||
                      textStrikethrough ||
                      textBackgroundStyle !== 'white') && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        showTextStyleBar ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {showTextStyleBar && (
                  <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">
                      Schriftstil (Standard):
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setTextBold((p) => !p)}
                        aria-pressed={textBold}
                        title={`Fett (${cmdLabel}B beim Tippen)`}
                        aria-label="Fett"
                        className={`w-8 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          textBold
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextItalic((p) => !p)}
                        aria-pressed={textItalic}
                        title={`Kursiv (${cmdLabel}I beim Tippen)`}
                        aria-label="Kursiv"
                        className={`w-8 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          textItalic
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextUnderline((p) => !p)}
                        aria-pressed={textUnderline}
                        title={`Unterstrichen (${cmdLabel}U beim Tippen)`}
                        aria-label="Unterstrichen"
                        className={`w-8 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          textUnderline
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Underline className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setTextStrikethrough((p) => !p)}
                        aria-pressed={textStrikethrough}
                        title={`Durchgestrichen (${shiftLabel}${cmdLabel}X beim Tippen)`}
                        aria-label="Durchgestrichen"
                        className={`w-8 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          textStrikethrough
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Strikethrough className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <div className="flex items-center gap-1" role="group" aria-label="Texthintergrund">
                      <span className="font-semibold text-slate-500 dark:text-slate-400 mr-0.5">
                        Hintergrund:
                      </span>
                      {(
                        [
                          { id: 'white', label: 'Weiß' },
                          { id: 'paper', label: 'Papier' },
                          { id: 'transparent', label: 'Transp.' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTextBackgroundStyle(opt.id)}
                          className={`px-2 py-1 rounded-lg font-semibold border transition-colors cursor-pointer ${
                            textBackgroundStyle === opt.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
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

                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

                {/* Sticker Size & Transparency Controls */}
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                    <span>Größe:</span>
                    <input
                      type="range"
                      min={60}
                      max={180}
                      step={5}
                      value={Math.round(stickerScale * 100)}
                      onChange={(e) => setStickerScale(Number(e.target.value) / 100)}
                      className="w-20 sm:w-24 accent-indigo-600 cursor-pointer"
                      aria-label="Sticker-Größe"
                    />
                    <span className="tabular-nums font-bold text-slate-800 dark:text-slate-100 w-9 text-right">
                      {Math.round(stickerScale * 100)}%
                    </span>
                  </label>

                  <label className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                    <span>Transparenz:</span>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      step={5}
                      value={Math.round((1 - stickerOpacity) * 100)}
                      onChange={(e) =>
                        setStickerOpacity(+(1 - Number(e.target.value) / 100).toFixed(2))
                      }
                      className="w-20 sm:w-24 accent-indigo-600 cursor-pointer"
                      aria-label="Sticker-Transparenz"
                    />
                    <span className="tabular-nums font-bold text-slate-800 dark:text-slate-100 w-8 text-right">
                      {Math.round((1 - stickerOpacity) * 100)}%
                    </span>
                  </label>
                </div>
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

        {/* Inline Error Notice when Local Image Insertion or PDF Export Fails */}
        {(imageInsertError || pdfExportError) && (
          <div className="mt-2 pt-2 border-t border-rose-200 dark:border-rose-900/60 flex items-center justify-between gap-2 text-xs text-rose-700 dark:text-rose-300">
            <span className="font-semibold">{imageInsertError || pdfExportError}</span>
            <button
              type="button"
              onClick={() => {
                setImageInsertError(null);
                setPdfExportError(null);
              }}
              className="p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/50 cursor-pointer shrink-0"
              aria-label="Fehlermeldung schließen"
            >
              <X className="w-3.5 h-3.5" />
            </button>
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
            className={`w-52 sm:w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 space-y-2.5 shrink-0 ${
              isFullscreen ? 'max-h-full' : 'max-h-[75vh]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg flex-1 min-w-0">
                <button
                  onClick={() => setSidebarTab('pages')}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer truncate ${
                    sidebarTab === 'pages'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Seiten
                </button>
                <button
                  onClick={() => setSidebarTab('stickers')}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer tabular-nums truncate ${
                    sidebarTab === 'stickers'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Sticker ({totalBookStickers})
                </button>
                <button
                  onClick={() => setSidebarTab('notes')}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer tabular-nums truncate ${
                    sidebarTab === 'notes'
                      ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Notizen ({allBookNotes.length})
                </button>
              </div>
              <button
                onClick={() => setShowThumbnails(false)}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
                aria-label="Übersicht schließen"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {sidebarTab === 'pages' ? (
              <div className="space-y-2.5">
                {(canEditPages || canShowLayoutPanel) && (
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
                    {canEditPages && (
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditPagesOpen((prev) => {
                              const next = !prev;
                              if (!next) {
                                setConfirmDeletePageNum(null);
                                setDragSourcePageNum(null);
                                setDragOverPageNum(null);
                              }
                              return next;
                            });
                          }}
                          aria-expanded={isEditPagesOpen}
                          className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 text-left transition-colors cursor-pointer ${
                            isEditPagesOpen
                              ? 'bg-indigo-50/90 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-200'
                              : 'hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            {isEditPagesOpen ? (
                              <ChevronDown className="w-3.5 h-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            )}
                            <Pencil className="w-3 h-3 shrink-0 opacity-80" />
                            <span className="text-[11px] font-bold truncate">Editieren</span>
                          </span>
                          <span
                            className={`text-[10px] font-semibold shrink-0 ${
                              isEditPagesOpen
                                ? 'text-indigo-600 dark:text-indigo-300'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {isEditPagesOpen ? 'Aktiv' : 'Sortieren & Löschen'}
                          </span>
                        </button>

                        {isEditPagesOpen && (
                          <div className="px-2.5 pb-2 pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/50 space-y-1">
                            {totalPages > 1 ? (
                              <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                                Seiten per Drag & Drop oder Pfeile verschieben. Papierkorb löscht nach Sicherheitsabfrage.
                              </p>
                            ) : (
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                                Mindestens 1 Seite bleibt erhalten. Füge weitere Seiten hinzu, um sie zu verschieben oder zu löschen.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {canShowLayoutPanel && onChangePageLayout && (
                      <div className={canEditPages ? 'border-t border-slate-200/80 dark:border-slate-700/80' : ''}>
                        <button
                          type="button"
                          onClick={() => setIsLayoutPanelOpen((prev) => !prev)}
                          aria-expanded={isLayoutPanelOpen}
                          className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 text-left transition-colors cursor-pointer ${
                            isLayoutPanelOpen
                              ? 'bg-indigo-50/90 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-200'
                              : 'hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            {isLayoutPanelOpen ? (
                              <ChevronDown className="w-3.5 h-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            )}
                            <span className="text-[11px] font-bold truncate">Seitenlayout</span>
                          </span>
                          <span className="flex items-center gap-1.5 shrink-0">
                            {isCurrentPageBlankLayout && currentPaperColor !== 'white' && (
                              <span
                                className="w-2.5 h-2.5 rounded-full border shrink-0"
                                style={{
                                  backgroundColor: currentPaperPalette.bgHex,
                                  borderColor: currentPaperPalette.marginHex,
                                }}
                                title={`Papierfarbe: ${currentPaperPalette.label}`}
                              />
                            )}
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                              {isCurrentPageBlankLayout ? currentTemplateLabel : 'Foto / PDF'}
                            </span>
                          </span>
                        </button>

                        {isLayoutPanelOpen && (
                          <div className="px-2 pb-2 pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/50 space-y-2">
                            <div className="flex items-center justify-between gap-1 px-0.5">
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                                Vorlage für Seite {currentPage}
                              </span>
                            </div>

                            {isCurrentPageBlankLayout ? (
                              <>
                                <div className="grid grid-cols-2 gap-1">
                                  {BLANK_PAGE_TEMPLATES.map((tpl) => {
                                    const active = currentBlankTemplate === tpl.id;
                                    const previewLineColor = active
                                      ? 'rgba(255,255,255,0.85)'
                                      : currentPaperPalette.lineHex;
                                    const previewDotColor = active
                                      ? 'rgba(255,255,255,0.9)'
                                      : currentPaperPalette.dotHex;
                                    return (
                                      <button
                                        key={tpl.id}
                                        type="button"
                                        onClick={() =>
                                          applySinglePageLayoutChange(
                                            tpl.id,
                                            currentPaperColor,
                                            currentShowDateHeader
                                          )
                                        }
                                        title={tpl.description}
                                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                                          active
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                                        }`}
                                      >
                                        <span
                                          aria-hidden="true"
                                          style={
                                            !active
                                              ? {
                                                  backgroundColor: currentPaperPalette.bgHex,
                                                  borderColor: currentPaperPalette.swatchBorder,
                                                }
                                              : undefined
                                          }
                                          className={`w-3.5 h-4 rounded-[2px] border shrink-0 relative overflow-hidden ${
                                            active ? 'border-white/70 bg-white/15' : ''
                                          }`}
                                        >
                                          {tpl.id === 'lined' && (
                                            <span className="absolute inset-x-0.5 top-1 flex flex-col gap-[2px]">
                                              <span
                                                className="h-[1px] w-full"
                                                style={{ backgroundColor: previewLineColor }}
                                              />
                                              <span
                                                className="h-[1px] w-full"
                                                style={{ backgroundColor: previewLineColor }}
                                              />
                                              <span
                                                className="h-[1px] w-full"
                                                style={{ backgroundColor: previewLineColor }}
                                              />
                                            </span>
                                          )}
                                          {tpl.id === 'grid' && (
                                            <span
                                              className="absolute inset-0"
                                              style={{
                                                backgroundImage: `linear-gradient(to right, ${previewLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${previewLineColor} 1px, transparent 1px)`,
                                                backgroundSize: '4px 4px',
                                              }}
                                            />
                                          )}
                                          {tpl.id === 'dotted' && (
                                            <span
                                              className="absolute inset-0"
                                              style={{
                                                backgroundImage: `radial-gradient(${previewDotColor} 0.75px, transparent 0.75px)`,
                                                backgroundSize: '3.5px 3.5px',
                                              }}
                                            />
                                          )}
                                        </span>
                                        <span className="truncate">{tpl.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Harmonized Pastel Paper Color Picker */}
                                <div className="space-y-1 pt-0.5 border-t border-slate-200/70 dark:border-slate-700/70">
                                  <div className="flex items-center justify-between px-0.5">
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                                      Papierfarbe
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">
                                      {currentPaperPalette.label}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-6 gap-1">
                                    {BLANK_PAPER_COLORS.map((col) => {
                                      const active = currentPaperColor === col.id;
                                      return (
                                        <button
                                          key={col.id}
                                          type="button"
                                          onClick={() =>
                                            applySinglePageLayoutChange(
                                              currentBlankTemplate,
                                              col.id,
                                              currentShowDateHeader
                                            )
                                          }
                                          aria-pressed={active}
                                          aria-label={`Papierfarbe ${col.label}`}
                                          title={`Papierfarbe: ${col.label}`}
                                          style={{
                                            backgroundColor: col.bgHex,
                                            borderColor: active ? '#4f46e5' : col.swatchBorder,
                                          }}
                                          className={`h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
                                            active
                                              ? 'ring-2 ring-indigo-500/40 scale-105 shadow-2xs'
                                              : 'hover:scale-105'
                                          }`}
                                        >
                                          <span
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                              backgroundColor:
                                                col.id === 'white' ? '#cbd5e1' : col.marginHex,
                                            }}
                                          />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <label className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70 cursor-pointer">
                                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                                    <Calendar className="w-3 h-3 text-indigo-500 shrink-0" />
                                    <span>Kopfzeile („Thema / Datum“)</span>
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={currentShowDateHeader}
                                    onChange={(e) =>
                                      applySinglePageLayoutChange(
                                        currentBlankTemplate,
                                        currentPaperColor,
                                        e.target.checked
                                      )
                                    }
                                    className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                                  />
                                </label>

                                {blankPageCountInBook > 1 && (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      await onChangePageLayout(
                                        notebook,
                                        currentPage,
                                        currentBlankTemplate,
                                        true,
                                        currentPaperColor,
                                        currentShowDateHeader
                                      );
                                      setLayoutAppliedAllNotice(true);
                                      window.setTimeout(() => setLayoutAppliedAllNotice(false), 1800);
                                    }}
                                    className="w-full flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/70 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                                  >
                                    {layoutAppliedAllNotice ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        <span>Auf alle Notizseiten übernommen</span>
                                      </>
                                    ) : (
                                      <span className="truncate">
                                        „{currentTemplateLabel} · {currentPaperPalette.label}“ auf alle Notizseiten
                                      </span>
                                    )}
                                  </button>
                                )}
                              </>
                            ) : (
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug px-0.5">
                                Seite {currentPage} ist ein Foto oder PDF. Layout-Wechsel gilt für freie Notizseiten.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {isEditPagesOpen && confirmDeletePageNum !== null && (
                  <div className="sticky top-1 z-20 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 shadow-md space-y-2">
                    <div className="text-[11px] font-bold text-rose-900 dark:text-rose-200 leading-snug">
                      Seite {confirmDeletePageNum} wirklich löschen?
                    </div>
                    <p className="text-[10px] text-rose-700 dark:text-rose-300 leading-snug">
                      Alle Notizen und Zeichnungen auf dieser Seite werden dauerhaft entfernt.
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={isDeletingPage}
                        onClick={() => handleConfirmDeletePage(confirmDeletePageNum)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        {isDeletingPage ? 'Lösche...' : 'Löschen'}
                      </button>
                      <button
                        type="button"
                        disabled={isDeletingPage}
                        onClick={() => setConfirmDeletePageNum(null)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                    const pageAnn = getPageAnnotations(store, notebook.id, pageNum);
                    const hasAny =
                      pageAnn.strokes.length > 0 ||
                      pageAnn.stickyNotes.length > 0 ||
                      pageAnn.stickers.length > 0 ||
                      (pageAnn.textBoxes?.length || 0) > 0 ||
                      (pageAnn.images?.length || 0) > 0 ||
                      Boolean(pageAnn.headerTopic?.trim() || pageAnn.headerDate?.trim());
                    const imgMeta =
                      notebook.sourceType === 'foto-skript'
                        ? notebook.imagePages?.[pageNum - 1]
                        : undefined;
                    const customMeta =
                      notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko'
                        ? notebook.customPages?.[pageNum - 1]
                        : undefined;
                    const isDeleteTarget = isEditPagesOpen && confirmDeletePageNum === pageNum;
                    const isDraggableCard =
                      isEditPagesOpen && canMovePages && totalPages > 1 && !isReorderingPage && !isDeletingPage;
                    const isDraggingThis = dragSourcePageNum === pageNum;
                    const isDropTarget =
                      isEditPagesOpen &&
                      dragOverPageNum === pageNum &&
                      dragSourcePageNum !== null &&
                      dragSourcePageNum !== pageNum;

                    return (
                      <div
                        key={pageNum}
                        draggable={isDraggableCard}
                        onDragStart={(e) => {
                          if (!isDraggableCard) {
                            e.preventDefault();
                            return;
                          }
                          setDragSourcePageNum(pageNum);
                          setDragOverPageNum(null);
                          e.dataTransfer.effectAllowed = 'move';
                          e.dataTransfer.setData('text/plain', String(pageNum));
                        }}
                        onDragOver={(e) => {
                          if (!isDraggableCard || dragSourcePageNum === null) return;
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                          if (dragOverPageNum !== pageNum) {
                            setDragOverPageNum(pageNum);
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverPageNum === pageNum) {
                            setDragOverPageNum(null);
                          }
                        }}
                        onDrop={(e) => {
                          if (!isDraggableCard) return;
                          e.preventDefault();
                          const rawFrom = e.dataTransfer.getData('text/plain');
                          const parsedFrom = parseInt(rawFrom, 10);
                          const sourcePage =
                            dragSourcePageNum ??
                            (Number.isFinite(parsedFrom) ? parsedFrom : null);
                          setDragSourcePageNum(null);
                          setDragOverPageNum(null);
                          if (sourcePage && sourcePage !== pageNum) {
                            handleMovePageInSidebar(sourcePage, pageNum);
                          }
                        }}
                        onDragEnd={() => {
                          setDragSourcePageNum(null);
                          setDragOverPageNum(null);
                        }}
                        className={`group relative flex flex-col rounded-xl border transition-all ${
                          isDraggingThis
                            ? 'opacity-45 scale-95 border-indigo-400'
                            : isDropTarget
                            ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 scale-[1.02]'
                            : isDeleteTarget
                            ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 ring-2 ring-rose-500/30'
                            : currentPage === pageNum
                            ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/30'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        } ${isDraggableCard ? 'cursor-grab active:cursor-grabbing' : ''}`}
                      >
                        <button
                          type="button"
                          onClick={() => goToPage(pageNum)}
                          className="w-full flex flex-col items-center gap-1 p-1.5 cursor-pointer"
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
                                    className={`w-full h-full object-cover object-top pointer-events-none ${rotClass}`}
                                  />
                                );
                              })()
                            ) : (notebook.sourceType === 'eigenes-heft' ||
                                notebook.sourceType === 'blatt-blanko') &&
                              customMeta ? (
                              <CustomPageThumbnail
                                page={customMeta}
                                templateOverride={pageAnn.templateOverride}
                                paperColorOverride={pageAnn.paperColorOverride}
                                showDateHeaderOverride={pageAnn.showDateHeader}
                                rotation={
                                  pageAnn.rotationOverride !== undefined
                                    ? pageAnn.rotationOverride
                                    : customMeta.defaultRotation ?? 0
                                }
                              />
                            ) : notebook.sourceType === 'blatt-blanko' ? (
                              <img
                                src={
                                  renderBlankTemplateToDataUrl(
                                    pageAnn.templateOverride ?? 'blank',
                                    pageAnn.rotationOverride ?? 0,
                                    220,
                                    pageAnn.paperColorOverride ?? 'white',
                                    Boolean(pageAnn.showDateHeader)
                                  ).dataUrl
                                }
                                alt={`Blatt Blanko ${pageNum}`}
                                className="w-full h-full object-cover object-top pointer-events-none"
                              />
                            ) : notebook.pdfUrl ? (
                              <PdfPageThumbnail
                                pdfUrl={notebook.pdfUrl}
                                pageNumber={pageNum}
                                isActive={currentPage === pageNum}
                              />
                            ) : null}

                            {pageAnn.stickers.length > 0 ? (
                              <div className="absolute bottom-1 left-1 flex flex-wrap gap-0.5 max-w-[90%]">
                                {pageAnn.stickers.slice(0, 3).map((stk) => {
                                  const preset = NOTEBOOK_STICKERS.find((p) => p.type === stk.type);
                                  return preset ? (
                                    <span
                                      key={stk.id}
                                      className="px-1 py-0.2 rounded bg-white/95 text-[10px] shadow-xs"
                                      title={preset.label}
                                    >
                                      {preset.symbol}
                                    </span>
                                  ) : null;
                                })}
                              </div>
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

                          {!isEditPagesOpen && (
                            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                              {pageNum}
                            </span>
                          )}
                        </button>

                        {isEditPagesOpen && (
                          <div className="flex items-center justify-between gap-1 px-1.5 pb-1.5 pt-0.5">
                            {canMovePages && totalPages > 1 ? (
                              <button
                                type="button"
                                disabled={pageNum <= 1 || isReorderingPage || isDeletingPage}
                                onClick={() => handleMovePageInSidebar(pageNum, pageNum - 1)}
                                aria-label={`Seite ${pageNum} nach vorne verschieben`}
                                title="Nach vorne verschieben"
                                className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <span className="w-6" aria-hidden="true" />
                            )}

                            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                              {totalPages > 1 && canMovePages && (
                                <GripVertical className="w-2.5 h-2.5 text-slate-400" />
                              )}
                              <span>{pageNum}</span>
                            </span>

                            {canMovePages && totalPages > 1 ? (
                              <button
                                type="button"
                                disabled={pageNum >= totalPages || isReorderingPage || isDeletingPage}
                                onClick={() => handleMovePageInSidebar(pageNum, pageNum + 1)}
                                aria-label={`Seite ${pageNum} nach hinten verschieben`}
                                title="Nach hinten verschieben"
                                className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <span className="w-6" aria-hidden="true" />
                            )}
                          </div>
                        )}

                        {isEditPagesOpen && canDeletePages && totalPages > 1 && (
                          <button
                            type="button"
                            disabled={isDeletingPage || isReorderingPage}
                            onClick={() =>
                              setConfirmDeletePageNum((prev) =>
                                prev === pageNum ? null : pageNum
                              )
                            }
                            aria-label={`Seite ${pageNum} löschen`}
                            title={`Seite ${pageNum} löschen`}
                            className={`absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full flex items-center justify-center border shadow-xs transition-all cursor-pointer ${
                              isDeleteTarget
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white/95 dark:bg-slate-900/95 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-rose-600 hover:border-rose-300'
                            }`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {(isBuiltInBlankPad || notebook.isCustom) && onQuickAddBlankPage && (
                  <button
                    type="button"
                    onClick={() =>
                      onQuickAddBlankPage(notebook, {
                        template: currentBlankTemplate,
                        paperColor: currentPaperColor,
                        showDateHeader: currentShowDateHeader,
                      })
                    }
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/70 dark:bg-amber-950/30 hover:bg-amber-100/80 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Notizseite anhängen</span>
                  </button>
                )}
              </div>
            ) : sidebarTab === 'stickers' ? (
              <div className="space-y-2.5">
                {/* Quick Filter by Sticker Type inside Booklet */}
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSidebarStickerFilter('all')}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer ${
                      sidebarStickerFilter === 'all'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Alle
                  </button>
                  {NOTEBOOK_STICKERS.map((stk) => (
                    <button
                      key={stk.type}
                      onClick={() => setSidebarStickerFilter(stk.type)}
                      title={stk.label}
                      className={`px-1.5 py-1 rounded-md text-[11px] border cursor-pointer transition-all ${stk.bgClass} ${stk.borderClass} ${
                        sidebarStickerFilter === stk.type
                          ? 'ring-2 ring-indigo-500'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      {stk.symbol}
                    </button>
                  ))}
                </div>

                {(() => {
                  const visiblePages = bookStickerPages.filter((entry) =>
                    sidebarStickerFilter === 'all'
                      ? true
                      : entry.stickers.some((s) => s.type === sidebarStickerFilter)
                  );

                  if (visiblePages.length === 0) {
                    return (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center space-y-1.5">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {totalBookStickers === 0
                            ? 'Noch keine Sticker in diesem Heft'
                            : 'Keine passenden Sticker'}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          Wähle oben „Sticker“ und tippe auf eine Textstelle, um sie hier als Lesezeichen zu sehen.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-2">
                      {visiblePages.map((entry) => {
                        const imgTitle =
                          notebook.sourceType === 'foto-skript'
                            ? notebook.imagePages?.[entry.pageNum - 1]?.title
                            : notebook.sourceType === 'eigenes-heft'
                            ? notebook.customPages?.[entry.pageNum - 1]?.title
                            : undefined;

                        return (
                          <button
                            key={entry.pageNum}
                            onClick={() => goToPage(entry.pageNum)}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                              currentPage === entry.pageNum
                                ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                              <span>Seite {entry.pageNum}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            {imgTitle && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {imgTitle}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1">
                              {entry.stickers.map((stk) => {
                                const preset = NOTEBOOK_STICKERS.find(
                                  (p) => p.type === stk.type
                                );
                                if (!preset) return null;
                                return (
                                  <span
                                    key={stk.id}
                                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-extrabold ${preset.bgClass} ${preset.borderClass} ${preset.textClass}`}
                                  >
                                    <span>{preset.symbol}</span>
                                    <span>{preset.shortLabel}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={noteSearchQuery}
                    onChange={(e) => setNoteSearchQuery(e.target.value)}
                    placeholder="Haftnotiz oder Text suchen..."
                    className="w-full pl-7 pr-7 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  {noteSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setNoteSearchQuery('')}
                      aria-label="Suche leeren"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {filteredBookNotes.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center space-y-1.5">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {allBookNotes.length === 0
                        ? 'Noch keine Notizen in diesem Heft'
                        : 'Keine Treffer gefunden'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {allBookNotes.length === 0
                        ? 'Erstelle ein Textfeld oder einen Klebezettel – alle Inhalte sind hier direkt durchsuchbar.'
                        : 'Prüfe deinen Suchbegriff für Haftnotizen und Freitextfelder.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {filteredBookNotes.map((hit) => (
                      <button
                        key={`${hit.kind}-${hit.pageNumber}-${hit.id}`}
                        type="button"
                        onClick={() => goToPage(hit.pageNumber)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          currentPage === hit.pageNumber
                            ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {hit.kind === 'sticky' ? (
                              <StickyNote className="w-3 h-3 text-amber-500" />
                            ) : hit.kind === 'header' ? (
                              <Calendar className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Type className="w-3 h-3 text-indigo-500" />
                            )}
                            <span>
                              {hit.kind === 'sticky'
                                ? 'Klebezettel'
                                : hit.kind === 'header'
                                ? 'Kopfzeile'
                                : 'Freitext'}
                            </span>
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                            S. {hit.pageNumber}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug">
                          {hit.text}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>
        )}

        {/* Scrollable Canvas Stage */}
        <div
          ref={stageContainerRef}
          data-notebook-stage-scroll="true"
          style={{
            overscrollBehaviorX: macSettings.preventSwipeBack ? 'none' : undefined,
          }}
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
            textColor={textColor}
            textSize={textSize}
            textBackgroundStyle={textBackgroundStyle}
            paperPalette={currentPaperPalette}
            textBold={textBold}
            textItalic={textItalic}
            textUnderline={textUnderline}
            textStrikethrough={textStrikethrough}
            stickyColor={stickyColor}
            selectedStickerType={selectedStickerType}
            stickerScale={stickerScale}
            stickerOpacity={stickerOpacity}
            zoom={zoom}
            fitWidth={fitWidth}
            pencilOnlyMode={pencilOnlyMode}
            retinaMode={macSettings.retinaMode}
            blockCanvasContextMenu={macSettings.blockCanvasContextMenu}
            selectedImageSignal={selectedImageSignal}
            deleteSelectionSignal={deleteSelectionSignal}
            clearSelectionSignal={clearSelectionSignal}
            onSelectionChange={setHasStageSelection}
            onCropModalOpenChange={setIsStageCropOpen}
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
                  {activeTool === 'hand' && 'Hand-Modus: Bilder, Textfelder, Klebezettel & Sticker verschieben, skalieren oder antippen.'}
                  {activeTool === 'highlighter' && `Textmarker aktiv: Direkt über wichtige Textstellen streichen. Tipp: ${shiftLabel}gedrückt halten = gerade Linie.`}
                  {activeTool === 'pen' && `Stift aktiv: Handschriftliche Notizen oder Unterstreichungen zeichnen. Tipp: ${shiftLabel}gedrückt halten = gerade Linie.`}
                  {activeTool === 'eraser' && 'Radierer aktiv: Über unerwünschte Stift- oder Markerzüge fahren.'}
                  {activeTool === 'text' && 'Text-Werkzeug aktiv: Auf die gewünschte Stelle tippen, um direkt Text einzugeben.'}
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

      {activePendingCrop && (
        <ImageCropModal
          isOpen={true}
          imageSrc={activePendingCrop.previewUrl}
          imageName={
            pendingCropQueue.length > 1
              ? `${activePendingCrop.file.name} (1/${pendingCropQueue.length})`
              : activePendingCrop.file.name
          }
          confirmLabel="Zuschneiden & Einfügen"
          skipLabel="Ohne Zuschnitt einfügen"
          onClose={() => {
            for (const item of pendingCropQueue) {
              try {
                URL.revokeObjectURL(item.previewUrl);
              } catch {}
            }
            setPendingCropQueue([]);
          }}
          onSkipCrop={async () => {
            const current = activePendingCrop;
            try {
              URL.revokeObjectURL(current.previewUrl);
            } catch {}
            setPendingCropQueue((prev) => prev.slice(1));
            await insertImageFilesToCurrentPage([current.file]);
          }}
          onCropCompleted={async (croppedBlob) => {
            const current = activePendingCrop;
            const file = new File([croppedBlob], current.file.name, {
              type: 'image/jpeg',
            });
            try {
              URL.revokeObjectURL(current.previewUrl);
            } catch {}
            setPendingCropQueue((prev) => prev.slice(1));
            await insertImageFilesToCurrentPage([file]);
          }}
        />
      )}

      <NotebookShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />

      {showDisplaySettingsModal && (
        <div
          onClick={() => setShowDisplaySettingsModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full my-auto flex flex-col max-h-[88vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    MacBook &amp; Anzeige-Optimierung
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Auflösung, Retina-Schärfe &amp; Trackpad-Sicherheit live anpassen
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDisplaySettingsModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
              <MacDisplaySettingsPanel
                inReader
                onApplyDefaultZoomNow={(nextZoom) => setZoom(nextZoom)}
              />
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowDisplaySettingsModal(false)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
