# Prüfungs-Checkliste: Ausführliches IHK-Themen-Dossier (Modal & Deep-Dive)

Detaillierte Wissensvertiefung für jeden Prüfstein der Prüfungs-Checkliste („Absolut kritische IHK-Themen“) über ein fokussiertes modales Info-Fenster mit IHK-Musterdefinitionen, konkreten Agentur-Praxisbeispielen, typischen Prüfungsfragen samt Musterlösungen, Prüfer-Warnungen und einem direkten Absprung ins entsprechende Lernmodul.

## User Review & Bestätigte Entscheidungen

> [!IMPORTANT]
> Alle 3 Kernentscheidungen wurden im Klärungsinterview mit dem Nutzer verbindlich abgestimmt:

- **Modales Info-Fenster**: Die ausführlichen Themen-Infos öffnen sich per Klick auf einen prominenten Button („Ausführliches Themen-Dossier öffnen“) als fokussiertes modales Dialogfenster mit strukturierter Detailansicht.
- **Inhaltliche 4-Säulen-Struktur**:
  1. *Wichtige IHK-Schlagwörter & Definition*: Präzise, normgerechte Fachbegriff-Erklärung.
  2. *Konkretes Praxisbeispiel*: Reale Agentur-/Projekt-Situation zur Veranschaulichung.
  3. *Typische IHK-Prüfungsfrage & Musterantwort*: Authentische Prüfungsaufgabe mit vollständiger Punkte-Musterlösung.
  4. *IHK-Prüfer-Warnung*: Aufdeckung verbreiteter Denkfehler und typischer Punktabzüge.
- **Direktlink zum Lernmodul**: Am Fuß des Modals befindet sich ein Call-to-Action-Button, der den Nutzer direkt in das passende interaktive Lernmodul weiterleitet.

---

## 1. Übersicht & Kernkonzept

- **Was es tut**: Lernende können in der Prüfungs-Checkliste jedes kritische IHK-Thema aufklappen und mit einem Klick das vollständige „IHK-Themen-Dossier“ als modales Overlay aufrufen. Dadurch wird die Checkliste vom reinen Stichpunkt-Merker zum vollwertigen Prüfungskompendium.
- **Zielgruppe**: Angehende Mediengestalter Digital & Print / Digitalexperten in der Prüfungsvorbereitung (Abschlussprüfung Teil 1 & Teil 2).
- **Mehrwert**: Kein langes Suchen mehr – direkter Zusammenhang zwischen Checklisten-Prüfstein, Theorie, Praxisbeispiel, konkreter IHK-Frage und Lernmodul.

---

## 2. User Experience & Visual Design

### User Flow
```
[Checkliste: Prüfstein antippen]
            │
            ▼
[Item klappt auf mit Kurzbeschreibung & IHK-Master-Tipp]
            │
            ▼
[Button: "Ausführliches Themen-Dossier öffnen ➔"]
            │
            ▼
[Modal öffnet sich: 4 strukturierte Inhaltsbereiche]
 ├── 1. IHK-Schlagwörter & Kern-Definition
 ├── 2. Praxisbeispiel aus dem Agenturalltag
 ├── 3. IHK-Prüfungsfrage mit Musterantwort
 └── 4. IHK-Prüfer-Warnung (Typische Denkfehler)
            │
     ┌──────┴────────────────────────┐
     ▼                               ▼
[Modal schließen]        [Button: "Direkt zum Lernmodul ➔"]
```

### Visuelle Gestaltung & Layout (Frontend-Design-Richtlinien)
- **Modales Dialogfenster**:
  - Zentriertes Overlay mit sanftem Backdrop-Blur (`backdrop-blur-sm bg-slate-950/60`).
  - Maximale Breite `max-w-2xl` auf Desktop, responsives Sheet mit vollem Viewport-Padding auf Mobilgeräten.
  - Klares Schließen über `ESC`-Taste, Klick außerhalb des Modals oder den oberen `✕`-Button.
