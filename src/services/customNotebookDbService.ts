import {
  BlankPageTemplate,
  BlankPaperColor,
  CustomNotebookPage,
  NotebookDocument,
} from '../types/notebook';
import { getBlankPaperPalette } from '../data/notebooksData';
import { evictPdfCache, inspectPdfBlob } from './pdfRenderService';

const DB_NAME = 'mediengestalter_custom_notebooks_db';
const DB_VERSION = 1;
const STORE_NOTEBOOKS = 'notebooks';
const STORE_MEDIA = 'media';

export interface MediaRecord {
  id: string;
  mimeType: string;
  name: string;
  blob: Blob;
  createdAt: number;
}

export type StagedCustomItem =
  | {
      tempId: string;
      kind: 'pdf';
      file: File;
      fileName: string;
      pageCount: number;
    }
  | {
      tempId: string;
      kind: 'image';
      file: File;
      fileName: string;
      previewUrl: string;
    }
  | {
      tempId: string;
      kind: 'blank';
      template: BlankPageTemplate;
      paperColor?: BlankPaperColor;
      showDateHeader?: boolean;
      count: number;
    };

const mediaUrlCache = new Map<string, string>();
const blankSurfaceCache = new Map<string, string>();

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB wird in diesem Browser nicht unterstützt.'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NOTEBOOKS)) {
        db.createObjectStore(STORE_NOTEBOOKS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_MEDIA)) {
        db.createObjectStore(STORE_MEDIA, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB konnte nicht geöffnet werden.'));
  });
}

function txPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Datenbankfehler'));
  });
}

function transactionDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Transaktion fehlgeschlagen'));
    tx.onabort = () => reject(tx.error ?? new Error('Transaktion abgebrochen'));
  });
}

export async function listCustomNotebooks(): Promise<NotebookDocument[]> {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NOTEBOOKS, 'readonly');
    const store = tx.objectStore(STORE_NOTEBOOKS);
    const all = await txPromise<NotebookDocument[]>(store.getAll());
    db.close();
    return (all || [])
      .map((doc) => ({
        ...doc,
        isCustom: true,
        sourceType:
          doc.sourceType === 'blatt-blanko'
            ? ('blatt-blanko' as const)
            : ('eigenes-heft' as const),
        totalPages: doc.customPages?.length ?? doc.totalPages ?? 0,
      }))
      .sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));
  } catch (err) {
    console.error('Fehler beim Laden eigener Hefte:', err);
    return [];
  }
}

export async function getMediaObjectUrl(mediaId: string): Promise<string | null> {
  const existing = mediaUrlCache.get(mediaId);
  if (existing) return existing;

  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_MEDIA, 'readonly');
    const record = await txPromise<MediaRecord | undefined>(tx.objectStore(STORE_MEDIA).get(mediaId));
    db.close();
    if (!record || !record.blob) return null;

    const url = URL.createObjectURL(record.blob);
    mediaUrlCache.set(mediaId, url);
    return url;
  } catch (err) {
    console.error('Medium konnte nicht aus IndexedDB geladen werden:', err);
    return null;
  }
}

