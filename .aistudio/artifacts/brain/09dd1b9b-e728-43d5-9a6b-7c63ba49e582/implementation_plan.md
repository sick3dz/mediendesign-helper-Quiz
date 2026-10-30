# Level-Progression & Belohnungs-Roadmap in der Haustier-Lounge

Dieser Implementierungsplan beschreibt die Integration einer transparenten, motivierenden Level- und Belohnungsübersicht direkt in die Haustier-Lounge. Nutzer sehen jederzeit auf einen Blick, auf welchem Level sie sich befinden, wie viele EXP bis zum nächsten Aufstieg fehlen, wie der nächste Rang heißt und welche exklusiven Belohnungen (Lerntitel und Futter-Pakete) beim Erreichen freigeschaltet werden.

---

## User Review & Bestätigte Entscheidungen

> [!IMPORTANT]
> Folgende Entscheidungen wurden basierend auf deinen Antworten im interaktiven Frage-Schritt festgelegt:

- **Platzierung**: Als prominente, stylische Übersichtskarte direkt über dem Haustier-Raum in der Haustier-Lounge (`VirtualPetView.tsx`).
- **Belohnungsarten**: Exklusive Lerntitel für das Profil sowie reichhaltige Futter- und Snack-Pakete für das Haustier, die automatisch im Inventar landen.
- **Transparenz & Übersicht**: Direkte Anzeige des aktuellen Rangs, Fortschrittsbalken mit exakter EXP-Differenz (`Noch X EXP bis Level Y`), Vorschau des Folgerangs sowie ein aufklappbarer Level-Pfad für alle Stufen.

---

## 1. Übersicht & Kernkonzept

- **Ziel**: Dem Nutzer eine glasklare Orientierung über seinen Lern- und Erfahrungsfortschritt geben und zusätzlichen Anreiz schaffen, Module und Sprints abzuschließen.
- **Didaktischer & psychologischer Effekt**:
  - Sichtbare "Noch 120 EXP bis Level 4"-Etappenziele aktivieren die Lernmotivation.
  - Das Haustier profitiert direkt durch kostenlose Gourmet-Snacks, die bei jedem Levelaufstieg ins Inventar wandern.
  - Der neue Titel kann sofort getragen und im Header angezeigt werden.

---

## 2. User Experience & Visuelles Design

### A. Prominente Level-Header-Karte (`VirtualPetView.tsx`)
- **Gestaltung**:
  - Hochwertige Card im 60-30-10 Design, passend zu hellem und dunklem Modus.
  - Links: Großes Level-Insignia mit Stern/Rang-Icon (`Level 3`) und dem aktuellen Rangnamen (`UX-Junior`).
  - Mitte: Sauberer, ungerahmter Fortschrittsbalken mit Tabular-Numerals:
    - Text: `340 / 500 EXP` (68% erreicht).
    - Status-Hinweis: `Noch 160 ⚡ EXP bis Level 4 (IxD-Spezialist)`.
  - Rechts: Vorschau-Badge der nächsten Belohnung:
    - `🎁 Nächste Belohnung: 4x 🍩 Donut + Titel 'IxD-Spezialist'`.
  - Button: *"Alle Level ansehen"* zum Aufklappen der vollständigen Rangliste (Level 1 bis 7).

### B. Vollständige Stufenleiter (Level 1 bis 7)
| Level | Benötigte EXP | Rang-Titel | Freigeschaltete Belohnung |
|---|---|---|---|
| **Level 1** | 0 EXP | **Design-Novize** | Startausstattung & Haustier-Adoption |
| **Level 2** | 200 EXP | **Konzept-Trainee** | 2x 🍕 Pizza-Snack + Titel *"Konzept-Trainee"* |
| **Level 3** | 500 EXP | **UX-Junior** | 3x 🍣 Sushi-Platte + Titel *"UX-Junior"* |
| **Level 4** | 1.000 EXP | **IxD-Spezialist** | 4x 🍩 Schoko-Donut + Titel *"IxD-Spezialist"* |
| **Level 5** | 1.800 EXP | **Konzeptions-Profi** | 5x 🥩 Deluxe-Steak + Titel *"Konzeptions-Profi"* |
| **Level 6** | 3.000 EXP | **Prüfungs-Titan** | 5x 🍰 Zauber-Kuchen + Titel *"Prüfungs-Titan"* |
| **Level 7** | 5.000 EXP | **Design-Legende** | 10x Festmahl-Mix + Titel *"Design-Legende"* |

### C. Automatischer Levelaufstiegs-Trigger & Feier
- Beim Überschreiten der EXP-Schwelle:
  - Automatisches Hinzufügen der Snack-Mengen in `pet.inventory.food`.
  - Hinzufügen des neuen Titels in `unlockedCosmetics`.
  - Festliche Toast-Benachrichtigung und Level-Up-Fanfare.

---

## 3. Technische Umsetzung & Komponenten-Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                    VirtualPetView.tsx                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            PetLevelProgressionCard.tsx                │  │
│  │   [Lvl 3: UX-Junior]  === 68% ===  [Lvl 4 Vorschau]   │  │
│  │   🎁 Nächste Belohnung: 4x Donut + Titel              │  │
│  │   [Button: Alle Ränge anzeigen / minimieren]          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               Pet Room & Care Showcase                │  │
│  │         (Avatar, Streicheln, Füttern, Tabs)           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Dateiänderungen:
1. `src/services/storageService.ts`:
   - Erweiterung der `calculateLevel`-Funktion um `rewards` (Food items + Title name), `progressPercent` und `xpRemaining`.
   - Export der vollständigen `LEVEL_LADDER`-Konstante.
2. `src/components/VirtualPetView.tsx`:
   - Einbindung der neuen `PetLevelProgressionCard` als oberstes Element der Haustier-Lounge.
   - Interaktives Umschalten der Detail-Rangliste mit allen 7 Stufen.
3. Verifikation mit `compile_applet` und `lint_applet`.
