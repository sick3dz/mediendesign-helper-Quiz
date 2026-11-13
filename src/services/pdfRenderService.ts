import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const documentCache = new Map<string, Promise<PDFDocumentProxy>>();
const thumbnailCache = new Map<string, Promise<string>>();

export function evictPdfCache(pdfUrl: string): void {
  const cachedPromise = documentCache.get(pdfUrl);
  documentCache.delete(pdfUrl);
  if (cachedPromise) {
    cachedPromise
      .then((doc) => {
        try {
          doc.cleanup();
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // ignore
      });
  }
  const thumbPrefix = `${pdfUrl}::`;
  for (const key of Array.from(thumbnailCache.keys())) {
    if (key.startsWith(thumbPrefix)) {
      thumbnailCache.delete(key);
    }
  }
}

export async function inspectPdfBlob(blob: Blob): Promise<number> {
  const buffer = await blob.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    cMapPacked: true,
  });
  const doc = await loadingTask.promise;
  const count = doc.numPages;
  try {
    await loadingTask.destroy();
  } catch {
    // ignore cleanup error
  }
  return count;
}

export function getPdfDocument(pdfUrl: string): Promise<PDFDocumentProxy> {
  const existing = documentCache.get(pdfUrl);
  if (existing) return existing;

  const loadingTask = pdfjsLib.getDocument({
    url: pdfUrl,
    cMapPacked: true,
  });

  const promise = loadingTask.promise.catch((err) => {
    documentCache.delete(pdfUrl);
    throw err;
  });

  documentCache.set(pdfUrl, promise);
  return promise;
}

export async function renderPdfPageToDataUrl(
  pdfUrl: string,
  pageNumber: number,
  rotation: number = 0,
  targetWidth: number = 1400
): Promise<{ dataUrl: string; width: number; height: number; totalPages: number }> {
  const doc = await getPdfDocument(pdfUrl);
  const clampedPage = Math.max(1, Math.min(pageNumber, doc.numPages));
  const page = await doc.getPage(clampedPage);

  const effectivePdfRotation = ((page.rotate + rotation) % 360 + 360) % 360;
  const baseViewport = page.getViewport({ scale: 1, rotation: effectivePdfRotation });
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const scale = Math.max(1.2, (targetWidth * dpr) / baseViewport.width);
  const viewport = page.getViewport({ scale, rotation: effectivePdfRotation });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  // Fill crisp white page background before rendering PDF content
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: ctx,
    viewport,
    canvas,
  }).promise;

  const dataUrl = canvas.toDataURL('image/png');
  return {
    dataUrl,
    width: Math.round(baseViewport.width),
    height: Math.round(baseViewport.height),
    totalPages: doc.numPages,
  };
}

export function getPdfThumbnailDataUrl(pdfUrl: string, pageNumber: number): Promise<string> {
  const key = `${pdfUrl}::${pageNumber}`;
  const existing = thumbnailCache.get(key);
  if (existing) return existing;

  const promise = (async () => {
    const doc = await getPdfDocument(pdfUrl);
    const page = await doc.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = 240 / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport,
      canvas,
    }).promise;

    return canvas.toDataURL('image/jpeg', 0.82);
  })().catch(() => {
    thumbnailCache.delete(key);
    return '';
  });

  thumbnailCache.set(key, promise);
  return promise;
}
