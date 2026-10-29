import React, { useState, useEffect } from 'react';
import { EXAM_QUESTIONS } from '../../data/examQuestions';
import { QuizQuestion } from '../../types/quiz';
import { soundEffects } from '../../services/audioService';
import { Timer, Zap, Trophy, RotateCcw, CheckCircle2, XCircle, Flame, Sparkles } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

export const SpeedQuizGame: React.FC<Props> = ({ onComplete }) => {
  const QUESTION_TIME = 12; // 12 seconds per question
  const TOTAL_QUESTIONS = 8;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize random questions
  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...EXAM_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setTimeLeft(QUESTION_TIME);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTotalXpEarned(0);
    setIsGameOver(false);
  };

  // Timer Countdown
  useEffect(() => {
    if (isGameOver || isAnswered || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, isGameOver, questions]);

  const handleTimeOut = () => {
    soundEffects.playWrong();
    setIsAnswered(true);
    setStreak(0);

    setTimeout(() => {
      nextQuestion();
    }, 1800);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const chosen = currentQ.options.find(o => o.id === optionId);

    if (chosen?.isCorrect) {
      soundEffects.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      setCorrectCount(prev => prev + 1);

      // Calculate XP bonus: base 25 + time bonus + streak multiplier
      const speedBonus = Math.round(timeLeft * 2.5);
      const multiplier = newStreak >= 3 ? 2 : 1;
      const earned = (25 + speedBonus) * multiplier;

      setTotalXpEarned(prev => prev + earned);
    } else {
      soundEffects.playWrong();
      setStreak(0);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1800);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME);
    } else {
      setIsGameOver(true);
      soundEffects.playLevelUp();
      onComplete(totalXpEarned);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Lade Speed-Quiz Quest...
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  if (isGameOver) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-md text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-500">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Speed-Quest Abgeschlossen!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Du hast deinen Speed-Run erfolgreich gemeistert!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500">Richtig</div>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {correctCount} / {TOTAL_QUESTIONS}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500">Max Combo</div>
            <div className="text-lg font-extrabold text-amber-500 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{maxStreak}x</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">EXP Belohnung</div>
            <div className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>+{totalXpEarned}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={restartGame}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Erneut spielen</span>
          </button>
        </div>
      </div>
    );
  }

  const timerPercent = (timeLeft / QUESTION_TIME) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Frage {currentIndex + 1} von {TOTAL_QUESTIONS}
          </span>
          {streak >= 2 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500 text-white flex items-center gap-1 animate-pulse shadow-2xs">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>{streak}x Combo!</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>+{totalXpEarned} EXP</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            <Timer className="w-4 h-4 text-slate-400" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft < 4 ? 'bg-rose-500 animate-pulse' : timeLeft < 7 ? 'bg-amber-500' : 'bg-indigo-600'
          }`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-2.5">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let btnStyle =
            'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

          if (isAnswered) {
            if (opt.isCorrect) {
              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold';
            } else {
              btnStyle = 'opacity-50 bg-slate-100 dark:bg-slate-800 border-transparent';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswered}
              className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
            >
              <span>{opt.text}</span>
              {isAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              {isAnswered && isSelected && !opt.isCorrect && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
