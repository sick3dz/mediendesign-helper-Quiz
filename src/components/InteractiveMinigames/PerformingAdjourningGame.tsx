import React, { useState, useMemo } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw, Award, ArrowRight, Zap, Flag, RefreshCw, Sparkles, Heart, ShieldAlert, Info } from 'lucide-react';
import { shuffleArray } from '../../utils/learningLogic';

type PhaseCategory = 'performing' | 'regression' | 'adjourning';

interface FlowItem {
  id: string;
  title: string;
  situation: string;
  correctCategory: PhaseCategory;
  categoryLabel: string;
  explanation: string;
  ihkKeyRule: string;
}

interface DilemmaChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  principle: string;
}

interface LeadershipDilemma {
  id: string;
  topic: string;
  context: string;
  question: string;
  choices: DilemmaChoice[];
}

const FLOW_ITEMS: FlowItem[] = [
  {
    id: 'fl-1',
    title: 'Autonome Hochleistung & Leichtigkeit',
    situation: 'Das Medien-Team liefert unter Termindruck fehlerfreie Druckdaten ab. Bei Meinungsverschiedenheiten wird sachlich gestritten, ohne dass die Beziehung leidet. Die Führungskraft stellt fest, dass sie für operative Entscheidungen gar nicht mehr gebraucht wird.',
    correctCategory: 'performing',
    categoryLabel: 'Phase 4: Performing',
    explanation: 'Lehrbuchmäßiges Performing! Die Gruppe leistet mehr als die Summe ihrer Einzelnen (Flow). Das Team trägt sich selbst und meistert Herausforderungen mit Leichtigkeit.',
    ihkKeyRule: 'Performing: Hohes Vertrauen, klare Rollen, Flow & Synergieeffekt.',
  },
  {
    id: 'fl-2',
    title: 'Der Personaleffekt: Neuer Kollege an Bord',
    situation: 'Ein erfahrener Web-Entwickler verlässt das Team, dafür kommt eine neue Kollegin. Plötzlich ziehen sich früher reibungslose Code-Reviews wieder in die Länge und alte Revierfragen flammen auf.',
    correctCategory: 'regression',
    categoryLabel: 'Rückfall-Dynamik (Storming)',
    explanation: 'Völlig normal und kein Versagen! Performing ist kein fixer Dauerzustand. Jede personelle Veränderung oder neue Zielvorgabe wirft das Team in frühere Phasen zurück (oft bis ins Storming), da sich das Gefüge neu justieren muss.',
    ihkKeyRule: 'Tuckman-Dynamik: Teamzusammensetzung ändert sich -> Rückfall & Neu-Justierung!',
  },
  {
    id: 'fl-3',
    title: 'Gefühlschaos nach Projektabschluss',
    situation: 'Der Relaunch des großen Kundenportals ist live gegangen. Im Büro herrscht eine Mischung aus großem Stolz, ein wenig Wehmut über das Ende und Unsicherheit bei den Freelancern, wie es nun weitergeht.',
    correctCategory: 'adjourning',
    categoryLabel: 'Phase 5: Adjourning (Auflösung)',
    explanation: 'Klassisches Adjourning (1977 von Tuckman & Mary Ann Jensen ergänzt). Das gemeinsame Ziel ist erreicht; die emotionale Achterbahn zwischen Stolz, Abschiedsschmerz und Zukunftsfragen ist typisch.',
    ihkKeyRule: 'Adjourning: Erledigte Aufgabe, Trennungsschmerz & Zukunftsunsicherheit.',
  },
  {
    id: 'fl-4',
    title: 'Führung: Loslassen, aber nicht verschwinden',
    situation: 'Die Projektleiterin hält sich aus dem Tagesgeschäft heraus, setzt strategische Meilensteine, räumt bürokratische Hindernisse im Konzern aus dem Weg und sorgt dafür, dass die Erfolge der Gruppe vor der Geschäftsleitung sichtbar gewürdigt werden.',
    correctCategory: 'performing',
    categoryLabel: 'Phase 4: Performing',
    explanation: 'Genau das ist die richtige Führung im Performing: Servant Leadership! Ziele setzen, Hindernisse wegräumen, ansprechbar bleiben, aber strikt auf Micromanagement verzichten.',
    ihkKeyRule: 'Führung im Performing: Loslassen, Hindernisse wegräumen & Erfolge sichtbar machen.',
  },
  {
    id: 'fl-5',
    title: 'Retrospektive, Dank & Erinnerungsstück',
    situation: 'Zum Projektabschluss organisiert die Projektleitung einen Workshop: Was lief gut, was lernen wir fürs nächste Mal? Jeder erhält persönliche Anerkennung für seinen Beitrag und das Team stößt bei einem gemeinsamen Abschlussessen an.',
    correctCategory: 'adjourning',
    categoryLabel: 'Phase 5: Adjourning (Auflösung)',
    explanation: 'Vorbildliches Adjourning! Ein bewusster Abschluss verhindert, dass Erfahrungen verpuffen. Wer einen wertschätzenden Abschluss erlebt, startet im nächsten Projekt mit viel mehr Vertrauen ins Forming.',
    ihkKeyRule: 'Adjourning-Führung: Retrospektive (Lessons Learned) + Würdigung + Ritual.',
  },
];

