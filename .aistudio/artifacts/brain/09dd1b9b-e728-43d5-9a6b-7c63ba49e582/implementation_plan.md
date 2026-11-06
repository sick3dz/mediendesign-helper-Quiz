# WiSo-Prüfungsdossiers & Navigations-Optimierung

Schließen der verbleibenden Wissens- und Layout-Lücken für das neue Prüfungs-Kapitel 10 "Wirtschafts- & Sozialkunde (WiSo)", sodass Prüflinge für alle 8 IHK-Schwerpunkte tiefe Musterklausur-Dossiers erhalten und die Kapitel-Leiste alle 10 Kapitel harmonisch anzeigt.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Bestätigte Entscheidungen aus Phase 1:**
> - **Haustier-Accessoire:** Kein zusätzliches Pet-Accessoire für Kapitel 10 nötig; das bestehende Abzeichen `wiso_master` ("WiSo-Experte" ⚖️) reicht dem Nutzer vollkommen aus.
> - **IHK-Prüfungsdossiers:** Es werden vollständige, handgefertigte IHK-Dossiers für alle 8 WiSo-Prüfungsschwerpunkte mit realistischen Aufgabenstellungen, IHK-Punkteschlüsseln, Musterantworten und typischen Prüfungsfallen in `src/data/checklistDetailsData.ts` hinterlegt.
> - **UI-Navigation:** Das Raster in `ChapterListView.tsx` wird von 8 Spalten auf 10 Spalten (`lg:grid-cols-10`) erweitert, damit alle 10 Kapitel auf Desktop-Displays einheitlich in einer Reihe stehen.

---

### 1. Overview & Core Concept

- **Was es tut:** Wenn Prüflinge in Kapitel 10 auf einen beliebigen Punkt der IHK-Prüfungs-Checkliste klicken (z.B. "Duales Ausbildungssystem & BBiG" oder "Die 5 Säulen der Sozialversicherung"), öffnet sich anstelle eines Standardtextes ein vollwertiges IHK-Prüfungsdossier mit rechtlicher Definition, echten Klausurbeispielen, 4–6 Punkte-Aufgaben und konkreten Prüfertipps.
- **Zielgruppe:** Mediengestalter Digital & Print in der IHK-Abschlussprüfungsvorbereitung 2026/2027.
- **Kernwert:** Rechtssicheres Prüfungswissen im offiziellen KMK/PAL-Stil ohne vage Formulierungen.

---

### 2. User Experience & Visual Design

- **Checklisten-Interaktion:**
  - Nutzer klickt auf eine WiSo-Aufgabe in der Checkliste.
  - Das interaktive Modal öffnet sich mit:
    - **Rechtlicher Definition & Kernbegriffen:** Klare Verweise auf Gesetzesparagraphen (BBiG, JArbSchG, ArbZG, BetrVG, BGB, SGB).
    - **Praxisbeispiel:** Realitätsnaher Agenturfall (z.B. Azubi-Überstunden, Abmahnung, Krankenkassenwechsel).
    - **Originalgetreue IHK-Prüfungsaufgabe:** Inklusive Punkteangabe (z.B. 4–6 Punkte) und offiziellem Erwartungshorizont der Korrektoren.
    - **Prüferfalle:** Warnung vor typischen Punktabzügen (z.B. Verwechslung von Arbeitslosengeld I und Bürgergeld, oder Nichteinhalten der 2-Wochen-Ausschlussfrist bei fristloser Kündigung).
- **Kapitel-Navigation (Desktop-Grid):**
  - Aktualisierung der Rasterklassen in `ChapterListView.tsx`:
    `grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 sm:gap-2`
  - Alle 10 Kapitel (Kapitel 1 bis 10) erscheinen auf Desktops sauber nebeneinander in einer Reihe, auf Tablets in zwei gleichmäßigen 5er-Reihen.

---

### 3. Key Product Decisions & Trade-Offs

- **Entscheidung 1: Kein neues Haustier-Accessoire**
  - *Gewählter Ansatz:* Gemäß Nutzerentscheidung bleibt `CHAPTER_SURPRISES` unverändert. Das Erreichen von 100% in WiSo schaltet wie gewohnt das goldene Profil-Badge `wiso_master` frei.
  - *Warum:* Der Nutzer hat explizit bestätigt, dass das Abzeichen genügt und kein Pet-Accessoire gewünscht ist.
- **Entscheidung 2: 8 dedizierte Dossier-Einträge in `CHECKLIST_DOSSIERS`**
  - *Gewählter Ansatz:* Jeder der 8 Checklisten-Punkte aus `chaptersData.ts` wird exakt mit seinem normalisierten Suchschlüssel gematcht.
  - *Warum:* Garantiert 100% konsistente Tiefe und verhindert das Ausweichen auf generische Platzhalter.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   ChapterListView                      │
│   (Grid aktualisiert: 10 Spalten für Kap 1 bis 10)     │
└──────────────────────────┬─────────────────────────────┘
                           │ Klick auf Checklisten-Eintrag
                           ▼
┌────────────────────────────────────────────────────────┐
│               QuestionDetailModal                      │
│           (getChecklistDossier aufgerufen)             │
└──────────────────────────┬─────────────────────────────┘
                           │ Exakter Key-Match
                           ▼
┌────────────────────────────────────────────────────────┐
│             CHECKLIST_DOSSIERS (Data Store)            │
│  - duales ausbildungssystem & bbig                     │
│  - probezeit & kündigung im bbig                       │
│  - schutzgesetze am arbeitsplatz                       │
│  - die 5 säulen der sozialversicherung                 │
│  - entgeltabrechnung (brutto vs. netto)                │
│  - betriebliche mitbestimmung (betrvg)                 │
│  - unternehmens- & rechtsformen                        │
│  - kaufvertrag & störungen                             │
└────────────────────────────────────────────────────────┘
```

#### Zu implementierende Datenstrukturen:
In `src/data/checklistDetailsData.ts`:
1. `'duales ausbildungssystem & bbig'`: BBiG § 11, Pflichtenheft, Ausbildungsrahmenplan, Berichtsheft.
2. `'probezeit & kündigung im bbig'`: BBiG § 20–22, Kündigungsfristen, Formvorschriften, Kündigungsschutz.
3. `'schutzgesetze am arbeitsplatz'`: JArbSchG (Ruhepausen, Nachtarbeitsverbot), ArbZG, MuSchG, BUrlG.
4. `'die 5 säulen der sozialversicherung'`: SGB-System, Beitragsbemessungsgrenzen, Parität vs. 100% AG-Beitrag (Unfallversicherung/BG).
5. `'entgeltabrechnung (brutto vs. netto)'`: Lohnsteuertabelle, Steuerklassen 1–6, Sozialversicherungsbeiträge.
6. `'betriebliche mitbestimmung (betrvg)'`: § 87 BetrVG Mitbestimmung, JAV, Betriebsratswahl Voraussetzungen.
7. `'unternehmens- & rechtsformen'`: Einzelkaufmann, OHG, KG, GmbH, AG, Haftung und Mindestkapital.
8. `'kaufvertrag & störungen'`: Willenserklärungen, Sach- und Rechtsmängel, Nacherfüllung vor Rücktritt/Minderung.
