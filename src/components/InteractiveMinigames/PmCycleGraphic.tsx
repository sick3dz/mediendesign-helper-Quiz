import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, FileText, UserCheck, Eye } from 'lucide-react';

export interface PmPhaseDetail {
  id: number;
  name: string;
  shortGoal: string;
  fullTitle: string;
  keyQuestion: string;
  artifacts: string[];
  tuckmanPhase: string;
  leadershipStyle: string;
  scopeProtection: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  ringColor: string;
}

export const PM_PHASES_DATA: PmPhaseDetail[] = [
  {
    id: 1,
    name: '1. Initialisierung',
    shortGoal: 'Projektidee & Machbarkeit',
    fullTitle: 'Phase 1: Initialisierung (DIN 69901-2)',
    keyQuestion: 'Soll das Projekt überhaupt gestartet werden? (Entscheidung über das OB)',
    artifacts: ['Projektauftrag (Project Charter)', 'Machbarkeitsanalyse', 'Stakeholder-Ersterfassung'],
    tuckmanPhase: 'Forming (Orientierungsphase)',
    leadershipStyle: 'Autoritär / Direktiv (Klarheit schaffen, Regeln vorgeben)',
    scopeProtection: 'Ziele grob abzustecken, aber noch keine Detailplanung.',
    color: '#0284C7', // Sky Blue
    bgLight: 'bg-sky-50 dark:bg-sky-950/40',
    borderLight: 'border-sky-200 dark:border-sky-800',
    textColor: 'text-sky-600 dark:text-sky-400',
    ringColor: 'ring-sky-500',
  },
  {
    id: 2,
    name: '2. Definition',
    shortGoal: 'Ziele, Scope & Nicht-Ziele',
    fullTitle: 'Phase 2: Definition (DIN 69901-2)',
    keyQuestion: 'Was ist im Projekt enthalten und was explizit AUSGESCHLOSSEN?',
    artifacts: ['Anforderungsspezifikation / Lastenheft', 'Nicht-Ziele Katalog (Scope Creep Schutz)', 'Projektstrukturplan (PSP) Entwurf'],
    tuckmanPhase: 'Storming (Konfliktphase)',
    leadershipStyle: 'Moderierend / Anleitend (Konflikte klären, Abgrenzung festigen)',
    scopeProtection: 'Kritischer Schutz vor Scope Creep durch verbindliche Nicht-Ziele.',
    color: '#D97706', // Amber / Orange
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    borderLight: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-600 dark:text-amber-400',
    ringColor: 'ring-amber-500',
  },
  {
    id: 3,
    name: '3. Planung',
    shortGoal: 'Termine, PSP & Ressourcen',
    fullTitle: 'Phase 3: Planung (DIN 69901-2)',
    keyQuestion: 'Wie, wann und mit welchen Mitteln setzen wir das Projekt um?',
    artifacts: ['Finaler Projektstrukturplan (PSP)', 'Gantt- / Terminplan', 'Meilenstein- & Kapazitätsplan', 'Risiko- & Kostenbudget'],
    tuckmanPhase: 'Norming (Organisationsphase)',
    leadershipStyle: 'Beratend / Kooperativ (Gemeinsame Spielregeln & Meilensteine)',
    scopeProtection: 'Baselines (Termin-, Kosten- & Ziel-Baseline) werden fixiert.',
    color: '#059669', // Emerald
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    ringColor: 'ring-emerald-500',
  },
  {
    id: 4,
    name: '4. Steuerung',
    shortGoal: 'Soll-Ist & Change Requests',
    fullTitle: 'Phase 4: Steuerung & Durchführung (DIN 69901-2)',
    keyQuestion: 'Liegen wir in Zeit, Budget und Qualität? (Fortgangscontrolling)',
    artifacts: ['Soll-Ist-Vergleich / Meilenstein-Trend-Analyse', 'Change Request (Änderungsantrag) Protokolle', 'Qualitätssicherungsberichte'],
    tuckmanPhase: 'Performing (Leistungsphase)',
    leadershipStyle: 'Delegierend / Coachend (Eigenverantwortung & Hindernisse beseitigen)',
    scopeProtection: 'Änderungen NUR über formelle Change Requests mit Folgenabschätzung.',
    color: '#4F46E5', // Indigo
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
    borderLight: 'border-indigo-200 dark:border-indigo-800',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    ringColor: 'ring-indigo-500',
  },
  {
    id: 5,
    name: '5. Abschluss',
    shortGoal: 'Lessons Learned & Übergabe',
    fullTitle: 'Phase 5: Abschluss (DIN 69901-2)',
    keyQuestion: 'Was haben wir gelernt und wie übergeben wir das Ergebnis geordnet?',
    artifacts: ['Projektabschlussbericht', 'Lessons Learned Dokumentation', 'Formales Abnahmeprotokoll', 'Auflösung des Projektteams'],
    tuckmanPhase: 'Adjourning (Auflösungsphase 1977)',
    leadershipStyle: 'Transformational / Wertschätzend (Feedback, Anerkennung & Reintegration)',
    scopeProtection: 'Rückkopplung von Erfahrungswerten in Phase 1 zukünftiger Projekte.',
    color: '#E11D48', // Rose / Red
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    borderLight: 'border-rose-200 dark:border-rose-800',
    textColor: 'text-rose-600 dark:text-rose-400',
    ringColor: 'ring-rose-500',
  },
];

