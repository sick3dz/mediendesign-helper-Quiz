# Implementation Plan: Tierartspezifische Streichel-Geräusche und Texte

Der Benutzer wünscht, dass beim Streicheln der Haustiere artenspezifische Töne (Synthesizer-Sounds) und passende Geräusche-Texte/Reaktionen (z. B. Hund: "Wuff!", Katze: "Miau!", Pinguin: "Nöööt!", Axolotl: "Blubb!") ausgegeben werden.

## User Requirements & Clarifications
- **Hund (Dog)**: "Wuff!" – Bell-Synthesizer-Sound & Text "Wuff! Bello wedelt freudig mit dem Schwanz!"
- **Katze (Cat)**: "Miau!" – Schnurr/Miau-Frequency-Sweep & Text "Miau! Mimi schnurrt wohlig!"
- **Pinguin (Penguin)**: "Nöööt!" – Pinguin-Tröten/Eis-Klacken & Text "Nöööt! Pippo watschelt vergnügt!"
- **Axolotl (Axolotl)**: "Blubb!" – Unterwasser-Blubberton & Text "Blubb! Lotti blubbert glücklich im Wasser!"

## Proposed Changes

### 1. Web Audio API Sound Synthesizer (`/src/services/audioService.ts`)
- Erweitern der `SoundEffectsService`-Klasse um `playPetForSpecies(species: PetSpecies)`:
  - **`dog`**: Synthetisiert zwei kurze prägnante Bark-Frequenz-Impulse (Wuff-Wuff).
  - **`cat`**: Synthetisiert ein sanft ansteigendes Miau mit leichtem Schnurr-Vibrato.
  - **`penguin`**: Synthetisiert ein moduliertes Pinguin-Tröten/Squawk mit metallisch-kühlem Oberton.
  - **`axolotl`**: Synthetisiert einen resonant abperlendes Unterwasser-Blubber-Geräusch (Blubb-Plop).

### 2. Artenspezifische Sound-Texte & Daten (`/src/data/petData.ts`)
- Erstellen der Konfiguration `PET_SPECIES_SOUNDS`:
  - `soundWord`: "Wuff!", "Miau!", "Nöööt!", "Blubb!"
  - `petTexts`: Array aus abwechslungsreichen, liebevollen Reaktions-Texten pro Tierart.
  - `wakeTexts`: Spezifische Texte beim Aufwecken.

### 3. Haustier-Interaktion & UI-Anzeige (`/src/components/VirtualPetView.tsx` & `/src/components/TopPetCompanionBar.tsx`)
- Anpassen der `handlePet()`-Funktion:
  - Aufruf von `soundEffects.playPetForSpecies(pet.species)` anstelle des generischen Tones.
  - Einblenden einer animierten Sound-Sprechblase mit dem artenspezifischen Geräusche-Text direkt über dem Haustier.

## Verification
- Ausführen von `lint_applet` (`tsc --noEmit`).
- Ausführen von `compile_applet` (`npm run build`).
