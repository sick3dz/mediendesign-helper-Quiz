# Level-2-Schwierigkeits-Upgrade: IHK-Prüfungsfallen & Balancierte Antworten

Optimierung des Antwortdesigns für Level 2 (Meisterstufe): Beseitigung des "Längenvorzugs" durch exakt gleich lange, professionell formulierte Optionen und Integration plausibler IHK-Fallen mit sofortiger Aufklärung.

## User Review & Critical Decisions

> [!IMPORTANT]
> Alle Kernentscheidungen wurden mit dem Nutzer abgestimmt:
> - **Art der Fallen**: Glaubwürdige Scheinfachbegriffe und typische Praxis-Irrtümer aus echten IHK-Prüfungen.
> - **Antwortlängen**: Alle 4 Optionen sind annähernd gleich lang und gleich detailreich formuliert (kein Längenvorteil mehr).
> - **Feedback-Tiefe**: Sofortige IHK-Prüfer-Erklärung bei falscher Antwort ("Warum diese Falle verlockend war").

---

## 1. Overview & Core Concept

### Problem & Zielsetzung
- **Problem**: Bei vielen Multiple-Choice-Fragen (auch Level 1) ist die richtige Antwort oft die längste oder die einzige ausführlich begründete. Prüflinge erkennen die Lösung dadurch oft an der Textlänge statt am Fachwissen.
- **Lösung für Level 2**:
  1. **Längen-Symmetrie**: Alle 4 Antworten haben dieselbe Wortanzahl (ca. 14–22 Wörter) und denselben professionellen Duktus.
  2. **Plausible Distraktoren**: Die 3 falschen Optionen klingen wie echte Fachantworten, enthalten aber subtile, IHK-typische Denkfehler (z. B. Verwechslung von Affordance mit Signifier, falsche Gesetzesbezüge im A11y-Recht, Scheinfachbegriffe in der Druckvorstufe).
  3. **Didaktisches Prüfer-Feedback**: Klickt ein Nutzer auf einen Distraktor, erklärt das System sofort: *"Warum diese IHK-Falle verlockend war: Du hast Begriff X mit Y verwechselt. Merke für die Prüfung..."*

---

## 2. User Experience & Visual Design

### Prüfer-Fallen-Feedback in `QuizCard`
Wenn der Nutzer im Level-2-Quiz eine falsche Antwort wählt:
- Die gewählte falsche Antwort wird rot markiert.
- Die korrekte Antwort wird grün markiert.
- Eine dezente IHK-Prüfer-Box erscheint:
  - Header: `⚠️ IHK-Prüfungsfalle entlarvt`
  - Erklärung des Distraktors: Warum diese Antwort verlockend klang und worin der exakte Fehler lag.
  - Prüfer-Tipp zur Vermeidung des Fehlers in der echten IHK-Klausur.

---

## 3. Technische Umsetzung & Datenmodell

### A. Überarbeitung von `chaptersData.ts`
- **Symmetrische Level-2-Fragen**:
  - Konkrete Ausarbeitung für Kernmodule aller Themenbereiche:
    - **Kapitel 1 (IxD)**: z. B. Norman-Prinzipien (Affordance vs. Signifier), Nielsen-Heuristiken.
    - **Kapitel 2 (Wireframe)**: z. B. Fidelity-Stufen, Responsive Breakpoints vs. Fluid Grid.
    - **Kapitel 4 (IT-Sicherheit)**: z. B. Spear-Phishing vs. CEO-Fraud, HTTPS-Zertifikatsvalidierung.
    - **Kapitel 5 (A11y)**: z. B. WCAG AA vs. AAA Anforderungen, ARIA-Labels vs. Semantisches HTML.
    - **Kapitel 7 (SQL & JSON)**: z. B. Foreign Key vs. SQL-Injection-Sanitizing, JSON-Datentypen.
    - **Kapitel 8 (Crossmedia)**: z. B. eciRGB vs. ISO Coated v2 Farbraum-Konvertierungszeitpunkte.
- **Aktualisierung des dynamischen Level-2-Generators (`getModuleLevel2Questions`)**:
  - Sicherstellen, dass auch generierte Level-2-Optionen gleichmäßig formuliert und mit IHK-Prüfer-Fallenhinweisen versehen werden.

### B. UI-Anpassung in `QuizCard.tsx`
- Anzeige des erweiterten Prüfer-Fallen-Hinweises (`examTrapReason`), wenn `isLevel2` aktiv ist.

---

## 4. Verifikation
- Prüfung der visuellen Symmetrie der Antworten in Level 2.
- Testen des Prüfer-Fallen-Feedbacks bei Auswahl falscher Distraktoren.
- Kompilierung (`compile_applet`) und Linting (`lint_applet`).
