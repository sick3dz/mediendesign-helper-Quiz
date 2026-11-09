import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Target, Calendar, Activity, AlertTriangle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TaskCard {
  id: string;
  title: string;
  description: string;
  correctPhase: 'definition' | 'planning' | 'controlling';
  phaseName: string;
  explanation: string;
  ihkTip?: string;
}

const CLASSIFICATION_TASKS: TaskCard[] = [
  {
    id: 't-1',
    title: 'Nicht-Ziele formulieren & Projekt abgrenzen',
    description: 'Festlegen, welche Funktionen, Sprachversionen oder Medienkanäle ausdrücklich NICHT zum Projektumfang gehören.',
    correctPhase: 'definition',
    phaseName: 'Phase 2: Definition',
    explanation: 'Richtig! Die explizite Abgrenzung von Nicht-Zielen in der Definition ist der wirksamste Schutz vor schleichender Ausuferung (Scope Creep).',
    ihkTip: 'IHK-Klassiker: Fehlen Nicht-Ziele, ufern Kundenwünsche fast zwangsläufig aus.',
  },
  {
    id: 't-2',
    title: 'Projektstrukturplan (PSP) erstellen',
    description: 'Das Gesamtprojekt hierarchisch in steuerbare Teilaufgaben und konkrete Arbeitspakete zerlegen.',
    correctPhase: 'planning',
    phaseName: 'Phase 3: Planung',
    explanation: 'Exakt! Der PSP ist das "Rückgrat" der Planungsphase und bildet die Grundlage für Termin-, Ressourcen- und Kostenpläne.',
    ihkTip: 'Der PSP zerlegt das "Was" in planbare Arbeitspakete mit klarer Verantwortung.',
  },
  {
    id: 't-3',
    title: 'Soll-Ist-Vergleich von Meilensteinen & Kosten',
    description: 'Wöchentliche Gegenüberstellung von angefallenem Aufwand und erreichtem Fertigstellungsgrad im Projektcontrolling.',
    correctPhase: 'controlling',
    phaseName: 'Phase 4: Steuerung',
    explanation: 'Sehr gut! Die Steuerung kontrolliert laufend die Einhaltung von Zeit, Kosten und Qualität und leitet bei Abweichungen Korrekturen ein.',
  },
  {
    id: 't-4',
    title: 'Stakeholder identifizieren & Kernteam festlegen',
    description: 'Interessensgruppen (Auftraggeber, Anwender, IT, Marketing) analysieren und Schlüsselrollen im Projektteam benennen.',
    correctPhase: 'definition',
    phaseName: 'Phase 2: Definition',
    explanation: 'Genau! Bevor detailliert geplant wird, müssen in der Definitionsphase alle Einflussnehmer und die Kernbesetzung geklärt sein.',
  },
  {
    id: 't-5',
    title: 'Kosten-, Finanzmittel- & Terminplan mit Puffern kalkulieren',
    description: 'Arbeitspakete terminieren, Abhängigkeiten im Netzplan darstellen, Budgetallokation und Zeitpuffer für Risiken einplanen.',
    correctPhase: 'planning',
    phaseName: 'Phase 3: Planung',
    explanation: 'Richtig! Hier wird der strukturierte Weg festgelegt. Der Plan ist dabei kein starres Gesetz, sondern die Messbasis für spätere Abweichungen.',
  },
  {
    id: 't-6',
    title: 'Formale Abnahme des Projektergebnisses durch den Kunden',
    description: 'Prüfung des erstellten Medienprodukts gegen das Pflichtenheft und Unterzeichnung des formalen Abnahmeprotokolls.',
    correctPhase: 'controlling',
    phaseName: 'Phase 4: Steuerung',
    explanation: 'Achtung Prüfungsfalle – brillant gelöst! Nach dem Prozessmodell der DIN 69901-2 gehört die Abnahme des Projektergebnisses noch zur Phase "Steuerung", da erst mit ihr die fachliche Umsetzung offiziell bestätigt wird!',
    ihkTip: 'Prüfungsfalle: Viele vermuten die Abnahme im Abschluss – im DIN-Modell gehört sie zur Steuerung!',
  },
];

