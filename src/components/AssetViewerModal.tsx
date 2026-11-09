import React from 'react';
import { QuestionAsset } from '../types/quiz';
import { X, ZoomIn, Info, CheckCircle2, BarChart2, TrendingUp, Grid, Layers, Sparkles } from 'lucide-react';

interface Props {
  asset: QuestionAsset;
  onClose: () => void;
}

export const AssetViewerModal: React.FC<Props> = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              {asset.type === 'gradationskurve' && <TrendingUp className="w-5 h-5" />}
              {asset.type === 'histogram' && <BarChart2 className="w-5 h-5" />}
              {asset.type === 'tac_chart' && <Layers className="w-5 h-5" />}
              {asset.type === 'ppi_blueprint' && <Grid className="w-5 h-5" />}
              {asset.type === 'table' && <Grid className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                IHK Original-Aufgaben-Asset
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                {asset.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          {asset.subtitle && (
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
              💡 {asset.subtitle}
            </p>
          )}

          {/* Asset Visual Graphic */}
          <div className="bg-slate-950 rounded-2xl p-2 sm:p-5 border border-slate-800 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden group">
            {/* Background grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

            {/* Type-Specific Renderings */}
            {asset.type === 'gradationskurve' && <GradationskurveGraphic />}
            {asset.type === 'histogram' && <HistogramGraphic />}
            {asset.type === 'tac_chart' && <TacChartGraphic />}
            {asset.type === 'ppi_blueprint' && <PpiBlueprintGraphic />}
            {asset.type === 'pm_cycle' && <PmCycleGraphic imageUrl={asset.imageUrl} />}
            {asset.type === 'table' && asset.tableData && <TableGraphic tableData={asset.tableData} />}
            {(asset.type === 'image' || asset.imageUrl) && asset.type !== 'pm_cycle' && (
              <img
                src={asset.imageUrl}
                alt={asset.title}
                className="max-h-[500px] w-auto max-w-full object-contain rounded-xl border border-slate-700/80 shadow-2xl relative z-10"
              />
            )}
          </div>

          {/* Description & Technical Points */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <Info className="w-4 h-4 text-indigo-500" />
              <span>Fachliche Analyse & IHK-Bewertung:</span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              {asset.description}
            </p>

            {asset.highlights && asset.highlights.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Wichtige Prüfungs-Indikatoren:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {asset.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

/* SVG Component: Gradationskurve (Tunnel-Aufgabe 11) */
export const GradationskurveGraphic: React.FC = () => (
  <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-center">
    <svg viewBox="0 0 300 240" className="w-full h-full text-slate-200">
      {/* Grid lines */}
      <line x1="40" y1="20" x2="40" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="40" y1="200" x2="280" y2="200" stroke="#334155" strokeWidth="1.5" />

      {/* Grid subdivisions */}
      {[0.25, 0.5, 0.75].map(ratio => (
        <React.Fragment key={ratio}>
          <line x1={40 + ratio * 240} y1="20" x2={40 + ratio * 240} y2="200" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="40" y1={200 - ratio * 180} x2="280" y2={200 - ratio * 180} stroke="#1e293b" strokeDasharray="3 3" />
        </React.Fragment>
      ))}

      {/* Baseline diagonal line (1:1 neutral) */}
      <line x1="40" y1="200" x2="280" y2="20" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Tunnel Correction Curve: Lichter fixiert, 3/4-Töne stark angehoben (aufgehellt) */}
      <path
        d="M 40 200 C 120 120, 180 40, 280 20"
        fill="none"
        stroke="#818cf8"
        strokeWidth="3.5"
      />

      {/* Key control points */}
      <circle cx="40" cy="200" r="5" fill="#38bdf8" />
      <circle cx="140" cy="120" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      <circle cx="280" cy="20" r="5" fill="#38bdf8" />

      {/* Labels */}
      <text x="40" y="220" fill="#94a3b8" fontSize="10" fontFamily="monospace">0% Lichter</text>
      <text x="140" y="220" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">3/4-Töne (+25%)</text>
      <text x="245" y="220" fill="#94a3b8" fontSize="10" fontFamily="monospace">100% Schatten</text>

      <text x="10" y="25" fill="#94a3b8" fontSize="9" fontFamily="monospace">Ausgabe</text>
      <text x="245" y="235" fill="#94a3b8" fontSize="9" fontFamily="monospace">Eingabe →</text>
    </svg>

    <div className="absolute top-2 right-2 bg-indigo-950/90 border border-indigo-700/60 px-3 py-1 rounded-lg text-[10px] font-mono text-indigo-200 font-bold">
      Gradationskurve: Tunnel-Schattenaufhellung
    </div>
  </div>
);

/* SVG Component: Histogramm (Datentiefe 8-Bit vs 16-Bit - Aufgabe 4) */
export const HistogramGraphic: React.FC = () => (
  <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-center">
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Background axes */}
      <line x1="30" y1="20" x2="30" y2="180" stroke="#334155" strokeWidth="1.5" />
      <line x1="30" y1="180" x2="300" y2="180" stroke="#334155" strokeWidth="1.5" />

      {/* Histogram bars simulating tonal distribution */}
      {[
        15, 25, 45, 60, 90, 120, 140, 110, 85, 95, 130, 150, 125, 80, 50, 30, 70, 110,
        140, 160, 130, 90, 60, 40, 20, 10
      ].map((val, idx) => {
        const x = 35 + idx * 10;
        const h = val * 0.9;
        const y = 180 - h;
        const isClipped = idx > 20;

        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width="8"
            height={h}
            fill={isClipped ? '#f43f5e' : '#6366f1'}
            rx="1"
          />
        );
      })}

      {/* Highlight clipping marker */}
      <line x1="240" y1="20" x2="240" y2="180" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="215" y="15" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">⚠️ Tonwertabriss</text>

      {/* Axis labels */}
      <text x="30" y="200" fill="#94a3b8" fontSize="10" fontFamily="monospace">0 (Schwarz)</text>
      <text x="150" y="200" fill="#94a3b8" fontSize="10" fontFamily="monospace">128 (Mitten)</text>
      <text x="250" y="200" fill="#94a3b8" fontSize="10" fontFamily="monospace">255 (Weiß)</text>
    </svg>

    <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-200 font-bold">
      8-Bit (256 Stufen) vs. 16-Bit (65.536 Stufen)
    </div>
  </div>
);

/* SVG Component: TAC Chart (Gesamtfarbauftrag 240% vs 300% - Aufgabe 7) */
export const TacChartGraphic: React.FC = () => (
  <div className="relative w-full max-w-md h-64 flex items-center justify-around p-4">
    {/* Bar 1: ISO Coated v2 (300%) */}
    <div className="flex flex-col items-center gap-2">
      <div className="text-[11px] font-mono font-bold text-slate-300">ISO Coated v2</div>
      <div className="w-16 h-44 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col justify-end p-1 space-y-0.5">
        <div className="h-[25%] bg-cyan-400 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">C 80%</div>
        <div className="h-[23%] bg-fuchsia-400 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">M 70%</div>
        <div className="h-[23%] bg-yellow-400 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">Y 70%</div>
        <div className="h-[27%] bg-slate-300 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">K 80%</div>
      </div>
      <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
        TAC: 300%
      </span>
    </div>

    {/* VS Divider */}
    <div className="text-sm font-mono font-black text-slate-500">VS</div>

    {/* Bar 2: Zeitungsdruck ISOnewspaper (240%) */}
    <div className="flex flex-col items-center gap-2">
      <div className="text-[11px] font-mono font-bold text-emerald-400">Zeitungsdruck (PSO SNP)</div>
      <div className="w-16 h-44 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col justify-end p-1 space-y-0.5">
        <div className="h-[20%] bg-cyan-400 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">C 60%</div>
        <div className="h-[18%] bg-fuchsia-400 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">M 50%</div>
        <div className="h-[18%] bg-yellow-400 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">Y 50%</div>
        <div className="h-[26%] bg-slate-300 rounded-sm flex items-center justify-center text-[9px] font-mono text-slate-950 font-bold">K 80%</div>
      </div>
      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
        TAC MAX: 240%
      </span>
    </div>
  </div>
);

/* SVG Component: PPI Blueprint (Bildberechnung - Aufgabe 9) */
export const PpiBlueprintGraphic: React.FC = () => (
  <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-center p-4">
    <div className="w-full bg-slate-900 border-2 border-indigo-500/50 rounded-xl p-4 font-mono text-xs text-indigo-200 space-y-3">
      <div className="flex items-center justify-between border-b border-indigo-900/60 pb-2">
        <span className="font-bold text-indigo-400 uppercase tracking-wider">IHK PPI-Berechnung</span>
        <span className="bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 text-[10px]">Aufgabe 9</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[11px]">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 block text-[9px] uppercase">Original-Pixel:</span>
          <span className="font-bold text-white text-sm">1800 x 1200 px</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 block text-[9px] uppercase">Geforderte Druckgröße:</span>
          <span className="font-bold text-amber-400 text-sm">18 cm x 12 cm</span>
        </div>
      </div>

      <div className="bg-indigo-950/80 p-3 rounded-lg border border-indigo-700/60 space-y-1">
        <div className="text-[10px] text-indigo-300 uppercase font-bold">Berechnungsweg:</div>
        <div className="text-xs font-bold text-white">
          1800 px / (18 cm / 2,54 cm/Zoll) = <span className="text-rose-400 underline">254 ppi</span>
        </div>
        <div className="text-[10px] text-rose-300 font-semibold">
          ❌ 254 ppi ist KLEINER als geforderte 300 ppi → Datei reicht NICHT!
        </div>
      </div>
    </div>
  </div>
);

/* Table Graphic Component */
export const TableGraphic: React.FC<{ tableData: { headers: string[]; rows: (string | number)[][] } }> = ({ tableData }) => (
  <div className="w-full overflow-x-auto p-2">
    <table className="w-full text-xs text-left font-mono">
      <thead className="bg-slate-900 text-indigo-300 border-b border-slate-800">
        <tr>
          {tableData.headers.map((h, idx) => (
            <th key={idx} className="py-2 px-3 font-bold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 text-slate-200">
        {tableData.rows.map((row, rIdx) => (
          <tr key={rIdx} className="hover:bg-slate-900/50">
            {row.map((cell, cIdx) => (
              <td key={cIdx} className="py-2 px-3">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

import { PmCycleGraphic } from './InteractiveMinigames/PmCycleGraphic';
export { PmCycleGraphic };