const LEADERSHIP_DILEMMAS: LeadershipDilemma[] = [
  {
    id: 'dil-perf-1',
    topic: 'Die Illusion des ewigen Performing',
    context: 'Dein Team arbeitete drei Monate lang in absoluter Hochform (Performing). Nun wechselt die Abteilungsleiterin und eine neue Grafikerin fängt an. Plötzlich kommt es wieder zu kleinen Reibereien und Unsicherheiten bei Freigaben. Dein Projektleiter-Kollege meint frustriert: „Unsere Teamentwicklung ist komplett gescheitert – wir fangen wieder bei Null an!“',
    question: 'Wie bewertest du die Lage als IHK-geschulter Experte und wie reagierst du?',
    choices: [
      {
        id: 'a',
        text: 'Widersprechen und beruhigen: Performing ist kein statischer Dauerzustand. Personelle Wechsel erfordern eine ganz natürliche Neu-Justierung (Rückfall in Forming/Storming). Das ist kein Versagen, sondern Teil des dynamischen Zyklus.',
        isCorrect: true,
        explanation: 'Genau richtig! Christoph Schulze betont: Wer weiß, dass ein Team nach Veränderungen zurückfällt, erschrickt nicht davor, sondern moderiert die Neu-Orientierung gelassen.',
        principle: 'Erfolgsregel: Performing ist ein temporärer Zustand – Reorganisation erfordert Neu-Justierung!',
      },
      {
        id: 'b',
        text: 'Dem Kollegen zustimmen, die neue Grafikerin sofort abmahnen und verlangen, dass sie sich ohne jedes Wort dem bisherigen Teamgefüge anpasst.',
        isCorrect: false,
        explanation: 'Kardinalfehler! Teamentwicklung lässt sich nicht erzwingen. Wenn neue Mitglieder keine Chance haben, sich einzubringen, blockiert man die Gruppe.',
        principle: 'Führungsfalle: Starrheit verhindert das Etablieren neuer Synergien.',
      },
    ],
  },
  {
    id: 'dil-perf-2',
    topic: 'Projektende unter Kostendruck: Das gestrichene Adjourning',
    context: 'Der Relaunch der Firmen-Website ist abgeschlossen. Der Kunde ist begeistert. Das Controlling fordert: „Keine Abschlussmeetings oder Feiern buchen – Projektstunden sofort stoppen und die Leute ab Montag nahtlos auf neue Akquise-Projekte verteilen!“',
    question: 'Welches Risiko entsteht, wenn das Adjourning einfach übergangen wird?',
    choices: [
      {
        id: 'a',
        text: 'Hohes Risiko: Wichtige Lessons Learned gehen verloren und die Mitarbeiter fühlen sich als bloße Ressourcen ausgenutzt. Ein liebloser Abschluss führt dazu, dass sie im nächsten Projekt ängstlicher und reservierter ins Forming starten.',
        isCorrect: true,
        explanation: 'Exakt! Der typische Fehler im Adjourning ist das lieblose Auslaufenlassen. Der Schaden zeigt sich im Folgeprojekt: Erfahrungen verpuffen und das Vertrauen leidet.',
        principle: 'Erfolgsregel: Ein bewusster Abschluss sichert Lernerfolge und stärkt die Teamkultur nachhaltig!',
      },
      {
        id: 'b',
        text: 'Kein Risiko: Bei professionellen Agenturen hat der Projektabschluss keinerlei psychosoziale Bedeutung und spart bares Geld.',
        isCorrect: false,
        explanation: 'Falsch: Teamentwicklung nach Tuckman & Jensen beweist, dass Teams ohne saubere Trennung und Reflexion langfristig an Leistungsbereitschaft verlieren.',
        principle: 'Führungsfalle: Sparsamkeit am falschen Ende zerstört Erfahrungsschätze.',
      },
    ],
  },
];

