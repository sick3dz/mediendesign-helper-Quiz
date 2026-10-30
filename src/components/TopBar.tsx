import React, { useState, useRef, useEffect } from 'react';
import {
  HardDrive,
  ChevronDown,
  BookOpen,
  Lightbulb,
  Sparkles,
  Award,
  Gamepad2,
} from 'lucide-react';

export type ActiveTab = 'chapters' | 'pet' | 'exam' | 'spickzettel' | 'minigames';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenFocusSprint: () => void;
  onOpenBackupModal: () => void;
  petSpeciesEmoji: string;
  isSprintActive?: boolean;
  sprintTimeFormatted?: string;
}

export const TopBar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  darkMode,
  onToggleDarkMode,
  onOpenFocusSprint,
  onOpenBackupModal,
  petSpeciesEmoji,
  isSprintActive,
  sprintTimeFormatted,
}) => {
  const [isLernenMenuOpen, setIsLernenMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLernenMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsLernenMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2 overflow-visible">
        {/* Zone 1: Central Lernen & Navigation Floating Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLernenMenuOpen(prev => !prev)}
            className={`whitespace-nowrap transition-all px-3 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs text-xs font-extrabold ${
              isLernenMenuOpen
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/30'
                : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/80'
            }`}
            aria-expanded={isLernenMenuOpen}
            title="Lernzentrum & Direktzugriffe öffnen"
          >
            <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span>Lernen & Direktzugriffe</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLernenMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Floating Dropdown Card */}
          {isLernenMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Lernzentrum & Schnell-Navigator
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Direktsprung zu allen Modulen, Leitfaden & Tools
                </p>
              </div>

              {/* Option 1: Lernen & Kapitel */}
              <button
                onClick={() => handleMenuSelect('chapters')}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                  activeTab === 'chapters'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>IHK-Lernpfad & Kapitel</span>
                    {activeTab === 'chapters' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Alle 8 IHK-Kapitel, Module & Interaktionsdesign
                  </p>
                </div>
              </button>

              {/* Option 2: Digital-Leitfaden */}
              <button
                onClick={() => handleMenuSelect('spickzettel')}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                  activeTab === 'spickzettel'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>💡 Digital-Leitfaden (IHK)</span>
                    {activeTab === 'spickzettel' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Neuer IHK Digital-Fokus & Prüfungs-Formeln ohne Print
                  </p>
                </div>
              </button>

              {/* Option 3: EXP-Shop & Haustier */}
              <button
                onClick={() => handleMenuSelect('pet')}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                  activeTab === 'pet'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>{petSpeciesEmoji} Haustier-Lounge & EXP-Shop</span>
                    {activeTab === 'pet' && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Snacks, Accessoires & Haustierpflege mit Lern-EXP
                  </p>
                </div>
              </button>

              {/* Option 4: IHK-Prüfungs-Simulator */}
              <button
                onClick={() => handleMenuSelect('exam')}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                  activeTab === 'exam'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>🏆 IHK-Abschlussprüfung</span>
                    {activeTab === 'exam' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Realistischer Prüfungssimulator mit Noten-Auswertung
                  </p>
                </div>
              </button>

              {/* Option 5: Quiz-Spiele */}
              <button
                onClick={() => handleMenuSelect('minigames')}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                  activeTab === 'minigames'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>🎮 Quiz-Spiele Hub</span>
                    {activeTab === 'minigames' && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Speed-Quiz, Memory-Flip & Boss-Raid Mini-Games
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Zone 2: Backup button + Dark Mode toggle + Primary Sprint Action */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenBackupModal}
            className="p-1.5 sm:px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Fortschritt extern sichern & wiederherstellen"
            aria-label="Backup manager"
          >
            <HardDrive className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden md:inline">Backup</span>
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
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-2xs flex items-center gap-1.5 cursor-pointer font-mono ${
              isSprintActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400/50'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            title="Fokus-Sprint Timer & Lofi Studio"
          >
            <span className={`w-2 h-2 rounded-full ${isSprintActive ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`}></span>
            <span>{isSprintActive && sprintTimeFormatted ? `⏱️ ${sprintTimeFormatted}` : 'Fokus'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
