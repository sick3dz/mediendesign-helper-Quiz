import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Sparkles, Check, X, RotateCcw, Award } from 'lucide-react';

interface Item {
  id: string;
  element: string;
  context: string;
  type: 'affordance' | 'signifier';
  explanation: string;
}

const ITEMS: Item[] = [
  {
    id: '1',
    element: 'Senkrechter Haltegriff an der Tür',
    context: 'Physische Eigenschaft, die Greifen & Ziehen ermöglicht',
    type: 'affordance',
    explanation: 'Affordance beschreibt die mögliche Handlung durch physische/visuelle Form.'
  },
  {
    id: '2',
    element: 'Messing-Schild mit der Aufschrift "Ziehen"',
    context: 'Textlicher Hinweis an der Glastür',
    type: 'signifier',
    explanation: 'Signifier signalisiert die Handlung durch eine explizite Markierung oder Text.'
  },
  {
    id: '3',
    element: 'Pfeilsymbol nach unten am Seitenende',
    context: 'Grafischer Indikator für weitere Inhalte',
    type: 'signifier',
    explanation: 'Das Pfeilsymbol ist ein Signifier, der die Scrollrichtung verdeutlicht.'
  },
  {
    id: '4',
    element: 'Erhabener, schattierter Button',
    context: 'Sieht visuell drückbar aus',
    type: 'affordance',
    explanation: 'Die plastische Optik vermittelt direkt die Klickbarkeit (Affordance).'
  },
  {
    id: '5',
    element: 'Textlink ist unterstrichen und blau gefärbt',
    context: 'Konventionelles Signal im Fließtext',
    type: 'signifier',
    explanation: 'Farbe und Unterstreichung fungieren als Signifier für die Link-Funktion.'
  },
  {
    id: '6',
    element: 'Drehregler am Audio-Mischpult',
    context: 'Runder Knopf, der gedreht werden kann',
    type: 'affordance',
    explanation: 'Die runde Drehform bietet die Handlungsmöglichkeit des Drehens (Affordance).'
  }
];

interface Props {
  onComplete: (score: number) => void;
}

export const AffordanceSignifierGame: React.FC<Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastResult, setLastResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [finished, setFinished] = useState(false);

  const currentItem = ITEMS[currentIndex];

  const handleChoice = (chosen: 'affordance' | 'signifier') => {
    if (lastResult !== null) return; // Prevent double taps

    const isCorrect = chosen === currentItem.type;
    if (isCorrect) {
      soundEffects.playCorrect(streak + 1);
      setScore(s => s + 100 * (streak + 1));
      setStreak(s => s + 1);
      setLastResult({ isCorrect: true, explanation: currentItem.explanation });
    } else {
      soundEffects.playWrong();
      setStreak(0);
      setLastResult({
        isCorrect: false,
        explanation: `Falsch! ${currentItem.element} ist ${currentItem.type === 'affordance' ? 'eine Affordance' : 'ein Signifier'}. ${currentItem.explanation}`
      });
    }

    setTimeout(() => {
      setLastResult(null);
      if (currentIndex + 1 < ITEMS.length) {
        setCurrentIndex(i => i + 1);
      } else {
        setFinished(true);
        confetti({ particleCount: 70, spread: 60 });
        soundEffects.playLevelUp();
        onComplete(score + (isCorrect ? 100 : 0));
      }
    }, 1200);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center transition-colors">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <Award className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Prüfungs-Duell gemeistert!</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Punkte: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{score} XP</span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Prüfungs-Merksatz: Affordance beschreibt die mögliche Handlung. Signifier signalisiert die Handlung (Hinweis/Beschriftung).
        </p>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Nochmal spielen
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Mini-Game</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Affordance vs. Signifier</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>{currentIndex + 1} / {ITEMS.length}</span>
          <span className="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">Streak: {streak}🔥</span>
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{score} XP</span>
        </div>
      </div>

      <div className="my-6 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">{currentItem.context}</p>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{currentItem.element}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">Was liegt hier vor?</p>

        {lastResult && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all ${lastResult.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
            <div className="flex items-center gap-2 text-lg font-bold mb-1">
              {lastResult.isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
              {lastResult.isCorrect ? 'Exakt richtig!' : 'Leider daneben!'}
            </div>
            <p className="text-xs text-white/90 text-center max-w-md">{lastResult.explanation}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleChoice('affordance')}
          disabled={lastResult !== null}
          className="p-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-600 dark:hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-left group cursor-pointer"
        >
          <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-1">
            Affordance
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Mögliche Handlung (z. B. greifbar, klickbar, drehbar)
          </div>
        </button>

        <button
          onClick={() => handleChoice('signifier')}
          disabled={lastResult !== null}
          className="p-4 rounded-xl border-2 border-amber-200 dark:border-amber-900/60 hover:border-amber-600 dark:hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all text-left group cursor-pointer"
        >
          <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 mb-1">
            Signifier
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Hinweissignal / Signalisiert Handlung (z. B. Schild, Text, Pfeil)
          </div>
        </button>
      </div>
    </div>
  );
};
