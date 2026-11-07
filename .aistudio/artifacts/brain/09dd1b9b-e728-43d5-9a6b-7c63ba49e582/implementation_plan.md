# Implementierungsplan: Einordnung der 12 Original-Aufgaben als Kapitel 11 am Ende des Lernpfads

Basierend auf Ihrer Wahl ordnen wir die 12 Original-Prüfungsaufgaben als **offizielles Abschluss-Kapitel 11 (Nummer 11)** sequenziell am Ende des IHK-Lernpfads (nach Kapitel 10) ein.

---

## 1. Anpassung in `src/data/ihkOriginalChapterData.ts`
- **Nummerierung:** Kapitelnummer von `number: 7` auf `number: 11` ändern.
- **Titel & Beschreibung:** 
  - Title: `Kapitel 11: IHK Original-Prüfung Teil 1 (12 Aufgaben)`
  - Subtitle: `Das finale Prüfungs-Kapitel am Ende des IHK-Lernpfads`
  - Description: `Durchlaufe alle 12 Original-Prüfungsaufgaben der 5 Prüfungsseiten als gekrönten Abschluss deines Lernpfads mit Level 1 (Fakten) & Level 2 (Rechenwege & Transfer).`

---

## 2. Reihenfolge in `src/data/chaptersData.ts`
- `IHK_ORIGINAL_CHAPTER` wird am **Ende des `CHAPTERS`-Arrays** platziert (nach Kapitel 10: Digital Asset Management).
- Dadurch ergibt sich eine perfekte, lückenlose Reihenfolge von **Kapitel 1 bis Kapitel 11** in allen Ansichten (`ChapterListView`, Lernfortschritt, Level-Aufstieg, Ranglisten und App-Router).

---

## 3. Funktionale Merkmale im Lernpfad
- **Sequenzielle Progression:** Kapitel 11 wird als meisterliches Krönungskapitel im Lernpfad geführt.
- **Vollständiges Tracking:** Absolvierte Module in Kapitel 11 zählen sowohl für Level 1 als auch für Level 2 in den Fortschritt, schütten EXP-Boni aus und schalten Erfolge frei.
- **Lila Original-Prüfungszettel-Optik:** Jede der 12 Aufgaben in Kapitel 11 ist mit dem violetten IHK-Badge und dem originalen Prüfungsrahmen versehen.

---

## 4. Validierung & Tests
- Durchführung von `compile_applet` und `lint_applet` zur Bestätigung fehlerfreier Typen.
- Aufruf von `restart_dev_server` für die saubere Bereitstellung im Dev-Server.
