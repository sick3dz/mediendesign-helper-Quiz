export type NotebookSourceType = 'foto-skript' | 'pdf-dokument';

export type NotebookTool =
  | 'hand'
  | 'highlighter'
  | 'pen'
  | 'eraser'
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
  totalPages: number;
}
