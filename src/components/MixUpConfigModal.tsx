import React, { useState, useEffect, useMemo } from 'react';
import { Chapter } from '../types/quiz';
import { soundEffects } from '../services/audioService';
import { X, Shuffle, CheckSquare, Square, MinusSquare, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  chapters: Chapter[];
  onClose: () => void;
  onStart: (selectedModuleIds: string[]) => void;
}

export const MixUpConfigModal: React.FC<Props> = ({
  isOpen,
  chapters,
  onClose,
  onStart,
}) => {
  // Collect all module IDs
  const allModuleIds = useMemo(() => {
    const ids: string[] = [];
    chapters.forEach(c => {
      c.modules.forEach(m => ids.push(m.id));
    });
    return ids;
  }, [chapters]);

  // Selected module IDs state - default all selected initially
  const [selectedModuleIds, setSelectedModuleIds] = useState<Set<string>>(() => new Set(allModuleIds));
  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(() => new Set([chapters[0]?.id || '']));

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen && selectedModuleIds.size === 0) {
      setSelectedModuleIds(new Set(allModuleIds));
    }
  }, [isOpen, allModuleIds]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleModule = (moduleId: string) => {
    soundEffects.playClick();
    setSelectedModuleIds(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const toggleChapter = (chapter: Chapter) => {
    soundEffects.playClick();
    const chapterModuleIds = chapter.modules.map(m => m.id);
    const allSelected = chapterModuleIds.every(id => selectedModuleIds.has(id));

    setSelectedModuleIds(prev => {
      const next = new Set(prev);
      if (allSelected) {
        // Deselect all in chapter
        chapterModuleIds.forEach(id => next.delete(id));
      } else {
        // Select all in chapter
        chapterModuleIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const selectAll = () => {
    soundEffects.playClick();
    setSelectedModuleIds(new Set(allModuleIds));
  };

  const clearAll = () => {
    soundEffects.playClick();
    setSelectedModuleIds(new Set());
  };

  const toggleExpandChapter = (chapterId: string) => {
    soundEffects.playClick();
    setExpandedChapterIds(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const handleStartClick = () => {
    if (selectedModuleIds.size === 0) return;
    soundEffects.playClick();
    onStart(Array.from(selectedModuleIds));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mixup-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-100 transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/60 dark:bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Shuffle className="w-4 h-4" />
              <span>Individuelle Wissensabfrage</span>
            </div>
            <h3 id="mixup-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Mix-Up Mix: Modul- & Themen-Auswahl
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Wähle ganze Kapitel oder einzelne Modulthemen aus. Jedes Thema startet mit der Wissenskarte und stellt direkt 1–2 Prüfungsfragen.
            </p>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Toolbar */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">{selectedModuleIds.size}</span> von {allModuleIds.length} Themen ausgewählt
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-[11px]"
            >
              Alle auswählen
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-slate-600 dark:text-slate-400 transition-colors cursor-pointer text-[11px]"
            >
              Auswahl leeren
            </button>
          </div>
        </div>

        {/* Scrollable Chapters and Modules List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 max-h-[55vh]">
          {chapters.map(chapter => {
            const chapterModuleIds = chapter.modules.map(m => m.id);
            const selectedInChapterCount = chapterModuleIds.filter(id => selectedModuleIds.has(id)).length;
            const isAllSelected = selectedInChapterCount === chapterModuleIds.length && chapterModuleIds.length > 0;
            const isPartial = selectedInChapterCount > 0 && selectedInChapterCount < chapterModuleIds.length;
            const isExpanded = expandedChapterIds.has(chapter.id);

            return (
              <div
                key={chapter.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-2xs transition-all"
              >
                {/* Chapter Row Header */}
                <div className="p-3 sm:p-4 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleChapter(chapter)}
                      className="cursor-pointer text-indigo-600 dark:text-indigo-400 shrink-0"
                      title={isAllSelected ? 'Kapitel abwählen' : 'Ganzes Kapitel auswählen'}
                    >
                      {isAllSelected ? (
                        <CheckSquare className="w-5 h-5 fill-indigo-600 text-white" />
                      ) : isPartial ? (
                        <MinusSquare className="w-5 h-5 fill-indigo-100 dark:fill-indigo-950 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0" onClick={() => toggleExpandChapter(chapter.id)}>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Kapitel {chapter.number}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 font-mono tabular-nums">
                          ({selectedInChapterCount}/{chapter.modules.length} gewählt)
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate cursor-pointer">
                        {chapter.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpandChapter(chapter.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer shrink-0"
                    title={isExpanded ? 'Module zuklappen' : 'Module aufklappen'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sub-Modules Accordion List */}
                {isExpanded && (
                  <div className="p-3 sm:p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1.5 bg-white dark:bg-slate-900">
                    {chapter.modules.map(mod => {
                      const isSelected = selectedModuleIds.has(mod.id);
                      return (
                        <div
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors cursor-pointer text-xs ${
                            isSelected
                              ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/80 text-indigo-950 dark:text-indigo-200'
                              : 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <button
                              type="button"
                              className="text-indigo-600 dark:text-indigo-400 shrink-0"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 fill-indigo-600 text-white" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                            <span className="font-bold truncate">{mod.title}</span>
                          </div>

                          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
                            {mod.quizQuestions?.length || 2} Fragen
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {selectedModuleIds.size === 0 ? (
              <span className="text-rose-500 font-semibold">Bitte wähle mindestens 1 Thema aus.</span>
            ) : (
              <span>Insgesamt <b>{selectedModuleIds.size}</b> Modulthemen ausgewählt.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Abbrechen
            </button>

            <button
              type="button"
              disabled={selectedModuleIds.size === 0}
              onClick={handleStartClick}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Mix-Up starten ({selectedModuleIds.size} Themen)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
