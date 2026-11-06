# Universelle Antwort-Optionen-Mischung (Dynamic Option Shuffling)

Einführung einer flächendeckenden, dynamischen Misch-Logik für Antwort-Optionen in allen Modul-Quizzen, Mix-Up-Serien, dem Abschlussprüfungs-Simulator und den Mini-Games. Dadurch stehen die richtigen Antworten nicht mehr primär an erster Stelle (Option A), sondern werden bei jedem Durchlauf zufällig über alle Positionen verteilt.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Bestätigte Entscheidungen aus Phase 1:**
> - **Dynamische Mischung:** Die Antwort-Optionen aller Multiple-Choice-Fragen werden bei jedem Aufruf und Neustart dynamisch per Zufallsgenerator durchgemischt.
> - **Flächendeckende Anwendung:** Die Mischung gilt ausnahmslos für alle Bereiche der Anwendung:
>   1. Modul-Quizze (Level 1 Standard & Level 2 Meisterstufe in `QuizCard.tsx`)
>   2. Mix-Up Lerneinheiten (`blitzContent.ts` / `DidacticMixUpView.tsx`)
>   3. IHK Abschlussprüfungs-Simulator (`ExamSimulatorView.tsx`)
>   4. Alle interaktiven Quiz-Spiele (`SpeedQuizGame`, `BossRaidGame`, `WisoDuelGame`, `GraphicsFormatGame`)
>   5. Fokus-Sprint Modal (`FocusSprintModal.tsx`)

---

### 1. Overview & Core Concept

- **Was es tut:**
  - Bisher waren in den zentralen Datendateien (`chaptersData.ts`, `examQuestions.ts`) die korrekten Antworten herstellungsbedingt meist als erste Option (`options[0]`) eingetragen.
  - Mit der neuen Logik werden die Antwort-Optionen jeder Frage unmittelbar vor dem Rendern mit einem bewährten Fisher-Yates-/Math.random-Algorithmus gemischt.
  - Die Auswertung der Richtigkeit (`isCorrect`-Eigenschaft) und der Erklärungen bleibt dabei zu 100 % erhalten.
- **Zielgruppe:** Mediengestalter-Prüflinge, die echtes Fachwissen trainieren wollen anstatt sich bloße Antwort-Positionen (A/B/C/D) zu merken.

---

### 2. User Experience & Visual Design

- **Echtes Lerneffekt-Training:**
  - Jede Quiz-Frage präsentiert ihre 2 bis 4 Antwortmöglichkeiten in wechselnder Reihenfolge.
  - Tastatur-Shortcuts (1, 2, 3, 4) in der `QuizCard` greifen dynamisch auf die gemischte Reihenfolge zu.
- **Konsistenz im Simulator:**
  - Wenn ein Prüflung den IHK-Prüfungs-Simulator neu startet, stehen die Antwort-Optionen an anderen Positionen als im vorherigen Versuch.

---

### 3. Key Product Decisions & Trade-Offs

- **Entscheidung: Clientseitiges Shuffling vor dem Rendern**
  - *Gewählter Ansatz:* Die Rohdaten in `chaptersData.ts` und `examQuestions.ts` bleiben sauber geordnet (für einfache Wartbarkeit). Das Mischen erfolgt beim Erstellen der Fragen-Arrays via `useMemo` oder `shuffleArray`.
  - *Warum:* Verhindert inkonsistente Quellcode-Dateien und stellt sicher, dass jeder Neustart automatisch frische Optionen generiert.

---

### 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│            Original Quiz Question (Data)               │
│  options: [Correct, Wrong1, Wrong2, Wrong3]            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│          shuffleArray(options) Helper                  │
│  - Vertauscht Reihenfolge zufällig                     │
│  - Bewahrt isCorrect & explanation Eigenschaft         │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               Rendered Quiz Component                  │
│  options: [Wrong2, Correct, Wrong3, Wrong1]            │
└────────────────────────────────────────────────────────┘
```

#### Anzupassende Dateien & Stellen:
1. `src/utils/learningLogic.ts`: Zentrale Hilfsfunktion `shuffleArray<T>(arr: T[]): T[]` bereitstellen.
2. `src/utils/blitzContent.ts` (`buildCustomMixPool`): `options: shuffleArray(q.options)` beim Zusammenstellen der Mix-Up-Fragen anwenden.
3. `src/components/ExamSimulatorView.tsx`: `shuffledQuestions` mit gemischten Optionen vor dem Start initialisieren.
4. `src/components/InteractiveMinigames/SpeedQuizGame.tsx`: `options: shuffleArray(q.options)` in `restartGame` anwenden.
5. `src/components/InteractiveMinigames/BossRaidGame.tsx`: `options: shuffleArray(q.options)` in `restartGame` anwenden.
6. `src/components/InteractiveMinigames/WisoDuelGame.tsx`: `options: shuffleArray(c.options)` in `WISO_CASES` verarbeiten.
7. `src/components/InteractiveMinigames/GraphicsFormatGame.tsx`: `options: shuffleArray(t.options)` verarbeiten.
8. `src/components/FocusSprintModal.tsx`: `options: shuffleArray(q.options)` beim Generieren der Sprint-Fragen anwenden.
