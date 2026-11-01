import { PetSpecies, PetAccessory, PetFood, PetState, PetGadget } from '../types/quiz';

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
  unicorn: {
    species: 'unicorn',
    defaultName: 'Sternchen',
    title: 'Kreativ-Einhorn',
    description: 'Bringt magische Inspiration in Farbwelten und lässt deine kreativen Ideen im IHK-Design erstrahlen.',
    favoriteFood: 'Magischer Sternenstaub',
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
  unicorn: {
    soundWord: 'Wieher! ✨',
    soundIcon: '🦄',
    highFiveLabel: 'Huf geben! ✨',
    highFiveActionMsg: (name: string) => `${name} tippt mit dem glitzernden Huf an deine Hand! High-Five! ✨ (+10 Laune)`,
    petActionMsg: (name: string) => `${name} wiehert magisch und das Horn funkelt in Regenbogenfarben! (+15 Laune) 🦄✨`,
    wakeUpMsg: (name: string) => `${name} erwacht mit einem glitzernden Wiehern und schüttelt die Mähne! ☀️✨`,
  },
};

export const PET_FOODS: PetFood[] = [
  {
    id: 'cookie',
    name: 'Glücks-Keks',
    price: 0,
    xpPrice: 0,
    icon: '🍪',
    nutrition: 25,
    happiness: 20,
    description: 'Gratis-Snack! Max. 5 am Tag (nach jedem Keks 2 Std. Pause).',
  },
  {
    id: 'snack_meal',
    name: 'Gourmet-Mahlzeit',
    price: 20,
    xpPrice: 15,
    icon: '🍖',
    nutrition: 45,
    happiness: 30,
    description: 'Sättigt anhaltend und sorgt für glänzende Augen.',
  },
  {
    id: 'donut',
    name: 'Regenbogen-Donut',
    price: 30,
    xpPrice: 25,
    icon: '🍩',
    nutrition: 40,
    happiness: 50,
    description: 'Pures Dopamin! Bringt jedes Haustier zum Jubeln.',
  },
  {
    id: 'boba',
    name: 'Fokus Bubble-Tea',
    price: 40,
    xpPrice: 30,
    icon: '🧋',
    nutrition: 30,
    happiness: 65,
    description: 'Beruhigender Milchtee gegen Lernstress.',
  },
  {
    id: 'brain_elixir',
    name: 'ADHS Fokus-Elixier',
    price: 50,
    xpPrice: 40,
    icon: '🧪',
    nutrition: 60,
    happiness: 80,
    description: 'Verleiht sofortige Klarheit, stillt Hunger und zaubert ein breites Lächeln.',
  },
  {
    id: 'golden_apple',
    name: 'Goldener Prüfungs-Apfel',
    price: 70,
    xpPrice: 50,
    icon: '🍎',
    nutrition: 100,
    happiness: 100,
    description: 'Füllt Hunger und Laune komplett auf 100%!',
  },
  {
    id: 'stardust',
    name: 'Magischer Sternenstaub',
    price: 35,
    xpPrice: 25,
    icon: '✨',
    nutrition: 50,
    happiness: 70,
    description: 'Glitzert geheimnisvoll und lässt das Kreativ-Einhorn vor Freude strahlen.',
  },
  {
    id: 'rainbow_cupcake',
    name: 'Regenbogen-Cupcake',
    price: 45,
    xpPrice: 35,
    icon: '🧁',
    nutrition: 70,
    happiness: 85,
    description: 'Bunt gestrudelter Feinschmecker-Cupcake mit glänzenden magischen Streuseln.',
  },
  {
    id: 'espresso_shot',
    name: 'Espresso Doppio',
    price: 25,
    xpPrice: 20,
    icon: '☕',
    nutrition: 30,
    happiness: 40,
    description: 'Frisch gemahlener Arabica-Doppelshot für den perfekten Koffein-Kick am Morgen.',
  },
  {
    id: 'pixel_pizza',
    name: 'Pixel-Pizza Margherita',
    price: 50,
    xpPrice: 40,
    icon: '🍕',
    nutrition: 65,
    happiness: 55,
    description: 'Knusprig im Steinofen gebackene Pizza im 8-Bit-Design mit würzigem Basilikum.',
  },
  {
    id: 'ramen_bowl',
    name: 'Design-Sprint Ramen',
    price: 75,
    xpPrice: 60,
    icon: '🍜',
    nutrition: 80,
    happiness: 75,
    description: 'Dampfende Nudelsuppe mit Bambussprossen und Noriblatt – spendet anhaltende kreative Energie.',
  },
  {
    id: 'dopamine_sushi',
    name: 'Dopamin-Sushi Deluxe',
    price: 110,
    xpPrice: 85,
    icon: '🍣',
    nutrition: 90,
    happiness: 90,
    description: 'Feinste Lachs-Nigiri und Avocado-Maki, serviert auf traditionellem Zedernholz.',
  },
  {
    id: 'ambrosia_typography',
    name: 'Ambrosia der Typografie',
    price: 150,
    xpPrice: 120,
    icon: '🍨',
    nutrition: 100,
    happiness: 100,
    description: 'Götterspeise mit goldglänzenden Serifen-Streuseln: Stellt Hunger & Laune komplett wieder her!',
  },
];

