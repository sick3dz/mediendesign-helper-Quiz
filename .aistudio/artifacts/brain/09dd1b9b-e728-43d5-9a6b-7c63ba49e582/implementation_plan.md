# Umsetzungsplan: Interaktive Step-by-Step Lernhäppchen mit automatischem Top-Scroll

## User Intent
Der Benutzer möchte, dass beim Wechsel zu einem neuen Lernhäppchen (Nugget) die Ansicht **sofort ganz nach oben** zum Anfang springt, damit man nicht scrollen muss. Zudem sollen die Inhalte (Kernkonzept, Bulletpoints, Praxisbeispiele, Prüfungsmerksatz) schrittweise oder übersichtlich als interaktive Lernkarten dargestellt werden.

---

## Proposed Changes

### 1. `src/components/ModuleLearningView.tsx` anpassen
- **Sofortiges automatisches Scrollen**:
  - Bei jedem Wechsel von `currentNuggetIndex` sofortiges Scrollen zum Top-Container `nuggetViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- **Progressive Step-by-Step Aufdeckung (Interaktiv)**:
  - Jeder Bulletpoint / Abschnitt schaltet sich nach und nach frei (oder wird kompakt im vertikalen Lernfluss dargestellt), sodass man aktiv durch den Lernschritt geführt wird.
  - Ein Klick auf "Nächstes Detail" oder "Weiter" deckt den nächsten Baustein auf, bis das Häppchen komplett ist und zum nächsten Häppchen weitergeschaltet wird.

---

## Verification Plan

### Automated Verification
- `compile_applet` ausführen, um fehlerfreie Kompilierung zu verifizieren.

### Manual Verification
- In einem Modul (z. B. Kapitel 8) ein Häppchen aufrufen und auf "Nächstes Häppchen" klicken.
- Prüfen, dass der Bildschirm sofort zum oberen Rand des neuen Häppchens scrollt und die Inhalte sauber step-by-step präsentiert werden.