interface Props {
  isLevel2?: boolean;
  onComplete?: (earnedXp: number) => void;
}

export const PerformingAdjourningGame: React.FC<Props> = ({ isLevel2 = false, onComplete }) => {
  const [activeStage, setActiveStage] = useState<'flow' | 'dilemma' | 'summary'>('flow');

  // Flow State
  const [flowIndex, setFlowIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<PhaseCategory | null>(null);
  const [flowFeedback, setFlowFeedback] = useState<FlowItem | null>(null);
  const [flowCorrectCount, setFlowCorrectCount] = useState(0);

  // Dilemma State
  const [dilemmaIndex, setDilemmaIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [dilemmaFeedback, setDilemmaFeedback] = useState<{ isCorrect: boolean; explanation: string; principle: string } | null>(null);
  const [dilemmaCorrectCount, setDilemmaCorrectCount] = useState(0);

  const shuffledFlowItems = useMemo(() => shuffleArray([...FLOW_ITEMS]), []);
  const currentFlowItem = shuffledFlowItems[flowIndex];
  const currentDilemma = LEADERSHIP_DILEMMAS[dilemmaIndex];

  const handleFlowSelect = (cat: PhaseCategory) => {
    if (selectedCategory !== null) return;
    setSelectedCategory(cat);
    setFlowFeedback(currentFlowItem);

    if (cat === currentFlowItem.correctCategory) {
      soundEffects.playCorrect();
      setFlowCorrectCount((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNextFlow = () => {
    setSelectedCategory(null);
    setFlowFeedback(null);
    if (flowIndex + 1 < shuffledFlowItems.length) {
      setFlowIndex((prev) => prev + 1);
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
      principle: chosen.principle,
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setActiveStage('flow');
    setFlowIndex(0);
    setSelectedCategory(null);
    setFlowFeedback(null);
    setFlowCorrectCount(0);
    setDilemmaIndex(0);
    setSelectedChoiceId(null);
    setDilemmaFeedback(null);
    setDilemmaCorrectCount(0);
  };

  const totalScore = flowCorrectCount + dilemmaCorrectCount;
  const maxScore = FLOW_ITEMS.length + LEADERSHIP_DILEMMAS.length;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Interaktiver Flow- & Phasen-Navigator
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Performing & Adjourning – Höchstleistung & bewusster Abschluss
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

      {/* Stage Tabs */}
      <div className="grid grid-cols-2 gap-2 my-4">
        <div
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeStage === 'flow'
              ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300'
              : 'bg-slate-800/40 border-slate-800 text-slate-400'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Teil 1: Praxis-Radar
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">
            Fall {activeStage === 'flow' ? flowIndex + 1 : FLOW_ITEMS.length} von {FLOW_ITEMS.length}
          </div>
        </div>
        <div
          className={`p-2.5 rounded-xl border text-center transition-all ${
            activeStage === 'dilemma'
              ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
              : 'bg-slate-800/40 border-slate-800 text-slate-400'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
            <Flag className="w-3.5 h-3.5 text-purple-400" />
            Teil 2: Führungs-Dilemma
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">
            Entscheidung {activeStage === 'dilemma' ? dilemmaIndex + 1 : activeStage === 'summary' ? 2 : 0} von 2
          </div>
        </div>
      </div>

      {/* STAGE 1: FLOW RADAR */}
      {activeStage === 'flow' && currentFlowItem && (
        <div className="space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide text-cyan-400">
                Praxis-Situation #{flowIndex + 1}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentFlowItem.title}
              </span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
              „{currentFlowItem.situation}“
            </p>
          </div>

          <div className="text-xs text-center font-medium text-slate-400">
            Welchem Phänomen im Tuckman-Zyklus entspricht dieser Zustand?
          </div>

          {/* 3 Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Performing Button */}
            <button
              onClick={() => handleFlowSelect('performing')}
              disabled={selectedCategory !== null}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                selectedCategory === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 cursor-pointer'
                  : currentFlowItem.correctCategory === 'performing'
                  ? 'bg-indigo-950/40 border-indigo-500/80 text-indigo-200'
                  : selectedCategory === 'performing'
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                {selectedCategory !== null && currentFlowItem.correctCategory === 'performing' && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
                {selectedCategory === 'performing' && currentFlowItem.correctCategory !== 'performing' && (
                  <X className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-100">Phase 4: Performing</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Flow, autonome Leistung, Synergie</div>
              </div>
            </button>

            {/* Regression Button */}
            <button
              onClick={() => handleFlowSelect('regression')}
              disabled={selectedCategory !== null}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                selectedCategory === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 cursor-pointer'
                  : currentFlowItem.correctCategory === 'regression'
                  ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                  : selectedCategory === 'regression'
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                {selectedCategory !== null && currentFlowItem.correctCategory === 'regression' && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
                {selectedCategory === 'regression' && currentFlowItem.correctCategory !== 'regression' && (
                  <X className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-100">Rückfall / Neu-Justierung</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Personeller Wechsel, Reorganisation</div>
              </div>
            </button>

            {/* Adjourning Button */}
            <button
              onClick={() => handleFlowSelect('adjourning')}
              disabled={selectedCategory !== null}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                selectedCategory === null
                  ? 'bg-slate-800/70 border-slate-700 hover:border-purple-500/50 hover:bg-slate-800 cursor-pointer'
                  : currentFlowItem.correctCategory === 'adjourning'
                  ? 'bg-purple-950/40 border-purple-500/80 text-purple-200'
                  : selectedCategory === 'adjourning'
                  ? 'bg-rose-950/30 border-rose-500/60 text-rose-300'
                  : 'bg-slate-800/30 border-slate-800/60 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                  <Flag className="w-4 h-4" />
                </div>
                {selectedCategory !== null && currentFlowItem.correctCategory === 'adjourning' && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
                {selectedCategory === 'adjourning' && currentFlowItem.correctCategory !== 'adjourning' && (
                  <X className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-100">Phase 5: Adjourning</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Auflösung, Abschluss & Lessons Learned</div>
              </div>
            </button>
          </div>

          {/* Feedback Box */}
          {flowFeedback && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                selectedCategory === currentFlowItem.correctCategory
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : 'bg-amber-950/30 border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedCategory === currentFlowItem.correctCategory ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">Absolut richtig erkannt!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-400" />
                    <span className="text-amber-300">
                      IHK-Zuordnung: Das gehört zu {currentFlowItem.categoryLabel}!
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentFlowItem.explanation}
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-indigo-300">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                {currentFlowItem.ihkKeyRule}
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextFlow}
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {flowIndex + 1 < shuffledFlowItems.length ? 'Nächste Beobachtung' : 'Zu Teil 2: Führungs-Dilemma'}
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
              <span className="text-xs font-bold uppercase tracking-wide text-purple-400">
                Führungs-Herausforderung #{dilemmaIndex + 1}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentDilemma.topic}
              </span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium mb-2">
              „{currentDilemma.context}“
            </p>
            <div className="text-xs text-indigo-300 font-bold">
              {currentDilemma.question}
            </div>
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
                    <span className="text-emerald-300">IHK-Führungskompetenz bewiesen!</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300">Führungsfehler erkannt!</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {dilemmaFeedback.explanation}
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {dilemmaFeedback.principle}
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextDilemma}
                  className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {dilemmaIndex + 1 < LEADERSHIP_DILEMMAS.length ? 'Nächstes Dilemma' : 'Abschluss-Auswertung'}
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
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/40 text-purple-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-100">
              Meisterstufe: Performing & Adjourning abgeschlossen!
            </h4>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Du hast {totalScore} von {maxScore} Führungsentscheidungen souverän nach Bruce Tuckman & Christoph Schulze gemeistert.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-indigo-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                <Zap className="w-4 h-4" />
                Performing-Grundsatz:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                „Loslassen, aber nicht verschwinden.“ Hindernisse aus dem Weg räumen und Erfolge sichtbar machen, statt zu mikromanagen!
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-purple-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400">
                <Heart className="w-4 h-4" />
                Adjourning-Grundsatz:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                „Den Abschluss bewusst gestalten.“ Wer einen wertschätzenden Abschluss erlebt, startet im nächsten Projekt mit echtem Vertrauen ins Forming!
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Navigator wiederholen
            </button>
            {onComplete && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onComplete(totalScore * 10);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
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
