import React, { useState } from 'react';
import { soundEffects } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Eye,
  Info,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface Flaw {
  id: string;
  title: string;
  category: 'Kontrast' | 'Touch-Target' | 'Gestaltgesetz' | 'Barrierefreiheit' | 'Affordance';
  norm: string;
  explanation: string;
  fixHint: string;
  found: boolean;
}

export const UiInspectorGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [flaws, setFlaws] = useState<Flaw[]>([
    {
      id: 'contrast',
      title: 'Ungenügender Textkontrast',
      category: 'Kontrast',
      norm: 'WCAG 2.1 AA – Kriterium 1.4.3 (Kontrast Minimum)',
      explanation:
        'Der Hinweistext ist in hellem Grau auf weißem Hintergrund dargestellt. Das Kontrastverhältnis liegt bei lediglich 2.1:1. Für Fließtext verlangt die IHK und WCAG mindestens 4.5:1 (3:1 bei großem Text ab 18pt/24px).',
      fixHint: 'Schriftfarbe auf mindestens #475569 oder dunkler abdunkeln, um 4.5:1 zu erreichen.',
      found: false,
    },
    {
      id: 'touch_target',
      title: 'Zu kleine Klickfläche (Touch-Target)',
      category: 'Touch-Target',
      norm: 'WCAG 2.5.5 / ISO 9241-161 (Klickflächengröße)',
      explanation:
        'Der Info-Button misst nur 20×20 Pixel. Für motorisch eingeschränkte Nutzer und Touchscreens fordert die IHK eine Mindestgröße von 44×44 Pixeln (bzw. 48×48px nach Android/Material Guidelines).',
      fixHint: 'Bounding Box des Buttons durch Padding auf mindestens 44×44px erweitern.',
      found: false,
    },
    {
      id: 'proximity',
      title: 'Verletzung des Gestaltgesetzes der Nähe',
      category: 'Gestaltgesetz',
      norm: 'Gestaltpsychologie: Gesetz der Nähe (Proximity)',
      explanation:
        'Der Rabatt-Hinweis klebt optisch unmittelbar am CVV-Sicherheitsfeld, obwohl er sich auf den Gutscheincode bezieht. Elemente, die zusammengehören, müssen räumlich gruppiert sein.',
      fixHint: 'Den Abstand zum Sicherheitsfeld vergrößern und den Hinweis direkt unter den Gutschein verschieben.',
      found: false,
    },
    {
      id: 'missing_label',
      title: 'Fehlendes permanentes Formular-Label',
      category: 'Barrierefreiheit',
      norm: 'WCAG 3.3.2 / DIN EN ISO 9241-110 (Aufgabenangemessenheit)',
      explanation:
        'Das Eingabefeld nutzt ausschließlich ein Placeholder-Attribut ohne sichtbares <label>. Sobald Text eingegeben wird, verschwindet der Kontext – für Screenreader und kognitiv belastete Prüflinge unzulässig.',
      fixHint: 'Ein permanentes <label for="..."> oberhalb des Eingabefeldes platzieren.',
      found: false,
    },
    {
      id: 'misleading_affordance',
      title: 'Irreführende Affordance & Signifier',
      category: 'Affordance',
      norm: 'Don Norman Design-Prinzipien & ISO 9241-110 (Erwartungskonformität)',
      explanation:
        'Der Button „Alle Bestelldaten unwiderruflich löschen“ ist in beruhigendem Frühlingsgrün (#10b981) wie ein Weiter-Button gestaltet. Destruktive Aktionen müssen eindeutig in Warnfarben (Rot) oder neutral als Sekundäraktion signalisiert werden.',
      fixHint: 'Farbe auf Rot/Danger ändern und Bestätigungs-Dialog vorschalten.',
      found: false,
    },
  ]);

  const [activeFlawDetail, setActiveFlawDetail] = useState<Flaw | null>(null);
  const [neutralFeedback, setNeutralFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const foundCount = flaws.filter((f) => f.found).length;
  const isFinished = foundCount === flaws.length;

  const handleInspect = (flawId: string) => {
    const target = flaws.find((f) => f.id === flawId);
    if (!target) return;

    if (!target.found) {
      soundEffects.playCorrect(foundCount + 1);
      const newScore = score + 5;
      setScore(newScore);

      const updated = flaws.map((f) => (f.id === flawId ? { ...f, found: true } : f));
      setFlaws(updated);
      setActiveFlawDetail({ ...target, found: true });

      if (updated.every((f) => f.found)) {
        setTimeout(() => {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          soundEffects.playLevelUp();
          onComplete(newScore + 5); // bonus completion
        }, 500);
      }
    } else {
      soundEffects.playClick();
      setActiveFlawDetail(target);
    }
  };

  const handleCompliantClick = (elementName: string, reason: string) => {
    soundEffects.playClick();
    setNeutralFeedback(`✅ "${elementName}": ${reason}`);
    setTimeout(() => setNeutralFeedback(null), 3000);
  };

  const restart = () => {
    soundEffects.playClick();
    setFlaws(flaws.map((f) => ({ ...f, found: false })));
    setScore(0);
    setActiveFlawDetail(null);
    setNeutralFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Top Game Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              IHK UX-Audit Detektiv
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              WCAG & ISO 9241
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            UI-Inspector: Enttarne die 5 Usability-Mängel
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Klicke auf verdächtige Elemente im Interface-Mockup unten, um Verstöße gegen Barrierefreiheit, Kontrast & Gestaltgesetze aufzudecken.
          </p>
        </div>

        {/* Counter & Score */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Enttarnt</div>
            <div className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {foundCount} / {flaws.length}
            </div>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-center">
            <div className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">Score</div>
            <div className="text-sm font-black font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1 justify-center">
              <Sparkles className="w-3.5 h-3.5" /> +{score} EXP
            </div>
          </div>
        </div>
      </div>

      {/* Neutral Compliant Feedback Banner */}
      {neutralFeedback && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{neutralFeedback}</span>
        </div>
      )}

      {/* Simulated Screen with Interactive Flaws */}
      <div className="bg-slate-100 dark:bg-slate-950 p-3 sm:p-5 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-sm relative">
        {/* Browser Mockup Header */}
        <div className="bg-slate-200 dark:bg-slate-900 px-4 py-2.5 rounded-t-xl border-b border-slate-300 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="ml-2 font-semibold text-[11px] text-slate-700 dark:text-slate-300">
              https://shop.ihk-design.de/checkout/pay
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Prüfungs-Mockup v2</span>
        </div>

        {/* Mockup Canvas */}
        <div className="bg-white dark:bg-slate-900 rounded-b-xl p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800">
          {/* Shop Header (Compliant) */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <button
              onClick={() => handleCompliantClick('Shop Logo', 'Guter Kontrast und verständlicher Brand-Signifier.')}
              className="text-base font-black text-slate-900 dark:text-white cursor-pointer hover:opacity-80 text-left"
            >
              🛍️ IxD-Shop Express
            </button>
            <button
              onClick={() => handleCompliantClick('Warenkorb-Icon', 'Klares Icon mit Zähler entspricht ISO 9241 Erwartungskonformität.')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              Warenkorb (2)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Form Fields */}
            <div className="space-y-4">
              {/* Flaw 4: Missing Label (WCAG 3.3.2) */}
              <div
                onClick={() => handleInspect('missing_label')}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative group ${
                  flaws.find((f) => f.id === 'missing_label')?.found
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                    : 'border-transparent hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {flaws.find((f) => f.id === 'missing_label')?.found && (
                  <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold font-mono">
                    ✓ Enttarnt: WCAG 3.3.2
                  </span>
                )}
                {/* Notice: No <label> tag! Only placeholder */}
                <input
                  type="text"
                  placeholder="Vollständiger Vor- und Nachname..."
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 cursor-pointer pointer-events-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block italic group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  (Tippe hier: Fehlt hier eine feste Feldbeschriftung?)
                </span>
              </div>

              {/* Compliant Field: E-Mail with proper label */}
              <div
                onClick={() => handleCompliantClick('E-Mail Feld', 'Vorbildlich gelöst mit sichtbarem <label> und logischer Eingabestruktur.')}
                className="p-3 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
              >
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  E-Mail-Adresse für Rechnung *
                </label>
                <div className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200">
                  max.muster@ihk-design.de
                </div>
              </div>

              {/* Flaw 1: Contrast issue (WCAG 1.4.3) */}
              <div
                onClick={() => handleInspect('contrast')}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative group ${
                  flaws.find((f) => f.id === 'contrast')?.found
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                    : 'border-transparent hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {flaws.find((f) => f.id === 'contrast')?.found && (
                  <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold font-mono">
                    ✓ Enttarnt: Kontrast 2.1:1
                  </span>
                )}
                {/* Intentional bad contrast: text-slate-300 on white */}
                <p className="text-xs text-slate-300 dark:text-slate-600 font-medium select-none">
                  Lieferung erfolgt standardmäßig an die hinterlegte Hauptadresse der Firma. Klicke hier für abweichende Rechnungsadresse.
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block italic group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  (Tippe hier: Ist dieser Text auf weißem Hintergrund lesbar?)
                </span>
              </div>
            </div>

            {/* Right Column: Payment & Actions */}
            <div className="space-y-4">
              {/* Payment Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Zahlungsmethode: Kreditkarte</span>
                  {/* Flaw 2: Touch Target Too Small (20x20px icon button) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInspect('touch_target');
                    }}
                    className={`p-1 rounded-md transition-all cursor-pointer relative group ${
                      flaws.find((f) => f.id === 'touch_target')?.found
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title="Info-Icon"
                  >
                    {flaws.find((f) => f.id === 'touch_target')?.found && (
                      <span className="absolute -top-6 -right-2 px-1.5 py-0.2 rounded bg-emerald-500 text-white text-[8px] font-bold font-mono whitespace-nowrap">
                        ✓ &lt;44px Target
                      </span>
                    )}
                    {/* Deliberately small 16px icon with zero padding */}
                    <div className="w-5 h-5 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-sm">
                      <Info className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                    </div>
                  </div>
                </div>

                {/* Flaw 3: Proximity violation */}
                <div
                  onClick={() => handleInspect('proximity')}
                  className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer relative group ${
                    flaws.find((f) => f.id === 'proximity')?.found
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                      : 'border-transparent hover:border-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {flaws.find((f) => f.id === 'proximity')?.found && (
                    <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold font-mono">
                      ✓ Gesetz der Nähe verletzt
                    </span>
                  )}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">CVV Sicherheitscode</label>
                      <input
                        type="password"
                        value="123"
                        readOnly
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 cursor-pointer pointer-events-none"
                      />
                    </div>
                  </div>
                  {/* Flaw: Rabattcode-Hinweis klebt direkt unter dem CVV-Feld! */}
                  <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                    🎁 Spar-Tipp: Gib den Gutscheincode 'IHK2026' für 15% Rabatt ein!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleCompliantClick('Kauf abschließen Button', 'Klarer Call-to-Action mit vorbildlicher Größe und deutlichem Label.')}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Kauf verbindlich abschließen (99,00 €)
                </button>

                {/* Flaw 5: Misleading Affordance (Destructive action styled as happy bright green) */}
                <div
                  onClick={() => handleInspect('misleading_affordance')}
                  className={`rounded-xl border-2 transition-all cursor-pointer relative group ${
                    flaws.find((f) => f.id === 'misleading_affordance')?.found
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                      : 'border-transparent hover:border-indigo-400'
                  }`}
                >
                  {flaws.find((f) => f.id === 'misleading_affordance')?.found && (
                    <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold font-mono">
                      ✓ Falsche Affordance
                    </span>
                  )}
                  {/* Deliberately dangerous green for irreversible delete */}
                  <button className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs pointer-events-none flex items-center justify-center gap-1.5">
                    <span>✨ Alle Bestelldaten unwiderruflich löschen</span>
                  </button>
                  <span className="text-[10px] text-slate-400 text-center block mt-1 pb-1 italic group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    (Tippe hier: Passt diese grüne Farbe zu einer irreversiblen Löschung?)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Flaw Detailed IHK-Dossier Card */}
      {activeFlawDetail && (
        <div className="bg-indigo-50/70 dark:bg-indigo-950/50 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-5 space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold font-mono">
                {activeFlawDetail.category}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {activeFlawDetail.title}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
              {activeFlawDetail.norm}
            </span>
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="font-medium">{activeFlawDetail.explanation}</p>
            <div className="mt-2 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-200 dark:border-indigo-900 flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">💡 IHK-Lösungsansatz:</span>
              <span className="text-slate-600 dark:text-slate-300">{activeFlawDetail.fixHint}</span>
            </div>
          </div>
        </div>
      )}

      {/* Finished Summary Banner */}
      {isFinished && (
        <div className="bg-gradient-to-r from-emerald-500/15 via-indigo-500/15 to-amber-500/15 rounded-2xl border border-emerald-300 dark:border-emerald-800 p-6 text-center space-y-3 animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto text-3xl shadow-sm">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Hervorragend! Alle 5 IHK-Mängel erfolgreich auditiert!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1">
              Du hast alle Verstöße gegen Kontrast, Touch-Targets, Nähe, Labels und Affordance sicher erkannt. Die EXP-Belohnung wurde deinem Profil gutgeschrieben!
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={restart}
              className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 mx-auto shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Audit wiederholen & üben</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
