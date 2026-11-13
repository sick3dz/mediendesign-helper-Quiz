export type NotebookSourceType = 'foto-skript' | 'pdf-dokument' | 'eigenes-heft';

export type BlankPageTemplate = 'blank' | 'lined' | 'grid' | 'dotted';

export type NotebookTool =
  | 'hand'
  | 'highlighter'
  | 'pen'
  | 'eraser'
  | 'text'
  | 'sticky'
  | 'sticker';

export type StickyColor = 'yellow' | 'pink' | 'mint' | 'blue';

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

export interface NotebookTextBox {
  id: string;
  x: number; // 0..100 (% of page width)
  y: number; // 0..100 (% of page height)
  color: string;
  fontSize: number; // % of page width (e.g., 1.5, 2.0, 2.8)
  text: string;
  hasBackground?: boolean;
  createdAt: number;
}

export interface NotebookSticker {
  id: string;
  type: NotebookStickerType;
  x: number; // 0..100 (% of page width)
  y: number; // 0..100 (% of page height)
}

export interface PageAnnotations {
  strokes: NotebookStroke[];
  stickyNotes: NotebookStickyNote[];
  stickers: NotebookSticker[];
  textBoxes?: NotebookTextBox[];
  rotationOverride?: number; // 0 | 90 | 180 | 270
}

export interface NotebookStore {
  version: number;
  pages: Record<string, PageAnnotations>; // key: `${notebookId}::${pageNumber}`
  lastPageByBook: Record<string, number>; // key: notebookId -> 1-based page number
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
