import React, { useState, useMemo } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Flame, HeartHandshake, ShieldAlert, Sparkles, Scale, Info } from 'lucide-react';
import { shuffleArray } from '../../utils/learningLogic';

type PhaseType = 'storming' | 'norming';

interface RadarItem {
  id: string;
  scenario: string;
  context: string;
  correctPhase: PhaseType;
  explanation: string;
  ihkKeySign: string;
}

interface LeadershipDilemma {
  id: string;
  phase: PhaseType;
  phaseLabel: string;
  situation: string;
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    ruleTitle: string;
  }[];
}

const RADAR_ITEMS: RadarItem[] = [
  {
    id: 'rad-1',
    scenario: 'Lagerbildung & verdeckter Frust',
    context: 'Im Sprint-Meeting rollen einige die Augen, Wortmeldungen sind kurz angebunden. Auf dem Flur tuscheln zwei Grüppchen und die Diskussionen über Farbprofile werden plötzlich persönlich.',
    correctPhase: 'storming',
    explanation: 'Typisches Storming-Symptom! Die anfängliche Höflichkeit bricht auf, Meinungen prallen aufeinander und Frust sucht sich Ventile über Flurfunk und Lagerbildung.',
    ihkKeySign: 'Storming-Merkmal: Reibung, Cliquenbildung und unterschwellige Aggression.',
  },
  {
    id: 'rad-2',
    scenario: 'Eigenständige Konfliktlösung ohne Chef',
    context: 'Zwei Entwickler haben unterschiedliche Ansichten über das CSS-Framework. Statt zur Projektleitung zu rennen, setzen sie sich 20 Minuten zusammen und finden einen sauberen Kompromiss.',
    correctPhase: 'norming',
    explanation: 'Klares Norming-Signal! In Phase 3 werden Konflikte nicht mehr vermieden oder eskaliert, sondern eigenständig auf Sachebene im Team gelöst, ohne dass Führung eingreifen muss.',
    ihkKeySign: 'Norming-Merkmal: Selbstregulierung & Konfliktlösungskultur untereinander.',
  },
  {
    id: 'rad-3',
    scenario: 'Rebellion gegen Aufgabenverteilung & Führung',
    context: 'Im Retrospektiven-Meeting platzt es aus einem Mitarbeiter heraus: „Die Aufgabenverteilung ist völlig unausgewogen! Und die Führungsetage hat doch keinen blassen Schimmer vom tatsächlichen Aufwand!“',
    correctPhase: 'storming',
    explanation: 'Lehrbuch-Storming! Kritik an Rollen, Aufgaben und besonders das Ausrichten von Frust nach oben gegen „die da oben“ ist der Höhepunkt der Sturm-Phase.',
    ihkKeySign: 'Storming-Merkmal: Rollenkonflikte & Infragestellen von Führung & Struktur.',
  },
  {
    id: 'rad-4',
    scenario: 'Gegenseitige Hilfe ohne offizielle Anweisung',
    context: 'Der Grafiker sieht, dass die Kollegin bei der Reinzeichnung für den Messestand unter Zeitdruck gerät. Er übernimmt unaufgefordert zwei Banner, obwohl das nicht sein Bereich ist.',
    correctPhase: 'norming',
    explanation: 'Aus „Ich und die anderen“ ist ein „Wir“ geworden. In der Norming-Phase helfen sich Kollegen gegenseitig ganz ohne Dienstanweisung, getrieben vom gemeinsamen Ziel.',
    ihkKeySign: 'Norming-Merkmal: Wir-Gefühl & spontane Solidarität ohne Weisung.',
  },
  {
    id: 'rad-5',
    scenario: 'Entscheidungs-Lähmung bei Banalitäten',
    context: 'Früher beschlossene Kleinigkeiten (z. B. Ordnerstruktur auf dem Server) werden plötzlich wieder aufgerollt. Jede Entscheidung zieht sich über Stunden, weil Profilierungsdrang herrscht.',
    correctPhase: 'storming',
    explanation: 'Storming verlangsamt Prozesse drastisch! Diskussionen werden zäher, weil es nicht mehr nur um die Sache geht, sondern um Status und das Abstecken des eigenen Reviers.',
    ihkKeySign: 'Storming-Merkmal: Zähe Entscheidungen durch Revierkämpfe.',
  },
  {
    id: 'rad-6',
    scenario: 'Ungeschriebene Gesetze & gemeinsamer Stolz',
    context: 'Das Team hat einen eigenen Sprach-Slang entwickelt, pflegt verlässliche Review-Rituale und feiert den erfolgreichen Druckabzug stolz mit einem gemeinsamen Feierabend-Kaffee.',
    correctPhase: 'norming',
    explanation: 'Gemeinsame Werte und Rituale sind das Fundament von Norming. Das Team hat einen eigenen Rhythmus und echte Identität gefunden.',
    ihkKeySign: 'Norming-Merkmal: Etablierte ungeschriebene Normen & kollektiver Stolz.',
  },
];

