import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Eye, RefreshCw, Sparkles, CheckCircle2, AlertTriangle, FileText, Calculator, Archive, BookOpen, Layers } from 'lucide-react';
import { PmCycleGraphic } from './PmCycleGraphic';

interface ClosureItem {
  id: string;
  pillar: string;
  task: string;
  description: string;
  correctCategory: 'report' | 'cost' | 'archive' | 'lessons';
  explanation: string;
  ihkTip: string;
}

const CLOSURE_TASKS: ClosureItem[] = [
  {
    id: 'cl-1',
    pillar: '1. Säule: Projektabschlussbericht',
    task: 'Ergebnisbericht & Soll-Ist-Resümee erstellen',
    description: 'Zusammenfassung des Projektverlaufs, Gegenüberstellung der Zielvorgaben mit den tatsächlichen Resultaten und formale Entlastung der Projektleitung.',
    correctCategory: 'report',
    explanation: 'Richtig! Der Projektabschlussbericht dokumentiert den Gesamterfolg und dient dem Management als Grundlage zur formalen Entlastung des Projektteams.',
    ihkTip: 'IHK-Standard: Ohne Abschlussbericht keine offizielle Entlastung des Projektleiters.',
  },
  {
    id: 'cl-2',
    pillar: '2. Säule: Nachkalkulation',
    task: 'Finanzielle Abrechnung & Deckungsbeitrag ermitteln',
    description: 'Gegenüberstellung aller tatsächlich angefallenen Personalkosten, Fremdleistungen und Sachmittel mit dem ursprünglichen Angebotsbudget.',
    correctCategory: 'cost',
    explanation: 'Exakt! Die Nachkalkulation deckt unvorhergesehene Kostentreiber auf und liefert unverzichtbare Stundensätze und Richtwerte für zukünftige Angebote.',
    ihkTip: 'Wirtschaftsprüfung: Ohne Nachkalkulation weiß eine Agentur nicht, ob ein Projekt rentabel war.',
  },
  {
    id: 'cl-3',
    pillar: '3. Säule: Archivierung',
    task: 'Revisionssichere Ablage von Freigaben & Quelldateien',
    description: 'Strukturierte und nachvollziehbare Sicherung aller Verträge, Pflichtenhefte, Abnahmeprotokolle sowie offenen Satz- und Mediendateien.',
    correctCategory: 'archive',
    explanation: 'Perfekt! Eine saubere Archivierung schützt bei Gewährleistungsfragen und ermöglicht es Kollegen, bei späteren Nachauflagen sofort auf offene Daten zuzugreifen.',
    ihkTip: 'Rechtssicherheit: Verträge und Abnahmeprotokolle müssen revisionssicher auffindbar sein.',
  },
  {
    id: 'cl-4',
    pillar: '4. Säule: Erfahrungssicherung (Lessons Learned)',
    task: 'Erkenntnisse auffindbar und nutzbar in Folgeprojekte überführen',
    description: 'Systematische Analyse von Fehlannahmen, Reibungspunkten und Best Practices sowie Überführung in verbindliche Checklisten und Prozessstandards.',
    correctCategory: 'lessons',
    explanation: 'Brillant! Wie Christoph Schulze im Skript betont: Lessons Learned nützen nur dann, wenn sie nicht im Archiv verstauben, sondern für kommende Projekte auffindbar und anwendbar sind!',
    ihkTip: 'Kernbotschaft aus Skript Seite 7: Erfahrungssicherung muss für Zukünftiges wirksam nutzbar sein.',
  },
];

interface CyclePhase {
  number: number;
  name: string;
  coreQuestion: string;
  arrowColor: string;
  textColor: string;
  borderColor: string;
  summary: string;
}

