import React, { useState } from 'react';
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
import { ArrowLeft, ArrowRight, CheckCircle2, Star, Sparkles, HelpCircle, Gamepad2 } from 'lucide-react';

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
  const [viewState, setViewState] = useState<'learn' | 'minigame' | 'quiz'>('learn');

  const currentNugget = module.nuggets[currentNuggetIndex];
  const isLastNugget = currentNuggetIndex === module.nuggets.length - 1;

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
    }
  };

  const prevNugget = () => {
    soundEffects.playClick();
    setCurrentNuggetIndex(i => Math.max(0, i - 1));
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
          <span className="font-semibold text-slate-800">{module.title}</span>
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
          <span>Wissens-Check ({module.quizQuestions.length} Fragen)</span>
        </button>
      </div>

      {/* 1. LEARN VIEW (Micro-chunk cards) */}
      {viewState === 'learn' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                HÄPPCHEN {currentNuggetIndex + 1} VON {module.nuggets.length}
              </span>
              {currentNugget.examFavorite && (
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  Prüfungsfavorit
                </span>
              )}
            </div>

            {/* Stepper dots */}
            <div className="flex items-center gap-1">
              {module.nuggets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentNuggetIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                    i === currentNuggetIndex ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                  }`}
                  aria-label={`Gehe zu Häppchen ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              <BionicText text={currentNugget.title} enabled={bionic} />
            </h3>
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-4 bg-indigo-50/60 dark:bg-indigo-950/40 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
              <BionicText text={currentNugget.coreConcept} enabled={bionic} />
            </p>
          </div>

          <div className="space-y-3">
            {currentNugget.bulletPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                <p className="leading-relaxed">
                  <BionicText text={point} enabled={bionic} />
                </p>
              </div>
            ))}
          </div>

          {currentNugget.example && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[10px] tracking-wider">
                Praxis-Beispiel:
              </div>
              <p className="italic">
                <BionicText text={currentNugget.example} enabled={bionic} />
              </p>
            </div>
          )}

          {currentNugget.merksatz && (
            <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold text-amber-800 dark:text-amber-300 uppercase text-[10px] tracking-wider">
                Prüfungs-Merksatz:
              </div>
              <p className="font-medium">
                "{currentNugget.merksatz}"
              </p>
            </div>
          )}

          {/* Interactive SQL Query Builder for Module db-2 */}
          {module.id === 'db-2' && (
            <SqlBuilderWidget />
          )}

          {/* Interactive JSON Inspector & Live UI Mapper for Module db-4 */}
          {module.id === 'db-4' && (
            <JsonInspectorWidget />
          )}

          {/* Interactive Single Source & Multi-Channel Simulator for Module med-2 */}
          {module.id === 'med-2' && (
            <CrossmediaPublishingWidget />
          )}

          {/* Interactive XML Inspector & Well-Formedness Lab for Module med-4 */}
          {module.id === 'med-4' && (
            <XmlInspectorWidget />
          )}

          {/* Bottom Card Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={prevNugget}
              disabled={currentNuggetIndex === 0}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Vorheriges
            </button>

            <button
              onClick={nextNugget}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isLastNugget ? (module.miniGameType ? 'Zur Mini-Challenge' : 'Zum Wissens-Check') : 'Nächstes Häppchen'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
