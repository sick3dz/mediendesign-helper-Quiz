# Fokus-Audio, Tägliche Missionen & Lückenlose IHK-Lernmodule

Dieser Implementierungsplan beschreibt die gezielte Weiterentwicklung der Lernplattform:
1. Eine erweiterte Fokus-Funktion mit integrierten Lofi- und White-Noise-Hintergrundsounds (synthetisiert über die Web Audio API für null Latenz und Offline-Verfügbarkeit).
2. Drei tägliche, motivierende Missionen in einer kompakten Leiste direkt unter der TopBar mit Fortschrittsanzeige und sofortigem ⚡ EXP-Claim.
3. Vollständige, lückenlose Aufbereitung aller 8 IHK-Kapitel in verdaulichen Wissens-Häppchen (Nuggets) und abprüfenden Quizfragen.

---

## User Review & Bestätigte Entscheidungen

> [!IMPORTANT]
> Folgende Entscheidungen wurden basierend auf deinen Antworten im interaktiven Frage-Schritt festgelegt:

- **Fokus-Erweiterung**: Synthetisierte, beruhigende Audio-Klangwelten (Lofi-Chillout-Akkorde, White Noise, sanftes Regenrauschen) direkt im Fokus-Timer mit Lautstärkeregler und One-Click-Mute.
- **Tägliche Missionen (3 pro Tag)**: Kompakt und aufmerksamkeitsstark direkt unter der TopBar verankert; mit Echtzeit-Fortschrittsbalken, Belohnungsanzeige und individuellem "EXP abholen"-Claim-Button.
- **Inhaltliche Modul-Häppchen**: Vollständige curriculare Abdeckung aller prüfungsrelevanten Themen aus den 8 IHK-Hauptgebieten in mundgerechte Lerneinheiten (Definition, Merksatz, Praxisbeispiel) und anschließenden Wissens-Checks.

---

## 1. Übersicht & Kernkonzept

- **Zielgruppe**: Mediengestalter Digital & Print / Digitalmedien-Prüflinge vor der IHK-Abschlussprüfung.
- **Mehrwert**: 
  - Erhöhte Konzentrationsfähigkeit durch akustische Abschirmung (Brown/White Noise & Lofi-Harmonien).
  - Tägliche Lernroutine durch sichtbare Tagesziele mit echtem EXP-Fortschritt für den Kosmetik-Shop.
  - Sicheres Bestehen durch lückenlose Prüfungs-Nuggets ohne Textwüsten.

---

## 2. User Experience & Visuelles Design

### A. Tägliche Missionsleiste (`DailyMissionsBar.tsx`)
- **Platzierung**: Direkt unter der TopBar (über oder integriert in den oberen Bereich), schlank gestaltet (< 48px Höhe auf Mobile).
- **Layout**:
  - Links: Kleines Icon-Badge mit Tagesdatum und Streak-Status.
  - Mitte: 3 dynamische Missionskarten im horizontalen Flow:
    1. *Fokus-Sprint absolvieren* (z. B. 1 Fokus-Session abschließen).
    2. *Wissens-Häppchen meistern* (z. B. 2 neue Module oder 5 Einheiten lesen).
    3. *Quiz-Treffer landen* (z. B. 8 Quizfragen richtig beantworten).
  - Rechts: Individueller Claim-Button (`+50 EXP abholen`), der nach Zielerreichung golden aufleuchtet und beim Klick Konfetti sowie Sound auslöst.
- **Zero-Pill & Typografie**: Klare, ungerahmte Fortschrittszahlen (`2/3 erledigt`), saubere dezente Mini-Balken, lesbare Schrift mit Tabular-Numerals.

### B. Verbesserte Fokus-Funktion (`FocusSprintModal.tsx`)
- **Akustische Begleitung**:
  - Drei Soundmodi: **Lofi Deep Focus** (sanfte, langsame Moll-Akkorde), **White Noise** (gleichmäßiges Rauschen zur Maskierung von Umgebungsgeräuschen) und **Rain Drift** (Rosa Rauschen mit weichen Frequenzen).
  - Generiert rein clientseitig mit Web Audio API `AudioContext`, Biquad-Filtern und GainNodes (keine externen Audio-Dateien, keine Ladezeiten, absolut offline-sicher).
  - Schieberegler für Lautstärke + schneller Stummschalt-Knopf.
- **Sprint-Belohnung**:
  - Bei erfolgreichem Abschluss des Sprints werden automatisch **+40 ⚡ EXP** gutgeschrieben, die direkt zur täglichen Fokus-Mission beitragen.

