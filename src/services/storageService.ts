import { UserStats, Badge, DailyMission } from '../types/quiz';
import { DEFAULT_PET_STATE, calculatePetDecay } from '../data/petData';

const STORAGE_KEY = 'mediengestalter_adhd_trainer_stats_v2';
const SETTINGS_KEY = 'mediengestalter_adhd_trainer_settings_v2';

export interface UserSettings {
  bionicReading: boolean;
  soundEnabled: boolean;
  zenMode: boolean;
  darkMode: boolean;
  breakReminderMinutes: number | null;
}

const DEFAULT_SETTINGS: UserSettings = {
  bionicReading: false,
  soundEnabled: true,
  zenMode: false,
  darkMode: false,
  breakReminderMinutes: null,
};

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateDailyMissions(): DailyMission[] {
  return [
    {
      id: 'mission-focus',
      title: 'Fokus-Sprint',
      description: 'Absolviere 1 fokussierte Lerneinheit',
      targetCount: 1,
      currentCount: 0,
      rewardXp: 40,
      isClaimed: false,
      category: 'focus',
      icon: '⏱️',
    },
    {
      id: 'mission-module',
      title: 'Modul-Wissen',
      description: 'Schließe 2 IHK-Lernmodule ab',
      targetCount: 2,
      currentCount: 0,
      rewardXp: 50,
      isClaimed: false,
      category: 'module',
      icon: '📖',
    },
    {
      id: 'mission-quiz',
      title: 'Prüfungs-Check',
      description: 'Beantworte 6 Quizfragen richtig',
      targetCount: 6,
      currentCount: 0,
      rewardXp: 60,
      isClaimed: false,
      category: 'quiz',
      icon: '🎯',
    },
  ];
}

const DEFAULT_STATS: UserStats = {
  xp: 0, // Starts at 0 spendable EXP balance (Guthaben)
  lifetimeXp: 0, // Starts at 0 lifetime EXP (dauerhafter Level-Fortschritt)
  coins: 0, // Starts at 0 coins
  level: 1,
  streakDays: 1,
  lastActiveDate: getTodayDateString(),
  completedModules: [],
  completedModulesLevel2: [],
  answeredQuestionsCount: 0,
  correctAnswersCount: 0,
  currentCombo: 0,
  maxCombo: 0,
  earnedBadges: ['welcome'],
  pet: DEFAULT_PET_STATE,
  unlockedCosmetics: ['theme-default', 'sound-standard', 'title-novice', 'frame-none'],
  equippedCosmetics: {
    theme: 'theme-default',
    soundpack: 'sound-standard',
    title: 'title-novice',
    frame: 'frame-none',
  },
  dailyMissions: generateDailyMissions(),
  dailyMissionsDate: getTodayDateString(),
  questionPerformance: {},
  topicMastery: {},
  examScores: [],
  freeCookieClaimDate: getTodayDateString(),
  freeCookieClaimCount: 0,
  freeCookieLockedUntil: 0,
};

export interface FreeCookieStatus {
  isLocked: boolean;
  lockReason: 'daily_limit' | 'cooldown' | null;
  remainingLockTimeMs: number;
  formattedRemainingTime: string;
  countToday: number;
  maxDaily: number;
  remainingToday: number;
}

export function getFreeCookieStatus(stats: UserStats): FreeCookieStatus {
  const today = getTodayDateString();
  const now = Date.now();

  const claimDate = stats.freeCookieClaimDate || '';
  const rawCount = typeof stats.freeCookieClaimCount === 'number' ? stats.freeCookieClaimCount : 0;
  const lockedUntil = typeof stats.freeCookieLockedUntil === 'number' ? stats.freeCookieLockedUntil : 0;

  // The daily claim count strictly resets ONLY when a new calendar day arrives
  const countToday = claimDate === today ? rawCount : 0;

  const remainingLockTimeMs = Math.max(0, lockedUntil - now);
  const isCooldownLocked = remainingLockTimeMs > 0;
  const isDailyLimitReached = countToday >= 5;
  const isLocked = isCooldownLocked || isDailyLimitReached;

  let lockReason: 'daily_limit' | 'cooldown' | null = null;
  if (isDailyLimitReached) {
    lockReason = 'daily_limit';
  } else if (isCooldownLocked) {
    lockReason = 'cooldown';
  }

  let formattedRemainingTime = '';
  if (remainingLockTimeMs > 0) {
    const totalMins = Math.ceil(remainingLockTimeMs / 60000);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hours > 0 && mins > 0) {
      formattedRemainingTime = `${hours} Std. ${mins} Min.`;
    } else if (hours > 0) {
      formattedRemainingTime = `${hours} Std.`;
    } else {
      formattedRemainingTime = `${mins} Min.`;
    }
  } else if (isDailyLimitReached) {
    formattedRemainingTime = 'Bis morgen';
  }

  return {
    isLocked,
    lockReason,
    remainingLockTimeMs,
    formattedRemainingTime,
    countToday,
    maxDaily: 5,
    remainingToday: Math.max(0, 5 - countToday),
  };
}

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
    icon: '⭐',
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
  {
    id: 'master_first',
    title: 'Meister-Aufsteiger',
    description: 'Erstes Modul auf Level 2 gemeistert (+50% EXP)',
    icon: '⭐',
  },
  {
    id: 'master_chapter',
    title: 'IHK-Fachmeister',
    description: 'Alle Module eines Kapitels auf Meisterstufe (Level 2) abgeschlossen',
    icon: '👑',
  },
];

