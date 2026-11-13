import React from 'react';
import {
  Laptop,
  Monitor,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Maximize2,
  MousePointerClick,
  ZoomIn,
  Eye,
} from 'lucide-react';
import {
  ContentWidthMode,
  DefaultNotebookZoom,
  getDefaultMacSettings,
  getMacRecommendedPreset,
  isMacDesktopPlatform,
  NotebookPinchMode,
  RetinaMode,
  UiScalePct,
  useMacDisplaySettings,
} from '../services/macDisplaySettingsService';

interface Props {
  inReader?: boolean;
  onApplyDefaultZoomNow?: (zoom: DefaultNotebookZoom) => void;
}

const UI_SCALE_OPTIONS: { value: UiScalePct; label: string }[] = [
  { value: 90, label: '90%' },
  { value: 95, label: '95%' },
  { value: 100, label: '100%' },
  { value: 105, label: '105%' },
  { value: 110, label: '110%' },
  { value: 115, label: '115%' },
];

const WIDTH_OPTIONS: { value: ContentWidthMode; label: string; hint: string }[] = [
  { value: 'standard', label: 'Standard', hint: '1152 px · Kompakt' },
  { value: 'wide', label: 'MacBook Breit', hint: '1280 px · Ideal 14"/16"' },
  { value: 'full', label: 'Vollbreite', hint: '1680 px · Großer Monitor' },
];

const RETINA_OPTIONS: { value: RetinaMode; label: string; hint: string }[] = [
  { value: 'auto', label: 'Standard (2×)', hint: 'Schnell & sparsam' },
  { value: 'ultra', label: 'Retina Ultra (3×)', hint: 'Maximale Schärfe für PDF & Schrift' },
];

const ZOOM_OPTIONS: DefaultNotebookZoom[] = [0.9, 1, 1.1, 1.25];

const PINCH_MODE_OPTIONS: { value: NotebookPinchMode; label: string; desc: string }[] = [
  {
    value: 'zoom',
    label: 'Zwei Finger (Sanft)',
    desc: 'Trackpad-Pinch zoomt direkt im Heft ohne die Browser-Oberfläche zu vergrößern.',
  },
  {
    value: 'cmd-only',
    label: 'Nur mit ⌘ + Scroll',
    desc: 'Verhindert versehentliches Pinch-Zoomen – Zoom nur bei gedrückter ⌘-Taste.',
  },
  {
    value: 'block',
    label: 'Deaktiviert (Nur Buttons)',
    desc: 'Trackpad-Zoom komplett gesperrt – Zoom nur über +/- Buttons oder Kurzbefehle.',
  },
];

