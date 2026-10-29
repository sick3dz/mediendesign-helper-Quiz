# Implementierungsplan: Kapitel 7 – Relationale Datenbanken & SQL (DB)

Integration aller Inhalte aus dem Dokument `Datenbanken_dff17bf2.pdf` als eigenständiges, ADHS-gerechtes Lernkapitel mit 3 Modulen, interaktiver SQL-Baukasten-Simulation, neuen Prüfungsfragen und exklusiver Haustier-Überraschung.

---

## Benutzer-Entscheidungen & Bestätigungen

> [!IMPORTANT]
> Folgende Entscheidungen wurden in Phase 1 abgestimmt:
> - **Kapitelstruktur**: Eigenständiges **Kapitel 7: Relationale Datenbanken & SQL** mit eigener exklusiver Haustier-Überraschung beim Abschluss aller Module.
> - **Modulaufteilung**: 3 kompakte, thematisch fokussierte Lernmodule ohne Informationsüberflutung (Chunks mit Bionic Reading und klaren Merksätzen).
> - **Gamification & Interaktivität**: Neben Multi-Question-Exam-Checks wird ein interaktiver **SQL-Baukasten** integriert, mit dem Lernende Abfragen wie `SELECT`, `WHERE`, `JOIN` visuell zusammenklicken und deren Tabellenauswirkung live sehen können.

---

## 1. Übersicht & Didaktisches Konzept

- **Ziel**: Mediengestalter und Designer verstehen relationale Datenbanken, Datenmodelle (Tabellen, Primär-/Fremdschlüssel), Kardinalitäten (1:1, 1:n, n:m), SQL-CRUD-Operationen und Best Practices für Datenqualität & Normalisierung.
- **Zielgruppe**: Prüflinge im Bereich Mediengestaltung / Webdesign mit ADHS-Fokus (kurze Lerneinheiten, klare visuelle Differenzierung, Bionic Reading, Dopamin-Belohnungen).
- **Kernwert**: 100%ige Abdeckung aller Themen des PDFs ohne Redundanzen mit vorherigen Inhalten (z. B. Abgrenzung zur allgemeinen DSGVO in Kapitel 4 durch gezielten Fokus auf relationale Datenkonsistenz und Digital Asset Management).

---

## 2. Modul-Architektur & Themenaufteilung

### Modul 1 (`db-1`): Tabellen, Schlüssel & Beziehungen (Kardinalitäten)
- **Konzepte**:
  - Begriff & Zweck einer relationalen Datenbank im Mediendesign (Websites, Shops, CMS, Bildarchive).
  - Aufbau: Tabelle (Thema), Datensatz/Zeile (einzelnes Objekt), Feld/Spalte (Eigenschaft).
  - Primärschlüssel (Primary Key): Eindeutige Identifikation, Schutz vor Namensverwechslungen (`Projekt_ID`, `Kunden_ID`).
  - Fremdschlüssel (Foreign Key): Verknüpfung von Datensätzen zwischen Tabellen, Vermeidung von Redundanz.
  - Kardinalitäten:
    - `1:1`: Ein Datensatz gehört genau zu einem anderen (Nutzer $\leftrightarrow$ Profil).
    - `1:n`: Ein Datensatz mit vielen verknüpft (Kunde $\leftrightarrow$ viele Projekte; Autor $\leftrightarrow$ viele Bücher).
    - `n:m`: Viele mit vielen verknüpft (Projekt nutzt viele Bilder, Bild in vielen Projekten) $\rightarrow$ Realisierung über Zwischentabelle / Verknüpfungstabelle (`Projekt_Bilder`).
- **Quizfragen**: 5 Multiple-Choice-Prüfungsfragen mit Erklärungen & Merksätzen.

### Modul 2 (`db-2`): SQL-Grundlagen & CRUD-Operationen
- **Konzepte**:
  - SQL als universelle Abfragesprache für relationale Systeme.
  - CRUD-Matrix:
    - **C**reate $\rightarrow$ `INSERT INTO ... VALUES (...)`
    - **R**ead $\rightarrow$ `SELECT ... FROM ...`
    - **U**pdate $\rightarrow$ `UPDATE ... SET ... WHERE ...`
    - **D**elete $\rightarrow$ `DELETE FROM ... WHERE ...`
  - Der goldene Prüfungs-Merksatz: **WHERE-Bedingung bei UPDATE & DELETE prüfen** (Verhinderung von Datenverlust).
  - Filtern & Sortieren: `WHERE` (Filter) und `ORDER BY ... ASC/DESC` (Sortierung).
  - Tabellen verknüpfen: `JOIN ... ON ...` (Kombination von Projekt- und Kundendaten).
