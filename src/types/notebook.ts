export type NotebookSourceType =
  | 'foto-skript'
  | 'pdf-dokument'
  | 'eigenes-heft'
  | 'blatt-blanko';

export type BlankPageTemplate = 'blank' | 'lined' | 'grid' | 'dotted';

export type BlankPaperColor = 'white' | 'cream' | 'yellow' | 'pink' | 'mint' | 'blue';

export type NotebookTool =
  | 'hand'
  | 'highlighter'
  | 'pen'
  | 'eraser'
  | 'text'
  | 'image'
  | 'sticky'
  | 'sticker';

export type StickyColor = 'yellow' | 'pink' | 'mint' | 'blue' | 'cream' | 'lavender';

export type TextBoxBackgroundStyle = 'white' | 'paper' | 'transparent';

export type NotebookStickerType =
  | 'merksatz'
  | 'wichtig'
  | 'pruefung'
  | 'verstanden'
  | 'frage'
  | 'stern';

export interface StrokePoint {
  x: number; // 0..100 (% of page width)
  y: number; // 0..100 (% of page height)
  p?: number; // 0..1 optional stylus pressure (Apple Pencil)
}

export interface NotebookStroke {
  id: string;
  tool: 'pen' | 'highlighter';
  color: string;
  width: number; // normalized width in % of page width (e.g., 0.35 for pen, 2.2 for highlighter)
  points: StrokePoint[];
}

export interface NotebookStickyNote {
  id: string;
  x: number; // 0..100 (% of page width)
  y: number; // 0..100 (% of page height)
  color: StickyColor;
  text: string;
  isCollapsed: boolean;
  createdAt: number;
}

export interface NotebookTextStyle {
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface NotebookTextRun {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface NotebookTextBox {
  id: string;
  x: number; // 0..100 (% of page width)
  y: number; // 0..100 (% of page height)
  color: string;
  fontSize: number; // % of page width (e.g., 1.5, 2.0, 2.8)
  text: string;
  runs?: NotebookTextRun[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  hasBackground?: boolean;
  backgroundStyle?: TextBoxBackgroundStyle;
  createdAt: number;
}

export interface NotebookImageElement {
  id: string;
  mediaId: string; // Blob stored in IndexedDB STORE_MEDIA
  x: number; // 0..100 (% of page width, center)
  y: number; // 0..100 (% of page height, center)
  widthPct: number; // 10..95 (% of page width)
  aspectRatio: number; // natural width / height
  opacity?: number; // 0.2..1.0 (default 1)
  rotation?: number; // 0 | 90 | 180 | 270
  createdAt: number;
}

export interface NotebookSticker {
  id: string;
  type: NotebookStickerType;
  x: number; // 0..100 (% of page width)
  y: number; // 0..100 (% of page height)
  scale?: number; // 0.5..2.0 (default 1)
  opacity?: number; // 0.2..1.0 (default 1)
}

export interface PageAnnotations {
  strokes: NotebookStroke[];
  stickyNotes: NotebookStickyNote[];
  stickers: NotebookSticker[];
  textBoxes?: NotebookTextBox[];
  images?: NotebookImageElement[];
  rotationOverride?: number; // 0 | 90 | 180 | 270
  templateOverride?: BlankPageTemplate;
  paperColorOverride?: BlankPaperColor;
  showDateHeader?: boolean;
  headerTopic?: string;
  headerDate?: string;
}

export interface NotebookStore {
  version: number;
  pages: Record<string, PageAnnotations>; // key: `${notebookId}::${pageNumber}`
  lastPageByBook: Record<string, number>; // key: notebookId -> 1-based page number
  blankPageCountByBook?: Record<string, number>; // key: built-in blatt-blanko notebookId -> remaining page count
}

export interface NotebookImagePage {
  pageNumber: number;
  title: string;
  imageUrl: string;
  defaultRotation?: 0 | 90 | 180 | 270;
  preferPortrait?: boolean;
}

export type CustomNotebookPage =
  | {
      id: string;
      pageNumber: number;
      kind: 'blank';
      template: BlankPageTemplate;
      paperColor?: BlankPaperColor;
      showDateHeader?: boolean;
      title: string;
      defaultRotation?: 0 | 90 | 180 | 270;
    }
  | {
      id: string;
      pageNumber: number;
      kind: 'image';
      mediaId: string;
      title: string;
      defaultRotation?: 0 | 90 | 180 | 270;
    }
  | {
      id: string;
      pageNumber: number;
      kind: 'pdf-page';
      mediaId: string;
      pdfPageNumber: number;
      title: string;
      defaultRotation?: 0 | 90 | 180 | 270;
    };

export interface NotebookDocument {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  sourceType: NotebookSourceType;
  coverColor: string;
  coverImageUrl?: string;
  coverRotation?: 0 | 90 | 180 | 270;
  // For photo-based scripts: explicit ordered list of pages
  imagePages?: NotebookImagePage[];
  // For genuine PDF files: URL to public PDF asset
  pdfUrl?: string;
  // For user-created hybrid booklets (PDFs, images & blank note pages)
  isCustom?: boolean;
  customPages?: CustomNotebookPage[];
  createdAt?: number;
  updatedAt?: number;
  totalPages: number;
}
