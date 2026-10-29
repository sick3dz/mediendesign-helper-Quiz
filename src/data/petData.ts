import { PetSpecies, PetAccessory, PetFood, PetState } from '../types/quiz';

export interface PetSpeciesInfo {
  species: PetSpecies;
  defaultName: string;
  title: string;
  description: string;
  favoriteFood: string;
}

export const PET_SPECIES: Record<PetSpecies, PetSpeciesInfo> = {
  dog: {
    species: 'dog',
    defaultName: 'Bello',
    title: 'Design-Beagle',
    description: 'Immer treu, neugierig auf Wireframes und liebt es, Fehler im Layout aufzuspüren.',
    favoriteFood: 'Leckerer Knochen',
  },
  cat: {
    species: 'cat',
    defaultName: 'Mimi',
    title: 'UX-Mieze',
    description: 'Prüft mit feinsten Schnurrhaaren, ob Interaktionen geschmeidig und benutzerfreundlich sind.',
    favoriteFood: 'Knuspriger Fisch',
  },
  penguin: {
    species: 'penguin',
    defaultName: 'Pippo',
    title: 'Code-Pinguin',
    description: 'Bleibt cool wie Eis – meistert WCAG-Barrierefreiheit und Tastatursteuerung im Schlaf.',
    favoriteFood: 'Eis-Happen',
  },
  axolotl: {
    species: 'axolotl',
    defaultName: 'Lotti',
    title: 'IxD-Axolotl',
    description: 'Regeneriert verlorene Energie im Nu und schwimmt fröhlich durch jede Designkonzeption.',
    favoriteFood: 'Wasser-Snack',
  },
};

export const PET_FOODS: PetFood[] = [
  {
    id: 'cookie',
    name: 'Glücks-Keks',
    price: 30,
    xpPrice: 25,
    icon: '🍪',
    nutrition: 20,
    happiness: 15,
    description: 'Ein kleiner süßer Snack für zwischendurch.',
  },
  {
    id: 'snack_meal',
    name: 'Gourmet-Mahlzeit',
    price: 60,
    xpPrice: 50,
    icon: '🍖',
    nutrition: 45,
    happiness: 30,
    description: 'Sättigt anhaltend und sorgt für glänzende Augen.',
  },
  {
    id: 'donut',
    name: 'Regenbogen-Donut',
    price: 90,
    xpPrice: 75,
    icon: '🍩',
    nutrition: 40,
    happiness: 50,
    description: 'Pures Dopamin! Bringt jedes Haustier zum Jubeln.',
  },
  {
    id: 'boba',
    name: 'Fokus Bubble-Tea',
    price: 120,
    xpPrice: 95,
    icon: '🧋',
    nutrition: 30,
    happiness: 65,
    description: 'Beruhigender Milchtee gegen Lernstress.',
  },
  {
    id: 'brain_elixir',
    name: 'ADHS Fokus-Elixier',
    price: 150,
    xpPrice: 120,
    icon: '🧪',
    nutrition: 60,
    happiness: 80,
    description: 'Verleiht sofortige Klarheit, stillt Hunger und zaubert ein breites Lächeln.',
  },
  {
    id: 'golden_apple',
    name: 'Goldener Prüfungs-Apfel',
    price: 200,
    xpPrice: 160,
    icon: '🍎',
    nutrition: 100,
    happiness: 100,
    description: 'Füllt Hunger und Laune komplett auf 100%!',
  },
];

