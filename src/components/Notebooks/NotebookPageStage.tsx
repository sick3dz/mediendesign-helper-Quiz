import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  GripHorizontal,
  Minimize2,
  Maximize2,
  X,
  Loader2,
  AlertCircle,
  RotateCw,
  Crop as CropIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ChevronDown,
} from 'lucide-react';
import {
  NotebookDocument,
  NotebookImageElement,
  NotebookSticker,
  NotebookStickerType,
  NotebookStickyNote,
  NotebookStroke,
  NotebookTextBox,
  NotebookTextRun,
  NotebookTool,
  PageAnnotations,
  StickyColor,
  StrokePoint,
} from '../../types/notebook';
import { NOTEBOOK_STICKERS, STICKY_NOTE_STYLES } from '../../data/notebooksData';
import {
  applyStyleToRange,
  extractRunsFromElement,
  getBoxBaseStyle,
  getEffectiveRuns,
  getSelectionOffsetsInElement,
  getStyleAtOffset,
  renderRunsIntoElement,
  ResolvedTextStyle,
  restoreSelectionOffsetsInElement,
  serializeRunsSignature,
} from '../../utils/richTextRuns';
import { renderPdfPageToDataUrl } from '../../services/pdfRenderService';
import {
  getMediaObjectUrl,
  renderBlankTemplateToDataUrl,
  revokeMediaObjectUrl,
  saveEmbeddedImageMedia,
} from '../../services/customNotebookDbService';
import { ImageCropModal } from './ImageCropModal';
import { ScrollableColorStrip } from './ScrollableColorStrip';

interface Props {
  notebook: NotebookDocument;
  pageNumber: number;
  annotations: PageAnnotations;
  activeTool: NotebookTool;
  penColor: string;
  penWidth: number;
  highlighterColor: string;
  highlighterWidth: number;
  textColor: string;
  textSize: number;
  textHasBackground: boolean;
  textBold: boolean;
  textItalic: boolean;
  textUnderline: boolean;
  textStrikethrough: boolean;
  stickyColor: StickyColor;
  selectedStickerType: NotebookStickerType;
  stickerScale: number;
  stickerOpacity: number;
  zoom: number;
  fitWidth: number;
  pencilOnlyMode: boolean;
  selectedImageSignal?: { id: string; seq: number };
  deleteSelectionSignal?: number;
  clearSelectionSignal?: number;
  onSelectionChange?: (hasSelection: boolean) => void;
  onCropModalOpenChange?: (isOpen: boolean) => void;
  onStylusDetected?: () => void;
  onCommitAnnotations: (
    next: PageAnnotations,
    recordHistory?: boolean,
    historyBaseSnapshot?: PageAnnotations
  ) => void;
  onDetectedPdfTotalPages?: (totalPages: number) => void;
}

interface RenderedPageSurface {
  dataUrl: string;
  width: number;
  height: number;
}

function buildSmoothSvgPath(points: StrokePoint[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x.toFixed(2)} ${p.y.toFixed(2)} L ${(p.x + 0.05).toFixed(2)} ${(p.y + 0.05).toFixed(2)}`;
  }
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    d += ` Q ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
  return d;
}