interface Props {
  imageUrl?: string;
  isInline?: boolean;
}

export const PmCycleGraphic: React.FC<Props> = ({ imageUrl, isInline = false }) => {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'interactive' | 'clean' | 'photo'>('interactive');

  const cleanGraphicUrl = '/src/assets/images/din69901_pm_cycle_1794249501102.jpg';
  const photoUrl = imageUrl || '/assets/aistudio/IMG_3246_0e617e58.jpeg';

  const activePhase = PM_PHASES_DATA.find((p) => p.id === activePhaseId) || PM_PHASES_DATA[0];

  // SVG Coordinates calculation for 5 nodes in a circular cycle
  // Center = (250, 220), Radius = 130
  const centerX = 250;
  const centerY = 220;
  const radius = 125;

  // Angles for 5 nodes (starting top -90deg, clockwise)
  // 1: -90° (top)
  // 2: -18° (top right)
  // 3: 54° (bottom right)
  // 4: 126° (bottom left)
  // 5: 198° (top left)
  const angles = [-90, -18, 54, 126, 198];

  const nodePositions = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  });

  if (isInline) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-1.5 space-y-1.5">
        <div className="relative w-full max-w-xs flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-sm group">
          <img
            src={cleanGraphicUrl}
            alt="DIN 69901-2 Projektmanagement Kreislauf Grafik"
            className="max-h-[170px] w-auto max-w-full object-contain rounded-lg transition-transform group-hover:scale-105 duration-200"
          />
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Interaktive Großansicht öffnen</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center space-y-4 relative z-10">
      {/* View Mode Switcher Header */}
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-semibold shadow-lg">
        <button
          onClick={() => setViewMode('interactive')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            viewMode === 'interactive'
              ? 'bg-indigo-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>⚡ Interaktiv</span>
        </button>
        <button
          onClick={() => setViewMode('clean')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            viewMode === 'clean'
              ? 'bg-sky-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5 shrink-0" />
          <span>🖼️ HD Grafik</span>
        </button>
        <button
          onClick={() => setViewMode('photo')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            viewMode === 'photo'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>📄 Skript</span>
        </button>
      </div>

      {/* Mode 1: Interactive SVG Process Model */}
      {viewMode === 'interactive' && (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
              IHK LEITFADEN-ASSET · DIN 69901-2
            </span>
            <h4 className="text-lg font-extrabold text-white">
              Der 5-Phasen Projektmanagement-Kreislauf
            </h4>
            <p className="text-xs text-slate-400">
              Klicke auf eine Phase im Diagramm, um Artefakte, Führungsstile & Tuckman-Zuordnungen einzusehen.
            </p>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full flex justify-center bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <svg viewBox="0 0 500 440" className="w-full h-auto max-h-[320px]">
              {/* Outer stroke guideline */}
              <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#1e293b" strokeWidth="4" />
              <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 8" className="animate-spin-slow opacity-40" />

              {/* Direction Arrows between nodes */}
              {nodePositions.map((pos, idx) => {
                const nextPos = nodePositions[(idx + 1) % nodePositions.length];
                return (
                  <g key={idx}>
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={nextPos.x}
                      y2={nextPos.y}
                      stroke="#475569"
                      strokeWidth="2.5"
                      markerEnd="url(#arrow-lg)"
                    />
                  </g>
                );
              })}

              <defs>
                <marker id="arrow-lg" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                </marker>
              </defs>

              {/* Center Hub */}
              <circle cx={centerX} cy={centerY} r="54" fill="#090d16" stroke="#6366f1" strokeWidth="3" />
              <text x={centerX} y={centerY - 12} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                DIN 69901-2
              </text>
              <text x={centerX} y={centerY + 6} textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="sans-serif">
                PROJEKT
              </text>
              <text x={centerX} y={centerY + 24} textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                MANAGEMENT
              </text>

              {/* 5 Phase Nodes */}
              {PM_PHASES_DATA.map((phase, idx) => {
                const pos = nodePositions[idx];
                const isActive = phase.id === activePhaseId;
                return (
                  <g
                    key={phase.id}
                    onClick={() => setActivePhaseId(phase.id)}
                    className="cursor-pointer transition-all duration-300 group"
                  >
                    {/* Outer Glow Ring when Active */}
                    {isActive && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="44"
                        fill="none"
                        stroke={phase.color}
                        strokeWidth="3"
                        strokeDasharray="4 4"
                        className="animate-spin-slow"
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 38 : 33}
                      fill={isActive ? phase.color : '#1e293b'}
                      stroke={isActive ? '#ffffff' : phase.color}
                      strokeWidth={isActive ? '4' : '2.5'}
                      className="transition-all duration-300 group-hover:scale-105"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isActive ? '14' : '12'}
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      P{phase.id}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 12}
                      textAnchor="middle"
                      fill={isActive ? '#ffffff' : '#cbd5e1'}
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="sans-serif"
                    >
                      {phase.name.split('. ')[1]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Phase Selector Buttons Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {PM_PHASES_DATA.map((phase) => {
              const isActive = phase.id === activePhaseId;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseId(phase.id)}
                  className={`px-2 py-2 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-[1.02]'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="block text-[10px] opacity-80">Phase {phase.id}</span>
                  <span className="truncate block">{phase.name.split('. ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Phase Card */}
          <div className={`p-5 rounded-xl border transition-all duration-300 space-y-4 ${activePhase.bgLight} ${activePhase.borderLight}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${activePhase.textColor}`}>
                  {activePhase.fullTitle}
                </span>
                <h5 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  Kernziel: {activePhase.shortGoal}
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 border border-slate-700 shadow-xs">
                  {activePhase.tuckmanPhase}
                </span>
              </div>
            </div>

            {/* Core Question & Scope Protection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Zentrale IHK-Leitfrage:
                </span>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "{activePhase.keyQuestion}"
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                  Scope-Schutz & Leitfaden-Regel:
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {activePhase.scopeProtection}
                </p>
              </div>
            </div>

            {/* Deliverables & Leadership Style */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Wichtigste IHK-Artefakte & Dokumente:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activePhase.artifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{art}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-sky-500" />
                Empfohlener Führungsstil: <strong className="text-slate-900 dark:text-white">{activePhase.leadershipStyle}</strong>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500">
                Lernkreislauf DIN 69901-2
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Clean HD Graphic */}
      {viewMode === 'clean' && (
        <div className="w-full bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center space-y-3 animate-in fade-in duration-300">
          <img
            src={cleanGraphicUrl}
            alt="DIN 69901-2 Projektmanagement Kreislauf Infografik"
            className="max-h-[380px] w-auto object-contain rounded-xl border border-slate-200 dark:border-slate-800"
          />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-bold">
            Hochauflösende Vektor-Grafik: Der 5-Phasen Projektmanagement-Kreislauf (DIN 69901-2)
          </span>
        </div>
      )}

      {/* Mode 3: Original Script Photo */}
      {viewMode === 'photo' && (
        <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center space-y-3 animate-in fade-in duration-300">
          <img
            src={photoUrl}
            alt="Original Lehrskript Foto Seite 7"
            className="max-h-[400px] w-auto object-contain rounded-xl border border-slate-800"
          />
          <span className="text-[11px] text-slate-400 font-mono">
            Original-Foto aus Skript Christoph Schulze · Seite 7 (DIN 69901-2)
          </span>
        </div>
      )}
    </div>
  );
};
