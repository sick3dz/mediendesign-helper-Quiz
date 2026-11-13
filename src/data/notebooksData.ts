import { NotebookDocument, NotebookStickerType, StickyColor } from '../types/notebook';

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/aistudio`;

export const NOTEBOOKS_CATALOG: NotebookDocument[] = [
  {
    id: 'pm-skript-schulze',
    title: 'Projektmanagement & Teamentwicklung',
    subtitle: 'Original-Unterrichtsskript (7 Seiten): DIN 69901-2, Projektmerkmale & Tuckman-Phasen',
    category: 'Projektmanagement',
    sourceType: 'foto-skript',
    coverColor: 'from-indigo-600 to-blue-700',
    coverImageUrl: `${ASSET_BASE}/IMG_3246_0e617e58.jpeg`,
    coverRotation: 0,
    totalPages: 7,
    imagePages: [
      {
        pageNumber: 1,
        title: 'Seite 1: Projektmerkmale & Abgrenzung zur Routine',
        imageUrl: `${ASSET_BASE}/IMG_3240_c605d167.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 2,
        title: 'Seite 2: Teamentwicklung & Phase 1 (Forming)',
        imageUrl: `${ASSET_BASE}/IMG_3241_0185148a.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 3,
        title: 'Seite 3: Phase 2 (Storming) & Phase 3 (Norming)',
        imageUrl: `${ASSET_BASE}/IMG_3242_864954f4.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 4,
        title: 'Seite 4: Phase 4 (Performing) & Phase 5 (Adjourning)',
        imageUrl: `${ASSET_BASE}/IMG_3243_d788289a.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 5,
        title: 'Seite 5: Projektmanagementphasen & Initialisierung',
        imageUrl: `${ASSET_BASE}/IMG_3244_ae0dc54d.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 6,
        title: 'Seite 6: Definition, Planung & Steuerung',
        imageUrl: `${ASSET_BASE}/IMG_3245_25720b92.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 7,
        title: 'Seite 7: Abschluss, Lessons Learned & DIN-Kreislauf',
        imageUrl: `${ASSET_BASE}/IMG_3246_0e617e58.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
    ],
  },
  {
    id: 'ihk-original-teil1-skript',
    title: 'IHK-Prüfungsvorbereitung Teil 1 & Bilddaten',
    subtitle: 'Original-Prüfungsbogen (Foto) inkl. Tunnel-Motiv, Gradationskurve & Ferkel-Beispiel',
    category: 'IHK-Prüfung',
    sourceType: 'foto-skript',
    coverColor: 'from-purple-600 to-indigo-700',
    coverImageUrl: `${ASSET_BASE}/IMG_3228_2e5c6857.jpeg`,
    coverRotation: 0,
    totalPages: 5,
    imagePages: [
      {
        pageNumber: 1,
        title: 'Aufgabenblatt: Bild- & Grafikdaten, Medienneutrale Daten, Prozess',
        imageUrl: `${ASSET_BASE}/IMG_3228_2e5c6857.jpeg`,
        defaultRotation: 0,
        preferPortrait: true,
      },
      {
        pageNumber: 2,
        title: 'Aufgabe 10: Ferkel-Motiv (Vollformat-Vorlage)',
        imageUrl: `${ASSET_BASE}/pig_photo_original.jpg`,
        defaultRotation: 0,
      },
      {
        pageNumber: 3,
        title: 'Aufgabe 10: Ferkel-Motiv (Detailausschnitt)',
        imageUrl: `${ASSET_BASE}/pig_photo_only.jpg`,
        defaultRotation: 0,
      },
      {
        pageNumber: 4,
        title: 'Aufgabe 11: Tunnel-Foto zur Tonwertkorrektur',
        imageUrl: `${ASSET_BASE}/tunnel_photo_original.jpg`,
        defaultRotation: 0,
      },
      {
        pageNumber: 5,
        title: 'Aufgabe 11: Gradationskurven-Diagramm',
        imageUrl: `${ASSET_BASE}/ihk_curve_diagram_original.jpg`,
        defaultRotation: 0,
      },
    ],
  },
  {
    id: 'ihk-themenuebersichten',
    title: 'IHK-Themenübersichten & Lernfelder',
    subtitle: 'Prüfungsrelevante Themen für alle Fachrichtungen & Fachrichtung Designkonzeption',
    category: 'Lehrplan',
    sourceType: 'foto-skript',
    coverColor: 'from-teal-600 to-emerald-700',
    coverImageUrl: `${ASSET_BASE}/ce7bd883-50d5-4973-a100-c3103fdda28a_b4cd4c6d.jpeg`,
    coverRotation: 0,
    totalPages: 2,
    imagePages: [
      {
        pageNumber: 1,
        title: 'Alle Fachrichtungen: U1–U8 (Styleguide bis Sinus-Milieus)',
        imageUrl: `${ASSET_BASE}/ce7bd883-50d5-4973-a100-c3103fdda28a_b4cd4c6d.jpeg`,
        defaultRotation: 0,
      },
      {
        pageNumber: 2,
        title: 'Designkonzeption: U9–U12 (Projektablauf, Wireframes, Prototyp)',
        imageUrl: `${ASSET_BASE}/c5398f39-988a-4373-98b4-908925104e9b_353aec4f.jpeg`,
        defaultRotation: 0,
      },
    ],
  },
  {
    id: 'pdf-medienneutrale-daten',
    title: 'Medienneutrale Datenhaltung',
    subtitle: 'Original-PDF Skript: Single Source of Truth, Farbmanagement & Crossmedia-Workflows',
    category: 'Datenhaltung',
    sourceType: 'pdf-dokument',
    coverColor: 'from-sky-600 to-cyan-700',
    pdfUrl: `${ASSET_BASE}/Medienneutrale_Daten_3a976fb0.pdf`,
    totalPages: 6,
  },
  {
    id: 'pdf-datenbanken',
    title: 'Datenbanken Grundlagen & SQL',
    subtitle: 'Original-PDF Skript: Relationale Modelle, Schlüssel, Normalisierung & Abfragen',
    category: 'Datenbanken',
    sourceType: 'pdf-dokument',
    coverColor: 'from-emerald-600 to-teal-700',
    pdfUrl: `${ASSET_BASE}/Datenbanken_dff17bf2.pdf`,
    totalPages: 8,
  },
  {
    id: 'pdf-json',
    title: 'JSON Datenstruktur-Leitfaden',
    subtitle: 'Original-PDF Skript: Syntax, Datentypen, verschachtelte Objekte & Arrays',
    category: 'Datenformate',
    sourceType: 'pdf-dokument',
    coverColor: 'from-amber-600 to-orange-600',
    pdfUrl: `${ASSET_BASE}/json_bfbad723.pdf`,
    totalPages: 3,
  },
  {
    id: 'pdf-xml',
    title: 'XML Datenstruktur-Leitfaden',
    subtitle: 'Original-PDF Skript: Wohlgeformtheit, Attribute, Namespaces & CDATA',
    category: 'Datenformate',
    sourceType: 'pdf-dokument',
    coverColor: 'from-rose-600 to-pink-700',
    pdfUrl: `${ASSET_BASE}/xml_72d38115.pdf`,
    totalPages: 3,
  },
  {
    id: 'pdf-fragen-antworten',
    title: 'IHK Fragen & Antworten Katalog',
    subtitle: 'Umfangreiches Original-PDF (62 Seiten): Prüfungsfragen & Musterlösungen zum Nachschlagen',
    category: 'IHK-Prüfung',
    sourceType: 'pdf-dokument',
    coverColor: 'from-slate-700 to-slate-900',
    pdfUrl: `${ASSET_BASE}/Fragen_Antworten_5a87d4d6.pdf`,
    totalPages: 62,
  },
  {
    id: 'blatt-blanko-notizblock',
    title: 'Blatt Blanko · Freie Zeichenfläche',
    subtitle: 'Leere weiße DIN-A4-Blätter für freie Skizzen, eingefügte Bilder, Texte & Notizen',
    category: 'Notizblatt',
    sourceType: 'blatt-blanko',
    coverColor: 'from-slate-500 to-slate-700',
    totalPages: 5,
  },
];

