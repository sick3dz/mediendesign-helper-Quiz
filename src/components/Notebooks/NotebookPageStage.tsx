import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
  Copy,
  CalendarCheck,
  Minus,
  ArrowUpRight,
  Square,
  Circle,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import {
  BlankPageTemplate,
  NotebookDocument,
  NotebookDrawShape,
  NotebookEraserMode,
  NotebookEraserTarget,
  NotebookImageElement,
  NotebookShapeElement,
  NotebookShapeKind,
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
  TextBoxBackgroundStyle,
} from '../../types/notebook';
import {
  BlankPaperPalette,
  HIGHLIGHTER_COLORS,
  NOTEBOOK_STICKERS,
  PEN_COLORS,
  STICKY_NOTE_STYLES,
} from '../../data/notebooksData';
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
  getBlankHeaderLayoutMetrics,
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
  drawShape?: NotebookDrawShape;
  shapeLineStyle?: 'solid' | 'dashed' | 'dotted';
  eraserMode?: NotebookEraserMode;
  eraserWidth?: number;
  eraserTarget?: NotebookEraserTarget;
  textColor: string;
  textSize: number;
  textBackgroundStyle: TextBoxBackgroundStyle;
  paperPalette: BlankPaperPalette;
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
  retinaMode?: 'auto' | 'ultra';
  blockCanvasContextMenu?: boolean;
  selectedImageSignal?: { id: string; seq: number };
  deleteSelectionSignal?: number;
  duplicateSelectionSignal?: number;
  clearSelectionSignal?: number;
  copySelectionSignal?: number;
  pasteSelectionSignal?: number;
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

function isPointNearStroke(
  pt: StrokePoint,
  stroke: NotebookStroke,
  radius: number,
  isoYFactor: number = 0.707
): boolean {
  const rSq = radius * radius;
  const pts = stroke.points;
  const safeIso = isoYFactor > 0.05 ? isoYFactor : 0.707;
  const ptScaledY = pt.y / safeIso;
  if (pts.length === 0) return false;
  if (pts.length === 1) {
    const dx = pt.x - pts[0].x;
    const dy = ptScaledY - pts[0].y / safeIso;
    return dx * dx + dy * dy <= rSq;
  }
  for (let i = 0; i < pts.length - 1; i++) {
    if (
      pointToSegmentDistSq(
        pt.x,
        ptScaledY,
        pts[i].x,
        pts[i].y / safeIso,
        pts[i + 1].x,
        pts[i + 1].y / safeIso
      ) <= rSq
    ) {
      return true;
    }
  }
  return false;
}

function interpolateStrokePoint(a: StrokePoint, b: StrokePoint, t: number): StrokePoint {
  const clamped = Math.max(0, Math.min(1, t));
  const x = +(a.x + (b.x - a.x) * clamped).toFixed(2);
  const y = +(a.y + (b.y - a.y) * clamped).toFixed(2);
  if (typeof a.p === 'number' || typeof b.p === 'number') {
    const pa = a.p ?? 0.5;
    const pb = b.p ?? 0.5;
    return { x, y, p: +(pa + (pb - pa) * clamped).toFixed(2) };
  }
  return { x, y };
}

function eraseStrokePartially(
  stroke: NotebookStroke,
  center: StrokePoint,
  eraserRadius: number,
  isoYFactor: number = 0.707
): { pieces: NotebookStroke[]; modified: boolean } {
  const pts = stroke.points;
  const safeIso = isoYFactor > 0.05 ? isoYFactor : 0.707;
  const effectiveR = Math.max(0.35, eraserRadius);
  const rSq = effectiveR * effectiveR;

  if (!isPointNearStroke(center, stroke, effectiveR + stroke.width * 0.35, safeIso)) {
    return { pieces: [stroke], modified: false };
  }

  if (pts.length <= 1) {
    return { pieces: [], modified: true };
  }

  const cx = center.x;
  const cy = center.y / safeIso;
  const chains: StrokePoint[][] = [];
  let currentChain: StrokePoint[] = [];

  const pushPointToChain = (pt: StrokePoint) => {
    const last = currentChain[currentChain.length - 1];
    if (!last || Math.hypot(pt.x - last.x, (pt.y - last.y) / safeIso) > 0.03) {
      currentChain.push(pt);
    }
  };

  const flushChain = () => {
    if (currentChain.length >= 2) {
      let totalLen = 0;
      for (let i = 0; i < currentChain.length - 1; i++) {
        totalLen += Math.hypot(
          currentChain[i + 1].x - currentChain[i].x,
          (currentChain[i + 1].y - currentChain[i].y) / safeIso
        );
      }
      if (totalLen >= 0.14) {
        chains.push(currentChain);
      }
    }
    currentChain = [];
  };

  for (let i = 0; i < pts.length - 1; i++) {
    const pA = pts[i];
    const pB = pts[i + 1];
    const ax = pA.x - cx;
    const ay = pA.y / safeIso - cy;
    const bx = pB.x - cx;
    const by = pB.y / safeIso - cy;
    const dx = bx - ax;
    const dy = by - ay;
    const aCoef = dx * dx + dy * dy;

    if (aCoef < 1e-7) {
      if (ax * ax + ay * ay > rSq) {
        pushPointToChain(pA);
      } else {
        flushChain();
      }
      continue;
    }

    const bCoef = 2 * (ax * dx + ay * dy);
    const cCoef = ax * ax + ay * ay - rSq;
    const disc = bCoef * bCoef - 4 * aCoef * cCoef;

    if (disc <= 0) {
      // Entire segment is outside eraser circle
      pushPointToChain(pA);
      pushPointToChain(pB);
      continue;
    }

    const sqrtDisc = Math.sqrt(disc);
    const t1 = (-bCoef - sqrtDisc) / (2 * aCoef);
    const t2 = (-bCoef + sqrtDisc) / (2 * aCoef);

    if (t2 <= 0 || t1 >= 1) {
      // No intersection within [0, 1]
      pushPointToChain(pA);
      pushPointToChain(pB);
      continue;
    }

    // Outside sub-segment before entering circle: [0, t1]
    if (t1 > 0.001) {
      pushPointToChain(pA);
      pushPointToChain(interpolateStrokePoint(pA, pB, t1));
    }
    // We entered the eraser circle -> close current chain
    flushChain();

    // Outside sub-segment after exiting circle: [t2, 1]
    if (t2 < 0.999) {
      pushPointToChain(interpolateStrokePoint(pA, pB, t2));
      pushPointToChain(pB);
    }
  }

  flushChain();

  if (chains.length === 1 && chains[0].length === pts.length) {
    return { pieces: [stroke], modified: false };
  }

  const pieces: NotebookStroke[] = chains.map((chainPts, idx) => ({
    ...stroke,
    id:
      idx === 0 && chains.length === 1
        ? stroke.id
        : `${stroke.id}-p${idx}-${Math.random().toString(36).slice(2, 6)}`,
    points: chainPts,
  }));

  return { pieces, modified: true };
}

function buildShapePoints(
  shape: NotebookDrawShape,
  start: StrokePoint,
  end: StrokePoint,
  isoYFactor: number = 0.707
): StrokePoint[] {
  const safeIso = isoYFactor > 0.05 ? isoYFactor : 0.707;
  const x1 = +start.x.toFixed(2);
  const y1 = +start.y.toFixed(2);
  const x2 = +end.x.toFixed(2);
  const y2 = +end.y.toFixed(2);

  if (shape === 'line') {
    return [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
  }

  if (shape === 'arrow') {
    const dx = x2 - x1;
    const dyIso = (y2 - y1) / safeIso;
    const len = Math.hypot(dx, dyIso);
    if (len < 0.4) {
      return [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
      ];
    }
    const headLen = Math.min(3.4, Math.max(1.4, len * 0.24));
    const angle = Math.atan2(dyIso, dx);
    const wingAngle = Math.PI / 6.2; // ~29°
    const w1x = +(x2 - headLen * Math.cos(angle - wingAngle)).toFixed(2);
    const w1y = +(y2 - headLen * Math.sin(angle - wingAngle) * safeIso).toFixed(2);
    const w2x = +(x2 - headLen * Math.cos(angle + wingAngle)).toFixed(2);
    const w2y = +(y2 - headLen * Math.sin(angle + wingAngle) * safeIso).toFixed(2);
    // Repeated corner points ensure buildSmoothSvgPath draws crisp corners
    return [
      { x: x1, y: y1 },
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x2, y: y2 },
      { x: w1x, y: w1y },
      { x: w1x, y: w1y },
      { x: x2, y: y2 },
      { x: x2, y: y2 },
      { x: w2x, y: w2y },
      { x: w2x, y: w2y },
    ];
  }

  if (shape === 'rect') {
    const minX = +Math.min(x1, x2).toFixed(2);
    const maxX = +Math.max(x1, x2).toFixed(2);
    const minY = +Math.min(y1, y2).toFixed(2);
    const maxY = +Math.max(y1, y2).toFixed(2);
    return [
      { x: minX, y: minY },
      { x: minX, y: minY },
      { x: maxX, y: minY },
      { x: maxX, y: minY },
      { x: maxX, y: maxY },
      { x: maxX, y: maxY },
      { x: minX, y: maxY },
      { x: minX, y: maxY },
      { x: minX, y: minY },
      { x: minX, y: minY },
    ];
  }

  if (shape === 'ellipse') {
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const rx = Math.abs(x2 - x1) / 2;
    const ry = Math.abs(y2 - y1) / 2;
    const steps = 36;
    const pts: StrokePoint[] = [];
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      pts.push({
        x: +(cx + rx * Math.cos(theta)).toFixed(2),
        y: +(cy + ry * Math.sin(theta)).toFixed(2),
      });
    }
    return pts;
  }

  return [start, end];
}

