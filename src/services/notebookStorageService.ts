import { NotebookStore, PageAnnotations } from '../types/notebook';

const NOTEBOOKS_STORAGE_KEY = 'mediengestalter_notebooks_v1';

export const EMPTY_PAGE_ANNOTATIONS: PageAnnotations = {
  strokes: [],
  stickyNotes: [],
  stickers: [],
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
    return { strokes: [], stickyNotes: [], stickers: [] };
  }
  return {
    strokes: Array.isArray(entry.strokes) ? entry.strokes : [],
    stickyNotes: Array.isArray(entry.stickyNotes) ? entry.stickyNotes : [],
    stickers: Array.isArray(entry.stickers) ? entry.stickers : [],
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
} {
  let annotatedPages = 0;
  let stickyCount = 0;
  let stickerCount = 0;
  let strokeCount = 0;

  const prefix = `${notebookId}::`;
  for (const [key, page] of Object.entries(store.pages)) {
    if (!key.startsWith(prefix) || !page) continue;
    const strokes = page.strokes?.length || 0;
    const stickies = page.stickyNotes?.length || 0;
    const stickers = page.stickers?.length || 0;
    if (strokes > 0 || stickies > 0 || stickers > 0) {
      annotatedPages += 1;
      strokeCount += strokes;
      stickyCount += stickies;
      stickerCount += stickers;
    }
  }

  return { annotatedPages, stickyCount, stickerCount, strokeCount };
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