export interface LevelTier {
  level: number;
  title: string;
  xp: number;
  icon: string;
  rewardTitle: string;
  rewardFood: { id: string; name: string; icon: string; count: number };
  rewardDescription: string;
}

export const LEVEL_LADDER: LevelTier[] = [
  {
    level: 1,
    title: 'Design-Novize',
    xp: 0,
    icon: '🌱',
    rewardTitle: 'Design-Novize',
    rewardFood: { id: 'food-apple', name: 'Knackiger Apfel', icon: '🍎', count: 2 },
    rewardDescription: 'Start-Ausrüstung & 2x Knackiger Apfel',
  },
  {
    level: 2,
    title: 'Konzept-Trainee',
    xp: 200,
    icon: '📐',
    rewardTitle: 'Konzept-Trainee',
    rewardFood: { id: 'food-pizza', name: 'Steinofen-Pizza', icon: '🍕', count: 2 },
    rewardDescription: 'Titel "Konzept-Trainee" + 2x Steinofen-Pizza',
  },
  {
    level: 3,
    title: 'UX-Junior',
    xp: 500,
    icon: '✨',
    rewardTitle: 'UX-Junior',
    rewardFood: { id: 'food-sushi', name: 'Lachs-Sushi Set', icon: '🍣', count: 3 },
    rewardDescription: 'Titel "UX-Junior" + 3x Lachs-Sushi',
  },
  {
    level: 4,
    title: 'IxD-Spezialist',
    xp: 1000,
    icon: '⭐',
    rewardTitle: 'IxD-Spezialist',
    rewardFood: { id: 'food-donut', name: 'Schoko-Streusel Donut', icon: '🍩', count: 4 },
    rewardDescription: 'Titel "IxD-Spezialist" + 4x Schoko-Donut',
  },
  {
    level: 5,
    title: 'Konzeptions-Profi',
    xp: 1800,
    icon: '🎯',
    rewardTitle: 'Konzeptions-Profi',
    rewardFood: { id: 'food-steak', name: 'Gourmet Steak', icon: '🥩', count: 5 },
    rewardDescription: 'Titel "Konzeptions-Profi" + 5x Gourmet Steak',
  },
  {
    level: 6,
    title: 'Prüfungs-Titan',
    xp: 3000,
    icon: '🏆',
    rewardTitle: 'Prüfungs-Titan',
    rewardFood: { id: 'food-cake', name: 'Glücks-Erdbeerkuchen', icon: '🍰', count: 5 },
    rewardDescription: 'Titel "Prüfungs-Titan" + 5x Glückskuchen',
  },
  {
    level: 7,
    title: 'Design-Legende',
    xp: 5000,
    icon: '👑',
    rewardTitle: 'Design-Legende',
    rewardFood: { id: 'food-cake', name: 'Glücks-Erdbeerkuchen', icon: '🍰', count: 10 },
    rewardDescription: 'Legendärer Meistertitel + 10x Gourmet-Festmahl',
  },
];

export interface LevelInfo {
  level: number;
  title: string;
  icon: string;
  currentLevelXp: number;
  nextLevelXp: number;
  xpNeededForNext: number;
  progressPercent: number;
  isMaxLevel: boolean;
  nextTier: LevelTier | null;
  currentTier: LevelTier;
}