export const PET_ACCESSORIES: PetAccessory[] = [
  // Head
  {
    id: 'party_hat',
    name: 'Party-Hut',
    category: 'head',
    price: 35,
    xpPrice: 25,
    icon: '🎉',
    description: 'Feiert jede fehlerfreie Quiz-Frage!',
  },
  {
    id: 'beanie',
    name: 'Kuschelige Beanie',
    category: 'head',
    price: 45,
    xpPrice: 35,
    icon: '🧶',
    description: 'Entspannter Designer-Look für kühle Tage.',
  },
  {
    id: 'grad_cap',
    name: 'IHK-Absolventen-Hut',
    category: 'head',
    price: 70,
    xpPrice: 50,
    icon: '🎓',
    description: 'Klassischer Doktorhut für erfolgreiche Prüflinge.',
  },
  {
    id: 'wizard_hat',
    name: 'Zauberer-Hut',
    category: 'head',
    price: 85,
    xpPrice: 60,
    icon: '🧙',
    description: 'Verleiht magisches Wissen für die IHK-Prüfung.',
  },
  {
    id: 'crown',
    name: 'Goldene Krone',
    category: 'head',
    price: 130,
    xpPrice: 90,
    icon: '👑',
    description: 'Für wahre Meister der Designkonzeption.',
  },

  // Face
  {
    id: 'sunglasses',
    name: 'Coole Sonnenbrille',
    category: 'face',
    price: 40,
    xpPrice: 30,
    icon: '🕶️',
    description: 'Schützt vor zu hellem Bildschirmlicht.',
  },
  {
    id: 'nerd_glasses',
    name: 'Hornbrille',
    category: 'face',
    price: 45,
    xpPrice: 35,
    icon: '👓',
    description: 'Schärft den Blick für winzige Wireframe-Fehler.',
  },
  {
    id: 'pixel_shades',
    name: 'Pixel-Shades',
    category: 'face',
    price: 90,
    xpPrice: 65,
    icon: '👾',
    description: 'Deal with it: Pure digitale Coolness.',
  },

  // Neck
  {
    id: 'bowtie',
    name: 'Rote Fliege',
    category: 'neck',
    price: 30,
    xpPrice: 25,
    icon: '🎀',
    description: 'Schick herausgeputzt für die Abschlussprüfung.',
  },
  {
    id: 'scarf',
    name: 'Wärmender Schal',
    category: 'neck',
    price: 45,
    xpPrice: 35,
    icon: '🧣',
    description: 'Hält warm während langer Lern-Sessions.',
  },
  {
    id: 'star_collar',
    name: 'Sternen-Halsband',
    category: 'neck',
    price: 65,
    xpPrice: 45,
    icon: '⭐',
    description: 'Funkelt bei jedem richtigen Prüfungspunkt.',
  },
  {
    id: 'gold_chain',
    name: 'Goldene Medaille',
    category: 'neck',
    price: 100,
    xpPrice: 75,
    icon: '🥇',
    description: 'Glänzt im Rampenlicht jedes Usability-Tests.',
  },
  {
    id: 'json_cyber_badge',
    name: 'JSON API Cyber-Badge',
    category: 'neck',
    price: 60,
    xpPrice: 40,
    icon: '⭐',
    description: 'Signalisiert blitzschnellen REST-API-Datenaustausch zwischen Frontend und Server.',
  },

  // Neue Head-Accessoires
  {
    id: 'gamer_headset',
    name: 'RGB-Gaming-Headset',
    category: 'head',
    price: 55,
    xpPrice: 40,
    icon: '🎧',
    description: 'Leuchtet in pulsierenden RGB-Regenbogenfarben für den perfekten Sound.',
  },
  {
    id: 'flower_crown',
    name: 'Frühlings-Blütenkranz',
    category: 'head',
    price: 80,
    xpPrice: 60,
    icon: '🌸',
    description: 'Duftende Kirsch- und Rosenblüten, die sanfte Naturfreude versprühen.',
  },
  {
    id: 'viking_helmet',
    name: 'Nordischer Runenhelm',
    category: 'head',
    price: 135,
    xpPrice: 95,
    icon: '🪖',
    description: 'Mit geschwungenen Hörnern und keltischen Runen für unerschrockene Prüfungs-Krieger.',
  },
  {
    id: 'cyber_halo',
    name: 'Holografischer Cyber-Halo',
    category: 'head',
    price: 240,
    xpPrice: 180,
    icon: '💫',
    description: 'Schwebender photonischer Lichtring mit futuristischen Neon-Partikeln.',
  },

  // Neue Face-Accessoires
  {
    id: 'monocle',
    name: 'Gelehrten-Monokel',
    category: 'face',
    price: 65,
    xpPrice: 50,
    icon: '🧐',
    description: 'Feingeschliffene Goldfassung für die akribische Begutachtung von Reinzeichnungen.',
  },
  {
    id: 'vr_goggles',
    name: 'Spatial-Computing-Visier',
    category: 'face',
    price: 120,
    xpPrice: 90,
    icon: '🥽',
    description: 'Next-Gen VR-Brille mit holografischem Display für 3D- und WebGL-Erlebnisse.',
  },
  {
    id: 'cyber_eye_patch',
    name: 'Bionisches Cyber-Okular',
    category: 'face',
    price: 175,
    xpPrice: 130,
    icon: '👁️',
    description: 'Futuristisches HUD-Zielauge mit digitalem Raster-Scan und Kontrast-Zoom.',
  },

  // Neue Neck-Accessoires
  {
    id: 'bandana',
    name: 'Retro-Bandana',
    category: 'neck',
    price: 35,
    xpPrice: 25,
    icon: '🧣',
    description: 'Klassisches rotes Paisley-Tuch für den lässigen Indie-Designer-Vibe.',
  },
  {
    id: 'lucky_bell',
    name: 'Goldenes Glücksglöckchen',
    category: 'neck',
    price: 60,
    xpPrice: 45,
    icon: '🔔',
    description: 'Sanft klingendes Messingglöckchen an seidenem Band bringt Prüfungsglück.',
  },
  {
    id: 'diamond_pendant',
    name: 'Brillanter Vektor-Diamant',
    category: 'neck',
    price: 160,
    xpPrice: 120,
    icon: '💎',
    description: 'Perfekt facettierter Kristall, der jedes Umgebungslicht in Spektralfarben bricht.',
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

export const PET_GADGETS: PetGadget[] = [
  {
    id: 'bouncing_ball',
    name: 'Bunter Hüpfball',
    category: 'gadget',
    price: 0,
    xpPrice: 0,
    icon: '⚽',
    description: 'Gratis Starter-Spielzeug: Springt fröhlich mit Squash-and-Stretch-Physik!',
    interactionType: 'bounce',
    happinessBonus: 12,
    soundName: 'bounce',
    actionMessage: (petName: string) => `${petName} jagt begeistert dem bunten Hüpfball hinterher! Boing! ⚽ (+12 Laune)`,
  },
  {
    id: 'laser_pointer',
    name: 'Neon-Laserpointer',
    category: 'gadget',
    price: 35,
    xpPrice: 25,
    icon: '🔦',
    description: 'Projiziert einen flitzenden roten Laserpunkt – pure Jagdfreude!',
    interactionType: 'laser',
    happinessBonus: 18,
    soundName: 'laser',
    actionMessage: (petName: string) => `${petName} hechtet flink dem roten Laserpunkt nach! Zapp! 🔴 (+18 Laune)`,
  },
  {
    id: 'magic_wand',
    name: 'Sternen-Zauberstab',
    category: 'gadget',
    price: 65,
    xpPrice: 45,
    icon: '🪄',
    description: 'Schwingt auf und hüllt dein Haustier in funkelnden Sternenstaub!',
    interactionType: 'magic_wand',
    happinessBonus: 25,
    soundName: 'magic',
    actionMessage: (petName: string) => `Magischer Sternenstaub sprüht um ${petName} herum! Zauberhaft! ✨ (+25 Laune)`,
  },
  {
    id: 'fidget_cube',
    name: 'ADHS Fokus-Würfel',
    category: 'gadget',
    price: 45,
    xpPrice: 30,
    icon: '🎲',
    description: 'Taktiles Klick- und Dreh-Gadget: Beruhigt Nerven und bringt sanften Fokus.',
    interactionType: 'fidget',
    happinessBonus: 15,
    soundName: 'click',
    actionMessage: (petName: string) => `Klick-Klack! ${petName} findet durch das rhythmische Klicken sofortige Ruhe! 🎲 (+15 Laune)`,
  },
  {
    id: 'rubber_duck',
    name: 'Code-Review Quietscheente',
    category: 'gadget',
    price: 30,
    xpPrice: 25,
    icon: '🦆',
    description: 'Klassisches Debugging-Helferchen: Hört aufmerksam zu und quakt bei jedem Klick fröhlich!',
    interactionType: 'duck',
    happinessBonus: 16,
    soundName: 'quack',
    actionMessage: (petName: string) => `Quieteetsch! ${petName} erklärt der gelben Ente sein Layout-Problem und findet sofort die Lösung! 🦆 (+16 Laune)`,
  },
  {
    id: 'mini_drone',
    name: 'Miniatur-Kameradrohne',
    category: 'gadget',
    price: 80,
    xpPrice: 60,
    icon: '🛸',
    description: 'Surrt leise durchs Zimmer und liefert atemberaubende Luftaufnahmen aus der Vogelperspektive.',
    interactionType: 'drone',
    happinessBonus: 22,
    soundName: 'laser',
    actionMessage: (petName: string) => `Wuuusch! Die Mini-Drohne zieht Kreise und filmt ${petName} aus der Vogelperspektive! 🛸 (+22 Laune)`,
  },
  {
    id: 'synthesizer_pad',
    name: 'Pocket Beatmaker & Synth',
    category: 'gadget',
    price: 140,
    xpPrice: 100,
    icon: '🎹',
    description: 'Tragbare Groovebox mit Drumpads: Feuert mitreißende Lo-Fi Chords und fette Beats ab!',
    interactionType: 'synth',
    happinessBonus: 28,
    soundName: 'magic',
    actionMessage: (petName: string) => `Drop the Beat! ${petName} groovt ausgelassen zu den warmen Synthesizer-Akkorden! 🎹 (+28 Laune)`,
  },
  {
    id: 'anti_gravity_orb',
    name: 'Schwebende Antigravitations-Sphäre',
    category: 'gadget',
    price: 240,
    xpPrice: 180,
    icon: '🔮',
    description: 'Sci-Fi Artefakt: Trotzt der Schwerkraft und taucht die Umgebung in pulsierende Gravitationswellen.',
    interactionType: 'orb',
    happinessBonus: 35,
    soundName: 'magic',
    actionMessage: (petName: string) => `Unglaublich! ${petName} schwebt schwerelos um die funkelnde Antigravitations-Sphäre! 🔮 (+35 Laune)`,
  },
];

export function findGadgetById(id: string): PetGadget | undefined {
  return PET_GADGETS.find(g => g.id === id);
}

export const DEFAULT_PET_STATE: PetState = {
  hasAdopted: false, // User selects first!
  species: 'dog',
  name: 'Bello',
  hunger: 85,
  happiness: 85,
  lastCareTimestamp: Date.now(),
  equipped: {
    gadget: 'bouncing_ball',
  },
  inventory: {
    food: {
      cookie: 10, // starts with 10 free cookies
      snack_meal: 1,
    },
    accessories: [],
    gadgets: ['bouncing_ball'],
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

  const currentHour = new Date().getHours();
  // Diurnal rhythm: Night hours are strictly between 22:00 and 06:00
  const isNightHours = currentHour >= 22 || currentHour < 6;

  // MORNING AUTO-WAKEUP:
  // Between 06:00 and 22:00 (morgens, tagsüber, abends), the pet ALWAYS wakes up automatically!
  // Any overnight sleep ends automatically as soon as morning arrives.
  // During night hours (22:00–06:00), it rests peacefully (unless recently woken manually by the user).
  const isSleeping = isNightHours && (pet.isSleeping !== false || elapsedHours >= 1);

  if (elapsedHours < 0.005) {
    return {
      ...pet,
      isSleeping,
      lastCareTimestamp: pet.lastCareTimestamp || now,
    };
  }

  let currentHunger = pet.hunger ?? 85;
  let currentHappiness = pet.happiness ?? 85;

  // Immortal Pet Design: Extremely gentle decay with strict safe floors (minimum 60% saturation).
  // The pet NEVER starves, NEVER dies, and decay is slowed down 5x.
  currentHunger = Math.max(60, currentHunger - elapsedHours * 0.5);
  currentHappiness = Math.max(60, currentHappiness - elapsedHours * 0.3);

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

  // Peaceful nighttime rest
  if (isNightHours && pet.isSleeping) {
    const sleepQuotes = [
      `💭 Zzz... ${pet.name} träumt friedlich von 100 % in der IHK-Abschlussprüfung! 🎓🏆`,
      `💭 Zzz... ${pet.name} träumt von einer goldenen Ehrenurkunde "IHK-Prüfling des Jahres"! ✨📜`,
      `💭 Zzz... ${pet.name} träumt von fehlerfreien Wireframes, glänzenden Medaillen & Leckerlis! 🍖🥇`,
      `💭 Zzz... Sanfte Nachtruhe (22:00–06:00 Uhr)... Morgens ab 06:00 Uhr wache ich von selbst auf! 🌙⭐`,
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

  const morningGreeting = pet.species === 'cat'
    ? `Miau... Guten Morgen! ${pet.name} ist munter aufgewacht und schnurrt bereit für deine IHK-Lerneinheit! ☀️🐾`
    : pet.species === 'penguin'
    ? `Frischer Morgenwind! Nöööt – ${pet.name} ist hellwach und bereit für neue Lernrekorde! ☀️🐧`
    : pet.species === 'axolotl'
    ? `Blubb! Guten Morgen – ${pet.name} taucht munter auf und freut sich auf dich! ☀️🫧`
    : pet.species === 'unicorn'
    ? `Magischer Sonnenaufgang! ${pet.name} ist voller Tatendrang aufgewacht! ☀️✨`
    : `Guten Morgen! Wuff – ${pet.name} ist munter aufgewacht und springt vor Lernfreude! ☀️🐕`;

  const speciesQuotes: Record<PetSpecies, string[]> = {
    dog: [
      timeContext === 'morning' ? morningGreeting : `${pet.name} schnüffelt neugierig nach neuen Wireframes & Layout-Tipps! 🐾`,
      `Wuff! Ich habe einen kleinen Fehler im Raster aufgespürt! 🐕`,
      `Design-Gründe sprechen klar für eine frische Lerneinheit! ⭐`,
      `Ich halte dir treu die Treue bei jeder kniffligen IHK-Frage! 🐾`,
      timeContext === 'afternoon' ? `Nachmittags-Power! Wuff – lass uns das nächste Kapitel knacken! ⭐` : `Design-Spürsinn aktiviert! 🐾`,
    ],
    cat: [
      timeContext === 'morning' ? morningGreeting : `${pet.name} prüft mit Schnurrhaaren, ob dein Kontrast WCAG-konform ist! 🐱`,
      `Miau! Gutes UI-Design schmiegt sich an wie eine warme Decke. ✨`,
      `Sanfter Klick, geschmeidiges Micro-Feedback... So muss UX sein! 🐾`,
      `Erst eine Runde Streicheln, dann die IHK-Bestnote! Miau! ✨`,
      timeContext === 'afternoon' ? `Geschmeidige Nachmittags-Session! Miau! 🌸` : `Ich schnurre beruhigend zu deinen Lernkarten... ✨`,
    ],
    penguin: [
      timeContext === 'morning' ? morningGreeting : `${pet.name} bleibt cool wie Eis – Barrierefreiheit ist kein Hexenwerk! ❄️`,
      `Nöööt! Tastatursteuerung & WCAG meistere ich im Schlaf! 🐧`,
      `Ein Eis-Snack und eine Runde Spickzettel-Formeln, bitte! ❄️`,
      `Watscheln wir direkt zum nächsten spannenden IHK-Kapitel! 🐧`,
      timeContext === 'afternoon' ? `Eiskalt fokussiert! Lass uns Module abschließen! ❄️` : `Kühler Kopf beim Lernen – so gelingt jede Prüfung! ❄️`,
    ],
    axolotl: [
      timeContext === 'morning' ? morningGreeting : `${pet.name} regeneriert frische Lernenergie im kühlen Wasser! 🫧`,
      `Blubb! Schwimme mit Leichtigkeit durch jede Designkonzeption! 🦎`,
      `Unterwasser-Fokus aktiviert... Lass uns wertvolles EXP sammeln! 🫧`,
      `Interaktionsdesign ist mein natürlicher Lebensraum! Blubb! 🌊`,
      timeContext === 'afternoon' ? `Sanfte Wellen & frisches Wissen am Nachmittag! 🫧` : `Zeit für eine ruhige Fokus-Einheit! 🫧`,
    ],
    unicorn: [
      timeContext === 'morning' ? morningGreeting : `${pet.name}'s Horn funkelt voller kreativer Ideen für dein nächstes Design! 🦄✨`,
      `Wieher! Ein Hauch Sternenstaub verwandelt jedes Layout in pure Magie! 🌈`,
      `Farbharmonien und Kontraste strahlen heute besonders zauberhaft! ✨`,
      `Mit kreativem Gespür meistern wir jede knifflige IHK-Aufgabe! 🌟`,
      timeContext === 'afternoon' ? `Bunte Nachmittags-Inspiration! Das Horn leuchtet vor Tatendrang! 🦄🌈` : `Ein funkelnder Sternenhimmel für deine Lern-Session! 🌙✨`,
    ],
  };

  const pool = speciesQuotes[pet.species] || speciesQuotes.dog;
  const idx = seedIndex !== undefined ? Math.abs(seedIndex) % pool.length : Math.floor(Math.random() * pool.length);
  return pool[idx];
}



