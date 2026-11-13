import {
  BlankPageTemplate,
  CustomNotebookPage,
  NotebookDocument,
} from '../types/notebook';
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
  const tx = db.transaction([STORE_MEDIA, STORE_NOTEBOOKS], 'readwrite');
  const mediaStore = tx.objectStore(STORE_MEDIA);
  for (const media of mediaRecords) {
    mediaStore.put(media);
  }
  tx.objectStore(STORE_NOTEBOOKS).put(notebook);
  await transactionDone(tx);
  db.close();

  return notebook;
}

export async function createQuickBlankNotebook(
  customTitle?: string
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
        template: 'blank',
        count: 1,
      },
    ],
  });
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
  const tx = db.transaction(STORE_MEDIA, 'readwrite');
  tx.objectStore(STORE_MEDIA).put(record);
  await transactionDone(tx);
  db.close();

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
  const tx = db.transaction(STORE_NOTEBOOKS, 'readwrite');
  const store = tx.objectStore(STORE_NOTEBOOKS);
  const existing = await txPromise<NotebookDocument | undefined>(store.get(notebookId));
  if (!existing) {
    db.close();
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
  db.close();
  return updated;
}

export async function appendPagesToCustomNotebook(
  notebookId: string,
  stagedItems: StagedCustomItem[]
): Promise<{ notebook: NotebookDocument; firstNewPageNumber: number } | null> {
  const db = await openDatabase();
  const readTx = db.transaction(STORE_NOTEBOOKS, 'readonly');
  const existing = await txPromise<NotebookDocument | undefined>(
    readTx.objectStore(STORE_NOTEBOOKS).get(notebookId)
  );
  if (!existing) {
    db.close();
    return null;
  }

  const currentPages = existing.customPages ?? [];
  const startPage = currentPages.length + 1;
  const { pages: newPages, mediaRecords } = await materializeStagedItems(
    stagedItems,
    startPage
  );
  if (newPages.length === 0) {
    db.close();
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
  db.close();

  return { notebook: updated, firstNewPageNumber: startPage };
}

export async function deleteCustomNotebook(notebookId: string): Promise<void> {
  const db = await openDatabase();
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
  db.close();
}

export function renderBlankTemplateToDataUrl(
  template: BlankPageTemplate,
  rotation: number = 0,
  width: number = 1240
): { dataUrl: string; width: number; height: number } {
  const normalizedRot = ((rotation % 360) + 360) % 360;
  const isQuarter = normalizedRot === 90 || normalizedRot === 270;
  const baseW = width;
  const baseH = Math.round(width * 1.4142); // DIN A4 aspect ratio
  const outW = isQuarter ? baseH : baseW;
  const outH = isQuarter ? baseW : baseH;

  const cacheKey = `${template}::${normalizedRot}::${outW}`;
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

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, outW, outH);

  ctx.save();
  ctx.translate(outW / 2, outH / 2);
  ctx.rotate((normalizedRot * Math.PI) / 180);
  ctx.translate(-baseW / 2, -baseH / 2);

  if (template === 'lined') {
    const step = Math.round(baseW / 26); // ~47px on 1240px A4
    const topMargin = step * 2.2;
    const bottomMargin = baseH - step * 1.4;
    const leftMargin = Math.round(baseW * 0.115);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    for (let y = topMargin; y <= bottomMargin; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(baseW, Math.round(y) + 0.5);
      ctx.stroke();
    }

    // Classic subtle coral-rose left margin rule
    ctx.strokeStyle = '#fda4af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftMargin, 0);
    ctx.lineTo(leftMargin, baseH);
    ctx.stroke();
  } else if (template === 'grid') {
    const step = Math.round(baseW / 32); // crisp 5mm square feel
    const margin = step;

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.3;
    for (let x = margin; x <= baseW - margin; x += step) {
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, margin);
      ctx.lineTo(Math.round(x) + 0.5, baseH - margin);
      ctx.stroke();
    }
    for (let y = margin; y <= baseH - margin; y += step) {
      ctx.beginPath();
      ctx.moveTo(margin, Math.round(y) + 0.5);
      ctx.lineTo(baseW - margin, Math.round(y) + 0.5);
      ctx.stroke();
    }
  } else if (template === 'dotted') {
    const step = Math.round(baseW / 28);
    const margin = Math.round(step * 1.3);
    ctx.fillStyle = '#94a3b8';
    for (let y = margin; y <= baseH - margin; y += step) {
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
  const tx = db.transaction([STORE_NOTEBOOKS, STORE_MEDIA], 'readonly');
  const [rawNotebooks, rawMedia] = await Promise.all([
    txPromise<NotebookDocument[]>(tx.objectStore(STORE_NOTEBOOKS).getAll()),
    txPromise<MediaRecord[]>(tx.objectStore(STORE_MEDIA).getAll()),
  ]);
  db.close();

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
  db.close();
  return { importedNotebooks, importedMedia };
}

