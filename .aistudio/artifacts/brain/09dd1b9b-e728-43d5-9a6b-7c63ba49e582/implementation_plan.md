# Flexibler 'Mix-Up Mix' (Fokus auf thematische Modul-Auswahl)

Ein neuer Button und ein dediziertes Auswahlfenster neben dem Wiederholungs-Quiz in `ChapterListView`. Das Fenster konzentriert sich voll auf die thematische Auswahl von Modulen und Kapiteln (ohne Fragenanzahl-Regler). Für alle gewählten Themen wird der bewährte didaktische Mix aus Wissensvermittlung und bis zu 2 passenden Fragen durchlaufen.

## User Review & Critical Decisions

> [!IMPORTANT]
> Folgende Anpassungen wurden basierend auf deinem Feedback eingearbeitet:
> - **Kein Fragenanzahl-Wähler**: Die künstliche Begrenzung (10/15/20 Fragen) entfällt. Das Fenster konzentriert sich rein auf die inhaltliche Themen-Auswahl.
> - **Themen-Fokus im extra Fenster**: Übersichtliche Modul- und Kapitel-Auswahl mit Checkboxen, Schnellauswahl ganzer Kapitel und "Alle auswählen / Auswahl aufheben".
> - **Didaktischer Ablauf pro Thema**: Jedes ausgewählte Modulthema wird mit seiner Wissenskarte (Kernkonzept, Stichpunkte & Merksatz) eingeleitet, gefolgt von bis zu 2 passenden IHK-Fragen, bevor das nächste gewählte Thema folgt.

---

## 1. Overview & Core Concept

- **Platzierung**: Direkt in der oberen Aktionsleiste von `ChapterListView` neben dem *„Wiederholungs-Quiz (Fokus auf Fehler)“*.
- **Themen-Auswahlfenster (`MixUpConfigModal`)**:
  - Zeigt alle 8 IHK-Kapitel übersichtlich strukturiert an.
  - Ermöglicht das An- und Abwählen ganzer Kapitel mit einem Klick.
  - Ermöglicht das Aufklappen jedes Kapitels zur gezielten Auswahl spezifischer Modulthemen (z. B. nur *Affordance & Signifier* und *Gestaltgesetze*).
  - Schnellauswahl-Buttons: *„Alle Themen auswählen“* und *„Auswahl leeren“*.
  - Statusanzeige: Zeigt z. B. *„6 Themen ausgewählt“*.
  - Primärer Start-Button: `🔀 Mix-Up starten (6 Themen)`.
- **Lern-Erlebnis**: 
  - Die ausgewählten Modulthemen werden in abwechslungsreicher Reihenfolge durchlaufen.
  - Für jedes gewählte Thema: Zuerst der didaktische Wissensbaustein (*„Wissen verstanden – Zu den Fragen →“*), danach 1 bis 2 zugehörige Fragen.
  - Am Ende: Zusammenfassung, Erfolgsquote und EXP-Gutschrift.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Einstieg**: Klick auf `🔀 Mix-Up Mix (Themen wählen)` in der Kapitelansicht.
2. **Themen im Fenster auswählen**:
   - Nutzer wählt z. B. ganzes *Kapitel 1: Interaktionsdesign* und aus *Kapitel 4* gezielt *Phishing-Erkennung*.
   - Die Box zeigt sofort die Anzahl der gewählten Themen.
   - Klick auf `Mix-Up starten`.
3. **Didaktischer Ablauf**:
   - Für jedes gewählte Modulthema:
     1. Wissenskarte mit Bionic Reading, Kernbegriffen & Prüfer-Merksatz.
     2. Per Klick weiter zu den 1 bis 2 Prüfungsfragen dieses Themas.
4. **Abschluss**:
   - Detaillierte Auswertung (Richtig/Falsch-Quote aller gewählten Themen, verdiente EXP).

### Visuelle Leitlinien (Zero-Pill & Anti-Slop)
- Klare, aufgeräumte Checkbox-Listen mit Kapitel-Icons und Modul-Titeln.
- Kein visueller Ballast oder überflüssige Schieberegler.
- Primärer Button hebt sich in edlem Indigo/Violett hervor.

---

## 3. Key Product Decisions & Trade-Offs

- **Entscheidung 1: Reiner Fokus auf Themenauswahl im Fenster**:
  - *Gewählter Ansatz*: Statt Zeitlimits oder Fragenanzahl zu konfigurieren, entscheidet der Lernende rein inhaltlich: *„Welche Themen möchte ich heute trainieren?“*
  - *Warum*: Entspricht exakt deinem Wunsch („statt Fragenanzahl Modul Themen auswahl im extra fenster“) und reduziert kognitiven Ballast bei ADHS.
- **Entscheidung 2: 1:1 Kopplung von Wissen & Fragen**:
  - *Gewählter Ansatz*: Alle ausgewählten Module werden als didaktische Paare (Wissen + bis zu 2 Fragen) durchlaufen.
  - *Warum*: Garantiert tiefes Verständnis und direkten Praxistest.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   ChapterListView.tsx                  │
│  - Button: [Wiederholungs-Quiz] [🔀 Mix-Up Mix]        │
│  - State: isMixUpModalOpen (boolean)                   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  MixUpConfigModal.tsx                  │
│  - Kapitel- & Modul-Themen-Auswahl (Checkboxen)        │
│  - "Alle auswählen" / "Leeren"                         │
│  - Start-Button: onStartMixUp(selectedModuleIds)       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                        App.tsx                         │
│  - Generiert Sequenz für ausgewählte Modulthemen       │
│  - [Wissen Modul 1] -> [Q1] -> [Q2] -> [Wissen Modul 2]│
│  - Auswertung & EXP-Gutschrift nach Abschluss          │
└────────────────────────────────────────────────────────┘
```

### Komponenten & Schnittstellen
1. **`src/components/MixUpConfigModal.tsx`**: Neues Modal mit intuitiver Themen- und Modulauswahl.
2. **`src/components/ChapterListView.tsx`**: Neuer Button zum Öffnen des Themen-Fensters.
3. **`src/App.tsx`**: Verwaltung der Mix-Up Session mit den gewählten Modulthemen.
