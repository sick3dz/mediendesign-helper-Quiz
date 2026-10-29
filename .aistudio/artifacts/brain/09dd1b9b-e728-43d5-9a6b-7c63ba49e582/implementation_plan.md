# Schlanke Kapitel-Navigation & Vereinheitlichte IHK-Buttons

Straffung der Benutzeroberfläche in `ChapterListView.tsx` und `TopBar.tsx`. Reduzierung der vertikalen Höhe, schlanke Kapitel-Navigation (`◀ Vorheriges`, `Kapitel-Übersicht`, `Nächstes ▶`) und vereinheitlichte 32px-Aktionsbuttons.

## User Review & Critical Decisions

> [!IMPORTANT] Das Layout wird nach unten hin deutlich schlanker gestaltet, damit die Lerneinheiten ohne langes Scrollen sofort im Blickfeld liegen.

- **Bestätigte Entscheidung 1 (Kapitel-Navigation)**: Kompakter Kopfbereich mit schnellen Navigations-Buttons (`◀ Vorheriges`, `Übersicht`, `Nächstes ▶`) und einer schlanken Themenliste.
- **Bestätigte Entscheidung 2 (IHK-Button-Design)**: Alle IHK-Buttons (IHK-Prüfung, Digital-Leitfaden, Quiz-Spiele) erhalten exakt dieselbe Höhe (32px / `h-8`), schlanke Ecken (`rounded-lg`) und abgestimmte Schriftgrößen (`text-xs font-semibold`).

---

## 1. Overview & Core Concept

1. **Kompakter Kapitel-Kopfbereich (`ChapterListView.tsx`)**:
   - Schlanke obere Leiste zur direkten Kapitel-Umschaltung: `◀ Vorheriges`, `Kapitel X von 7`, `Nächstes ▶`.
   - Kurze Themen-Übersicht für das ausgewählte Kapitel mit klarem Fortschritt.
   - Kein überladener Textaufbau nach unten hin.

2. **Vereinheitlichte IHK-Buttons (`TopBar.tsx` & `ChapterListView.tsx`)**:
   - `IHK-Prüfung`, `Digital-Leitfaden` und `Quiz-Spiele` teilen sich einheitliche Maße: `h-8 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5`.
   - Beseitigt unterschiedlich dicke oder ungleich geformte Buttons.

---

## 2. User Experience & Visual Design

- **Keine vertikale Überladung**: Reduzierte Margins (`py-2`, `gap-3` statt `gap-6` / `p-7`), damit Themenkarten sofort sichtbar sind.
- **Flüssiges Kapitel-Switching**: Nutzer können mit einem Klick zum nächsten oder vorherigen Kapitel springen.

---

## 3. Key Product Decisions & Trade-Offs

- **Schlanke Themenkarten**: Reduzierte Padding-Höhen der Module, direkte Anzeige von Status (Erledigt / Offen) und Dauer.
- **Konsistenter TopBar-Contract**: Alle primären Navigationselemente fügen sich harmonisch auf einer einheitlichen 32px-Höhenlinie ein.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────┐
│                             TopBar                               │
│  [Wordmark]   [Lernen | Leitfaden | IHK-Prüfung | Quiz-Spiele]   │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                      ChapterListView                             │
│   [ ◀ Vorheriges ]   [ Kapitel 1: IxD ]   [ Nächstes ▶ ]         │
│   ────────────────────────────────────────────────────────────   │
│   • Modul 1: Grundbegriffe (10 Min)           [ Starten ]        │
│   • Modul 2: Affordance & Signifier (8 Min)   [ Starten ]        │
└──────────────────────────────────────────────────────────────────┘
```

- **Dateien**:
  - `src/components/TopBar.tsx`: Vereinheitlichung der Navigations-Buttons auf `h-8`.
  - `src/components/ChapterListView.tsx`: Neuer schlanker Kapitel-Header mit Navigation und komprimierter Modulliste.
