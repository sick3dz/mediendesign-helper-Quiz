# Implementation Plan - Quizfragen auf mindestens 3 pro Modul erweitern

Erweiterung aller Lernmodule im Mediendesign IHK Trainer, so dass jedes Modul über mindestens 3 fundierte, prüfungsrelevante Quizfragen verfügt. Das schließt Wissensfragen zur Theorie und anwendungsbezogene IHK-Praxisfälle ein.

## User Review & Critical Decisions

> [!IMPORTANT]
> Basierend auf der Befragung wurden folgende Entscheidungen getroffen:

- **Bisheriger Ist-Zustand**: 8 Module besaßen bisher nur 1 Frage und 1 Modul besaß 2 Fragen. Die übrigen Module verfügen über 3 bis 5 Fragen.
- **Ziel-Erweiterung**: Alle Module mit unter 3 Fragen werden gezielt um 2 bis 3 neue Fragen auf mindestens 3 Fragen aufgestockt.
- **Didaktische Ausrichtung**: Ausgewogene Kombination aus Kernkonzept-Definitionen (z. B. Gestaltgesetze, Urheberrecht, Formate) und situativen IHK-Prüfungsszenarien.

---

## 1. Overview & Core Concept

### Ziel & Nutzen
Einige Themengebiete (z. B. Gestaltgesetze, Sinus-Milieus, Styleguides, Urheberrecht, Kommunikation/Konfliktmanagement sowie Pixel- vs. Vektorgrafiken) wiesen bislang nur 1 Einzelfrage auf. Durch die Aufstockung auf mindestens 3 Fragen pro Modul wird die Lernkontrolle vertieft, der Fragenpool für die Level-1- und Level-2-Sprint-Sessions abwechslungsreicher und der Vorbereitungswert für die IHK-Abschlussprüfung signifikant gesteigert.

---

## 2. Betroffene Lernmodule & Ergänzungs-Fokus

Folgende 9 Module werden in `src/data/chaptersData.ts` mit neuen Fragen ergänzt:

1. **`ixd-7` Gestaltgesetze: Visuelle Wahrnehmung** (von 1 auf 3 Fragen)
   - *Neu*: Gesetz der Ähnlichkeit & Prägnanz in Web-Interfaces.
   - *Neu*: Praxisfall zu unvollständigen Icons (Gesetz der Geschlossenheit).

2. **`wf-5` Zielgruppen & Sinus-Milieus** (von 1 auf 3 Fragen)
   - *Neu*: Zuordnung der Milieus (Performer vs. Bürgerliche Mitte vs. Expeditive) zu Designansprüchen.
   - *Neu*: Praxisfall zur UI-Gestaltung für unterschiedliche Lebenswelten.

3. **`wf-6` Styleguide & Corporate Design** (von 1 auf 3 Fragen)
   - *Neu*: Unterscheidung Corporate Identity (CI) vs. Corporate Design (CD) vs. Component Library.
   - *Neu*: Praxisfall zur Aufrechterhaltung der Konsistenz in verteilt arbeitenden Design-Teams.

4. **`sec-4` Rechtliche Grundlagen: Urheberrecht & Impressum** (von 1 auf 3 Fragen)
   - *Neu*: Nutzungsrechte & Creative-Commons-Lizenzen (CC-BY, CC-ND, CC-NC) im Berufsalltag.
   - *Neu*: Pflichtangaben im Impressum & Datenschutzerklärung bei Geschäftsmäßigkeit.

5. **`proj-4` Kommunikation & Konfliktmanagement** (von 1 auf 3 Fragen)
   - *Neu*: Professionelles Korrekturmanagement (Meilensteine, Change Requests & Abnahme).
   - *Neu*: Deeskalationstechniken (Ich-Botschaften, Aktives Zuhören & Harvard-Konzept).

6. **`gfx-1` Pixel vs. Vektor (SVG & WebP)** (von 1 auf 3 Fragen)
   - *Neu*: Technische Eigenschaften von Vektorgrafiken (DOM-Editierbarkeit, Skalierbarkeit, mathematische Pfade).
   - *Neu*: Praxisfall zur Auswahl des optimalen Grafikformats für ein komplexes Web-Layout.

7. **`gfx-2` Kompression & Bildbewertung** (von 1 auf 3 Fragen)
   - *Neu*: Vor- und Nachteile von lossy vs. lossless Kompression.
   - *Neu*: Praxisfall zu WebP-Features (Alphakanal, Animation & Dateigrößenvorteile).

8. **`gfx-3` Crossmedia & Medienneutrale Daten** (von 1 auf 3 Fragen)
   - *Neu*: Medienneutrale Datenhaltung (eciRGB vs. sRGB vs. CMYK Late Binding).
   - *Neu*: Praxisfall zur Druck- und Web-Ausgabe aus einem medienneutralen Archiv.

9. **`ixd-6` Die 10 Nielsen-Heuristiken** (von 2 auf 3 Fragen)
   - *Neu*: Praxisfall zur Anwendung der Heuristik "Fehlervermeidung & Wiedererkennen statt Erinnern".

---

## 3. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────┐
│                   src/data/chaptersData.ts               │
│                                                          │
│  Lernmodule (CHAPTERS Array)                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Module-Objekt (z.B. ixd-7, wf-5, sec-4, gfx-1...)  │  │
│  │ ├─ nuggets: [...]                                  │  │
│  │ └─ quizQuestions: [ Q1 (Bestehend), Q2, Q3 ]       │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│               Dynamische Level-2 Generierung             │
│            getModuleLevel2Questions(module)              │
│                                                          │
│  Generiert automatisch IHK-Meisterfall-Szenarien,        │
│  Glaubwürdigkeits-Fallen & Prüfer-Tipps für alle Quiz    │
│  Fragen in Level 2!                                      │
└──────────────────────────────────────────────────────────┘
```

- **Integrierte Antwortoptionen & Erklärungen**: Jede neue Quizfrage erhält 4 plausible Antwortmöglichkeiten, eine explizite `isCorrect`-Zuordnung, detaillierte Erklärungen bei Falschantworten sowie Merksätze.
- **Automatische Level-2 Meisterstufe**: Da `getModuleLevel2Questions()` die Fragen eines Moduls dynamisch in Meisterfälle transformiert, profitieren sowohl Level 1 als auch Level 2 sofort von den neu hinzugefügten Fragen.

---

## 4. Execution Steps

1. **Update `chaptersData.ts`**: Formuliere und füge die neu ausgearbeiteten 17 Quizfragen in den entsprechenden Module-Objekten ein.
2. **Prüfung der Fragenanzahl**: Überprüfe per TypeScript-Script, dass jedes der 38 Module nun über mindestens 3 Fragen verfügt.
3. **Build & Lint Verification**: Ausführen von `compile_applet` und `lint_applet` zur Bestätigung der Fehlerfreiheit.
