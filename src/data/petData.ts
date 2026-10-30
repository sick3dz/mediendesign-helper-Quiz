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

export interface PetSpeciesSoundConfig {
  soundWord: string;
  soundIcon: string;
  highFiveLabel: string;
  highFiveActionMsg: (name: string) => string;
  petActionMsg: (name: string) => string;
  wakeUpMsg: (name: string) => string;
}

export const PET_SPECIES_SOUNDS: Record<PetSpecies, PetSpeciesSoundConfig> = {
  dog: {
    soundWord: 'Wuff!',
    soundIcon: '🐶',
    highFiveLabel: 'Pfötchen geben! 🐾',
    highFiveActionMsg: (name: string) => `${name} gibt dir begeistert Pfötchen! High-Five! 🐾 (+10 Laune)`,
    petActionMsg: (name: string) => `${name} bellt freudig und wedelt begeistert mit dem Schwanz! (+15 Laune) 🐾`,
    wakeUpMsg: (name: string) => `${name} springt mit einem munteren "Wuff!" auf! ☀️`,
  },
  cat: {
    soundWord: 'Miau!',
    soundIcon: '🐱',
    highFiveLabel: 'Pfötchen geben! 🐾',
    highFiveActionMsg: (name: string) => `${name} tippt dir sanft mit der Pfote auf die Hand! High-Five! 🐾 (+10 Laune)`,
    petActionMsg: (name: string) => `${name} schnurrt wohlig und schmiegt sich sanft an dich! (+15 Laune) ✨`,
    wakeUpMsg: (name: string) => `${name} gähnt und streckt sich mit einem zarten "Miau!" ☀️`,
  },
  penguin: {
    soundWord: 'Nöööt!',
    soundIcon: '🐧',
    highFiveLabel: 'Flügel geben! 🪶',
    highFiveActionMsg: (name: string) => `${name} klatscht vergnügt mit den Flügeln an deine Hand! High-Five! 🪶 (+10 Laune)`,
    petActionMsg: (name: string) => `${name} trötet vergnügt und watschelt stolz im Kreis! (+15 Laune) ❄️`,
    wakeUpMsg: (name: string) => `${name} schüttelt das Gefieder mit einem lauten "Nöööt!" ☀️`,
  },
  axolotl: {
    soundWord: 'Blubb!',
    soundIcon: '🦎',
    highFiveLabel: 'Flosse geben! 🫧',
    highFiveActionMsg: (name: string) => `${name} wackelt freudig mit der Flosse an deiner Hand! High-Five! 🫧 (+10 Laune)`,
    petActionMsg: (name: string) => `${name} blubbert glücklich und wackelt mit den Kiemen! (+15 Laune) 🫧`,
    wakeUpMsg: (name: string) => `${name} taucht mit einem munteren "Blubb!" an die Oberfläche! ☀️`,
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
  hunger: 85,
  happiness: 85,
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
  timesPlayed: 0,
  isSleeping: false,
};

export function calculatePetDecay(pet: PetState): PetState {
  if (!pet) return DEFAULT_PET_STATE;

  const now = Date.now();
  const lastTime = pet.lastCareTimestamp || now;
  const elapsedMs = Math.max(0, now - lastTime);
  const elapsedHours = elapsedMs / (1000 * 60 * 60);

  if (elapsedHours < 0.005) {
    return {
      ...pet,
      lastCareTimestamp: pet.lastCareTimestamp || now,
    };
  }

  let currentHunger = pet.hunger ?? 85;
  let currentHappiness = pet.happiness ?? 85;

  // Immortal Pet Design: Gentle decay with strict safe floors (minimum 30%).
  // The pet NEVER starves, NEVER dies, and NEVER loses items or leaves the user.
  currentHunger = Math.max(30, currentHunger - elapsedHours * 2.5);

  if (currentHunger < 40) {
    currentHappiness = Math.max(30, currentHappiness - elapsedHours * 1.5);
  }

  const currentHour = new Date().getHours();
  const isNightHours = currentHour >= 22 || currentHour < 6;

  // If night hours (22:00 - 06:00), away for >= 5 hours, or tired, the pet peacefully sleeps
  const isSleeping = isNightHours || elapsedHours >= 5 || Boolean(pet.isSleeping && currentHunger <= 40);

  return {
    ...pet,
    hunger: Math.round(currentHunger),
    happiness: Math.round(currentHappiness),
    isSleeping,
    lastCareTimestamp: now,
  };
}

export function getDynamicPetThought(pet: PetState, statsXp: number = 0, seedIndex?: number): string {
  if (!pet) return 'Bereit für die IHK-Prüfung! ★';

  const hour = new Date().getHours();
  const isNightHours = hour >= 22 || hour < 6;

  if (pet.isSleeping || isNightHours) {
    const sleepQuotes = [
      `💭 Zzz... ${pet.name} träumt friedlich von 100 % in der IHK-Abschlussprüfung! 🎓🏆`,
      `💭 Zzz... ${pet.name} träumt von einer goldenen Ehrenurkunde "IHK-Prüfling des Jahres"! ✨📜`,
      `💭 Zzz... ${pet.name} träumt von fehlerfreien Wireframes, glänzenden Medaillen & Leckerlis! 🍖🥇`,
      `💭 Zzz... Sanfte Nachtruhe (22:00–06:00 Uhr)... Morgen knacken wir das nächste Kapitel! 🌙⭐`,
    ];
    return sleepQuotes[(seedIndex ?? Math.floor(Math.random() * sleepQuotes.length)) % sleepQuotes.length];
  }

  if ((pet.hunger ?? 85) <= 32) {
    return `${pet.name}'s Magen knurrt leise... Ein kleiner Snack aus dem Shop wäre wunderbar! 🥪`;
  }

  if ((pet.happiness ?? 85) <= 35) {
    return `${pet.name} schaut dich mit treuen Augen an... Zeit für eine Streicheleinheit! 💖`;
  }

  const timeContext = hour >= 5 && hour < 12 ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : 'evening';

  const speciesQuotes: Record<PetSpecies, string[]> = {
    dog: [
      `${pet.name} schnüffelt neugierig nach neuen Wireframes & Layout-Tipps! 🐾`,
      `Wuff! Ich habe einen kleinen Fehler im Raster aufgespürt! 🐕`,
      `Design-Gründe sprechen klar für eine frische Lerneinheit! ⚡`,
      `Ich halte dir treu die Treue bei jeder kniffligen IHK-Frage! 🐾`,
      timeContext === 'morning' ? `Guten Morgen! Wuff – lass uns mit vollem Schwung lernen! ☀️` : timeContext === 'afternoon' ? `Nachmittags-Power! Wuff – lass uns das nächste Kapitel knacken! ⚡` : `Nachtschicht? Ich wache treu an deiner Seite! 🌙`,
    ],
    cat: [
      `${pet.name} prüft mit Schnurrhaaren, ob dein Kontrast WCAG-konform ist! 🐱`,
      `Miau! Gutes UI-Design schmiegt sich an wie eine warme Decke. ✨`,
      `Sanfter Klick, geschmeidiges Micro-Feedback... So muss UX sein! 🐾`,
      `Erst eine Runde Streicheln, dann die IHK-Bestnote! Miau! ✨`,
      timeContext === 'morning' ? `Miau... Guten Morgen! Erst gähnen, dann IHK-Formeln lernen! ☀️` : timeContext === 'afternoon' ? `Geschmeidige Nachmittags-Session! Miau! 🌸` : `Späte Stunde? Ich schnurre beruhigend zu deinen Lernkarten... 🌙`,
    ],
    penguin: [
      `${pet.name} bleibt cool wie Eis – Barrierefreiheit ist kein Hexenwerk! ❄️`,
      `Nöööt! Tastatursteuerung & WCAG meistere ich im Schlaf! 🐧`,
      `Ein Eis-Snack und eine Runde Spickzettel-Formeln, bitte! ❄️`,
      `Watscheln wir direkt zum nächsten spannenden IHK-Kapitel! 🐧`,
      timeContext === 'morning' ? `Frischer Morgenwind! Nöööt – bereit für Wissen! ☀️` : timeContext === 'afternoon' ? `Eiskalt fokussiert! Lass uns Module abschließen! ❄️` : `Kühler Kopf am Abend – so gelingt jede Prüfung! 🌙`,
    ],
    axolotl: [
      `${pet.name} regeneriert frische Lernenergie im kühlen Wasser! 🫧`,
      `Blubb! Schwimme mit Leichtigkeit durch jede Designkonzeption! 🦎`,
      `Unterwasser-Fokus aktiviert... Lass uns wertvolles EXP sammeln! 🫧`,
      `Interaktionsdesign ist mein natürlicher Lebensraum! Blubb! 🌊`,
      timeContext === 'morning' ? `Blubb! Guten Morgen – munter auftauchen zum Lernen! ☀️` : timeContext === 'afternoon' ? `Sanfte Wellen & frisches Wissen am Nachmittag! 🫧` : `Abendliches Blubbern... Zeit für eine ruhige Fokus-Einheit! 🌙`,
    ],
  };

  const pool = speciesQuotes[pet.species] || speciesQuotes.dog;
  const idx = seedIndex !== undefined ? Math.abs(seedIndex) % pool.length : Math.floor(Math.random() * pool.length);
  return pool[idx];
}