export function revokeMediaObjectUrl(mediaId: string): void {
  const url = mediaUrlCache.get(mediaId);
  if (url) {
    mediaUrlCache.delete(mediaId);
    evictPdfCache(url);
    try {
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  }
}

function makeTemplateLabel(template: BlankPageTemplate): string {
  switch (template) {
    case 'lined':
      return 'Linierte Notizseite';
    case 'grid':
      return 'Karierte Notizseite';
    case 'dotted':
      return 'Punktkarierte Notizseite';
    default:
      return 'Leere Notizseite';
  }
}

function stripFileExt(name: string): string {
  return name.replace(/\.[^/.]+$/, '').trim() || name;
}

async function materializeStagedItems(
  stagedItems: StagedCustomItem[],
  startPageNumber: number
): Promise<{ pages: CustomNotebookPage[]; mediaRecords: MediaRecord[] }> {
  const pages: CustomNotebookPage[] = [];
  const mediaRecords: MediaRecord[] = [];
  let pageNum = startPageNumber;

  for (const item of stagedItems) {
    if (item.kind === 'blank') {
      const count = Math.max(1, Math.min(50, item.count));
      for (let i = 0; i < count; i++) {
        pages.push({
          id: `pg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          pageNumber: pageNum++,
          kind: 'blank',
          template: item.template,
          paperColor: item.paperColor ?? 'white',
          showDateHeader: Boolean(item.showDateHeader),
          title: `${makeTemplateLabel(item.template)}`,
          defaultRotation: 0,
        });
      }
    } else if (item.kind === 'image') {
      const mediaId = `med-img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      mediaRecords.push({
        id: mediaId,
        mimeType: item.file.type || 'image/jpeg',
        name: item.fileName,
        blob: item.file,
        createdAt: Date.now(),
      });
      pages.push({
        id: `pg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        pageNumber: pageNum++,
        kind: 'image',
        mediaId,
        title: stripFileExt(item.fileName),
        defaultRotation: 0,
      });
    } else if (item.kind === 'pdf') {
      const mediaId = `med-pdf-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const totalPdfPages =
        item.pageCount > 0 ? item.pageCount : await inspectPdfBlob(item.file);
      mediaRecords.push({
        id: mediaId,
        mimeType: item.file.type || 'application/pdf',
        name: item.fileName,
        blob: item.file,
        createdAt: Date.now(),
      });
      const baseTitle = stripFileExt(item.fileName);
      for (let p = 1; p <= totalPdfPages; p++) {
        pages.push({
          id: `pg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          pageNumber: pageNum++,
          kind: 'pdf-page',
          mediaId,
          pdfPageNumber: p,
          title: `${baseTitle} · PDF-S. ${p}`,
          defaultRotation: 0,
        });
      }
    }
  }

  return { pages, mediaRecords };
}

export async function createCustomNotebook(input: {
  title: string;
  subtitle?: string;
  category: string;
  coverColor: string;
  sourceType?: 'eigenes-heft' | 'blatt-blanko';
  stagedItems: StagedCustomItem[];
}): Promise<NotebookDocument> {
  const { pages, mediaRecords } = await materializeStagedItems(input.stagedItems, 1);
  if (pages.length === 0) {
    throw new Error('Bitte mindestens eine Seite (PDF, Foto oder Notizseite) hinzufügen.');
  }

  const now = Date.now();
  const pdfCount = input.stagedItems.filter((i) => i.kind === 'pdf').length;
  const imgCount = input.stagedItems.filter((i) => i.kind === 'image').length;
  const blankCount = pages.filter((p) => p.kind === 'blank').length;

  const autoParts: string[] = [];
  if (pdfCount > 0) autoParts.push(`${pdfCount} ${pdfCount === 1 ? 'PDF' : 'PDFs'}`);
  if (imgCount > 0) autoParts.push(`${imgCount} ${imgCount === 1 ? 'Foto' : 'Fotos'}`);
  if (blankCount > 0) autoParts.push(`${blankCount} ${blankCount === 1 ? 'Notizseite' : 'Notizseiten'}`);

  const resolvedSourceType = input.sourceType ?? 'eigenes-heft';

  const notebook: NotebookDocument = {
    id: `custom-${now}-${Math.random().toString(36).slice(2, 7)}`,
    title: input.title.trim(),
    subtitle:
      input.subtitle?.trim() ||
      (resolvedSourceType === 'blatt-blanko'
        ? `Blatt Blanko (${pages.length} ${pages.length === 1 ? 'Seite' : 'Seiten'})`
        : `Eigenes Heft (${autoParts.join(' · ') || `${pages.length} Seiten`})`),
    category: input.category.trim() || 'Eigene Mitschriften',
    sourceType: resolvedSourceType,
    coverColor: input.coverColor,
    isCustom: true,
    customPages: pages,
    createdAt: now,
    updatedAt: now,
    totalPages: pages.length,
  };

  const db = await openDatabase();
  try {
    const tx = db.transaction([STORE_MEDIA, STORE_NOTEBOOKS], 'readwrite');
    const mediaStore = tx.objectStore(STORE_MEDIA);
    for (const media of mediaRecords) {
      mediaStore.put(media);
    }
    tx.objectStore(STORE_NOTEBOOKS).put(notebook);
    await transactionDone(tx);
  } finally {
    db.close();
  }

  return notebook;
}

export async function createQuickBlankNotebook(
  customTitle?: string,
  options?: {
    template?: BlankPageTemplate;
    paperColor?: BlankPaperColor;
    showDateHeader?: boolean;
  }
): Promise<NotebookDocument> {
  const existing = await listCustomNotebooks();
  const blankCount = existing.filter((b) => b.sourceType === 'blatt-blanko').length;
  const title = customTitle?.trim() || `Blatt Blanko ${blankCount + 1}`;
  return createCustomNotebook({
    title,
    subtitle: 'Leeres DIN-A4-Blatt für freie Notizen, Bilder & Skizzen',
    category: 'Notizblatt',
    coverColor: 'from-slate-700 to-slate-900',
    sourceType: 'blatt-blanko',
    stagedItems: [
      {
        tempId: `quick-blank-${Date.now()}`,
        kind: 'blank',
        template: options?.template ?? 'blank',
        paperColor: options?.paperColor ?? 'white',
        showDateHeader: options?.showDateHeader ?? false,
        count: 1,
      },
    ],
  });
}

export async function appendQuickBlankPageToCustomNotebook(
  notebookId: string,
  options?: {
    template?: BlankPageTemplate;
    paperColor?: BlankPaperColor;
    showDateHeader?: boolean;
  }
): Promise<{ notebook: NotebookDocument; firstNewPageNumber: number } | null> {
  return appendPagesToCustomNotebook(notebookId, [
    {
      tempId: `quick-append-${Date.now()}`,
      kind: 'blank',
      template: options?.template ?? 'blank',
      paperColor: options?.paperColor ?? 'white',
      showDateHeader: options?.showDateHeader ?? false,
      count: 1,
    },
  ]);
}

function measureBlobImageAspectRatio(blob: Blob): Promise<number> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const ratio =
        img.naturalWidth > 0 && img.naturalHeight > 0
          ? img.naturalWidth / img.naturalHeight
          : 1.333;
      URL.revokeObjectURL(url);
      resolve(ratio);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(1.333);
    };
    img.src = url;
  });
}

export async function saveEmbeddedImageMedia(
  file: File | Blob,
  fileName?: string
): Promise<{ mediaId: string; aspectRatio: number }> {
  if (typeof navigator !== 'undefined' && navigator.storage?.persist) {
    navigator.storage.persist().catch(() => {});
  }

  const mediaId = `med-embed-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const aspectRatio = await measureBlobImageAspectRatio(file);
  const record: MediaRecord = {
    id: mediaId,
    mimeType: file.type || 'image/png',
    name: fileName || (file instanceof File ? file.name : 'eingefuegtes-bild.png'),
    blob: file,
    createdAt: Date.now(),
  };

  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_MEDIA, 'readwrite');
    tx.objectStore(STORE_MEDIA).put(record);
    await transactionDone(tx);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'QuotaExceededError') {
      throw new Error(
        'Der lokale Browser-Speicher ist voll. Bitte zuerst ein ZIP-Backup sichern oder alte Hefte löschen.'
      );
    }
    throw err;
  } finally {
    db.close();
  }

  const objectUrl = URL.createObjectURL(file);
  mediaUrlCache.set(mediaId, objectUrl);

  return { mediaId, aspectRatio };
}

export async function updateCustomNotebookMeta(
  notebookId: string,
  patch: {
    title: string;
    subtitle: string;
    category: string;
    coverColor: string;
  }
): Promise<NotebookDocument | null> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NOTEBOOKS, 'readwrite');
    const store = tx.objectStore(STORE_NOTEBOOKS);
    const existing = await txPromise<NotebookDocument | undefined>(store.get(notebookId));
    if (!existing) {
      return null;
    }

    const updated: NotebookDocument = {
      ...existing,
      title: patch.title.trim() || existing.title,
      subtitle: patch.subtitle.trim() || existing.subtitle,
      category: patch.category.trim() || existing.category,
      coverColor: patch.coverColor || existing.coverColor,
      updatedAt: Date.now(),
    };

    store.put(updated);
    await transactionDone(tx);
    return updated;
  } finally {
    db.close();
  }
}

export async function appendPagesToCustomNotebook(
  notebookId: string,
  stagedItems: StagedCustomItem[]
): Promise<{ notebook: NotebookDocument; firstNewPageNumber: number } | null> {
  const db = await openDatabase();
  try {
    const readTx = db.transaction(STORE_NOTEBOOKS, 'readonly');
    const existing = await txPromise<NotebookDocument | undefined>(
      readTx.objectStore(STORE_NOTEBOOKS).get(notebookId)
    );
    if (!existing) {
      return null;
    }

    const currentPages = existing.customPages ?? [];
    const startPage = currentPages.length + 1;
    const { pages: newPages, mediaRecords } = await materializeStagedItems(
      stagedItems,
      startPage
    );
    if (newPages.length === 0) {
      return { notebook: existing, firstNewPageNumber: currentPages.length || 1 };
    }

    const combinedPages = [...currentPages, ...newPages];
    const updated: NotebookDocument = {
      ...existing,
      customPages: combinedPages,
      totalPages: combinedPages.length,
      updatedAt: Date.now(),
    };

    const writeTx = db.transaction([STORE_MEDIA, STORE_NOTEBOOKS], 'readwrite');
    const mediaStore = writeTx.objectStore(STORE_MEDIA);
    for (const media of mediaRecords) {
      mediaStore.put(media);
    }
    writeTx.objectStore(STORE_NOTEBOOKS).put(updated);
    await transactionDone(writeTx);

    return { notebook: updated, firstNewPageNumber: startPage };
  } finally {
    db.close();
  }
}

export async function updateCustomPageTemplate(
  notebookId: string,
  pageNumber: number,
  template: BlankPageTemplate,
  applyToAllBlank: boolean = false,
  paperColor?: BlankPaperColor,
  showDateHeader?: boolean
): Promise<NotebookDocument | null> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NOTEBOOKS, 'readwrite');
    const store = tx.objectStore(STORE_NOTEBOOKS);
    const existing = await txPromise<NotebookDocument | undefined>(store.get(notebookId));
    if (!existing || !existing.customPages) {
      return null;
    }

    let changed = false;
    const nextPages = existing.customPages.map((pg, idx) => {
      if (pg.kind !== 'blank') return pg;
      const shouldUpdate = applyToAllBlank || pg.pageNumber === pageNumber || idx === pageNumber - 1;
      if (!shouldUpdate) return pg;
      changed = true;
      return {
        ...pg,
        template,
        paperColor: paperColor ?? pg.paperColor ?? 'white',
        showDateHeader:
          showDateHeader !== undefined ? showDateHeader : Boolean(pg.showDateHeader),
        title: makeTemplateLabel(template),
      };
    });

    if (!changed) return existing;

    const updated: NotebookDocument = {
      ...existing,
      customPages: nextPages,
      updatedAt: Date.now(),
    };

    store.put(updated);
    await transactionDone(tx);
    return updated;
  } finally {
    db.close();
  }
}

export async function deleteCustomNotebookPage(
  notebookId: string,
  pageNumber: number
): Promise<NotebookDocument | null> {
  const db = await openDatabase();
  try {
    const readTx = db.transaction(STORE_NOTEBOOKS, 'readonly');
    const allBooks = await txPromise<NotebookDocument[]>(
      readTx.objectStore(STORE_NOTEBOOKS).getAll()
    );
    const existing = allBooks.find((b) => b.id === notebookId);
    if (!existing || !existing.customPages || existing.customPages.length <= 1) {
      return existing ?? null;
    }

    const idx = existing.customPages.findIndex(
      (pg, i) => pg.pageNumber === pageNumber || i === pageNumber - 1
    );
    if (idx < 0) return existing;

    const removedPage = existing.customPages[idx];
    const remainingPages = existing.customPages
      .filter((_, i) => i !== idx)
      .map((pg, newIdx) => ({
        ...pg,
        pageNumber: newIdx + 1,
      }));

    // Check if the removed page's mediaId is still referenced in this or any other custom notebook
    let shouldDeleteMedia = false;
    if (removedPage.kind === 'image' || removedPage.kind === 'pdf-page') {
      const targetMediaId = removedPage.mediaId;
      const usedInRemaining = remainingPages.some(
        (pg) => (pg.kind === 'image' || pg.kind === 'pdf-page') && pg.mediaId === targetMediaId
      );
      const usedElsewhere = allBooks.some(
        (b) =>
          b.id !== notebookId &&
          (b.customPages ?? []).some(
            (pg) => (pg.kind === 'image' || pg.kind === 'pdf-page') && pg.mediaId === targetMediaId
          )
      );
      shouldDeleteMedia = !usedInRemaining && !usedElsewhere;
    }

    const updated: NotebookDocument = {
      ...existing,
      customPages: remainingPages,
      totalPages: remainingPages.length,
      updatedAt: Date.now(),
    };

    const writeTx = db.transaction([STORE_NOTEBOOKS, STORE_MEDIA], 'readwrite');
    writeTx.objectStore(STORE_NOTEBOOKS).put(updated);
    if (shouldDeleteMedia && (removedPage.kind === 'image' || removedPage.kind === 'pdf-page')) {
      writeTx.objectStore(STORE_MEDIA).delete(removedPage.mediaId);
      revokeMediaObjectUrl(removedPage.mediaId);
    }
    await transactionDone(writeTx);

    return updated;
  } finally {
    db.close();
  }
}

export async function reorderCustomNotebookPages(
  notebookId: string,
  fromPage: number,
  toPage: number
): Promise<NotebookDocument | null> {
  const db = await openDatabase();
  try {
    const tx = db.transaction(STORE_NOTEBOOKS, 'readwrite');
    const store = tx.objectStore(STORE_NOTEBOOKS);
    const existing = await txPromise<NotebookDocument | undefined>(store.get(notebookId));
    if (!existing || !existing.customPages || existing.customPages.length <= 1) {
      return existing ?? null;
    }

    const len = existing.customPages.length;
    const fromIdx = fromPage - 1;
    const toIdx = toPage - 1;
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= len || toIdx >= len) {
      return existing;
    }

    const reordered = [...existing.customPages];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);

    const normalizedPages = reordered.map((pg, idx) => ({
      ...pg,
      pageNumber: idx + 1,
    }));

    const updated: NotebookDocument = {
      ...existing,
      customPages: normalizedPages,
      totalPages: normalizedPages.length,
      updatedAt: Date.now(),
    };

    store.put(updated);
    await transactionDone(tx);
    return updated;
  } finally {
    db.close();
  }
}

