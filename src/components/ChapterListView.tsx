import React, { useState } from 'react';
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
} from 'lucide-react';

interface Props {
  chapters: Chapter[];
  stats: UserStats;
  bionic: boolean;
  selectedChapterId?: string;
  onSelectChapter?: (chapterId: string) => void;
  onSelectModule: (chapterId: string, moduleId: string) => void;
  onStartExam: () => void;
  onOpenGames?: () => void;
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
}) => {
  // If no external chapter selection is passed, find the first chapter with incomplete modules, or default to first
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

  const activeChapterStats = getChapterCompletion(currentChapter);
  const totalCompletedModules = stats.completedModules.length;
  const totalAllModules = chapters.reduce((acc, c) => acc + c.modules.length, 0);

  return (
    <div className="space-y-6">
      {/* Calm Hero & Progress Header */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Mediengestalter Prüfungsvorbereitung · Designkonzeption</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              <BionicText
                text="Fokussiertes Lernen nach Kapiteln"
                enabled={bionic}
              />
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              <BionicText
                text="Wähle oben ein Thema aus. Du siehst immer nur das aktive Kapitel – ohne Reizüberflutung und ohne langes Scrollen."
                enabled={bionic}
              />
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Gesamtfortschritt</div>
              <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {totalCompletedModules} / {totalAllModules} Module
              </div>
            </div>

            <button
              onClick={onStartExam}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>IHK-Prüfungssimulator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Chapter Selection Bar */}
      <section aria-label="Kapitel-Auswahl" className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Kapitel auswählen ({chapters.length} Themen)
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Klick auf ein Kapitel zum Wechseln
          </span>
        </div>

        {/* Responsive Chapter Selectors (8 Chapters) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {chapters.map((chapter, index) => {
            const isSelected = chapter.id === currentChapter.id;
            const { completed, total, isFullyCompleted } = getChapterCompletion(chapter);

            return (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                aria-selected={isSelected}
                role="tab"
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                        isSelected
                          ? 'text-indigo-200'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      KAP {chapter.number}
                    </span>

                    {isFullyCompleted ? (
                      <span
                        className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-indigo-700 text-emerald-300'
                            : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        }`}
                        title="Vollständig abgeschlossen"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Fertig</span>
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] font-mono font-medium ${
                          isSelected
                            ? 'text-indigo-200'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {completed}/{total}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xs font-bold line-clamp-1 leading-snug ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    {chapter.title}
                  </h3>
                </div>

                {/* Progress bar inside button */}
                <div className="mt-2.5 w-full">
                  <div
                    className={`w-full h-1 rounded-full overflow-hidden ${
                      isSelected ? 'bg-indigo-700/80' : 'bg-slate-100 dark:bg-slate-800'
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

      {/* Active Chapter Focused Area */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
        {/* Chapter Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold tracking-wide">
                KAPITEL {currentChapter.number} VON {chapters.length}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activeChapterStats.completed} von {activeChapterStats.total} Modulen abgeschlossen
              </span>
            </div>

            {/* Quick module count & duration */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                ~{currentChapter.modules.reduce((acc, m) => acc + m.estimatedMinutes, 0)} Min Gesamtzeit
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                {currentChapter.modules.length} Module
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1.5">
            <BionicText text={currentChapter.title} enabled={bionic} />
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            <BionicText text={currentChapter.description} enabled={bionic} />
          </p>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
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

        {/* Content of the active chapter */}
        <div className="p-6 space-y-6">
          {/* Highlight Exam Merksatz */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                Prüfungs-Merksatz für dieses Thema
              </span>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-medium italic leading-relaxed">
                "{currentChapter.examMerksatz}"
              </p>
            </div>
          </div>

          {/* Module List for this selected chapter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                Lern-Module in Kapitel {currentChapter.number}
              </h3>
              <span className="text-xs text-slate-400">
                Klick auf ein Modul zum Lernen & Quizzen
              </span>
            </div>

            <div className="space-y-3">
              {currentChapter.modules.map((module, mIndex) => {
                const isCompleted = stats.completedModules.includes(module.id);
                return (
                  <div
                    key={module.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-300'
                        : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <BookOpen className="w-5 h-5" />
                        )}
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-semibold text-slate-400">
                            Modul {mIndex + 1}
                          </span>
                          {isCompleted && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                              Erledigt ✓
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          <BionicText text={module.title} enabled={bionic} />
                        </h4>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {module.shortDesc}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {module.estimatedMinutes} Min Lesezeit
                          </span>
                          <span>·</span>
                          <span>{module.nuggets.length} Lerneinheiten</span>
                          <span>·</span>
                          <span>{module.quizQuestions.length} Quizfragen</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectModule(currentChapter.id, module.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 self-start sm:self-center shadow-xs ${
                        isCompleted
                          ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                      }`}
                    >
                      <span>{isCompleted ? 'Wiederholen' : 'Modul starten'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chapter Exam Checklist & Highlights */}
          {currentChapter.examChecklist && currentChapter.examChecklist.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2.5">
                <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Prüfungs-Checkliste für dieses Kapitel
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentChapter.examChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Chapter-to-Chapter Paging */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            {prevChapter ? (
              <button
                onClick={() => handleChapterClick(prevChapter.id)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] text-slate-400 font-mono">VORHERIGES KAPITEL</div>
                  <div className="font-bold truncate max-w-[150px]">{prevChapter.title}</div>
                </div>
                <span className="sm:hidden">Kapitel {prevChapter.number}</span>
              </button>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <button
                onClick={() => handleChapterClick(nextChapter.id)}
                className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all flex items-center gap-2 cursor-pointer ml-auto"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-indigo-500 dark:text-indigo-400 font-mono">NÄCHSTES KAPITEL</div>
                  <div className="font-bold truncate max-w-[150px]">{nextChapter.title}</div>
                </div>
                <span className="sm:hidden">Kapitel {nextChapter.number}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onStartExam}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-1.5 cursor-pointer ml-auto shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Zur Abschlussprüfung</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Badges / Errungenschaften Accordion/Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Deine Errungenschaften & Abzeichen</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sammle Punkte für dein Haustier und schalte Meilensteine frei
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {stats.earnedBadges.length} / {ALL_BADGES.length} freigeschaltet
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {ALL_BADGES.map(badge => {
            const isUnlocked = stats.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-40'
                }`}
              >
                <div className="text-xl mb-1">{badge.icon}</div>
                <div className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate">
                  {badge.title}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {badge.description}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