export const PET_ACCESSORIES: PetAccessory[] = [
  // Head
  {
    id: 'party_hat',
    name: 'Party-Hut',
    category: 'head',
    price: 100,
    xpPrice: 80,
    icon: '🎉',
    description: 'Feiert jede fehlerfreie Quiz-Frage!',
  },
  {
    id: 'beanie',
    name: 'Kuschelige Beanie',
    category: 'head',
    price: 150,
    xpPrice: 110,
    icon: '🧶',
    description: 'Entspannter Designer-Look für kühle Tage.',
  },
  {
    id: 'grad_cap',
    name: 'IHK-Absolventen-Hut',
    category: 'head',
    price: 220,
    xpPrice: 150,
    icon: '🎓',
    description: 'Klassischer Doktorhut für erfolgreiche Prüflinge.',
  },
  {
    id: 'wizard_hat',
    name: 'Zauberer-Hut',
    category: 'head',
    price: 250,
    xpPrice: 175,
    icon: '🧙',
    description: 'Verleiht magisches Wissen für die IHK-Prüfung.',
  },
  {
    id: 'crown',
    name: 'Goldene Krone',
    category: 'head',
    price: 400,
    xpPrice: 280,
    icon: '👑',
    description: 'Für wahre Meister der Designkonzeption.',
  },

  // Face
  {
    id: 'sunglasses',
    name: 'Coole Sonnenbrille',
    category: 'face',
    price: 120,
    xpPrice: 90,
    icon: '🕶️',
    description: 'Schützt vor zu hellem Bildschirmlicht.',
  },
  {
    id: 'nerd_glasses',
    name: 'Hornbrille',
    category: 'face',
    price: 140,
    xpPrice: 100,
    icon: '👓',
    description: 'Schärft den Blick für winzige Wireframe-Fehler.',
  },
  {
    id: 'pixel_shades',
    name: 'Pixel-Shades',
    category: 'face',
    price: 280,
    xpPrice: 190,
    icon: '👾',
    description: 'Deal with it: Pure digitale Coolness.',
  },

  // Neck
  {
    id: 'bowtie',
    name: 'Rote Fliege',
    category: 'neck',
    price: 90,
    xpPrice: 70,
    icon: '🎀',
    description: 'Schick herausgeputzt für die Abschlussprüfung.',
  },
  {
    id: 'scarf',
    name: 'Wärmender Schal',
    category: 'neck',
    price: 130,
    xpPrice: 95,
    icon: '🧣',
    description: 'Hält warm während langer Lern-Sessions.',
  },
  {
    id: 'star_collar',
    name: 'Sternen-Halsband',
    category: 'neck',
    price: 200,
    xpPrice: 140,
    icon: '⭐',
    description: 'Funkelt bei jedem richtigen Prüfungspunkt.',
  },
  {
    id: 'gold_chain',
    name: 'Goldene Medaille',
    category: 'neck',
    price: 320,
    xpPrice: 220,
    icon: '🥇',
    description: 'Glänzt im Rampenlicht jedes Usability-Tests.',
  },
  {
    id: 'json_cyber_badge',
    name: 'JSON API Cyber-Badge',
    category: 'neck',
    price: 180,
    xpPrice: 120,
    icon: '⚡',
    description: 'Signalisiert blitzschnellen REST-API-Datenaustausch zwischen Frontend und Server.',
  },
];

export interface ChapterSurprise {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  unlockRequirement: string;
  accessory: PetAccessory;
}

export const CHAPTER_SURPRISES: ChapterSurprise[] = [
  {
    chapterId: 'ixd',
    chapterNumber: 1,
    chapterTitle: 'Interaktionsdesign',
    unlockRequirement: 'Schließe alle 6 Module in Kapitel 1 ab',
    accessory: {
      id: 'special_ixd_headset',
      name: 'Holo-Cyber-Headset',
      category: 'head',
      price: 0,
      xpPrice: 0,
      icon: '🎧',
      description: 'Exklusiv Kapitel 1: Antizipiert perfekte User Journeys und intuitive Klickpfade!',
    } as PetAccessory,
  },
  {
    chapterId: 'wireframe',
    chapterNumber: 2,
    chapterTitle: 'Informationsarchitektur & Wireframes',
    unlockRequirement: 'Schließe alle 4 Module in Kapitel 2 ab',
    accessory: {
      id: 'special_golden_pencil',
      name: 'Goldener Architekten-Stift',
      category: 'neck',
      price: 0,
      xpPrice: 0,
      icon: '✏️',
      description: 'Exklusiv Kapitel 2: Meisterwerkzeug für gestochen scharfe Grid-Systeme & Wireframes!',
    } as PetAccessory,
  },
  {
    chapterId: 'prototype',
    chapterNumber: 3,
    chapterTitle: 'Prototyping & Usability-Tests',
    unlockRequirement: 'Schließe alle 3 Module in Kapitel 3 ab',
    accessory: {
      id: 'special_proto_tablet',
      name: 'Neon-Klickdummy-Pad',
      category: 'neck',
      price: 0,
      xpPrice: 0,
      icon: '📱',
      description: 'Exklusiv Kapitel 3: Interaktives Pad für erfolgreiche Thinking-Aloud Usability-Tests!',
    } as PetAccessory,
  },
  {
    chapterId: 'security',
    chapterNumber: 4,
    chapterTitle: 'Datenschutz & IT-Sicherheit',
    unlockRequirement: 'Schließe alle 3 Module in Kapitel 4 ab',
    accessory: {
      id: 'special_cyber_shield',
      name: 'Smaragd-Sicherheits-Schild',
      category: 'neck',
      price: 0,
      xpPrice: 0,
      icon: '🛡️',
      description: 'Exklusiv Kapitel 4: Hält Phishing, Schadcode und DSGVO-Fallen zuverlässig ab!',
    } as PetAccessory,
  },
  {
    chapterId: 'a11y',
    chapterNumber: 5,
    chapterTitle: 'Web Accessibility & WCAG',
    unlockRequirement: 'Schließe alle 3 Module in Kapitel 5 ab',
    accessory: {
      id: 'special_rainbow_cape',
      name: 'Regenbogen-A11y-Cape',
      category: 'neck',
      price: 0,
      xpPrice: 0,
      icon: '🌈',
      description: 'Exklusiv Kapitel 5: Auszeichnung für 100% Barrierefreiheit und universelle Inklusion!',
    } as PetAccessory,
  },
  {
    chapterId: 'project',
    chapterNumber: 6,
    chapterTitle: 'Projektablauf & Scrum',
    unlockRequirement: 'Schließe alle 3 Module in Kapitel 6 ab',
    accessory: {
      id: 'special_scrum_champion_crown',
      name: 'Scrum-Meister-Krone & Pokal',
      category: 'head',
      price: 0,
      xpPrice: 0,
      icon: '🏆',
      description: 'Exklusiv Kapitel 6: Für den vollendeten Sprint-Helden der IHK-Abschlussprüfung!',
    } as PetAccessory,
  },
  {
    chapterId: 'database',
    chapterNumber: 7,
    chapterTitle: 'Datenbanken, Datenaustausch & JSON',
    unlockRequirement: 'Schließe alle 4 Module in Kapitel 7 ab',
    accessory: {
      id: 'special_sql_cube',
      name: 'Holo-SQL & JSON Datenwürfel',
      category: 'neck',
      price: 0,
      xpPrice: 0,
      icon: '🧊',
      description: 'Exklusiv Kapitel 7: Schwebender Kristall mit leuchtenden SQL-Abfragen und dynamischen JSON-Schlüssel-Wert-Daten!',
    } as PetAccessory,
  },
  {
    chapterId: 'crossmedia',
    chapterNumber: 8,
    chapterTitle: 'Medienneutrale Daten & Crossmedia',
    unlockRequirement: 'Schließe alle 4 Module in Kapitel 8 ab',
    accessory: {
      id: 'special_crossmedia_prism',
      name: 'Holo-Crossmedia-Spektralprisma',
      category: 'neck',
      price: 0,
      xpPrice: 0,
      icon: '💎',
      description: 'Exklusiv Kapitel 8: Faszinierendes Kristallprisma, das einen Single-Source-Lichtstrahl perfekt in Print, Web, App und Newsletter bricht!',
    } as PetAccessory,
  },
];

