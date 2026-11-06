import React, { useState, useMemo } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Scale,
  Check,
  X,
  RotateCcw,
  Award,
  Sparkles,
  GripVertical,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { shuffleArray } from '../../utils/learningLogic';

interface FristenPair {
  id: string;
  situation: string;
  category: string;
  paragraph: string; // e.g. '§ 22 Abs. 1 BBiG'
  deadlineText: string; // e.g. 'Fristlos ohne Angabe von Gründen (in Probezeit)'
  fullLawRef: string; // e.g. '§ 20 & § 22 BBiG'
  explanation: string;
}

const ALL_FRISTEN_PAIRS: FristenPair[] = [
  {
    id: 'f-1',
    category: 'Probezeit Kündigung',
    situation: 'Kündigung des Ausbildungsverhältnisses während der Probezeit',
    paragraph: '§ 22 Abs. 1 BBiG',
    deadlineText: 'Jederzeit fristlos ohne Angabe von Gründen (Schriftform auf Papier)',
    fullLawRef: '§ 20 & § 22 BBiG',
    explanation: 'In der Probezeit (1 bis max. 4 Monate) kann von beiden Seiten fristlos und ohne Kündigungsgrund gekündigt werden.',
  },
  {
    id: 'f-2',
    category: 'Azubi Kündigungsfrist',
    situation: 'Ordentliche Kündigung durch Azubi nach der Probezeit (wegen Berufsaufgabe)',
    paragraph: '§ 22 Abs. 2 Nr. 2 BBiG',
    deadlineText: '4 Wochen Kündigungsfrist (schriftlich mit Begründung)',
    fullLawRef: '§ 22 Abs. 2 BBiG',
    explanation: 'Will der Azubi die Berufsausbildung aufgeben oder sich für einen anderen Beruf ausbilden lassen, gilt 4 Wochen Frist.',
  },
  {
    id: 'f-3',
    category: 'Kündigungsschutzklage',
    situation: 'Frist zur Einreichung einer Klage beim Arbeitsgericht gegen eine Kündigung',
    paragraph: '§ 4 KSchG',
    deadlineText: 'Innerhalb von 3 Wochen nach Zugang der Kündigung',
    fullLawRef: '§ 4 KSchG',
    explanation: 'Wird die 3-Wochen-Frist versäumt, gilt die Kündigung als von Anfang an rechtswirksam!',
  },
  {
    id: 'f-4',
    category: 'Entgeltfortzahlung',
    situation: 'Dauer der Gehaltsfortzahlung durch den Arbeitgeber bei Arbeitsunfähigkeit/Krankheit',
    paragraph: '§ 3 EntgFG',
    deadlineText: 'Bis zu 6 Wochen (100% Entgeltfortzahlung, danach Krankengeld)',
    fullLawRef: '§ 3 EntgFG & § 44 SGB V',
    explanation: 'Der Arbeitgeber leistet bis zu 6 Wochen Fortzahlung. Ab Tag 43 zahlt die Krankenkasse Krankengeld.',
  },
  {
    id: 'f-5',
    category: 'Jugendarbeitsschutz',
    situation: 'Höchstarbeitszeit pro Tag und Woche für Jugendliche unter 18 Jahren',
    paragraph: '§ 8 JArbSchG',
    deadlineText: 'Max. 8 Stunden täglich / max. 40 Stunden in der 5-Tage-Woche',
    fullLawRef: '§§ 8, 15 JArbSchG',
    explanation: 'Jugendliche dürfen grundsätzlich nicht mehr als 8 Stunden täglich und an 5 Tagen pro Woche beschäftigt werden.',
  },
  {
    id: 'f-6',
    category: 'Betriebsrats-Anhörung',
    situation: 'Rückmeldefrist des Betriebsrats bei einer ordentlichen Kündigung',
    paragraph: '§ 102 Abs. 2 BetrVG',
    deadlineText: '1 Woche (bei fristloser Kündigung 3 Tage)',
    fullLawRef: '§ 102 BetrVG',
    explanation: 'Ohne vorherige Anhörung des Betriebsrats ist jede Kündigung absolut unwirksam.',
  },
  {
    id: 'f-7',
    category: 'Verjährungsfrist',
    situation: 'Regelmäßige Verjährungsfrist für Ausbildungsvergütung & Gehaltsansprüche',
    paragraph: '§ 195 BGB',
    deadlineText: '3 Jahre (beginnend mit dem Schluss des Entstehungsjahres)',
    fullLawRef: '§§ 195, 199 BGB',
    explanation: 'Ansprüche aus dem Jahr 2024 verjähren am 31.12.2027 um 24:00 Uhr.',
  },
  {
    id: 'f-8',
    category: 'GmbH Stammkapital',
    situation: 'Gesetzliches Mindeststammkapital bei der Gründung einer GmbH',
    paragraph: '§ 5 Abs. 1 GmbHG',
    deadlineText: 'Mindestens 25.000 € (davon mind. 12.500 € Soforteinzahlung)',
    fullLawRef: '§ 5 GmbHG',
    explanation: 'Die GmbH verlangt min. 25.000 € Stammkapital zur Beschränkung der persönlichen Haftung.',
  },
];

