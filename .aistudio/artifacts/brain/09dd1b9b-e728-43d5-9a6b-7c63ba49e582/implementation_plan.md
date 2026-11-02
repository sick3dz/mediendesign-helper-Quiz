# Implementation Plan: Natural Practice Mockups for All Mini-Challenges

## Goal
Upgrade all mini-challenge components (`AffordanceSignifierGame`, `ProcessSorterGame`, and `WcagMatchGame`) so they feature authentic, visual practice mockups (rendered UI components, realistic HTML code snippets, and interactive project artifact cards) instead of abstract text descriptions.

---

## User Requirements Summary
- **Natural Visual Practice Mockups**: Replace abstract text boxes in all mini-challenges with realistic visual UI mockups, code snippets, and design artifacts.
- **Authentic Inspection**: Learners evaluate real-looking digital components and UI patterns, matching how IHK media designers encounter them in practice.

---

## Proposed Changes

### `src/components/InteractiveMinigames/AffordanceSignifierGame.tsx`
- **Visual Component Preview Stage**:
  - Replace text-only cards with a **Live UI Preview Card**:
    - **Tactile Button**: Renders a live 3D tactile button with realistic hover shadows.
    - **Signifier Badge**: Renders a brass label badge (`"Ziehen"` or `"Drücken"`).
    - **Scroll Arrow**: Renders a floating bouncing scroll-down indicator at the bottom of a web page mockup.
    - **Audio Knob**: Renders a rotary audio dial widget with degree indicators.
    - **Hyperlink**: Renders an underlined colored text link inside a realistic paragraph layout.

### `src/components/InteractiveMinigames/ProcessSorterGame.tsx`
- **Visual Design Artifact Cards**:
  - Replace plain list items with **Realistic Project Artifact Cards**:
    - **Phase 1**: Client Briefing & Persona Document Card (`Anforderungsanalyse`).
    - **Phase 2**: Sitemap & Hierarchy Diagram Card (`Informationsarchitektur`).
    - **Phase 3**: Low-Fi Black & White Grid Card (`Wireframe`).
    - **Phase 4**: Full Color UI Layout & Typography Card (`Mockup`).
    - **Phase 5**: Interactive Clickable Flow Card (`Prototyp`).
    - **Phase 6**: Code Editor Snippet Card (`Entwicklung & Deployment`).

### `src/components/InteractiveMinigames/WcagMatchGame.tsx`
- **Visual Web Component & Code Snippets**:
  - Replace plain text statements with **Rendered Web Component Preview Cards**:
    - **Contrast Ratio**: Renders a live contrast preview card with a `4.5:1` ratio meter.
    - **Keyboard Focus**: Renders a button with an active focus outline indicator and keyboard keys (`Tab ↹`, `Enter ↵`).
    - **Form Validation**: Renders an in-situ form error notification banner.
    - **Semantic HTML**: Renders a syntax-highlighted HTML source code preview (`<header>`, `<nav>`, `<main>`).
    - **Accessible Video**: Renders a video player UI mockup with active closed captions (`[CC]`).

---

## Verification Plan

1. **Compilation Check**:
   - Run `compile_applet` to verify React/Vite compilation.
2. **TypeScript Validation**:
   - Run `lint_applet` (`tsc --noEmit`) to verify zero type or lint errors.