export const ALL_SPECIAL_ACCESSORIES: PetAccessory[] = CHAPTER_SURPRISES.map(cs => cs.accessory);

export const ALL_AVAILABLE_ACCESSORIES: PetAccessory[] = [
  ...PET_ACCESSORIES,
  ...ALL_SPECIAL_ACCESSORIES,
];

export function findAccessoryById(id: string): PetAccessory | undefined {
  return ALL_AVAILABLE_ACCESSORIES.find(a => a.id === id);
}

export const DEFAULT_PET_STATE: PetState = {
  hasAdopted: false, // User selects first!
  species: 'dog',
  name: 'Bello',
  hunger: 80,
  happiness: 80,
  energy: 90,
  isSleeping: false,
  lastCareTimestamp: Date.now(),
  equipped: {},
  inventory: {
    food: {
      cookie: 3, // starts with 3 free welcome treats
      snack_meal: 1,
    },
    accessories: [],
  },
  timesFed: 0,
  timesPetted: 0,
  timesNapped: 0,
  timesPlayed: 0,
};

export function calculatePetDecay(pet: PetState): PetState {
  if (!pet) return DEFAULT_PET_STATE;

  const now = Date.now();
  const lastTime = pet.lastCareTimestamp || now;
  const elapsedMs = Math.max(0, now - lastTime);
  const elapsedHours = elapsedMs / (1000 * 60 * 60);

  // If less than ~15 seconds, skip calculation
  if (elapsedHours < 0.004) {
    return {
      ...pet,
      energy: pet.energy ?? 90,
      lastCareTimestamp: pet.lastCareTimestamp || now,
    };
  }

  let currentHunger = pet.hunger ?? 80;
  let currentEnergy = pet.energy ?? 90;
  let currentHappiness = pet.happiness ?? 80;

  if (pet.isSleeping) {
    // Sleeping restores energy (+30 points per hour) and decays hunger slowly (-3 points per hour)
    currentEnergy = Math.min(100, currentEnergy + elapsedHours * 30);
    currentHunger = Math.max(0, currentHunger - elapsedHours * 3);

    // Auto wake up when 100% rested
    const isSleeping = currentEnergy < 100;

    return {
      ...pet,
      hunger: Math.round(currentHunger),
      energy: Math.round(currentEnergy),
      happiness: Math.round(currentHappiness),
      isSleeping,
      lastCareTimestamp: now,
    };
  }

  // Awake decay rate:
  // Hunger: drops ~5.5 points per hour (~132 points/day) -> needs feeding every 6-12 hours
  // Energy: drops ~4.5 points per hour -> needs a nap/sleep
  // Happiness: drops ~3.5 points per hour if hungry (<40) or tired (<40)
  currentHunger = Math.max(0, currentHunger - elapsedHours * 5.5);
  currentEnergy = Math.max(0, currentEnergy - elapsedHours * 4.5);

  if (currentHunger < 40 || currentEnergy < 40) {
    currentHappiness = Math.max(0, currentHappiness - elapsedHours * 4.0);
  }

  return {
    ...pet,
    hunger: Math.round(currentHunger),
    energy: Math.round(currentEnergy),
    happiness: Math.round(currentHappiness),
    lastCareTimestamp: now,
  };
}