interface Dilemma {
  id: string;
  situation: string;
  contextBadge: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const DILEMMAS: Dilemma[] = [
  {
    id: 'd-1',
    contextBadge: 'Phase 2: Definition vs. Scope Creep',
    situation: 'Bei einem Webshop-Relaunch fordert der Kunde kurz vor dem Go-Live zusätzlich einen interaktiven 3D-Produktkonfigurator. Er behauptet: "Sie haben doch versprochen, einen modernen Shop zu bauen – das gehört heute einfach dazu!"',
    question: 'In welcher Phase wurde das Versäumnis begangen und wie reagiert das professionelle Projektmanagement?',
    options: [
      {
        id: 'opt-1a',
        text: 'Um den Kunden nicht zu verärgern, setzt das Team den 3D-Konfigurator sofort im Rahmen des bestehenden Budgets um.',
        isCorrect: false,
        feedback: 'Falsch! Das führt zu massiven Termin- und Budgetüberschreitungen auf Kosten der Agentur (Scope Creep).',
      },
      {
        id: 'opt-1b',
        text: 'Versäumnis in Phase 2 (Definition): Es wurden keine klaren Nicht-Ziele dokumentiert. Lösung: Formelles Change Request Verfahren mit separater Kosten- & Terminkalkulation.',
        isCorrect: true,
        feedback: 'Perfekt! Fehlende Nicht-Ziele in der Definition öffnen Scope Creep Tür und Tor. Neue Anforderungen müssen über ein definiertes Änderungsverfahren mit Mehrkosten und Terminverlängerung verhandelt werden.',
      },
      {
        id: 'opt-1c',
        text: 'Der Projektleiter bricht das Projekt ab und geht zurück in Phase 1 (Initialisierung).',
        isCorrect: false,
        feedback: 'Völlig überzogen. Das Projekt ist weit fortgeschritten; hier greift das Änderungsmanagement (Change Request) in der Steuerung.',
      },
    ],
  },
  {
    id: 'd-2',
    contextBadge: 'Phase 3 & 4: Planung vs. Steuerung',
    situation: 'Mitten in der Medienproduktion streikt der Druckmaschinen-Zulieferer 10 Tage lang. Der Projektleiter beharrt stur: "Der Meilensteinplan wurde so unterschrieben und darf unter keinen Umständen angetastet werden! Wir arbeiten einfach ohne Pause weiter."',
    question: 'Wie bewertet die DIN 69901-2 diese Haltung zur Projektplanung?',
    options: [
      {
        id: 'opt-2a',
        text: 'Korrekt: Ein genehmigter Projektplan ist ein unumstößliches Dogma, das jede Planänderung verbietet.',
        isCorrect: false,
        feedback: 'Falsch! Ein Plan ist kein starres Gesetz, sondern eine dynamische Richtschnur.',
      },
      {
        id: 'opt-2b',
        text: 'Falsch: Ein Plan ist kein starres Gesetz, sondern die Messbasis für Abweichungen. In der Steuerung müssen Puffer geprüft, Alternativen gesucht oder Termine kontrolliert nachgesteuert werden.',
        isCorrect: true,
        feedback: 'Exzellent! Professionelle Planung nach DIN 69901-2 schafft die Vergleichsbasis, um unvorhergesehene Abweichungen transparent zu steuern, statt die Augen vor der Realität zu verschließen.',
      },
      {
        id: 'opt-2c',
        text: 'Falsch: Man hätte in Phase 3 überhaupt keinen Plan erstellen sollen, weil Pläne sowieso nie eingehalten werden.',
        isCorrect: false,
        feedback: 'Nein! Ohne Plan hat man keine Basis, um Abweichungen überhaupt erst festzustellen.',
      },
    ],
  },
];

interface PmLifecycleSimGameProps {
  isLevel2?: boolean;
  onComplete?: (earnedXp: number) => void;
}

export const PmLifecycleSimGame: React.FC<PmLifecycleSimGameProps> = ({
  isLevel2 = false,
  onComplete,
}) => {
  const [currentStage, setCurrentStage] = useState<'classify' | 'dilemma' | 'summary'>('classify');

  // Stage 1: Classification
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [selectedPhase, setSelectedPhase] = useState<'definition' | 'planning' | 'controlling' | null>(null);
  const [hasAnsweredTask, setHasAnsweredTask] = useState<boolean>(false);
  const [taskScores, setTaskScores] = useState<Record<string, boolean>>({});

  // Stage 2: Dilemma
  const [dilemmaIndex, setDilemmaIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredDilemma, setHasAnsweredDilemma] = useState<boolean>(false);
  const [dilemmaScores, setDilemmaScores] = useState<Record<string, boolean>>({});

  const currentTask = CLASSIFICATION_TASKS[taskIndex];
  const currentDilemma = DILEMMAS[dilemmaIndex];

  const handleSelectPhase = (phase: 'definition' | 'planning' | 'controlling') => {
    if (hasAnsweredTask) return;
    setSelectedPhase(phase);
    setHasAnsweredTask(true);

    const isCorrect = phase === currentTask.correctPhase;
    setTaskScores(prev => ({ ...prev, [currentTask.id]: isCorrect }));

    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextTask = () => {
    soundEffects.playClick();
    setSelectedPhase(null);
    setHasAnsweredTask(false);

    if (taskIndex < CLASSIFICATION_TASKS.length - 1) {
      setTaskIndex(prev => prev + 1);
    } else {
      setCurrentStage('dilemma');
    }
  };

  const handleSelectDilemmaOption = (optionId: string) => {
    if (hasAnsweredDilemma) return;
    setSelectedOptionId(optionId);
    setHasAnsweredDilemma(true);

    const chosenOption = currentDilemma.options.find(opt => opt.id === optionId);
    const isCorrect = chosenOption?.isCorrect ?? false;
    setDilemmaScores(prev => ({ ...prev, [currentDilemma.id]: isCorrect }));

    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextDilemma = () => {
    soundEffects.playClick();
    setSelectedOptionId(null);
    setHasAnsweredDilemma(false);

    if (dilemmaIndex < DILEMMAS.length - 1) {
      setDilemmaIndex(prev => prev + 1);
    } else {
      setCurrentStage('summary');
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onComplete) {
        onComplete(70);
      }
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentStage('classify');
    setTaskIndex(0);
    setSelectedPhase(null);
    setHasAnsweredTask(false);
    setTaskScores({});
    setDilemmaIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredDilemma(false);
    setDilemmaScores({});
  };

  const totalCorrectTasks = Object.values(taskScores).filter(Boolean).length;
  const totalCorrectDilemmas = Object.values(dilemmaScores).filter(Boolean).length;
  const totalScore = totalCorrectTasks + totalCorrectDilemmas;
  const maxScore = CLASSIFICATION_TASKS.length + DILEMMAS.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              DIN 69901-2 Phasen-Simulator
            </span>
            {isLevel2 && (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                IHK-Transfer
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Phasen 2–4: Definition, Planung & Steuerung
          </h3>
          <p className="text-xs text-slate-400">
            Meistere die Schlüsselphasen: Nicht-Ziele, PSP-Struktur und Projektcontrolling nach DIN 69901-2
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 text-xs font-medium bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-center">
          {currentStage === 'classify' && (
            <span>Aufgabe {taskIndex + 1} von {CLASSIFICATION_TASKS.length}</span>
          )}
          {currentStage === 'dilemma' && (
            <span>Praxisfall {dilemmaIndex + 1} von {DILEMMAS.length}</span>
          )}
          {currentStage === 'summary' && (
            <span className="text-emerald-400 font-semibold">Abschluss</span>
          )}
        </div>
      </div>

      {/* Stage 1: Classification */}
      {currentStage === 'classify' && currentTask && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Zuordnungsaufgabe #{taskIndex + 1}
              </span>
              <span className="text-xs text-slate-400">Welcher PM-Phase gehört das an?</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{currentTask.title}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{currentTask.description}</p>
          </div>

          {/* Phase Target Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleSelectPhase('definition')}
              disabled={hasAnsweredTask}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hasAnsweredTask
                  ? currentTask.correctPhase === 'definition'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedPhase === 'definition'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-sky-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-sky-400 mb-1">
                <Target className="w-4 h-4" />
                Phase 2: Definition
              </div>
              <div className="text-xs text-slate-400">
                Was genau? Ziele, Nicht-Ziele & Stakeholder
              </div>
            </button>

            <button
              onClick={() => handleSelectPhase('planning')}
              disabled={hasAnsweredTask}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hasAnsweredTask
                  ? currentTask.correctPhase === 'planning'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedPhase === 'planning'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-amber-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-amber-400 mb-1">
                <Calendar className="w-4 h-4" />
                Phase 3: Planung
              </div>
              <div className="text-xs text-slate-400">
                Wie & bis wann? PSP, Termine, Kosten & Puffer
              </div>
            </button>

            <button
              onClick={() => handleSelectPhase('controlling')}
              disabled={hasAnsweredTask}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                hasAnsweredTask
                  ? currentTask.correctPhase === 'controlling'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : selectedPhase === 'controlling'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                  : 'bg-slate-800/70 border-slate-700 hover:border-emerald-500 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400 mb-1">
                <Activity className="w-4 h-4" />
                Phase 4: Steuerung
              </div>
              <div className="text-xs text-slate-400">
                Im Plan? Controlling, Soll-Ist & Abnahme
              </div>
            </button>
          </div>

          {/* Feedback Section */}
          {hasAnsweredTask && (
            <div
              className={`p-4 rounded-xl border ${
                selectedPhase === currentTask.correctPhase
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className="flex items-start gap-3">
                {selectedPhase === currentTask.correctPhase ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-sm">
                    {selectedPhase === currentTask.correctPhase
                      ? 'Richtig zugeordnet!'
                      : `Nicht ganz – Gehört zu: ${currentTask.phaseName}`}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentTask.explanation}
                  </p>
                  {currentTask.ihkTip && (
                    <div className="mt-2 text-xs font-medium text-amber-300 flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 rounded-lg px-2.5 py-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{currentTask.ihkTip}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNextTask}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-sm flex items-center gap-2 shadow-lg transition-colors"
                >
                  {taskIndex < CLASSIFICATION_TASKS.length - 1 ? (
                    <>
                      Nächste Aufgabe <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Weiter zu Praxisfällen <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stage 2: Dilemma / Transfer Cases */}
      {currentStage === 'dilemma' && currentDilemma && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentDilemma.contextBadge}
              </span>
              <span className="text-xs text-slate-400">Praxisfall {dilemmaIndex + 1} von {DILEMMAS.length}</span>
            </div>
            <p className="text-sm text-slate-200 mb-3 leading-relaxed">
              {currentDilemma.situation}
            </p>
            <h4 className="text-base font-bold text-white border-t border-slate-700/50 pt-3">
              {currentDilemma.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentDilemma.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectDilemmaOption(option.id)}
                  disabled={hasAnsweredDilemma}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    hasAnsweredDilemma
                      ? option.isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                        : isSelected
                        ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                        : 'bg-slate-800/30 border-slate-700/40 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 border-slate-700 hover:border-sky-500 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-slate-700 text-slate-200 shrink-0 mt-0.5">
                      {option.id.slice(-1).toUpperCase()}
                    </span>
                    <span className="text-sm leading-relaxed">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dilemma Feedback */}
          {hasAnsweredDilemma && (
            <div
              className={`p-4 rounded-xl border ${
                currentDilemma.options.find(o => o.id === selectedOptionId)?.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className="flex items-start gap-3">
                {currentDilemma.options.find(o => o.id === selectedOptionId)?.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-sm">
                    {currentDilemma.options.find(o => o.id === selectedOptionId)?.isCorrect
                      ? 'IHK-Transfer exzellent gelöst!'
                      : 'IHK-Praxishinweis'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentDilemma.options.find(o => o.id === selectedOptionId)?.feedback}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNextDilemma}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-sm flex items-center gap-2 shadow-lg transition-colors"
                >
                  {dilemmaIndex < DILEMMAS.length - 1 ? (
                    <>
                      Nächster Praxisfall <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Zur Zusammenfassung <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stage 3: Summary */}
      {currentStage === 'summary' && (
        <div className="mt-6 space-y-6 text-center">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10 mb-2">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-2xl font-bold text-white">
              Simulator erfolgreich absolviert!
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
              Du hast <span className="font-bold text-emerald-400">{totalScore} von {maxScore} Punkten</span> erzielt.
            </p>
          </div>

          {/* Key Insights Box */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 text-left space-y-3 max-w-lg mx-auto">
            <h5 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-sky-400" />
              IHK-Kernwissen aus den Phasen 2–4:
            </h5>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-white">Definition:</strong> Nicht-Ziele sind der wirksamste Schutz vor schleichender Ausweitung (Scope Creep).
              </li>
              <li>
                <strong className="text-white">Planung:</strong> Der Projektstrukturplan (PSP) zerlegt das Vorhaben. Ein Plan ist kein starres Gesetz, sondern die Messbasis für Abweichungen.
              </li>
              <li>
                <strong className="text-white">Steuerung:</strong> Fachliche Umsetzung ist keine eigene PM-Phase. Das Projektmanagement steuert Termine, Kosten und Risiken.
              </li>
              <li>
                <strong className="text-amber-300">Prüfungsfalle DIN 69901-2:</strong> Die formale Abnahme des Projektergebnisses wird der Phase <em>Steuerung</em> zugeordnet!
              </li>
            </ul>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Nochmal spielen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
