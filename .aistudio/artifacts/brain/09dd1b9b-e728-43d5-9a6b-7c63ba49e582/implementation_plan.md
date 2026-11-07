# Implementierungsplan: Echtes Foto der Schweine-Nahaufnahme für Aufgabe 10

Austausch der SVG-Grafik durch das reale Original-Foto aus dem hochgeladenen IHK-Prüfungsblatt (Seite 4) im Photoshop-Bildgröße-Dialog von Aufgabe 10.

---

## 1. Ausgangslage & Anforderung
- In Aufgabe 10 („Web-Bildaufbereitung & Motivwirkung Erlebnisbauernhof“) soll das **echte Original-Foto** bewertet werden, wie es in der IHK-Aufgabe abgedruckt ist (das Ferkel mit herausgestreckter Zunge im Matsch vor blauem Himmel und Holzzaun sowie das geöffnete Bildgröße-Dialogfenster).
- Der Nutzer hat in der Klärung bestätigt: *„Den Foto-Ausschnitt aus deinem hochgeladenen Prüfungsblatt anzeigen“*.

---

## 2. Geplante Umsetzung

1. **Asset-Vorbereitung:**
   - Das Originalfoto wurde in hoher Qualität verlustfrei direkt aus dem Prüfungsblatt (`/public/assets/aistudio/Image_November_07__2026_-_11_41AM_77ac78af`) präzise freigestellt und als Bildressource `/assets/aistudio/pig_photo_original.jpg` (Photoshop-Gesamtansicht) und `/assets/aistudio/pig_photo_only.jpg` (Motiv-Nahaufnahme) gespeichert.

2. **Anpassung in `src/components/FreetextTrainerQuizView.tsx` (`PhotoshopWebDialog`):**
   - Im linken Vorschaufenster des Photoshop-Dialogs wird anstelle der vereinfachten Illustration nun das **reale Foto aus dem Prüfungsblatt** mit Zoom-Fokus und Bilddetails gerendert.
   - Zusätzlich wird ein Zoom-/Vollbild-Modal bzw. eine Ansicht hinzugefügt, sodass der Prüfling das Originalbild in voller Schärfe begutachten kann, um die Motivwirkung für Teilaufgabe c) (fehlender Hofkontext, Makro-Ausschnitt, fehlender Negativraum) optimal beurteilen zu können.
   - Der technische Photoshop-Wertebereich (1300 × 867 px, CMYK, 240 ppi, TIFF 4,3 MB) bleibt nahtlos interaktiv erhalten.

---

## 3. Verifikation
- Prüfung der visuellen Einbindung im Browser.
- Kompilierung (`compile_applet`) und Typprüfung (`lint_applet`).
- Dev-Server Neustart via `restart_dev_server`.
