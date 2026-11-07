# Audit, Logikprüfung & Interaktiver Asset-Viewer für IHK-Originalprüfungen (Kapitel 1–11)

Umfassendes Audit der gesamten Anwendung auf Vollständigkeit, logische Beantwortbarkeit, konsistente Menüs und Integration eines interaktiven Asset-Viewers für alle visuellen Prüfungsaufgaben (Histogramme, Gradationskurven, TAC-Diagramme, PPI-Rechenschemata).

## User Review & Critical Decisions

> [!IMPORTANT]
> Bestätigte Entscheidungen aus der Nutzerbefragung (Phase 1):
> - **Prüfungsbereich**: Gesamte App inklusive aller 11 IHK-Kapitel, Prüfungs-Simulator, Spickzettel und Wissensstatistik wird vollständig geprüft.
> - **Asset-Darstellung**: Aufgaben-Assets (Grafiken, Tabellen, Gradationskurven, Histogramme) werden als **interaktiver Asset-Viewer** mit Inline-Einblendung und vergrößerbarem Bild-Modal direkt bei den Quizfragen integriert.

- **Bestätigte Entscheidung 1**: Vollständiges Audit aller 11 Kapitel (inkl. 12 IHK-Originalaufgaben in Kapitel 11).
- **Bestätigte Entscheidung 2**: Erweiterung des Quiz-Systems (`QuizQuestion`) um ein strukturiertes `asset`-Feld und Erstellung von `QuestionAssetWidget.tsx` sowie `AssetViewerModal.tsx`.

---

## 1. Overview & Core Concept

- **What It Does**: 
  1. Ergänzt visuelle Assets für alle relevanten IHK-Prüfungsfragen (insbesondere Histogramme, Gradationskurve Tunnel, TAC-Farbaufträge 240% vs 300%, PPI-Skizzen, Farbraum-Diagramme).
  2. Implementiert ein interaktives Asset-Widget in `QuizCard`, `ExamSimulatorView`, `DidacticMixUpView` und `QuestionDetailModal` mit Zoom- und Modal-Ansicht.
  3. Führt ein durchgängiges Logik-Audit durch: Aktualisierung aller Spickzettel-Vergleiche und Formeln für Kapitel 11, Prüfung der Fortschritts- & Statistikberechnungen für 11 Kapitel.
- **Target Audience**: IHK-Prüflinge für Mediengestaltung (Digital & Print), die sich mit Original-Prüfungsaufgaben optimal auf die Prüfung vorbereiten.
- **Key Value**: Nahtlose visuelle Verknüpfung von Prüfungsaufgaben mit Original-Grafiken sowie 100% konsistente Logik über alle App-Module.

---

## 2. User Experience & Visual Design

- **Visual Asset-Viewer & Modal Component**:
  - **Inline-Asset-Box**: Direkt unter dem Fragentext positioniert, mit subtiler Umrandung, Vorschau-Grafik/Tabelle und Lupe-Symbol (`ZoomIn`).
  - **Interaktiver Modal-Viewer**: Klick auf das Asset öffnet ein HD-Modal mit detaillierten Beschriftungen, Farbmesspunkten, Formelerklärungen und Zoom-Steuerung.
- **Visual Identity & Color Budget**:
  - *Canvas & Surfaces*: 60% dominantes Slate/Off-White (`#F8FAFC` / `#0F172A`), 30% strukturierte Karten und Container-Ränder.
  - *Accent*: 10% Indigo/Amber für Interaktionen und Formel-Highlights.
  - *Typography*: Strict 2-Font Discipline (`Plus Jakarta Sans` für UI, `tabular-nums` / Monospace für mathematische PPI- und Bit-Rechnungen).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dynamische SVG/Canvas/Data-Renderings für Original-Assets**:
  - *Chosen Approach*: Generierung präziser, gestochen scharfer Vektor-Renderings (z.B. Gradationskurve mit Kontrollpunkten, Histogramm mit Tonwertabriss, PPI-Gitter) anstelle von unscharfen externen Pixelbildern.
  - *Why*: Garantiert 100% Barrierefreiheit, perfekte Schärfe auf allen Bildschirmen und risikofreies Funktionieren im AI Studio Sandbox.
- **Decision 2: Spickzettel-Erweiterung für Kapitel 11**:
  - *Chosen Approach*: Ergänzung von 3 neuen Schnell-Vergleichen & Formelboxen in `SpickzettelView.tsx` für PPI-Berechnung ($1800\,\text{px} / (18\,\text{cm} / 2{,}54) = 254\,\text{ppi}$), Datentiefe ($2^8 = 256$ vs $2^{16} = 65.536$) und Gesamtfarbauftrag (TAC 240% vs 300%).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Quiz & Learning System                          │
├────────────────────────────────────────────────────────────────────────┤
│  QuizQuestion (with optional Asset: SVG Graph / Table / Blueprint)     │
│        │                                                               │
│        ├──► QuestionAssetWidget (Inline Preview & Zoom Button)        │
│        │          │                                                    │
│        │          └──► AssetViewerModal (HD Inspection & Explanations) │
│        │                                                               │
│        ├──► QuizCard / ExamSimulatorView / DidacticMixUpView           │
│        │                                                               │
│        └──► SpickzettelView & LearningStatsView (11 Chapters Audit)   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Data Model Updates (`src/types/quiz.ts`)**:
  ```ts
  export interface QuestionAsset {
    type: 'histogram' | 'gradationskurve' | 'ppi_blueprint' | 'tac_chart' | 'table' | 'diagram';
    title: string;
    subtitle?: string;
    description: string;
    svgContent?: string;
    tableData?: { headers: string[]; rows: (string | number)[][] };
    labels?: { x: string; y: string };
  }
  ```

- **Interactive Components to Create/Update**:
  1. `src/components/QuestionAssetWidget.tsx`: Rendering des Inline-Assets in der Frage.
  2. `src/components/AssetViewerModal.tsx`: Vergrößertes Modal mit Detail-Erklärungen.
  3. `src/data/ihkOriginalChapterData.ts` & `src/data/examQuestions.ts`: Verknüpfung der 12 IHK-Aufgaben mit ihren visuellen Assets.
  4. `src/components/SpickzettelView.tsx`: Hinzufügen der IHK-Original-Formeln & Vergleiche.
  5. `src/components/QuizCard.tsx`, `ExamSimulatorView.tsx`, `DidacticMixUpView.tsx`: Einbindung von `QuestionAssetWidget`.

---

## 5. Implementation Roadmap

1. **Phase 1: Types & Asset Viewer Components**:
   - Asset-Typen in `src/types/quiz.ts` definieren.
   - `QuestionAssetWidget.tsx` und `AssetViewerModal.tsx` entwickeln.
2. **Phase 2: Verknüpfung in IHK-Original-Daten**:
   - Original-Grafiken (Histogramm, Gradationskurve Tunnel, TAC 240%/300%, PPI-Skizze) in `ihkOriginalChapterData.ts` verknüpfen.
3. **Phase 3: Integration in Quiz-Views**:
   - In `QuizCard`, `ExamSimulatorView`, `DidacticMixUpView` und `QuestionDetailModal` einbinden.
4. **Phase 4: Spickzettel- & Logik-Audit**:
   - `SpickzettelView.tsx` um IHK-Formeln erweitern.
   - Verifizieren, dass Fortschritt und Statistiken über alle 11 Kapitel einwandfrei funktionieren.
5. **Phase 5: Verifizierung & Compilation**:
   - `compile_applet` & `lint_applet` ausführen.
