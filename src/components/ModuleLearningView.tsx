import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LearningModule, Chapter } from '../types/quiz';
import { getModuleLevel2Questions } from '../data/chaptersData';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import { QuizCard } from './QuizCard';
import { AffordanceSignifierGame } from './InteractiveMinigames/AffordanceSignifierGame';
import { PhishingDetectorGame } from './InteractiveMinigames/PhishingDetectorGame';
import { ProcessSorterGame } from './InteractiveMinigames/ProcessSorterGame';
import { WcagMatchGame } from './InteractiveMinigames/WcagMatchGame';
import { SqlBuilderWidget } from './SqlBuilderWidget';
import { JsonInspectorWidget } from './JsonInspectorWidget';
import { CrossmediaPublishingWidget } from './CrossmediaPublishingWidget';
import { XmlInspectorWidget } from './XmlInspectorWidget';
import { ModuleSummaryModal } from './ModuleSummaryModal';
import { ArrowLeft, ArrowRight, CheckCircle2, Star, Sparkles, HelpCircle, Gamepad2, Lightbulb, Zap, BookOpen } from 'lucide-react';

interface Props {
  chapter: Chapter;
  module: LearningModule;
  bionic: boolean;
  initialLevel?: 1 | 2;
  isLevel1Completed?: boolean;
  isLevel2Completed?: boolean;
  onBack: () => void;
  onModuleCompleted: (moduleId: string, gainedXp: number, level: 1 | 2) => void;
  onCorrectAnswer?: () => void;
  onAnswer?: (questionId: string, isCorrect: boolean) => void;
  onNextModule?: () => void;
  hasNextModule?: boolean;
}

