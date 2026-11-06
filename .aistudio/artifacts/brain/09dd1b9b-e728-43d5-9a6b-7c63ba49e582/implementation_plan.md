# Digital-Leitfaden (IHK): Erweiterung von 8 auf 10 Kapitel

Vollständige Synchronisierung des "Digital-Leitfaden (IHK)" im Bereich Spickzettel & Prüfungskompass von bisher 8 auf alle 10 Prüfungs-Themen, sodass auch **Thema 9 (Digitale Bild- & Grafikdaten)** und **Thema 10 (Wirtschafts- & Sozialkunde - WiSo)** mit IHK-Schwerpunkten, "Was fällt weg"-Vergleichen und Prüfungstipps abgedeckt sind.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Bestätigte Entscheidungen aus Phase 1:**
> - **10 Kapitel Synchronisierung:** Der Digital-Leitfaden wird vollständig an die 10 Kapitel der App angepasst (Kapitel 9: Bilddaten & Kapitel 10: WiSo).
> - **WiSo-Schwerpunkte:** Der Leitfaden fokussiert BBiG-Ausbildungsrecht, Kündigungsfristen, Schutzgesetze (JArbSchG, ArbZG, BUrlG), die 5 Säulen der Sozialversicherung (inkl. 100% AG-Beitrag der Unfallversicherung), betriebliche Mitbestimmung (BetrVG § 102) und Unternehmensformen (GmbH, KG, OHG).
> - **Bilddaten-Schwerpunkte:** Thema 9 fokussiert Vektoren (SVG) vs. Rasterformate (WebP, AVIF, JPG, PNG), PPI vs. DPI, verlustfreie/verlustbehaftete Kompression und medienneutrale Farbräume (RGB vs. CMYK).

---

### 1. Overview & Core Concept

- **Was es tut:** Im Reiter *Spickzettel & Prüfungskompass* -> *Digital-Leitfaden (IHK)* stehen Prüflingen nun 10 statt 8 interaktive Themenkarten zur Verfügung. Jede Karte bietet den bewährten Dreiklang:
  1. **IHK-Fokus:** Was wird 2026/27 konkret verlangt?
  2. **Vergleich ("Was fällt weg vs. Was ist neu"):** Kontrastierung veralteter Print-/Formel-Themen mit den modernen Prüfungsanforderungen.
  3. **Schlüsselbegriffe mit Prüfungs-Tipps:** Kurze, prägnante Definitionen mit Warnungen vor typischen IHK-Fallen.
- **Zielgruppe:** Auszubildende Mediengestalter Digital und Print vor der IHK-Abschlussprüfung Teil 1 und Teil 2.

---

### 2. User Experience & Visual Design

- **Themen-Navigation:** Die Zähleranzeige schaltet auf *Kapitel X von 10* um. Die horizontale Scroll-Liste und die Vor-/Zurück-Pfeile führen nahtlos durch alle 10 Kapitel.
- **Kategorie-Filter:** Die neuen Kategorien *"Grafik & Produktion"* und *"Recht & Wirtschaft"* erscheinen automatisch in der Filterleiste.
- **Visuelle Konsistenz:**
  - Thema 9 erhält das `Image`-Icon (grafisch, Slate/Indigo).
  - Thema 10 erhält das `Scale`-Icon (Justitia-Waage, edles Blau).
- **Kopierfunktion & Bionic Reading:** Alle Definitionen und Prüfungstipps unterstützen weiterhin die One-Click-Kopierfunktion in die Zwischenablage und die zuschaltbare bionische Lesehilfe.

---

### 3. Key Product Decisions & Trade-Offs

- **Entscheidung: Direkte Integration in `DIGITAL_GUIDE_TOPICS`**
  - *Gewählter Ansatz:* Hinzufügen von `graphics-image-data` und `wiso-wirtschaft-soziales` als vollwertige `DigitalTopic`-Objekte in `src/data/digitalGuideData.ts`.
  - *Warum:* Das gesamte Spickzettel-System (Filterung, Suche, Zähler, Weiter-Buttons) arbeitet generisch auf Basis von `DIGITAL_GUIDE_TOPICS` und profitiert automatisch von den neuen Inhalten.
- **Entscheidung: Lucide-Icons erweitern**
  - *Gewählter Ansatz:* Import von `Image` und `Scale` in `SpickzettelView.tsx` und Ergänzung in `iconMap`.
  - *Warum:* Verhindert generische Fallbacks und verleiht den beiden neuen Themen sofort erkennbare, eigenständige Ikonografie.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   SpickzettelView                      │
│   (Zähler: 10 Kapitel; Filter & Suche generisch)       │
└──────────────────────────┬─────────────────────────────┘
                           │ rendert
                           ▼
┌────────────────────────────────────────────────────────┐
│              DIGITAL_GUIDE_TOPICS (Array)              │
│  Thema 1: Designkonzeption (IHK Kern-Schwerpunkt)     │
│  Thema 2: Interaktionsdesign (IxD) & Usability         │
│  Thema 3: Wireframing, Prototyping & Design-Systeme   │
│  Thema 4: Responsive Design & Digitales Publishing     │
│  Thema 5: IT-Sicherheit, Datenschutz & DSGVO          │
│  Thema 6: Barrierefreiheit (WCAG 2.2 - POUR)           │
│  Thema 7: Agiles Projektmanagement & Workflows        │
│  Thema 8: Datenbanken & Schnittstellen (SQL, JSON)    │
│  ───────────────────────────────────────────────────   │
│  Thema 9: Digitale Bild- & Grafikdaten [NEU]           │
│  Thema 10: Wirtschafts- & Sozialkunde (WiSo) [NEU]     │
└────────────────────────────────────────────────────────┘
```

#### Neue Einträge im Datenmodell:
1. `id: 'graphics-image-data'`, `title: '9. Digitale Bild- & Grafikdaten (Vektor vs. Pixel, Farbräume & Kompression)'`
   - Key-Concepts: *Vektoren (SVG) vs. Rastergrafiken*, *Moderne Formate (WebP/AVIF)*, *RGB vs. CMYK & Medienneutralität*, *Auflösung (PPI vs. DPI)*.
2. `id: 'wiso-wirtschaft-soziales'`, `title: '10. Wirtschafts- & Sozialkunde (WiSo - BBiG, Sozialversicherungen & Recht)'`
   - Key-Concepts: *BBiG & Ausbildungsvertrag*, *Arbeitsschutz (JArbSchG, ArbZG, BUrlG)*, *Die 5 Säulen der Sozialversicherung*, *Betriebliche Mitbestimmung (BetrVG)*, *Rechtsformen & Kaufvertragsstörungen*.
