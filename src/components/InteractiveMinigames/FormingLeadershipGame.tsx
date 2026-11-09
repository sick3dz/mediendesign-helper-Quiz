import React, { useState, useMemo } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Compass, Users, Sparkles, HelpCircle, ShieldAlert } from 'lucide-react';
import { shuffleArray } from '../../utils/learningLogic';

interface LeadershipScenario {
  id: string;
  situation: string;
  context: string;
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    leadershipPrinciple: string;
  }[];
}

const SCENARIOS: LeadershipScenario[] = [
  {
    id: 'form-1',
    situation: 'Das Kickoff-Meeting: Scheinbare Perfektion',
    context: 'Im Kickoff-Meeting deines neuen Web-Projekts ist die Stimmung heiter. Du präsentierst Meilensteine und Termine. Niemand widerspricht, alle lächeln freundlich und nicken zustimmend. Ein Kollege meint: „Wahnsinn, die Truppe zieht sofort mit – das Team ist jetzt schon reif!“',
    question: 'Wie schätzt du als geschulte Führungskraft die Situation ein?',
    choices: [
      {
        id: 'a',
        text: 'Vorsicht vor der Scheinharmonie-Falle: Das Team befindet sich im Forming. Die Harmonie ist echt, aber oberflächlich und noch nicht belastbar. Jetzt müssen zügig klare Rollen und Spielregeln definiert werden.',
        isCorrect: true,
        explanation: 'Klassischer IHK-Lehrbuchfall! In Phase 1 tastet man sich ab und meidet Konflikte. Dies darf keinesfalls mit belastbarer Teamreife verwechselt werden – sie bricht beim ersten Gegenwind zusammen.',
        leadershipPrinciple: 'Forming-Regel 1: Oberflächliche Harmonie nicht mit echter Reife verwechseln!',
      },
      {
        id: 'b',
        text: 'Zustimmen und sofort die ersten Deadlines vorziehen, da das Team offensichtlich bereits in der Performing-Phase angekommen ist.',
        isCorrect: false,
        explanation: 'Gefährliche Fehleinschätzung! Ein neu formiertes Team kann unmöglich ohne Klärungs- und Reibungsphase direkt in der Hochleistungsphase (Performing) sein.',
        leadershipPrinciple: 'Irrtum: Phasen können nicht einfach übersprungen werden.',
      },
    ],
  },
  {
    id: 'form-2',
    situation: 'Die Besetzungs-Illusion',
    context: 'Drei hochkarätige Spezialisten (Senior UX-Designer, Fullstack-Entwickler, Drucktechniker) werden für eine Crossmedia-Kampagne zusammengestellt. Die Abteilungsleitung sagt: „Stell einfach die Top-Talente zusammen, gib ihnen das Ziel vor und halt dich raus – der Rest ergibt sich von selbst.“',
    question: 'Welche Führungsentscheidung triffst du nach dem Tuckman-Modell?',
    choices: [
      {
        id: 'a',
        text: 'Widersprechen: Teamentwicklung ist eine Führungsaufgabe, keine bloße Besetzungsfrage! Fähige Einzelne bilden nicht automatisch ein gutes Team. Im Forming brauchen sie Orientierung und gemeinsame Normen.',
        isCorrect: true,
        explanation: 'Exakt! Christoph Schulze betont: Was zwischen den Menschen entsteht (Vertrauen, gemeinsame Spielregeln), lässt sich nicht anordnen, sondern muss durch Führung aktiv ermöglicht werden.',
        leadershipPrinciple: 'Forming-Regel 2: Teamentwicklung ist aktive Führungsaufgabe, kein Selbstläufer!',
      },
      {
        id: 'b',
        text: 'Die Anweisung befolgen und sich komplett heraushalten, da erfahrene Spezialisten grundsätzlich keine Orientierung oder Rollenklärung benötigen.',
        isCorrect: false,
        explanation: 'Falsch: Selbst Top-Experten geraten ohne klare Rollen und Kommunikationsregeln in der Folgephase (Storming) in destruktive Grabenkämpfe.',
        leadershipPrinciple: 'Fehler: Laissez-faire in der Forming-Phase führt zu Orientierungslosigkeit.',
      },
    ],
  },
  {
    id: 'form-3',
    situation: 'Fragen-Monopol & Peer-Kommunikation',
    context: 'In den ersten Projekttagen stellst du fest: Bei jeder Detailfrage (z. B. Farbwerte, Dateiformate, Freigaben) kommen die Teammitglieder einzeln zu dir ins Büro. Untereinander sprechen sie kaum und tauschen sich nicht direkt aus.',
    question: 'Was ist die Ursache und wie intervenierst du professionell?',
    choices: [
      {
        id: 'a',
        text: 'Das Verhalten ist ein typisches Forming-Symptom (Orientierung an der Leitfigur). Geduldig Orientierung geben, aber gezielt Dialog-Räume und Peer-Reviews schaffen, damit sie Vertrauen untereinander aufbauen.',
        isCorrect: true,
        explanation: 'Richtig! Im Forming richtet sich die Energie primär nach oben zur Führungskraft. Professionelle Führung beantwortet Grundsatzfragen, fördert aber aktiv den Austausch unter den Kollegen.',
        leadershipPrinciple: 'Forming-Regel 3: Sicherheit geben, aber schrittweise die Peer-Kommunikation stärken.',
      },
      {
        id: 'b',
        text: 'Fragen brüsk abblocken und verlangen, dass sie Probleme gefälligst unter sich ausmachen sollen, ohne die Leitung zu belästigen.',
        isCorrect: false,
        explanation: 'Falsch: Das erzeugt Verunsicherung und Angst in einer Phase, in der das Sicherheitsbedürfnis am höchsten ist.',
        leadershipPrinciple: 'Fehler: Fehlende Führung im Forming erzeugt Unsicherheit statt Autonomie.',
      },
    ],
  },
  {
    id: 'form-4',
    situation: 'Aktionismus vs. Grundlagenarbeit',
    context: 'Das Team strotzt vor Motivation und will sofort drauflosarbeiten. Ein Kollege schlägt vor: „Lass uns die Rollenmatrix und Abstimmungsregeln überspringen – wir sind alle Profis und müssen schnell Ergebnisse liefern.“',
    question: 'Welches Vorgehen schützt das Projekt vor späteren Schäden?',
    choices: [
      {
        id: 'a',
        text: 'Die Energie wertschätzen, aber bewusst die Zeit für feste Grundlagen nehmen (Wer macht was? Wie entscheiden wir?). Das spart später im Storming enorme Reibungsverluste und Missverständnisse.',
        isCorrect: true,
        explanation: 'Aus dem Leitfaden: Grundlagen zu setzen klingt banal, wird aber oft wegen der guten Stimmung ausgelassen. Die investierte Zeit zahlt sich in späteren Phasen mehrfach aus.',
        leadershipPrinciple: 'Forming-Regel 4: Klare Grundlagen (Ziele, Rollen, Erwartungen) vor blindem Aktionismus!',
      },
      {
        id: 'b',
        text: 'Rollenklärung komplett weglassen, da formale Spielregeln kreative Köpfe nur demotivieren.',
        isCorrect: false,
        explanation: 'Falsch: Unklare Rollen führen unausweichlich zu Kompetenzgerangel und Verzögerungen, sobald Termindruck entsteht.',
        leadershipPrinciple: 'Fehler: Ungeklärte Rollen sind der Hauptauslöser für eskalierendes Storming.',
      },
    ],
  },
];

