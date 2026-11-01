# Restructuring Gamification, Shop & Achievements Navigation

Reorganize the entire gamification ecosystem by creating a clean, dedicated **"Gamification & Belohnungen"** Hub. Instead of crowding pet care, shop items, wardrobe, and achievements into a single nested menu, the new design introduces four distinct, logical top-level tabs with clear domain separation.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Key architectural decisions aligned with user input:

- **Confirmed Decision 1 (Gamification Hub Structure)**: A dedicated, clean Gamification Hub with intuitive main tabs rather than mixing everything inside the Pet Care card.
- **Confirmed Decision 2 (Strict Domain Separation)**:
  1. 🐾 **Gefährte**: Virtual pet stage, thought bubble, vitals (hunger & happiness), feeding from quick inventory, and level roadmap.
  2. 🛍️ **Shop**: Clean catalog for purchasing snacks, pet accessories, gadgets, app themes, soundpacks, titles, and frames.
  3. 🎒 **Inventar**: Dedicated inventory overview showing all owned items, food stocks, acquired accessories, and unlocked cosmetics with one-click equip actions.
  4. 🏆 **Erfolge**: Dedicated achievements dashboard featuring progress bars, numeric ratios (e.g. `3 / 5`), actionable directives, and instant reward claiming.
- **Confirmed Decision 3 (Top Navigation Clarity)**: In the main TopBar navigation, the tab is named **"Belohnungen & Haustier"** or **"Gamification"**, leading directly into this newly structured hub.

---

## 1. Overview & Core Concept

- **Problem Addressed**: Previously, the virtual pet view contained a crowded grid of 6 different sub-tabs (care, shop, wardrobe, achievements, minigames, adoption), making it cluttered and hard to navigate.
- **New Solution**:
  - A clean 4-tab top navigation bar inside the Gamification Hub:
    - **Tab 1: 🐾 Gefährte** (Pet Care, Vitals, Feeding, Level Ladder)
    - **Tab 2: 🛍️ Shop** (Storefront with clear category pills)
    - **Tab 3: 🎒 Inventar** (My Items, Wardrobe, Style Studio & Equipped Gear)
    - **Tab 4: 🏆 Erfolge** (Achievements Dashboard, Progress Bars & Claimable Rewards)
  - Dedicated full-width layouts for each tab so that Shop items, Inventory gear, and Achievement cards have space to breathe without UI overcrowding.

---

## 2. User Experience & Visual Design

```
┌────────────────────────────────────────────────────────────────────────┐
│  🌟 GAMIFICATION & BELOHUNGS-ZENTRUM                                   │
│  ────────────────────────────────────────────────────────────────────  │
│  [ 🐾 Gefährte ]   [ 🛍️ Shop ]   [ 🎒 Inventar ]   [ 🏆 Erfolge ]     │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Active Tab View Content                                          │  │
│  │ (e.g. Shop catalog OR Inventory gear OR Achievements dashboard)  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Tab Breakdown & Features
1. **🐾 Gefährte (Pet Companion)**:
   - Pet avatar showcase, dynamic thought bubble, vitals gauges, level & XP progression roadmap.
   - Quick-feed food drawer for fast snack distribution.
2. **🛍️ Shop (Rewards Shop)**:
   - Categorized catalog: Snacks & Food, Pet Accessories, Gadgets, App Themes, Soundpacks, Titles, Animated Frames.
   - Dual-currency price tags (EXP and Coins) with live preview buttons.
3. **🎒 Inventar (My Inventory & Wardrobe)**:
   - Overview of all acquired items and stock quantities.
   - One-click equip/unequip for accessories, gadgets, themes, titles, and frames.
4. **🏆 Erfolge (Achievements Dashboard)**:
   - Summary status bar showing unlocked vs total achievements, total claimed XP/Coins.
   - Category filters (All, Learning, Quiz, Care, Streak).
   - Numerical ratio progress bars, actionable lightbulb hints (`💡 Nächster Schritt...`), and pulsing reward claiming buttons.

---

## 3. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│              activeTab: 'chapters' | 'pet' | 'exam' | ...             │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          VirtualPetView.tsx                            │
│     activeGamificationTab: 'pet' | 'shop' | 'inventory' | 'achievements'│
└────────┬───────────────────┬───────────────────┬───────────────────────┘
         │                   │                   │                       │
         ▼                   ▼                   ▼                       ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────┐
│ PetCompanion    │ │ Gamification    │ │ PlayerInventory │ │ PetAchievementsSection  │
│ Section         │ │ ShopSection     │ │ Section         │ │ (Dashboard)             │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────────────┘
```

---

## Implementation Steps

1. **Refactor `VirtualPetView.tsx` Navigation**:
   - Establish top-level tabs: `'pet' | 'shop' | 'inventory' | 'achievements'`.
   - Create clean, single-line segment navigation buttons.
2. **Extract & Modularize Sub-Views**:
   - `PetCompanionSection`: Pet stage, thought bubble, vitals, quick-feed snacks, level ladder.
   - `GamificationShopSection`: Organized storefront with categories.
   - `PlayerInventorySection`: Clean inventory studio showing owned items and equip toggles.
   - `PetAchievementsSection`: Achievements dashboard with progress bars, numerical counters, and claim handlers.
3. **Update TopBar & Navigation Labeling**:
   - Update main app header link label to "Haustier & Belohnungen" or "Gamification".
4. **Verification & Build Check**:
   - Run `lint_applet` and `compile_applet` to ensure zero compilation or build errors.
