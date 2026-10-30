# Implementierungsplan: Belohnungssystem, Kosmetik-Shop & stressfreie Haustier-Mechanik

Dieser Plan führt ein umfassendes, motivierendes Belohnungssystem ein, das reichhaltige Belohnungsanreize mit gesunder Wirtschaftlichkeit (Coin-/XP-Sink) verbindet, neue Kosmetika für die gesamte Lernplattform freischaltet und das virtuelle Haustier garantiert unsterblich und stressfrei gestaltet.

---

## 1. Übersicht der Kernziele

1. **Haustier-Unsterblichkeit & Friedlicher Schlafmodus**:
   - Das Haustier kann **niemals sterben**, verhungern oder weglaufen.
   - Sinkt die Versorgung nach längerer Abwesenheit unter einen Schwellenwert, wechselt das Haustier in einen gemütlichen **"Schläft friedlich 💤"**-Modus (süße Schlaf-Animation mit schwebenden *Zzz*-Partikeln).
   - Es gibt **keine negativen Strafen oder Punktabzüge**.
   - Jede Interaktion (Füttern, Streicheln, ein Lernhäppchen oder Quiz lösen) weckt das Haustier sofort liebevoll auf ("Guten Morgen! Schön, dass du lernst! 🎉").

2. **Wirtschafts- & Belohnungsbalance (Stufen-Preise)**:
   - Klare Staffelung von Belohnungen, damit Coins & XP über die gesamte Lernreise wertvoll bleiben:
     - **Starter-Stufe (30 – 150 Coins / XP)**: Snacks, Einsteiger-Titel & Accessoires.
     - **Fortgeschritten (250 – 500 Coins / XP)**: Besondere Accessoires, animierte Standard-Rahmen.
     - **High-Tier (750 – 1.200 Coins / XP)**: Vollständige Farbthemen & alternative Soundpacks.
     - **Prestige-Tier (2.000 – 5.000 Coins / XP)**: Exklusive Meister-Titel (z. B. *"IHK-Prüfungsgott"*, *"Design-Halbgott"*), legendäre Regenbogen-Prisma-Rahmen und Cyber-Theme.
   - Kauf wahlweise mit **Coins** ODER gesammelten **XP** (flexibles Ausgeben).

3. **Seiten-Kosmetik (Vollwertige App-Anpassungen)**:
   - **Farbthemen**:
     - *Standard Slate/Indigo* (Klassisch sauber)
     - *Cyberpunk Neon* (Futuristische Cyan-/Magenta-Akzente & Dark-Tech)
     - *Forest Emerald* (Beruhigendes, fokussierendes Smaragdgrün)
     - *Sunset Amber* (Warme Violett-/Goldorange-Atmosphäre)
     - *Nordic Ice* (Frisches arktisches Eisblau & Mint)
     - *Pastel Lavender* (Sanfte, augenschonende Pastelltöne)
   - **Titel**:
     - Wählbare Titel für den Profil- und TopBar-Header (z. B. *"Wireframe-Zauberer"*, *"Scrum-Titan"*, *"A11y-Schutzpatron"*, *"Pixel-Perfektionist"*).
   - **Soundpacks (Web Audio API Synthesizer)**:
     - *Modern Standard* (Klare Sinus- & Dreiecks-Glocken)
     - *Retro 8-Bit Arcade* (Chiptune Square-Wave & Arpeggio-Fanfaren)
     - *Sci-Fi Synth* (Futuristische Resonanz-Gleitklänge)
     - *Cozy Acoustic* (Sanfte organische Klicks und warme Töne)
   - **Animierte Pet-Rahmen**:
     - *Goldener Schimmer* (Pulsierender Gold-Glanz)
     - *Cyber Neon Matrix* (Rotierender Neon-Glow-Ring)
     - *Regenbogen-Aura* (Fließender Prismen-Farbverlauf)
     - *Sternenglanz* (Sanft glitzernde Partikel)

---

## 2. Technische Architektur & Änderungen

### A. Datenstrukturen (`src/types/quiz.ts` & `src/data/cosmeticsData.ts`)
- Neue Schnittstellen für Kosmetik-Kataloge:
  - `CosmeticTheme`: ID, Name, Beschreibung, Preis (Coins / XP), CSS-Variablen/Farbpalette, Vorschau-Farbkreis.
  - `CosmeticSoundpack`: ID, Name, Beschreibung, Preis, Audiosynthese-Typ.
  - `CosmeticTitle`: ID, Titel-Name, Beschreibung, Preis, Icon.
  - `CosmeticFrame`: ID, Name, Beschreibung, Preis, CSS-Animationsklasse.