export async function deleteCustomNotebook(notebookId: string): Promise<void> {
  const db = await openDatabase();
  try {
    const readTx = db.transaction(STORE_NOTEBOOKS, 'readonly');
    const allBooks = await txPromise<NotebookDocument[]>(
      readTx.objectStore(STORE_NOTEBOOKS).getAll()
    );

    const target = allBooks.find((b) => b.id === notebookId);
    const usedElsewhere = new Set<string>();
    for (const book of allBooks) {
      if (book.id === notebookId) continue;
      for (const pg of book.customPages ?? []) {
        if (pg.kind === 'image' || pg.kind === 'pdf-page') {
          usedElsewhere.add(pg.mediaId);
        }
      }
    }

    const mediaToDelete = new Set<string>();
    for (const pg of target?.customPages ?? []) {
      if ((pg.kind === 'image' || pg.kind === 'pdf-page') && !usedElsewhere.has(pg.mediaId)) {
        mediaToDelete.add(pg.mediaId);
      }
    }

    const writeTx = db.transaction([STORE_NOTEBOOKS, STORE_MEDIA], 'readwrite');
    writeTx.objectStore(STORE_NOTEBOOKS).delete(notebookId);
    const mediaStore = writeTx.objectStore(STORE_MEDIA);
    for (const mId of mediaToDelete) {
      mediaStore.delete(mId);
      revokeMediaObjectUrl(mId);
    }
    await transactionDone(writeTx);
  } finally {
    db.close();
  }
}

