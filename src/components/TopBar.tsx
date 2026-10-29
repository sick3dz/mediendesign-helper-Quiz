import React from 'react';
import { HardDrive } from 'lucide-react';

export type ActiveTab = 'chapters' | 'pet' | 'exam' | 'spickzettel' | 'minigames';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenFocusSprint: () => void;
  onOpenBackupModal: () => void;
  petSpeciesEmoji: string;
}

export const TopBar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  darkMode,
  onToggleDarkMode,
  onOpenFocusSprint,
  onOpenBackupModal,
  petSpeciesEmoji,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('chapters')}
          className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
        >
          DesignKonzept<span className="text-indigo-600 dark:text-indigo-400">.prep</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-400 overflow-x-auto">
          <button
            onClick={() => setActiveTab('chapters')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'chapters'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Lernen
          </button>

          <button
            onClick={() => setActiveTab('pet')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pet'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{petSpeciesEmoji}</span>
            <span>Haustier</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'exam'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            IHK-Prüfung
          </button>

          <button
            onClick={() => setActiveTab('spickzettel')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'spickzettel'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Merksätze
          </button>

          <button
            onClick={() => setActiveTab('minigames')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeTab === 'minigames'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Challenges
          </button>
        </nav>

        {/* Zone 3: Backup button + Dark Mode toggle + Primary Sprint Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenBackupModal}
            className="p-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Fortschritt extern sichern & wiederherstellen"
            aria-label="Backup manager"
          >
            <HardDrive className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Backup</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={darkMode ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
            aria-label="Theme toggle"
          >
            {darkMode ? (
              <span className="text-xs">☀️</span>
            ) : (
              <span className="text-xs">🌙</span>
            )}
          </button>

          <button
            onClick={onOpenFocusSprint}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Fokus-Sprint
          </button>
        </div>
      </div>
    </header>
  );
};