- **Typografie & Farbcodierung**:
  - Überschriften mit klarem Kontrast (`text-slate-900 dark:text-white font-extrabold`).
  - Farbliche Akzentuierung der 4 Sektionen:
    - *Definition*: Indigoblau (`bg-indigo-50/70 border-indigo-200 text-indigo-900`)
    - *Agentur-Praxis*: Smaragdgrün (`bg-emerald-50/70 border-emerald-200 text-emerald-900`)
    - *IHK-Prüfungsfrage & Antwort*: Schiefergrau/Violett mit Zitatblock
    - *Prüfer-Warnung*: Bernstein/Amber (`bg-amber-50/70 border-amber-200 text-amber-900`)
- **Zero-Pill-Disziplin**: Keine dekorativen Pill-Inseln; stattdessen klare hierarchische Überschriften und Icons mit Text-Labels.

---

## 3. Technische Architektur & Datenmodell

### Datenmodell-Erweiterung (`src/types/quiz.ts`)
```typescript
export interface ChecklistDetailInfo {
  definition: string;
  keywords: string[];
  practicalExample: {
    context: string;
    application: string;
  };
  examQuestion: {
    questionText: string;
    points: number;
    sampleAnswer: string;
    scoringCriteria: string[];
  };
  examinerWarning: string;
  relatedModuleId?: string;
  relatedModuleName?: string;
}

export interface ChecklistItem {
  task: string;
  detail: string;
  moreInfo?: ChecklistDetailInfo;
}
```

### Komponenten-Hierarchie
```
┌────────────────────────────────────────────────────────┐
│ ChapterListView                                        │
│  └── Prüfungs-Checkliste ("Absolut kritische Themen") │
│       └── Checklist-Item (Expanded Card)               │
│            └── [Button: "Ausführliches Dossier öffnen"]│
└───────────────────────────┬────────────────────────────┘
                            │ (öffnet State)
                            ▼
┌────────────────────────────────────────────────────────┐
│ ChecklistDetailModal                                   │
│  ├── Header: Prüfstein-Titel & Kapitel-Badge           │
│  ├── Sektion 1: IHK-Schlagwörter & Definition          │
│  ├── Sektion 2: Praxisbeispiel aus der Agentur         │
│  ├── Sektion 3: IHK-Prüfungsfrage & Musterlösung       │
│  ├── Sektion 4: Prüfer-Warnung vor Denkfehlern         │
│  └── Footer: [Direkt zum Lernmodul] + [Schließen]      │
└────────────────────────────────────────────────────────┘
```

---

## 4. Umsetzungsschritte

1. **Typdefinitionen erweitern (`src/types/quiz.ts`)**:
   - `ChecklistDetailInfo` Schnittstelle definieren und optional in `ChecklistItem` einbinden.
2. **Daten anreichern (`src/data/chaptersData.ts`)**:
   - Für die Prüfsteine in allen Kapiteln (IxD, Wireframing, Prototyping, IT-Sicherheit, Accessibility, Projektmanagement, etc.) tiefgehende, praxiserprobte IHK-Dossiers mit Definition, Praxisbeispiel, IHK-Frage/Musterantwort, Prüferwarnung und passendem `relatedModuleId` hinterlegen.
   - Fallback-Generierung bereitstellen, damit ausnahmslos jeder Prüfstein ein vollständiges Dossier besitzt.
3. **Modalkomponente erstellen (`src/components/ChecklistDetailModal.tsx`)**:
   - Barrierefreies Modal mit sauberem Fokus-Management, Keyboard-Listener (`Escape`), Bionic-Reading-Unterstützung und flüssigen Übergängen.
4. **Verdrahtung in `ChapterListView.tsx`**:
   - State `selectedChecklistDetail: { chapter: Chapter; item: ChecklistItem } | null` einbinden.
   - In jedem aufklappbaren Checklisten-Eintrag den Button zur Detailansicht ergänzen.
   - Absprung zum Lernmodul über den bestehenden Callback `onSelectModule(chapterId, moduleId)` verbinden.
5. **Verifikation**:
   - `lint_applet` & `compile_applet` ausführen und Build validieren.