const LEADERSHIP_DILEMMAS: LeadershipDilemma[] = [
  {
    id: 'dil-1',
    phase: 'storming',
    phaseLabel: 'Phase 2: Storming',
    situation: 'Der Sturm bricht los: Zwei Lager streiten lautstark',
    question: 'Im Team prallen zwei Fraktionen bezüglich des CMS-Systems unversöhnlich aufeinander. Wie verhältst du dich als IHK-geschulte Führungskraft?',
    choices: [
      {
        id: 'c1',
        text: 'Moderieren statt urteilen: Reibungspunkte transparent auf den Tisch bringen, Rollen klären und den Dialog in sachliche, lösungsorientierte Bahnen lenken.',
        isCorrect: true,
        explanation: 'Genau richtig! Wer als Führungskraft nur ein Machtwort spricht oder den Konflikt entscheidet, nimmt dem Team die Chance, Streitkultur zu lernen. Die Führung sichert den fairen Rahmen, nicht das inhaltliche Urteil.',
        ruleTitle: 'Führungsregel Storming: Moderieren statt richten!',
      },
      {
        id: 'c2',
        text: 'Den Streit sofort unterbinden, Harmonie einfordern und verlangen, dass alle sofort wieder professionell und freundlich miteinander umgehen.',
        isCorrect: false,
        explanation: 'Kardinalfehler „Zudecken“! Wer den Konflikt zudeckt, treibt die Spannungen in den Untergrund. Das führt zu verdecktem Boykott, Zynismus und dauerhafter Lähmung.',
        ruleTitle: 'Typischer Fehler: Konflikte mit Scheinharmonie ersticken.',
      },
    ],
  },
  {
    id: 'dil-2',
    phase: 'norming',
    phaseLabel: 'Phase 3: Norming',
    situation: 'Das Team findet seinen Rhythmus – doch die Führung zögert',
    question: 'Dein Team arbeitet eigenverantwortlich, hat funktionierende Spielregeln entwickelt und trifft solide Absprachen. Was ist deine zentrale Führungsaufgabe?',
    choices: [
      {
        id: 'c1',
        text: 'Verantwortung abgeben & loslassen: Den engen Steuerungsmodus lockern, Entscheidungen ins Team verlagern und das Vertrauen durch sichtbare Bestärkung festigen.',
        isCorrect: true,
        explanation: 'Exakt! Christoph Schulze warnt: Der größte Fehler im Norming ist Überkontrolle (Micromanagement). Das Team braucht jetzt Raum und Vertrauen, um die gewonnene Selbstständigkeit zu leben.',
        ruleTitle: 'Führungsregel Norming: Loslassen & Vertrauen schenken!',
      },
      {
        id: 'c2',
        text: 'Weiterhin jede Freigabe über deinen Schreibtisch laufen lassen und wöchentliche Einzelberichte fordern, damit der Druck und die Disziplin nicht nachlassen.',
        isCorrect: false,
        explanation: 'Fataler Führungsfehler! Wenn du den Kontrollmodus aus der Storming-Phase beibehältst, entmündigst du das Team und würgst das zarte Pflänzchen der Eigeninitiative sofort ab.',
        ruleTitle: 'Typischer Fehler: Zu viel Kontrolle bremst Selbstorganisation aus.',
      },
    ],
  },
];

interface Props {
  isLevel2?: boolean;
  onComplete?: (earnedXp: number) => void;
}

