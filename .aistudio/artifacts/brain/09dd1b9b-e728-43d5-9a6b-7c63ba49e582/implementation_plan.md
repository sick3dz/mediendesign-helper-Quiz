# WiSo-Spiele-Integration: Paragraphen-Duell & erweitertes Memory

Vollständige Integration der neuen Prüfungsfächer in das Gamification- und Spiele-System: Ein brandneues interaktives Minispiel **„WiSo-Paragraphen & Fristen-Duell“** für Kapitel 10 und Erweiterung des **Memory-Match-Spiels** um Begriffspaare aus WiSo und Bilddaten.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Bestätigte Entscheidungen aus Phase 1:**
> - **WiSo-Themenspiel:** Ein eigenständiges, interaktives Minispiel `WisoDuelGame.tsx` (*WiSo-Paragraphen & Fristen-Duell*) wird im Spiele-Hub für Kapitel 10 implementiert.
> - **Memory-Match Erweiterung:** Der Begriffspool von `MemoryMatchGame.tsx` wird erweitert. Pro Spielrunde werden nun zufällig 6 bis 8 Begriffspaare aus allen Themen (inkl. WiSo und digitaler Bilddaten) gezogen, was für hohe Wiederspielbarkeit sorgt.

---

### 1. Overview & Core Concept

- **Was es tut:**
  1. **WiSo-Paragraphen & Fristen-Duell (`WisoDuelGame`):** Ein interaktives Rechts-Quiz mit 10 typischen IHK-Praxisfällen (z. B. Probezeit-Kündigung, Unfallversicherung 100% AG, Betriebsrat nach § 102 BetrVG, Nacherfüllung vor Rücktritt, Formvorschriften § 623 BGB). Mit Sofort-Feedback, Paragraphen-Erklärung, Combo-Punkten und Sound-Effekten.
  2. **Erweitertes Memory-Match (`MemoryMatchGame`):** Ergänzung von Schlüsselbegriffen aus WiSo (*BBiG Probezeit*, *Gesetzliche Unfallversicherung*, *Betriebliche Mitbestimmung*, *GmbH Stammkapital*) und Bilddaten (*SVG Vektorgrafik*, *WebP Kompression*, *RGB vs. CMYK*).
- **Zielgruppe:** Mediengestalter-Azubis, die rechtliche Fristen und Definitionen spielerisch festigen wollen.

---

### 2. User Experience & Visual Design

- **WiSo-Duell Gameplay:**
  - Jede Runde präsentiert einen konkreten Fall aus dem Agenturalltag mit zwei bis drei rechtlichen Optionen.
  - Sofortiges visuelles Feedback (Grün für Treffer, Rose mit Paragraphen-Aufklärung bei Fehlern).
  - Sound-Effekte (`playCorrect`, `playWrong`), animierte Combo-Zähler und ein Confetti-Abschluss mit +30 EXP Belohnung.
- **Spiele-Hub (`MiniGamesHubView`):**
  - Neue Karte in der Sektion *Kapitel-Spezialspiele*:
    - Titel: *WiSo-Paragraphen & Fristen-Duell*
    - Badge: *Kapitel 10: WiSo*
    - Icon: `Scale` (Justitia-Waage in edlem Blau)
    - Bonus: `+30 EXP`
- **Memory-Match Runderneuerung:**
  - Der Pool wächst von 6 auf 14 Begriffspaare.
  - Bei jedem Spielstart wird ein dynamisches 12-Karten-Set (6 Paare) zufällig gemischt, sodass kein Spieldurchlauf dem vorherigen gleicht.

---

### 3. Key Product Decisions & Trade-Offs

- **Entscheidung: Schnelle, fallbasierte Duelle statt reiner Multiple-Choice:**
  - *Gewählter Ansatz:* Das WiSo-Duell stellt praxisnahe Dilemmata (z.B. "Darf die Kündigung per WhatsApp ausgesprochen werden?").
  - *Warum:* Entspricht exakt der Denkweise von IHK-Klausuraufgaben und bereitet effektiv auf Prüfungsfallen vor.
- **Entscheidung: Zufallsauswahl im Memory:**
  - *Gewählter Ansatz:* Statt das Spielfeld mit 28 Karten zu überladen, zieht das Spiel bei jedem Neustart 6 Paare (12 Karten) zufällig aus dem großen Pool.
  - *Warum:* Optimale Spielzeit von 60–90 Sekunden, kein visueller Overload und hoher Trainingswert durch Rotation.

---

### 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────┐
│                   MiniGamesHubView                     │
│  - studyQuestGames (SpeedQuiz, BossRaid, Memory)       │
│  - topicGames (Affordance, Phishing, Workflow, WCAG)   │
│    + [NEU] WiSo-Paragraphen & Fristen-Duell            │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌──────────────────────────┐┌────────────────────────────┐
│      WisoDuelGame        ││     MemoryMatchGame        │
│  - 10 IHK-Praxisfälle    ││  - Pool: 14 Begriffspaare  │
│  - Sofortige Paragraphen ││  - Randomisiert 6 Paare    │
│  - Sound & EXP-Belohnung ││  - Inkl. WiSo & Bilddaten  │
└──────────────────────────┘└────────────────────────────┘
```

#### Neue und modifizierte Komponenten:
1. `src/components/InteractiveMinigames/WisoDuelGame.tsx` (Neue Komponente)
2. `src/components/InteractiveMinigames/MemoryMatchGame.tsx` (Pool-Erweiterung & Zufallsauswahl)
3. `src/components/MiniGamesHubView.tsx` (Einbindung des WiSo-Duell Games)
