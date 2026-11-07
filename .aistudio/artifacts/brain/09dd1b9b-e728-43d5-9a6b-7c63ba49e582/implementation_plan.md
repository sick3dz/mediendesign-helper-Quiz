# Implementierungsplan: Original-Tunnelfoto & IHK-Kurvendiagramm für Aufgabe 11

In Aufgabe 11 („Gradationsänderung für Druck im Reiseführer – Tunnel & Fachwerkhäuser“) wird die bisherige stilisierte CSS-Simulation durch die authentischen Abbildungen aus dem IHK-Prüfungsblatt (Seite 5) ersetzt.

---

## 1. Bild-Extraktion aus dem Original-Scan (Seite 5)
- **Original-Tunnelfoto:** Verlustfreier Zuschnitt des echten Fotos aus `/public/assets/aistudio/Image_November_07__2026_-_11_54AM_0753b17c` nach `/public/assets/aistudio/tunnel_photo_original.jpg`.
  - Zeigt den dunklen Mauerwerk-Tunnelbogen mit den durchscheinenden sonnigen Fachwerkhäusern.
- **Original IHK-Kurvendiagramm:** Zuschnitt des offiziellen Prüfungsgitters nach `/public/assets/aistudio/ihk_curve_diagram_original.jpg`.
  - Zeigt das 10×10-Koordinatensystem mit Achsenbeschriftung „PS-Eingang“ und „PS-Ausgang“ (0–100%) sowie der gestrichelten 45°-Linearitätslinie.

---

## 2. Anpassung der Komponente `GradationCurveDiagram` in `FreetextTrainerQuizView.tsx`
- **Echtes Tunnelfoto mit Live-Filterung:**
  - Das Originalfoto wird als primäre Abbildung eingebunden.
  - Beim Umschalten der Modi („1. Original linear“, „2. IHK-Schattenaufhellung ✓“, „3. Überkorrektur / Rauschen“) wird der Kurveneffekt direkt live als CSS-Filter (`brightness`, `contrast`, `sepia-tone/shadow-lift`) auf das **echte Prüfungsfoto** angewendet. So erleben Prüflinge unmittelbar, wie sich die Zeichnung im dunklen Tunnel verbessert, ohne dass die sonnigen Häuser ausfressen.
  - Zusätzlicher Toggle „Original vs. Simuliert“ für maximale Nachvollziehbarkeit.
- **Original IHK-Diagramm & Interaktive Musterkurve:**
  - Umschalter zwischen dem **„Original IHK-Gitter“** aus dem Prüfungsbogen und der **„Interaktiven IHK-Musterlösung“** (SVG-Kurve mit Viertel-, Mittel- und Dreiviertelton-Werten).
  - Kennzeichnung mit dem etablierten Prüfungs-Badge („Original aus IHK-Prüfungsblatt“).

---

## 3. Didaktische Musterlösung & Qualitätssicherung
- Nahtlose Abstimmung mit den Prüfungsfragen 11 a), b) und c):
  - **Teil a:** Visualisierung des Kurvenverlaufs (im Dreivierteltonbereich/Schatten stark angehoben, Lichter linear belassen).
  - **Teil b:** Auswirkung auf Vierteltöne (fast unverändert), Mitteltöne (leicht angehoben), Dreivierteltöne (maximal aufgehellt).
  - **Teil c:** Rauschen/Artefakte in Schatten und Tonwertabrisse bei zu starker Anhebung.
- Build- und TypeScript-Prüfung via `compile_applet` und `lint_applet`.