export const HIGHLIGHTER_COLORS = [
  { id: 'yellow', label: 'Gelb', color: '#fde047' },
  { id: 'green', label: 'Mintgrün', color: '#86efac' },
  { id: 'pink', label: 'Pink', color: '#f9a8d4' },
  { id: 'cyan', label: 'Hellblau', color: '#67e8f9' },
];

export const PEN_COLORS = [
  { id: 'blue', label: 'Tintenblau', color: '#1d4ed8' },
  { id: 'black', label: 'Tiefschwarz', color: '#0f172a' },
  { id: 'red', label: 'Korrekturrot', color: '#dc2626' },
  { id: 'green', label: 'Grün', color: '#15803d' },
  { id: 'purple', label: 'Violett', color: '#7e22ce' },
];

export const STICKY_NOTE_STYLES: Record<
  StickyColor,
  {
    label: string;
    bg: string;
    border: string;
    headerBg: string;
    pinColor: string;
    textColor: string;
  }
> = {
  yellow: {
    label: 'Gelb',
    bg: 'bg-amber-100',
    border: 'border-amber-300',
    headerBg: 'bg-amber-200/80',
    pinColor: 'bg-amber-500',
    textColor: 'text-amber-950',
  },
  pink: {
    label: 'Rosa',
    bg: 'bg-rose-100',
    border: 'border-rose-300',
    headerBg: 'bg-rose-200/80',
    pinColor: 'bg-rose-500',
    textColor: 'text-rose-950',
  },
  mint: {
    label: 'Mint',
    bg: 'bg-emerald-100',
    border: 'border-emerald-300',
    headerBg: 'bg-emerald-200/80',
    pinColor: 'bg-emerald-500',
    textColor: 'text-emerald-950',
  },
  blue: {
    label: 'Hellblau',
    bg: 'bg-sky-100',
    border: 'border-sky-300',
    headerBg: 'bg-sky-200/80',
    pinColor: 'bg-sky-500',
    textColor: 'text-sky-950',
  },
};

