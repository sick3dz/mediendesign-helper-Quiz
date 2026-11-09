# Realistischer IHK-Prüfungssimulator (100 Punkte & 90-Minuten-Modus)

Umsetzungsplan für den Umbau des Prüfungssimulators in eine prüfungsnahe IHK-Abschlussprüfung mit strukturierten Szenario-Aufgabenblöcken (Themen-Happen), Auslands- & Firmensituationen, Aufgaben-Flagging und offiziellem IHK-Notenschlüssel.

## User Review & Critical Decisions

> [!IMPORTANT]
> Der Nutzer hat im Klärungsschritt folgende Optionen gewählt:
> - **Prüfungsmodi**:
>   1. *Echte IHK-Abschlussprüfung*: 90 Minuten Zeitlimit, 100 Gesamtpunkte, 10 strukturierte Szenario-Hauptaufgaben, erst am Ende Notenauswertung.
>   2. *Freies Themen-Üben*: Gezielte Auswahl einzelner Aufgabenblöcke (Themen-Happen) ohne Zeitdruck mit sofortigem Feedback.
> - **Aufgabenstruktur**: Reale IHK-Ausgangssituationen (z. B. *„NordMedia Agentur GmbH“*) mit aufbauenden Teilaufgaben.

---

## 1. Overview & Core Concept

- **Ziel**: Der Prüfungssimulator bildet die reale IHK-Abschlussprüfung (Fachrichtung Designkonzeption & Digitalmedien) exakt nach.
- **Aufbau der 10 Hauptaufgaben (100 Punkte Gesamt)**:
  - **Aufgabe 1 (10 Pkt)**: Digital-Strategie & Zielgruppenanalyse (Kapitel 1 & 2)
  - **Aufgabe 2 (10 Pkt)**: Farbmanagement, ICC-Profile & TAC 240%/300% (Kapitel 3)
  - **Aufgabe 3 (10 Pkt)**: Bildauflösung, PPI-Berechnung & Raster (Kapitel 4)
  - **Aufgabe 4 (10 Pkt)**: Barrierefreiheit WCAG 2.1 AA & Kontraste (Kapitel 5)
  - **Aufgabe 5 (10 Pkt)**: IT-Sicherheit, Datenschutz DSGVO & HTTPS (Kapitel 6)
  - **Aufgabe 6 (10 Pkt)**: Responsive Webdesign, CSS Grid & Assets (Kapitel 7)
  - **Aufgabe 7 (10 Pkt)**: Medienneutrale Daten & PDF/X-Standards (Kapitel 8)
  - **Aufgabe 8 (10 Pkt)**: Agiles Projektmanagement Scrum & Sprints (Kapitel 9)
  - **Aufgabe 9 (10 Pkt)**: WiSo – Verträge, Fristen & Kündigungsschutz (Kapitel 10 & 11)
  - **Aufgabe 10 (10 Pkt)**: DIN 69901-2 PM-Kreislauf & Tuckman-Modell (Kapitel 12)

---

## 2. User Experience & Visual Design

```
┌────────────────────────────────────────────────────────────────────────┐
│  OFFIZIELLE IHK-PRÜFUNGSSIMULATION · MEDIENGESTALTER DIGITAL           │
│  ⏱️ Restzeit: 84:12 Min   |   Punkte: 0 / 100   |   Markiert: 🚩 2/10    │
├────────────────────────────────────────────────────────────────────────┤
│  AUFGABEN-NAVIGATOR:                                                   │
│  [A1 ✓] [A2 ✓] [A3 🚩] [A4 ⚪] [A5 ⚪] [A6 ⚪] [A7 ⚪] [A8 ⚪] [A9 ⚪] [A10 ⚪]│
├────────────────────────────────────────────────────────────────────────┤
│  HAUPTAUFGABE 3 (10 PUNKTE): BILD- & RASTERBERECHNUNG                  │
│                                                                        │
│  🏢 Ausgangssituation:                                                 │
│  Die Kundin "AutoPark GmbH" benötigt einen 4-farbigen Imagekatalog.    │
│  Für den Druck auf ISO Coated v2 liegt ein Titelbild mit 1800x1200 px. │
│                                                                        │
│  Teilaufgabe 3a (4 Punkte):                                            │
│  Berechne die effektive Auflösung in ppi bei 18 cm Druckbreite.        │
│  ◯ A) 254 ppi – reicht nicht für geforderte 300 ppi                    │
│  ◯ B) 300 ppi – exakt ausreichend                                     │
│                                                                        │
│  [ 🚩 Aufgabe markieren ]                 [ ⬅️ Zurück ]  [ Weiter ➡️ ]  │
└────────────────────────────────────────────────────────────────────────┘
```

- **Prüfungs-Header**:
  - Live 90-Minuten-Countdown mit farblicher Warnung (< 15 Min Amber, < 5 Min Red).
  - Aufgaben-Grid (1 bis 10) mit Sofort-Status (Beantwortet, Markiert für spätere Kontrolle, Offen).
- **Prüfungsergebnis & Zertifikat**:
  - IHK-Notenschlüssel (100–92% Note 1, 91–81% Note 2, 80–67% Note 3, 66–50% Note 4, <50% Note 5/6).
  - Ausführlicher Themen-Radarchart mit Stärken/Schwächen-Analyse pro Kapitel.

---

## 3. Key Product Decisions & Technical Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          ExamSimulatorView                             │
│                  (src/components/ExamSimulatorView.tsx)                 │
│                                                                        │
│   ├── ModeSelectionScreen (IHK 90-Min Real vs. Freies Themen-Üben)     │
│   ├── ExamHeaderToolbar (Timer, Navigation Grid, Flagging)            │
│   ├── ScenarioCard (Firmen-Ausgangssituation & IHK-Asset)              │
│   ├── QuestionBlock (Teilaufgaben mit Punktegewichtung)                │
│   └── ExamResultDashboard (IHK Notenschlüssel, Radar & Musterlösung)   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Erweiterung von `src/data/examQuestions.ts` & `src/types/quiz.ts`**:
  - Verknüpfung von Fragen zu 10 zusammenhängenden Szenario-Hauptaufgaben.
  - Hinzufügen von `points` (Punkte pro Aufgabe) und `scenarioTitle`.

---

## 4. Implementation Steps

1. Aktualisiere `src/types/quiz.ts` um Prüfungs-Szenario-Typen und Punktegewichtungen.
2. Überarbeite `src/components/ExamSimulatorView.tsx`:
   - Startbildschirm mit Modusauswahl (*Reale 90-Minuten-Prüfung* vs. *Themen-Happen Üben*).
   - Aufgaben-Navigator-Leiste mit Flag-Funktion (*Später überprüfen*).
   - Realer 90-Minuten-Timer.
   - Auswertung nach dem IHK-Notenschlüssel mit detaillierter Kapitel-Analyse.
3. Führe `compile_applet` und `lint_applet` aus.
