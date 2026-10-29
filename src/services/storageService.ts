import { UserStats, Badge } from '../types/quiz';
import { DEFAULT_PET_STATE, calculatePetDecay } from '../data/petData';

const STORAGE_KEY = 'mediengestalter_adhd_trainer_stats_v2';
const SETTINGS_KEY = 'mediengestalter_adhd_trainer_settings_v2';

export interface UserSettings {
  bionicReading: boolean;
  soundEnabled: boolean;
  zenMode: boolean;
  darkMode: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  bionicReading: false,
  soundEnabled: true,
  zenMode: false,
  darkMode: false,
};

const DEFAULT_STATS: UserStats = {
  xp: 150, // Starting EXP bonus so learners can try feeding or styling their pet immediately!
  coins: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedModules: [],
  answeredQuestionsCount: 0,
  correctAnswersCount: 0,
  currentCombo: 0,
  maxCombo: 0,
  earnedBadges: ['welcome'],
  pet: DEFAULT_PET_STATE,
  examScores: [],
};

export const ALL_BADGES: Badge[] = [
  {
    id: 'welcome',
    title: 'Startschuss',
    description: 'Erste Lerneinheit betreten',
    icon: '🚀',
  },
  {
    id: 'streak_3',
    title: 'Fokus-Flamme',
    description: '3 Antworten in Folge fehlerfrei',
    icon: '🔥',
  },
  {
    id: 'pet_friend',
    title: 'Tierfreund',
    description: 'Dein virtuelles Haustier zum ersten Mal gestreichelt oder gefüttert',
    icon: '🐾',
  },
  {
    id: 'pet_stylist',
    title: 'Haustier-Stylist',
    description: 'Ein Accessoire im Shop gekauft und ausgerüstet',
    icon: '👑',
  },
  {
    id: 'ixd_master',
    title: 'IxD Meister',
    description: 'Kapitel 1 Interaktionsdesign komplettiert',
    icon: '🎯',
  },
  {
    id: 'wireframe_pro',
    title: 'Bauplan-Architekt',
    description: 'Kapitel 2 Wireframe komplett gemeistert',
    icon: '📐',
  },
  {
    id: 'prototype_tester',
    title: 'Prototyp-Tester',
    description: 'Kapitel 3 Prototyping erfolgreich abgeschlossen',
    icon: '📱',
  },
  {
    id: 'security_shield',
    title: 'Cyber-Wächter',
    description: 'Kapitel 4 Internetbetrug & IT-Sicherheit gemeistert',
    icon: '🛡️',
  },
  {
    id: 'a11y_champion',
    title: 'A11y Champion',
    description: 'Kapitel 5 Web Accessibility WCAG gemeistert',
    icon: '♿',
  },
  {
    id: 'agile_scrum',
    title: 'Sprint-Captain',
    description: 'Kapitel 6 Projektablauf & Scrum abgeschlossen',
    icon: '⚡',
  },
  {
    id: 'database_architect',
    title: 'Datenbank-Architekt',
    description: 'Kapitel 7 Relationale Datenbanken & SQL gemeistert',
    icon: '💾',
  },
  {
    id: 'exam_ready',
    title: 'Prüfungsbereit',
    description: 'Abschlussprüfungs-Simulator mit Note 1 oder 2 bestanden',
    icon: '🏆',
  },
];

export function calculateLevel(xp: number): { level: number; title: string; currentLevelXp: number; nextLevelXp: number } {
  const thresholds = [
    { level: 1, title: 'Design-Novize', xp: 0 },
    { level: 2, title: 'Konzept-Trainee', xp: 200 },
    { level: 3, title: 'UX-Junior', xp: 500 },
    { level: 4, title: 'IxD-Spezialist', xp: 1000 },
    { level: 5, title: 'Konzeptions-Profi', xp: 1800 },
    { level: 6, title: 'Prüfungs-Titan', xp: 3000 },
  ];

  let current = thresholds[0];
  let next = thresholds[1];

  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i].xp) {
      current = thresholds[i];
      next = thresholds[i + 1] || { level: current.level + 1, title: 'Design-Legende', xp: current.xp + 1500 };
    }
  }

  return {
    level: current.level,
    title: current.title,
    currentLevelXp: current.xp,
    nextLevelXp: next.xp,
  };
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    const mergedPet = { ...DEFAULT_PET_STATE, ...(parsed.pet || {}) };
    const decayedPet = calculatePetDecay(mergedPet);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      pet: decayedPet,
    };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
}

export function loadUserSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveUserSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export interface BackupPayload {
  app: string;
  version: number;
  exportDate: string;
  stats: UserStats;
  settings: UserSettings;
}

export function generateBackupJson(): string {
  const stats = loadUserStats();
  const settings = loadUserSettings();
  const payload: BackupPayload = {
    app: 'DesignKonzept.prep',
    version: 1,
    exportDate: new Date().toISOString(),
    stats,
    settings,
  };
  return JSON.stringify(payload, null, 2);
}

export function downloadBackupFile(): void {
  const json = generateBackupJson();
  const dateStr = new Date().toISOString().split('T')[0];
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `designkonzept-fortschritt-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function restoreBackupJson(jsonString: string): { success: boolean; stats?: UserStats; settings?: UserSettings; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Ungültiges JSON-Format.' };
    }

    // Support both direct BackupPayload and raw stats object
    let importedStats: UserStats;
    let importedSettings: UserSettings | undefined;

    if (parsed.stats && typeof parsed.stats === 'object') {
      importedStats = parsed.stats;
      if (parsed.settings && typeof parsed.settings === 'object') {
        importedSettings = parsed.settings;
      }
    } else if (parsed.xp !== undefined && Array.isArray(parsed.completedModules)) {
      importedStats = parsed as UserStats;
    } else {
      return { success: false, error: 'Keine gültigen Fortschrittsdaten im Backup gefunden.' };
    }

    const mergedStats: UserStats = {
      ...DEFAULT_STATS,
      ...importedStats,
      pet: { ...DEFAULT_PET_STATE, ...(importedStats.pet || {}) },
    };

    saveUserStats(mergedStats);

    if (importedSettings) {
      const mergedSettings = { ...DEFAULT_SETTINGS, ...importedSettings };
      saveUserSettings(mergedSettings);
      return { success: true, stats: mergedStats, settings: mergedSettings };
    }

    return { success: true, stats: mergedStats };
  } catch (err: any) {
    return { success: false, error: err.message || 'Dateien konnten nicht verarbeitet werden.' };
  }
}

