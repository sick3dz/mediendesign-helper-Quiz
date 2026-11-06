# Implementation Plan - IHK Freitext-Trainer (Open-Ended Exam Questions)

## User Request & Context
- **Feature:** Dedicated menu item "Freitext-Trainer" in the TopBar.
- **Functionality:** Open-ended IHK exam questions ("Erläutere XY vor...", "Beschreibe den Ablauf von...", "Welche Pflichten hat...").
- **Evaluation:** Hybrid approach:
  1. Instant offline keyword match & model answer comparison (checks for required technical terms and core concepts).
  2. Optional AI deep evaluation via Gemini API (`@google/genai` SDK) if configured or requested.
- **Integration:** New `ActiveTab = 'freetext'`, view component `FreetextTrainerQuizView.tsx`, and curated IHK open questions dataset `src/data/freetextQuestions.ts`.

---

## Proposed Changes

### 1. Curated IHK Open-Ended Questions (`src/data/freetextQuestions.ts`)
Create a dataset of IHK open-ended questions covering:
- Web & Interface Design (Accessibility, Gestalt laws, UX metrics)
- Media & Graphics (Color spaces, vector vs raster, single source publishing)
- IT Security & Law (DSGVO, Urheberrecht, Phishing indicators)
- WiSo & Labor Law (Probezeit, Kündigungsschutz, BBiG)

Each question includes:
- `id`: string
- `category`: string
- `question`: string
- `maxPoints`: number (e.g. 10 or 15 points)
- `requiredKeywords`: string[] (mandatory technical terms)
- `modelAnswer`: string (official IHK rubric/model answer)
- `hint`: string

### 2. Freitext-Trainer View (`src/components/FreetextTrainerQuizView.tsx`)
- Interactive exam simulation with timer and navigation.
- Rich textarea input with word count and keyword hint checklists.
- **Hybrid Evaluation Engine:**
  - Offline keyword check: counts matched mandatory keywords, calculates score percentage, highlights missing terms.
  - Optional Gemini AI evaluation: sends user answer + model answer to Gemini API (`gemini-2.5-flash` or similar) for professional IHK grading and constructive feedback.
- EXP / Coin rewards and confetti on completion.

### 3. TopBar & App Navigation Integration (`src/components/TopBar.tsx` & `src/App.tsx`)
- Add `'freetext'` to `ActiveTab`.
- Add "Freitext-Trainer" entry to the TopBar dropdown menu with icon (`FileText` or `PenTool`) and badge (`IHK-Freitext`).
- Render `FreetextTrainerQuizView` in `App.tsx`.

---

## Verification Plan
1. Compile and lint app (`compile_applet` & `lint_applet`).
2. Verify dev server runs cleanly on port 3000.