const CYCLE_PHASES: CyclePhase[] = [
  {
    number: 1,
    name: 'Initialisierung',
    coreQuestion: 'Projektidee klären (Entscheidung über das OB)',
    arrowColor: 'from-blue-600 to-sky-500',
    textColor: 'text-sky-400',
    borderColor: 'border-sky-500/40',
    summary: 'Anlass, erster Nutzen, Machbarkeit und Go-/No-Go-Entscheidung.',
  },
  {
    number: 2,
    name: 'Definition',
    coreQuestion: 'Ziele und Rahmenbedingungen klären',
    arrowColor: 'from-amber-600 to-orange-500',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/40',
    summary: 'Was genau? Ziele präzisieren, Nicht-Ziele (Scope Creep Schutz), Stakeholder & Kernteam.',
  },
  {
    number: 3,
    name: 'Planung',
    coreQuestion: 'Vorgehen strukturieren',
    arrowColor: 'from-blue-600 to-cyan-500',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    summary: 'Projektstrukturplan (PSP), Termine, Ressourcen, Kosten & Plan als Messbasis.',
  },
  {
    number: 4,
    name: 'Steuerung',
    coreQuestion: 'Fortschritt steuern & Umsetzung begleiten',
    arrowColor: 'from-indigo-700 to-blue-700',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    summary: 'Controlling, Soll-Ist-Vergleiche, Risikosteuerung und formale Ergebnisabnahme!',
  },
  {
    number: 5,
    name: 'Abschluss',
    coreQuestion: 'Erfahrungen sichern und Projekt beenden',
    arrowColor: 'from-rose-700 to-red-600',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    summary: 'Abschlussbericht, Nachkalkulation, Archivierung & nutzbare Lessons Learned.',
  },
];

interface PmCycleFinalGameProps {
  isLevel2?: boolean;
  onComplete?: (earnedXp: number) => void;
}

