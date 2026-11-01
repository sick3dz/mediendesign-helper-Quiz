import React, { useState, useMemo } from 'react';
import { UserStats, Chapter, QuizQuestion } from '../types/quiz';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Lightbulb, 
  HelpCircle 
} from 'lucide-react';
import { getAllQuestions } from '../utils/learningLogic';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { QuestionDetailModal } from './QuestionDetailModal';
import { soundEffects } from '../services/audioService';

interface Props {
  stats: UserStats;
  chapters: Chapter[];
  bionic?: boolean;
  onBack?: () => void;
  onStartReview?: () => void;
  onGoToChapter?: (chapterId: string) => void;
  onGoToAchievements?: () => void;
  onUpdateStats?: (updatedStats: UserStats) => void;
  onXpChange?: (newXp: number) => void;
  onCoinsChange?: (newCoins: number) => void;
}

export const LearningStatsView: React.FC<Props> = ({ 
  stats, 
  chapters, 
  bionic = false, 
  onBack, 
  onStartReview, 
  onGoToChapter,
  onGoToAchievements,
  onUpdateStats,
  onXpChange,
  onCoinsChange
}) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [dossierQuestion, setDossierQuestion] = useState<QuizQuestion | null>(null);

  const totalAnswered = stats.answeredQuestionsCount || 0;
  const totalCorrect = stats.correctAnswersCount || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Build index of all available questions across chapters, modules, and exams
  const questionsMap = useMemo(() => {
    const map = new Map<string, QuizQuestion>();
    const all = getAllQuestions(chapters);
    all.forEach(q => map.set(q.id, q));
    EXAM_QUESTIONS.forEach(eq => {
      if (!map.has(eq.id)) {
        map.set(eq.id, eq);
      }
    });
    return map;
  }, [chapters]);

  // Calculate mastery per chapter
  const chapterMastery = chapters.map(chapter => {
    const mastery = stats.topicMastery[chapter.id] || 0;
    return {
      id: chapter.id,
      title: chapter.title,
      number: chapter.number,
      mastery,
      color: chapter.accentColor
    };
  });

  // Find problematic questions (most wrong answers)
  const problematicQuestions = Object.entries(stats.questionPerformance)
    .filter(([_, data]) => data.wrongCount > 0)
    .sort((a, b) => b[1].wrongCount - a[1].wrongCount)
    .slice(0, 10);

  const toggleExpand = (id: string) => {
    soundEffects.playClick();
    setExpandedQuestionId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zur Übersicht</span>
            </button>
          )}
        </div>

        {onStartReview && (
          <button
            onClick={onStartReview}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Fehler-Wiederholung starten</span>
          </button>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
            <Target className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Genauigkeit</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            {accuracy}%
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3 mb-3 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Richtig gelöst</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            {totalCorrect}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Von insgesamt {totalAnswered} Fragen</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3 mb-3 text-amber-600 dark:text-amber-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Streak</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            {stats.currentCombo}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Bester Streak: {stats.maxCombo}</p>
        </div>
      </div>

      {/* Chapter Mastery List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Themen-Mastery</h3>
              <p className="text-[11px] text-slate-500 uppercase tracking-tighter">Dein Fortschritt pro Kapitel</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {chapterMastery.map((item) => (
            <div key={item.id} className="space-y-2 group">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{item.title}</span>
                  {onGoToChapter && (
                    <button
                      onClick={() => onGoToChapter(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Öffnen</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">{item.mastery}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${Math.max(item.mastery, 4)}%`,
                    backgroundColor: item.mastery > 0 ? '#6366f1' : '#cbd5e1'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Areas / Expandable Problematic Questions */}
      {problematicQuestions.length > 0 && (
        <div className="bg-rose-50/40 dark:bg-rose-950/10 rounded-2xl border border-rose-100 dark:border-rose-900/30 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h3 className="font-bold text-base">Fokus-Bereiche</h3>
                <p className="text-xs text-rose-800/80 dark:text-rose-300/80 mt-0.5 leading-relaxed">
                  Diese Fragen hast du öfter falsch beantwortet. Klicke auf eine Frage zum Aufklappen von Musterlösung, Merksatz und IHK-Hintergrundanalyse.
                </p>
              </div>
            </div>

            {onStartReview && (
              <button
                onClick={onStartReview}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Jetzt üben</span>
              </button>
            )}
          </div>

          <div className="space-y-3 pt-1">
            {problematicQuestions.map(([id, data]) => {
              const question = questionsMap.get(id);
              const isExpanded = expandedQuestionId === id;
              const correctOption = question?.options.find(o => o.isCorrect);
              const chapter = chapters.find(c => c.id === question?.chapterId);

              return (
                <div 
                  key={id}
                  className="bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/40 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
                >
                  {/* Card Header / Accordion Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 hover:bg-rose-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-md text-[10px] font-extrabold tracking-wider uppercase">
                          {data.wrongCount}x falsch
                        </span>
                        {chapter && (
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-[10px] font-semibold">
                            Kapitel {chapter.number}: {chapter.title}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          #ID {id}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                        {question ? question.question : `Frage #${id}`}
                      </h4>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Card Body / Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200 text-xs sm:text-sm">
                      {/* Scenario if available */}
                      {question?.scenario && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                          <span className="font-bold not-italic text-slate-700 dark:text-slate-200 block mb-1">
                            Szenario / Ausgangslage:
                          </span>
                          {question.scenario}
                        </div>
                      )}

                      {/* Correct Answer */}
                      {correctOption && (
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Fachlich korrekte IHK-Lösung:</span>
                          </div>
                          <p className="font-semibold text-emerald-950 dark:text-emerald-200">
                            {correctOption.text}
                          </p>
                          {correctOption.explanation && (
                            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed pt-1 border-t border-emerald-200/60 dark:border-emerald-900/30">
                              {correctOption.explanation}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Merksatz or Exam Tip */}
                      {(question?.merksatz || question?.examTip) && (
                        <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                            <Lightbulb className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span>{question.merksatz ? 'IHK-Merksatz' : 'Prüfer-Tipp'}:</span>
                          </div>
                          <p className="leading-relaxed">
                            {question.merksatz || question.examTip}
                          </p>
                        </div>
                      )}

                      {/* Performance Bar & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                          <span>Falsch: <b className="text-rose-600 dark:text-rose-400">{data.wrongCount}x</b></span>
                          <span>·</span>
                          <span>Richtig: <b className="text-emerald-600 dark:text-emerald-400">{data.correctCount}x</b></span>
                        </div>

                        {question && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                soundEffects.playClick();
                                setDossierQuestion(question);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Ausführliche IHK-Infos öffnen</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Spaced Repetition Info */}
      <div className="bg-indigo-50/50 dark:bg-indigo-950/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 p-5 flex items-start gap-4">
        <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-700 dark:text-indigo-400 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm mb-1">Intelligente Wiederholung aktiv</h4>
          <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
            Dein Lern-Algorithmus priorisiert Fragen, die du zuletzt falsch beantwortet hast oder die schon länger her sind. So festigst du dein IHK-Wissen am effektivsten.
          </p>
        </div>
      </div>

      {/* Erfolge / Badges Section Moved to Dedicated Gamification View */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl shadow-xs shrink-0">
              🏆
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Gamification & Belohnungen
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Errungenschaften & Meilensteine
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Alle freigeschalteten Abzeichen, Quiz-Meilensteine und XP-Belohnungen im eigenen Menübereich.
              </p>
            </div>
          </div>
          {onGoToAchievements && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onGoToAchievements();
              }}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Zu den Errungenschaften</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Question Detail Modal */}
      {dossierQuestion && (
        <QuestionDetailModal
          question={dossierQuestion}
          selectedOption={null}
          bionic={bionic}
          onClose={() => setDossierQuestion(null)}
        />
      )}
    </div>
  );
};

