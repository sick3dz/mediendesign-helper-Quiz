import React, { useState, useEffect } from 'react';
import { soundEffects } from '../../services/audioService';
import { Trophy, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

interface MemoryCard {
  id: string;
  pairId: string;
  type: 'term' | 'definition';
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_PAIRS = [
  {
    pairId: 'p1',
    term: 'IxD (Interaktionsdesign)',
    definition: 'Gestaltet das Verhalten zwischen Mensch & System für verständliche Abläufe.',
  },
  {
    pairId: 'p2',
    term: 'Affordance',
    definition: 'Gebrauchseigenschaft eines Objekts (z. B. ein physischer Taster lässt sich drücken).',
  },
  {
    pairId: 'p3',
    term: 'Signifier',
    definition: 'Sichtbares Signal oder Hinweis, WO und WIE eine Aktion auszuführen ist.',
  },
  {
    pairId: 'p4',
    term: 'WCAG POUR',
    definition: 'Die 4 Grundsätze: Wahrnehmbar, Bedienbar, Verständlich, Robust.',
  },
  {
    pairId: 'p5',
    term: 'Wireframe',
    definition: 'Schematischer Entwurf zur Strukturierung von Inhalten ohne Farben & Grafiken.',
  },
  {
    pairId: 'p6',
    term: 'SQL JOIN',
    definition: 'Verknüpft Daten aus zwei oder mehreren Tabellen anhand gemeinsamer Schlüssel.',
  },
];

export const MemoryMatchGame: React.FC<Props> = ({ onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const list: MemoryCard[] = [];
    MEMORY_PAIRS.forEach(p => {
      list.push({
        id: `${p.pairId}-term`,
        pairId: p.pairId,
        type: 'term',
        text: p.term,
        isFlipped: false,
        isMatched: false,
      });
      list.push({
        id: `${p.pairId}-def`,
        pairId: p.pairId,
        type: 'definition',
        text: p.definition,
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffled = list.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsGameOver(false);
    setEarnedXp(0);
  };

  const handleCardClick = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    soundEffects.playClick();

    const updated = cards.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c));
    setCards(updated);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);

      const [first, second] = newFlipped;
      if (first.pairId === second.pairId) {
        soundEffects.playCorrect();
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.pairId === first.pairId ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);

          const newMatches = matches + 1;
          setMatches(newMatches);

          if (newMatches === MEMORY_PAIRS.length) {
            handleWin(moves + 1);
          }
        }, 500);
      } else {
        soundEffects.playWrong();
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  const handleWin = (finalMoves: number) => {
    setIsGameOver(true);
    soundEffects.playLevelUp();

    // Calculate EXP reward: 150 EXP base - moves penalty
    const xp = Math.max(60, 200 - finalMoves * 8);
    setEarnedXp(xp);
    onComplete(xp);
  };

  if (isGameOver) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-md text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-500">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Memory-Match Gewonnen!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Alle IHK-Begriffe & Definitionen erfolgreich zugeordnet!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500">Züge benötig</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">
              {moves} Züge
            </div>
          </div>

          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">EXP Belohnung</div>
            <div className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>+{earnedXp}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Header Info Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            IHK-Begriffe Memory-Match
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Finde jeweils die Karte mit dem Begriff und die Karte mit der passenden Definition.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Züge: {moves}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Paare: {matches} / {MEMORY_PAIRS.length}
          </span>
        </div>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map(card => {
          const isFlippedOrMatched = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`p-4 h-28 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                card.isMatched
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 opacity-60'
                  : card.isFlipped
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
              }`}
            >
              {isFlippedOrMatched ? (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    {card.type === 'term' ? '📌 Begriff' : '💡 Definition'}
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-3 leading-snug">
                    {card.text}
                  </p>
                </div>
              ) : (
                <div className="text-2xl font-mono text-slate-400 dark:text-slate-600">❓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