- Erweiterung von `UserStats` / `UserSettings`:
  - `unlockedCosmetics`: `{ themes: string[]; soundpacks: string[]; titles: string[]; frames: string[] }`
  - `equippedCosmetics`: `{ activeTheme: string; activeSoundpack: string; activeTitle?: string; activeFrame?: string }`

### B. Haustier-Logik (`src/data/petData.ts` & `src/components/PetAvatar.tsx`)
- Aktualisierung von `calculatePetDecay`:
  - Minimalwerte für Hunger und Glück auf sichere Wohlfühl-Grenzen festsetzen.
  - Neuer Zustand `isSleeping: boolean` (aktiv, wenn hunger < 25 oder seit > 12h keine Pflege, ohne Lebensgefahr).
  - Keine Malus-Multiplikatoren oder Strafen.
- `PetAvatar.tsx`:
  - Schlafende Augen (`-.-` / geschlossene Wimpern), schlafende Pose.
  - Schwebende, animierte "Zzz"-Blasen über dem Kopf des Tiers.
  - Integration der animierten Rahmen um den Avatar (Gold, Neon, Regenbogen, Sterne).

### C. Sound-Synthesizer (`src/services/audioService.ts`)
- Erweiterung der Web-Audio-Engine um Soundpack-Profile:
  - Unterstützung für umschaltbare Soundcharakteristiken (`standard`, `arcade8bit`, `scifi`, `acoustic`).
  - Automatische Berücksichtigung des aktuell ausgerüsteten Soundpacks bei Klick-, Richtig-, Combo- und Kaufeffekten.

### D. App-Theming (`src/index.css` & `src/App.tsx`)
- Bereitstellung von Theme-Farb-Klassen auf Dokumentenebene (`theme-cyberpunk`, `theme-emerald`, `theme-sunset`, `theme-nordic`, etc.).
- Dynamisches Umschalten des aktiven Themes in Echtzeit ohne Seiten-Neuladen.

### E. Überarbeiteter Shop & Kleiderschrank (`src/components/VirtualPetView.tsx` & `CosmeticsShopModal.tsx`)
- Übersichtliche Reiter im Shop:
  - 🍎 **Futter & Snacks** (Sofortige Stärkung des Haustiers)
  - 🎩 **Tier-Accessoires** (Hüte, Brillen, Schleifen & Überraschungs-Gegenstände)
  - 🎨 **App-Farbthemen** (Vollständige Farbpaletten mit Live-Vorschau)
  - 🏷️ **Ehrentitel** (Wählbare Auszeichnungen für Profil & Header)
  - 🎵 **Soundpacks** (Probehören per Klick vor dem Kauf)
  - ✨ **Animierte Rahmen** (Vorschau direkt am eigenen Haustier)
- Transparente Preis-Tags mit Anzeige von Coin- und XP-Kaufoptionen.
- Schnelles Ausrüsten gekaufter Gegenstände mit einem Klick.

---

## 3. Verifikationsplan

### Automatisierte Tests & Build-Prüfung
- `lint_applet`: TypeScript-Typensicherheit (`tsc --noEmit`) über alle neuen Interfaces und Zustände.
- `compile_applet`: Erfolgreicher Vite-Build ohne Warnungen.

### Manuelle UX- & Funktionsprüfung
1. **Haustier-Sicherheit**:
   - Simulation längerer Inaktivität: Tier geht in den "Schläft friedlich 💤"-Zustand über.
   - Klick auf "Streicheln" oder Füttern: Tier wacht sofort mit fröhlicher Animation und Sound auf.
   - Verifizieren: Keine Lebensgefahr, keine negativen Punkte.
2. **Kauf & Währungsausgabe**:
   - Kauf eines günstigen Items (z. B. Snack oder Starter-Titel) und eines hochpreisigen Themes (z. B. 1.000 Coins).
   - Prüfen, ob Kontostand korrekt abgezogen wird und gekaufte Artikel dauerhaft im Besitz bleiben.
3. **Seiten-Kosmetik Live-Effekte**:
   - Wechseln des Farbthemes: App passt Akzentfarben sofort an.
   - Wechseln des Soundpacks: Feedback-Töne klingen sofort im gewählten Stil (z. B. 8-Bit Chiptune).
   - Ausrüsten eines animierten Rahmens: Pet-Avatar wird in TopBar und Haustier-Ansicht vom animierten Glow umrahmt.
   - Titel-Auswahl: Titel erscheint im oberen Profil-Bereich.
