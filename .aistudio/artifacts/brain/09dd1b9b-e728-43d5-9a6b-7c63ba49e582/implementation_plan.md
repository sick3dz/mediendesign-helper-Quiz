# Implementation Plan - Mix-Up Unselected State & Level 2 Mix

## Proposed Changes

### 1. Mix-Up Modal Initial State (`src/components/MixUpConfigModal.tsx`)
- Change the initial `selectedModuleIds` state from all modules (`new Set(allModuleIds)`) to an empty set (`new Set()`) so that nothing is selected by default when opening the Mix-Up config modal.
- Add a Level 2 toggle switch ("Level 2 Meister-Modus / Transferfragen") in the modal header/toolbar.
- Pass `isLevel2: boolean` along with `selectedModuleIds` to `onStart`.

### 2. Blitz Content Utility (`src/utils/blitzContent.ts`)
- Update `buildCustomMixPool` (or create a level 2 variant / accept `isLevel2` parameter) to build mix items using `getModuleLevel2Questions` when `isLevel2` is enabled.

### 3. Main App State (`src/App.tsx`)
- Update `handleStartMixUp` to accept `(selectedModuleIds: string[], isLevel2: boolean)` and generate the appropriate mix pool.

## Verification Plan
- Run `compile_applet` and `lint_applet` to ensure type safety and correct compilation.
