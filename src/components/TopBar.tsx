import React, { useState, useRef, useEffect } from 'react';
import {
  HardDrive,
  ChevronDown,
  BookOpen,
  Lightbulb,
  Sparkles,
  Award,
  Gamepad2,
  Code,
  BarChart3,
  Star,
  Trophy,
} from 'lucide-react';

export type ActiveTab = 'chapters' | 'spickzettel' | 'stats' | 'exam' | 'sandbox' | 'minigames' | 'rank' | 'achievements' | 'pet' | 'shop';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentViewTitle?: string;
  currentViewIcon?: React.ReactNode;
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
  currentViewTitle,
  currentViewIcon,
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

  // Determine current active display label and icon
  const getTabInfo = (tab: ActiveTab) => {
    switch (tab) {
      case 'rank':
        return {
          title: 'Aktueller Rang',
          icon: <Trophy className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />,
          color: 'text-amber-600 dark:text-amber-400',
        };
      case 'achievements':
        return {
          title: 'Errungenschaften & Meilensteine',
          icon: <Award className="w-4 h-4 text-amber-500 shrink-0" />,
          color: 'text-amber-600 dark:text-amber-400',
        };
      case 'pet':
        return {
          title: 'Haustier Lounge',
          icon: <span className="text-sm select-none shrink-0">{petSpeciesEmoji || '🏠'}</span>,
          color: 'text-purple-600 dark:text-purple-400',
        };
      case 'shop':
        return {
          title: 'EXP Shop',
          icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />,
          color: 'text-amber-600 dark:text-amber-400',
        };
      case 'chapters':
        return {
          title: 'IHK-Lernpfad & Kapitel',
          icon: <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />,
          color: 'text-indigo-600 dark:text-indigo-400',
        };
      case 'spickzettel':
        return {
          title: 'Digital-Leitfaden (IHK)',
          icon: <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />,
          color: 'text-amber-600 dark:text-amber-400',
        };
      case 'stats':
        return {
          title: 'Lern-Statistiken & Mastery',
          icon: <BarChart3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />,
          color: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'exam':
        return {
          title: 'IHK-Abschlussprüfung',
          icon: <Award className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />,
          color: 'text-indigo-600 dark:text-indigo-400',
        };
      case 'sandbox':
        return {
          title: 'Daten-Struktur Sandbox',
          icon: <Code className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />,
          color: 'text-sky-600 dark:text-sky-400',
        };
      case 'minigames':
        return {
          title: 'Quiz-Spiele Hub',
          icon: <Gamepad2 className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />,
          color: 'text-rose-600 dark:text-rose-400',
        };
      default:
        return {
          title: 'Lernzentrum',
          icon: <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />,
          color: 'text-indigo-600 dark:text-indigo-400',
        };
    }
  };

  const defaultInfo = getTabInfo(activeTab);
  const currentTitle = currentViewTitle || defaultInfo.title;
  const currentIcon = currentViewIcon || defaultInfo.icon;

  const menuOptions: {
    tab: ActiveTab;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
    badge?: string;
  }[] = [
    {
      tab: 'chapters',
      title: 'IHK-Lernpfad & Kapitel',
      subtitle: 'Alle 8 IHK-Kapitel, Module & Interaktionsdesign',
      icon: <BookOpen className="w-4 h-4 text-indigo-500" />,
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300',
    },
    {
      tab: 'spickzettel',
      title: 'Digital-Leitfaden (IHK)',
      subtitle: 'Neuer IHK Digital-Fokus & Prüfungs-Formeln ohne Print',
      icon: <Lightbulb className="w-4 h-4 text-amber-500" />,
      iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    },
    {
      tab: 'stats',
      title: 'Lern-Statistiken & Mastery',
      subtitle: 'Themen-Fortschritt, Trefferquote & Prüfungsreife',
      icon: <BarChart3 className="w-4 h-4 text-emerald-500" />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      badge: 'Mastery',
    },
    {
      tab: 'exam',
      title: 'IHK-Abschlussprüfung',
      subtitle: 'Realistischer Prüfungssimulator mit Noten-Auswertung',
      icon: <Award className="w-4 h-4 text-indigo-500" />,
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300',
    },
    {
      tab: 'sandbox',
      title: 'Daten-Struktur Sandbox',
      subtitle: 'JSON, XML & Markdown interaktiv verstehen',
      icon: <Code className="w-4 h-4 text-sky-500" />,
      iconBg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400',
    },
    {
      tab: 'minigames',
      title: 'Quiz-Spiele Hub',
      subtitle: 'Speed-Quiz, Memory-Flip & Boss-Raid Mini-Games',
      icon: <Gamepad2 className="w-4 h-4 text-rose-500" />,
      iconBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
    },
    {
      tab: 'rank',
      title: 'Aktueller Rang',
      subtitle: 'Level-Fortschritt, Stufenleiter & Belohnungspfad',
      icon: <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />,
      iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      badge: 'Stufen',
    },
    {
      tab: 'achievements',
      title: 'Errungenschaften & Meilensteine',
      subtitle: 'Alle Erfolge, Badges & Meilenstein-Belohnungen',
      icon: <Award className="w-4 h-4 text-amber-500" />,
      iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      badge: 'Badges',
    },
    {
      tab: 'pet',
      title: 'Haustier Lounge',
      subtitle: 'Haustier pflegen, füttern & Zimmer/Schrank',
      icon: <span className="text-base select-none">{petSpeciesEmoji || '🏠'}</span>,
      iconBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
    },
    {
      tab: 'shop',
      title: 'EXP Shop',
      subtitle: 'Gegenstände, Gadgets & Kosmetika für EXP kaufen',
      icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
      iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      badge: 'EXP',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2 overflow-visible">
        {/* Zone 1: Central Lernen & Navigation Menu with current view title */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLernenMenuOpen(prev => !prev)}
            className={`whitespace-nowrap transition-all px-3 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs text-xs font-extrabold max-w-[210px] sm:max-w-xs md:max-w-none ${
              isLernenMenuOpen
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/30'
                : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/80'
            }`}
            aria-expanded={isLernenMenuOpen}
            title={`Aktueller Bereich: "${currentTitle}" – Klicken zum Wechseln`}
          >
            <span className="shrink-0 flex items-center justify-center">{currentIcon}</span>
            <span className="truncate">{currentTitle}</span>
            <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isLernenMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Floating Dropdown Card */}
          {isLernenMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Bereich wechseln
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Wähle einen Menüpunkt aus:
                </p>
              </div>

              <div className="max-h-[75vh] overflow-y-auto space-y-1">
                {menuOptions.map(opt => {
                  const isActive = activeTab === opt.tab && !currentViewTitle;

                  return (
                    <React.Fragment key={opt.tab}>
                      {opt.tab === 'minigames' && (
                        <div className="pt-2 pb-1 px-1">
                          <div className="border-t border-slate-200 dark:border-slate-800 mb-1.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                            Gamification & Belohnungen
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => handleMenuSelect(opt.tab)}
                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${opt.iconBg}`}>
                        {opt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold flex items-center justify-between gap-1">
                          <span className="truncate">{opt.title}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {opt.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                                {opt.badge}
                              </span>
                            )}
                            {isActive && <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                          {opt.subtitle}
                        </p>
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
              </div>
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
