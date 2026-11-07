# Wissens-Vollständigkeit & Interaktive Klapptexte ("Weiterlesen") für Kapitel 1–10

Integrieren einer klaren Lesbarkeit mit ausklappbaren "Weiterlesen"-Funktionen bei langen Wissens-Nuggets, Erklärungen und IHK-Szenarien sowie Sicherstellung der fachlichen Vollständigkeit über alle 10 Basiskapitel.

## User Review & Critical Decisions

> [!IMPORTANT]
> Bestätigte Entscheidungen aus der Nutzerbefragung (Phase 1):
> - **Klapptext-Schwelle**: Texte mit mehr als 3 Bulletpoints oder mehr als 400 Zeichen werden mit einem eleganten "Weiterlesen"-Button, Ausklapp-Animation und sanftem Farbverlauf-Overlay abgekürzt.
> - **Inhalts-Vollständigkeit**: Alle Kapitel 1–10 erhalten vertiefte IHK-Prüfungsdossiers mit ausklappbaren Praxis-Beispielen, Prüfer-Warnungen und vollständigen Abdeckungen.

- **Bestätigte Entscheidung 1**: Erstellung der wiederverwendbaren Komponente `ExpandableText.tsx` für saubere Textverkürzung mit Farbverlauf.
- **Bestätigte Entscheidung 2**: Erweiterung aller Modulansichten (`ModuleLearningView`, `QuizCard`, `SpickzettelView`) um die `ExpandableText`-Logik.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Verhindert unendliches Scrollen und Text-Überflutung durch smarte "Weiterlesen"-Klappelemente bei Wissens-Nuggets, Modul-Zusammenfassungen und Fragen-Szenarien.
  2. Stellt sicher, dass alle 10 Kapitel (IxD, Usability, Responsive Design, WCAG, HTML/CSS, SQL/Datenbanken, DSGVO, Git/Workflow, Agiles Projektmanagement, WiSo) 100% vollständig und prüfungsreif aufbereitet sind.
- **Target Audience**: IHK-Mediengestalter, die schnell die Kernaussage erfassen wollen, aber per Klick die vollständige Tiefe abrufen können.
- **Key Value**: Maximale Übersichtlichkeit auf allen Bildschirmgrößen mit stufenlosem Zugang zu allen Detailinformationen.

---

## 2. User Experience & Visual Design

- **ExpandableText Component Design**:
  - **Kompakter Zustand**: Zeigt die ersten 3 Bulletpoints / ca. 400 Zeichen. Am unteren Rand liegt ein transparenter Farbverlauf-Overlay (`bg-gradient-to-t from-white dark:from-slate-900 to-transparent`), der sanft in den Hintergrund übergeht.
  - **Interaktiver Ausklapp-Button**: Ausgestattet mit einem subtilen Pfeil-Icon (`ChevronDown` / `ChevronUp`), lesbarem Text ("Weiterlesen...", "Weniger anzeigen") und flüssiger CSS-Höhenanimation (`transition-all duration-300`).
  - **Erweiterter Zustand**: Entfaltet den vollständigen Text samt Formeln, Beispielen und IHK-Prüfer-Tipps ohne abgeschnittene Zeilen.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Wiederverwendbare `ExpandableText.tsx` Komponente**:
  - *Chosen Approach*: Eine universelle Komponente mit Konfigurationsparametern für Schwellenwert (`maxHeight` / `maxChars`), Farbverlauf und Barrierefreiheit.
  - *Why*: Wiederverwendbar in `ModuleLearningView`, `QuizCard`, `TopicCard`, `SpickzettelView` und `ChecklistDetailModal`.
- **Decision 2: Vollständigkeits-Check Kapitel 1–10**:
  - *Chosen Approach*: Überprüfung aller 10 Kapitel in `chaptersData.ts`, um sicherzustellen, dass jedes Modul mindestens 2–3 Nuggets und 3+ Fragen mit Ausklapp-Möglichkeit besitzt.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ExpandableText Component                        │
├────────────────────────────────────────────────────────────────────────┤
│  Input: text / children / bulletPoints / maxChars / isExpanded        │
│        │                                                               │
│        ├──► Collapsed State: Gradient Overlay + ChevronDown Button     │
│        │                                                               │
│        └──► Expanded State: Full Text View + ChevronUp Button          │
├────────────────────────────────────────────────────────────────────────┤
│ Used in: ModuleLearningView · QuizCard · SpickzettelView · Dossiers   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Integrierte Module**:
  1. `src/components/ExpandableText.tsx`: Neue UI-Komponente für Klapptexte.
  2. `src/components/ModuleLearningView.tsx`: Anwendung bei Nugget-Bulletpoints & Praxisbeispielen.
  3. `src/components/QuizCard.tsx`: Anwendung bei langen Szenarien & Erklärungen.
  4. `src/components/SpickzettelView.tsx`: Anwendung bei langen Schlüsselkonzepten in TopicCards.

---

## 5. Implementation Roadmap

1. **Phase 1: Erstellung `ExpandableText.tsx`**:
   - Entwicklung der Komponente mit Farbverlauf-Overlay, Schwellenwert-Erkennung und smooth Toggle.
2. **Phase 2: Integration in Wissens-Views**:
   - Einbau in `ModuleLearningView.tsx` für Lern-Nuggets.
   - Einbau in `QuizCard.tsx` und `QuestionDetailModal.tsx` für Fragen-Szenarien & Fallenanalysen.
   - Einbau in `SpickzettelView.tsx` für Digital-Leitfaden Schlüsselkonzepte.
3. **Phase 3: Inhalts- & Vollständigkeitsprüfung**:
   - Verifizierung aller Kapitel 1–10 auf Vollständigkeit der Dossiers und Beispieldaten.
4. **Phase 4: Verifizierung & Compilation**:
   - Ausführen von `compile_applet` & `lint_applet`.
