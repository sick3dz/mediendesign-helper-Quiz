# Implementation Plan: Realistic Natural Email Layout for Level 2 Phishing Challenge

## Goal
Transform the Level 2 Phishing & Fraud simulation (`PhishingDetectorGame.tsx`) into a completely natural, realistic HTML email & website preview. Remove artificial button outlines, dashed boxes, and highlighted background pills so the learner evaluates an authentic-looking email and inspects suspicious text naturally.

---

## User Requirements Summary
- **Natural Email Layout**: In Level 2 (Experten-Modus), render the simulation as a realistic, seamless HTML email.
- **No Visible Frames or Outlines**: Eliminate dashed borders (`border-dashed`), artificial button boxes, and pre-highlighted background containers around clues before discovery.
- **Natural Inspection**: Text elements (sender address, urgency banner, discount claims, payment terms) render as authentic email content and only highlight in emerald upon being discovered.

---

## Proposed Changes

### `src/components/InteractiveMinigames/PhishingDetectorGame.tsx`
- **Email Body Restructuring in Level 2**:
  - **Email Header**: Render `Von: Kundenservice <kundenservice@amaz0n-konto-verify.xyz>` as plain, realistic email header text without dashed border boxes or pill frames.
  - **Urgency Warning**: Render `DRINGEND: Ihr Konto wird in 24 Stunden unwiderruflich gesperrt!` as natural email body paragraph text rather than a framed button box.
  - **Promotional Offer**: Render the VIP deal headline (`90% Rabatt auf alle Marken-Kameras und Apple MacBooks!`) seamlessly inline within the promotional body copy.
  - **Payment Terms**: Render `Zahlungsart: Nur direkte Banküberweisung (Vorkasse)` as standard text inside the offer footer/details block without separate button borders.
- **Post-Discovery Highlight**:
  - Elements only receive a subtle green background and checkmark (`✓`) *after* being successfully clicked and identified by the user.

---

## Verification Plan

1. **Compilation Check**:
   - Run `compile_applet` to verify React/Vite build.
2. **TypeScript Validation**:
   - Run `lint_applet` (`tsc --noEmit`) to verify zero type or lint errors.
