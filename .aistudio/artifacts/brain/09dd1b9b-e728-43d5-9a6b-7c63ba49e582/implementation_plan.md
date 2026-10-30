# Implementation Plan - ADHD Dopamine Boosters (Streak Combos, Sprint Loot Box & Pet High-Five)

Introduce three lightweight, highly motivating ADHD mechanics to maximize engagement and reward focus without cluttering the user interface.

## Proposed Features

### 1. Dopamin-Combos (`🔥 3er-Serie + Bonus EXP`)
- **Module Learning**: Track consecutive correct answers (`streakCombo`).
- **Reward**: On every 3rd consecutive correct answer:
  - Display a floating toast (`🔥 3ER-COMBO! +25 EXTRA EXP!`).
  - Trigger celebratory confetti burst.
  - Award +25 extra EXP points directly.

### 2. Fokus-Sprint Mystery Loot Box (`🎁 Fokus-Belohnungskiste`)
- **Sprint Completion**: When a 5-min or 15-min Focus Sprint finishes:
  - Display an interactive "Mystery Loot Box" unboxing card.
  - Unboxing awards a random surprise drop (e.g. 2x Glücks-Kekse, 1x Fokus Bubble Tea, or +100 Bonus EXP) with a celebratory unboxing sound and confetti.

### 3. Pet High-Five / Pfötchen-Geben (`🐾 High-Five Action`)
- **Interactive High-Five**: Add a quick "🐾 High-Five" button to `TopPetCompanionBar.tsx` and `VirtualPetView.tsx`.
- **Reaction**: Triggers a cheerful high-five sound, energetic pet bounce, +10 happiness boost, and encouraging motivational pop-up (*"✋ High-Five! Du rockst das!"*).

## Verification Plan
1. Execute `lint_applet` (`tsc --noEmit`).
2. Execute `compile_applet` (`npm run build`).
3. Test streak combos, sprint loot box unboxing, and pet high-five interactions.
