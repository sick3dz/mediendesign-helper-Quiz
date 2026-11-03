# Implementation Plan - Randomize Quiz Option Positions on Every Load or Restart

## Proposed Changes

### 1. Quiz Card Component (`src/components/QuizCard.tsx`)
- In `QuizCard`, memoize or compute randomized options for each question when the quiz component mounts or restarts (using `Math.random()` sort).
- Ensure that every time a user opens a module quiz, review session, or clicks "Fragen wiederholen", the option order for every question is freshly randomized so the correct answer is never predictably in the same spot.

## Verification Plan
- Run `compile_applet` and `lint_applet` to verify compilation and type safety.
