# Passiver Fokus-Timer: Nahtlose Modul-Navigation & Hintergrund-Lernen

Der passive Fokus-Timer wird so überarbeitet, dass Lernende direkt nach dem Starten oder Schließen des Timer-Fensters ohne störende Rückfrage-Dialoge in allen Lernmodulen und Kapiteln weiterlernen können, während der Timer präzise im Hintergrund weiterläuft.

## User Review & Critical Decisions

> [!IMPORTANT]
> Basierend auf deinen Antworten in Phase 1 wurden folgende Kernentscheidungen für den Ablauf festgelegt:

- **Confirmed Decision 1 (Timer-Start)**: Beim Klick auf „Fokus-Timer Starten“ schließt sich das große Modal sofort automatisch (Auto-Minimierung), sodass der Lernbereich mit Modulen, Quizzen und Flashcards sofort bedienbar ist.
- **Confirmed Decision 2 (Schließen ohne Rückfrage)**: Der Schließen-Button (X) sowie die Tastatur-/Klick-Ereignisse schließen das Fenster im passiven Modus augenblicklich ohne Rückfrage („Sprint wirklich beenden?“). Der Timer läuft ununterbrochen weiter.
- **Confirmed Decision 3 (Direkt-Navigation)**: Im Timer-Fenster wird ein prominenter Button „Zurück zur Lernübersicht“ integriert, der das Modal schließt und den Nutzer direkt zur Kapitel- und Modul-Lernübersicht bringt.
- **Confirmed Decision 4 (Sicherheit beim Abbrechen)**: Die Rückfrage zur Beendigung wird ausschließlich dann angezeigt, wenn der Nutzer ganz gezielt auf das rote Reset-/Abbrechen-Symbol klickt, niemals beim normalen Schließen oder Navigieren.

---

## 1. Overview & Core Concept

- **What It Does**: Ermöglicht eine ungestörte Lernsession nach dem Pomodoro-/Fokus-Prinzip. Nutzer starten den passiven Timer (3, 5, 10, 15 oder 25 Minuten) und können sich frei durch alle 8 IHK-Kapitel, Fachmodule, Prüfungsfragen und Spickzettel bewegen.
- **Target Audience / Persona**: IHK-Prüflinge (Mediengestaltung / Digital & Print / Konzeption & Visualisierung) und Lernende mit ADHS, die feste Zeitfenster zum konzentrierten Lernen benötigen, ohne durch blockierende Popups oder versehentliches Abbrechen frustriert zu werden.
- **Key Value**: Reibungsloser Flow zwischen Zeitüberwachung und aktivem Lernen. Die verbleibende Zeit ist stets im TopBar-Header, als dezentes Schwebefeld und im Browser-Tab (`⏱️ MM:SS`) sichtbar.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ TopBar: "Fokus" ] 
       │
       ▼
┌──────────────────────────────────────────────┐
│  Fokus-Sprint Modal (Passiv-Modus gewählt)   │
│  - Dauer wählen (z.B. 10m / 25m)             │
│  - Klick auf: "⏱️ Fokus-Timer JETZT STARTEN"  │
└──────────────────────┬───────────────────────┘
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
[ Auto-Minimieren ]        [ Modal manuell geöffnet ]
       │                               │
       │                   Klick auf: "Zurück zur Lernübersicht"
       │                               │
       ▼                               ▼
