import React, { useState, useMemo } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Layers, Briefcase, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { shuffleArray } from '../../utils/learningLogic';

interface TaskItem {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: 'projekt' | 'routine';
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const LEVEL1_TASKS: TaskItem[] = [
  {
    id: 'pvr-1',
    scenario: 'Entwicklung eines Standbogens einer besonderen Falzung für eine neue Flyerserie inklusive Stanzkontur.',
    question: 'Handelt es sich hierbei um ein Projekt oder eine Routineaufgabe?',
    options: [
      {
        id: 'projekt',
        text: 'Projekt',
        isCorrect: true,
        explanation: 'Richtig! Aus dem IHK-Skript: Die Neuentwicklung einer Falzung/Stanze ist einmalig, neuartig und erfordert Planung vor Beginn.',
      },
      {
        id: 'routine',
        text: 'Routineaufgabe',
        isCorrect: false,
        explanation: 'Falsch: Da eine neuartige Konstruktion geschaffen wird, ist dies keine wiederkehrende Routinearbeit.',
      },
    ],
  },
  {
    id: 'pvr-2',
    scenario: 'Fortlaufender Nachdruck und Auslieferung von jeweils 5.000 weiteren Flyern aus der bestehenden Flyerserie alle 3 Monate.',
    question: 'Wie wird dieser Arbeitsvorgang fachlich eingeordnet?',
    options: [
      {
        id: 'routine',
        text: 'Routineaufgabe',
        isCorrect: true,
        explanation: 'Exakt! IHK-Definition: Findet in festgeschriebenen zeitlichen Abständen wiederholt statt – bestehende Prozesse ohne Neuartigkeit.',
      },
      {
        id: 'projekt',
        text: 'Projekt',
        isCorrect: false,
        explanation: 'Falsch: Ein wiederkehrender Nachdruck nach festem Schema ist eine klassische Routineaufgabe.',
      },
    ],
  },
  {
    id: 'pvr-3',
    scenario: 'Einführung einer neuen 8-Farben-Offsetdruckmaschine inklusive Personalschulung, Farbprofilierung und Workflow-Anpassung.',
    question: 'Projekt oder Routineaufgabe?',
    options: [
      {
        id: 'projekt',
        text: 'Projekt',
        isCorrect: true,
        explanation: 'Richtig! Die Maschineneinführung ist einmalig, komplex, budgetiert, zeitlich befristet und birgt Umstellungsrisiken.',
      },
      {
        id: 'routine',
        text: 'Routineaufgabe',
        isCorrect: false,
        explanation: 'Falsch: Die Einführung einer neuen Anlage ist ein komplexes einmaliges Vorhaben (Projekt).',
      },
    ],
  },
  {
    id: 'pvr-4',
    scenario: 'Tägliche Reinigung der Farbwerke, Messung des Feuchtmittels und Nachfüllen des Druckpapiers vor Schichtbeginn.',
    question: 'Wie ist dieser Arbeitsablauf zu klassifizieren?',
    options: [
      {
        id: 'routine',
        text: 'Routineaufgabe',
        isCorrect: true,
        explanation: 'Richtig! Dies ist eine dauerhafte, wiederkehrende Standard-Wartungsaufgabe mit fest vorgegebenen Schritten.',
      },
      {
        id: 'projekt',
        text: 'Projekt',
        isCorrect: false,
        explanation: 'Falsch: Tägliche Standardwartungen sind Routine, keine einmaligen Zielvorhaben.',
      },
    ],
  },
];

const LEVEL2_TASKS: TaskItem[] = [
  {
    id: 'pvr-l2-1',
    scenario: 'Ein Kunde beauftragt nach 4 Jahren den kompletten Relaunch seines Online-Shops mit responsiver Neugestaltung und Schnittstellen-Anbindung an ein neues PIM-System.',
    question: 'Entscheide und begründe: Projekt oder Routine?',
    options: [
      {
        id: 'projekt',
        text: 'Projekt (Neuartig, komplex & risikobehaftet)',
        isCorrect: true,
        explanation: 'Korrekt! Alle 7 DIN-Projektmerkmale sind erfüllt: Fester Endtermin (Go-Live), Budgetgrenze, Teammitarbeiter und technisches Schnittstellen-Risiko.',
      },
      {
        id: 'routine',
        text: 'Routineaufgabe (Wiederkehrende Webpflege)',
        isCorrect: false,
        explanation: 'Falsch: Ein System-Relaunch mit neuer Architektur ist keine laufende Standardpflege.',
      },
    ],
  },
  {
    id: 'pvr-l2-2',
    scenario: 'Wöchentliches Einpflegen von 15 neuen Standard-Artikeln inklusive Preisen und Bildern in das bestehende Online-Shop-System.',
    question: 'Welche Einstufung ist nach IHK-Kriterien zutreffend?',
    options: [
      {
        id: 'routine',
        text: 'Routineaufgabe (Regelbetrieb)',
        isCorrect: true,
        explanation: 'Richtig! Fester Prozess im laufenden Betrieb ohne Zielneuartigkeit oder inhärentes Projektrisiko.',
      },
      {
        id: 'projekt',
        text: 'Projekt (Wöchentliches Miniprojekt)',
        isCorrect: false,
        explanation: 'Falsch: Wiederkehrende Datenpflege ohne Einmaligkeit ist kein Projekt im Sinne des Projektmanagements.',
      },
    ],
  },
  {
    id: 'pvr-l2-3',
    scenario: 'Konzeption, Entwicklung und Druck eines modularen Messe-Pavillons mit integrierten AR-Showrooms für die Fachmesse im November.',
    question: 'Wie ist diese Aufgabe nach Projektmerkmalen zu bewerten?',
    options: [
      {
        id: 'projekt',
        text: 'Projekt (Einmalig mit hartem Stichtag)',
        isCorrect: true,
        explanation: 'Exakt! Fester unverschiebbarer Endtermin (Messeeröffnung), einmalige Spezialkonstruktion, Budget und bereichsübergreifendes Team.',
      },
      {
        id: 'routine',
        text: 'Routineaufgabe (Marketingtätigkeit)',
        isCorrect: false,
        explanation: 'Falsch: Messe-Sonderbauten sind typische, zeitkritische Projektvorhaben.',
      },
    ],
  },
];

interface Props {
  isLevel2?: boolean;
  onComplete: (earnedXp: number) => void;
}

export const ProjectVsRoutineGame: React.FC<Props> = ({ isLevel2 = false, onComplete }) => {
  const tasks = useMemo(() => {
    return isLevel2 ? shuffleArray(LEVEL2_TASKS) : shuffleArray(LEVEL1_TASKS);
  }, [isLevel2]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentTask = tasks[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const option = currentTask.options.find(o => o.id === optionId);
    if (option?.isCorrect) {
      soundEffects.playCorrect();
      setScore(prev => prev + 1);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundEffects.playLevelUp();
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const earnedXp = score * 10;

  if (isFinished) {
    const isPerfect = score === tasks.length;
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-200 dark:border-teal-800">
          <Award className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {isPerfect ? 'Perfekt abgegrenzt!' : 'Challenge abgeschlossen!'}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Du hast <strong className="text-slate-900 dark:text-slate-100">{score} von {tasks.length}</strong> Szenarien sicher als Projekt oder Routineaufgabe klassifiziert.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 mb-6 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            +{earnedXp} EXP für dein Wissen!
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Nochmal üben
          </button>

          <button
            onClick={() => onComplete(earnedXp)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Weiter zum Wissens-Check</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const selectedOption = currentTask.options.find(o => o.id === selectedOptionId);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 max-w-2xl mx-auto shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Interaktive Zuordnung {isLevel2 && '★ Meisterstufe'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Projekt vs. Routineaufgabe
            </h4>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          Fall {currentIndex + 1} / {tasks.length}
        </div>
      </div>

      {/* Scenario Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 mb-5">
        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Praxisszenario</span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
          „{currentTask.scenario}“
        </p>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2">
          {currentTask.question}
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {currentTask.options.map(option => {
          const isSelected = selectedOptionId === option.id;
          let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500';

          if (isAnswered) {
            if (option.isCorrect) {
              btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/30';
            } else if (isSelected && !option.isCorrect) {
              btnClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/30';
            } else {
              btnClass = 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
            }
          }

          return (
            <button
              key={option.id}
              disabled={isAnswered}
              onClick={() => handleSelectOption(option.id)}
              className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  option.id === 'projekt'
                    ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                }`}>
                  {option.id === 'projekt' ? <Briefcase className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                </div>
                <span className="text-sm font-bold">{option.text}</span>
              </div>

              {isAnswered && (
                <div>
                  {option.isCorrect ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : isSelected ? (
                    <X className="w-5 h-5 text-rose-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && selectedOption && (
        <div className={`p-4 rounded-xl border mb-5 animate-in fade-in slide-in-from-bottom-2 ${
          selectedOption.isCorrect
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-bold mr-1">
                {selectedOption.isCorrect ? 'Fachlich korrekt!' : 'Achtung IHK-Falle:'}
              </span>
              {selectedOption.explanation}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      {isAnswered && (
        <div className="flex items-center justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>{currentIndex < tasks.length - 1 ? 'Nächster Fall' : 'Ergebnis anzeigen'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
