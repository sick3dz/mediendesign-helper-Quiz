import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Layers, Sliders, AlertTriangle, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

interface PhaseStep {
  id: number;
  name: string;
  question: string;
  keyTask: string;
}

const PM_PHASES_STEPS: PhaseStep[] = [
  {
    id: 1,
    name: '1. Initialisierung',
    question: 'Soll daraus überhaupt ein Projekt entstehen? (Projektidee & Nutzen klären)',
    keyTask: 'Anlass prüfen, groben Nutzen skizzieren, Machbarkeit testen & Zuständigkeiten klären.',
  },
  {
    id: 2,
    name: '2. Definition',
    question: 'Was genau soll erreicht werden? (Ziele, Lastenheft & Projektauftrag)',
    keyTask: 'Ziele präzisieren, Nicht-Ziele abgrenzen, Lastenheft formulieren & offiziellen Projektauftrag erteilen.',
  },
  {
    id: 3,
    name: '3. Planung',
    question: 'Wie, womit und bis wann setzen wir es um? (Ablauf & Ressourcen)',
    keyTask: 'Projektstrukturplan (PSP), Meilensteine, Termine, Kostenkalkulation und Ressourcenallokation erstellen.',
  },
  {
    id: 4,
    name: '4. Steuerung',
    question: 'Liegen wir im Plan und wie reagieren wir auf Abweichungen? (Soll-Ist-Vergleich)',
    keyTask: 'Fortschritt überwachen, Termine/Kosten nachsteuern, Risikomanagement und Änderungen kontrollieren.',
  },
  {
    id: 5,
    name: '5. Abschluss',
    question: 'Ist das Ergebnis abgenommen und was lernen wir daraus? (Lessons Learned)',
    keyTask: 'Projektergebnis übergeben, Retrospektive durchführen, Abschlussbericht schreiben & Team entlasten.',
  },
];

interface ClassificationItem {
  id: string;
  title: string;
  description: string;
  isPmPhase: boolean; // true = PM-Phase, false = Fachliche Phase
  explanation: string;
}

const CLASSIFICATION_ITEMS: ClassificationItem[] = [
  {
    id: 'c-1',
    title: 'Farbproofs an der Druckmaschine abstimmen',
    description: 'Der Drucker prüft die Farbdichte und den Passer auf dem Druckbogen vor dem Auflagendruck.',
    isPmPhase: false,
    explanation: 'Fachliche Phase! Hier entsteht das physische Produktergebnis der Medienproduktion, nicht die Steuerung des Gesamtprojekts.',
  },
  {
    id: 'c-2',
    title: 'Machbarkeitsprüfung der Projektidee',
    description: 'Untersuchung, ob das Vorhaben technisch und wirtschaftlich umsetzbar ist und ob daraus ein Projekt werden soll.',
    isPmPhase: true,
    explanation: 'PM-Phase (Initialisierung)! Es wird entschieden, ob das Projekt überhaupt gestartet und genehmigt wird.',
  },
  {
    id: 'c-3',
    title: 'HTML/CSS-Komponenten und UI-Layout codieren',
    description: 'Frontend-Entwickler bauen die Navigation und Rastervorlagen für das neue Portal.',
    isPmPhase: false,
    explanation: 'Fachliche Phase! Das Erstellen des eigentlichen Codes ist das fachliche Endergebnis.',
  },
  {
    id: 'c-4',
    title: 'Soll-Ist-Vergleich von Arbeitsstunden & Budget',
    description: 'Der Projektleiter vergleicht wöchentlich die Ist-Kosten mit dem kalkulierten Budgetplan.',
    isPmPhase: true,
    explanation: 'PM-Phase (Steuerung)! Die kontinuierliche Überwachung und Nachsteuerung der Projektziele ist Kern des Projektmanagements.',
  },
  {
    id: 'c-5',
    title: 'Erstellen des Projektstrukturplans (PSP)',
    description: 'Aufgliederung des gesamten Vorhabens in Teilaufgaben und planbare Arbeitspakete.',
    isPmPhase: true,
    explanation: 'PM-Phase (Planung)! Der PSP ist das zentrale Steuerungsinstrument der DIN 69901-2 zur Strukturierung.',
  },
  {
    id: 'c-6',
    title: 'Stanzkontur und Sonderfalzung am Schneidplotter testen',
    description: 'Ein Medientechnologe testet die Rill- und Schneidlinien eines neuen Verpackungsentwurfs.',
    isPmPhase: false,
    explanation: 'Fachliche Phase! Es handelt sich um ein operatives Arbeitspaket im Rahmen der Produktentwicklung.',
  },
];

