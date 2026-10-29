import React, { useState } from 'react';
import { soundEffects } from '../services/audioService';
import { Database, Filter, ArrowUpDown, Link2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectRow {
  projektId: number;
  titel: string;
  kundeId: number;
  kundeName?: string;
  status: 'Entwurf' | 'Freigegeben' | 'In Prüfung';
}

const RAW_PROJECTS: ProjectRow[] = [
  { projektId: 101, titel: 'Sommerkampagne', kundeId: 501, status: 'Entwurf' },
  { projektId: 102, titel: 'Produktkatalog', kundeId: 502, status: 'Freigegeben' },
  { projektId: 103, titel: 'Website-Relaunch', kundeId: 501, status: 'Freigegeben' },
  { projektId: 104, titel: 'Brand Identity', kundeId: 503, status: 'In Prüfung' },
  { projektId: 105, titel: 'App Klickdummy', kundeId: 502, status: 'Entwurf' },
];

const CUSTOMERS: Record<number, string> = {
  501: 'Nordlicht GmbH',
  502: 'Grün & Co.',
  503: 'Studio Apex',
};

export const SqlBuilderWidget: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<'all' | 'custom' | 'join'>('custom');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Freigegeben' | 'Entwurf'>('all');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [includeJoin, setIncludeJoin] = useState<boolean>(false);

  // Compute SQL string
  let selectClause = 'SELECT Projekt_ID, Titel, Status';
  if (selectedColumns === 'all') {
    selectClause = 'SELECT *';
  } else if (includeJoin) {
    selectClause = 'SELECT Projekte.Titel, Projekte.Status, Kunden.Name AS Kunde';
  }

  let fromClause = 'FROM Projekte';
  if (includeJoin) {
    fromClause += '\nJOIN Kunden ON Projekte.Kunden_ID = Kunden.Kunden_ID';
  }

  const whereClause =
    statusFilter !== 'all' ? `\nWHERE Status = '${statusFilter}'` : '';

  const orderClause =
    sortOrder === 'asc'
      ? '\nORDER BY Titel ASC'
      : sortOrder === 'desc'
      ? '\nORDER BY Titel DESC'
      : '';

  const sqlQuery = `${selectClause}\n${fromClause}${whereClause}${orderClause};`;

  // Compute resulting rows
  let rows: ProjectRow[] = RAW_PROJECTS.map(p => ({
    ...p,
    kundeName: CUSTOMERS[p.kundeId],
  }));

  if (statusFilter !== 'all') {
    rows = rows.filter(r => r.status === statusFilter);
  }

  if (sortOrder === 'asc') {
    rows = [...rows].sort((a, b) => a.titel.localeCompare(b.titel));
  } else if (sortOrder === 'desc') {
    rows = [...rows].sort((a, b) => b.titel.localeCompare(a.titel));
  }

  const handleToggleJoin = () => {
    soundEffects.playClick();
    setIncludeJoin(!includeJoin);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-sm space-y-5 my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Interaktiver SQL-Baukasten</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                Live-Simulation
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Klicke die SQL-Klauseln an und beobachte, wie sich Abfrage und Tabelle sofort anpassen.
            </p>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Filter (WHERE) */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filter (WHERE)</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundEffects.playClick();
                setStatusFilter('all');
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setStatusFilter('Freigegeben');
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'Freigegeben'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Freigegeben
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setStatusFilter('Entwurf');
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'Entwurf'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Entwurf
            </button>
          </div>
        </div>

        {/* 2. Sortierung (ORDER BY) */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sortierung (ORDER BY)</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundEffects.playClick();
                setSortOrder('none');
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                sortOrder === 'none'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setSortOrder('asc');
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                sortOrder === 'asc'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              ASC (A–Z)
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setSortOrder('desc');
              }}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                sortOrder === 'desc'
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              DESC (Z–A)
            </button>
          </div>
        </div>

        {/* 3. Tabellen-Verknüpfung (JOIN) */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Relation (JOIN Kunden)</span>
            </span>
          </div>
          <button
            onClick={handleToggleJoin}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              includeJoin
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{includeJoin ? 'JOIN aktiv (Kunden verknüpft)' : 'Kunden-Tabelle einbinden'}</span>
          </button>
        </div>
      </div>

      {/* Generated SQL Code Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
        <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1.5 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>Generierte SQL-Abfrage</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {rows.length} {rows.length === 1 ? 'Zeile gefunden' : 'Zeilen gefunden'}
          </span>
        </div>
        <pre className="text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
          {sqlQuery}
        </pre>
      </div>

      {/* Rendered Result Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-800 text-slate-400 text-[11px] font-mono">
              <th className="py-2.5 px-4 font-semibold">Projekt_ID</th>
              <th className="py-2.5 px-4 font-semibold">Titel</th>
              {includeJoin ? (
                <th className="py-2.5 px-4 font-semibold text-indigo-300">Kunden.Name (JOIN)</th>
              ) : (
                <th className="py-2.5 px-4 font-semibold">Kunden_ID (FK)</th>
              )}
              <th className="py-2.5 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {rows.map(row => (
              <tr key={row.projektId} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-2.5 px-4 font-mono text-slate-400">{row.projektId}</td>
                <td className="py-2.5 px-4 font-medium text-white">{row.titel}</td>
                {includeJoin ? (
                  <td className="py-2.5 px-4 text-indigo-300 font-semibold">{row.kundeName}</td>
                ) : (
                  <td className="py-2.5 px-4 font-mono text-slate-400">{row.kundeId}</td>
                )}
                <td className="py-2.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      row.status === 'Freigegeben'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                        : row.status === 'Entwurf'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Explanatory note */}
      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800/60">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          {statusFilter !== 'all'
            ? `Filter aktiv: Nur Projekte mit Status '${statusFilter}' werden zurückgegeben.`
            : includeJoin
            ? 'JOIN aktiv: Die Namen der Kunden werden live über Kunden_ID verknüpft.'
            : 'Tipp: Nutze ORDER BY, um Listen für CMS-Dashboards alphabetisch zu sortieren.'}
        </span>
      </div>
    </div>
  );
};
