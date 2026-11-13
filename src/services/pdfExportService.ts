import { jsPDF } from 'jspdf';
import { NotebookDocument, NotebookStore, PageAnnotations } from '../types/notebook';
import { getPageAnnotations } from './notebookStorageService';
import { renderPdfPageToDataUrl } from './pdfRenderService';
import {
  getMediaObjectUrl,
  renderBlankTemplateToDataUrl,
} from './customNotebookDbService';
import { NOTEBOOK_STICKERS } from '../data/notebooksData';

export async function exportNotebookAsPdf(
  notebook: NotebookDocument,
  store: NotebookStore,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const totalPages = Math.max(1, notebook.totalPages);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidthMm = 210;
  const pageHeightMm = 297;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    onProgress?.(pageNum, totalPages);
    if (pageNum > 1) {
      pdf.addPage('a4', 'portrait');
    }

    const annotations: PageAnnotations = getPageAnnotations(store, notebook.id, pageNum);

    // 1. Render base page background to canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 1754; // A4 aspect ratio at high quality
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imagePageMeta =
      notebook.sourceType === 'foto-skript' ? notebook.imagePages?.[pageNum - 1] : undefined;
    const customPage =
      notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko'
        ? notebook.customPages?.[pageNum - 1]
        : undefined;

    const baseRotation = imagePageMeta?.defaultRotation ?? customPage?.defaultRotation ?? 0;
    const effectiveRotation =
      annotations.rotationOverride !== undefined ? annotations.rotationOverride : baseRotation;

    try {
      if (notebook.sourceType === 'foto-skript' && imagePageMeta) {
        await drawImageSrcToCanvas(ctx, imagePageMeta.imageUrl, effectiveRotation);
      } else if (notebook.sourceType === 'pdf-dokument' && notebook.pdfUrl) {
        const res = await renderPdfPageToDataUrl(
          notebook.pdfUrl,
          pageNum,
          effectiveRotation,
          1300
        );
        await drawImageSrcToCanvas(ctx, res.dataUrl, 0);
      } else if (
        (notebook.sourceType === 'eigenes-heft' || notebook.sourceType === 'blatt-blanko') &&
        customPage
      ) {
        if (customPage.kind === 'blank') {
          const res = renderBlankTemplateToDataUrl(customPage.template, effectiveRotation, 1240);
          await drawImageSrcToCanvas(ctx, res.dataUrl, 0);
        } else if (customPage.kind === 'image') {
          const url = await getMediaObjectUrl(customPage.mediaId);
          if (url) {
            await drawImageSrcToCanvas(ctx, url, effectiveRotation);
          }
        } else if (customPage.kind === 'pdf-page') {
          const url = await getMediaObjectUrl(customPage.mediaId);
          if (url) {
            const res = await renderPdfPageToDataUrl(
              url,
              customPage.pdfPageNumber,
              effectiveRotation,
              1300
            );
            await drawImageSrcToCanvas(ctx, res.dataUrl, 0);
          }
        }
      } else {
        const res = renderBlankTemplateToDataUrl('blank', effectiveRotation, 1240);
        await drawImageSrcToCanvas(ctx, res.dataUrl, 0);
      }
    } catch (err) {
      console.error(`Fehler beim Rendern von Seite ${pageNum} für PDF-Export:`, err);
    }

    // 2. Render Annotations onto canvas
    // Strokes
    for (const stroke of annotations.strokes || []) {
      const pts = stroke.points;
      if (pts.length === 0) continue;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (stroke.tool === 'highlighter') {
        ctx.globalAlpha = 0.35;
      }
      ctx.beginPath();
      ctx.moveTo((pts[0].x / 100) * canvas.width, (pts[0].y / 100) * canvas.height);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo((pts[i].x / 100) * canvas.width, (pts[i].y / 100) * canvas.height);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Embedded Images
    for (const imgEl of annotations.images || []) {
      try {
        const url = await getMediaObjectUrl(imgEl.mediaId);
        if (!url) continue;
        await drawEmbeddedImageToCanvas(ctx, url, imgEl, canvas.width, canvas.height);
      } catch (err) {
        console.error('Fehler beim Zeichnen eines eingefügten Bildes in PDF:', err);
      }
    }

    // Sticky Notes
    for (const sticky of annotations.stickyNotes || []) {
      drawStickyNoteToCanvas(ctx, sticky, canvas.width, canvas.height);
    }

    // Text Boxes
    for (const box of annotations.textBoxes || []) {
      drawTextBoxToCanvas(ctx, box, canvas.width, canvas.height);
    }

    // Stickers
    for (const stk of annotations.stickers || []) {
      drawStickerToCanvas(ctx, stk, canvas.width, canvas.height);
    }

    // 3. Add canvas data to PDF page
    const pageDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    pdf.addImage(pageDataUrl, 'JPEG', 0, 0, pageWidthMm, pageHeightMm);
  }

  const safeTitle = notebook.title
    .replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, '_')
    .replace(/_+/g, '_');
  pdf.save(`${safeTitle || 'Heft'}-Export.pdf`);
}

