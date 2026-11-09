# Mobile Layout & Component Fix: PM Cycle Asset & Modal View

Implementation plan to resolve the side-by-side rendering bug in card widgets, fix horizontal clipping, and optimize the modal inspector for full-width mobile viewports.

## User Review & Critical Decisions

> [!IMPORTANT]
> Confirmed user choices from Phase 1:
> 1. **Inline Card Display**: Render a clean, single graphic thumbnail in inline cards with an explicit zoom badge. Eliminate side-by-side double image rendering.
> 2. **Mobile Modal Layout**: Make the modal view full-width on mobile viewports (`max-w-4xl`, full screen width, dynamic height scrolling) without dead black side padding.

---

## 1. Overview & Root Cause Analysis

- **Bug 1 (Side-by-Side Image Collision)**: In `QuestionAssetWidget.tsx`, the condition `(asset.type === 'image' || asset.imageUrl)` evaluated to `true` for `pm_cycle` assets because `asset.imageUrl` was defined. This caused the component to render **both** `<PmCycleGraphic>` **and** `<img src={asset.imageUrl}>` inside the same flex container, forcing them side-by-side and cropping both horizontally on mobile screens (as captured in `IMG_3248`).
- **Bug 2 (Squished Modal Content)**: In `AssetViewerModal.tsx`, fixed dark container padding (`bg-slate-950 p-6`) inside a constrained modal height forced wide black margins on phone screens (as captured in `IMG_3249`), reducing the SVG diagram area to a tiny square.

---

## 2. User Experience & Mobile Layout Fixes

```
INLINE CARD FIX (QuestionAssetWidget):
┌──────────────────────────────────────────────────────────┐
│  PRÜFUNGS-ASSET [pm_cycle]                               │
│  IHK Leitfaden-Asset: DIN 69901-2 PM-Kreislauf  [🔍 HD]  │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐ │
│ │  [Clean Single HD Graphic / SVG Thumbnail]           │ │
│ │  (No double image side-by-side collision!)           │ │
│ └──────────────────────────────────────────────────────┘ │
│  💡 Klick zum Öffnen der interaktiven 5-Phasen-Großansicht │
└──────────────────────────────────────────────────────────┘

MOBILE MODAL FIX (AssetViewerModal & PmCycleGraphic):
┌──────────────────────────────────────────────────────────┐
│  IHK Original-Aufgaben-Asset                       [ X ] │
├──────────────────────────────────────────────────────────┤
│  [ Mode Tabs: ⚡ Interaktiv | 🖼️ HD Grafik | 📄 Skript ] │
│                                                          │
│                 1. INITIALISIERUNG                       │
│              ╭───────────────────────╮                   │
│  5. ABSCHLUSS│ DIN 69901-2 KREISLAUF │ 2. DEFINITION     │
│              ╰───────────────────────╯                   │
│         4. STEUERUNG          3. PLANUNG                 │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Active Phase Card: "Phase 1: Initialisierung"        │ │
│ │ • Machbarkeitsanalyse & Projektauftrag               │ │
│ │ • Tuckman: Forming | Führungsstil: Direkt            │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Steps

1. **Fix `QuestionAssetWidget.tsx`**:
   - Change image fallback condition from `(asset.type === 'image' || asset.imageUrl)` to `(asset.type === 'image' || (asset.imageUrl && asset.type !== 'pm_cycle'))`.
   - Ensure `isInline={true}` in `PmCycleGraphic` returns a single, centered visual thumbnail with zero side-by-side flex duplication.
2. **Optimize `AssetViewerModal.tsx` & `PmCycleGraphic.tsx`**:
   - Remove redundant `p-6 bg-slate-950` wrapper side padding in modal body for `pm_cycle` assets.
   - Set `PmCycleGraphic` container width to `w-full max-w-3xl` with responsive padding `p-2 sm:p-5`.
   - Ensure touch targets on mobile nodes are at least 44px for easy tapping on small screens.
3. **Build & Verify**:
   - Run `compile_applet` and `lint_applet` together to verify zero syntax/type errors.
