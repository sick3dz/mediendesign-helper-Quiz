# Einbettung des interaktiven DIN 69901-2 Kreislauf-SVG-Elements (Minispiel 7 & Lernmodule)

Umsetzungsplan zur Ersetzung der starren Lehrskript-Fotografik (`IMG_3246`) durch das interaktive 5-Phasen-SVG-Kreislauf-Modell in Minispiel 7 (`PmCycleFinalGame.tsx`) und den Lern-Häppchen (`ModuleLearningView.tsx`).

## User Review & Critical Decisions

> [!IMPORTANT]
> Der Nutzer hat im Klärungsschritt folgende Option bestätigt:
> - **Standard-Einbettung**: Das interaktive 5-Phasen-SVG-Modell mit anklickbaren Knoten, Live-Detailkarten und integriertem Umschalter soll als Standard-Visualisierung anstelle des statischen Skript-Fotos eingebunden werden.

---

## 1. Overview & Problem Definition

- **Problem**: In Minispiel 7 (*"Phase 5: Abschluss & der geschlossene PM-Kreislauf"*) sowie in den Lern-Häppchen wurde beim Aufklappen des Schaubilds bisher ein statisches Skript-Foto (`IMG_3246_0e617e58.jpeg`) angezeigt (siehe Nutzer-Screenshot `IMG_3250`).
- **Lösung**: Ersetzung des starren `<img>`-Elements durch die interaktive `<PmCycleGraphic />`-Komponente in `PmCycleFinalGame.tsx` und `ModuleLearningView.tsx`. Dadurch erhalten Lernende direkten Zugriff auf den anklickbaren 5-Phasen-SVG-Kreislauf mit IHK-Deliverables, Tuckman-Phasen und Führungsstilen.

---

## 2. User Experience & Integration Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│  MINISPIEL 7: PHASE 5 ABSCHLUSS & GESCHLOSSENER KREISLAUF             │
├────────────────────────────────────────────────────────────────────────┤
│  [ Mode Switcher: ⚡ Interaktiv | 🖼️ HD Grafik | 📄 Skript-Foto ]       │
│                                                                        │
│                       1. INITIALISIERUNG                               │
│                      ╭──────────────────╮                              │
│         5. ABSCHLUSS │                  │  2. DEFINITION               │
│                      │  PROJEKTMANAGEMENT│                              │
│                      │    DIN 69901-2   │                              │
│          4. STEUERUNG╰──────────────────╯  3. PLANUNG                  │
│                                                                        │
│  [ Live Phase Detail Card on Click / Hover ]                           │
├────────────────────────────────────────────────────────────────────────┤
│  SÄULE #1 VON 4: PROJEKTABSCHLUSSBERICHT                               │
│  Zu welcher Abschlussaufgabe gehört das?                               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technical Architecture & File Edits

1. **`src/components/InteractiveMinigames/PmCycleFinalGame.tsx`**:
   - Import `PmCycleGraphic` from `./PmCycleGraphic`.
   - Replace static `<img>` container in lines 240-262 with `<PmCycleGraphic imageUrl="/assets/aistudio/IMG_3246_0e617e58.jpeg" />`.
2. **`src/components/ModuleLearningView.tsx`**:
   - Import `PmCycleGraphic` from `./InteractiveMinigames/PmCycleGraphic`.
   - Update nugget image rendering so that PM cycle nuggets automatically render `<PmCycleGraphic imageUrl={currentNugget.imageUrl} />`.
3. **Verification**:
   - Co-execute `compile_applet` and `lint_applet` to confirm build succeeds without errors.