async function drawImageSrcToCanvas(
  ctx: CanvasRenderingContext2D,
  src: string,
  rotation: number
): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = img.naturalWidth || 1200;
      const h = img.naturalHeight || 1600;
      const rot = (((rotation % 360) + 360) % 360);
      const isQuarter = rot === 90 || rot === 270;
      const cw = canvasWidth(ctx);
      const ch = canvasHeight(ctx);

      ctx.save();
      ctx.translate(cw / 2, ch / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();
      resolve();
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

function canvasWidth(ctx: CanvasRenderingContext2D): number {
  return ctx.canvas.width;
}

function canvasHeight(ctx: CanvasRenderingContext2D): number {
  return ctx.canvas.height;
}

async function drawEmbeddedImageToCanvas(
  ctx: CanvasRenderingContext2D,
  url: string,
  imgEl: { x: number; y: number; widthPct: number; opacity?: number; rotation?: number },
  canvasW: number,
  canvasH: number
): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const iw = img.naturalWidth || 800;
      const ih = img.naturalHeight || 600;
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
      resolve();
    };
    img.onerror = () => resolve();
    img.src = url;
  });
}

function drawStickyNoteToCanvas(
  ctx: CanvasRenderingContext2D,
  sticky: { x: number; y: number; color: string; text?: string; isCollapsed?: boolean },
  canvasW: number,
  canvasH: number
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
  const boxW = 280;
  const boxH = sticky.isCollapsed ? 50 : 200;

  ctx.save();
  ctx.fillStyle = theme.bg;
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(xPx, yPx, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  if (sticky.text) {
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 22px system-ui, sans-serif';
    const lines = wrapText(ctx, sticky.text, boxW - 32);
    let ty = yPx + 36;
    for (const line of lines.slice(0, 7)) {
      ctx.fillText(line, xPx + 16, ty);
      ty += 28;
    }
  }
  ctx.restore();
}

function drawTextBoxToCanvas(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; text: string; color: string; fontSize: number; hasBackground?: boolean },
  canvasW: number,
  canvasH: number
): void {
  if (!box.text) return;
  const xPx = (box.x / 100) * canvasW;
  const yPx = (box.y / 100) * canvasH;
  const fontSizePx = Math.round((box.fontSize || 2) * 14);

  ctx.save();
  ctx.font = `600 ${fontSizePx}px system-ui, sans-serif`;
  const metrics = ctx.measureText(box.text);
  const boxW = Math.max(140, metrics.width + 24);
  const boxH = fontSizePx * 1.8 + 16;

  if (box.hasBackground ?? true) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(xPx, yPx, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = box.color || '#0f172a';
  ctx.fillText(box.text, xPx + 12, yPx + fontSizePx + 4);
  ctx.restore();
}

function drawStickerToCanvas(
  ctx: CanvasRenderingContext2D,
  stk: { x: number; y: number; type: string; scale?: number; opacity?: number },
  canvasW: number,
  canvasH: number
): void {
  const preset = NOTEBOOK_STICKERS.find((p) => p.type === stk.type);
  if (!preset) return;
  const xPx = (stk.x / 100) * canvasW;
  const yPx = (stk.y / 100) * canvasH;
  const scale = stk.scale ?? 1;

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
