import React, { useState } from 'react';
import { BlitzItem } from '../utils/blitzContent';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Star,
  Sparkles,
  Shuffle,
  Award,
  RotateCcw,
} from 'lucide-react';
import { QuestionAssetWidget } from './QuestionAssetWidget';

interface Props {
  items: BlitzItem[];
  bionic: boolean;
  onFinished: (score: number, totalXp: number) => void;
  onCorrectAnswer: () => void;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
  onBack: () => void;
}

export const DidacticMixUpView: React.FC<Props> = ({
  items,
  bionic,
  onFinished,
  onCorrectAnswer,
  onAnswer,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = items.length;
  const currentItem = items[currentIndex];
  const totalQuestions = items.filter(it => it.type === 'quiz').length;

  const progressPercent = Math.round(((currentIndex + 1) / totalSteps) * 100);

  const handleOptionSelect = (optionId: string) => {
    if (isAnswerChecked || currentItem.type !== 'quiz') return;
    setSelectedOptionId(optionId);
    setIsAnswerChecked(true);

    const chosenOption = currentItem.options.find(o => o.id === optionId);
    const isCorrect = Boolean(chosenOption?.isCorrect);

    if (isCorrect) {
      soundEffects.playCorrect();
      setScore(prev => prev + 1);
      onCorrectAnswer();
    } else {
      soundEffects.playWrong();
    }

    setAnsweredCount(prev => prev + 1);
    onAnswer(currentItem.id, isCorrect);
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      soundEffects.playLevelUp();
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setScore(0);
    setAnsweredCount(0);
    setIsFinished(false);
  };

  const handleCompleteSession = () => {
    soundEffects.playClick();
    const totalXp = score * 20 + 50; // 20 XP per correct question + 50 XP completion bonus
    onFinished(score, totalXp);
  };

  // Summary / Finished Screen
  if (isFinished) {
    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;
    const earnedXp = score * 20 + 50;
    const earnedCoins = score * 5 + 15;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Mix-Up Abgeschlossen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Hervorragend gelernt!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Du hast alle Wissenskarten durchgearbeitet und die dazugehörigen IHK-Prüfungsfragen gemeistert.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">Richtig</div>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {score} / {totalQuestions}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">Quote</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {accuracy}%
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">Belohnung</div>
              <div className="text-xl font-black text-amber-500 font-mono flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-500" />
                <span>+{earnedXp}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Zusätzlicher Münzbonus: <span className="font-bold text-amber-600 dark:text-amber-400">+{earnedCoins} 🪙</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mix-Up wiederholen</span>
            </button>

            <button
              onClick={handleCompleteSession}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Belohnung einsammeln & Übersicht</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      {/* Top Bar Navigation & Progress */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Mix-Up beenden</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 rounded-lg text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
            <Shuffle className="w-3.5 h-3.5" />
            <span>Individueller Themen-Mix</span>
          </div>
        </div>

        {/* Step & Score info */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-xs">
          <div className="font-semibold text-slate-500 dark:text-slate-400">
            Schritt <span className="font-bold text-slate-900 dark:text-white font-mono">{currentIndex + 1}</span> von {totalSteps}
          </div>

          {totalQuestions > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{score} richtig</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Card Content: Knowledge Card or Quiz Card */}
      {currentItem.type === 'knowledge' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>{currentItem.category}</span>
            </div>

            {currentItem.examFavorite && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-300 text-[11px] font-black">
                <Star className="w-3 h-3 fill-amber-500" />
                <span>IHK-Prüfungsschwerpunkt</span>
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              <BionicText text={currentItem.title} enabled={bionic} />
            </h2>
          </div>

          {/* Core Concept */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 text-indigo-950 dark:text-indigo-200 leading-relaxed text-sm sm:text-base font-medium">
            <BionicText text={currentItem.coreConcept} enabled={bionic} />
          </div>

          {/* Bullet Points */}
          {currentItem.bulletPoints && currentItem.bulletPoints.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Wichtige Kernpunkte
              </h4>
              <ul className="space-y-2">
                {currentItem.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                    <span><BionicText text={bp} enabled={bionic} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Example */}
          {currentItem.example && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block mb-0.5">
                  Praxisbeispiel
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <BionicText text={currentItem.example} enabled={bionic} />
                </p>
              </div>
            </div>
          )}

          {/* Merksatz */}
          {currentItem.merksatz && (
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-200 dark:bg-amber-800/60 text-amber-800 dark:text-amber-200 shrink-0">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-0.5">
                  Prüfungs-Merksatz
                </span>
                <p className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-100 leading-relaxed">
                  <BionicText text={currentItem.merksatz} enabled={bionic} />
                </p>
              </div>
            </div>
          )}

          {/* Transition to questions button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Wissen verstanden – Zu den Fragen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Question Item */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <span>{currentItem.category}</span>
            </div>

            {currentItem.linkedFromNuggetTitle && (
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Bezug: <span className="font-semibold">{currentItem.linkedFromNuggetTitle}</span>
              </span>
            )}
          </div>

          {/* Question */}
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-relaxed">
              <BionicText text={currentItem.question} enabled={bionic} />
            </h3>
            {currentItem.asset && (
              <QuestionAssetWidget asset={currentItem.asset} />
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentItem.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.isCorrect;

              let optionStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-800 dark:text-slate-200';
              let letterBadge = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700';

              if (isAnswerChecked) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500/20';
                  letterBadge = 'bg-emerald-500 text-white border-transparent';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200 line-through opacity-85';
                  letterBadge = 'bg-rose-500 text-white border-transparent';
                } else {
                  optionStyle = 'opacity-40 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  disabled={isAnswerChecked}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${optionStyle} ${
                    !isAnswerChecked ? 'hover:scale-[1.005] active:scale-[0.995]' : ''
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${letterBadge}`}>
                    {letter}
                  </span>

                  <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                    <BionicText text={opt.text} enabled={bionic} />
                  </div>

                  {isAnswerChecked && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation / Merksatz Feedback */}
          {isAnswerChecked && (
            <div className="space-y-3 animate-fade-in">
              {currentItem.merksatz && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                  <Star className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">IHK-Prüfungs-Merksatz:</span>
                    <BionicText text={currentItem.merksatz} enabled={bionic} />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>{currentIndex < totalSteps - 1 ? 'Nächster Schritt' : 'Ergebnis ansehen'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
