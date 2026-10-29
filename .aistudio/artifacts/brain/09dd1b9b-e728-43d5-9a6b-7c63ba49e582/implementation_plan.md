# Implementierungsplan: Vervollständigung der IHK-Prüfungsthemen

## Übersicht & Bestandsaufnahme

Die Lernplattform deckt aktuell 8 Kapitel ab:
1. Interaktionsdesign (IxD)
2. Wireframes & Mockups
3. Prototyping & Usability-Testing
4. Datenschutz, IT-Sicherheit & DSGVO
5. Web Accessibility (WCAG 2.2)
6. Projektablauf, Agiles Arbeiten & Scrum
7. Datenbanken, SQL & JSON
8. Medienneutrale Daten, Crossmedia & XML

Um den IHK-Prüfungskatalog für Mediengestalter Digital & Print (Fachrichtung Designkonzeption) zu 100% abzudecken, fehlen noch zwei essenzielle Themenbereiche aus den Bereichen Farbmetrik und Typografie.

---

## Geplante Erweiterungen

### 1. Kapitel 9: Farbtheorie, Farbräume & ICC-Farbmanagement
- **Modul 9-1: Additive & Subtraktive Farbmischung (RGB vs. CMYK)**
  - Lichtfarben (RGB: sRGB, Display P3) vs. Körperfarben (CMYK: ISO Coated v2, PSO Uncoated).
  - Primär-, Sekundär- und Komplementärfarben, Farbtiefe (8-Bit vs. 16-Bit per Kanal).
- **Modul 9-2: ICC-Farbprofile, Device Intent & Farbraum-Transformation**
  - Was macht ein ICC-Profil?PCS (Profile Connection Space).
  - Rendering Intents (Relativ farbmetrisch, Absolut farbmetrisch, Perzeptiv/Wahrnehmungsorientiert, Sättigung).
  - Gamut Warning (Farbraumüberschreitung) und Softproof in Photoshop/InDesign.
- **Modul 9-3: Sonderfarben, LAB-Farbraum & Schwarzaufbau (GCR / UCR)**
  - Volltonfarben (Pantone, HKS) vs. Prozessfarben.
  - Geräteunabhängiger CIELAB-Farbraum ($L^*a^*b^*$).
  - Buntaufbau vs. Unbuntaufbau (GCR: Gray Component Replacement, UCR: Under Color Removal) und Gesamtfarbauftrag (GFA max 300%).

### 2. Kapitel 10: Lesetypografie, Mikrotypografie & Layout-Raster
- **Modul 10-1: Schriftklassifikation, Anatomie & Schriftenkombination**
  - DIN 16518 Schriftklassen (Venetianische Renaissance-Antiqua, Klassizistische Antiqua, Grotesk, Egyptienne, Handschriftliche).
  - Anatomie der Buchstaben (Versalhöhe, X-Höhe, Ober-/Unterlänge, Dickte, Fleisch, Serife).
  - Schriftenkombination: Schriftmischung nach Formprinzip und Epochen.
- **Modul 10-2: Makro- & Mikrotypografie (Satzregeln & Lesbarkeit)**
  - Zeilenlänge (50–75 Zeichen), Durchschuss / Zeilenabstand (120–145%).
  - Laufweite (Spationierung), Kerning (Unterschneidung) vs. Spacing.
  - Typografische Satzzeichen: Bis-Strich (En-Dash `–`), Gedankenstrich, Anführungszeichen (Typografische Anführungszeichen `„ “` vs. Zollzeichen `"`).
- **Modul 10-3: Layout-Systeme, Satzspiegel & Variable Fonts**
  - Satzspiegelkonstruktion (Neunerteilung, Goldener Schnitt, Villard'sche Figur).
  - CSS Grid & Flexbox für responsive Web-Typografie.
  - Variable Fonts (Axes: wght, wdth, ital, opsz) für barrierefreie und reaktive Interfaces.

---

## Interaktive Praxis-Labor-Ergänzungen

1. **Interaktiver Farbraum- & Rendering-Intent-Simulator (`ColorGamutWidget.tsx`)**:
   - Visualisiert den Unterschied zwischen RGB-Monitordarstellung und CMYK-Druckfarbraum mit simulierter Gamut-Warnung und Rendering-Intent-Umschaltung.
2. **Typografie- & Mikrotypo-Satzspiegel-Studio (`TypographyStudioWidget.tsx`)**:
   - Live-Editor zum Testen von Zeilenlängen, Durchschuss, Kerning und typografischen Satzzeichen im Vorher-Nachher-Vergleich.

---

## Verifikationsplan
- Erstellung der neuen Kapitel und Module in `src/data/chaptersData.ts`.
- Ergänzung entsprechender Prüfungsfragen in `src/data/examQuestions.ts`.
- Ergänzung der Schnell-Vergleiche in `src/components/SpickzettelView.tsx`.
- Aktualisierung des Haustier-Belohnungssystems (`petData.ts`) für Kapitel 9 und 10.
- Durchführung von `lint_applet` (`tsc --noEmit`) und `compile_applet` (`npm run build`).
