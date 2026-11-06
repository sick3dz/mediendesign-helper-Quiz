import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Scale, Check, X, RotateCcw, Award, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface WisoDuelCase {
  id: string;
  situation: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    lawParagraph: string;
    explanation: string;
  }[];
}

const WISO_CASES: WisoDuelCase[] = [
  {
    id: 'case-1',
    situation: 'Ein Mediengestalter-Azubi im 3. Ausbildungsmonat erhält am Freitagabend eine Kündigung per WhatsApp-Nachricht.',
    question: 'Ist diese Kündigung rechtmäßig wirksam?',
    options: [
      {
        id: 'opt-1a',
        text: 'Nein, jede Kündigung bedarf zwingend der Schriftform auf Papier mit Unterschrift (§ 623 BGB)',
        isCorrect: true,
        lawParagraph: '§ 623 BGB & § 22 Abs. 3 BBiG',
        explanation: 'Kündigungen per WhatsApp, E-Mail oder SMS sind gesetzlich formnichtig und absolut unwirksam.'
      },
      {
        id: 'opt-1b',
        text: 'Ja, da in der Probezeit jederzeit fristlos und formlos gekündigt werden kann',
        isCorrect: false,
        lawParagraph: 'Formfalle!',
        explanation: 'Falsch: In der Probezeit darf zwar ohne Grund gekündigt werden, aber die Schriftform auf Papier gilt IMMER!'
      }
    ]
  },
  {
    id: 'case-2',
    situation: 'Der Ausbildungsbetrieb möchte im Ausbildungsvertrag eine Probezeit von 6 Monaten vereinbaren.',
    question: 'Welche gesetzliche Höchstdauer gilt für Azubis nach dem BBiG?',
    options: [
      {
        id: 'opt-2a',
        text: 'Maximal 4 Monate (gesetzlicher Rahmen: mind. 1 bis max. 4 Monate)',
        isCorrect: true,
        lawParagraph: '§ 20 BBiG',
        explanation: 'Für Auszubildende darf die Probezeit maximal 4 Monate dauern. 6 Monate gilt nur für normale Arbeitnehmer.'
      },
      {
        id: 'opt-2b',
        text: 'Maximal 6 Monate wie bei allen regulären Arbeitsverträgen',
        isCorrect: false,
        lawParagraph: 'BBiG vs. BGB',
        explanation: 'Falsch: Das BBiG ist zwingendes Schutzrecht für Azubis und limitiert die Probezeit auf max. 4 Monate.'
      }
    ]
  },
  {
    id: 'case-3',
    situation: 'Ein Auszubildender stürzt auf dem direkten Weg zur Berufsschule mit dem Fahrrad (Wegeunfall).',
    question: 'Welcher Träger zahlt Behandlung und Reha und wer finanziert diesen Zweig?',
    options: [
      {
        id: 'opt-3a',
        text: 'Berufsgenossenschaft (Gesetzliche Unfallversicherung) – zu 100% allein vom Arbeitgeber bezahlt',
        isCorrect: true,
        lawParagraph: '§ 150 SGB VII',
        explanation: 'Die gesetzliche Unfallversicherung ist reine Unternehmerhaftpflicht. Die Beiträge trägt der Arbeitgeber zu 100% allein.'
      },
      {
        id: 'opt-3b',
        text: 'Krankenkasse – paritätisch zu je 50% von Arbeitgeber und Azubi finanziert',
        isCorrect: false,
        lawParagraph: 'SGB-Zuständigkeit',
        explanation: 'Falsch: Wege- und Arbeitsunfälle fallen unter die Berufsgenossenschaft (Unfallversicherung), nicht die GKV!'
      }
    ]
  },
  {
    id: 'case-4',
    situation: 'Eine Agenturleitung kündigt einem Webdesigner, ohne den bestehenden Betriebsrat vorab anzuhören.',
    question: 'Welche rechtliche Konsequenz hat das Unterlassen der Anhörung?',
    options: [
      {
        id: 'opt-4a',
        text: 'Die Kündigung ist von vornherein absolut unwirksam',
        isCorrect: true,
        lawParagraph: '§ 102 Abs. 1 BetrVG',
        explanation: 'Eine Kündigung ohne vorherige Anhörung des Betriebsrats ist gesetzlich unheilbar unwirksam.'
      },
      {
        id: 'opt-4b',
        text: 'Die Kündigung bleibt gültig, der Betriebsrat erhält lediglich 500 € Entschädigung',
        isCorrect: false,
        lawParagraph: 'Rechtsfolge',
        explanation: 'Falsch: Das Gesetz schützt das Arbeitsverhältnis direkt – die Kündigung ist schlichtweg nichtig.'
      }
    ]
  },
  {
    id: 'case-5',
    situation: 'Drei Designer wollen eine GmbH gründen, um ihr privates Vermögen vor Schadensersatzforderungen zu schützen.',
    question: 'Welches gesetzliche Mindeststammkapital ist für eine GmbH vorgeschrieben?',
    options: [
      {
        id: 'opt-5a',
        text: 'Mindestens 25.000 € Stammkapital (Haftung auf Gesellschaftsvermögen beschränkt)',
        isCorrect: true,
        lawParagraph: '§ 5 Abs. 1 GmbHG',
        explanation: 'Richtig! Bei der GmbH haften die Gesellschafter grundsätzlich nicht mit ihrem Privatvermögen.'
      },
      {
        id: 'opt-5b',
        text: 'Mindestens 50.000 € Stammkapital',
        isCorrect: false,
        lawParagraph: 'Kapitalgrenze',
        explanation: 'Falsch: 50.000 € ist das Grundkapital einer Aktiengesellschaft (AG), für die GmbH genügen 25.000 €.'
      }
    ]
  },
  {
    id: 'case-6',
    situation: 'Eine Druckerei liefert 10.000 Flyer mit deutlichen Farbstreifen und Passerfehlern (Sachmangel).',
    question: 'Welches vorrangige Recht hat der Käufer nach BGB gegenüber dem Verkäufer?',
    options: [
      {
        id: 'opt-6a',
        text: 'Vorrang der Nacherfüllung (Neulieferung oder Reparatur mit Fristsetzung)',
        isCorrect: true,
        lawParagraph: '§§ 437, 439 BGB',
        explanation: 'Recht der zweiten Andienung: Der Verkäufer hat zuerst das Recht, den Mangel zu beseitigen oder neu zu liefern.'
      },
      {
        id: 'opt-6b',
        text: 'Sofortiger Rücktritt vom Kaufvertrag und Geld zurückverlangen',
        isCorrect: false,
        lawParagraph: 'Prüfungsfalle!',
        explanation: 'Falsch: Rücktritt und Minderung sind nachrangige Rechte und erst nach erfolglosem Ablauf einer Nachfrist zulässig.'
      }
    ]
  },
  {
    id: 'case-7',
    situation: 'Ein 16-jähriger Auszubildender soll an 6 Tagen die Woche jeweils 9 Stunden arbeiten.',
    question: 'Ist diese Einteilung nach dem Jugendarbeitsschutzgesetz (JArbSchG) zulässig?',
    options: [
      {
        id: 'opt-7a',
        text: 'Nein, absolut unzulässig: Max. 8 Stunden täglich und strikte 5-Tage-Woche für Jugendliche',
        isCorrect: true,
        lawParagraph: '§§ 8, 15 JArbSchG',
        explanation: 'Jugendliche unter 18 dürfen max. 8 Std./Tag (40 Std./Woche) an max. 5 Werktagen beschäftigt werden.'
      },
      {
        id: 'opt-7b',
        text: 'Ja, sofern die Überstunden mit 25% Zuschlag vergütet werden',
        isCorrect: false,
        lawParagraph: 'Arbeitsschutz',
        explanation: 'Falsch: Gesundheitsschutz geht vor Geld – der Schutz Minderjähriger kann nicht durch Zuschläge ausgehebelt werden.'
      }
    ]
  },
  {
    id: 'case-8',
    situation: 'Ein Mediengestalter ist wegen eines Bandscheibenvorfalls 10 Wochen durchgehend krankgeschrieben.',
    question: 'Wer zahlt in den ersten 6 Wochen und wer zahlt ab der 7. Woche?',
    options: [
      {
        id: 'opt-8a',
        text: 'Woche 1–6: Arbeitgeber zahlt 100% (Entgeltfortzahlung); ab Woche 7: Krankenkasse zahlt Krankengeld',
        isCorrect: true,
        lawParagraph: '§ 3 EntgFG & § 44 SGB V',
        explanation: 'Der Arbeitgeber zahlt bis zu 6 Wochen das volle Gehalt weiter, ab Tag 43 springt die Krankenkasse mit Krankengeld ein.'
      },
      {
        id: 'opt-8b',
        text: 'Die Agentur für Arbeit zahlt von Tag 1 an Arbeitslosengeld',
        isCorrect: false,
        lawParagraph: 'Sozialleistung',
        explanation: 'Falsch: Die Agentur für Arbeit zahlt nur bei Arbeitslosigkeit, nicht bei bestehendem Arbeitsverhältnis und Krankheit.'
      }
    ]
  },
  {
    id: 'case-9',
    situation: 'In einer Kommanditgesellschaft (KG) geht das Unternehmen insolvent und hinterlässt 200.000 € Schulden.',
    question: 'Welcher Gesellschafter haftet voll mit seinem gesamten privaten Vermögen?',
    options: [
      {
        id: 'opt-9a',
        text: 'Der Komplementär (Vollhafter haftet unbeschränkt mit Privat- und Geschäftsvermögen)',
        isCorrect: true,
        lawParagraph: '§§ 161, 171 HGB',
        explanation: 'Der Komplementär haftet unbeschränkt, während der Kommanditist (Teilhafter) nur mit seiner Einlage haftet.'
      },
      {
        id: 'opt-9b',
        text: 'Der Kommanditist haftet voll mit Haus und Hof, der Komplementär gar nicht',
        isCorrect: false,
        lawParagraph: 'Eselsbrücke',
        explanation: 'Falsch: Genau umgekehrt! Der KompleMENTÄR haftet KOMPLETT mit Privatvermögen.'
      }
    ]
  },
  {
    id: 'case-10',
    situation: 'Ein Auszubildender im 2. Ausbildungsjahr möchte seine Ausbildung beenden, um ein Medizinstudium aufzunehmen.',
    question: 'Darf der Azubi kündigen und mit welcher Frist?',
    options: [
      {
        id: 'opt-10a',
        text: 'Ja, schriftlich mit einer Kündigungsfrist von 4 Wochen bei Berufsaufgabe oder Wechsel',
        isCorrect: true,
        lawParagraph: '§ 22 Abs. 2 Nr. 2 BBiG',
        explanation: 'Der Gesetzgeber gibt Azubis ein Sonderkündigungsrecht mit 4 Wochen Frist, wenn sie sich für einen anderen Beruf entscheiden.'
      },
      {
        id: 'opt-10b',
        text: 'Nein, nach der Probezeit ist der Azubi unkündbar an den Betrieb gebunden',
        isCorrect: false,
        lawParagraph: 'Berufsfreiheit Art. 12 GG',
        explanation: 'Falsch: Niemand kann gegen seinen Willen in einer unpassenden Berufsausbildung festgehalten werden.'
      }
    ]
  }
];