export const MacDisplaySettingsPanel: React.FC<Props> = ({
  inReader = false,
  onApplyDefaultZoomNow,
}) => {
  const [settings, updateSettings] = useMacDisplaySettings();
  const isMac = isMacDesktopPlatform();
  const deviceDpr =
    typeof window !== 'undefined' ? Math.round((window.devicePixelRatio || 1) * 10) / 10 : 1;

  const handleApplyPreset = () => {
    const preset = getMacRecommendedPreset();
    updateSettings(preset);
    onApplyDefaultZoomNow?.(preset.defaultNotebookZoom);
  };

  const handleReset = () => {
    const defaults = getDefaultMacSettings();
    updateSettings(defaults);
    onApplyDefaultZoomNow?.(defaults.defaultNotebookZoom);
  };

  return (
    <div className="space-y-4">
      {/* Platform Overview + Quick Preset Bar */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/90 to-sky-50/70 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/60 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200/80 dark:border-indigo-700/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Laptop className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {isMac ? 'macOS / MacBook erkannt' : 'Desktop & Trackpad Profil'}
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/80 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-700/60 tabular-nums">
                  {deviceDpr}× Display
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                Passe Auflösung, Seitenbreite, Retina-Rendering und Trackpad-Schutz exakt an dein Display an.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleApplyPreset}
            className="flex-1 min-w-[170px] py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>MacBook-Profil anwenden</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span>Standard</span>
          </button>
        </div>
      </div>

      {/* Section 1: Resolution, UI Scaling & Retina Rendering */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          <Monitor className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Auflösung &amp; Darstellung</span>
        </div>

        {/* UI Scaling */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Oberflächen-Skalierung</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {settings.uiScalePct}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Skaliert Schriften und Bedienelemente ohne die Stift-Koordinaten auf der Zeichenfläche zu verschieben.
          </p>
          <div className="grid grid-cols-6 gap-1 pt-1">
            {UI_SCALE_OPTIONS.map((opt) => {
              const active = settings.uiScalePct === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateSettings({ uiScalePct: opt.value })}
                  aria-pressed={active}
                  className={`py-1.5 px-1 rounded-lg text-[11px] font-bold tabular-nums transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace / Container Width */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Arbeitsbereich-Breite</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
            {WIDTH_OPTIONS.map((opt) => {
              const active = settings.contentWidth === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateSettings({ contentWidth: opt.value })}
                  aria-pressed={active}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{opt.label}</div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {opt.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Retina Rendering + Default Notebook Zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/70 dark:border-slate-800">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
              Retina-Schärfe (PDF &amp; Papier)
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {RETINA_OPTIONS.map((opt) => {
                const active = settings.retinaMode === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateSettings({ retinaMode: opt.value })}
                    aria-pressed={active}
                    className={`px-2.5 py-2 rounded-xl border text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{opt.label}</div>
                    <div
                      className={`text-[10px] leading-tight mt-0.5 ${
                        active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {opt.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
              <span>Standard-Zoom im Heft</span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
              Start-Zoom beim Öffnen neuer Hefte{inReader ? ' (direkt anwendbar)' : ''}.
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              {ZOOM_OPTIONS.map((z) => {
                const active = settings.defaultNotebookZoom === z;
                return (
                  <button
                    key={z}
                    type="button"
                    onClick={() => {
                      updateSettings({ defaultNotebookZoom: z });
                      onApplyDefaultZoomNow?.(z);
                    }}
                    aria-pressed={active}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold tabular-nums transition-colors cursor-pointer ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {Math.round(z * 100)}%
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Trackpad Safety & Gesture Guards */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Trackpad-Sicherheit &amp; Gesten</span>
        </div>

        {/* Guard Toggle 1: Prevent Swipe-Back */}
        <label className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer">
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              Zurück-Wischen blockieren (Swipe-Back-Schutz)
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
              Verhindert, dass horizontale Trackpad-Wischgesten in Safari oder Chrome versehentlich die Seite verlassen.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.preventSwipeBack}
            onChange={(e) => updateSettings({ preventSwipeBack: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded accent-indigo-600 cursor-pointer shrink-0"
          />
        </label>

        {/* Guard Toggle 2: App Pinch Zoom Protection */}
        <label className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer">
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              Pinch-Zoom-Schutz für die App-Oberfläche
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
              Schützt Menüs, Quizze und Toolbars davor, durch versehentliches Zwei-Finger-Zoomen verschoben zu werden.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.preventAppPinchZoom}
            onChange={(e) => updateSettings({ preventAppPinchZoom: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded accent-indigo-600 cursor-pointer shrink-0"
          />
        </label>

        {/* Guard Toggle 3: Canvas Context Menu Shield */}
        <label className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer">
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Rechtsklick-Schutz auf Zeichenfläche</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
              Unterdrückt das Browser-Kontextmenü bei versehentlichem Zwei-Finger-Tipp während du im Heft zeichnest oder schreibst.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.blockCanvasContextMenu}
            onChange={(e) => updateSettings({ blockCanvasContextMenu: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded accent-indigo-600 cursor-pointer shrink-0"
          />
        </label>

        {/* Guard 4: Notebook Pinch Behavior */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
            Trackpad-Zoom im PDF- / Notizheft
          </span>
          <div className="space-y-1.5">
            {PINCH_MODE_OPTIONS.map((opt) => {
              const active = settings.notebookPinchMode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateSettings({ notebookPinchMode: opt.value })}
                  aria-pressed={active}
                  className={`w-full p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">{opt.label}</div>
                  <div
                    className={`text-[10px] leading-snug mt-0.5 ${
                      active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
