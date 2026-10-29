# Umsetzungsplan: Digital-Leitfaden Kapitel-Slider & Schnell-Filter

## User Intent
Der Benutzer möchte das lange Scrollen im Digital-Leitfaden (`SpickzettelView.tsx`) beseitigen. Statt alle Themen untereinander in einer langen Seite anzuzeigen, soll eine Kapitel-Slider Navigation mit Vorheriges/Nächstes-Buttons, Schnell-Tabs sowie Live-Suchleiste und Kategorien-Filter (Formeln, IHK-Tipps, Designregeln) integriert werden.

---

## Proposed Changes

### 1. `src/components/SpickzettelView.tsx` umstrukturieren
- **Kapitel-Slider / Paging-System**:
  - Hinzufügen von `selectedTopicIndex` bzw. aktiver Thema-Auswahl.
  - Implementierung eines horizontalen Kapitel-Sliders mit Kompakt-Tabs oben für alle Digital-Themen (z. B. *1. IxD & Usability*, *2. Responsive Design*, *3. Accessibility*, *4. IT-Sicherheit*, *5. Schnittstellen & DB*).
  - Vorheriges Thema / Nächstes Thema Paging-Buttons am unteren Ende des ausgewählten Themas, damit man flüssig Thema für Thema durcharbeiten kann.
- **Such- & Kategorien-Filter**:
  - Echtzeit-Suchleiste zum Filtern nach Begriffen (z. B. *WCAG*, *SQL*, *Wireframe*, *DSGVO*).
  - Quick-Pill-Filter für Kategorien (z. B. *Alle*, *Formeln & Vergleiche*, *IHK-Prüfungstipps*, *Designkonzeption*).
- **Smooth Auto-Scroll**:
  - Beim Klick auf "Nächstes Thema" oder einen Slider-Tab schickes sanftes Scrollen zum Beginn der Themenkarte.

---

## Verification Plan

### Automated Verification
- `compile_applet` ausführen, um festzustellen, dass TypeScript-Kompilierung fehlerfrei ist.

### Manual Verification
- Den Digital-Leitfaden öffnen.
- Über die Kapitel-Slider-Tabs und Vorheriges/Nächste-Buttons navigieren.
- Testen der Live-Suche und Kategorie-Filter.
