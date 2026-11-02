import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  name: string;
  desc: string;
}

const CORRECT_ORDER: Step[] = [
  { id: '1', name: '1. Anforderungsanalyse', desc: 'Ziele, Zielgruppe & Kundenbriefing ermitteln' },
  { id: '2', name: '2. Informationsarchitektur', desc: 'Sitemap, Menü-Hierarchien & Inhaltsgruppen definieren' },
  { id: '3', name: '3. Wireframe', desc: 'Schematischer Bauplan (Schwarz-Weiß, Struktur & Platzierung)' },
  { id: '4', name: '4. Mockup', desc: 'Visueller Entwurf mit echten Farben, Bildern & Typografie' },
  { id: '5', name: '5. Prototyp', desc: 'Interaktive, klickbare Simulation der Bedienabläufe' },
  { id: '6', name: '6. Entwicklung', desc: 'Programmierung und technische Umsetzung als fertiges Produkt' },
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const ProcessSorterGame: React.FC<{ onComplete: (score: number) => void; isLevel2?: boolean }> = ({ onComplete, isLevel2 = false }) => {
  const [items, setItems] = useState<Step[]>(() => {
    let s = shuffle(CORRECT_ORDER);
    // ensure it's not solved initially
    while (s.every((v, i) => v.id === CORRECT_ORDER[i].id)) {
      s = shuffle(CORRECT_ORDER);
    }
    return s;
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const move = (index: number, direction: 'up' | 'down') => {
    if (isSuccess) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    soundEffects.playClick();
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);

    // Check if sorted
    const solved = newItems.every((item, idx) => item.id === CORRECT_ORDER[idx].id);
    if (solved) {
      setIsSuccess(true);
      soundEffects.playLevelUp();
      confetti({ particleCount: 75, spread: 60 });
    }
  };

  const restart = () => {
    setIsSuccess(false);
    setItems(shuffle(CORRECT_ORDER));
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Ablauf-Puzzle</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bringe den Designprozess in die richtige Reihenfolge</h3>
        </div>
        <button
          onClick={restart}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Mischen
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Ordne die 6 Phasen von der ersten Idee bis zum fertigen Code. Nutze die Pfeile zum Verschieben.
      </p>

      <div className="space-y-2.5 mb-4">
        {items.map((item, idx) => {
          const isAtCorrectPos = item.id === CORRECT_ORDER[idx].id;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                isSuccess
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 shadow-2xs'
                  : isAtCorrectPos && !isLevel2
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                  isAtCorrectPos && !isLevel2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                }`}>
                  {idx + 1}
                </span>

                {/* Visual Artifact Mockup Badge */}
                <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex-col items-center justify-center text-base select-none">
                  {item.id === '1' && '📋'}
                  {item.id === '2' && '🌿'}
                  {item.id === '3' && '📐'}
                  {item.id === '4' && '🎨'}
                  {item.id === '5' && '⚡'}
                  {item.id === '6' && '💻'}
                </div>

                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {item.desc}
                  </div>
                </div>
              </div>

              {!isSuccess && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => move(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 disabled:opacity-20 transition-colors cursor-pointer"
                    title="Nach oben"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 'down')}
                    disabled={idx === items.length - 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 disabled:opacity-20 transition-colors cursor-pointer"
                    title="Nach unten"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Perfekt geordnet! 200 XP erhalten
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono italic leading-tight">
              Merksatz: Wireframe = Aufbau | Mockup = Aussehen | Prototyp = Bedienung | Entwicklung = Funktion
            </p>
          </div>
          <button
            onClick={() => onComplete(200)}
            className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Weiter zum Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
