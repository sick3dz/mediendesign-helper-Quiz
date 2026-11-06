# Mini-Challenge Modul-Badges, Status-Tracking & Level-2 Meister-Challenges

Vollständige Integration von Mini-Challenge-Indikatoren auf allen Modul-Karten, visuelle Markierung absolvierter Challenges, neue interaktive Challenges für WiSo & Grafikformate sowie Einführung der Level-2 Meister-Challenges.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Bestätigte Entscheidungen aus Phase 1:**
> - **Modul-Karten Badges & Status:** Alle Module, die eine interaktive Mini-Challenge besitzen, erhalten auf ihren Übersichtskarten ein deutliches Abzeichen ("🎮 Mini-Challenge"). Bereits absolvierte Challenges werden mit einem grünen Haken und Erfolgs-Badge markiert.
> - **Neue Mini-Challenges:** Integration neuer Mini-Challenges direkt im Lernfluss (zwischen Lern-Häppchen und Quiz) für:
>   1. **WiSo Rechtsfälle & Paragraphen (`wiso_case_match`)** in Kapitel 10 (Berufsausbildung, Arbeitsrecht, Sozialversicherung).
>   2. **Grafik-Formate & Farbräume (`graphics_format_match`)** in Kapitel 9 (SVG vs. WebP, RGB vs. CMYK, PPI vs. DPI).
> - **Level 2 Meister-Challenges:** Wenn der Meistermodus (Level 2) aktiviert ist, schaltet auch die Mini-Challenge in eine anspruchsvollere **Meister-Stufe** mit erschwerten IHK-Transferszenarien und Zeitboni um.

---

### 1. Overview & Core Concept

- **Was es tut:**
  - Lernende sehen auf einen Blick in der Modulübersicht jedes Kapitels, welche Module eine interaktive Mini-Challenge enthalten und welche sie bereits erfolgreich gemeistert haben.
  - Beim Durcharbeiten der Module (zwischen den Text-Häppchen und dem Wissens-Quiz) kann die Mini-Challenge direkt als praktischer Zwischenschritt absolviert werden.
  - Auf Level 2 (Meisterstufe) steht eine erweiterte Meister-Challenge zur Verfügung, die tiefere IHK-Rechtsfälle und Experten-Entscheidungen fordert.
- **Zielgruppe:** Mediengestalter-Azubis, die praxiserprobtes Wissen vor dem Abschlusstest festigen wollen.

---

### 2. User Experience & Visual Design

- **Modul-Karten (ChapterView / ChapterListView):**
  - **Badge:** `🎮 Mini-Challenge` (dezent gestylt mit Indigo-/Amber-Akzent).
  - **Status-Marker:** Grüner Haken `✓ Challenge absolviert` für im Nutzerprofil gespeicherte Erfolge.
- **Modul-Lernansicht (`ModuleLearningView`):**
  - Der Tab-Header hebt hervor: `Sparkles Lern-Häppchen` ➔ `Gamepad2 Mini-Challenge` ➔ `HelpCircle Quiz`.
  - Bei Level 2 schaltet der Tab auf `🏆 Meister-Challenge (Lvl 2)` um.
- **Neue Mini-Game-Typen:**
  - `wiso_case_match`: Interaktives Zuordnen von Paragraphen und Rechtsfolgen.
  - `graphics_format_match`: Schnelligkeits-Sorting von Dateiformaten (SVG, WebP, AVIF, PNG) und Farbräumen.

---

### 3. Key Product Decisions & Trade-Offs

- **Entscheidung: Speicher-Erweiterung in `UserStats`**
  - *Gewählter Ansatz:* Hinzufügen des Feldes `completedMiniGames: string[]` in `UserStats` (`storageService.ts` & `quiz.ts`).
  - *Warum:* Garantiert die dauerhafte Speicherung der absolvierten Mini-Challenges über Sitzungen hinweg.
- **Entscheidung: Level 2 Meister-Modus für Mini-Challenges**
  - *Gewählter Ansatz:* Die Mini-Games erhalten einen `isLevel2`-Modus mit anspruchsvolleren Aufgaben und veränderten Zeit-/Punkte-Parometern.
  - *Warum:* Schafft Anreiz, auch nach Level 1 nochmals die Meisterstufe für doppelte EXP anzutreten.

---

### 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│                   UserStats Store                      │
│   (completedModules, completedMiniGames, lvl2List)     │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌──────────────────────────┐┌────────────────────────────┐
│      ChapterView         ││    ModuleLearningView      │
│  - zeigt Modul-Karten    ││  - Tabs: Häppchen/Game/Quiz│
│  - "🎮 Mini-Challenge"   ││  - Schaltet Lvl 1 / Lvl 2  │
│  - "✓ Absolviert" Haken  ││  - Rendert Mini-Game       │
└──────────────────────────┘└────────────────────────────┘
```

#### Zu aktualisierende Dateien:
1. `src/types/quiz.ts`: `miniGameType` erweitern um `'wiso_case_match'` & `'graphics_format_match'`. `UserStats` um `completedMiniGames` erweitern.
2. `src/data/chaptersData.ts`: `miniGameType` bei Kapitel 9 (Bilddaten) und Kapitel 10 (WiSo) eintragen.
3. `src/services/storageService.ts`: Standard-Initialisierung & Hilfsfunktionen für `completedMiniGames`.
4. `src/components/ChapterView.tsx`: Badges & Status-Haken auf den Modul-Karten rendern.
5. `src/components/ModuleLearningView.tsx`: Mini-Challenge-Erledigung beim Gamewinn abspeichern & Level 2 Meister-Challenge-Modus aktivieren.
6. `src/components/InteractiveMinigames/`: Hinzufügen bzw. Erweitern der Minispiel-Komponenten für Grafik-Formate & WiSo-Rechtsfälle.
