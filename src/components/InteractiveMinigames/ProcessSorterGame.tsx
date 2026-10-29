import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react';

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

export const ProcessSorterGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
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
      onComplete(200);
    }
  };

  const restart = () => {
    setIsSuccess(false);
    setItems(shuffle(CORRECT_ORDER));
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Ablauf-Puzzle</span>
          <h3 className="text-lg font-bold text-slate-900">Bringe den Designprozess in die richtige Reihenfolge</h3>
        </div>
        <button
          onClick={restart}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Mischen
        </button>
      </div>

      <p className="text-xs text-slate-500 mb-4">
        Ordne die 6 Phasen von der ersten Idee bis zum fertigen Code. Nutze die Pfeile zum Verschieben.
      </p>

      <div className="space-y-2 mb-4">
        {items.map((item, idx) => {
          const isAtCorrectPos = item.id === CORRECT_ORDER[idx].id;
          return (
            <div
              key={item.id}
              className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                isSuccess
                  ? 'bg-emerald-50 border-emerald-300'
                  : isAtCorrectPos
                  ? 'bg-indigo-50/50 border-indigo-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  isAtCorrectPos ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900">{item.name}</div>
                  <div className="text-[11px] text-slate-500">{item.desc}</div>
                </div>
              </div>

              {!isSuccess && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200 disabled:opacity-20 transition-colors"
                    title="Nach oben"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => move(idx, 'down')}
                    disabled={idx === items.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200 disabled:opacity-20 transition-colors"
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
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
          <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Perfekt geordnet! 200 XP erhalten
          </div>
          <p className="text-xs text-emerald-700 font-mono">
            Merksatz: Wireframe = Aufbau | Mockup = Aussehen | Prototyp = Bedienung | Entwicklung = Funktion
          </p>
        </div>
      )}
    </div>
  );
};