export function calculateLevel(xp: number): LevelInfo {
  let currentTier = LEVEL_LADDER[0];
  let nextTier: LevelTier | null = LEVEL_LADDER[1];

  for (let i = 0; i < LEVEL_LADDER.length; i++) {
    if (xp >= LEVEL_LADDER[i].xp) {
      currentTier = LEVEL_LADDER[i];
      nextTier = LEVEL_LADDER[i + 1] || null;
    }
  }

  const isMaxLevel = nextTier === null;
  const currentLevelXp = currentTier.xp;
  const nextLevelXp = nextTier ? nextTier.xp : currentTier.xp;
  const xpNeededForNext = nextTier ? Math.max(0, nextTier.xp - xp) : 0;

  const span = nextLevelXp - currentLevelXp;
  const progressPercent = isMaxLevel
    ? 100
    : Math.min(100, Math.max(0, Math.round(((xp - currentLevelXp) / (span || 1)) * 100)));

  return {
    level: currentTier.level,
    title: currentTier.title,
    icon: currentTier.icon,
    currentLevelXp,
    nextLevelXp,
    xpNeededForNext,
    progressPercent,
    isMaxLevel,
    nextTier,
    currentTier,
  };
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    const rawPet = parsed.pet || {};
    const mergedPet = {
      ...DEFAULT_PET_STATE,
      ...rawPet,
      equipped: {
        ...DEFAULT_PET_STATE.equipped,
        ...(rawPet.equipped || {}),
      },
      inventory: {
        ...DEFAULT_PET_STATE.inventory,
        ...(rawPet.inventory || {}),
        gadgets: Array.isArray(rawPet.inventory?.gadgets) && rawPet.inventory.gadgets.length > 0
          ? rawPet.inventory.gadgets
          : ['bouncing_ball'],
      },
    };
    if (!mergedPet.equipped.gadget && mergedPet.inventory.gadgets?.includes('bouncing_ball')) {
      mergedPet.equipped.gadget = 'bouncing_ball';
    }
    const decayedPet = calculatePetDecay(mergedPet);
    const today = getTodayDateString();

    let dailyMissions = parsed.dailyMissions;
    let dailyMissionsDate = parsed.dailyMissionsDate;

    // Reset or initialize missions if new day
    if (!dailyMissions || dailyMissionsDate !== today) {
      dailyMissions = generateDailyMissions();
      dailyMissionsDate = today;
    }

    const parsedXp = typeof parsed.xp === 'number' ? parsed.xp : 0;
    const levelLadderFloor = LEVEL_LADDER.find(l => l.level === (parsed.level || 1))?.xp || 0;
    const lifetimeXp = typeof parsed.lifetimeXp === 'number'
      ? Math.max(parsed.lifetimeXp, parsedXp)
      : Math.max(parsedXp, levelLadderFloor);

    // Calculate question stats sanity check from questionPerformance
    const rawAnswered = typeof parsed.answeredQuestionsCount === 'number' ? parsed.answeredQuestionsCount : 0;
    const rawCorrect = typeof parsed.correctAnswersCount === 'number' ? parsed.correctAnswersCount : 0;
    const perfEntries = Object.values(parsed.questionPerformance || {});
    let perfCorrect = 0;
    let perfAnswered = 0;
    perfEntries.forEach((p: any) => {
      const c = typeof p.correctCount === 'number' ? p.correctCount : 0;
      const w = typeof p.wrongCount === 'number' ? p.wrongCount : 0;
      perfCorrect += c;
      perfAnswered += (c + w);
    });

    const sanitizedCorrect = Math.max(rawCorrect, perfCorrect);
    const sanitizedAnswered = Math.max(rawAnswered, perfAnswered, sanitizedCorrect);

    return {
      ...DEFAULT_STATS,
      ...parsed,
      xp: parsedXp,
      lifetimeXp,
      pet: decayedPet,
      answeredQuestionsCount: sanitizedAnswered,
      correctAnswersCount: sanitizedCorrect,
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
      completedModulesLevel2: Array.isArray(parsed.completedModulesLevel2) ? parsed.completedModulesLevel2 : [],
      dailyMissions,
      dailyMissionsDate,
      questionPerformance: parsed.questionPerformance || {},
      topicMastery: parsed.topicMastery || {},
      unlockedCosmetics: Array.isArray(parsed.unlockedCosmetics) && parsed.unlockedCosmetics.length > 0
        ? parsed.unlockedCosmetics
        : DEFAULT_STATS.unlockedCosmetics,
      equippedCosmetics: {
        ...DEFAULT_STATS.equippedCosmetics,
        ...(parsed.equippedCosmetics || {}),
      },
      freeCookieClaimDate: parsed.freeCookieClaimDate || getTodayDateString(),
      freeCookieClaimCount: typeof parsed.freeCookieClaimCount === 'number' ? parsed.freeCookieClaimCount : 0,
      freeCookieLockedUntil: typeof parsed.freeCookieLockedUntil === 'number' ? parsed.freeCookieLockedUntil : 0,
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

export function resetUserStatsToDefault(): UserStats {
  const freshStats: UserStats = {
    ...DEFAULT_STATS,
    xp: 0,
    lifetimeXp: 0,
    coins: 0,
    level: 1,
    pet: { ...DEFAULT_PET_STATE },
    dailyMissions: generateDailyMissions(),
    dailyMissionsDate: getTodayDateString(),
  };
  saveUserStats(freshStats);
  return freshStats;
}

