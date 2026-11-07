# Implementierungsplan: Gestufter Tipp-Button & Ausführlicher Abschlussbericht im Freitext-Trainer

Wir erweitern das Freitext-Modul um zwei didaktische Kernfunktionen:
1. Einen interaktiven **Tipp-Button mit gestuften Denkanstößen** direkt am Aufgaben-/Eingabefeld, damit Prüflinge erst selbst nachdenken und bei Bedarf dosierte Hilfe erhalten.
2. Einen **ausführlichen Abschlussbericht („Was du geschrieben hast & Wie es besser wäre“)** mit direkter Gegenüberstellung Ihres Texts, erkannter Stärken, fehlender IHK-Fachbegriffe und konkreter Formulierungstipps.

---

## 1. Gestufter Tipp-Button („Denkanstoß anfordern“)
- **Position & Interaktion:** 
  - Ersetzt die bisher statisch eingeblendete gelbe Hinweisbox direkt über dem Textfeld durch eine diskrete, motivierende Tipp-Leiste.
  - Button `[💡 Tipp anfordern]` mit visueller Stufenanzeige (Stufe 0 / Stufe 1 / Stufe 2).
- **Die 2 Stufen:**
  - **Stufe 1 (Struktur & Leitfragen):** Gliederungshilfe und Fragestellung (z.B. „Wie viele Teilaspekte werden verlangt? Gliedere strukturiert nach a, b, c...“).
  - **Stufe 2 (Fachbegriff-Impulse):** Wesentliche IHK-Schlüsselbegriffe und Denkanstöße, ohne die vollständige Musterlösung vorwegzunehmen (z.B. „Relevante Fachbegriffe: RGB-Master, Farbraumkonvertierung, Zukunftsfähigkeit...“).
- **Möglichkeit zum vollständigen Einklappen:** Lernende können geöffnete Tipps jederzeit wieder minimieren.

---

## 2. Ausführlicher Abschlussbericht („Was du geschrieben hast & Was besser wäre“)
- **Zugang:** 
  - Prominenter Button in der Trainer-Übersicht: `[📊 Gesamt-Abschlussbericht ansehen ({X} Aufgaben gelöst)]`.
  - Direkter Link auch am Ende jeder korrigierten Aufgabe im Auswertungsbereich.
- **Inhalte des Berichts:**
  - **Gesamt-Performance:** Erreichte Gesamtpunktzahl, IHK-Notenäquivalent (Sehr gut bis Ungenügend nach IHK-Schlüssel) und Erfolgsquote.
  - **Detaillierte Aufgaben-Gegenüberstellung:**
    1. **Dein geschriebener Text:** Exakte Anzeige der eigenen Ausarbeitung in einem übersichtlichen Textkarten-Format.
    2. **Was gut war (Erreichte Punkte & Stärken):** Grün hervorgehobene erkannte Schlüsselwörter und erfüllte Teilkriterien.
    3. **Wie, wo & was besser wäre (Konkrete Optimierungsvorschläge):**
       - Spezifische Auflistung fehlender IHK-Fachbegriffe je Teilaufgabe.
       - Klarer Verbesserungshinweis (z.B. „Formuliere den Unterschied zwischen Tonwertkorrektur und Gradation präziser über Kurvenkrümmung vs. Spreizung“).
       - Didaktischer Abgleich mit der offiziellen IHK-Musterlösung.
    4. **Aktion „Jetzt nachbessern“:** Direkter 1-Klick-Sprung zurück in die Aufgabe zur Textüberarbeitung.
  - **Druck- / Export-Funktion:** `window.print()`-optimierte Druckansicht zum Wiederholen auf Papier oder als PDF.

---

## 3. Datenhaltung & Persistenz
- Speicherung des Fortschritts (`progress`) in `localStorage` unter `ihk_freetext_progress_v2`, damit eingegebene Texte und Auswertungen beim Neuladen der Seite erhalten bleiben.
- Button zum Zurücksetzen oder Neustarten der Prüfungssitzung.

---

## 4. Validierung & Qualitätssicherung
- Prüfung aller Komponenten mit `compile_applet` und `lint_applet`.
- Verifikation des responsiven Layouts (Desktop & Mobil) und des Dark/Light-Modes.
