import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FREETEXT_QUESTIONS,
  FREETEXT_TOPIC_FILTERS,
  FreetextQuestion,
  FreetextSubTask,
} from '../data/freetextQuestions';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen,
  Check,
  HelpCircle,
  Send,
  LayoutGrid,
  Bookmark,
  Layers,
  ArrowDown,
  ArrowUp,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Printer,
  BarChart3,
  Target,
  TrendingUp,
  ThumbsUp,
  CheckCheck,
} from 'lucide-react';

interface Props {
  onScoreEarned: (score: number) => void;
  onBack?: () => void;
}

interface SubTaskEvaluation {
  id: string;
  label: string;
  pointsEarned: number;
  maxPoints: number;
  matchedGroupsCount: number;
  totalGroupsCount: number;
  matchedKeywords: string[];
}

interface QuestionEvaluation {
  userAnswer: string;
  score: number;
  maxPoints: number;
  percentage: number;
  isEvaluated: boolean;
  subTaskResults: SubTaskEvaluation[];
  feedbackText: string;
}

interface ProgressMap {
  [questionId: string]: QuestionEvaluation;
}

// Diagram 1: Histogram Comparison for Aufgabe 4
const HistogramComparisonDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
      {/* Abb 1: 8 Bit with Comb Effect */}
      <div className="space-y-1.5 text-center">
        <div className="relative h-36 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden p-2 flex items-end">
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <line x1="0" y1="99" x2="200" y2="99" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
            <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
            
            {/* Spikes with comb gaps (Kamm-Effekt) */}
            <g className="fill-slate-800 dark:fill-slate-200">
              <rect x="15" y="85" width="2" height="15" />
              <rect x="20" y="80" width="1.5" height="20" />
              <rect x="25" y="75" width="2" height="25" />
              <rect x="30" y="70" width="1.5" height="30" />
              <rect x="35" y="78" width="2" height="22" />
              
              <rect x="45" y="88" width="2" height="12" />
              <rect x="52" y="82" width="1.5" height="18" />
              <rect x="58" y="76" width="2" height="24" />
              <rect x="65" y="70" width="1.5" height="30" />
              
              <rect x="80" y="60" width="2" height="40" />
              <rect x="86" y="52" width="2" height="48" />
              <rect x="92" y="45" width="1.5" height="55" />
              <rect x="98" y="38" width="2" height="62" />
              <rect x="105" y="35" width="2" height="65" />
              <rect x="112" y="42" width="1.5" height="58" />
              <rect x="118" y="55" width="2" height="45" />
              <rect x="125" y="68" width="1.5" height="32" />

              <rect x="140" y="65" width="2" height="35" />
              <rect x="146" y="50" width="1.5" height="50" />
              <rect x="152" y="40" width="2" height="60" />
              <rect x="158" y="48" width="1.5" height="52" />
              <rect x="165" y="62" width="2" height="38" />
              <rect x="175" y="75" width="2" height="25" />
              <rect x="185" y="88" width="1.5" height="12" />
            </g>
          </svg>
        </div>
        <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
          Abb. 1: Histogramm bei 8 Bit/Kanal (Kamm-Effekt / Tonwertabrisse)
        </div>
      </div>

      {/* Abb 2: 16 Bit Smooth */}
      <div className="space-y-1.5 text-center">
        <div className="relative h-36 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden p-2 flex items-end">
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <line x1="0" y1="99" x2="200" y2="99" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
            <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
            
            {/* Smooth continuous curve */}
            <path
              d="M 10,99 Q 40,95 70,80 T 110,20 T 130,55 T 160,88 T 190,99 Z"
              className="fill-slate-800 dark:fill-slate-200"
            />
          </svg>
        </div>
        <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
          Abb. 2: Histogramm bei 16 Bit/Kanal (glatte, geschlossene Tonwertkurve)
        </div>
      </div>
    </div>
  );
};

// Diagram 2: Vector vs Pixel Comparison for Aufgabe 5
const VectorPixelComparisonDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
      {/* Vektor SVG */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center shadow-xs">
          <Check className="w-12 h-12 text-white stroke-[3.5]" />
        </div>
        <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
          Vektorbasierte SVG-Datei
        </div>
        <span className="text-[11px] text-slate-500">
          Mathematische Pfade: stufenlos randscharf skalierbar
        </span>
      </div>

      {/* Pixel PNG */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 text-center overflow-hidden">
        <div className="relative w-20 h-20 rounded-full bg-rose-600/90 flex items-center justify-center overflow-hidden [image-rendering:pixelated]">
          {/* Stepped pixelated checkmark */}
          <svg className="w-14 h-14" viewBox="0 0 16 16" shapeRendering="crispEdges">
            <rect x="2" y="7" width="2" height="2" fill="#fff" opacity="0.8" />
            <rect x="4" y="9" width="2" height="2" fill="#fff" />
            <rect x="6" y="11" width="2" height="2" fill="#fff" />
            <rect x="8" y="9" width="2" height="2" fill="#fff" />
            <rect x="10" y="7" width="2" height="2" fill="#fff" />
            <rect x="12" y="5" width="2" height="2" fill="#fff" />
            <rect x="14" y="3" width="2" height="2" fill="#fff" opacity="0.8" />
          </svg>
          <div className="absolute inset-0 border-2 border-dashed border-rose-300/40 rounded-full" />
        </div>
        <div className="text-xs font-black text-rose-600 dark:text-rose-400">
          PNG-Datei (500 × 300 px Zoom)
        </div>
        <span className="text-[11px] text-slate-500">
          Stark sichtbares Pixelraster & Treppeneffekte (Aliasing)
        </span>
      </div>
    </div>
  );
};

// Diagram 3: CMYK Paper Comparison for Aufgabe 7
const CmykPaperComparisonDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
      {/* ISO Coated v2 */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
            ISO Coated v2 (300% TAC)
          </span>
          <span className="text-[10px] font-bold text-slate-400">Bilderdruck</span>
        </div>

        {/* Visual Swatch: Sharp offset raster */}
        <div className="h-28 bg-white border border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
          <div className="flex items-center gap-4">
            {/* CMYK overlapping dots crisp */}
            <div className="relative w-16 h-16 shrink-0">
              <div className="absolute top-1 left-2 w-8 h-8 rounded-full bg-cyan-500 mix-blend-multiply opacity-90 ring-1 ring-cyan-600" />
              <div className="absolute top-1 right-2 w-8 h-8 rounded-full bg-pink-500 mix-blend-multiply opacity-90 ring-1 ring-pink-600" />
              <div className="absolute bottom-1 left-4 w-8 h-8 rounded-full bg-yellow-400 mix-blend-multiply opacity-90 ring-1 ring-yellow-500" />
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium space-y-0.5">
              <div className="font-bold text-slate-800 dark:text-slate-100">Glatte Oberfläche</div>
              <div>• Zuwachs: nur ~14%</div>
              <div>• Max. TAC: 300%</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">Randscharfe Rasterpunkte</div>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
          Gestrichenes Papier saugt wenig Farbe auf. Hoher Kontrast & tiefe, feine Schatten ohne Verläufe-Abrisse.
        </div>
      </div>

      {/* ISOnewspaper / Zeitungspapier */}
      <div className="p-4 bg-[#f8f3ea] dark:bg-stone-900 rounded-xl border border-amber-300/80 dark:border-stone-700 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-mono">
            ISOnewspaper (max. 240% TAC)
          </span>
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400">Zeitungspapier</span>
        </div>

        {/* Visual Swatch: Bleeding swollen dots on yellow-gray paper */}
        <div className="h-28 bg-[#ede4d4] dark:bg-stone-800 border border-amber-300/80 dark:border-stone-700 rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
          <div className="flex items-center gap-4">
            {/* Blurry bleeding dots */}
            <div className="relative w-16 h-16 shrink-0">
              <div className="absolute top-0 left-1 w-10 h-10 rounded-full bg-cyan-600 mix-blend-multiply opacity-80 blur-[2px]" />
              <div className="absolute top-0 right-1 w-10 h-10 rounded-full bg-pink-700 mix-blend-multiply opacity-80 blur-[2px]" />
              <div className="absolute bottom-0 left-3 w-10 h-10 rounded-full bg-amber-500 mix-blend-multiply opacity-80 blur-[2px]" />
            </div>
            <div className="text-[10px] text-stone-800 dark:text-stone-200 font-medium space-y-0.5">
              <div className="font-bold text-stone-900 dark:text-stone-100">Porös & saugfähig</div>
              <div>• Zuwachs: extrem (26–30%)</div>
              <div>• Max. TAC: nur 240%</div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">Punktverbreiterung / Farbbluten</div>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-stone-700 dark:text-stone-400 leading-tight">
          Ungestrichen & gelb-grau. Bei &gt;240% TAC droht Abschmieren, Durchfeuchten und Papierbahnbrüche im Coldset.
        </div>
      </div>
    </div>
  );
};

