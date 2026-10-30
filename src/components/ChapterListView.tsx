import React, { useState, useRef } from 'react';
import { Chapter, UserStats } from '../types/quiz';
import { ALL_BADGES } from '../services/storageService';
import { BionicText } from '../utils/bionicReading';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Layers,
  Lightbulb,
  CheckSquare,
  Award,
  ChevronRight,
  Grid,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  chapters: Chapter[];
  stats: UserStats;
  bionic: boolean;
  selectedChapterId?: string;
  onSelectChapter?: (chapterId: string) => void;
  onSelectModule: (chapterId: string, moduleId: string) => void;
  onStartExam: () => void;
  onOpenGames?: () => void;
  onGoToSpickzettel?: () => void;
}

export const ChapterListView: React.FC<Props> = ({
  chapters,
  stats,
  bionic,
  selectedChapterId: externalSelectedChapterId,
  onSelectChapter,
  onSelectModule,
  onStartExam,
  onOpenGames,
  onGoToSpickzettel,
}) => {
  const activeChapterRef = useRef<HTMLElement>(null);

  // Find initial chapter or default to first
  const [internalSelectedId, setInternalSelectedId] = useState<string>(() => {
    if (externalSelectedChapterId) return externalSelectedChapterId;
    const firstIncomplete = chapters.find(c =>
      c.modules.some(m => !stats.completedModules.includes(m.id))
    );
    return firstIncomplete?.id || chapters[0]?.id || 'ixd';
  });

  const activeChapterId = externalSelectedChapterId || internalSelectedId;

  const handleChapterClick = (id: string) => {
    setInternalSelectedId(id);
    if (onSelectChapter) {
      onSelectChapter(id);
    }
    setTimeout(() => {
      activeChapterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const activeIndex = chapters.findIndex(c => c.id === activeChapterId);
  const currentChapter = chapters[activeIndex !== -1 ? activeIndex : 0];

  const prevChapter = activeIndex > 0 ? chapters[activeIndex - 1] : null;
  const nextChapter = activeIndex < chapters.length - 1 ? chapters[activeIndex + 1] : null;

  // Chapter completion helper
  const getChapterCompletion = (chapter: Chapter) => {
    const completed = chapter.modules.filter(m =>
      stats.completedModules.includes(m.id)
    ).length;
    return {
      completed,
      total: chapter.modules.length,
      isFullyCompleted: completed === chapter.modules.length && chapter.modules.length > 0,
    };
  };

  const calculateChapterTotalXp = (chapter: Chapter) => {
    const moduleExp = chapter.modules.length * 60;
    const questionsExp = chapter.modules.reduce((acc, m) => acc + (m.quizQuestions?.length || 0) * 20, 0);
    return moduleExp + questionsExp;
  };

  const calculateModuleXp = (module: Chapter['modules'][0]) => {
    return 60 + (module.quizQuestions?.length || 0) * 20;
  };

  const activeChapterStats = getChapterCompletion(currentChapter);
  const totalCompletedModules = stats.completedModules.length;
  const totalAllModules = chapters.reduce((acc, c) => acc + c.modules.length, 0);

  const [expandedChecklistIdx, setExpandedChecklistIdx] = useState<number | null>(null);

  const toggleChecklistItem = (idx: number) => {
    soundEffects.playClick();
    setExpandedChecklistIdx(expandedChecklistIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Chapter Cards Overview Grid */}
      <section aria-label="Kapitel-Auswahl">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
          {chapters.map((chapter) => {
            const isSelected = chapter.id === currentChapter.id;
            const { completed, total, isFullyCompleted } = getChapterCompletion(chapter);
            const chapterXpReward = calculateChapterTotalXp(chapter);

            return (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                aria-selected={isSelected}
                role="tab"
                className={`p-2 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[9px] font-mono font-bold tracking-wider uppercase ${
                        isSelected ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      KAP {chapter.number}
                    </span>

                    {isFullyCompleted ? (
                      <span
                        className={`inline-flex items-center text-[9px] font-bold px-1 py-0.2 rounded-full ${
                          isSelected
                            ? 'bg-indigo-700 text-emerald-300'
                            : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        }`}
                        title="Abgeschlossen"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </span>
                    ) : (
                      <span
                        className={`text-[9px] font-mono ${
                          isSelected ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {completed}/{total}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-[11px] font-bold line-clamp-1 leading-snug ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    {chapter.title}
                  </h3>

                  {/* Chapter EXP Reward Tag */}
                  <div className="flex items-center gap-1 mt-1 text-[9px] font-bold font-mono">
                    <span
                      className={`flex items-center gap-0.5 ${
                        isSelected ? 'text-amber-200' : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      +{chapterXpReward} EXP
                    </span>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="mt-1.5 w-full">
                  <div
                    className={`w-full h-0.5 rounded-full overflow-hidden ${
                      isSelected ? 'bg-indigo-700' : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected
                          ? isFullyCompleted ? 'bg-emerald-300' : 'bg-white'
                          : isFullyCompleted ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${(completed / total) * 100}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Chapter Focused Content */}
      <section
        ref={activeChapterRef}
        id="chapter-details"
        className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors scroll-mt-20 sm:scroll-mt-24"
      >
        {/* Active Chapter Title & Meta Header */}
        <div className="p-4 sm:p-4.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/90 text-indigo-800 dark:text-indigo-200 text-xs font-mono font-bold">
                KAPITEL {currentChapter.number} VON {chapters.length}
              </span>
              <span className="text-xs text-slate-700 dark:text-slate-200 font-semibold">
                {activeChapterStats.completed} von {activeChapterStats.total} Modulen erledigt
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-700 dark:text-slate-200 font-semibold">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold font-mono shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>+{calculateChapterTotalXp(currentChapter)} EXP zu verdienen</span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                ~{currentChapter.modules.reduce((acc, m) => acc + m.estimatedMinutes, 0)} Min
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                {currentChapter.modules.length} Module
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            <BionicText text={currentChapter.title} enabled={bionic} />
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <BionicText text={currentChapter.description} enabled={bionic} />
          </p>

          {/* Chapter Progress Bar */}
          <div className="mt-3 w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                activeChapterStats.isFullyCompleted
                  ? 'bg-emerald-500'
                  : 'bg-indigo-600 dark:bg-indigo-500'
              }`}
              style={{
                width: `${(activeChapterStats.completed / activeChapterStats.total) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-4.5 space-y-4">
          {/* Highlight Exam Merksatz */}
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                Wichtiger IHK-Merksatz
              </span>
              <p className="text-xs text-amber-950 dark:text-amber-200 font-medium italic leading-snug">
                "{currentChapter.examMerksatz}"
              </p>
            </div>
          </div>

          {/* Module List for Active Chapter */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Module in Kapitel {currentChapter.number}
              </h3>
              <span className="text-[11px] text-slate-400">
                Klick zum Starten
              </span>
            </div>

            <div className="space-y-2.5">
              {currentChapter.modules.map((module, mIndex) => {
                const isCompleted = stats.completedModules.includes(module.id);
                return (
                  <div
                    key={module.id}
                    className={`p-3 sm:p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCompleted
                        ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                      </div>

                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-semibold text-slate-400">
                            Modul {mIndex + 1}
                          </span>
                          <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-md bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                            +{calculateModuleXp(module)} EXP
                          </span>
                          {isCompleted && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                              Erledigt ✓
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          <BionicText text={module.title} enabled={bionic} />
                        </h4>

                        <p className="text-[11px] text-slate-700 dark:text-slate-200 font-medium line-clamp-1">
                          {module.shortDesc}
                        </p>

                        <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-600 dark:text-slate-300 font-mono font-semibold">
                          <span>{module.estimatedMinutes} Min</span>
                          <span>·</span>
                          <span>{module.nuggets.length} Einheiten</span>
                          <span>·</span>
                          <span>{module.quizQuestions.length} Quizfragen</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectModule(currentChapter.id, module.id)}
                      className={`h-8 px-3.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center shadow-xs ${
                        isCompleted
                          ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      <span>{isCompleted ? 'Wiederholen' : 'Starten'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chapter Exam Checklist */}
          {currentChapter.examChecklist && currentChapter.examChecklist.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-100 dark:border-indigo-900/40 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Prüfungs-Checkliste
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                      Fokus-Themen für Kapitel {currentChapter.number}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {currentChapter.examChecklist.length} Punkte
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentChapter.examChecklist.map((item, idx) => {
                  const isExpanded = expandedChecklistIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleChecklistItem(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex flex-col gap-2 group cursor-pointer ${
                        isExpanded
                          ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-500 shadow-md ring-4 ring-indigo-500/10'
                          : 'bg-white/60 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors ${
                            isExpanded ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className={`text-xs font-bold transition-colors ${
                            isExpanded ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {item.task}
                          </span>
                        </div>
                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-indigo-500' : 'text-slate-400'}`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="pl-9 pr-2 pb-1 animate-in slide-in-from-top-1 duration-200">
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-l-2 border-indigo-200 dark:border-indigo-800 pl-3 py-1">
                            {item.detail}
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-indigo-500 uppercase tracking-wider">
                            <Lightbulb className="w-3 h-3" />
                            <span>Tipp: Präge dir diesen Punkt gut ein!</span>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Quick Chapter Navigation */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            {prevChapter ? (
              <button
                onClick={() => handleChapterClick(prevChapter.id)}
                className="h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 cursor-pointer"
                title={`Zu Kapitel ${prevChapter.number}: ${prevChapter.title}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kapitel {prevChapter.number}</span>
              </button>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <button
                onClick={() => handleChapterClick(nextChapter.id)}
                className="h-8 px-3.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all flex items-center gap-1.5 cursor-pointer ml-auto shadow-xs"
                title={`Zu Kapitel ${nextChapter.number}: ${nextChapter.title}`}
              >
                <span>Weiter zu Kapitel {nextChapter.number}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onStartExam}
                className="h-8 px-3.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all flex items-center gap-1.5 cursor-pointer ml-auto shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Zur Abschlussprüfung</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Compact Badges / Errungenschaften Bar */}
      <section className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 transition-colors">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Errungenschaften ({stats.earnedBadges.length}/{ALL_BADGES.length})</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {ALL_BADGES.map(badge => {
            const isUnlocked = stats.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-2 rounded-lg border text-center transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-40'
                }`}
              >
                <div className="text-lg mb-0.5">{badge.icon}</div>
                <div className="text-[10px] font-bold text-slate-900 dark:text-slate-100 truncate">
                  {badge.title}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