export async function cleanupUnusedEmbeddedMedia(
  activeEmbedMediaIds: Set<string>
): Promise<void> {
  try {
    const db = await openDatabase();
    try {
      const readTx = db.transaction(STORE_MEDIA, 'readonly');
      const allMedia = await txPromise<MediaRecord[]>(
        readTx.objectStore(STORE_MEDIA).getAll()
      );
      const orphanIds = (allMedia || [])
        .filter((m) => m.id.startsWith('med-embed-') && !activeEmbedMediaIds.has(m.id))
        .map((m) => m.id);
      if (orphanIds.length === 0) return;

      const writeTx = db.transaction(STORE_MEDIA, 'readwrite');
      const mediaStore = writeTx.objectStore(STORE_MEDIA);
      for (const id of orphanIds) {
        mediaStore.delete(id);
        revokeMediaObjectUrl(id);
      }
      await transactionDone(writeTx);
    } finally {
      db.close();
    }
  } catch (err) {
    console.error('Bereinigung nicht verwendeter Bilder fehlgeschlagen:', err);
  }
}

export function renderBlankTemplateToDataUrl(
  template: BlankPageTemplate,
  rotation: number = 0,
  width: number = 1240,
  paperColor: BlankPaperColor = 'white',
  showDateHeader: boolean = false
): { dataUrl: string; width: number; height: number } {
  const palette = getBlankPaperPalette(paperColor);
  const normalizedRot = ((rotation % 360) + 360) % 360;
  const isQuarter = normalizedRot === 90 || normalizedRot === 270;
  const baseW = width;
  const baseH = Math.round(width * 1.4142); // DIN A4 aspect ratio
  const outW = isQuarter ? baseH : baseW;
  const outH = isQuarter ? baseW : baseH;

  const cacheKey = `${template}::${palette.id}::${showDateHeader ? 'hdr1' : 'hdr0'}::${normalizedRot}::${outW}`;
  const cached = blankSurfaceCache.get(cacheKey);
  if (cached) {
    return { dataUrl: cached, width: outW, height: outH };
  }

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { dataUrl: '', width: outW, height: outH };
  }

  ctx.fillStyle = palette.bgHex;
  ctx.fillRect(0, 0, outW, outH);

  ctx.save();
  ctx.translate(outW / 2, outH / 2);
  ctx.rotate((normalizedRot * Math.PI) / 180);
  ctx.translate(-baseW / 2, -baseH / 2);

  const linedStep = Math.round(baseW / 26); // ~47px on 1240px A4
  const linedLeftMargin = Math.round(baseW * 0.115);

  if (showDateHeader) {
    const headerFontPx = Math.max(11, Math.round(baseW * 0.016));
    const headerTextY = Math.round(linedStep * 1.25);
    const leftStart =
      template === 'lined'
        ? linedLeftMargin + Math.round(linedStep * 0.35)
        : Math.round(baseW * 0.065);
    const dateColX = Math.round(baseW * 0.7);
    const rightEnd = Math.round(baseW * 0.935);

    ctx.save();
    ctx.font = `600 ${headerFontPx}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = palette.dotHex;
    ctx.globalAlpha = 0.9;
    ctx.textBaseline = 'alphabetic';

    const themaLabel = 'Thema:';
    const datumLabel = 'Datum:';
    ctx.fillText(themaLabel, leftStart, headerTextY);
    ctx.fillText(datumLabel, dateColX, headerTextY);

    const themaW = ctx.measureText(themaLabel).width;
    const datumW = ctx.measureText(datumLabel).width;

    ctx.strokeStyle = palette.lineHex;
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(leftStart + themaW + Math.round(baseW * 0.012), headerTextY + 2);
    ctx.lineTo(dateColX - Math.round(baseW * 0.028), headerTextY + 2);
    ctx.moveTo(dateColX + datumW + Math.round(baseW * 0.012), headerTextY + 2);
    ctx.lineTo(rightEnd, headerTextY + 2);
    ctx.stroke();

    const dividerY = Math.round(linedStep * 1.75) + 0.5;
    ctx.strokeStyle = palette.marginHex;
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(
      template === 'lined' ? 0 : Math.round(baseW * 0.055),
      dividerY
    );
    ctx.lineTo(
      template === 'lined' ? baseW : Math.round(baseW * 0.945),
      dividerY
    );
    ctx.stroke();
    ctx.restore();
  }

  if (template === 'lined') {
    const step = linedStep;
    const topMargin = showDateHeader ? step * 2.65 : step * 2.2;
    const bottomMargin = baseH - step * 1.4;
    const leftMargin = linedLeftMargin;

    ctx.strokeStyle = palette.lineHex;
    ctx.lineWidth = 1.5;
    for (let y = topMargin; y <= bottomMargin; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(baseW, Math.round(y) + 0.5);
      ctx.stroke();
    }

    // Classic or color-harmonized left margin rule
    ctx.strokeStyle = palette.marginHex;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftMargin, 0);
    ctx.lineTo(leftMargin, baseH);
    ctx.stroke();
  } else if (template === 'grid') {
    const step = Math.round(baseW / 32); // crisp 5mm square feel
    const margin = step;
    const topStart = showDateHeader ? step * 3 : margin;

    ctx.strokeStyle = palette.gridHex;
    ctx.lineWidth = 1.3;
    for (let x = margin; x <= baseW - margin; x += step) {
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, topStart);
      ctx.lineTo(Math.round(x) + 0.5, baseH - margin);
      ctx.stroke();
    }
    for (let y = topStart; y <= baseH - margin; y += step) {
      ctx.beginPath();
      ctx.moveTo(margin, Math.round(y) + 0.5);
      ctx.lineTo(baseW - margin, Math.round(y) + 0.5);
      ctx.stroke();
    }
  } else if (template === 'dotted') {
    const step = Math.round(baseW / 28);
    const margin = Math.round(step * 1.3);
    const topStart = showDateHeader ? margin + step * 2 : margin;
    ctx.fillStyle = palette.dotHex;
    for (let y = topStart; y <= baseH - margin; y += step) {
      for (let x = margin; x <= baseW - margin; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();

  const dataUrl = canvas.toDataURL('image/png');
  blankSurfaceCache.set(cacheKey, dataUrl);
  return { dataUrl, width: outW, height: outH };
}

export async function getCustomNotebooksBackupStats(): Promise<{
  notebookCount: number;
  mediaCount: number;
  totalBytes: number;
}> {
  try {
    const db = await openDatabase();
    const tx = db.transaction([STORE_NOTEBOOKS, STORE_MEDIA], 'readonly');
    const [notebooks, media] = await Promise.all([
      txPromise<NotebookDocument[]>(tx.objectStore(STORE_NOTEBOOKS).getAll()),
      txPromise<MediaRecord[]>(tx.objectStore(STORE_MEDIA).getAll()),
    ]);
    db.close();
    const totalBytes = (media || []).reduce(
      (sum, item) => sum + (item.blob?.size || 0),
      0
    );
    return {
      notebookCount: (notebooks || []).length,
      mediaCount: (media || []).length,
      totalBytes,
    };
  } catch {
    return { notebookCount: 0, mediaCount: 0, totalBytes: 0 };
  }
}

export async function exportAllCustomNotebooksWithMedia(): Promise<{
  notebooks: NotebookDocument[];
  media: MediaRecord[];
}> {
  const db = await openDatabase();
  try {
    const tx = db.transaction([STORE_NOTEBOOKS, STORE_MEDIA], 'readonly');
    const [rawNotebooks, rawMedia] = await Promise.all([
      txPromise<NotebookDocument[]>(tx.objectStore(STORE_NOTEBOOKS).getAll()),
      txPromise<MediaRecord[]>(tx.objectStore(STORE_MEDIA).getAll()),
    ]);

    const notebooks = (rawNotebooks || []).map((doc) => ({
      ...doc,
      isCustom: true,
      sourceType:
        doc.sourceType === 'blatt-blanko'
          ? ('blatt-blanko' as const)
          : ('eigenes-heft' as const),
      totalPages: doc.customPages?.length ?? doc.totalPages ?? 0,
    }));

    return {
      notebooks,
      media: rawMedia || [],
    };
  } finally {
    db.close();
  }
}

export async function importCustomNotebooksWithMedia(
  notebooks: NotebookDocument[],
  media: MediaRecord[]
): Promise<{ importedNotebooks: number; importedMedia: number }> {
  if (notebooks.length === 0 && media.length === 0) {
    return { importedNotebooks: 0, importedMedia: 0 };
  }

  for (const m of media) {
    if (m?.id) revokeMediaObjectUrl(m.id);
  }

  const db = await openDatabase();
  try {
    const tx = db.transaction([STORE_MEDIA, STORE_NOTEBOOKS], 'readwrite');
    const mediaStore = tx.objectStore(STORE_MEDIA);
    const notebookStore = tx.objectStore(STORE_NOTEBOOKS);

    let importedMedia = 0;
    for (const m of media) {
      if (!m?.id || !m.blob) continue;
      mediaStore.put(m);
      importedMedia += 1;
    }

    let importedNotebooks = 0;
    for (const doc of notebooks) {
      if (!doc?.id) continue;
      notebookStore.put({
        ...doc,
        isCustom: true,
        sourceType:
          doc.sourceType === 'blatt-blanko'
            ? ('blatt-blanko' as const)
            : ('eigenes-heft' as const),
        totalPages: doc.customPages?.length ?? doc.totalPages ?? 0,
      });
      importedNotebooks += 1;
    }

    await transactionDone(tx);
    return { importedNotebooks, importedMedia };
  } finally {
    db.close();
  }
}