// Diagram 4: Media-Neutral Workflow for Aufgabe 8
const MediaNeutralWorkflowDiagram: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
      {/* Central Single Source Box */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base">
            🗄️
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Single Source of Truth</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                PIM / CMS / XML
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Reine Semantik: Artikel-ID, Roh-Beschreibung, Maße, Preise & hochauflösende RGB-Master
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md shrink-0">
          Einmal zentral pflegen
        </span>
      </div>

      {/* Distribution Arrow Indicator */}
      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>Automatische medienneutrale Aufbereitung</span>
        <ArrowDown className="w-3.5 h-3.5 text-indigo-500" />
      </div>

      {/* 3 Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Channel 1: Print-Katalog */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white">📖 Print-Katalog</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 font-mono">Print</span>
          </div>
          <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
            <li>• InDesign-Seitenraster & Typo</li>
            <li>• <strong>CMYK (ISO Coated v2)</strong></li>
            <li>• <strong>300 DPI</strong> Druckauflösung</li>
            <li>• Feste Seitenzahlen & Anschnitt</li>
          </ul>
        </div>

        {/* Channel 2: Website */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white">🌐 Onlineshop & Web</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono">Web</span>
          </div>
          <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
            <li>• Semantisches HTML & CSS</li>
            <li>• <strong>RGB (sRGB / WebP)</strong></li>
            <li>• Responsive (Desktop & Mobile)</li>
            <li>• Interaktiver Warenkorb-Button</li>
          </ul>
        </div>

        {/* Channel 3: E-Mail Newsletter */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white">✉️ Digitaler Newsletter</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono">Mail</span>
          </div>
          <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
            <li>• Kompakte Teaser-Texte</li>
            <li>• Web-optimierte Bannerbilder</li>
            <li>• Inline-CSS für Mail-Clients</li>
            <li>• Tracking-Links & Angebote</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Diagram 5: Interactive DPI & Print Width Calculator for Aufgabe 9
const DpiCalculatorDiagram: React.FC = () => {
  const [printWidthCm, setPrintWidthCm] = useState<number>(18);
  const pixelWidth = 1800;
  const pixelHeight = 1200;

  const widthInches = printWidthCm / 2.54;
  const effectivePpi = Math.round(pixelWidth / widthInches);
  const heightCm = (printWidthCm * (pixelHeight / pixelWidth)).toFixed(1);

  const isAtLeast300 = effectivePpi >= 300;
  const isMarginal = effectivePpi >= 250 && effectivePpi < 300;

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Interaktiver IHK DPI-Simulator & Formel-Rechner
          </span>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Ausgangsbild: 1800 × 1200 Pixel (Seitenverhältnis 3:2)
          </h4>
        </div>

        {/* Preset Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPrintWidthCm(18)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border ${
              printWidthCm === 18
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Aufgabe: 18 cm
          </button>
          <button
            type="button"
            onClick={() => setPrintWidthCm(15.24)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border ${
              printWidthCm === 15.24
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            Max. 300 ppi: 15,24 cm
          </button>
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600 dark:text-slate-300">
            Geplante Druckbreite: <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{printWidthCm} cm</strong> ({heightCm} cm Höhe)
          </span>
          <span className="font-mono text-slate-500 text-[11px]">{widthInches.toFixed(2)} Zoll</span>
        </div>
        <input
          type="range"
          min="10"
          max="28"
          step="0.1"
          value={printWidthCm}
          onChange={e => setPrintWidthCm(parseFloat(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>10 cm (sehr scharf)</span>
          <span>15,24 cm (exakt 300 ppi)</span>
          <span>18 cm (Prüfungsaufgabe)</span>
          <span>28 cm (groß/unscharf)</span>
        </div>
      </div>

      {/* Live Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Breite in Zoll</span>
          <div className="text-base font-black font-mono text-slate-900 dark:text-white">
            {widthInches.toFixed(3)}"
          </div>
          <span className="text-[10px] text-slate-500 font-mono">{printWidthCm} cm / 2,54</span>
        </div>

        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Effektive Auflösung</span>
          <div className={`text-base font-black font-mono ${
            isAtLeast300
              ? 'text-emerald-600 dark:text-emerald-400'
              : isMarginal
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}>
            {effectivePpi} ppi
          </div>
          <span className="text-[10px] text-slate-500 font-mono">1800 px / {widthInches.toFixed(2)}"</span>
        </div>

        <div className={`p-3 rounded-xl border flex flex-col justify-between ${
          isAtLeast300
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : isMarginal
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }`}>
          <span className="text-[10px] uppercase font-bold block">Qualitätsbeurteilung</span>
          <div className="text-xs font-black">
            {isAtLeast300
              ? '✓ Reicht aus (≥ 300 ppi)'
              : isMarginal
              ? '⚠️ Grenzwertig (254 ppi < 300)'
              : '✗ Zu gering (< 250 ppi)'}
          </div>
          <span className="text-[10px] opacity-80">
            {isAtLeast300 ? 'Optimaler Offsetdruck' : 'Verfehlt geforderte 300 ppi'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Diagram 6: Authentic Photoshop Image Size Dialog for Aufgabe 10
const PhotoshopWebDialog: React.FC = () => {
  const [viewMode, setViewMode] = useState<'original' | 'web'>('original');
  const [photoCropMode, setPhotoCropMode] = useState<'full' | 'closeup'>('full');

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Original Prüfungsabbildung: Adobe Photoshop Dialog „Bildgröße“
          </span>
          <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Foto Erlebnisbauernhof (Original-Fotografie)</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              Echtes IHK-Prüfungsfoto
            </span>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('original')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              viewMode === 'original'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Originalzustand (Druckdatei)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('web')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              viewMode === 'web'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Web-Aufbereitung (Zielzustand)
          </button>
        </div>
      </div>

      {/* Photoshop Window Frame */}
      <div className="bg-[#2b2b2b] text-slate-100 rounded-xl overflow-hidden border border-slate-700 shadow-md font-sans text-xs">
        {/* Titlebar */}
        <div className="bg-[#383838] px-3 py-1.5 flex items-center justify-between border-b border-[#222]">
          <span className="font-bold text-[11px] text-slate-300">Bildgröße</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {viewMode === 'original' ? '4,32 M (war 4,32 M)' : 'ca. 95 K (reduziert um 98%)'}
          </span>
        </div>

        <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left: Authentic Pig Photo from the exam sheet */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="relative w-full h-44 bg-[#181818] rounded-lg overflow-hidden border border-[#444] flex items-center justify-center group shadow-inner">
              <img
                src={photoCropMode === 'full' ? '/assets/aistudio/pig_photo_original.jpg' : '/assets/aistudio/pig_photo_only.jpg'}
                alt="Original Prüfungsfoto Erlebnisbauernhof Schwein"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-1.5 right-1.5 text-[9px] font-mono bg-black/85 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/50">
                {photoCropMode === 'full' ? 'Photoshop Original' : 'Motiv-Ausschnitt'}
              </div>
            </div>

            {/* View Switcher for Image */}
            <div className="flex items-center justify-between text-[11px] px-0.5">
              <span className="text-slate-400 text-[10px]">Ansicht wechseln:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPhotoCropMode('full')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer border ${
                    photoCropMode === 'full'
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-[#333] text-slate-300 border-slate-600 hover:bg-[#444]'
                  }`}
                >
                  Photoshop-Fenster
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoCropMode('closeup')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer border ${
                    photoCropMode === 'closeup'
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-[#333] text-slate-300 border-slate-600 hover:bg-[#444]'
                  }`}
                >
                  Ferkel-Zoom
                </button>
              </div>
            </div>
          </div>

          {/* Right: Technical Properties Table */}
          <div className="space-y-2 text-[11px] flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#3e3e3e]">
                <span className="text-slate-400">Bildmaße:</span>
                <span className="font-mono font-bold text-white">
                  {viewMode === 'original' ? '1300 × 867 Pixel' : '960 × 640 Pixel'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-[#3e3e3e]">
                <span className="text-slate-400">Farbmodus:</span>
                <span className={`font-mono font-bold ${
                  viewMode === 'original' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {viewMode === 'original' ? 'CMYK (Druckprofil)' : 'sRGB (Webstandard)'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-[#3e3e3e]">
                <span className="text-slate-400">Dateiformat:</span>
                <span className={`font-mono font-bold ${
                  viewMode === 'original' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {viewMode === 'original' ? 'TIFF (unkomprimiert)' : 'WebP / AVIF'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-[#3e3e3e]">
                <span className="text-slate-400">Auflösungseintrag:</span>
                <span className="font-mono text-slate-300">
                  {viewMode === 'original' ? '240 ppi (im Web egal)' : '72 / 150 ppi'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span className="text-slate-400">Dateigröße:</span>
                <span className={`font-mono font-extrabold ${
                  viewMode === 'original' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {viewMode === 'original' ? '4,3 MB (zu groß!)' : 'ca. 95 KB (optimal)'}
                </span>
              </div>
            </div>

            <div className="p-2 rounded bg-[#202020] border border-[#383838] text-[10px] text-slate-400 leading-snug">
              💡 <strong>IHK-Kritik für Teil c:</strong> Das echte Foto zeigt eine Makro-Nahaufnahme eines einzelnen Ferkelkopfes im Schlamm – ohne Hofumfeld (Hofladen, Spielplatz, Natur) und ohne ruhigen Negativraum für Text.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Diagram 7: Interactive Gradation Curve Editor for Aufgabe 11 with Authentic Exam Assets
const GradationCurveDiagram: React.FC = () => {
  const [curvePreset, setCurvePreset] = useState<'original' | 'ihk' | 'extreme'>('ihk');
  const [diagramMode, setDiagramMode] = useState<'interactive' | 'original-scan' | 'comparison'>('interactive');

  // Compute live CSS image filters applied to the authentic tunnel photo based on the gradation curve
  const getPhotoFilterStyle = () => {
    switch (curvePreset) {
      case 'original':
        // Linear scan as in the original exam sheet: very dark tunnel shadows
        return {
          filter: 'brightness(1.1) contrast(1.1)',
        };
      case 'ihk':
        // IHK target: Shadows & midtones lifted (+50% brightness in shadows), archway becomes visible
        return {
          filter: 'brightness(1.65) contrast(1.2) saturate(1.1)',
        };
      case 'extreme':
        // Over-correction: extreme shadow lift causing flat contrast and visible noise
        return {
          filter: 'brightness(2.2) contrast(0.65) saturate(1.5)',
        };
      default:
        return {};
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Prüfungsabbildung & Simulator zu Aufgabe 11
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
              Original IHK-Assets (Seite 5)
            </span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Gradationskurven-Korrektur (Tunnel & Fachwerkhäuser)
          </h4>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setCurvePreset('original')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              curvePreset === 'original'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            1. Original (linear 45°)
          </button>
          <button
            type="button"
            onClick={() => setCurvePreset('ihk')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              curvePreset === 'ihk'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            2. IHK-Schattenaufhellung ✓
          </button>
          <button
            type="button"
            onClick={() => setCurvePreset('extreme')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              curvePreset === 'extreme'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            3. Überkorrektur (Rauschen)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: Authentic Tunnel Photo from Exam Sheet with live grading filter */}
        <div className="space-y-1.5 flex flex-col justify-between">
          <div className="relative h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 flex items-center justify-center p-2 group shadow-inner">
            {/* Real Tunnel Photo */}
            <img
              src="/assets/aistudio/tunnel_photo_original.jpg"
              alt="Original Prüfungsfoto Tunnel mit Fachwerkhäusern"
              style={getPhotoFilterStyle()}
              className="w-full h-full object-contain rounded transition-all duration-300"
            />

            {/* Noise simulation layer for extreme preset */}
            {curvePreset === 'extreme' && (
              <div className="absolute inset-0 pointer-events-none bg-stone-900/25 [background-image:radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:4px_4px] opacity-40 mix-blend-overlay" />
            )}

            {/* Status Badge on Photo */}
            <div className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/85 text-amber-300 border border-amber-500/40">
              Original IHK-Foto (Sehr dunkler Tunnel)
            </div>

            <div className="absolute bottom-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/85 text-white border border-white/20">
              {curvePreset === 'original' && 'Tunnel: 90% Tiefen (abgesoffener Tunnelbogen)'}
              {curvePreset === 'ihk' && 'Tunnel: Aufgehellt (Mauerwerk & Fachwerkhäuser klar ✓)'}
              {curvePreset === 'extreme' && 'Tunnel: Tonwertabrisse & sichtbares Farbrauschen!'}
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-600 dark:text-slate-400 px-1 leading-snug">
            {curvePreset === 'original' && 'ℹ️ Das Foto ist im IHK-Original bewusst extrem dunkel im Tunnelbereich (Aufgabenstellung fordert Aufhellung der Schatten).'}
            {curvePreset === 'ihk' && '✨ IHK-Musterlösung: Der Tunnelbereich wird durch die Kurvenanhebung in den Tiefen gut durchgezeichnet, ohne die sonnigen Häuser zu überbelichten.'}
            {curvePreset === 'extreme' && '⚠️ Zu starke Anhebung: Verursacht starkes Bildrauschen in den dunklen Tunnelbereichen und flauen Kontrast.'}
          </div>
        </div>

        {/* Right: Authentic IHK Diagram vs Interactive SVG Solution Curve */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-500">Gradationskurve (PS-Ausgang %):</span>
            
            {/* Switcher: Interactive Curve vs Original IHK Scan Sheet */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDiagramMode('interactive')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer border ${
                  diagramMode === 'interactive'
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                Musterkurve
              </button>
              <button
                type="button"
                onClick={() => setDiagramMode('original-scan')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer border ${
                  diagramMode === 'original-scan'
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                Original-Gitter
              </button>
            </div>
          </div>

          {/* Diagram Display Area */}
          <div className="relative h-40 w-full flex items-center justify-center">
            {diagramMode === 'original-scan' ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <img
                  src="/assets/aistudio/ihk_curve_diagram_original.jpg"
                  alt="Original IHK Kurvendiagramm aus Prüfungsblatt"
                  className="max-h-36 object-contain rounded border border-slate-300 dark:border-slate-700 shadow-sm"
                />
                <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400 mt-1">
                  Original-Raster aus der IHK-Aufgabenstellung (10×10 Einteilung)
                </span>
              </div>
            ) : (
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* 10x10 Grid Lines matching IHK template exactly */}
                {[...Array(11)].map((_, i) => (
                  <g key={i}>
                    <line x1={20 + i * 16} y1={20} x2={20 + i * 16} y2={180} stroke="#cbd5e1" strokeWidth="0.5" className="dark:stroke-slate-800" />
                    <line x1={20} y1={20 + i * 16} x2={180} y2={20 + i * 16} stroke="#cbd5e1" strokeWidth="0.5" className="dark:stroke-slate-800" />
                  </g>
                ))}

                {/* Axis Labels */}
                <text x="18" y="195" fontSize="8" fill="#94a3b8">0</text>
                <text x="56" y="195" fontSize="8" fill="#94a3b8">25</text>
                <text x="96" y="195" fontSize="8" fill="#94a3b8">50</text>
                <text x="136" y="195" fontSize="8" fill="#94a3b8">75</text>
                <text x="172" y="195" fontSize="8" fill="#94a3b8">100</text>
                <text x="5" y="183" fontSize="8" fill="#94a3b8">0</text>
                <text x="5" y="103" fontSize="8" fill="#94a3b8">50</text>
                <text x="2" y="24" fontSize="8" fill="#94a3b8">100</text>

                {/* 45 Degree Dashed Reference Line */}
                <line x1="20" y1="180" x2="180" y2="20" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />

                {/* Dynamic Correction Curve */}
                {curvePreset === 'original' && (
                  <path d="M 20 180 L 180 20" stroke="#6366f1" strokeWidth="2.5" fill="none" />
                )}

                {curvePreset === 'ihk' && (
                  <>
                    {/* Curve lifted in shadows/midtones, then flattening back to highlights */}
                    <path d="M 20 180 Q 60 70, 120 70 T 180 20" stroke="#10b981" strokeWidth="3" fill="none" />
                    {/* Shadow Lift Point (Dreivierteltöne ~75% Eingang nach oben auf ca. 50-55% gehoben) */}
                    <circle cx="60" cy="80" r="4.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                    {/* Highlight Anchor Point (pinned on 45° line ~20-25% Eingang) */}
                    <circle cx="140" cy="60" r="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />
                    <text x="35" y="65" fontSize="8" fill="#10b981" fontWeight="bold">Schatten angehoben</text>
                    <text x="125" y="50" fontSize="8" fill="#6366f1" fontWeight="bold">Lichter fixiert</text>
                  </>
                )}

                {curvePreset === 'extreme' && (
                  <>
                    <path d="M 20 180 Q 40 30, 180 20" stroke="#ef4444" strokeWidth="3" fill="none" />
                    <circle cx="50" cy="50" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                    <text x="60" y="45" fontSize="8" fill="#ef4444" fontWeight="bold">Überriss / Flau</text>
                  </>
                )}
              </svg>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>Dunkel / Schatten (Dreivierteltöne)</span>
            <span>Mitteltöne</span>
            <span>Hell / Lichter (Vierteltöne)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Diagram 8: Interactive DAM Metadata Inspector for Aufgabe 12
const DamMetadataInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'iptc' | 'rights' | 'tech' | 'workflow'>('iptc');

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Prüfungsübersicht & DAM-Inspektor zu Aufgabe 12
          </span>
          <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Asset: Produktfoto_OutdoorRucksack_Master.tif</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Single Source Master
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('iptc')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === 'iptc'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            IPTC & Tags
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rights')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === 'rights'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Rechte & Lizenz
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tech')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            EXIF & Technik
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === 'workflow'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Vorteile DAM
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[140px] text-xs">
        {activeTab === 'iptc' && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">Titel / Objektname</span>
                <strong className="text-slate-800 dark:text-slate-100">Urban Trekker 35L - Moosgrün</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Artikelnummer / SKU</span>
                <strong className="font-mono text-indigo-600 dark:text-indigo-400">SKU-9842-GRN</strong>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Inhaltsbezogene Schlagwörter (Keywords)</span>
              <div className="flex flex-wrap gap-1">
                {['Katalog2026', 'Outdoor', 'Rucksack', 'Wandern', 'GreenDesign', 'Wasserdicht', 'Sommerkampagne'].map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rights' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Urheber / Fotograf:</span>
              <strong className="text-slate-800 dark:text-slate-100">Studio Nordlicht (Fotoagentur GmbH)</strong>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Nutzungsrechte:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Weltweit, Print & Web & Social Media</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Lizenzlaufzeit:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">Gültig bis 31.12.2028 (Ablaufwarnung aktiv)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Freigabestatus:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 font-bold text-emerald-700 dark:text-emerald-300 text-[10px]">
                ✓ Freigegeben für Kampagne 2026
              </span>
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Auflösung</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">6000 × 4000 px</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Farbraum</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">eciRGBv2 (16 Bit)</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Dateiformat</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">TIFF (LZW)</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block">Dateigröße</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">48,2 MB</span>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 space-y-1">
              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 block uppercase">
                ❌ Unstrukturierte Ablage (Desktop/Netzlaufwerk)
              </span>
              <ul className="text-[11px] text-rose-900 dark:text-rose-200 space-y-0.5">
                <li>• Versionschaos (Logo_v2_final_neu.png)</li>
                <li>• Dubletten belegen GB-weise Speicherplatz</li>
                <li>• Gefahr von Urheberrechtsabmahnungen</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block uppercase">
                ✓ Zentrales DAM-System
              </span>
              <ul className="text-[11px] text-emerald-900 dark:text-emerald-200 space-y-0.5">
                <li>• Single Source of Truth (nur 1 gültige Masterdatei)</li>
                <li>• Sekunden-Schnellsuche nach Metadaten/Tags</li>
                <li>• Automatischer Schutz durch Lizenzfristen</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FREETEXT_STORAGE_KEY = 'ihk_freetext_progress_v2';

const getIhkGrade = (pct: number) => {
  if (pct >= 92) return { grade: '1', label: 'Sehr gut (1)', badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' };
  if (pct >= 81) return { grade: '2', label: 'Gut (2)', badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' };
  if (pct >= 67) return { grade: '3', label: 'Befriedigend (3)', badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800' };
  if (pct >= 50) return { grade: '4', label: 'Ausreichend (4)', badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800' };
  if (pct >= 30) return { grade: '5', label: 'Mangelhaft (5)', badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800' };
  return { grade: '6', label: 'Ungenügend (6)', badgeBg: 'bg-rose-200 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border-rose-400' };
};

interface SummaryReportProps {
  progress: ProgressMap;
  onSelectQuestion: (qId: string) => void;
  onClose: () => void;
  onResetProgress: () => void;
}

const FreetextSummaryReport: React.FC<SummaryReportProps> = ({
  progress,
  onSelectQuestion,
  onClose,
  onResetProgress,
}) => {
  const [reportFilter, setReportFilter] = useState<'all' | 'needs-work' | 'mastered' | 'ihk1'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (qId: string) => {
    soundEffects.playClick();
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const evaluatedQuestions = useMemo(() => {
    return FREETEXT_QUESTIONS.filter(q => progress[q.id]?.isEvaluated);
  }, [progress]);

  const totalPointsEarned = evaluatedQuestions.reduce((acc, q) => acc + (progress[q.id]?.score || 0), 0);
  const totalPointsMax = evaluatedQuestions.reduce((acc, q) => acc + q.maxPoints, 0);
  const avgPercentage = totalPointsMax > 0 ? Math.round((totalPointsEarned / totalPointsMax) * 100) : 0;
  const gradeInfo = getIhkGrade(avgPercentage);

  const needsWorkCount = evaluatedQuestions.filter(q => (progress[q.id]?.percentage || 0) < 80).length;
  const masteredCount = evaluatedQuestions.filter(q => (progress[q.id]?.percentage || 0) >= 80).length;
  const ihk1QuestionsEvaluated = evaluatedQuestions.filter(q => q.series === 'ihk-teil-1');
  const ihk1Points = ihk1QuestionsEvaluated.reduce((acc, q) => acc + (progress[q.id]?.score || 0), 0);
  const ihk1Max = ihk1QuestionsEvaluated.reduce((acc, q) => acc + q.maxPoints, 0);

  const filteredList = useMemo(() => {
    return evaluatedQuestions.filter(q => {
      const ev = progress[q.id];
      if (!ev) return false;
      if (reportFilter === 'needs-work') return ev.percentage < 80;
      if (reportFilter === 'mastered') return ev.percentage >= 80;
      if (reportFilter === 'ihk1') return q.series === 'ihk-teil-1';
      return true;
    });
  }, [evaluatedQuestions, reportFilter, progress]);

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 print:max-w-none print:space-y-4">
      {/* Top Navigation & Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs print:hidden">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zu den Aufgaben</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
            title="Drucken oder als PDF abspeichern"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-500" />
            <span>Bericht drucken / PDF</span>
          </button>

          {evaluatedQuestions.length > 0 && (
            <button
              onClick={onResetProgress}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
              title="Alle gespeicherten Ausarbeitungen löschen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Verlauf leeren</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Score & Grade Banner */}
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                IHK Freitext-Prüfungsauswertung
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                Abschlussbericht & Feedback
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <BarChart3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              <span>Gesamt-Zusammenfassung & Optimierungsanalyse</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Detaillierter Prüfungsspiegel: Was du geschrieben hast, welche Fachbegriffe erkannt wurden und an welchen Stellen du nach IHK-Bewertungskriterien noch Punkte herausholen kannst.
            </p>
          </div>

          {/* IHK Grade Badge */}
          {evaluatedQuestions.length > 0 && (
            <div className={`p-4 rounded-2xl border text-center min-w-[140px] shadow-sm ${gradeInfo.badgeBg}`}>
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">
                IHK-Notenäquivalent
              </span>
              <div className="text-3xl font-black mt-0.5">
                Note {gradeInfo.grade}
              </div>
              <span className="text-xs font-extrabold block mt-0.5">
                {gradeInfo.label}
              </span>
            </div>
          )}
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Gesamtpunktzahl</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
              {totalPointsEarned} <span className="text-sm font-normal text-slate-400">/ {totalPointsMax || 0} Pkt</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Erfolgsquote</span>
            <div className={`text-xl sm:text-2xl font-black mt-1 font-mono ${
              avgPercentage >= 80 ? 'text-emerald-600 dark:text-emerald-400' : avgPercentage >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600'
            }`}>
              {avgPercentage}%
            </div>
          </div>

          <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl border border-purple-200/80 dark:border-purple-800/60 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">IHK Prüfung Teil 1</span>
            <div className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-300 mt-1 font-mono">
              {ihk1Points} <span className="text-sm font-normal text-purple-400">/ {ihk1Max || 0} Pkt</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Aufgaben gelöst</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
              {evaluatedQuestions.length} <span className="text-sm font-normal text-slate-400">/ {FREETEXT_QUESTIONS.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Filter Control */}
      {evaluatedQuestions.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 print:hidden scrollbar-none">
          <button
            onClick={() => setReportFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              reportFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Alle bearbeiteten Aufgaben ({evaluatedQuestions.length})
          </button>
          <button
            onClick={() => setReportFilter('needs-work')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              reportFilter === 'needs-work'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Nachbesserungsbedarf (&lt; 80%)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-600 text-white font-mono">
              {needsWorkCount}
            </span>
          </button>
          <button
            onClick={() => setReportFilter('mastered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              reportFilter === 'mastered'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Top gemeistert (≥ 80%)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-700 text-white font-mono">
              {masteredCount}
            </span>
          </button>
          <button
            onClick={() => setReportFilter('ihk1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              reportFilter === 'ihk1'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            IHK Prüfungszettel Teil 1 ({ihk1QuestionsEvaluated.length})
          </button>
        </div>
      )}

      {/* Empty State if No Questions Evaluated */}
      {evaluatedQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Noch keine Freitext-Aufgaben ausgewertet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
              Sobald du eine Aufgabe bearbeitest und einreichst, wird hier dein vollständiger Text mit Stärken, fehlenden Fachbegriffen und Verbesserungstipps aufgeschlüsselt.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Zur ersten Aufgabe
          </button>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 text-xs">
          Keine Aufgaben entsprechen dem gewählten Filter.
        </div>
      ) : (
        /* Detailed List of Task Reviews */
        <div className="space-y-6">
          {filteredList.map(q => {
            const ev = progress[q.id];
            if (!ev) return null;

            const isOriginal = Boolean(q.isOriginalSheet);
            const isFullScore = ev.percentage === 100;
            const isPassing = ev.percentage >= 50;
            const wordCount = ev.userAnswer.trim() ? ev.userAnswer.trim().split(/\s+/).filter(Boolean).length : 0;
            const isSolutionOpen = Boolean(expandedSolutions[q.id]);

            return (
              <div
                key={q.id}
                className={`rounded-3xl p-6 sm:p-7 space-y-5 transition-all shadow-sm ${
                  isOriginal
                    ? 'border-2 border-purple-300 dark:border-purple-700/80 bg-white dark:bg-slate-900'
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                {/* Task Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {isOriginal && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                          IHK Original-Prüfungszettel
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-slate-400">
                        {q.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {q.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs sm:text-sm font-black px-3 py-1 rounded-xl border ${
                        isFullScore
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : isPassing
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      }`}
                    >
                      {ev.score} / {ev.maxPoints} Punkte ({ev.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Section 1: Dein geschriebener Text (Originalzitat) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <span>1. Dein geschriebener Text (Eingereichte Antwort):</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {wordCount} Wörter
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-line shadow-inner">
                    {ev.userAnswer || <span className="italic text-slate-400">Keine Textantwort hinterlegt.</span>}
                  </div>
                </div>

                {/* Section 2 & 3: Gegenüberstellung Stärken vs. Was besser wäre */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    2. Detail-Auswertung & Was besser wäre:
                  </span>

                  <div className="grid grid-cols-1 gap-3">
                    {ev.subTaskResults.map(stResult => {
                      const subTaskDef = q.subTasks.find(s => s.id === stResult.id);
                      const isComplete = stResult.pointsEarned === stResult.maxPoints;

                      // Extract missing keywords
                      const missingKeyConcepts: string[] = [];
                      if (subTaskDef && !isComplete) {
                        subTaskDef.keywordGroups.forEach(group => {
                          const matched = group.some(syn => {
                            const cleanSyn = syn.toLowerCase();
                            return ev.userAnswer.toLowerCase().includes(cleanSyn);
                          });
                          if (!matched && group[0]) {
                            missingKeyConcepts.push(group[0]);
                          }
                        });
                      }

                      return (
                        <div
                          key={stResult.id}
                          className={`p-4 rounded-2xl border text-xs space-y-3 ${
                            isComplete
                              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80'
                              : stResult.pointsEarned > 0
                              ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80'
                              : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                          }`}
                        >
                          {/* Subtask Title & Points */}
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-900 dark:text-white font-semibold">
                              {stResult.label}
                            </span>
                            <span
                              className={`font-mono text-xs px-2 py-0.5 rounded-md ${
                                isComplete
                                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                                  : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
                              }`}
                            >
                              {stResult.pointsEarned} / {stResult.maxPoints} Pkt.
                            </span>
                          </div>

                          {/* Matched Keywords (What was good) */}
                          {stResult.matchedKeywords.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Erkannte Fachbegriffe:</span>
                              </span>
                              {stResult.matchedKeywords.map((kw, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold"
                                >
                                  ✓ {kw}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Concrete Improvement Guidance (How & What could be better) */}
                          {!isComplete ? (
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800/70 space-y-1.5">
                              <div className="flex items-center gap-1 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                <span>Wie & wo du mehr Punkte holst:</span>
                              </div>

                              {missingKeyConcepts.length > 0 && (
                                <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                                  <span>Für volle Punktzahl fehlten noch zentrale IHK-Begriffe: </span>
                                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                                    {missingKeyConcepts.slice(0, 4).join(', ')}
                                  </span>
                                </div>
                              )}

                              {subTaskDef && (
                                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                                  <strong className="text-indigo-600 dark:text-indigo-400">IHK-Musterkriterium: </strong>
                                  <span>{subTaskDef.modelAnswer}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1">
                              <CheckCheck className="w-3.5 h-3.5" />
                              <span>Vollständig erfasst! Alle IHK-Kriterien und Fachtermini für diese Teilaufgabe wurden einwandfrei genannt.</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Collapsible Full Model Answer */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  <button
                    type="button"
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center justify-between w-full text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Offizielle vollständige IHK-Musterlösung ansehen</span>
                    </span>
                    {isSolutionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isSolutionOpen && (
                    <div className="mt-2.5 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line animate-in fade-in duration-200">
                      {q.modelAnswer}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="flex justify-end pt-1 print:hidden">
                  <button
                    onClick={() => onSelectQuestion(q.id)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Diese Aufgabe im Trainer nachbessern</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const FreetextTrainerQuizView: React.FC<Props> = ({ onScoreEarned, onBack }) => {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [showSummaryReport, setShowSummaryReport] = useState<boolean>(false);
  const [reportFilter, setReportFilter] = useState<'all' | 'needs-work' | 'mastered' | 'ihk1'>('all');
  const [tipStage, setTipStage] = useState<number>(0);

  // Initialize progress from localStorage
  const [progress, setProgress] = useState<ProgressMap>(() => {
    try {
      const saved = localStorage.getItem(FREETEXT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FREETEXT_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save freetext progress', e);
    }
  }, [progress]);

  const [currentAnswerInput, setCurrentAnswerInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentQ = useMemo(() => {
    return FREETEXT_QUESTIONS.find(q => q.id === selectedQuestionId);
  }, [selectedQuestionId]);

  const currentEval = selectedQuestionId ? progress[selectedQuestionId] : null;

  // Filtered list of questions based on active filter
  const filteredQuestions = useMemo(() => {
    if (selectedTopicFilter === 'all') return FREETEXT_QUESTIONS;
    if (selectedTopicFilter === 'ihk-teil-1') {
      return FREETEXT_QUESTIONS.filter(q => q.series === 'ihk-teil-1');
    }
    if (selectedTopicFilter === 'wiso-a11y') {
      return FREETEXT_QUESTIONS.filter(q => q.topic === 'wiso' || q.topic === 'a11y');
    }
    return FREETEXT_QUESTIONS.filter(q => q.topic === selectedTopicFilter);
  }, [selectedTopicFilter]);

  // Statistics calculation
  const totalEarnedPoints = Object.values(progress).reduce((acc, p) => acc + (p.score || 0), 0);
  const maxPossiblePoints = FREETEXT_QUESTIONS.reduce((acc, q) => acc + q.maxPoints, 0);
  const evaluatedCount = Object.values(progress).filter(p => p.isEvaluated).length;

  const ihk1Questions = FREETEXT_QUESTIONS.filter(q => q.series === 'ihk-teil-1');
  const ihk1Points = ihk1Questions.reduce((acc, q) => acc + (progress[q.id]?.score || 0), 0);
  const ihk1MaxPoints = ihk1Questions.reduce((acc, q) => acc + q.maxPoints, 0);

  const totalPercentage = evaluatedCount > 0 ? Math.round((totalEarnedPoints / (evaluatedCount * 10)) * 100) : 0;
  const overallGrade = getIhkGrade(totalPercentage);

  const detailTopRef = useRef<HTMLDivElement>(null);
  const answerSectionRef = useRef<HTMLDivElement>(null);

  // Always reset scroll to top whenever changing question or view, so the user starts reading from the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (detailTopRef.current) {
      detailTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [selectedQuestionId, showSummaryReport]);

  // Navigate to question detail and ensure top viewport alignment
  const handleSelectQuestion = (qId: string) => {
    soundEffects.playClick();
    setSelectedQuestionId(qId);
    setShowSummaryReport(false);
    setTipStage(0);
    const existing = progress[qId];
    setCurrentAnswerInput(existing ? existing.userAnswer : '');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleBackToOverview = () => {
    soundEffects.playClick();
    setSelectedQuestionId(null);
    setShowSummaryReport(false);
    setTipStage(0);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleOpenSummaryReport = () => {
    soundEffects.playClick();
    setSelectedQuestionId(null);
    setShowSummaryReport(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Möchtest du wirklich alle bisherigen Freitext-Auswertungen und Antworten zurücksetzen?')) {
      soundEffects.playClick();
      setProgress({});
      try {
        localStorage.removeItem(FREETEXT_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const scrollToAnswer = () => {
    soundEffects.playClick();
    answerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTopInfo = () => {
    soundEffects.playClick();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    detailTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sub-criteria based evaluation
  const handleEvaluateAnswer = () => {
    if (!currentAnswerInput.trim() || !selectedQuestionId || !currentQ || isEvaluating) return;
    soundEffects.playClick();
    setIsEvaluating(true);

    setTimeout(() => {
      const lowerAnswer = currentAnswerInput.toLowerCase().trim();
      const wordCount = lowerAnswer.split(/\s+/).filter(Boolean).length;

      const subResults: SubTaskEvaluation[] = [];
      let totalCalculatedPoints = 0;

      // Evaluate each subtask individually
      if (currentQ.subTasks && currentQ.subTasks.length > 0) {
        currentQ.subTasks.forEach(st => {
          const matchedKeywords: string[] = [];
          let matchedGroupsCount = 0;

          st.keywordGroups.forEach(group => {
            // Check if any synonym in the group matches
            const matchedSynonym = group.find(syn => {
              const cleanSyn = syn.toLowerCase();
              return lowerAnswer.includes(cleanSyn);
            });

            if (matchedSynonym) {
              matchedGroupsCount++;
              matchedKeywords.push(matchedSynonym);
            }
          });

          const groupRatio = st.keywordGroups.length > 0 ? matchedGroupsCount / st.keywordGroups.length : 1;
          
          let earned = 0;
          if (groupRatio >= 0.95 || matchedGroupsCount === st.keywordGroups.length) {
            earned = st.points;
          } else if (groupRatio >= 0.6) {
            earned = Math.max(1, Math.round(st.points * 0.75));
          } else if (groupRatio > 0.25) {
            earned = Math.max(1, Math.round(st.points * 0.5));
          } else {
            if (wordCount >= 20 && matchedKeywords.length > 0) {
              earned = 1;
            } else {
              earned = 0;
            }
          }

          // Special compensation for thorough explanation
          if (wordCount >= 40 && earned < st.points && groupRatio >= 0.5) {
            earned = Math.min(st.points, earned + 1);
          }

          subResults.push({
            id: st.id,
            label: st.label,
            pointsEarned: earned,
            maxPoints: st.points,
            matchedGroupsCount,
            totalGroupsCount: st.keywordGroups.length,
            matchedKeywords,
          });

          totalCalculatedPoints += earned;
        });
      } else {
        totalCalculatedPoints = currentQ.maxPoints;
      }

      if (totalCalculatedPoints > currentQ.maxPoints) {
        totalCalculatedPoints = currentQ.maxPoints;
      }

      const percentage = Math.round((totalCalculatedPoints / currentQ.maxPoints) * 100);

      let feedback = '';
      if (percentage >= 85) {
        feedback = 'Hervorragende IHK-Prüfungsantwort! Du hast alle geforderten Kriterien und Fachbegriffe präzise dargelegt.';
      } else if (percentage >= 50) {
        feedback = 'Solide Leistung! Einige Teilaspekte und Fachbegriffe können noch präziser formuliert werden.';
      } else {
        feedback = 'Teilweise erfasst. Vergleiche deine Ausarbeitung mit den einzelnen IHK-Musterlösungen unten.';
      }

      const evalData: QuestionEvaluation = {
        userAnswer: currentAnswerInput,
        score: totalCalculatedPoints,
        maxPoints: currentQ.maxPoints,
        percentage,
        isEvaluated: true,
        subTaskResults: subResults,
        feedbackText: feedback,
      };

      const updatedProgress = {
        ...progress,
        [selectedQuestionId]: evalData,
      };

      setProgress(updatedProgress);
      setIsEvaluating(false);
      soundEffects.playSuccess();

      if (percentage === 100) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }

      const allSolved = FREETEXT_QUESTIONS.every(q => updatedProgress[q.id]?.isEvaluated);
      if (allSolved) {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        onScoreEarned(50);
      }
    }, 450);
  };

  // SUMMARY REPORT VIEW
  if (showSummaryReport) {
    return (
      <FreetextSummaryReport
        progress={progress}
        onSelectQuestion={handleSelectQuestion}
        onClose={handleBackToOverview}
        onResetProgress={handleResetAllProgress}
      />
    );
  }

  // OVERVIEW DASHBOARD VIEW
  if (selectedQuestionId === null) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
        {onBack && (
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zur Übersicht</span>
            </button>
          </div>
        )}

        {/* Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs transition-colors space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                IHK Prüfungs-Trainer
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                Freitext & Prüfungsfragen
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-500" />
              <span>IHK Freitext-Trainer Übersicht</span>
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Trainiere authentische IHK-Prüfungsfragen mit Erläuterungen und Fachbegriffen.
              Aufgaben aus den Original-Prüfungszetteln sind mit einem <strong>lila Rahmen</strong> hervorgehoben und werden nach IHK-Standard bewertet.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Aufgaben gelöst</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-mono">
                {evaluatedCount} / {FREETEXT_QUESTIONS.length}
              </div>
            </div>

            <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800/60">
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">IHK Prüfung Teil 1</span>
              <div className="text-lg font-black text-purple-700 dark:text-purple-300 mt-0.5 font-mono">
                {ihk1Points} / {ihk1MaxPoints} Pkt
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Gesamtpunkte</span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
                {totalEarnedPoints} / {maxPossiblePoints} Pkt
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Belohnung</span>
              <div className="text-lg font-black text-amber-500 mt-0.5 font-mono flex items-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-500" />
                <span>+50 EXP Bonus</span>
              </div>
            </div>
          </div>

          {/* Action Row for Comprehensive Summary Report */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleOpenSummaryReport}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>
                {evaluatedCount > 0
                  ? `Gesamt-Abschlussbericht & Feedback ansehen (${evaluatedCount} gelöst • ${overallGrade.label})`
                  : 'Ausführlicher Abschlussbericht & Feedback (nach Aufgabenabgabe aktiv)'}
              </span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            {evaluatedCount > 0 && (
              <button
                onClick={handleResetAllProgress}
                className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
                title="Bisherigen Verlauf leeren"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Verlauf zurücksetzen</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Topic Filter Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 scrollbar-none">
          {FREETEXT_TOPIC_FILTERS.map(f => {
            const isActive = selectedTopicFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedTopicFilter(f.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map((q) => {
            const itemEval = progress[q.id];
            const isDone = itemEval?.isEvaluated;
            const isOriginal = Boolean(q.isOriginalSheet);

            return (
              <div
                key={q.id}
                onClick={() => handleSelectQuestion(q.id)}
                className={`rounded-2xl p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between group ${
                  isOriginal
                    ? isDone
                      ? 'border-2 border-purple-400 dark:border-purple-600 bg-purple-50/25 dark:bg-purple-950/20 ring-1 ring-purple-400/20 hover:border-purple-500'
                      : 'border-2 border-purple-300 dark:border-purple-700 bg-purple-50/15 dark:bg-purple-950/15 ring-1 ring-purple-400/20 hover:border-purple-500'
                    : isDone
                    ? 'border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20 hover:border-emerald-500'
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600'
                }`}
              >
                <div>
                  {/* Category and Series Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {isOriginal && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                          IHK Original-Prüfungszettel
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {q.category}
                      </span>
                    </div>

                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{itemEval.score} / {q.maxPoints} Pkt ({itemEval.percentage}%)</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                        {q.maxPoints} Punkte
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {q.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {q.scenario || q.question}
                  </p>

                  {/* Subtask Criteria Badges */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Teilaufgaben & Kriterien:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {q.subTasks.map(st => {
                        const subResult = itemEval?.subTaskResults?.find(r => r.id === st.id);
                        const isSubPassed = subResult ? subResult.pointsEarned === st.points : false;
                        const isSubPartial = subResult ? subResult.pointsEarned > 0 && subResult.pointsEarned < st.points : false;

                        return (
                          <span
                            key={st.id}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                              isSubPassed
                                ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold'
                                : isSubPartial
                                ? 'bg-amber-100/70 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 font-bold'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span>{st.id.toUpperCase()}</span>
                            <span>·</span>
                            <span>{subResult ? `${subResult.pointsEarned}/${st.points}P` : `${st.points}P`}</span>
                            {isSubPassed && <Check className="w-2.5 h-2.5" />}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{isDone ? 'Antwort ansehen / überarbeiten' : 'Aufgabe jetzt bearbeiten'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // DETAIL VIEW FOR ACTIVE TASK
  if (!currentQ) return null;

  const wordCount = currentAnswerInput.trim() ? currentAnswerInput.trim().split(/\s+/).filter(Boolean).length : 0;
  const isOriginal = Boolean(currentQ.isOriginalSheet);

  return (
    <div ref={detailTopRef} id="freetext-task-top" className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200 scroll-mt-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <button
          onClick={handleBackToOverview}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Zurück zur Übersicht</span>
        </button>

        <div className="flex items-center gap-2">
          {evaluatedCount > 0 && (
            <button
              onClick={handleOpenSummaryReport}
              className="flex items-center gap-1.5 text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800/80 transition-colors cursor-pointer"
              title="Zum ausführlichen Abschlussbericht mit allen Aufgaben"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Abschlussbericht</span>
            </button>
          )}

          <button
            onClick={scrollToAnswer}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-2.5 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800/80 transition-colors cursor-pointer"
            title="Direkt zum Eingabefeld nach unten springen"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zum Antwortfeld</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            {isOriginal && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                IHK Original-Zettel
              </span>
            )}
            <span>{currentQ.category}</span>
          </div>
        </div>
      </div>

      {/* Main Task Card */}
      <div
        className={`rounded-3xl p-6 sm:p-8 shadow-lg space-y-6 ${
          isOriginal
            ? 'border-2 border-purple-300 dark:border-purple-700/80 bg-white dark:bg-slate-900 ring-1 ring-purple-400/20'
            : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                IHK-Prüfungsaufgabe (10 Punkte)
              </span>
              {isOriginal && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                  Prüfungszettel Teil 1
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {currentQ.title}
            </h2>
          </div>

          <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-black">
            Max. {currentQ.maxPoints} Punkte
          </span>
        </div>

        {/* Scenario / Situation Block */}
        {currentQ.scenario && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-indigo-500" />
              <span>Ausgangssituation:</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed whitespace-pre-line">
              {currentQ.scenario}
            </p>
          </div>
        )}

        {/* Embedded Visual Diagram if available */}
        {currentQ.diagramType === 'histogram-comparison' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsabbildungen zu Aufgabe 4:
            </span>
            <HistogramComparisonDiagram />
          </div>
        )}

        {currentQ.diagramType === 'vector-pixel-comparison' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsabbildungen zu Aufgabe 5:
            </span>
            <VectorPixelComparisonDiagram />
          </div>
        )}

        {currentQ.diagramType === 'cmyk-paper-comparison' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsabbildung & Farbprofil-Vergleich zu Aufgabe 7:
            </span>
            <CmykPaperComparisonDiagram />
          </div>
        )}

        {currentQ.diagramType === 'media-neutral-workflow' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsübersicht zu Aufgabe 8 (Single Source of Truth Workflow):
            </span>
            <MediaNeutralWorkflowDiagram />
          </div>
        )}

        {currentQ.diagramType === 'dpi-calculator' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interaktive Prüfungsübersicht zu Aufgabe 9:
            </span>
            <DpiCalculatorDiagram />
          </div>
        )}

        {currentQ.diagramType === 'photoshop-web-dialog' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsabbildung zu Aufgabe 10 (Photoshop Bildgröße-Analyse):
            </span>
            <PhotoshopWebDialog />
          </div>
        )}

        {currentQ.diagramType === 'gradation-curve-tool' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsabbildung & Gradationskurven-Simulator zu Aufgabe 11:
            </span>
            <GradationCurveDiagram />
          </div>
        )}

        {currentQ.diagramType === 'dam-metadata-inspector' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prüfungsübersicht & DAM-Metadaten-Inspektor zu Aufgabe 12:
            </span>
            <DamMetadataInspector />
          </div>
        )}

        {/* Subtasks Listing */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Aufgabenstellung & Teilkriterien:
          </span>

          <div className="space-y-2">
            {currentQ.subTasks.map(st => (
              <div
                key={st.id}
                className="p-3.5 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-start justify-between gap-3"
              >
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {st.label}
                </div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                  {st.points} Pkt.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tiered Tip Component */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Denkanstoß & Tipp-Hilfe
                  </span>
                  {tipStage > 0 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                      Stufe {tipStage} von 2 aktiv
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight">
                  {tipStage === 0 && 'Erst selbst versuchen – bei Bedarf stufenweise Denkanstöße anfordern'}
                  {tipStage === 1 && 'Stufe 1 aktiv: Gliederungshilfe & Leitgedanken'}
                  {tipStage === 2 && 'Stufe 2 aktiv: Wesentliche IHK-Schlüsselbegriffe & Fachtermini'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {tipStage === 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setTipStage(1);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Tipp anfordern (Stufe 1)</span>
                </button>
              ) : tipStage === 1 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setTipStage(2);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Weiterer Tipp (Stufe 2)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setTipStage(0);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                    title="Tipps einklappen"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    setTipStage(0);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Tipps ausblenden</span>
                </button>
              )}
            </div>
          </div>

          {/* Expanded Tip Content */}
          {tipStage >= 1 && (
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5 animate-in fade-in duration-200">
              {/* Stage 1: Structure & Guiding Questions */}
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-[10px] font-mono">Stufe 1</span>
                  <span>Strukturierung & Leitgedanken:</span>
                </div>
                <p className="leading-relaxed text-[11px] sm:text-xs">
                  {currentQ.hint}
                </p>
              </div>

              {/* Stage 2: IHK Keywords & Conceptual Impulses */}
              {tipStage >= 2 && (
                <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200/80 dark:border-purple-800/60 text-xs text-purple-950 dark:text-purple-200 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-purple-800 dark:text-purple-300">
                      <span className="px-1.5 py-0.5 rounded bg-purple-200/80 dark:bg-purple-900/60 text-[10px] font-mono">Stufe 2</span>
                      <span>IHK-Fachbegriffe & Denkanstöße:</span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">Zur Selbstkontrolle</span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-purple-900/80 dark:text-purple-200/90">
                    Prüfe vor der Abgabe, ob du diese IHK-Schlüsselbegriffe und didaktischen Konzepte in deiner Formulierung verwendet hast:
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {currentQ.requiredKeywords.slice(0, 8).map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 font-mono text-[11px] font-bold text-purple-700 dark:text-purple-300 shadow-2xs"
                      >
                        💡 {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Answer Textarea */}
        <div ref={answerSectionRef} id="freetext-answer-section" className="space-y-2 pt-2 scroll-mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Deine Ausarbeitung (gegliedert nach a, b, c oder Formaten):</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTopInfo}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                title="Nach oben zur Aufgabenstellung und Ausgangssituation scrollen"
              >
                <ArrowUp className="w-3.5 h-3.5 text-indigo-500" />
                <span>Aufgabenstellung & Info oben</span>
              </button>
              <span className="font-mono text-slate-300 dark:text-slate-700">|</span>
              <span className="font-mono">{wordCount} Wörter</span>
            </div>
          </div>

          <textarea
            value={currentAnswerInput}
            onChange={e => setCurrentAnswerInput(e.target.value)}
            placeholder={`Schreibe hier deine vollständige Antwort...
Tipp zur Strukturierung:
a) ...
b) ...
c) ...`}
            rows={10}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 leading-relaxed font-sans"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleBackToOverview}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Zurück zur Übersicht
          </button>

          <button
            onClick={handleEvaluateAnswer}
            disabled={!currentAnswerInput.trim() || isEvaluating}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isEvaluating ? 'Auswertung nach IHK-Standard läuft...' : currentEval ? 'Neu auswerten' : 'Ausarbeitung einreichen & prüfen'}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Evaluation Results Banner & Detailed Breakdown */}
        {currentEval && (
          <div className="space-y-6 animate-in fade-in duration-300 pt-6 border-t border-slate-100 dark:border-slate-800">
            {/* Total Points Banner */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${
                currentEval.percentage >= 85
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                  : currentEval.percentage >= 50
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block opacity-90">
                  IHK-Gesamtergebnis
                </span>
                <h4 className="text-2xl font-black mt-0.5">
                  {currentEval.score} von {currentEval.maxPoints} Punkten ({currentEval.percentage}%)
                </h4>
                <p className="text-xs mt-1 font-medium max-w-lg">
                  {currentEval.feedbackText}
                </p>
              </div>

              <div className="text-3xl font-black font-mono">
                {currentEval.percentage >= 85 ? '🏆' : currentEval.percentage >= 50 ? '👍' : '📝'}
              </div>
            </div>

            {/* Subtasks Points Breakdown Matrix */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Punkteaufteilung nach Teilaufgaben:
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {currentEval.subTaskResults.map(stResult => {
                  const subTaskDef = currentQ.subTasks.find(s => s.id === stResult.id);
                  const isFull = stResult.pointsEarned === stResult.maxPoints;

                  return (
                    <div
                      key={stResult.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isFull
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                          : stResult.pointsEarned > 0
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-900 dark:text-white font-medium">
                          {stResult.label}
                        </span>
                        <span
                          className={`font-mono text-sm px-2 py-0.5 rounded-md ${
                            isFull
                              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                              : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
                          }`}
                        >
                          {stResult.pointsEarned} / {stResult.maxPoints} Pkt.
                        </span>
                      </div>

                      {/* Matched Concepts */}
                      {stResult.matchedKeywords.length > 0 ? (
                        <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-600 dark:text-slate-300">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Erkannte Fachbegriffe:</span>
                          {stResult.matchedKeywords.map((kw, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                              {kw}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 italic">
                          Keine eindeutigen Fachbegriffe für diesen Teilbereich erkannt.
                        </div>
                      )}

                      {/* Subtask Model Answer snippet */}
                      {subTaskDef && (
                        <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400">
                          <strong className="text-indigo-600 dark:text-indigo-400">IHK-Musterkriterium: </strong>
                          {subTaskDef.modelAnswer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tab Toggle for Complete Solution */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Vollständige offizielle IHK-Musterlösung</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
                {currentQ.modelAnswer}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleBackToOverview}
                className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zur Übersicht</span>
              </button>

              <button
                onClick={handleOpenSummaryReport}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Zum ausführlichen Abschlussbericht & Feedback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
