import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Pipette,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  ColorPaletteMode,
  normalizeHexColor,
  useColorPalette,
} from '../../services/colorPaletteService';

interface Props {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  mode?: ColorPaletteMode;
  variant?: 'toolbar' | 'floating';
  preserveTextFocus?: boolean;
  onBeforeNativeColorPicker?: () => void;
  onAfterNativeColorPicker?: () => void;
}

function tryParseHexInput(raw: string): string | null {
  const cleaned = raw.trim().replace(/^#*/, '');
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return `#${cleaned.toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return `#${cleaned[0]}${cleaned[0]}${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}`.toLowerCase();
  }
  return null;
}

export const ScrollableColorStrip: React.FC<Props> = ({
  selectedColor,
  onSelectColor,
  mode = 'ink',
  variant = 'toolbar',
  preserveTextFocus = false,
  onBeforeNativeColorPicker,
  onAfterNativeColorPicker,
}) => {
  const {
    palette,
    hiddenPresets,
    defaultCount,
    addCustomColor,
    removeColor,
    restorePresetColor,
    resetPalette,
  } = useColorPalette(mode);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Staged custom color picker (prevents macOS live drag spam in the palette)
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
  const [draftColor, setDraftColor] = useState(() => normalizeHexColor(selectedColor));
  const [hexInput, setHexInput] = useState(() => normalizeHexColor(selectedColor).toUpperCase());

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(el);
    return () => observer.disconnect();
  }, [palette.length, isEditing, isCustomPickerOpen, updateScrollButtons]);

  const handleCloseCustomPicker = useCallback(() => {
    setIsCustomPickerOpen(false);
    onAfterNativeColorPicker?.();
  }, [onAfterNativeColorPicker]);

  const handleOpenCustomPicker = () => {
    const initial = normalizeHexColor(selectedColor);
    setDraftColor(initial);
    setHexInput(initial.toUpperCase());
    setIsEditing(false);
    onBeforeNativeColorPicker?.();
    setIsCustomPickerOpen(true);
  };

  const handleConfirmCustomColor = useCallback(() => {
    const parsedFromInput = tryParseHexInput(hexInput);
    const finalHex = parsedFromInput ?? normalizeHexColor(draftColor);
    onAfterNativeColorPicker?.();
    const addedColor = addCustomColor(finalHex);
    onSelectColor(addedColor);
    setIsCustomPickerOpen(false);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: 'smooth',
        });
      }
    });
  }, [
    addCustomColor,
    draftColor,
    hexInput,
    onAfterNativeColorPicker,
    onSelectColor,
  ]);

  // Close uncommitted custom picker on outside click or Escape
  useEffect(() => {
    if (!isCustomPickerOpen) return;
    const handleDocPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCloseCustomPicker();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleCloseCustomPicker();
      }
    };
    document.addEventListener('mousedown', handleDocPointerDown);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('mousedown', handleDocPointerDown);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isCustomPickerOpen, handleCloseCustomPicker]);

  const scrollByDirection = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = variant === 'floating' ? 88 : 124;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const normalizedSelected = normalizeHexColor(selectedColor);
  const isFloating = variant === 'floating';

  const guardFocus = (e: React.MouseEvent) => {
    if (preserveTextFocus) {
      e.preventDefault();
    }
  };

  const handleNativeDraftChange = (val: string) => {
    const normalized = normalizeHexColor(val);
    setDraftColor(normalized);
    setHexInput(normalized.toUpperCase());
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 min-w-0">
      <div className="flex items-center gap-1 min-w-0">
        {/* Scroll Left Arrow */}
        <button
          type="button"
          onMouseDown={guardFocus}
          onClick={(e) => {
            e.stopPropagation();
            scrollByDirection(-1);
          }}
          disabled={!canScrollLeft}
          title="Farben nach links scrollen"
          aria-label="Farben nach links scrollen"
          className={`shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer disabled:opacity-25 disabled:pointer-events-none ${
            isFloating
              ? 'w-5 h-6 text-slate-300 hover:bg-white/15 hover:text-white'
              : 'w-6 h-7 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Scrollable Color Swatches Track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className={`flex items-center overflow-x-auto scroll-smooth py-0.5 px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isFloating ? 'gap-1.5 max-w-[144px]' : 'gap-1.5 max-w-[180px] sm:max-w-[232px]'
          }`}
        >
          {palette.map((item) => {
            const isActive = normalizeHexColor(item.color) === normalizedSelected;
            return (
              <div key={item.id} className="relative shrink-0 flex items-center justify-center">
                <button
                  type="button"
                  onMouseDown={guardFocus}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectColor(item.color);
                  }}
                  title={item.label}
                  aria-label={item.label}
                  aria-pressed={isActive}
                  style={{ backgroundColor: item.color }}
                  className={`rounded-full border-2 transition-transform cursor-pointer shrink-0 ${
                    isFloating ? 'w-5 h-5' : 'w-7 h-7'
                  } ${
                    isActive
                      ? isFloating
                        ? 'border-white ring-2 ring-indigo-400 scale-110'
                        : 'border-indigo-500 ring-2 ring-indigo-300 dark:ring-indigo-500/50 scale-105'
                      : isFloating
                      ? 'border-white/40 hover:scale-105'
                      : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                  }`}
                />

                {isEditing && palette.length > 1 && (
                  <button
                    type="button"
                    onMouseDown={guardFocus}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeColor(item.id);
                    }}
                    title={`${item.label} aus der Leiste entfernen`}
                    aria-label={`${item.label} entfernen`}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white border border-white flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll Right Arrow */}
        <button
          type="button"
          onMouseDown={guardFocus}
          onClick={(e) => {
            e.stopPropagation();
            scrollByDirection(1);
          }}
          disabled={!canScrollRight}
          title="Farben nach rechts scrollen"
          aria-label="Farben nach rechts scrollen"
          className={`shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer disabled:opacity-25 disabled:pointer-events-none ${
            isFloating
              ? 'w-5 h-6 text-slate-300 hover:bg-white/15 hover:text-white'
              : 'w-6 h-7 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100'
          }`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Open Staged Custom Color Picker (+) */}
        <button
          type="button"
          onMouseDown={guardFocus}
          onClick={(e) => {
            e.stopPropagation();
            if (isCustomPickerOpen) {
              handleCloseCustomPicker();
            } else {
              handleOpenCustomPicker();
            }
          }}
          aria-expanded={isCustomPickerOpen}
          title={
            isCustomPickerOpen
              ? 'Farbauswahl schließen'
              : 'Eigene Wunschfarbe auswählen & bestätigen'
          }
          aria-label="Eigene Wunschfarbe auswählen"
          className={`shrink-0 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
            isFloating ? 'w-6 h-6' : 'w-7 h-7'
          } ${
            isCustomPickerOpen
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : isFloating
              ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        {/* Toggle Customize / Edit Mode */}
        <button
          type="button"
          onMouseDown={guardFocus}
          onClick={(e) => {
            e.stopPropagation();
            if (isCustomPickerOpen) {
              handleCloseCustomPicker();
            }
            setIsEditing((prev) => !prev);
          }}
          aria-pressed={isEditing}
          title={
            isEditing
              ? 'Farbbearbeitung schließen'
              : 'Farbleiste anpassen (entfernen / wiederherstellen)'
          }
          aria-label="Farbleiste anpassen"
          className={`shrink-0 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            isFloating ? 'w-6 h-6' : 'w-7 h-7'
          } ${
            isEditing
              ? 'bg-indigo-600 text-white'
              : isFloating
              ? 'bg-white/10 hover:bg-white/20 text-slate-200'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Staged Custom Color Preview & Confirm Panel (Prevents live macOS palette spam) */}
      {isCustomPickerOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className={`flex flex-col gap-2 p-2 rounded-xl border text-[11px] ${
            isFloating
              ? 'bg-slate-800/95 border-white/15 text-slate-100 max-w-[252px]'
              : 'bg-slate-50 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {/* Preview Swatch wrapping native OS color picker (draft only!) */}
            <label
              title="Klicken, um das Farb-Auswahlfeld zu öffnen"
              onMouseDown={() => onBeforeNativeColorPicker?.()}
              className={`relative shrink-0 rounded-lg border-2 cursor-pointer overflow-hidden flex items-center justify-center shadow-2xs ${
                isFloating
                  ? 'w-8 h-8 border-white/60'
                  : 'w-9 h-9 border-slate-300 dark:border-slate-600'
              }`}
              style={{ backgroundColor: draftColor }}
            >
              <span className="sr-only">Farbe im Farbwähler aussuchen</span>
              <Pipette className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] pointer-events-none" />
              <input
                type="color"
                value={draftColor}
                aria-label="Vorschau-Farbe wählen"
                onClick={(e) => e.stopPropagation()}
                onInput={(e) =>
                  handleNativeDraftChange((e.target as HTMLInputElement).value)
                }
                onChange={(e) => handleNativeDraftChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>

            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span
                className={`text-[10px] font-semibold leading-none ${
                  isFloating ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Vorschau (erst mit Klick speichern)
              </span>
              <input
                type="text"
                value={hexInput}
                maxLength={7}
                spellCheck={false}
                aria-label="Hex-Farbcode eingeben"
                placeholder="#3B82F6"
                onChange={(e) => {
                  const val = e.target.value;
                  setHexInput(val);
                  const parsed = tryParseHexInput(val);
                  if (parsed) {
                    setDraftColor(parsed);
                  }
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleConfirmCustomColor();
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    handleCloseCustomPicker();
                  }
                }}
                className={`w-full px-2 py-1 rounded-md border font-mono text-[11px] font-bold uppercase tracking-wide focus:outline-hidden ${
                  isFloating
                    ? 'bg-slate-900/90 border-white/20 text-white focus:border-indigo-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onMouseDown={guardFocus}
              onClick={(e) => {
                e.stopPropagation();
                handleCloseCustomPicker();
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isFloating
                  ? 'bg-white/10 hover:bg-white/20 text-slate-200'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <X className="w-3 h-3" />
              <span>Abbrechen</span>
            </button>
            <button
              type="button"
              onMouseDown={guardFocus}
              onClick={(e) => {
                e.stopPropagation();
                handleConfirmCustomColor();
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Check className="w-3 h-3" />
              <span>Bestätigen</span>
            </button>
          </div>
        </div>
      )}

      {/* Compact Inline Edit Bar (Restore Hidden Presets or Reset to Defaults) */}
      {isEditing && (
        <div
          onMouseDown={guardFocus}
          onClick={(e) => e.stopPropagation()}
          className={`flex flex-wrap items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] ${
            isFloating
              ? 'bg-white/10 text-slate-200 border border-white/10 max-w-[252px]'
              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <span className="font-semibold opacity-85">
            Klicke × zum Ausblenden{hiddenPresets.length > 0 ? ' · Wiederherstellen:' : ''}
          </span>

          {hiddenPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onMouseDown={guardFocus}
              onClick={(e) => {
                e.stopPropagation();
                restorePresetColor(preset);
              }}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-semibold cursor-pointer transition-colors ${
                isFloating
                  ? 'bg-white/15 hover:bg-white/25 text-white'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
              title={`${preset.label} wieder zur Leiste hinzufügen`}
            >
              <span
                className="w-2 h-2 rounded-full border border-black/20"
                style={{ backgroundColor: preset.color }}
              />
              <span>+{preset.label}</span>
            </button>
          ))}

          <button
            type="button"
            onMouseDown={guardFocus}
            onClick={(e) => {
              e.stopPropagation();
              resetPalette();
            }}
            className={`ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold cursor-pointer transition-colors ${
              isFloating
                ? 'bg-white/15 hover:bg-white/25 text-white'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
            title={`Alle ${defaultCount} Standardfarben wiederherstellen`}
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Standard</span>
          </button>
        </div>
      )}
    </div>
  );
};
