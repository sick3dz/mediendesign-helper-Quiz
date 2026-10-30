# Implementation Plan - Smart Spaced-Recall Sprint & 4-4-4 Box-Breathing Relaxation

Enhance the **Fokus-Sprint** with a 20-unit maximum cap, spaced flashcard recall logic, design-focused content filtering, and a post-sprint guided 4-4-4 Box-Breathing relaxation mode.

## Proposed Features

### 1. Relevanz-Filter & Rein Design-Inhalte
- Remove non-design items (such as SQL database questions) from the active quiz pool.
- Ensure 100% of questions and flashcards cover Mediengestaltung, Interaktionsdesign (IxD), UX/UI, Wireframing, Typografie, and Design-Konzept.
- Professional category badges (e.g. `Design-Konzept • Interaktionsdesign`).

### 2. Smart Spaced Recall (Karteikarte ➔ 2-3 Schritte ➔ Abfrage)
- When the user reads a **Karteikarte (Flashcard)**, automatically queue a matching **Quiz-Frage** 2 to 3 positions later in the sprint queue.
- Directly tests active memory recall shortly after reading, cementing long-term knowledge without feeling overwhelming.

### 3. Maximal 20 Einheiten Limit
- Set a strict cap of **20 Einheiten (20 Units)** per Fokus-Sprint.
- Live unit progress counter (`Einheit 7 / 20`).
- Session completes automatically upon finishing the 20th unit, even if the 5-minute timer has not elapsed.

### 4. Interaktiver 4-4-4 Box-Breathing Kreis
- Upon session completion + Loot Box unboxing:
  - Transition into an interactive **4-4-4 Box-Breathing Visualizer**.
  - Animated pulsing circle guiding 4s Einatmen → 4s Halten → 4s Ausatmen → 4s Halten.
  - Allows the user to relax, lower cognitive load, and decompress for the remaining time.

## Verification Plan
1. Execute `lint_applet` (`tsc --noEmit`).
2. Execute `compile_applet` (`npm run build`).
3. Verify spaced recall queueing, 20-unit cap, design-only filtering, and box-breathing animation.