interface Props {
  isLevel2?: boolean;
  onComplete?: (earnedXp: number) => void;
}

export const PmPhasesSorterGame: React.FC<Props> = ({ isLevel2 = false, onComplete }) => {
  const [activeStage, setActiveStage] = useState<'chronology' | 'classify' | 'summary'>('chronology');

  // Chronology stage state
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);

  // Classification stage state
  const [classifyIndex, setClassifyIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [classifyFeedback, setClassifyFeedback] = useState<ClassificationItem | null>(null);
  const [classifyScore, setClassifyScore] = useState(0);

  const currentClassifyItem = CLASSIFICATION_ITEMS[classifyIndex];

  const handleClassifySelect = (isPm: boolean) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(isPm);
    setClassifyFeedback(currentClassifyItem);

    if (isPm === currentClassifyItem.isPmPhase) {
      soundEffects.playCorrect();
      setClassifyScore((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextClassify = () => {
    setSelectedAnswer(null);
    setClassifyFeedback(null);
    if (classifyIndex + 1 < CLASSIFICATION_ITEMS.length) {
      setClassifyIndex((prev) => prev + 1);
    } else {
      setActiveStage('summary');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setActiveStage('chronology');
    setSelectedPhaseId(null);
    setClassifyIndex(0);
    setSelectedAnswer(null);
    setClassifyFeedback(null);
    setClassifyScore(0);
  };

  const totalScore = 5 + classifyScore; // 5 from exploring stages + classification
  const maxScore = 5 + CLASSIFICATION_ITEMS.length;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-blue-500/20 border border-teal-500/30 text-teal-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Interaktiver Phasen- & Architektur-Explorer
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Die 5 Projektmanagementphasen (DIN 69901-2)
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            Score: {classifyScore} / {CLASSIFICATION_ITEMS.length}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 my-4">
        <button
          onClick={() => setActiveStage('chronology')}
          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeStage === 'chronology'
              ? 'bg-teal-500/10 border-teal-500/40 text-teal-300'
              : 'bg-slate-800/40 border-slate-800 text-slate-400'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            Teil 1: DIN 69901-2 Prozesskette
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">5 Phasen & Kernfragen</div>
        </button>
        <button
          onClick={() => setActiveStage('classify')}
          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeStage === 'classify'
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
              : 'bg-slate-800/40 border-slate-800 text-slate-400'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Teil 2: PM- vs. Fachphase
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">
            Fall {activeStage === 'classify' ? classifyIndex + 1 : CLASSIFICATION_ITEMS.length} von {CLASSIFICATION_ITEMS.length}
          </div>
        </button>
      </div>

      {/* STAGE 1: CHRONOLOGY */}
      {activeStage === 'chronology' && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 sm:p-4 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100">IHK-Kernwissen nach DIN 69901-2:</strong> Das Prozessmodell unterscheidet 5 Phasen. Es ist kein starres Schema: Rücksprünge, Überschneidungen und iterative Zyklen sind ausdrücklich erlaubt und oft notwendig! Klicke auf eine Phase, um die Leitfrage zu sehen.
            </div>
          </div>

          <div className="space-y-2">
            {PM_PHASES_STEPS.map((step) => {
              const isSelected = selectedPhaseId === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedPhaseId(step.id);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-950/40 border-teal-500 text-teal-100 shadow-md'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-xs font-extrabold">
                        {step.id}
                      </span>
                      {step.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      {step.id === 1 ? 'Projektstart' : step.id === 5 ? 'Projektende' : 'Regelprozess'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-teal-300">
                    {step.question}
                  </div>
                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-teal-500/30 text-xs text-slate-300 animate-in fade-in duration-200">
                      <strong className="text-white">Hauptaufgabe:</strong> {step.keyTask}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveStage('classify')}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Weiter zu Teil 2: PM- vs. Fachphase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: CLASSIFICATION */}
      {activeStage === 'classify' && currentClassifyItem && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide text-cyan-400">
                Aktivität #{classifyIndex + 1}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Klassifikations-Check
              </span>
            </div>
            <h4 className="text-slate-100 font-bold text-base mb-1">
              {currentClassifyItem.title}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              „{currentClassifyItem.description}“
            </p>
          </div>

          <div className="text-xs text-center font-medium text-slate-400">
            Handelt es sich um eine Projektmanagement-Phase oder eine fachliche Projektphase?
          </div>

          {/* 2 Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* PM-Phase Button */}
            <button
              onClick={() => handleClassifySelect(true)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                selectedAnswer === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-teal-500/50 hover:bg-slate-800 cursor-pointer'
                  : currentClassifyItem.isPmPhase
                  ? 'bg-teal-950/40 border-teal-500/80 text-teal-200'
                  : selectedAnswer === true
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 flex items-center gap-1.5">
                  Projektmanagement-Phase (DIN 69901-2)
                  {selectedAnswer !== null && currentClassifyItem.isPmPhase && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                  {selectedAnswer === true && !currentClassifyItem.isPmPhase && (
                    <X className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  Führungs-, Planungs- & Steuerungsaufgaben (Initialisierung, Definition, Planung, Steuerung, Abschluss).
                </div>
              </div>
            </button>

            {/* Fachliche Phase Button */}
            <button
              onClick={() => handleClassifySelect(false)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                selectedAnswer === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 cursor-pointer'
                  : !currentClassifyItem.isPmPhase
                  ? 'bg-cyan-950/40 border-cyan-500/80 text-cyan-200'
                  : selectedAnswer === false
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 flex items-center gap-1.5">
                  Fachliche Projektphase
                  {selectedAnswer !== null && !currentClassifyItem.isPmPhase && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                  {selectedAnswer === false && currentClassifyItem.isPmPhase && (
                    <X className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  Operative Produktherstellung (z. B. Konzept, Screendesign, Programmierung, Satz, Druck, Weiterverarbeitung).
                </div>
              </div>
            </button>
          </div>

          {/* Feedback Box */}
          {classifyFeedback && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                selectedAnswer === currentClassifyItem.isPmPhase
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : 'bg-amber-950/30 border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedAnswer === currentClassifyItem.isPmPhase ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">Exakt richtig klassifiziert!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-400" />
                    <span className="text-amber-300">
                      IHK-Unterscheidung: Das ist eine {currentClassifyItem.isPmPhase ? 'Projektmanagement-Phase' : 'fachliche Phase'}!
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentClassifyItem.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextClassify}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {classifyIndex + 1 < CLASSIFICATION_ITEMS.length ? 'Nächste Aktivität' : 'Auswertung anzeigen'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUMMARY */}
      {activeStage === 'summary' && (
        <div className="text-center py-6 px-4 space-y-5 animate-in zoom-in-95 duration-400">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-blue-500/20 border border-teal-500/40 text-teal-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-100">
              Phasen-Diplom: DIN 69901-2 Prozessmodell verinnerlicht!
            </h4>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Du hast {classifyScore} von {CLASSIFICATION_ITEMS.length} Praxisfällen zielsicher zwischen PM- und Fachphasen unterschieden.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-teal-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
                <Layers className="w-4 h-4" />
                Die 5 PM-Phasen (DIN 69901-2):
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                1. Initialisierung → 2. Definition → 3. Planung → 4. Steuerung → 5. Abschluss.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-cyan-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <AlertTriangle className="w-4 h-4" />
                Typischer IHK-Hauptfehler:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                „Zu früh mit fachlicher Arbeit beginnen, bevor Ziele und Zuständigkeiten in Initialisierung und Definition geklärt sind.“
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Explorer wiederholen
            </button>
            {onComplete && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onComplete(classifyScore * 15);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Weiter zum Wissens-Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
