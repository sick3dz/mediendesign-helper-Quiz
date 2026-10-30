# Implementation Plan - Granular Learning Blocks

Add specialized "Learning Blocks" to the Data Sandbox that allow users to insert individual structural elements. This helps users understand how each specific element functions within the data format.

## 1. Switch Insertion Logic
- **Change**: Move from "Full Replace" back to "Insert at Cursor" for the new learning blocks.
- **Implementation**: Update `insertSnippet` to handle `selectionStart` and `selectionEnd` of the textarea to splice in the new code.

## 2. New Learning Blocks (IHK Focus)
- **JSON**:
  - `Boolean & Null`: `"active": true, "deleted": null`
  - `Simple Array`: `["Item 1", "Item 2"]`
  - `Nested Object`: `{"meta": {"id": 1}}`
- **XML**:
  - `Attribute Tag`: `<item id="1" status="new">Content</item>`
  - `Comment`: `<!-- IHK: Hier steht ein Kommentar -->`
  - `CDATA Section`: `<![CDATA[ <html-code> hier erlaubt ]]>`
- **Markdown**:
  - `Footnote`: `Der Text[^1]\n\n[^1]: Die Erklärung.`
  - `Task List`: `- [x] Erledigt\n- [ ] Offen`
  - `Nested List`: `- Ebene 1\n  - Ebene 2`

## 3. UI Updates
- **Visuals**: Use different styling (e.g., subtle borders or icons) to distinguish "Full Examples" from "Learning Blocks".
- **Tooltips**: Update tooltips to explain the *technical* purpose of each block (e.g., "Boolean represents True/False").
