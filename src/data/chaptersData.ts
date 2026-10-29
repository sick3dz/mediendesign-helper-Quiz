import { Chapter } from '../types/quiz';

export const CHAPTERS: Chapter[] = [
  {
    id: 'ixd',
    number: 1,
    title: 'Interaktionsdesign (IxD)',
    subtitle: 'Verhalten, Prinzipien & Mensch-System-Dialog',
    description: 'Verstehe das Verhalten digitaler Produkte, UI vs. UX vs. IxD, Donald Normans 7 Prinzipien und Nielsen-Heuristiken.',
    accentColor: 'indigo',
    examMerksatz: 'Interaktionsdesign gestaltet das Verhalten digitaler Produkte, damit Nutzer ihre Ziele effizient, verständlich und angenehm erreichen können.',
    examChecklist: [
      'UI vs. UX vs. IxD Kernfragen beherrschen',
      'Affordance vs. Signifier (Prüfungsfavorit!)',
      'Donald Normans 7 Prinzipien benennen',
      '10 Nielsen Usability-Heuristiken',
      'Mobile Gestensteuerung & Button-Größen'
    ],
    modules: [
      {
        id: 'ixd-1',
        chapterId: 'ixd',
        title: 'Definition & Unterschied: UI, UX und IxD',
        shortDesc: 'Die 3 Leitfragen: Wie sieht es aus? Wie fühlt es sich an? Wie funktioniert es?',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-ixd-1',
            title: 'Was ist Interaktionsdesign (IxD)?',
            coreConcept: 'Gestaltung der Kommunikation zwischen Mensch und System.',
            bulletPoints: [
              'Ziel: Aufgaben effektiv, effizient, verständlich, fehlerfrei und zufriedenstellend erledigen.',
              'Fokus auf Verhalten des Systems, nicht nur die Optik.',
              'Beispiel: Nicht die Schaltfläche selbst ist IxD, sondern was passiert, wenn der Nutzer klickt.'
            ],
            merksatz: 'Interaktionsdesign gestaltet das Verhalten der Oberfläche.'
          },
          {
            id: 'n-ixd-2',
            title: 'Das magische Trio: UI vs. IxD vs. UX',
            coreConcept: 'Drei Disziplinen mit klar verteilten Fragen.',
            bulletPoints: [
              'User Interface (UI): Gestaltung der sichtbaren Oberfläche (Farben, Icons, Buttons, Typografie, Layout) → Frage: "Wie sieht es aus?"',
              'Interaktionsdesign (IxD): Gestaltung des Verhaltens (Klickverhalten, Animationen, Navigation, Feedback) → Frage: "Wie funktioniert es?"',
              'User Experience (UX): Gesamterlebnis und Wahrnehmung des Nutzers → Frage: "Wie fühlt sich die Nutzung an?"'
            ],
            examFavorite: true,
            example: 'Ein Button mit Farbverlauf ist UI. Dass er beim Klick zur nächsten Seite slidet, ist IxD. Ob der Nutzer zufrieden ist, ist UX.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-1-1',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            question: 'Welche Kernfrage beantwortet das User Interface Design (UI)?',
            options: [
              { id: 'a', text: 'Wie funktioniert es?', isCorrect: false, explanation: 'Das ist die Frage des Interaktionsdesigns (IxD).' },
              { id: 'b', text: 'Wie sieht es aus?', isCorrect: true, explanation: 'Richtig! UI kümmert sich um die sichtbare Oberfläche (Farben, Typo, Layout).' },
              { id: 'c', text: 'Wie fühlt sich die Nutzung an?', isCorrect: false, explanation: 'Das ist die zentrale Frage der User Experience (UX).' },
              { id: 'd', text: 'Wie viel Code wird benötigt?', isCorrect: false, explanation: 'Das betrifft die technische Entwicklung, nicht UI-Design.' }
            ],
            merksatz: 'UI = Oberfläche ("Wie sieht es aus?"), IxD = Verhalten ("Wie funktioniert es?"), UX = Gesamterlebnis ("Wie fühlt es sich an?").'
          },
          {
            id: 'q-ixd-1-2',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            question: 'Was beschreibt Interaktionsdesign am präzisesten?',
            options: [
              { id: 'a', text: 'Die rein grafische Erstellung von Logos und Bannern', isCorrect: false, explanation: 'Das ist Grafikdesign.' },
              { id: 'b', text: 'Die Gestaltung des Verhaltens und der Kommunikation zwischen Mensch und System', isCorrect: true, explanation: 'Exakt! Es geht um das dynamische Verhalten und Dialoge.' },
              { id: 'c', text: 'Das Programmieren von Datenbanktabellen', isCorrect: false, explanation: 'Das ist Backend-Entwicklung.' },
              { id: 'd', text: 'Die Druckvorbereitung von Flyern', isCorrect: false, explanation: 'Das ist Druckvorstufe.' }
            ]
          },
          {
            id: 'q-ixd-1-3',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            question: 'Ein Nutzer bricht einen Kaufvorgang ab, weil der Checkout unverständlich und frustrierend aufgebaut ist. Welche Disziplin ist primär betroffen?',
            options: [
              { id: 'a', text: 'User Experience (UX) & Interaktionsdesign (IxD)', isCorrect: true, explanation: 'Richtig! Unverständliche Nutzerführung (IxD) führt zu Frustration und schlechtem Gesamterlebnis (UX).' },
              { id: 'b', text: 'Ausschließlich das Print-Layout', isCorrect: false, explanation: 'Der Checkout ist eine digitale Web-Anwendung.' },
              { id: 'c', text: 'Die Wahl der Schriftart im Firmenlogo', isCorrect: false, explanation: 'Das Firmenlogo verursacht keinen Abbruch im Checkout-Flow.' },
              { id: 'd', text: 'Der DNS-Server des Providers', isCorrect: false, explanation: 'Hier liegt ein Usability-Problem vor, kein Infrastruktur-Ausfall.' }
            ],
            examTip: 'Merke: Bricht ein Nutzer frustriert ab, ist die UX negativ beeinflusst.'
          },
          {
            id: 'q-ixd-1-4',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            question: 'Welches typische Arbeitsergebnis liefert ein Interaktionsdesigner (IxD)?',
            options: [
              { id: 'a', text: 'User Flows, interaktive Klick-Konzepte und Verhaltensspezifikationen', isCorrect: true, explanation: 'Genau! User Flows und Navigationsübergänge sind die Kern-Artefakte des IxD.' },
              { id: 'b', text: 'Gedruckte Visitenkarten im Offset-Druck', isCorrect: false, explanation: 'Das gehört zum klassischen Print-Design.' },
              { id: 'c', text: 'Kaufverträge für Server-Hardware', isCorrect: false, explanation: 'Das ist Einkauf/IT-Beschaffung.' },
              { id: 'd', text: 'Ausschließlich Farbpaletten ohne Klickpfade', isCorrect: false, explanation: 'Farbpaletten allein sind reines Visual/UI-Design.' }
            ]
          }
        ]
      },
      {
        id: 'ixd-2',
        chapterId: 'ixd',
        title: 'Die 5 Grundprinzipien des IxD',
        shortDesc: 'Konsistenz, Sichtbarkeit, Feedback, Fehlertoleranz und Einfachheit',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-ixd-3',
            title: '1. Konsistenz & 2. Sichtbarkeit',
            coreConcept: 'Verlässlichkeit und klare Erkennbarkeit.',
            bulletPoints: [
              'Konsistenz: Gleiche Funktionen verhalten sich stets gleich (z.B. Menüs immer an derselben Stelle, gleiche Icons = gleiche Bedeutung). Vorteil: Nutzer müssen nicht neu lernen.',
              'Sichtbarkeit: Wichtige Aktionen müssen sofort ins Auge stechen. Falsch: Versteckte Menüs, graue unauffällige Primärbuttons.'
            ]
          },
          {
            id: 'n-ixd-4',
            title: '3. Feedback, 4. Fehlertoleranz & 5. Einfachheit',
            coreConcept: 'Sofortige Rückmeldung und Schutz vor Fehlern.',
            bulletPoints: [
              'Feedback: Das System muss reagieren (Ladebalken, Erfolgsmeldung "Gespeichert", Hover-Effekt).',
              'Fehlertoleranz: Fehler verhindern oder leicht rückgängig machen (Undo-Funktion, Bestätigungsdialoge).',
              'Einfachheit: So wenige Schritte wie möglich. Grundsatz von Steve Krug: "Don\'t make me think!"'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-2-1',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            question: 'Was ist der Leitsatz des Usability-Prinzips "Einfachheit"?',
            options: [
              { id: 'a', text: 'More is more - zeige alles auf einmal', isCorrect: false, explanation: 'Überfordert Nutzer sofort.' },
              { id: 'b', text: 'Don\'t make me think (Nutzer sollen nicht überlegen müssen)', isCorrect: true, explanation: 'Genau! Schnelle, intuitive Führung mit minimalem Denkaufwand.' },
              { id: 'c', text: 'Jede Aktion benötigt mindestens 3 Bestätigungen', isCorrect: false, explanation: 'Das würde Frustration erzeugen.' },
              { id: 'd', text: 'Animationen vor Verständlichkeit', isCorrect: false, explanation: 'Funktion und Verständlichkeit stehen immer an erster Stelle.' }
            ]
          },
          {
            id: 'q-ixd-2-2',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            question: 'Ein Nutzer klickt auf "Speichern", aber es passiert optisch rein gar nichts. Welches Grundprinzip wird verletzt?',
            options: [
              { id: 'a', text: 'Feedback', isCorrect: true, explanation: 'Richtig! Ein System muss auf Benutzeraktionen sofort reagieren (z. B. "Datei gespeichert").' },
              { id: 'b', text: 'Pharming', isCorrect: false, explanation: 'Pharming ist eine Betrugsmethode zur Domain-Manipulation.' },
              { id: 'c', text: 'Skalierbarkeit', isCorrect: false, explanation: 'Nicht das verletzte Usability-Grundprinzip.' },
              { id: 'd', text: 'Responsive Design', isCorrect: false, explanation: 'Hier fehlt die Rückmeldung an den Nutzer.' }
            ]
          },
          {
            id: 'q-ixd-2-3',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            question: 'Ein Nutzer löscht versehentlich ein Projekt. Ein Dialog fragt: "Möchtest du wirklich löschen?" und bietet "Rückgängig". Welches Prinzip wird angewandt?',
            options: [
              { id: 'a', text: 'Fehlertoleranz (Error tolerance)', isCorrect: true, explanation: 'Exakt! Fehlertoleranz schützt vor fatalen Versehen und bietet einen Notausgang.' },
              { id: 'b', text: 'Social Engineering', isCorrect: false, explanation: 'Social Engineering ist eine Täuschungsmethode von Kriminellen.' },
              { id: 'c', text: 'Agiles Scrum-Planning', isCorrect: false, explanation: 'Scrum-Planning ist ein Projektmanagement-Meeting.' },
              { id: 'd', text: 'DNS-Spoofing', isCorrect: false, explanation: 'DNS-Spoofing ist ein Netzwerkangriff.' }
            ]
          },
          {
            id: 'q-ixd-2-4',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            question: 'Warum platzieren fast alle großen Online-Shops den Warenkorb oben rechts im Header?',
            options: [
              { id: 'a', text: 'Wegen des Usability-Prinzips der externen Konsistenz (gelernte Konvention)', isCorrect: true, explanation: 'Richtig! Externe Konsistenz bedeutet, dass Nutzer vertraute Konventionen aus anderen Systemen wiedererkennen.' },
              { id: 'b', text: 'Weil Monitore rechts mehr Pixel anzeigen', isCorrect: false, explanation: 'Technisch unbegründet.' },
              { id: 'c', text: 'Weil das Gesetz zur Barrierefreiheit die Position oben rechts vorschreibt', isCorrect: false, explanation: 'Das Gesetz schreibt keine genaue Button-Position vor.' },
              { id: 'd', text: 'Reiner Zufall ohne gestalterischen Grund', isCorrect: false, explanation: 'Es ist eine etablierte Usability-Konvention.' }
            ]
          }
        ]
      },
      {
        id: 'ixd-3',
        chapterId: 'ixd',
        title: 'Donald Norman: 7 Prinzipien (Affordance vs. Signifier)',
        shortDesc: 'Prüfungsfavorit! Affordance (Aufforderungscharakter) vs. Signifier (Signalhinweis)',
        estimatedMinutes: 4,
        miniGameType: 'affordance',
        nuggets: [
          {
            id: 'n-ixd-5',
            title: 'Affordance vs. Signifier (Prüfungsdauerbrenner)',
            coreConcept: 'Affordance = Handlungsmöglichkeit, Signifier = Signal/Hinweis.',
            bulletPoints: [
              'Affordance: Das Objekt zeigt durch seine physische oder visuelle Form seine Benutzbarkeit (z. B. ein Türgriff KANN gezogen werden, ein 3D-Button sieht drückbar aus).',
              'Signifier: Ein expliziter Hinweis oder Beschriftung, der die Handlung signalisiert (z. B. das Schild "Ziehen" an der Tür, oder ein Pfeilsymbol für Scrollrichtung).'
            ],
            examFavorite: true,
            example: 'Der Griff = Affordance. Der Text "Ziehen" oder Pfeil = Signifier.'
          },
          {
            id: 'n-ixd-6',
            title: 'Die 7 Prinzipien nach Don Norman im Überblick',
            coreConcept: 'Die theoretische Basis des Interaktionsdesigns.',
            bulletPoints: [
              '1. Discoverability (Erkennbarkeit möglicher Aktionen)',
              '2. Feedback (Jede Aktion erzeugt spürbare Rückmeldung)',
              '3. Constraints (Einschränkungen verhindern Fehlbedienungen)',
              '4. Mapping (Steuerung & Wirkung passen logisch: Drehregler rechts = lauter)',
              '5. Konsistenz (Gleiches Verhalten an unterschiedlichen Stellen)',
              '6. Affordances (Mögliche Handlungen sind sichtbar)',
              '7. Signifiers (Signale und Markierungen leiten die Absicht)'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-3-1',
            chapterId: 'ixd',
            moduleId: 'ixd-3',
            question: 'An einer Glastür ist ein senkrechter Metallgriff angebracht. Daneben steht der Schriftzug "Ziehen". Was ist der Signifier?',
            options: [
              { id: 'a', text: 'Der Metallgriff selbst', isCorrect: false, explanation: 'Der Griff ist die Affordance (die physische Greifmöglichkeit).' },
              { id: 'b', text: 'Die Beschriftung "Ziehen"', isCorrect: true, explanation: 'Perfekt! Der Text signalisiert explizit, welche Aktion durchzuführen ist.' },
              { id: 'c', text: 'Die Glasscheibe', isCorrect: false, explanation: 'Die Scheibe ist das Material.' },
              { id: 'd', text: 'Das Türschloss', isCorrect: false, explanation: 'Nicht der Hinweis auf Ziehen/Drücken.' }
            ],
            examTip: 'Merke: Affordance = Was KANN man tun? Signifier = WO und WIE soll man es tun (Schild, Pfeil, Text).'
          },
          {
            id: 'q-ixd-3-2',
            chapterId: 'ixd',
            moduleId: 'ixd-3',
            question: 'Welches Prinzip nach Donald Norman beschreibt, dass die Bewegung eines Lautstärkereglers nach rechts logisch die Lautstärke erhöht?',
            options: [
              { id: 'a', text: 'Mapping', isCorrect: true, explanation: 'Richtig! Mapping verbindet die Steuerung logisch und räumlich mit der Wirkung.' },
              { id: 'b', text: 'Constraint', isCorrect: false, explanation: 'Constraint ist eine absichtliche Einschränkung.' },
              { id: 'c', text: 'Breadcrumb', isCorrect: false, explanation: 'Breadcrumb ist eine Navigationsart.' },
              { id: 'd', text: 'Smishing', isCorrect: false, explanation: 'Smishing ist SMS-Phishing.' }
            ]
          },
          {
            id: 'q-ixd-3-3',
            chapterId: 'ixd',
            moduleId: 'ixd-3',
            question: 'In einem Webformular ist der "Absenden"-Button grau und deaktiviert, bis alle Pflichtfelder ausgefüllt sind. Welches Norman-Prinzip wird genutzt?',
            options: [
              { id: 'a', text: 'Constraints (Einschränkungen zur Fehlervermeidung)', isCorrect: true, explanation: 'Richtig! Durch Einschränkung falscher Aktionen werden Fehleingaben unterbunden.' },
              { id: 'b', text: 'Phishing-Vektor', isCorrect: false, explanation: 'Hat nichts mit IT-Angriffen zu tun.' },
              { id: 'c', text: 'Low-Fidelity Mockup', isCorrect: false, explanation: 'Das betrifft eine Konzeptionsstufe.' },
              { id: 'd', text: 'Auditiver Screenreader', isCorrect: false, explanation: 'Ein Screenreader ist ein Hilfsmittel für Blinde.' }
            ]
          }
        ]
      },
      {
        id: 'ixd-4',
        chapterId: 'ixd',
        title: 'User Flow, Informationsarchitektur & Navigation',
        shortDesc: 'Strukturierte Nutzerwege, Sitemaps & Navigationsmuster',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-ixd-7',
            title: 'User Flow & Informationsarchitektur',
            coreConcept: 'Vom Bedürfnis bis zum erfolgreichen Ziel.',
            bulletPoints: [
              'User Flow: Beschreibt den Schritt-für-Schritt-Pfad des Nutzers (z.B. Shop: 1. Produkt finden → 2. Auswählen → 3. Warenkorb → 4. Checkout → 5. Kauf abschließen).',
              'Ziel des Flows: Möglichst wenige Schritte, möglichst wenig Verwirrung.',
              'Informationsarchitektur (IA): Strukturierung von Inhalten (Sitemap, Kategoriesystem, Menüebenen).'
            ]
          },
          {
            id: 'n-ixd-8',
            title: 'Die 4 Navigationsarten im Prüfungsfokus',
            coreConcept: 'Horizontale, Vertikale, Hamburger- und Breadcrumb-Navigation.',
            bulletPoints: [
              'Horizontale Navigation: Klassisch oben im Desktop-Header.',
              'Vertikale Navigation: Seitlich als Sidebar angeordnet.',
              'Hamburger-Menü (☰): Platzsparend, Standard auf Smartphones.',
              'Breadcrumb (Brotkrumen): Zeigt hierarchischen Standort (Startseite > Produkte > Kameras > DSLR).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-4-1',
            chapterId: 'ixd',
            moduleId: 'ixd-4',
            question: 'Was zeigt eine Breadcrumb-Navigation an ("Startseite > Produkte > Schuhe > Sneaker")?',
            options: [
              { id: 'a', text: 'Den Browserverlauf der letzten 30 Tage', isCorrect: false, explanation: 'Nein, das ist der Browser-History-Verlauf.' },
              { id: 'b', text: 'Den aktuellen Standort und Pfad innerhalb der Seitenhierarchie', isCorrect: true, explanation: 'Richtig! Breadcrumbs zeigen dem Nutzer, wo er sich in der Tiefe der Website befindet.' },
              { id: 'c', text: 'Die Ladezeit der aktuellen Seite', isCorrect: false, explanation: 'Hat nichts mit Performance-Metriken zu tun.' },
              { id: 'd', text: 'Eine Liste aller Cookies', isCorrect: false, explanation: 'Das wäre Datenschutz.' }
            ]
          },
          {
            id: 'q-ixd-4-2',
            chapterId: 'ixd',
            moduleId: 'ixd-4',
            question: 'Welcher Vorteil zeichnet das Hamburger-Menü (☰) auf mobilen Endgeräten besonders aus?',
            options: [
              { id: 'a', text: 'Spart wertvollen Bildschirmplatz auf kleinen Displays und bündelt Navigationspunkte', isCorrect: true, explanation: 'Richtig! Auf Smartphones spart das Icon Platz für den Hauptinhalt.' },
              { id: 'b', text: 'Es erhöht automatisch die Servergeschwindigkeit', isCorrect: false, explanation: 'Kein Einfluss auf Server.' },
              { id: 'c', text: 'Es ersetzt die Notwendigkeit von Alt-Texten', isCorrect: false, explanation: 'Alt-Texte sind für Bilder Pflicht.' },
              { id: 'd', text: 'Es verhindert Phishing-Angriffe', isCorrect: false, explanation: 'Hat keinerlei IT-Sicherheitsfunktion.' }
            ]
          },
          {
            id: 'q-ixd-4-3',
            chapterId: 'ixd',
            moduleId: 'ixd-4',
            question: 'Was ist das primäre Ziel eines optimierten User Flows in einem Online-Shop?',
            options: [
              { id: 'a', text: 'Den Nutzer auf möglichst viele Werbebanner klicken zu lassen', isCorrect: false, explanation: 'Das frustriert Nutzer extrem.' },
              { id: 'b', text: 'Den Weg von der Produktauswahl zum erfolgreichen Kauf so reibungslos, klar und fehlerfrei wie möglich zu gestalten', isCorrect: true, explanation: 'Exakt! Reibungslose Zielerreichung minimiert Absprungraten.' },
              { id: 'c', text: 'Den Quellcode auf unter 100 Zeilen zu komprimieren', isCorrect: false, explanation: 'Nicht Ziel des User Flows.' },
              { id: 'd', text: 'Ausschließlich Animationen zu demonstrieren', isCorrect: false, explanation: 'Reines Deko-Denken verfehlt Usability.' }
            ]
          }
        ]
      },
      {
        id: 'ixd-5',
        chapterId: 'ixd',
        title: 'Microinteractions & Mobile Gesten',
        shortDesc: 'Kleine Animationen, Klickflächen & Gestensteuerung',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-ixd-9',
            title: 'Microinteractions & ihre Aufgaben',
            coreConcept: 'Kleine Interaktionen mit sofortigem Nutzen.',
            bulletPoints: [
              'Beispiele: Like-Herz-Animation, Pull-to-Refresh beim Wischen nach unten, Klick-Feedback, Ladekreis.',
              '4 Funktionen: 1. Feedback geben, 2. Motivation steigern, 3. Orientierung bieten, 4. Fehler vermeiden.'
            ]
          },
          {
            id: 'n-ixd-10',
            title: 'Mobile Touch-Gesten & Mindestgrößen',
            coreConcept: 'Präzise Fingerbedienung erfordert ausreichende Klickflächen.',
            bulletPoints: [
              'Gesten: Tap (Auswählen), Double Tap (Vergrößern), Swipe (Blättern), Drag (Verschieben), Pinch (Zoomen), Long Press (Kontextmenü).',
              'Faustregel: Buttons müssen groß genug für den menschlichen Daumen sein (mind. 44x44px bzw. 48x48px).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-5-1',
            chapterId: 'ixd',
            moduleId: 'ixd-5',
            question: 'Welche Geste wird auf Touch-Geräten typischerweise zum Zoomen verwendet?',
            options: [
              { id: 'a', text: 'Pinch (Zusammen-/Auseinanderziehen mit zwei Fingern)', isCorrect: true, explanation: 'Richtig! Pinch-to-zoom ist die etablierte Geste zum Zoomen.' },
              { id: 'b', text: 'Swipe mit einem Finger', isCorrect: false, explanation: 'Swipe dient zum Blättern oder Scrollen.' },
              { id: 'c', text: 'Long Press', isCorrect: false, explanation: 'Long Press öffnet gewöhnlich ein Kontextmenü.' },
              { id: 'd', text: 'Drag', isCorrect: false, explanation: 'Drag verschiebt Objekte.' }
            ]
          },
          {
            id: 'q-ixd-5-2',
            chapterId: 'ixd',
            moduleId: 'ixd-5',
            question: 'Welche Mindestgröße wird nach WCAG und Usability-Standards für berührungsempfindliche Schaltflächen (Touch Targets) empfohlen?',
            options: [
              { id: 'a', text: 'Mindestens ca. 44x44 CSS-Pixel bzw. 48x48 dp', isCorrect: true, explanation: 'Genau! Damit auch größere Finger und motorisch eingeschränkte Nutzer zuverlässig tippen können.' },
              { id: 'b', text: 'Maximal 10x10 Pixel', isCorrect: false, explanation: 'Viel zu klein für Touch-Bedienung.' },
              { id: 'c', text: 'Mindestens 200x200 Pixel', isCorrect: false, explanation: 'Wäre unpraktikabel riesig.' },
              { id: 'd', text: 'Es gibt keinerlei Größenempfehlung', isCorrect: false, explanation: 'WCAG 2.5.5 und 2.5.8 definieren Mindestgrößen.' }
            ]
          },
          {
            id: 'q-ixd-5-3',
            chapterId: 'ixd',
            moduleId: 'ixd-5',
            question: 'Was ist die Funktion einer "Microinteraction" wie z. B. einem hüpfenden Herz beim Klick auf "Like"?',
            options: [
              { id: 'a', text: 'Sofortiges emotionales und visuelles Feedback geben, dass die Aktion registriert wurde', isCorrect: true, explanation: 'Perfekt! Microinteractions belohnen, bestätigen und geben Orientierung.' },
              { id: 'b', text: 'Die Datenbankverbindung abbrechen', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Die IP-Adresse des Nutzers manipulieren', isCorrect: false, explanation: 'Nein.' },
              { id: 'd', text: 'Einen Spam-Filter umgehen', isCorrect: false, explanation: 'Microinteractions sind UX-Designelemente.' }
            ]
          }
        ]
      },
      {
        id: 'ixd-6',
        chapterId: 'ixd',
        title: 'Die 10 Nielsen-Heuristiken',
        shortDesc: 'Der Goldstandard für Usability-Bewertung in der IHK-Prüfung',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-ixd-11',
            title: 'Die 10 Usability-Heuristiken nach Jakob Nielsen',
            coreConcept: '10 universelle Faustregeln für gute Benutzeroberflächen.',
            bulletPoints: [
              '1. Sichtbarkeit des Systemstatus (immer informieren, was gerade passiert).',
              '2. Übereinstimmung mit realer Welt (verständliche Alltagssprache statt IT-Jargon).',
              '3. Benutzerkontrolle & Freiheit (Abbrechen und Rückgängig/Undo ermöglichen).',
              '4. Konsistenz & Standards (etablierte Konventionen einhalten).',
              '5. Fehlervermeidung (System so bauen, dass Fehler gar nicht erst passieren).',
              '6. Wiedererkennen statt Erinnern (Aktionen und Optionen direkt sichtbar machen).',
              '7. Flexibilität & Effizienz (Shortcuts für Profis, einfache Pfade für Einsteiger).',
              '8. Ästhetisches & minimalistisches Design (keine überflüssigen Infos).',
              '9. Fehler verständlich erklären (konstruktive Lösungen statt kryptischer Fehlercodes).',
              '10. Hilfe & Dokumentation (leicht auffindbare Unterstützung bereitstellen).'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-6-1',
            chapterId: 'ixd',
            moduleId: 'ixd-6',
            question: 'Welche Nielsen-Heuristik greift, wenn ein System einen "Rückgängig machen" (Undo)-Button nach versehentlichem Löschen anbietet?',
            options: [
              { id: 'a', text: 'Benutzerkontrolle und Freiheit (User control and freedom)', isCorrect: true, explanation: 'Genau! Nutzer brauchen einen "Notausgang" bei Fehlbedienungen.' },
              { id: 'b', text: 'Minimalistisches Design', isCorrect: false, explanation: 'Minimalistisches Design zielt auf Reduktion von Ballast.' },
              { id: 'c', text: 'Datenschutz-Grundverordnung', isCorrect: false, explanation: 'Das ist ein Gesetz, keine Nielsen-Heuristik.' },
              { id: 'd', text: 'Breadcrumb-Architektur', isCorrect: false, explanation: 'Breadcrumb ist ein Navigationsmuster.' }
            ]
          },
          {
            id: 'q-ixd-6-2',
            chapterId: 'ixd',
            moduleId: 'ixd-6',
            question: 'Ein Ladebalken mit Prozentangabe beim Datei-Upload erfüllt primär welche Nielsen-Heuristik?',
            options: [
              { id: 'a', text: 'Sichtbarkeit des Systemstatus (Visibility of system status)', isCorrect: true, explanation: 'Richtig! Der Nutzer wird zu jedem Zeitpunkt darüber informiert, was im System vor sich geht.' },
              { id: 'b', text: 'Hilfe und Dokumentation', isCorrect: false, explanation: 'Ladebalken ist keine schriftliche Hilfe.' },
              { id: 'c', text: 'Flexibilität für Profis', isCorrect: false, explanation: 'Ladebalken betrifft alle Nutzer.' },
              { id: 'd', text: 'Wiedererkennen statt Erinnern', isCorrect: false, explanation: 'Hier geht es um den Echtzeit-Zustand des Systems.' }
            ]
          },
          {
            id: 'q-ixd-6-3',
            chapterId: 'ixd',
            moduleId: 'ixd-6',
            question: 'Eine Website meldet statt "Error 0x80040154" den Text: "Das Bild konnte nicht geladen werden, bitte versuche es erneut". Welche Heuristik wird hier befolgt?',
            options: [
              { id: 'a', text: 'Fehler verständlich erklären und Lösungen anbieten', isCorrect: true, explanation: 'Exakt! Fehlermeldungen müssen in klarer Nutzersprache formuliert sein und konstruktive Hilfe bieten.' },
              { id: 'b', text: 'Reines Print-Design', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Klassisches Wasserfallmodell', isCorrect: false, explanation: 'Das ist ein Projektmanagement-Modell.' },
              { id: 'd', text: 'DNS-Auflösung', isCorrect: false, explanation: 'Netzwerkbegriff.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'wireframe',
    number: 2,
    title: 'Wireframe',
    subtitle: 'Schematische Baupläne & Informationsstruktur',
    description: 'Lerne den schematischen Aufbau ohne Farben/Bilder, die 3 Fidelity-Stufen, Responsive Wireframes und den exakten Designprozess.',
    accentColor: 'blue',
    examMerksatz: 'Ein Wireframe ist eine vereinfachte, meist schwarz-weiße Darstellung einer Website oder App und dient der Planung von Struktur, Navigation und Nutzerführung, bevor das eigentliche Design entwickelt wird.',
    examChecklist: [
      'Definition & Merksatz aufsagen können',
      'Unterschied Wireframe vs. Mockup vs. Prototyp',
      'Low-, Mid- und High-Fidelity Merkmale',
      'Bestandteile: Header, Nav, Content, CTA, Sidebar, Footer',
      'Typische Fehler (zu früh gestalten!)'
    ],
    modules: [
      {
        id: 'wf-1',
        chapterId: 'wireframe',
        title: 'Definition, Merksatz & Ziele',
        shortDesc: 'Was gehört in ein Wireframe – und was ausdrücklich NICHT?',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-wf-1',
            title: 'Was ist ein Wireframe?',
            coreConcept: 'Ein schematischer Bauplan ohne detaillierte Gestaltung.',
            bulletPoints: [
              'Zeigt: Struktur, Aufbau, Inhaltselemente, Navigation und Funktionsbereiche.',
              'Der Fokus liegt auf der Anordnung, NICHT auf Farben, Bildern oder Typografie.',
              'Kästen markieren z.B. Platzhalter für Logo, Menü, Teaser und Buttons.'
            ],
            merksatz: 'Ein Wireframe zeigt, was wo platziert wird und wie der Nutzer navigiert, bevor das visuelle Design entsteht.'
          },
          {
            id: 'n-wf-2',
            title: 'Die 6 Ziele eines Wireframes',
            coreConcept: 'Warum erstellt man Wireframes, bevor gestaltet wird?',
            bulletPoints: [
              '1. Seitenstruktur festlegen & Inhalte organisieren.',
              '2. Nutzerführung planen & Funktionen überprüfen.',
              '3. Missverständnisse im Projektteam und mit dem Kunden frühzeitig vermeiden.',
              '4. Entwicklungs- und Designaufwand drastisch reduzieren (späte Änderungen sind teuer!).'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-wf-1-1',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            question: 'Welches Element gehört typischerweise NICHT in ein Wireframe?',
            options: [
              { id: 'a', text: 'Grober Platzhalter für den Hauptnavigationsbereich', isCorrect: false, explanation: 'Navigation gehört unbedingt ins Wireframe.' },
              { id: 'b', text: 'Ausgearbeitete finale Farbverläufe, Retuschen und Branding-Grafiken', isCorrect: true, explanation: 'Richtig! Farben und visuelles Feindesign lenken in dieser Phase nur von Struktur und Funktion ab.' },
              { id: 'c', text: 'Call-to-Action Platzhalterkasten', isCorrect: false, explanation: 'Der CTA-Platzhalter gehört zur Struktur.' },
              { id: 'd', text: 'Content-Aufteilung in Text- und Bildblöcke', isCorrect: false, explanation: 'Die Anordnung der Inhaltsblöcke ist der Hauptzweck.' }
            ]
          },
          {
            id: 'q-wf-1-2',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            question: 'Warum spart die Erstellung von Wireframes im Projektverlauf erhebliche Kosten?',
            options: [
              { id: 'a', text: 'Weil Korrekturen an Struktur und Navigation auf Papier oder in Boxen schnell und billig sind, bevor Code programmiert wird', isCorrect: true, explanation: 'Exakt! Späte Änderungen im fertigen Code kosten ein Vielfaches.' },
              { id: 'b', text: 'Weil man sich die Programmierung komplett sparen kann', isCorrect: false, explanation: 'Programmierung ist trotzdem nötig.' },
              { id: 'c', text: 'Weil Wireframes automatisch DSGVO-konform sind', isCorrect: false, explanation: 'Kein Zusammenhang.' },
              { id: 'd', text: 'Weil man keine Bilder mehr lizensieren muss', isCorrect: false, explanation: 'Im späteren Mockup werden Bilder gebraucht.' }
            ]
          },
          {
            id: 'q-wf-1-3',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            question: 'In welchen Farben werden Wireframes typischerweise gestaltet?',
            options: [
              { id: 'a', text: 'In Schwarz-Weiß und Graustufen mit klaren geometrischen Boxen', isCorrect: true, explanation: 'Richtig! Graustufen verhindern, dass Stakeholder über Farbgeschmäcker diskutieren statt über Struktur.' },
              { id: 'b', text: 'Ausschließlich in grellen Neonfarben', isCorrect: false, explanation: 'Nein, das würde massiv ablenken.' },
              { id: 'c', text: 'In den finalen CI-Farben des Kunden', isCorrect: false, explanation: 'Das gehört erst ins spätere Mockup.' },
              { id: 'd', text: 'Immer mit goldenem Hintergrund', isCorrect: false, explanation: 'Falsch.' }
            ]
          }
        ]
      },
      {
        id: 'wf-2',
        chapterId: 'wireframe',
        title: 'Der Designprozess: Vom Briefing zum Code',
        shortDesc: 'Anforderungsanalyse → IA → Wireframe → Mockup → Prototyp → Entwicklung',
        estimatedMinutes: 3,
        miniGameType: 'process_order',
        nuggets: [
          {
            id: 'n-wf-3',
            title: 'Die goldene Kette des Medienprojekts',
            coreConcept: 'Schrittweise Konkretisierung vom Abstrakten zum Konkreten.',
            bulletPoints: [
              '1. Anforderungsanalyse & Zielgruppenanalyse (Was braucht der Nutzer?)',
              '2. Informationsarchitektur (Wie gliedern wir die Inhalte?)',
              '3. Wireframe (Struktur & Platzierung als schwarz-weißer Bauplan)',
              '4. Mockup (Visueller Entwurf mit echten Farben, Schriften, Bildern)',
              '5. Prototyp (Klickbare, interaktive Simulation der Bedienung)',
              '6. Entwicklung (Programmierung durch Frontend/Backend-Entwickler)'
            ],
            examFavorite: true,
            merksatz: 'Wireframe = Aufbau | Mockup = Aussehen | Prototyp = Bedienung | Entwicklung = Funktion.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-wf-2-1',
            chapterId: 'wireframe',
            moduleId: 'wf-2',
            question: 'Welche Formel fasst den Unterschied der Phasen perfekt zusammen?',
            options: [
              { id: 'a', text: 'Wireframe = Aussehen, Mockup = Funktion, Prototyp = Aufbau', isCorrect: false, explanation: 'Falsch vertauscht.' },
              { id: 'b', text: 'Wireframe = Aufbau, Mockup = Aussehen, Prototyp = Bedienung, Entwicklung = Umsetzung', isCorrect: true, explanation: 'Exakt! Das ist der offizielle Prüfungs-Merksatz.' },
              { id: 'c', text: 'Alle drei Begriffe bedeuten dasselbe', isCorrect: false, explanation: 'Großer Fehler in der Abschlussprüfung!' },
              { id: 'd', text: 'Ein Prototyp ist immer statisch, ein Mockup klickbar', isCorrect: false, explanation: 'Genau umgekehrt! Der Prototyp ist interaktiv/klickbar.' }
            ]
          },
          {
            id: 'q-wf-2-2',
            chapterId: 'wireframe',
            moduleId: 'wf-2',
            question: 'Ein Kunde möchte vor der Programmierung sehen, wie die echten Firmenfarben, Hausschriften und freigestellten Produktfotos im Layout wirken. Was legst du ihm vor?',
            options: [
              { id: 'a', text: 'Ein Mockup (visueller Designentwurf)', isCorrect: true, explanation: 'Perfekt! Ein Mockup zeigt das fertige Aussehen mit echten Brand-Elementen.' },
              { id: 'b', text: 'Ein Low-Fi Wireframe auf einer Serviette', isCorrect: false, explanation: 'Zeigt weder Farben noch echte Schriften.' },
              { id: 'c', text: 'Einen Quellcode-Auszug in C++', isCorrect: false, explanation: 'Völlig am Kundenbedarf vorbei.' },
              { id: 'd', text: 'Einen Phishing-Köder', isCorrect: false, explanation: 'Cyberkriminalität, kein Designentwurf.' }
            ]
          },
          {
            id: 'q-wf-2-3',
            chapterId: 'wireframe',
            moduleId: 'wf-2',
            question: 'Welche Phase steht zeitlich DIREKT vor der Erstellung von Wireframes?',
            options: [
              { id: 'a', text: 'Informationsarchitektur (IA) & Strukturierung der Inhalte', isCorrect: true, explanation: 'Richtig! Bevor wir Elemente anordnen, müssen wir wissen, welche Inhalte und Seiten überhaupt existieren.' },
              { id: 'b', text: 'Die finale Abnahme durch den Kunden', isCorrect: false, explanation: 'Das geschieht ganz am Ende des Projekts.' },
              { id: 'c', text: 'Das Schreiben von CSS-Code', isCorrect: false, explanation: 'Code kommt erst in der Entwicklungsphase.' },
              { id: 'd', text: 'Der Usability-Test des fertigen Produkts', isCorrect: false, explanation: 'Testen erfolgt nach dem Prototypenbau.' }
            ]
          }
        ]
      },
      {
        id: 'wf-3',
        chapterId: 'wireframe',
        title: 'Fidelity-Stufen (Low-, Mid- & High-Fidelity)',
        shortDesc: 'Von der Papierskizze bis zum millimetergenauen Layout',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-wf-4',
            title: 'Die 3 Stufen im Vergleich',
            coreConcept: 'Detailgrad steigt im Laufe des Konzeptionsprozesses.',
            bulletPoints: [
              'Low-Fidelity: Sehr einfache Darstellung, skizzenhaft, Schwarz-Weiß, Handzeichnung auf Papier. Einsatz: Frühe Ideenfindung/Brainstorming.',
              'Mid-Fidelity: Mittlerer Detailgrad, digitale Boxen, exakte Bereiche, erste Beschriftungen. Einsatz: Team- und Kundenabstimmung.',
              'High-Fidelity: Sehr detailliert, exakte Größenverhältnisse, reale Texte, präzise Nutzerführung (aber immer noch ohne finales Farbdesign). Einsatz: Kurz vor dem Mockup.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-wf-3-1',
            chapterId: 'wireframe',
            moduleId: 'wf-3',
            question: 'Eine schnelle Papierskizze mit groben Rechtecken während des ersten Kunden-Brainstormings ist ein...',
            options: [
              { id: 'a', text: 'Low-Fidelity Wireframe', isCorrect: true, explanation: 'Richtig! Schnell, handgezeichnet, minimaler Detailgrad = Low-Fidelity.' },
              { id: 'b', text: 'High-Fidelity Prototyp', isCorrect: false, explanation: 'Ein High-Fi Prototyp ist digital und interaktiv.' },
              { id: 'c', text: 'Vertikaler Klickdummy', isCorrect: false, explanation: 'Das ist ein digital klickbarer Prototyp.' },
              { id: 'd', text: 'Pharming-Vektor', isCorrect: false, explanation: 'Das ist ein Begriff aus der Cyberkriminalität.' }
            ]
          },
          {
            id: 'q-wf-3-2',
            chapterId: 'wireframe',
            moduleId: 'wf-3',
            question: 'Welches Merkmal unterscheidet ein High-Fidelity Wireframe von einem Low-Fidelity Wireframe?',
            options: [
              { id: 'a', text: 'Exakte Maßverhältnisse, echte Texte und präzise Rasterabstände in digitaler Form', isCorrect: true, explanation: 'Richtig! High-Fidelity ist millimetergenau ausgearbeitet, verzichtet aber immer noch auf bunte Dekoration.' },
              { id: 'b', text: 'Es wird immer mit Buntstiften von Hand gezeichnet', isCorrect: false, explanation: 'High-Fi Wireframes werden mit UI-Software wie Figma gebaut.' },
              { id: 'c', text: 'Es enthält bereits den fertigen JavaScript-Code', isCorrect: false, explanation: 'Ein Wireframe ist kein Code.' },
              { id: 'd', text: 'Es darf maximal 3 Wörter Text enthalten', isCorrect: false, explanation: 'Gerade High-Fi nutzt reale Textinhalte.' }
            ]
          },
          {
            id: 'q-wf-3-3',
            chapterId: 'wireframe',
            moduleId: 'wf-3',
            question: 'Warum eignen sich Low-Fidelity Skizzen so hervorragend für frühe Design-Sprints?',
            options: [
              { id: 'a', text: 'Sie lassen sich in Sekunden verwerfen und neu zeichnen, ohne emotionalen oder zeitlichen Verlust', isCorrect: true, explanation: 'Genau! Keine Scheu vor Fehlern, maximale Experimentierfreude.' },
              { id: 'b', text: 'Weil Kunden Papierskizzen direkt im App Store herunterladen können', isCorrect: false, explanation: 'Unsinn.' },
              { id: 'c', text: 'Weil sie Druckkosten für Plakate senken', isCorrect: false, explanation: 'Nicht relevant.' },
              { id: 'd', text: 'Weil der W3C-Standard Papierskizzen zwingend vorschreibt', isCorrect: false, explanation: 'W3C regelt Webstandards, keine Papierskizzen.' }
            ]
          }
        ]
      },
      {
        id: 'wf-4',
        chapterId: 'wireframe',
        title: 'Bestandteile, Typische Fehler & Tools',
        shortDesc: 'Header, CTA, Footer & die größten Fallen bei der Wireframe-Erstellung',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-wf-5',
            title: 'Klassische Zonen & Typische Fehler',
            coreConcept: 'Strukturelle Disziplin einhalten.',
            bulletPoints: [
              'Zonen: Header (Logo, Nav, Suche) → Navigation → Content-Bereich (Texte, Formulare) → CTA (Handlungsaufforderung z.B. "Jetzt kaufen") → Sidebar → Footer.',
              'Häufige Fehler in Prüfungen:',
              '• Zu früh gestalten (Farben/Effekte einbauen statt Struktur zu klären).',
              '• Zu viele Details (fertiges Design vorwegnehmen).',
              '• Nutzerführung ignorieren (nur Deko statt Zielerreichung).',
              '• Responsives Verhalten vergessen (nur Desktop zeichnen).',
              'Gängige Tools: Figma, Adobe XD, Sketch, Axure RP, Balsamiq, Pencil Project.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-wf-4-1',
            chapterId: 'wireframe',
            moduleId: 'wf-4',
            question: 'Was ist der häufigste Anfängerfehler beim Erstellen eines Wireframes?',
            options: [
              { id: 'a', text: 'Keine echten Fotos und Farbschattierungen zu verwenden', isCorrect: false, explanation: 'Das ist kein Fehler, sondern genau richtig!' },
              { id: 'b', text: 'Zu früh zu gestalten (Farben, Bilder und Effekte einbauen, bevor die Struktur steht)', isCorrect: true, explanation: 'Genau! Farben lenken ab und verfälschen die Strukturdiskussion.' },
              { id: 'c', text: 'Einen Footer einzuplanen', isCorrect: false, explanation: 'Der Footer ist ein Standardbestandteil.' },
              { id: 'd', text: 'Graustufen zu nutzen', isCorrect: false, explanation: 'Graustufen sind ideal für Wireframes.' }
            ]
          },
          {
            id: 'q-wf-4-2',
            chapterId: 'wireframe',
            moduleId: 'wf-4',
            question: 'Welche Zonen gehören zur klassischen Standard-Struktur einer Website im Wireframe?',
            options: [
              { id: 'a', text: 'Header (Logo/Navigation), Hauptinhalt (Content), Call-to-Action (CTA) und Footer', isCorrect: true, explanation: 'Richtig! Das sind die 4 fundamentalen Standardbereiche jeder Website.' },
              { id: 'b', text: 'DNS-Server, Router, Switch und Glasfaserkabel', isCorrect: false, explanation: 'Das ist Netzwerk-Hardware.' },
              { id: 'c', text: 'Nur ein Vollbild-Video ohne jede Schaltfläche', isCorrect: false, explanation: 'Das wäre barriere- und bedienungsfeindlich.' },
              { id: 'd', text: 'Ausschließlich eine Cookie-Einwilligung', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-wf-4-3',
            chapterId: 'wireframe',
            moduleId: 'wf-4',
            question: 'Welcher Begriff bezeichnet eine hervorgehobene Schaltfläche wie "Jetzt Ticket buchen" oder "Kostenlos anmelden"?',
            options: [
              { id: 'a', text: 'Call-to-Action (CTA)', isCorrect: true, explanation: 'Exakt! Der Call-to-Action fordert den Nutzer zur gewünschten Hauptaktion auf.' },
              { id: 'b', text: 'Breadcrumb', isCorrect: false, explanation: 'Breadcrumb ist die Pfad-Navigation.' },
              { id: 'c', text: 'Social Engineering', isCorrect: false, explanation: 'Das ist eine Betrugsmasche.' },
              { id: 'd', text: 'Affordance-Köder', isCorrect: false, explanation: 'Erfundene Bezeichnung.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'prototype',
    number: 3,
    title: 'Prototyp',
    subtitle: 'Interaktivität, Klickdummies & Usability-Tests',
    description: 'Entdecke interaktive Simulationen, Klickdummies, horizontale vs. vertikale Prototypen und den Ablauf echter Usability-Tests.',
    accentColor: 'emerald',
    examMerksatz: 'Ein Prototyp ist eine interaktive und testbare Vorstufe eines digitalen Produkts, mit der Funktionen, Navigation und Nutzerführung überprüft werden können, bevor die eigentliche Entwicklung beginnt.',
    examChecklist: [
      'Definition Prototyp & Klickdummy',
      'Horizontaler vs. Vertikaler Prototyp (Unterschied!)',
      'Ablauf eines Usability-Tests (5 Schritte)',
      'Warum Prototypen Kosten sparen',
      'Tools: Figma, ProtoPie, InVision, Axure'
    ],
    modules: [
      {
        id: 'proto-1',
        chapterId: 'prototype',
        title: 'Definition, Merksatz & Klickdummy',
        shortDesc: 'Macht Konzepte erlebbar: Buttons klicken, Formulare testen',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-proto-1',
            title: 'Was macht einen Prototyp aus?',
            coreConcept: 'Interaktiv, bedienbar, simuliert Funktionen.',
            bulletPoints: [
              'Im Gegensatz zum statischen Wireframe oder Mockup ist der Prototyp interaktiv und testbar.',
              'Nutzer können auf Buttons klicken, Menüs aufklappen und Wege ausprobieren.',
              'Klickdummy: Die einfachste Form eines Prototyps – klickbare Hotspots verbinden verschiedene Screens, ohne dass echte Daten verarbeitet werden.'
            ],
            merksatz: 'Ein Prototyp macht ein Konzept erlebbar, indem Funktionen und Abläufe simuliert werden.'
          },
          {
            id: 'n-proto-2',
            title: 'Warum sind Prototypen so wertvoll?',
            coreConcept: 'Fehler finden, BEVOR teuer programmiert wird.',
            bulletPoints: [
              'Ein schönes Design kann in der Praxis trotzdem unbedienbar sein.',
              'Usability-Probleme werden aufgedeckt, bevor Entwickler Zeilen von Code schreiben.',
              'Kostenersparnis: Änderungen am Prototyp kosten nur Minuten; Änderungen im fertigen Code kosten tausende Euro!'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-proto-1-1',
            chapterId: 'prototype',
            moduleId: 'proto-1',
            question: 'Was unterscheidet einen Prototyp fundamental von einem Mockup?',
            options: [
              { id: 'a', text: 'Ein Mockup hat keine Farben, ein Prototyp schon', isCorrect: false, explanation: 'Mockups haben bereits volle Farben und Schriften.' },
              { id: 'b', text: 'Ein Prototyp ist interaktiv und simuliert Bedienabläufe, während ein Mockup ein statischer visueller Entwurf ist', isCorrect: true, explanation: 'Richtig! Das ist der wesentliche Prüfungsunterschied.' },
              { id: 'c', text: 'Ein Prototyp wird immer auf Papier gezeichnet', isCorrect: false, explanation: 'Papierskizzen sind meist Low-Fi Wireframes.' },
              { id: 'd', text: 'Mockups sind bereits fertig programmierte Software', isCorrect: false, explanation: 'Mockups sind statische Bilder.' }
            ]
          },
          {
            id: 'q-proto-1-2',
            chapterId: 'prototype',
            moduleId: 'proto-1',
            question: 'Was versteht man unter einem "Klickdummy"?',
            options: [
              { id: 'a', text: 'Einen einfachen Prototyp, bei dem statische Screens über Hotspots klickbar verbunden sind, ohne echte Datenbank-Logik', isCorrect: true, explanation: 'Exakt! Er simuliert den Klickpfad schnell und wirkungsvoll ohne Backend.' },
              { id: 'b', text: 'Einen Dummy-Kunden, der Rechnungen nicht bezahlt', isCorrect: false, explanation: 'Umgangssprachlich, aber kein Fachbegriff.' },
              { id: 'c', text: 'Ein Bot-Programm zur Klick-Manipulation', isCorrect: false, explanation: 'Das wäre Betrug.' },
              { id: 'd', text: 'Eine kaputte Computermaus', isCorrect: false, explanation: 'Nein.' }
            ]
          },
          {
            id: 'q-proto-1-3',
            chapterId: 'prototype',
            moduleId: 'proto-1',
            question: 'Warum gilt im Medienprojekt die Regel: "Je früher Prototypen getestet werden, desto günstiger das Projekt"?',
            options: [
              { id: 'a', text: 'Weil Design- und Logikfehler in Prototypen mit minimalem Zeitaufwand behoben werden können, bevor teurer Code entsteht', isCorrect: true, explanation: 'Richtig! (Bekannt als 1-10-100-Regel der Fehlerkosten).' },
              { id: 'b', text: 'Weil der Kunde den Prototyp als fertiges Endprodukt kauft', isCorrect: false, explanation: 'Ein Prototyp ist kein fertiges Produkt.' },
              { id: 'c', text: 'Weil Prototypen keine Server-Gebühren kosten', isCorrect: false, explanation: 'Zweitrangig.' },
              { id: 'd', text: 'Weil dann keine Barrierefreiheit mehr nötig ist', isCorrect: false, explanation: 'Barrierefreiheit ist immer Pflicht.' }
            ]
          }
        ]
      },
      {
        id: 'proto-2',
        chapterId: 'prototype',
        title: 'Horizontaler vs. Vertikaler Prototyp',
        shortDesc: 'Breite Oberflächlichkeit vs. tiefe Detailfunktion',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-proto-3',
            title: 'Horizontaler Prototyp (Breite)',
            coreConcept: 'Viele Screens, aber wenig Funktionalität in der Tiefe.',
            bulletPoints: [
              'Zeigt viele oder alle Bereiche des Gesamtsystems.',
              'Funktionen sind jedoch nur oberflächlich angedeutet.',
              'Beispiel: Eine komplette Website mit 15 Unterseiten, aber man kann nur hin und her klicken, ohne echte Logik.'
            ]
          },
          {
            id: 'n-proto-4',
            title: 'Vertikaler Prototyp (Tiefe)',
            coreConcept: 'Wenige Bereiche, dafür bis ins kleinste Detail ausgearbeitet.',
            bulletPoints: [
              'Konzentriert sich auf eine einzige zentrale Kernfunktion oder einen Schlüssel-Ablauf.',
              'Diese Funktion ist extrem tief und realitätsnah implementiert.',
              'Beispiel: Nur der 4-stufige Checkout-Prozess eines Online-Shops mit Eingabevalidierung und Adressprüfung.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-proto-2-1',
            chapterId: 'prototype',
            moduleId: 'proto-2',
            question: 'Ein Team baut einen Prototyp, der ausschließlich den Warenkorb- und Bezahlvorgang mit allen Fehlermeldungen und Dropdowns simuliert. Welche Art liegt vor?',
            options: [
              { id: 'a', text: 'Horizontaler Prototyp', isCorrect: false, explanation: 'Horizontal würde alle Seiten der Website oberflächlich zeigen.' },
              { id: 'b', text: 'Vertikaler Prototyp', isCorrect: true, explanation: 'Perfekt! Wenige Funktionen, aber extrem tief ausgearbeitet = vertikal.' },
              { id: 'c', text: 'Low-Fidelity Papierskizze', isCorrect: false, explanation: 'Hier liegt ein detaillierter interaktiver Ablauf vor.' },
              { id: 'd', text: 'Sitemap', isCorrect: false, explanation: 'Eine Sitemap ist eine Strukturübersicht.' }
            ]
          },
          {
            id: 'q-proto-2-2',
            chapterId: 'prototype',
            moduleId: 'proto-2',
            question: 'Ein Prototyp zeigt alle 12 Unterseiten einer neuen Hochschul-Website mit Menü, aber kein Formular und keine Suche funktionieren. Um welche Art handelt es sich?',
            options: [
              { id: 'a', text: 'Horizontaler Prototyp (Breite)', isCorrect: true, explanation: 'Richtig! Große Übersicht über alle Bereiche, aber keine funktionale Tiefe.' },
              { id: 'b', text: 'Vertikaler Prototyp', isCorrect: false, explanation: 'Vertikal wäre eine Einzelfunktion in voller Tiefe.' },
              { id: 'c', text: 'Phishing-Webseite', isCorrect: false, explanation: 'Nein.' },
              { id: 'd', text: 'Vollständiger Produktiv-Code', isCorrect: false, explanation: 'Funktionen sind nur simuliert.' }
            ]
          },
          {
            id: 'q-proto-2-3',
            chapterId: 'prototype',
            moduleId: 'proto-2',
            question: 'Wann entscheidet sich ein Konzeptionsteam typischerweise für einen vertikalen Prototyp?',
            options: [
              { id: 'a', text: 'Wenn ein neuartiger, komplexer Kern-Workflow (z. B. Konfigurator oder Zahlungsdialog) vorab intensiv getestet werden muss', isCorrect: true, explanation: 'Exakt! Das Risiko für diesen kritischen Pfad wird dadurch minimiert.' },
              { id: 'b', text: 'Wenn der Kunde nur die Startseite sehen möchte', isCorrect: false, explanation: 'Dafür reicht oft ein Mockup.' },
              { id: 'c', text: 'Wenn der Zeitplan bereits um 3 Monate überschritten ist', isCorrect: false, explanation: 'Kein methodischer Grund.' },
              { id: 'd', text: 'Wenn keine Computer zur Verfügung stehen', isCorrect: false, explanation: 'Vertikale Prototypen erfordern UI-Tools.' }
            ]
          }
        ]
      },
      {
        id: 'proto-3',
        chapterId: 'prototype',
        title: 'Usability-Tests & Typische Fehler',
        shortDesc: 'Die 5 Schritte des Usability-Tests & typische Prototyp-Fallen',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-proto-5',
            title: 'Der Ablauf eines Usability-Tests (5 Schritte)',
            coreConcept: 'Systematisches Testen mit echten Endnutzern.',
            bulletPoints: [
              '1. Nutzer erhält eine konkrete Aufgabe (z. B. "Kaufe eine rote Kamera").',
              '2. Nutzer bedient den Prototyp eigenständig (ohne Einflüsterung!).',
              '3. Beobachter analysieren das Verhalten und Stolpersteine.',
              '4. Probleme und Verständnisfragen werden dokumentiert.',
              '5. Optimierungen am Entwurf werden vorgenommen.'
            ],
            examFavorite: true
          },
          {
            id: 'n-proto-6',
            title: 'Typische Fehler bei Prototypen',
            coreConcept: 'Vermeide diese Fallen in der Praxis:',
            bulletPoints: [
              '• Zu spät testen (erst kurz vor dem Release Nutzer fragen).',
              '• Zu viele Funktionen einbauen (Prototyp soll Hypothesen testen, nicht das fertige Betriebssystem nachbauen!).',
              '• Nutzerfeedback ignorieren oder schönreden.',
              '• Mobile Touch-Nutzung vergessen (Desktop-Maus verhält sich anders als Touch-Daumen).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-proto-3-1',
            chapterId: 'prototype',
            moduleId: 'proto-3',
            question: 'Was ist der erste Schritt in einem klassischen Usability-Test?',
            options: [
              { id: 'a', text: 'Dem Nutzer eine konkrete Aufgabe stellen', isCorrect: true, explanation: 'Richtig! Ein Test beginnt mit einer klaren Benutzeraufgabe (Szenario).' },
              { id: 'b', text: 'Dem Nutzer das gesamte Konzept 30 Minuten lang erklären', isCorrect: false, explanation: 'Falsch! Der Nutzer soll unbeeinflusst testen.' },
              { id: 'c', text: 'Sofort den Quellcode programmieren', isCorrect: false, explanation: 'Entwicklung kommt erst nach dem Test.' },
              { id: 'd', text: 'Ein Lastenheft verfassen', isCorrect: false, explanation: 'Das Lastenheft existiert bereits vor der Prototypenphase.' }
            ]
          },
          {
            id: 'q-proto-3-2',
            chapterId: 'prototype',
            moduleId: 'proto-3',
            question: 'Wie verhält sich der Testleiter während eines Usability-Tests mit einem Prototyp?',
            options: [
              { id: 'a', text: 'Zurückhaltend beobachtend; er greift nicht helfend ein und ermutigt zum "lauten Denken" (Think Aloud)', isCorrect: true, explanation: 'Richtig! Nur unbeeinflusstes Handeln liefert ehrliche Usability-Erkenntnisse.' },
              { id: 'b', text: 'Er klickt alle Buttons für den Nutzer vor', isCorrect: false, explanation: 'Macht den Test komplett wertlos.' },
              { id: 'c', text: 'Er verteidigt das Design lautstark gegen Kritik', isCorrect: false, explanation: 'Falscher Stolz schadet dem Produkt.' },
              { id: 'd', text: 'Er verlässt den Raum und schließt die Tür ab', isCorrect: false, explanation: 'Beobachtung und Protokollierung sind zwingend.' }
            ]
          },
          {
            id: 'q-proto-3-3',
            chapterId: 'prototype',
            moduleId: 'proto-3',
            question: 'Wie viele Testnutzer reichen nach Usability-Pionier Jakob Nielsen typischerweise aus, um ~85% aller Bedienprobleme aufzudecken?',
            options: [
              { id: 'a', text: 'Bereits circa 5 Testnutzer', isCorrect: true, explanation: 'Genau! Mehr als 5 Personen decken fast nur noch dieselben Probleme redundant auf.' },
              { id: 'b', text: 'Mindestens 10.000 Personen', isCorrect: false, explanation: 'Für qualitative Usability-Tests völlig unzutreffend.' },
              { id: 'c', text: 'Genau 1 Person reicht für alle Produkte', isCorrect: false, explanation: '1 Person ist statistisch nicht repräsentativ.' },
              { id: 'd', text: 'Usability lässt sich überhaupt nicht testen', isCorrect: false, explanation: 'Usability-Testing ist wissenschaftlich fundiert.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'security',
    number: 4,
    title: 'Internetbetrug & IT-Sicherheit',
    subtitle: 'Cybercrime, Social Engineering, Malware & Datenschutz',
    description: 'Erkenne Phishing, Smishing, Vishing, Pharming, Fake-Shops, Social Engineering, Malware-Arten und meistere Datenschutz vs. Datensicherheit.',
    accentColor: 'rose',
    examMerksatz: 'Internetbetrug umfasst betrügerische Handlungen im Internet, bei denen Täter durch Täuschung an Geld, persönliche Daten oder Zugänge gelangen. Zu den häufigsten Formen gehören Phishing, Fake-Shops, Social Engineering, Identitätsdiebstahl und Schadsoftware.',
    examChecklist: [
      'Phishing, Smishing, Vishing, Pharming unterscheiden',
      'Merkmale Fake-Shops (kein Impressum, nur Vorkasse)',
      'Social Engineering & CEO-Fraud',
      'Malware-Arten (Virus, Wurm, Trojaner, Ransomware, Spyware)',
      'Datenschutz (Person) vs. Datensicherheit (Schutz vor Verlust/Diebstahl)'
    ],
    modules: [
      {
        id: 'sec-1',
        chapterId: 'security',
        title: 'Phishing, Smishing, Vishing & Pharming',
        shortDesc: 'Die 4 Gesichter des Datenklaus & Erkennungsmerkmale',
        estimatedMinutes: 4,
        miniGameType: 'phishing',
        nuggets: [
          {
            id: 'n-sec-1',
            title: 'Die 4 Angriffsarten auf einen Blick',
            coreConcept: 'Gefälschte Kommunikation zur Datenabfrage.',
            bulletPoints: [
              'Phishing: Betrug über gefälschte E-Mails oder Fake-Webseiten zur Erbeutung von Passwörtern oder Bankdaten.',
              'Smishing: Phishing per SMS (z. B. "Paket konnte nicht zugestellt werden, zahlen Sie 1,99 €").',
              'Vishing: Phishing über Telefonanrufe (Voice Phishing; z. B. angeblicher Bankmitarbeiter fordert TAN).',
              'Pharming: Manipulation der Namensauflösung (DNS) – der Nutzer wird trotz richtiger Adresseingabe unbemerkt auf gefälschte Server geleitet.'
            ],
            examFavorite: true
          },
          {
            id: 'n-sec-2',
            title: 'Die klassischen Alarmsignale (Red Flags)',
            coreConcept: 'Woran man Betrugsversuche sofort entlarvt:',
            bulletPoints: [
              '1. Künstlicher Zeitdruck ("Ihr Konto wird in 24 Stunden gesperrt!").',
              '2. Verdächtige Absenderadresse (z. B. support@amaz0n-service.xyz).',
              '3. Rechtschreibfehler, komische Satzstellung, schlechte Übersetzung.',
              '4. Aufforderung zur Dateneingabe / Login über einen Link (Banken verlangen niemals Passwörter per Link!).',
              '5. Unrealistische Angebote ("90% Rabatt auf das neueste iPhone").'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-sec-1-1',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Ein Nutzer erhält eine SMS: "Ihr Paket wartet im Zoll. Klicken Sie hier und zahlen Sie 2 €". Wie nennt man diesen Betrug?',
            options: [
              { id: 'a', text: 'Smishing (SMS-Phishing)', isCorrect: true, explanation: 'Richtig! Phishing per SMS bezeichnet man als Smishing.' },
              { id: 'b', text: 'Vishing', isCorrect: false, explanation: 'Vishing erfolgt per Sprach-Anruf (Voice Phishing).' },
              { id: 'c', text: 'Pharming', isCorrect: false, explanation: 'Pharming manipuliert DNS/Webseiten-Umleitungen.' },
              { id: 'd', text: 'Usability-Heuristik', isCorrect: false, explanation: 'Das ist ein Konzept für Designqualität.' }
            ]
          },
          {
            id: 'q-sec-1-2',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Was unterscheidet Pharming von klassischem E-Mail-Phishing?',
            options: [
              { id: 'a', text: 'Pharming betrifft nur Mac-Nutzer', isCorrect: false, explanation: 'Falsch.' },
              { id: 'b', text: 'Bei Pharming landet der Nutzer auch bei korrekter URL-Eingabe durch Manipulation unbemerkt auf einer gefälschten Website', isCorrect: true, explanation: 'Genau! Pharming manipuliert DNS-Einträge oder Router, wodurch selbst die richtige URL umgeleitet wird.' },
              { id: 'c', text: 'Pharming verschickt nur Briefe per Post', isCorrect: false, explanation: 'Nein.' },
              { id: 'd', text: 'Es gibt keinen Unterschied', isCorrect: false, explanation: 'Pharming ist eine technische Umleitung, Phishing basiert auf Köder-Nachrichten.' }
            ]
          },
          {
            id: 'q-sec-1-3',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Ein Betrüger ruft einen Mitarbeiter an, gibt sich als IT-Support der eigenen Firma aus und fordert das Passwort zur "Systemwartung". Wie heißt diese Betrugsform?',
            options: [
              { id: 'a', text: 'Vishing (Voice Phishing)', isCorrect: true, explanation: 'Richtig! Telefonisches Abfischen von Daten nennt sich Vishing.' },
              { id: 'b', text: 'Smishing', isCorrect: false, explanation: 'Smishing erfolgt per SMS.' },
              { id: 'c', text: 'Wireframe-Mockup', isCorrect: false, explanation: 'Das ist ein UI-Designbegriff.' },
              { id: 'd', text: 'WCAG Stufe AAA', isCorrect: false, explanation: 'Accessibility-Standard.' }
            ]
          },
          {
            id: 'q-sec-1-4',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Was versteht man unter "Spear-Phishing"?',
            options: [
              { id: 'a', text: 'Einen maßgeschneiderten, gezielten Phishing-Angriff auf eine ganz bestimmte Person oder Firma mit vorab recherchierten Details', isCorrect: true, explanation: 'Exakt! Im Gegensatz zu Massen-Spam wird das Opfer gezielt ausspioniert.' },
              { id: 'b', text: 'Einen Angriff auf Speichermedien wie USB-Sticks', isCorrect: false, explanation: 'Falsche Wortherkunft.' },
              { id: 'c', text: 'Das Versenden von Flyern per Post', isCorrect: false, explanation: 'Nein.' },
              { id: 'd', text: 'Einen automatischen Virenscan', isCorrect: false, explanation: 'Schutzmaßnahme, kein Angriff.' }
            ]
          }
        ]
      },
      {
        id: 'sec-2',
        chapterId: 'security',
        title: 'Social Engineering, Fake-Shops & Betrugsmuster',
        shortDesc: 'Der Mensch als Schwachstelle: CEO-Fraud, Fake-Shops & Abo-Fallen',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-sec-3',
            title: 'Social Engineering & CEO-Fraud',
            coreConcept: 'Gezielte zwischenmenschliche Manipulation.',
            bulletPoints: [
              'Social Engineering: Der Mensch wird zum Angriffsziel – Ausnutzen von Hilfsbereitschaft, Respekt vor Autorität oder Angst.',
              'CEO-Fraud: Betrüger gibt sich als Geschäftsführer aus und weist Buchhaltung an, unter höchster Geheimhaltung eine dringende Blitzüberweisung zu tätigen.'
            ]
          },
          {
            id: 'n-sec-4',
            title: 'Merkmale von Fake-Shops (Prüfungsfrage!)',
            coreConcept: 'Woran erkennt man einen betrügerischen Online-Shop?',
            bulletPoints: [
              '• Unrealistisch günstige Preise (z. B. Luxusartikel 80% billiger).',
              '• Fehlendes oder gefälschtes Impressum.',
              '• Nur Vorkasse / Überweisung möglich (sichere Zahlarten brechen ab).',
              '• Schlechte Übersetzungen oder kopierte Kundenbewertungen.',
              '• Ungewöhnliche Internetadresse (z. B. .top, .xyz oder Nachahmungen).'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-sec-2-1',
            chapterId: 'security',
            moduleId: 'sec-2',
            question: 'Welches Merkmal deutet am stärksten auf einen Fake-Shop hin?',
            options: [
              { id: 'a', text: 'Zahlung per Rechnung oder PayPal mit Käuferschutz', isCorrect: false, explanation: 'Das sind sichere Zahlungsarten.' },
              { id: 'b', text: 'Ein vollständiges, im Handelsregister prüfbares Impressum', isCorrect: false, explanation: 'Das spricht für einen seriösen Händler.' },
              { id: 'c', text: 'Ausschließlich Vorkasse/Banküberweisung als Zahlungsmethode und kein Impressum', isCorrect: true, explanation: 'Richtig! Fake-Shops wollen unwiderrufliche Vorab-Überweisungen und verstecken ihre Identität.' },
              { id: 'd', text: 'Ein responsives Design für Smartphones', isCorrect: false, explanation: 'Auch betrügerische Seiten können responsive sein.' }
            ]
          },
          {
            id: 'q-sec-2-2',
            chapterId: 'security',
            moduleId: 'sec-2',
            question: 'Was ist das Kernprinzip von "Social Engineering"?',
            options: [
              { id: 'a', text: 'Nicht die Software, sondern der Mensch wird durch Manipulation, Autorität oder Hilfsbereitschaft als Schwachstelle ausgenutzt', isCorrect: true, explanation: 'Genau! "Der Mensch ist das schwächste Glied in der Sicherheitskette."' },
              { id: 'b', text: 'Das Einrichten von Social-Media-Accounts für Firmen', isCorrect: false, explanation: 'Das ist Social Media Marketing.' },
              { id: 'c', text: 'Das Löten von Computer-Chips', isCorrect: false, explanation: 'Hardware-Technik.' },
              { id: 'd', text: 'Die Entwicklung von barrierefreien Farbräumen', isCorrect: false, explanation: 'Barrierefreiheit, nicht Betrug.' }
            ]
          },
          {
            id: 'q-sec-2-3',
            chapterId: 'security',
            moduleId: 'sec-2',
            question: 'Eine gefälschte E-Mail im Namen der Geschäftsführung ordnet eine sofortige vertrauliche Blitzüberweisung an. Wie nennt man diesen Betrug?',
            options: [
              { id: 'a', text: 'CEO-Fraud (Chef-Masche)', isCorrect: true, explanation: 'Richtig! Hoher Druck, Autorität und Geheimhaltung sind typisch für CEO-Fraud.' },
              { id: 'b', text: 'Breadcrumb-Trap', isCorrect: false, explanation: 'Erfundener Begriff.' },
              { id: 'c', text: 'Kanban-WIP-Limit', isCorrect: false, explanation: 'Das ist eine agile Projektmanagement-Regel.' },
              { id: 'd', text: 'Nielsen-Heuristik', isCorrect: false, explanation: 'Usability-Konzept.' }
            ]
          }
        ]
      },
      {
        id: 'sec-3',
        chapterId: 'security',
        title: 'Malware, Schutz & Datenschutz vs. Datensicherheit',
        shortDesc: 'Viren, Ransomware, 2FA & der fundamentale Unterschied',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-sec-5',
            title: 'Malware-Typen im Überblick',
            coreConcept: 'Schadprogramme und ihre Verbreitung.',
            bulletPoints: [
              'Virus: Braucht eine Wirtsdatei, um sich zu verbreiten.',
              'Wurm: Verbreitet sich selbstständig über Netzwerke ohne Wirtsdatei.',
              'Trojaner: Tarnt sich als nützliches Programm (z.B. gratis Bildbearbeitung).',
              'Spyware: Spioniert im Hintergrund Passwörter und Tastenanschläge aus.',
              'Ransomware: Verschlüsselt alle Festplattendaten und fordert Lösegeld.'
            ]
          },
          {
            id: 'n-sec-6',
            title: 'Datenschutz vs. Datensicherheit (Prüfungsklassiker)',
            coreConcept: 'Zwei unterschiedliche Schutzrichtungen!',
            bulletPoints: [
              'Datenschutz: Schützt personenbezogene Daten und die Privatsphäre von Menschen (Name, Adresse, E-Mail, Religion, Gesundheit) vor Missbrauch.',
              'Datensicherheit: Schützt Daten allgemein vor Verlust, Manipulation, Diebstahl oder Zerstörung (durch Backups, Brandschutz, Verschlüsselung, USV, Zugriffskontrollen).'
            ],
            examFavorite: true,
            merksatz: 'Datenschutz schützt die Person vor Datenmissbrauch. Datensicherheit schützt die Daten vor Verlust und Angriffen.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-sec-3-1',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Was ist der Unterschied zwischen Datenschutz und Datensicherheit?',
            options: [
              { id: 'a', text: 'Es gibt keinen, die Begriffe sind Synonyme', isCorrect: false, explanation: 'Klassischer Fehler! Sie bedeuten Verschiedenes.' },
              { id: 'b', text: 'Datenschutz schützt personenbezogene Daten der Bürger; Datensicherheit schützt Daten generell vor Verlust, Diebstahl oder Zerstörung', isCorrect: true, explanation: 'Exakt! Das ist die exakte IHK-Definition.' },
              { id: 'c', text: 'Datensicherheit gilt nur für Mediengestalter, Datenschutz für Banken', isCorrect: false, explanation: 'Beides gilt für alle Unternehmen.' },
              { id: 'd', text: 'Datenschutz meint ausschließlich Virenschutzprogramme', isCorrect: false, explanation: 'Virenschutz ist eine technische Maßnahme der Datensicherheit.' }
            ],
            merksatz: 'Datenschutz = Schutz der Person/Privatsphäre. Datensicherheit = Technischer/organisatorischer Schutz aller Daten.'
          },
          {
            id: 'q-sec-3-2',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Ein Schadprogramm tarnt sich als nützliche Software (z.B. kostenloses Schriftenpaket), schleust aber unbemerkt Schadcode ein. Um welchen Typ handelt es sich?',
            options: [
              { id: 'a', text: 'Trojanisches Pferd (Trojaner)', isCorrect: true, explanation: 'Richtig! Die Tarnung als harmlose oder nützliche Anwendung definiert den Trojaner.' },
              { id: 'b', text: 'Computervirus', isCorrect: false, explanation: 'Ein Virus infiziert bestehende Wirtsdateien.' },
              { id: 'c', text: 'Netzwerkwurm', isCorrect: false, explanation: 'Ein Wurm verbreitet sich selbstständig über Sicherheitslücken.' },
              { id: 'd', text: 'Low-Fi Wireframe', isCorrect: false, explanation: 'Designkonzept.' }
            ]
          },
          {
            id: 'q-sec-3-3',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Welche Schadsoftware verschlüsselt Festplatten eines Unternehmens und erpresst Bitcoins für den Freischalt-Schlüssel?',
            options: [
              { id: 'a', text: 'Ransomware (Erpressungs-Trojaner)', isCorrect: true, explanation: 'Perfekt! Ransom = Lösegeld. Nur externe Backups schützen vor Datenverlust.' },
              { id: 'b', text: 'Adware', isCorrect: false, explanation: 'Adware blendet Werbebanner ein.' },
              { id: 'c', text: 'Screenreader', isCorrect: false, explanation: 'Hilfsmittel für barrierefreies Lesen.' },
              { id: 'd', text: 'Affordance-Filter', isCorrect: false, explanation: 'Erfunden.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'a11y',
    number: 5,
    title: 'Web Accessibility (Barrierefreiheit)',
    subtitle: 'WCAG (POUR), Screenreader, Kontraste & Inklusion',
    description: 'Verstehe Barrierefreiheit für alle 4 Einschränkungsarten, die 4 WCAG-Prinzipien POUR, Semantisches HTML, Tastatursteuerung und Alt-Texte.',
    accentColor: 'amber',
    examMerksatz: 'Web Accessibility bedeutet die barrierefreie Gestaltung digitaler Inhalte, sodass alle Menschen unabhängig von körperlichen, sensorischen oder kognitiven Einschränkungen Websites und Anwendungen wahrnehmen, verstehen, bedienen und nutzen können.',
    examChecklist: [
      '4 Einschränkungsarten (visuell, auditiv, motorisch, kognitiv)',
      'WCAG 4 Prinzipien POUR benennen und erklären',
      'WCAG-Stufen A, AA (gesetzlicher Standard) und AAA',
      'Semantisches HTML (<header>, <main>, <nav> vs. <div>)',
      'Alt-Texte & Farbkontraste (nicht nur Farbe als Signal)'
    ],
    modules: [
      {
        id: 'a11y-1',
        chapterId: 'a11y',
        title: 'Definition & 4 Einschränkungsarten',
        shortDesc: 'Visuelle, auditive, motorische und kognitive Barrieren',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-a11y-1',
            title: 'Warum Accessibility allen nützt',
            coreConcept: 'Barrierefreiheit ist kein Randgruppen-Thema.',
            bulletPoints: [
              'Menschen mit dauerhaften Einschränkungen (Blindheit, Gehörlosigkeit, Motorik-Störungen).',
              'Vorübergehende Einschränkungen (gebrochener Arm, Augenentzündung).',
              'Situative Einschränkungen (laute Umgebung, Sonnenlicht auf Display, einhändige Nutzung im Bus).',
              'Vorteile: Größere Zielgruppe, besseres SEO (Google liest wie ein Screenreader!), rechtliche Sicherheit (BFSG).'
            ]
          },
          {
            id: 'n-a11y-2',
            title: 'Die 4 Arten von Einschränkungen',
            coreConcept: 'Jede Art benötigt gezielte Maßnahmen:',
            bulletPoints: [
              '1. Visuell: Sehschwäche, Farbenblindheit → Hohe Kontraste, skalierbare Schrift, Alt-Texte.',
              '2. Auditiv: Schwerhörigkeit, Taubheit → Untertitel und Transkripte für Videos/Podcasts.',
              '3. Motorisch: Tremor, Lähmung → Tastaturbedienbarkeit, große Klickflächen (Touch Targets).',
              '4. Kognitiv (z. B. ADHS): Konzentrations- & Leseschwierigkeiten → Einfache Sprache, klare Struktur, keine Reizüberflutung.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-a11y-1-1',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            question: 'Welche Gruppe profitiert besonders von Untertiteln in Web-Videos?',
            options: [
              { id: 'a', text: 'Nur Screenreader-Nutzer', isCorrect: false, explanation: 'Screenreader lesen Textinhalte vor.' },
              { id: 'b', text: 'Gehörlose Personen sowie Nutzer in lauten oder stummgeschalteten Umgebungen', isCorrect: true, explanation: 'Richtig! Barrierefreiheit hilft sowohl dauerhaft eingeschränkten als auch situativ betroffenen Nutzern.' },
              { id: 'c', text: 'Ausschließlich Suchmaschinen-Crawler', isCorrect: false, explanation: 'Suchmaschinen profitieren zwar auch, aber der Hauptnutzen gilt Menschen.' },
              { id: 'd', text: 'Nur Personen mit Tastatursteuerung', isCorrect: false, explanation: 'Tastatursteuerung hilft motorisch eingeschränkten Personen.' }
            ]
          },
          {
            id: 'q-a11y-1-2',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            question: 'Warum profitieren Menschen mit ADHS oder kognitiven Einschränkungen besonders von ruhigen, reizarmen Benutzeroberflächen?',
            options: [
              { id: 'a', text: 'Weil Reizüberflutung, blinkende Banner und unstrukturierte Textwüsten die Fokussierung erschweren', isCorrect: true, explanation: 'Richtig! Kognitive Barrierefreiheit erfordert klare visuelle Hierarchie und Verzicht auf visuelles Rauschen.' },
              { id: 'b', text: 'Weil sie nur Bildschirme mit 4K-Auflösung besitzen', isCorrect: false, explanation: 'Absurd.' },
              { id: 'c', text: 'Weil Screenreader keine Farben unterstützen', isCorrect: false, explanation: 'Screenreader lesen Code vor, unabhängig von ADHS.' },
              { id: 'd', text: 'Weil Tastaturen sonst kaputtgehen', isCorrect: false, explanation: 'Nein.' }
            ]
          },
          {
            id: 'q-a11y-1-3',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            question: 'Welche Entwurfs-Entscheidung hilft motorisch eingeschränkten Menschen (z. B. mit Parkinson oder Handzittern)?',
            options: [
              { id: 'a', text: 'Große Klickflächen (mind. 44x44px) und vollständige Tastaturbedienbarkeit ohne Mauszwang', isCorrect: true, explanation: 'Perfekt! Große Touch-Flächen und Tastaturnavigation erleichtern die Treffsicherheit.' },
              { id: 'b', text: 'Schaltflächen möglichst winzig gestalten', isCorrect: false, explanation: 'Das führt zu Fehlklicks.' },
              { id: 'c', text: 'Ausschließlich Mausgesten mit Kreisbewegungen erzwingen', isCorrect: false, explanation: 'Komplett barrierefeindlich.' },
              { id: 'd', text: 'Den Kontrast auf 1:1 reduzieren', isCorrect: false, explanation: 'Macht Text unsichtbar.' }
            ]
          }
        ]
      },
      {
        id: 'a11y-2',
        chapterId: 'a11y',
        title: 'Die 4 WCAG-Prinzipien (POUR) & Stufen',
        shortDesc: 'Perceivable, Operable, Understandable, Robust & Stufe AA',
        estimatedMinutes: 4,
        miniGameType: 'wcag_match',
        nuggets: [
          {
            id: 'n-a11y-3',
            title: 'Das POUR-Akronym der WCAG',
            coreConcept: 'Die vier Säulen der Web Content Accessibility Guidelines.',
            bulletPoints: [
              'P - Perceivable (Wahrnehmbar): Infos müssen wahrnehmbar sein (Kontraste, Alt-Texte für Bilder, Untertitel).',
              'O - Operable (Bedienbar): Alle Funktionen müssen bedienbar sein (vollständige Tastatursteuerung, ausreichend Zeit).',
              'U - Understandable (Verständlich): Sprache und Fehlermeldungen müssen verständlich sein (klare Labels, Hilfe bei Eingaben).',
              'R - Robust (Robust): Code muss sauber sein, damit Screenreader und verschiedene Browser zuverlässig funktionieren.'
            ],
            examFavorite: true,
            merksatz: 'POUR = Perceivable (Wahrnehmbar), Operable (Bedienbar), Understandable (Verständlich), Robust (Robust).'
          },
          {
            id: 'n-a11y-4',
            title: 'Die 3 Konformitätsstufen (A, AA, AAA)',
            coreConcept: 'Stufe AA ist der empfohlene und gesetzliche Standard.',
            bulletPoints: [
              'Stufe A: Absolute Mindestanforderungen (Basisschutz).',
              'Stufe AA: Empfohlener Standard (wird in Gesetzen wie dem Barrierefreiheitsstärkungsgesetz gefordert).',
              'Stufe AAA: Höchste Stufe (nicht immer für alle komplexen Webseiten vollständig umsetzbar).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-a11y-2-1',
            chapterId: 'a11y',
            moduleId: 'a11y-2',
            question: 'Wofür steht das Akronym "POUR" in den WCAG?',
            options: [
              { id: 'a', text: 'Performance, Optimization, Usability, Rendering', isCorrect: false, explanation: 'Das sind technische Performance-Begriffe.' },
              { id: 'b', text: 'Perceivable, Operable, Understandable, Robust (Wahrnehmbar, Bedienbar, Verständlich, Robust)', isCorrect: true, explanation: 'Perfekt! Das sind die 4 Grundprinzipien der WCAG.' },
              { id: 'c', text: 'Pixel, Outline, Typography, Resolution', isCorrect: false, explanation: 'Erfundene Begriffe.' },
              { id: 'd', text: 'Phishing, Operable, User, Responsive', isCorrect: false, explanation: 'Falsche Mischung.' }
            ]
          },
          {
            id: 'q-a11y-2-2',
            chapterId: 'a11y',
            moduleId: 'a11y-2',
            question: 'Welche WCAG-Konformitätsstufe wird typischerweise als gesetzlicher Standard gefordert?',
            options: [
              { id: 'a', text: 'Stufe A', isCorrect: false, explanation: 'Stufe A ist nur das absolute Minimum.' },
              { id: 'b', text: 'Stufe AA', isCorrect: true, explanation: 'Richtig! Stufe AA ist der international empfohlene und gesetzlich verankerte Standard.' },
              { id: 'c', text: 'Stufe AAA', isCorrect: false, explanation: 'Stufe AAA ist die Maximalstufe, aber selten gesetzlich verpflichtend.' },
              { id: 'd', text: 'Stufe B', isCorrect: false, explanation: 'Eine Stufe B existiert in den WCAG nicht.' }
            ]
          },
          {
            id: 'q-a11y-2-3',
            chapterId: 'a11y',
            moduleId: 'a11y-2',
            question: 'Welches Kontrastverhältnis verlangt die WCAG Stufe AA für normalen Fließtext?',
            options: [
              { id: 'a', text: 'Mindestens 4,5:1 gegen den Hintergrund', isCorrect: true, explanation: 'Genau! 4,5:1 für Fließtext und 3:1 für großen Text (ab 18pt bzw. 14pt fett).' },
              { id: 'b', text: 'Mindestens 100:1', isCorrect: false, explanation: 'Technisch nicht möglich.' },
              { id: 'c', text: '1:1 reicht aus', isCorrect: false, explanation: '1:1 ist unsichtbar.' },
              { id: 'd', text: 'Es gibt keinen festen Kontrastwert', isCorrect: false, explanation: 'Die WCAG definiert präzise numerische Schwellenwerte.' }
            ]
          }
        ]
      },
      {
        id: 'a11y-3',
        chapterId: 'a11y',
        title: 'Technische Umsetzung: HTML, Screenreader & Alt-Texte',
        shortDesc: 'Semantik statt Div-Suppe, Tastaturfokus & Farbkontraste',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-a11y-5',
            title: 'Semantisches HTML statt Div-Suppe',
            coreConcept: 'Tags nach ihrer Bedeutung nutzen.',
            bulletPoints: [
              'Richtig: <header>, <nav>, <main>, <article>, <footer>, <button>.',
              'Falsch: <div><div><div> für alles zu verwenden.',
              'Warum? Screenreader können nur anhand semantischer Tags die Struktur vorlesen und Bereiche überspringen!'
            ]
          },
          {
            id: 'n-a11y-6',
            title: 'Alt-Texte, Tastatur & Formulare',
            coreConcept: 'Konkrete Maßnahmen für Webdesigner:',
            bulletPoints: [
              'Alt-Texte: Beschreiben den Inhalt des Bildes für Blinde (z. B. alt="Digitaler Fotoapparat mit Zoomobjektiv").',
              'Tastaturbedienbarkeit: Alles muss mit Tab, Shift+Tab, Enter und Pfeilen bedienbar sein. Sichtbarer Fokusring!',
              'Nie nur Farbe als Signal: Fehler nicht nur mit rotem Rahmen markieren, sondern mit Text "Bitte E-Mail eingeben" und Icon.',
              'Formulare: Jedes Eingabefeld braucht ein verknüpftes <label for="email">.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-a11y-3-1',
            chapterId: 'a11y',
            moduleId: 'a11y-3',
            question: 'Warum ist es barrierefeindlich, eine Fehlermeldung ausschließlich durch ein rotes Feld anzuzeigen?',
            options: [
              { id: 'a', text: 'Weil Rot im Webdesign verboten ist', isCorrect: false, explanation: 'Rot ist eine gängige Signalfarbe.' },
              { id: 'b', text: 'Weil farbenblinde oder sehbehinderte Menschen den Fehler nicht wahrnehmen können', isCorrect: true, explanation: 'Richtig! Information darf nie über Farbe allein vermittelt werden. Immer Text + Icon ergänzen!' },
              { id: 'c', text: 'Weil der Server dadurch langsamer lädt', isCorrect: false, explanation: 'Hat keinen Einfluss auf Serverleistung.' },
              { id: 'd', text: 'Weil Google Seiten mit Rot abstraft', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-a11y-3-2',
            chapterId: 'a11y',
            moduleId: 'a11y-3',
            question: 'Wie zeichnet man ein rein dekoratives Schmuckbild (z. B. eine grafische Trennlinie) im HTML barrierefrei aus?',
            options: [
              { id: 'a', text: 'Mit einem leeren Alt-Attribut alt="", damit Screenreader es stumm übergehen', isCorrect: true, explanation: 'Richtig! So liest der Screenreader keinen störenden Dateinamen vor.' },
              { id: 'b', text: 'Das alt-Attribut ganz weglassen', isCorrect: false, explanation: 'Ohne alt-Attribut liest der Screenreader oft den kryptischen Dateinamen vor.' },
              { id: 'c', text: 'Mit alt="Hier ist ein Deko-Bild"', isCorrect: false, explanation: 'Das spammt blinde Nutzer mit unnützer Information zu.' },
              { id: 'd', text: 'Deko-Bilder sind gesetzlich verboten', isCorrect: false, explanation: 'Dekoration ist erlaubt, muss aber als solche markiert sein.' }
            ]
          },
          {
            id: 'q-a11y-3-3',
            chapterId: 'a11y',
            moduleId: 'a11y-3',
            question: 'Warum darf die Überschriftenstruktur (h1, h2, h3) in HTML nicht aus optischen Gründen durchbrochen werden (z. B. von h1 direkt zu h4)?',
            options: [
              { id: 'a', text: 'Weil blinde Screenreader-Nutzer anhand der Überschriften-Ebenen durch das Dokument springen und die Hierarchie verstehen', isCorrect: true, explanation: 'Exakt! Eine saubere Überschriften-Hierarchie ist das Inhaltsverzeichnis für Screenreader.' },
              { id: 'b', text: 'Weil sonst der CSS-Code abstürzt', isCorrect: false, explanation: 'CSS stürzt nicht ab.' },
              { id: 'c', text: 'Weil die Schrift dann unscharf gerendert wird', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Weil nur h1 gesetzlich geschützt ist', isCorrect: false, explanation: 'Unsinn.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'project',
    number: 6,
    title: 'Projektablauf & Projektmanagement',
    subtitle: 'Die 6 Phasen, Lasten- vs. Pflichtenheft & Scrum',
    description: 'Meistere die Phasen Initiierung bis Abschluss, Meilensteine, Lastenheft (Was?) vs. Pflichtenheft (Wie?), Wasserfall vs. Agil (Scrum).',
    accentColor: 'teal',
    examMerksatz: 'Der Projektablauf beschreibt die strukturierte Umsetzung eines Projekts von der Idee über Planung, Konzeption, Umsetzung und Test bis zum erfolgreichen Abschluss.',
    examChecklist: [
      'Die 6 Projektphasen in richtiger Reihenfolge',
      'Was definiert ein Projekt? (Ziel, Anfang/Ende, Ressourcen, Budget)',
      'Lastenheft (Auftraggeber: Was?) vs. Pflichtenheft (Auftragnehmer: Wie?)',
      'Meilensteine als wichtige Kontrollpunkte',
      'Scrum-Begriffe: Sprint, Product Backlog, Sprint Backlog, Review, Retrospektive'
    ],
    modules: [
      {
        id: 'proj-1',
        chapterId: 'project',
        title: 'Was ist ein Projekt & Die 6 Phasen',
        shortDesc: 'Initiierung → Planung → Konzeption → Umsetzung → Testphase → Abschluss',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-proj-1',
            title: 'Definition: Was ist ein Projekt?',
            coreConcept: 'Ein Vorhaben mit definierten Rahmenbedingungen.',
            bulletPoints: [
              'Ein klares Ziel, ein definierter Start, ein definiertes Ende.',
              'Begrenzte personelle und technische Ressourcen, begrenztes Budget.',
              'Beispiele: Relaunch einer E-Commerce-Website, Erstellung eines Corporate Designs.'
            ]
          },
          {
            id: 'n-proj-2',
            title: 'Die 6 Projektphasen der Reihe nach',
            coreConcept: 'Systematischer Ablauf von der Idee zum Ergebnis.',
            bulletPoints: [
              '1. Projektinitiierung: Idee entwickeln, Ziele definieren, Projektauftrag.',
              '2. Projektplanung: Zeitplan, Meilensteine, Ressourcen, Risiken analysieren.',
              '3. Konzeption: Zielgruppenanalyse, Informationsarchitektur, User Flow, Wireframes.',
              '4. Umsetzung: Layouts gestalten, Code programmieren, Content einpflegen.',
              '5. Testphase: Funktions-, Usability-, Responsiv- & Accessibility-Tests.',
              '6. Projektabschluss: Abnahme durch den Kunden, Dokumentation, Review.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-proj-1-1',
            chapterId: 'project',
            moduleId: 'proj-1',
            question: 'In welcher Projektphase werden Wireframes, User Flows und die Zielgruppenanalyse erstellt?',
            options: [
              { id: 'a', text: 'Konzeption', isCorrect: true, explanation: 'Richtig! In der Konzeptionsphase wird die inhaltliche und funktionale Lösung entwickelt.' },
              { id: 'b', text: 'Testphase', isCorrect: false, explanation: 'In der Testphase wird das fertige Produkt geprüft.' },
              { id: 'c', text: 'Projektabschluss', isCorrect: false, explanation: 'Im Abschluss erfolgen Abnahme und Dokumentation.' },
              { id: 'd', text: 'Programmierung', isCorrect: false, explanation: 'Programmierung gehört zur Umsetzungsphase.' }
            ]
          },
          {
            id: 'q-proj-1-2',
            chapterId: 'project',
            moduleId: 'proj-1',
            question: 'Welche Merkmale grenzen ein Projekt von einer Routineaufgabe (Linientätigkeit) ab?',
            options: [
              { id: 'a', text: 'Einmaligkeit, klare Zielvorgabe, zeitliche Befristung und begrenztes Budget', isCorrect: true, explanation: 'Exakt! Nach DIN 69901 ist ein Projekt im Wesentlichen durch Einmaligkeit, Zielvorgabe, zeitliche und finanzielle Begrenzung definiert.' },
              { id: 'b', text: 'Wiederkehrende tägliche Arbeitsabläufe ohne Endtermin', isCorrect: false, explanation: 'Das beschreibt Routine-/Linienarbeit.' },
              { id: 'c', text: 'Unbegrenzte finanzielle Mittel und keine Terminvorgaben', isCorrect: false, explanation: 'Ein Projekt hat stets begrenzte Ressourcen.' },
              { id: 'd', text: 'Projekte werden ausschließlich von externen Praktikanten durchgeführt', isCorrect: false, explanation: 'Nein.' }
            ]
          },
          {
            id: 'q-proj-1-3',
            chapterId: 'project',
            moduleId: 'proj-1',
            question: 'Was ist ein wesentlicher Bestandteil der Phase 6: Projektabschluss?',
            options: [
              { id: 'a', text: 'Formelle Projektabnahme durch den Auftraggeber, Projektdokumentation und Lessons-Learned-Abschluss', isCorrect: true, explanation: 'Richtig! Die formelle Abnahme, Entlastung des Teams und Dokumentation schließen das Projekt rechtlich und organisatorisch ab.' },
              { id: 'b', text: 'Erstmaliges Erstellen von Design-Wireframes', isCorrect: false, explanation: 'Das gehört in die Konzeptionsphase.' },
              { id: 'c', text: 'Definition der allerersten Zielgruppenanforderungen', isCorrect: false, explanation: 'Das gehört in Initiierung und Konzeption.' },
              { id: 'd', text: 'Neuaufsetzen der gesamten Software-Architektur', isCorrect: false, explanation: 'Das wäre eine Neuplanung.' }
            ]
          }
        ]
      },
      {
        id: 'proj-2',
        chapterId: 'project',
        title: 'Lastenheft vs. Pflichtenheft & Meilensteine',
        shortDesc: 'Der größte IHK-Prüfungsklassiker: Wer schreibt was?',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-proj-3',
            title: 'Lastenheft vs. Pflichtenheft',
            coreConcept: 'Klare Trennung zwischen Auftraggeber und Auftragnehmer.',
            bulletPoints: [
              'Lastenheft: Erstellt vom AUFTRAGGEBER (Kunde). Beschreibt das "WAS soll erreicht werden?" (Gesamtheit aller Anforderungen und Wünsche).',
              'Pflichtenheft: Erstellt vom AUFTRAGNEHMER (Agentur/Entwickler). Beschreibt das "WIE wird das Ziel umgesetzt?" (Konkrete technische und gestalterische Umsetzungsschritte).'
            ],
            examFavorite: true,
            merksatz: 'Lastenheft = WAS will der Kunde? (Auftraggeber) | Pflichtenheft = WIE setzt die Agentur es um? (Auftragnehmer).'
          },
          {
            id: 'n-proj-4',
            title: 'Meilensteine',
            coreConcept: 'Wichtige Kontrollpunkte im Projekt.',
            bulletPoints: [
              'Definieren überprüfbare Etappenziele ohne eigene Zeitdauer (z. B. "Freigabe des Konzepts", "Fertigstellung des Wireframes", "Projektabnahme").',
              'Dienen der Qualitätskontrolle und Terminüberwachung.'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-proj-2-1',
            chapterId: 'project',
            moduleId: 'proj-2',
            question: 'Wer erstellt das Pflichtenheft und welche Kernfrage beantwortet es?',
            options: [
              { id: 'a', text: 'Der Auftraggeber; es beantwortet "Was soll erreicht werden?"', isCorrect: false, explanation: 'Das beschreibt das Lastenheft!' },
              { id: 'b', text: 'Der Auftragnehmer; es beantwortet "Wie wird das Ziel umgesetzt?"', isCorrect: true, explanation: 'Exakt! Der Auftragnehmer beschreibt im Pflichtenheft das konkrete "Wie".' },
              { id: 'c', text: 'Der Gesetzgeber; es beantwortet Steuerfragen', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Die IHK-Prüfungskommission', isCorrect: false, explanation: 'Nein.' }
            ]
          },
          {
            id: 'q-proj-2-2',
            chapterId: 'project',
            moduleId: 'proj-2',
            question: 'Welche formale Eigenschaft besitzt ein Meilenstein in einem Projektzeitplan (Gantt-Diagramm)?',
            options: [
              { id: 'a', text: 'Er hat eine Zeitdauer von 0 Tagen und markiert ein überprüfbares Zwischenereignis', isCorrect: true, explanation: 'Richtig! Meilensteine haben keine Dauer, sie markieren den Zeitpunkt des Erreichens eines Zwischenziels (z. B. Freigabe Layouts).' },
              { id: 'b', text: 'Er muss immer mindestens 4 Wochen dauern', isCorrect: false, explanation: 'Falsch, ein Meilenstein ist ein Stichtag/Ereignis.' },
              { id: 'c', text: 'Er beschreibt ausschließlich das Budget', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Er darf nur vom Programmierer definiert werden', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-proj-2-3',
            chapterId: 'project',
            moduleId: 'proj-2',
            question: 'Der Kunde wünscht mitten in der Realisierungsphase zusätzliche Funktionen, die nicht im Pflichtenheft stehen. Was ist das korrekte Vorgehen?',
            options: [
              { id: 'a', text: 'Ein geregelter "Change Request" (Änderungsantrag) mit Prüfung von Mehrkosten und Terminverzögerungen', isCorrect: true, explanation: 'Genau richtig! Änderungen werden über ein formelles Änderungsmanagement dokumentiert, kalkuliert und vom Kunden freigegeben.' },
              { id: 'b', text: 'Die Wünsche ohne Dokumentation und kostenlos am Wochenende einbauen', isCorrect: false, explanation: 'Führt zu Scope Creep, Qualitätsmängeln und Budgetüberziehungen.' },
              { id: 'c', text: 'Sofortige Kündigung des Projekts', isCorrect: false, explanation: 'Unprofessionell.' },
              { id: 'd', text: 'Den Kunden ignorieren und heimlich weitermachen', isCorrect: false, explanation: 'Absolut falsch.' }
            ]
          }
        ]
      },
      {
        id: 'proj-3',
        chapterId: 'project',
        title: 'Klassisch (Wasserfall) vs. Agil (Scrum)',
        shortDesc: 'Lineare Phasen vs. Sprints, Backlogs & Retrospektiven',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-proj-5',
            title: 'Wasserfallmodell vs. Agil',
            coreConcept: 'Zwei Denkweisen in der Projektsteuerung.',
            bulletPoints: [
              'Wasserfallmodell (Klassisch): Phasen laufen streng sequenziell ab (Planung → Konzeption → Umsetzung → Test → Abschluss). Jede Phase muss abgeschlossen sein, bevor die nächste beginnt. Nachteil: Unflexibel bei Änderungen.',
              'Agil (z. B. Scrum): Kurze Entwicklungszyklen (Sprints), stetiges Nutzer-Feedback, hohe Flexibilität bei neuen Anforderungen.'
            ]
          },
          {
            id: 'n-proj-6',
            title: 'Die 5 Scrum-Schlüsselbegriffe',
            coreConcept: 'Wichtige Vokabeln für die IHK-Abschlussprüfung:',
            bulletPoints: [
              'Sprint: Feste, kurze Arbeitsphase (meist 1 bis 4 Wochen).',
              'Product Backlog: Die geordnete Gesamtsammlung aller Anforderungen an das Produkt.',
              'Sprint Backlog: Die Aufgaben, die sich das Team für den aktuellen Sprint vorgenommen hat.',
              'Sprint Review: Präsentation der fertigen Teilergebnisse vor Kunden/Stakeholdern.',
              'Retrospektive: Teaminternes Feedback: Was lief gut? Was können wir im nächsten Sprint besser machen?'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-proj-3-1',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Was ist in Scrum eine "Retrospektive"?',
            options: [
              { id: 'a', text: 'Eine Präsentation der Software für die Kunden', isCorrect: false, explanation: 'Das ist das Sprint Review.' },
              { id: 'b', text: 'Eine interne Teambesprechung am Sprintende zur Verbesserung der Zusammenarbeit und Prozesse', isCorrect: true, explanation: 'Richtig! In der Retrospektive reflektiert das Team die Arbeitsweise.' },
              { id: 'c', text: 'Die Liste aller offenen Anforderungen', isCorrect: false, explanation: 'Das ist das Product Backlog.' },
              { id: 'd', text: 'Das finale Projektabschluss-Essen', isCorrect: false, explanation: 'Nett, aber nicht der methodische Fachbegriff.' }
            ]
          },
          {
            id: 'q-proj-3-2',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Welche zentrale Aufgabe hat der Product Owner im Scrum-Framework?',
            options: [
              { id: 'a', text: 'Er pflegt und priorisiert das Product Backlog nach geschäftlichem Wert und vertritt die Anwenderwünsche', isCorrect: true, explanation: 'Exakt! Der Product Owner verantwortet den wirtschaftlichen Wert und das Product Backlog.' },
              { id: 'b', text: 'Er schreibt den gesamten Programmcode allein', isCorrect: false, explanation: 'Das macht das Entwickler-Team.' },
              { id: 'c', text: 'Er fungiert als klassischer Chef, der Aufgaben autoritär zuteilt', isCorrect: false, explanation: 'Scrum-Teams arbeiten selbstorganisiert.' },
              { id: 'd', text: 'Er moderiert ausschließlich das Daily Standup', isCorrect: false, explanation: 'Das Entwickler-Team organisiert das Daily selbst, unterstützt vom Scrum Master.' }
            ]
          },
          {
            id: 'q-proj-3-3',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Was ist der Hauptzweck des "Sprint Reviews"?',
            options: [
              { id: 'a', text: 'Vorstellung des fertigen Produkt-Inkrements vor Stakeholdern, um wertvolles Feedback zu sammeln', isCorrect: true, explanation: 'Richtig! Im Review wird das potentiell auslieferbare Produktinkrement demonstriert.' },
              { id: 'b', text: 'Kritik an einzelnen Teammitgliedern üben', isCorrect: false, explanation: 'Falsch und unkonstruktiv.' },
              { id: 'c', text: 'Die Projektkosten der letzten 5 Jahre kalkulieren', isCorrect: false, explanation: 'Gehört nicht zum Sprint Review.' },
              { id: 'd', text: 'Das Product Backlog komplett löschen', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-proj-3-4',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Welche Rolle hat der "Scrum Master" im agilen Projekt?',
            options: [
              { id: 'a', text: 'Er ist Servant Leader, beseitigt Hindernisse (Impediments) und sorgt für die Einhaltung der Scrum-Regeln', isCorrect: true, explanation: 'Exakt! Der Scrum Master coacht das Team, schützt es vor Störungen von außen und räumt Hürden aus dem Weg.' },
              { id: 'b', text: 'Er bestimmt das finale Design der Webapplikation', isCorrect: false, explanation: 'Das entscheiden Designer/Product Owner.' },
              { id: 'c', text: 'Er ist der Kunde und bezahlt die Rechnungen', isCorrect: false, explanation: 'Das ist der Auftraggeber/Stakeholder.' },
              { id: 'd', text: 'Er schreibt das Lastenheft des Kunden', isCorrect: false, explanation: 'Nein.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'database',
    number: 7,
    title: 'Datenbanken, Datenaustausch & JSON (DB)',
    subtitle: 'Tabellen, SQL, JSON-Syntax, Datentypen & Web-APIs',
    description: 'Verstehe relationale Datenmodelle (SQL), Primär- und Fremdschlüssel, ERD-Kardinalitäten, Normalisierung sowie JSON-Schlüssel-Wert-Syntax, Datentypen, XML-Vergleich und Web-APIs im Mediendesign.',
    accentColor: 'cyan',
    examMerksatz: 'Datenbanken sichern Daten konsistent in Tabellen (SQL); für den schnellen, schlanken Datenaustausch zwischen Server und Frontend im Web ist JSON mit Schlüssel-Wert-Paaren der weltweite IHK-Standard!',
    examChecklist: [
      'Tabellen, Datensätze (Zeilen) & Felder (Spalten) definieren',
      'Primärschlüssel vs. Fremdschlüssel unterscheiden',
      'Kardinalitäten beherrschen (1:1, 1:n, n:m über Zwischentabelle)',
      'SQL CRUD-Befehle zuordnen (INSERT, SELECT, UPDATE, DELETE)',
      'Wichtigkeit der WHERE-Klausel bei UPDATE und DELETE',
      'Normalisierung: Redundanzen und Inkonsistenzen vermeiden',
      'JSON-Grundprinzip: Schlüssel-Wert-Paare (Text in doppelten Anführungszeichen)',
      'JSON-Syntax: Objekte { } (Gruppierung) vs. Arrays [ ] (Listen)',
      'Erlaubte JSON-Datentypen (String, Number, Boolean, Null, Object, Array)',
      'Die 4 Prüfungsgründe: Warum JSON statt XML? (Kompakt, Schnell, Nativ, Lesbar)',
      'Web-APIs: Datenaustausch zwischen Server-JSON und Frontend-Interface'
    ],
    modules: [
      {
        id: 'db-1',
        chapterId: 'database',
        title: 'Tabellen, Primär- & Fremdschlüssel, Kardinalitäten',
        shortDesc: 'Die Bausteine relationaler Datenbanken: Zeilen, Spalten, IDs und Beziehungen von 1:1 bis n:m.',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-db-1-1',
            title: 'Was ist eine Datenbank im Mediendesign?',
            coreConcept: 'Strukturierte Sammlung von Daten für dynamische digitale Produkte.',
            bulletPoints: [
              'Einsatz: Websites, Online-Shops, CMS (z. B. WordPress), Bildarchive (DAM) und Kundenverwaltung.',
              'Vorteil gegenüber Excel: Bewältigt riesige Datenmengen und erlaubt vielen Nutzern gleichzeitig sicheren Zugriff.',
              'Praxisbeispiel: Ein Online-Shop speichert nicht für jedes Produkt eine HTML-Datei, sondern lädt Texte, Preise und Bildpfade dynamisch aus der Datenbank.'
            ],
            merksatz: 'Datenbanken trennen Inhalt von Layout und ermöglichen dynamische Webseiten.'
          },
          {
            id: 'n-db-1-2',
            title: 'Tabellen, Datensätze und Felder',
            coreConcept: 'Die drei Grundeinheiten relationaler Systeme.',
            bulletPoints: [
              'Tabelle: Sammlung zusammengehöriger Daten zu einem Thema (z. B. "Kunden" oder "Projekte").',
              'Datensatz (Zeile / Row): Angaben zu einem einzelnen realen Objekt (z. B. das Projekt "Sommerkampagne"). Jeder Datensatz beschreibt genau eine Sache!',
              'Feld (Spalte / Column): Eine bestimmte Eigenschaft aller Datensätze (z. B. "Titel", "Status", "E-Mail").'
            ],
            examFavorite: true,
            example: 'Eine Zeile ist ein Datensatz, eine Spalte ein Feld.'
          },
          {
            id: 'n-db-1-3',
            title: 'Primärschlüssel vs. Fremdschlüssel',
            coreConcept: 'Eindeutige Identifikation und Verknüpfung.',
            bulletPoints: [
              'Primärschlüssel (Primary Key): Identifiziert jeden Datensatz eindeutig (z. B. Projekt_ID = 101, Kunden_ID = 502). Selbst wenn zwei Kunden "Max Mustermann" heißen, unterscheidet sie ihre ID.',
              'Fremdschlüssel (Foreign Key): Verweist auf den Primärschlüssel einer anderen Tabelle und verbindet so zwei Tabellen miteinander (z. B. Kunden_ID in der Tabelle "Projekte").',
              'Warum keine Namen wiederholen? Ein Name kann sich ändern (Heirat, Tippfehler). Mit einer Kunden_ID müssen Änderungen nur an einer einzigen Stelle gepflegt werden.'
            ],
            merksatz: 'Der Primärschlüssel identifiziert ein Objekt eindeutig; der Fremdschlüssel stellt die Verbindung her.'
          },
          {
            id: 'n-db-1-4',
            title: 'Kardinalitäten (1:1, 1:n, n:m)',
            coreConcept: 'Wie Datensätze zueinander in Beziehung stehen.',
            bulletPoints: [
              '1:1 (Eins-zu-eins): Ein Datensatz in A gehört zu genau einem in B. Beispiel: Ein Mitarbeiter hat genau einen Dienstausweis; ein Nutzer hat genau ein Profil.',
              '1:n (Eins-zu-viele): Ein Datensatz in A kann mit vielen in B verbunden sein. Beispiel: Ein Kunde (1) vergibt viele Projekte (n); ein Autor (1) schreibt viele Bücher (n).',
              'n:m (Viele-zu-viele): Viele Datensätze in A können mit vielen in B verknüpft sein. Beispiel: Ein Projekt nutzt viele Bilder, und ein Bild kann in mehreren Projekten vorkommen.',
              'Zwischentabelle: Eine n:m-Beziehung wird in der Praxis IMMER über eine Verknüpfungstabelle umgesetzt (z. B. "Projekt_Bilder" mit Projekt_ID und Bild_ID).'
            ],
            examFavorite: true,
            example: 'n:m benötigt zwingend eine Zwischentabelle mit den beiden Fremdschlüsseln.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-db-1-1',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Was beschreibt eine einzelne Zeile (Row) in einer relationalen Datenbanktabelle?',
            options: [
              { id: 'a', text: 'Einen Datensatz, der ein konkretes einzelnes Objekt repräsentiert (z. B. ein einzelnes Projekt)', isCorrect: true, explanation: 'Richtig! Eine Zeile ist ein Datensatz für genau ein Objekt; Spalten sind die Eigenschaften (Felder).' },
              { id: 'b', text: 'Eine Spalte mit allen E-Mail-Adressen der Kunden', isCorrect: false, explanation: 'Das wäre eine Spalte (Feld), keine Zeile.' },
              { id: 'c', text: 'Den Namen der gesamten Datenbankdatei', isCorrect: false, explanation: 'Das ist der Datenbank-Name.' },
              { id: 'd', text: 'Eine SQL-Verbindung zum Server', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-1-2',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Welche Kernfunktion hat ein Primärschlüssel (Primary Key)?',
            options: [
              { id: 'a', text: 'Er verschlüsselt Passwörter mit TLS', isCorrect: false, explanation: 'Primärschlüssel dienen der Identifikation, nicht der kryptografischen Verschlüsselung.' },
              { id: 'b', text: 'Er identifiziert jeden Datensatz innerhalb einer Tabelle vollkommen eindeutig', isCorrect: true, explanation: 'Exakt! Der Primärschlüssel (z. B. Kunden_ID = 502) garantiert Verwechslungsfreiheit.' },
              { id: 'c', text: 'Er sortiert die Datensätze immer alphabetisch nach dem Nachnamen', isCorrect: false, explanation: 'Das macht die Klausel ORDER BY.' },
              { id: 'd', text: 'Er löscht doppelte Bilddateien automatisch', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-1-3',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Wie wird eine n:m-Beziehung (z. B. ein Web-Projekt nutzt mehrere Bilder und ein Bild kommt in mehreren Projekten vor) technisch realisiert?',
            options: [
              { id: 'a', text: 'Über eine zusätzliche Verknüpfungstabelle (Zwischentabelle), die beide Fremdschlüssel enthält', isCorrect: true, explanation: 'Richtig! Eine Zwischentabelle (z. B. Projekt_Bilder mit Projekt_ID und Bild_ID) löst n:m-Beziehungen auf.' },
              { id: 'b', text: 'Man schreibt alle Bild-Namen kommagetrennt in ein einziges Textfeld', isCorrect: false, explanation: 'Das verletzt fundamentale Normalisierungsregeln und erschwert Abfragen.' },
              { id: 'c', text: 'n:m-Beziehungen sind in relationalen Datenbanken unmöglich', isCorrect: false, explanation: 'Sie sind gängiger Standard via Zwischentabelle.' },
              { id: 'd', text: 'Man verdoppelt einfach die gesamte Datenbank', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-1-4',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Warum speichert man in einer Bestelltabelle als Kundenreferenz nur die Kunden_ID (Fremdschlüssel) statt des Namens?',
            options: [
              { id: 'a', text: 'Damit Daten konsistent bleiben und eine Namensänderung nur an einer zentralen Stelle vorgenommen werden muss', isCorrect: true, explanation: 'Exakt! Single Source of Truth: Ändert sich der Name oder die Adresse, reicht ein Update in der Kunden-Tabelle.' },
              { id: 'b', text: 'Weil relationale Datenbanken keine Buchstaben speichern können', isCorrect: false, explanation: 'Datenbanken unterstützen Textfelder (VARCHAR).' },
              { id: 'c', text: 'Weil die DSGVO das Speichern von Kundennamen in Webshops verbietet', isCorrect: false, explanation: 'Kundendaten dürfen zur Vertragserfüllung gespeichert werden.' },
              { id: 'd', text: 'Damit der Online-Shop langsamer lädt', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-1-5',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Welches Szenario beschreibt eine klassische 1:n-Beziehung im Mediendesign?',
            options: [
              { id: 'a', text: 'Ein Kunde hat mehrere beauftragte Web-Projekte, aber jedes Projekt gehört zu genau einem Kunden', isCorrect: true, explanation: 'Richtig! Ein Kunde (1) kann viele Projekte (n) besitzen.' },
              { id: 'b', text: 'Ein Mitarbeiter besitzt genau einen Firmenausweis', isCorrect: false, explanation: 'Das ist eine 1:1-Beziehung.' },
              { id: 'c', text: 'Ein Student besucht viele Vorlesungen und jede Vorlesung hat viele Studenten', isCorrect: false, explanation: 'Das ist eine n:m-Beziehung.' },
              { id: 'd', text: 'Ein SVG-Icon hat genau eine Farbpalette', isCorrect: false, explanation: 'Nicht repräsentativ für relationale Kardinalitäten.' }
            ]
          }
        ]
      },
      {
        id: 'db-2',
        chapterId: 'database',
        title: 'SQL-Grundlagen, CRUD & Abfragen',
        shortDesc: 'Die 4 Grundoperationen (CRUD), lebenswichtige WHERE-Bedingungen, ORDER BY und Tabellen-JOINs.',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-db-2-1',
            title: 'Was ist SQL & die 4 Grundoperationen (CRUD)?',
            coreConcept: 'Structured Query Language: Der weltweite Standard für relationale Daten.',
            bulletPoints: [
              'Create (Erstellen) → INSERT INTO: Fügt neue Datensätze hinzu (z. B. INSERT INTO Projekte VALUES ...).',
              'Read (Lesen) → SELECT: Fragt Daten ab (z. B. SELECT Titel FROM Projekte).',
              'Update (Aktualisieren) → UPDATE: Ändert bestehende Daten (z. B. UPDATE Projekte SET Status = "Freigegeben").',
              'Delete (Löschen) → DELETE: Löscht Datensätze (z. B. DELETE FROM Projekte WHERE ...).'
            ],
            merksatz: 'CRUD steht für Create (INSERT), Read (SELECT), Update (UPDATE) und Delete (DELETE).'
          },
          {
            id: 'n-db-2-2',
            title: 'Prüfungs-Alarm: Die WHERE-Klausel bei UPDATE & DELETE',
            coreConcept: 'Schutz vor katastrophalem Datenverlust.',
            bulletPoints: [
              'Lebenswichtig: Bei UPDATE und DELETE immer exakt prüfen, ob die WHERE-Bedingung vorhanden und korrekt ist.',
              'Gefahr: Ohne WHERE werden ALLE Datensätze der gesamten Tabelle geändert oder unwiderruflich gelöscht!',
              'Beispiel: "UPDATE Projekte SET Status = \'Freigegeben\';" würde sofort JEDES Projekt im System auf freigegeben setzen.'
            ],
            examFavorite: true,
            example: 'Merksatz für die IHK: Niemals UPDATE oder DELETE ohne WHERE-Bedingung absenden!'
          },
          {
            id: 'n-db-2-3',
            title: 'Daten filtern und sortieren (WHERE & ORDER BY)',
            coreConcept: 'Gezielte Anzeige für CMS und Frontends.',
            bulletPoints: [
              'Filtern mit WHERE: SELECT Titel, Status FROM Projekte WHERE Status = \'Entwurf\';',
              'Sortieren mit ORDER BY: ORDER BY Titel ASC (aufsteigend, A–Z) oder ORDER BY Titel DESC (absteigend, Z–A).',
              'Kombination: Ermöglicht in einem CMS das Filtern nur nach Entwürfen, alphabetisch sortiert.'
            ],
            merksatz: 'WHERE filtert Zeilen, ORDER BY sortiert das Ergebnis (ASC = aufsteigend, DESC = absteigend).'
          },
          {
            id: 'n-db-2-4',
            title: 'Tabellen verknüpfen mit JOIN',
            coreConcept: 'Kombination von Daten aus mehreren Tabellen.',
            bulletPoints: [
              'Mit JOIN verbindet man passende Datensätze anhand ihrer Schlüssel.',
              'Syntax: SELECT Projekte.Titel, Kunden.Name FROM Projekte JOIN Kunden ON Projekte.Kunden_ID = Kunden.Kunden_ID;',
              'Vorteil: Man erhält im Web-Frontend direkt den Projekttitel und den zugehörigen Kundennamen in einer einzigen Abfrage.'
            ],
            example: 'JOIN führt Tabellen über Fremdschlüssel und Primärschlüssel zusammen.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-db-2-1',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Welcher SQL-Befehl entspricht der CRUD-Operation "Update" (Bestehende Daten ändern)?',
            options: [
              { id: 'a', text: 'UPDATE', isCorrect: true, explanation: 'Richtig! UPDATE Projekte SET Status = ... aktualisiert bestehende Datensätze.' },
              { id: 'b', text: 'INSERT INTO', isCorrect: false, explanation: 'INSERT INTO entspricht Create (neue Datensätze anlegen).' },
              { id: 'c', text: 'SELECT', isCorrect: false, explanation: 'SELECT entspricht Read (Daten auslesen).' },
              { id: 'd', text: 'ALTER TABLE', isCorrect: false, explanation: 'ALTER TABLE ändert die Tabellenstruktur (DDL), nicht den Inhalt.' }
            ]
          },
          {
            id: 'q-db-2-2',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Was geschieht, wenn der Befehl "DELETE FROM Projekte;" versehentlich ohne WHERE-Klausel ausgeführt wird?',
            options: [
              { id: 'a', text: 'Alle Datensätze der Tabelle "Projekte" werden unwiderruflich gelöscht', isCorrect: true, explanation: 'Richtig! Ohne WHERE-Bedingung wirkt der Löschbefehl auf ausnahmslos jeden Datensatz.' },
              { id: 'b', text: 'Die Datenbank fragt automatisch dreimal nach einer Bestätigung', isCorrect: false, explanation: 'SQL führt den Befehl direkt aus, sofern keine Sperren aktiv sind.' },
              { id: 'c', text: 'Es wird nur der allererste Datensatz gelöscht', isCorrect: false, explanation: 'Falsch – alle Datensätze werden gelöscht.' },
              { id: 'd', text: 'Der Befehl bricht mit einem Syntaxfehler ab', isCorrect: false, explanation: 'DELETE FROM Tabelle ist syntaktisch vollkommen legal, aber gefährlich.' }
            ]
          },
          {
            id: 'q-db-2-3',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Wie lautet die korrekte SQL-Abfrage, um nur freigegebene Projekte abzufragen?',
            options: [
              { id: 'a', text: "SELECT Titel FROM Projekte WHERE Status = 'Freigegeben';", isCorrect: true, explanation: 'Exakt! Die WHERE-Klausel filtert auf Datensätze mit dem Status Freigegeben.' },
              { id: 'b', text: "SEARCH Projekte IF Status IS 'Freigegeben';", isCorrect: false, explanation: 'Ungültige SQL-Syntax.' },
              { id: 'c', text: "FILTER Projekte BY 'Freigegeben';", isCorrect: false, explanation: 'Ungültige SQL-Syntax.' },
              { id: 'd', text: "GET Projekte (Freigegeben);", isCorrect: false, explanation: 'Ungültige SQL-Syntax.' }
            ]
          },
          {
            id: 'q-db-2-4',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Wofür steht die Abkürzung DESC in einer SQL-Sortieranweisung (z. B. ORDER BY Datum DESC)?',
            options: [
              { id: 'a', text: 'Absteigend sortieren (Descending – vom Neuesten zum Ältesten bzw. Z bis A)', isCorrect: true, explanation: 'Richtig! DESC = absteigend; ASC = aufsteigend.' },
              { id: 'b', text: 'Description – fügt eine Beschreibung an', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Destroy – löscht das Feld nach der Sortierung', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Design – formatiert das Feld für Mediengestalter', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-2-5',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Welches SQL-Konstrukt verbindet Datensätze aus zwei Tabellen (z. B. Projekte und Kunden) anhand passender IDs?',
            options: [
              { id: 'a', text: 'JOIN (z. B. Projekte JOIN Kunden ON Projekte.Kunden_ID = Kunden.Kunden_ID)', isCorrect: true, explanation: 'Richtig! Ein JOIN verbindet Tabellen über Primär- und Fremdschlüssel.' },
              { id: 'b', text: 'ATTACH FILE', isCorrect: false, explanation: 'Kein SQL-Standard.' },
              { id: 'c', text: 'COMBINE CSS', isCorrect: false, explanation: 'CSS ist Stylesheet-Technologie, kein SQL.' },
              { id: 'd', text: 'GROUP BY ORDER', isCorrect: false, explanation: 'GROUP BY dient der Aggregation, nicht der Tabellenverknüpfung.' }
            ]
          }
        ]
      },
      {
        id: 'db-3',
        chapterId: 'database',
        title: 'Normalisierung, Datenqualität & Digital Asset Management',
        shortDesc: 'Redundanzen minimieren, Single Point of Truth, typisierte Pflichtfelder und Bildarchive im Mediendesign.',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-db-3-1',
            title: 'Normalisierung: Daten sinnvoll aufteilen',
            coreConcept: 'Vermeidung von Wiederholungen (Redundanzen) und Widersprüchen.',
            bulletPoints: [
              'Problem: Schreibt man Kundendaten in jede Projektzeile, entstehen Doppelungen. Ändert sich eine E-Mail, muss sie 100-mal geändert werden.',
              'Lösung: Kundendaten einmal in "Kunden" speichern und über Kunden_ID mit Projekten verknüpfen.',
              'Nutzen: Weniger Speicherbedarf, keine Widersprüche, sichere und schnelle Datenpflege.'
            ],
            merksatz: 'Normalisierung verhindert doppelte Einträge und sichert Datenkonsistenz.'
          },
          {
            id: 'n-db-3-2',
            title: 'Datenqualität & Datentypen',
            coreConcept: 'Strikte Typisierung schützt vor Anzeigefehlern im Frontend.',
            bulletPoints: [
              'Einheitliche Formate: Datumsangaben immer im gleichen Standard (z. B. ISO JJJJ-MM-TT).',
              'Pflichtfelder & Typen: Ein Datum muss als DATE gespeichert werden, nicht als beliebiger Text (VARCHAR). Preise als numerischer Typ, Status-Flags als BOOLEAN.',
              'Datenpflege: Veraltete Texte, nicht mehr existente Bilder oder fehlerhafte Kontaktdaten konsequent bereinigen.'
            ],
            examFavorite: true,
            example: 'Falsche Datentypen führen zu fehlerhaften Sortierungen (z. B. "10" vor "2" bei reinem Text).'
          },
          {
            id: 'n-db-3-3',
            title: 'Bildarchive & Digital Asset Management (DAM)',
            coreConcept: 'Strukturierte Metadaten für Medienproduktion.',
            bulletPoints: [
              'In Bildarchiven speichert die Datenbank: Dateiname, Format, Bildmaße (px), Urheber, Lizenzstatus und Schlagwörter (Tags).',
              'Rechtssicherheit: Ohne korrekte Lizenz- und Urheberdokumentation drohen Urheberrechts-Abmahnungen im Webauftritt.',
              'Performance: Datenbank liefert passende Bildgrößen je nach Endgerät (Responsive Images).'
            ],
            merksatz: 'Im Digital Asset Management sind Lizenz- und Urheberangaben rechtlich unverzichtbar.'
          },
          {
            id: 'n-db-3-4',
            title: 'NoSQL & Systemplanung für Mediengestalter',
            coreConcept: 'Alternative Modelle und die 4 Prüfungsfragen der Systemplanung.',
            bulletPoints: [
              'NoSQL (Nicht-relational): Speichert Dokumente (z. B. JSON) statt Tabellen. Flexibler für riesige unstrukturierte Datenmengen (z. B. Social-Media-Feeds).',
              'Datenschutz & Sicherheit: Rollenbasierte Zugriffsrechte (wer darf lesen/schreiben), Schutz personenbezogener Daten und regelmäßige Backups.',
              'Die 4 Planungsfragen für Prüflinge: 1. Welche Tabellen brauche ich? 2. Was ist der Primärschlüssel? 3. Wie sind die Tabellen verknüpft (1:n oder n:m)? 4. Welche Datentypen kommen in die Felder?'
            ],
            examFavorite: true,
            example: '1. Tabellen? 2. Primärschlüssel? 3. Beziehungen? 4. Datentypen?'
          }
        ],
        quizQuestions: [
          {
            id: 'q-db-3-1',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Was ist das primäre Ziel der Normalisierung in einer relationalen Datenbank?',
            options: [
              { id: 'a', text: 'Wiederholungen (Redundanzen) und Widersprüche möglichst vollständig zu vermeiden', isCorrect: true, explanation: 'Richtig! Daten werden logisch aufgeteilt, damit jede Information nur an einer einzigen Stelle gepflegt werden muss.' },
              { id: 'b', text: 'Alle Tabellen zu einer einzigen riesigen Tabelle zusammenzufassen', isCorrect: false, explanation: 'Das wäre Denormalisierung und führt zu Redundanzen.' },
              { id: 'c', text: 'Alle Daten in Großbuchstaben umzuwandeln', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Die Datenbank ohne Passwörter öffentlich zugänglich zu machen', isCorrect: false, explanation: 'Verletzt Datenschutz und Sicherheit.' }
            ]
          },
          {
            id: 'q-db-3-2',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Warum sollte ein Veröffentlichungsdatum in einer Datenbank als Datentyp DATE und nicht als freier Text (VARCHAR) gespeichert werden?',
            options: [
              { id: 'a', text: 'Weil nur mit dem Datentyp DATE korrekte chronologische Sortierungen und Datumsberechnungen möglich sind', isCorrect: true, explanation: 'Exakt! Textfelder sortieren alphabetisch, was bei Datumsangaben zu falschen Reihenfolgen führt.' },
              { id: 'b', text: 'Weil Textfelder maximal 4 Zeichen lang sein dürfen', isCorrect: false, explanation: 'VARCHAR kann hunderte Zeichen lang sein.' },
              { id: 'c', text: 'Weil der Webbrowser sonst abstürzt', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Weil DATE weniger bunte Farben im SQL-Editor anzeigt', isCorrect: false, explanation: 'Völlig falsch.' }
            ]
          },
          {
            id: 'q-db-3-3',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Welche Metadaten sind in einem Digital Asset Management (DAM) System für Mediengestalter zur Vermeidung von Rechtsverstößen unverzichtbar?',
            options: [
              { id: 'a', text: 'Urheber und Lizenzstatus der Bilddatei', isCorrect: true, explanation: 'Richtig! Die Dokumentation von Urheber und Nutzungsrechten verhindert kostspielige Abmahnungen.' },
              { id: 'b', text: 'Die Lieblingsfarbe des Fotografen', isCorrect: false, explanation: 'Irrelevant.' },
              { id: 'c', text: 'Der Monitorhersteller des Grafikers', isCorrect: false, explanation: 'Irrelevant.' },
              { id: 'd', text: 'Die Seriennummer der Tastatur', isCorrect: false, explanation: 'Irrelevant.' }
            ]
          },
          {
            id: 'q-db-3-4',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Wann kommen in modernen Webprojekten nicht-relationale NoSQL-Datenbanken bevorzugt zum Einsatz?',
            options: [
              { id: 'a', text: 'Bei riesigen, unstrukturierten Datenmengen wie Social-Media-Feeds oder flexiblen JSON-Dokumenten', isCorrect: true, explanation: 'Richtig! NoSQL-Systeme skalieren exzellent für unstrukturierte Big-Data- und Dokumentenströme.' },
              { id: 'b', text: 'Wenn man Tabellenkalkulationen in Excel drucken möchte', isCorrect: false, explanation: 'Kein NoSQL-Anwendungsfall.' },
              { id: 'c', text: 'Wenn der Server keinen Stromanschluss hat', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Ausschließlich bei Webseiten mit nur einem einzigen Besucher pro Monat', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-3-5',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Welche 4 Kernfragen muss ein Mediengestalter bei der Konzeption eines neuen Datenbanksystems beantworten?',
            options: [
              { id: 'a', text: '1. Welche Tabellen? 2. Was ist der Primärschlüssel? 3. Wie sind sie verknüpft (1:n, n:m)? 4. Welche Datentypen?', isCorrect: true, explanation: 'Exakt! Das ist der Leitfaden für die Systemplanung im Mediendesign.' },
              { id: 'b', text: '1. Welcher Font? 2. Welches Logo? 3. Welcher Drucker? 4. Welche Kaffeemaschine?', isCorrect: false, explanation: 'Das sind keine Datenbanksystemfragen.' },
              { id: 'c', text: '1. Wie teuer ist der Monitor? 2. Welches Betriebssystem? 3. WLAN-Passwort? 4. Feiertage?', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: '1. CSS Grid? 2. Flexbox? 3. RGB? 4. CMYK?', isCorrect: false, explanation: 'Das sind Layout- und Farbraumfragen, keine Datenbankmodellierung.' }
            ]
          }
        ]
      },
      {
        id: 'db-4',
        chapterId: 'database',
        title: 'JSON & Web-APIs: Datenaustausch, Syntax & XML-Vergleich',
        shortDesc: 'Schlüssel-Wert-Paare, {}, [], Datentypen, API-Workflow und die 4 IHK-Gründe für JSON statt XML.',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-db-4-1',
            title: '1. Was ist JSON & das Grundprinzip?',
            coreConcept: 'JavaScript Object Notation – der absolute Standard für den Datenaustausch im Web.',
            bulletPoints: [
              'JSON steht für JavaScript Object Notation. Obwohl der Name von JavaScript abstammt, ist es vollkommen sprachunabhängig – fast jede Programmiersprache kann JSON lesen und schreiben.',
              'Textbasiertes Format: Daten werden strukturiert in Form von Schlüssel-Wert-Paaren (Key-Value-Pairs) gespeichert.',
              'Das Grundprinzip: Ein Schlüssel (immer ein Text in doppelten Anführungszeichen) ist einem konkreten Wert zugeordnet.',
              'Beispiel: "farbe": "Blau" (Der Schlüssel ist „farbe“, der Wert ist „Blau“).'
            ],
            merksatz: 'JSON ist ein sprachunabhängiges, textbasiertes Format aus Schlüssel-Wert-Paaren.',
            example: '"farbe": "Blau" (Schlüssel: "farbe", Wert: "Blau")'
          },
          {
            id: 'n-db-4-2',
            title: '2. Die Syntax: Objekte { } vs. Arrays [ ]',
            coreConcept: 'JSON ist sehr streng, aber simpel: Es gibt zwei Hauptstrukturen.',
            bulletPoints: [
              'Objekte { }: Alles in geschweiften Klammern ist ein Objekt. Es gruppiert zusammengehörige Daten (z. B. eine Projektkonfiguration oder ein einzelnes Profil).',
              'Arrays [ ]: Alles in eckigen Klammern ist eine geordnete Liste (ein Array). Hier können mehrere Werte oder mehrere Objekte hintereinander stehen.',
              'Verschachtelung: Objekte und Arrays lassen sich beliebig kombinieren, z. B. eine Mitarbeiterliste mit Objekten: [ { "name": "Anna", "rolle": "UI Design" }, { "name": "Ben", "rolle": "Frontend Dev" } ].'
            ],
            examFavorite: true,
            example: '{ "projekt": "Portfolio", "version": 1.2, "aktiv": true, "farben": ["#FFF", "#000"], "mitarbeiter": [{ "name": "Anna" }] }'
          },
          {
            id: 'n-db-4-3',
            title: '3. Erlaubte Datentypen in JSON',
            coreConcept: 'In JSON darf nicht einfach alles hineingeschrieben werden – es gibt 6 festgelegte Typen.',
            bulletPoints: [
              'String: Text in doppelten Anführungszeichen (z. B. "Hallo"). Einfache Anführungszeichen (\' \') sind in JSON streng verboten!',
              'Number: Ganzzahlen oder Kommazahlen (z. B. 42 oder 19.99 mit Dezimalpunkt, niemals mit deutschem Komma).',
              'Boolean: Entweder true (wahr) oder false (falsch) – immer kleingeschrieben.',
              'Null: Ein leerer bzw. undefinierter Wert (null).',
              'Object: Ein weiteres verschachteltes JSON-Objekt { } mit geschweiften Klammern.',
              'Array: Eine Liste von Werten [ ] in eckigen Klammern.',
              'Prüfungsfalle: Programmierfunktionen, undefined oder Datums-Objekte sind in JSON nicht nativ erlaubt!'
            ],
            merksatz: 'Die 6 JSON-Datentypen: String, Number, Boolean, Null, Object { } und Array [ ].'
          },
          {
            id: 'n-db-4-4',
            title: '4. Warum nutzt man JSON statt XML? (IHK-Prüfungsdauerbrenner)',
            coreConcept: 'Die 4 entscheidenden Gründe, warum JSON XML im Web verdrängt hat.',
            bulletPoints: [
              '1. Kompaktheit: JSON hat keine schließenden Tags (kein </produkt> wie in XML). Dadurch sind JSON-Dateien spürbar kleiner, was Ladezeiten im Internet drastisch verkürzt.',
              '2. Verarbeitungsgeschwindigkeit: Computer und Browser können JSON viel schneller „parsen“ (verarbeiten und einlesen) als XML.',
              '3. Native Integration: Da JSON die Struktur von JavaScript-Objekten kopiert, können Webbrowser die Daten direkt ohne schwere Parser-Bibliotheken verarbeiten.',
              '4. Lesbarkeit für Menschen: JSON ist oft schneller zu erfassen, da es weniger „visuellen Lärm“ (die vielen spitzen Klammern von XML) gibt.'
            ],
            examFavorite: true,
            merksatz: 'JSON ist kompakter (keine End-Tags), schneller im Parsing, nativ im Webbrowser und lesbarer als XML.'
          },
          {
            id: 'n-db-4-5',
            title: '5. JSON im Kontext des Mediendesigners (APIs)',
            coreConcept: 'Das Bindeglied zwischen Benutzeroberfläche und Server: APIs.',
            bulletPoints: [
              'API (Application Programming Interface): Programmierschnittstelle für den Datenaustausch zwischen Server und Client (Frontend).',
              'Der 3-Schritte-Ablauf: 1. Die vom Mediengestalter konzipierte App fragt einen Server ab (z. B. Wetter-Dienst). 2. Der Server antwortet mit Daten im JSON-Format (weil schnell und klein). 3. Das Frontend nimmt diese JSON-Werte und setzt sie an die passenden Stellen im Design ein.',
              'Beispiel: Server liefert { "temp": 22, "status": "Sonnig" } → Das Design zeigt eine leuchtende Sonne und "22°C" in einem typografisch gestalteten Kreis.'
            ],
            merksatz: 'JSON ist das Transportmittel von Web-APIs: Der Server liefert die Daten, dein Design visualisiert sie.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-db-4-1',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Wofür steht das Akronym JSON und was ist das zentrale Grundprinzip?',
            options: [
              { id: 'a', text: 'JavaScript Object Notation – ein textbasiertes, sprachunabhängiges Format aus Schlüssel-Wert-Paaren', isCorrect: true, explanation: 'Richtig! Ein Schlüssel (Text in Anführungszeichen) ist einem konkreten Wert zugeordnet.' },
              { id: 'b', text: 'Java System Online Network – eine Programmiersprache für 3D-Drucker', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Just Simple Output Nodes – ein Farbmodus für Druckmaschinen', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'JavaScript Only Network – ein Dateiformat, das ausschließlich in JavaScript genutzt werden kann', isCorrect: false, explanation: 'Falsch! JSON ist sprachunabhängig und wird in fast allen Programmiersprachen unterstützt.' }
            ],
            merksatz: 'JSON = JavaScript Object Notation (sprachunabhängiges Schlüssel-Wert-Format).'
          },
          {
            id: 'q-db-4-2',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Wie werden Objekte und Arrays (Listen) in der JSON-Syntax voneinander unterschieden?',
            options: [
              { id: 'a', text: 'Objekte stehen in geschweiften Klammern { }, Arrays (Listen) in eckigen Klammern [ ]', isCorrect: true, explanation: 'Exakt! Objekte { } bündeln Eigenschaften; Arrays [ ] listen Werte oder Objekte auf.' },
              { id: 'b', text: 'Objekte stehen in spitzen Klammern < >, Arrays in runden Klammern ( )', isCorrect: false, explanation: 'Spitze Klammern gehören zu XML/HTML.' },
              { id: 'c', text: 'Objekte beginnen mit einem Doppelpunkt :, Arrays mit einem Semikolon ;', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Es gibt keinen Unterschied, beides nutzt geschweifte Klammern { }', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-db-4-3',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Welcher der folgenden Datensätze ist ein gültiges, syntaktisch fehlerfreies JSON-Objekt?',
            options: [
              { id: 'a', text: '{ "projekt": "Portfolio", "version": 1.2, "aktiv": true, "farben": ["#FFF", "#000"] }', isCorrect: true, explanation: 'Perfekt! Schlüssel in doppelten Anführungszeichen, Number mit Punkt (1.2), Boolean kleingeschrieben (true) und valides Array.' },
              { id: 'b', text: '{ \'projekt\': \'Portfolio\', "version": 1,2 }', isCorrect: false, explanation: 'Einfache Anführungszeichen (\') und deutsches Komma in Zahlen sind in JSON ungültig!' },
              { id: 'c', text: '{ projekt: "Portfolio", "aktiv": True, }', isCorrect: false, explanation: 'Schlüssel müssen in Anführungszeichen stehen, True muss kleingeschrieben sein und Trailing Comma am Ende ist verboten.' },
              { id: 'd', text: '<projekt name="Portfolio" version="1.2" />', isCorrect: false, explanation: 'Das ist XML-Syntax, kein JSON.' }
            ],
            examTip: 'Merke: Schlüssel immer in doppelten Anführungszeichen ("schluessel"), Zahlen mit Punkt (1.2)!'
          },
          {
            id: 'q-db-4-4',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Warum hat JSON das ältere XML-Format im Web und in Web-Apps für APIs weitgehend verdrängt?',
            options: [
              { id: 'a', text: 'JSON ist durch den Verzicht auf schließende Tags kompakter (kleinere Dateigröße), wird schneller geparst und direkt nativ im Webbrowser verarbeitet', isCorrect: true, explanation: 'Richtig! Das sind die 4 IHK-Hauptargumente aus dem PDF (Kompaktheit, Geschwindigkeit, native JS-Integration, Lesbarkeit).' },
              { id: 'b', text: 'Weil XML nur bis maximal 100 Zeichen Text speichern kann', isCorrect: false, explanation: 'XML kann beliebig groß sein.' },
              { id: 'c', text: 'Weil JSON nur auf Apple-Geräten funktioniert', isCorrect: false, explanation: 'JSON ist plattformunabhängig.' },
              { id: 'd', text: 'Weil XML keine Bilder anzeigen darf', isCorrect: false, explanation: 'Falsch.' }
            ],
            merksatz: 'JSON ist kompakter als XML, schneller im Parsing und nativ im Webbrowser integriert.'
          },
          {
            id: 'q-db-4-5',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Wie arbeiten ein Web-Server und das von dir gestaltete Frontend-Design über eine Web-API typischerweise zusammen?',
            options: [
              { id: 'a', text: 'Der Server schickt schlanke Daten im JSON-Format (z. B. {"temp": 22}); das Frontend nimmt die Werte und stellt sie visuell im Design dar (z. B. Sonne & 22°C-Badge)', isCorrect: true, explanation: 'Exakt! Das ist der Standard-Workflow für Mediengestalter: Server liefert JSON-Daten, Interface visualisiert sie.' },
              { id: 'b', text: 'Der Server schickt ein fertiges Bitmap-Foto der gesamten Website und der Browser zeigt es nur an', isCorrect: false, explanation: 'Das wäre extrem ineffizient und nicht barrierefrei.' },
              { id: 'c', text: 'Das Frontend schickt gedruckte PDFs per E-Mail an den Server', isCorrect: false, explanation: 'Unsinn.' },
              { id: 'd', text: 'Es gibt bei Web-Apps keine Trennung von Daten und Design', isCorrect: false, explanation: 'Die Trennung von Daten (JSON) und Präsentation (HTML/CSS/Design) ist das Grundprinzip moderner Softwarearchitektur.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crossmedia',
    number: 8,
    title: 'Medienneutrale Daten & Crossmedia',
    subtitle: 'Single Source Publishing, Trennung von Inhalt & Form',
    description: 'Offizieller fachrichtungsübergreifender IHK-Schwerpunkt Winter 2026/27: Trennung von Inhalt, Struktur und Gestaltung, Single Source Publishing (SSP), semantische Strukturierung, XML/JSON/Markdown, Template-Systeme und Qualitätskontrolle.',
    accentColor: 'teal',
    examMerksatz: 'Medienneutrale Daten trennen Inhalt von der Gestaltung. Ein zentraler Datenbestand (Single Source) steuert über semantische Vorlagen Web, Print, App und Newsletter – Änderungen erfolgen fehlerfrei an nur einer Stelle!',
    examChecklist: [
      'Definition: Medienneutrale Daten (ausgabeunabhängig & strukturiert)',
      'Grundprinzip: Trennung von Inhalt, Struktur, Gestaltung & Ausgabe',
      'Unterschied: Layoutbasierter vs. strukturbasierter Workflow',
      'Semantik: H1 statt „fett 24pt“, Bedeutung vor visuellem Aussehen',
      'Single Source Publishing (SSP): Ein Datenbestand für alle Medienkanäle',
      'Ausgabemedien: Web (sRGB, 72/144 DPI) vs. Print (CMYK, 300 DPI, Beschnitt)',
      'Metadaten vs. Inhalt (Bildrechte, Autor, Erstellungsdatum, Tags)',
      'Warum ist ein fertiges PDF üblicherweise NICHT medienneutral?',
      'Fehlerquellen: Fehlende Pflichtfelder, falsche Preise, inkonsistente Ausgaben',
      'Der 5-Schritte-IHK-Ablauf von der Erfassung bis zur Qualitätskontrolle',
      'XML-Wohlgeformtheit (Well-formed): 1 Root, Schließen aller Tags, kein Überkreuzen, Case-Sensitivity',
      'XML-Zusatztechnologien: DTD/XSD (Gesetzbuch/Validierung), XPath (Adresse/Suche) & XSLT (Transformation)',
      'Die IHK-Prüfungskette: XML (speichert) → DTD/XSD (prüft) → XPath (sucht) → XSLT (macht Design/HTML)',
      'Vergleich: XML vs. JSON (Struktur, Lesbarkeit, Parsing-Speed, Web-APIs)'
    ],
    modules: [
      {
        id: 'med-1',
        chapterId: 'crossmedia',
        title: 'Definition, Trennung von Inhalt & Form sowie Semantik',
        shortDesc: 'Die 4 Säulen (Inhalt, Struktur, Gestaltung, Ausgabe), Semantik statt Layout-Tags und warum PDFs nicht medienneutral sind.',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-med-1-1',
            title: 'Was sind medienneutrale Daten?',
            coreConcept: 'Inhalte, die nicht von vornherein an ein bestimmtes Ausgabemedium oder Design gebunden sind.',
            bulletPoints: [
              'IHK-Prüfungsfokus: Im Prüfungsbereich „Medien produzieren“ für die Abschlussprüfung Mediengestalter Digital und Print Winter 2026/27 ausdrücklich als fachrichtungsübergreifender Schwerpunkt benannt!',
              'Kernidee: Derselbe Inhalt kann dadurch flexibel für verschiedene Medien aufbereitet werden – etwa für eine Website, einen gedruckten Katalog, einen Newsletter oder eine native Mobile-App.',
              'Der Inhalt wird nicht fest in ein bestimmtes Layout „eingebacken“, sondern strukturiert erfasst und erst später passend zum Zielmedium gestaltet.'
            ],
            merksatz: 'Medienneutrale Daten sind von vornherein unabhängig von konkreten Ausgabemedien und Layouts strukturiert.'
          },
          {
            id: 'n-med-1-2',
            title: 'Die 4 Säulen: Inhalt, Struktur, Gestaltung & Ausgabe',
            coreConcept: 'Separation of Concerns: Die strikte Trennung im Produktionsworkflow.',
            bulletPoints: [
              '1. Inhalt (Content): Der reine Text, die Rohdaten, Produktnamen, Preise, Beschreibungen, Bilder oder Videos („Was wird gesagt?“).',
              '2. Struktur (Structure): Die logische Hierarchie und Beziehungen, etwa „Überschrift 1“, „Produktname“, „Preis“, „Liste“ („Wie ist es gegliedert?“).',
              '3. Gestaltung (Presentation / Style): Das visuelle Design, Schriftarten, Farben, Abstände und Platzierungen („Wie sieht es aus?“).',
              '4. Ausgabe: Die konkrete technische Aufbereitung für Druck (Druck-PDF, InDesign), Web (HTML/CSS) oder andere Kanäle.'
            ],
            examFavorite: true,
            example: 'Inhalt: "Schuh 89 €" | Struktur: <produkt><name>Schuh</name><preis>89</preis></produkt> | Gestaltung: CSS/Formatvorlage | Ausgabe: Druckkatalog oder Webshop'
          },
          {
            id: 'n-med-1-3',
            title: 'Strukturierung & Semantik: Bedeutung vor Optik',
            coreConcept: 'Warum semantische Markups für medienneutrale Daten unverzichtbar sind.',
            bulletPoints: [
              'Kein visuelles Layout im Datenbestand: Ein Text darf in den Quelldaten niemals als „fett und 24pt“ definiert werden, sondern immer als logische Rolle, z. B. „H1 (Hauptüberschrift)“ oder „Produktpreis“.',
              'Warum? Nur durch die Semantik (die Bedeutung) weiß das Ausgabesystem, welche Rolle ein Element einnimmt.',
              'Praxisbeispiel: Ist ein Element als „Preis“ markiert, kann das Web-Designsystem entscheiden, dass er rot und fett über dem Kauf-Button steht – während das Print-Layout ihn in eine übersichtliche Tabellenspalte setzt.'
            ],
            merksatz: 'Semantik beschreibt die inhaltliche Bedeutung (H1, Preis), nicht das Aussehen („fett, 24pt“).'
          },
          {
            id: 'n-med-1-4',
            title: 'Layoutbasierter vs. strukturbasierter Workflow',
            coreConcept: 'Ein zentraler Vergleich für Prüfungsfragen.',
            bulletPoints: [
              'Layoutbasierter Workflow: Der Inhalt wird direkt in die Gestaltung integriert (z. B. Text direkt in InDesign oder Photoshop gesetzt). Eine Änderung des Ausgabemediums erfordert oft eine zeitraubende komplette Neugestaltung.',
              'Strukturbasierter Workflow: Daten werden zuerst medienneutral erfasst (z. B. in einer Datenbank, XML- oder JSON-Datei). Das Layout wird erst im letzten Schritt über Stylesheets oder Templates auf diese Daten angewendet.',
              'Vorteil: Extrem hohe Effizienz, da Daten nur einmal gepflegt werden müssen.'
            ],
            examFavorite: true,
            merksatz: 'Layoutbasiert = Inhalt fest im Layout verklebt | Strukturbasiert = Daten neutral erfasst, Layout erst per Template angewendet.'
          },
          {
            id: 'n-med-1-5',
            title: 'Warum ist ein fertiges PDF NICHT medienneutral?',
            coreConcept: 'Ein beliebter Prüfungs-Stolperstein.',
            bulletPoints: [
              'Auch wenn ein PDF Text und Bilder enthält, ist es fast nie medienneutral.',
              'Grund: Ein fertiges PDF ist bereits fest auf ein ganz konkretes Ausgabemedium, ein starres Seitenformat (z. B. DIN A4), feste Schriftgrößen und ein fixes Layout ausgerichtet.',
              'Konsequenz: Als Ausgangspunkt für andere Medien eignet sich ein gestaltetes PDF nicht – man benötigt stattdessen den ursprünglichen strukturierten Datenbestand (z. B. XML, JSON oder Datenbank).'
            ],
            merksatz: 'Ein fertiges PDF ist bereits ein final gestaltetes Endprodukt und eignet sich nicht als medienneutrale Quelle!'
          }
        ],
        quizQuestions: [
          {
            id: 'q-med-1-1',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Was versteht man in der Medienproduktion unter „medienneutralen Daten“?',
            options: [
              { id: 'a', text: 'Inhalte, die so strukturiert gespeichert sind, dass sie unabhängig von einem bestimmten Ausgabemedium oder Design für Web, Print, App und Newsletter genutzt werden können', isCorrect: true, explanation: 'Exakt! Das ist die offizielle IHK-Definition aus dem Prüfungsleitfaden.' },
              { id: 'b', text: 'Dateien, die ausschließlich in Schwarz-Weiß gespeichert werden', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'PDF-Dokumente, die ohne Bilder exportiert wurden', isCorrect: false, explanation: 'PDFs sind Endformate, keine medienneutralen Quellen.' },
              { id: 'd', text: 'Grafiken, die ausschließlich auf CDs gebrannt werden dürfen', isCorrect: false, explanation: 'Unsinn.' }
            ],
            merksatz: 'Medienneutrale Daten trennen Inhalt und Layout für beliebige Ausgabekanäle.'
          },
          {
            id: 'q-med-1-2',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Welche 4 Bereiche werden bei einer medienneutralen Produktion sauber voneinander getrennt?',
            options: [
              { id: 'a', text: 'Inhalt (Content), Struktur (Hierarchie), Gestaltung (Style) und Ausgabe (Medium)', isCorrect: true, explanation: 'Richtig! Das Prinzip der Separation of Concerns im Medienworkflow.' },
              { id: 'b', text: 'Farbe, Papiergewicht, Druckfarbe und Drucklack', isCorrect: false, explanation: 'Das sind reine Print-Produktionsparameter.' },
              { id: 'c', text: 'Monitor, Tastatur, Maus und Grafikkarte', isCorrect: false, explanation: 'Das ist Hardware.' },
              { id: 'd', text: 'Kunde, Agentur, Druckerei und Postbote', isCorrect: false, explanation: 'Das sind beteiligte Personen.' }
            ]
          },
          {
            id: 'q-med-1-3',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Warum sollte ein Text in medienneutralen Quelldaten semantisch als „H1“ und nicht als „fett und 24pt“ deklariert werden?',
            options: [
              { id: 'a', text: 'Weil nur durch die Semantik das System die Bedeutung kennt und die Information im Web als <h1> und im Magazin als druckgerechte Headline formatieren kann', isCorrect: true, explanation: 'Genau! Semantik transportiert Bedeutung, die Templates für jedes Medium passend interpretieren.' },
              { id: 'b', text: 'Weil „fett“ in modernen Druckereien verboten ist', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Weil Schriftgrößen in pt nur für Schallplatten gelten', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Weil XML keine Zahlen speichern kann', isCorrect: false, explanation: 'XML kann Zahlen speichern.' }
            ],
            merksatz: 'Semantische Rollen (H1, Preis) ermöglichen die flexible Formatierung je nach Zielmedium.'
          },
          {
            id: 'q-med-1-4',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Worin liegt der fundamentale Nachteil eines rein layoutbasierten Workflows gegenüber einem strukturbasierten?',
            options: [
              { id: 'a', text: 'Der Inhalt wird direkt in das Layout eingebacken; soll derselbe Inhalt für einen anderen Kanal genutzt werden, muss alles manuell neu gestaltet werden', isCorrect: true, explanation: 'Richtig! Layoutbasiert (z. B. Text direkt in InDesign) verhindert die automatisierte Mehrfachnutzung.' },
              { id: 'b', text: 'Layoutbasierte Dokumente können nicht gedruckt werden', isCorrect: false, explanation: 'Layoutbasierte Workflows waren der historische Standard im Print.' },
              { id: 'c', text: 'Strukturbasierte Daten dürfen keine Bilder enthalten', isCorrect: false, explanation: 'Strukturierte Daten referenzieren Bildmetadaten exzellent.' },
              { id: 'd', text: 'Es gibt keinen Unterschied zwischen beiden Methoden', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-med-1-5',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Warum eignet sich ein fertig gestaltetes Druck-PDF üblicherweise NICHT als medienneutraler Ausgangsdatenbestand?',
            options: [
              { id: 'a', text: 'Weil ein PDF bereits fest auf ein ganz bestimmtes Ausgabemedium, starre Seitenmaße und ein fixes Layout festgelegt ist', isCorrect: true, explanation: 'Exakt! Das PDF ist das Endprodukt einer bestimmten Ausgabe, nicht die neutrale Quelle.' },
              { id: 'b', text: 'Weil PDFs keinen Text enthalten dürfen', isCorrect: false, explanation: 'PDFs enthalten Text, aber layoutgebunden.' },
              { id: 'c', text: 'Weil Adobe das Urheberrecht auf alle PDF-Dateien besitzt', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Weil PDFs nur im Dunkeln gelesen werden können', isCorrect: false, explanation: 'Falsch.' }
            ]
          }
        ]
      },
      {
        id: 'med-2',
        chapterId: 'crossmedia',
        title: 'Single Source Publishing (SSP) & Crossmedia-Workflow',
        shortDesc: 'Single Source of Truth, Produktdaten für Webshop/Katalog/Newsletter, adaptive Bildstrategien und Formate (XML, JSON, Markdown).',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-med-2-1',
            title: 'Was ist Single Source Publishing (SSP)?',
            coreConcept: 'Ein einziger zentraler Datenbestand als verlässliche „Single Source of Truth“.',
            bulletPoints: [
              'Konzept: Alle Inhalte werden an einem zentralen Ort (z. B. in einer Datenbank oder einem PIM/CMS) gepflegt.',
              'Automatische Mehrfachausgabe: Aus dieser einzigen Quelle werden automatisiert verschiedene Versionen für Webshop, Druckkatalog, Social-Media und App generiert.',
              'Der entscheidende Vorteil: Redundanzen werden eliminiert und Fehler drastisch reduziert. Ändert sich ein Preis oder ein Produktname, muss die Änderung nur an einer einzigen Stelle vorgenommen werden!'
            ],
            examFavorite: true,
            merksatz: 'Single Source Publishing: Einmal zentral pflegen – automatisiert und konsistent in alle Kanäle ausspielen.'
          },
          {
            id: 'n-med-2-2',
            title: 'Der Praxis-Produktdatensatz: Ein Inhalt, drei Kanäle',
            coreConcept: 'Wie derselbe Datensatz im Web, Print und Newsletter arbeitet.',
            bulletPoints: [
              'Zentraler Datensatz: Enthält Produktnummer, Name, Beschreibung, Preis, Bilddatei und Bildunterschrift.',
              'Ausgabe 1 (Webshop): Reaktive Produktseite mit Warenkorb-Button, interaktiver Bild-Zoom, sRGB-Farbraum.',
              'Ausgabe 2 (Druckkatalog): Tabellarischer Eintrag mit feiner Typografie, hochauflösendem CMYK-Bild (300 DPI) und Bestellnummer.',
              'Ausgabe 3 (Newsletter): Kompakter Teaser-Baustein mit kurzer Textfassung und CTA-Button („Jetzt entdecken“).'
            ],
            example: 'Ein Datensatz liefert: 1. Webshop-Detailseite, 2. Katalogzeile, 3. E-Mail-Teaser.'
          },
          {
            id: 'n-med-2-3',
            title: 'Adaptive & zielkanalgerechte Anforderungen',
            coreConcept: 'Medienneutral bedeutet nicht, dass alles identisch aussieht!',
            bulletPoints: [
              'Texte: Ein langer Fließtext aus dem Katalog passt nicht in einen kurzen Social-Media-Post oder Smartphone-Teaser. Der Datenbestand sollte daher Kurz- und Langfassungen bereitstellen.',
              'Bilder (Farbmodelle & Auflösung): Das Web benötigt sRGB und 72–144 DPI (schnelle Ladezeit). Der Offset-Druck benötigt CMYK (z. B. ISO Coated v2) mit 300 DPI und Beschnittzugabe.',
              'Bildzuschnitte: Web nutzt oft 16:9-Banner; im Print sind Hochformate oder freigestellte Produktabbildungen gefragt.'
            ],
            examFavorite: true,
            merksatz: 'Medienneutrale Bilder müssen im Original hochauflösend vorliegen, damit für Print (CMYK, 300 DPI) und Web (RGB, komprimiert) passende Ableitungen erstellt werden können.'
          },
          {
            id: 'n-med-2-4',
            title: 'Gängige Transportformate: XML, JSON & Markdown',
            coreConcept: 'Formate, die Inhalt und Struktur transportieren, ohne ein festes Design vorzugeben.',
            bulletPoints: [
              'XML (Extensible Markup Language): Der Industriestandard für den strukturierten Verlags- und Druckdatenaustausch. Arbeitet mit benutzerdefinierten Tags wie <produktname>Kaffeemaschine</produktname>.',
              'JSON (JavaScript Object Notation): Schlank, extrem weit verbreitet in der Webentwicklung und bei Web-APIs für Single-Page-Apps.',
              'Markdown: Einfache Auszeichnungssprache (# Überschrift, **fett**), die sich leicht in HTML oder Print-Formate konvertieren lässt.',
              'Wichtig: Eine XML- oder JSON-Datei ist nicht automatisch medienneutral – entscheidend ist, dass sie strukturiert und layoutunabhängig aufgebaut ist!'
            ],
            merksatz: 'XML, JSON und Markdown sind Trägerformate für strukturierte, medienneutrale Inhalte.'
          },
          {
            id: 'n-med-2-5',
            title: 'Der offizielle 5-Schritte-Workflow der IHK',
            coreConcept: 'Die perfekte Schrittfolge für die Prüfungsantwort.',
            bulletPoints: [
              '1. Daten strukturiert erfassen (in klar bezeichneten Feldern).',
              '2. Inhalt und Gestaltung trennen (Semantik statt Layout).',
              '3. Passende Vorlage / Template je Zielmedium auswählen.',
              '4. Mediengerecht ausgeben (Auflösung, Farbraum, Textlänge anpassen).',
              '5. Ergebnis und Qualität kontrollieren (Pflichtfelder, Preise, Rechte prüfen).'
            ],
            merksatz: 'IHK-Ablauf: Erfassen → Trennen → Vorlage wählen → Mediengerecht ausgeben → Qualität kontrollieren!'
          }
        ],
        quizQuestions: [
          {
            id: 'q-med-2-1',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Was ist der primäre Vorteil des Single Source Publishing (SSP) für Unternehmen?',
            options: [
              { id: 'a', text: 'Inhalte müssen nur einmal zentral gepflegt werden, wodurch Aktualisierungen für alle Kanäle (Print, Web, App) konsistent, zeitsparend und fehlerfrei erfolgen', isCorrect: true, explanation: 'Exakt! Das ist der Hauptnutzen von Single Source Publishing.' },
              { id: 'b', text: 'Man benötigt überhaupt keine Grafiker und Designer mehr', isCorrect: false, explanation: 'Templates und Ausgabedesign müssen von Mediengestaltern gestaltet werden.' },
              { id: 'c', text: 'Die Website darf nur noch auf einem einzigen Server gehostet werden', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Druckmaschinen drucken automatisch ohne Papier', isCorrect: false, explanation: 'Unsinn.' }
            ],
            merksatz: 'Single Source: Zentrale Datenpflege verhindert Datenchaos und spart immense Korrekturzeit.'
          },
          {
            id: 'q-med-2-2',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Warum müssen Bilder bei der Ausgabe für Print und Web unterschiedlich aufbereitet werden?',
            options: [
              { id: 'a', text: 'Weil Print 300 DPI, CMYK-Farbraum und Beschnitt erfordert, während das Web sRGB-Farben, 72–144 DPI und komprimierte Dateigrößen für kurze Ladezeiten verlangt', isCorrect: true, explanation: 'Richtig! Ein medienneutrales Bild muss im hochauflösenden Original vorliegen, um beide Kanäle bedienen zu können.' },
              { id: 'b', text: 'Weil Web-Browser nur Schwarz-Weiß-Bilder unterstützen', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Weil Druckmaschinen keine Fotos drucken können', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Weil DPI nur bei Tonaufnahmen eine Rolle spielt', isCorrect: false, explanation: 'DPI ist die Druckpunktdichte.' }
            ]
          },
          {
            id: 'q-med-2-3',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Wie funktioniert XML als Format für medienneutrale Daten?',
            options: [
              { id: 'a', text: 'XML nutzt benutzerdefinierte Tags (z. B. <produktname>...</produktname>), um Daten hierarchisch und rein strukturell ohne feste Layoutvorgaben zu beschreiben', isCorrect: true, explanation: 'Richtig! XML trennt Struktur von Layout und ist daher ein klassischer medienneutraler Standard.' },
              { id: 'b', text: 'XML formatiert Texte immer automatisch in Times New Roman 12pt', isCorrect: false, explanation: 'XML enthält keine Schriftarten.' },
              { id: 'c', text: 'XML ist ausschließlich für Videos gedacht', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'XML kann nur von einem einzigen Softwarehersteller geöffnet werden', isCorrect: false, explanation: 'XML ist ein offener Standard.' }
            ]
          },
          {
            id: 'q-med-2-4',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Welche Reihenfolge beschreibt den offiziellen IHK-Produktionsablauf medienneutraler Daten korrekt?',
            options: [
              { id: 'a', text: 'Daten strukturiert erfassen → Inhalt & Gestaltung trennen → Vorlage/Template wählen → Mediengerecht ausgeben → Qualität kontrollieren', isCorrect: true, explanation: 'Exakt die 5-Schritte-Kette aus den IHK-Prüfungshinweisen!' },
              { id: 'b', text: 'Drucken → Layouten → Daten löschen → Rechnen', isCorrect: false, explanation: 'Unsinn.' },
              { id: 'c', text: 'Design zeichnen → Text vergessen → PDF drucken', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Qualitätskontrolle → Daten erfassen → Template löschen', isCorrect: false, explanation: 'Reihenfolge falsch.' }
            ],
            merksatz: 'Erfassen → Trennen → Vorlage wählen → Ausgeben → Kontrollieren.'
          },
          {
            id: 'q-med-2-5',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Ist eine XML- oder JSON-Datei automatisch medienneutral?',
            options: [
              { id: 'a', text: 'Nein, entscheidend ist, ob die Daten sinnvoll strukturiert und vollkommen unabhängig von einem bestimmten Layout oder Zielmedium angelegt sind', isCorrect: true, explanation: 'Genau! Stehen in der XML z. B. feste Spaltenbreiten oder feste Umbrüche, ist sie nicht mehr medienneutral.' },
              { id: 'b', text: 'Ja, jede Datei mit der Endung .xml ist immer zu 100% medienneutral', isCorrect: false, explanation: 'Die Dateiendung allein garantiert keine Medienneutralität.' },
              { id: 'c', text: 'Ja, weil JSON vom W3C gesetzlich als medienneutral geschützt ist', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Nein, weil nur Microsoft Word echte medienneutrale Daten erzeugen kann', isCorrect: false, explanation: 'Word ist typischerweise layoutbasiert.' }
            ]
          }
        ]
      },
      {
        id: 'med-3',
        chapterId: 'crossmedia',
        title: 'Templates, Metadaten, Qualitätskontrolle & Fehlervermeidung',
        shortDesc: 'Die Rolle von Templates, Unterschied von Inhalt vs. Metadaten (Rechte, Autor) und Schutz vor Multi-Channel-Fehlerausbreitung.',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-med-3-1',
            title: 'Was macht ein Template (Vorlage) im Workflow?',
            coreConcept: 'Die Brücke von den Rohdaten zum fertigen Design des Zielmediums.',
            bulletPoints: [
              'Definition: Ein Template ist eine Gestaltungsvorlage, die neutrale Daten nach festgelegten Regeln für ein bestimmtes Ausgabemedium anordnet.',
              'Beispiel Webshop: Das Web-Template platziert das Feld `produktname` als `<h1>`, den `preis` in einen farbigen Badge und erzeugt einen interaktiven Kauf-Button.',
              'Beispiel InDesign-Printkatalog: Das Druck-Template liest dieselben Daten ein, weist Absatzformate zu, platziert den Text im 3-spaltigen Raster und bindet das hochauflösende CMYK-Bild ein.'
            ],
            merksatz: 'Das Template übersetzt medienneutrale Daten in ein zielkanalgerechtes Layout.'
          },
          {
            id: 'n-med-3-2',
            title: 'Unterschied: Inhalt (Content) vs. Metadaten',
            coreConcept: 'Was veröffentlicht wird vs. was Inhalte beschreibt und verwaltet.',
            bulletPoints: [
              'Inhalt (Content): Das, was der Endnutzer liest und sieht (z. B. Produktname, Beschreibungstext, Preis, das eigentliche Produktfoto).',
              'Metadaten („Daten über Daten“): Angaben, die den Inhalt beschreiben, verwalten und rechtlich absichern. Beispiele: Bildrechte/Urheber, Lizenzstatus, Erstellungsdatum, Fotograf, Schlagwörter (Tags) oder Freigabestatus.',
              'IHK-Prüfungsfalle: Fehlende Metadaten (z. B. fehlende Bildlizenz) können bei Veröffentlichung zu teuren Urheberrechts-Abmahnungen führen!'
            ],
            examFavorite: true,
            example: 'Inhalt: Foto der Tastatur | Metadaten: "Urheber: Studio Lichtbild, Lizenz: Print & Web, Erstellt: 2026-10-29"'
          },
          {
            id: 'n-med-3-3',
            title: 'Vorteile vs. Herausforderungen im Überblick',
            coreConcept: 'Die IHK verlangt das Abwägen beider Seiten.',
            bulletPoints: [
              '5 Hauptvorteile: 1. Mehrfachnutzung (Wiederverwendbarkeit), 2. Zentrale Pflege von Änderungen (Single Source), 3. Konsistenz über alle Kanäle, 4. Automatisierung wiederkehrender Produktionsschritte, 5. Unabhängiges Arbeiten von Redaktion und Design.',
              '4 Herausforderungen: 1. Hoher anfänglicher Strukturierungs- und Pflegeaufwand, 2. Textlängen müssen für Zielmedien passen, 3. Bilder benötigen kanalspezifische Ableitungen (CMYK/RGB, Auflösung), 4. Fehler im Datenbestand verbreiten sich sofort in allen Ausgaben!'
            ],
            merksatz: 'Vorteil: Zentrale Effizienz. Herausforderung: Hoher Pflegeaufwand und Gefahr der Fehlerausbreitung.'
          },
          {
            id: 'n-med-3-4',
            title: 'Warum braucht man eine strikte Qualitätskontrolle?',
            coreConcept: 'Die Kehrseite der Single Source: Fehler multiplizieren sich rasant.',
            bulletPoints: [
              'Das Risiko: Bei Single Source Publishing verbreitet sich ein einziger falscher Preis oder ein Tippfehler blitzschnell und vollautomatisch in den Webshop, den gedruckten Katalog und den Newsletter!',
              'Gefahr fehlender Pflichtfelder: Fehlt eine Artikelnummer oder eine Bildunterschrift, können Templates fehlerhafte Layouts oder weiße Lücken erzeugen.',
              'Lösung: Automatisierte Validierungsprüfungen und menschliche Freigabeschritte vor dem Rendern der Endausgaben.'
            ],
            merksatz: 'Weil fehlerhafte Daten bei Single Source in ALLE Ausgaben übernommen werden, ist Qualitätskontrolle unverzichtbar!'
          },
          {
            id: 'n-med-3-5',
            title: 'Prüfungs-Checkliste: Typische Fehlerquellen',
            coreConcept: 'Die 5 häufigsten Fehlerquellen in der Medienproduktion.',
            bulletPoints: [
              '1. Fehlende Pflichtfelder (z. B. fehlender Preis erzeugt Systemfehler im Webshop).',
              '2. Falsche oder veraltete Preise (wirtschaftlicher Schaden durch Bindungswirkung).',
              '3. Ungeklärte Bildrechte oder fehlende Urhebernennung (Abmahngefahr).',
              '4. Falsche Farbräume (RGB versehentlich im Vierfarb-Offsetdruck verwendet).',
              '5. Unzureichende Bildauflösung (72 DPI Web-Bild pixelig im Druckkatalog abgedruckt).'
            ],
            merksatz: 'Qualitätskontrolle prüft: Pflichtfelder, Preise, Schreibweisen, Bildrechte, Farbräume und Bildqualität.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-med-3-1',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Welche Aufgabe übernimmt ein Template (Vorlage) im medienneutralen Publishing-Workflow?',
            options: [
              { id: 'a', text: 'Es ordnet die neutralen Daten nach festgelegten Design-Regeln an und bereitet sie spezifisch für ein Zielmedium (z. B. Webshop oder Printkatalog) auf', isCorrect: true, explanation: 'Richtig! Das Template übersetzt Rohdaten in das mediengerechte Layout.' },
              { id: 'b', text: 'Es löscht alle Texte, die länger als 10 Wörter sind', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Es wandelt XML in reines Papier um', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Es ersetzt den Computer durch eine Schreibmaschine', isCorrect: false, explanation: 'Unsinn.' }
            ]
          },
          {
            id: 'q-med-3-2',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Was unterscheidet Inhalt (Content) von Metadaten?',
            options: [
              { id: 'a', text: 'Inhalt ist das, was der Nutzer sieht (z. B. Produkttext, Bild); Metadaten beschreiben und verwalten den Inhalt (z. B. Bildrechte, Autor, Erstelldatum)', isCorrect: true, explanation: 'Exakt! Das ist die Differenzierung aus Frage 7 der IHK-Musterantworten.' },
              { id: 'b', text: 'Inhalt ist immer digital, Metadaten sind immer auf Papier gedruckt', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Inhalt darf nur von Anwälten geschrieben werden', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Es gibt keinen Unterschied, beides meint dasselbe', isCorrect: false, explanation: 'Falsch.' }
            ],
            merksatz: 'Inhalt = was veröffentlicht wird. Metadaten = Angaben zur Verwaltung & Rechtssicherheit (Bildrechte, Autor).'
          },
          {
            id: 'q-med-3-3',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Warum ist eine Qualitätskontrolle bei Single Source Publishing besonders kritisch?',
            options: [
              { id: 'a', text: 'Weil fehlerhafte, unvollständige oder veraltete Daten sich automatisch und unbemerkt in ALLE Medienausgaben (Web, Print, Newsletter) verbreiten', isCorrect: true, explanation: 'Richtig! Ein falscher Preis im zentralen Datenbestand infiziert sofort alle Ausgabekanäle.' },
              { id: 'b', text: 'Weil der Stromverbrauch bei Fehlern im Datenbestand um 500% ansteigt', isCorrect: false, explanation: 'Unsinn.' },
              { id: 'c', text: 'Weil das Internet sonst gelöscht werden muss', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Weil Qualitätskontrollen gesetzlich nur für Spielzeug vorgeschrieben sind', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-med-3-4',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Welche 2 Vorteile und welche 2 Herausforderungen kennzeichnen medienneutrale Workflows?',
            options: [
              { id: 'a', text: 'Vorteile: Zentrale Datenpflege & Mehrfachnutzung; Herausforderungen: Hoher Strukturierungsaufwand & Anpassung an unterschiedliche Zielmedienanforderungen', isCorrect: true, explanation: 'Genau! IHK-Prüfungsfrage 8 aus den Musterantworten.' },
              { id: 'b', text: 'Vorteile: Kostenlos & fehlerfrei; Herausforderungen: Funktioniert nur bei Vollmond', isCorrect: false, explanation: 'Unsinn.' },
              { id: 'c', text: 'Vorteile: Keine Schriftarten nötig; Herausforderungen: Es können nur Zahlen verarbeitet werden', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Vorteile: Höhere Druckauflage; Herausforderungen: Web-Verbot', isCorrect: false, explanation: 'Falsch.' }
            ]
          },
          {
            id: 'q-med-3-5',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Welche der folgenden Angaben gehört zu den Metadaten einer Bilddatei und schützt vor rechtlichen Konsequenzen?',
            options: [
              { id: 'a', text: 'Urheber, Bildrechte & Lizenzstatus', isCorrect: true, explanation: 'Richtig! Fehlen diese Metadaten, drohen im Web und Print kostspielige Urheberrechtsabmahnungen.' },
              { id: 'b', text: 'Die Schuhgröße des Models', isCorrect: false, explanation: 'Irrelevant.' },
              { id: 'c', text: 'Die Hintergrundfarbe des Desktops', isCorrect: false, explanation: 'Irrelevant.' },
              { id: 'd', text: 'Die Seriennummer des Druckerkabels', isCorrect: false, explanation: 'Irrelevant.' }
            ]
          }
        ]
      },
      {
        id: 'med-4',
        chapterId: 'crossmedia',
        title: 'XML-Standard: Wohlgeformtheit, Ökosystem & Prüfungskette',
        shortDesc: 'Die 4 Regeln der Well-formedness, DTD/XSD-Validierung, XPath-Adressierung, XSLT-Transformation und XML vs. JSON.',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-med-4-1',
            title: '1. Was ist XML eigentlich? (Bedeutung vs. Aussehen)',
            coreConcept: 'Extensible Markup Language – die Brücke zwischen Design und Technik.',
            bulletPoints: [
              'Bedeutung statt Aussehen: Während HTML definiert, wie etwas aussieht (Präsentation), definiert XML, was die Daten bedeuten (Struktur und Inhalt).',
              'Keine vordefinierten Tags: Im Gegensatz zu HTML (wo <h1> immer eine Überschrift ist), gibt es in XML keine festen Tags – du erfindest eigene semantische Tags, die exakt zu deinem Inhalt passen (z. B. <produkt>, <name>, <preis waehrung="EUR">).',
              'Verständlichkeit: Jeder, der diese Datei liest (Mensch oder Maschine), versteht sofort die Datenbedeutung.'
            ],
            examFavorite: true,
            merksatz: 'HTML bestimmt die Präsentation („wie es aussieht“), XML bestimmt die Datenstruktur („was es bedeutet“).'
          },
          {
            id: 'n-med-4-2',
            title: '2. Die 4 Regeln der Wohlgeformtheit (Well-formedness)',
            coreConcept: 'Damit ein XML-Dokument gültig ist, MUSS es wohlgeformt sein – sonst stürzt der Parser ab!',
            bulletPoints: [
              '1. Genau ein Root-Element: Alles muss in einem einzigen übergeordneten Wurzelelement eingeschlossen sein.',
              '2. Tags müssen geschlossen werden: Jedes <tag> braucht zwingend ein passendes </tag> (oder Self-Closing <tag/>).',
              '3. Korrekte Verschachtelung: Tags dürfen sich niemals überkreuzen! Richtig: <a><b></b></a> | Falsch: <a><b></a></b>.',
              '4. Case-Sensitivity: XML unterscheidet strikt Groß- und Kleinschreibung – <Name> und <name> sind zwei völlig verschiedene Tags.'
            ],
            examFavorite: true,
            merksatz: 'Wohlgeformt (Well-formed): 1 Root-Element, alle Tags schließen, saubere Verschachtelung ohne Überkreuzung, strikte Case-Sensitivity.'
          },
          {
            id: 'n-med-4-3',
            title: '3. Das Zusatz-Ökosystem: DTD/XSD, XPath & XSLT',
            coreConcept: 'XML allein ist nur Text – erst die Zusatztechnologien machen es zur Publishing-Macht.',
            bulletPoints: [
              'DTD (Document Type Definition) & XML-Schema (XSD): Das „Gesetzbuch“. Da Tags frei erfunden werden dürfen, legt das Schema fest, welche Tags erlaubt sind, ihre Reihenfolge und ob sie Pflicht (z. B. <name>) oder optional (<farbe>) sind.',
              'XPath: Die gezielte „Adresse“ im XML-Baum, um Knoten aufzuspüren (z. B. /shop/produkt/preis führt direkt zum Preiswert).',
              'XSLT (Extensible Stylesheet Language Transformations): Die Design-Brücke für Mediengestalter! Wandelt XML-Rohdaten über eine XSLT-Vorlage in Zielformate wie HTML oder Druck-FO um.'
            ],
            merksatz: 'DTD/XSD validiert die Struktur, XPath findet die Daten im Dokumentenbaum, XSLT transformiert Daten ins finale Ausgabedesign.'
          },
          {
            id: 'n-med-4-4',
            title: '4. Die IHK-Prüfungskette für XML',
            coreConcept: 'Die 4-Schritte-Kette, die in Prüfungen als Standard abgefragt wird.',
            bulletPoints: [
              'Schritt 1: XML speichert die Daten strukturiert und medienneutral.',
              'Schritt 2: DTD / XSD prüft, ob die Struktur stimmt und alle Pflichtfelder vorhanden sind (Validierung).',
              'Schritt 3: XPath sucht und adressiert die gewünschten Daten im XML-Baum.',
              'Schritt 4: XSLT macht daraus ein fertiges Design bzw. HTML-Ergebnis für den Benutzer.'
            ],
            examFavorite: true,
            merksatz: 'Prüfungskette: XML (speichert) → DTD/XSD (prüft) → XPath (sucht) → XSLT (macht Design/HTML).'
          },
          {
            id: 'n-med-4-5',
            title: '5. Prüfungsvergleich: XML vs. JSON',
            coreConcept: 'Warum JSON heute in Web-APIs dominiert, während XML im Publishing glänzt.',
            bulletPoints: [
              'Struktur: XML = hierarchischer Baum mit Tags (<tag>) | JSON = Schlüssel-Wert-Paare ("key": "value").',
              'Lesbarkeit: XML wirkt durch schließende End-Tags oft überladen | JSON ist extrem schlank und kompakt.',
              'Parsing-Geschwindigkeit: XML ist langsamer zu parsen | JSON wird extrem schnell und direkt nativ von JavaScript im Webbrowser verarbeitet.',
              'Einsatzgebiete: XML bei komplexen Verlagsdokumenten, InDesign-Workflows & XSLT-Transformationen | JSON bei modernen Web-APIs, SPAs und mobilem Datenaustausch.'
            ],
            merksatz: 'XML für komplexe Dokumente & XSLT-Transformationen – JSON für schlanke, ultraschnelle Web-APIs.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-med-4-1',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Was ist der fundamentale Unterschied zwischen HTML und XML bezüglich der verwendeten Tags?',
            options: [
              { id: 'a', text: 'HTML hat vordefinierte Tags für das Aussehen (z. B. <h1>), während XML keine vordefinierten Tags hat und man eigene Tags für die inhaltliche Bedeutung frei erfindet', isCorrect: true, explanation: 'Richtig! HTML bestimmt die Präsentation, XML beschreibt die inhaltliche Semantik mit frei definierten Tags (z. B. <produkt>).' },
              { id: 'b', text: 'HTML funktioniert nur offline, XML nur im Internet', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'XML erlaubt grundsätzlich keine Buchstaben in Tags', isCorrect: false, explanation: 'Falsch.' },
              { id: 'd', text: 'Es gibt keinen Unterschied, beide Sprachen nutzen exakt dieselben Tags', isCorrect: false, explanation: 'Falsch.' }
            ],
            merksatz: 'HTML = feste Tags für die Präsentation | XML = frei erfundene Tags für die Bedeutung.'
          },
          {
            id: 'q-med-4-2',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welche der folgenden Bedingungen MUSS zwingend erfüllt sein, damit ein XML-Dokument als „wohlgeformt“ (well-formed) gilt?',
            options: [
              { id: 'a', text: 'Genau ein Wurzelelement (Root), alle Tags geschlossen, saubere Verschachtelung ohne Überkreuzung und Beachtung von Case-Sensitivity', isCorrect: true, explanation: 'Exakt! Das sind die 4 Grundregeln der Wohlgeformtheit aus dem PDF.' },
              { id: 'b', text: 'Die Datei muss mindestens 5 Bilder enthalten', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Tags dürfen niemals mit Großbuchstaben beginnen', isCorrect: false, explanation: 'Großbuchstaben sind erlaubt, müssen aber einheitlich geschlossen werden (Case-Sensitivity).' },
              { id: 'd', text: 'Die Datei muss auf Deutsch verfasst sein', isCorrect: false, explanation: 'Unsinn.' }
            ]
          },
          {
            id: 'q-med-4-3',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welches XML-Codesegment enthält einen groben Syntaxfehler und ist NICHT wohlgeformt?',
            options: [
              { id: 'a', text: '<a><b>Inhalt</a></b> (Tags sind überkreuzt verschachtelt)', isCorrect: true, explanation: 'Richtig! <b> wurde zuletzt geöffnet, muss also zuerst geschlossen werden (<a><b>Inhalt</b></a>).' },
              { id: 'b', text: '<produkt><name>Stuhl</name><preis>99</preis></produkt>', isCorrect: false, explanation: 'Das ist vollständig wohlgeformt.' },
              { id: 'c', text: '<shop><produkt waehrung="EUR">Tisch</produkt></shop>', isCorrect: false, explanation: 'Das ist vollständig wohlgeformt.' },
              { id: 'd', text: '<artikel><titel>Katalog</titel></artikel>', isCorrect: false, explanation: 'Das ist vollständig wohlgeformt.' }
            ]
          },
          {
            id: 'q-med-4-4',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welche Aufgabe übernimmt XSLT (Extensible Stylesheet Language Transformations) im Mediendesign-Workflow?',
            options: [
              { id: 'a', text: 'Es wandelt strukturierte XML-Rohdaten über Vorlagen in andere Zielformate um, z. B. in formatiertes HTML für den Webbrowser', isCorrect: true, explanation: 'Exakt! XML (Rohdaten) + XSLT (Design-Vorlage) = HTML (Ergebnis für den Nutzer).' },
              { id: 'b', text: 'Es löscht alle Bilddateien vom Webserver', isCorrect: false, explanation: 'Falsch.' },
              { id: 'c', text: 'Es formatiert Festplatten im Drucksaal', isCorrect: false, explanation: 'Unsinn.' },
              { id: 'd', text: 'Es repariert kaputte Monitorpixel', isCorrect: false, explanation: 'Falsch.' }
            ],
            merksatz: 'XSLT transformiert XML-Rohdaten in gestaltetes HTML oder Druckformate.'
          },
          {
            id: 'q-med-4-5',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welche 4-teilige IHK-Prüfungskette beschreibt das Zusammenspiel von XML und seinen Zusatztechnologien perfekt?',
            options: [
              { id: 'a', text: 'XML (speichert Daten) → DTD/XSD (prüft Struktur) → XPath (sucht Daten) → XSLT (macht Design/HTML daraus)', isCorrect: true, explanation: 'Perfekt! Das ist die offizielle IHK-Zusammenfassungsformel aus dem PDF.' },
              { id: 'b', text: 'HTML → CSS → JavaScript → PHP', isCorrect: false, explanation: 'Das ist der Web-Frontend-Stack, nicht die XML-Technologiefamilie.' },
              { id: 'c', text: 'RGB → CMYK → Druck → Beschnitt', isCorrect: false, explanation: 'Das ist Druckfarbseparation.' },
              { id: 'd', text: 'InDesign → Photoshop → Illustrator → Premiere', isCorrect: false, explanation: 'Das sind Adobe-Programme.' }
            ],
            merksatz: 'Die Prüfungskette: XML speichert → DTD/XSD prüft → XPath sucht → XSLT macht Design/HTML!'
          }
        ]
      }
    ]
  }
];
