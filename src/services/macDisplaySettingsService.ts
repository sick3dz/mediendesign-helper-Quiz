import { useEffect, useState } from 'react';

export type UiScalePct = 90 | 95 | 100 | 105 | 110 | 115;
export type ContentWidthMode = 'standard' | 'wide' | 'full';
export type RetinaMode = 'auto' | 'ultra';
export type DefaultNotebookZoom = 0.9 | 1 | 1.1 | 1.25;
export type NotebookPinchMode = 'zoom' | 'cmd-only' | 'block';

export interface MacDisplaySettings {
  uiScalePct: UiScalePct;
  contentWidth: ContentWidthMode;
  retinaMode: RetinaMode;
  defaultNotebookZoom: DefaultNotebookZoom;
  preventSwipeBack: boolean;
  preventAppPinchZoom: boolean;
  notebookPinchMode: NotebookPinchMode;
  blockCanvasContextMenu: boolean;
}

const STORAGE_KEY = 'mediengestalter_mac_display_v1';

const VALID_SCALES: readonly UiScalePct[] = [90, 95, 100, 105, 110, 115];
const VALID_WIDTHS: readonly ContentWidthMode[] = ['standard', 'wide', 'full'];
const VALID_RETINA: readonly RetinaMode[] = ['auto', 'ultra'];
const VALID_ZOOMS: readonly DefaultNotebookZoom[] = [0.9, 1, 1.1, 1.25];
const VALID_PINCH_MODES: readonly NotebookPinchMode[] = ['zoom', 'cmd-only', 'block'];

export function isMacDesktopPlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const plat = `${nav.userAgentData?.platform || ''} ${navigator.platform || ''} ${navigator.userAgent || ''}`;
  const isTouchIpad = /ipad/i.test(plat) || (/mac/i.test(plat) && (navigator.maxTouchPoints || 0) > 1);
  if (isTouchIpad) return false;
  return /mac/i.test(plat);
}

export function getDefaultMacSettings(): MacDisplaySettings {
  const isMac = isMacDesktopPlatform();
  return {
    uiScalePct: 100,
    contentWidth: 'standard',
    retinaMode: 'auto',
    defaultNotebookZoom: 1,
    preventSwipeBack: isMac,
    preventAppPinchZoom: isMac,
    notebookPinchMode: 'zoom',
    blockCanvasContextMenu: true,
  };
}

export function getMacRecommendedPreset(): MacDisplaySettings {
  return {
    uiScalePct: 100,
    contentWidth: 'wide',
    retinaMode: 'ultra',
    defaultNotebookZoom: 1,
    preventSwipeBack: true,
    preventAppPinchZoom: true,
    notebookPinchMode: 'zoom',
    blockCanvasContextMenu: true,
  };
}

function sanitizeSettings(raw: unknown): MacDisplaySettings {
  const defaults = getDefaultMacSettings();
  if (!raw || typeof raw !== 'object') return defaults;
  const obj = raw as Record<string, unknown>;

  const uiScalePct = VALID_SCALES.includes(obj.uiScalePct as UiScalePct)
    ? (obj.uiScalePct as UiScalePct)
    : defaults.uiScalePct;

  const contentWidth = VALID_WIDTHS.includes(obj.contentWidth as ContentWidthMode)
    ? (obj.contentWidth as ContentWidthMode)
    : defaults.contentWidth;

  const retinaMode = VALID_RETINA.includes(obj.retinaMode as RetinaMode)
    ? (obj.retinaMode as RetinaMode)
    : defaults.retinaMode;

  const defaultNotebookZoom = VALID_ZOOMS.includes(obj.defaultNotebookZoom as DefaultNotebookZoom)
    ? (obj.defaultNotebookZoom as DefaultNotebookZoom)
    : defaults.defaultNotebookZoom;

  const notebookPinchMode = VALID_PINCH_MODES.includes(obj.notebookPinchMode as NotebookPinchMode)
    ? (obj.notebookPinchMode as NotebookPinchMode)
    : defaults.notebookPinchMode;

  return {
    uiScalePct,
    contentWidth,
    retinaMode,
    defaultNotebookZoom,
    preventSwipeBack:
      typeof obj.preventSwipeBack === 'boolean' ? obj.preventSwipeBack : defaults.preventSwipeBack,
    preventAppPinchZoom:
      typeof obj.preventAppPinchZoom === 'boolean'
        ? obj.preventAppPinchZoom
        : defaults.preventAppPinchZoom,
    notebookPinchMode,
    blockCanvasContextMenu:
      typeof obj.blockCanvasContextMenu === 'boolean'
        ? obj.blockCanvasContextMenu
        : defaults.blockCanvasContextMenu,
  };
}

const listeners = new Set<(next: MacDisplaySettings) => void>();

export function loadMacDisplaySettings(): MacDisplaySettings {
  if (typeof window === 'undefined') return getDefaultMacSettings();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultMacSettings();
    return sanitizeSettings(JSON.parse(raw));
  } catch {
    return getDefaultMacSettings();
  }
}

export function applyMacDisplayEffectsToDom(settings: MacDisplaySettings): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (settings.uiScalePct === 100) {
    root.style.fontSize = '';
  } else {
    root.style.fontSize = `${((settings.uiScalePct / 100) * 16).toFixed(2)}px`;
  }

  const overscroll = settings.preventSwipeBack ? 'none' : '';
  root.style.overscrollBehaviorX = overscroll;
  if (body) {
    body.style.overscrollBehaviorX = overscroll;
  }
}

export function saveMacDisplaySettings(next: MacDisplaySettings): MacDisplaySettings {
  const clean = sanitizeSettings(next);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      // ignore storage quota errors
    }
  }
  applyMacDisplayEffectsToDom(clean);
  listeners.forEach((cb) => cb(clean));
  return clean;
}

export function subscribeMacDisplaySettings(cb: (next: MacDisplaySettings) => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useMacDisplaySettings(): [
  MacDisplaySettings,
  (patch: Partial<MacDisplaySettings> | MacDisplaySettings) => void,
] {
  const [settings, setSettings] = useState<MacDisplaySettings>(() => loadMacDisplaySettings());

  useEffect(() => {
    const unsub = subscribeMacDisplaySettings((next) => setSettings(next));
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const fresh = loadMacDisplaySettings();
        applyMacDisplayEffectsToDom(fresh);
        setSettings(fresh);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      unsub();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const updateSettings = (patch: Partial<MacDisplaySettings> | MacDisplaySettings) => {
    const current = loadMacDisplaySettings();
    saveMacDisplaySettings({ ...current, ...patch });
  };

  return [settings, updateSettings];
}

export function getMainContainerMaxWidthClass(mode: ContentWidthMode): string {
  switch (mode) {
    case 'wide':
      return 'max-w-7xl';
    case 'full':
      return 'max-w-[1680px]';
    case 'standard':
    default:
      return 'max-w-6xl';
  }
}

export function getNotebookMaxFitWidth(mode: ContentWidthMode, isFullscreen: boolean): number {
  switch (mode) {
    case 'wide':
      return isFullscreen ? 1260 : 1060;
    case 'full':
      return isFullscreen ? 1520 : 1320;
    case 'standard':
    default:
      return isFullscreen ? 1040 : 860;
  }
}