export const StormingNormingGame: React.FC<Props> = ({ isLevel2 = false, onComplete }) => {
  // Stage 1: Radar (6 items) | Stage 2: Dilemmas (2 items) | Summary
  const [activeStage, setActiveStage] = useState<'radar' | 'dilemma' | 'summary'>('radar');

  // Radar State
  const [radarIndex, setRadarIndex] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState<PhaseType | null>(null);
  const [radarFeedback, setRadarFeedback] = useState<RadarItem | null>(null);
  const [radarCorrectCount, setRadarCorrectCount] = useState(0);

  // Dilemma State
  const [dilemmaIndex, setDilemmaIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [dilemmaFeedback, setDilemmaFeedback] = useState<{ isCorrect: boolean; explanation: string; ruleTitle: string } | null>(null);
  const [dilemmaCorrectCount, setDilemmaCorrectCount] = useState(0);

  const shuffledRadarItems = useMemo(() => shuffleArray([...RADAR_ITEMS]), []);
  const currentRadarItem = shuffledRadarItems[radarIndex];
  const currentDilemma = LEADERSHIP_DILEMMAS[dilemmaIndex];

  const handleRadarSelect = (phase: PhaseType) => {
    if (selectedPhase !== null) return;
    setSelectedPhase(phase);
    setRadarFeedback(currentRadarItem);

    if (phase === currentRadarItem.correctPhase) {
      soundEffects.playCorrect();
      setRadarCorrectCount((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextRadar = () => {
    setSelectedPhase(null);
    setRadarFeedback(null);
    if (radarIndex + 1 < shuffledRadarItems.length) {
      setRadarIndex((prev) => prev + 1);
    } else {
      setActiveStage('dilemma');
    }
  };

  const handleDilemmaSelect = (choiceId: string) => {
    if (selectedChoiceId !== null) return;
    setSelectedChoiceId(choiceId);
    const chosen = currentDilemma.choices.find((c) => c.id === choiceId);
    if (!chosen) return;

    setDilemmaFeedback({
      isCorrect: chosen.isCorrect,
      explanation: chosen.explanation,
      ruleTitle: chosen.ruleTitle,
    });

    if (chosen.isCorrect) {
      soundEffects.playCorrect();
      setDilemmaCorrectCount((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextDilemma = () => {
    setSelectedChoiceId(null);
    setDilemmaFeedback(null);
    if (dilemmaIndex + 1 < LEADERSHIP_DILEMMAS.length) {
      setDilemmaIndex((prev) => prev + 1);
    } else {
      setActiveStage('summary');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setActiveStage('radar');
    setRadarIndex(0);
    setSelectedPhase(null);
    setRadarFeedback(null);
    setRadarCorrectCount(0);
    setDilemmaIndex(0);
    setSelectedChoiceId(null);
    setDilemmaFeedback(null);
    setDilemmaCorrectCount(0);
  };

  const totalScore = radarCorrectCount + dilemmaCorrectCount;
  const maxScore = RADAR_ITEMS.length + LEADERSHIP_DILEMMAS.length;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Interaktiver Phasen- & Führungs-Simulator
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Storming vs. Norming – Reibung meistern & Spielregeln etablieren
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            Score: {totalScore} / {maxScore}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Tabs */}
      <div className="grid grid-cols-2 gap-2 my-4">
        <div
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeStage === 'radar'
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              : 'bg-slate-800/40 border-slate-800 text-slate-400'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Teil 1: Symptom-Radar
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">
            Fall {activeStage === 'radar' ? radarIndex + 1 : RADAR_ITEMS.length} von {RADAR_ITEMS.length}
          </div>
        </div>
        <div
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeStage === 'dilemma'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-800/40 border-slate-800 text-slate-400'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            Teil 2: Führungs-Dilemma
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">
            Entscheidung {activeStage === 'dilemma' ? dilemmaIndex + 1 : activeStage === 'summary' ? 2 : 0} von 2
          </div>
        </div>
      </div>

      {/* STAGE 1: RADAR */}
      {activeStage === 'radar' && currentRadarItem && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide text-cyan-400">
                Praxis-Beobachtung #{radarIndex + 1}
              </span>
              <span className="text-xs text-slate-400">
                {currentRadarItem.scenario}
              </span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
              „{currentRadarItem.context}“
            </p>
          </div>

          <div className="text-xs text-center font-medium text-slate-400">
            In welcher Phase nach Tuckman befindet sich das Team hier primär?
          </div>

          {/* Phase Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Storming Button */}
            <button
              onClick={() => handleRadarSelect('storming')}
              disabled={selectedPhase !== null}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                selectedPhase === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 cursor-pointer'
                  : currentRadarItem.correctPhase === 'storming'
                  ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                  : selectedPhase === 'storming'
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 flex items-center gap-1.5">
                  Phase 2: Storming
                  {selectedPhase !== null && currentRadarItem.correctPhase === 'storming' && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                  {selectedPhase === 'storming' && currentRadarItem.correctPhase !== 'storming' && (
                    <X className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  Die Nahkampf- & Reibungsphase: Meinungen prallen aufeinander, Rollen werden hinterfragt, Frust gegen Führung.
                </div>
              </div>
            </button>

            {/* Norming Button */}
            <button
              onClick={() => handleRadarSelect('norming')}
              disabled={selectedPhase !== null}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                selectedPhase === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 cursor-pointer'
                  : currentRadarItem.correctPhase === 'norming'
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                  : selectedPhase === 'norming'
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-slate-100 flex items-center gap-1.5">
                  Phase 3: Norming
                  {selectedPhase !== null && currentRadarItem.correctPhase === 'norming' && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                  {selectedPhase === 'norming' && currentRadarItem.correctPhase !== 'norming' && (
                    <X className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  Die Organisations- & Regelphase: Ungeschriebene Gesetze, Wir-Gefühl, selbstständige Klärung ohne Chef.
                </div>
              </div>
            </button>
          </div>

          {/* Feedback Box */}
          {radarFeedback && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                selectedPhase === currentRadarItem.correctPhase
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : 'bg-amber-950/30 border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedPhase === currentRadarItem.correctPhase ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">Richtig diagnostiziert!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-400" />
                    <span className="text-amber-300">
                      IHK-Korrektur: Das gehört zu Phase {currentRadarItem.correctPhase === 'storming' ? '2 (Storming)' : '3 (Norming)'}!
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentRadarItem.explanation}
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-amber-300/90">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {currentRadarItem.ihkKeySign}
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextRadar}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {radarIndex + 1 < shuffledRadarItems.length ? 'Nächste Beobachtung' : 'Zu Teil 2: Führungs-Dilemma'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: DILEMMA */}
      {activeStage === 'dilemma' && currentDilemma && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide text-emerald-400">
                {currentDilemma.phaseLabel}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Entscheidung {dilemmaIndex + 1} von {LEADERSHIP_DILEMMAS.length}
              </span>
            </div>
            <h4 className="text-slate-100 font-bold text-base mb-1.5">
              {currentDilemma.situation}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentDilemma.question}
            </p>
          </div>

          <div className="space-y-2.5">
            {currentDilemma.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              const hasAnswered = selectedChoiceId !== null;

              let btnStyle = 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800 cursor-pointer';
              if (hasAnswered) {
                if (choice.isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/30 border-rose-500 text-rose-300';
                } else {
                  btnStyle = 'bg-slate-800/30 border-slate-800 opacity-40';
                }
              }

              return (
                <button
                  key={choice.id}
                  disabled={hasAnswered}
                  onClick={() => handleDilemmaSelect(choice.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                      hasAnswered && choice.isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : hasAnswered && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {hasAnswered && choice.isCorrect ? <Check className="w-3.5 h-3.5" /> : choice.id.toUpperCase()}
                  </div>
                  <div className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200">
                    {choice.text}
                  </div>
                </button>
              );
            })}
          </div>

          {dilemmaFeedback && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                dilemmaFeedback.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : 'bg-rose-950/30 border-rose-500/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {dilemmaFeedback.isCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">Führungskompetenz bewiesen!</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300">Führungsfalle getappt!</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {dilemmaFeedback.explanation}
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {dilemmaFeedback.ruleTitle}
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextDilemma}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {dilemmaIndex + 1 < LEADERSHIP_DILEMMAS.length ? 'Nächstes Dilemma' : 'Auswertung anzeigen'}
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
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-100">
              Phasen-Diplom: Storming & Norming gemeistert!
            </h4>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Du hast {totalScore} von {maxScore} Entscheidungen zielsicher nach Christoph Schulze und den IHK-Kriterien gelöst.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Flame className="w-4 h-4" />
                Storming-Leitsatz:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                „Ein Team, das lernt, gut zu streiten, ist am Ende stärker als eines, das nie gestritten hat.“ Moderieren statt urteilen!
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-emerald-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <HeartHandshake className="w-4 h-4" />
                Norming-Leitsatz:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                „Norming ist die Phase, in der Führung Verantwortung abgeben muss.“ Zu viel Kontrolle würgt die Selbstorganisation ab!
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Simulator wiederholen
            </button>
            {onComplete && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onComplete(totalScore * 10);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
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
