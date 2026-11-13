import { useCallback, useEffect, useMemo, useState } from 'react';
import { HIGHLIGHTER_COLORS, PEN_COLORS } from '../data/notebooksData';

export interface InkColorOption {
  id: string;
  label: string;
  color: string;
  isCustom?: boolean;
}

export type ColorPaletteMode = 'ink' | 'highlighter';

const INK_PALETTE_STORAGE_KEY = 'mediengestalter_ink_palette_v1';
const INK_PALETTE_EVENT = 'mediengestalter-ink-palette-updated';

const HIGHLIGHTER_PALETTE_STORAGE_KEY = 'mediengestalter_highlighter_palette_v1';
const HIGHLIGHTER_PALETTE_EVENT = 'mediengestalter-highlighter-palette-updated';

export function normalizeHexColor(input: string): string {
  const trimmed = (input || '').trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-f]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  return '#0f172a';
}

function getPresetsForMode(mode: ColorPaletteMode) {
  return mode === 'highlighter' ? HIGHLIGHTER_COLORS : PEN_COLORS;
}

function getStorageKeyForMode(mode: ColorPaletteMode): string {
  return mode === 'highlighter' ? HIGHLIGHTER_PALETTE_STORAGE_KEY : INK_PALETTE_STORAGE_KEY;
}

function getEventForMode(mode: ColorPaletteMode): string {
  return mode === 'highlighter' ? HIGHLIGHTER_PALETTE_EVENT : INK_PALETTE_EVENT;
}

export function getDefaultInkColorPalette(): InkColorOption[] {
  return PEN_COLORS.map((c) => ({
    id: c.id,
    label: c.label,
    color: normalizeHexColor(c.color),
    isCustom: false,
  }));
}

export function getDefaultHighlighterColorPalette(): InkColorOption[] {
  return HIGHLIGHTER_COLORS.map((c) => ({
    id: c.id,
    label: c.label,
    color: normalizeHexColor(c.color),
    isCustom: false,
  }));
}

function getDefaultPaletteForMode(mode: ColorPaletteMode): InkColorOption[] {
  return mode === 'highlighter'
    ? getDefaultHighlighterColorPalette()
    : getDefaultInkColorPalette();
}

export function sanitizePaletteList(
  parsed: unknown,
  mode: ColorPaletteMode = 'ink'
): InkColorOption[] {
  if (!Array.isArray(parsed)) return getDefaultPaletteForMode(mode);
  const valid: InkColorOption[] = [];
  const seen = new Set<string>();
  for (const item of parsed) {
    if (!item || typeof item !== 'object') continue;
    const color = normalizeHexColor(String((item as InkColorOption).color || ''));
    if (seen.has(color)) continue;
    seen.add(color);
    valid.push({
      id:
        typeof (item as InkColorOption).id === 'string' && (item as InkColorOption).id
          ? (item as InkColorOption).id
          : `clr-${color.slice(1)}`,
      label:
        typeof (item as InkColorOption).label === 'string' && (item as InkColorOption).label
          ? (item as InkColorOption).label
          : color.toUpperCase(),
      color,
      isCustom: Boolean((item as InkColorOption).isCustom),
    });
  }
  return valid.length > 0 ? valid : getDefaultPaletteForMode(mode);
}

function loadPaletteForMode(mode: ColorPaletteMode): InkColorOption[] {
  try {
    const raw = localStorage.getItem(getStorageKeyForMode(mode));
    if (!raw) return getDefaultPaletteForMode(mode);
    return sanitizePaletteList(JSON.parse(raw), mode);
  } catch {
    return getDefaultPaletteForMode(mode);
  }
}

function savePaletteForMode(palette: InkColorOption[], mode: ColorPaletteMode): void {
  const clean = sanitizePaletteList(palette, mode);
  try {
    localStorage.setItem(getStorageKeyForMode(mode), JSON.stringify(clean));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(getEventForMode(mode), { detail: clean }));
    }
  } catch (err) {
    console.error('Farbpalette konnte nicht gespeichert werden:', err);
  }
}

