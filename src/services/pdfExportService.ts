import { jsPDF } from 'jspdf';
import { NotebookDocument, NotebookStore, PageAnnotations } from '../types/notebook';
import { getPageAnnotations } from './notebookStorageService';
import { renderPdfPageToDataUrl } from './pdfRenderService';
import {
  getMediaObjectUrl,
  renderBlankTemplateToDataUrl,
} from './customNotebookDbService';
import { NOTEBOOK_STICKERS } from '../data/notebooksData';

interface LoadedImageResult {
  img: HTMLImageElement;
  naturalWidth: number;
  naturalHeight: number;
}

function loadImageElement(src: string): Promise<LoadedImageResult | null> {
  return new Promise((resolve) => {
    const img = new Image();
    if (!src.startsWith('blob:') && !src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      resolve({
        img,
        naturalWidth: img.naturalWidth || 1200,
        naturalHeight: img.naturalHeight || 1600,
      });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function computePageSizeMm(canvasW: number, canvasH: number): { widthMm: number; heightMm: number } {
  const longSideMm = 297; // A4 long edge in mm
  if (canvasW >= canvasH) {
    const ratio = canvasH / Math.max(1, canvasW);
    return {
      widthMm: longSideMm,
      heightMm: +(longSideMm * ratio).toFixed(2),
    };
  }
  const ratio = canvasW / Math.max(1, canvasH);
  return {
    widthMm: +(longSideMm * ratio).toFixed(2),
    heightMm: longSideMm,
  };
}

export async function exportNotebookAsPdf(
  notebook: NotebookDocument,
  store: NotebookStore,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const totalPages = Math.max(1, notebook.totalPages);
  let pdf: jsPDF | null = null;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    onProgress?.(pageNum, totalPages);

    const annotations: PageAnnotations = getPageAnnotations(store, notebook.id, pageNum);

    const imagePageMeta =
      notebook.sourceType === 'foto-skript' ? notebook.imagePages?.[pageNum - 1] : undefined;
    const customPage =
      notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko'
        ? notebook.customPages?.[pageNum - 1]
        : undefined;

    const baseRotation = imagePageMeta?.defaultRotation ?? customPage?.defaultRotation ?? 0;
    const effectiveRotation =
      annotations.rotationOverride !== undefined ? annotations.rotationOverride : baseRotation;

    // 1. Prepare exact upright page dimensions & render background without any cropping
    const maxEdge = 1800;
    let canvasW = 1240;
    let canvasH = 1754;
    let canvas = document.createElement('canvas');

    const renderFittedImage = async (
      src: string,
      rotationDeg: number,
      preferPortrait?: boolean
    ) => {
      const loaded = await loadImageElement(src);
      if (!loaded) return false;

      const { img, naturalWidth: rawW, naturalHeight: rawH } = loaded;
      const needsLegacyExifFallback =
        annotations.rotationOverride === undefined &&
        Boolean(preferPortrait) &&
        rawW > rawH;
      const rot = (((rotationDeg + (needsLegacyExifFallback ? 90 : 0)) % 360) + 360) % 360;
      const isQuarter = rot === 90 || rot === 270;
      const uprightW = isQuarter ? rawH : rawW;
      const uprightH = isQuarter ? rawW : rawH;

      const scale = Math.min(1, maxEdge / Math.max(uprightW, uprightH));
      canvasW = Math.max(1, Math.round(uprightW * scale));
      canvasH = Math.max(1, Math.round(uprightH * scale));

      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

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
      return true;
    };

    let backgroundReady = false;

    try {
      if (notebook.sourceType === 'foto-skript' && imagePageMeta) {
        backgroundReady = await renderFittedImage(
          imagePageMeta.imageUrl,
          effectiveRotation,
          imagePageMeta.preferPortrait
        );
      } else if (notebook.sourceType === 'pdf-dokument' && notebook.pdfUrl) {
        const res = await renderPdfPageToDataUrl(
          notebook.pdfUrl,
          pageNum,
          effectiveRotation,
          1400
        );
        backgroundReady = await renderFittedImage(res.dataUrl, 0);
      } else if (
        (notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko') &&
        customPage
      ) {
        if (customPage.kind === 'blank') {
          const res = renderBlankTemplateToDataUrl(customPage.template, effectiveRotation, 1240);
          backgroundReady = await renderFittedImage(res.dataUrl, 0);
        } else if (customPage.kind === 'image') {
          const url = await getMediaObjectUrl(customPage.mediaId);
          if (url) {
            backgroundReady = await renderFittedImage(url, effectiveRotation);
          }
        } else if (customPage.kind === 'pdf-page') {
          const url = await getMediaObjectUrl(customPage.mediaId);
          if (url) {
            const res = await renderPdfPageToDataUrl(
              url,
              customPage.pdfPageNumber,
              effectiveRotation,
              1400
            );
            backgroundReady = await renderFittedImage(res.dataUrl, 0);
          }
        }
      } else {
        const res = renderBlankTemplateToDataUrl('blank', effectiveRotation, 1240);
        backgroundReady = await renderFittedImage(res.dataUrl, 0);
      }
    } catch (err) {
      console.error(`Fehler beim Rendern von Seite ${pageNum} für PDF-Export:`, err);
    }

    if (!backgroundReady) {
      canvas.width = canvasW;
      canvas.height = canvasH;
      const fallbackCtx = canvas.getContext('2d');
      if (fallbackCtx) {
        fallbackCtx.fillStyle = '#ffffff';
        fallbackCtx.fillRect(0, 0, canvasW, canvasH);
      }
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    // 2. Render Annotations onto canvas using exact page dimensions
    const uiScale = canvasW / 1240;

    // 2a. Strokes (Highlighters first with multiply blend, then smooth/pressure Pen strokes)
    const allStrokes = annotations.strokes || [];
    const highlighterStrokes = allStrokes.filter((s) => s.tool === 'highlighter');
    const penStrokes = allStrokes.filter((s) => s.tool === 'pen');

    for (const stroke of highlighterStrokes) {
      drawSmoothStrokeToCanvas(ctx, stroke, canvasW, canvasH, {
        alpha: 0.42,
        multiply: true,
      });
    }

    for (const stroke of penStrokes) {
      if (
        stroke.points.length >= 3 &&
        stroke.points.some((pt) => typeof pt.p === 'number')
      ) {
        drawPressureInkPolygonToCanvas(ctx, stroke, canvasW, canvasH);
      } else {
        drawSmoothStrokeToCanvas(ctx, stroke, canvasW, canvasH, {
          alpha: 0.96,
          multiply: false,
        });
      }
    }

    // 2b. Embedded Images
    for (const imgEl of annotations.images || []) {
      try {
        const url = await getMediaObjectUrl(imgEl.mediaId);
        if (!url) continue;
        await drawEmbeddedImageToCanvas(ctx, url, imgEl, canvasW, canvasH);
      } catch (err) {
        console.error('Fehler beim Zeichnen eines eingefügten Bildes in PDF:', err);
      }
    }

    // 2c. Stickers
    for (const stk of annotations.stickers || []) {
      drawStickerToCanvas(ctx, stk, canvasW, canvasH, uiScale);
    }

    // 2d. Text Boxes
    for (const box of annotations.textBoxes || []) {
      drawTextBoxToCanvas(ctx, box, canvasW, canvasH, uiScale);
    }

    // 2e. Sticky Notes
    for (const sticky of annotations.stickyNotes || []) {
      drawStickyNoteToCanvas(ctx, sticky, canvasW, canvasH, uiScale);
    }

    // 3. Add PDF page with exact matching dimensions & orientation (zero cropping!)
    const { widthMm, heightMm } = computePageSizeMm(canvasW, canvasH);
    const orientation: 'portrait' | 'landscape' = widthMm > heightMm ? 'landscape' : 'portrait';

    if (!pdf) {
      pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [widthMm, heightMm],
      });
    } else {
      pdf.addPage([widthMm, heightMm], orientation);
    }

    const pageDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    pdf.addImage(pageDataUrl, 'JPEG', 0, 0, widthMm, heightMm);
  }

  if (!pdf) {
    pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  }

  const safeTitle = notebook.title
    .replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, '_')
    .replace(/_+/g, '_');
  pdf.save(`${safeTitle || 'Heft'}-Export.pdf`);
}

function drawSmoothStrokeToCanvas(
  ctx: CanvasRenderingContext2D,
  stroke: { color: string; width: number; points: { x: number; y: number }[] },
  canvasW: number,
  canvasH: number,
  opts: { alpha: number; multiply: boolean }
): void {
  const pts = stroke.points;
  if (pts.length === 0) return;

  ctx.save();
  if (opts.multiply) {
    ctx.globalCompositeOperation = 'multiply';
  }
  ctx.globalAlpha = opts.alpha;
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = Math.max(1, (stroke.width / 100) * canvasW);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  const x0 = (pts[0].x / 100) * canvasW;
  const y0 = (pts[0].y / 100) * canvasH;
  ctx.moveTo(x0, y0);

  if (pts.length === 1) {
    ctx.lineTo(x0 + 0.5, y0 + 0.5);
  } else {
    for (let i = 1; i < pts.length - 1; i++) {
      const cx = (pts[i].x / 100) * canvasW;
      const cy = (pts[i].y / 100) * canvasH;
      const nx = (pts[i + 1].x / 100) * canvasW;
      const ny = (pts[i + 1].y / 100) * canvasH;
      ctx.quadraticCurveTo(cx, cy, (cx + nx) / 2, (cy + ny) / 2);
    }
    const last = pts[pts.length - 1];
    ctx.lineTo((last.x / 100) * canvasW, (last.y / 100) * canvasH);
  }

  ctx.stroke();
  ctx.restore();
}

function drawPressureInkPolygonToCanvas(
  ctx: CanvasRenderingContext2D,
  stroke: { color: string; width: number; points: { x: number; y: number; p?: number }[] },
  canvasW: number,
  canvasH: number
): void {
  const pts = stroke.points;
  if (pts.length < 3) return;

  const leftPts: { x: number; y: number }[] = [];
  const rightPts: { x: number; y: number }[] = [];

  for (let i = 0; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const curr = pts[i];
    const next = pts[Math.min(pts.length - 1, i + 1)];

    const pPrev = prev.p ?? 0.5;
    const pCurr = curr.p ?? 0.5;
    const pNext = next.p ?? 0.5;
    const pSmooth = Math.max(0.15, Math.min(1, (pPrev + pCurr * 2 + pNext) / 4));
    const radiusPx = ((stroke.width / 100) * canvasW * (0.48 + 0.88 * pSmooth)) / 2;

    const tx = ((next.x - prev.x) / 100) * canvasW;
    const ty = ((next.y - prev.y) / 100) * canvasH;
    const len = Math.hypot(tx, ty);
    const nx = len > 0.0001 ? -ty / len : 0;
    const ny = len > 0.0001 ? tx / len : 1;

    const cx = (curr.x / 100) * canvasW;
    const cy = (curr.y / 100) * canvasH;

    leftPts.push({ x: cx + nx * radiusPx, y: cy + ny * radiusPx });
    rightPts.push({ x: cx - nx * radiusPx, y: cy - ny * radiusPx });
  }

  ctx.save();
  ctx.fillStyle = stroke.color;
  ctx.globalAlpha = 0.96;
  ctx.beginPath();
  ctx.moveTo(leftPts[0].x, leftPts[0].y);

  for (let i = 1; i < leftPts.length - 1; i++) {
    const mx = (leftPts[i].x + leftPts[i + 1].x) / 2;
    const my = (leftPts[i].y + leftPts[i + 1].y) / 2;
    ctx.quadraticCurveTo(leftPts[i].x, leftPts[i].y, mx, my);
  }

  const lastLeft = leftPts[leftPts.length - 1];
  const lastRight = rightPts[rightPts.length - 1];
  const endTip = {
    x: (pts[pts.length - 1].x / 100) * canvasW,
    y: (pts[pts.length - 1].y / 100) * canvasH,
  };
  ctx.lineTo(lastLeft.x, lastLeft.y);
  ctx.quadraticCurveTo(endTip.x, endTip.y, lastRight.x, lastRight.y);

  for (let i = rightPts.length - 2; i > 0; i--) {
    const mx = (rightPts[i].x + rightPts[i - 1].x) / 2;
    const my = (rightPts[i].y + rightPts[i - 1].y) / 2;
    ctx.quadraticCurveTo(rightPts[i].x, rightPts[i].y, mx, my);
  }

  const startTip = {
    x: (pts[0].x / 100) * canvasW,
    y: (pts[0].y / 100) * canvasH,
  };
  ctx.lineTo(rightPts[0].x, rightPts[0].y);
  ctx.quadraticCurveTo(startTip.x, startTip.y, leftPts[0].x, leftPts[0].y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

async function drawEmbeddedImageToCanvas(
  ctx: CanvasRenderingContext2D,
  url: string,
  imgEl: { x: number; y: number; widthPct: number; opacity?: number; rotation?: number },
  canvasW: number,
  canvasH: number
): Promise<void> {
  const loaded = await loadImageElement(url);
  if (!loaded) return;

  const { img, naturalWidth: iw, naturalHeight: ih } = loaded;
  const rot = (((imgEl.rotation ?? 0) % 360) + 360) % 360;
  const isQuarter = rot === 90 || rot === 270;

  // Match stage display: widthPct is always the visible upright width after rotation
  const uprightW = (imgEl.widthPct / 100) * canvasW;
  const drawW = isQuarter ? uprightW * (iw / Math.max(1, ih)) : uprightW;
  const drawH = isQuarter ? uprightW : uprightW * (ih / Math.max(1, iw));

  const xPx = (imgEl.x / 100) * canvasW;
  const yPx = (imgEl.y / 100) * canvasH;

  ctx.save();
  ctx.globalAlpha = imgEl.opacity ?? 1;
  ctx.translate(xPx, yPx);
  if (rot !== 0) {
    ctx.rotate((rot * Math.PI) / 180);
  }
  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

function drawStickyNoteToCanvas(
  ctx: CanvasRenderingContext2D,
  sticky: { x: number; y: number; color: string; text?: string; isCollapsed?: boolean },
  canvasW: number,
  canvasH: number,
  uiScale: number
): void {
  const colorMap: Record<string, { bg: string; border: string; header: string }> = {
    yellow: { bg: '#fef08a', border: '#facc15', header: '#fde047' },
    pink: { bg: '#fbcfe8', border: '#f472b6', header: '#f9a8d4' },
    mint: { bg: '#d1fae5', border: '#6ee7b7', header: '#a7f3d0' },
    blue: { bg: '#e0f2fe', border: '#7dd3fc', header: '#bae6fd' },
  };
  const theme = colorMap[sticky.color] || colorMap.yellow;
  const xPx = (sticky.x / 100) * canvasW;
  const yPx = (sticky.y / 100) * canvasH;
  const boxW = Math.round(280 * uiScale);
  const boxH = Math.round((sticky.isCollapsed ? 52 : 204) * uiScale);

  ctx.save();
  ctx.fillStyle = theme.bg;
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = Math.max(2, 3 * uiScale);
  ctx.beginPath();
  ctx.roundRect(xPx, yPx, boxW, boxH, 12 * uiScale);
  ctx.fill();
  ctx.stroke();

  if (sticky.text && !sticky.isCollapsed) {
    ctx.fillStyle = '#1e293b';
    const fontPx = Math.max(12, Math.round(20 * uiScale));
    ctx.font = `600 ${fontPx}px system-ui, sans-serif`;
    ctx.textBaseline = 'top';
    const lines = wrapText(ctx, sticky.text, boxW - 32 * uiScale);
    let ty = yPx + 20 * uiScale;
    const lineStep = Math.round(fontPx * 1.35);
    for (const line of lines.slice(0, 7)) {
      ctx.fillText(line, xPx + 16 * uiScale, ty);
      ty += lineStep;
    }
  } else if (sticky.isCollapsed) {
    ctx.fillStyle = '#1e293b';
    const fontPx = Math.max(11, Math.round(18 * uiScale));
    ctx.font = `700 ${fontPx}px system-ui, sans-serif`;
    ctx.textBaseline = 'middle';
    const snippet = sticky.text?.trim() ? sticky.text.trim().slice(0, 14) : 'Notiz';
    ctx.fillText(snippet, xPx + 16 * uiScale, yPx + boxH / 2);
  }
  ctx.restore();
}

function drawTextBoxToCanvas(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; text: string; color: string; fontSize: number; hasBackground?: boolean },
  canvasW: number,
  canvasH: number,
  uiScale: number
): void {
  if (!box.text.trim()) return;
  const xPx = (box.x / 100) * canvasW;
  const yPx = (box.y / 100) * canvasH;
  const fontSizePx = Math.max(11, Math.round(((box.fontSize || 2) / 100) * canvasW));
  const lineHeight = Math.round(fontSizePx * 1.35);
  const padX = 12 * uiScale;
  const padY = 8 * uiScale;

  // Match stage max-w-[78%] and right-edge bounds
  const maxBoxWidth = Math.min(
    canvasW * 0.78,
    Math.max(160 * uiScale, canvasW - xPx - 12 * uiScale)
  );
  const maxContentWidth = Math.max(60 * uiScale, maxBoxWidth - padX * 2);

  ctx.save();
  ctx.font = `500 ${fontSizePx}px system-ui, sans-serif`;

  const wrappedLines = wrapText(ctx, box.text, maxContentWidth);
  let maxLineW = 0;
  for (const line of wrappedLines) {
    maxLineW = Math.max(maxLineW, ctx.measureText(line).width);
  }

  const boxW = Math.min(maxBoxWidth, Math.max(110 * uiScale, maxLineW + padX * 2));
  const boxH = wrappedLines.length * lineHeight + padY * 2;

  if (box.hasBackground ?? true) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
    ctx.lineWidth = Math.max(1, 2 * uiScale);
    ctx.beginPath();
    ctx.roundRect(xPx, yPx, boxW, boxH, 8 * uiScale);
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = box.color || '#0f172a';
  ctx.textBaseline = 'top';
  wrappedLines.forEach((line, idx) => {
    ctx.fillText(line, xPx + padX, yPx + padY + idx * lineHeight);
  });
  ctx.restore();
}

const STICKER_CANVAS_PALETTE: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  merksatz: { bg: '#fef3c7', border: '#fbbf24', text: '#78350f' },
  wichtig: { bg: '#ffe4e6', border: '#fb7185', text: '#881337' },
  pruefung: { bg: '#e0e7ff', border: '#818cf8', text: '#312e81' },
  verstanden: { bg: '#d1fae5', border: '#34d399', text: '#064e3b' },
  frage: { bg: '#e0f2fe', border: '#38bdf8', text: '#0c4a6e' },
  stern: { bg: '#fef9c3', border: '#facc15', text: '#713f12' },
};

function drawStickerToCanvas(
  ctx: CanvasRenderingContext2D,
  stk: { x: number; y: number; type: string; scale?: number; opacity?: number },
  canvasW: number,
  canvasH: number,
  uiScale: number
): void {
  const preset = NOTEBOOK_STICKERS.find((p) => p.type === stk.type);
  if (!preset) return;
  const palette = STICKER_CANVAS_PALETTE[preset.type] || {
    bg: '#ffffff',
    border: '#cbd5e1',
    text: '#0f172a',
  };
  const xPx = (stk.x / 100) * canvasW;
  const yPx = (stk.y / 100) * canvasH;
  const scale = (stk.scale ?? 1) * uiScale * 1.15;
  const labelText = `${preset.symbol} ${preset.shortLabel}`;

  ctx.save();
  ctx.globalAlpha = stk.opacity ?? 1;
  ctx.translate(xPx, yPx);
  ctx.rotate((-2 * Math.PI) / 180);
  ctx.scale(scale, scale);

  ctx.font = '800 18px system-ui, sans-serif';
  const textWidth = ctx.measureText(labelText).width;
  const pillW = Math.max(120, Math.ceil(textWidth + 30));
  const pillH = 40;

  ctx.fillStyle = palette.bg;
  ctx.strokeStyle = palette.border;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(-pillW / 2, -pillH / 2, pillW, pillH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = palette.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(labelText, 0, 1);

  ctx.restore();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const paragraphs = text.split(/\r?\n/);
  const lines: string[] = [];

  for (const para of paragraphs) {
    if (!para) {
      lines.push('');
      continue;
    }
    const words = para.split(' ');
    let currentLine = '';

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        currentLine = candidate;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        // Fallback: split overlong single word if wider than maxWidth
        if (ctx.measureText(word).width > maxWidth) {
          let chunk = '';
          for (const ch of word) {
            if (ctx.measureText(chunk + ch).width > maxWidth && chunk) {
              lines.push(chunk);
              chunk = ch;
            } else {
              chunk += ch;
            }
          }
          currentLine = chunk;
        } else {
          currentLine = word;
        }
      }
    }
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [''];
}
