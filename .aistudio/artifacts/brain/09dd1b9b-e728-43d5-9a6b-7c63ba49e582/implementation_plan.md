# Implementation Plan - Night Sleep Schedule (22:00-06:00), Exam Dream Bubbles & TopBar Live Preview

Implement automatic night sleep from 22:00 to 06:00 with exam success dream bubbles, and extend live item previews (accessories, frames) to the top navigation bar's pet icon.

## User Requirements
1. **Night Sleep Schedule (22:00 - 06:00)**: Automatically set pet state to sleeping between 22:00 and 06:00. Display a floating dream cloud bubble with IHK exam victory dreams (`💭 🎓 💯 🏆 📜`).
2. **TopBar Live Preview**: When previewing items (accessories, frames) in Shop or Wardrobe, mirror the preview onto the small pet avatar in `TopBar.tsx`.

## Proposed Changes

### 1. `src/data/petData.ts`
- Update `calculatePetDecay(pet)`:
  - Check current hour (`new Date().getHours()`). If `hour >= 22 || hour < 6`, automatically set `isSleeping: true`.
- Update `getDynamicPetThought(pet)`:
  - Add night dream thoughts for sleeping pets focused on passing the IHK exam, receiving 100% scores, and earned trophies.

### 2. `src/components/PetAvatar.tsx`
- Enhance sleeping state visuals:
  - Render a animated floating dream cloud bubble (`💭 🎓 💯 🏆`) with gentle bounce/pulse above sleeping pets.

### 3. `src/App.tsx` & `src/components/TopBar.tsx`
- Add `activePreview` state (`previewAccessory`, `previewFrame`) to `App.tsx` or pass preview callback from `VirtualPetView.tsx`.
- Pass `previewOverride` to `TopBar.tsx`'s `PetAvatar` component so item previews render live on the header avatar as well.

## Verification Plan
1. Run `lint_applet` (`tsc --noEmit`).
2. Run `compile_applet` (`npm run build`).
3. Verify night sleep logic, dream bubbles, and live TopBar preview sync.