interface Props {
  isLevel2?: boolean;
  onComplete: (earnedXp: number) => void;
}

export const FormingLeadershipGame: React.FC<Props> = ({ isLevel2 = false, onComplete }) => {
  const scenarios = useMemo(() => {
    return shuffleArray(SCENARIOS);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario = scenarios[currentIndex];

  const handleSelectChoice = (choiceId: string) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setSelectedChoiceId(choiceId);
    setIsAnswered(true);

    const choice = currentScenario.choices.find(c => c.id === choiceId);
    if (choice?.isCorrect) {
      soundEffects.playCorrect();
      setScore(prev => prev + 1);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoiceId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundEffects.playLevelUp();
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.7 },
      });
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const earnedXp = score * 12;

  if (isFinished) {
    const isPerfect = score === scenarios.length;
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
          <Award className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {isPerfect ? 'Exzellente Führungskompetenz!' : 'Führungs-Check abgeschlossen!'}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Du hast <strong className="text-slate-900 dark:text-slate-100">{score} von {scenarios.length}</strong> Führungssituationen in der Forming-Phase nach Bruce Tuckman meisterhaft gelöst.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 mb-6 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            +{earnedXp} EXP für deine Führungspraxis!
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

  const selectedChoice = currentScenario.choices.find(c => c.id === selectedChoiceId);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 max-w-2xl mx-auto shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Führungs-Simulator {isLevel2 && '★ Meisterstufe'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Richtige Führung in der Forming-Phase
            </h4>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          Szenario {currentIndex + 1} / {scenarios.length}
        </div>
      </div>

      {/* Scenario Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 mb-5">
        <div className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          <span>{currentScenario.situation}</span>
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mb-2">
          {currentScenario.context}
        </p>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {currentScenario.question}
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="space-y-3 mb-5">
        {currentScenario.choices.map(choice => {
          const isSelected = selectedChoiceId === choice.id;
          let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500';

          if (isAnswered) {
            if (choice.isCorrect) {
              btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/30';
            } else if (isSelected && !choice.isCorrect) {
              btnClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/30';
            } else {
              btnClass = 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
            }
          }

          return (
            <button
              key={choice.id}
              disabled={isAnswered}
              onClick={() => handleSelectChoice(choice.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {choice.id.toUpperCase()}
                </div>
                <div className="text-xs sm:text-sm font-medium leading-relaxed">
                  {choice.text}
                </div>
              </div>

              {isAnswered && (
                <div className="shrink-0 mt-0.5">
                  {choice.isCorrect ? (
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
      {isAnswered && selectedChoice && (
        <div className={`p-4 rounded-xl border mb-5 animate-in fade-in slide-in-from-bottom-2 ${
          selectedChoice.isCorrect
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="flex items-start gap-2.5">
            {selectedChoice.isCorrect ? (
              <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            )}
            <div className="text-xs leading-relaxed space-y-1">
              <div>
                <span className="font-bold mr-1">
                  {selectedChoice.isCorrect ? 'Richtig entschieden!' : 'IHK-Prüfungsfalle:'}
                </span>
                {selectedChoice.explanation}
              </div>
              <div className="text-[11px] font-bold text-teal-700 dark:text-teal-300">
                ✦ {selectedChoice.leadershipPrinciple}
              </div>
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
            <span>{currentIndex < scenarios.length - 1 ? 'Nächstes Szenario' : 'Ergebnis anzeigen'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
