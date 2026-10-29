# Implementierungsplan: GitHub Pages Deployment Fix

## Ursachenanalyse

1. **Root Cause für den weißen Bildschirm & 404 Fehler auf Skripte:**
   - In `vite.config.ts` ist aktuell keine `base`-Eigenschaft gesetzt.
   - Vite kompiliert Skripte und Stylesheets daher standardmäßig mit absolutem Root-Pfad: `<script src="/assets/index-xxx.js">`.
   - Bei GitHub Pages liegt die App typischerweise in einem Unterordner des Repositories (`https://<username>.github.io/<repository-name>/`).
   - Der Browser versucht die Skripte von `https://<username>.github.io/assets/...` statt `https://<username>.github.io/<repository-name>/assets/...` zu laden. Dies führt zu HTTP 404 (Not Found) und einem komplett weißen Bildschirm.
   - **Lösung:** Konfiguration von `base: './'` in `vite.config.ts`. Damit werden alle Asset-Referenzen relativ generiert, was universell sowohl für GitHub Pages Unterverzeichnisse als auch für Root-/Custom-Domains fehlerfrei funktioniert.

2. **Fehlende automatische Build-Pipeline:**
   - GitHub Pages benötigt entweder den gebauten statischen `dist/`-Ordner oder eine CI/CD-Pipeline via GitHub Actions.
   - Wenn nur der Quellcode gepusht wird, kann GitHub Pages ohne Workflow die TypeScript/React-Dateien nicht kompilieren.
   - **Lösung:** Einrichten eines offiziellen, schlanken GitHub Actions Workflows (`.github/workflows/deploy.yml`), der bei jedem Push auf den `main`-Branch automatisch baut und auf GitHub Pages veröffentlicht.

3. **SPA-Routing-Fallback (404-Handling):**
   - GitHub Pages wirft bei Direktaufrufen oder Reloads einen 404-Fehler, falls keine `404.html` vorhanden ist.
   - **Lösung:** Ergänzung eines kleinen Build-Schritts (`cp dist/index.html dist/404.html`), damit die Single Page App auch bei Routing und Reloads intakt bleibt.

---

## Geplante Maßnahmen

### 1. Vite-Konfiguration anpassen (`vite.config.ts`)
- Ergänzung von `base: './'` im Rückgabeobjekt von `defineConfig`.
- Dadurch generiert Vite relative Asset-Pfade (`./assets/...`), die in jedem GitHub Pages URL-Schema funktionieren.

### 2. GitHub Actions Deployment-Workflow anlegen (`.github/workflows/deploy.yml`)
- Erstellung der Datei `.github/workflows/deploy.yml` mit:
  - Trigger auf `push` zum Branch `main` (bzw. konfigurierbar für `master`).
  - Permissions für `pages: write` und `id-token: write`.
  - Checkout des Repositories (`actions/checkout@v4`).
  - Node.js Setup (`actions/setup-node@v4` mit Cache für `npm`).
  - Installation der Abhängigkeiten (`npm ci` oder `npm install`).
  - Build-Schritt (`npm run build`).
  - Kopieren von `dist/index.html` nach `dist/404.html` als SPA-Fallback.
  - Artefakt-Upload (`actions/upload-pages-artifact@v3`).
  - Deployment auf GitHub Pages (`actions/deploy-pages@v4`).

### 3. Dokumentation & Checkliste in `README.md`
- Schritt-für-Schritt-Anleitung für die einmalige Aktivierung in den GitHub Repository-Einstellungen:
  - Repository auf GitHub aufrufen -> **Settings** -> **Pages**.
  - Unter **Build and deployment** > **Source**: **GitHub Actions** auswählen.

---

## Verifikationsplan
- Ausführen von `npm run build` (`compile_applet`), um zu überprüfen, dass relative Pfade sauber in der `dist/index.html` generiert werden.
- Ausführen von `lint_applet`, um TypeScript-Fehlerfreiheit sicherzustellen.
- Syntaxprüfung der Workflow-YAML-Datei.
