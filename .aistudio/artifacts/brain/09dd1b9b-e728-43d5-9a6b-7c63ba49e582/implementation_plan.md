# Interaktive Haustier-Gadgets & Spielzeuge

Einführung eines neuen interaktiven Spielzeug- und Gadget-Systems für das virtuelle Haustier. Ein ausgewähltes Gadget liegt sichtbar neben dem Begleiter auf dem Boden und reagiert auf Klick mit lebendigen physikalischen Animationen (Hüpfen, Laser-Jagd, Zaubersterne), partikelgestützten Tier-Reaktionen, Soundeffekten und einem Laune-Bonus.

## Bestätigte Benutzervorgaben

- **Interaktionsmechanik**: Physik-Hüpfen mit direkter Tier-Reaktion (Hinterherschauen, Freudentanz) und Laune-Bonus.
- **Platzierung**: Direkt neben dem Haustier im Avatar mit interaktivem Klick-Trigger.
- **Sortiment & Freischaltung**:
  - **Bunter Hüpfball (`bouncing_ball`)**: Gratis für alle Lernenden ab Tag 1!
  - **Neon-Laserpointer (`laser_pointer`)**: Freischaltbar über EXP im Shop (80 EXP / 120 Coins).
  - **Magischer Sternen-Zauberstab (`magic_wand`)**: Exklusives Magie-Gadget für 150 EXP / 220 Coins.
  - **Bonus – Taktiler Fidget-Würfel (`fidget_cube`)**: ADHS-Fokusspielzeug für 110 EXP / 160 Coins.

---

## 1. Datenmodell & Typen

### A. Erweiterung in `src/types/quiz.ts`
```typescript
export interface PetGadget {
  id: string;
  name: string;
  icon: string;
  price: number;
  xpPrice: number;
  description: string;
  interactionType: 'bounce' | 'laser' | 'magic_wand' | 'fidget';
  happinessBonus: number;
  soundName: 'bounce' | 'laser' | 'magic' | 'click';
  actionMessage: (petName: string) => string;
}

export interface PetInventory {
  food: Record<string, number>;
  accessories: string[];
  gadgets?: string[]; // IDs der freigeschalteten Gadgets
}

export interface PetEquipped {
  head?: string;
  face?: string;
  neck?: string;
  frame?: string;
  gadget?: string; // Aktives Gadget neben dem Haustier
}
```

### B. Gadget-Katalog in `src/data/petData.ts`
1. **`bouncing_ball` (Bunter Hüpfball)**:
   - Preis: 0 Coins / 0 EXP (Gratis-Starter)
   - Typ: `'bounce'`
   - Effekt: Ball hüpft dynamisch mit Squash-and-Stretch-Physik; Haustier hüpft mit (+12 Laune).
   - Sound: Elastischer Boing-Klack.
2. **`laser_pointer` (Neon-Laserpointer)**:
   - Preis: 120 Coins / 80 EXP
   - Typ: `'laser'`
   - Effekt: Projiziert einen flitzenden roten Laserpunkt auf den Boden; das Haustier jagt dem Punkt mit den Augen und Pfoten nach (+18 Laune).
   - Sound: Futuritischer Zap-Pew.
3. **`magic_wand` (Magischer Sternen-Zauberstab)**:
   - Preis: 220 Coins / 150 EXP
   - Typ: `'magic_wand'`
   - Effekt: Schwingt auf, sprüht Sternenstaub und Funken; das Haustier erstrahlt im Zauberglanz (+25 Laune).
   - Sound: Glitzerndes Harfen-Klingeln.
4. **`fidget_cube` (ADHS Fokus-Würfel)**:
   - Preis: 160 Coins / 110 EXP
   - Typ: `'fidget'`
   - Effekt: Schalter und Rädchen klicken im Rhythmus; beruhigt das Haustier (+15 Laune).
   - Sound: Haptisches Klick-Klack.

---

