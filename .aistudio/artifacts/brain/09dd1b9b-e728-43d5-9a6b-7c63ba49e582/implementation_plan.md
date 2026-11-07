# NEU-Badges (✦ IHK-Original Update) & Erhalt des Erledigt-Status

Sicherstellen, dass bereits abgeschlossene Module und Kapitel ihren "Erledigt"-Status behalten (auch wenn neue Fragen oder Kapitel wie Kapitel 11 hinzugefügt werden) und gleichzeitig neu hinzugefügte Inhalte mit einem auffälligen **"✦ IHK-Original Update"**-Badge gekennzeichnet werden.

## User Review & Critical Decisions

> [!IMPORTANT]
> Bestätigte Entscheidungen aus der Nutzerbefragung (Phase 1):
> - **Kennzeichnung von Neuem**: Neu hinzugefügte Kapitel (z.B. Kapitel 11) und Module erhalten ein auffälliges **"✦ IHK-Original Update"**-Badge in der Navigation und Modulliste.
> - **Erhalt des Erledigt-Status**: `stats.completedModules` speichert abgeschlossene IDs. Das Hinzufügen neuer Unterfragen oder Kapitel beeinträchtigt den bestehenden Abschlussstatus bereits absolvierter Module nicht.

- **Bestätigte Entscheidung 1**: Markierung von Kapitel 11 und den zugehörigen Modulen mit dem `✦ IHK-Original Update` Badge.
- **Bestätigte Entscheidung 2**: Anzeige von neuen Fragen innerhalb von Modulen mit einem dezenten "Neu"-Indikator im Quiz-Fortschritt.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Ergänzt ein klares **"✦ IHK-Original Update"** Badge für Kapitel 11 und spezifische Originalmodule.
  2. Garantiert, dass der grüne Häkchen-Status (`✓ Lvl 1 erledigt`) für alle zuvor gelösten Module intakt bleibt, selbst wenn neue Level-1 oder Level-2 Fragen dazukommen.
  3. Ermöglicht Nutzern, gezielt zu erkennen, welche Inhalte frisch hinzugekommen sind.
- **Target Audience**: IHK-Prüflinge, die ihren Lernstand genau verfolgen und sofort sehen möchten, wo neue Originalprüfungsaufgaben bereitstehen.

---

## 2. User Experience & Visual Design

- **Badge Styling**:
  - `bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 animate-pulse`: Verwendet für das "✦ IHK-Original Update" Badge bei Kapitel 11.
  - Subtiler `✦ Neu`-Indikator an Fragen oder Modulen, die kürzlich erweitert wurden.
- **Erledigt-Status Schutz**:
  - Ein Modul gilt als abgeschlossen, wenn seine ID in `stats.completedModules` verzeichnet ist. Zusätzliche Fragen (z.B. in Kapitel 11 oder Erweiterungen) erlauben das erneute Durchlaufen für Bonuspunkte und EXP, ohne den erreichten Haken zu löschen.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Explizites Update-Badge für Kapitel 11**:
  - *Chosen Approach*: Hinzufügen des `isNewUpdate: true` Flags oder Erkennung über `chapter.number === 11` zur Anzeige des violetten "✦ IHK-Original Update" Badges.
  - *Why*: Macht sofort transparent, dass dieses Kapitel auf den echten IHK-Prüfungsbogen-Seiten 1–5 basiert.
- **Decision 2: Trennung von Abschluss und Fragen-Pool**:
  - *Chosen Approach*: `stats.completedModules` ist idempotent; das Hinzufügen neuer Fragen ändert den Status von `completedModules` nicht, sodass Lernfortschritte nie verloren gehen.

---

## 4. Technical Architecture & Data Strategy

- **Updated Files**:
  1. `src/data/chaptersData.ts` & `src/data/ihkOriginalChapterData.ts`: Kennzeichnung von Kapitel 11 als Original-Update.
  2. `src/components/ChapterListView.tsx`: Rendering des "✦ IHK-Original Update" Badges in der Kapitel-Grid-Ansicht und Modulliste.
  3. `src/components/QuizCard.tsx`: Anzeige des Updates bei frisch hinzugefügten Fragen.

---

## 5. Implementation Roadmap

1. **Phase 1: Update-Flag & Kapitel-Badge**:
   - Ergänzung des Badges in `ChapterListView.tsx` für Kapitel 11 und neuere Module.
2. **Phase 2: Status-Integrität verifizieren**:
   - Sicherstellen, dass `stats.completedModules` beim Hinzufügen von Fragen unverändert bleibt.
3. **Phase 3: Compilation & Build**:
   - Ausführen von `compile_applet` & `lint_applet`.
