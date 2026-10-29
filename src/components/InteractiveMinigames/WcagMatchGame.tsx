import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award } from 'lucide-react';

interface WcagTask {
  id: string;
  action: string;
  correctPour: 'P' | 'O' | 'U' | 'R';
  pourName: string;
  explanation: string;
}

const TASKS: WcagTask[] = [
  {
    id: '1',
    action: 'Ausreichender Farbkontrast (mind. 4.5:1) zwischen Schrift & Hintergrund',
    correctPour: 'P',
    pourName: 'Perceivable (Wahrnehmbar)',
    explanation: 'Wahrnehmbarkeit stellt sicher, dass Inhalte visuell oder auditiv aufgenommen werden können.'
  },
  {
    id: '2',
    action: 'Jede Aktion ist ohne Maus nur mit Tab, Shift+Tab und Enter bedienbar',
    correctPour: 'O',
    pourName: 'Operable (Bedienbar)',
    explanation: 'Bedienbarkeit garantiert, dass alle interaktiven Schnittstellen steuerbar sind.'
  },
  {
    id: '3',
    action: 'Fehlermeldung lautet: "Bitte geben Sie eine gültige E-Mail-Adresse ein"',
    correctPour: 'U',
    pourName: 'Understandable (Verständlich)',
    explanation: 'Verständlichkeit fordert klare Sprache und nachvollziehbare Hilfestellungen.'
  },
  {
    id: '4',
    action: 'Semantisches HTML (<header>, <nav>, <main>) sorgt für Kompatibilität mit Screenreadern',
    correctPour: 'R',
    pourName: 'Robust (Robust)',
    explanation: 'Robustheit stellt sicher, dass assistive Technologien und künftige Browser den Code fehlerfrei parsen.'
  },
  {
    id: '5',
    action: 'Untertitel und Transkripte für alle Video- und Tonaufnahmen',
    correctPour: 'P',
    pourName: 'Perceivable (Wahrnehmbar)',
    explanation: 'Alternative Darstellungsformen für auditive Inhalte gehören zur Wahrnehmbarkeit.'
  },
  {
    id: '6',
    action: 'Ausreichend Zeit für Formulareingaben ohne plötzliche Zwangs-Timeouts',
    correctPour: 'O',
    pourName: 'Operable (Bedienbar)',
    explanation: 'Ausreichend Reaktionszeit gehört zum Kriterium der Bedienbarkeit.'
  }
];

export const WcagMatchGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [done, setDone] = useState(false);

  const current = TASKS[index];

  const handleChoose = (chosen: 'P' | 'O' | 'U' | 'R') => {
    if (lastFeedback !== null) return;

    const isCorrect = chosen === current.correctPour;
    if (isCorrect) {
      soundEffects.playCorrect();
      setScore(s => s + 100);
      setLastFeedback({ isCorrect: true, text: `Richtig! ${current.pourName}. ${current.explanation}` });
    } else {
      soundEffects.playWrong();
      setLastFeedback({ isCorrect: false, text: `Leider falsch! Richtig wäre: ${current.pourName}. ${current.explanation}` });
    }

    setTimeout(() => {
      setLastFeedback(null);
      if (index + 1 < TASKS.length) {
        setIndex(i => i + 1);
      } else {
        setDone(true);
        soundEffects.playLevelUp();
        confetti({ particleCount: 70, spread: 60 });
        onComplete(score + (isCorrect ? 100 : 0));
      }
    }, 1300);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setLastFeedback(null);
    setDone(false);
  };

  if (done) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <Award className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">WCAG POUR-Meister!</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Punkte: <span className="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">{score} XP</span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Merke dir POUR für die Prüfung: Perceivable (Wahrnehmbar), Operable (Bedienbar), Understandable (Verständlich), Robust (Robust).
        </p>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Nochmal trainieren
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">A11y Challenge</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">POUR-Zuordnung</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>{index + 1} / {TASKS.length}</span>
          <span className="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">{score} XP</span>
        </div>
      </div>

      <div className="my-5 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wide">Welchem WCAG-Prinzip gehört diese Maßnahme an?</p>
        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{current.action}</h4>

        {lastFeedback && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all ${lastFeedback.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
            <div className="flex items-center gap-2 text-base font-bold mb-1">
              {lastFeedback.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              {lastFeedback.isCorrect ? 'Volltreffer!' : 'Daneben!'}
            </div>
            <p className="text-xs text-white/95 text-center max-w-md">{lastFeedback.text}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { key: 'P' as const, letter: 'P', title: 'Perceivable', sub: 'Wahrnehmbar (Kontrast, Alt-Text, Audio)' },
          { key: 'O' as const, letter: 'O', title: 'Operable', sub: 'Bedienbar (Tastatur, Navigation, Zeit)' },
          { key: 'U' as const, letter: 'U', title: 'Understandable', sub: 'Verständlich (Sprache, Fehlerklärung)' },
          { key: 'R' as const, letter: 'R', title: 'Robust', sub: 'Robust (HTML-Semantik, Screenreader)' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => handleChoose(item.key)}
            disabled={lastFeedback !== null}
            className="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/40 dark:hover:bg-amber-950/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors font-mono dark:text-slate-200">
                {item.letter}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-amber-800 dark:group-hover:text-amber-400">
                {item.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{item.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
