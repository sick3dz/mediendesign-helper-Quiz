import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Image, Check, X, RotateCcw, Award, Sparkles, ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface FormatTask {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const LEVEL1_TASKS: FormatTask[] = [
  {
    id: 'fmt-1',
    scenario: 'Eine Agentur benötigt ein Firmenlogo für den Web-Header, das gestochen scharf auf Retina-Displays skaliert und eine sehr kleine Dateigröße aufweist.',
    question: 'Welches Format ist optimal?',
    options: [
      { id: 'a', text: 'SVG (Skalierbare Vektorgrafik)', isCorrect: true, explanation: 'Richtig! SVG ist als Vektor unendlich skalierbar, stufenlos scharf auf Retina und ideal für Logos.' },
      { id: 'b', text: 'JPG (High Quality Pixelbild)', isCorrect: false, explanation: 'Falsch: JPG ist ein Pixelformat und verpixelt/unscharf bei Retina-Skalierung.' }
    ]
  },
  {
    id: 'fmt-2',
    scenario: 'Ein Fotograf möchte 50 hochauflösende Porträtfotos für eine schnelle Ladezeit auf einer Produktwebsite optimieren (inkl. transparenter Hintergründe).',
    question: 'Welches Format bietet die beste Balance aus Kompression und Transparenz?',
    options: [
      { id: 'a', text: 'WebP (oder AVIF)', isCorrect: true, explanation: 'Richtig! WebP bietet 25-35% bessere Kompression als JPG/PNG und unterstützt Alphakanal-Transparenz.' },
      { id: 'b', text: 'BMP (Bitmap)', isCorrect: false, explanation: 'Falsch: BMP ist unkomprimiert und riesig.' }
    ]
  },
  {
    id: 'fmt-3',
    scenario: 'Für ein Web-Interface soll die Farbdarstellung auf Monitoren optimiert werden.',
    question: 'Welches Farbmodell muss für die Bildschirmausgabe im Webbrowser verwendet werden?',
    options: [
      { id: 'a', text: 'RGB (Additives Farbmodell aus Rot, Grün, Blau)', isCorrect: true, explanation: 'Exakt! RGB ist das Lichtfarben-Modell für Displays.' },
      { id: 'b', text: 'CMYK (Subtraktives Farbmodell für Druckfarben)', isCorrect: false, explanation: 'Falsch: CMYK wird von Browsern unzuverlässig dargestellt.' }
    ]
  },
  {
    id: 'fmt-4',
    scenario: 'Ein Druckauftrag für Flyer soll an die Druckerei übergeben werden.',
    question: 'Welche Auflösung ist IHK-Standard für qualitativ hochwertige Druck-Erzeugnisse bei 100% Ausgabegröße?',
    options: [
      { id: 'a', text: '300 DPI (Dots Per Inch)', isCorrect: true, explanation: 'Richtig! 300 DPI ist der etablierte Qualitätsstandard im Offset- und Digitaldruck.' },
      { id: 'b', text: '72 DPI', isCorrect: false, explanation: 'Falsch: 72 DPI war ein alter Bildschirmstandard und führt im Druck zu Treppeneffekten.' }
    ]
  }
];

const LEVEL2_TASKS: FormatTask[] = [
  {
    id: 'fmt-l2-1',
    scenario: 'Ein Kunde fordert Medienneutralität (Single Source Publishing). In welchem Farbraum und Dateiformat sollen die Bild-Assets im Master-Archiv vorgehalten werden?',
    question: 'Wie wird das Archiv aufgebaut?',
    options: [
      { id: 'a', text: 'RGB-Farbraum (z.B. eciRGBv2 / AdobeRGB) in verlustfreiem Format (TIFF / RAW) – Konvertierung nach CMYK erst bei Druckausgabe', isCorrect: true, explanation: 'Richtig! Der große RGB-Farbraum bewahrt alle Farbinformationen. Erst vor dem Druck wird profilbasiert in das Ziel-CMYK (z.B. PSO Coated v3) konvertiert.' },
      { id: 'b', text: 'Direkt in CMYK FOGRA39 konvertieren und als komprimiertes JPG speichern', isCorrect: false, explanation: 'Falsch: CMYK ist ein reduzierter Ziel-Farbraum. Einmal in CMYK konvertiert gehen Farbwerte für die digitale Webnutzung verloren.' }
    ]
  },
  {
    id: 'fmt-l2-2',
    scenario: 'Worin unterscheidet sich AVIF von WebP bezüglich moderner Web-Performance?',
    question: 'Welches Format bietet noch höhere Kompression bei anspruchsvollen Fotomotiven?',
    options: [
      { id: 'a', text: 'AVIF basiert auf dem AV1-Videocodec und erreicht nochmals 20% bessere Datenkompression als WebP bei hoher Detailtreue', isCorrect: true, explanation: 'Exakt! AVIF ist der aktuell modernste Next-Gen Bildstandard im Web.' },
      { id: 'b', text: 'AVIF kann keine Transparenzen darstellen, WebP hingegen schon', isCorrect: false, explanation: 'Falsch: Sowohl WebP als auch AVIF unterstützen volle Transparenz (Alpha-Kanal).' }
    ]
  }
];

export const GraphicsFormatGame: React.FC<{ onComplete: (score: number) => void; isLevel2?: boolean }> = ({ onComplete, isLevel2 = false }) => {
  const tasks = isLevel2 ? LEVEL2_TASKS : LEVEL1_TASKS;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [done, setDone] = useState(false);

  const current = tasks[index];

  const handleChoose = (optId: string) => {
    if (feedback !== null) return;
    setSelectedOptId(optId);

    const chosen = current.options.find(o => o.id === optId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      soundEffects.playCorrect();
      setScore(s => s + (isLevel2 ? 15 : 10));
      setFeedback({ isCorrect: true, text: chosen.explanation });
    } else {
      soundEffects.playWrong();
      setFeedback({ isCorrect: false, text: chosen.explanation });
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    setSelectedOptId(null);
    setFeedback(null);

    if (index + 1 < tasks.length) {
      setIndex(i => i + 1);
    } else {
      setDone(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onComplete(isLevel2 ? 40 : 25);
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setIndex(0);
    setScore(0);
    setSelectedOptId(null);
    setFeedback(null);
    setDone(false);
  };

  if (done) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 animate-in zoom-in-95 duration-400">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400 shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {isLevel2 ? '🏆 Meister-Challenge Bestanden!' : 'Grafik-Format Challenge gemeistert!'}
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Vektor, Pixel & Farbräume
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Du hast alle Format- und Farbraum-Entscheidungen nach IHK-Standard fehlerfrei getroffen.
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Challenge erneut spielen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <span>{isLevel2 ? '🏆 Meister-Challenge: Bilddaten' : 'Grafik-Format & Farbraum Sorter'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono">
                Szenario {index + 1} von {tasks.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Bestimme das korrekte Dateiformat & Farbmodell
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Produktions-Szenario #{index + 1}</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium">
          {current.scenario}
        </p>
        <div className="pt-2 text-xs font-bold text-slate-900 dark:text-white">
          {current.question}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {current.options.map(opt => {
          const isSelected = selectedOptId === opt.id;
          const showAnswer = feedback !== null;
          let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 text-slate-800 dark:text-slate-200';

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

      {/* Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border space-y-1.5 animate-in fade-in duration-200 ${
            feedback.isCorrect
              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }`}
        >
          <p className="text-xs leading-relaxed font-medium">{feedback.text}</p>
        </div>
      )}

      {/* Next Button */}
      {feedback && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <span>{index + 1 < tasks.length ? 'Nächstes Szenario' : 'Ergebnis anzeigen'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