┌──────────────────────────────────────────────────────────┐
│  Lernansicht (Kapitel, Module, Didaktik, Prüfungen)      │
│  • TopBar zeigt Live-Zeit: [ ⏱️ 09:42 ]                   │
│  • Floating Mini-Badge unten rechts mit Puls-Indikator   │
│  • Tab-Titel aktualisiert: "⏱️ 09:42 • Fokus-Session"    │
│  • Keine blockierenden Fenster                           │
└──────────────────────────────────────────────────────────┘
```

1. **Starten & Weiterlernen**: Klickt der Nutzer im passiven Modus auf Start, wird der Timer aktiviert und das Modal schließt sich sofort sanft. Der Nutzer befindet sich direkt in der Modul-Übersicht und kann mit dem Lernen beginnen.
2. **Zwischendurch Öffnen**: Klickt der Nutzer in der TopBar auf den Timer-Button `⏱️ 09:42` oder auf das Schwebefeld unten rechts, öffnet sich das Fokus-Studio (z.B. um Hintergrundmusik zu wechseln oder die Zeit zu prüfen).
3. **Zurückkehren**: Ein Klick auf das X oder auf den Button „Zurück zur Lernübersicht“ schließt das Modal ohne Dialog. Der Timer läuft ohne Unterbrechung weiter.
4. **Session-Ende**: Bei Ablauf der Zeit ertönt der dezente Erfolgs-Jingle, Konfetti wird ausgelöst, EXP werden gutgeschrieben und eine Web-Notification informiert den Nutzer, falls er sich in einem anderen Tab befindet.

### Visual Identity & Theme

- **Farbpalette**:
  - Dominanter Canvas: `bg-slate-50 dark:bg-slate-950`
  - Timer-Fokus-Akzent: Warmes Indigo (`bg-indigo-600 text-white`) kombiniert mit subtilem Bernstein (`text-amber-500`) für Motivation.
  - Laufender Status: Dezent pulsierendes Smaragdgrün (`text-emerald-500`, `bg-emerald-500/10`) für „Fokus aktiv“.
- **Typografie & Zahlen**: Tabellarische Ziffern (`font-mono tabular-nums font-black`) für den Countdown, um nervöses Layout-Wackeln zu verhindern.
- **Barrierefreiheit & Dark Mode**: Vollständige Unterstützung von `@custom-variant dark`, mit hohem Kontrast (WCAG AA konform) auf allen Buttons und Cards.

---

## 3. Key Product Decisions & Trade-Offs

- **Trennung von Passiv-Timer und Aktivem Quiz-Sprint**:
  - *Chosen Approach*: Der passive Timer ist als reiner Begleiter zum freien Lernen gedacht. Deshalb darf das Schließen des Modals im Passiv-Modus niemals ein Bestätigungs-Popup auslösen. Im aktiven Quiz-Sprint (wo Fragen direkt im Modal beantwortet werden) warnt die App nur dann, wenn ein angefangenes 20-Einheiten-Quiz abgebrochen werden soll.
  - *Why*: Nutzer lernen in den eigentlichen App-Modulen (Kapitel 1–8), nicht im Modal. Ein blockierendes Modal widerspricht dem Konzept des passiven Lern-Begleiters.
- **Auto-Close beim Start im Passiv-Modus**:
  - *Chosen Approach*: `handleStartSprintNow` schließt das Modal automatisch, wenn `sprintMode === 'passive'`, sodass der Nutzer keinen separaten Klick machen muss, um mit dem Lernen loszulegen.
  - *Why*: Reduziert Reibung und Klicks um 50% und leitet den Lern-Flow sofort ein.
- **Explizite Abbruch-Schaltfläche**:
  - *Chosen Approach*: Ein Abbruch-Dialog erscheint nur noch bei gezielter Auswahl des Abbruch-Buttons (`Sprint beenden / zurücksetzen`), nicht beim bloßen Schließen des Fensters.

---

## 4. Technical Architecture & Component Structure

### Component Flow

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  - State: isSprintActive, sprintSecondsLeft, isDone    │
│  - Ref: sprintEndTimeRef (Echtzeituhr-Synchronisation) │
│  - LocalStorage: focus_sprint_target_end               │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       Props & Handlers         Props & Handlers
                │                        │
                ▼                        ▼
┌──────────────────────────────┐  ┌───────────────────────┐
│          TopBar.tsx          │  │ FocusSprintModal.tsx  │
│  - Live-Badge [⏱️ MM:SS]     │  │  - sprintMode         │
│  - Click -> Open Focus Modal │  │  - handleAttemptClose │
└──────────────────────────────┘  │  - onGoToOverview     │
                                  └───────────────────────┘
```

### State & Handler Modifications

1. **`src/components/FocusSprintModal.tsx`**:
   - `handleAttemptClose`: Sicherstellen, dass im passiven Modus immer sofort `onClose()` aufgerufen wird, ohne `showExitConfirmModal`.
   - `handleStartSprintNow`: Wenn `sprintMode === 'passive'`, nach Aktivierung des Timers (`onToggleActive`) direkt `onClose()` ausführen, sodass das Fenster minimiert wird.
   - `Lernübersicht-Button`: Hinzufügen eines gut sichtbaren Buttons `Zurück zur Lernübersicht` im passiven Screen, der `onClose()` ausführt.
   - Initialer Modus: Sicherstellen, dass der gespeicherte Modus verlässlich erkannt wird und standardmäßig auf `passive` steht, wenn der Nutzer die Zeitbegleitung wünscht.

2. **`src/App.tsx`**:
   - Sicherstellen, dass `isFocusSprintOpen` jederzeit über die TopBar oder das Floating Badge geöffnet und geschlossen werden kann, ohne dass der laufende Sprint pausiert oder zurückgesetzt wird.
   - Verfeinerung des Schwebefeldes unten rechts: Bessere Klickfläche und klarer Text ("⏱️ MM:SS • Fokus läuft • Zurück zum Timer").
