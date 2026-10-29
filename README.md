# Prüfungstool für Mediendesign & Mediengestalter

Interaktive Prüfungsvorbereitung und Lernplattform für Mediengestalter Digital & Print / Mediendesign mit interaktiven Modulen, Prüfungs-Simulator, Spickzetteln und virtuellem Lernbegleiter (Haustier).

## 🚀 GitHub Pages Bereitstellung (Automatisches Deployment)

Die Veröffentlichung auf **GitHub Pages** ist über GitHub Actions vollständig eingerichtet (`.github/workflows/deploy.yml`) und erfordert nur **einen einmaligen Klick** in den GitHub-Einstellungen:

### Einmalige Aktivierung auf GitHub:
1. Öffne dein Repository auf GitHub.
2. Gehe auf den Tab **Settings** (oben rechts im Menü).
3. Klicke in der linken Seitenleiste auf **Pages**.
4. Wähle im Abschnitt **Build and deployment** unter **Source**:
   👉 **GitHub Actions** *(nicht „Deploy from a branch“)*.

### Automatischer Ablauf:
- Sobald du Änderungen in den Branch `main` (oder `master`) pushst, startet die GitHub Action automatisch.
- Die App wird kompiliert und mit relativen Asset-Pfaden (`base: './'`) fehlerfrei auf GitHub Pages veröffentlicht.
- Deine Live-URL lautet:  
  `https://<dein-github-benutzername>.github.io/<repository-name>/`

---

## 🛠 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (Port 3000)
npm run dev

# Produktions-Build testen
npm run build
npm run preview
```
