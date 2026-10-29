# Umsetzungsplan: Obere Navigationsleiste schlank & überlappungsfrei gestalten

## User Intent
Der Benutzer möchte die obere Leiste aufgeräumt und elegant gestalten. Die bisherigen doppelten Textlinks in Kombination mit dem Markennamen führten auf kleineren Bildschirmen zu Überlappungen. Gemäß der Benutzerauswahl wird der Markenname weggelassen und die Navigation auf den zentralen **Lernen / Menü**-Button fokussiert, über den man per Floating-Dropdown auf alle Bereiche zugreifen kann.

---

## Proposed Changes

### 1. `src/components/TopBar.tsx` vereinfachen & aufräumen
- **Entfernen**: Den redundanten Text-Markennamen („DesignKonzept.prep“) und die einzelnen doppelten Textlinks (`Haustier`, `IHK-Prüfung`, `Digital-Leitfaden`, `Quiz-Spiele`).
- **Neues zentrales Element**:
  - Ein moderner, schlanker **Lernen / Menü**-Dropdown-Button im Zentrum.
  - Beim Klick öffnet sich das Floating-Dropdown mit klaren Direktzugriffen auf:
    1. 📚 **IHK-Lernpfad & Kapitel**
    2. 💡 **Digital-Leitfaden (IHK)**
    3. ✨ **Haustier-Lounge & EXP-Shop**
    4. 🏆 **IHK-Abschlussprüfung**
    5. 🎮 **Quiz-Spiele Hub**
- **Rechte Aktionselemente**:
  - Kompaktes **Backup**-Icon, **Dark-Mode-Toggle** und **Fokus-Sprint**-Button, ohne jegliche Überlappungen oder Platzprobleme.

---

## Verification Plan

### Automated Verification
- `compile_applet` ausführen, um sicherzustellen, dass keine Syntax- oder TypeScript-Fehler vorliegen.

### Manual Verification
- Auf allen Bildschirmgrößen (Desktop & Mobile) prüfen, dass die obere Leiste aufgeräumt, zentriert und völlig frei von Überlappungen ist.
- Auf den **Lernen / Menü**-Button klicken, um sicherzustellen, dass sich alle Direktzugriffe nahtlos steuern lassen.
