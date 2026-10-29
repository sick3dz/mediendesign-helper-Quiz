# StudyQuest Quiz-Spiele & Interaktiver Lern-Hub

Integration eines dedizierten Spiele-Bereichs mit 3 unterhaltsamen Minigames (*Speed-Quiz Quest*, *Memory-Match* & *Boss-Raid*). Alle Spiele nutzen dynamisch die IHK-Fragen und belohnen erfolgreiche Runden mit EXP-Punkten für das Haustier.

## User Review & Critical Decisions

> [!IMPORTANT] Alle 3 vom Nutzer gewählten Spielmodi werden im interaktiven Spiele-Bereich bereitgestellt und nahtlos in das Haustier-Belohnungssystem eingebunden.

- **Bestätigte Entscheidung 1 (Spielmodi)**: Bereitstellung aller 3 Spiele (*Speed-Quiz Quest*, *Memory-Match*, *Boss-Raid*) im Spiele-Bereich.
- **Bestätigte Entscheidung 2 (Platzierung)**: Spiele-Button in der Hauptnavigation (unter 'Challenges') sowie im Haustier-Levelbereich bei den Challenges.
- **Bestätigte Entscheidung 3 (Fragenbasis)**: Dynamische Generierung von Fragen & Fachbegriffen aus allen 7 IHK-Kapiteln & Prüfungsmodulen.

---

## 1. Overview & Core Concept

1. **Speed-Quiz Quest**:
   - Fragen gegen die ablaufende Zeit (z. B. 12 Sekunden pro Frage) beantworten.
   - Richtige Antworten in Serie bauen eine Combo auf und geben Bonus-EXP.

2. **Memory-Match & IHK-Begriffe**:
   - Karten-Paare finden: Zuordnung von Fachbegriffen zu den passenden IHK-Definitionen (z. B. *Accessibility* ↔ *Barrierefreiheit nach WCAG*, *SQL JOIN* ↔ *Verknüpfung von zwei Tabellen*).
   - Züge-Zähler und Zeitmessung für Highscores.

3. **Boss-Raid Quiz**:
   - Rundenbasierter Bosskampf gegen Lern-Gegner (z. B. "Master Bug", "Prüfungs-Phantom").
   - Richtige Antworten lösen Spezial-Angriffe aus und ziehen Boss-HP ab. Falsche Antworten verringern die Spieler-HP.
   - Sieg belohnt mit großen EXP-Mengen für das Haustier.

---

## 2. User Experience & Visual Design

- **Layout & Einbindung**:
  - Aufrufbar über die Hauptnavigation unter `Challenges / Spiele` sowie im Haustier-Raum unter dem Tab `Challenges & Minispiele`.
  - Übersichtliches Hub-Grid mit 3 interaktiven Spielkarten inklusive Highscore-Anzeige, Zeitrekorden und Belohnungsübersicht.
- **Visual Identity**:
  - Dunkles Slate/Indigo-Theme mit Neon-Akzenten (Amber/Emerald/Rose).
  - HP-Balken, Timer-Countdowns, Partikel-Animationen und Soundeffekte bei Siegen.

---

## 3. Key Product Decisions & Trade-Offs

- **Echte IHK-Inhalte**: Alle Fragen und Begriffspaare speisen sich aus den echten Lerninhalten (`chaptersData.ts` und `examData.ts`).
- **Lern-Synergie mit dem Haustier**: Verdiente EXP aus den Spielen werden sofort im `stats.xp`-Konto gutgeschrieben, womit man im Haustier-Shop Leckerlis und Accessoires kaufen kann.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                          App.tsx                                │
│        (state: activeTab = 'minigames', stats.xp, pet)          │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │     TopBar / Nav Navigation  │ │   VirtualPetView (Sub-Tab)   │
  └──────────────┬───────────────┘ └──────────────┬───────────────┘
                 │                                │
                 └───────────────┬────────────────┘
                                 ▼
              ┌─────────────────────────────────────┐
              │      MiniGamesHubView.tsx           │
              │  (Auswahl & Modi-Umschaltung)       │
              └──────────────────┬──────────────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     ▼                           ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│ SpeedQuizGame.tsx       │ │ MemoryMatchGame.tsx     │ │ BossRaidGame.tsx        │
│ (Timer, Combo & XP)     │ │ (Begriffe ↔ Definition) │ │ (Boss HP & Attacken)    │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

- **Dateien & Komponenten**:
  - `MiniGamesHubView.tsx`: Erweitert um die 3 neuen Spielmodi mit Tabs/Karten.
  - `SpeedQuizGame.tsx`: Reaktiver Timer, Combo-Multiplikator, EXP-Berechnung.
  - `MemoryMatchGame.tsx`: Kartenpaar-Matching mit IHK-Fachbegriffen & Definitionen.
  - `BossRaidGame.tsx`: Boss-Lebensbalken, Spieler-HP, Multiple-Choice-Kampfsystem.
