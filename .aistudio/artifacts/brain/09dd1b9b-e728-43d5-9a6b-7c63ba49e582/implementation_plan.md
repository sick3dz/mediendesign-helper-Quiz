# Implementation Plan: Vollständige 7-Seiten Aufschlüsselung von Kapitel 12 im IHK Digital-Leitfaden

1-2 prägnante Sätze: Dieser Umsetzungsplan beschreibt die lückenlose Detaillierung von **Kapitel 12** im **IHK Digital-Leitfaden**, sodass alle 7 Skriptseiten von Christoph Schulze (DIN 69901 Projektmerkmale, Tuckman 4+1 Teamentwicklung mit Führungsmatrix, DIN 69901-2 Phasenmodell, Scope Creep Schutz und nachhaltige Lessons Learned) samt einer strukturierten Führungs- & Phasenübersichtstabelle vollständig nachgeschlagen werden können.

---

## User Review & Critical Decisions

> [!IMPORTANT] Bestätigte Entscheidungen aus der Nutzerabklärung:
> - **Entscheidung 1 (Detaillierungsgrad)**: Alle 7 Original-Skriptseiten von Christoph Schulze werden im Leitfaden als 7 eigenständige, tiefgehende IHK-Schlüsselkonzepte aufbereitet.
> - **Entscheidung 2 (Übersichtstabellen)**: Integration einer strukturierte Tuckman-Führungsstile-Matrix sowie einer DIN 69901-2 Phasen-Vergleichstabelle im Leitfaden.

---

## 1. Overview & Core Concept

- **Was es tut**: Der IHK Digital-Leitfaden wird für Thema 12 von bisher 5 allgemeinen Zusammenfassungen auf 7 dezidierte, prüfungsrelevante Schlüsselkonzepte (1:1 entsprechend den 7 Skriptseiten von Christoph Schulze) aufgestockt. Zuzüglich wird eine interaktive Übersichtstabelle für Führungsstile und Phasenvergleiche bereitgestellt.
- **Zielgruppe**: Mediengestalter Digital & Print, die im Prüfungs-Spickzettel ein exaktes, verlässliches Nachschlagewerk für alle 7 Skriptseiten und IHK-Spezifika benötigen.
- **Mehrwert**: 100%ige Abdeckung des Skripts ohne Informationsverlust; ermöglicht schnelles Nachschlagen von Führungsaufgaben, DIN-Prüfungsfallen und Formeln.

---

## 2. User Experience & Visual Design

- **7 Detaillierte Schlüsselkonzepte in `digitalGuideData.ts`**:
  1. **Seite 1: DIN 69901 Projektdefinition & Abgrenzung zur Routine**: Die 7 konstitutiven Merkmale (Zielvorgabe, Neuartigkeit, Einmaligkeit, Komplexität, Befristung, begrenzte Ressourcen, Risiko) und 3 Ressourcenarten.
  2. **Seite 2: Tuckman Phase 1 Forming & Scheinharmonie**: Abtasten, Höflichkeitsphase, Orientierungsbedürfnis, Führungsaufgabe: klare Ziele & Rollen setzen, Warnung vor Scheinharmonie.
  3. **Seite 3: Tuckman Phase 2 Storming & Phase 3 Norming**: Konflikte, Streitkultur, Führungsaufgabe Storming (Moderation & Klärung); Spielregeln, Wir-Gefühl, Führungsaufgabe Norming (Loslassen, Vertrauen, Gefahr des Micromanagements).
  4. **Seite 4: Tuckman Phase 4 Performing & Phase 5 Adjourning (1977)**: Flow, Synergie, Rückfall-Falle bei Teamänderungen, Servant Leadership; Adjourning 1977, emotionale Ambivalenz & bewusster Projektabschluss.
  5. **Seite 5: DIN 69901-2 Die 5 PM-Phasen & Initialisierung**: Unterschied PM-Phasen vs. Fachliche Phasen, Fehler des verfrühten Starts mit Facharbeit, Phase 1 Initialisierung (Anlass, Nutzen, Machbarkeit & Frage nach dem OB).
  6. **Seite 6: DIN 69901-2 Definition, Planung & Steuerung**: Nicht-Ziele als Scope Creep Schutz, Projektstrukturplan (PSP) als Fundament & Messbasis, Soll-Ist-Controlling & Ergebnisabnahme in der Steuerung.
  7. **Seite 7: DIN 69901-2 Abschluss & der geschlossene Kreislauf**: Die 4 Säulen des Abschlusses (Bericht, Nachkalkulation, Archiv, Lessons Learned), Auffindbarkeit & Nutzbarkeit, zirkulärer Erfahrungstransfer zurück zur Initialisierung.

- **Strukturierte IHK-Vergleichstabelle (Table Asset)**:
  - Integration eines zusätzlichen Table-Assets in `digitalGuideData.ts` mit der **Tuckman Führungsmatrix** (Phase | Team-Dynamik | Führungsstil & Hauptaufgabe | IHK-Falle).

---

## 3. Key Product Decisions & Trade-Offs

- **Strukturierte 1:1 Abbildung der 7 Skriptseiten**:
  - *Gewählter Ansatz*: Erweiterung des `keyConcepts`-Arrays in Thema 12 von 5 auf 7 lückenlose Kernkonzepte, die exakt den Skriptseiten 1 bis 7 von Christoph Schulze entsprechen.
  - *Warum*: Stellt sicher, dass kein einziges Detail aus dem Unterrichtsskript im Nachschlagewerk fehlt.
- **Tuckman Führungsmatrix als Table-Asset**:
  - *Gewählter Ansatz*: Nutzung des bestehenden `TableGraphic`-Formats in `AssetViewerModal` / `QuestionAssetWidget`, um Führungsstile übersichtlich darzustellen.

---

## 4. Technical Architecture & Data Strategy

```
┌───────────────────────────────────────────────────────────────────────────┐
│                    DIGITAL GUIDE DATA (digitalGuideData.ts)               │
│                                                                           │
│  [Thema 12: Projektphasen & Projektmanagement (DIN 69901 & Tuckman)]      │
│  ├── Asset: DIN 69901-2 PM-Kreislauf (type: 'pm_cycle')                  │
│  ├── Table Asset: Tuckman Führungsmatrix (type: 'table')                 │
│  └── 7 Key Concepts (Exakte 1:1 Entsprechung zu Skript-Seiten 1 bis 7)    │
│      ├── 1. DIN 69901 (7 Merkmale & Routine-Abgrenzung)                   │
│      ├── 2. Forming & Scheinharmonie (Führung: Orientierung)              │
│      ├── 3. Storming & Norming (Führung: Moderation & Vertrauen)         │
│      ├── 4. Performing & Adjourning (Führung: Servant Leadership)          │
│      ├── 5. DIN 69901-2 PM-Phasen & Initialisierung (Frage nach OB)       │
│      ├── 6. Definition, Planung & Steuerung (Nicht-Ziele & Abnahme)      │
│      └── 7. Abschluss & DIN-Kreislauf (Lessons Learned Nutzbarkeit)       │
└───────────────────────────────────────────────────────────────────────────┘
```

### Auszuführende Schritte:
1. **`src/data/digitalGuideData.ts`**:
   - Aktualisierung von Thema 12 mit allen 7 lückenlosen Schlüsselkonzepten für Seiten 1–7.
   - Hinzufügen der Tuckman-Führungsstil-Tabelle in `keyConcepts`.
2. **Build- & Linter-Prüfung**:
   - Ausführen von `compile_applet` und `lint_applet`.