- **Interaktiver Baukasten**: Visuelle SQL-Builder-Sandbox direkt im Modul, in der man Query-Karten anklickt und das resultierende Tabellen-Ergebnis live aufleuchten sieht.
- **Quizfragen**: 5 Multiple-Choice-Prüfungsfragen mit Praxisbezug aus Webprojekten.

### Modul 3 (`db-3`): Normalisierung, Datenqualität & Digital Asset Management
- **Konzepte**:
  - Normalisierung: Vermeidung von Datenwiederholungen (Redundanzen) und Widersprüchen (Single Point of Truth).
  - Datenqualität im Mediendesign: Eindeutige Datentypen (Datum als DATE, nicht Text; Integer für Preise; Booleans), Pflichtfelder.
  - NoSQL vs. Relational: Dokumentenbasierte Datenbanken (JSON) für unstrukturierte Big-Data- und Social-Media-Feeds.
  - Praxisfall Digital Asset Management (DAM / Bildarchive): Dateiname, Format, Bildgröße, Urheberrecht, Lizenzstatus und Tags.
  - Datenschutz & Datensicherheit im CMS: Zugriffsrechte (Rollenkonzept), Datensparsamkeit und Backups.
- **Quizfragen**: 5 Multiple-Choice-Prüfungsfragen zur Systemplanung (Tabellenplanung, Datentypen, Lizenzen).

---

## 3. Neue Exklusive Haustier-Überraschung (Kapitel 7)

- **Item**: *Holo-SQL-Datenwürfel* (`special_sql_cube`)
- **Kategorie**: Accessoire / Begleiter (`neck`)
- **Exklusivität**: Nicht im EXP-Shop kaufbar! Wird automatisch als Überraschung freigeschaltet, sobald alle 3 Module von Kapitel 7 abgeschlossen sind.
- **Visuelles Design**: Neonblauer, schwebender 3D-Hologramm-Datenkristall mit leuchtenden SQL-Symbolen (`SELECT`, `1:n`), gerendert in `PetAvatar.tsx`.
- **Belohnung**: Feierliches Pop-up via `ChapterSurpriseModal` mit Konfetti, Level-Sound und Sofort-Anlegen-Option.

---

## 4. Technische Architektur & Datenfluss

```
┌────────────────────────────────────────────────────────┐
│                      src/App.tsx                       │
│  - Hält zentralen Status & steuert Kapitel/Module      │
│  - Prüft Abschluss von Kapitel 7 & triggert Surprise   │
└───────────────────────┬────────────────────────────────┘
                        │
       ┌────────────────┼────────────────────────┐
       ▼                ▼                        ▼
┌──────────────┐ ┌──────────────┐      ┌──────────────────┐
│ ChapterList  │ │ ModuleView   │      │ VirtualPetView   │
│ Kapitel 7    │ │ db-1, db-2,  │      │ Kapitel 7 Item   │
│ DB & SQL     │ │ db-3 + SQL-  │      │ im Kleiderschrank│
│ freischalten │ │ Baukasten    │      │ & PetAvatar      │
└──────────────┘ └──────────────┘      └──────────────────┘
```

### Anpassungs-Schritte:
1. **`src/types/quiz.ts`**: Keine Brechungen; Datenmodell für Quizfragen und Module ist bereits flexibel.
2. **`src/data/chaptersData.ts`**: Hinzufügen von Kapitel 7 mit Modulen `db-1`, `db-2`, `db-3`, kompakten Nuggets, Prüfungs-Checklisten und je 5 Prüfungsfragen.
3. **`src/data/petData.ts`**: Ergänzung von `CHAPTER_SURPRISES` um Eintrag für Kapitel 7 (`special_sql_cube`).
4. **`src/components/PetAvatar.tsx`**: SVG-Illustration für das neue Item `special_sql_cube`.
5. **`src/components/SqlBuilderWidget.tsx`**: Neuer interaktiver Baukasten für Modul `db-2` (SQL visuell zusammensetzen).
6. **`src/components/SpickzettelView.tsx` & `src/components/ExamSimulatorView.tsx`**: Datenbank-Konzepte in die Schnell-Referenz und den IHK-Prüfungspool aufnehmen.
7. **Verifikation**: `lint_applet` und `compile_applet` zur Sicherstellung fehlerfreier TypeScript-Kompilierung.