export const ModuleLearningView: React.FC<Props> = ({
  chapter,
  module,
  bionic,
  initialLevel = 1,
  isLevel1Completed = false,
  isLevel2Completed = false,
  onBack,
  onModuleCompleted,
  onCorrectAnswer,
  onAnswer,
  onNextModule,
  hasNextModule = false,
}) => {
  const [currentLevel, setCurrentLevel] = useState<1 | 2>(initialLevel);
  const [currentNuggetIndex, setCurrentNuggetIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); // Tracks how many parts of the nugget are revealed
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [viewState, setViewState] = useState<'learn' | 'minigame' | 'quiz'>(() => {
    if (initialLevel === 2) {
      return module.miniGameType ? 'minigame' : 'quiz';
    }
    return 'learn';
  });
  const [accumulatedXp, setAccumulatedXp] = useState(0);

  useEffect(() => {
    setCurrentLevel(initialLevel);
    setShowSummaryModal(false);
    setAccumulatedXp(0);
    if (initialLevel === 2) {
      setViewState(module.miniGameType ? 'minigame' : 'quiz');
    } else {
      setViewState('learn');
    }
  }, [initialLevel, module.id, module.miniGameType]);

  const nuggetViewRef = useRef<HTMLDivElement>(null);

  const currentNugget = module.nuggets[currentNuggetIndex];
  const isLastNugget = currentNuggetIndex === module.nuggets.length - 1;

  // Total steps in current nugget: 1 (title/concept) + bullets + 1 (example if exists) + 1 (merksatz if exists)
  const totalSteps = 1 + currentNugget.bulletPoints.length + (currentNugget.example ? 1 : 0) + (currentNugget.merksatz ? 1 : 0);
  const isNuggetComplete = stepIndex >= totalSteps - 1;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    if (nuggetViewRef.current) {
      nuggetViewRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  const nextStep = () => {
    soundEffects.playClick();
    if (!isNuggetComplete) {
      setStepIndex(prev => prev + 1);
    } else {
      nextNugget();
    }
  };

  const nextNugget = () => {
    soundEffects.playClick();
    if (isLastNugget) {
      if (module.miniGameType) {
        setViewState('minigame');
      } else {
        setViewState('quiz');
      }
    } else {
      setCurrentNuggetIndex(i => i + 1);
      setStepIndex(0);
      scrollToTop();
    }
  };

  const prevNugget = () => {
    soundEffects.playClick();
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    } else if (currentNuggetIndex > 0) {
      setCurrentNuggetIndex(i => i - 1);
      // When going back, show all steps of the previous nugget
      const prevNug = module.nuggets[currentNuggetIndex - 1];
      const prevTotalSteps = 1 + prevNug.bulletPoints.length + (prevNug.example ? 1 : 0) + (prevNug.merksatz ? 1 : 0);
      setStepIndex(prevTotalSteps - 1);
      scrollToTop();
    }
  };

  const activeQuestions = useMemo(() => {
    return currentLevel === 2 ? getModuleLevel2Questions(module) : module.quizQuestions;
  }, [currentLevel, module]);

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
      {/* Header with Back button and progress */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Übersicht</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setShowSummaryModal(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] hover:bg-indigo-100 transition-colors flex items-center gap-1 cursor-pointer"
            title="Wissens-Zusammenfassung des Moduls öffnen"
          >
            <BookOpen className="w-3 h-3" />
            <span>Zusammenfassung lesen</span>
          </button>
          <span className="hidden sm:inline">Kapitel {chapter.number}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-md">{module.title}</span>
        </div>
      </div>

      {/* Level Switcher (Level 1: Grundlagen vs Level 2: Meisterstufe) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => {
              soundEffects.playClick();
              setCurrentLevel(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentLevel === 1
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Level 1: Grundlagen</span>
            {isLevel1Completed && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">✓</span>
            )}
          </button>

          <button
            onClick={() => {
              if (!isLevel1Completed) return;
              soundEffects.playClick();
              setCurrentLevel(2);
              if (module.miniGameType) {
                setViewState('minigame');
              } else {
                setViewState('quiz');
              }
            }}
            disabled={!isLevel1Completed}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              currentLevel === 2
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : isLevel1Completed
                ? 'text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                : 'text-slate-400'
            }`}
            title={isLevel1Completed ? 'Level 2 Meisterstufe spielen' : 'Erst Level 1 abschließen zum Freischalten'}
          >
            <Star className={`w-3.5 h-3.5 ${currentLevel === 2 ? 'fill-slate-950' : 'fill-amber-500 text-amber-500'}`} />
            <span>Level 2: Meister</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-amber-200/80 dark:bg-amber-900/60 text-slate-950 dark:text-amber-100 font-bold">
              +50% EXP
            </span>
            {isLevel2Completed && <span className="text-amber-600 dark:text-amber-400 font-bold">★</span>}
          </button>
        </div>

        <div className="flex items-center gap-2 px-2 text-xs">
          {currentLevel === 2 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-amber-600 dark:text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              1.5x EXP Multiplikator aktiv!
            </span>
          ) : isLevel1Completed ? (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Tipp: Schalte auf <strong>Level 2</strong> für 50% mehr EXP!
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">
              Schließe Level 1 ab, um Level 2 freizuschalten.
            </span>
          )}
        </div>
      </div>

      {/* Level 2 Mastery Context Banner */}
      {currentLevel === 2 && (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-amber-200 dark:shadow-none shadow-sm shrink-0">
              <Star className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white">
                  IHK-Transferfragen & Praxisfälle
                </span>
                <span className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100">
                  LEVEL 2 MEISTER
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                Beantworte anspruchsvolle Situationsaufgaben aus realen IHK-Prüfungen und sichere dir <strong>50% mehr EXP</strong>.
              </p>
            </div>
          </div>

          {viewState !== 'quiz' && (
            <button
              onClick={() => {
                soundEffects.playClick();
                setViewState('quiz');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shrink-0 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              Zum Meister-Quiz ({activeQuestions.length})
            </button>
          )}
        </div>
      )}

      {/* Mode navigation tabs (Learn / MiniGame / Quiz) */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-medium">
        <button
          onClick={() => {
            soundEffects.playClick();
            setViewState('learn');
          }}
          className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            viewState === 'learn'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lern-Häppchen</span>
        </button>

        {module.miniGameType && (
          <button
            onClick={() => {
              soundEffects.playClick();
              setViewState('minigame');
            }}
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              viewState === 'minigame'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Mini-Challenge</span>
          </button>
        )}

        <button
          onClick={() => {
            soundEffects.playClick();
            setViewState('quiz');
          }}
          className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            viewState === 'quiz'
              ? currentLevel === 2
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{currentLevel === 2 ? 'Meister-Quiz' : 'Quiz'} ({activeQuestions.length})</span>
        </button>
      </div>

      {/* 1. LEARN VIEW (Micro-chunk cards) */}
      {viewState === 'learn' && (
        <div ref={nuggetViewRef} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors scroll-mt-24">
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentNuggetIndex) / module.nuggets.length) * 100 + ((stepIndex + 1) / totalSteps) * (100 / module.nuggets.length)}%` }}
            />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tabular-nums uppercase">
                Häppchen {currentNuggetIndex + 1}/{module.nuggets.length}
              </span>
              {currentNugget.examFavorite && (
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  IHK-Fokus
                </span>
              )}
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Schritt {stepIndex + 1} von {totalSteps}
            </div>
          </div>

          {/* Step 0: Title & Core Concept */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              <BionicText text={currentNugget.title} enabled={bionic} />
            </h3>
            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 leading-relaxed">
              <BionicText text={currentNugget.coreConcept} enabled={bionic} />
            </p>
          </div>

          {/* Steps 1 to N: Bullet Points */}
          <div className="space-y-4">
            {currentNugget.bulletPoints.map((point, idx) => (
              idx < stepIndex && (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-800 dark:text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed font-medium pt-0.5">
                    <BionicText text={point} enabled={bionic} />
                  </p>
                </div>
              )
            ))}
          </div>

          {/* Step N+1: Example */}
          {currentNugget.example && stepIndex >= (1 + currentNugget.bulletPoints.length) && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Praxis-Beispiel:
              </div>
              <p className="italic font-medium leading-relaxed">
                <BionicText text={currentNugget.example} enabled={bionic} />
              </p>
            </div>
          )}

          {/* Step N+2: Merksatz */}
          {currentNugget.merksatz && stepIndex >= (totalSteps - 1) && (
            <div className="p-4 bg-amber-50/90 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-100 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="font-extrabold text-amber-700 dark:text-amber-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                IHK-Prüfungs-Merksatz:
              </div>
              <p className="font-bold text-[13px] leading-snug">
                "{currentNugget.merksatz}"
              </p>
            </div>
          )}

          {/* Interactive Widgets (Shown at the end of the nugget) */}
          {isNuggetComplete && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-500">
              {module.id === 'db-2' && <SqlBuilderWidget />}
              {module.id === 'db-4' && <JsonInspectorWidget />}
              {module.id === 'med-2' && <CrossmediaPublishingWidget />}
              {module.id === 'med-4' && <XmlInspectorWidget />}
            </div>
          )}

          {/* Bottom Card Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={prevNugget}
              disabled={currentNuggetIndex === 0 && stepIndex === 0}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>

            <button
              onClick={isNuggetComplete ? nextNugget : nextStep}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-extrabold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>
                {!isNuggetComplete 
                  ? 'Weiterlesen' 
                  : (isLastNugget ? (module.miniGameType ? 'Zur Mini-Challenge' : 'Zum Wissens-Check') : 'Nächstes Häppchen')
                }
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. MINIGAME VIEW */}
      {viewState === 'minigame' && (
        <div>
          {module.miniGameType === 'affordance' && (
            <AffordanceSignifierGame
              isLevel2={currentLevel === 2}
              onComplete={score => {
                const finalXp = currentLevel === 2 ? Math.round(score * 1.5) : score;
                setAccumulatedXp(prev => prev + finalXp);
                setViewState('quiz');
              }}
            />
          )}

          {module.miniGameType === 'phishing' && (
            <PhishingDetectorGame
              isLevel2={currentLevel === 2}
              onComplete={score => {
                const finalXp = currentLevel === 2 ? Math.round(score * 1.5) : score;
                setAccumulatedXp(prev => prev + finalXp);
                setViewState('quiz');
              }}
            />
          )}

          {module.miniGameType === 'process_order' && (
            <ProcessSorterGame
              isLevel2={currentLevel === 2}
              onComplete={score => {
                const finalXp = currentLevel === 2 ? Math.round(score * 1.5) : score;
                setAccumulatedXp(prev => prev + finalXp);
                setViewState('quiz');
              }}
            />
          )}

          {module.miniGameType === 'wcag_match' && (
            <WcagMatchGame
              isLevel2={currentLevel === 2}
              onComplete={score => {
                const finalXp = currentLevel === 2 ? Math.round(score * 1.5) : score;
                setAccumulatedXp(prev => prev + finalXp);
                setViewState('quiz');
              }}
            />
          )}

        </div>
      )}

      {/* 3. QUIZ VIEW */}
      {viewState === 'quiz' && (
        <QuizCard
          key={`quiz-${module.id}-lvl${currentLevel}`}
          questions={activeQuestions}
          bionic={bionic}
          isLevel2={currentLevel === 2}
          onFinished={score => {
            const finalXp = currentLevel === 2 ? Math.round(score * 1.5) : score;
            const completionBonus = currentLevel === 2 ? 22 : 15; // 15 base + 50% for Lvl 2
            onModuleCompleted(module.id, finalXp + accumulatedXp + completionBonus, currentLevel);
            if (currentLevel === 1) {
              setShowSummaryModal(true);
            }
          }}
          onCorrectAnswer={onCorrectAnswer}
          onAnswer={onAnswer}
          onBackToOverview={onBack}
          onNextModule={onNextModule}
          hasNextModule={hasNextModule}
        />
      )}

      {/* Module Summary Modal */}
      {showSummaryModal && (
        <ModuleSummaryModal
          module={module}
          chapterTitle={chapter.title}
          chapterNumber={chapter.number}
          bionic={bionic}
          isLevel1Completed={isLevel1Completed}
          isLevel2Completed={isLevel2Completed}
          onClose={() => setShowSummaryModal(false)}
          onNextModule={onNextModule}
          hasNextModule={hasNextModule}
          onStartLevel2={() => {
            setShowSummaryModal(false);
            setCurrentLevel(2);
            if (module.miniGameType) {
              setViewState('minigame');
            } else {
              setViewState('quiz');
            }
          }}
          onRepeatLevel1={() => {
            setShowSummaryModal(false);
            setCurrentLevel(1);
            setViewState('learn');
          }}
        />
      )}
    </div>
  );
};