## 2. Visuelle Darstellung & Interaktion in `PetAvatar.tsx`

### A. Platzierung & SVG-Layering
- Das aktive Gadget wird rechts neben dem Haustier auf der Bodenebene platziert (`x ~ 152–165, y ~ 160–175`), verankert auf dem weichen Bodenschatten.
- Durch `cursor-pointer` und sanftes Schweben/Wackeln lädt das Gadget zum Antippen ein.

### B. Interaktions-Trigger & Animationen
- Klick auf das Gadget löst eine 800ms–1200ms Animationssequenz aus:
  - **Ball**: SVG-Transformations-Bounce mit Sprungkurve, Squash am Boden (`scaleY(0.7) scaleX(1.3)`) und Zurückrollen.
  - **Laser**: Roter Lichtkegel und Laserpunkt huscht über die SVG-Leinwand (`cx=80 -> cx=140`), Augen des Haustiers folgen dem Punkt.
  - **Zauberstab**: Hebt sich an, rotiert um 25 Grad und entlässt bunte Stern-Partikel (`✦ ✨ ⭐`).
  - **Fidget-Würfel**: Dreht sich mit Klick-Vibration und Schalter-Umlegung.
- Haustier reagiert simultan:
  - Zeigt Herzchen (`💖`), Freudensprung (`animate-bounce`) oder Augenweitung.
  - Laune steigt direkt im State (+10 bis +25 Laune).

---

## 3. UI-Integration: Shop & Ausrüstung

### A. EXP-Belohnungs-Shop (`VirtualPetView.tsx`)
- Neue Kategorie **„Gadgets & Spielzeuge“** im Shop (`shopCategory === 'gadgets'`).
- Live-Vorschau: Spieler können das Spielzeug direkt im Avatar anprobieren und antesten, bevor sie es für EXP oder Coins freischalten.
- Klare Kennzeichnung: Gratis-Starter vs. EXP-Freischaltung.

### B. Stil- & Ausrüstungs-Atelier (Garderobe)
- Eigener Tab **„Gadgets“** in der Garderobe.
- Schnelles Wechseln zwischen Ball, Laserpointer, Zauberstab oder Ablegen.

### C. Top-Leiste (`TopPetCompanionBar.tsx`)
- Gadget-Button oder Mini-Widget in der Companion-Bar, um das Spielzeug auch während des Quiz-Lernens schnell anzutippen.

---

## 4. Audio-Service (`audioService.ts`)

- Neue WebAudio-Synthesizer-Klänge:
  - `playGadgetBounce()`: Dumpfer, elastischer Bouncing-Ton mit abnehmender Periodendauer.
  - `playGadgetLaser()`: Scharfer Frequenz-Sweep (800Hz -> 200Hz).
  - `playGadgetMagic()`: Glockenspiel-Arpeggio mit Echo.
  - `playGadgetClick()`: Doppelter Schalter-Klick.

---

## 5. Verifikation & Qualitätskriterien (Erfolgreich Abgeschlossen ✅)

1. ✅ **Interaktion**: Klick auf den Ball/Laser/Zauberstab/Fidget-Würfel startet unverzüglich Physik-Animation, Sound und Laune-Steigerung (+12 bis +25 Laune).
2. ✅ **Outfit-Kompatibilität**: Das Gadget liegt separat rechts neben dem Tier und kollidiert mit keinem der 15+ Hüte, Brillen, Umhänge oder Kapitel-Trophäen.
3. ✅ **Persistenz**: Ausgerüstetes Gadget und Besitzstatus bleiben im `localStorage` sicher erhalten (inklusive nahtloser Migration für bestehende Spielstände).
4. ✅ **Starter-Garantie**: Jeder Benutzer startet automatisch mit dem Bunten Hüpfball im Inventar und hat ihn direkt ausgerüstet.
5. ✅ **Code-Qualität**: `lint_applet` (TypeScript strict) und `compile_applet` (Vite Build) laufen fehlerfrei durch.
