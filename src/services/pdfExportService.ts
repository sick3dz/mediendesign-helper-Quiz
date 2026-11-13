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

    // Strokes
    for (const stroke of annotations.strokes || []) {
      const pts = stroke.points;
      if (pts.length === 0) continue;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = Math.max(1, (stroke.width / 100) * canvasW);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (stroke.tool === 'highlighter') {
        ctx.globalAlpha = 0.35;
      }
      ctx.beginPath();
      ctx.moveTo((pts[0].x / 100) * canvasW, (pts[0].y / 100) * canvasH);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo((pts[i].x / 100) * canvasW, (pts[i].y / 100) * canvasH);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Embedded Images
    for (const imgEl of annotations.images || []) {
      try {
        const url = await getMediaObjectUrl(imgEl.mediaId);
        if (!url) continue;
        await drawEmbeddedImageToCanvas(ctx, url, imgEl, canvasW, canvasH);
      } catch (err) {
        console.error('Fehler beim Zeichnen eines eingefügten Bildes in PDF:', err);
      }
    }

    // Sticky Notes
    for (const sticky of annotations.stickyNotes || []) {
      drawStickyNoteToCanvas(ctx, sticky, canvasW, canvasH, uiScale);
    }

    // Text Boxes
    for (const box of annotations.textBoxes || []) {
      drawTextBoxToCanvas(ctx, box, canvasW, canvasH, uiScale);
    }

    // Stickers
    for (const stk of annotations.stickers || []) {
      drawStickerToCanvas(ctx, stk, canvasW, canvasH, uiScale);
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
  const aspect = ih / iw;
  const wPx = (imgEl.widthPct / 100) * canvasW;
  const hPx = wPx * aspect;
  const xPx = (imgEl.x / 100) * canvasW;
  const yPx = (imgEl.y / 100) * canvasH;
  const rot = (((imgEl.rotation ?? 0) % 360) + 360) % 360;

  ctx.save();
  ctx.globalAlpha = imgEl.opacity ?? 1;
  ctx.translate(xPx, yPx);
  if (rot !== 0) {
    ctx.rotate((rot * Math.PI) / 180);
  }
  ctx.drawImage(img, -wPx / 2, -hPx / 2, wPx, hPx);
  ctx.restore();
}

function drawStickyNoteToCanvas(
  ctx: CanvasRenderingContext2D,
  sticky: { x: number; y: number; color: string; text?: string; isCollapsed?: boolean },
  canvasW: number,
  canvasH: number,
  uiScale: number
): void {
  const colorMap: Record<string, { bg: string; border: string }> = {
    yellow: { bg: '#fef08a', border: '#facc15' },
    pink: { bg: '#fbcfe8', border: '#f472b6' },
    mint: { bg: '#a7f3d0', border: '#34d399' },
    blue: { bg: '#bae6fd', border: '#38bdf8' },
  };
  const theme = colorMap[sticky.color] || colorMap.yellow;
  const xPx = (sticky.x / 100) * canvasW;
  const yPx = (sticky.y / 100) * canvasH;
  const boxW = Math.round(280 * uiScale);
  const boxH = Math.round((sticky.isCollapsed ? 50 : 200) * uiScale);

  ctx.save();
  ctx.fillStyle = theme.bg;
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = Math.max(2, 4 * uiScale);
  ctx.beginPath();
  ctx.roundRect(xPx, yPx, boxW, boxH, 12 * uiScale);
  ctx.fill();
  ctx.stroke();

  if (sticky.text && !sticky.isCollapsed) {
    ctx.fillStyle = '#1e293b';
    const fontPx = Math.round(22 * uiScale);
    ctx.font = `bold ${fontPx}px system-ui, sans-serif`;
    const lines = wrapText(ctx, sticky.text, boxW - 32 * uiScale);
    let ty = yPx + 36 * uiScale;
    for (const line of lines.slice(0, 7)) {
      ctx.fillText(line, xPx + 16 * uiScale, ty);
      ty += 28 * uiScale;
    }
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
  if (!box.text) return;
  const xPx = (box.x / 100) * canvasW;
  const yPx = (box.y / 100) * canvasH;
  const fontSizePx = Math.round((box.fontSize || 2) * 14 * uiScale);
  const lineHeight = Math.round(fontSizePx * 1.35);
  const rawLines = box.text.split(/\r?\n/);

  ctx.save();
  ctx.font = `600 ${fontSizePx}px system-ui, sans-serif`;
  let maxLineW = 0;
  for (const line of rawLines) {
    maxLineW = Math.max(maxLineW, ctx.measureText(line).width);
  }
  const padX = 12 * uiScale;
  const padY = 10 * uiScale;
  const boxW = Math.max(100 * uiScale, maxLineW + padX * 2);
  const boxH = rawLines.length * lineHeight + padY * 2;

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
  rawLines.forEach((line, idx) => {
    ctx.fillText(line, xPx + padX, yPx + padY + idx * lineHeight);
  });
  ctx.restore();
}

function drawStickerToCanvas(
  ctx: CanvasRenderingContext2D,
  stk: { x: number; y: number; type: string; scale?: number; opacity?: number },
  canvasW: number,
  canvasH: number,
  uiScale: number
): void {
  const preset = NOTEBOOK_STICKERS.find((p) => p.type === stk.type);
  if (!preset) return;
  const xPx = (stk.x / 100) * canvasW;
  const yPx = (stk.y / 100) * canvasH;
  const scale = (stk.scale ?? 1) * uiScale;

  ctx.save();
  ctx.globalAlpha = stk.opacity ?? 1;
  ctx.translate(xPx, yPx);
  ctx.scale(scale, scale);

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(-75, -28, 150, 56, 16);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${preset.symbol} ${preset.label}`, 0, 0);

  ctx.restore();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
