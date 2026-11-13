import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  normalizeHexColor,
  useInkColorPalette,
} from '../../services/colorPaletteService';

interface Props {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  variant?: 'toolbar' | 'floating';
  preserveTextFocus?: boolean;
  onBeforeNativeColorPicker?: () => void;
  onAfterNativeColorPicker?: () => void;
}

export const ScrollableColorStrip: React.FC<Props> = ({
  selectedColor,
  onSelectColor,
  variant = 'toolbar',
  preserveTextFocus = false,
  onBeforeNativeColorPicker,
  onAfterNativeColorPicker,
}) => {
  const {
    palette,
    hiddenPresets,
    addCustomColor,
    removeColor,
    restorePresetColor,
    resetPalette,
  } = useInkColorPalette();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pickerValue, setPickerValue] = useState(() => normalizeHexColor(selectedColor));

  useEffect(() => {
    setPickerValue(normalizeHexColor(selectedColor));
  }, [selectedColor]);

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
  }, [palette.length, isEditing, updateScrollButtons]);

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

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
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

        {/* Add Custom Color (+) */}
        <div
          title="Eigene Wunschfarbe auswählen & hinzufügen"
          onMouseDown={() => onBeforeNativeColorPicker?.()}
          className={`relative shrink-0 rounded-lg border flex items-center justify-center transition-colors cursor-pointer overflow-hidden ${
            isFloating
              ? 'w-6 h-6 bg-white/10 hover:bg-white/20 border-white/20 text-white'
              : 'w-7 h-7 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
          }`}
        >
          <Plus className="w-3.5 h-3.5 pointer-events-none" />
          <input
            type="color"
            value={pickerValue}
            aria-label="Eigene Wunschfarbe hinzufügen"
            onClick={(e) => {
              e.stopPropagation();
              onBeforeNativeColorPicker?.();
            }}
            onChange={(e) => {
              const chosen = e.target.value;
              setPickerValue(chosen);
              const addedColor = addCustomColor(chosen);
              onSelectColor(addedColor);
              // Scroll smoothly to reveal newly added color at the end
              requestAnimationFrame(() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: scrollRef.current.scrollWidth,
                    behavior: 'smooth',
                  });
                }
              });
            }}
            onBlur={() => onAfterNativeColorPicker?.()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Toggle Customize / Edit Mode */}
        <button
          type="button"
          onMouseDown={guardFocus}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing((prev) => !prev);
          }}
          aria-pressed={isEditing}
          title={isEditing ? 'Farbbearbeitung schließen' : 'Farbleiste anpassen (entfernen / wiederherstellen)'}
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
            title="Alle 10 Standardfarben wiederherstellen"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Standard</span>
          </button>
        </div>
      )}
    </div>
  );
};