export const PmCycleFinalGame: React.FC<PmCycleFinalGameProps> = ({
  isLevel2 = false,
  onComplete,
}) => {
  const [currentStage, setCurrentStage] = useState<'pillars' | 'cycle' | 'summary'>('pillars');
  const [showOriginalImage, setShowOriginalImage] = useState<boolean>(true);

  // Stage 1: Pillars
  const [currentPillarIdx, setCurrentPillarIdx] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasAnsweredPillar, setHasAnsweredPillar] = useState<boolean>(false);
  const [pillarScores, setPillarScores] = useState<Record<string, boolean>>({});

  // Stage 2: Cycle Sequence
  const [cycleStep, setCycleStep] = useState<number>(1);
  const [cycleCompleted, setCycleCompleted] = useState<boolean>(false);

  const currentPillar = CLOSURE_TASKS[currentPillarIdx];

  const handleSelectCategory = (cat: 'report' | 'cost' | 'archive' | 'lessons') => {
    if (hasAnsweredPillar) return;
    setSelectedCategory(cat);
    setHasAnsweredPillar(true);

    const isCorrect = cat === currentPillar.correctCategory;
    setPillarScores(prev => ({ ...prev, [currentPillar.id]: isCorrect }));

    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextPillar = () => {
    soundEffects.playClick();
    setSelectedCategory(null);
    setHasAnsweredPillar(false);

    if (currentPillarIdx < CLOSURE_TASKS.length - 1) {
      setCurrentPillarIdx(prev => prev + 1);
    } else {
      setCurrentStage('cycle');
    }
  };

  const handleStepCycle = (phaseNumber: number) => {
    soundEffects.playClick();
    if (phaseNumber === cycleStep) {
      if (cycleStep < 5) {
        setCycleStep(prev => prev + 1);
      } else {
        setCycleCompleted(true);
        soundEffects.playCorrect();
      }
    }
  };

  const handleFinishToSummary = () => {
    soundEffects.playClick();
    setCurrentStage('summary');
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
    if (onComplete) {
      onComplete(80);
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentStage('pillars');
    setCurrentPillarIdx(0);
    setSelectedCategory(null);
    setHasAnsweredPillar(false);
    setPillarScores({});
    setCycleStep(1);
    setCycleCompleted(false);
  };

  const correctPillars = Object.values(pillarScores).filter(Boolean).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Abschluss & DIN 69901-2 Kreislauf
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Kapitel 12 Finale
            </span>
            {isLevel2 && (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                IHK-Meisterstufe
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Phase 5: Abschluss & der geschlossene PM-Kreislauf
          </h3>
          <p className="text-xs text-slate-400">
            Erfahrungen sichern, Nachkalkulation, Archivierung und der geschlossene Lernzyklus nach Christoph Schulze
          </p>
        </div>

        {/* Toggle Original Image button */}
        <button
          onClick={() => setShowOriginalImage(!showOriginalImage)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer self-start sm:self-center"
        >
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>{showOriginalImage ? 'Original-Skript verbergen' : 'Original-Skript zeigen'}</span>
        </button>
      </div>

      {/* Embedded Original Script Asset from Christoph Schulze */}
      {/* Embedded Interaktives 5-Phasen-SVG Schaubild */}
      {showOriginalImage && (
        <div className="mt-5 p-2 sm:p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Interaktives Schaubild: Projektmanagement-Kreislauf (DIN 69901-2)
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
              Skript Christoph Schulze · Seite 7
            </span>
          </div>

          <PmCycleGraphic imageUrl="/assets/aistudio/IMG_3246_0e617e58.jpeg" />

          <p className="text-[11px] text-slate-400 text-center italic">
            Klicke auf die einzelnen Phasen im SVG-Modell, um IHK-Kernziele, Artefakte und Tuckman-Führungsstile einzusehen.
          </p>
        </div>
      )}

      {/* Stage 1: The 4 Pillars of Closure */}
      {currentStage === 'pillars' && currentPillar && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Säule #{currentPillarIdx + 1} von {CLOSURE_TASKS.length}
              </span>
              <span className="text-xs text-slate-400">Zu welcher Abschlussaufgabe gehört das?</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{currentPillar.task}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{currentPillar.description}</p>
          </div>

          {/* Pillars buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleSelectCategory('report')}
              disabled={hasAnsweredPillar}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                hasAnsweredPillar
                  ? currentPillar.correctCategory === 'report'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedCategory === 'report'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-sky-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="p-2 rounded-lg bg-sky-950/60 text-sky-400 border border-sky-800 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Projektabschlussbericht</div>
                <div className="text-xs text-slate-400">Zielerreichung, Abweichungen & formale Entlastung</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectCategory('cost')}
              disabled={hasAnsweredPillar}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                hasAnsweredPillar
                  ? currentPillar.correctCategory === 'cost'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedCategory === 'cost'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-amber-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800 shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Nachkalkulation</div>
                <div className="text-xs text-slate-400">Soll- vs. Ist-Kosten, Stunden & Wirtschaftlichkeit</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectCategory('archive')}
              disabled={hasAnsweredPillar}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                hasAnsweredPillar
                  ? currentPillar.correctCategory === 'archive'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedCategory === 'archive'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-purple-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="p-2 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800 shrink-0">
                <Archive className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Projektdokumentation & Archiv</div>
                <div className="text-xs text-slate-400">Revisionssichere Ablage von Verträgen & Quelldaten</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectCategory('lessons')}
              disabled={hasAnsweredPillar}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                hasAnsweredPillar
                  ? currentPillar.correctCategory === 'lessons'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedCategory === 'lessons'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-rose-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Erfahrungssicherung (Lessons Learned)</div>
                <div className="text-xs text-slate-400">Erkenntnisse auffindbar & nutzbar für Folgendes sichern</div>
              </div>
            </button>
          </div>

          {/* Feedback */}
          {hasAnsweredPillar && (
            <div
              className={`p-4 rounded-xl border ${
                selectedCategory === currentPillar.correctCategory
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className="flex items-start gap-3">
                {selectedCategory === currentPillar.correctCategory ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-sm">
                    {selectedCategory === currentPillar.correctCategory
                      ? 'Perfekt zugeordnet!'
                      : `Säule: ${currentPillar.pillar}`}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentPillar.explanation}
                  </p>
                  <div className="mt-2 text-xs font-medium text-amber-300 flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 rounded-lg px-2.5 py-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{currentPillar.ihkTip}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNextPillar}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  {currentPillarIdx < CLOSURE_TASKS.length - 1 ? (
                    <>
                      Nächste Säule <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Zum DIN 69901-2 Kreislauf <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stage 2: Interactive DIN 69901-2 Cycle */}
      {currentStage === 'cycle' && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Schritt 2: Der geschlossene DIN 69901-2 Kreislauf
              </span>
              <span className="text-xs text-slate-400">
                {cycleCompleted ? 'Kreislauf geschlossen!' : `Aktiviere Phase ${cycleStep} von 5`}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Klicke die 5 Phasen in ihrer logischen Kreislauf-Reihenfolge an, um den dynamischen Lebenszyklus nach dem Original-Skript zu vollenden:
            </p>
          </div>

          {/* Interactive Phase Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {CYCLE_PHASES.map((phase) => {
              const isUnlocked = phase.number <= cycleStep || cycleCompleted;
              const isCurrent = phase.number === cycleStep && !cycleCompleted;

              return (
                <button
                  key={phase.number}
                  onClick={() => handleStepCycle(phase.number)}
                  disabled={isUnlocked && !isCurrent}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isCurrent
                      ? 'bg-sky-950/60 border-sky-400 text-white ring-2 ring-sky-500/50 animate-pulse'
                      : isUnlocked
                      ? `bg-slate-800/80 ${phase.borderColor} text-slate-200`
                      : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-slate-400 mb-1">
                    Phase {phase.number}
                  </div>
                  <div className={`font-bold text-sm ${isUnlocked ? phase.textColor : 'text-slate-500'}`}>
                    {phase.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                    {phase.coreQuestion}
                  </div>
                  {isUnlocked && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                      <Check className="w-3 h-3" /> Aktiv
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Cycle Closure message */}
          {cycleCompleted && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="font-bold text-sm text-emerald-200">
                    Hervorragend: Der DIN 69901-2 Kreislauf ist vollständig geschlossen!
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Aus dem <strong className="text-rose-300">Abschluss (Phase 5)</strong> fließen die gewonnenen Erkenntnisse (<em className="text-white">Lessons Learned</em>, Erfahrungswerte, Nachkalkulationen) direkt als Qualitätsfilter und Standards in die <strong className="text-sky-300">Initialisierung (Phase 1)</strong> nachfolgender Projekte ein.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleFinishToSummary}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  Zur Gesamtauswertung <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stage 3: Summary & Master Badge */}
      {currentStage === 'summary' && (
        <div className="mt-6 space-y-6 text-center">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-tr from-rose-500/30 to-sky-500/30 text-emerald-400 ring-8 ring-emerald-500/10 mb-2">
            <Award className="w-12 h-12 text-amber-400" />
          </div>

          <div>
            <h4 className="text-2xl font-bold text-white">
              Kapitel 12 Meisterprüfung erfolgreich abgeschlossen!
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
              Du hast alle 7 Seiten des Skripts von Christoph Schulze gemeistert: Von DIN 69901 Merkmalen über Tuckman bis zum vollständigen DIN 69901-2 Phasenmodell.
            </p>
          </div>

          {/* Master Key Learnings */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 text-left space-y-3 max-w-lg mx-auto">
            <h5 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Zentrale IHK-Kernaussagen aus Seite 7:
            </h5>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-white">Abnahme beendet Steuerung:</strong> Die formale Abnahme schließt die Steuerung ab – erst danach beginnt der geordnete Abschluss.
              </li>
              <li>
                <strong className="text-white">Die 4 Säulen des Abschlusses:</strong> Abschlussbericht, Nachkalkulation, Archivierung und Erfahrungssicherung.
              </li>
              <li>
                <strong className="text-white">Nachhaltige Lessons Learned:</strong> Erkenntnisse dürfen nicht nur abgelegt werden, sondern müssen auffindbar und in Folgeprojekten tatsächlich anwendbar sein.
              </li>
              <li>
                <strong className="text-amber-300">Der Kreislaufgedanke:</strong> Wissen aus dem Abschluss verhindert Wiederholungsfehler in der nächsten Initialisierung.
              </li>
            </ul>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Simulator wiederholen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
