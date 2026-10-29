import React, { useState, useRef } from 'react';
import { LearningModule, Chapter } from '../types/quiz';
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
import { ArrowLeft, ArrowRight, CheckCircle2, Star, Sparkles, HelpCircle, Gamepad2, Lightbulb } from 'lucide-react';

interface Props {
  chapter: Chapter;
  module: LearningModule;
  bionic: boolean;
  onBack: () => void;
  onModuleCompleted: (moduleId: string, gainedXp: number) => void;
  onNextModule?: () => void;
  hasNextModule?: boolean;
}

export const ModuleLearningView: React.FC<Props> = ({
  chapter,
  module,
  bionic,
  onBack,
  onModuleCompleted,
  onNextModule,
  hasNextModule = false,
}) => {
  const [currentNuggetIndex, setCurrentNuggetIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); // Tracks how many parts of the nugget are revealed
  const [viewState, setViewState] = useState<'learn' | 'minigame' | 'quiz'>('learn');

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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
          <span>Kapitel {chapter.number}</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{module.title}</span>
        </div>
      </div>

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
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Quiz ({module.quizQuestions.length})</span>
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
              onComplete={score => {
                onModuleCompleted(module.id, score);
              }}
            />
          )}

          {module.miniGameType === 'phishing' && (
            <PhishingDetectorGame
              onComplete={score => {
                onModuleCompleted(module.id, score);
              }}
            />
          )}

          {module.miniGameType === 'process_order' && (
            <ProcessSorterGame
              onComplete={score => {
                onModuleCompleted(module.id, score);
              }}
            />
          )}

          {module.miniGameType === 'wcag_match' && (
            <WcagMatchGame
              onComplete={score => {
                onModuleCompleted(module.id, score);
              }}
            />
          )}

          <div className="mt-4 text-center">
            <button
              onClick={() => setViewState('quiz')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
            >
              Weiter zum Wissens-Check <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. QUIZ VIEW */}
      {viewState === 'quiz' && (
        <QuizCard
          questions={module.quizQuestions}
          bionic={bionic}
          onFinished={score => {
            onModuleCompleted(module.id, score);
          }}
          onBackToOverview={onBack}
          onNextModule={onNextModule}
          hasNextModule={hasNextModule}
        />
      )}
    </div>
  );
};
