import {
  BlankPageTemplate,
  BlankPaperColor,
  NotebookSticker,
  NotebookStickyNote,
  NotebookStore,
  PageAnnotations,
} from '../types/notebook';

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
  blankPageCountByBook: {},
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
      blankPageCountByBook:
        parsed.blankPageCountByBook && typeof parsed.blankPageCountByBook === 'object'
          ? parsed.blankPageCountByBook
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
    templateOverride: entry.templateOverride,
    paperColorOverride: entry.paperColorOverride,
    showDateHeader:
      typeof entry.showDateHeader === 'boolean' ? entry.showDateHeader : undefined,
    headerTopic: typeof entry.headerTopic === 'string' ? entry.headerTopic : undefined,
    headerDate: typeof entry.headerDate === 'string' ? entry.headerDate : undefined,
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
    annotations.rotationOverride === undefined &&
    annotations.templateOverride === undefined &&
    annotations.paperColorOverride === undefined &&
    annotations.showDateHeader === undefined &&
    !annotations.headerTopic &&
    !annotations.headerDate;

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
    const hasHeaderEntry = Boolean(page.headerTopic?.trim() || page.headerDate?.trim());
    if (strokes > 0 || stickies > 0 || stickers > 0 || texts > 0 || images > 0 || hasHeaderEntry) {
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
    const hasHeaderEntry = Boolean(page.headerTopic?.trim() || page.headerDate?.trim());

    if (
      stickers.length > 0 ||
      stickyNotes.length > 0 ||
      strokeCount > 0 ||
      textCount > 0 ||
      imageCount > 0 ||
      hasHeaderEntry
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

function normalizeBlankTemplate(val: unknown): BlankPageTemplate | undefined {
  if (val === 'blank' || val === 'lined' || val === 'grid' || val === 'dotted') {
    return val;
  }
  return undefined;
}

function normalizeBlankPaperColor(val: unknown): BlankPaperColor | undefined {
  if (
    val === 'white' ||
    val === 'cream' ||
    val === 'yellow' ||
    val === 'pink' ||
    val === 'mint' ||
    val === 'blue'
  ) {
    return val;
  }
  return undefined;
}

function normalizePageAnnotations(raw: unknown): PageAnnotations | null {
  if (!raw || typeof raw !== 'object') return null;
  const entry = raw as Partial<PageAnnotations>;
  const rot =
    entry.rotationOverride === 0 ||
    entry.rotationOverride === 90 ||
    entry.rotationOverride === 180 ||
    entry.rotationOverride === 270
      ? entry.rotationOverride
      : undefined;
  const templateOverride = normalizeBlankTemplate(entry.templateOverride);
  const paperColorOverride = normalizeBlankPaperColor(entry.paperColorOverride);

  return {
    strokes: Array.isArray(entry.strokes)
      ? entry.strokes.filter(
          (s) => s && typeof s === 'object' && Array.isArray(s.points)
        )
      : [],
    stickyNotes: Array.isArray(entry.stickyNotes)
      ? entry.stickyNotes.filter((n) => n && typeof n === 'object' && typeof n.id === 'string')
      : [],
    stickers: Array.isArray(entry.stickers)
      ? entry.stickers.filter((s) => s && typeof s === 'object' && typeof s.id === 'string')
      : [],
    textBoxes: Array.isArray(entry.textBoxes)
      ? entry.textBoxes
          .filter((t) => t && typeof t === 'object' && typeof t.id === 'string')
          .map((t) => ({
            ...t,
            backgroundStyle:
              t.backgroundStyle === 'white' ||
              t.backgroundStyle === 'paper' ||
              t.backgroundStyle === 'transparent'
                ? t.backgroundStyle
                : undefined,
            bold: typeof t.bold === 'boolean' ? t.bold : undefined,
            italic: typeof t.italic === 'boolean' ? t.italic : undefined,
            underline: typeof t.underline === 'boolean' ? t.underline : undefined,
            strikethrough: typeof t.strikethrough === 'boolean' ? t.strikethrough : undefined,
            runs: Array.isArray(t.runs)
              ? t.runs
                  .filter(
                    (r) => r && typeof r === 'object' && typeof r.text === 'string'
                  )
                  .map((r) => ({
                    text: r.text,
                    color: typeof r.color === 'string' ? r.color : undefined,
                    bold: typeof r.bold === 'boolean' ? r.bold : undefined,
                    italic: typeof r.italic === 'boolean' ? r.italic : undefined,
                    underline: typeof r.underline === 'boolean' ? r.underline : undefined,
                    strikethrough:
                      typeof r.strikethrough === 'boolean' ? r.strikethrough : undefined,
                  }))
              : undefined,
          }))
      : [],
    images: Array.isArray(entry.images)
      ? entry.images.filter(
          (img) => img && typeof img === 'object' && typeof img.id === 'string' && typeof img.mediaId === 'string'
        )
      : [],
    rotationOverride: rot,
    templateOverride,
    paperColorOverride,
    showDateHeader:
      typeof entry.showDateHeader === 'boolean' ? entry.showDateHeader : undefined,
    headerTopic:
      typeof entry.headerTopic === 'string' && entry.headerTopic.length > 0
        ? entry.headerTopic
        : undefined,
    headerDate:
      typeof entry.headerDate === 'string' && entry.headerDate.length > 0
        ? entry.headerDate
        : undefined,
  };
}

export function restoreNotebookStoreFromBackup(imported: unknown): NotebookStore | null {
  if (!imported || typeof imported !== 'object') return null;
  const candidate = imported as Partial<NotebookStore>;
  const rawPages =
    candidate.pages && typeof candidate.pages === 'object' ? candidate.pages : {};
  const cleanPages: Record<string, PageAnnotations> = {};
  for (const [key, val] of Object.entries(rawPages)) {
    const clean = normalizePageAnnotations(val);
    if (clean) {
      cleanPages[key] = clean;
    }
  }

  const rawLastPage =
    candidate.lastPageByBook && typeof candidate.lastPageByBook === 'object'
      ? candidate.lastPageByBook
      : {};
  const cleanLastPage: Record<string, number> = {};
  for (const [bookId, pageNum] of Object.entries(rawLastPage)) {
    if (typeof pageNum === 'number' && Number.isFinite(pageNum) && pageNum >= 1) {
      cleanLastPage[bookId] = Math.floor(pageNum);
    }
  }

  const rawBlankCounts =
    candidate.blankPageCountByBook && typeof candidate.blankPageCountByBook === 'object'
      ? candidate.blankPageCountByBook
      : {};
  const cleanBlankCounts: Record<string, number> = {};
  for (const [bookId, count] of Object.entries(rawBlankCounts)) {
    if (typeof count === 'number' && Number.isFinite(count) && count >= 1) {
      cleanBlankCounts[bookId] = Math.floor(count);
    }
  }

  const normalized: NotebookStore = {
    version: 1,
    pages: cleanPages,
    lastPageByBook: cleanLastPage,
    blankPageCountByBook: cleanBlankCounts,
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

  const nextBlankCounts = { ...(store.blankPageCountByBook ?? {}) };
  delete nextBlankCounts[notebookId];

  const nextStore: NotebookStore = {
    ...store,
    pages: nextPages,
    lastPageByBook: nextLastPage,
    blankPageCountByBook: nextBlankCounts,
  };
  saveNotebookStore(nextStore);
  return nextStore;
}

export function deleteNotebookPageAnnotations(
  store: NotebookStore,
  notebookId: string,
  deletedPageNumber: number,
  oldTotalPages: number,
  isBuiltInBlank: boolean = false
): NotebookStore {
  const nextPages = { ...store.pages };
  const newTotalPages = Math.max(1, oldTotalPages - 1);

  delete nextPages[makePageKey(notebookId, deletedPageNumber)];

  for (let p = deletedPageNumber + 1; p <= oldTotalPages; p++) {
    const oldKey = makePageKey(notebookId, p);
    const newKey = makePageKey(notebookId, p - 1);
    if (nextPages[oldKey]) {
      nextPages[newKey] = nextPages[oldKey];
      delete nextPages[oldKey];
    } else {
      delete nextPages[newKey];
    }
  }
  // Ensure old last key has no leftover entry
  delete nextPages[makePageKey(notebookId, oldTotalPages)];

  const prevLast = store.lastPageByBook[notebookId];
  const nextLastPage = { ...store.lastPageByBook };
  if (typeof prevLast === 'number') {
    if (deletedPageNumber < prevLast) {
      nextLastPage[notebookId] = Math.max(1, prevLast - 1);
    } else {
      nextLastPage[notebookId] = Math.max(1, Math.min(prevLast, newTotalPages));
    }
  }

  const nextBlankCounts = { ...(store.blankPageCountByBook ?? {}) };
  if (isBuiltInBlank) {
    nextBlankCounts[notebookId] = newTotalPages;
  }

  const nextStore: NotebookStore = {
    ...store,
    pages: nextPages,
    lastPageByBook: nextLastPage,
    blankPageCountByBook: nextBlankCounts,
  };
  saveNotebookStore(nextStore);
  return nextStore;
}

export function reorderNotebookPageAnnotations(
  store: NotebookStore,
  notebookId: string,
  fromPage: number,
  toPage: number,
  totalPages: number
): NotebookStore {
  if (
    fromPage === toPage ||
    fromPage < 1 ||
    toPage < 1 ||
    fromPage > totalPages ||
    toPage > totalPages
  ) {
    return store;
  }

  // Build permutation: order[newIndex] = oldPageNumber
  const order = Array.from({ length: totalPages }, (_, idx) => idx + 1);
  const [moved] = order.splice(fromPage - 1, 1);
  order.splice(toPage - 1, 0, moved);

  // Snapshot old entries before writing
  const snapshotByOldPage = new Map<number, PageAnnotations | undefined>();
  for (let p = 1; p <= totalPages; p++) {
    snapshotByOldPage.set(p, store.pages[makePageKey(notebookId, p)]);
  }

  const nextPages = { ...store.pages };
  const newPageByOldPage = new Map<number, number>();
  for (let newIdx = 0; newIdx < order.length; newIdx++) {
    const newPage = newIdx + 1;
    const oldPage = order[newIdx];
    newPageByOldPage.set(oldPage, newPage);
    const ann = snapshotByOldPage.get(oldPage);
    const destKey = makePageKey(notebookId, newPage);
    if (ann) {
      nextPages[destKey] = ann;
    } else {
      delete nextPages[destKey];
    }
  }

  const prevLast = store.lastPageByBook[notebookId];
  const nextLastPage = { ...store.lastPageByBook };
  if (typeof prevLast === 'number') {
    nextLastPage[notebookId] = newPageByOldPage.get(prevLast) ?? prevLast;
  }

  const nextStore: NotebookStore = {
    ...store,
    pages: nextPages,
    lastPageByBook: nextLastPage,
  };
  saveNotebookStore(nextStore);
  return nextStore;
}

export interface NotebookNoteSearchHit {
  notebookId: string;
  pageNumber: number;
  kind: 'sticky' | 'text' | 'header';
  id: string;
  text: string;
}

export function searchNotebookNotes(
  store: NotebookStore,
  notebookId: string,
  totalPages: number,
  query: string
): NotebookNoteSearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: NotebookNoteSearchHit[] = [];

  for (let p = 1; p <= totalPages; p++) {
    const page = store.pages[makePageKey(notebookId, p)];
    if (!page) continue;

    const headerTopic = (page.headerTopic || '').trim();
    const headerDate = (page.headerDate || '').trim();
    if (headerTopic || headerDate) {
      const combined = [headerTopic, headerDate].filter(Boolean).join(' · ');
      if (combined.toLowerCase().includes(q)) {
        hits.push({
          notebookId,
          pageNumber: p,
          kind: 'header',
          id: `hdr-${p}`,
          text: combined,
        });
      }
    }

    for (const sticky of page.stickyNotes || []) {
      const txt = (sticky.text || '').trim();
      if (txt && txt.toLowerCase().includes(q)) {
        hits.push({
          notebookId,
          pageNumber: p,
          kind: 'sticky',
          id: sticky.id,
          text: txt,
        });
      }
    }

    for (const box of page.textBoxes || []) {
      const txt = (box.text || '').replace(/\u200B/g, '').trim();
      if (txt && txt.toLowerCase().includes(q)) {
        hits.push({
          notebookId,
          pageNumber: p,
          kind: 'text',
          id: box.id,
          text: txt,
        });
      }
    }
  }

  return hits;
}