export const WisoDuelGame: React.FC<{ onComplete: (score: number) => void; isLevel2?: boolean }> = ({ onComplete, isLevel2 = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; lawParagraph: string; explanation: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentCase = WISO_CASES[currentIndex];

  const handleChoose = (optId: string) => {
    if (feedback !== null) return;

    setSelectedOptionId(optId);
    const chosen = currentCase.options.find(o => o.id === optId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      soundEffects.playCorrect();
      const points = 10 + streak * 2;
      setScore(s => s + points);
      setStreak(st => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
      setFeedback({
        isCorrect: true,
        lawParagraph: chosen.lawParagraph,
        explanation: chosen.explanation,
      });
    } else {
      soundEffects.playWrong();
      setStreak(0);
      setFeedback({
        isCorrect: false,
        lawParagraph: chosen.lawParagraph,
        explanation: chosen.explanation,
      });
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    setSelectedOptionId(null);
    setFeedback(null);

    if (currentIndex + 1 < WISO_CASES.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsGameOver(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete(30);
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOptionId(null);
    setFeedback(null);
    setIsGameOver(false);
  };

  if (isGameOver) {
    const accuracy = Math.round((score / (WISO_CASES.length * 10)) * 100);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 animate-in zoom-in-95 duration-400">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/60 rounded-2xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Rechtsduell gemeistert!
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            WiSo-Paragraphen & Fristen-Duell
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Du hast alle 10 IHK-Praxisfälle durchgespielt und bewiesen, dass du rechtssicher argumentieren kannst.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Punkte</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{score}</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Top Streak</span>
            <div className="text-xl font-black text-amber-500 mt-0.5">{maxStreak}x</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Belohnung</span>
            <div className="text-xl font-black text-emerald-500 mt-0.5">+30 EXP</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Nochmal spielen</span>
        </button>
      </div>
    );
  }

  const progressPct = Math.round(((currentIndex + 1) / WISO_CASES.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <span>WiSo-Paragraphen & Fristen-Duell</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono">
                Fall {currentIndex + 1} von {WISO_CASES.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Triff die rechtssichere IHK-Entscheidung für die Situation
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

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Situation Card */}
      <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Praxisfall #{currentIndex + 1}</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium">
          {currentCase.situation}
        </p>
        <div className="pt-2 text-xs font-bold text-slate-900 dark:text-white">
          {currentCase.question}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentCase.options.map(opt => {
          const isSelected = selectedOptionId === opt.id;
          const showAnswer = feedback !== null;
          let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 text-slate-800 dark:text-slate-200';

          if (showAnswer) {
            if (opt.isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20';
            } else if (isSelected) {
              btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20';
            } else {
              btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleChoose(opt.id)}
              disabled={showAnswer}
              className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
            >
              <div className="mt-0.5">
                {showAnswer && opt.isCorrect ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : showAnswer && isSelected ? (
                  <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                )}
              </div>
              <div className="flex-1">
                <span>{opt.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border space-y-1.5 animate-in fade-in duration-200 ${
            feedback.isCorrect
              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
            {feedback.isCorrect ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Richtig entschieden! ({feedback.lawParagraph})</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Rechtliche Korrektur</span>
              </>
            )}
          </div>
          <p className="text-xs leading-relaxed opacity-90">{feedback.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {feedback && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <span>{currentIndex + 1 < WISO_CASES.length ? 'Nächster Praxisfall' : 'Ergebnis anzeigen'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
