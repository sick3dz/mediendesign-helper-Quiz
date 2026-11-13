import { useCallback, useEffect, useMemo, useState } from 'react';
import { PEN_COLORS } from '../data/notebooksData';

export interface InkColorOption {
  id: string;
  label: string;
  color: string;
  isCustom?: boolean;
}

const INK_PALETTE_STORAGE_KEY = 'mediengestalter_ink_palette_v1';
const INK_PALETTE_EVENT = 'mediengestalter-ink-palette-updated';

export function normalizeHexColor(input: string): string {
  const trimmed = (input || '').trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-f]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  return '#0f172a';
}

export function getDefaultInkColorPalette(): InkColorOption[] {
  return PEN_COLORS.map((c) => ({
    id: c.id,
    label: c.label,
    color: normalizeHexColor(c.color),
    isCustom: false,
  }));
}

export function loadInkColorPalette(): InkColorOption[] {
  try {
    const raw = localStorage.getItem(INK_PALETTE_STORAGE_KEY);
    if (!raw) return getDefaultInkColorPalette();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return getDefaultInkColorPalette();
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
    return valid.length > 0 ? valid : getDefaultInkColorPalette();
  } catch {
    return getDefaultInkColorPalette();
  }
}

export function saveInkColorPalette(palette: InkColorOption[]): void {
  try {
    localStorage.setItem(INK_PALETTE_STORAGE_KEY, JSON.stringify(palette));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(INK_PALETTE_EVENT, { detail: palette }));
    }
  } catch (err) {
    console.error('Farbpalette konnte nicht gespeichert werden:', err);
  }
}

export function useInkColorPalette() {
  const [palette, setPalette] = useState<InkColorOption[]>(() => loadInkColorPalette());

  useEffect(() => {
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<InkColorOption[] | undefined>;
      if (Array.isArray(custom.detail) && custom.detail.length > 0) {
        setPalette(custom.detail);
      } else {
        setPalette(loadInkColorPalette());
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === INK_PALETTE_STORAGE_KEY) {
        setPalette(loadInkColorPalette());
      }
    };
    window.addEventListener(INK_PALETTE_EVENT, handleSync);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(INK_PALETTE_EVENT, handleSync);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const addCustomColor = useCallback((hex: string): string => {
    const normalized = normalizeHexColor(hex);
    const current = loadInkColorPalette();
    const existing = current.find((c) => normalizeHexColor(c.color) === normalized);
    if (existing) {
      return existing.color;
    }
    const presetMatch = PEN_COLORS.find((c) => normalizeHexColor(c.color) === normalized);
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
    saveInkColorPalette(next);
    return normalized;
  }, []);

  const removeColor = useCallback((id: string) => {
    const current = loadInkColorPalette();
    if (current.length <= 1) return;
    const next = current.filter((c) => c.id !== id);
    if (next.length === 0) return;
    setPalette(next);
    saveInkColorPalette(next);
  }, []);

  const restorePresetColor = useCallback((preset: InkColorOption) => {
    const normalized = normalizeHexColor(preset.color);
    const current = loadInkColorPalette();
    if (current.some((c) => normalizeHexColor(c.color) === normalized)) return;
    const next = [...current, { ...preset, color: normalized, isCustom: false }];
    setPalette(next);
    saveInkColorPalette(next);
  }, []);

  const resetPalette = useCallback(() => {
    const defaults = getDefaultInkColorPalette();
    setPalette(defaults);
    saveInkColorPalette(defaults);
  }, []);

  const hiddenPresets = useMemo(() => {
    const activeColors = new Set(palette.map((c) => normalizeHexColor(c.color)));
    return getDefaultInkColorPalette().filter((p) => !activeColors.has(normalizeHexColor(p.color)));
  }, [palette]);

  return {
    palette,
    hiddenPresets,
    addCustomColor,
    removeColor,
    restorePresetColor,
    resetPalette,
  };
}
