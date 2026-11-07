import React, { useState } from 'react';
import { QuestionAsset } from '../types/quiz';
import { AssetViewerModal } from './AssetViewerModal';
import { ZoomIn, Eye, TrendingUp, BarChart2, Layers, Grid, FileText } from 'lucide-react';

interface Props {
  asset: QuestionAsset;
}

export const QuestionAssetWidget: React.FC<Props> = ({ asset }) => {
  const [showModal, setShowModal] = useState(false);

  const getIcon = () => {
    switch (asset.type) {
      case 'gradationskurve':
        return <TrendingUp className="w-4 h-4 text-indigo-500" />;
      case 'histogram':
        return <BarChart2 className="w-4 h-4 text-amber-500" />;
      case 'tac_chart':
        return <Layers className="w-4 h-4 text-emerald-500" />;
      case 'ppi_blueprint':
        return <Grid className="w-4 h-4 text-cyan-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <>
      <div className="my-3 bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-all hover:border-indigo-500/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 shrink-0">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                Visualisiertes Prüfungs-Asset
              </span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                {asset.type}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-indigo-200 transition-colors">
              {asset.title}
            </h4>
            {asset.subtitle && (
              <p className="text-[11px] text-slate-400 line-clamp-1 font-medium mt-0.5">
                {asset.subtitle}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Grafik öffnen & zoomen</span>
        </button>
      </div>

      {showModal && (
        <AssetViewerModal asset={asset} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