export const WisoFristenDragDropGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [roundKey, setRoundKey] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ id: string; paragraph: string; deadlineText: string } | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ situationId: string; isCorrect: boolean; msg: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Pick 5 random pairs per round and shuffle their right-side targets
  const roundData = useMemo(() => {
    const selected = shuffleArray([...ALL_FRISTEN_PAIRS]).slice(0, 5);
    const leftSituations = selected.map(p => ({
      id: p.id,
      situation: p.situation,
      category: p.category,
      fullLawRef: p.fullLawRef,
      explanation: p.explanation,
      correctParagraphId: p.id,
    }));

    const rightParagraphen = shuffleArray(
      selected.map(p => ({
        id: p.id,
        paragraph: p.paragraph,
        deadlineText: p.deadlineText,
      }))
    );

    return { leftSituations, rightParagraphen };
  }, [roundKey]);

  const handleMatchAttempt = (situationId: string, paragraphId: string) => {
    if (matchedIds.includes(situationId)) return;

    const isCorrect = situationId === paragraphId;
    const pair = ALL_FRISTEN_PAIRS.find(p => p.id === situationId);

    if (isCorrect) {
      soundEffects.playCorrect();
      const points = 10 + streak * 2;
      setScore(s => s + points);
      setStreak(st => st + 1);
      const newMatched = [...matchedIds, situationId];
      setMatchedIds(newMatched);
      setSelectedItem(null);
      setFeedback({
        situationId,
        isCorrect: true,
        msg: `Richtig! ${pair?.paragraph}: ${pair?.explanation}`,
      });

      if (newMatched.length === roundData.leftSituations.length) {
        setTimeout(() => {
          setIsGameOver(true);
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
          onComplete(35);
        }, 800);
      }
    } else {
      soundEffects.playWrong();
      setStreak(0);
      setSelectedItem(null);
      setFeedback({
        situationId,
        isCorrect: false,
        msg: `Falsche Zuordnung! Prüfe Paragraphen & Fristen noch einmal genau.`,
      });
    }
  };

  // Click-to-select support (mobile friendly fallback)
  const handleSelectParagraph = (item: { id: string; paragraph: string; deadlineText: string }) => {
    if (matchedIds.includes(item.id)) return;
    soundEffects.playClick();
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const handleSelectSituation = (situationId: string) => {
    if (selectedItem) {
      handleMatchAttempt(situationId, selectedItem.id);
    }
  };

  // Native Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    if (matchedIds.includes(id)) return;
    e.dataTransfer.setData('text/plain', id);
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, situationId: string) => {
    e.preventDefault();
    const droppedParagraphId = e.dataTransfer.getData('text/plain') || draggedId;
    setDraggedId(null);
    if (droppedParagraphId) {
      handleMatchAttempt(situationId, droppedParagraphId);
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setMatchedIds([]);
    setSelectedItem(null);
    setFeedback(null);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setRoundKey(k => k + 1);
  };

  if (isGameOver) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 animate-in zoom-in-95 duration-400">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Fristen- & Paragraphen-Meister!
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Drag-and-Drop Duell bestanden
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Du hast alle IHK-Fristen und Paragraphen fehlerfrei den Sachverhalten zugeordnet!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Gesamtpunkte</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{score}</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Belohnung</span>
            <div className="text-2xl font-black text-emerald-500 mt-0.5">+35 EXP</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Neue Fristen-Runde spielen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <span>WiSo-Fristen & Paragraphen Drag-and-Drop Duell</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-mono">
                {matchedIds.length} / {roundData.leftSituations.length} gelöst
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Ziehe die Fristen-Karten (rechts) per Drag & Drop auf das passende rechtliche Szenario (links) – oder tippe zur Auswahl!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 animate-pulse">
              <Sparkles className="w-3 h-3" />
              {streak}x Combo
            </span>
          )}
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Punkte</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">{score}</span>
          </div>
        </div>
      </div>

      {/* Instructional Hint */}
      <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between gap-3 text-xs text-indigo-900 dark:text-indigo-200">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            {selectedItem ? (
              <strong className="text-emerald-600 dark:text-emerald-400">
                Karte "{selectedItem.paragraph}" ausgewählt! Tippe nun auf den passenden Zielbereich links.
              </strong>
            ) : (
              'Halte eine Karte rechts gedrückt & ziehe sie auf das Zielfeld links, oder klicke eine Karte an.'
            )}
          </span>
        </div>
        {selectedItem && (
          <button
            onClick={() => setSelectedItem(null)}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white underline cursor-pointer"
          >
            Auswahl aufheben
          </button>
        )}
      </div>

      {/* Main Drag-and-Drop Arena Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Target Legal Situations */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Rechtliche IHK-Sachverhalte (Drop-Zonen)</span>
          </h4>

          {roundData.leftSituations.map(s => {
            const isMatched = matchedIds.includes(s.id);
            const pairData = ALL_FRISTEN_PAIRS.find(p => p.id === s.id);
            const hasFeedback = feedback?.situationId === s.id;

            return (
              <div
                key={s.id}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, s.id)}
                onClick={() => handleSelectSituation(s.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isMatched
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30'
                    : selectedItem
                    ? 'border-dashed border-indigo-400 dark:border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 hover:border-indigo-500 hover:bg-indigo-50/60'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {s.category}
                  </span>
                  {isMatched && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Gelöst</span>
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2">
                  {s.situation}
                </p>

                {/* Drop Zone Box */}
                <div
                  className={`mt-3 p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-100/70 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 font-bold'
                      : 'border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400'
                  }`}
                >
                  {isMatched ? (
                    <div>
                      <div className="text-emerald-700 dark:text-emerald-300 font-black">
                        ✓ {pairData?.paragraph}
                      </div>
                      <div className="text-[11px] font-normal text-emerald-900 dark:text-emerald-200">
                        {pairData?.deadlineText}
                      </div>
                    </div>
                  ) : (
                    <span>Hier passende Karte ablegen oder anklicken...</span>
                  )}
                </div>

                {/* Immediate Feedback Note */}
                {hasFeedback && !isMatched && (
                  <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-2 animate-in fade-in">
                    ❌ {feedback.msg}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Draggable Paragraphen Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Fristen & Paragraphen (Ziehen / Auswählen)</span>
          </h4>

          {roundData.rightParagraphen.map(p => {
            const isMatched = matchedIds.includes(p.id);
            const isSelected = selectedItem?.id === p.id;

            return (
              <div
                key={p.id}
                draggable={!isMatched}
                onDragStart={e => handleDragStart(e, p.id)}
                onClick={() => handleSelectParagraph(p)}
                className={`p-4 rounded-xl border transition-all select-none cursor-grab active:cursor-grabbing ${
                  isMatched
                    ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 cursor-not-allowed'
                    : isSelected
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30 scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                      {p.paragraph}
                    </span>
                  </div>
                  {isMatched && <Check className="w-4 h-4 text-emerald-500" />}
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 font-medium leading-relaxed pl-6">
                  {p.deadlineText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