### C. Vollständige Prüfungs-Module & Häppchen (`src/data/chaptersData.ts`)
- **Didaktisches 3er-Schema pro Häppchen**:
  1. *Kernkonzept*: 1 prägnanter Satz zum Verstehen.
  2. *Prüfungs-Stichpunkte*: Maximal 3 Bullet-Points mit Fettungen für IHK-Schlüsselbegriffe.
  3. *Prüfungs-Merksatz / Fallstrick*: "IHK-Falle" oder goldene Faustregel.
- **Vollständigkeit der 8 IHK-Themenbereiche**:
  - *Kapitel 1*: IxD, Norman-Prinzipien, 10 Nielsen-Heuristiken, UI/UX/IxD-Abgrenzung, Gesten & Touch-Ziele.
  - *Kapitel 2*: Wireframe-Phasen (Low/Mid/High), Informationsarchitektur, Zonen & Grid-Systeme.
  - *Kapitel 3*: Prototypen (horizontal vs. vertikal), Klickdummies, Usability-Testing-Methoden.
  - *Kapitel 4*: IT-Sicherheit, Phishing, Ransomware, Man-in-the-Middle, Hash-Verfahren & DSGVO.
  - *Kapitel 5*: Web Accessibility (WCAG 2.1 AA/AAA, 4 Prinzipien POUR, ARIA, Kontraste).
  - *Kapitel 6*: Projektablauf (Scrum, Kanban, Wasserfall, Briefing, Meilensteine).
  - *Kapitel 7*: Datenbanken (SQL, Primär-/Fremdschlüssel, Relationen 1:1/1:n/n:m, JSON vs. XML).
  - *Kapitel 8*: Medienneutrale Workflows, Farbmanagement (RGB vs. CMYK, Profile), Vektor vs. Raster.

---

## 3. Produktentscheidungen & Trade-offs

| Entscheidung | Gewählter Ansatz | Begründung |
|---|---|---|
| **Audio-Synthese** | Web Audio API Oscillator & Noise Buffer | 100% offline-fähig, unendlich loopbar, null Megabyte Download, keine Urheberrechts- oder Hosting-Probleme. |
| **Missions-Speicherung** | Lokale Persistenz mit Tagesstempel | Tägliches automatisches Zurücksetzen um Mitternacht oder beim ersten Start am neuen Tag (`lastActiveDate`). |
| **EXP-Verknüpfung** | Ein einheitliches EXP-Konto | Direktes Feedback: Fokus & Missionen schalten sofort Shop-Items und Kosmetika frei. |

---

## 4. Technische Architektur & Datenfluss

```
┌───────────────────────────────────────────────────────────────┐
│                           TopBar                              │
└───────────────────────────────┬───────────────────────────────┘
                                │
┌───────────────────────────────▼───────────────────────────────┐
│             DailyMissionsBar (3 Ziele & EXP-Claim)            │
│  [Mission 1: Fokus]   [Mission 2: Module]   [Mission 3: Quiz] │
└───────────────────────────────┬───────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ FocusSprintModal │   │ ChapterListView  │   │  QuizCard / Hub  │
│ - Lofi / Noise   │   │ - Vollständige   │   │ - Wissens-Checks │
│ - Timer & EXP    │   │   IHK-Nuggets    │   │ - Combo & Treffer│
└──────────────────┘   └──────────────────┘   └──────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
               ┌─────────────────────────────────┐
               │    UserStats (EXP & Missionen)  │
               │   - xp                          │
               │   - dailyMissions               │
               │   - completedModules            │
               └─────────────────────────────────┘
```

### Zustands-Modell für Tägliche Missionen:
```typescript
interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardXp: number;
  isClaimed: boolean;
  category: 'focus' | 'module' | 'quiz';
}
```

### Nächste Schritte nach deiner Freigabe:
1. Erstellung des `ambientSoundService.ts` mit Web Audio Synthesizern für Lofi-Chords und Noise.
2. Integration der Audio-Schieberegler und Fokus-EXP in `FocusSprintModal.tsx`.
3. Erstellung und Einbindung der `DailyMissionsBar.tsx` in `App.tsx`.
4. Inhaltliche Überprüfung und Komplettierung aller Wissens-Häppchen und Quizfragen in `chaptersData.ts`.
5. Verifizierung mit `compile_applet` und `lint_applet`.
