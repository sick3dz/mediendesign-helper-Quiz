import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { ShieldAlert, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

interface Clue {
  id: string;
  label: string;
  text: string;
  hint: string;
  found: boolean;
}

export const PhishingDetectorGame: React.FC<{ onComplete: (score: number) => void; isLevel2?: boolean }> = ({ onComplete, isLevel2 = false }) => {
  const [clues, setClues] = useState<Clue[]>([
    {
      id: 'sender',
      label: 'Gefälschte Absender-Domain',
      text: 'kundenservice@amaz0n-konto-verify.xyz',
      hint: 'Achte auf die Null "0" statt "o" und die unübliche Endung .xyz!',
      found: false,
    },
    {
      id: 'urgency',
      label: 'Künstlicher Zeitdruck',
      text: 'DRINGEND: Ihr Konto wird in 24 Stunden unwiderruflich gesperrt!',
      hint: 'Psychologische Manipulation: Erzeugt Panik, um unüberlegtes Handeln zu provozieren.',
      found: false,
    },
    {
      id: 'payment',
      label: 'Nur Vorkasse möglich',
      text: 'Zahlungsart: Nur direkte Banküberweisung (Vorkasse)',
      hint: 'Typisch Fake-Shop: Keine sicheren Zahlungsarten wie Rechnung oder Käuferschutz.',
      found: false,
    },
    {
      id: 'discount',
      label: 'Unrealistischer Rabatt',
      text: '90% Rabatt auf alle Marken-Kameras und Apple MacBooks!',
      hint: 'Zu schön um wahr zu sein: Ein klares Indiz für Betrug.',
      found: false,
    },
  ]);

  const [score, setScore] = useState(0);

  const foundCount = clues.filter(c => c.found).length;
  const isFinished = foundCount === clues.length;

  const handleClueClick = (id: string) => {
    const clue = clues.find(c => c.id === id);
    if (!clue || clue.found) return;

    soundEffects.playCorrect(foundCount + 1);
    setScore(s => s + 150);

    const updated = clues.map(c => (c.id === id ? { ...c, found: true } : c));
    setClues(updated);

    if (updated.every(c => c.found)) {
      confetti({ particleCount: 80, spread: 70 });
      soundEffects.playLevelUp();
      onComplete(score + 150);
    }
  };

  const restart = () => {
    setClues(clues.map(c => ({ ...c, found: false })));
    setScore(0);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Detektiv-Simulation</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spot the Fake: 4 Betrugsmerkmale enttarnen</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="font-mono font-bold text-slate-900 dark:text-slate-200">{foundCount} / {clues.length} gefunden</span>
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{score} XP</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Tippe im interaktiven Szenario unten auf alle 4 verdächtigen Elemente, die typisch für Phishing & Fake-Shops sind.
      </p>

      {/* Simulated Email & Fake Store Window */}
      <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 mb-6 shadow-xs">
        {/* Browser / Email Bar */}
        <div className="bg-slate-200 dark:bg-slate-900 px-4 py-2 border-b border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="ml-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">Posteingang: Sicherheitswarnung & Sonderangebot</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-500">HTML Mail Preview</span>
        </div>

        <div className="p-5 space-y-4 bg-white dark:bg-slate-900">
          {/* Header Info */}
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-500 font-medium">Von:</span>
              <button
                type="button"
                onClick={() => handleClueClick('sender')}
                className={`text-left transition-all ${
                  clues[0].found
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono font-bold px-2 py-0.5 rounded'
                    : isLevel2
                    ? 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-mono font-medium'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 cursor-pointer border border-dashed border-rose-300 dark:border-rose-800 px-2 py-0.5 rounded font-mono'
                }`}
              >
                {clues[0].text} {clues[0].found && '✓'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-500 font-medium">Betreff:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Dringende Handlung erforderlich</span>
            </div>
          </div>

          {/* Warning Message / Urgency Text */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleClueClick('urgency')}
              className={`w-full text-left transition-all ${
                clues[1].found
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 p-3 rounded-lg font-bold flex items-center justify-between'
                  : isLevel2
                  ? 'text-slate-900 dark:text-slate-100 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer py-1'
                  : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/60 cursor-pointer p-3 rounded-lg font-bold flex items-center justify-between'
              }`}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold leading-snug">
                {!isLevel2 && !clues[1].found && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />}
                <span>{clues[1].text}</span>
                {clues[1].found && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-auto" />}
              </div>
            </button>
          </div>

          {/* Fake Store Deal Content */}
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Exklusiver VIP-Restposten Shop</span>
              <button
                type="button"
                onClick={() => handleClueClick('discount')}
                className={`text-xs text-left transition-all ${
                  clues[3].found
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded'
                    : isLevel2
                    ? 'text-slate-900 dark:text-slate-100 font-extrabold hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer'
                    : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-800 cursor-pointer font-bold px-2 py-1 rounded'
                }`}
              >
                {clues[3].text} {clues[3].found && '✓'}
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Klicken Sie hier, um Ihre Bestellung sofort zu sichern und Ihr Konto freizuschalten.
            </p>

            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-500 dark:text-slate-400">Zahlungsabwicklung:</span>
              <button
                type="button"
                onClick={() => handleClueClick('payment')}
                className={`text-left transition-all ${
                  clues[2].found
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded'
                    : isLevel2
                    ? 'text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-800 cursor-pointer px-2 py-1 rounded'
                }`}
              >
                {clues[2].text} {clues[2].found && '✓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist of clues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {clues.map((c, idx) => (
          <div
            key={c.id}
            className={`p-3 rounded-lg border text-xs transition-colors ${
              c.found
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              {c.found ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              )}
              <span>{c.found ? c.label : isLevel2 ? `🔎 Verdächtiges Merkmal #${idx + 1}` : c.label}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {c.found ? c.hint : isLevel2 ? '🔒 In Level 2 erst nach Enttarnung sichtbar' : c.hint}
            </p>
          </div>
        ))}
      </div>

      {isFinished && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Alle Betrugsmerkmale erfolgreich enttarnt!</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">Du hast die Taktiken von Phishing und Fake-Shops sicher im Griff.</p>
          </div>
          <button
            onClick={restart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Nochmal
          </button>
        </div>
      )}
    </div>
  );
};