function renderVectorShapeSvg(
  shape: NotebookShapeElement,
  aspectRatio: number,
  strokeOpacity: number,
  isInteractive: boolean,
  onSelectAndStartMove?: (e: React.PointerEvent<SVGElement>) => void
): React.ReactNode {
  const safeIso = aspectRatio > 0.05 ? aspectRatio : 0.707;
  const hitWidth = Math.max(2.6, shape.width + 1.8);
  const hitPointerEvents: React.CSSProperties['pointerEvents'] = isInteractive
    ? shape.filled && (shape.kind === 'rect' || shape.kind === 'ellipse')
      ? 'all'
      : 'stroke'
    : 'none';

  const handleHitDown = (e: React.PointerEvent<SVGElement>) => {
    if (!isInteractive || !onSelectAndStartMove) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.stopPropagation();
    onSelectAndStartMove(e);
  };

  const getStrokeDashArray = (style?: 'solid' | 'dashed' | 'dotted', width = 1) => {
    if (style === 'dashed') return `${width * 3.2} ${width * 2.5}`;
    if (style === 'dotted') return `${width * 0.9} ${width * 2.2}`;
    return undefined;
  };
  const dashArray = getStrokeDashArray(shape.lineStyle, shape.width);
  const cx = (shape.x1 + shape.x2) / 2;
  const cy = (shape.y1 + shape.y2) / 2;
  const rot = shape.rotation ?? 0;
  const rotTransform =
    rot !== 0
      ? `translate(${cx} ${cy}) scale(1 ${safeIso}) rotate(${rot}) scale(1 ${1 / safeIso}) translate(${-cx} ${-cy})`
      : undefined;

  if (shape.kind === 'line') {
    return (
      <g key={shape.id} transform={rotTransform}>
        <line
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
          stroke={shape.color}
          strokeWidth={shape.width}
          strokeOpacity={strokeOpacity}
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
        {isInteractive && (
          <line
            x1={shape.x1}
            y1={shape.y1}
            x2={shape.x2}
            y2={shape.y2}
            stroke="transparent"
            strokeWidth={hitWidth}
            strokeLinecap="round"
            style={{ pointerEvents: hitPointerEvents, cursor: 'move' }}
            onPointerDown={handleHitDown}
          />
        )}
      </g>
    );
  }

  if (shape.kind === 'arrow') {
    const dx = shape.x2 - shape.x1;
    const dyIso = (shape.y2 - shape.y1) / safeIso;
    const len = Math.hypot(dx, dyIso);
    const headLen = Math.min(3.6, Math.max(1.4, len * 0.24, shape.width * 2.2));
    const angle = Math.atan2(dyIso, dx);
    const wingAngle = Math.PI / 6.2;
    const w1x = +(shape.x2 - headLen * Math.cos(angle - wingAngle)).toFixed(2);
    const w1y = +(shape.y2 - headLen * Math.sin(angle - wingAngle) * safeIso).toFixed(2);
    const w2x = +(shape.x2 - headLen * Math.cos(angle + wingAngle)).toFixed(2);
    const w2y = +(shape.y2 - headLen * Math.sin(angle + wingAngle) * safeIso).toFixed(2);
    const headPoints = `${w1x},${w1y} ${shape.x2},${shape.y2} ${w2x},${w2y}`;

    return (
      <g key={shape.id} transform={rotTransform}>
        <line
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
          stroke={shape.color}
          strokeWidth={shape.width}
          strokeOpacity={strokeOpacity}
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
        {len >= 0.35 && (
          <polyline
            points={headPoints}
            fill="none"
            stroke={shape.color}
            strokeWidth={shape.width}
            strokeOpacity={strokeOpacity}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {isInteractive && (
          <>
            <line
              x1={shape.x1}
              y1={shape.y1}
              x2={shape.x2}
              y2={shape.y2}
              stroke="transparent"
              strokeWidth={hitWidth}
              strokeLinecap="round"
              style={{ pointerEvents: 'stroke', cursor: 'move' }}
              onPointerDown={handleHitDown}
            />
            {len >= 0.35 && (
              <polyline
                points={headPoints}
                fill="none"
                stroke="transparent"
                strokeWidth={hitWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: 'stroke', cursor: 'move' }}
                onPointerDown={handleHitDown}
              />
            )}
          </>
        )}
      </g>
    );
  }

  if (shape.kind === 'rect') {
    const minX = Math.min(shape.x1, shape.x2);
    const minY = Math.min(shape.y1, shape.y2);
    const w = Math.max(0.2, Math.abs(shape.x2 - shape.x1));
    const h = Math.max(0.2, Math.abs(shape.y2 - shape.y1));

    return (
      <g key={shape.id} transform={rotTransform}>
        <rect
          x={minX}
          y={minY}
          width={w}
          height={h}
          rx={0.25}
          ry={0.25}
          fill={shape.filled ? shape.color : 'none'}
          fillOpacity={shape.filled ? (shape.tool === 'highlighter' ? 0.24 : 0.14) : 0}
          stroke={shape.color}
          strokeWidth={shape.width}
          strokeOpacity={strokeOpacity}
          strokeDasharray={dashArray}
          strokeLinejoin="round"
        />
        {isInteractive && (
          <rect
            x={minX}
            y={minY}
            width={w}
            height={h}
            fill={shape.filled ? 'transparent' : 'none'}
            stroke="transparent"
            strokeWidth={hitWidth}
            style={{ pointerEvents: hitPointerEvents, cursor: 'move' }}
            onPointerDown={handleHitDown}
          />
        )}
      </g>
    );
  }

  // 'ellipse'
  const rx = Math.max(0.1, Math.abs(shape.x2 - shape.x1) / 2);
  const ry = Math.max(0.1, Math.abs(shape.y2 - shape.y1) / 2);

  return (
    <g key={shape.id} transform={rotTransform}>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={shape.filled ? shape.color : 'none'}
        fillOpacity={shape.filled ? (shape.tool === 'highlighter' ? 0.24 : 0.14) : 0}
        stroke={shape.color}
        strokeWidth={shape.width}
        strokeOpacity={strokeOpacity}
        strokeDasharray={dashArray}
      />
      {isInteractive && (
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill={shape.filled ? 'transparent' : 'none'}
          stroke="transparent"
          strokeWidth={hitWidth}
          style={{ pointerEvents: hitPointerEvents, cursor: 'move' }}
          onPointerDown={handleHitDown}
        />
      )}
    </g>
  );
}

function isPointInPolygon(pt: StrokePoint, polygon: StrokePoint[]): boolean {
  if (polygon.length < 3) return false;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect =
      yi > pt.y !== yj > pt.y &&
      pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointInRect(
  pt: { x: number; y: number },
  rect: { x1: number; y1: number; x2: number; y2: number }
): boolean {
  const minX = Math.min(rect.x1, rect.x2);
  const maxX = Math.max(rect.x1, rect.x2);
  const minY = Math.min(rect.y1, rect.y2);
  const maxY = Math.max(rect.y1, rect.y2);
  return pt.x >= minX && pt.x <= maxX && pt.y >= minY && pt.y <= maxY;
}

interface BoxBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

function isPointInBox(pt: { x: number; y: number }, box: BoxBounds): boolean {
  return pt.x >= box.minX && pt.x <= box.maxX && pt.y >= box.minY && pt.y <= box.maxY;
}

function boxesOverlap(a: BoxBounds, b: BoxBounds): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

function getShapeBounds(sh: NotebookShapeElement): BoxBounds {
  const pad = Math.max(0.6, sh.width * 0.6);
  return {
    minX: Math.max(0, Math.min(sh.x1, sh.x2) - pad),
    minY: Math.max(0, Math.min(sh.y1, sh.y2) - pad),
    maxX: Math.min(100, Math.max(sh.x1, sh.x2) + pad),
    maxY: Math.min(100, Math.max(sh.y1, sh.y2) + pad),
  };
}

function isPointOnShape(
  pt: { x: number; y: number },
  sh: NotebookShapeElement,
  isoYFactor: number = 0.707
): boolean {
  const safeIso = isoYFactor > 0.05 ? isoYFactor : 0.707;
  const hitRadius = Math.max(1.8, sh.width + 1.1);
  if (sh.kind === 'line' || sh.kind === 'arrow') {
    const distSq = pointToSegmentDistSq(
      pt.x,
      pt.y / safeIso,
      sh.x1,
      sh.y1 / safeIso,
      sh.x2,
      sh.y2 / safeIso
    );
    return distSq <= hitRadius * hitRadius;
  }
  const b = getShapeBounds(sh);
  return (
    pt.x >= b.minX - 1.0 &&
    pt.x <= b.maxX + 1.0 &&
    pt.y >= b.minY - 1.0 &&
    pt.y <= b.maxY + 1.0
  );
}

function getTextBoxBounds(t: NotebookTextBox): BoxBounds {
  const lines = (t.text || 'Text').split('\n');
  const maxChars = Math.max(8, ...lines.map((l) => l.length));
  const estW = Math.min(76, Math.max(14, maxChars * t.fontSize * 0.56 + 3));
  const estH = Math.min(60, Math.max(4.5, lines.length * t.fontSize * 1.45 + 2));
  return {
    minX: Math.max(0, t.x),
    minY: Math.max(0, t.y),
    maxX: Math.min(100, t.x + estW),
    maxY: Math.min(100, t.y + estH),
  };
}

function getStickyBounds(n: NotebookStickyNote): BoxBounds {
  const w = n.isCollapsed ? 15 : 24;
  const h = n.isCollapsed ? 5 : 17;
  return {
    minX: Math.max(0, n.x - 1),
    minY: Math.max(0, n.y - 1),
    maxX: Math.min(100, n.x + w),
    maxY: Math.min(100, n.y + h),
  };
}

function getStickerBounds(stk: NotebookSticker): BoxBounds {
  const scale = stk.scale ?? 1;
  const hw = 6.5 * scale;
  const hh = 2.8 * scale;
  return {
    minX: Math.max(0, stk.x - hw),
    minY: Math.max(0, stk.y - hh),
    maxX: Math.min(100, stk.x + hw),
    maxY: Math.min(100, stk.y + hh),
  };
}

function getImageBounds(img: NotebookImageElement, pageAspect: number = 0.707): BoxBounds {
  const rot = (((img.rotation ?? 0) % 360) + 360) % 360;
  const rawAspect = Math.max(0.2, img.aspectRatio || 1.333);
  const imgAspect = rot === 90 || rot === 270 ? 1 / rawAspect : rawAspect;
  const heightPct = (img.widthPct / imgAspect) * Math.max(0.2, pageAspect);
  const hw = img.widthPct / 2;
  const hh = Math.max(4, heightPct / 2);
  return {
    minX: Math.max(0, img.x - hw),
    minY: Math.max(0, img.y - hh),
    maxX: Math.min(100, img.x + hw),
    maxY: Math.min(100, img.y + hh),
  };
}

function isStrokeSelectedByLasso(
  stroke: NotebookStroke,
  lassoPts: StrokePoint[],
  isoYFactor: number = 0.707
): boolean {
  if (stroke.points.length === 0 || lassoPts.length === 0) return false;
  if (lassoPts.length < 3) {
    return isPointNearStroke(lassoPts[0], stroke, Math.max(1.6, stroke.width * 0.75), isoYFactor);
  }
  // Check if any sample point (or segment midpoint) of the stroke lies inside the lasso polygon
  for (let i = 0; i < stroke.points.length; i++) {
    if (isPointInPolygon(stroke.points[i], lassoPts)) return true;
    if (i < stroke.points.length - 1) {
      const mid = {
        x: (stroke.points[i].x + stroke.points[i + 1].x) / 2,
        y: (stroke.points[i].y + stroke.points[i + 1].y) / 2,
      };
      if (isPointInPolygon(mid, lassoPts)) return true;
    }
  }
  // Also allow selecting a stroke by crossing it with the lasso line
  for (let i = 0; i < lassoPts.length; i += 2) {
    if (isPointNearStroke(lassoPts[i], stroke, Math.max(0.9, stroke.width * 0.5), isoYFactor)) {
      return true;
    }
  }
  return false;
}

function getStrokesBounds(
  strokes: NotebookStroke[]
): { minX: number; minY: number; maxX: number; maxY: number } | null {
  if (strokes.length === 0) return null;
  let minX = 100;
  let minY = 100;
  let maxX = 0;
  let maxY = 0;
  let hasAny = false;
  for (const s of strokes) {
    const pad = Math.max(0.6, s.width * 0.6);
    for (const pt of s.points) {
      hasAny = true;
      if (pt.x - pad < minX) minX = pt.x - pad;
      if (pt.y - pad < minY) minY = pt.y - pad;
      if (pt.x + pad > maxX) maxX = pt.x + pad;
      if (pt.y + pad > maxY) maxY = pt.y + pad;
    }
  }
  if (!hasAny) return null;
  return {
    minX: Math.max(0, minX),
    minY: Math.max(0, minY),
    maxX: Math.min(100, maxX),
    maxY: Math.min(100, maxY),
  };
}

interface AutoTextItemProps {
  box: NotebookTextBox;
  fontSizePx: number;
  paperPalette: BlankPaperPalette;
  isDrawTool: boolean;
  isSelected: boolean;
  isMultiSelected?: boolean;
  autoFocus: boolean;
  onSelect: () => void;
  onShiftPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
  onFocusBox: () => void;
  onClearAutoFocus: () => void;
  onStartDrag: (e: React.PointerEvent<HTMLElement>) => void;
  onStartRotate: (
    e: React.PointerEvent<HTMLElement>,
    centerClientX: number,
    centerClientY: number
  ) => void;
  onUpdateBox: (
    patch: Partial<
      Pick<
        NotebookTextBox,
        | 'text'
        | 'runs'
        | 'color'
        | 'fontSize'
        | 'bold'
        | 'italic'
        | 'underline'
        | 'strikethrough'
        | 'lineHeight'
        | 'align'
        | 'rotation'
      >
    >,
    recordHistory?: boolean
  ) => void;
  onToggleBackground: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBlurBox: () => void;
  onSyncActiveFormatBridge?: (
    bridge: {
      boxId: string;
      activeStyle: ResolvedTextStyle;
      applyFormatPatch: (patch: Partial<ResolvedTextStyle>) => void;
      onBeforeNativeColorPicker: () => void;
      onAfterNativeColorPicker: () => void;
    } | null
  ) => void;
}

const TextBoxOverlayItem: React.FC<AutoTextItemProps> = ({
  box,
  fontSizePx,
  paperPalette,
  isDrawTool,
  isSelected,
  isMultiSelected = false,
  autoFocus,
  onSelect,
  onShiftPointerDown,
  onFocusBox,
  onClearAutoFocus,
  onStartDrag,
  onStartRotate,
  onUpdateBox,
  onDuplicate,
  onDelete,
  onBlurBox,
  onSyncActiveFormatBridge,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef<boolean>(false);
  const isPickingNativeColorRef = useRef<boolean>(false);
  const lastSyncedSigRef = useRef<string>('');
  const savedOffsetsRef = useRef<{ start: number; end: number; hasSelection: boolean } | null>(null);
  const pendingStyleOverrideRef = useRef<ResolvedTextStyle | null>(null);

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

      const liveOffsets = getSelectionOffsetsInElement(el);
      const offsets =
        liveOffsets && liveOffsets.hasSelection
          ? liveOffsets
          : savedOffsetsRef.current && savedOffsetsRef.current.hasSelection
          ? savedOffsetsRef.current
          : liveOffsets ?? savedOffsetsRef.current;
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

      // If no sub-range is selected and the box already contains text, apply the style change to the whole box so clicking top bar buttons works immediately
      if (box.text && currentRuns.length > 0) {
        const nextRuns = applyStyleToRange(
          currentRuns,
          0,
          box.text.length,
          patch,
          nextStyle
        );
        const nextText = nextRuns.map((r) => r.text).join('');
        const nextSig = `${serializeRunsSignature(nextRuns, nextStyle)}|${nextText}`;
        renderRunsIntoElement(el, nextRuns, nextStyle);
        const caret = offsets ? Math.min(offsets.end, nextText.length) : nextText.length;
        if (!isPickingNativeColorRef.current) {
          restoreSelectionOffsetsInElement(el, caret, caret);
        }
        lastSyncedSigRef.current = nextSig;
        pendingStyleOverrideRef.current = nextStyle;
        setActiveTypingStyle(nextStyle);
        onUpdateBox(
          {
            text: nextText,
            runs: nextRuns,
            color: nextStyle.color,
            bold: nextStyle.bold,
            italic: nextStyle.italic,
            underline: nextStyle.underline,
            strikethrough: nextStyle.strikethrough,
          },
          !isPickingNativeColorRef.current
        );
        return;
      }

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

  const handleBeforeNativeColorPicker = useCallback(() => {
    isPickingNativeColorRef.current = true;
    const el = editorRef.current;
    if (el) {
      const off = getSelectionOffsetsInElement(el);
      if (off) savedOffsetsRef.current = off;
    }
  }, []);

  const handleAfterNativeColorPicker = useCallback(() => {
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
        renderRunsIntoElement(el, getEffectiveRuns(box), getBoxBaseStyle(box), {
          offset: saved.start,
          style: pendingStyleOverrideRef.current,
        });
      }
    });
  }, [box, isSelected]);

  useEffect(() => {
    if (!onSyncActiveFormatBridge) return;
    if (isSelected && !isMultiSelected) {
      onSyncActiveFormatBridge({
        boxId: box.id,
        activeStyle: activeTypingStyle,
        applyFormatPatch,
        onBeforeNativeColorPicker: handleBeforeNativeColorPicker,
        onAfterNativeColorPicker: handleAfterNativeColorPicker,
      });
    }
  }, [
    isSelected,
    isMultiSelected,
    box.id,
    activeTypingStyle,
    applyFormatPatch,
    handleBeforeNativeColorPicker,
    handleAfterNativeColorPicker,
    onSyncActiveFormatBridge,
  ]);

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

  const bgStyle: TextBoxBackgroundStyle =
    box.backgroundStyle ?? ((box.hasBackground ?? true) ? 'white' : 'transparent');
  const currentLineHeight = box.lineHeight ?? 1.35;
  const currentAlign = box.align ?? 'left';
  const currentRotation = Math.round(box.rotation ?? 0);

  return (
    <div
      ref={wrapperRef}
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        transform: `rotate(${currentRotation}deg)`,
        transformOrigin: 'center center',
      }}
      onPointerDown={(e) => {
        if (e.shiftKey) {
          onShiftPointerDown(e);
          return;
        }
        if (isDrawTool) return;
        e.stopPropagation();
        if (isMultiSelected) {
          onStartDrag(e);
          return;
        }
        onSelect();
      }}
      className={`absolute group max-w-[78%] ${
        isDrawTool ? 'pointer-events-none opacity-95' : 'pointer-events-auto'
      }`}
    >
      {/* Slim Non-Overlapping Top Drag & Quick Action Pill (All Formatting is in the Top Bar!) */}
      {!isDrawTool && !isMultiSelected && (
        <div
          className={`absolute -top-6 left-0 flex items-center gap-0.5 px-1 py-0.5 rounded-t-md bg-slate-900/90 text-white shadow-sm transition-opacity z-20 ${
            isSelected
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
          }`}
        >
          <button
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              if (e.shiftKey) {
                onShiftPointerDown(e);
                return;
              }
              onSelect();
              onStartDrag(e);
            }}
            title="Textfeld verschieben"
            aria-label="Textfeld verschieben"
            className="px-1 py-0.5 rounded hover:bg-white/15 cursor-grab active:cursor-grabbing flex items-center gap-0.5"
          >
            <GripHorizontal className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            title="Textfeld duplizieren (⌘D)"
            aria-label="Textfeld duplizieren"
            className="p-0.5 rounded hover:bg-white/15 text-white cursor-pointer"
          >
            <Copy className="w-3 h-3" />
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
            className="p-0.5 rounded hover:bg-rose-500/80 text-white cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="relative">
        {!box.text && (
          <span
            aria-hidden="true"
            style={{
              fontSize: `${fontSizePx}px`,
              lineHeight: currentLineHeight,
              textAlign: currentAlign,
            }}
            className="pointer-events-none select-none absolute inset-x-2 top-1 text-slate-400/75 font-medium"
          >
            Text tippen...
          </span>
        )}
        <div
          ref={editorRef}
          contentEditable={!isDrawTool && !isMultiSelected}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Freitextfeld"
          onFocus={() => {
            if (isMultiSelected) return;
            isFocusedRef.current = true;
            onSelect();
            onFocusBox();
            syncCursorStyle(false);
          }}
          onPointerDown={(e) => {
            if (e.shiftKey) {
              onShiftPointerDown(e);
              return;
            }
            if (isDrawTool) return;
            e.stopPropagation();
            if (isMultiSelected) {
              onStartDrag(e);
              return;
            }
            onSelect();
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
            pendingStyleOverrideRef.current = null;
            onBlurBox();
          }}
          style={{
            color: box.color,
            fontSize: `${fontSizePx}px`,
            lineHeight: currentLineHeight,
            textAlign: currentAlign,
            minWidth: `${Math.max(120, fontSizePx * 7)}px`,
            minHeight: `${Math.max(24, Math.round(fontSizePx * currentLineHeight + 8))}px`,
            WebkitUserSelect: isDrawTool || isMultiSelected ? 'none' : 'text',
            userSelect: isDrawTool || isMultiSelected ? 'none' : 'text',
            ...(bgStyle === 'paper'
              ? {
                  backgroundColor: paperPalette.bgHex,
                  borderColor: paperPalette.lineHex,
                }
              : {}),
          }}
          className={`min-w-[11rem] max-w-full px-2 py-1 rounded-md font-medium whitespace-pre-wrap break-words focus:outline-hidden transition-shadow ${
            bgStyle === 'white'
              ? 'bg-white/95 shadow-sm border border-slate-200/90'
              : bgStyle === 'paper'
              ? 'shadow-sm border'
              : 'bg-transparent border border-transparent'
          } ${
            (isSelected && !isDrawTool) || isMultiSelected
              ? 'ring-2 ring-indigo-500/80 border-indigo-400'
              : !isDrawTool
              ? 'group-hover:border-indigo-300/80'
              : ''
          }`}
        />
      </div>

      {/* Bottom Free-Rotation Drag Handle ("unten freies drehen") */}
      {isSelected && !isDrawTool && !isMultiSelected && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 select-none"
        >
          <div className="w-0.5 h-2.5 bg-indigo-500/80" />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const el = wrapperRef.current;
                if (!el) return;
                const r = el.getBoundingClientRect();
                onStartRotate(e, r.left + r.width / 2, r.top + r.height / 2);
              }}
              title="Mit der Maus ziehen zum freien Drehen (Shift halten für 15°-Schritte)"
              aria-label="Textfeld frei drehen"
              className="w-6 h-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md border-2 border-white flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
            >
              <RotateCw className="w-3 h-3" />
            </button>
            {currentRotation !== 0 && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateBox({ rotation: 0 }, true);
                }}
                title="Drehung auf 0° zurücksetzen"
                className="px-1.5 py-0.5 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white text-[10px] font-mono font-bold shadow-sm cursor-pointer"
              >
                {currentRotation}°
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface EmbeddedImageItemProps {
  item: NotebookImageElement;
  isInteractive: boolean;
  isSelected: boolean;
  isMultiSelected?: boolean;
  onSelect: () => void;
  onShiftPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
  onStartDrag: (e: React.PointerEvent<HTMLElement>) => void;
  onStartResize: (e: React.PointerEvent<HTMLElement>) => void;
  onUpdate: (patch: Partial<Pick<NotebookImageElement, 'widthPct' | 'opacity' | 'rotation'>>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onCrop: () => void;
}

const EmbeddedImageOverlayItem: React.FC<EmbeddedImageItemProps> = ({
  item,
  isInteractive,
  isSelected,
  isMultiSelected = false,
  onSelect,
  onShiftPointerDown,
  onStartDrag,
  onStartResize,
  onUpdate,
  onDuplicate,
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
        if (e.shiftKey) {
          onShiftPointerDown(e);
          return;
        }
        if (!isInteractive) return;
        e.stopPropagation();
        if (!isMultiSelected) {
          onSelect();
        }
        onStartDrag(e);
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 group select-none ${
        isSelected || isMultiSelected ? 'z-[8]' : 'z-[5]'
      } ${
        isInteractive
          ? 'pointer-events-auto cursor-grab active:cursor-grabbing'
          : 'pointer-events-none'
      }`}
    >
      {/* Floating Mini Controls for Selected Image (hidden when part of multi-selection) */}
      {isSelected && !isMultiSelected && isInteractive && (
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
              onDuplicate();
            }}
            title="Foto duplizieren (⌘D)"
            aria-label="Foto duplizieren"
            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
          >
            <Copy className="w-3 h-3" />
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
          (isSelected && isInteractive) || isMultiSelected
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
      {isSelected && !isMultiSelected && isInteractive && (
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
  drawShape = 'freehand',
  shapeLineStyle = 'solid',
  eraserMode = 'whole',
  eraserWidth = 3.2,
  eraserTarget = 'all',
  textColor,
  textSize,
  textBackgroundStyle,
  paperPalette,
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
  retinaMode = 'auto',
  blockCanvasContextMenu = true,
  selectedImageSignal,
  deleteSelectionSignal,
  duplicateSelectionSignal,
  clearSelectionSignal,
  copySelectionSignal,
  pasteSelectionSignal,
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

  // Active stroke & shape drawing state
  const [draftStroke, setDraftStroke] = useState<NotebookStroke | null>(null);
  const draftStrokeRef = useRef<NotebookStroke | null>(null);
  const [draftShape, setDraftShape] = useState<NotebookShapeElement | null>(null);
  const draftShapeRef = useRef<NotebookShapeElement | null>(null);
  const shapeStartPointRef = useRef<StrokePoint | null>(null);
  const hoverCursorRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);
  const isErasingRef = useRef(false);
  const erasedAnyRef = useRef(false);
  const preEraseSnapshotRef = useRef<PageAnnotations | null>(null);
  const latestAnnotationsRef = useRef<PageAnnotations>(annotations);
  latestAnnotationsRef.current = annotations;

  // Lasso state for selecting & moving handwriting strokes
  const [lassoPath, setLassoPath] = useState<StrokePoint[]>([]);
  const lassoPathRef = useRef<StrokePoint[]>([]);
  const isLassoDrawingRef = useRef(false);
  const [selectedStrokeIds, setSelectedStrokeIds] = useState<string[]>([]);
  const [selectedShapeIds, setSelectedShapeIds] = useState<string[]>([]);
  const [selectedTextBoxIds, setSelectedTextBoxIds] = useState<string[]>([]);
  const [selectedStickyIds, setSelectedStickyIds] = useState<string[]>([]);
  const [selectedStickerIds, setSelectedStickerIds] = useState<string[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  const [marqueeRect, setMarqueeRect] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const isMarqueeDrawingRef = useRef(false);
  const marqueeStartRef = useRef<StrokePoint | null>(null);
  const shiftTargetOnDownRef = useRef<{
    kind: 'stroke' | 'shape' | 'text' | 'sticky' | 'sticker' | 'image';
    id: string;
  } | null>(null);
  const dragMultiRef = useRef<{
    startClientX: number;
    startClientY: number;
    hasMoved: boolean;
    origSnapshot: PageAnnotations;
    origBounds: BoxBounds;
  } | null>(null);

  const totalSelectedCount =
    selectedStrokeIds.length +
    selectedShapeIds.length +
    selectedTextBoxIds.length +
    selectedStickyIds.length +
    selectedStickerIds.length +
    selectedImageIds.length;

  // Newly created sticky notes & text boxes to autofocus
  const [autoFocusStickyId, setAutoFocusStickyId] = useState<string | null>(null);
  const [autoFocusTextId, setAutoFocusTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedStickyId, setSelectedStickyId] = useState<string | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [isHeaderDateFocused, setIsHeaderDateFocused] = useState<boolean>(false);
  const [activeCropImage, setActiveCropImage] = useState<{
    id: string;
    url: string;
    rotation?: number;
  } | null>(null);

  const clearMultiSelection = useCallback(() => {
    setSelectedStrokeIds([]);
    setSelectedShapeIds([]);
    setSelectedTextBoxIds([]);
    setSelectedStickyIds([]);
    setSelectedStickerIds([]);
    setSelectedImageIds([]);
  }, []);

  const getSeededMultiSelection = useCallback(() => {
    const strokes = new Set(selectedStrokeIds);
    const shapes = new Set(selectedShapeIds);
    const texts = new Set(selectedTextBoxIds);
    const stickies = new Set(selectedStickyIds);
    const stickers = new Set(selectedStickerIds);
    const images = new Set(selectedImageIds);

    if (selectedShapeId) shapes.add(selectedShapeId);
    if (selectedTextId) texts.add(selectedTextId);
    if (selectedStickyId) stickies.add(selectedStickyId);
    if (selectedStickerId) stickers.add(selectedStickerId);
    if (selectedImageId) images.add(selectedImageId);

    return { strokes, shapes, texts, stickies, stickers, images };
  }, [
    selectedStrokeIds,
    selectedShapeIds,
    selectedTextBoxIds,
    selectedStickyIds,
    selectedStickerIds,
    selectedImageIds,
    selectedShapeId,
    selectedTextId,
    selectedStickyId,
    selectedStickerId,
    selectedImageId,
  ]);

  const toggleElementInMultiSelection = useCallback(
    (
      kind: 'stroke' | 'shape' | 'text' | 'sticky' | 'sticker' | 'image',
      id: string
    ) => {
      const seeded = getSeededMultiSelection();
      const targetSet =
        kind === 'stroke'
          ? seeded.strokes
          : kind === 'shape'
          ? seeded.shapes
          : kind === 'text'
          ? seeded.texts
          : kind === 'sticky'
          ? seeded.stickies
          : kind === 'sticker'
          ? seeded.stickers
          : seeded.images;

      if (targetSet.has(id)) {
        targetSet.delete(id);
      } else {
        targetSet.add(id);
      }

      setSelectedShapeId(null);
      setSelectedTextId(null);
      setSelectedStickyId(null);
      setSelectedStickerId(null);
      setSelectedImageId(null);

      setSelectedStrokeIds(Array.from(seeded.strokes));
      setSelectedShapeIds(Array.from(seeded.shapes));
      setSelectedTextBoxIds(Array.from(seeded.texts));
      setSelectedStickyIds(Array.from(seeded.stickies));
      setSelectedStickerIds(Array.from(seeded.stickers));
      setSelectedImageIds(Array.from(seeded.images));
    },
    [getSeededMultiSelection]
  );

  useEffect(() => {
    if (selectedImageSignal?.id) {
      setSelectedImageId(selectedImageSignal.id);
      setSelectedStickerId(null);
      setSelectedTextId(null);
      setSelectedStickyId(null);
      setSelectedShapeId(null);
      clearMultiSelection();
    }
  }, [selectedImageSignal, clearMultiSelection]);

  useEffect(() => {
    setSelectedStickerId(null);
    setSelectedTextId(null);
    setSelectedImageId(null);
    setSelectedStickyId(null);
    setSelectedShapeId(null);
    clearMultiSelection();
    setLassoPath([]);
  }, [notebook.id, pageNumber, clearMultiSelection]);

  useEffect(() => {
    if (activeTool === 'eraser') {
      setSelectedShapeId(null);
      clearMultiSelection();
      setLassoPath([]);
    } else if (activeTool === 'lasso') {
      setSelectedShapeId(null);
    }
  }, [activeTool, clearMultiSelection]);

  useEffect(() => {
    onSelectionChange?.(
      Boolean(
        selectedImageId ||
          selectedTextId ||
          selectedStickerId ||
          selectedStickyId ||
          selectedShapeId ||
          totalSelectedCount > 0
      )
    );
  }, [
    selectedImageId,
    selectedTextId,
    selectedStickerId,
    selectedStickyId,
    selectedShapeId,
    totalSelectedCount,
    onSelectionChange,
  ]);

  useEffect(() => {
    onCropModalOpenChange?.(Boolean(activeCropImage));
  }, [activeCropImage, onCropModalOpenChange]);

  const handleDuplicateShape = useCallback(
    (id: string) => {
      const latest = latestAnnotationsRef.current;
      const src = (latest.shapes || []).find((sh) => sh.id === id);
      if (!src) return;
      const newId = `shp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const copy: NotebookShapeElement = {
        ...src,
        id: newId,
        x1: Math.min(98.5, +(src.x1 + 2.5).toFixed(2)),
        y1: Math.min(98.5, +(src.y1 + 2.5).toFixed(2)),
        x2: Math.min(98.5, +(src.x2 + 2.5).toFixed(2)),
        y2: Math.min(98.5, +(src.y2 + 2.5).toFixed(2)),
        createdAt: Date.now(),
      };
      setSelectedShapeId(newId);
      setSelectedTextId(null);
      setSelectedImageId(null);
      setSelectedStickerId(null);
      setSelectedStickyId(null);
      clearMultiSelection();
      onCommitAnnotations(
        {
          ...latest,
          shapes: [...(latest.shapes || []), copy],
        },
        true
      );
    },
    [onCommitAnnotations, clearMultiSelection]
  );

  const handleUpdateShape = useCallback(
    (
      id: string,
      patch: Partial<
        Pick<
          NotebookShapeElement,
          | 'kind'
          | 'color'
          | 'width'
          | 'filled'
          | 'lineStyle'
          | 'x1'
          | 'y1'
          | 'x2'
          | 'y2'
          | 'rotation'
        >
      >,
      recordHistory: boolean = true
    ) => {
      const latest = latestAnnotationsRef.current;
      onCommitAnnotations(
        {
          ...latest,
          shapes: (latest.shapes || []).map((sh) =>
            sh.id === id ? { ...sh, ...patch } : sh
          ),
        },
        recordHistory
      );
    },
    [onCommitAnnotations]
  );

  const handleDeleteShape = useCallback(
    (id: string) => {
      const latest = latestAnnotationsRef.current;
      onCommitAnnotations(
        {
          ...latest,
          shapes: (latest.shapes || []).filter((sh) => sh.id !== id),
        },
        true
      );
      if (selectedShapeId === id) setSelectedShapeId(null);
    },
    [onCommitAnnotations, selectedShapeId]
  );

  const handleDuplicateTextBox = useCallback(
    (id: string) => {
      const latest = latestAnnotationsRef.current;
      const src = (latest.textBoxes || []).find((t) => t.id === id);
      if (!src) return;
      const newId = `txt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const copy: NotebookTextBox = {
        ...src,
        id: newId,
        x: Math.min(82, +(src.x + 2.5).toFixed(2)),
        y: Math.min(90, +(src.y + 2.5).toFixed(2)),
        runs: src.runs ? src.runs.map((r) => ({ ...r })) : undefined,
        createdAt: Date.now(),
      };
      setSelectedTextId(newId);
      setSelectedImageId(null);
      setSelectedStickerId(null);
      setSelectedStickyId(null);
      setSelectedShapeId(null);
      clearMultiSelection();
      onCommitAnnotations(
        {
          ...latest,
          textBoxes: [...(latest.textBoxes || []), copy],
        },
        true
      );
    },
    [onCommitAnnotations, clearMultiSelection]
  );

  const handleDuplicateEmbeddedImage = useCallback(
    (id: string) => {
      const latest = latestAnnotationsRef.current;
      const src = (latest.images || []).find((img) => img.id === id);
      if (!src) return;
      const newId = `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const copy: NotebookImageElement = {
        ...src,
        id: newId,
        x: Math.min(92, +(src.x + 3).toFixed(2)),
        y: Math.min(92, +(src.y + 3).toFixed(2)),
        createdAt: Date.now(),
      };
      setSelectedImageId(newId);
      setSelectedTextId(null);
      setSelectedStickerId(null);
      setSelectedStickyId(null);
      setSelectedShapeId(null);
      clearMultiSelection();
      onCommitAnnotations(
        {
          ...latest,
          images: [...(latest.images || []), copy],
        },
        true
      );
    },
    [onCommitAnnotations, clearMultiSelection]
  );

  const handleDuplicateSticker = useCallback(
    (id: string) => {
      const latest = latestAnnotationsRef.current;
      const src = latest.stickers.find((s) => s.id === id);
      if (!src) return;
      const newId = `stk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const copy: NotebookSticker = {
        ...src,
        id: newId,
        x: Math.min(92, +(src.x + 3).toFixed(2)),
        y: Math.min(92, +(src.y + 3).toFixed(2)),
      };
      setSelectedStickerId(newId);
      setSelectedImageId(null);
      setSelectedTextId(null);
      setSelectedStickyId(null);
      setSelectedShapeId(null);
      clearMultiSelection();
      onCommitAnnotations(
        {
          ...latest,
          stickers: [...latest.stickers, copy],
        },
        true
      );
    },
    [onCommitAnnotations, clearMultiSelection]
  );

  const handleDuplicateSticky = useCallback(
    (id: string) => {
      const latest = latestAnnotationsRef.current;
      const src = latest.stickyNotes.find((n) => n.id === id);
      if (!src) return;
      const newId = `sticky-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const copy: NotebookStickyNote = {
        ...src,
        id: newId,
        x: Math.min(82, +(src.x + 3).toFixed(2)),
        y: Math.min(88, +(src.y + 3).toFixed(2)),
        createdAt: Date.now(),
      };
      setSelectedStickyId(newId);
      setSelectedImageId(null);
      setSelectedTextId(null);
      setSelectedStickerId(null);
      setSelectedShapeId(null);
      clearMultiSelection();
      onCommitAnnotations(
        {
          ...latest,
          stickyNotes: [...latest.stickyNotes, copy],
        },
        true
      );
    },
    [onCommitAnnotations, clearMultiSelection]
  );

  const handleDuplicateSelectedStrokes = useCallback(() => {
    if (selectedStrokeIds.length === 0) return;
    const latest = latestAnnotationsRef.current;
    const idSet = new Set(selectedStrokeIds);
    const selectedStrokes = latest.strokes.filter((s) => idSet.has(s.id));
    if (selectedStrokes.length === 0) return;
    const now = Date.now();
    const newIds: string[] = [];
    const copies: NotebookStroke[] = selectedStrokes.map((s, idx) => {
      const newId = `str-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
      newIds.push(newId);
      return {
        ...s,
        id: newId,
        points: s.points.map((pt) => ({
          ...pt,
          x: Math.min(99.5, +(pt.x + 2.2).toFixed(2)),
          y: Math.min(99.5, +(pt.y + 2.2).toFixed(2)),
        })),
      };
    });
    setSelectedStrokeIds(newIds);
    onCommitAnnotations(
      {
        ...latest,
        strokes: [...latest.strokes, ...copies],
      },
      true
    );
  }, [selectedStrokeIds, onCommitAnnotations]);

  const multiSelectionBounds = useMemo((): BoxBounds | null => {
    if (totalSelectedCount === 0) return null;

    const currentAspect = surface ? surface.width / surface.height : 0.707;
    let minX = 100,
      minY = 100,
      maxX = 0,
      maxY = 0;
    let hasAny = false;

    if (selectedStrokeIds.length > 0) {
      const b = getStrokesBounds(
        annotations.strokes.filter((s) => selectedStrokeIds.includes(s.id))
      );
      if (b) {
        hasAny = true;
        minX = Math.min(minX, b.minX);
        minY = Math.min(minY, b.minY);
        maxX = Math.max(maxX, b.maxX);
        maxY = Math.max(maxY, b.maxY);
      }
    }
    for (const sh of annotations.shapes || []) {
      if (selectedShapeIds.includes(sh.id)) {
        hasAny = true;
        const b = getShapeBounds(sh);
        minX = Math.min(minX, b.minX);
        minY = Math.min(minY, b.minY);
        maxX = Math.max(maxX, b.maxX);
        maxY = Math.max(maxY, b.maxY);
      }
    }
    for (const t of annotations.textBoxes || []) {
      if (selectedTextBoxIds.includes(t.id)) {
        hasAny = true;
        const b = getTextBoxBounds(t);
        minX = Math.min(minX, b.minX);
        minY = Math.min(minY, b.minY);
        maxX = Math.max(maxX, b.maxX);
        maxY = Math.max(maxY, b.maxY);
      }
    }
    for (const n of annotations.stickyNotes) {
      if (selectedStickyIds.includes(n.id)) {
        hasAny = true;
        const b = getStickyBounds(n);
        minX = Math.min(minX, b.minX);
        minY = Math.min(minY, b.minY);
        maxX = Math.max(maxX, b.maxX);
        maxY = Math.max(maxY, b.maxY);
      }
    }
    for (const stk of annotations.stickers) {
      if (selectedStickerIds.includes(stk.id)) {
        hasAny = true;
        const b = getStickerBounds(stk);
        minX = Math.min(minX, b.minX);
        minY = Math.min(minY, b.minY);
        maxX = Math.max(maxX, b.maxX);
        maxY = Math.max(maxY, b.maxY);
      }
    }
    for (const img of annotations.images || []) {
      if (selectedImageIds.includes(img.id)) {
        hasAny = true;
        const b = getImageBounds(img, currentAspect);
        minX = Math.min(minX, b.minX);
        minY = Math.min(minY, b.minY);
        maxX = Math.max(maxX, b.maxX);
        maxY = Math.max(maxY, b.maxY);
      }
    }

    if (!hasAny) return null;
    return {
      minX: Math.max(0, minX - 0.8),
      minY: Math.max(0, minY - 0.8),
      maxX: Math.min(100, maxX + 0.8),
      maxY: Math.min(100, maxY + 0.8),
    };
  }, [
    annotations,
    surface,
    totalSelectedCount,
    selectedStrokeIds,
    selectedShapeIds,
    selectedTextBoxIds,
    selectedStickyIds,
    selectedStickerIds,
    selectedImageIds,
  ]);

  const handleMultiDuplicate = useCallback(() => {
    if (totalSelectedCount === 0) return;
    const latest = latestAnnotationsRef.current;
    const now = Date.now();

    const b = multiSelectionBounds;
    const dupDx = b ? Math.max(-2.5, Math.min(2.5, 99 - b.maxX)) || 1.5 : 2.5;
    const dupDy = b ? Math.max(-2.5, Math.min(2.5, 99 - b.maxY)) || 1.5 : 2.5;

    const newStrokeIds: string[] = [];
    const newShapeIds: string[] = [];
    const newTextIds: string[] = [];
    const newStickyIds: string[] = [];
    const newStickerIds: string[] = [];
    const newImageIds: string[] = [];

    const strokeIdSet = new Set(selectedStrokeIds);
    const duplicatedStrokes = latest.strokes
      .filter((s) => strokeIdSet.has(s.id))
      .map((s, idx) => {
        const newId = `str-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
        newStrokeIds.push(newId);
        return {
          ...s,
          id: newId,
          points: s.points.map((pt) => ({
            ...pt,
            x: +(pt.x + dupDx).toFixed(2),
            y: +(pt.y + dupDy).toFixed(2),
          })),
        };
      });

    const duplicatedShapes = (latest.shapes || [])
      .filter((sh) => selectedShapeIds.includes(sh.id))
      .map((sh, idx) => {
        const newId = `shp-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
        newShapeIds.push(newId);
        return {
          ...sh,
          id: newId,
          x1: +(sh.x1 + dupDx).toFixed(2),
          y1: +(sh.y1 + dupDy).toFixed(2),
          x2: +(sh.x2 + dupDx).toFixed(2),
          y2: +(sh.y2 + dupDy).toFixed(2),
          createdAt: Date.now(),
        };
      });

    const duplicatedTextBoxes = (latest.textBoxes || [])
      .filter((t) => selectedTextBoxIds.includes(t.id))
      .map((t, idx) => {
        const newId = `txt-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
        newTextIds.push(newId);
        return {
          ...t,
          id: newId,
          x: +(t.x + dupDx).toFixed(2),
          y: +(t.y + dupDy).toFixed(2),
          runs: t.runs ? t.runs.map((r) => ({ ...r })) : undefined,
          createdAt: Date.now(),
        };
      });

    const duplicatedStickyNotes = latest.stickyNotes
      .filter((n) => selectedStickyIds.includes(n.id))
      .map((n, idx) => {
        const newId = `sticky-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
        newStickyIds.push(newId);
        return {
          ...n,
          id: newId,
          x: +(n.x + dupDx).toFixed(2),
          y: +(n.y + dupDy).toFixed(2),
          createdAt: Date.now(),
        };
      });

    const duplicatedStickers = latest.stickers
      .filter((stk) => selectedStickerIds.includes(stk.id))
      .map((stk, idx) => {
        const newId = `stk-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
        newStickerIds.push(newId);
        return {
          ...stk,
          id: newId,
          x: +(stk.x + dupDx).toFixed(2),
          y: +(stk.y + dupDy).toFixed(2),
        };
      });

    const duplicatedImages = (latest.images || [])
      .filter((img) => selectedImageIds.includes(img.id))
      .map((img, idx) => {
        const newId = `img-dup-${now}-${idx}-${Math.random().toString(36).slice(2, 6)}`;
        newImageIds.push(newId);
        return {
          ...img,
          id: newId,
          x: +(img.x + dupDx).toFixed(2),
          y: +(img.y + dupDy).toFixed(2),
          createdAt: Date.now(),
        };
      });

    setSelectedStrokeIds(newStrokeIds);
    setSelectedShapeIds(newShapeIds);
    setSelectedTextBoxIds(newTextIds);
    setSelectedStickyIds(newStickyIds);
    setSelectedStickerIds(newStickerIds);
    setSelectedImageIds(newImageIds);

    onCommitAnnotations(
      {
        ...latest,
        strokes: [...latest.strokes, ...duplicatedStrokes],
        shapes: [...(latest.shapes || []), ...duplicatedShapes],
        textBoxes: [...(latest.textBoxes || []), ...duplicatedTextBoxes],
        stickyNotes: [...latest.stickyNotes, ...duplicatedStickyNotes],
        stickers: [...latest.stickers, ...duplicatedStickers],
        images: [...(latest.images || []), ...duplicatedImages],
      },
      true
    );
  }, [
    totalSelectedCount,
    multiSelectionBounds,
    selectedStrokeIds,
    selectedShapeIds,
    selectedTextBoxIds,
    selectedStickyIds,
    selectedStickerIds,
    selectedImageIds,
    onCommitAnnotations,
  ]);

  const handleMultiDelete = useCallback(() => {
    if (totalSelectedCount === 0) return;
    const latest = latestAnnotationsRef.current;
    const strokeIdSet = new Set(selectedStrokeIds);

    onCommitAnnotations(
      {
        ...latest,
        strokes: latest.strokes.filter((s) => !strokeIdSet.has(s.id)),
        shapes: (latest.shapes || []).filter((sh) => !selectedShapeIds.includes(sh.id)),
        textBoxes: (latest.textBoxes || []).filter((t) => !selectedTextBoxIds.includes(t.id)),
        stickyNotes: latest.stickyNotes.filter((n) => !selectedStickyIds.includes(n.id)),
        stickers: latest.stickers.filter((stk) => !selectedStickerIds.includes(stk.id)),
        images: (latest.images || []).filter((img) => !selectedImageIds.includes(img.id)),
      },
      true
    );

    clearMultiSelection();
    setSelectedShapeId(null);
    setSelectedTextId(null);
    setSelectedStickyId(null);
    setSelectedStickerId(null);
    setSelectedImageId(null);
  }, [
    totalSelectedCount,
    selectedStrokeIds,
    selectedShapeIds,
    selectedTextBoxIds,
    selectedStickyIds,
    selectedStickerIds,
    selectedImageIds,
    clearMultiSelection,
    onCommitAnnotations,
  ]);

  const lastDeleteSignalRef = useRef<number>(deleteSelectionSignal ?? 0);
  useEffect(() => {
    const seq = deleteSelectionSignal ?? 0;
    if (seq === 0 || seq === lastDeleteSignalRef.current) return;
    lastDeleteSignalRef.current = seq;
    if (totalSelectedCount > 0) {
      handleMultiDelete();
      return;
    }
    const latest = latestAnnotationsRef.current;
    if (selectedShapeId) {
      onCommitAnnotations(
        {
          ...latest,
          shapes: (latest.shapes || []).filter((sh) => sh.id !== selectedShapeId),
        },
        true
      );
      setSelectedShapeId(null);
    } else if (selectedImageId) {
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
    } else if (selectedStickyId) {
      onCommitAnnotations(
        {
          ...latest,
          stickyNotes: latest.stickyNotes.filter((n) => n.id !== selectedStickyId),
        },
        true
      );
      setSelectedStickyId(null);
    }
  }, [
    deleteSelectionSignal,
    totalSelectedCount,
    handleMultiDelete,
    selectedShapeId,
    selectedImageId,
    selectedTextId,
    selectedStickerId,
    selectedStickyId,
    onCommitAnnotations,
  ]);

  const lastDuplicateSignalRef = useRef<number>(duplicateSelectionSignal ?? 0);
  useEffect(() => {
    const seq = duplicateSelectionSignal ?? 0;
    if (seq === 0 || seq === lastDuplicateSignalRef.current) return;
    lastDuplicateSignalRef.current = seq;
    if (totalSelectedCount > 0) {
      handleMultiDuplicate();
      return;
    } else if (selectedShapeId) {
      handleDuplicateShape(selectedShapeId);
    } else if (selectedImageId) {
      handleDuplicateEmbeddedImage(selectedImageId);
    } else if (selectedTextId) {
      handleDuplicateTextBox(selectedTextId);
    } else if (selectedStickerId) {
      handleDuplicateSticker(selectedStickerId);
    } else if (selectedStickyId) {
      handleDuplicateSticky(selectedStickyId);
    }
  }, [
    duplicateSelectionSignal,
    totalSelectedCount,
    selectedStrokeIds,
    selectedShapeIds,
    selectedTextBoxIds,
    selectedStickyIds,
    selectedStickerIds,
    selectedImageIds,
    selectedShapeId,
    selectedImageId,
    selectedTextId,
    selectedStickerId,
    selectedStickyId,
    handleMultiDuplicate,
    handleDuplicateSelectedStrokes,
    handleDuplicateShape,
    handleDuplicateEmbeddedImage,
    handleDuplicateTextBox,
    handleDuplicateSticker,
    handleDuplicateSticky,
  ]);

  const lastClearSignalRef = useRef<number>(clearSelectionSignal ?? 0);
  useEffect(() => {
    const seq = clearSelectionSignal ?? 0;
    if (seq === 0 || seq === lastClearSignalRef.current) return;
    lastClearSignalRef.current = seq;
    setSelectedImageId(null);
    setSelectedTextId(null);
    setSelectedStickerId(null);
    setSelectedStickyId(null);
    setSelectedShapeId(null);
    clearMultiSelection();
    setLassoPath([]);
  }, [clearSelectionSignal, clearMultiSelection]);

  const clipboardRef = useRef<{
    strokes: NotebookStroke[];
    shapes: NotebookShapeElement[];
    textBoxes: NotebookTextBox[];
    stickyNotes: NotebookStickyNote[];
    stickers: NotebookSticker[];
    images: NotebookImageElement[];
  } | null>(null);

  const lastCopySignalRef = useRef<number>(copySelectionSignal ?? 0);
  useEffect(() => {
    const seq = copySelectionSignal ?? 0;
    if (seq === 0 || seq === lastCopySignalRef.current) return;
    lastCopySignalRef.current = seq;
    const latest = latestAnnotationsRef.current;
    const sStroke = new Set(selectedStrokeIds);
    const sShape = new Set(selectedShapeIds);
    const sText = new Set(selectedTextBoxIds);
    const sSticky = new Set(selectedStickyIds);
    const sSticker = new Set(selectedStickerIds);
    const sImage = new Set(selectedImageIds);

    if (selectedShapeId) sShape.add(selectedShapeId);
    if (selectedTextId) sText.add(selectedTextId);
    if (selectedStickyId) sSticky.add(selectedStickyId);
    if (selectedStickerId) sSticker.add(selectedStickerId);
    if (selectedImageId) sImage.add(selectedImageId);

    clipboardRef.current = {
      strokes: latest.strokes.filter((s) => sStroke.has(s.id)),
      shapes: (latest.shapes || []).filter((sh) => sShape.has(sh.id)),
      textBoxes: (latest.textBoxes || []).filter((t) => sText.has(t.id)),
      stickyNotes: latest.stickyNotes.filter((n) => sSticky.has(n.id)),
      stickers: latest.stickers.filter((stk) => sSticker.has(stk.id)),
      images: (latest.images || []).filter((img) => sImage.has(img.id)),
    };
  }, [
    copySelectionSignal,
    selectedStrokeIds,
    selectedShapeIds,
    selectedTextBoxIds,
    selectedStickyIds,
    selectedStickerIds,
    selectedImageIds,
    selectedShapeId,
    selectedTextId,
    selectedStickyId,
    selectedStickerId,
    selectedImageId,
  ]);

  const lastPasteSignalRef = useRef<number>(pasteSelectionSignal ?? 0);
  useEffect(() => {
    const seq = pasteSelectionSignal ?? 0;
    if (seq === 0 || seq === lastPasteSignalRef.current) return;
    lastPasteSignalRef.current = seq;
    const clip = clipboardRef.current;
    if (!clip) return;
    const totalInClip =
      clip.strokes.length +
      clip.shapes.length +
      clip.textBoxes.length +
      clip.stickyNotes.length +
      clip.stickers.length +
      clip.images.length;
    if (totalInClip === 0) return;

    const latest = latestAnnotationsRef.current;
    const offset = 3.0;

    const newStrokes: NotebookStroke[] = clip.strokes.map((s) => ({
      ...s,
      id: `str-p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      points: s.points.map((pt) => ({
        ...pt,
        x: Math.min(96, +(pt.x + offset).toFixed(2)),
        y: Math.min(96, +(pt.y + offset).toFixed(2)),
      })),
    }));

    const newShapes: NotebookShapeElement[] = clip.shapes.map((sh) => ({
      ...sh,
      id: `shp-p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      x1: Math.min(96, +(sh.x1 + offset).toFixed(2)),
      y1: Math.min(96, +(sh.y1 + offset).toFixed(2)),
      x2: Math.min(96, +(sh.x2 + offset).toFixed(2)),
      y2: Math.min(96, +(sh.y2 + offset).toFixed(2)),
    }));

    const newTextBoxes: NotebookTextBox[] = clip.textBoxes.map((t) => ({
      ...t,
      id: `txt-p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      x: Math.min(96, +(t.x + offset).toFixed(2)),
      y: Math.min(96, +(t.y + offset).toFixed(2)),
      runs: t.runs ? t.runs.map((r) => ({ ...r })) : undefined,
    }));

    const newStickies: NotebookStickyNote[] = clip.stickyNotes.map((n) => ({
      ...n,
      id: `stk-p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      x: Math.min(96, +(n.x + offset).toFixed(2)),
      y: Math.min(96, +(n.y + offset).toFixed(2)),
    }));

    const newStickers: NotebookSticker[] = clip.stickers.map((stk) => ({
      ...stk,
      id: `stk-p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      x: Math.min(96, +(stk.x + offset).toFixed(2)),
      y: Math.min(96, +(stk.y + offset).toFixed(2)),
    }));

    const newImages: NotebookImageElement[] = clip.images.map((img) => ({
      ...img,
      id: `img-p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      x: Math.min(96, +(img.x + offset).toFixed(2)),
      y: Math.min(96, +(img.y + offset).toFixed(2)),
    }));

    onCommitAnnotations(
      {
        ...latest,
        strokes: [...latest.strokes, ...newStrokes],
        shapes: [...(latest.shapes || []), ...newShapes],
        textBoxes: [...(latest.textBoxes || []), ...newTextBoxes],
        stickyNotes: [...latest.stickyNotes, ...newStickies],
        stickers: [...latest.stickers, ...newStickers],
        images: [...(latest.images || []), ...newImages],
      },
      true
    );

    if (totalInClip === 1 && newStrokes.length === 0) {
      clearMultiSelection();
      setSelectedShapeId(newShapes[0]?.id ?? null);
      setSelectedTextId(newTextBoxes[0]?.id ?? null);
      setSelectedStickyId(newStickies[0]?.id ?? null);
      setSelectedStickerId(newStickers[0]?.id ?? null);
      setSelectedImageId(newImages[0]?.id ?? null);
    } else {
      setSelectedShapeId(null);
      setSelectedTextId(null);
      setSelectedStickyId(null);
      setSelectedStickerId(null);
      setSelectedImageId(null);
      setSelectedStrokeIds(newStrokes.map((s) => s.id));
      setSelectedShapeIds(newShapes.map((sh) => sh.id));
      setSelectedTextBoxIds(newTextBoxes.map((t) => t.id));
      setSelectedStickyIds(newStickies.map((n) => n.id));
      setSelectedStickerIds(newStickers.map((stk) => stk.id));
      setSelectedImageIds(newImages.map((img) => img.id));
    }
  }, [pasteSelectionSignal, onCommitAnnotations, clearMultiSelection]);

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

  // Free mouse rotation state for Text Boxes, Stickers, Shapes & Embedded Images
  const rotateItemRef = useRef<{
    kind: 'text' | 'sticker' | 'shape' | 'image';
    id: string;
    centerClientX: number;
    centerClientY: number;
    startPointerAngleDeg: number;
    origRotation: number;
    hasRotated: boolean;
    origSnapshot: PageAnnotations;
  } | null>(null);

  const startRotateSession = useCallback(
    (
      kind: 'text' | 'sticker' | 'shape' | 'image',
      id: string,
      origRotation: number,
      centerClientX: number,
      centerClientY: number,
      e: React.PointerEvent<Element>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        stageRef.current?.setPointerCapture(e.pointerId);
      } catch {}
      const startPointerAngleDeg =
        (Math.atan2(e.clientY - centerClientY, e.clientX - centerClientX) * 180) / Math.PI;
      rotateItemRef.current = {
        kind,
        id,
        centerClientX,
        centerClientY,
        startPointerAngleDeg,
        origRotation,
        hasRotated: false,
        origSnapshot: latestAnnotationsRef.current,
      };
    },
    []
  );

  const activeTextBridgeRef = useRef<{
    boxId: string;
    activeStyle: ResolvedTextStyle;
    applyFormatPatch: (patch: Partial<ResolvedTextStyle>) => void;
    onBeforeNativeColorPicker: () => void;
    onAfterNativeColorPicker: () => void;
  } | null>(null);
  const [selectedTextActiveStyle, setSelectedTextActiveStyle] =
    useState<ResolvedTextStyle | null>(null);

  const handleSyncActiveFormatBridge = useCallback(
    (
      bridge: {
        boxId: string;
        activeStyle: ResolvedTextStyle;
        applyFormatPatch: (patch: Partial<ResolvedTextStyle>) => void;
        onBeforeNativeColorPicker: () => void;
        onAfterNativeColorPicker: () => void;
      } | null
    ) => {
      activeTextBridgeRef.current = bridge;
      setSelectedTextActiveStyle(bridge ? bridge.activeStyle : null);
    },
    []
  );

  // Dragging & endpoint/corner resizing state for Vector Shapes
  const dragShapeRef = useRef<{
    id: string;
    mode: 'move' | 'p1' | 'p2' | 'nw' | 'ne' | 'sw' | 'se';
    startClientX: number;
    startClientY: number;
    origX1: number;
    origY1: number;
    origX2: number;
    origY2: number;
    hasMoved: boolean;
    origSnapshot: PageAnnotations;
  } | null>(null);

  // Dragging state for Lasso-selected handwriting strokes
  const dragStrokesRef = useRef<{
    strokeIds: Set<string>;
    startClientX: number;
    startClientY: number;
    origPointsById: Map<string, StrokePoint[]>;
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

  const preEditHeaderSnapshotRef = useRef<{
    field: 'topic' | 'date';
    startValue: string;
    snapshot: PageAnnotations;
  } | null>(null);

  const headerTopicInputRef = useRef<HTMLInputElement>(null);
  const headerDateInputRef = useRef<HTMLInputElement>(null);

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
      const pdfTargetW = retinaMode === 'ultra' ? 1700 : 1300;
      const pdfMaxDpr = retinaMode === 'ultra' ? 3 : 2;
      renderPdfPageToDataUrl(notebook.pdfUrl, pageNumber, effectiveRotation, pdfTargetW, pdfMaxDpr)
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
        const blankW = retinaMode === 'ultra' ? 1680 : 1240;
        const effectivePaperColor =
          annotations.paperColorOverride ?? customPage.paperColor ?? 'white';
        const effectiveShowHeader =
          annotations.showDateHeader ?? Boolean(customPage.showDateHeader);
        const res = renderBlankTemplateToDataUrl(
          annotations.templateOverride ?? customPage.template,
          effectiveRotation,
          blankW,
          effectivePaperColor,
          effectiveShowHeader
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
        const pdfTargetW = retinaMode === 'ultra' ? 1700 : 1300;
        const pdfMaxDpr = retinaMode === 'ultra' ? 3 : 2;
        getMediaObjectUrl(customPage.mediaId)
          .then((url) => {
            if (cancelled) return null;
            if (!url) throw new Error('missing media');
            return renderPdfPageToDataUrl(
              url,
              customPage.pdfPageNumber,
              effectiveRotation,
              pdfTargetW,
              pdfMaxDpr
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
      const blankW = retinaMode === 'ultra' ? 1680 : 1240;
      const res = renderBlankTemplateToDataUrl(
        annotations.templateOverride ?? 'blank',
        effectiveRotation,
        blankW,
        annotations.paperColorOverride ?? 'white',
        Boolean(annotations.showDateHeader)
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
    customPage?.kind === 'blank' ? customPage.paperColor : undefined,
    customPage?.kind === 'blank' ? customPage.showDateHeader : undefined,
    annotations.templateOverride,
    annotations.paperColorOverride,
    annotations.showDateHeader,
    pageNumber,
    effectiveRotation,
    annotations.rotationOverride,
    retinaMode,
  ]);

  const isDrawTool =
    activeTool === 'pen' ||
    activeTool === 'highlighter' ||
    activeTool === 'eraser' ||
    activeTool === 'lasso';

  const isBrushHoverTool =
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
          target.tagName === 'INPUT' ||
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

  const getBrushHoverTargetOpacity = useCallback((): string => {
    if (activeTool === 'pen') return '0.88';
    if (activeTool === 'highlighter') return '0.52';
    if (activeTool === 'eraser') return '0.9';
    return '0';
  }, [activeTool]);

  const updateBrushHoverPos = useCallback(
    (clientX: number, clientY: number, pointerType: string) => {
      const indicator = hoverCursorRef.current;
      const stageEl = stageRef.current;
      if (!indicator || !stageEl) return;
      if (!isBrushHoverTool || pointerType === 'touch') {
        indicator.style.opacity = '0';
        return;
      }
      const rect = stageEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const xPx = clientX - rect.left;
      const yPx = clientY - rect.top;
      if (xPx < 0 || yPx < 0 || xPx > rect.width || yPx > rect.height) {
        indicator.style.opacity = '0';
        return;
      }
      indicator.style.transform = `translate3d(${xPx.toFixed(1)}px, ${yPx.toFixed(1)}px, 0) translate(-50%, -50%)`;
      indicator.style.opacity = getBrushHoverTargetOpacity();
    },
    [isBrushHoverTool, getBrushHoverTargetOpacity]
  );

  const hideBrushHover = useCallback(() => {
    if (hoverCursorRef.current) {
      hoverCursorRef.current.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    if (!isBrushHoverTool && hoverCursorRef.current) {
      hoverCursorRef.current.style.opacity = '0';
    }
  }, [isBrushHoverTool]);

  const startShiftGesture = (
    e: React.PointerEvent<Element>,
    hitTarget?: {
      kind: 'stroke' | 'shape' | 'text' | 'sticky' | 'sticker' | 'image';
      id: string;
    }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    activePointerIdRef.current = e.pointerId;
    try {
      stageRef.current?.setPointerCapture(e.pointerId);
    } catch {}
    shiftTargetOnDownRef.current = hitTarget ?? null;
    isMarqueeDrawingRef.current = true;
    const ptStart = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
    if (ptStart) {
      marqueeStartRef.current = ptStart;
      setMarqueeRect({ x1: ptStart.x, y1: ptStart.y, x2: ptStart.x, y2: ptStart.y });
    }
  };

  const startMultiDragSession = (e: React.PointerEvent<Element>) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    try {
      stageRef.current?.setPointerCapture(e.pointerId);
    } catch {}
    dragMultiRef.current = {
      startClientX: e.clientX,
      startClientY: e.clientY,
      hasMoved: false,
      origSnapshot: latestAnnotationsRef.current,
      origBounds: multiSelectionBounds ?? { minX: 2, minY: 2, maxX: 98, maxY: 98 },
    };
  };

  const findTopElementAtPoint = (pt: {
    x: number;
    y: number;
  }): {
    kind: 'stroke' | 'shape' | 'text' | 'sticky' | 'sticker' | 'image';
    id: string;
  } | null => {
    const latest = latestAnnotationsRef.current;
    const currentAspect = surface ? surface.width / surface.height : 0.707;

    for (let i = latest.stickyNotes.length - 1; i >= 0; i--) {
      const n = latest.stickyNotes[i];
      if (isPointInBox(pt, getStickyBounds(n))) {
        return { kind: 'sticky', id: n.id };
      }
    }
    const shapes = latest.shapes || [];
    for (let i = shapes.length - 1; i >= 0; i--) {
      const sh = shapes[i];
      if (isPointOnShape(pt, sh, currentAspect)) {
        return { kind: 'shape', id: sh.id };
      }
    }
    for (let i = latest.strokes.length - 1; i >= 0; i--) {
      const s = latest.strokes[i];
      if (isPointNearStroke(pt, s, Math.max(1.8, s.width * 0.85), currentAspect)) {
        return { kind: 'stroke', id: s.id };
      }
    }
    const textBoxes = latest.textBoxes || [];
    for (let i = textBoxes.length - 1; i >= 0; i--) {
      const t = textBoxes[i];
      if (isPointInBox(pt, getTextBoxBounds(t))) {
        return { kind: 'text', id: t.id };
      }
    }
    for (let i = latest.stickers.length - 1; i >= 0; i--) {
      const stk = latest.stickers[i];
      if (isPointInBox(pt, getStickerBounds(stk))) {
        return { kind: 'sticker', id: stk.id };
      }
    }
    const images = latest.images || [];
    for (let i = images.length - 1; i >= 0; i--) {
      const img = images[i];
      if (isPointInBox(pt, getImageBounds(img, currentAspect))) {
        return { kind: 'image', id: img.id };
      }
    }
    return null;
  };

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    updateBrushHoverPos(e.clientX, e.clientY, e.pointerType);
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

    if (e.shiftKey) {
      startShiftGesture(e);
      return;
    }

    // Clear sticker, text, image, sticky, shape, and lasso selection on background tap
    setSelectedStickerId(null);
    setSelectedTextId(null);
    setSelectedImageId(null);
    setSelectedStickyId(null);
    setSelectedShapeId(null);
    clearMultiSelection();

    const effectiveTool: NotebookTool = isStylusEraser ? 'eraser' : activeTool;

    if (effectiveTool === 'hand') {
      return;
    }

    const pt = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
    if (!pt) return;

    if (effectiveTool === 'lasso') {
      e.preventDefault();
      activePointerIdRef.current = e.pointerId;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      isLassoDrawingRef.current = true;
      const startPt = { x: pt.x, y: pt.y };
      lassoPathRef.current = [startPt];
      setLassoPath([startPt]);
      return;
    }

    if (effectiveTool === 'pen' || effectiveTool === 'highlighter') {
      e.preventDefault();
      activePointerIdRef.current = e.pointerId;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore if unsupported
      }
      isDrawingRef.current = true;
      shapeStartPointRef.current = { x: pt.x, y: pt.y };

      if (drawShape !== 'freehand') {
        const newShape: NotebookShapeElement = {
          id: `shp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          kind: drawShape,
          tool: effectiveTool,
          color: effectiveTool === 'pen' ? penColor : highlighterColor,
          width: effectiveTool === 'pen' ? penWidth : highlighterWidth,
          x1: +pt.x.toFixed(2),
          y1: +pt.y.toFixed(2),
          x2: +pt.x.toFixed(2),
          y2: +pt.y.toFixed(2),
          filled: false,
          lineStyle: shapeLineStyle ?? 'solid',
          createdAt: Date.now(),
        };
        draftShapeRef.current = newShape;
        setDraftShape(newShape);
        return;
      }

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

      const currentAspect = surface ? surface.width / surface.height : 0.707;
      const radius = Math.max(0.5, eraserWidth / 2);
      const currentStrokes = latestAnnotationsRef.current.strokes;
      let changed = false;
      const nextStrokes: NotebookStroke[] = [];

      for (const s of currentStrokes) {
        if (eraserTarget === 'highlighter-only' && s.tool !== 'highlighter') {
          nextStrokes.push(s);
          continue;
        }
        if (eraserMode === 'partial') {
          const res = eraseStrokePartially(s, pt, radius, currentAspect);
          if (res.modified) changed = true;
          nextStrokes.push(...res.pieces);
        } else {
          const hit = isPointNearStroke(
            pt,
            s,
            Math.max(radius, s.width * 0.55),
            currentAspect
          );
          if (hit) {
            changed = true;
          } else {
            nextStrokes.push(s);
          }
        }
      }

      if (changed) {
        erasedAnyRef.current = true;
        onCommitAnnotations(
          { ...latestAnnotationsRef.current, strokes: nextStrokes },
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
        hasBackground: textBackgroundStyle !== 'transparent',
        backgroundStyle: textBackgroundStyle,
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
      setSelectedStickyId(id);
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
    updateBrushHoverPos(e.clientX, e.clientY, e.pointerType);

    if (dragMultiRef.current && stageRef.current) {
      e.preventDefault();
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const rawDxPct = ((e.clientX - dragMultiRef.current.startClientX) / rect.width) * 100;
      const rawDyPct = ((e.clientY - dragMultiRef.current.startClientY) / rect.height) * 100;
      if (Math.abs(rawDxPct) > 0.06 || Math.abs(rawDyPct) > 0.06) {
        dragMultiRef.current.hasMoved = true;
      }

      const orig = dragMultiRef.current.origSnapshot;
      const ob = dragMultiRef.current.origBounds;
      const dxPct = Math.max(0.4 - ob.minX, Math.min(99.6 - ob.maxX, rawDxPct));
      const dyPct = Math.max(0.4 - ob.minY, Math.min(99.6 - ob.maxY, rawDyPct));

      const strokeIdSet = new Set(selectedStrokeIds);
      const shapeIdSet = new Set(selectedShapeIds);
      const textIdSet = new Set(selectedTextBoxIds);
      const stickyIdSet = new Set(selectedStickyIds);
      const stickerIdSet = new Set(selectedStickerIds);
      const imageIdSet = new Set(selectedImageIds);

      const nextStrokes = orig.strokes.map((s) => {
        if (!strokeIdSet.has(s.id)) return s;
        return {
          ...s,
          points: s.points.map((pt) => ({
            ...pt,
            x: +(pt.x + dxPct).toFixed(2),
            y: +(pt.y + dyPct).toFixed(2),
          })),
        };
      });

      const nextShapes = (orig.shapes || []).map((sh) => {
        if (!shapeIdSet.has(sh.id)) return sh;
        return {
          ...sh,
          x1: +(sh.x1 + dxPct).toFixed(2),
          y1: +(sh.y1 + dyPct).toFixed(2),
          x2: +(sh.x2 + dxPct).toFixed(2),
          y2: +(sh.y2 + dyPct).toFixed(2),
        };
      });

      const nextTextBoxes = (orig.textBoxes || []).map((t) => {
        if (!textIdSet.has(t.id)) return t;
        return {
          ...t,
          x: +(t.x + dxPct).toFixed(2),
          y: +(t.y + dyPct).toFixed(2),
        };
      });

      const nextStickyNotes = orig.stickyNotes.map((n) => {
        if (!stickyIdSet.has(n.id)) return n;
        return {
          ...n,
          x: +(n.x + dxPct).toFixed(2),
          y: +(n.y + dyPct).toFixed(2),
        };
      });

      const nextStickers = orig.stickers.map((stk) => {
        if (!stickerIdSet.has(stk.id)) return stk;
        return {
          ...stk,
          x: +(stk.x + dxPct).toFixed(2),
          y: +(stk.y + dyPct).toFixed(2),
        };
      });

      const nextImages = (orig.images || []).map((img) => {
        if (!imageIdSet.has(img.id)) return img;
        return {
          ...img,
          x: +(img.x + dxPct).toFixed(2),
          y: +(img.y + dyPct).toFixed(2),
        };
      });

      onCommitAnnotations(
        {
          ...orig,
          strokes: nextStrokes,
          shapes: nextShapes,
          textBoxes: nextTextBoxes,
          stickyNotes: nextStickyNotes,
          stickers: nextStickers,
          images: nextImages,
        },
        false
      );
      return;
    }

    if (isMarqueeDrawingRef.current && marqueeStartRef.current && stageRef.current) {
      e.preventDefault();
      const ptCurrent = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
      if (ptCurrent) {
        setMarqueeRect({
          x1: marqueeStartRef.current.x,
          y1: marqueeStartRef.current.y,
          x2: ptCurrent.x,
          y2: ptCurrent.y,
        });
      }
      return;
    }

    // Handle moving or resizing of a selected Vector Shape first
    if (dragShapeRef.current && stageRef.current) {
      e.preventDefault();
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dxPct = ((e.clientX - dragShapeRef.current.startClientX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragShapeRef.current.startClientY) / rect.height) * 100;
      if (Math.abs(dxPct) > 0.06 || Math.abs(dyPct) > 0.06) {
        dragShapeRef.current.hasMoved = true;
      }
      const { id, mode, origX1, origY1, origX2, origY2 } = dragShapeRef.current;
      const clampCoord = (v: number) => Math.max(0.4, Math.min(99.6, +v.toFixed(2)));

      let nextX1 = origX1;
      let nextY1 = origY1;
      let nextX2 = origX2;
      let nextY2 = origY2;

      if (mode === 'move') {
        const minOrigX = Math.min(origX1, origX2);
        const maxOrigX = Math.max(origX1, origX2);
        const minOrigY = Math.min(origY1, origY2);
        const maxOrigY = Math.max(origY1, origY2);
        const clampedDx = Math.max(0.4 - minOrigX, Math.min(99.6 - maxOrigX, dxPct));
        const clampedDy = Math.max(0.4 - minOrigY, Math.min(99.6 - maxOrigY, dyPct));
        nextX1 = +(origX1 + clampedDx).toFixed(2);
        nextY1 = +(origY1 + clampedDy).toFixed(2);
        nextX2 = +(origX2 + clampedDx).toFixed(2);
        nextY2 = +(origY2 + clampedDy).toFixed(2);
      } else if (mode === 'p1') {
        nextX1 = clampCoord(origX1 + dxPct);
        nextY1 = clampCoord(origY1 + dyPct);
      } else if (mode === 'p2') {
        nextX2 = clampCoord(origX2 + dxPct);
        nextY2 = clampCoord(origY2 + dyPct);
      } else if (mode === 'nw') {
        nextX1 = clampCoord(origX1 + dxPct);
        nextY1 = clampCoord(origY1 + dyPct);
      } else if (mode === 'ne') {
        nextX2 = clampCoord(origX2 + dxPct);
        nextY1 = clampCoord(origY1 + dyPct);
      } else if (mode === 'sw') {
        nextX1 = clampCoord(origX1 + dxPct);
        nextY2 = clampCoord(origY2 + dyPct);
      } else if (mode === 'se') {
        nextX2 = clampCoord(origX2 + dxPct);
        nextY2 = clampCoord(origY2 + dyPct);
      }

      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          shapes: (latestAnnotationsRef.current.shapes || []).map((sh) =>
            sh.id === id
              ? { ...sh, x1: nextX1, y1: nextY1, x2: nextX2, y2: nextY2 }
              : sh
          ),
        },
        false
      );
      return;
    }

    // Handle dragging of Lasso-selected strokes
    if (dragStrokesRef.current && stageRef.current) {
      e.preventDefault();
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dxPct = ((e.clientX - dragStrokesRef.current.startClientX) / rect.width) * 100;
      const dyPct = ((e.clientY - dragStrokesRef.current.startClientY) / rect.height) * 100;
      if (Math.abs(dxPct) > 0.06 || Math.abs(dyPct) > 0.06) {
        dragStrokesRef.current.hasMoved = true;
      }
      const { strokeIds, origPointsById } = dragStrokesRef.current;
      const nextStrokes = latestAnnotationsRef.current.strokes.map((s) => {
        if (!strokeIds.has(s.id)) return s;
        const origPts = origPointsById.get(s.id) ?? s.points;
        return {
          ...s,
          points: origPts.map((pt) => ({
            ...pt,
            x: Math.max(0.2, Math.min(99.8, +(pt.x + dxPct).toFixed(2))),
            y: Math.max(0.2, Math.min(99.8, +(pt.y + dyPct).toFixed(2))),
          })),
        };
      });
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          strokes: nextStrokes,
        },
        false
      );
      return;
    }

    // Handle resizing of embedded page image
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

      // Handle free mouse rotation of Text Boxes, Stickers, Shapes, or Embedded Images
    if (rotateItemRef.current) {
      e.preventDefault();
      const session = rotateItemRef.current;
      const currentAngleDeg =
        (Math.atan2(e.clientY - session.centerClientY, e.clientX - session.centerClientX) * 180) /
        Math.PI;
      const deltaDeg = currentAngleDeg - session.startPointerAngleDeg;
      let nextRot = Math.round((((session.origRotation + deltaDeg) % 360) + 360) % 360);

      if (e.shiftKey) {
        nextRot = (Math.round(nextRot / 15) * 15) % 360;
      } else {
        for (const cardinal of [0, 90, 180, 270, 360]) {
          if (Math.abs(nextRot - cardinal) <= 2) {
            nextRot = cardinal % 360;
            break;
          }
        }
      }

      if (nextRot !== (((session.origRotation % 360) + 360) % 360)) {
        session.hasRotated = true;
      }

      const latest = latestAnnotationsRef.current;
      if (session.kind === 'text') {
        onCommitAnnotations(
          {
            ...latest,
            textBoxes: (latest.textBoxes || []).map((t) =>
              t.id === session.id ? { ...t, rotation: nextRot } : t
            ),
          },
          false
        );
      } else if (session.kind === 'sticker') {
        onCommitAnnotations(
          {
            ...latest,
            stickers: latest.stickers.map((s) =>
              s.id === session.id ? { ...s, rotation: nextRot } : s
            ),
          },
          false
        );
      } else if (session.kind === 'shape') {
        onCommitAnnotations(
          {
            ...latest,
            shapes: (latest.shapes || []).map((sh) =>
              sh.id === session.id ? { ...sh, rotation: nextRot } : sh
            ),
          },
          false
        );
      } else if (session.kind === 'image') {
        onCommitAnnotations(
          {
            ...latest,
            images: (latest.images || []).map((img) =>
              img.id === session.id ? { ...img, rotation: nextRot } : img
            ),
          },
          false
        );
      }
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

    if (isLassoDrawingRef.current) {
      e.preventDefault();
      const pt = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
      if (!pt) return;
      const pts = lassoPathRef.current;
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(pt.x - last.x, pt.y - last.y) >= 0.35) {
        const nextPts = [...pts, { x: pt.x, y: pt.y }];
        lassoPathRef.current = nextPts;
        setLassoPath(nextPts);
      }
      return;
    }

    if (isDrawingRef.current && draftShapeRef.current) {
      e.preventDefault();
      const rawStart =
        shapeStartPointRef.current ?? {
          x: draftShapeRef.current.x1,
          y: draftShapeRef.current.y1,
        };
      const rawEnd = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
      if (rawStart && rawEnd) {
        let endX = rawEnd.x;
        let endY = rawEnd.y;
        const rect = stageRef.current?.getBoundingClientRect();
        const kind = draftShapeRef.current.kind;
        if (
          (kind === 'line' || kind === 'arrow') &&
          e.shiftKey &&
          rect &&
          rect.width > 0 &&
          rect.height > 0
        ) {
          const dxPx = ((rawEnd.x - rawStart.x) / 100) * rect.width;
          const dyPx = ((rawEnd.y - rawStart.y) / 100) * rect.height;
          const distPx = Math.hypot(dxPx, dyPx);
          if (distPx > 4) {
            const angleDeg = (Math.atan2(dyPx, dxPx) * 180) / Math.PI;
            const nearest45 = Math.round(angleDeg / 45) * 45;
            const rad = (nearest45 * Math.PI) / 180;
            endX = Math.max(
              0,
              Math.min(100, rawStart.x + ((Math.cos(rad) * distPx) / rect.width) * 100)
            );
            endY = Math.max(
              0,
              Math.min(100, rawStart.y + ((Math.sin(rad) * distPx) / rect.height) * 100)
            );
          }
        }
        const updatedShape: NotebookShapeElement = {
          ...draftShapeRef.current,
          x1: +rawStart.x.toFixed(2),
          y1: +rawStart.y.toFixed(2),
          x2: +endX.toFixed(2),
          y2: +endY.toFixed(2),
        };
        draftShapeRef.current = updatedShape;
        setDraftShape(updatedShape);
      }
      return;
    }

    if (isDrawingRef.current && draftStrokeRef.current) {
      e.preventDefault();

      // Shift-hold straight line while in freehand mode
      if (e.shiftKey) {
        const rawStart = shapeStartPointRef.current ?? draftStrokeRef.current.points[0];
        const rawEnd = toNormalizedPoint(e.clientX, e.clientY, e.pressure, e.pointerType);
        if (rawStart && rawEnd) {
          let endX = rawEnd.x;
          let endY = rawEnd.y;
          const rect = stageRef.current?.getBoundingClientRect();
          if (rect && rect.width > 0 && rect.height > 0) {
            const dxPx = ((rawEnd.x - rawStart.x) / 100) * rect.width;
            const dyPx = ((rawEnd.y - rawStart.y) / 100) * rect.height;
            const distPx = Math.hypot(dxPx, dyPx);
            if (distPx > 4) {
              const angleDeg = (Math.atan2(dyPx, dxPx) * 180) / Math.PI;
              const nearest45 = Math.round(angleDeg / 45) * 45;
              if (Math.abs(angleDeg - nearest45) <= 6.5) {
                const rad = (nearest45 * Math.PI) / 180;
                endX = Math.max(
                  0,
                  Math.min(100, rawStart.x + ((Math.cos(rad) * distPx) / rect.width) * 100)
                );
                endY = Math.max(
                  0,
                  Math.min(100, rawStart.y + ((Math.sin(rad) * distPx) / rect.height) * 100)
                );
              }
            }
          }
          const currentAspect = surface ? surface.width / surface.height : 0.707;
          const shapePts = buildShapePoints(
            'line',
            rawStart,
            { x: endX, y: endY },
            currentAspect
          );
          const updatedStroke: NotebookStroke = {
            ...draftStrokeRef.current,
            points: shapePts,
          };
          draftStrokeRef.current = updatedStroke;
          setDraftStroke(updatedStroke);
        }
        return;
      }

      const nativeEvt = e.nativeEvent as PointerEvent;
      const coalesced =
        typeof nativeEvt.getCoalescedEvents === 'function'
          ? nativeEvt.getCoalescedEvents()
          : [];
      const samples = coalesced.length > 0 ? coalesced : [nativeEvt];
      const minStep = (e.pointerType === 'pen' ? 0.12 : 0.22) / Math.max(1, zoom);

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
      const currentAspect = surface ? surface.width / surface.height : 0.707;
      const radius = Math.max(0.5, eraserWidth / 2);
      const currentStrokes = latestAnnotationsRef.current.strokes;
      let changed = false;
      const nextStrokes: NotebookStroke[] = [];

      for (const s of currentStrokes) {
        if (eraserTarget === 'highlighter-only' && s.tool !== 'highlighter') {
          nextStrokes.push(s);
          continue;
        }
        if (eraserMode === 'partial') {
          const res = eraseStrokePartially(s, pt, radius, currentAspect);
          if (res.modified) changed = true;
          nextStrokes.push(...res.pieces);
        } else {
          const hit = isPointNearStroke(
            pt,
            s,
            Math.max(radius, s.width * 0.55),
            currentAspect
          );
          if (hit) {
            changed = true;
          } else {
            nextStrokes.push(s);
          }
        }
      }

      if (changed) {
        erasedAnyRef.current = true;
        onCommitAnnotations(
          { ...latestAnnotationsRef.current, strokes: nextStrokes },
          false
        );
      }
    }
  };

  const handleStagePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragMultiRef.current) {
      const session = dragMultiRef.current;
      dragMultiRef.current = null;
      try {
        stageRef.current?.releasePointerCapture(e.pointerId);
      } catch {}
      if (session.hasMoved) {
        onCommitAnnotations(
          latestAnnotationsRef.current,
          true,
          session.origSnapshot
        );
      }
      return;
    }

    if (isMarqueeDrawingRef.current && marqueeRect) {
      isMarqueeDrawingRef.current = false;
      const rect = marqueeRect;
      const downTarget = shiftTargetOnDownRef.current;
      shiftTargetOnDownRef.current = null;
      setMarqueeRect(null);
      marqueeStartRef.current = null;
      activePointerIdRef.current = null;
      try {
        stageRef.current?.releasePointerCapture(e.pointerId);
      } catch {}

      const dragSpan = Math.hypot(rect.x2 - rect.x1, rect.y2 - rect.y1);
      if (dragSpan < 0.85) {
        const hit = downTarget ?? findTopElementAtPoint({ x: rect.x2, y: rect.y2 });
        if (hit) {
          toggleElementInMultiSelection(hit.kind, hit.id);
        }
        return;
      }

      const mBox: BoxBounds = {
        minX: Math.min(rect.x1, rect.x2),
        minY: Math.min(rect.y1, rect.y2),
        maxX: Math.max(rect.x1, rect.x2),
        maxY: Math.max(rect.y1, rect.y2),
      };
      const currentAspect = surface ? surface.width / surface.height : 0.707;
      const latest = latestAnnotationsRef.current;

      const matchedStrokes = latest.strokes
        .filter((s) =>
          s.points.some((pt, idx) => {
            if (isPointInBox(pt, mBox)) return true;
            if (idx < s.points.length - 1) {
              const mid = {
                x: (pt.x + s.points[idx + 1].x) / 2,
                y: (pt.y + s.points[idx + 1].y) / 2,
              };
              if (isPointInBox(mid, mBox)) return true;
            }
            return false;
          })
        )
        .map((s) => s.id);
      const matchedShapes = (latest.shapes || [])
        .filter((sh) => boxesOverlap(getShapeBounds(sh), mBox))
        .map((sh) => sh.id);
      const matchedTexts = (latest.textBoxes || [])
        .filter((t) => boxesOverlap(getTextBoxBounds(t), mBox))
        .map((t) => t.id);
      const matchedStickies = latest.stickyNotes
        .filter((n) => boxesOverlap(getStickyBounds(n), mBox))
        .map((n) => n.id);
      const matchedStickers = latest.stickers
        .filter((stk) => boxesOverlap(getStickerBounds(stk), mBox))
        .map((stk) => stk.id);
      const matchedImages = (latest.images || [])
        .filter((img) => boxesOverlap(getImageBounds(img, currentAspect), mBox))
        .map((img) => img.id);

      const seeded = getSeededMultiSelection();
      matchedStrokes.forEach((id) => seeded.strokes.add(id));
      matchedShapes.forEach((id) => seeded.shapes.add(id));
      matchedTexts.forEach((id) => seeded.texts.add(id));
      matchedStickies.forEach((id) => seeded.stickies.add(id));
      matchedStickers.forEach((id) => seeded.stickers.add(id));
      matchedImages.forEach((id) => seeded.images.add(id));

      setSelectedShapeId(null);
      setSelectedTextId(null);
      setSelectedStickyId(null);
      setSelectedStickerId(null);
      setSelectedImageId(null);

      setSelectedStrokeIds(Array.from(seeded.strokes));
      setSelectedShapeIds(Array.from(seeded.shapes));
      setSelectedTextBoxIds(Array.from(seeded.texts));
      setSelectedStickyIds(Array.from(seeded.stickies));
      setSelectedStickerIds(Array.from(seeded.stickers));
      setSelectedImageIds(Array.from(seeded.images));
      return;
    }

    if (dragShapeRef.current) {
      const dragSession = dragShapeRef.current;
      dragShapeRef.current = null;
      try {
        stageRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (dragSession.hasMoved) {
        const latest = latestAnnotationsRef.current;
        const normalizedShapes = (latest.shapes || []).map((sh) => {
          if (sh.id !== dragSession.id) return sh;
          if (sh.kind === 'rect' || sh.kind === 'ellipse') {
            return {
              ...sh,
              x1: Math.min(sh.x1, sh.x2),
              y1: Math.min(sh.y1, sh.y2),
              x2: Math.max(sh.x1, sh.x2),
              y2: Math.max(sh.y1, sh.y2),
            };
          }
          return sh;
        });
        onCommitAnnotations(
          { ...latest, shapes: normalizedShapes },
          true,
          dragSession.origSnapshot
        );
      }
      return;
    }

    if (dragStrokesRef.current) {
      const dragSession = dragStrokesRef.current;
      dragStrokesRef.current = null;
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

    if (rotateItemRef.current) {
      const rotateSession = rotateItemRef.current;
      rotateItemRef.current = null;
      try {
        stageRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (rotateSession.hasRotated) {
        onCommitAnnotations(
          latestAnnotationsRef.current,
          true,
          rotateSession.origSnapshot
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

    if (isLassoDrawingRef.current) {
      isLassoDrawingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const loop = lassoPathRef.current;
      lassoPathRef.current = [];
      setLassoPath([]);
      const currentAspect = surface ? surface.width / surface.height : 0.707;
      const matchedIds = latestAnnotationsRef.current.strokes
        .filter((s) => isStrokeSelectedByLasso(s, loop, currentAspect))
        .map((s) => s.id);
      setSelectedStrokeIds(matchedIds);
      return;
    }

    if (isDrawingRef.current && draftShapeRef.current) {
      isDrawingRef.current = false;
      shapeStartPointRef.current = null;
      const completed = draftShapeRef.current;
      draftShapeRef.current = null;
      setDraftShape(null);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const span = Math.hypot(completed.x2 - completed.x1, completed.y2 - completed.y1);
      if (span < 0.45) {
        return;
      }
      const finalShape: NotebookShapeElement =
        completed.kind === 'rect' || completed.kind === 'ellipse'
          ? {
              ...completed,
              x1: Math.min(completed.x1, completed.x2),
              y1: Math.min(completed.y1, completed.y2),
              x2: Math.max(completed.x1, completed.x2),
              y2: Math.max(completed.y1, completed.y2),
            }
          : completed;

      setSelectedShapeId(finalShape.id);
      onCommitAnnotations(
        {
          ...latestAnnotationsRef.current,
          shapes: [...(latestAnnotationsRef.current.shapes || []), finalShape],
        },
        true,
        latestAnnotationsRef.current
      );
      return;
    }

    if (isDrawingRef.current && draftStrokeRef.current) {
      isDrawingRef.current = false;
      shapeStartPointRef.current = null;
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

  const handleStickyColorChange = (id: string, color: StickyColor) => {
    onCommitAnnotations(
      {
        ...annotations,
        stickyNotes: annotations.stickyNotes.map((n) =>
          n.id === id ? { ...n, color } : n
        ),
      },
      true
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
    if (selectedStickyId === id) setSelectedStickyId(null);
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
    patch: Partial<Pick<NotebookSticker, 'scale' | 'opacity' | 'rotation'>>
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

  const handleRecolorSelectedStrokes = (color: string) => {
    if (selectedStrokeIds.length === 0) return;
    const latest = latestAnnotationsRef.current;
    const idSet = new Set(selectedStrokeIds);
    onCommitAnnotations(
      {
        ...latest,
        strokes: latest.strokes.map((s) =>
          idSet.has(s.id) ? { ...s, color } : s
        ),
      },
      true
    );
  };

  const handleDeleteSelectedStrokes = () => {
    if (selectedStrokeIds.length === 0) return;
    const latest = latestAnnotationsRef.current;
    const idSet = new Set(selectedStrokeIds);
    onCommitAnnotations(
      {
        ...latest,
        strokes: latest.strokes.filter((s) => !idSet.has(s.id)),
      },
      true
    );
    setSelectedStrokeIds([]);
  };

  const getTextBoxSignature = (box: NotebookTextBox): string => {
    const base = getBoxBaseStyle(box);
    const runs = getEffectiveRuns(box);
    return `${serializeRunsSignature(runs, base)}|${box.text}|${box.fontSize}|${base.color}|${base.bold}|${base.italic}|${base.underline}|${base.strikethrough}`;
  };

  const handleUpdateTextBoxRich = (
    id: string,
    patch: Partial<
      Pick<
        NotebookTextBox,
        | 'text'
        | 'runs'
        | 'color'
        | 'fontSize'
        | 'bold'
        | 'italic'
        | 'underline'
        | 'strikethrough'
        | 'lineHeight'
        | 'align'
        | 'rotation'
        | 'backgroundStyle'
        | 'hasBackground'
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
        textBoxes: (latest.textBoxes || []).map((t) => {
          if (t.id !== id) return t;
          const current: TextBoxBackgroundStyle =
            t.backgroundStyle ?? ((t.hasBackground ?? true) ? 'white' : 'transparent');
          const next: TextBoxBackgroundStyle =
            current === 'white'
              ? 'paper'
              : current === 'paper'
              ? 'transparent'
              : 'white';
          return {
            ...t,
            backgroundStyle: next,
            hasBackground: next !== 'transparent',
          };
        }),
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

  const handleHeaderFieldFocus = (field: 'topic' | 'date') => {
    if (field === 'date') setIsHeaderDateFocused(true);
    const latest = latestAnnotationsRef.current;
    preEditHeaderSnapshotRef.current = {
      field,
      startValue:
        field === 'topic' ? (latest.headerTopic ?? '') : (latest.headerDate ?? ''),
      snapshot: latest,
    };
  };

  const handleHeaderFieldChange = (field: 'topic' | 'date', value: string) => {
    const latest = latestAnnotationsRef.current;
    onCommitAnnotations(
      field === 'topic'
        ? { ...latest, headerTopic: value ? value : undefined }
        : { ...latest, headerDate: value ? value : undefined },
      false
    );
  };

  const handleHeaderFieldBlur = (field: 'topic' | 'date') => {
    if (field === 'date') setIsHeaderDateFocused(false);
    const session = preEditHeaderSnapshotRef.current;
    if (!session || session.field !== field) return;
    preEditHeaderSnapshotRef.current = null;
    const latest = latestAnnotationsRef.current;
    const currentVal =
      field === 'topic' ? (latest.headerTopic ?? '') : (latest.headerDate ?? '');
    if (currentVal !== session.startValue) {
      onCommitAnnotations(latest, true, session.snapshot);
    }
  };

  const handleFillTodayHeaderDate = () => {
    const todayFormatted = new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const latest = latestAnnotationsRef.current;
    const baseSnapshot =
      preEditHeaderSnapshotRef.current?.field === 'date'
        ? preEditHeaderSnapshotRef.current.snapshot
        : latest;
    preEditHeaderSnapshotRef.current = null;
    onCommitAnnotations(
      {
        ...latest,
        headerDate: todayFormatted,
      },
      true,
      baseSnapshot
    );
    setIsHeaderDateFocused(false);
    headerDateInputRef.current?.blur();
  };

  const isBlankSurfacePage =
    customPage?.kind === 'blank' ||
    (!notebook.isCustom && notebook.sourceType === 'blatt-blanko') ||
    (!customPage && notebook.sourceType === 'blatt-blanko');

  const effectiveBlankTemplate: BlankPageTemplate =
    annotations.templateOverride ??
    (customPage?.kind === 'blank' ? customPage.template : 'blank');

  const effectiveShowDateHeader = isBlankSurfacePage
    ? annotations.showDateHeader ??
      (customPage?.kind === 'blank' ? Boolean(customPage.showDateHeader) : false)
    : false;

  const aspectRatio = surface ? surface.width / surface.height : 0.707;
  const displayWidth = Math.max(260, Math.round(fitWidth * zoom));
  const displayHeight = Math.round(displayWidth / aspectRatio);

  const headerMetrics = effectiveShowDateHeader
    ? getBlankHeaderLayoutMetrics(effectiveBlankTemplate, displayWidth)
    : null;

  const allStrokes = draftStroke
    ? [...annotations.strokes, draftStroke]
    : annotations.strokes;

  const highlighterStrokes = allStrokes.filter((s) => s.tool === 'highlighter');
  const penStrokes = allStrokes.filter((s) => s.tool === 'pen');

  const allShapes = draftShape
    ? [...(annotations.shapes || []), draftShape]
    : annotations.shapes || [];

  const highlighterShapes = allShapes.filter((sh) => sh.tool === 'highlighter');
  const penShapes = allShapes.filter((sh) => sh.tool === 'pen');

  const isShapeInteractive =
    !draftShape &&
    (activeTool === 'hand' || activeTool === 'pen' || activeTool === 'highlighter');

  const selectedShape =
    selectedShapeId &&
    !selectedShapeIds.includes(selectedShapeId) &&
    activeTool !== 'eraser' &&
    activeTool !== 'lasso'
      ? (annotations.shapes || []).find((sh) => sh.id === selectedShapeId) ?? null
      : null;

  const selectedTextBox =
    selectedTextId &&
    !selectedTextBoxIds.includes(selectedTextId) &&
    !isDrawTool
      ? (annotations.textBoxes || []).find((t) => t.id === selectedTextId) ?? null
      : null;

  const startShapeDragSession = (
    shape: NotebookShapeElement,
    mode: 'move' | 'p1' | 'p2' | 'nw' | 'ne' | 'sw' | 'se',
    e: React.PointerEvent<Element>
  ) => {
    if (e.shiftKey) {
      startShiftGesture(e, { kind: 'shape', id: shape.id });
      return;
    }
    if (mode === 'move' && selectedShapeIds.includes(shape.id)) {
      startMultiDragSession(e);
      return;
    }
    clearMultiSelection();
    setSelectedShapeId(shape.id);
    setSelectedImageId(null);
    setSelectedTextId(null);
    setSelectedStickerId(null);
    setSelectedStickyId(null);
    setSelectedStrokeIds([]);
    try {
      stageRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const isBoxKind = shape.kind === 'rect' || shape.kind === 'ellipse';
    dragShapeRef.current = {
      id: shape.id,
      mode,
      startClientX: e.clientX,
      startClientY: e.clientY,
      origX1: isBoxKind ? Math.min(shape.x1, shape.x2) : shape.x1,
      origY1: isBoxKind ? Math.min(shape.y1, shape.y2) : shape.y1,
      origX2: isBoxKind ? Math.max(shape.x1, shape.x2) : shape.x2,
      origY2: isBoxKind ? Math.max(shape.y1, shape.y2) : shape.y2,
      hasMoved: false,
      origSnapshot: latestAnnotationsRef.current,
    };
  };

  const cursorClass =
    activeTool === 'pen' || activeTool === 'highlighter' || activeTool === 'lasso'
      ? 'cursor-crosshair'
      : activeTool === 'eraser'
      ? 'cursor-cell'
      : activeTool === 'text'
      ? 'cursor-text'
      : activeTool === 'sticky' || activeTool === 'sticker'
      ? 'cursor-copy'
      : 'cursor-default';

  const brushDiameterPx =
    activeTool === 'pen'
      ? Math.max(2, (penWidth / 100) * displayWidth)
      : activeTool === 'highlighter'
      ? Math.max(4, (highlighterWidth / 100) * displayWidth)
      : activeTool === 'eraser'
      ? Math.max(6, (eraserWidth / 100) * displayWidth)
      : 0;

  return (
    <div className="flex flex-col items-center justify-start min-h-full py-4 sm:py-6 px-2 sm:px-6">
      {/* Top Docked TextBox Formatting Bar (never overlaps the TextBox on the page!) */}
      {selectedTextBox && (() => {
        const activeBridge =
          activeTextBridgeRef.current?.boxId === selectedTextBox.id
            ? activeTextBridgeRef.current
            : null;
        const effectiveStyle: ResolvedTextStyle =
          activeBridge && selectedTextActiveStyle
            ? selectedTextActiveStyle
            : getBoxBaseStyle(selectedTextBox);
        const bgStyle: TextBoxBackgroundStyle =
          selectedTextBox.backgroundStyle ??
          ((selectedTextBox.hasBackground ?? true) ? 'white' : 'transparent');
        const currentAlign = selectedTextBox.align ?? 'left';
        const currentLineHeight = selectedTextBox.lineHeight ?? 1.35;
        const currentRot = Math.round(selectedTextBox.rotation ?? 0);

        const triggerInlineOrBoxPatch = (patch: Partial<ResolvedTextStyle>) => {
          if (activeBridge) {
            activeBridge.applyFormatPatch(patch);
          } else {
            handleUpdateTextBoxRich(selectedTextBox.id, patch, true);
          }
        };

        return (
          <div
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={(e) => e.stopPropagation()}
            className="sticky top-2 z-50 mb-3 w-full max-w-[940px] px-3 py-2 rounded-xl bg-slate-900/95 text-white shadow-xl border border-slate-700/90 flex flex-wrap items-center justify-between gap-2 text-xs select-none"
          >
            {/* Left Group: Font Style (B/I/U/S) + Alignment + Background */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-400/30 text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
                Textfeld
              </span>

              <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => triggerInlineOrBoxPatch({ bold: !effectiveStyle.bold })}
                  title="Fett (⌘B)"
                  aria-label="Fett"
                  aria-pressed={effectiveStyle.bold}
                  className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                    effectiveStyle.bold
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-white/15 text-slate-200'
                  }`}
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => triggerInlineOrBoxPatch({ italic: !effectiveStyle.italic })}
                  title="Kursiv (⌘I)"
                  aria-label="Kursiv"
                  aria-pressed={effectiveStyle.italic}
                  className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                    effectiveStyle.italic
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-white/15 text-slate-200'
                  }`}
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => triggerInlineOrBoxPatch({ underline: !effectiveStyle.underline })}
                  title="Unterstrichen (⌘U)"
                  aria-label="Unterstrichen"
                  aria-pressed={effectiveStyle.underline}
                  className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                    effectiveStyle.underline
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-white/15 text-slate-200'
                  }`}
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    triggerInlineOrBoxPatch({ strikethrough: !effectiveStyle.strikethrough })
                  }
                  title="Durchgestrichen (⇧⌘X)"
                  aria-label="Durchgestrichen"
                  aria-pressed={effectiveStyle.strikethrough}
                  className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                    effectiveStyle.strikethrough
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-white/15 text-slate-200'
                  }`}
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Text Alignment */}
              <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
                {(
                  [
                    { id: 'left' as const, label: 'Linksbündig', Icon: AlignLeft },
                    { id: 'center' as const, label: 'Zentriert', Icon: AlignCenter },
                    { id: 'right' as const, label: 'Rechtsbündig', Icon: AlignRight },
                  ]
                ).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      handleUpdateTextBoxRich(selectedTextBox.id, { align: id }, true)
                    }
                    title={`Textausrichtung: ${label}`}
                    aria-label={label}
                    className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                      currentAlign === id
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-white/15 text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              {/* Font Size */}
              <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
                <span className="text-[10px] font-bold text-slate-300">Größe</span>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const nextSize = +Math.max(1.2, selectedTextBox.fontSize - 0.2).toFixed(1);
                    handleUpdateTextBoxRich(selectedTextBox.id, { fontSize: nextSize }, true);
                  }}
                  title="Schrift verkleinern"
                  className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-100 cursor-pointer"
                >
                  A−
                </button>
                <input
                  type="range"
                  min={1.2}
                  max={4.0}
                  step={0.1}
                  value={selectedTextBox.fontSize}
                  onPointerDown={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleUpdateTextBoxRich(
                      selectedTextBox.id,
                      { fontSize: parseFloat(e.target.value) },
                      false
                    )
                  }
                  onPointerUp={() =>
                    handleUpdateTextBoxRich(
                      selectedTextBox.id,
                      { fontSize: selectedTextBox.fontSize },
                      true
                    )
                  }
                  aria-label="Schriftgröße"
                  className="w-20 h-1.5 accent-indigo-500 cursor-pointer"
                />
                <span className="text-[10px] font-mono font-bold text-slate-200 tabular-nums min-w-[22px] text-right">
                  {selectedTextBox.fontSize.toFixed(1)}
                </span>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const nextSize = +Math.min(4.0, selectedTextBox.fontSize + 0.2).toFixed(1);
                    handleUpdateTextBoxRich(selectedTextBox.id, { fontSize: nextSize }, true);
                  }}
                  title="Schrift vergrößern"
                  className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-100 cursor-pointer"
                >
                  A+
                </button>
              </div>

              {/* Line Spacing (Zeilenabstand) */}
              <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
                <span className="text-[10px] font-bold text-slate-300">Zeilenabstand</span>
                {(['1.0', '1.25', '1.5', '1.75', '2.0'] as const).map((lhStr) => {
                  const val = parseFloat(lhStr);
                  const active = Math.abs(currentLineHeight - val) < 0.06;
                  return (
                    <button
                      key={lhStr}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        handleUpdateTextBoxRich(selectedTextBox.id, { lineHeight: val }, true)
                      }
                      title={`Zeilenabstand ${lhStr}`}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                        active
                          ? 'bg-indigo-600 text-white'
                          : 'hover:bg-white/15 text-slate-200'
                      }`}
                    >
                      {lhStr}
                    </button>
                  );
                })}
              </div>

              {/* Background Toggle */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleToggleTextBoxBg(selectedTextBox.id)}
                title="Hintergrund wechseln (Weiß / Papier-Ton / Transparent)"
                className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-100 cursor-pointer whitespace-nowrap"
              >
                BG: {bgStyle === 'white' ? 'Weiß' : bgStyle === 'paper' ? 'Papier' : 'Transp.'}
              </button>
            </div>

            {/* Right Group: Colors + Rotation Reset + Duplicate & Delete */}
            <div className="flex items-center gap-2">
              <ScrollableColorStrip
                variant="floating"
                preserveTextFocus
                selectedColor={effectiveStyle.color}
                onSelectColor={(color) => triggerInlineOrBoxPatch({ color })}
                onBeforeNativeColorPicker={() => activeBridge?.onBeforeNativeColorPicker()}
                onAfterNativeColorPicker={() => activeBridge?.onAfterNativeColorPicker()}
              />

              {currentRot !== 0 && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    handleUpdateTextBoxRich(selectedTextBox.id, { rotation: 0 }, true)
                  }
                  title="Drehung auf 0° zurücksetzen"
                  className="px-2 py-1 rounded-lg bg-indigo-500/30 hover:bg-indigo-600 text-[10px] font-mono font-bold text-white cursor-pointer"
                >
                  {currentRot}° → 0°
                </button>
              )}

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleDuplicateTextBox(selectedTextBox.id)}
                title="Textfeld duplizieren (⌘D)"
                aria-label="Textfeld duplizieren"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleDeleteTextBox(selectedTextBox.id)}
                title="Textfeld löschen"
                aria-label="Textfeld löschen"
                className="p-1.5 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })()}

      <div
        ref={stageRef}
        onPointerEnter={(e) => updateBrushHoverPos(e.clientX, e.clientY, e.pointerType)}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerCancel={(e) => {
          hideBrushHover();
          handleStagePointerUp(e);
        }}
        onPointerLeave={hideBrushHover}
        onContextMenu={(e) => {
          if (isDrawTool || pencilOnlyMode || (blockCanvasContextMenu && activeTool !== 'hand')) {
            e.preventDefault();
          }
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

        {/* Layer 1.2: Editable Thema & Datum Header Fields on Blank Note Pages */}
        {effectiveShowDateHeader && headerMetrics && !isLoading && !loadError && (
          <div className="absolute inset-0 pointer-events-none z-[8]">
            {(() => {
              const inputH = Math.max(18, Math.round(headerMetrics.fontPx * 1.5));
              const inputTop =
                headerMetrics.textBaselineY - 0.5 * inputH - 0.34 * headerMetrics.fontPx;
              const themaW = Math.max(
                44,
                headerMetrics.themaInputRight - headerMetrics.themaInputLeft
              );
              const datumW = Math.max(
                36,
                headerMetrics.datumInputRight - headerMetrics.datumInputLeft
              );
              const sharedStyle: React.CSSProperties = {
                top: `${inputTop}px`,
                height: `${inputH}px`,
                fontSize: `${headerMetrics.fontPx}px`,
                lineHeight: 1.1,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                WebkitUserSelect: isDrawTool ? 'none' : 'text',
                userSelect: isDrawTool ? 'none' : 'text',
              };
              const sharedClass = `absolute rounded-xs px-1 font-medium text-slate-800 placeholder:text-slate-400/75 bg-transparent transition-colors focus:outline-hidden ${
                isDrawTool
                  ? 'pointer-events-none select-none'
                  : 'pointer-events-auto hover:bg-slate-900/[0.04] focus:bg-white/80 focus:ring-1 focus:ring-indigo-500/70'
              }`;

              return (
                <>
                  <input
                    ref={headerTopicInputRef}
                    type="text"
                    value={annotations.headerTopic ?? ''}
                    placeholder={isDrawTool ? undefined : 'Thema eingeben...'}
                    aria-label="Thema dieser Seite"
                    tabIndex={isDrawTool ? -1 : 0}
                    onPointerDown={(e) => {
                      if (isDrawTool) return;
                      e.stopPropagation();
                    }}
                    onFocus={() => handleHeaderFieldFocus('topic')}
                    onChange={(e) => handleHeaderFieldChange('topic', e.target.value)}
                    onBlur={() => handleHeaderFieldBlur('topic')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        headerDateInputRef.current?.focus();
                      }
                    }}
                    style={{
                      ...sharedStyle,
                      left: `${headerMetrics.themaInputLeft}px`,
                      width: `${themaW}px`,
                    }}
                    className={sharedClass}
                  />

                  <div
                    style={{
                      top: `${inputTop}px`,
                      left: `${headerMetrics.datumInputLeft}px`,
                      width: `${datumW}px`,
                      height: `${inputH}px`,
                    }}
                    className={`absolute group/datum ${
                      isDrawTool ? 'pointer-events-none' : 'pointer-events-auto'
                    }`}
                  >
                    <input
                      ref={headerDateInputRef}
                      type="text"
                      value={annotations.headerDate ?? ''}
                      placeholder={isDrawTool ? undefined : 'TT.MM.JJJJ'}
                      aria-label="Datum dieser Seite"
                      tabIndex={isDrawTool ? -1 : 0}
                      onPointerDown={(e) => {
                        if (isDrawTool) return;
                        e.stopPropagation();
                      }}
                      onFocus={() => handleHeaderFieldFocus('date')}
                      onChange={(e) => handleHeaderFieldChange('date', e.target.value)}
                      onBlur={() => handleHeaderFieldBlur('date')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          e.currentTarget.blur();
                        }
                      }}
                      style={{
                        height: `${inputH}px`,
                        fontSize: `${headerMetrics.fontPx}px`,
                        lineHeight: 1.1,
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        WebkitUserSelect: isDrawTool ? 'none' : 'text',
                        userSelect: isDrawTool ? 'none' : 'text',
                      }}
                      className={`w-full rounded-xs px-1 font-medium text-slate-800 placeholder:text-slate-400/75 bg-transparent transition-colors focus:outline-hidden ${
                        isDrawTool
                          ? 'pointer-events-none select-none'
                          : 'hover:bg-slate-900/[0.04] focus:bg-white/80 focus:ring-1 focus:ring-indigo-500/70'
                      }`}
                    />

                    {/* Quick "Heute" button when focused or hovered */}
                    {!isDrawTool && (
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFillTodayHeaderDate();
                        }}
                        title="Heutiges Datum eintragen"
                        className={`absolute right-0 -bottom-6 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/95 hover:bg-indigo-600 text-white text-[10px] font-bold shadow-md transition-opacity cursor-pointer z-20 ${
                          isHeaderDateFocused
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 group-hover/datum:opacity-100 pointer-events-none group-hover/datum:pointer-events-auto'
                        }`}
                      >
                        <CalendarCheck className="w-3 h-3" />
                        <span>Heute</span>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Layer 1.5: Interactive Embedded Images (on custom & existing pages) */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          {(annotations.images || []).map((imgEl) => {
            const isMultiSelected = selectedImageIds.includes(imgEl.id);
            return (
              <EmbeddedImageOverlayItem
                key={imgEl.id}
                item={imgEl}
                isInteractive={!isDrawTool}
                isSelected={selectedImageId === imgEl.id && !isMultiSelected}
                isMultiSelected={isMultiSelected}
                onShiftPointerDown={(e) => startShiftGesture(e, { kind: 'image', id: imgEl.id })}
                onSelect={() => {
                  clearMultiSelection();
                  setSelectedImageId(imgEl.id);
                  setSelectedTextId(null);
                  setSelectedStickerId(null);
                  setSelectedStickyId(null);
                  setSelectedShapeId(null);
                  setSelectedStrokeIds([]);
                }}
                onStartDrag={(e) => {
                  if (isMultiSelected) {
                    startMultiDragSession(e);
                    return;
                  }
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
                onDuplicate={() => handleDuplicateEmbeddedImage(imgEl.id)}
                onDelete={() => handleDeleteEmbeddedImage(imgEl.id)}
              />
            );
          })}
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

        {/* Layer 2: Smooth Vector Pen Ink & Editable Pen Shapes SVG */}
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
            {penShapes.map((shape) =>
              renderVectorShapeSvg(
                shape,
                aspectRatio,
                0.96,
                isShapeInteractive,
                (e) => startShapeDragSession(shape, 'move', e)
              )
            )}
          </g>
        </svg>

        {/* Layer 3: Interactive Stickers */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {annotations.stickers.map((sticker) => {
            const preset = NOTEBOOK_STICKERS.find((p) => p.type === sticker.type);
            if (!preset) return null;
            const isMultiSelected = selectedStickerIds.includes(sticker.id);
            const isSelected = selectedStickerId === sticker.id && !isMultiSelected;
            const currentScale = sticker.scale ?? 1;
            const currentOpacity = sticker.opacity ?? 1;
            const currentRot = Math.round(sticker.rotation ?? -2);
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
                  if (e.shiftKey) {
                    e.stopPropagation();
                    startShiftGesture(e, { kind: 'sticker', id: sticker.id });
                    return;
                  }
                  if (isMultiSelected) {
                    e.stopPropagation();
                    startMultiDragSession(e);
                    return;
                  }
                  e.stopPropagation();
                  clearMultiSelection();
                  setSelectedStickerId(sticker.id);
                  setSelectedImageId(null);
                  setSelectedTextId(null);
                  setSelectedStickyId(null);
                  setSelectedShapeId(null);
                  setSelectedStrokeIds([]);
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
                  isSelected || isMultiSelected ? 'z-30' : ''
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
                      showToolbarBelow ? 'top-full mt-10' : 'bottom-full mb-2.5'
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
                        handleDuplicateSticker(sticker.id);
                      }}
                      title="Sticker duplizieren (⌘D)"
                      aria-label="Sticker duplizieren"
                      className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                    </button>

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
                    transform: `rotate(${currentRot}deg) scale(${currentScale})`,
                    opacity: currentOpacity,
                  }}
                  className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 shadow-sm transition-shadow ${
                    preset.bgClass
                  } ${preset.borderClass} ${preset.textClass} ${
                    isSelected || isMultiSelected ? 'ring-2 ring-indigo-500' : 'hover:ring-2 hover:ring-indigo-300'
                  }`}
                >
                  <span className="text-sm leading-none">{preset.symbol}</span>
                  <span className="text-[11px] font-extrabold tracking-wide whitespace-nowrap">
                    {preset.shortLabel}
                  </span>

                  {!isSelected && !isMultiSelected && !isDrawTool && (
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

                {/* Bottom Free-Rotation Drag Handle for Sticker */}
                {isSelected && !isDrawTool && (
                  <div
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 select-none"
                  >
                    <div className="w-0.5 h-2.5 bg-indigo-500/80" />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onPointerDown={(e) => {
                          const stageEl = stageRef.current;
                          if (!stageEl) return;
                          const r = stageEl.getBoundingClientRect();
                          const cx = r.left + (sticker.x / 100) * r.width;
                          const cy = r.top + (sticker.y / 100) * r.height;
                          startRotateSession(
                            'sticker',
                            sticker.id,
                            sticker.rotation ?? -2,
                            cx,
                            cy,
                            e
                          );
                        }}
                        title="Mit der Maus ziehen zum freien Drehen (Shift halten für 15°-Schritte)"
                        aria-label="Sticker frei drehen"
                        className="w-6 h-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md border-2 border-white flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                      {currentRot !== 0 && currentRot !== -2 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateSticker(sticker.id, { rotation: 0 });
                          }}
                          title="Drehung auf 0° zurücksetzen"
                          className="px-1.5 py-0.5 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white text-[10px] font-mono font-bold shadow-sm cursor-pointer"
                        >
                          {currentRot}°
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Layer 3.5: Interactive Typed Text Boxes */}
        <div className="absolute inset-0 z-[25] pointer-events-none">
          {(annotations.textBoxes || []).map((box) => {
            const fontSizePx = Math.max(11, Math.round((displayWidth * box.fontSize) / 100));
            const isMultiSelected = selectedTextBoxIds.includes(box.id);
            return (
              <TextBoxOverlayItem
                key={box.id}
                box={box}
                fontSizePx={fontSizePx}
                paperPalette={paperPalette}
                isDrawTool={isDrawTool}
                isSelected={selectedTextId === box.id && !isMultiSelected}
                isMultiSelected={isMultiSelected}
                autoFocus={autoFocusTextId === box.id}
                onShiftPointerDown={(e) => startShiftGesture(e, { kind: 'text', id: box.id })}
                onSelect={() => {
                  clearMultiSelection();
                  setSelectedTextId(box.id);
                  setSelectedImageId(null);
                  setSelectedStickerId(null);
                  setSelectedStickyId(null);
                  setSelectedShapeId(null);
                  setSelectedStrokeIds([]);
                }}
                onFocusBox={() => handleTextBoxFocus(box.id)}
                onClearAutoFocus={() => {
                  if (autoFocusTextId === box.id) setAutoFocusTextId(null);
                }}
                onStartDrag={(e) => {
                  if (isMultiSelected) {
                    startMultiDragSession(e);
                    return;
                  }
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
                onStartRotate={(e, centerClientX, centerClientY) =>
                  startRotateSession(
                    'text',
                    box.id,
                    box.rotation ?? 0,
                    centerClientX,
                    centerClientY,
                    e
                  )
                }
                onUpdateBox={(patch, recordHistory) =>
                  handleUpdateTextBoxRich(box.id, patch, recordHistory)
                }
                onToggleBackground={() => handleToggleTextBoxBg(box.id)}
                onDuplicate={() => handleDuplicateTextBox(box.id)}
                onDelete={() => handleDeleteTextBox(box.id)}
                onBlurBox={() => handleTextBoxBlur(box.id)}
                onSyncActiveFormatBridge={handleSyncActiveFormatBridge}
              />
            );
          })}
        </div>

        {/* Layer 3.8: Foreground Highlighter & Highlighter Shapes SVG (above Freitext, Fotos & Stickers, below Klebezettel) */}
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
          {highlighterShapes.map((shape) =>
            renderVectorShapeSvg(
              shape,
              aspectRatio,
              0.45,
              isShapeInteractive,
              (e) => startShapeDragSession(shape, 'move', e)
            )
          )}
        </svg>

        {/* Layer 3.85: Interactive Selection Handles & Floating Edit Toolbar for Selected Shape */}
        {selectedShape && (
          <div className="absolute inset-0 z-[29] pointer-events-none">
            {(() => {
              const minX = Math.min(selectedShape.x1, selectedShape.x2);
              const maxX = Math.max(selectedShape.x1, selectedShape.x2);
              const minY = Math.min(selectedShape.y1, selectedShape.y2);
              const maxY = Math.max(selectedShape.y1, selectedShape.y2);
              const rawCenterX = (minX + maxX) / 2;
              const rawCenterY = (minY + maxY) / 2;
              const centerX = Math.max(18, Math.min(82, rawCenterX));
              const showBelow = minY < 16;
              const toolbarAnchorY = showBelow ? Math.min(92, maxY + 6.5) : Math.max(2, minY - 2.2);
              const isLineLike =
                selectedShape.kind === 'line' || selectedShape.kind === 'arrow';
              const colorPalette =
                selectedShape.tool === 'highlighter' ? HIGHLIGHTER_COLORS : PEN_COLORS;
              const currentShapeRot = Math.round(selectedShape.rotation ?? 0);

              return (
                <>
                  {isLineLike ? (
                    <>
                      <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                      >
                        <line
                          x1={selectedShape.x1}
                          y1={selectedShape.y1}
                          x2={selectedShape.x2}
                          y2={selectedShape.y2}
                          stroke="#4f46e5"
                          strokeWidth={0.32}
                          strokeDasharray="1.1 0.8"
                        />
                      </svg>
                      {/* Start Endpoint Handle (p1) */}
                      <div
                        style={{
                          left: `${selectedShape.x1}%`,
                          top: `${selectedShape.y1}%`,
                        }}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          startShapeDragSession(selectedShape, 'p1', e);
                        }}
                        title="Startpunkt ziehen zum Anpassen"
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow-md pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                      />
                      {/* End Endpoint Handle (p2) */}
                      <div
                        style={{
                          left: `${selectedShape.x2}%`,
                          top: `${selectedShape.y2}%`,
                        }}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          startShapeDragSession(selectedShape, 'p2', e);
                        }}
                        title="Endpunkt ziehen zum Anpassen"
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-md pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                      />
                    </>
                  ) : (
                    <>
                      {/* Dashed Bounding Frame for Rect / Ellipse */}
                      <div
                        style={{
                          left: `${minX}%`,
                          top: `${minY}%`,
                          width: `${Math.max(0.8, maxX - minX)}%`,
                          height: `${Math.max(0.8, maxY - minY)}%`,
                          transform: currentShapeRot ? `rotate(${currentShapeRot}deg)` : undefined,
                        }}
                        className="absolute border-2 border-dashed border-indigo-500 rounded-xs pointer-events-none"
                      />
                      {/* 4 Corner Resize Handles (nw, ne, sw, se) */}
                      {(
                        [
                          { mode: 'nw' as const, x: minX, y: minY, cursor: 'cursor-nwse-resize' },
                          { mode: 'ne' as const, x: maxX, y: minY, cursor: 'cursor-nesw-resize' },
                          { mode: 'sw' as const, x: minX, y: maxY, cursor: 'cursor-nesw-resize' },
                          { mode: 'se' as const, x: maxX, y: maxY, cursor: 'cursor-nwse-resize' },
                        ]
                      ).map((h) => (
                        <div
                          key={h.mode}
                          style={{ left: `${h.x}%`, top: `${h.y}%` }}
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            startShapeDragSession(selectedShape, h.mode, e);
                          }}
                          title="Ecke ziehen zum Skalieren"
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 shadow-md pointer-events-auto ${h.cursor} hover:scale-125 transition-transform`}
                        />
                      ))}
                    </>
                  )}

                  {/* Bottom Free-Rotation Drag Handle for Selected Shape */}
                  <div
                    style={{
                      left: `${rawCenterX}%`,
                      top: `${Math.min(96, maxY + 0.5)}%`,
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-auto z-40 select-none"
                  >
                    <div className="w-0.5 h-2.5 bg-indigo-500/80" />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onPointerDown={(e) => {
                          const stageEl = stageRef.current;
                          if (!stageEl) return;
                          const r = stageEl.getBoundingClientRect();
                          const cx = r.left + (rawCenterX / 100) * r.width;
                          const cy = r.top + (rawCenterY / 100) * r.height;
                          startRotateSession(
                            'shape',
                            selectedShape.id,
                            selectedShape.rotation ?? 0,
                            cx,
                            cy,
                            e
                          );
                        }}
                        title="Form mit der Maus frei drehen (Shift halten für 15°-Schritte)"
                        aria-label="Form frei drehen"
                        className="w-6 h-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md border-2 border-white flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                      {currentShapeRot !== 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateShape(selectedShape.id, { rotation: 0 }, true);
                          }}
                          title="Drehung auf 0° zurücksetzen"
                          className="px-1.5 py-0.5 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white text-[10px] font-mono font-bold shadow-sm cursor-pointer"
                        >
                          {currentShapeRot}°
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Floating Shape Edit Toolbar */}
                  <div
                    style={{
                      left: `${centerX}%`,
                      top: `${toolbarAnchorY}%`,
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className={`absolute -translate-x-1/2 ${
                      showBelow ? '' : '-translate-y-full'
                    } flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/95 text-white shadow-xl border border-slate-700/90 text-[10px] font-bold whitespace-nowrap z-40 pointer-events-auto cursor-default`}
                  >
                    {/* Shape Kind Switcher */}
                    <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
                      {(
                        [
                          { id: 'line' as NotebookShapeKind, label: 'Linie', Icon: Minus },
                          { id: 'arrow' as NotebookShapeKind, label: 'Pfeil', Icon: ArrowUpRight },
                          { id: 'rect' as NotebookShapeKind, label: 'Kasten', Icon: Square },
                          { id: 'ellipse' as NotebookShapeKind, label: 'Kreis', Icon: Circle },
                        ]
                      ).map(({ id, label, Icon }) => {
                        const active = selectedShape.kind === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateShape(selectedShape.id, { kind: id }, true);
                            }}
                            title={`Form ändern: ${label}`}
                            className={`px-1.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ${
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Icon className="w-3 h-3" />
                            <span className="hidden sm:inline">{label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Line Style Switcher */}
                    <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
                      {(
                        [
                          { id: 'solid' as const, label: 'Durchgezogen' },
                          { id: 'dashed' as const, label: 'Gestrichelt' },
                          { id: 'dotted' as const, label: 'Gepunktet' },
                        ]
                      ).map(({ id, label }) => {
                        const active = (selectedShape.lineStyle ?? 'solid') === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateShape(selectedShape.id, { lineStyle: id }, true);
                            }}
                            title={`Linienart: ${label}`}
                            className={`px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <span className="text-slate-600">|</span>

                    {/* Fill toggle for Rect & Ellipse */}
                    {(selectedShape.kind === 'rect' || selectedShape.kind === 'ellipse') && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateShape(
                            selectedShape.id,
                            { filled: !selectedShape.filled },
                            true
                          );
                        }}
                        title="Farbfüllung ein-/ausschalten"
                        className={`px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                          selectedShape.filled
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-white/10 border-white/15 text-slate-300 hover:text-white'
                        }`}
                      >
                        Füllung
                      </button>
                    )}

                    <span className="text-slate-600">|</span>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1">
                      {colorPalette.slice(0, 6).map((sw) => {
                        const isColorActive =
                          selectedShape.color.toLowerCase() === sw.color.toLowerCase();
                        return (
                          <button
                            key={sw.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateShape(selectedShape.id, { color: sw.color }, true);
                            }}
                            title={`Farbe: ${sw.label}`}
                            style={{ backgroundColor: sw.color }}
                            className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                              isColorActive
                                ? 'border-white scale-125 ring-1 ring-indigo-400'
                                : 'border-white/40 hover:scale-110'
                            }`}
                          />
                        );
                      })}
                    </div>

                    <span className="text-slate-600">|</span>

                    {/* Stroke Width Slider */}
                    <div className="flex items-center gap-1.5" title="Linienstärke der Form">
                      <span className="text-slate-400">Dicke</span>
                      <input
                        type="range"
                        min={selectedShape.tool === 'highlighter' ? 0.8 : 0.16}
                        max={selectedShape.tool === 'highlighter' ? 6.0 : 2.2}
                        step={selectedShape.tool === 'highlighter' ? 0.1 : 0.04}
                        value={selectedShape.width}
                        onChange={(e) => {
                          const nextW = parseFloat(e.target.value);
                          if (!Number.isNaN(nextW)) {
                            handleUpdateShape(selectedShape.id, { width: nextW }, false);
                          }
                        }}
                        onPointerUp={(e) => {
                          const nextW = parseFloat((e.target as HTMLInputElement).value);
                          if (!Number.isNaN(nextW)) {
                            handleUpdateShape(selectedShape.id, { width: nextW }, true);
                          }
                        }}
                        className="w-14 h-1.5 accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <span className="text-slate-600">|</span>

                    {/* Duplicate & Delete */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateShape(selectedShape.id);
                      }}
                      title="Form duplizieren (⌘D)"
                      aria-label="Form duplizieren"
                      className="p-1 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteShape(selectedShape.id);
                      }}
                      title="Form löschen (⌫)"
                      aria-label="Form löschen"
                      className="p-1 rounded bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Marquee Selection Rectangle Overlay */}
        {marqueeRect && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-[35]"
          >
            {(() => {
              const x1 = Math.min(marqueeRect.x1, marqueeRect.x2);
              const y1 = Math.min(marqueeRect.y1, marqueeRect.y2);
              const w = Math.abs(marqueeRect.x2 - marqueeRect.x1);
              const h = Math.abs(marqueeRect.y2 - marqueeRect.y1);
              return (
                <rect
                  x={x1}
                  y={y1}
                  width={w}
                  height={h}
                  fill="rgba(79, 70, 229, 0.08)"
                  stroke="#4f46e5"
                  strokeWidth={0.35}
                  strokeDasharray="1.1 0.8"
                />
              );
            })()}
          </svg>
        )}

        {/* Visual outline highlights for multi-selected shapes */}
        {selectedShapeIds.length > 0 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-[31]"
          >
            {(annotations.shapes || [])
              .filter((sh) => selectedShapeIds.includes(sh.id))
              .map((sh) => {
                const b = getShapeBounds(sh);
                return (
                  <rect
                    key={`shape-hi-${sh.id}`}
                    x={b.minX - 0.4}
                    y={b.minY - 0.4}
                    width={Math.max(0.8, b.maxX - b.minX + 0.8)}
                    height={Math.max(0.8, b.maxY - b.minY + 0.8)}
                    fill="rgba(79, 70, 229, 0.05)"
                    stroke="#4f46e5"
                    strokeWidth={0.3}
                    strokeDasharray="1.1 0.8"
                    rx={0.6}
                  />
                );
              })}
          </svg>
        )}

        {/* Multi-Selection Aggregate Bounding Box & Floating Action Bar */}
        {multiSelectionBounds && totalSelectedCount > 0 && !isLassoDrawingRef.current && (
          <div
            style={{
              left: `${multiSelectionBounds.minX}%`,
              top: `${multiSelectionBounds.minY}%`,
              width: `${Math.max(2, multiSelectionBounds.maxX - multiSelectionBounds.minX)}%`,
              height: `${Math.max(2, multiSelectionBounds.maxY - multiSelectionBounds.minY)}%`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              if (e.shiftKey) {
                startShiftGesture(e);
                return;
              }
              startMultiDragSession(e);
            }}
            title="Ziehen, um alle markierten Elemente gemeinsam zu verschieben (Shift halten für Auswahl)"
            className="absolute z-[32] pointer-events-auto border-2 border-dashed border-indigo-500 bg-indigo-500/[0.06] rounded-md cursor-move"
          >
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className={`absolute left-1/2 -translate-x-1/2 ${
                multiSelectionBounds.minY < 14 ? 'top-full mt-2' : 'bottom-full mb-2'
              } flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/95 text-white shadow-xl border border-slate-700/90 text-[10px] font-bold whitespace-nowrap z-40 cursor-default`}
            >
              <span className="text-indigo-300 tabular-nums">
                {totalSelectedCount}{' '}
                {totalSelectedCount === 1 ? 'Element markiert' : 'Elemente markiert'}
              </span>
              {selectedStrokeIds.length > 0 && (
                <>
                  <span className="text-slate-600">|</span>
                  <div className="flex items-center gap-1">
                    {PEN_COLORS.slice(0, 6).map((sw) => (
                      <button
                        key={sw.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRecolorSelectedStrokes(sw.color);
                        }}
                        title={`Strichfarbe ändern: ${sw.label}`}
                        style={{ backgroundColor: sw.color }}
                        className="w-3.5 h-3.5 rounded-full border border-white/50 hover:scale-110 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </>
              )}
              <span className="text-slate-600">|</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMultiDuplicate();
                }}
                title="Auswahl duplizieren (⌘D)"
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Duplizieren</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMultiDelete();
                }}
                title="Auswahl löschen (⌫)"
                className="p-1 rounded bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Layer 3.9: Lasso Loop Preview */}
        {lassoPath.length >= 2 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-[29]"
          >
            <path
              d={`${buildSmoothSvgPath(lassoPath)} Z`}
              fill="rgba(79, 70, 229, 0.08)"
              stroke="#4f46e5"
              strokeWidth={0.35}
              strokeDasharray="1.1 0.8"
            />
          </svg>
        )}

        {/* Layer 4: Interactive Sticky Notes (Klebezettel / Post-its) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {annotations.stickyNotes.map((note, idx) => {
            const theme = STICKY_NOTE_STYLES[note.color] || STICKY_NOTE_STYLES.yellow;
            const isMultiSelected = selectedStickyIds.includes(note.id);
            const isStickySelected = selectedStickyId === note.id && !isMultiSelected;
            const previewSnippet = note.text.trim()
              ? note.text.trim().slice(0, 14) + (note.text.trim().length > 14 ? '…' : '')
              : `Notiz ${idx + 1}`;
            const selectThisSticky = () => {
              clearMultiSelection();
              setSelectedStickyId(note.id);
              setSelectedImageId(null);
              setSelectedTextId(null);
              setSelectedStickerId(null);
              setSelectedShapeId(null);
              setSelectedStrokeIds([]);
            };

            return (
              <div
                key={note.id}
                style={{ left: `${note.x}%`, top: `${note.y}%` }}
                onPointerDown={(e) => {
                  if (isDrawTool) return;
                  if (e.shiftKey) {
                    e.stopPropagation();
                    startShiftGesture(e, { kind: 'sticky', id: note.id });
                    return;
                  }
                  e.stopPropagation();
                  selectThisSticky();
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
                    if (e.shiftKey) {
                      e.stopPropagation();
                      startShiftGesture(e, { kind: 'sticky', id: note.id });
                      return;
                    }
                    if (isMultiSelected) {
                      e.stopPropagation();
                      startMultiDragSession(e);
                      return;
                    }
                    e.stopPropagation();
                    selectThisSticky();
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
                  <div
                    className={`mt-0.5 inline-flex items-center gap-1 rounded-lg border shadow-sm overflow-hidden bg-white ${
                      (isStickySelected && !isDrawTool) || isMultiSelected ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        if (e.shiftKey) {
                          e.stopPropagation();
                          startShiftGesture(e, { kind: 'sticky', id: note.id });
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (e.shiftKey) return;
                        selectThisSticky();
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
                    className={`mt-0.5 w-48 sm:w-56 rounded-xl border ${theme.bg} ${theme.border} ${theme.textColor} shadow-lg overflow-hidden transition-shadow ${
                      (isStickySelected && !isDrawTool) || isMultiSelected ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    {/* Header Drag Bar with Color Switcher & Duplicate */}
                    <div
                      onPointerDown={(e) => {
                        if (isDrawTool) return;
                        if (e.shiftKey) {
                          e.stopPropagation();
                          startShiftGesture(e, { kind: 'sticky', id: note.id });
                          return;
                        }
                        if (isMultiSelected) {
                          e.stopPropagation();
                          startMultiDragSession(e);
                          return;
                        }
                        e.stopPropagation();
                        selectThisSticky();
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
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-85">
                        <GripHorizontal className="w-3.5 h-3.5 shrink-0" />
                        <div
                          onPointerDown={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 ml-0.5"
                        >
                          {(Object.keys(STICKY_NOTE_STYLES) as StickyColor[]).map((colorKey) => {
                            const st = STICKY_NOTE_STYLES[colorKey];
                            const active = note.color === colorKey;
                            return (
                              <button
                                key={colorKey}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectThisSticky();
                                  handleStickyColorChange(note.id, colorKey);
                                }}
                                title={`Klebezettel-Farbe: ${st.label}`}
                                aria-label={`Farbe ${st.label}`}
                                className={`w-3 h-3 rounded-full ${st.pinColor} border border-black/25 transition-transform cursor-pointer ${
                                  active ? 'scale-125 ring-1 ring-slate-900' : 'opacity-75 hover:opacity-100'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateSticky(note.id);
                          }}
                          title="Klebezettel duplizieren (⌘D)"
                          aria-label="Klebezettel duplizieren"
                          className="p-1 rounded hover:bg-black/10 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
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
                        selectThisSticky();
                        handleStickyFocus(note.id);
                      }}
                      onPointerDown={(e) => {
                        if (e.shiftKey) {
                          e.stopPropagation();
                          startShiftGesture(e, { kind: 'sticky', id: note.id });
                        } else {
                          e.stopPropagation();
                        }
                      }}
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

        {/* Layer 5: True-Scale Brush & Eraser Hover Circle on Mac / Desktop */}
        {isBrushHoverTool && (
          <div
            ref={hoverCursorRef}
            aria-hidden="true"
            style={{
              left: 0,
              top: 0,
              width: `${brushDiameterPx}px`,
              height: `${brushDiameterPx}px`,
              opacity: 0,
              transform: 'translate3d(-9999px, -9999px, 0)',
              backgroundColor:
                activeTool === 'pen'
                  ? penColor
                  : activeTool === 'highlighter'
                  ? highlighterColor
                  : eraserMode === 'partial'
                  ? 'rgba(244, 63, 94, 0.22)'
                  : 'rgba(244, 63, 94, 0.12)',
              borderColor:
                activeTool === 'eraser'
                  ? 'rgba(225, 29, 72, 0.9)'
                  : 'rgba(15, 23, 42, 0.55)',
              borderStyle:
                activeTool === 'eraser' && eraserMode === 'whole' ? 'dashed' : 'solid',
              borderWidth: activeTool === 'eraser' ? '1.5px' : '1px',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.85)',
              mixBlendMode: activeTool === 'highlighter' ? 'multiply' : 'normal',
            }}
            className="absolute rounded-full pointer-events-none z-50 transition-[width,height] duration-75"
          />
        )}
      </div>
    </div>
  );
};
