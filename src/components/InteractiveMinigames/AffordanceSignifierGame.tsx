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
  isLevel2?: boolean;
}

export const AffordanceSignifierGame: React.FC<Props> = ({ onComplete, isLevel2 = false }) => {
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

      <div className="my-6 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden flex flex-col items-center">
        <p className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">{currentItem.context}</p>

        {/* Live Visual UI Mockup Box */}
        <div className="w-full max-w-sm my-2 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center min-h-[120px]">
          {currentItem.id === '1' && (
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-slate-300 dark:border-slate-700 w-full justify-center">
              <div className="w-4 h-24 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 dark:from-slate-600 dark:via-slate-400 dark:to-slate-700 rounded-full shadow-md border border-slate-400/50 flex items-center justify-center">
                <div className="w-1 h-16 bg-slate-400/50 rounded-full" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Physischer Glas-Türeinlass</span>
            </div>
          )}

          {currentItem.id === '2' && (
            <div className="px-6 py-3 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 text-amber-950 font-serif font-black text-sm tracking-widest uppercase rounded-md shadow-md border-2 border-amber-500 flex items-center gap-2">
              <span className="text-amber-800">★</span>
              <span>ZIEHEN</span>
              <span className="text-amber-800">★</span>
            </div>
          )}

          {currentItem.id === '3' && (
            <div className="w-full space-y-2 text-left">
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="pt-3 flex justify-center">
                <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800 animate-bounce">
                  <span>Scrollen für mehr</span>
                  <span>↓</span>
                </div>
              </div>
            </div>
          )}

          {currentItem.id === '4' && (
            <button
              type="button"
              className="px-6 py-3 bg-gradient-to-b from-indigo-500 to-indigo-700 text-white font-black text-xs rounded-xl shadow-lg border-b-4 border-indigo-900 active:translate-y-1 transition-all cursor-pointer"
            >
              Jetzt Kostenlos Registrieren
            </button>
          )}

          {currentItem.id === '5' && (
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-left">
              Weitere Details zur IHK-Prüfungsvorbereitung findest du direkt in unserem{' '}
              <span className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-2 hover:text-blue-800 cursor-pointer">
                Prüfungskatalog 2026
              </span>{' '}
              für Mediengestaltung Digital & Print.
            </div>
          )}

          {currentItem.id === '6' && (
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900 border-2 border-slate-400 dark:border-slate-600 shadow-md relative flex items-center justify-center">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full absolute top-1" />
                <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-800 border border-slate-400/50" />
              </div>
              <div className="text-left text-[11px] font-mono text-slate-500">
                <div className="font-bold text-slate-900 dark:text-slate-200">Audio Gain</div>
                <div>+12 dB Rotary Knob</div>
              </div>
            </div>
          )}
        </div>

        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-1">{currentItem.element}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-300">Was liegt hier vor?</p>

        {lastResult && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all ${
            lastResult.isCorrect
              ? 'bg-emerald-600 text-white'
              : isLevel2
              ? 'bg-slate-800 text-slate-100 border border-slate-700'
              : 'bg-rose-600 text-white'
          }`}>
            <div className="flex items-center gap-2 text-base font-bold mb-1">
              {lastResult.isCorrect ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : isLevel2 ? (
                <Sparkles className="w-5 h-5 text-indigo-400" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span>{lastResult.isCorrect ? 'Exakt richtig!' : isLevel2 ? 'IHK-Analyse & Lösungsvergleich:' : 'Leider daneben!'}</span>
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
