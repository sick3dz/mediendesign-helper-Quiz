# Implementation Plan - Open Shiny Pet Eyes, Auto-Thoughts & Accessory Layering Fix

Fix the pet avatar eye SVGs to display open, lively eyes with sparkle catchlights, implement periodic blinking, set up automatic thought bubble updates every 12 seconds without click audio, and verify accessory overlay z-indexing in the top pet view.

## User Requirements
1. **Thought Bubble Auto-Rotate**: Remove manual audio click on the thought bubble. Automatically update quotes every 12 seconds and upon any pet activity.
2. **Accessory Layering**: Ensure newly equipped accessories (hats, glasses, collars, frames) render cleanly on top of the pet avatar in the room header view.
3. **Open Shiny Eyes & Blinking**: Update pet SVGs in `PetAvatar.tsx` so all species (Dog, Cat, Penguin, Axolotl) have open, friendly "Glanzaugen" with sparkle highlights when awake, and blink occasionally.

## Proposed Changes

### 1. `src/components/PetAvatar.tsx`
- Refactor eye SVG rendering in `renderDog`, `renderCat`, `renderPenguin`, and `renderAxolotl`:
  - When `pet.isSleeping` is true, display peaceful closed eye arcs `💤`.
  - When awake, render open, large, expressive eyes with shiny white catchlights (`glanzaugen`).
  - Apply `animate-pet-blink` class to the eye group so they blink closed briefly every 4 seconds.
- Verify accessory z-indexes (`head`, `face`, `neck`, `frame`) so all equipped items are layered on top of the pet body.

### 2. `src/index.css`
- Add `@keyframes petBlink` and CSS utility `.animate-pet-blink`:
  - Eye scaleY shrinks to 0.1 for ~0.15s every 4 seconds to simulate natural, gentle blinking.

### 3. `src/components/VirtualPetView.tsx`
- Remove `onClick` audio sound from thought bubble.
- Add a 12-second `useEffect` timer to cycle `thoughtSeed` automatically.
- Increment `thoughtSeed` on pet interactions (petting, feeding, waking up, equipping items).

## Verification Plan
1. Execute `lint_applet` (`tsc --noEmit`).
2. Execute `compile_applet` (`npm run build`).
3. Verify eyes are open and blinking, accessories render properly, and thought bubbles cycle smoothly over time.
