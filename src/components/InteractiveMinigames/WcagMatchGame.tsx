import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, Sparkles, ArrowRight } from 'lucide-react';

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

export const WcagMatchGame: React.FC<{ onComplete: (score: number) => void; isLevel2?: boolean }> = ({ onComplete, isLevel2 = false }) => {
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
      }
    }, isCorrect ? 1300 : 2800);
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={restart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-4 h-4" />
            Nochmal trainieren
          </button>
          <button
            onClick={() => onComplete(score)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Weiter zum Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
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

      <div className="my-5 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden flex flex-col items-center">
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wide">Welchem WCAG-Prinzip gehört diese Maßnahme an?</p>
        
        {/* Practice Visual UI Mockup Card */}
        <div className="w-full max-w-md my-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center min-h-[90px]">
          {current.id === '1' && (
            <div className="flex items-center gap-4 bg-slate-900 text-white p-3 rounded-lg w-full justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-amber-400">Aa</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">Kontrast-Verhältnis</div>
                  <div className="text-[11px] font-mono text-slate-400">Vordergrund #FBBF24 auf #0F172A</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-900/80 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold rounded-md">
                4.8:1 (PASS)
              </span>
            </div>
          )}

          {current.id === '2' && (
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg w-full justify-between">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs font-mono font-bold shadow-2xs text-slate-800 dark:text-slate-200">
                  Tab
                </kbd>
                <span className="text-xs text-slate-600 dark:text-slate-300">Focus Indicator Ring</span>
              </div>
              <button type="button" className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-md ring-4 ring-indigo-300 dark:ring-indigo-800">
                Aktions-Button
              </button>
            </div>
          )}

          {current.id === '3' && (
            <div className="w-full text-left space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">E-Mail-Adresse *</label>
              <input type="text" readOnly value="max@mustermann" className="w-full px-2.5 py-1 text-xs border border-amber-500 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-mono" />
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">⚠️ Bitte geben Sie eine gültige E-Mail-Adresse ein</p>
            </div>
          )}

          {current.id === '4' && (
            <div className="w-full bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] font-mono text-left space-y-0.5">
              <div className="text-purple-400">&lt;header class=&quot;site-header&quot;&gt;</div>
              <div className="text-blue-400 pl-3">&lt;nav aria-label=&quot;Hauptnavigation&quot;&gt;...&lt;/nav&gt;</div>
              <div className="text-purple-400">&lt;/header&gt;</div>
              <div className="text-emerald-400">&lt;main id=&quot;content&quot;&gt;...&lt;/main&gt;</div>
            </div>
          )}

          {current.id === '5' && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg text-left flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">▶</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Video-Lektion.mp4</span>
              </div>
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 text-[10px] font-bold rounded">
                [CC] Untertitel aktiv
              </span>
            </div>
          )}

          {current.id === '6' && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg text-left flex items-center justify-between">
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Sitzungs-Timer: Noch 05:00 Min.
              </div>
              <button type="button" className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded">
                +30 Min. verlängern
              </button>
            </div>
          )}
        </div>

        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{current.action}</h4>

        {lastFeedback && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all ${
            lastFeedback.isCorrect
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 text-white'
          }`}>
            <div className="flex items-center gap-2 text-base font-bold mb-1">
              {lastFeedback.isCorrect ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : isLevel2 ? (
                <Sparkles className="w-5 h-5 text-indigo-400" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span>{lastFeedback.isCorrect ? 'Volltreffer!' : isLevel2 ? 'IHK-Analyse & Zuordnung:' : 'Daneben!'}</span>
            </div>
            <p className="text-xs text-white/95 text-center max-w-md">
              {!lastFeedback.isCorrect && <span className="font-bold block mb-1 underline">💡 Analyse:</span>}
              {lastFeedback.text}
            </p>
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
