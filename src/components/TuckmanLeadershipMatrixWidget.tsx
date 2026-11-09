import React, { useState } from 'react';
import { Users, Shield, Target, Award, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface PhaseRow {
  id: string;
  phase: string;
  subTitle: string;
  badgeColor: string;
  borderColor: string;
  textColor: string;
  behavior: string;
  leadershipStyle: string;
  keyTask: string;
  ihkTrap: string;
}

const TUCKMAN_MATRIX_DATA: PhaseRow[] = [
  {
    id: 'forming',
    phase: '1. Forming',
    subTitle: 'Orientierungsphase',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    borderColor: 'border-sky-500/40',
    textColor: 'text-sky-400',
    behavior: 'Abtasten, Unsicherheit, Höflichkeit, starke Ausrichtung auf die Führungskraft.',
    leadershipStyle: 'Direktiv & Anleitend',
    keyTask: 'Orientierung bieten, Ziele und Rollen klar definieren, Spielregeln und Kennenlernen strukturieren.',
    ihkTrap: 'Gefahr der "Scheinharmonie": Die konfliktfreie Stimmung ist keine echte Reife, sondern verdeckt Orientierungssuche!',
  },
  {
    id: 'storming',
    phase: '2. Storming',
    subTitle: 'Konfliktphase',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    textColor: 'text-amber-400',
    behavior: 'Meinungsverschiedenheiten, Hinterfragen von Macht & Rollen, verdeckte Reibung und Lagerbildung.',
    leadershipStyle: 'Überzeugend & Moderierend',
    keyTask: 'Neutral moderieren, Konflikte konstruktiv ansprechbar machen, fairen Streitrahmen und gegenseitigen Respekt sichern.',
    ihkTrap: 'Konflikte nicht zudecken oder aussitzen: Reibung ist ein notwendiger Reifungsschritt für echte Synergie!',
  },
  {
    id: 'norming',
    phase: '3. Norming',
    subTitle: 'Organisationsphase',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    textColor: 'text-emerald-400',
    behavior: 'Entwicklung ungeschriebener Spielregeln, Wir-Gefühl, kollegiale Lösungsfindung ohne ständige Führung.',
    leadershipStyle: 'Partizipativ & Unterstützend',
    keyTask: 'Verantwortung abgeben, Entscheidungen ins Team verlagern, Vertrauen schenken und Selbstorganisation fördern.',
    ihkTrap: 'Micromanagement-Falle: Die Führungskraft darf durch Überkontrolle das gewachsene Vertrauen nicht zerstören!',
  },
  {
    id: 'performing',
    phase: '4. Performing',
    subTitle: 'Hochleistungsphase',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    borderColor: 'border-purple-500/40',
    textColor: 'text-purple-400',
    behavior: 'Selbstständige Hochleistung, Flow, konstruktive Streitkultur, Synergie (Gruppe > Summe der Einzelnen).',
    leadershipStyle: 'Delegierend & Servant Leadership',
    keyTask: 'Ziele steuern, externe Hindernisse räumen, als Ansprechpartner da sein und Erfolge sichtbar würdigen.',
    ihkTrap: 'Performing ist kein statischer Dauerzustand: Personelle Wechsel oder Umstrukturierungen werfen das Team zurück!',
  },
  {
    id: 'adjourning',
    phase: '5. Adjourning (1977)',
    subTitle: 'Auflösungsphase',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    borderColor: 'border-rose-500/40',
    textColor: 'text-rose-400',
    behavior: 'Zielerreichung, Projektabschluss, emotionale Ambivalenz aus Stolz über Erreichtes und Wehmut wegen Trennung.',
    leadershipStyle: 'Transformationell & Würdigend',
    keyTask: 'Bewusster Projektabschluss, Retrospektive (Lessons Learned), persönliche Danksagung & geordnete Entlastung.',
    ihkTrap: 'Liebloser Abschluss: Ohne sauberes Adjourning verflüchtigt sich Wissen und das Vertrauen fürs Folgeteam leidet!',
  },
];

export const TuckmanLeadershipMatrixWidget: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<string>('forming');

  const selectedPhase = TUCKMAN_MATRIX_DATA.find(p => p.id === activePhaseId) || TUCKMAN_MATRIX_DATA[0];

  return (
    <div className="my-6 bg-slate-950 border-2 border-indigo-500/40 rounded-2xl p-5 shadow-xl space-y-5 text-slate-100 overflow-hidden relative">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                IHK Leitfaden & Prüfungs-Matrix
              </span>
              <span className="text-[9px] font-mono bg-indigo-900/60 text-indigo-200 px-2 py-0.5 rounded border border-indigo-700">
                Kapitel 12
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              Tuckman Teamentwicklung vs. Führungsstile (DIN 69901)
            </h3>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-medium self-start sm:self-center bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Klick auf eine Phase zur Detailanalyse
        </span>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TUCKMAN_MATRIX_DATA.map(p => {
          const isSelected = p.id === activePhaseId;
          return (
            <button
              key={p.id}
              onClick={() => setActivePhaseId(p.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-900/60 border-indigo-500 text-white ring-2 ring-indigo-500/50 shadow-md'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{p.phase}</div>
              <div className="text-[10px] text-slate-400 truncate mt-1">{p.subTitle}</div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Card Detail */}
      <div className={`p-5 rounded-2xl bg-slate-900/90 border ${selectedPhase.borderColor} space-y-4 animate-in fade-in duration-300`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${selectedPhase.badgeColor}`}>
              {selectedPhase.phase} · {selectedPhase.subTitle}
            </span>
          </div>
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-950/50 border border-amber-800/60 px-2.5 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Führungsstil: {selectedPhase.leadershipStyle}</span>
          </div>
        </div>

        {/* 3 Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Col 1: Team Behavior */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              1. Team-Dynamik & Verhalten
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">
              {selectedPhase.behavior}
            </p>
          </div>

          {/* Col 2: Primary Leadership Task */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider block">
              2. Primäre Führungsaufgabe
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">
              {selectedPhase.keyTask}
            </p>
          </div>

          {/* Col 3: IHK Prüfungsfalle */}
          <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-800/40 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>3. IHK-Prüfungsfalle</span>
            </span>
            <p className="text-amber-100 font-medium leading-relaxed">
              {selectedPhase.ihkTrap}
            </p>
          </div>
        </div>
      </div>

      {/* Structured Comparison Table view (Exhaustive Table) */}
      <div className="pt-2">
        <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Vollständige IHK-Übersichtstabelle (Forming bis Adjourning 1977):</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-indigo-300 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-bold">Tuckman-Phase</th>
                <th className="py-2.5 px-3 font-bold">Führungsstil</th>
                <th className="py-2.5 px-3 font-bold">Hauptaufgabe der Führung</th>
                <th className="py-2.5 px-3 font-bold">Typische IHK-Prüfungsfalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/60 text-slate-200 text-[11px]">
              {TUCKMAN_MATRIX_DATA.map(row => (
                <tr
                  key={row.id}
                  onClick={() => setActivePhaseId(row.id)}
                  className={`hover:bg-slate-900/80 cursor-pointer transition-colors ${
                    row.id === activePhaseId ? 'bg-indigo-950/40' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">{row.phase}</td>
                  <td className={`py-2.5 px-3 font-semibold ${row.textColor} whitespace-nowrap`}>{row.leadershipStyle}</td>
                  <td className="py-2.5 px-3 leading-snug">{row.keyTask}</td>
                  <td className="py-2.5 px-3 text-amber-300/90 leading-snug">{row.ihkTrap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
