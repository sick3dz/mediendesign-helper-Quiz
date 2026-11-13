import { NotebookSticker, NotebookStickyNote, NotebookStore, PageAnnotations } from '../types/notebook';

const NOTEBOOKS_STORAGE_KEY = 'mediengestalter_notebooks_v1';

export const EMPTY_PAGE_ANNOTATIONS: PageAnnotations = {
  strokes: [],
  stickyNotes: [],
  stickers: [],
  textBoxes: [],
  images: [],
};

export const DEFAULT_NOTEBOOK_STORE: NotebookStore = {
  version: 1,
  pages: {},
  lastPageByBook: {},
};

export function makePageKey(notebookId: string, pageNumber: number): string {
  return `${notebookId}::${pageNumber}`;
}

export function loadNotebookStore(): NotebookStore {
  try {
    const raw = localStorage.getItem(NOTEBOOKS_STORAGE_KEY);
    if (!raw) return DEFAULT_NOTEBOOK_STORE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_NOTEBOOK_STORE;
    return {
      version: 1,
      pages: parsed.pages && typeof parsed.pages === 'object' ? parsed.pages : {},
      lastPageByBook:
        parsed.lastPageByBook && typeof parsed.lastPageByBook === 'object'
          ? parsed.lastPageByBook
          : {},
    };
  } catch {
    return DEFAULT_NOTEBOOK_STORE;
  }
}