export const NOTEBOOK_STICKERS: {
  type: NotebookStickerType;
  label: string;
  shortLabel: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  symbol: string;
}[] = [
  {
    type: 'merksatz',
    label: 'Merksatz',
    shortLabel: 'MERKSATZ',
    bgClass: 'bg-amber-100',
    borderClass: 'border-amber-400',
    textClass: 'text-amber-900',
    symbol: '📌',
  },
  {
    type: 'wichtig',
    label: 'Wichtig!',
    shortLabel: 'WICHTIG!',
    bgClass: 'bg-rose-100',
    borderClass: 'border-rose-400',
    textClass: 'text-rose-900',
    symbol: '❗',
  },
  {
    type: 'pruefung',
    label: 'IHK-Prüfung',
    shortLabel: 'IHK-TIPP',
    bgClass: 'bg-indigo-100',
    borderClass: 'border-indigo-400',
    textClass: 'text-indigo-900',
    symbol: '🎓',
  },
  {
    type: 'verstanden',
    label: 'Verstanden',
    shortLabel: 'SITZT ✓',
    bgClass: 'bg-emerald-100',
    borderClass: 'border-emerald-400',
    textClass: 'text-emerald-900',
    symbol: '✅',
  },
  {
    type: 'frage',
    label: 'Unklar / Fragen',
    shortLabel: 'NOCH KLÄREN',
    bgClass: 'bg-sky-100',
    borderClass: 'border-sky-400',
    textClass: 'text-sky-900',
    symbol: '❓',
  },
  {
    type: 'stern',
    label: 'Favorit / Stern',
    shortLabel: 'TOP-STELLE',
    bgClass: 'bg-yellow-100',
    borderClass: 'border-yellow-400',
    textClass: 'text-yellow-900',
    symbol: '★',
  },
];

export const BLANK_PAGE_TEMPLATES: {
  id: 'blank' | 'lined' | 'grid' | 'dotted';
  label: string;
  description: string;
}[] = [
  { id: 'blank', label: 'Blanko', description: 'Weißes DIN-A4-Blatt' },
  { id: 'lined', label: 'Liniert', description: 'Mit Randlinie' },
  { id: 'grid', label: 'Kariert', description: '5-mm-Rechenkästchen' },
  { id: 'dotted', label: 'Punktkariert', description: 'Dezentes Punktraster' },
];

export const CUSTOM_COVER_COLORS: {
  id: string;
  label: string;
  gradient: string;
  swatch: string;
}[] = [
  { id: 'indigo', label: 'Indigo', gradient: 'from-indigo-600 to-blue-700', swatch: 'bg-indigo-600' },
  { id: 'emerald', label: 'Smaragd', gradient: 'from-emerald-600 to-teal-700', swatch: 'bg-emerald-600' },
  { id: 'amber', label: 'Bernstein', gradient: 'from-amber-600 to-orange-600', swatch: 'bg-amber-600' },
  { id: 'rose', label: 'Rubin', gradient: 'from-rose-600 to-pink-700', swatch: 'bg-rose-600' },
  { id: 'purple', label: 'Violett', gradient: 'from-purple-600 to-indigo-700', swatch: 'bg-purple-600' },
  { id: 'slate', label: 'Anthrazit', gradient: 'from-slate-700 to-slate-900', swatch: 'bg-slate-700' },
];

export const CUSTOM_NOTEBOOK_CATEGORIES: string[] = [
  'Eigene Mitschriften',
  'IHK-Prüfung',
  'Projektmanagement',
  'Medienproduktion',
  'Datenhaltung',
  'Datenbanken',
  'Datenformate',
  'Farbe & Layout',
];
