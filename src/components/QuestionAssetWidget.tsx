import React, { useState } from 'react';
import { QuestionAsset } from '../types/quiz';
import { AssetViewerModal, GradationskurveGraphic, HistogramGraphic, TacChartGraphic, PpiBlueprintGraphic, TableGraphic } from './AssetViewerModal';
import { ZoomIn, TrendingUp, BarChart2, Layers, Grid, FileText, Maximize2 } from 'lucide-react';

interface Props {
  asset: QuestionAsset;
}

export const QuestionAssetWidget: React.FC<Props> = ({ asset }) => {
  const [showModal, setShowModal] = useState(false);

  const getIcon = () => {
    switch (asset.type) {
      case 'gradationskurve':
        return <TrendingUp className="w-4 h-4 text-indigo-400" />;
      case 'histogram':
        return <BarChart2 className="w-4 h-4 text-amber-400" />;
      case 'tac_chart':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'ppi_blueprint':
        return <Grid className="w-4 h-4 text-cyan-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="my-3 bg-slate-950 border-2 border-indigo-500/30 hover:border-indigo-500/70 rounded-2xl p-4 shadow-md transition-all cursor-pointer group space-y-3 relative overflow-hidden"
      >
        {/* Subtle glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 shrink-0">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                  Prüfungs-Asset
                </span>
                <span className="text-[9px] font-mono bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800">
                  {asset.type}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-indigo-200 transition-colors">
                {asset.title}
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HD-Großansicht</span>
          </button>
        </div>

        {/* Inline Visual Graphic Display */}
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 flex items-center justify-center min-h-[160px] max-h-[220px] overflow-hidden relative">
          <div className="w-full transform scale-90 sm:scale-95 transition-transform group-hover:scale-100 flex items-center justify-center">
            {asset.type === 'gradationskurve' && <GradationskurveGraphic />}
            {asset.type === 'histogram' && <HistogramGraphic />}
            {asset.type === 'tac_chart' && <TacChartGraphic />}
            {asset.type === 'ppi_blueprint' && <PpiBlueprintGraphic />}
            {asset.type === 'table' && asset.tableData && <TableGraphic tableData={asset.tableData} />}
            {asset.type === 'diagram' && !asset.imageUrl && (
              <div className="p-3 text-xs font-mono text-indigo-200 bg-slate-950 rounded-lg border border-slate-800 text-center w-full">
                <span className="font-bold text-amber-400 block mb-1">📐 IHK-Veranschaulichung:</span>
                {asset.description}
              </div>
            )}
            {(asset.type === 'image' || asset.imageUrl) && (
              <img
                src={asset.imageUrl}
                alt={asset.title}
                className="max-h-[200px] w-auto object-contain rounded-lg border border-slate-700/80 shadow-md"
              />
            )}
          </div>
        </div>

        {/* Bottom Subtitle / Info strip */}
        {asset.subtitle && (
          <div className="text-[11px] text-slate-300 font-medium flex items-center justify-between pt-1">
            <span className="line-clamp-1">{asset.subtitle}</span>
            <span className="text-indigo-400 font-bold shrink-0 text-[10px] uppercase flex items-center gap-1">
              <span>Klick zum Zoomen</span>
              <ZoomIn className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>

      {showModal && (
        <AssetViewerModal asset={asset} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