export function saveNotebookStore(store: NotebookStore): void {
  try {
    localStorage.setItem(NOTEBOOKS_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save notebook annotations', e);
  }
}

export function getPageAnnotations(
  store: NotebookStore,
  notebookId: string,
  pageNumber: number
): PageAnnotations {
  const key = makePageKey(notebookId, pageNumber);
  const entry = store.pages[key];
  if (!entry) {
    return { strokes: [], stickyNotes: [], stickers: [], textBoxes: [], images: [] };
  }
  return {
    strokes: Array.isArray(entry.strokes) ? entry.strokes : [],
    stickyNotes: Array.isArray(entry.stickyNotes) ? entry.stickyNotes : [],
    stickers: Array.isArray(entry.stickers) ? entry.stickers : [],
    textBoxes: Array.isArray(entry.textBoxes) ? entry.textBoxes : [],
    images: Array.isArray(entry.images) ? entry.images : [],
    rotationOverride: entry.rotationOverride,
  };
}

export function savePageAnnotations(
  store: NotebookStore,
  notebookId: string,
  pageNumber: number,
  annotations: PageAnnotations
): NotebookStore {
  const key = makePageKey(notebookId, pageNumber);
  const isEmpty =
    annotations.strokes.length === 0 &&
    annotations.stickyNotes.length === 0 &&
    annotations.stickers.length === 0 &&
    (annotations.textBoxes?.length || 0) === 0 &&
    (annotations.images?.length || 0) === 0 &&
    annotations.rotationOverride === undefined;

  const nextPages = { ...store.pages };
  if (isEmpty) {
    delete nextPages[key];
  } else {
    nextPages[key] = annotations;
  }

  const nextStore: NotebookStore = {
    ...store,
    pages: nextPages,
  };
  saveNotebookStore(nextStore);
  return nextStore;
}

export function saveLastPageForBook(
  store: NotebookStore,
  notebookId: string,
  pageNumber: number
): NotebookStore {
  const nextStore: NotebookStore = {
    ...store,
    lastPageByBook: {
      ...store.lastPageByBook,
      [notebookId]: pageNumber,
    },
  };
  saveNotebookStore(nextStore);
  return nextStore;
}

export function getNotebookAnnotationSummary(
  store: NotebookStore,
  notebookId: string
): {
  annotatedPages: number;
  stickyCount: number;
  stickerCount: number;
  strokeCount: number;
  textCount: number;
  imageCount: number;
} {
  let annotatedPages = 0;
  let stickyCount = 0;
  let stickerCount = 0;
  let strokeCount = 0;
  let textCount = 0;
  let imageCount = 0;

  const prefix = `${notebookId}::`;
  for (const [key, page] of Object.entries(store.pages)) {
    if (!key.startsWith(prefix) || !page) continue;
    const strokes = page.strokes?.length || 0;
    const stickies = page.stickyNotes?.length || 0;
    const stickers = page.stickers?.length || 0;
    const texts = page.textBoxes?.length || 0;
    const images = page.images?.length || 0;
    if (strokes > 0 || stickies > 0 || stickers > 0 || texts > 0 || images > 0) {
      annotatedPages += 1;
      strokeCount += strokes;
      stickyCount += stickies;
      stickerCount += stickers;
      textCount += texts;
      imageCount += images;
    }
  }

  return { annotatedPages, stickyCount, stickerCount, strokeCount, textCount, imageCount };
}

export interface AnnotatedPageIndexItem {
  notebookId: string;
  pageNumber: number;
  stickers: NotebookSticker[];
  stickyNotes: NotebookStickyNote[];
  strokeCount: number;
  textCount: number;
  imageCount: number;
}

export function getAllAnnotatedPages(store: NotebookStore): AnnotatedPageIndexItem[] {
  const result: AnnotatedPageIndexItem[] = [];
  for (const [key, page] of Object.entries(store.pages)) {
    if (!page) continue;
    const sepIdx = key.lastIndexOf('::');
    if (sepIdx <= 0) continue;
    const notebookId = key.slice(0, sepIdx);
    const pageNumber = parseInt(key.slice(sepIdx + 2), 10);
    if (!notebookId || !Number.isFinite(pageNumber)) continue;

    const stickers = Array.isArray(page.stickers) ? page.stickers : [];
    const stickyNotes = Array.isArray(page.stickyNotes) ? page.stickyNotes : [];
    const strokeCount = Array.isArray(page.strokes) ? page.strokes.length : 0;
    const textCount = Array.isArray(page.textBoxes) ? page.textBoxes.length : 0;
    const imageCount = Array.isArray(page.images) ? page.images.length : 0;

    if (
      stickers.length > 0 ||
      stickyNotes.length > 0 ||
      strokeCount > 0 ||
      textCount > 0 ||
      imageCount > 0
    ) {
      result.push({
        notebookId,
        pageNumber,
        stickers,
        stickyNotes,
        strokeCount,
        textCount,
        imageCount,
      });
    }
  }
  result.sort((a, b) =>
    a.notebookId === b.notebookId
      ? a.pageNumber - b.pageNumber
      : a.notebookId.localeCompare(b.notebookId)
  );
  return result;
}

export function restoreNotebookStoreFromBackup(imported: unknown): NotebookStore | null {
  if (!imported || typeof imported !== 'object') return null;
  const candidate = imported as Partial<NotebookStore>;
  const normalized: NotebookStore = {
    version: 1,
    pages: candidate.pages && typeof candidate.pages === 'object' ? candidate.pages : {},
    lastPageByBook:
      candidate.lastPageByBook && typeof candidate.lastPageByBook === 'object'
        ? candidate.lastPageByBook
        : {},
  };
  saveNotebookStore(normalized);
  return normalized;
}

export function deleteNotebookAnnotations(
  store: NotebookStore,
  notebookId: string
): NotebookStore {
  const prefix = `${notebookId}::`;
  const nextPages: Record<string, PageAnnotations> = {};
  for (const [key, val] of Object.entries(store.pages)) {
    if (!key.startsWith(prefix)) {
      nextPages[key] = val;
    }
  }
  const nextLastPage = { ...store.lastPageByBook };
  delete nextLastPage[notebookId];

  const nextStore: NotebookStore = {
    ...store,
    pages: nextPages,
    lastPageByBook: nextLastPage,
  };
  saveNotebookStore(nextStore);
  return nextStore;
}
