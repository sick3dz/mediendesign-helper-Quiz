# Implementierungsplan: Unterbrechungsfreier Spielfluss & IHK-Fehlerdossier + UI-Inspector (Abgeschlossen)

Erfolgreich umgesetzt nach Nutzerwunsch: Der **Spielfluss während des Spielens bleibt vollständig ungestört** (keine Zwangspausen bei Fehlern, Zeitdruck und Combo-Ketten laufen sauber durch). Am Ende jeder Runde liefert ein interaktives **IHK-Lern-Dossier** die detaillierten Begründungen zu allen Fehlern. Zudem wurde das brandneue Spiel **„UI-Inspector“** integriert.

---

## 1. Durchgeführte Implementierungen

1. **Spielfluss & Runden-Dossier in `SpeedQuizGame.tsx`**:
   - Das Spiel läuft während der Fragen ohne Zwangspause durch.
   - Am Spielende wird eine strukturierte **„📘 IHK-Fehleranalyse & Lern-Dossier“** angezeigt:
     - Fragetext & Zeitablauf-Status.
     - ❌ Deine gewählte Antwort + IHK-Fallen-Erklärung (`trapExplanation`).
     - ✅ Korrekte IHK-Lösung + ausführliche IHK-Begründung (`correctOpt.explanation`).
     - 📌 Offizieller IHK-Prüfer-Tipp (`examTip`).
     - Bei fehlerfreiem Durchgang: Goldenes Siegel *„100% Perfekt ⭐“*.

2. **Boss-Schadensbericht in `BossRaidGame.tsx`**:
   - Schnelle rundenbasierte Kampf-Dynamik ohne Unterbrechung.
   - Nach Sieg oder Niederlage: Ausführliche **IHK-Fehleranalyse** aller erlittenen Konter-Angriffe mit genauer Begründung der richtigen IHK-Normen.

3. **Neues Spiel `UiInspectorGame.tsx`**:
   - Interaktives UX- & Barrierefreiheits-Audit eines echten Interface-Screens (*IxD-Shop Express*).
   - 5 interaktiv auffindbare IHK-Mängel:
     1. **Kontrast**: Text 2.1:1 statt mindestens 4.5:1 (WCAG 1.4.3).
     2. **Touch-Target**: Zu kleine 20px Klickfläche statt $\ge 44\text{px}$ (WCAG 2.5.5).
     3. **Gestaltgesetz der Nähe**: Rabatt-Hinweis klebt am falschen Formularfeld.
     4. **Formular-Labels**: Fehlendes `<label>` und reiner Platzhalter (WCAG 3.3.2).
     5. **Affordance & Signifier**: Destruktiver Lösch-Button irreführend in Frühlingsgrün gestaltet.
   - Feedback bei Treffern (IHK-Norm, Begründung, Lösungsansatz) und bei Klick auf normgerechte Elemente.
   - Belohnung von bis zu +200 EXP & Coins für den Rang und das Haustier.

4. **Integration in `MiniGamesHubView.tsx`**:
   - Spielkarte für **UI-Inspector** unter `studyQuestGames` mit Badge `🔍 UI- & A11y-Audit` hinzugefügt und spielbar geschaltet.

---

## 2. Verifikation

- **Build-Check**: `compile_applet` erfolgreich abgeschlossen.
- **Lint-Check**: `tsc --noEmit` ohne Fehler durchgelaufen.
