# Implementation Plan - Data Sandbox Expansion & Exam Check Mode

Expanding the `DataSandboxView` to include advanced IHK-relevant data structures and a specialized "Prüfungs-Check-Modus" for highlighting common mistakes and critical concepts.

## 1. Quick-Insert Toolbar
- Add a new UI section above the editor with categories:
    - **JSON**: "Verschachtelte Liste (SaaS)", "Event-Daten (IHK Style)".
    - **XML/SVG**: "SVG Icon (Pfad & Kreis)", "Produkt mit Attributen".
    - **Markdown**: "Prüfungs-Tabelle", "Bild & Referenz".
- Clicking these will replace the current editor content with the relevant snippet.

## 2. Prüfungs-Check-Modus (Toggle)
- Add a high-visibility toggle switch in the header.
- **State Logic**: When active, the visualizers will change their rendering mode to include:
    - **Red Warnings**: For common syntax pitfalls (e.g., missing root in XML, single quotes in JSON).
    - **Indigo IHK Tips**: Highlighting specific rules (e.g., "UTF-8 Necessity", "Attribute vs. Element").

## 3. Visualizer Enhancements
- **JsonVisualizer**: Add logic to detect "Single Quotes" or "Missing Key Quotes" and display an "IHK Fallstrick" warning.
- **XmlVisualizer**: Enhance regex to detect SVG elements and explain their role as XML-based vector data. Add "Root Element" check.
- **MarkdownVisualizer**: Add specific handlers for `|` (tables) and `![alt](url)` (images) to explain accessibility (alt-text) which is a key IHK topic.

## 4. Content & Data
- Update `DataSandboxView.tsx` with a new `SNIPPETS` constant containing the advanced examples.
- Refine the explanation texts to use even more "IHK-speak" (e.g., "Wohlgeformtheit", "Semantische Auszeichnung").
