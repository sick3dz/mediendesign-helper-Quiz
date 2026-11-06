# Umsetzungsplan: WiSo-Vollständigkeit & Prüfungs-Integration

## 1. Übersicht & Ziel
1. **Fragenpool-Erweiterung auf 5–6 Fragen pro Modul (`src/data/chaptersData.ts`):**
   - **Modul 1 (Berufsausbildung & Arbeitsrecht):**
     - Neu: Bundesurlaubsgesetz (BUrlG) Werktage vs. Arbeitstage, Urlaubsanspruch bei Jugendlichen (§ 19 JArbSchG: 30/27/25 Werktage).
     - Neu: Kündigungsarten für reguläre Arbeitnehmer (ordentlich, außerordentlich/fristlos, personenbedingt, verhaltensbedingt, betriebsbedingt) & Kündigungsschutzgesetz (KSchG ab 10 AN).
   - **Modul 2 (Arbeitsverhältnis, Entgelt & Mitbestimmung):**
     - Neu: Tarifvertragstypen (Mantel-/Rahmentarifvertrag vs. Lohn-/Gehaltstarifvertrag, Laufzeiten).
     - Neu: Streik & Aussperrung (Friedenspflicht, Urabstimmung 75%, Arbeitskampfregeln).
   - **Modul 3 (Soziale Sicherung & Vorsorge):**
     - Neu: Beitragsbemessungsgrenze & Versicherungspflichtgrenze (Unterschied & Zweck).
     - Neu: Private Zusatzvorsorge (Betriebliche Altersvorsorge / bAV, Berufsunfähigkeitsversicherung).
   - **Modul 4 (Wirtschaftsordnung, Markt & Unternehmensformen):**
     - Neu: Inflation, Deflation & Rolle der Europäischen Zentralbank (EZB / Leitzins).
     - Neu: Unterschied Sachmängelhaftung (gesetzliche Gewährleistung: 2 Jahre) vs. freiwillige Garantie.
2. **Abschlussprüfungs-Simulator (`src/data/examQuestions.ts`):**
   - Integration von 4 gezielten WiSo-Originalprüfungsfragen (eine aus jedem Kernbereich), sodass WiSo vollwertiger Bestandteil des Prüfungs-Simulators wird.
3. **Abschlussprüfungs-Simulator View (`src/components/ExamSimulatorView.tsx`):**
   - Kapitel-Filter und Anzeige um WiSo erweitern, falls nach Kapiteln gefiltert wird.
4. **Verifikation:**
   - Kompilieren & Linting ausführen (`compile_applet`, `lint_applet`).
