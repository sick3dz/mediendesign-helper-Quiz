import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GripHorizontal, Minimize2, Maximize2, X, Loader2, AlertCircle } from 'lucide-react';
import {
  NotebookDocument,
  NotebookSticker,
  NotebookStickerType,
  NotebookStickyNote,
  NotebookStroke,
  NotebookTool,
  PageAnnotations,
  StickyColor,
  StrokePoint,
} from '../../types/notebook';
import { NOTEBOOK_STICKERS, STICKY_NOTE_STYLES } from '../../data/notebooksData';
import { renderPdfPageToDataUrl } from '../../services/pdfRenderService';
import {
  getMediaObjectUrl,
  renderBlankTemplateToDataUrl,
} from '../../services/customNotebookDbService';

interface Props {
  notebook: NotebookDocument;
  pageNumber: number;
  annotations: PageAnnotations;
  activeTool: NotebookTool;
  penColor: string;
  penWidth: number;
  highlighterColor: string;
  highlighterWidth: number;
  stickyColor: StickyColor;
  selectedStickerType: NotebookStickerType;
  zoom: number;
  fitWidth: number;
  pencilOnlyMode: boolean;
  onStylusDetected?: () => void;
  onCommitAnnotations: (next: PageAnnotations, recordHistory?: boolean) => void;
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

export const NotebookPageStage: React.FC<Props> = ({
  notebook,
  pageNumber,
  annotations,
  activeTool,
  penColor,
  penWidth,
  highlighterColor,
  highlighterWidth,
  stickyColor,
  selectedStickerType,
  zoom,
  fitWidth,
  pencilOnlyMode,
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

  // Newly created sticky note to autofocus
  const [autoFocusStickyId, setAutoFocusStickyId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Dragging state for Sticky Notes & Stickers
  const dragItemRef = useRef<{
    kind: 'sticky' | 'sticker';
    id: string;
    startClientX: number;
    startClientY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const imagePageMeta =
    notebook.sourceType === 'foto-skript'
      ? notebook.imagePages?.[pageNumber - 1]
      : undefined;

  const customPage =
    notebook.sourceType === 'eigenes-heft'
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
      img.crossOrigin = 'anonymous';
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
    } else if (notebook.sourceType === 'eigenes-heft' && customPage) {
      if (customPage.kind === 'blank') {
        const res = renderBlankTemplateToDataUrl(customPage.template, effectiveRotation, 1240);
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
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON')) return;
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

    // Clear sticker selection on background tap
    setSelectedStickerId(null);

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
    // Handle dragging of Sticky Notes or Stickers first
    if (dragItemRef.current && stageRef.current) {
      e.preventDefault();
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dxPct = ((e.clientX - dragItemRef.current.startClientX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragItemRef.current.startClientY) / rect.height) * 100;
      const nextX = Math.max(2, Math.min(90, dragItemRef.current.origX + dxPct));
      const nextY = Math.max(2, Math.min(92, dragItemRef.current.origY + dyPct));

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
    if (dragItemRef.current) {
      dragItemRef.current = null;
      // Save final position with history record
      onCommitAnnotations(latestAnnotationsRef.current, true);
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
        true
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
        onCommitAnnotations(latestAnnotationsRef.current, true);
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

        {/* Layer 2: Smooth Vector Ink SVG (Highlighters beneath Pen) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <g style={{ mixBlendMode: 'multiply' }}>
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
          </g>
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

            return (
              <div
                key={sticker.id}
                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                onPointerDown={(e) => {
                  if (isDrawTool) return;
                  e.stopPropagation();
                  setSelectedStickerId(sticker.id);
                  dragItemRef.current = {
                    kind: 'sticker',
                    id: sticker.id,
                    startClientX: e.clientX,
                    startClientY: e.clientY,
                    origX: sticker.x,
                    origY: sticker.y,
                  };
                }}
                className={`absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 group select-none ${
                  isDrawTool ? 'pointer-events-none opacity-90' : 'cursor-grab active:cursor-grabbing'
                }`}
              >
                <div
                  className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 shadow-sm -rotate-2 transition-transform ${
                    preset.bgClass
                  } ${preset.borderClass} ${preset.textClass} ${
                    isSelected ? 'ring-2 ring-indigo-500 scale-105' : 'hover:scale-105'
                  }`}
                >
                  <span className="text-sm leading-none">{preset.symbol}</span>
                  <span className="text-[11px] font-extrabold tracking-wide whitespace-nowrap">
                    {preset.shortLabel}
                  </span>

                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSticker(sticker.id);
                    }}
                    title="Sticker entfernen"
                    aria-label="Sticker entfernen"
                    className={`-mr-1 -my-1 ml-0.5 w-5 h-5 rounded-full bg-slate-900/85 text-white flex items-center justify-center transition-opacity cursor-pointer ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

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
                    dragItemRef.current = {
                      kind: 'sticky',
                      id: note.id,
                      startClientX: e.clientX,
                      startClientY: e.clientY,
                      origX: note.x,
                      origY: note.y,
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
                        dragItemRef.current = {
                          kind: 'sticky',
                          id: note.id,
                          startClientX: e.clientX,
                          startClientY: e.clientY,
                          origX: note.x,
                          origY: note.y,
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
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onChange={(e) => handleStickyTextChange(note.id, e.target.value)}
                      onBlur={() => onCommitAnnotations(latestAnnotationsRef.current, false)}
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
