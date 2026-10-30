import React, { useState, useEffect } from 'react';
import { EXAM_QUESTIONS } from '../../data/examQuestions';
import { QuizQuestion } from '../../types/quiz';
import { soundEffects } from '../../services/audioService';
import { Swords, Shield, Heart, Trophy, RotateCcw, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

export const BossRaidGame: React.FC<Props> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastActionText, setLastActionText] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setBossHp(100);
    setPlayerHp(100);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setLastActionText('Der IHK-Prüfungsboss fordert dich heraus!');
    setIsGameOver(false);
    setIsWon(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || isGameOver) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const chosen = currentQ.options.find(o => o.id === optionId);

    if (chosen?.isCorrect) {
      soundEffects.playCorrect();
      const damage = Math.floor(Math.random() * 10) + 25; // 25 to 35 damage
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);
      setLastActionText(` Volltreffer! Du fügst dem Boss ${damage} Schaden zu!`);

      if (newBossHp === 0) {
        setTimeout(() => {
          setIsWon(true);
          setIsGameOver(true);
          soundEffects.playLevelUp();
          onComplete(250); // High XP reward for boss defeat
        }, 1200);
        return;
      }
    } else {
      soundEffects.playWrong();
      const playerDamage = 20;
      const newPlayerHp = Math.max(0, playerHp - playerDamage);
      setPlayerHp(newPlayerHp);
      setLastActionText(` Konter-Angriff! Der Boss fügt dir ${playerDamage} Schaden zu.`);

      if (newPlayerHp === 0) {
        setTimeout(() => {
          setIsWon(false);
          setIsGameOver(true);
          onComplete(40); // Consolation XP
        }, 1200);
        return;
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % questions.length);
      setSelectedOptionId(null);
      setIsAnswered(false);
    }, 1800);
  };

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Lade Boss-Raid Arena...
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  if (isGameOver) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-md text-center space-y-6 animate-fade-in">
        <div
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border ${
            isWon
              ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-500'
              : 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-500'
          }`}
        >
          {isWon ? <Trophy className="w-8 h-8" /> : <Swords className="w-8 h-8" />}
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isWon ? 'Boss Besiegt! 🎉' : 'Kampf Verloren! ⚔️'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isWon
              ? 'Du hast den IHK-Prüfungsboss durch exzellentes Fachwissen bezwungen!'
              : 'Deine Lebenspunkte sind auf 0 gefallen. Versuche es gleich noch einmal!'}
          </p>
        </div>

        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-200 dark:border-indigo-800 max-w-xs mx-auto">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">EXP Belohnung</div>
          <div className="text-xl font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1.5 mt-0.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>+{isWon ? 250 : 40} EXP</span>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={restartGame}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Revanche / Erneut kämpfen</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5" style={{ backgroundColor: '#020617', color: '#ffffff' }}>
      {/* Boss vs Player Battle Stage */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-inner border border-slate-800/80" style={{ backgroundColor: '#0f172a' }}>
        {/* Boss Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-rose-400 font-extrabold">
              <Swords className="w-4 h-4" /> Boss: Der IHK-Prüfungsgigant
            </span>
            <span className="font-mono text-rose-300 font-extrabold">{bossHp} / 100 HP</span>
          </div>
          <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 transition-all duration-500 rounded-full"
              style={{ width: `${bossHp}%` }}
            />
          </div>
        </div>

        {/* Action Feed Message */}
        {lastActionText && (
          <div className="text-center text-xs font-bold text-amber-300 bg-slate-800/90 py-2 px-3 rounded-xl border border-slate-700 animate-pulse">
            {lastActionText}
          </div>
        )}

        {/* Player Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
              <Heart className="w-4 h-4 fill-emerald-500" /> Deine Lebenspunkte (HP)
            </span>
            <span className="font-mono text-emerald-300 font-extrabold">{playerHp} / 100 HP</span>
          </div>
          <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
              style={{ width: `${playerHp}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card - Guaranteed High-Contrast Dark RPG Card */}
      <div
        className="p-5 rounded-2xl bg-slate-900 border-2 border-indigo-500/40 shadow-lg text-white"
        style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
      >
        <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
          KAMPF-FRAGE #{currentIndex + 1}
        </h3>
        <p className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed" style={{ color: '#f8fafc' }}>
          {currentQ.question}
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-2.5">
        {currentQ.options.map(opt => {
          const isSelected = selectedOptionId === opt.id;
          let btnClasses =
            'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-100 hover:text-white hover:border-indigo-400';

          if (isAnswered) {
            if (opt.isCorrect) {
              btnClasses = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-xs';
            } else if (isSelected && !opt.isCorrect) {
              btnClasses = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold shadow-xs';
            } else {
              btnClasses = 'opacity-40 bg-slate-900/60 border-slate-800 text-slate-400';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswered}
              className={`p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClasses}`}
              style={{ color: isAnswered && opt.isCorrect ? '#a7f3d0' : isAnswered && isSelected && !opt.isCorrect ? '#fecdd3' : '#f8fafc' }}
            >
              <span className="leading-snug">{opt.text}</span>
              {isAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isAnswered && isSelected && !opt.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
