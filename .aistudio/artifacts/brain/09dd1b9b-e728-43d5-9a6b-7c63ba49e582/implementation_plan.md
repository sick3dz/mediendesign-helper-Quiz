# Implementierungsplan: Durchgehender Fokus-Sprint Timer mit Live-Counter im Header

## Ziel
Der Fokus-Sprint (Pomodoro-Lerneinheit) soll nicht mehr stoppen, wenn das Modal geschlossen wird oder der Nutzer zwischen Kapiteln, Modulen und Menüs navigiert. Der Timer läuft im Hintergrund weiter und der Live-Countdown wird prominent auf der Hauptseite im TopBar-Header angezeigt.

## Änderungen

1. **Zentraler Sprint-State in `App.tsx`:**
   - Anheben des Timer-States (`sprintSecondsLeft`, `isSprintActive`, `sprintTotalSeconds`, `sprintSoundType`, `isSprintDone`) in die Hauptkomponente `App.tsx`.
   - Der `setInterval`-Countdown läuft global in `App.tsx`, unabhängig davon, welcher Tab oder welches Kapitel geöffnet ist.

2. **Hintergrund-Audio (Lofi / White Noise):**
   - Entfernen des automatischen `setIsActive(false)` und `ambientAudioService.stop()` beim Schließen des Modals.
   - Der ausgewählte Hintergrundsound läuft solange weiter, wie der Sprint aktiv ist.

3. **Live-Counter im TopBar-Header (`TopBar.tsx`):**
   - Der „Fokus“-Button im Header verwandelt sich bei aktiver Lerneinheit in ein auffälliges Live-Badge mit animiertem Zeitablauf (z. B. `⏱️ 04:32`).
   - Ein Klick auf das Badge auf der Hauptseite öffnet jederzeit das Modal zum Anpassen von Sound, Lautstärke oder Pausieren.

4. **Abschluss & Belohnung:**
   - Nach Ablauf der Zeit (0:00) wird das Konfetti gezündet, +40 EXP vergeben und ein visueller Hinweis angezeigt.

## Verifikation
- Wechseln zwischen Kapiteln und Modulen während laufendem Sprint.
- Überprüfung der Live-Anzeige im Header (`TopBar`).
- Build- und Syntaxprüfung (`tsc --noEmit` & `compile_applet`).