export function loadInkColorPalette(): InkColorOption[] {
  return loadPaletteForMode('ink');
}

export function saveInkColorPalette(palette: InkColorOption[]): void {
  savePaletteForMode(palette, 'ink');
}

export function loadHighlighterColorPalette(): InkColorOption[] {
  return loadPaletteForMode('highlighter');
}

export function saveHighlighterColorPalette(palette: InkColorOption[]): void {
  savePaletteForMode(palette, 'highlighter');
}

export function useColorPalette(mode: ColorPaletteMode = 'ink') {
  const [palette, setPalette] = useState<InkColorOption[]>(() => loadPaletteForMode(mode));

  useEffect(() => {
    setPalette(loadPaletteForMode(mode));
    const eventName = getEventForMode(mode);
    const storageKey = getStorageKeyForMode(mode);

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<InkColorOption[] | undefined>;
      if (Array.isArray(custom.detail) && custom.detail.length > 0) {
        setPalette(custom.detail);
      } else {
        setPalette(loadPaletteForMode(mode));
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        setPalette(loadPaletteForMode(mode));
      }
    };
    window.addEventListener(eventName, handleSync);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(eventName, handleSync);
      window.removeEventListener('storage', handleStorage);
    };
  }, [mode]);

  const addCustomColor = useCallback(
    (hex: string): string => {
      const normalized = normalizeHexColor(hex);
      const current = loadPaletteForMode(mode);
      const existing = current.find((c) => normalizeHexColor(c.color) === normalized);
      if (existing) {
        return existing.color;
      }
      const presetMatch = getPresetsForMode(mode).find(
        (c) => normalizeHexColor(c.color) === normalized
      );
      const newEntry: InkColorOption = presetMatch
        ? {
            id: presetMatch.id,
            label: presetMatch.label,
            color: normalized,
            isCustom: false,
          }
        : {
            id: `custom-${normalized.slice(1)}-${Date.now().toString(36)}`,
            label: `Eigene Farbe (${normalized.toUpperCase()})`,
            color: normalized,
            isCustom: true,
          };
      const next = [...current, newEntry];
      setPalette(next);
      savePaletteForMode(next, mode);
      return normalized;
    },
    [mode]
  );

  const removeColor = useCallback(
    (id: string) => {
      const current = loadPaletteForMode(mode);
      if (current.length <= 1) return;
      const next = current.filter((c) => c.id !== id);
      if (next.length === 0) return;
      setPalette(next);
      savePaletteForMode(next, mode);
    },
    [mode]
  );

  const restorePresetColor = useCallback(
    (preset: InkColorOption) => {
      const normalized = normalizeHexColor(preset.color);
      const current = loadPaletteForMode(mode);
      if (current.some((c) => normalizeHexColor(c.color) === normalized)) return;
      const next = [...current, { ...preset, color: normalized, isCustom: false }];
      setPalette(next);
      savePaletteForMode(next, mode);
    },
    [mode]
  );

  const resetPalette = useCallback(() => {
    const defaults = getDefaultPaletteForMode(mode);
    setPalette(defaults);
    savePaletteForMode(defaults, mode);
  }, [mode]);

  const hiddenPresets = useMemo(() => {
    const activeColors = new Set(palette.map((c) => normalizeHexColor(c.color)));
    return getDefaultPaletteForMode(mode).filter(
      (p) => !activeColors.has(normalizeHexColor(p.color))
    );
  }, [palette, mode]);

  const defaultCount = useMemo(() => getDefaultPaletteForMode(mode).length, [mode]);

  return {
    palette,
    hiddenPresets,
    defaultCount,
    addCustomColor,
    removeColor,
    restorePresetColor,
    resetPalette,
  };
}

export function useInkColorPalette() {
  return useColorPalette('ink');
}

export function useHighlighterColorPalette() {
  return useColorPalette('highlighter');
}
