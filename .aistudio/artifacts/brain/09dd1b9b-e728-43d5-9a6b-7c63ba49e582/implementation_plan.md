# Implementierungsplan: Modul-Zusammenfassung & Level 2 Schnellstart

Einführung einer kompakten Wissens-Zusammenfassung nach Abschluss von Level 1 eines Moduls sowie Anzeige des Buttons **"📋 Zusammenfassung lesen"** bei allen absolvierten Modulen in der Kapitelliste.

## Proposed Changes

### 1. `ModuleLearningView.tsx` - Abschluss-Screen mit Zusammenfassung
- Nach erfolgreichem Abschluss von Level 1 eines Moduls wird ein **Modul-Abschluss- & Zusammenfassungs-Bildschirm** angezeigt.
- **Inhalte des Abschluss-Bildschirms**:
  - Belohnung & EXP-Gutschrift.
  - **IHK-Kompakt-Wissen / Spickzettel-Zusammenfassung**: Kern-Merksätze und wichtigste IHK-Prüfungsfakten des Moduls auf einen Blick.
  - Buttons: **"Schließen / Zurück zur Übersicht"** und **"⚡ Level 2 Experten-Runde starten"**.

### 2. `ChapterListView.tsx` - Modul-Aktionen in der Kapitelliste
- Wenn ein Modul Level 1 bereits abgeschlossen hat (`completedModules.includes(mod.id)`):
  - Statt des einfachen "Level 1 wiederholen"-Buttons werden zwei klare Option-Buttons angezeigt:
    - **"📋 Zusammenfassung"**: Öffnet direkt die Kompakt-Zusammenfassung des Moduls.
    - **"⭐ Level 2 starten"**: Startet direkt den Experten-Modus (Level 2).

### 3. Modul-Zusammenfassungs-Modal (`ModuleSummaryModal.tsx`)
- Erstellung einer wiederverwendbaren Ansicht (`ModuleSummaryModal`), die sowohl direkt nach Modulabschluss als auch per Klick aus der Kapitelliste geöffnet werden kann.

## Verification Plan

### Automated Tests & Linting
- `lint_applet` (`tsc --noEmit`) ausführen, um Typen und Syntax zu validieren.
- `compile_applet` ausführen, um den Vite-Build sicherzustellen.

### Manual Verification
- Ein Modul auf Level 1 abschließen und prüfen, dass die Wissens-Zusammenfassung mit Schließen-Button und Level 2 Start-Button erscheint.
- Zur Kapitelliste navigieren: Bei absolvierten Modulen den Button **"📋 Zusammenfassung"** anklicken und prüfen, dass die Zusammenfassung sofort öffnet.
- Button **"⭐ Level 2"** anklicken und prüfen, dass direkt Level 2 (Mini-Challenge / Quiz) startet.