function buildPressureInkPolygonPath(
  points: StrokePoint[],
  baseWidth: number,
  aspectRatio: number
): string | null {
  if (points.length < 3 || !points.some((pt) => typeof pt.p === 'number')) {
    return null;
  }

  const leftPts: { x: number; y: number }[] = [];
  const rightPts: { x: number; y: number }[] = [];
  const isoYFactor = aspectRatio > 0 ? aspectRatio : 0.75;

  for (let i = 0; i < points.length; i++) {
    const prev = points[Math.max(0, i - 1)];
    const curr = points[i];
    const next = points[Math.min(points.length - 1, i + 1)];

    // Smooth pressure across neighboring samples
    const pPrev = prev.p ?? 0.5;
    const pCurr = curr.p ?? 0.5;
    const pNext = next.p ?? 0.5;
    const pSmooth = Math.max(0.15, Math.min(1, (pPrev + pCurr * 2 + pNext) / 4));
    const radius = (baseWidth * (0.48 + 0.88 * pSmooth)) / 2;

    const tx = next.x - prev.x;
    const ty = (next.y - prev.y) / isoYFactor;
    const len = Math.hypot(tx, ty);
    const nx = len > 0.0001 ? -ty / len : 0;
    const ny = len > 0.0001 ? tx / len : 1;

    leftPts.push({
      x: curr.x + nx * radius,
      y: curr.y + ny * radius * isoYFactor,
    });
    rightPts.push({
      x: curr.x - nx * radius,
      y: curr.y - ny * radius * isoYFactor,
    });
  }

  let d = `M ${leftPts[0].x.toFixed(2)} ${leftPts[0].y.toFixed(2)}`;
  for (let i = 1; i < leftPts.length - 1; i++) {
    const mx = (leftPts[i].x + leftPts[i + 1].x) / 2;
    const my = (leftPts[i].y + leftPts[i + 1].y) / 2;
    d += ` Q ${leftPts[i].x.toFixed(2)} ${leftPts[i].y.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const lastLeft = leftPts[leftPts.length - 1];
  const lastRight = rightPts[rightPts.length - 1];
  const endTip = points[points.length - 1];
  d += ` L ${lastLeft.x.toFixed(2)} ${lastLeft.y.toFixed(2)}`;
  d += ` Q ${endTip.x.toFixed(2)} ${endTip.y.toFixed(2)} ${lastRight.x.toFixed(2)} ${lastRight.y.toFixed(2)}`;

  for (let i = rightPts.length - 2; i > 0; i--) {
    const mx = (rightPts[i].x + rightPts[i - 1].x) / 2;
    const my = (rightPts[i].y + rightPts[i - 1].y) / 2;
    d += ` Q ${rightPts[i].x.toFixed(2)} ${rightPts[i].y.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const startTip = points[0];
  d += ` L ${rightPts[0].x.toFixed(2)} ${rightPts[0].y.toFixed(2)}`;
  d += ` Q ${startTip.x.toFixed(2)} ${startTip.y.toFixed(2)} ${leftPts[0].x.toFixed(2)} ${leftPts[0].y.toFixed(2)} Z`;

  return d;
}

function pointToSegmentDistSq(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    return (px - ax) * (px - ax) + (py - ay) * (py - ay);
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const projX = ax + t * dx;
  const projY = ay + t * dy;
  return (px - projX) * (px - projX) + (py - projY) * (py - projY);
}

function isPointNearStroke(pt: StrokePoint, stroke: NotebookStroke, radius: number): boolean {
  const rSq = radius * radius;
  const pts = stroke.points;
  if (pts.length === 0) return false;
  if (pts.length === 1) {
    const dx = pt.x - pts[0].x;
    const dy = pt.y - pts[0].y;
    return dx * dx + dy * dy <= rSq;
  }
  for (let i = 0; i < pts.length - 1; i++) {
    if (pointToSegmentDistSq(pt.x, pt.y, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y) <= rSq) {
      return true;
    }
  }
  return false;
}

interface AutoTextItemProps {
  box: NotebookTextBox;
  fontSizePx: number;
  isDrawTool: boolean;
  isSelected: boolean;
  autoFocus: boolean;
  onSelect: () => void;
  onFocusBox: () => void;
  onClearAutoFocus: () => void;
  onStartDrag: (e: React.PointerEvent<HTMLElement>) => void;
  onUpdateBox: (
    patch: Partial<
      Pick<
        NotebookTextBox,
        'text' | 'runs' | 'color' | 'bold' | 'italic' | 'underline' | 'strikethrough'
      >
    >,
    recordHistory?: boolean
  ) => void;
  onToggleBackground: () => void;
  onDelete: () => void;
  onBlurBox: () => void;
}

const TextBoxOverlayItem: React.FC<AutoTextItemProps> = ({
  box,
  fontSizePx,
  isDrawTool,
  isSelected,
  autoFocus,
  onSelect,
  onFocusBox,
  onClearAutoFocus,
  onStartDrag,
  onUpdateBox,
  onToggleBackground,
  onDelete,
  onBlurBox,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef<boolean>(false);
  const isPickingNativeColorRef = useRef<boolean>(false);
  const lastSyncedSigRef = useRef<string>('');
  const savedOffsetsRef = useRef<{ start: number; end: number; hasSelection: boolean } | null>(null);
  const pendingStyleOverrideRef = useRef<ResolvedTextStyle | null>(null);

  const [isFormatOpen, setIsFormatOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeTypingStyle, setActiveTypingStyle] = useState<ResolvedTextStyle>(() =>
    getBoxBaseStyle(box)
  );

  // Sync incoming box prop into contentEditable DOM only when it didn't originate from our own input
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const base = getBoxBaseStyle(box);
    const runs = getEffectiveRuns(box);
    const sig = `${serializeRunsSignature(runs, base)}|${box.text}`;
    if (sig === lastSyncedSigRef.current) return;

    const prevOffsets = isFocusedRef.current ? getSelectionOffsetsInElement(el) : null;
    renderRunsIntoElement(el, runs, base);
    lastSyncedSigRef.current = sig;

    if (prevOffsets) {
      const maxLen = box.text.length;
      restoreSelectionOffsetsInElement(
        el,
        Math.min(prevOffsets.start, maxLen),
        Math.min(prevOffsets.end, maxLen)
      );
    }

    if (!pendingStyleOverrideRef.current) {
      if (runs.length === 0) {
        setActiveTypingStyle(base);
      } else if (prevOffsets) {
        setActiveTypingStyle(getStyleAtOffset(runs, prevOffsets.end, base));
      } else {
        setActiveTypingStyle(getStyleAtOffset(runs, box.text.length, base));
      }
    }
  }, [box]);

  useEffect(() => {
    if (!isSelected && !isFocused) {
      setIsFormatOpen(false);
    }
  }, [isSelected, isFocused]);

  useEffect(() => {
    if (autoFocus && editorRef.current) {
      const el = editorRef.current;
      el.focus();
      const base = getBoxBaseStyle(box);
      const runs = getEffectiveRuns(box);
      if (runs.length === 0) {
        renderRunsIntoElement(el, [], base, { offset: 0, style: base });
        setActiveTypingStyle(base);
      } else {
        restoreSelectionOffsetsInElement(el, box.text.length, box.text.length);
      }
      onClearAutoFocus();
    }
  }, [autoFocus, box, onClearAutoFocus]);

  const syncCursorStyle = useCallback(
    (clearPendingOverride: boolean) => {
      const el = editorRef.current;
      if (!el) return;
      const offsets = getSelectionOffsetsInElement(el);
      if (offsets) {
        savedOffsetsRef.current = offsets;
      }
      if (clearPendingOverride) {
        pendingStyleOverrideRef.current = null;
      }
      if (pendingStyleOverrideRef.current) return;

      const base = getBoxBaseStyle(box);
      const runs = getEffectiveRuns(box);
      if (runs.length === 0) {
        setActiveTypingStyle(base);
        return;
      }
      const pos = offsets ? offsets.end : box.text.length;
      setActiveTypingStyle(getStyleAtOffset(runs, pos, base));
    },
    [box]
  );

  const applyFormatPatch = useCallback(
    (patch: Partial<ResolvedTextStyle>) => {
      const el = editorRef.current;
      if (!el) return;
      if (!isPickingNativeColorRef.current && document.activeElement !== el) {
        el.focus();
      }

      const offsets = getSelectionOffsetsInElement(el) ?? savedOffsetsRef.current;
      const base = getBoxBaseStyle(box);
      const currentRuns = getEffectiveRuns(box);

      if (offsets && offsets.hasSelection && currentRuns.length > 0) {
        const nextRuns = applyStyleToRange(
          currentRuns,
          offsets.start,
          offsets.end,
          patch,
          base
        );
        const nextText = nextRuns.map((r) => r.text).join('');
        const endStyle = getStyleAtOffset(nextRuns, offsets.end, base);
        const nextSig = `${serializeRunsSignature(nextRuns, base)}|${nextText}`;

        renderRunsIntoElement(el, nextRuns, base);
        if (!isPickingNativeColorRef.current) {
          restoreSelectionOffsetsInElement(el, offsets.start, offsets.end);
        }
        savedOffsetsRef.current = offsets;
        lastSyncedSigRef.current = nextSig;
        pendingStyleOverrideRef.current = endStyle;
        setActiveTypingStyle(endStyle);
        onUpdateBox({ text: nextText, runs: nextRuns }, !isPickingNativeColorRef.current);
        return;
      }

      const nextStyle: ResolvedTextStyle = {
        color: patch.color !== undefined ? patch.color : activeTypingStyle.color,
        bold: patch.bold !== undefined ? patch.bold : activeTypingStyle.bold,
        italic: patch.italic !== undefined ? patch.italic : activeTypingStyle.italic,
        underline: patch.underline !== undefined ? patch.underline : activeTypingStyle.underline,
        strikethrough:
          patch.strikethrough !== undefined
            ? patch.strikethrough
            : activeTypingStyle.strikethrough,
      };

      const caret = offsets ? offsets.start : box.text.length;
      pendingStyleOverrideRef.current = nextStyle;
      setActiveTypingStyle(nextStyle);
      savedOffsetsRef.current = { start: caret, end: caret, hasSelection: false };

      if (!box.text) {
        const nextBase: ResolvedTextStyle = nextStyle;
        const nextSig = `${serializeRunsSignature([], nextBase)}|`;
        lastSyncedSigRef.current = nextSig;
        if (!isPickingNativeColorRef.current) {
          renderRunsIntoElement(el, [], nextBase, { offset: 0, style: nextStyle });
        }
        onUpdateBox(
          {
            color: nextStyle.color,
            bold: nextStyle.bold,
            italic: nextStyle.italic,
            underline: nextStyle.underline,
            strikethrough: nextStyle.strikethrough,
          },
          false
        );
      } else if (!isPickingNativeColorRef.current) {
        renderRunsIntoElement(el, currentRuns, base, {
          offset: caret,
          style: nextStyle,
        });
      }
    },
    [activeTypingStyle, box, onUpdateBox]
  );

  const handleInput = () => {
    const el = editorRef.current;
    if (!el) return;
    const base = getBoxBaseStyle(box);
    const fallbackStyle = pendingStyleOverrideRef.current ?? activeTypingStyle;
    const extracted = extractRunsFromElement(el, box.text ? base : fallbackStyle);

    // If browser collapsed an empty span on the very first typed character, preserve activeTypingStyle
    let runs: NotebookTextRun[] = extracted.runs;
    const text = extracted.text;
    if (
      pendingStyleOverrideRef.current &&
      !box.text &&
      text.length > 0 &&
      runs.length === 1
    ) {
      runs = [{ text, ...pendingStyleOverrideRef.current }];
    }

    const sig = `${serializeRunsSignature(runs, base)}|${text}`;
    lastSyncedSigRef.current = sig;
    pendingStyleOverrideRef.current = null;

    const offsets = getSelectionOffsetsInElement(el);
    if (offsets) {
      savedOffsetsRef.current = offsets;
    }

    onUpdateBox({ text, runs }, false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const plain = e.clipboardData.getData('text/plain');
    if (!plain) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();

    const span = document.createElement('span');
    span.style.color = activeTypingStyle.color;
    span.style.fontWeight = activeTypingStyle.bold ? '700' : '500';
    span.style.fontStyle = activeTypingStyle.italic ? 'italic' : 'normal';
    const deco: string[] = [];
    if (activeTypingStyle.underline) deco.push('underline');
    if (activeTypingStyle.strikethrough) deco.push('line-through');
    span.style.textDecorationLine = deco.length > 0 ? deco.join(' ') : 'none';
    span.textContent = plain;

    range.insertNode(span);
    range.setStartAfter(span);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    handleInput();
  };

  const hasBg = box.hasBackground ?? true;
  const isNearTopEdge = box.y < 20;
  const hasAnyFormatting =
    activeTypingStyle.bold ||
    activeTypingStyle.italic ||
    activeTypingStyle.underline ||
    activeTypingStyle.strikethrough;

  return (
    <div
      ref={wrapperRef}
      style={{ left: `${box.x}%`, top: `${box.y}%` }}
      onPointerDown={(e) => {
        if (isDrawTool) return;
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute group max-w-[78%] ${
        isDrawTool ? 'pointer-events-none opacity-95' : 'pointer-events-auto'
      }`}
    >
      {/* Compact Floating Mini Toolbar on select/hover */}
      {!isDrawTool && (
        <div
          className={`absolute -top-7 left-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-t-lg bg-slate-900/95 text-white shadow-md transition-opacity z-20 ${
            isSelected || isFormatOpen
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
          }`}
        >
          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              onStartDrag(e);
            }}
            title="Textfeld verschieben"
            aria-label="Textfeld verschieben"
            className="p-1 rounded hover:bg-white/15 cursor-grab active:cursor-grabbing flex items-center"
          >
            <GripHorizontal className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsFormatOpen((prev) => !prev);
            }}
            title="Schriftformat & Farbe ein-/ausklappen"
            aria-expanded={isFormatOpen}
            className={`px-1.5 py-0.5 rounded flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
              isFormatOpen || hasAnyFormatting
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-white/15 text-white'
            }`}
          >
            <span>Aa</span>
            <span
              className="w-2 h-2 rounded-full border border-white/60 shrink-0"
              style={{ backgroundColor: activeTypingStyle.color }}
            />
            <ChevronDown
              className={`w-3 h-3 transition-transform ${isFormatOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Textfeld löschen"
            aria-label="Textfeld löschen"
            className="p-1 rounded hover:bg-rose-500/80 text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Collapsible Aa Format Popover */}
          {isFormatOpen && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              onPointerDown={(e) => e.stopPropagation()}
              className={`absolute left-0 ${
                isNearTopEdge ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
              } p-2 rounded-xl bg-slate-900/95 border border-slate-700/90 shadow-xl flex flex-col gap-2 min-w-[252px] z-30`}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyFormatPatch({ bold: !activeTypingStyle.bold });
                    }}
                    title="Fett (⌘B)"
                    aria-label="Fett"
                    aria-pressed={activeTypingStyle.bold}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      activeTypingStyle.bold
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-slate-100'
                    }`}
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyFormatPatch({ italic: !activeTypingStyle.italic });
                    }}
                    title="Kursiv (⌘I)"
                    aria-label="Kursiv"
                    aria-pressed={activeTypingStyle.italic}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      activeTypingStyle.italic
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-slate-100'
                    }`}
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyFormatPatch({ underline: !activeTypingStyle.underline });
                    }}
                    title="Unterstrichen (⌘U)"
                    aria-label="Unterstrichen"
                    aria-pressed={activeTypingStyle.underline}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      activeTypingStyle.underline
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-slate-100'
                    }`}
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyFormatPatch({ strikethrough: !activeTypingStyle.strikethrough });
                    }}
                    title="Durchgestrichen (⇧⌘X)"
                    aria-label="Durchgestrichen"
                    aria-pressed={activeTypingStyle.strikethrough}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      activeTypingStyle.strikethrough
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-slate-100'
                    }`}
                  >
                    <Strikethrough className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBackground();
                  }}
                  title={hasBg ? 'Hintergrund transparent machen' : 'Weißen Hintergrund aktivieren'}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-100 cursor-pointer whitespace-nowrap"
                >
                  {hasBg ? 'Weiß' : 'Transp.'}
                </button>
              </div>

              <div className="flex flex-col gap-1 pt-1.5 border-t border-white/10">
                <ScrollableColorStrip
                  variant="floating"
                  preserveTextFocus
                  selectedColor={activeTypingStyle.color}
                  onSelectColor={(color) => applyFormatPatch({ color })}
                  onBeforeNativeColorPicker={() => {
                    isPickingNativeColorRef.current = true;
                    const el = editorRef.current;
                    if (el) {
                      const off = getSelectionOffsetsInElement(el);
                      if (off) savedOffsetsRef.current = off;
                    }
                  }}
                  onAfterNativeColorPicker={() => {
                    isPickingNativeColorRef.current = false;
                    requestAnimationFrame(() => {
                      const el = editorRef.current;
                      if (!el || !isSelected) return;
                      el.focus();
                      const saved = savedOffsetsRef.current;
                      if (!saved) return;
                      if (saved.hasSelection) {
                        restoreSelectionOffsetsInElement(el, saved.start, saved.end);
                      } else if (pendingStyleOverrideRef.current) {
                        renderRunsIntoElement(
                          el,
                          getEffectiveRuns(box),
                          getBoxBaseStyle(box),
                          {
                            offset: saved.start,
                            style: pendingStyleOverrideRef.current,
                          }
                        );
                      }
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {!box.text && (
          <span
            aria-hidden="true"
            style={{ fontSize: `${fontSizePx}px`, lineHeight: 1.35 }}
            className="pointer-events-none select-none absolute left-2 top-1 text-slate-400/75 font-medium"
          >
            Text tippen...
          </span>
        )}
        <div
          ref={editorRef}
          contentEditable={!isDrawTool}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Freitextfeld"
          onFocus={() => {
            isFocusedRef.current = true;
            setIsFocused(true);
            onSelect();
            onFocusBox();
            syncCursorStyle(false);
          }}
          onPointerDown={(e) => {
            if (isDrawTool) return;
            e.stopPropagation();
          }}
          onMouseUp={() => syncCursorStyle(true)}
          onKeyDown={(e) => {
            if (isDrawTool) return;
            const mod = e.metaKey || e.ctrlKey;
            const key = e.key.toLowerCase();
            if (mod && !e.altKey && !e.shiftKey && key === 'b') {
              e.preventDefault();
              e.stopPropagation();
              applyFormatPatch({ bold: !activeTypingStyle.bold });
              return;
            }
            if (mod && !e.altKey && !e.shiftKey && key === 'i') {
              e.preventDefault();
              e.stopPropagation();
              applyFormatPatch({ italic: !activeTypingStyle.italic });
              return;
            }
            if (mod && !e.altKey && !e.shiftKey && key === 'u') {
              e.preventDefault();
              e.stopPropagation();
              applyFormatPatch({ underline: !activeTypingStyle.underline });
              return;
            }
            if (mod && !e.altKey && e.shiftKey && key === 'x') {
              e.preventDefault();
              e.stopPropagation();
              applyFormatPatch({ strikethrough: !activeTypingStyle.strikethrough });
              return;
            }
            if (e.key === 'Enter' && !e.shiftKey) {
              // Insert clean single line break instead of unpredictable browser div blocks when needed
              e.stopPropagation();
            }
          }}
          onKeyUp={(e) => {
            const navKeys = [
              'ArrowLeft',
              'ArrowRight',
              'ArrowUp',
              'ArrowDown',
              'Home',
              'End',
              'PageUp',
              'PageDown',
            ];
            syncCursorStyle(navKeys.includes(e.key));
          }}
          onInput={handleInput}
          onPaste={handlePaste}
          onBlur={(e) => {
            const nextFocused = e.relatedTarget as Node | null;
            if (
              isPickingNativeColorRef.current ||
              (nextFocused && wrapperRef.current?.contains(nextFocused))
            ) {
              return;
            }
            isFocusedRef.current = false;
            setIsFocused(false);
            pendingStyleOverrideRef.current = null;
            onBlurBox();
          }}
          style={{
            color: box.color,
            fontSize: `${fontSizePx}px`,
            lineHeight: 1.35,
            minWidth: `${Math.max(120, fontSizePx * 7)}px`,
            minHeight: `${Math.max(24, Math.round(fontSizePx * 1.35 + 8))}px`,
            WebkitUserSelect: isDrawTool ? 'none' : 'text',
            userSelect: isDrawTool ? 'none' : 'text',
          }}
          className={`min-w-[11rem] max-w-full px-2 py-1 rounded-md font-medium whitespace-pre-wrap break-words focus:outline-hidden transition-shadow ${
            hasBg
              ? 'bg-white/95 shadow-sm border border-slate-200/90'
              : 'bg-transparent border border-transparent'
          } ${
            isSelected && !isDrawTool
              ? 'ring-2 ring-indigo-500/80 border-indigo-400'
              : !isDrawTool
              ? 'group-hover:border-indigo-300/80'
              : ''
          }`}
        />
      </div>
    </div>
  );
};

interface EmbeddedImageItemProps {
  item: NotebookImageElement;
  isInteractive: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onStartDrag: (e: React.PointerEvent<HTMLElement>) => void;
  onStartResize: (e: React.PointerEvent<HTMLElement>) => void;
  onUpdate: (patch: Partial<Pick<NotebookImageElement, 'widthPct' | 'opacity' | 'rotation'>>) => void;
  onDelete: () => void;
  onCrop: () => void;
}

const EmbeddedImageOverlayItem: React.FC<EmbeddedImageItemProps> = ({
  item,
  isInteractive,
  isSelected,
  onSelect,
  onStartDrag,
  onStartResize,
  onUpdate,
  onDelete,
  onCrop,
}) => {
  const [rawUrl, setRawUrl] = useState<string>('');
  const [rotatedUrl, setRotatedUrl] = useState<string>('');
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const retriedRef = useRef<boolean>(false);
  const rot = (((item.rotation ?? 0) % 360) + 360) % 360;

  useEffect(() => {
    retriedRef.current = false;
    let active = true;
    getMediaObjectUrl(item.mediaId).then((url) => {
      if (active && url) setRawUrl(url);
    });
    return () => {
      active = false;
    };
  }, [item.mediaId]);

  useEffect(() => {
    if (!rawUrl || rot === 0) {
      setRotatedUrl('');
      setIsRotating(false);
      return;
    }
    let cancelled = false;
    let createdBlobUrl = '';
    setIsRotating(true);
    const img = new Image();
    if (!rawUrl.startsWith('blob:') && !rawUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || 800;
      const h = img.naturalHeight || 600;
      const isQuarter = rot === 90 || rot === 270;
      const cw = isQuarter ? h : w;
      const ch = isQuarter ? w : h;
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsRotating(false);
        return;
      }
      ctx.translate(cw / 2, ch / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      canvas.toBlob((blob) => {
        if (cancelled) return;
        if (blob) {
          createdBlobUrl = URL.createObjectURL(blob);
          setRotatedUrl(createdBlobUrl);
        } else {
          setRotatedUrl(canvas.toDataURL('image/png'));
        }
        setIsRotating(false);
      }, 'image/png');
    };
    img.onerror = () => {
      if (!cancelled) setIsRotating(false);
    };
    img.src = rawUrl;
    return () => {
      cancelled = true;
      if (createdBlobUrl) {
        try {
          URL.revokeObjectURL(createdBlobUrl);
        } catch {
          // ignore
        }
      }
    };
  }, [rawUrl, rot]);

  const displaySrc = rot !== 0 ? (rotatedUrl || '') : rawUrl;
  const opacity = item.opacity ?? 1;
  const transparencyPct = Math.round((1 - opacity) * 100);
  const showToolbarBelow = item.y < 18;
  const toolbarHorizClass =
    item.x < 24 ? 'left-0' : item.x > 76 ? 'right-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: `${item.widthPct}%`,
      }}
      onPointerDown={(e) => {
        if (!isInteractive) return;
        e.stopPropagation();
        onSelect();
        onStartDrag(e);
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 group select-none ${
        isSelected ? 'z-[8]' : 'z-[5]'
      } ${
        isInteractive
          ? 'pointer-events-auto cursor-grab active:cursor-grabbing'
          : 'pointer-events-none'
      }`}
    >
      {/* Floating Mini Controls for Selected Image */}
      {isSelected && isInteractive && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className={`absolute ${toolbarHorizClass} ${
            showToolbarBelow ? 'top-full mt-2' : 'bottom-full mb-2'
          } flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-900/95 text-white shadow-lg border border-slate-700/80 text-[10px] font-bold whitespace-nowrap z-20 cursor-default`}
        >
          <span className="text-slate-400">Größe</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ widthPct: Math.max(12, Math.round(item.widthPct - 6)) });
            }}
            title="Bild verkleinern"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            −
          </button>
          <span className="tabular-nums min-w-[28px] text-center">
            {Math.round(item.widthPct)}%
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ widthPct: Math.min(95, Math.round(item.widthPct + 6)) });
            }}
            title="Bild vergrößern"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            +
          </button>

          <span className="text-slate-600">|</span>

          <span className="text-slate-400">Transp.</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ opacity: +Math.min(1, opacity + 0.1).toFixed(2) });
            }}
            title="Weniger transparent"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            −
          </button>
          <span className="tabular-nums min-w-[28px] text-center">
            {transparencyPct}%
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ opacity: +Math.max(0.2, opacity - 0.1).toFixed(2) });
            }}
            title="Transparenter machen"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            +
          </button>

          <span className="text-slate-600">|</span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ rotation: (rot + 90) % 360 });
            }}
            title="Bild um 90° drehen"
            aria-label="Bild drehen"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <RotateCw className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCrop();
            }}
            title="Foto zuschneiden"
            aria-label="Foto zuschneiden"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <CropIcon className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Bild entfernen"
            aria-label="Bild entfernen"
            className="w-5 h-5 rounded bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div
        style={{ opacity }}
        className={`relative rounded-md overflow-hidden transition-shadow ${
          isSelected && isInteractive
            ? 'ring-2 ring-indigo-500 shadow-md'
            : isInteractive
            ? 'group-hover:ring-2 group-hover:ring-indigo-300'
            : ''
        }`}
      >
        {displaySrc ? (
          <img
            src={displaySrc}
            alt="Eingefügtes Bild"
            draggable={false}
            onError={() => {
              if (retriedRef.current) return;
              retriedRef.current = true;
              revokeMediaObjectUrl(item.mediaId);
              getMediaObjectUrl(item.mediaId).then((freshUrl) => {
                if (freshUrl) setRawUrl(freshUrl);
              });
            }}
            className="w-full h-auto block pointer-events-none"
          />
        ) : (
          <div
            style={{
              aspectRatio: `${
                rot === 90 || rot === 270
                  ? 1 / Math.max(0.2, item.aspectRatio || 1.333)
                  : Math.max(0.2, item.aspectRatio || 1.333)
              }`,
            }}
            className="w-full bg-slate-100/80 flex items-center justify-center text-slate-400"
            aria-label={isRotating ? 'Bild wird gedreht…' : 'Bild wird geladen…'}
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
      </div>

      {/* Bottom-Right Corner Drag Resize Handle */}
      {isSelected && isInteractive && (
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
            onStartResize(e);
          }}
          title="Ziehen zum Skalieren"
          className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 border-2 border-white shadow-md cursor-nwse-resize flex items-center justify-center z-20"
        />
      )}
    </div>
  );
};

export const NotebookPageStage: React.FC<Props> = ({
  notebook,
  pageNumber,
  annotations,
  activeTool,
  penColor,
  penWidth,
  highlighterColor,
  highlighterWidth,
  textColor,
  textSize,
  textHasBackground,
  textBold,
  textItalic,
  textUnderline,
  textStrikethrough,
  stickyColor,
  selectedStickerType,
  stickerScale,
  stickerOpacity,
  zoom,
  fitWidth,
  pencilOnlyMode,
  selectedImageSignal,
  deleteSelectionSignal,
  clearSelectionSignal,
  onSelectionChange,
  onCropModalOpenChange,
  onStylusDetected,
  onCommitAnnotations,
  onDetectedPdfTotalPages,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [surface, setSurface] = useState<RenderedPageSurface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Active stroke drawing state
  const [draftStroke, setDraftStroke] = useState<NotebookStroke | null>(null);
  const draftStrokeRef = useRef<NotebookStroke | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);
  const isErasingRef = useRef(false);
  const erasedAnyRef = useRef(false);
  const preEraseSnapshotRef = useRef<PageAnnotations | null>(null);
  const latestAnnotationsRef = useRef<PageAnnotations>(annotations);
  latestAnnotationsRef.current = annotations;

  // Newly created sticky notes & text boxes to autofocus
  const [autoFocusStickyId, setAutoFocusStickyId] = useState<string | null>(null);
  const [autoFocusTextId, setAutoFocusTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [activeCropImage, setActiveCropImage] = useState<{
    id: string;
    url: string;
    rotation?: number;
  } | null>(null);

  useEffect(() => {
    if (selectedImageSignal?.id) {
      setSelectedImageId(selectedImageSignal.id);
    }
  }, [selectedImageSignal]);

  useEffect(() => {
    setSelectedStickerId(null);
    setSelectedTextId(null);
    setSelectedImageId(null);
  }, [notebook.id, pageNumber]);

  useEffect(() => {
    onSelectionChange?.(Boolean(selectedImageId || selectedTextId || selectedStickerId));
  }, [selectedImageId, selectedTextId, selectedStickerId, onSelectionChange]);

  useEffect(() => {
    onCropModalOpenChange?.(Boolean(activeCropImage));
  }, [activeCropImage, onCropModalOpenChange]);

  const lastDeleteSignalRef = useRef<number>(deleteSelectionSignal ?? 0);
  useEffect(() => {
    const seq = deleteSelectionSignal ?? 0;
    if (seq === 0 || seq === lastDeleteSignalRef.current) return;
    lastDeleteSignalRef.current = seq;
    const latest = latestAnnotationsRef.current;
    if (selectedImageId) {
      onCommitAnnotations(
        {
          ...latest,
          images: (latest.images || []).filter((img) => img.id !== selectedImageId),
        },
        true
      );
      setSelectedImageId(null);
    } else if (selectedTextId) {
      onCommitAnnotations(
        {
          ...latest,
          textBoxes: (latest.textBoxes || []).filter((t) => t.id !== selectedTextId),
        },
        true
      );
      setSelectedTextId(null);
    } else if (selectedStickerId) {
      onCommitAnnotations(
        {
          ...latest,
          stickers: latest.stickers.filter((s) => s.id !== selectedStickerId),
        },
        true
      );
      setSelectedStickerId(null);
    }
  }, [deleteSelectionSignal, selectedImageId, selectedTextId, selectedStickerId, onCommitAnnotations]);

  const lastClearSignalRef = useRef<number>(clearSelectionSignal ?? 0);
  useEffect(() => {
    const seq = clearSelectionSignal ?? 0;
    if (seq === 0 || seq === lastClearSignalRef.current) return;
    lastClearSignalRef.current = seq;
    setSelectedImageId(null);
    setSelectedTextId(null);
    setSelectedStickerId(null);
  }, [clearSelectionSignal]);

  // Dragging state for Sticky Notes, Stickers, Text Boxes & Embedded Images
  const dragItemRef = useRef<{
    kind: 'sticky' | 'sticker' | 'text' | 'image';
    id: string;
    startClientX: number;
    startClientY: number;
    origX: number;
    origY: number;
    hasMoved: boolean;
    origSnapshot: PageAnnotations;
  } | null>(null);

  const resizeImageRef = useRef<{
    id: string;
    startClientX: number;
    startClientY: number;
    origWidthPct: number;
    hasResized: boolean;
    origSnapshot: PageAnnotations;
  } | null>(null);

  const preEditTextSnapshotRef = useRef<{
    kind: 'text' | 'sticky';
    id: string;
    startText: string;
    snapshot: PageAnnotations;
  } | null>(null);

  const pendingNewTextBoxBaseRef = useRef<{
    id: string;
    snapshot: PageAnnotations;
  } | null>(null);

  const imagePageMeta =
    notebook.sourceType === 'foto-skript'
      ? notebook.imagePages?.[pageNumber - 1]
      : undefined;

  const customPage =
    notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko'
      ? notebook.customPages?.[pageNumber - 1]
      : undefined;

  const baseRotation = imagePageMeta?.defaultRotation ?? customPage?.defaultRotation ?? 0;
  const effectiveRotation =
    annotations.rotationOverride !== undefined ? annotations.rotationOverride : baseRotation;

  // Load and render current page (Photo rotated to upright, PDF page via PDF.js, or Custom hybrid page)
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);

    const loadImageSurface = (
      src: string,
      preferPortrait?: boolean,
      errorMessage: string = 'Bildseite konnte nicht geladen werden.'
    ) => {
      const img = new Image();
      if (!src.startsWith('blob:') && !src.startsWith('data:')) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => {
        if (cancelled) return;
        const rawW = img.naturalWidth || 1200;
        const rawH = img.naturalHeight || 1600;
        // Modern browsers auto-apply EXIF Orientation 6 (naturalWidth < naturalHeight).
        // If an environment ignores EXIF on a known portrait script photo, apply +90° fallback automatically.
        const needsLegacyExifFallback =
          annotations.rotationOverride === undefined &&
          Boolean(preferPortrait) &&
          rawW > rawH;
        const rot = (((effectiveRotation + (needsLegacyExifFallback ? 90 : 0)) % 360) + 360) % 360;
        const isQuarterTurn = rot === 90 || rot === 270;
        const uprightW = isQuarterTurn ? rawH : rawW;
        const uprightH = isQuarterTurn ? rawW : rawH;

        const maxEdge = 2000;
        const scale = Math.min(1, maxEdge / Math.max(uprightW, uprightH));
        const canvasW = Math.max(1, Math.round(uprightW * scale));
        const canvasH = Math.max(1, Math.round(uprightH * scale));

        const canvas = document.createElement('canvas');
        canvas.width = canvasW;
        canvas.height = canvasH;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setLoadError('Zeichenfläche konnte nicht initialisiert werden.');
          setIsLoading(false);
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.save();
        ctx.translate(canvasW / 2, canvasH / 2);
        ctx.rotate((rot * Math.PI) / 180);
        const drawW = Math.round(rawW * scale);
        const drawH = Math.round(rawH * scale);
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setSurface({
          dataUrl,
          width: uprightW,
          height: uprightH,
        });
        setIsLoading(false);
      };
      img.onerror = () => {
        if (cancelled) return;
        setLoadError(errorMessage);
        setIsLoading(false);
      };
      img.src = src;
    };

    if (notebook.sourceType === 'foto-skript' && imagePageMeta) {
      loadImageSurface(
        imagePageMeta.imageUrl,
        imagePageMeta.preferPortrait,
        'Skript-Foto konnte nicht geladen werden.'
      );
    } else if (notebook.sourceType === 'pdf-dokument' && notebook.pdfUrl) {
      renderPdfPageToDataUrl(notebook.pdfUrl, pageNumber, effectiveRotation, 1300)
        .then((res) => {
          if (cancelled) return;
          setSurface({
            dataUrl: res.dataUrl,
            width: res.width,
            height: res.height,
          });
          if (onDetectedPdfTotalPages && res.totalPages > 0) {
            onDetectedPdfTotalPages(res.totalPages);
          }
          setIsLoading(false);
        })
        .catch(() => {
          if (cancelled) return;
          setLoadError('PDF-Seite konnte nicht gerendert werden.');
          setIsLoading(false);
        });
    } else if (
      (notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko') &&
      customPage
    ) {
      if (customPage.kind === 'blank') {
        const res = renderBlankTemplateToDataUrl(
          annotations.templateOverride ?? customPage.template,
          effectiveRotation,
          1240
        );
        setSurface({
          dataUrl: res.dataUrl,
          width: res.width,
          height: res.height,
        });
        setIsLoading(false);
      } else if (customPage.kind === 'image') {
        getMediaObjectUrl(customPage.mediaId)
          .then((url) => {
            if (cancelled) return;
            if (!url) {
              setLoadError('Gespeichertes Foto nicht im Browser gefunden.');
              setIsLoading(false);
              return;
            }
            loadImageSurface(url, false, 'Gespeichertes Foto konnte nicht geladen werden.');
          })
          .catch(() => {
            if (cancelled) return;
            setLoadError('Gespeichertes Foto konnte nicht geladen werden.');
            setIsLoading(false);
          });
      } else if (customPage.kind === 'pdf-page') {
        getMediaObjectUrl(customPage.mediaId)
          .then((url) => {
            if (cancelled) return null;
            if (!url) throw new Error('missing media');
            return renderPdfPageToDataUrl(
              url,
              customPage.pdfPageNumber,
              effectiveRotation,
              1300
            );
          })
          .then((res) => {
            if (cancelled || !res) return;
            setSurface({
              dataUrl: res.dataUrl,
              width: res.width,
              height: res.height,
            });
            setIsLoading(false);
          })
          .catch(() => {
            if (cancelled) return;
            setLoadError('Eigene PDF-Seite konnte nicht gerendert werden.');
            setIsLoading(false);
          });
      }
    } else if (notebook.sourceType === 'blatt-blanko') {
      const res = renderBlankTemplateToDataUrl(
        annotations.templateOverride ?? 'blank',
        effectiveRotation,
        1240
      );
      setSurface({
        dataUrl: res.dataUrl,
        width: res.width,
        height: res.height,
      });
      setIsLoading(false);
    } else {
      setLoadError('Keine gültige Seitenquelle definiert.');
      setIsLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [
    notebook.id,
    notebook.sourceType,
    notebook.pdfUrl,
    imagePageMeta?.imageUrl,
    imagePageMeta?.preferPortrait,
    customPage?.id,
    customPage?.kind,
    customPage?.kind === 'blank' ? customPage.template : undefined,
    annotations.templateOverride,
    pageNumber,
    effectiveRotation,
    annotations.rotationOverride,
  ]);

  const isDrawTool =
    activeTool === 'pen' || activeTool === 'highlighter' || activeTool === 'eraser';

  // Critical iPadOS Safari guard: block browser scroll/callout ONLY for Apple Pencil (stylus)
  // even while touch-action permits 1-finger panning in pencilOnlyMode.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const blockStylusScroll = (e: TouchEvent) => {
      if (!isDrawTool && !pencilOnlyMode) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'TEXTAREA' ||
          target.tagName === 'BUTTON' ||
          target.isContentEditable ||
          Boolean(target.closest('[contenteditable="true"]')))
      ) {
        return;
      }
      const hasStylusTouch = Array.from(e.touches).some(
        (t) => (t as Touch & { touchType?: string }).touchType === 'stylus'
      );
      if (hasStylusTouch) {
        e.preventDefault();
      }
    };
    el.addEventListener('touchstart', blockStylusScroll, { passive: false });
    el.addEventListener('touchmove', blockStylusScroll, { passive: false });
    return () => {
      el.removeEventListener('touchstart', blockStylusScroll);
      el.removeEventListener('touchmove', blockStylusScroll);
    };
  }, [isDrawTool, pencilOnlyMode]);

  const toNormalizedPoint = useCallback(
    (clientX: number, clientY: number, pressure?: number, pointerType?: string): StrokePoint | null => {
      const el = stageRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      if (pointerType === 'pen' && typeof pressure === 'number' && pressure > 0) {
        return { x, y, p: Math.max(0.08, Math.min(1, pressure)) };
      }
      return { x, y };
    },
    []
  );

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary button / touch / stylus (allow Apple Pencil eraser button 5 / 32)
    const isStylusEraser = e.pointerType === 'pen' && (e.button === 5 || e.buttons === 32);
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    if (e.pointerType === 'pen') {
      onStylusDetected?.();
    }

    // Palm Rejection: in Apple Pencil mode, ignore finger/palm touches for drawing/erasing
    // so the user can rest their hand and scroll/pan with fingers cleanly.
    if (pencilOnlyMode && e.pointerType === 'touch' && isDrawTool) {
      return;
    }

    // Clear sticker, text, and image selection on background tap
    setSelectedStickerId(null);
    setSelectedTextId(null);
    setSelectedImageId(null);

    const effectiveTool: NotebookTool = isStylusEraser ? 'eraser' : activeTool;

    if (effectiveTool === 'hand') {
      return;
    }

    const pt = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
    if (!pt) return;

    if (effectiveTool === 'pen' || effectiveTool === 'highlighter') {
      e.preventDefault();
      activePointerIdRef.current = e.pointerId;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore if unsupported
      }
      isDrawingRef.current = true;

      const newStroke: NotebookStroke = {
        id: `str-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        tool: effectiveTool,
        color: effectiveTool === 'pen' ? penColor : highlighterColor,
        width: effectiveTool === 'pen' ? penWidth : highlighterWidth,
        points: [pt],
      };
      draftStrokeRef.current = newStroke;
      setDraftStroke(newStroke);
      return;
    }

    if (effectiveTool === 'eraser') {
      e.preventDefault();
      activePointerIdRef.current = e.pointerId;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      isErasingRef.current = true;
      erasedAnyRef.current = false;
      preEraseSnapshotRef.current = latestAnnotationsRef.current;

      const remaining = latestAnnotationsRef.current.strokes.filter(
        (s) => !isPointNearStroke(pt, s, Math.max(2.2, s.width * 0.8))
      );
      if (remaining.length !== latestAnnotationsRef.current.strokes.length) {
        erasedAnyRef.current = true;
        onCommitAnnotations(
          { ...latestAnnotationsRef.current, strokes: remaining },
          false
        );
      }
      return;
    }

    if (effectiveTool === 'text') {
      e.preventDefault();
      const id = `txt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const clampedX = Math.max(3, Math.min(76, pt.x));
      const clampedY = Math.max(3, Math.min(88, pt.y));
      const newTextBox: NotebookTextBox = {
        id,
        x: clampedX,
        y: clampedY,
        color: textColor,
        fontSize: textSize,
        text: '',
        runs: [],
        bold: textBold,
        italic: textItalic,
        underline: textUnderline,
        strikethrough: textStrikethrough,
        hasBackground: textHasBackground,
        createdAt: Date.now(),
      };
      pendingNewTextBoxBaseRef.current = {
        id,
        snapshot: latestAnnotationsRef.current,
      };
      setAutoFocusTextId(id);
      setSelectedTextId(id);
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          textBoxes: [...(latestAnnotationsRef.current.textBoxes || []), newTextBox],
        },
        false
      );
      return;
    }

    if (effectiveTool === 'sticky') {
      e.preventDefault();
      const id = `sticky-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const clampedX = Math.max(3, Math.min(72, pt.x));
      const clampedY = Math.max(3, Math.min(82, pt.y));
      const newSticky: NotebookStickyNote = {
        id,
        x: clampedX,
        y: clampedY,
        color: stickyColor,
        text: '',
        isCollapsed: false,
        createdAt: Date.now(),
      };
      setAutoFocusStickyId(id);
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          stickyNotes: [...latestAnnotationsRef.current.stickyNotes, newSticky],
        },
        true
      );
      return;
    }

    if (effectiveTool === 'sticker') {
      e.preventDefault();
      const id = `stk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const clampedX = Math.max(4, Math.min(86, pt.x));
      const clampedY = Math.max(4, Math.min(90, pt.y));
      const newSticker: NotebookSticker = {
        id,
        type: selectedStickerType,
        x: clampedX,
        y: clampedY,
        scale: stickerScale,
        opacity: stickerOpacity,
      };
      setSelectedStickerId(id);
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          stickers: [...latestAnnotationsRef.current.stickers, newSticker],
        },
        true
      );
    }
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Handle resizing of embedded page image first
    if (resizeImageRef.current && stageRef.current) {
      e.preventDefault();
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;
      const dx = e.clientX - resizeImageRef.current.startClientX;
      const dy = e.clientY - resizeImageRef.current.startClientY;
      const deltaPct = ((dx + dy) * 0.7 / rect.width) * 100;
      const nextWidth = Math.max(
        12,
        Math.min(95, +(resizeImageRef.current.origWidthPct + deltaPct * 2).toFixed(1))
      );
      if (Math.abs(nextWidth - resizeImageRef.current.origWidthPct) >= 0.1) {
        resizeImageRef.current.hasResized = true;
      }
      const targetId = resizeImageRef.current.id;
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          images: (latestAnnotationsRef.current.images || []).map((img) =>
            img.id === targetId ? { ...img, widthPct: nextWidth } : img
          ),
        },
        false
      );
      return;
    }

    // Handle dragging of Sticky Notes, Stickers, Text Boxes, or Embedded Images
    if (dragItemRef.current && stageRef.current) {
      e.preventDefault();
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dxPct = ((e.clientX - dragItemRef.current.startClientX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragItemRef.current.startClientY) / rect.height) * 100;
      const nextX = Math.max(2, Math.min(95, dragItemRef.current.origX + dxPct));
      const nextY = Math.max(2, Math.min(95, dragItemRef.current.origY + dyPct));

      if (
        Math.abs(nextX - dragItemRef.current.origX) > 0.08 ||
        Math.abs(nextY - dragItemRef.current.origY) > 0.08
      ) {
        dragItemRef.current.hasMoved = true;
      }

      if (dragItemRef.current.kind === 'sticky') {
        const targetId = dragItemRef.current.id;
        onCommitAnnotations(
          {
            ...latestAnnotationsRef.current,
            stickyNotes: latestAnnotationsRef.current.stickyNotes.map((n) =>
              n.id === targetId ? { ...n, x: nextX, y: nextY } : n
            ),
          },
          false
        );
      } else if (dragItemRef.current.kind === 'text') {
        const targetId = dragItemRef.current.id;
        onCommitAnnotations(
          {
            ...latestAnnotationsRef.current,
            textBoxes: (latestAnnotationsRef.current.textBoxes || []).map((t) =>
              t.id === targetId ? { ...t, x: nextX, y: nextY } : t
            ),
          },
          false
        );
      } else if (dragItemRef.current.kind === 'image') {
        const targetId = dragItemRef.current.id;
        onCommitAnnotations(
          {
            ...latestAnnotationsRef.current,
            images: (latestAnnotationsRef.current.images || []).map((img) =>
              img.id === targetId ? { ...img, x: nextX, y: nextY } : img
            ),
          },
          false
        );
      } else {
        const targetId = dragItemRef.current.id;
        onCommitAnnotations(
          {
            ...latestAnnotationsRef.current,
            stickers: latestAnnotationsRef.current.stickers.map((s) =>
              s.id === targetId ? { ...s, x: nextX, y: nextY } : s
            ),
          },
          false
        );
      }
      return;
    }

    // Ignore palm/secondary touches while an active stylus/pointer stroke is in progress
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) {
      return;
    }

    if (isDrawingRef.current && draftStrokeRef.current) {
      e.preventDefault();
      const nativeEvt = e.nativeEvent as PointerEvent;
      const coalesced =
        typeof nativeEvt.getCoalescedEvents === 'function'
          ? nativeEvt.getCoalescedEvents()
          : [];
      const samples = coalesced.length > 0 ? coalesced : [nativeEvt];
      const minStep = e.pointerType === 'pen' ? 0.12 : 0.22;

      const currentPoints = [...draftStrokeRef.current.points];
      let added = false;
      for (const sample of samples) {
        const pt = toNormalizedPoint(
          sample.clientX,
          sample.clientY,
          sample.pressure,
          e.pointerType
        );
        if (!pt) continue;
        const lastPt = currentPoints[currentPoints.length - 1];
        if (lastPt && Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y) < minStep) {
          continue;
        }
        currentPoints.push(pt);
        added = true;
      }

      if (added) {
        const updatedStroke = { ...draftStrokeRef.current, points: currentPoints };
        draftStrokeRef.current = updatedStroke;
        setDraftStroke(updatedStroke);
      }
      return;
    }

    if (isErasingRef.current) {
      e.preventDefault();
      const pt = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
      if (!pt) return;
      const remaining = latestAnnotationsRef.current.strokes.filter(
        (s) => !isPointNearStroke(pt, s, Math.max(2.2, s.width * 0.8))
      );
      if (remaining.length !== latestAnnotationsRef.current.strokes.length) {
        erasedAnyRef.current = true;
        onCommitAnnotations(
          { ...latestAnnotationsRef.current, strokes: remaining },
          false
        );
      }
    }
  };

  const handleStagePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resizeImageRef.current) {
      const resizeSession = resizeImageRef.current;
      resizeImageRef.current = null;
      try {
        stageRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (resizeSession.hasResized) {
        onCommitAnnotations(
          latestAnnotationsRef.current,
          true,
          resizeSession.origSnapshot
        );
      }
      return;
    }

    if (dragItemRef.current) {
      const dragSession = dragItemRef.current;
      dragItemRef.current = null;
      try {
        stageRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (dragSession.hasMoved) {
        onCommitAnnotations(
          latestAnnotationsRef.current,
          true,
          dragSession.origSnapshot
        );
      }
      return;
    }

    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) {
      return;
    }
    activePointerIdRef.current = null;

    if (isDrawingRef.current && draftStrokeRef.current) {
      isDrawingRef.current = false;
      const completed = draftStrokeRef.current;
      draftStrokeRef.current = null;
      setDraftStroke(null);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          strokes: [...latestAnnotationsRef.current.strokes, completed],
        },
        true,
        latestAnnotationsRef.current
      );
      return;
    }

    if (isErasingRef.current) {
      isErasingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (erasedAnyRef.current) {
        onCommitAnnotations(
          latestAnnotationsRef.current,
          true,
          preEraseSnapshotRef.current ?? undefined
        );
      }
      preEraseSnapshotRef.current = null;
      erasedAnyRef.current = false;
    }
  };

  const handleStickyTextChange = (id: string, text: string) => {
    onCommitAnnotations(
      {
        ...annotations,
        stickyNotes: annotations.stickyNotes.map((n) => (n.id === id ? { ...n, text } : n)),
      },
      false
    );
  };

  const handleToggleStickyCollapse = (id: string) => {
    onCommitAnnotations(
      {
        ...annotations,
        stickyNotes: annotations.stickyNotes.map((n) =>
          n.id === id ? { ...n, isCollapsed: !n.isCollapsed } : n
        ),
      },
      true
    );
  };

  const handleDeleteSticky = (id: string) => {
    onCommitAnnotations(
      {
        ...annotations,
        stickyNotes: annotations.stickyNotes.filter((n) => n.id !== id),
      },
      true
    );
  };

  const handleDeleteSticker = (id: string) => {
    onCommitAnnotations(
      {
        ...annotations,
        stickers: annotations.stickers.filter((s) => s.id !== id),
      },
      true
    );
    if (selectedStickerId === id) setSelectedStickerId(null);
  };

  const handleUpdateSticker = (
    id: string,
    patch: Partial<Pick<NotebookSticker, 'scale' | 'opacity'>>
  ) => {
    onCommitAnnotations(
      {
        ...annotations,
        stickers: annotations.stickers.map((s) =>
          s.id === id ? { ...s, ...patch } : s
        ),
      },
      true
    );
  };

  const handleUpdateEmbeddedImage = (
    id: string,
    patch: Partial<Pick<NotebookImageElement, 'widthPct' | 'opacity' | 'rotation'>>
  ) => {
    onCommitAnnotations(
      {
        ...annotations,
        images: (annotations.images || []).map((img) =>
          img.id === id ? { ...img, ...patch } : img
        ),
      },
      true
    );
  };

  const handleDeleteEmbeddedImage = (id: string) => {
    onCommitAnnotations(
      {
        ...annotations,
        images: (annotations.images || []).filter((img) => img.id !== id),
      },
      true
    );
    if (selectedImageId === id) setSelectedImageId(null);
  };

  const getTextBoxSignature = (box: NotebookTextBox): string => {
    const base = getBoxBaseStyle(box);
    const runs = getEffectiveRuns(box);
    return `${serializeRunsSignature(runs, base)}|${box.text}|${base.color}|${base.bold}|${base.italic}|${base.underline}|${base.strikethrough}`;
  };

  const handleUpdateTextBoxRich = (
    id: string,
    patch: Partial<
      Pick<
        NotebookTextBox,
        'text' | 'runs' | 'color' | 'bold' | 'italic' | 'underline' | 'strikethrough'
      >
    >,
    recordHistory: boolean = false
  ) => {
    const latest = latestAnnotationsRef.current;
    const nextAnnotations: PageAnnotations = {
      ...latest,
      textBoxes: (latest.textBoxes || []).map((t) =>
        t.id === id ? { ...t, ...patch } : t
      ),
    };

    if (recordHistory) {
      let baseSnapshot = latest;
      if (pendingNewTextBoxBaseRef.current?.id === id) {
        baseSnapshot = pendingNewTextBoxBaseRef.current.snapshot;
        pendingNewTextBoxBaseRef.current = null;
      }
      onCommitAnnotations(nextAnnotations, true, baseSnapshot);
      const updatedBox = (nextAnnotations.textBoxes || []).find((t) => t.id === id);
      if (updatedBox) {
        preEditTextSnapshotRef.current = {
          kind: 'text',
          id,
          startText: getTextBoxSignature(updatedBox),
          snapshot: nextAnnotations,
        };
      }
      return;
    }

    onCommitAnnotations(nextAnnotations, false);
  };

  const handleToggleTextBoxBg = (id: string) => {
    const latest = latestAnnotationsRef.current;
    onCommitAnnotations(
      {
        ...latest,
        textBoxes: (latest.textBoxes || []).map((t) =>
          t.id === id ? { ...t, hasBackground: !(t.hasBackground ?? true) } : t
        ),
      },
      true
    );
  };

  const handleDeleteTextBox = (id: string) => {
    onCommitAnnotations(
      {
        ...annotations,
        textBoxes: (annotations.textBoxes || []).filter((t) => t.id !== id),
      },
      true
    );
    if (selectedTextId === id) setSelectedTextId(null);
  };

  const handleTextBoxFocus = (id: string) => {
    const box = (latestAnnotationsRef.current.textBoxes || []).find((t) => t.id === id);
    if (!box) return;
    if (pendingNewTextBoxBaseRef.current?.id === id) {
      return;
    }
    preEditTextSnapshotRef.current = {
      kind: 'text',
      id,
      startText: getTextBoxSignature(box),
      snapshot: latestAnnotationsRef.current,
    };
  };

  const handleTextBoxBlur = (id: string) => {
    const currentBoxes = latestAnnotationsRef.current.textBoxes || [];
    const target = currentBoxes.find((t) => t.id === id);

    const newBase =
      pendingNewTextBoxBaseRef.current?.id === id
        ? pendingNewTextBoxBaseRef.current.snapshot
        : null;
    if (pendingNewTextBoxBaseRef.current?.id === id) {
      pendingNewTextBoxBaseRef.current = null;
    }

    const editSession =
      preEditTextSnapshotRef.current?.kind === 'text' && preEditTextSnapshotRef.current.id === id
        ? preEditTextSnapshotRef.current
        : null;
    if (editSession) {
      preEditTextSnapshotRef.current = null;
    }

    if (target && !target.text.trim()) {
      const cleanedState: PageAnnotations = {
        ...latestAnnotationsRef.current,
        textBoxes: currentBoxes.filter((t) => t.id !== id),
      };
      if (newBase) {
        // Brand-new empty box discarded without leaving a dead Undo step
        onCommitAnnotations(cleanedState, false);
      } else if (editSession && !editSession.startText.startsWith('[]||')) {
        onCommitAnnotations(cleanedState, true, editSession.snapshot);
      } else {
        onCommitAnnotations(cleanedState, false);
      }
      if (selectedTextId === id) setSelectedTextId(null);
      return;
    }

    if (newBase && target && target.text.trim()) {
      onCommitAnnotations(latestAnnotationsRef.current, true, newBase);
      return;
    }

    if (editSession && target && getTextBoxSignature(target) !== editSession.startText) {
      onCommitAnnotations(latestAnnotationsRef.current, true, editSession.snapshot);
    }
  };

  const handleStickyFocus = (id: string) => {
    const note = latestAnnotationsRef.current.stickyNotes.find((n) => n.id === id);
    if (!note) return;
    preEditTextSnapshotRef.current = {
      kind: 'sticky',
      id,
      startText: note.text,
      snapshot: latestAnnotationsRef.current,
    };
  };

  const handleStickyBlur = (id: string) => {
    const editSession =
      preEditTextSnapshotRef.current?.kind === 'sticky' &&
      preEditTextSnapshotRef.current.id === id
        ? preEditTextSnapshotRef.current
        : null;
    if (editSession) {
      preEditTextSnapshotRef.current = null;
    }
    const note = latestAnnotationsRef.current.stickyNotes.find((n) => n.id === id);
    if (editSession && note && note.text !== editSession.startText) {
      onCommitAnnotations(latestAnnotationsRef.current, true, editSession.snapshot);
    }
  };

  const aspectRatio = surface ? surface.width / surface.height : 0.707;
  const displayWidth = Math.max(260, Math.round(fitWidth * zoom));
  const displayHeight = Math.round(displayWidth / aspectRatio);

  const allStrokes = draftStroke
    ? [...annotations.strokes, draftStroke]
    : annotations.strokes;

  const highlighterStrokes = allStrokes.filter((s) => s.tool === 'highlighter');
  const penStrokes = allStrokes.filter((s) => s.tool === 'pen');

  const cursorClass =
    activeTool === 'pen' || activeTool === 'highlighter'
      ? 'cursor-crosshair'
      : activeTool === 'eraser'
      ? 'cursor-cell'
      : activeTool === 'text'
      ? 'cursor-text'
      : activeTool === 'sticky' || activeTool === 'sticker'
      ? 'cursor-copy'
      : 'cursor-default';

  return (
    <div className="flex justify-center items-start min-h-full py-4 sm:py-6 px-2 sm:px-6">
      <div
        ref={stageRef}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerCancel={handleStagePointerUp}
        onContextMenu={(e) => {
          if (isDrawTool || pencilOnlyMode) e.preventDefault();
        }}
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          touchAction: isDrawTool && !pencilOnlyMode ? 'none' : 'pan-x pan-y pinch-zoom',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
        className={`relative bg-white rounded-md shadow-xl border border-slate-300/80 dark:border-slate-700 select-none shrink-0 overflow-hidden ${cursorClass}`}
      >
        {/* Layer 1: Crisp Document Page Surface */}
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white text-slate-500">
            <Loader2 className="w-7 h-7 animate-spin text-indigo-600" />
            <span className="text-xs font-medium tabular-nums">
              Seite {pageNumber} wird geladen...
            </span>
          </div>
        ) : loadError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 text-slate-600 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500" />
            <p className="text-sm font-semibold text-slate-800">{loadError}</p>
            <p className="text-xs text-slate-500">
              Bitte Seite wechseln oder Ansicht neu laden.
            </p>
          </div>
        ) : surface ? (
          <img
            src={surface.dataUrl}
            alt={`${notebook.title} – Seite ${pageNumber}`}
            draggable={false}
            referrerPolicy="no-referrer"
            className="w-full h-full object-fill pointer-events-none block"
          />
        ) : null}

        {/* Layer 1.5: Interactive Embedded Images (on custom & existing pages) */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          {(annotations.images || []).map((imgEl) => (
            <EmbeddedImageOverlayItem
              key={imgEl.id}
              item={imgEl}
              isInteractive={activeTool === 'hand'}
              isSelected={selectedImageId === imgEl.id}
              onSelect={() => setSelectedImageId(imgEl.id)}
              onStartDrag={(e) => {
                try {
                  stageRef.current?.setPointerCapture(e.pointerId);
                } catch {}
                dragItemRef.current = {
                  kind: 'image',
                  id: imgEl.id,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  origX: imgEl.x,
                  origY: imgEl.y,
                  hasMoved: false,
                  origSnapshot: latestAnnotationsRef.current,
                };
              }}
              onStartResize={(e) => {
                try {
                  stageRef.current?.setPointerCapture(e.pointerId);
                } catch {}
                resizeImageRef.current = {
                  id: imgEl.id,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  origWidthPct: imgEl.widthPct,
                  hasResized: false,
                  origSnapshot: latestAnnotationsRef.current,
                };
              }}
              onCrop={async () => {
                const url = await getMediaObjectUrl(imgEl.mediaId);
                if (url) {
                  setActiveCropImage({
                    id: imgEl.id,
                    url,
                    rotation: imgEl.rotation ?? 0,
                  });
                }
              }}
              onUpdate={(patch) => handleUpdateEmbeddedImage(imgEl.id, patch)}
              onDelete={() => handleDeleteEmbeddedImage(imgEl.id)}
            />
          ))}
        </div>

        {activeCropImage && (
          <ImageCropModal
            isOpen={true}
            imageSrc={activeCropImage.url}
            imageName="Eingefügtes Foto"
            confirmLabel="Zuschneiden anwenden"
            initialRotation={activeCropImage.rotation ?? 0}
            onClose={() => setActiveCropImage(null)}
            onCropCompleted={async (croppedBlob) => {
              const targetId = activeCropImage.id;
              const { mediaId, aspectRatio } = await saveEmbeddedImageMedia(
                croppedBlob,
                'cropped-photo.jpg'
              );
              const latest = latestAnnotationsRef.current;
              onCommitAnnotations(
                {
                  ...latest,
                  images: (latest.images || []).map((img) =>
                    img.id === targetId
                      ? { ...img, mediaId, aspectRatio, rotation: 0 }
                      : img
                  ),
                },
                true,
                latest
              );
              setActiveCropImage(null);
            }}
          />
        )}

        {/* Layer 2: Smooth Vector Pen Ink SVG */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <g>
            {penStrokes.map((stroke) => {
              const pressurePath = buildPressureInkPolygonPath(
                stroke.points,
                stroke.width,
                aspectRatio
              );
              if (pressurePath) {
                return (
                  <path
                    key={stroke.id}
                    d={pressurePath}
                    fill={stroke.color}
                    fillOpacity={0.96}
                  />
                );
              }
              return (
                <path
                  key={stroke.id}
                  d={buildSmoothSvgPath(stroke.points)}
                  fill="none"
                  stroke={stroke.color}
                  strokeWidth={stroke.width}
                  strokeOpacity={0.96}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
          </g>
        </svg>

        {/* Layer 3: Interactive Stickers */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {annotations.stickers.map((sticker) => {
            const preset = NOTEBOOK_STICKERS.find((p) => p.type === sticker.type);
            if (!preset) return null;
            const isSelected = selectedStickerId === sticker.id;
            const currentScale = sticker.scale ?? 1;
            const currentOpacity = sticker.opacity ?? 1;
            const transparencyPct = Math.round((1 - currentOpacity) * 100);
            const showToolbarBelow = sticker.y < 14;
            const toolbarHorizClass =
              sticker.x < 22
                ? 'left-0'
                : sticker.x > 78
                ? 'right-0'
                : 'left-1/2 -translate-x-1/2';

            return (
              <div
                key={sticker.id}
                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                onPointerDown={(e) => {
                  if (isDrawTool) return;
                  e.stopPropagation();
                  setSelectedStickerId(sticker.id);
                  try {
                    stageRef.current?.setPointerCapture(e.pointerId);
                  } catch {}
                  dragItemRef.current = {
                    kind: 'sticker',
                    id: sticker.id,
                    startClientX: e.clientX,
                    startClientY: e.clientY,
                    origX: sticker.x,
                    origY: sticker.y,
                    hasMoved: false,
                    origSnapshot: latestAnnotationsRef.current,
                  };
                }}
                className={`absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 group select-none ${
                  isSelected ? 'z-30' : ''
                } ${
                  isDrawTool
                    ? 'pointer-events-none opacity-90'
                    : 'cursor-grab active:cursor-grabbing'
                }`}
              >
                {/* Unscaled Floating Controls for Selected Sticker */}
                {isSelected && !isDrawTool && (
                  <div
                    onPointerDown={(e) => e.stopPropagation()}
                    className={`absolute ${toolbarHorizClass} ${
                      showToolbarBelow ? 'top-full mt-2.5' : 'bottom-full mb-2.5'
                    } flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-900/95 text-white shadow-lg border border-slate-700/80 text-[10px] font-bold whitespace-nowrap z-40 cursor-default`}
                  >
                    <span className="text-slate-400">Größe</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSticker(sticker.id, {
                          scale: +Math.max(0.5, currentScale - 0.15).toFixed(2),
                        });
                      }}
                      title="Sticker verkleinern"
                      aria-label="Sticker verkleinern"
                      className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      −
                    </button>
                    <span className="tabular-nums min-w-[30px] text-center">
                      {Math.round(currentScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSticker(sticker.id, {
                          scale: +Math.min(2.0, currentScale + 0.15).toFixed(2),
                        });
                      }}
                      title="Sticker vergrößern"
                      aria-label="Sticker vergrößern"
                      className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>

                    <span className="text-slate-600">|</span>

                    <span className="text-slate-400">Transp.</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSticker(sticker.id, {
                          opacity: +Math.min(1, currentOpacity + 0.1).toFixed(2),
                        });
                      }}
                      title="Weniger transparent (deckender)"
                      aria-label="Transparenz verringern"
                      className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      −
                    </button>
                    <span className="tabular-nums min-w-[28px] text-center">
                      {transparencyPct}%
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSticker(sticker.id, {
                          opacity: +Math.max(0.2, currentOpacity - 0.1).toFixed(2),
                        });
                      }}
                      title="Transparenter machen"
                      aria-label="Transparenz erhöhen"
                      className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>

                    <span className="text-slate-600">|</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSticker(sticker.id);
                      }}
                      title="Sticker entfernen"
                      aria-label="Sticker entfernen"
                      className="w-5 h-5 rounded bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div
                  style={{
                    transform: `rotate(-2deg) scale(${currentScale})`,
                    opacity: currentOpacity,
                  }}
                  className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 shadow-sm transition-shadow ${
                    preset.bgClass
                  } ${preset.borderClass} ${preset.textClass} ${
                    isSelected ? 'ring-2 ring-indigo-500' : 'hover:ring-2 hover:ring-indigo-300'
                  }`}
                >
                  <span className="text-sm leading-none">{preset.symbol}</span>
                  <span className="text-[11px] font-extrabold tracking-wide whitespace-nowrap">
                    {preset.shortLabel}
                  </span>

                  {!isSelected && !isDrawTool && (
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSticker(sticker.id);
                      }}
                      title="Sticker entfernen"
                      aria-label="Sticker entfernen"
                      className="-mr-1 -my-1 ml-0.5 w-5 h-5 rounded-full bg-slate-900/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Layer 3.5: Interactive Typed Text Boxes */}
        <div className="absolute inset-0 z-[25] pointer-events-none">
          {(annotations.textBoxes || []).map((box) => {
            const fontSizePx = Math.max(11, Math.round((displayWidth * box.fontSize) / 100));
            return (
              <TextBoxOverlayItem
                key={box.id}
                box={box}
                fontSizePx={fontSizePx}
                isDrawTool={isDrawTool}
                isSelected={selectedTextId === box.id}
                autoFocus={autoFocusTextId === box.id}
                onSelect={() => setSelectedTextId(box.id)}
                onFocusBox={() => handleTextBoxFocus(box.id)}
                onClearAutoFocus={() => {
                  if (autoFocusTextId === box.id) setAutoFocusTextId(null);
                }}
                onStartDrag={(e) => {
                  try {
                    stageRef.current?.setPointerCapture(e.pointerId);
                  } catch {}
                  dragItemRef.current = {
                    kind: 'text',
                    id: box.id,
                    startClientX: e.clientX,
                    startClientY: e.clientY,
                    origX: box.x,
                    origY: box.y,
                    hasMoved: false,
                    origSnapshot: latestAnnotationsRef.current,
                  };
                }}
                onUpdateBox={(patch, recordHistory) =>
                  handleUpdateTextBoxRich(box.id, patch, recordHistory)
                }
                onToggleBackground={() => handleToggleTextBoxBg(box.id)}
                onDelete={() => handleDeleteTextBox(box.id)}
                onBlurBox={() => handleTextBoxBlur(box.id)}
              />
            );
          })}
        </div>

        {/* Layer 3.8: Foreground Highlighter SVG (above Freitext, Fotos & Stickers, below Klebezettel) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ mixBlendMode: 'multiply' }}
          className="absolute inset-0 w-full h-full pointer-events-none z-[28]"
        >
          {highlighterStrokes.map((stroke) => (
            <path
              key={stroke.id}
              d={buildSmoothSvgPath(stroke.points)}
              fill="none"
              stroke={stroke.color}
              strokeWidth={stroke.width}
              strokeOpacity={0.42}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {/* Layer 4: Interactive Sticky Notes (Klebezettel / Post-its) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {annotations.stickyNotes.map((note, idx) => {
            const theme = STICKY_NOTE_STYLES[note.color] || STICKY_NOTE_STYLES.yellow;
            const previewSnippet = note.text.trim()
              ? note.text.trim().slice(0, 14) + (note.text.trim().length > 14 ? '…' : '')
              : `Notiz ${idx + 1}`;

            return (
              <div
                key={note.id}
                style={{ left: `${note.x}%`, top: `${note.y}%` }}
                onPointerDown={(e) => {
                  if (isDrawTool) return;
                  e.stopPropagation();
                }}
                className={`absolute ${
                  isDrawTool ? 'pointer-events-none opacity-85' : 'pointer-events-auto'
                }`}
              >
                {/* Anchor Pin directly on text spot */}
                <div
                  title="Position an Textstelle verschieben"
                  onPointerDown={(e) => {
                    if (isDrawTool) return;
                    e.stopPropagation();
                    try {
                      stageRef.current?.setPointerCapture(e.pointerId);
                    } catch {}
                    dragItemRef.current = {
                      kind: 'sticky',
                      id: note.id,
                      startClientX: e.clientX,
                      startClientY: e.clientY,
                      origX: note.x,
                      origY: note.y,
                      hasMoved: false,
                      origSnapshot: latestAnnotationsRef.current,
                    };
                  }}
                  className={`w-3.5 h-3.5 rounded-full ${theme.pinColor} ring-2 ring-white shadow-sm -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing`}
                />

                {note.isCollapsed ? (
                  /* Collapsed Compact Sticky Flag so underlying script text remains readable */
                  <div className="mt-0.5 inline-flex items-center gap-1 rounded-lg border shadow-sm overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStickyCollapse(note.id);
                      }}
                      className={`px-2 py-1 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer ${theme.bg} ${theme.border} ${theme.textColor}`}
                      title="Klebezettel aufklappen"
                    >
                      <Maximize2 className="w-3 h-3 shrink-0" />
                      <span className="max-w-[110px] truncate">{previewSnippet}</span>
                    </button>
                  </div>
                ) : (
                  /* Expanded Post-it Note */
                  <div
                    className={`mt-0.5 w-48 sm:w-56 rounded-xl border ${theme.bg} ${theme.border} ${theme.textColor} shadow-lg overflow-hidden`}
                  >
                    {/* Header Drag Bar */}
                    <div
                      onPointerDown={(e) => {
                        if (isDrawTool) return;
                        e.stopPropagation();
                        try {
                          stageRef.current?.setPointerCapture(e.pointerId);
                        } catch {}
                        dragItemRef.current = {
                          kind: 'sticky',
                          id: note.id,
                          startClientX: e.clientX,
                          startClientY: e.clientY,
                          origX: note.x,
                          origY: note.y,
                          hasMoved: false,
                          origSnapshot: latestAnnotationsRef.current,
                        };
                      }}
                      className={`px-2 py-1 ${theme.headerBg} flex items-center justify-between gap-1 cursor-grab active:cursor-grabbing`}
                    >
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-80">
                        <GripHorizontal className="w-3.5 h-3.5" />
                        <span>Klebezettel</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStickyCollapse(note.id);
                          }}
                          title="Klebezettel einklappen"
                          aria-label="Klebezettel einklappen"
                          className="p-1 rounded hover:bg-black/10 transition-colors cursor-pointer"
                        >
                          <Minimize2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSticky(note.id);
                          }}
                          title="Klebezettel löschen"
                          aria-label="Klebezettel löschen"
                          className="p-1 rounded hover:bg-rose-500/20 hover:text-rose-800 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      autoFocus={autoFocusStickyId === note.id}
                      value={note.text}
                      onFocus={() => {
                        if (autoFocusStickyId === note.id) setAutoFocusStickyId(null);
                        handleStickyFocus(note.id);
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onChange={(e) => handleStickyTextChange(note.id, e.target.value)}
                      onBlur={() => handleStickyBlur(note.id)}
                      placeholder="Notiz an diese Stelle heften..."
                      rows={3}
                      className="w-full p-2.5 bg-transparent text-xs leading-relaxed focus:outline-hidden resize-y placeholder:text-black/40"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
