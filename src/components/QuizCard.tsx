import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizOption } from '../types/quiz';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, ArrowRight, RotateCcw, Award, Lightbulb, Star, Sparkles } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  bionic: boolean;
  onFinished: (score: number) => void;
  onCorrectAnswer?: () => void;
  onBackToOverview?: () => void;
  onNextModule?: () => void;
  hasNextModule?: boolean;
}

export const QuizCard: React.FC<Props> = ({
  questions,
  bionic,
  onFinished,
  onCorrectAnswer,
  onBackToOverview,
  onNextModule,
  hasNextModule = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [comboToast, setComboToast] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex] || questions[0];

  const showComboFeedback = (msg: string) => {
    setComboToast(msg);
    setTimeout(() => setComboToast(null), 2800);
  };

  // Keyboard navigation: 1, 2, 3, 4 or Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted || !currentQuestion) return;

      if (!selectedOptionId) {
        const keyNum = parseInt(e.key, 10);
        if (keyNum >= 1 && keyNum <= currentQuestion.options.length) {
          const opt = currentQuestion.options[keyNum - 1];
          handleSelectOption(opt);
        }
      } else if (e.key === 'Enter') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedOptionId, isCompleted, currentQuestion]);

  const handleSelectOption = (opt: QuizOption) => {
    if (selectedOptionId !== null) return; // Already selected

    setSelectedOptionId(opt.id);
    const isCorrect = opt.isCorrect;

    setAnswers(prev => ({ ...prev, [currentIndex]: isCorrect }));

    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      soundEffects.playCorrect(nextCombo);
      setScore(s => s + 100 * nextCombo);
      setCorrectCount(c => c + 1);
      if (onCorrectAnswer) {
        onCorrectAnswer();
      }

      if (nextCombo > 0 && nextCombo % 3 === 0) {
        showComboFeedback(`🔥 ${nextCombo}ER-COMBO! +25 EXTRA EXP BONUS! 🎉`);
        try {
          confetti({ particleCount: 55, spread: 75, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    } else {
      soundEffects.playWrong();
      setCombo(0);
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    setSelectedOptionId(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsCompleted(true);
      soundEffects.playLevelUp();
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch {
        // ignore
      }
      onFinished(score);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setCombo(0);
    setScore(0);
    setCorrectCount(0);
    setAnswers({});
    setIsCompleted(false);
  };

  if (!currentQuestion) {
    return null;
  }

  if (isCompleted) {
    const percent = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-xs transition-colors">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Award className="w-9 h-9" />
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">
          Wissens-Check abgeschlossen!
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          Du hast <span className="font-bold text-slate-900 dark:text-white">{correctCount}</span> von <span className="font-bold text-slate-900 dark:text-white">{questions.length}</span> Fragen richtig beantwortet ({percent}%).
        </p>

        {/* Results pills overview */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                answers[idx]
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
              }`}
            >
              {answers[idx] ? '✓' : '✗'}
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-amber-50 dark:from-indigo-950/40 dark:to-amber-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50 font-mono text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-6 tabular-nums">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>+{score} ⭐ EXP für dein Haustier</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {hasNextModule && onNextModule && (
            <button
              onClick={onNextModule}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <span>Nächstes Modul starten</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onBackToOverview && (
            <button
              onClick={onBackToOverview}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98 ${
                hasNextModule && onNextModule
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <span>Zur Kapitelübersicht</span>
            </button>
          )}

          <button
            onClick={restart}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Fragen wiederholen</span>
          </button>
        </div>
      </div>
    );
  }

  const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors space-y-6 relative">
      {/* Dopamine Combo Floating Toast */}
      {comboToast && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-black text-xs sm:text-sm rounded-full shadow-xl animate-bounce flex items-center gap-1.5 whitespace-nowrap">
          <span>{comboToast}</span>
        </div>
      )}

      {/* Top progress strip with Question Stepper Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[11px]">
            FRAGE {currentIndex + 1} / {questions.length}
          </span>

          {/* Stepper Pills */}
          <div className="flex items-center gap-1.5 ml-2">
            {questions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCorrect = answers[idx] === true;
              const isCurrent = idx === currentIndex;

              return (
                <div
                  key={idx}
                  className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'ring-2 ring-indigo-500 bg-indigo-600 text-white font-extrabold'
                      : isAnswered
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isAnswered ? (isCorrect ? '✓' : '✗') : idx + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Combo & XP Indicator */}
        <div className="flex items-center gap-3">
          {combo > 1 && (
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1 animate-pulse">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              {combo}x Combo!
            </span>
          )}
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold tabular-nums bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800/60">
            {score} XP
          </span>
        </div>
      </div>

      {/* Question */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          <BionicText text={currentQuestion.question} enabled={bionic} />
        </h3>
        {currentQuestion.scenario && (
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
            {currentQuestion.scenario}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQuestion.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          const isRevealed = selectedOptionId !== null;

          let btnClass = 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-800 dark:text-slate-200';

          if (isRevealed) {
            if (opt.isCorrect) {
              btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold';
            } else if (isSelected && !opt.isCorrect) {
              btnClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200';
            } else {
              btnClass = 'bg-slate-50/60 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              disabled={isRevealed}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
            >
              <div className="flex items-center gap-3 pr-2">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                  isRevealed && opt.isCorrect
                    ? 'bg-emerald-600 text-white'
                    : isRevealed && isSelected && !opt.isCorrect
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {idx + 1}
                </span>

                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  <BionicText text={opt.text} enabled={bionic} />
                </span>
              </div>

              {isRevealed && (
                <div className="shrink-0">
                  {opt.isCorrect ? (
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : isSelected ? (
                    <X className="w-5 h-5 text-rose-500" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanatory Feedback when answered */}
      {selectedOption && (
        <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-fade-in ${
          selectedOption.isCorrect
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="font-bold flex items-center gap-1.5">
            {selectedOption.isCorrect ? '✓ Richtig!' : '✗ Leider nicht ganz richtig'}
          </div>
          <p>{selectedOption.explanation}</p>

          {currentQuestion.merksatz && (
            <div className="pt-2 border-t border-emerald-200/50 dark:border-emerald-800/50 flex items-start gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
              <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Prüfungs-Merksatz: {currentQuestion.merksatz}</span>
            </div>
          )}

          {currentQuestion.examTip && (
            <div className="pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50 flex items-start gap-1.5 text-indigo-800 dark:text-indigo-300 font-semibold">
              <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Tipp: {currentQuestion.examTip}</span>
            </div>
          )}
        </div>
      )}

      {/* Next Question Button */}
      {selectedOptionId !== null && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Tipp: Drücke <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono text-[10px]">Enter ↵</kbd> zum Fortfahren
          </span>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ml-auto active:scale-98"
          >
            <span>{currentIndex + 1 < questions.length ? 'Nächste Frage' : 'Ergebnis auswerten'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
