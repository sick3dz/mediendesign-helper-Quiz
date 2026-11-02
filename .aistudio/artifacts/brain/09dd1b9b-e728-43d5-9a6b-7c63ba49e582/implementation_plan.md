# Implementation Plan - XP Rebalancing

The user has requested to reduce XP gain because progress is currently too fast, allowing items to be purchased too easily. The goal is to reduce the base XP per correct answer from 100 to 20 and scale down other rewards while keeping the "Combo" feeling.

## User Requirements
- Reduce XP per correct answer from 100 to 20.
- Keep Combo bonuses but with smaller numbers.
- Ensure all mini-games are adjusted to this new economy.

## Proposed Changes

### 1. Components - Quiz & Learning
- **QuizCard.tsx**: 
    - Change base reward from `100 * nextCombo` to `20 * nextCombo`.
    - Update combo toast text for the 3-streak bonus.
- **ModuleLearningView.tsx**:
    - Verify that Level 2 multiplier (1.5x) still feels correct with smaller base numbers (it should).

### 2. Mini-Games XP Rebalancing
- **AffordanceSignifierGame.tsx**:
    - Change score calculation from `100 * (streak + 1)` to `20 * (streak + 1)`.
- **PhishingDetectorGame.tsx**:
    - Change XP per clue from `150` to `25`.
- **ProcessSorterGame.tsx**:
    - Change completion XP from `200` to `50`.
- **WcagMatchGame.tsx**:
    - Change XP per match from `100` to `20`.

### 3. Verification
- Run `lint` to ensure no typos in calculations.
- Run `build` to verify integrity.
