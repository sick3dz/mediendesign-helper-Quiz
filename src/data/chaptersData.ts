import { Chapter, QuizQuestion, LearningModule } from '../types/quiz';
import { IHK_ORIGINAL_CHAPTER } from './ihkOriginalChapterData';
import { PROJECT_PHASES_CHAPTER } from './projectPhasesChapterData';

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
      { task: 'UI vs. UX vs. IxD Kernfragen', detail: 'Beherrsche die 3 Leitfragen: Wie sieht es aus? (UI), Wie funktioniert es? (IxD), Wie fühlt es sich an? (UX).' },
      { task: 'Gestaltgesetze', detail: 'Nähe, Ähnlichkeit, Geschlossenheit etc. – wie Nutzer Designelemente gruppieren.' },
      { task: 'Affordance vs. Signifier', detail: 'Prüfungsfavorit! Affordance ist die Handlungsmöglichkeit (z.B. Griff), Signifier der Hinweis (z.B. Schild "Ziehen").' },
      { task: 'Donald Normans 7 Prinzipien', detail: 'Discoverability, Feedback, Constraints, Mapping, Konsistenz, Affordance und Signifiers benennen können.' },
      { task: '10 Nielsen-Heuristiken', detail: 'Der Goldstandard: Systemstatus, Reale Welt, Kontrolle, Konsistenz, Fehlerhilfe, Wiedererkennen, Flexibilität, Minimalismus, Fehlerdiagnose, Dokumentation.' },
      { task: 'Mobile Gesten & Größen', detail: 'Buttons mind. 44x44px. Gesten wie Tap, Swipe, Pinch und Long Press sicher zuordnen.' }
    ],
    modules: [
      {
        id: 'ixd-1',
        chapterId: 'ixd',
        title: 'Definition & Unterschied: UI, UX und IxD',
        shortDesc: 'Die 3 Leitfragen: Wie sieht es aus? Wie fühlt es sich an? Wie funktioniert es?',
        estimatedMinutes: 3,
        hasNewContent: true,
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
              { id: 'a', text: 'Die grafische Gestaltung von Logos, Markenbildern und Drucksachen', isCorrect: false, explanation: 'Das ist klassisches Grafik- bzw. Corporate Design.' },
              { id: 'b', text: 'Die Gestaltung von Verhalten und Dialog zwischen Mensch und System', isCorrect: true, explanation: 'Exakt! Interaktionsdesign (IxD) gestaltet dynamisches Verhalten, Rückmeldungen und Abläufe.' },
              { id: 'c', text: 'Die Strukturierung und Implementierung relationaler Datenbanken', isCorrect: false, explanation: 'Das ist Aufgabe der Backend-Entwicklung.' },
              { id: 'd', text: 'Die technische Farbseparation und Druckvorbereitung für Offsetdruck', isCorrect: false, explanation: 'Das gehört zur Druckvorstufe.' }
            ]
          },
          {
            id: 'q-ixd-1-3',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            question: 'Ein Nutzer bricht einen Kaufvorgang ab, weil der Checkout unverständlich und frustrierend aufgebaut ist. Welche Disziplin ist primär betroffen?',
            options: [
              { id: 'a', text: 'User Experience und Interaktionsdesign', isCorrect: true, explanation: 'Richtig! Unverständliche Nutzerführung (IxD) führt zu Frustration und einem schlechten Gesamterlebnis (UX).' },
              { id: 'b', text: 'Druckvorstufe und Print-Layout', isCorrect: false, explanation: 'Der Checkout ist eine digitale Web-Anwendung.' },
              { id: 'c', text: 'Corporate Design und Wortmarke', isCorrect: false, explanation: 'Das Firmenlogo verursacht keinen Abbruch im Checkout-Flow.' },
              { id: 'd', text: 'Netzwerk- und Serveradministration', isCorrect: false, explanation: 'Hier liegt ein Usability-Problem vor, kein Infrastruktur-Ausfall.' }
            ],
            examTip: 'Merke: Bricht ein Nutzer frustriert ab, ist die UX negativ beeinflusst.'
          },
          {
            id: 'q-ixd-1-4',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            question: 'Welches typische Arbeitsergebnis liefert ein Interaktionsdesigner (IxD)?',
            options: [
              { id: 'a', text: 'User Flows, interaktive Klickkonzepte und Verhaltensspezifikationen', isCorrect: true, explanation: 'Genau! User Flows und Navigationsübergänge sind die Kern-Artefakte des IxD.' },
              { id: 'b', text: 'Druckfertige Geschäftsausstattungen im Bogenoffset-Verfahren', isCorrect: false, explanation: 'Das gehört zum klassischen Print-Design.' },
              { id: 'c', text: 'Leistungsverzeichnisse für Server- und Netzwerk-Infrastruktur', isCorrect: false, explanation: 'Das ist Aufgabe der IT-Systemintegration bzw. Beschaffung.' },
              { id: 'd', text: 'Reine Farb- und Typografietafeln ohne Navigations- oder Zustandslogik', isCorrect: false, explanation: 'Farbpaletten allein sind reines Visual/UI-Design.' }
            ]
          }
        ],
        level2QuizQuestions: [
          {
            id: 'l2-ixd-1-1',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            scenario: 'Fallbeispiel: Eine E-Commerce-Plattform verzeichnet 42% Kaufabbrüche im letzten Schritt des Checkouts. Die Geschäftsführung möchte das Logo vergrößern und die Button-Farbe von Grün auf Rot ändern.',
            question: 'Als Mediengestalter Digital berätst du die Geschäftsleitung nach IHK-Standard. Welcher fachliche Ansatz adressiert das Problem korrekt?',
            options: [
              {
                id: 'a',
                text: 'Die Farb- und Logo-Änderung betrifft lediglich das UI-Design, während die hohe Abbruchquote primär auf Reibungsverluste im Interaktionsdesign und der Usability zurückzuführen ist.',
                isCorrect: true,
                explanation: 'Perfekt! Eine optische Farbänderung löst keine strukturellen Reibungsverluste oder unklare Formularschritte im Interaktionsfluss.'
              },
              {
                id: 'b',
                text: 'Die Button-Farbe Rot erzeugt nachweislich mehr Dringlichkeit und sollte zwingend mit einem pulsierenden Call-to-Action kombiniert werden, um die Conversion-Rate im Checkout nachhaltig zu maximieren.',
                isCorrect: false,
                explanation: 'Dringlichkeit erzeugt oft Reaktanz und Misstrauen bei Bezahlvorgängen.',
                trapExplanation: 'Typische Marketing-Falle: Signalfarben wie Rot werden im Bezahlprozess oft mit Fehlern oder Warnungen assoziiert und vertiefen den Abbruch statt das Usability-Problem zu lösen.'
              },
              {
                id: 'c',
                text: 'Hohe Abbruchquoten im Checkout sind nach IHK-Standard ein reines Latenz-Problem des Content Delivery Networks und bedürfen einer serverseitigen Datenbank-Optimierung statt gestalterischer Anpassungen.',
                isCorrect: false,
                explanation: 'Die Fragestellung beschreibt einen unverständlichen Interaktionsablauf.',
                trapExplanation: 'Verlockende Technik-Falle: Schnelle Ladezeiten sind zwar wichtig, beheben aber keine unverständlichen Formularfelder oder fehlende Bezahl-Transparenz im Nutzerablauf.'
              },
              {
                id: 'd',
                text: 'Das Interaction Design befasst sich ausschließlich mit visuellen Stil-Elementen und Typography-Scales, weshalb die Behebung von Formular-Abbrüchen vollständig in den Aufgabenbereich des Data-Science-Teams fällt.',
                isCorrect: false,
                explanation: 'IxD gestaltet das Verhalten und die Dialogführung.',
                trapExplanation: 'Typischer Praxis-Irrtum: Typografie und Farbskalen sind UI-Design. IxD befasst sich zentral mit der Verhaltens- und Dialoggestaltung von Nutzerschnittstellen.'
              }
            ],
            examTip: 'IHK-Prüfungsfalle: UI (Optik) und IxD (Ablauf/Verhalten) nicht verwechseln! Usability-Abbrüche liegen fast immer im IxD/UX-Bereich.'
          },
          {
            id: 'l2-ixd-1-2',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            scenario: 'Projekt-Briefing: Ein Kunde wünscht ein innovatives Dashboard. Er fragt: "Welche konkreten Artefakte und Dokumente erhalten wir in der IxD-Phase, bevor das finale UI gestaltet wird?"',
            question: 'Welche Auswahl enthält die typischen und nach IHK-Standard anerkannten Deliverables des Interaktionsdesigners?',
            options: [
              {
                id: 'a',
                text: 'Detaillierte User Flows, Navigations-Architekturen, interaktive Lo-Fi-Klickmodelle sowie präzise Verhaltensspezifikationen für Systemzustände und Benutzerdialoge.',
                isCorrect: true,
                explanation: 'Richtig! Der Interaktionsdesigner spezifiziert Pfade, Zustände und Interaktionen.'
              },
              {
                id: 'b',
                text: 'Pixelgenaue High-Fidelity UI-Templates mit finalen Farbverläufen, Schattenwerten und druckfertigen Farbprofilen für begleitende Print- und Marketingmaterialien.',
                isCorrect: false,
                explanation: 'Das gehört zur visuellen UI-Phase bzw. Printstufe, nicht zur konzeptionellen IxD-Phase.',
                trapExplanation: 'Glaubwürdige Scheinfachbegriffe: High-Fidelity Mockups und Farbprofile gehören zum visuellen UI-Design und Branding, nicht zur vorgelagerten Strukturphase des IxD.'
              },
              {
                id: 'c',
                text: 'Vollständig ausprogrammierte UI-Komponenten im JavaScript-Framework, minifizierte Produktions-Stylesheets und konfigurierte Schnittstellen zur Datenbankanbindung.',
                isCorrect: false,
                explanation: 'Das ist Frontend- und Backend-Entwicklung, nicht Konzeption/IxD.',
                trapExplanation: 'Verlockende Entwickler-Falle: Code und Datenbanken entstehen erst in der technischen Implementierungsphase nach Freigabe des Interaktionskonzepts.'
              },
              {
                id: 'd',
                text: 'Juristisch geprüfte Allgemeine Geschäftsbedingungen, DSGVO-konforme Cookie-Opt-In-Erklärungen sowie vertragliche Service-Level-Agreements mit Hosting-Dienstleistern.',
                isCorrect: false,
                explanation: 'Das ist die Aufgabe der Rechtsabteilung und IT-Beschaffung.',
                trapExplanation: 'Verlockende Compliance-Falle: Rechtstexte und SLAs sind Pflichtbestandteile des Betriebs, aber keine gestalterischen Artefakte des Interaktionsdesigns.'
              }
            ]
          },
          {
            id: 'l2-ixd-1-3',
            chapterId: 'ixd',
            moduleId: 'ixd-1',
            scenario: 'Audit-Aufgabe: In einem Usability-Labor stellt sich heraus: Nutzer finden das Design der App ästhetisch wunderschön (Note 1), scheitern aber daran, ihr Profil zu speichern, weil die Speicherfunktion erst nach Scrollen sichtbar ist.',
            question: 'Wie ist dieses System nach den Kriterien von UI, IxD und UX fachgerecht zu bewerten?',
            options: [
              {
                id: 'a',
                text: 'Hohe visuelle UI-Ästhetik kann gravierende Defizite im Interaktionsdesign (schlechte Auffindbarkeit) nicht kompensieren und resultiert letztlich in einer frustrierenden Gesamterfahrung (negative UX).',
                isCorrect: true,
                explanation: 'Exakt! Eine schöne Oberfläche kann ein frustrierendes Interaktionsverhalten nicht wettmachen.'
              },
              {
                id: 'b',
                text: 'Aufgrund des Halo-Effekts in der Designpsychologie führt ein hervorragend bewertetes visuelles UI automatisch auch zu einer dauerhaft überragenden User Experience bei allen Zielgruppen.',
                isCorrect: false,
                explanation: 'UX umfasst das Gesamterlebnis, das durch die Frustration negativ ausfällt.',
                trapExplanation: 'Verlockende Heuristik-Falle: Zwar mildert der Aesthetic-Usability-Effect kleinere Hürden ab, ein nicht auffindbarer Hauptspeicher-Button zerstört die User Experience jedoch unweigerlich.'
              },
              {
                id: 'c',
                text: 'Da UI-Design und Interaktionsdesign in modernen agilen Frameworks definitionsgemäß identisch sind, deutet dieses Testergebnis auf eine methodisch fehlerhafte Stichprobenauswahl im Labor hin.',
                isCorrect: false,
                explanation: 'UI und IxD sind klar getrennte Disziplinen.',
                trapExplanation: 'Scheinfachbegriff-Falle: UI (Oberfläche/Ästhetik) und IxD (Verhalten/Ablauf) sind zwei eigenständige Fachdisziplinen und niemals begrifflich deckungsgleich.'
              },
              {
                id: 'd',
                text: 'Das Platzieren von Speicher-Buttons unterhalb des sichtbaren Viewports gilt im modernen Webdesign als bewährtes Minimalismus-Prinzip zur gezielten Reduktion kognitiver Reizüberflutung.',
                isCorrect: false,
                explanation: 'Versteckte Primäraktionen verletzen zentrale Usability-Heuristiken.',
                trapExplanation: 'Trend-Falle: Gestalterischer Minimalismus darf niemals die Sichtbarkeit und Auffindbarkeit geschäftskritischer Kernaktionen beeinträchtigen.'
              }
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
              { id: 'a', text: 'More is more – alle Funktionen direkt sichtbar anbieten', isCorrect: false, explanation: 'Überfordert Nutzer sofort.' },
              { id: 'b', text: 'Don\'t make me think – sofort intuitiv verständlich führen', isCorrect: true, explanation: 'Genau! Schnelle, intuitive Führung mit minimalem Denkaufwand (Nutzer sollen nicht überlegen müssen).' },
              { id: 'c', text: 'Safety first – jede Eingabe mehrfach bestätigen lassen', isCorrect: false, explanation: 'Überflüssige Rückfragen erzeugen Frustration statt Einfachheit.' },
              { id: 'd', text: 'Form over function – markante Effekte vor Klarheit stellen', isCorrect: false, explanation: 'Funktion und Verständlichkeit stehen immer an erster Stelle.' }
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
              { id: 'a', text: 'Fehlertoleranz', isCorrect: true, explanation: 'Exakt! Fehlertoleranz (Error tolerance) schützt vor versehentlichem Datenverlust und bietet einen sicheren Ausweg.' },
              { id: 'b', text: 'Erwartungskonformität', isCorrect: false, explanation: 'Erwartungskonformität beschreibt konsistentes Verhalten nach gelernten Mustern.' },
              { id: 'c', text: 'Individualisierbarkeit', isCorrect: false, explanation: 'Individualisierbarkeit erlaubt Nutzern, die Oberfläche an eigene Vorlieben anzupassen.' },
              { id: 'd', text: 'Lernförderlichkeit', isCorrect: false, explanation: 'Lernförderlichkeit unterstützt beim Erlernen neuer Bedienabläufe.' }
            ]
          },
          {
            id: 'q-ixd-2-4',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            question: 'Warum platzieren fast alle großen Online-Shops den Warenkorb oben rechts im Header?',
            options: [
              { id: 'a', text: 'Wegen der externen Konsistenz durch gelernte Nutzerkonventionen', isCorrect: true, explanation: 'Richtig! Externe Konsistenz bedeutet, dass Nutzer vertraute Konventionen aus anderen Shops sofort wiedererkennen.' },
              { id: 'b', text: 'Weil Browser den rechten oberen Bereich technisch schneller laden', isCorrect: false, explanation: 'Technisch unbegründet – das Rendering hängt nicht von der Warenkorb-Position ab.' },
              { id: 'c', text: 'Weil die Barrierefreiheitsnorm diese Position verbindlich vorgibt', isCorrect: false, explanation: 'Barrierefreiheitsrichtlinien schreiben keine feste Bildschirmposition für Warenkörbe vor.' },
              { id: 'd', text: 'Weil die westliche Leserichtung rechts oben beginnt und links endet', isCorrect: false, explanation: 'Die westliche Leserichtung beginnt links oben; rechts oben ist eine etablierte E-Commerce-Konvention.' }
            ]
          }
        ],
        level2QuizQuestions: [
          {
            id: 'l2-ixd-2-1',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            scenario: 'Kunden-Szenario: Eine Web-App löscht Nutzerkonten sofort bei Klick auf "Konto löschen", ohne Sicherheitsabfrage und ohne Rückgängig-Möglichkeit. Nutzer beschweren sich über versehentliche Datenverluste.',
            question: 'Gegen welches fundamentale IxD-Prinzip wird hier gravierend verstoßen, und welche IHK-konforme Lösung ist zwingend erforderlich?',
            options: [
              {
                id: 'a',
                text: 'Fehlertoleranz (Error Tolerance) – Destruktive Aktionen erfordern zwingend eine eindeutige Bestätigungsabfrage oder ein mehrstufiges Sicherheitsnetz mit temporärem Wiederherstellungs-Fenster.',
                isCorrect: true,
                explanation: 'Genau! Destruktive Aktionen erfordern zwingend Fehlertoleranz und Sicherheitsbarrieren.'
              },
              {
                id: 'b',
                text: 'Konsistenz (Consistency) – Der Button zum Löschen des Kontos muss exakt denselben Grünton und Schatteneffekt erhalten wie die primären Registrierungs-Schaltflächen der Plattform.',
                isCorrect: false,
                explanation: 'Grün für Löschen wäre irreführend und löst das Problem nicht.',
                trapExplanation: 'Verlockende Scheinkonsistenz: Gleiches Aussehen bei gegensätzlichen Aktionen ist fatal. Destruktive Buttons müssen sich visuell warnend abheben und Fehlertoleranz bieten.'
              },
              {
                id: 'c',
                text: 'Sichtbarkeit (Visibility) – Um Fehlbedienungen zu vermeiden, muss der Lösch-Button dauerhaft pulsieren und über dem Bildschirmzentrum als aufdringliches modales Pop-Up schweben.',
                isCorrect: false,
                explanation: 'Blinkende Buttons verstoßen gegen Usability und A11y.',
                trapExplanation: 'Verlockende Aufmerksamkeits-Falle: Aufdringliche Daueranimationen lenken ab und verstoßen gegen Usability- und Barrierefreiheits-Standards.'
              },
              {
                id: 'd',
                text: 'Einfachheit (Simplicity) – Das sofortige Löschen ohne lästige Zwischenabfragen entspricht dem Prinzip "Don\'t make me think" und minimiert die Klickpfade der Nutzer maximal.',
                isCorrect: false,
                explanation: 'Schutzmechanismen dürfen bei Datenverlust nicht weggelassen werden.',
                trapExplanation: 'Verlockende Zitat-Falle: Steve Krugs "Don\'t make me think" bedeutet kognitive Klarheit, nicht das leichtsinnige Streichen von Schutzmechanismen bei irreversiblem Datenverlust.'
              }
            ],
            examTip: 'IHK-Prüfungsregel: Bei destruktiven Aktionen steht Fehlertoleranz (Bestätigung, zweistufiges Löschen, Undo) an oberster Stelle!'
          },
          {
            id: 'l2-ixd-2-2',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            scenario: 'Praxisfall: Beim Klick auf "Jetzt zahlungspflichtig bestellen" vergehen bei langsamer Mobilverbindung 4 Sekunden, ohne dass sich auf dem Display etwas ändert. Nutzer tippen mehrfach ungeduldig auf den Button und lösen teure Mehrfachbuchungen aus.',
            question: 'Welche zwei IxD-Prinzipien wurden hier missachtet und wie behebt ein professioneller Mediengestalter das Problem?',
            options: [
              {
                id: 'a',
                text: 'Feedback & Fehlertoleranz – Sofortige optische Rückmeldung des Systemstatus (Lade-Spinner) sowie temporäres Deaktivieren des Buttons zur wirksamen Unterbindung von Mehrfachtransaktionen.',
                isCorrect: true,
                explanation: 'Perfekt! Immediate Feedback + Deaktivierung des Buttons verhindert teure Doppelbuchungen.'
              },
              {
                id: 'b',
                text: 'Prägnanz & Gesetz der Nähe – Die Bestätigungsschaltfläche muss typografisch vergrößert und näher an die allgemeinen Geschäftsbedingungen gerückt werden, um Ladezeiten abzufangen.',
                isCorrect: false,
                explanation: 'Das löst die fehlende Laderückmeldung nicht.',
                trapExplanation: 'Verlockende Gestalt-Falle: Gestaltgesetze regeln die visuelle Gruppierung, können aber ein fehlendes System-Feedback bei Netzwerkverzögerungen nicht ersetzen.'
              },
              {
                id: 'c',
                text: 'Skalierbarkeit & Responsivität – Die gesamte Webanwendung muss in den Desktop-Modus gezwungen werden, weil mobile Browser keine asynchronen Bezahlprozesse unterstützen.',
                isCorrect: false,
                explanation: 'Mobile Browser beherrschen moderne Webstandards problemlos.',
                trapExplanation: 'Verlockende Schein-Technik: Mobile Browser beherrschen AJAX und asynchrone Requests problemlos; die Ursache liegt im fehlenden Interaktionsdesign des Buttons.'
              },
              {
                id: 'd',
                text: 'Ästhetik & Barrierefreiheit – Die Schaltfläche muss mit einem akustischen Signalton hinterlegt werden, während optische Ladeanzeigen aus Kontrastgründen vermieden werden sollten.',
                isCorrect: false,
                explanation: 'Soundeffekte allein sind keine Lösung für visuelle Ladezustände.',
                trapExplanation: 'Verlockende A11y-Falle: Audio allein ist keine adäquate Rückmeldung und Ladeanzeigen sind essentiell für sehende Nutzer auf Mobilgeräten.'
              }
            ]
          },
          {
            id: 'l2-ixd-2-3',
            chapterId: 'ixd',
            moduleId: 'ixd-2',
            scenario: 'Schnittstellen-Entwurf: Eine komplexe Buchhaltungs-Software verzichtet komplett auf Tooltips und Icons, nutzt dafür 200 Abkürzungen ohne Erklärung, um erfahrene Buchhalter schneller arbeiten zu lassen.',
            question: 'Welche zwei Grundprinzipien des Interaktionsdesigns wurden hier zu Gunsten vermeintlicher Experten-Effizienz grob vernachlässigt?',
            options: [
              {
                id: 'a',
                text: 'Sichtbarkeit & Einfachheit – Versteckte Bedeutungen und kryptische Akronyme überfordern neue Nutzer kognitiv und führen nachweislich zu massiven Eingabefehlern.',
                isCorrect: true,
                explanation: 'Exakt! Versteckte Bedeutungen verletzen das Sichtbarkeits- und Einfachheitsprinzip.'
              },
              {
                id: 'b',
                text: 'Responsivität & Mobiloptimierung – Buchhaltungssoftware muss nach IHK-Prüfungsordnung primär für hochauflösende Touchscreens von Smartphones im Querformat optimiert werden.',
                isCorrect: false,
                explanation: 'Das ist keine IHK-Anforderung für Desktop-Fachsoftware.',
                trapExplanation: 'Verlockende Mobil-Falle: Buchhaltungssoftware läuft am Desktop; das fundamentale Problem liegt im kognitiven Design (Sichtbarkeit/Klarheit).'
              },
              {
                id: 'c',
                text: 'Datenschutz & Barrierefreiheit – Fachbegriffe dürfen in Softwareoberflächen laut DSGVO nur nach vorheriger schriftlicher Einverständniserklärung des Datenschutzbeauftragten abgekürzt werden.',
                isCorrect: false,
                explanation: 'Die DSGVO regelt personenbezogene Daten, nicht Akronyme.',
                trapExplanation: 'Verlockende DSGVO-Falle: Die DSGVO regelt personenbezogene Daten, nicht die semantische Verständlichkeit von Interface-Beschriftungen.'
              },
              {
                id: 'd',
                text: 'Feedback & Latenzzeit – Fehlende Tooltips deuten zwingend auf eine Überlastung der internen GPU-Render-Engine hin und verlangsamen die Bildwiederholrate drastisch.',
                isCorrect: false,
                explanation: 'Tooltips haben keinen Bezug zur GPU-Hardwareüberlastung.',
                trapExplanation: 'Verlockende Hardware-Falle: Tooltips belasten keine Render-Engine; das Problem ist die fehlende visuelle Erklärung für den Nutzer (Sichtbarkeit).'
              }
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
              { id: 'a', text: 'Constraints', isCorrect: true, explanation: 'Richtig! Constraints (Einschränkungen) verhindern ungültige Aktionen und beugen Fehleingaben vor.' },
              { id: 'b', text: 'Mapping', isCorrect: false, explanation: 'Mapping beschreibt die räumliche Zuordnung von Bedienelement und Wirkung.' },
              { id: 'c', text: 'Signifier', isCorrect: false, explanation: 'Signifier sind visuelle Hinweise, die eine mögliche Interaktion anzeigen.' },
              { id: 'd', text: 'Chunking', isCorrect: false, explanation: 'Chunking gruppiert Informationen in überschaubare Einheiten.' }
            ]
          }
        ],
        level2QuizQuestions: [
          {
            id: 'l2-ixd-3-1',
            chapterId: 'ixd',
            moduleId: 'ixd-3',
            scenario: 'Fallanalyse: In einer minimalistischen Web-Applikation wurden sämtliche Buttons durch graue, flache Textzeilen ohne Umrandung, ohne Schatten und ohne Unterstreichung ersetzt. Nutzer übersehen diese Klickflächen reihenweise.',
            question: 'Wie lässt sich dieses Usability-Versagen nach den theoretischen Prinzipien von Donald Norman kognitionspsychologisch präzise erklären?',
            options: [
              {
                id: 'a',
                text: 'Den interaktiven Elementen fehlen wahrnehmbare Signifier, weshalb die an sich vorhandene Klick-Affordance für den Nutzer visuell vollkommen verborgen bleibt.',
                isCorrect: true,
                explanation: 'Perfekt! Signifier machen bestehende Affordances erst für das menschliche Auge erkennbar.'
              },
              {
                id: 'b',
                text: 'Die Benutzeroberfläche besitzt eine fehlerhafte physikalische Affordance, da digitale Flachbildschirme prinzipiell keine echten taktilen Interaktionsmöglichkeiten bieten können.',
                isCorrect: false,
                explanation: 'Auf Bildschirmen existiert die Klickbarkeit als digitale Affordance.',
                trapExplanation: 'Verlockende Theorie-Falle: Auf Touchscreens/Bildschirmen existiert die Klickbarkeit als digitale Affordance sehr wohl; ihr fehlt hier schlicht das wahrnehmbare Signal (Signifier).'
              },
              {
                id: 'c',
                text: 'Hier liegt eine schwere Störung des Mappings vor, weil Textlinks nach internationaler ISO-Norm zwingend in vertikaler Achse angeordnet sein müssen.',
                isCorrect: false,
                explanation: 'Mapping betrifft die Zuordnung von Steuerung und Wirkung, nicht Textlinks.',
                trapExplanation: 'Verlockende ISO-Falle: Mapping beschreibt die räumliche Zuordnung von Regler und Wirkung, nicht die visuelle Kennzeichnung anklickbarer Textlinks.'
              },
              {
                id: 'd',
                text: 'Es handelt sich um einen methodisch gewollten Constraint, der unerfahrene Benutzer gezielt vor einer Überlastung durch zu viele Klickoptionen schützen soll.',
                isCorrect: false,
                explanation: 'Constraints dürfen wichtige Kernfunktionen nicht unsichtbar machen.',
                trapExplanation: 'Verlockende Scheinerklärung: Constraints schränken Aktionen zur Fehlervermeidung ein, dürfen aber niemals primäre Navigations- und Funktionslinks unsichtbar maskieren.'
              }
            ],
            examTip: 'IHK-Lieblingsthema: Don Norman unterscheidet strikt zwischen Affordance (Handlungspotenzial) und Signifier (visueller Hinweis/Signal)!'
          },
          {
            id: 'l2-ixd-3-2',
            chapterId: 'ixd',
            moduleId: 'ixd-3',
            scenario: 'Hardware-Interface: An einem Audio-Mischpult bewegt ein Mediengestalter einen Schieberegler nach links, woraufhin die Audio-Lautstärke im rechten Kopfhörer drastisch lauter wird.',
            question: 'Welches Kernprinzip nach Donald Norman ist hier elementar verletzt und führt zu einer sofortigen Fehlbedienung des Anwenders?',
            options: [
              {
                id: 'a',
                text: 'Natural Mapping – Die räumliche Bewegungsrichtung des Reglers entspricht nicht der resultierenden akustischen Raum- und Pegelwirkung im mentalen Modell des Nutzers.',
                isCorrect: true,
                explanation: 'Richtig! Mapping erfordert eine intuitive, logische Übereinstimmung von Steuerung und Wirkung.'
              },
              {
                id: 'b',
                text: 'Discoverability – Die Regler sind auf dem Mischpult für den Anwender physisch unsichtbar und können daher unter Studiobedingungen nicht lokalisiert werden.',
                isCorrect: false,
                explanation: 'Die Regler sind sichtbar, aber falsch zugeordnet.',
                trapExplanation: 'Verlockende Begriffsfalle: Die Regler sind gut zu sehen (Discoverability ist gegeben); der Fehler liegt in der widersinnigen Zuordnung von Richtung und Auswirkung (Mapping).'
              },
              {
                id: 'c',
                text: 'Externe Konsistenz – Lautstärkeregler müssen laut europäischem Arbeitsschutz zwingend als rotierende Drehknöpfe mit haptischem Rastwiderstand ausgeführt sein.',
                isCorrect: false,
                explanation: 'Schieberegler sind im professionellen Audiobereich Standard.',
                trapExplanation: 'Verlockende Normen-Falle: Schieberegler sind im Audiobereich Standard; das Problem ist die vertauschte Richtungs- und Kanalzuordnung.'
              },
              {
                id: 'd',
                text: 'Kognitiver Constraint – Durch die Linksverschiebung wird eine absichtliche Sicherheitssperre aktiviert, um das Gehör des Tontechnikers vor Übersteuerungen zu bewahren.',
                isCorrect: false,
                explanation: 'Die Lautstärke wird lauter, keine Sperre greift.',
                trapExplanation: 'Verlockende Schutzbehauptung: Die Lautstärke wird lauter statt leiser; hier liegt kein Constraint vor, sondern eine gravierende Fehlzuordnung.'
              }
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
              { id: 'a', text: 'Den chronologischen Browserverlauf der letzten besuchten Seiten', isCorrect: false, explanation: 'Nein, das ist die Browser-History, nicht die Seitenhierarchie.' },
              { id: 'b', text: 'Den aktuellen Standort und Pfad innerhalb der Seitenhierarchie', isCorrect: true, explanation: 'Richtig! Breadcrumbs zeigen dem Nutzer, wo er sich in der Tiefe der Website befindet.' },
              { id: 'c', text: 'Die technischen Ladezeiten der einzelnen Seitenkomponenten', isCorrect: false, explanation: 'Das sind Performance-Metriken, keine Navigationshilfe.' },
              { id: 'd', text: 'Die aktiven Sitzungs-Cookies und Tracking-Einstellungen der Domain', isCorrect: false, explanation: 'Das gehört zum Consent-Management, nicht zur Navigation.' }
            ]
          },
          {
            id: 'q-ixd-4-2',
            chapterId: 'ixd',
            moduleId: 'ixd-4',
            question: 'Welcher Vorteil zeichnet das Hamburger-Menü (☰) auf mobilen Endgeräten besonders aus?',
            options: [
              { id: 'a', text: 'Es spart Platz auf kleinen Displays und bündelt Navigationspunkte', isCorrect: true, explanation: 'Richtig! Auf Smartphones bleibt so ausreichend Bildschirmfläche für den eigentlichen Hauptinhalt.' },
              { id: 'b', text: 'Es beschleunigt das Nachladen von Bildern über den Webserver', isCorrect: false, explanation: 'Ein Navigationsmuster hat keinen direkten Einfluss auf die Servergeschwindigkeit.' },
              { id: 'c', text: 'Es macht die Vergabe von Alternativtexten für Icons überflüssig', isCorrect: false, explanation: 'Auch Icon-Buttons benötigen barrierefreie Beschriftungen (z. B. aria-label).' },
              { id: 'd', text: 'Es macht sämtliche Unterseiten ohne Klick sofort gleichzeitig sichtbar', isCorrect: false, explanation: 'Genau umgekehrt: Die Navigation wird erst nach dem Klick eingeblendet.' }
            ]
          },
          {
            id: 'q-ixd-4-3',
            chapterId: 'ixd',
            moduleId: 'ixd-4',
            question: 'Was ist das primäre Ziel eines optimierten User Flows in einem Online-Shop?',
            options: [
              { id: 'a', text: 'Besucher durch zusätzliche Zwischenseiten auf möglichst viele Werbeflächen zu leiten', isCorrect: false, explanation: 'Zusätzliche Hürden frustrieren Nutzer und erhöhen die Abbruchrate.' },
              { id: 'b', text: 'Den Weg von der Produktauswahl zum Kauf möglichst klar und reibungslos zu gestalten', isCorrect: true, explanation: 'Exakt! Eine klare, fehlerfreie Zielerreichung minimiert Absprungraten im Checkout.' },
              { id: 'c', text: 'Alle Produktkategorien vollständig auf einer einzigen statischen Seite zusammenzufassen', isCorrect: false, explanation: 'Ein User Flow optimiert Abläufe und Schritte, nicht eine überladene Einzelseite.' },
              { id: 'd', text: 'Möglichst viele visuelle Übergangseffekte zwischen den Bestellschritten einzubauen', isCorrect: false, explanation: 'Reine Dekoration ohne funktionalen Nutzen verschlechtert die Usability.' }
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
              { id: 'a', text: 'Pinch', isCorrect: true, explanation: 'Richtig! Pinch (Zusammen- oder Auseinanderziehen mit zwei Fingern) ist die etablierte Zoom-Geste.' },
              { id: 'b', text: 'Swipe', isCorrect: false, explanation: 'Swipe (Wischen mit einem Finger) dient zum Blättern oder Scrollen.' },
              { id: 'c', text: 'Long Press', isCorrect: false, explanation: 'Long Press öffnet gewöhnlich ein Kontextmenü.' },
              { id: 'd', text: 'Drag', isCorrect: false, explanation: 'Drag verschiebt Objekte auf dem Bildschirm.' }
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
              { id: 'a', text: 'Sofortiges visuelles Feedback geben, dass die Eingabe registriert wurde', isCorrect: true, explanation: 'Perfekt! Microinteractions bestätigen Aktionen unmittelbar, geben Orientierung und fördern positive UX.' },
              { id: 'b', text: 'Die serverseitige Datenbankabfrage während des Klicks unterbrechen', isCorrect: false, explanation: 'Microinteractions laufen im Frontend ab und brechen keine Datenbanksitzungen ab.' },
              { id: 'c', text: 'Das gesamte Seitenlayout vollständig neu vom Server nachladen', isCorrect: false, explanation: 'Microinteractions sind kleinteilige Rückmeldungen ohne kompletten Seiten-Reload.' },
              { id: 'd', text: 'Automatisierte Bot-Anfragen ohne Captcha-Abfrage technisch erkennen', isCorrect: false, explanation: 'Microinteractions sind UX-Feedbackelemente, kein Sicherheitsmechanismus.' }
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
              { id: 'a', text: 'Benutzerkontrolle und Freiheit', isCorrect: true, explanation: 'Genau! „User control and freedom“ gibt Nutzern bei Fehlbedienungen einen klaren „Notausgang“.' },
              { id: 'b', text: 'Ästhetik und minimalistisches Design', isCorrect: false, explanation: 'Minimalistisches Design zielt auf den Verzicht überflüssiger Informationen.' },
              { id: 'c', text: 'Konsistenz und Standards', isCorrect: false, explanation: 'Konsistenz und Standards sorgen für einheitliche Begriffe und Bedienmuster.' },
              { id: 'd', text: 'Übereinstimmung von System und realer Welt', isCorrect: false, explanation: 'Diese Heuristik verlangt verständliche Sprache und vertraute Konzepte statt Fachjargon.' }
            ]
          },
          {
            id: 'q-ixd-6-2',
            chapterId: 'ixd',
            moduleId: 'ixd-6',
            question: 'Ein Ladebalken mit Prozentangabe beim Datei-Upload erfüllt primär welche Nielsen-Heuristik?',
            options: [
              { id: 'a', text: 'Sichtbarkeit des Systemstatus', isCorrect: true, explanation: 'Richtig! „Visibility of system status“ informiert den Nutzer jederzeit darüber, was im System passiert.' },
              { id: 'b', text: 'Hilfe und Dokumentation', isCorrect: false, explanation: 'Ein Ladebalken ist eine Statusmeldung, keine schriftliche Hilfe.' },
              { id: 'c', text: 'Flexibilität und Effizienz', isCorrect: false, explanation: 'Flexibilität richtet sich z. B. an Shortcuts für erfahrene Nutzer.' },
              { id: 'd', text: 'Wiedererkennen statt Erinnern', isCorrect: false, explanation: 'Hier geht es um den aktuellen Systemzustand, nicht um Gedächtnisentlastung.' }
            ]
          },
          {
            id: 'q-ixd-6-3',
            chapterId: 'ixd',
            moduleId: 'ixd-6',
            question: 'Ein Webformular zeigt Vorschläge für Suchbegriffe direkt bei der Texteingabe (Auto-Suggest). Welche Nielsen-Heuristik wird hier angewendet?',
            options: [
              { id: 'a', text: 'Wiedererkennen statt Erinnern', isCorrect: true, explanation: 'Richtig! „Recognition rather than recall“: Der Nutzer wählt aus sichtbaren Vorschlägen statt Begriffe auswendig wissen zu müssen.' },
              { id: 'b', text: 'Ästhetik und minimalistisches Design', isCorrect: false, explanation: 'Minimalistisches Design verzichtet auf unnötige Zierelemente.' },
              { id: 'c', text: 'Sichtbarkeit des Systemstatus', isCorrect: false, explanation: 'Sichtbarkeit des Systemstatus zeigt z. B. Fortschritts- oder Ladeanzeigen.' },
              { id: 'd', text: 'Fehlererkennung und -diagnose', isCorrect: false, explanation: 'Diese Heuristik beschreibt verständliche Fehlermeldungen mit Lösungsvorschlägen.' }
            ],
            examTip: 'IHK-Tipp: "Wiedererkennen statt Erinnern" entlastet das Arbeitsgedächtnis durch visuelle Vorschläge und Menüauswahlen.'
          }
        ]
      },
      {
        id: 'ixd-7',
        chapterId: 'ixd',
        title: 'Gestaltgesetze: Visuelle Wahrnehmung',
        shortDesc: 'Nähe, Ähnlichkeit & Geschlossenheit – Wie wir Design verstehen',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-ixd-12',
            title: 'Warum Gestaltgesetze?',
            coreConcept: 'Das Gehirn sucht immer nach Mustern und Strukturen.',
            bulletPoints: [
              'Gesetz der Nähe: Nahe beieinander liegende Elemente werden als Gruppe wahrgenommen.',
              'Gesetz der Ähnlichkeit: Elemente mit gleichen Farben/Formen gehören zusammen.',
              'Gesetz der Geschlossenheit: Unvollständige Formen werden vom Gehirn ergänzt.',
              'Gesetz der Kontinuität: Augen folgen dem sanftesten Weg (Linien/Kurven).',
              'Gesetz der Prägnanz: Das Gehirn bevorzugt einfache, symmetrische Formen.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-ixd-7-1',
            chapterId: 'ixd',
            moduleId: 'ixd-7',
            question: 'Welches Gestaltgesetz erklärt, warum wir eine Navigationsleiste als eine Einheit wahrnehmen, wenn die Links dicht beieinander stehen?',
            options: [
              { id: 'a', text: 'Gesetz der Nähe', isCorrect: true, explanation: 'Richtig! Räumliche Nähe suggeriert Zusammengehörigkeit.' },
              { id: 'b', text: 'Gesetz der Kontinuität', isCorrect: false, explanation: 'Kontinuität betrifft den Linienverlauf.' },
              { id: 'c', text: 'Gesetz der Geschlossenheit', isCorrect: false, explanation: 'Geschlossenheit ergänzt fehlende Konturen.' },
              { id: 'd', text: 'Gesetz der Prägnanz', isCorrect: false, explanation: 'Prägnanz bevorzugt einfache Formen.' }
            ]
          },
          {
            id: 'q-ixd-7-2',
            chapterId: 'ixd',
            moduleId: 'ixd-7',
            question: 'Welches Gestaltgesetz erklärt, warum Buttons mit derselben Hintergrundfarbe und Form von Nutzern als gleichartige Funktionsteile wahrgenommen werden?',
            options: [
              { id: 'a', text: 'Gesetz der Ähnlichkeit', isCorrect: true, explanation: 'Richtig! Das Gesetz der Ähnlichkeit (Similarity) verknüpft Objekte gleicher Farbe, Form oder Größe gedanklich zu einer Gruppe.' },
              { id: 'b', text: 'Gesetz der Nähe', isCorrect: false, explanation: 'Das Gesetz der Nähe bezieht sich auf den räumlichen Abstand.' },
              { id: 'c', text: 'Gesetz der Geschlossenheit', isCorrect: false, explanation: 'Das Gesetz der Geschlossenheit vervollständigt unvollständige Konturen.' },
              { id: 'd', text: 'Gesetz der Kontinuität', isCorrect: false, explanation: 'Kontinuität folgt durchgehenden Linienverläufen.' }
            ]
          },
          {
            id: 'q-ixd-7-3',
            chapterId: 'ixd',
            moduleId: 'ixd-7',
            question: 'Ein Logo besteht aus unterbrochenen Kreislinien, die unser Gehirn automatisch zu einem vollen Kreis vervollständigt. Welches Gestaltgesetz wirkt hier?',
            options: [
              { id: 'a', text: 'Gesetz der Geschlossenheit', isCorrect: true, explanation: 'Perfekt! Beim Gesetz der Geschlossenheit (Closure) ergänzt das Gehirn unvollständige Konturen zu einer Gesamtform.' },
              { id: 'b', text: 'Gesetz des gemeinsamen Schicksals', isCorrect: false, explanation: 'Betrifft sich gemeinsam bewegende Elemente.' },
              { id: 'c', text: 'Gesetz der Gleichartigkeit', isCorrect: false, explanation: 'Bezieht sich auf ähnliche Form- oder Farbmerkmale.' },
              { id: 'd', text: 'Gesetz der räumlichen Nähe', isCorrect: false, explanation: 'Bezieht sich auf den geringen Abstand zwischen Elementen.' }
            ],
            merksatz: 'Gesetz der Geschlossenheit lässt das Gehirn Lücken in Konturen selbstständig auffüllen.'
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
      { task: 'Definition & Merksatz', detail: 'Wireframes sind schematische Baupläne ohne Farben/Bilder für Struktur, Navigation und Nutzerführung.' },
      { task: 'Zielgruppen & Sinus-Milieus', detail: 'Design für Lebenswelten (z.B. Performer, Bürgerliche Mitte) statt nur für Alter.' },
      { task: 'Wireframe vs. Mockup vs. Prototyp', detail: 'Kenne die Kette: Aufbau (Wireframe) → Aussehen (Mockup) → Bedienung (Prototyp).' },
      { task: 'Die 3 Fidelity-Stufen', detail: 'Low-Fidelity (Skizze), Mid-Fidelity (Digitaler Entwurf), High-Fidelity (Präziser Bauplan).' },
      { task: 'Die 6 Standard-Zonen', detail: 'Header, Navigation, Content, Call-to-Action (CTA), Sidebar und Footer einplanen.' },
      { task: 'Häufige Wireframe-Fehler', detail: 'Vermeide es, zu früh zu gestalten (Farben/Effekte), da dies von der Strukturdiskussion ablenkt.' }
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
              { id: 'a', text: 'Grober Platzhalter für die Hauptnavigation im Kopfbereich', isCorrect: false, explanation: 'Navigation gehört unbedingt ins Wireframe.' },
              { id: 'b', text: 'Ausgearbeitete Farbverläufe, Retuschen und finale Grafiken', isCorrect: true, explanation: 'Richtig! Farben und visuelles Feindesign lenken in der Wireframe-Phase nur von Struktur und Funktion ab.' },
              { id: 'c', text: 'Positionierung und Größe zentraler Call-to-Action-Flächen', isCorrect: false, explanation: 'CTA-Platzhalter gehören zur funktionalen Struktur.' },
              { id: 'd', text: 'Strukturelle Aufteilung der Seite in Text- und Bildblöcke', isCorrect: false, explanation: 'Die Anordnung der Inhaltsblöcke ist der Hauptzweck eines Wireframes.' }
            ]
          },
          {
            id: 'q-wf-1-2',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            question: 'Warum spart die Erstellung von Wireframes im Projektverlauf erhebliche Kosten?',
            options: [
              { id: 'a', text: 'Weil Struktur- und Navigationsfehler schnell korrigiert werden, bevor Code entsteht', isCorrect: true, explanation: 'Exakt! Späte Änderungen im fertig programmierten Code kosten ein Vielfaches.' },
              { id: 'b', text: 'Weil Wireframes direkt ohne weitere Entwicklung als fertige Website exportiert werden', isCorrect: false, explanation: 'Programmierung bleibt notwendig; Wireframes sind nur der Bauplan.' },
              { id: 'c', text: 'Weil durch Wireframes spätere Barrierefreiheits- und Browsertests vollständig entfallen', isCorrect: false, explanation: 'Qualitäts- und Barrierefreiheitstests bleiben dennoch erforderlich.' },
              { id: 'd', text: 'Weil Wireframes bereits alle Bildlizenzen und finalen Druckdaten automatisch enthalten', isCorrect: false, explanation: 'Bildmaterial und Feindesign folgen erst im späteren Mockup.' }
            ]
          },
          {
            id: 'q-wf-1-3',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            question: 'In welchen Farben werden Wireframes typischerweise gestaltet?',
            options: [
              { id: 'a', text: 'In Schwarz-Weiß und Graustufen mit schlichten Platzhaltern', isCorrect: true, explanation: 'Richtig! Graustufen verhindern, dass Stakeholder über Farbgeschmäcker statt über Struktur diskutieren.' },
              { id: 'b', text: 'In kontrastreichen Signalfarben zur Markierung aller Module', isCorrect: false, explanation: 'Grelle Farben würden von der Informationsarchitektur ablenken.' },
              { id: 'c', text: 'In den verbindlichen Corporate-Design-Farben des Auftraggebers', isCorrect: false, explanation: 'Das gehört erst ins visuelle Mockup.' },
              { id: 'd', text: 'In vollfarbigen Farbverläufen mit realistischen Produktfotos', isCorrect: false, explanation: 'Realistische Farben und Fotos folgen erst in späteren Entwurfsphasen.' }
            ]
          }
        ],
        level2QuizQuestions: [
          {
            id: 'l2-wf-1-1',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            scenario: 'Kunden-Präsentation: Ein Kunde beschwert sich beim Betrachten der ersten Wireframe-Entwürfe: "Warum ist hier alles nur grau, wo sind unsere bunten Werbefotos und unser neues Firmenlogo?"',
            question: 'Wie argumentierst du als angehender Mediengestalter Digital fachlich fundiert nach IHK-Standard?',
            options: [
              {
                id: 'a',
                text: 'Wireframes dienen ausschließlich der Prüfung von Informationsarchitektur, Hierarchie und Nutzerführung; visuelle Farben und Bilder würden den Fokus von diesen fundamentalen Strukturfragen ablenken.',
                isCorrect: true,
                explanation: 'Exakt! Der bewusste Verzicht auf Farbe lenkt die Aufmerksamkeit auf Inhalt, Lesefluss und Funktionalität.'
              },
              {
                id: 'b',
                text: 'Wireframes dürfen laut DIN EN ISO 9241 grundsätzlich nicht in Farbe gerendert werden, da farbige Vektorelemente die Latenzzeit des Browser-Layout-Engines signifikant verlangsamen.',
                isCorrect: false,
                explanation: 'Die ISO 9241 regelt Ergonomie, verbietet aber keine Farben aus Render-Gründen.',
                trapExplanation: 'Glaubwürdiger Scheinfachbegriff: Die ISO 9241 regelt Mensch-System-Interaktion, verbietet aber keine Farben aus Performance-Gründen; Graustufen sind ein didaktisches und methodisches Werkzeug.'
              },
              {
                id: 'c',
                text: 'Das Corporate Design darf erst nach dem Go-Live der Web-Applikation auf dem Produktionsserver implementiert werden, um rechtliche Abmahnungen durch die Wettbewerbszentrale zu vermeiden.',
                isCorrect: false,
                explanation: 'Das CD wird in der Mockup-Phase vor Go-Live ausgearbeitet.',
                trapExplanation: 'Verlockende Rechts-Falle: Das Corporate Design wird in der nachfolgenden Mockup-Phase sorgfältig ausgearbeitet; die Wettbewerbszentrale mahnt keine internen Wireframe-Skizzen ab.'
              },
              {
                id: 'd',
                text: 'Graustufen-Wireframes sind nach aktuellen Webstandards zwingend erforderlich, um bereits in der Konzeptionsphase die automatisierte WCAG-AAA-Konformität für farbenblinde Screenreader-Nutzer lückenlos nachzuweisen.',
                isCorrect: false,
                explanation: 'WCAG betrifft das finale Design, nicht frühe Wireframes.',
                trapExplanation: 'Verlockende A11y-Falle: Barrierefreiheit erfordert Kontraste im finalen UI; Wireframes sind jedoch interne Arbeitsartefakte und kein A11y-Audit-Nachweis.'
              }
            ],
            examTip: 'IHK-Prüfungsfokus: Wireframes = Struktur/Inhalt in Graustufen; Mockup = Visuelle Gestaltung mit CI-Farben!'
          },
          {
            id: 'l2-wf-1-2',
            chapterId: 'wireframe',
            moduleId: 'wf-1',
            scenario: 'Stakeholder-Meeting: Ein Projektleiter schlägt vor, die Wireframe-Phase komplett zu überspringen und direkt mit der Programmierung der React-Komponenten zu beginnen, um "drei Wochen Entwicklungszeit zu sparen".',
            question: 'Welches zentrale IHK-Wirtschaftlichkeits-Argument entkräftet diesen Vorschlag am wirksamsten?',
            options: [
              {
                id: 'a',
                text: 'Strukturelle Fehlentscheidungen im späteren Quellcode zu korrigieren verursacht um ein Vielfaches höhere Kosten und Verzögerungen als schnelle Anpassungen in konzeptionellen Wireframes.',
                isCorrect: true,
                explanation: 'Genau! Frühe Änderungen an Boxen und Skizzen kosten fast nichts, späte Umbauten im fertigen Code gefährden das Budget.'
              },
              {
                id: 'b',
                text: 'Ohne vorliegende Wireframes verweigern moderne Versionskontrollsysteme wie Git das Einchecken und Mergen von Produktions-Branches in die finale Entwicklungsumgebung.',
                isCorrect: false,
                explanation: 'Git überprüft keine Designphasen.',
                trapExplanation: 'Verlockende Dev-Falle: Git ist ein Werkzeug für Quellcodeverwaltung und prüft keine Designphasen; das Risiko liegt in den immensen Kosten späten Code-Refactorings.'
              },
              {
                id: 'c',
                text: 'Das Überspringen der Wireframe-Phase führt automatisch zum sofortigen Erlöschen aller Urheberrechte und gewerblichen Schutzrechte an der programmierten Web-Software.',
                isCorrect: false,
                explanation: 'Urheberrecht entsteht mit der Schöpfung, unabhängig von Zwischenphasen.',
                trapExplanation: 'Verlockende Rechts-Falle: Das Urheberrecht entsteht unabhängig von Zwischenschritten; die Begründung gegen das Überspringen ist rein wirtschaftlich und prozessual.'
              },
              {
                id: 'd',
                text: 'Frontend-Entwickler dürfen nach den Tarifverträgen der Medienbranche erst dann mit dem Coden beginnen, wenn vom Kunden ein beidseitig unterschriebenes Papier-Wireframe vorliegt.',
                isCorrect: false,
                explanation: 'Tarifverträge enthalten keine Regeln über Wireframe-Signaturen.',
                trapExplanation: 'Verlockende Tarif-Falle: Tarifverträge regeln Arbeitsbedingungen und Vergütung, aber keine verbindlichen Wireframe-Unterzeichnungen.'
              }
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
              { id: 'a', text: 'Wireframe = Aussehen, Mockup = Bedienung, Prototyp = Aufbau, Entwicklung = Test', isCorrect: false, explanation: 'Falsch zugeordnet: Wireframe zeigt den Aufbau, Mockup das Aussehen.' },
              { id: 'b', text: 'Wireframe = Aufbau, Mockup = Aussehen, Prototyp = Bedienung, Entwicklung = Umsetzung', isCorrect: true, explanation: 'Exakt! Das ist der offizielle Prüfungs-Merksatz.' },
              { id: 'c', text: 'Wireframe = Umsetzung, Mockup = Aufbau, Prototyp = Aussehen, Entwicklung = Konzept', isCorrect: false, explanation: 'Die Phasen sind vertauscht: Zuerst kommen Aufbau, Aussehen, Bedienung und erst dann die Umsetzung.' },
              { id: 'd', text: 'Wireframe = Bedienung, Mockup = Umsetzung, Prototyp = Aussehen, Entwicklung = Aufbau', isCorrect: false, explanation: 'Genau umgekehrt: Der Prototyp bildet die Bedienung ab, das Mockup das statische Aussehen.' }
            ]
          },
          {
            id: 'q-wf-2-2',
            chapterId: 'wireframe',
            moduleId: 'wf-2',
            question: 'Ein Kunde möchte vor der Programmierung sehen, wie die echten Firmenfarben, Hausschriften und freigestellten Produktfotos im Layout wirken. Was legst du ihm vor?',
            options: [
              { id: 'a', text: 'Ein ausgearbeitetes visuelles Mockup', isCorrect: true, explanation: 'Perfekt! Ein Mockup (visueller Designentwurf) zeigt das fertige Aussehen mit echten Brand-Elementen.' },
              { id: 'b', text: 'Ein schematisches Low-Fi-Wireframe', isCorrect: false, explanation: 'Ein Low-Fi-Wireframe zeigt weder Farben noch echte Schriften.' },
              { id: 'c', text: 'Eine textbasierte Sitemap-Übersicht', isCorrect: false, explanation: 'Eine Sitemap bildet nur die Seitenhierarchie ab, nicht das visuelle Design.' },
              { id: 'd', text: 'Ein technisches Datenbank-ER-Modell', isCorrect: false, explanation: 'Ein ER-Modell beschreibt Datenstrukturen, keine Markenoptik.' }
            ]
          },
          {
            id: 'q-wf-2-3',
            chapterId: 'wireframe',
            moduleId: 'wf-2',
            question: 'Welche Phase steht zeitlich DIREKT vor der Erstellung von Wireframes?',
            options: [
              { id: 'a', text: 'Informationsarchitektur und Strukturierung der Inhalte', isCorrect: true, explanation: 'Richtig! Bevor Elemente im Wireframe angeordnet werden, stehen Seitenstruktur und Inhalte fest.' },
              { id: 'b', text: 'Visuelle Ausarbeitung von Farb- und Typografiestilen', isCorrect: false, explanation: 'Das erfolgt erst nach dem Wireframe im visuellen Design bzw. Mockup.' },
              { id: 'c', text: 'Programmierung des produktiven HTML- und CSS-Codes', isCorrect: false, explanation: 'Die Umsetzung im Code erfolgt erst nach Konzept- und Designfreigabe.' },
              { id: 'd', text: 'Abschließender Usability-Test des fertigen Prototyps', isCorrect: false, explanation: 'Prototypen-Tests erfolgen nach dem Wireframe- und Prototypenbau.' }
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
              { id: 'a', text: 'Exakte Maßverhältnisse, echte Texte und präzise Rasterabstände', isCorrect: true, explanation: 'Richtig! High-Fidelity ist digital und millimetergenau ausgearbeitet, verzichtet aber noch auf bunte Dekoration.' },
              { id: 'b', text: 'Schnelle Freihandskizzen auf Papier ohne feste Spaltenmaße', isCorrect: false, explanation: 'Das beschreibt gerade ein Low-Fidelity-Wireframe.' },
              { id: 'c', text: 'Vollständig lauffähiger Produktivcode mit aktiver Datenbankanbindung', isCorrect: false, explanation: 'Ein Wireframe ist ein Konzeptionsentwurf, kein fertiger Quellcode.' },
              { id: 'd', text: 'Ausschließlich Blindtexte und grobe Platzhalter ohne Seitenraster', isCorrect: false, explanation: 'Gerade High-Fidelity-Wireframes nutzen reale Texte und exakte Raster.' }
            ]
          },
          {
            id: 'q-wf-3-3',
            chapterId: 'wireframe',
            moduleId: 'wf-3',
            question: 'Warum eignen sich Low-Fidelity Skizzen so hervorragend für frühe Design-Sprints?',
            options: [
              { id: 'a', text: 'Sie lassen sich in Sekunden verwerfen und neu zeichnen, ohne großen Aufwand', isCorrect: true, explanation: 'Genau! Geringer Zeit- und Emotionsverlust fördert offene Kritik und schnelles Ausprobieren.' },
              { id: 'b', text: 'Sie liefern bereits pixelgenaue Design-Spezifikationen für die Entwicklung', isCorrect: false, explanation: 'Pixelgenaue Specs entstehen erst in späteren High-Fi-Mockups und Design-Systemen.' },
              { id: 'c', text: 'Sie ersetzen sämtliche nachfolgenden Kundenabnahmen und Usability-Tests', isCorrect: false, explanation: 'Auch nach frühen Skizzen bleiben Prototypen, Tests und Freigaben erforderlich.' },
              { id: 'd', text: 'Sie sind durch internationale Webstandards als Pflichtnachweis vorgeschrieben', isCorrect: false, explanation: 'Webstandards regeln technische Umsetzung, keine Papierskizzen.' }
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
              { id: 'a', text: 'Auf echte Produktfotos und fertige Farbschattierungen zu verzichten', isCorrect: false, explanation: 'Das ist kein Fehler, sondern in einem Wireframe genau richtig.' },
              { id: 'b', text: 'Zu früh Farben, Bilder und Effekte einzubauen, bevor die Struktur steht', isCorrect: true, explanation: 'Genau! Frühe visuelle Gestaltung lenkt ab und verfälscht die Strukturdiskussion.' },
              { id: 'c', text: 'Bereits frühzeitig eine Fußzeile mit rechtlichen Links einzuplanen', isCorrect: false, explanation: 'Der Footer ist ein regulärer Bestandteil der Seitenstruktur.' },
              { id: 'd', text: 'Die gesamte Seitenaufteilung konsequent in Graustufen darzustellen', isCorrect: false, explanation: 'Graustufen sind für Wireframes ausdrücklich ideal.' }
            ]
          },
          {
            id: 'q-wf-4-2',
            chapterId: 'wireframe',
            moduleId: 'wf-4',
            question: 'Welche Zonen gehören zur klassischen Standard-Struktur einer Website im Wireframe?',
            options: [
              { id: 'a', text: 'Header mit Navigation, Hauptinhalt, Call-to-Action und Footer', isCorrect: true, explanation: 'Richtig! Header (Logo/Navigation), Content, Call-to-Action (CTA) und Footer sind die vier Standardbereiche einer Website.' },
              { id: 'b', text: 'Domain-Routing, SSL-Zertifikat, Datenbank-Schema und Backup-Plan', isCorrect: false, explanation: 'Das sind technische Infrastruktur- und Backend-Komponenten, keine Wireframe-Zonen.' },
              { id: 'c', text: 'Vollbild-Hintergrundvideo ohne Navigationsleiste und ohne Fußzeile', isCorrect: false, explanation: 'Ohne Navigation und Footer fehlen Orientierung und Pflichtangaben.' },
              { id: 'd', text: 'Ausschließlich Cookie-Banner, Pop-up-Layer und Werbebanner-Flächen', isCorrect: false, explanation: 'Das sind ergänzende Einblendungen, nicht die grundlegende Seitenstruktur.' }
            ]
          },
          {
            id: 'q-wf-4-3',
            chapterId: 'wireframe',
            moduleId: 'wf-4',
            question: 'Welcher Begriff bezeichnet eine hervorgehobene Schaltfläche wie "Jetzt Ticket buchen" oder "Kostenlos anmelden"?',
            options: [
              { id: 'a', text: 'Call-to-Action', isCorrect: true, explanation: 'Exakt! Der Call-to-Action (CTA) fordert den Nutzer gezielt zur gewünschten Hauptaktion auf.' },
              { id: 'b', text: 'Breadcrumb', isCorrect: false, explanation: 'Breadcrumb bezeichnet die hierarchische Pfadnavigation.' },
              { id: 'c', text: 'Hamburger-Menü', isCorrect: false, explanation: 'Das Hamburger-Menü bündelt Navigationspunkte auf kleinen Bildschirmen.' },
              { id: 'd', text: 'Hero-Teaser', isCorrect: false, explanation: 'Der Hero-Bereich ist die große Einstiegsbühne im oberen Seitenbereich.' }
            ]
          }
        ]
      },
      {
        id: 'wf-5',
        chapterId: 'wireframe',
        title: 'Zielgruppen & Sinus-Milieus',
        shortDesc: 'Wer nutzt das Produkt? Lebenswelten & Persona-Grundlagen',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-wf-6',
            title: 'Sinus-Milieus: Die 10 Lebenswelten',
            coreConcept: 'Zielgruppen nach Werten und Lebensstil statt nur Alter/Einkommen.',
            bulletPoints: [
              'Bürgerliche Mitte: Der gesicherte Mainstream (Harmonie & Sicherheit).',
              'Performer: Die Effizienz-Elite (Erfolg, Technik, Networking).',
              'Expeditive: Die kreative Avantgarde (Individualismus, Grenzen suchen).',
              'Traditionelle: Die Bewahrer (Sicherheit, Ordnung, Tradition).',
              'Warum wichtig? Design muss zur Lebenswelt passen (z. B. Technik-Fokus vs. Gemütlichkeit).'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-wf-5-1',
            chapterId: 'wireframe',
            moduleId: 'wf-5',
            question: 'Warum sind Sinus-Milieus für die Designkonzeption aussagekräftiger als rein demografische Daten (wie Alter)?',
            options: [
              { id: 'a', text: 'Weil sie Werte, Einstellungen und Lebensstile realitätsnah bündeln', isCorrect: true, explanation: 'Richtig! Zwei gleich alte Menschen können völlig unterschiedliche Lebenswelten und Designgeschmäcker haben.' },
              { id: 'b', text: 'Weil sie bei öffentlichen Medienaufträgen gesetzlich vorgeschrieben sind', isCorrect: false, explanation: 'Sinus-Milieus sind ein bewährtes Marktforschungsmodell, keine gesetzliche Pflicht.' },
              { id: 'c', text: 'Weil sie exakte Kaufhistorien einzelner Kunden im Online-Shop abbilden', isCorrect: false, explanation: 'Sinus-Milieus gruppieren gesellschaftliche Lebenswelten, nicht individuelle Kaufdaten.' },
              { id: 'd', text: 'Weil sie automatisch verbindliche Farb- und Schriftvorgaben liefern', isCorrect: false, explanation: 'Sie liefern Orientierung für die Konzeption, ersetzen aber nicht die kreative Gestaltung.' }
            ]
          },
          {
            id: 'q-wf-5-2',
            chapterId: 'wireframe',
            moduleId: 'wf-5',
            question: 'Welches Sinus-Milieu wird als ehrgeizige, leistungsorientierte Effizienz-Elite mit hoher Technik-Affinität beschrieben?',
            options: [
              { id: 'a', text: 'Performer', isCorrect: true, explanation: 'Richtig! Performer zeichnen sich durch Erfolgsstreben, digitale Dynamik und Effizienz aus.' },
              { id: 'b', text: 'Traditionelle', isCorrect: false, explanation: 'Traditionelle legen Fokus auf Sicherheit und Ordnung.' },
              { id: 'c', text: 'Prekäre', isCorrect: false, explanation: 'Prekäre sind um Teilhabe bemühte Milieus mit Orientierungsdruck.' },
              { id: 'd', text: 'Bürgerliche Mitte', isCorrect: false, explanation: 'Die Bürgerliche Mitte ist der gesicherte Mainstream.' }
            ]
          },
          {
            id: 'q-wf-5-3',
            chapterId: 'wireframe',
            moduleId: 'wf-5',
            question: 'Was versteht man im Design-Kontext unter einer "Persona"?',
            options: [
              { id: 'a', text: 'Eine fiktive, datenbasierte Stellvertreterin einer Zielgruppe mit Zielen und Bedürfnissen', isCorrect: true, explanation: 'Exakt! Personas verleihen anonymen Zielgruppendaten ein konkretes Gesicht mit Zielen und Schmerzpunkten.' },
              { id: 'b', text: 'Eine reale Bestandskundin, die das Projekt vertraglich abnimmt und freigibt', isCorrect: false, explanation: 'Personas sind fiktive Modellnutzer, keine konkreten Vertragspartner.' },
              { id: 'c', text: 'Ein internes Benutzerkonto mit erweiterten Rechten im Content-Management-System', isCorrect: false, explanation: 'Das bezeichnet eine technische Systemrolle, keine Zielgruppen-Persona.' },
              { id: 'd', text: 'Eine visuelle Stilvorlage zur Festlegung von Hausfarben, Schriften und Bildsprache', isCorrect: false, explanation: 'Das ist ein Styleguide oder Moodboard, keine Persona.' }
            ],
            merksatz: 'Personas übersetzen Zielgruppenstatistiken in anschauliche Nutzerprofile mit konkreten Bedürfnissen.'
          }
        ]
      },
      {
        id: 'wf-6',
        chapterId: 'wireframe',
        title: 'Styleguide & Corporate Design',
        shortDesc: 'Komponenten, Farben & Branding-Regeln für die Konsistenz',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-wf-7',
            title: 'Was ist ein Styleguide?',
            coreConcept: 'Ein zentrales Dokument, das visuelle Regeln für ein Produkt definiert.',
            bulletPoints: [
              'Corporate Identity (CI): Die gesamte Persönlichkeit eines Unternehmens.',
              'Corporate Design (CD): Das visuelle Erscheinungsbild (Logo, Hausfarbe, Schrift).',
              'Bestandteile: Farbpalette (HEX/RGB), Typografie (Fonts, Größen), Ikonografie.',
              'Component Library: Vordefinierte Buttons, Formulare und Navigations-Elemente.',
              'Ziel: Konsistenz über alle Seiten und Geräte hinweg.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-wf-6-1',
            chapterId: 'wireframe',
            moduleId: 'wf-6',
            question: 'Was ist der Hauptzweck eines Styleguides im Webdesign?',
            options: [
              { id: 'a', text: 'Die Sicherstellung visueller Konsistenz über alle Seiten und Kanäle', isCorrect: true, explanation: 'Richtig! Ein Styleguide sorgt dafür, dass Farben, Typografie und Komponenten einheitlich wirken.' },
              { id: 'b', text: 'Die automatische Generierung der serverseitigen Datenbankstruktur', isCorrect: false, explanation: 'Styleguides betreffen die visuelle Gestaltung, nicht die Backend-Architektur.' },
              { id: 'c', text: 'Die kaufmännische Kalkulation von Hosting- und Lizenzkosten', isCorrect: false, explanation: 'Kostenkalkulation gehört ins Projektmanagement, nicht in den Styleguide.' },
              { id: 'd', text: 'Die rechtliche Prüfung von Impressum, AGB und Datenschutzerklärung', isCorrect: false, explanation: 'Rechtsprüfung ist keine Aufgabe des visuellen Styleguides.' }
            ]
          },
          {
            id: 'q-wf-6-2',
            chapterId: 'wireframe',
            moduleId: 'wf-6',
            question: 'Welches Element ist ein zentraler Bestandteil des Corporate Designs (CD) eines Unternehmens?',
            options: [
              { id: 'a', text: 'Hausschrift, Farbpalette, Firmenlogo und Bildsprache', isCorrect: true, explanation: 'Richtig! Das CD umfasst das gesamte visuelle Erscheinungsbild eines Unternehmens.' },
              { id: 'b', text: 'Die Gehaltsstruktur der Angestellten', isCorrect: false, explanation: 'Das gehört zum Personalwesen.' },
              { id: 'c', text: 'Die Netzspannung in den Büroräumen', isCorrect: false, explanation: 'Das gehört zur Elektrotechnik.' },
              { id: 'd', text: 'Der Mietvertrag der Firmenzentrale', isCorrect: false, explanation: 'Das gehört zur Gebäudeverwaltung.' }
            ]
          },
          {
            id: 'q-wf-6-3',
            chapterId: 'wireframe',
            moduleId: 'wf-6',
            question: 'Was unterscheidet eine "Component Library" in UI-Design-Tools (wie Figma) von einem reinen PDF-Styleguide?',
            options: [
              { id: 'a', text: 'Sie bietet wiederverwendbare UI-Bausteine, die sich zentral für alle Screens aktualisieren lassen', isCorrect: true, explanation: 'Exakt! Änderungen an Komponenten (z. B. Buttons, Formularfeldern) in der Library aktualisieren automatisch alle verknüpften Instanzen.' },
              { id: 'b', text: 'Sie dokumentiert ausschließlich statische Druckfarben und Rastermaße für Print-Publikationen', isCorrect: false, explanation: 'UI-Component-Libraries sind speziell für dynamische digitale Oberflächen gedacht.' },
              { id: 'c', text: 'Sie ersetzt die gesamte Frontend-Programmierung und erzeugt direkt fertige Datenbankabfragen', isCorrect: false, explanation: 'Component Libraries unterstützen Design und Übergabe, ersetzen aber keine Backend-Logik.' },
              { id: 'd', text: 'Sie speichert lediglich einzelne Bild- und Audio-Assets ohne Verknüpfung zu Layout-Instanzen', isCorrect: false, explanation: 'Der Kernvorteil liegt gerade in verknüpften, zentral pflegbaren Interface-Komponenten.' }
            ],
            merksatz: 'Component Libraries bündeln wiederverwendbare UI-Elemente für maximale Effizienz und Konsistenz.'
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
      { task: 'Definition Prototyp & Klickdummy', detail: 'Ein Prototyp macht ein Konzept erlebbar, indem er Funktionen und Abläufe simuliert. Der Klickdummy ist die einfachste Form.' },
      { task: 'Horizontal vs. Vertikal', detail: 'Horizontal zeigt viele Bereiche oberflächlich; Vertikal zeigt eine Kernfunktion in voller Tiefe.' },
      { task: 'Ablauf Usability-Test', detail: '5 Schritte: Aufgabe stellen, Beobachten, Lautes Denken, Protokollieren, Optimieren.' },
      { task: 'Warum Prototypen?', detail: 'Sie sparen Kosten (1-10-100 Regel), da Fehler vor der Programmierung behoben werden.' },
      { task: 'Tools für Prototypen', detail: 'Gängige Werkzeuge: Figma, ProtoPie, InVision, Axure RP.' }
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
              { id: 'a', text: 'Ein Mockup verzichtet noch auf Farben und Schriften, während ein Prototyp sie ergänzt', isCorrect: false, explanation: 'Mockups enthalten bereits volle Farben, Schriften und visuelles Feindesign.' },
              { id: 'b', text: 'Ein Prototyp ist interaktiv und simuliert Abläufe, während ein Mockup statisch bleibt', isCorrect: true, explanation: 'Richtig! Das ist der wesentliche Prüfungsunterschied zwischen Prototyp und Mockup.' },
              { id: 'c', text: 'Ein Prototyp entsteht ausschließlich als Papierskizze, ein Mockup immer im UI-Tool', isCorrect: false, explanation: 'Papierskizzen sind meist Low-Fi-Wireframes; Prototypen sind oft digital und klickbar.' },
              { id: 'd', text: 'Ein Mockup besteht aus lauffähigem Frontend-Code, ein Prototyp nur aus statischen Bildern', isCorrect: false, explanation: 'Genau umgekehrt: Mockups sind statische Entwürfe, Prototypen simulieren die Bedienung.' }
            ]
          },
          {
            id: 'q-proto-1-2',
            chapterId: 'prototype',
            moduleId: 'proto-1',
            question: 'Was versteht man unter einem "Klickdummy"?',
            options: [
              { id: 'a', text: 'Ein einfacher Prototyp mit klickbar verknüpften Screens ohne echte Backend-Logik', isCorrect: true, explanation: 'Exakt! Ein Klickdummy simuliert den Klickpfad über Hotspots schnell und wirkungsvoll ohne Datenbank.' },
              { id: 'b', text: 'Ein automatisiertes Testskript zur Lastprüfung von Webservern unter Volllast', isCorrect: false, explanation: 'Das beschreibt Last- bzw. Performance-Tests, keinen Klickdummy.' },
              { id: 'c', text: 'Ein vollständig programmiertes Frontend-Modul mit angebundener Testdatenbank', isCorrect: false, explanation: 'Ein Klickdummy kommt gerade ohne echte Programmierung und Datenbank aus.' },
              { id: 'd', text: 'Ein statischer Stil-Entwurf zur Freigabe von Farbpalette und Hausschrift', isCorrect: false, explanation: 'Das ist ein Mockup oder Style Tile, kein interaktiver Klickdummy.' }
            ]
          },
          {
            id: 'q-proto-1-3',
            chapterId: 'prototype',
            moduleId: 'proto-1',
            question: 'Warum gilt im Medienprojekt die Regel: "Je früher Prototypen getestet werden, desto günstiger das Projekt"?',
            options: [
              { id: 'a', text: 'Weil Konzept- und Logikfehler rasch behoben werden, bevor teurer Code entsteht', isCorrect: true, explanation: 'Richtig! Nach der 1-10-100-Regel der Fehlerkosten steigen Änderungskosten im laufenden Projekt stark an.' },
              { id: 'b', text: 'Weil getestete Prototypen unverändert als fertiges Produkt ausgeliefert werden', isCorrect: false, explanation: 'Ein Prototyp dient der Überprüfung und ersetzt nicht die produktive Umsetzung.' },
              { id: 'c', text: 'Weil durch frühe Tests die laufenden Server- und Lizenzkosten komplett entfallen', isCorrect: false, explanation: 'Betriebskosten bleiben bestehen; der Spareffekt liegt in vermiedener Nacharbeit.' },
              { id: 'd', text: 'Weil nach einem Prototypen-Test keine Qualitäts- oder Barrierefreiheitsprüfung nötig ist', isCorrect: false, explanation: 'Abschluss- und Barrierefreiheitstests bleiben auch bei frühen Prototypen unverzichtbar.' }
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
              { id: 'a', text: 'Horizontaler Prototyp', isCorrect: true, explanation: 'Richtig! Ein horizontaler Prototyp bildet die Breite (viele Bereiche/Menüs) ab, aber ohne tiefe Einzel-Funktionen.' },
              { id: 'b', text: 'Vertikaler Prototyp', isCorrect: false, explanation: 'Ein vertikaler Prototyp bildet eine Einzelfunktion in voller Tiefe ab.' },
              { id: 'c', text: 'Evolutionärer Prototyp', isCorrect: false, explanation: 'Ein evolutionärer Prototyp wird schrittweise zum Endprodukt weiterentwickelt.' },
              { id: 'd', text: 'Technischer Funktionsprototyp', isCorrect: false, explanation: 'Hier werden keine tiefen technischen Funktionen umgesetzt, sondern nur die Navigationsbreite.' }
            ]
          },
          {
            id: 'q-proto-2-3',
            chapterId: 'prototype',
            moduleId: 'proto-2',
            question: 'Wann entscheidet sich ein Konzeptionsteam typischerweise für einen vertikalen Prototyp?',
            options: [
              { id: 'a', text: 'Wenn ein komplexer Kern-Workflow vorab in voller Tiefe getestet werden muss', isCorrect: true, explanation: 'Exakt! Bei kritischen Abläufen (z. B. Konfigurator oder Zahlungsdialog) minimiert ein vertikaler Prototyp das Risiko.' },
              { id: 'b', text: 'Wenn der Auftraggeber zunächst nur einen Überblick über die Startseite wünscht', isCorrect: false, explanation: 'Für einen reinen visuellen Eindruck der Startseite genügt ein statisches Mockup.' },
              { id: 'c', text: 'Wenn möglichst alle Unterseiten ohne funktionale Detailtiefe gezeigt werden sollen', isCorrect: false, explanation: 'Das ist genau der Anwendungsfall eines horizontalen Prototyps.' },
              { id: 'd', text: 'Wenn das gesamte Projekt bereits abgeschlossen ist und archiviert werden soll', isCorrect: false, explanation: 'Prototypen werden vor der Umsetzung zum Testen eingesetzt, nicht bei der Archivierung.' }
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
              { id: 'a', text: 'Er beobachtet neutral, greift nicht ein und ermutigt zum lauten Denken', isCorrect: true, explanation: 'Richtig! Durch „Think Aloud“ und unbeeinflusstes Handeln entstehen ehrliche Usability-Erkenntnisse.' },
              { id: 'b', text: 'Er führt alle Klickschritte vorab vor, damit keine Bedienfehler auftreten', isCorrect: false, explanation: 'Vorführen beeinflusst die Testperson und macht den Usability-Test wertlos.' },
              { id: 'c', text: 'Er rechtfertigt gestalterische Entscheidungen sofort bei kritischen Fragen', isCorrect: false, explanation: 'Das Verteidigen des Entwurfs hemmt ehrliches Feedback der Testpersonen.' },
              { id: 'd', text: 'Er verlässt während der gesamten Aufgabe den Raum und wertet nur Klickdaten aus', isCorrect: false, explanation: 'Aktives Beobachten und Protokollieren von Reaktionen sind im Test unverzichtbar.' }
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
      { task: 'Die 4 Angriffsarten', detail: 'Unterscheide Phishing (Mail/Web), Smishing (SMS), Vishing (Anruf) und Pharming (DNS-Umleitung).' },
      { task: 'Fake-Shop Merkmale', detail: 'Achte auf unrealistische Preise, fehlendes Impressum und erzwungene Vorkasse.' },
      { task: 'Social Engineering & CEO-Fraud', detail: 'Manipulation von Menschen durch Autorität, Zeitdruck oder Hilfsbereitschaft.' },
      { task: 'Malware-Arten', detail: 'Kenne Virus (Wirt), Wurm (Netzwerk), Trojaner (Tarnung), Ransomware (Erpressung) und Spyware (Spionage).' },
      { task: 'Datenschutz vs. Datensicherheit', detail: 'Schutz der Person/Privatsphäre (Datenschutz) vs. Technischer Schutz vor Verlust/Angriff (Datensicherheit).' }
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
            title: 'Die Phishing-Angriffsarten auf einen Blick',
            coreConcept: 'Gefälschte Kommunikation zur Datenabfrage.',
            bulletPoints: [
              'Phishing: Betrug über gefälschte E-Mails oder Fake-Webseiten zur Erbeutung von Passwörtern oder Bankdaten.',
              'Spear-Phishing: Ein gezielter, maßgeschneiderter Phishing-Angriff auf eine bestimmte Person oder Firma mit vorab recherchierten Details.',
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
              { id: 'a', text: 'Smishing', isCorrect: true, explanation: 'Richtig! Phishing per SMS bezeichnet man als Smishing (SMS-Phishing).' },
              { id: 'b', text: 'Vishing', isCorrect: false, explanation: 'Vishing erfolgt per Sprachanruf (Voice Phishing).' },
              { id: 'c', text: 'Pharming', isCorrect: false, explanation: 'Pharming manipuliert DNS-Einträge oder Weiterleitungen.' },
              { id: 'd', text: 'Spoofing', isCorrect: false, explanation: 'Spoofing bezeichnet das Fälschen von Absender- oder Netzwerkidentitäten.' }
            ]
          },
          {
            id: 'q-sec-1-2',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Was unterscheidet Pharming von klassischem E-Mail-Phishing?',
            options: [
              { id: 'a', text: 'Pharming zielt ausschließlich auf mobile Endgeräte und Messaging-Apps ab', isCorrect: false, explanation: 'Falsch: Pharming betrifft DNS-Auflösung und Router unabhängig vom Gerätetyp.' },
              { id: 'b', text: 'Beim Pharming wird selbst eine korrekt eingegebene URL auf eine gefälschte Seite umgeleitet', isCorrect: true, explanation: 'Genau! Pharming manipuliert DNS-Einträge oder Router, sodass Nutzer trotz richtiger URL auf einer Fälschung landen.' },
              { id: 'c', text: 'Pharming verbreitet sich ausschließlich über kompromittierte Dateianhänge in Serienmails', isCorrect: false, explanation: 'Das beschreibt klassisches E-Mail-Phishing bzw. Malware-Versand.' },
              { id: 'd', text: 'Beide Begriffe bezeichnen exakt denselben Angriff über manipulierte Hyperlinks in E-Mails', isCorrect: false, explanation: 'Pharming ist eine technische Umleitung auf DNS-Ebene, Phishing basiert auf Köder-Nachrichten.' }
            ]
          },
          {
            id: 'q-sec-1-3',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Ein Betrüger ruft einen Mitarbeiter an, gibt sich als IT-Support der eigenen Firma aus und fordert das Passwort zur "Systemwartung". Wie heißt diese Betrugsform?',
            options: [
              { id: 'a', text: 'Vishing', isCorrect: true, explanation: 'Richtig! Telefonisches Abfischen sensibler Daten nennt sich Vishing (Voice Phishing).' },
              { id: 'b', text: 'Smishing', isCorrect: false, explanation: 'Smishing erfolgt per SMS-Nachricht.' },
              { id: 'c', text: 'Pharming', isCorrect: false, explanation: 'Pharming leitet Internetadressen technisch auf gefälschte Server um.' },
              { id: 'd', text: 'Keylogging', isCorrect: false, explanation: 'Keylogging protokolliert heimlich Tastatureingaben per Software oder Hardware.' }
            ]
          },
          {
            id: 'q-sec-1-4',
            chapterId: 'security',
            moduleId: 'sec-1',
            question: 'Was versteht man unter "Spear-Phishing"?',
            options: [
              { id: 'a', text: 'Einen gezielten, individuell recherchierten Phishing-Angriff auf bestimmte Personen oder Firmen', isCorrect: true, explanation: 'Exakt! Im Gegensatz zu Massen-Phishing nutzen Angreifer persönliche Details des Ziels.' },
              { id: 'b', text: 'Einen automatisierten Angriff über infizierte Wechseldatenträger wie externe USB-Sticks', isCorrect: false, explanation: 'Das bezeichnet eher Baiting über physische Datenträger, nicht Spear-Phishing.' },
              { id: 'c', text: 'Einen breit gestreuten Massenversand identischer Betrugsmails an Millionen Adressen', isCorrect: false, explanation: 'Das ist klassisches Massen-Phishing, gerade nicht das gezielte Spear-Phishing.' },
              { id: 'd', text: 'Einen vorbeugenden Sicherheitstest durch interne Virenscanner auf Unternehmensservern', isCorrect: false, explanation: 'Spear-Phishing ist ein gezielter Angriff, kein interner Virenscan.' }
            ]
          }
        ],
        level2QuizQuestions: [
          {
            id: 'l2-sec-1-1',
            chapterId: 'security',
            moduleId: 'sec-1',
            scenario: 'Forensischer Vorfall: Ein Mitarbeiter gibt im Browser die korrekte, vertraute Bank-URL www.hausbank-secure.de per Hand ein, landet jedoch auf einer täuschend echten Betrügerseite, weil der lokale Router manipuliert wurde.',
            question: 'Welcher spezifische Cyber-Angriffsvektor liegt hier nach IHK-Definition exakt vor?',
            options: [
              {
                id: 'a',
                text: 'Pharming – Durch Manipulation der Namensauflösung (DNS-Spoofing oder Host-Datei) wird der Datenverkehr trotz korrekter URL-Eingabe auf einen betrügerischen Server umgeleitet.',
                isCorrect: true,
                explanation: 'Genau! Pharming leitet Anfragen auf DNS- oder Routerebene um, sodass die echte Adresse den falschen Server ansteuert.'
              },
              {
                id: 'b',
                text: 'Smishing – Der Angriff erfolgte primär über eine verschlüsselte Kurznachricht, die im Hintergrund automatisiert Sicherheitszertifikate auf dem mobilen Endgerät überschrieben hat.',
                isCorrect: false,
                explanation: 'Smishing ist SMS-Phishing, keine DNS-Umleitung.',
                trapExplanation: 'Verlockende Begriffsverwechslung: Smishing nutzt SMS-Nachrichten; die Umleitung trotz manueller Eingabe der echten Domain im Browser ist die klassische Definition von Pharming.'
              },
              {
                id: 'c',
                text: 'Vishing – Ein Telefon-Betrüger hat sich über Voice-Over-IP in die Sprachschnittstelle der Firewall eingewählt und das SSL-Zertifikat des Webservers entwertet.',
                isCorrect: false,
                explanation: 'Vishing ist Betrug per Telefon/Sprachanruf.',
                trapExplanation: 'Verlockende Scheintechnik: Vishing ist Social Engineering per Telefon (z. B. falscher Support); Manipulation der Domainauflösung ist Pharming.'
              },
              {
                id: 'd',
                text: 'Typosquatting – Der Nutzer hat sich beim Eintippen der Bank-Domain unbemerkt vertippt und ist auf einer absichtlich registrierten Tippfehler-Domain gelandet.',
                isCorrect: false,
                explanation: 'Das Szenario nennt ausdrücklich die korrekte URL-Eingabe.',
                trapExplanation: 'Prüfungsfalle: Das Szenario betont explizit, dass die korrekte URL eingetippt wurde! Bei Typosquatting nutzt der Betrüger Tippfehler (z. B. amaz0n.de).'
              }
            ],
            examTip: 'IHK-Unterscheidung: Phishing = Ködern per Nachricht/Link; Pharming = Technische Manipulation der Namensauflösung (DNS)!'
          },
          {
            id: 'l2-sec-1-2',
            chapterId: 'security',
            moduleId: 'sec-1',
            scenario: 'Social Engineering: Eine Mitarbeiterin im Rechnungswesen erhält eine E-Mail mit der internen Signatur des Vorstandsvorsitzenden. Sie wird angewiesen, unter strengster Geheimhaltung sofort 85.000 € für eine angebliche Firmenübernahme auf ein Auslandskonto anzuweisen.',
            question: 'Wie klassifiziert die IHK diesen Cyber-Angriff und welche Schutzmaßnahme ist im Unternehmensprozess zwingend erforderlich?',
            options: [
              {
                id: 'a',
                text: 'CEO-Fraud (Chef-Masche) – Wirksamer Schutz erfordert ein verbindliches Vier-Augen-Prinzip und telefonische Rückversicherung über vorab bekannte interne Kanäle bei ungewöhnlichen Überweisungen.',
                isCorrect: true,
                explanation: 'Perfekt! CEO-Fraud nutzt Autoritätsgläubigkeit aus und kann nur durch organisatorische Freigabeprozesse verhindert werden.'
              },
              {
                id: 'b',
                text: 'DDoS-Angriff – Die Buchhaltungsabteilung muss unverzüglich die Netzwerkkabel aller Arbeitsplatzrechner trennen und die Bandbreite des Firmenanschlusses verdoppeln.',
                isCorrect: false,
                explanation: 'DDoS ist eine technische Serverüberlastung.',
                trapExplanation: 'Verlockende Abkürzungsfalle: DDoS ist eine technische Serverüberlastung durch Datenmüll; hier liegt zwischenmenschliche Manipulation (Social Engineering / CEO-Fraud) vor.'
              },
              {
                id: 'c',
                text: 'Cross-Site-Scripting – Es müssen sämtliche Datenbankabfragen der Finanzbuchhaltung mit parametrisierten SQL-Statements gegen unbefugte Skriptinjektionen gehärtet werden.',
                isCorrect: false,
                explanation: 'XSS ist eine Schwachstelle in Web-Apps, kein Betrugsdelikt.',
                trapExplanation: 'Verlockende Entwicklerfalle: XSS ist eine Web-Sicherheitslücke im Frontend; gegen CEO-Fraud helfen organisatorische Freigabeprozesse (Vier-Augen-Prinzip).'
              },
              {
                id: 'd',
                text: 'Ransomware – Die Festplatten aller Firmenrechner wurden durch die E-Mail bereits asymmetrisch verschlüsselt und bedürfen eines kostenpflichtigen Entschlüsselungs-Keys.',
                isCorrect: false,
                explanation: 'Es liegt kein Schadprogramm/Kryptotrojaner vor.',
                trapExplanation: 'Verlockende Malware-Falle: Ransomware erpresst Lösegeld durch Datenverschlüsselung; hier versucht der Angreifer die Mitarbeiterin durch psychologischen Druck zur Überweisung zu bewegen.'
              }
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
              { id: 'a', text: 'Zahlung per Rechnung oder über Zahlungsdienste mit Käuferschutz', isCorrect: false, explanation: 'Das sind in der Regel kundenfreundliche, sicherere Zahlungsarten.' },
              { id: 'b', text: 'Ein vollständiges, im Handelsregister nachprüfbares Impressum', isCorrect: false, explanation: 'Ein prüfbares Impressum spricht für einen seriösen Anbieter.' },
              { id: 'c', text: 'Ausschließlich Vorkasse per Überweisung und fehlendes Impressum', isCorrect: true, explanation: 'Richtig! Fake-Shops erzwingen unwiderrufliche Vorab-Überweisungen und verschleiern ihre Identität.' },
              { id: 'd', text: 'Eine mobil optimierte Darstellung mit verschlüsselter Verbindung', isCorrect: false, explanation: 'Auch betrügerische Seiten nutzen oft HTTPS und responsive Vorlagen.' }
            ]
          },
          {
            id: 'q-sec-2-2',
            chapterId: 'security',
            moduleId: 'sec-2',
            question: 'Was ist das Kernprinzip von "Social Engineering"?',
            options: [
              { id: 'a', text: 'Das gezielte Ausnutzen menschlicher Eigenschaften wie Vertrauen, Angst oder Hilfsbereitschaft', isCorrect: true, explanation: 'Genau! Nicht primär die Software, sondern der Mensch wird psychologisch manipuliert.' },
              { id: 'b', text: 'Die systematische Analyse öffentlicher Unternehmensprofile zur Reichweitensteigerung', isCorrect: false, explanation: 'Das gehört zum Social Media Marketing, nicht zu Social Engineering.' },
              { id: 'c', text: 'Das automatisierte Durchprobieren tausender Passwortkombinationen an einem Login-Formular', isCorrect: false, explanation: 'Das beschreibt einen Brute-Force-Angriff, kein Social Engineering.' },
              { id: 'd', text: 'Das Einschleusen schadhafter Datenbankbefehle über ungesicherte Eingabefelder einer Website', isCorrect: false, explanation: 'Das ist eine SQL-Injection, ein technischer Angriff auf Code.' }
            ]
          },
          {
            id: 'q-sec-2-3',
            chapterId: 'security',
            moduleId: 'sec-2',
            question: 'Eine gefälschte E-Mail im Namen der Geschäftsführung ordnet eine sofortige vertrauliche Blitzüberweisung an. Wie nennt man diesen Betrug?',
            options: [
              { id: 'a', text: 'CEO-Fraud', isCorrect: true, explanation: 'Richtig! CEO-Fraud („Chef-Masche“) nutzt vorgetäuschte Autorität, Zeitdruck und Geheimhaltung.' },
              { id: 'b', text: 'Pharming', isCorrect: false, explanation: 'Pharming leitet Webadressen über manipulierte DNS-Einträge um.' },
              { id: 'c', text: 'Ransomware', isCorrect: false, explanation: 'Ransomware verschlüsselt Dateien zur Lösegelderpressung.' },
              { id: 'd', text: 'Brute-Force-Attacke', isCorrect: false, explanation: 'Brute-Force probiert systematisch Zugangsdaten durch.' }
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
          },
          {
            id: 'n-sec-7',
            title: 'Netzwerk-Gefahren & Schutz: DDoS, MitM & HTTPS',
            coreConcept: 'Wie Webanwendungen sicher übertragen und geschützt werden.',
            bulletPoints: [
              'DDoS (Distributed Denial of Service): Ein Server wird durch Tausende gekaperte Rechner (Botnetz) mit Schein-Anfragen überlastet, bis Websites zusammenbrechen.',
              'Man-in-the-Middle (MitM): Ein Angreifer klinkt sich unbemerkt in die Übertragung zwischen Browser und Server ein (z. B. im offenen WLAN), um Passwörter oder Zahlungsdaten mitzulesen.',
              'HTTPS / TLS: Verschlüsselt den gesamten Datenverkehr asymmetrisch mit Zertifikaten. Pflicht für jedes Login- und Kontaktformular!'
            ],
            example: 'Ohne HTTPS kann jeder im selben Café-WLAN unverschlüsselte Formular-Eingaben im Klartext abfangen.'
          }
        ],
        quizQuestions: [
          {
            id: 'q-sec-3-1',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Was ist der Unterschied zwischen Datenschutz und Datensicherheit?',
            options: [
              { id: 'a', text: 'Beide Begriffe sind in der DSGVO Synonyme für den technischen Schutz digitaler Daten', isCorrect: false, explanation: 'Klassischer Fehler: Datenschutz und Datensicherheit verfolgen unterschiedliche Schutzziele.' },
              { id: 'b', text: 'Datenschutz schützt personenbezogene Daten; Datensicherheit schützt Daten generell vor Verlust oder Zugriff', isCorrect: true, explanation: 'Exakt! Das ist die zentrale IHK-Abgrenzung zwischen Datenschutz (Persönlichkeitsrecht) und Datensicherheit (technisch-organisatorischer Schutz aller Daten).' },
              { id: 'c', text: 'Datensicherheit gilt ausschließlich für IT-Dienstleister, während Datenschutz nur Behörden betrifft', isCorrect: false, explanation: 'Beide Bereiche gelten für alle Unternehmen und Organisationen.' },
              { id: 'd', text: 'Datenschutz umfasst technische Maßnahmen wie Backups, Datensicherheit ausschließlich Gesetze', isCorrect: false, explanation: 'Genau umgekehrt: Backups und Verschlüsselung sind Maßnahmen der Datensicherheit.' }
            ],
            merksatz: 'Datenschutz = Schutz der Person/Privatsphäre. Datensicherheit = Technischer/organisatorischer Schutz aller Daten.'
          },
          {
            id: 'q-sec-3-2',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Ein Schadprogramm tarnt sich als nützliche Software (z.B. kostenloses Schriftenpaket), schleust aber unbemerkt Schadcode ein. Um welchen Typ handelt es sich?',
            options: [
              { id: 'a', text: 'Trojaner', isCorrect: true, explanation: 'Richtig! Ein Trojanisches Pferd (Trojaner) tarnt sich als harmlose oder nützliche Anwendung.' },
              { id: 'b', text: 'Computervirus', isCorrect: false, explanation: 'Ein Virus infiziert bestehende Wirtsdateien und verbreitet sich über deren Ausführung.' },
              { id: 'c', text: 'Netzwerkwurm', isCorrect: false, explanation: 'Ein Wurm verbreitet sich selbstständig über Netzwerke und Sicherheitslücken.' },
              { id: 'd', text: 'Rootkit', isCorrect: false, explanation: 'Ein Rootkit verbirgt bereits eingedrungene Schadsoftware tief im Betriebssystem.' }
            ]
          },
          {
            id: 'q-sec-3-3',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Welche Schadsoftware verschlüsselt Festplatten eines Unternehmens und erpresst Bitcoins für den Freischalt-Schlüssel?',
            options: [
              { id: 'a', text: 'Ransomware', isCorrect: true, explanation: 'Perfekt! Ransomware (Erpressungs-Trojaner) verschlüsselt Daten für Lösegeld. Nur saubere Offline-Backups schützen zuverlässig.' },
              { id: 'b', text: 'Adware', isCorrect: false, explanation: 'Adware blendet unerwünschte Werbung ein.' },
              { id: 'c', text: 'Spyware', isCorrect: false, explanation: 'Spyware späht heimlich Nutzerdaten und Aktivitäten aus, verschlüsselt aber nicht zur Erpressung.' },
              { id: 'd', text: 'Scareware', isCorrect: false, explanation: 'Scareware erzeugt falsche Warnmeldungen, um Opfer zum Kauf unnötiger Software zu drängen.' }
            ]
          },
          {
            id: 'q-sec-3-4',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Ein Webshop ist plötzlich nicht mehr erreichbar, weil Tausende fremde Rechner gleichzeitig den Server mit Datenanfragen fluten. Um welche Angriffsart handelt es sich?',
            options: [
              { id: 'a', text: 'DDoS-Angriff', isCorrect: true, explanation: 'Richtig! Bei einem Distributed-Denial-of-Service-Angriff überlasten massenhafte Anfragen die Serverressourcen.' },
              { id: 'b', text: 'SQL-Injection', isCorrect: false, explanation: 'Bei einer SQL-Injection wird schadhafter Datenbankcode über Eingabefelder eingeschleust.' },
              { id: 'c', text: 'Man-in-the-Middle', isCorrect: false, explanation: 'Dabei schaltet sich ein Angreifer heimlich zwischen zwei Kommunikationspartner.' },
              { id: 'd', text: 'Cross-Site-Scripting', isCorrect: false, explanation: 'Bei XSS wird schadhafter Skriptcode in vertrauenswürdige Webseiten eingeschleust.' }
            ]
          },
          {
            id: 'q-sec-3-5',
            chapterId: 'security',
            moduleId: 'sec-3',
            question: 'Warum ist die Verschlüsselung über HTTPS (TLS/SSL) für Webformulare rechtlich und technisch zwingend erforderlich?',
            options: [
              { id: 'a', text: 'Sie schützt Daten beim Transport vor dem Mitlesen durch Dritte und prüft die Echtheit', isCorrect: true, explanation: 'Exakt! HTTPS verhindert Man-in-the-Middle-Angriffe auf dem Übertragungsweg und sichert Authentizität.' },
              { id: 'b', text: 'Sie verschlüsselt dauerhaft alle gespeicherten Datensätze innerhalb der Unternehmensdatenbank', isCorrect: false, explanation: 'HTTPS schützt den Transportweg, nicht automatisch die dauerhafte Speicherung auf der Festplatte.' },
              { id: 'c', text: 'Sie verhindert zuverlässig, dass Nutzer schwache Passwörter im Formular eingeben können', isCorrect: false, explanation: 'Passwortregeln werden durch Validierung erzwungen, nicht durch Transportverschlüsselung.' },
              { id: 'd', text: 'Sie macht eine Datenschutzerklärung sowie Cookie-Einwilligungen auf der Website entbehrlich', isCorrect: false, explanation: 'HTTPS ist eine technische Sicherheitsmaßnahme und ersetzt keine rechtlichen Informationspflichten.' }
            ]
          }
        ]
      },
      {
        id: 'sec-4',
        chapterId: 'security',
        title: 'Rechtliche Grundlagen: Urheberrecht & Impressum',
        shortDesc: 'Wer darf was nutzen? Copyright, Lizenzen & Kennzeichnungspflicht',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-sec-8',
            title: 'Das Urheberrecht im Mediendesign',
            coreConcept: 'Schutz geistigen Eigentums ab dem Moment der Schöpfung.',
            bulletPoints: [
              'Entstehung: Automatisch mit der Schöpfung (kein © nötig in DE).',
              'Nutzungsrechte: Der Urheber kann anderen Rechte einräumen (Einfach vs. Ausschließend, Zeitlich, Räumlich, Inhaltlich begrenzt).',
              'Stockmedien: Lizenzen genau prüfen (z. B. Adobe Stock, Unsplash, CC-Lizenzen).',
              'Creative Commons (CC): CC-BY (Namensnennung), CC-ND (Keine Bearbeitung), CC-NC (Nicht kommerziell).'
            ],
            examFavorite: true
          },
          {
            id: 'n-sec-9',
            title: 'Impressumspflicht & Datenschutzerklärung',
            coreConcept: 'Rechtliche Transparenz im Web (TMG / TDDDG).',
            bulletPoints: [
              'Impressum: Pflicht für alle "geschäftsmäßigen" Telemedien (fast jede Website).',
              'Inhalt: Name, Anschrift, E-Mail, Vertretungsberechtigte, USt-IdNr.',
              'Datenschutzerklärung: Pflicht bei Erhebung personenbezogener Daten (Cookies, Formulare, Tracking).'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-sec-4-1',
            chapterId: 'security',
            moduleId: 'sec-4',
            question: 'Wann entsteht in Deutschland der Schutz durch das Urheberrecht?',
            options: [
              { id: 'a', text: 'Automatisch im Moment der Schöpfung des Werkes', isCorrect: true, explanation: 'Richtig! In Deutschland muss ein Werk nicht registriert werden; der Schutz entsteht mit der Schöpfung.' },
              { id: 'b', text: 'Erst wenn man ein ©-Zeichen daneben schreibt', isCorrect: false, explanation: 'Das © ist in Deutschland rechtlich nicht notwendig für den Schutz.' },
              { id: 'c', text: 'Erst nach der Anmeldung beim Patentamt', isCorrect: false, explanation: 'Patente schützen technische Erfindungen, nicht das Urheberrecht.' },
              { id: 'd', text: 'Nach 10 Jahren Veröffentlichung', isCorrect: false, explanation: 'Der Schutz beginnt sofort.' }
            ]
          },
          {
            id: 'q-sec-4-2',
            chapterId: 'security',
            moduleId: 'sec-4',
            question: 'Welche Angaben müssen nach deutschem Telemediengesetz (TDDDG/DDG) zwingend im Impressum einer geschäftsmäßigen Website stehen?',
            options: [
              { id: 'a', text: 'Name, ladungsfähige Anschrift, schnelle Kontaktdaten und Vertretungsberechtigte', isCorrect: true, explanation: 'Richtig! Angaben wie E-Mail/Telefon, Anschrift und Vertretung sichern rechtliche Transparenz.' },
              { id: 'b', text: 'Vollständige Liste aller aktuellen Kundenprojekte, Jahresumsätze und Mitarbeiterzahlen', isCorrect: false, explanation: 'Geschäftsgeheimnisse und Referenzen gehören nicht zu den Impressumspflichten.' },
              { id: 'c', text: 'Technischer Quellcode-Nachweis, verwendetes CMS sowie Name des Hosting-Rechenzentrums', isCorrect: false, explanation: 'Technische Systemdetails sind nicht Teil der Impressumspflicht.' },
              { id: 'd', text: 'Private Wohnanschriften und persönliche Durchwahlen aller beteiligten Angestellten', isCorrect: false, explanation: 'Gefordert ist die geschäftliche ladungsfähige Anschrift des Anbieters, keine Privatdaten von Angestellten.' }
            ]
          },
          {
            id: 'q-sec-4-3',
            chapterId: 'security',
            moduleId: 'sec-4',
            question: 'Was bedeutet die Creative-Commons-Lizenzangabe "CC BY-NC"?',
            options: [
              { id: 'a', text: 'Das Werk darf unter Namensnennung genutzt werden, aber nicht für kommerzielle Zwecke', isCorrect: true, explanation: 'Exakt! BY = Attribution (Namensnennung), NC = Non-Commercial (nicht kommerziell).' },
              { id: 'b', text: 'Das Werk darf kommerziell verwertet werden, solange der Urheber nicht verändert wird', isCorrect: false, explanation: 'NC schließt kommerzielle Nutzung ausdrücklich aus.' },
              { id: 'c', text: 'Das Werk ist gemeinfrei nutzbar und erfordert weder Namensnennung noch Einschränkungen', isCorrect: false, explanation: 'Gemeinfreiheit bzw. Public Domain entspricht CC0, nicht CC BY-NC.' },
              { id: 'd', text: 'Das Werk darf ausschließlich unverändert für redaktionelle Printmedien verwendet werden', isCorrect: false, explanation: 'Bearbeitungsverbot wäre ND (NoDerivatives), nicht NC.' }
            ],
            merksatz: 'Creative Commons: BY = Namensnennung, NC = Nicht Kommerziell, ND = Keine Bearbeitung, SA = Weitergabe unter gleichen Bedingungen.'
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
      { task: '4 Einschränkungsarten', detail: 'Gestalte für Visuelle, Auditive, Motorische und Kognitive Einschränkungen.' },
      { task: 'WCAG Prinzipien (POUR)', detail: 'Perceivable (Wahrnehmbar), Operable (Bedienbar), Understandable (Verständlich), Robust (Technisch sauber).' },
      { task: 'Konformitätsstufen (A, AA, AAA)', detail: 'Stufe AA ist der international empfohlene und oft gesetzlich geforderte Standard.' },
      { task: 'Semantisches HTML', detail: 'Nutze bedeutungstragende Tags wie <nav>, <main>, <header> statt reiner "Div-Suppe" für Screenreader.' },
      { task: 'Kontraste & Alt-Texte', detail: 'Mindestkontrast 4,5:1. Bilder für Blinde beschreiben; rein dekorative Bilder stumm schalten (alt="").' }
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
              { id: 'a', text: 'Ausschließlich blinde Nutzer, die Inhalte per Screenreader erfassen', isCorrect: false, explanation: 'Screenreader lesen Textinhalte vor; für blinde Nutzer ist bei Videos vor allem eine Audiodeskription wichtig.' },
              { id: 'b', text: 'Gehörlose Menschen sowie Nutzer in lauten oder stummen Umgebungen', isCorrect: true, explanation: 'Richtig! Barrierefreiheit hilft sowohl dauerhaft eingeschränkten als auch situativ betroffenen Nutzern.' },
              { id: 'c', text: 'Ausschließlich Suchmaschinen-Crawler zur automatischen Indexierung', isCorrect: false, explanation: 'Suchmaschinen profitieren zwar ebenfalls, der Hauptnutzen gilt aber Menschen.' },
              { id: 'd', text: 'Ausschließlich Personen mit motorischen Einschränkungen an der Maus', isCorrect: false, explanation: 'Motorisch eingeschränkten Nutzern hilft primär vollständige Tastaturbedienbarkeit.' }
            ]
          },
          {
            id: 'q-a11y-1-2',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            question: 'Warum profitieren Menschen mit ADHS oder kognitiven Einschränkungen besonders von ruhigen, reizarmen Benutzeroberflächen?',
            options: [
              { id: 'a', text: 'Weil Reizüberflutung, Animationen und unklare Textblöcke die Fokussierung erschweren', isCorrect: true, explanation: 'Richtig! Kognitive Barrierefreiheit erfordert klare visuelle Hierarchie und wenig visuelles Rauschen.' },
              { id: 'b', text: 'Weil ruhige Layouts technisch geringere Anforderungen an die Bildschirmauflösung stellen', isCorrect: false, explanation: 'Die Darstellung auf Displays ist nicht der Grund; es geht um kognitive Verarbeitung.' },
              { id: 'c', text: 'Weil Vorlesesoftware bei stark farbigen und animierten Layouts keine Inhalte erkennt', isCorrect: false, explanation: 'Screenreader werten die HTML-Semantik aus, unabhängig von der visuellen Reizdichte.' },
              { id: 'd', text: 'Weil die WCAG für kognitive Barrierefreiheit sämtliche Bilder und Icons untersagen', isCorrect: false, explanation: 'Klare Icons und unterstützende Bilder können das Verständnis sogar fördern.' }
            ]
          },
          {
            id: 'q-a11y-1-3',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            question: 'Welche Entwurfs-Entscheidung hilft motorisch eingeschränkten Menschen (z. B. mit Parkinson oder Handzittern)?',
            options: [
              { id: 'a', text: 'Großzügige Klickflächen ab 44×44 px und vollständige Tastaturbedienbarkeit', isCorrect: true, explanation: 'Perfekt! Große Touch-Flächen (mind. 44×44 px) und Tastaturnavigation ohne Mauszwang erhöhen die Treffsicherheit.' },
              { id: 'b', text: 'Kompakte Schaltflächen unter 16×16 px zur Vermeidung von langem Scrollen', isCorrect: false, explanation: 'Zu kleine Klickflächen führen bei Zittern oder ungenauer Steuerung sofort zu Fehlklicks.' },
              { id: 'c', text: 'Auslösen wichtiger Funktionen über komplexe Mehrfinger- und Drag-Gesten', isCorrect: false, explanation: 'Komplexe Gesten sind für motorisch eingeschränkte Nutzer oft nicht bedienbar.' },
              { id: 'd', text: 'Zeitlich streng begrenzte Formularsitzungen mit automatischem Logout', isCorrect: false, explanation: 'Knappe Zeitlimits benachteiligen Nutzer, die mehr Zeit für Eingaben benötigen.' }
            ]
          }
        ],
        level2QuizQuestions: [
          {
            id: 'l2-a11y-1-1',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            scenario: 'Barrierefreiheits-Audit: Eine Webagentur gestaltet einen Button für eine Online-Apotheke. Der Button hat hellgrauen Text (#999999) auf weißem Hintergrund (#FFFFFF) in 14px Schriftgröße. Der Kunde argumentiert, das wirke "besonders edel".',
            question: 'Wie beurteilt ein zertifizierter Mediengestalter diese Gestaltung anhand der Web Content Accessibility Guidelines (WCAG 2.1 Konformitätsstufe AA)?',
            options: [
              {
                id: 'a',
                text: 'Der Entwurf scheitert am WCAG-Erfolgskriterium für Mindestkontraste, da für normalen Fließtext und Buttons ein Kontrastverhältnis von mindestens 4,5:1 zwingend vorgeschrieben ist.',
                isCorrect: true,
                explanation: 'Exakt! 4,5:1 ist der verbindliche Mindestkontrast für normale Schriftgrößen unter Stufe AA.'
              },
              {
                id: 'b',
                text: 'Die Gestaltung ist konform nach WCAG Stufe AA, da die 4,5:1 Kontrastregel laut europäischem Recht ausschließlich für rein redaktionelle Fließtexte in Blogs gilt.',
                isCorrect: false,
                explanation: 'Buttons und Formularfelder fallen genauso unter die Kontrastanforderungen.',
                trapExplanation: 'Typischer Praxis-Irrtum: Interaktive Komponenten wie Buttons und Formularfelder müssen denselben Kontrastanforderungen genügen wie redaktioneller Fließtext.'
              },
              {
                id: 'c',
                text: 'Der Entwurf ist barrierefrei, sofern in den CSS-Stylesheets ein alternativer Mouseover-Hover-Effekt mit schwarzem Hintergrund hinterlegt ist.',
                isCorrect: false,
                explanation: 'Kontraste müssen im Ruhezustand genügen.',
                trapExplanation: 'Verlockende Hover-Falle: Kontraste müssen im Standard-Ruhezustand barrierefrei sein; Tastatur- und Touch-Nutzer können den Hover-Effekt nicht auslösen.'
              },
              {
                id: 'd',
                text: 'Farbkontraste spielen für die Barrierefreiheit keine Rolle mehr, da moderne Betriebssysteme fehlerhafte Webfarben durch KI-Filter automatisch in 21:1 Echtzeitkontraste umwandeln.',
                isCorrect: false,
                explanation: 'Betriebssysteme ersetzen keine barrierefreie Gestaltung.',
                trapExplanation: 'Verlockende KI-Falle: Betriebssysteme reparieren unzureichende Kontraste nicht automatisch; Gestalter tragen die rechtliche und fachliche Verantwortung für Barrierefreiheit.'
              }
            ],
            examTip: 'IHK-Standardwert: Mindestkontrast für normalen Text nach WCAG AA beträgt 4,5:1 (bei Großtext ab 18pt bzw. 14pt fett reicht 3:1)!'
          },
          {
            id: 'l2-a11y-1-2',
            chapterId: 'a11y',
            moduleId: 'a11y-1',
            scenario: 'Usability-Test mit Tastatur-Nutzern: Eine E-Learning-Website lässt sich mit der Tab-Taste bedienen, jedoch wurde die blaue Umrandung des aktiven Elements per CSS ("outline: none") komplett entfernt.',
            question: 'Welches gravierende Barrierefreiheits-Problem entsteht dadurch für sehende Tastatur-Nutzer (z. B. motorisch eingeschränkte Menschen)?',
            options: [
              {
                id: 'a',
                text: 'Der sichtbare Fokus-Indikator fehlt vollständig, wodurch der Nutzer nicht mehr nachvollziehen kann, welches interaktive Element gerade ausgewählt ist.',
                isCorrect: true,
                explanation: 'Richtig! Ein klar sichtbarer Tastaturfokus ist ein zentrales WCAG-Kriterium für motorisch eingeschränkte Nutzer.'
              },
              {
                id: 'b',
                text: 'Die Website verliert ihre HTTPS-Verschlüsselung, weil CSS-Regeln ohne sichtbare Rahmen von TLS-Zertifikatsstellen blockiert werden.',
                isCorrect: false,
                explanation: 'CSS-Styling hat keinen Einfluss auf HTTPS.',
                trapExplanation: 'Verlockende Sicherheits-Falle: TLS-Verschlüsselung schützt den Übertragungsweg und hat keinerlei technischen Bezug zu visuellen CSS-Fokusringen.'
              },
              {
                id: 'c',
                text: 'Der Screenreader stürzt sofort ab, da Sprachausgaben zwingend auf die visuelle Outline-Eigenschaft zur Generierung von Audiosignalen angewiesen sind.',
                isCorrect: false,
                explanation: 'Screenreader lesen den DOM-Baum, nicht die visuelle Outline.',
                trapExplanation: 'Verlockende Screenreader-Falle: Screenreader orientieren sich am HTML-DOM-Baum; der fehlende Fokusindikator trifft primär sehende Tastaturnutzer.'
              },
              {
                id: 'd',
                text: 'Es entsteht kein Problem, da "outline: none" in modernen Responsive-Design-Frameworks als barrierefreie Best-Practice empfohlen wird.',
                isCorrect: false,
                explanation: 'outline: none ohne Alternative ist eine der schlimmsten A11y-Sünden.',
                trapExplanation: 'Gefährlicher Praxis-Irrtum: "outline: none" ohne optischen Ersatz ist eine der gravierendsten Barrieren im modernen Webdesign.'
              }
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
              { id: 'a', text: 'Performance, Optimization, Usability, Rendering', isCorrect: false, explanation: 'Das sind technische Performance-Begriffe, nicht die WCAG-Prinzipien.' },
              { id: 'b', text: 'Perceivable, Operable, Understandable, Robust', isCorrect: true, explanation: 'Perfekt! Wahrnehmbar, Bedienbar, Verständlich und Robust sind die 4 Grundprinzipien der WCAG.' },
              { id: 'c', text: 'Presentation, Orientation, Uniformity, Readability', isCorrect: false, explanation: 'Das sind keine offiziellen WCAG-Prinzipien.' },
              { id: 'd', text: 'Privacy, Observability, Utility, Responsiveness', isCorrect: false, explanation: 'Diese Begriffe stammen nicht aus dem WCAG-POUR-Modell.' }
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
              { id: 'a', text: 'Weil rote Signalfarben laut WCAG-Richtlinie in Formularen untersagt sind', isCorrect: false, explanation: 'Rot ist als Signalfarbe durchaus zulässig, darf aber nicht das einzige Merkmal sein.' },
              { id: 'b', text: 'Weil farbenblinde oder sehbehinderte Menschen den Fehler sonst übersehen', isCorrect: true, explanation: 'Richtig! Information darf nie über Farbe allein vermittelt werden – immer Text und/oder Icon ergänzen.' },
              { id: 'c', text: 'Weil rote Rahmen von mobilen Browsern nicht kontrastreich gerendert werden', isCorrect: false, explanation: 'Browser rendern Rot problemlos; das Problem liegt in der menschlichen Farbwahrnehmung.' },
              { id: 'd', text: 'Weil Screenreader standardmäßig nur grüne und blaue Hinweisfelder vorlesen', isCorrect: false, explanation: 'Screenreader werten Semantik und Text aus, keine Farben.' }
            ]
          },
          {
            id: 'q-a11y-3-2',
            chapterId: 'a11y',
            moduleId: 'a11y-3',
            question: 'Wie zeichnet man ein rein dekoratives Schmuckbild (z. B. eine grafische Trennlinie) im HTML barrierefrei aus?',
            options: [
              { id: 'a', text: 'Mit einem leeren Attribut alt="", damit Screenreader es übergehen', isCorrect: true, explanation: 'Richtig! Mit alt="" erkennen Screenreader das Bild als dekorativ und lesen keinen Dateinamen vor.' },
              { id: 'b', text: 'Durch vollständiges Weglassen des alt-Attributs im img-Element', isCorrect: false, explanation: 'Fehlt das alt-Attribut komplett, lesen viele Screenreader stattdessen den kryptischen Dateinamen vor.' },
              { id: 'c', text: 'Mit dem beschreibenden Hinweis alt="Dekorative Trennlinie"', isCorrect: false, explanation: 'Rein dekorative Elemente sollten Screenreader-Nutzer nicht mit unnötigen Ansagen belasten.' },
              { id: 'd', text: 'Durch Einbinden als nicht barrierefreies Element mit title="Deko"', isCorrect: false, explanation: 'Das title-Attribut ersetzt kein leeres alt-Attribut für dekorative Grafiken.' }
            ]
          },
          {
            id: 'q-a11y-3-3',
            chapterId: 'a11y',
            moduleId: 'a11y-3',
            question: 'Warum darf die Überschriftenstruktur (h1, h2, h3) in HTML nicht aus optischen Gründen durchbrochen werden (z. B. von h1 direkt zu h4)?',
            options: [
              { id: 'a', text: 'Weil Screenreader anhand der Ebenen navigieren und die Dokumentstruktur erfassen', isCorrect: true, explanation: 'Exakt! Eine saubere Überschriften-Hierarchie dient Screenreader-Nutzern als Inhaltsverzeichnis.' },
              { id: 'b', text: 'Weil Browser bei übersprungenen Ebenen die CSS-Regeln der Seite ignorieren', isCorrect: false, explanation: 'CSS funktioniert technisch weiter, aber die semantische Struktur geht verloren.' },
              { id: 'c', text: 'Weil Suchmaschinen ab einer h3-Überschrift sämtliche Folgetexte nicht indexieren', isCorrect: false, explanation: 'Suchmaschinen indexieren auch tiefere Ebenen, bevorzugen aber logische Hierarchien.' },
              { id: 'd', text: 'Weil HTML5 pro Webseite technisch nur eine Überschrift jeder Ebene erlaubt', isCorrect: false, explanation: 'Mehrere h2- oder h3-Überschriften sind völlig normal, solange die Hierarchie logisch bleibt.' }
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
      { task: 'Die 6 Projektphasen', detail: '1. Initiierung, 2. Planung, 3. Konzeption, 4. Umsetzung, 5. Testphase, 6. Abschluss.' },
      { task: 'Definition Projekt', detail: 'Ein Projekt ist zeitlich begrenzt, hat klare Ziele, begrenzte Ressourcen und ein festes Budget.' },
      { task: 'Lastenheft vs. Pflichtenheft', detail: 'Lastenheft (Was will der Kunde?) vs. Pflichtenheft (Wie wird es technisch umgesetzt?).' },
      { task: 'Meilensteine', detail: 'Wichtige Kontrollpunkte im Projektablauf zur Überprüfung von Terminen und Zwischenergebnissen.' },
      { task: 'Scrum-Begriffe', detail: 'Sprint (Arbeitsphase), Backlogs (Aufgabenlisten), Review (Abnahme) und Retrospektive (Team-Feedback).' }
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
              { id: 'a', text: 'Formelle Projektabnahme, Abschlussdokumentation und Lessons Learned', isCorrect: true, explanation: 'Richtig! Abnahme durch den Auftraggeber, Entlastung, Dokumentation und Lessons Learned schließen das Projekt ab.' },
              { id: 'b', text: 'Erstellung erster Navigationsstrukturen und klickbarer Wireframes', isCorrect: false, explanation: 'Das gehört in die Konzeptions- bzw. Entwurfsphase.' },
              { id: 'c', text: 'Erhebung von Zielgruppenanforderungen und Machbarkeitsanalyse', isCorrect: false, explanation: 'Das gehört in die Projektinitiierung und Definitionsphase.' },
              { id: 'd', text: 'Auswahl von Frameworks und Aufbau der produktiven Systemarchitektur', isCorrect: false, explanation: 'Das ist Bestandteil der Planungs- und Realisierungsphase.' }
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
            title: 'Lastenheft vs. Pflichtenheft & Change Request',
            coreConcept: 'Klare Trennung zwischen Auftraggeber und Auftragnehmer sowie geordnete Änderungen.',
            bulletPoints: [
              'Lastenheft: Erstellt vom AUFTRAGGEBER (Kunde). Beschreibt das "WAS soll erreicht werden?" (Gesamtheit aller Anforderungen und Wünsche).',
              'Pflichtenheft: Erstellt vom AUFTRAGNEHMER (Agentur/Entwickler). Beschreibt das "WIE wird das Ziel umgesetzt?" (Konkrete technische und gestalterische Umsetzungsschritte).',
              'Nachträgliche Kundenwünsche: Werden neue Funktionen gewünscht, die nicht im Pflichtenheft stehen, erfolgt dies über einen formellen "Change Request" (Änderungsantrag) mit Überprüfung von Mehrkosten und Terminverzögerungen.'
            ],
            examFavorite: true,
            merksatz: 'Lastenheft = WAS (Kunde) | Pflichtenheft = WIE (Agentur) | Neue Wünsche = Change Request.'
          },
          {
            id: 'n-proj-4',
            title: 'Meilensteine im Projektzeitplan',
            coreConcept: 'Wichtige Kontrollpunkte im Gantt-Diagramm.',
            bulletPoints: [
              'Formale Eigenschaft im Zeitplan (Gantt-Diagramm): Ein Meilenstein besitzt exakt eine Zeitdauer von 0 Tagen! Er ist ein fixer Stichtag bzw. ein wichtiges Zwischenereignis.',
              'Definiert überprüfbare Etappenziele ohne eigene Bearbeitungszeit (z. B. "Freigabe des Konzepts", "Fertigstellung des Wireframes", "Projektabnahme").',
              'Dient der Qualitätskontrolle, Terminüberwachung und Freigabe von Projektphasen.'
            ],
            merksatz: 'Ein Meilenstein hat eine Dauer von 0 Tagen und markiert ein überprüfbares Zwischenereignis.'
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
              { id: 'a', text: 'Er hat eine Dauer von 0 Tagen und markiert ein prüfbares Ereignis', isCorrect: true, explanation: 'Richtig! Meilensteine haben keine zeitliche Dauer, sondern markieren Stichtage wie die Layout-Freigabe.' },
              { id: 'b', text: 'Er umfasst stets ein festes Arbeitspaket von mindestens zwei Wochen', isCorrect: false, explanation: 'Falsch: Arbeitspakete haben eine Dauer, ein Meilenstein ist ein punktueller Stichtag.' },
              { id: 'c', text: 'Er bildet ausschließlich die kaufmännische Budgetfreigabe im Projekt ab', isCorrect: false, explanation: 'Meilensteine beziehen sich auf inhaltliche, terminliche und qualitative Zwischenziele.' },
              { id: 'd', text: 'Er markiert immer das zeitliche Ende einer gesamten Projektphase', isCorrect: false, explanation: 'Meilensteine können auch innerhalb einer Phase wichtige Zwischenergebnisse markieren.' }
            ]
          },
          {
            id: 'q-proj-2-3',
            chapterId: 'project',
            moduleId: 'proj-2',
            question: 'Der Kunde wünscht mitten in der Realisierungsphase zusätzliche Funktionen, die nicht im Pflichtenheft stehen. Was ist das korrekte Vorgehen?',
            options: [
              { id: 'a', text: 'Ein strukturierter Change Request mit Prüfung von Kosten und Terminen', isCorrect: true, explanation: 'Genau richtig! Über einen Änderungsantrag (Change Request) werden Mehrkosten und Terminfolgen dokumentiert und freigegeben.' },
              { id: 'b', text: 'Die kulante Umsetzung ohne Dokumentation im Rahmen des alten Budgets', isCorrect: false, explanation: 'Ungeprüfte Zusatzwünsche führen zu Scope Creep, Qualitätsmängeln und Budgetüberziehungen.' },
              { id: 'c', text: 'Die sofortige Aussetzung des laufenden Vertrags bis zum Projektabschluss', isCorrect: false, explanation: 'Änderungswünsche werden über Change Management geregelt, nicht durch pauschalen Abbruch.' },
              { id: 'd', text: 'Die stillschweigende Zurückstellung aller Wünsche ohne Rückmeldung', isCorrect: false, explanation: 'Professionelle Projektkommunikation erfordert Transparenz und verbindliche Abstimmung.' }
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
              { id: 'a', text: 'Eine Präsentation des Produktinkrements vor Kunden und Stakeholdern', isCorrect: false, explanation: 'Das ist das Sprint Review, nicht die Retrospektive.' },
              { id: 'b', text: 'Ein Team-Meeting am Sprintende zur Verbesserung von Prozess und Zusammenarbeit', isCorrect: true, explanation: 'Richtig! In der Retrospektive reflektiert das Team die eigene Arbeitsweise.' },
              { id: 'c', text: 'Die priorisierte Sammlung aller offenen Produktanforderungen im Projekt', isCorrect: false, explanation: 'Das beschreibt das Product Backlog.' },
              { id: 'd', text: 'Eine kurze tägliche Abstimmung des Teams zu aktuellen Aufgaben und Hürden', isCorrect: false, explanation: 'Das ist das Daily Scrum (Stand-up).' }
            ]
          },
          {
            id: 'q-proj-3-2',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Welche zentrale Aufgabe hat der Product Owner im Scrum-Framework?',
            options: [
              { id: 'a', text: 'Er priorisiert das Product Backlog nach Geschäftswert und vertritt die Anforderungen', isCorrect: true, explanation: 'Exakt! Der Product Owner verantwortet den wirtschaftlichen Wert und pflegt das Product Backlog.' },
              { id: 'b', text: 'Er übernimmt die technische Architektur und programmiert kritische Kernmodule selbst', isCorrect: false, explanation: 'Die technische Umsetzung liegt beim Entwicklerteam.' },
              { id: 'c', text: 'Er verteilt im Sprint Planning jedem Teammitglied verbindlich einzelne Tagesaufgaben', isCorrect: false, explanation: 'Scrum-Teams organisieren ihre Aufgabenverteilung selbstständig.' },
              { id: 'd', text: 'Er moderiert das Daily Scrum und beseitigt organisatorische Störungen im Team', isCorrect: false, explanation: 'Die methodische Unterstützung und Beseitigung von Impediments übernimmt der Scrum Master.' }
            ]
          },
          {
            id: 'q-proj-3-3',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Was ist der Hauptzweck des "Sprint Reviews"?',
            options: [
              { id: 'a', text: 'Vorstellung des Produktinkrements vor Stakeholdern zum Einholen von Feedback', isCorrect: true, explanation: 'Richtig! Im Sprint Review wird das potenziell auslieferbare Inkrement präsentiert und gemeinsam bewertet.' },
              { id: 'b', text: 'Interne Bewertung der Zusammenarbeit und Anpassung der Teamprozesse im Sprint', isCorrect: false, explanation: 'Das ist der Zweck der Sprint Retrospektive, nicht des Sprint Reviews.' },
              { id: 'c', text: 'Detaillierte Schätzung neuer User Stories und Festlegung des nächsten Sprintziels', isCorrect: false, explanation: 'Das findet im Sprint Planning statt.' },
              { id: 'd', text: 'Kaufmännische Endabrechnung und Archivierung aller abgeschlossenen Projektverträge', isCorrect: false, explanation: 'Das gehört zum formalen Projektabschluss, nicht zu einem einzelnen Sprint Review.' }
            ]
          },
          {
            id: 'q-proj-3-4',
            chapterId: 'project',
            moduleId: 'proj-3',
            question: 'Welche Rolle hat der "Scrum Master" im agilen Projekt?',
            options: [
              { id: 'a', text: 'Er coacht das Team, beseitigt Hindernisse und achtet auf die Scrum-Regeln', isCorrect: true, explanation: 'Exakt! Als Servant Leader räumt der Scrum Master Impediments aus dem Weg und schützt den agilen Prozess.' },
              { id: 'b', text: 'Er definiert das visuelle Designsystem und gibt fertige Layouts für den Kunden frei', isCorrect: false, explanation: 'Fachliche Designentscheidungen liegen beim Team bzw. in Abstimmung mit dem Product Owner.' },
              { id: 'c', text: 'Er priorisiert das Product Backlog nach wirtschaftlichem Nutzen und Budgetvorgaben', isCorrect: false, explanation: 'Das ist die Kernaufgabe des Product Owners.' },
              { id: 'd', text: 'Er vertritt den Auftraggeber rechtlich und erteilt dem Team disziplinarische Weisungen', isCorrect: false, explanation: 'Der Scrum Master hat keine klassische disziplinarische Vorgesetztenrolle.' }
            ]
          }
        ]
      },
      {
        id: 'proj-4',
        chapterId: 'project',
        title: 'Kommunikation & Konfliktmanagement',
        shortDesc: 'Korrekturworkflows, Feedback-Regeln & professionelle Konfliktlösung',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-proj-7',
            title: 'Professioneller Korrekturworkflow',
            coreConcept: 'Effiziente Abstimmungsprozesse mit dem Kunden.',
            bulletPoints: [
              'Korrekturschleifen: Festgelegte Anzahl von Feedback-Runden (meist 2-3) im Angebot.',
              'Abnahme: Schriftliche Bestätigung von Teilergebnissen (Meilensteinen).',
              'Änderungsmanagement: Neue Wünsche während der Umsetzung werden als "Change Request" bewertet.'
            ]
          },
          {
            id: 'n-proj-8',
            title: 'Umgang mit Konflikten (Soft Skills)',
            coreConcept: 'Deeskalation und lösungsorientierte Kommunikation.',
            bulletPoints: [
              'Aktives Zuhören: Ausreden lassen, Verständnis zeigen, Gesagtes zusammenfassen.',
              'Ich-Botschaften: Eigene Wahrnehmung schildern ("Ich habe den Eindruck...") statt Vorwürfe zu machen ("Sie haben schon wieder...").',
              'Sachebene vs. Beziehungsebene: Sachliche Probleme von persönlichen Gefühlen trennen.',
              'Harvard-Konzept: Suche nach Win-Win-Lösungen statt bloßem Kompromiss.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-proj-4-1',
            chapterId: 'project',
            moduleId: 'proj-4',
            question: 'Welche Technik ist besonders hilfreich, um in einem hitzigen Kundengespräch Deeskalation zu betreiben?',
            options: [
              { id: 'a', text: 'Aktives Zuhören und Ich-Botschaften senden', isCorrect: true, explanation: 'Richtig! Diese Techniken signalisieren Wertschätzung und vermeiden unnötige Frontenbildung.' },
              { id: 'b', text: 'Dem Kunden sofort widersprechen, wenn er Unrecht hat', isCorrect: false, explanation: 'Das eskaliert die Situation meistens.' },
              { id: 'c', text: 'Das Gespräch wortlos verlassen', isCorrect: false, explanation: 'Unprofessionell.' },
              { id: 'd', text: 'Die Schuld auf die Praktikanten schieben', isCorrect: false, explanation: 'Absolut unprofessionell.' }
            ]
          },
          {
            id: 'q-proj-4-2',
            chapterId: 'project',
            moduleId: 'proj-4',
            question: 'Was versteht man unter einer "Ich-Botschaft" in der professionellen Projektkommunikation?',
            options: [
              { id: 'a', text: 'Das sachliche Schildern der eigenen Wahrnehmung ohne Vorwurf an das Gegenüber', isCorrect: true, explanation: 'Exakt! Formulierungen wie „Ich stelle fest …“ reduzieren Abwehrhaltungen und fördern konstruktive Gespräche.' },
              { id: 'b', text: 'Das direkte Konfrontieren der Gegenseite mit persönlichen Verhaltenszuschreibungen', isCorrect: false, explanation: 'Das beschreibt eine vorwurfsvolle Du-Botschaft, keine Ich-Botschaft.' },
              { id: 'c', text: 'Das einseitige Versenden schriftlicher Anweisungen ohne Rückfragemöglichkeit', isCorrect: false, explanation: 'Ich-Botschaften sind eine Dialogtechnik für konstruktives Feedback.' },
              { id: 'd', text: 'Das bewusste Zurückhalten eigener Kritikpunkte zugunsten der Gruppenharmonie', isCorrect: false, explanation: 'Ich-Botschaften sprechen Probleme offen, aber wertschätzend an.' }
            ]
          },
          {
            id: 'q-proj-4-3',
            chapterId: 'project',
            moduleId: 'proj-4',
            question: 'Was ist das Ziel des "Harvard-Konzepts" im Verhandlungs- und Konfliktmanagement?',
            options: [
              { id: 'a', text: 'Sachbezogenes Verhandeln für Win-Win-Lösungen auf Basis gemeinsamer Interessen', isCorrect: true, explanation: 'Richtig! Trennung von Mensch und Problem sowie Fokus auf Interessen statt starrer Positionen prägen das Harvard-Konzept.' },
              { id: 'b', text: 'Konsequentes Durchsetzen der eigenen Maximalposition durch gezielten Zeitdruck', isCorrect: false, explanation: 'Das entspricht hartem Positionsfeilschen, nicht dem Harvard-Konzept.' },
              { id: 'c', text: 'Schnelles Nachgeben bei strittigen Punkten, um Konflikte vollständig zu umgehen', isCorrect: false, explanation: 'Weiches Nachgeben führt selten zu fairen, tragfähigen Lösungen.' },
              { id: 'd', text: 'Verlagerung strittiger Vertragsfragen direkt in ein gerichtliches Schiedsverfahren', isCorrect: false, explanation: 'Das Harvard-Konzept zielt auf einvernehmliche Lösungen ohne Eskalation.' }
            ],
            examTip: 'Harvard-Konzept: Trenne Personen von Problemen, fokussiere auf Interessen statt starrer Positionen für echte Win-Win-Ergebnisse.'
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
      { task: 'Tabellen & Datensätze', detail: 'Tabellen sammeln Themen; Datensätze (Zeilen) sind Einzelobjekte; Felder (Spalten) sind Eigenschaften.' },
      { task: 'Primär- vs. Fremdschlüssel', detail: 'Primärschlüssel identifiziert eindeutig; Fremdschlüssel verweist auf andere Tabellen zur Verknüpfung.' },
      { task: 'Kardinalitäten', detail: 'Beziehungen verstehen: 1:1, 1:n (Standard) und n:m (benötigt immer eine Zwischentabelle).' },
      { task: 'SQL CRUD-Befehle', detail: 'INSERT (Anlegen), SELECT (Lesen), UPDATE (Ändern), DELETE (Löschen).' },
      { task: 'Normalisierung & Konsistenz', detail: 'Redundanzen vermeiden, damit Daten an nur einer Stelle geändert werden müssen (Single Source of Truth).' },
      { task: 'JSON-Syntax & Datentypen', detail: 'Schlüssel-Wert-Paare in { } und [ ]. Erlaubt: String, Number, Boolean, Null, Object, Array.' }
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
              { id: 'a', text: 'Einen einzelnen Datensatz, der ein konkretes Objekt repräsentiert', isCorrect: true, explanation: 'Richtig! Eine Zeile ist ein Datensatz für genau ein Objekt (z. B. ein Projekt); Spalten sind die Felder.' },
              { id: 'b', text: 'Ein einzelnes Attribut, das eine bestimmte Eigenschaft aller Einträge sammelt', isCorrect: false, explanation: 'Das beschreibt eine Spalte (Feld), keine Zeile.' },
              { id: 'c', text: 'Die übergeordnete Bezeichnung des gesamten Datenbank-Schemas', isCorrect: false, explanation: 'Das ist der Datenbank- bzw. Schemaname, keine Tabellenzeile.' },
              { id: 'd', text: 'Eine definierte Verknüpfungsregel zwischen zwei separaten Tabellen', isCorrect: false, explanation: 'Beziehungen werden über Schlüssel und Relationen definiert, nicht durch eine einzelne Zeile.' }
            ]
          },
          {
            id: 'q-db-1-2',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Welche Kernfunktion hat ein Primärschlüssel (Primary Key)?',
            options: [
              { id: 'a', text: 'Er verschlüsselt vertrauliche Tabellenwerte automatisch bei der Übertragung', isCorrect: false, explanation: 'Primärschlüssel dienen der Identifikation, nicht der kryptografischen Verschlüsselung.' },
              { id: 'b', text: 'Er identifiziert jeden Datensatz innerhalb einer Tabelle eindeutig', isCorrect: true, explanation: 'Exakt! Der Primärschlüssel (z. B. Kunden_ID = 502) garantiert Verwechslungsfreiheit.' },
              { id: 'c', text: 'Er sortiert sämtliche Abfrageergebnisse dauerhaft alphabetisch nach Namen', isCorrect: false, explanation: 'Für Sortierungen in Abfragen ist die Klausel ORDER BY zuständig.' },
              { id: 'd', text: 'Er bereinigt veraltete Bild- und Mediendateien im Dateisystem automatisch', isCorrect: false, explanation: 'Ein Primärschlüssel verwaltet keine Dateien im Dateisystem.' }
            ]
          },
          {
            id: 'q-db-1-3',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Wie wird eine n:m-Beziehung (z. B. ein Web-Projekt nutzt mehrere Bilder und ein Bild kommt in mehreren Projekten vor) technisch realisiert?',
            options: [
              { id: 'a', text: 'Über eine zusätzliche Zwischentabelle, die beide Fremdschlüssel aufnimmt', isCorrect: true, explanation: 'Richtig! Eine Verknüpfungstabelle (z. B. Projekt_Bilder mit Projekt_ID und Bild_ID) löst n:m-Beziehungen sauber auf.' },
              { id: 'b', text: 'Über ein einzelnes Textfeld, das alle Bildnamen kommagetrennt speichert', isCorrect: false, explanation: 'Kommagetrennte Listen verletzen die erste Normalform und erschweren Abfragen.' },
              { id: 'c', text: 'Über das direkte Duplizieren beider Tabellen für jeden neuen Projektordner', isCorrect: false, explanation: 'Tabellen zu kopieren erzeugt massive Redundanz statt einer sauberen Relation.' },
              { id: 'd', text: 'Über eine direkte Verbindung ohne Fremdschlüssel, da n:m-Relationen in SQL fehlen', isCorrect: false, explanation: 'n:m-Beziehungen sind gängiger Standard und werden über eine Zwischentabelle umgesetzt.' }
            ]
          },
          {
            id: 'q-db-1-4',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Warum speichert man in einer Bestelltabelle als Kundenreferenz nur die Kunden_ID (Fremdschlüssel) statt des Namens?',
            options: [
              { id: 'a', text: 'Damit Daten konsistent bleiben und Änderungen zentral an einer Stelle erfolgen', isCorrect: true, explanation: 'Exakt! Single Source of Truth: Ändert sich Name oder Adresse, reicht ein einziges Update in der Kundentabelle.' },
              { id: 'b', text: 'Weil relationale Bestelltabellen aus technischen Gründen keine Textspalten erlauben', isCorrect: false, explanation: 'Datenbanken unterstützen Textfelder (VARCHAR) problemlos – es geht um Redundanzvermeidung.' },
              { id: 'c', text: 'Weil die DSGVO das Speichern von Kundennamen in verknüpften Datenbanken verbietet', isCorrect: false, explanation: 'Kundendaten dürfen zur Vertragserfüllung gespeichert werden.' },
              { id: 'd', text: 'Weil numerische Schlüssel die optische Darstellung der Rechnung im Frontend steuern', isCorrect: false, explanation: 'Fremdschlüssel sichern Datenintegrität, nicht das visuelle Rechnungsdesign.' }
            ]
          },
          {
            id: 'q-db-1-5',
            chapterId: 'database',
            moduleId: 'db-1',
            question: 'Welches Szenario beschreibt eine klassische 1:n-Beziehung im Mediendesign?',
            options: [
              { id: 'a', text: 'Ein Kunde hat mehrere Web-Projekte, aber jedes Projekt gehört zu einem Kunden', isCorrect: true, explanation: 'Richtig! Ein Kunde (1) kann viele Projekte (n) besitzen.' },
              { id: 'b', text: 'Jeder Mitarbeiter besitzt genau einen personalisierten Firmenausweis mit Chip', isCorrect: false, explanation: 'Das ist eine 1:1-Beziehung.' },
              { id: 'c', text: 'Mehrere Designer arbeiten an vielen Projekten mit jeweils mehreren Beteiligten', isCorrect: false, explanation: 'Das ist eine n:m-Beziehung.' },
              { id: 'd', text: 'Jede Druckdatei besitzt exakt ein eindeutiges Farbprofil für den Export', isCorrect: false, explanation: 'Das beschreibt eine 1:1-Zuordnung, keine 1:n-Beziehung.' }
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
              { id: 'b', text: "SELECT Titel FROM Projekte IF Status = 'Freigegeben';", isCorrect: false, explanation: 'Ungültige SQL-Syntax: In SQL wird mit WHERE gefiltert, nicht mit IF.' },
              { id: 'c', text: "FILTER Titel FROM Projekte BY Status = 'Freigegeben';", isCorrect: false, explanation: 'Ungültige SQL-Syntax: Abfragen beginnen in SQL mit SELECT, nicht mit FILTER.' },
              { id: 'd', text: "SELECT Titel IN Projekte HAVING Status = 'Freigegeben';", isCorrect: false, explanation: 'Ungültige SQL-Syntax: Tabellen stehen nach FROM und Einzelfilter stehen in WHERE.' }
            ]
          },
          {
            id: 'q-db-2-4',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Wofür steht die Abkürzung DESC in einer SQL-Sortieranweisung (z. B. ORDER BY Datum DESC)?',
            options: [
              { id: 'a', text: 'Descending – sortiert die Treffer absteigend', isCorrect: true, explanation: 'Richtig! DESC sortiert absteigend (vom Neuesten zum Ältesten bzw. Z bis A), ASC sortiert aufsteigend.' },
              { id: 'b', text: 'Description – ergänzt eine Spaltenbeschreibung', isCorrect: false, explanation: 'Falsch: DESC steuert die Sortierrichtung, nicht Spaltenbeschreibungen.' },
              { id: 'c', text: 'Distinct – entfernt doppelte Datensätze vorab', isCorrect: false, explanation: 'Falsch: Duplikate werden mit dem Schlüsselwort DISTINCT entfernt.' },
              { id: 'd', text: 'Default – stellt die Standardsortierung wieder her', isCorrect: false, explanation: 'Falsch: Die Standardsortierung in SQL ist aufsteigend (ASC).' }
            ]
          },
          {
            id: 'q-db-2-5',
            chapterId: 'database',
            moduleId: 'db-2',
            question: 'Welches SQL-Konstrukt verbindet Datensätze aus zwei Tabellen (z. B. Projekte und Kunden) anhand passender IDs?',
            options: [
              { id: 'a', text: 'JOIN', isCorrect: true, explanation: 'Richtig! Ein JOIN (z. B. Projekte JOIN Kunden ON Projekte.Kunden_ID = Kunden.Kunden_ID) verbindet Tabellen über Primär- und Fremdschlüssel.' },
              { id: 'b', text: 'GROUP BY', isCorrect: false, explanation: 'GROUP BY fasst Datensätze für Aggregationen zusammen, verknüpft aber keine zwei Tabellen.' },
              { id: 'c', text: 'ORDER BY', isCorrect: false, explanation: 'ORDER BY sortiert das Abfrageergebnis, stellt aber keine Tabellenverbindung her.' },
              { id: 'd', text: 'DISTINCT', isCorrect: false, explanation: 'DISTINCT blendet doppelte Ergebniszeilen aus, verbindet aber keine Tabellen.' }
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
              { id: 'a', text: 'Datenredundanzen und Widersprüche durch klare Aufteilung vermeiden', isCorrect: true, explanation: 'Richtig! Durch Normalisierung wird jede Information nur einmal gepflegt und bleibt konsistent.' },
              { id: 'b', text: 'Alle Projekt- und Kundendaten in einer einzigen Gesamttabelle bündeln', isCorrect: false, explanation: 'Das wäre Denormalisierung und führt gerade zu doppelter Datenhaltung.' },
              { id: 'c', text: 'Alle Textfelder einheitlich in Großbuchstaben und feste Längen umwandeln', isCorrect: false, explanation: 'Normalisierung betrifft die Tabellenstruktur, nicht die Schreibweise von Texten.' },
              { id: 'd', text: 'Alle Tabellen ohne Primär- und Fremdschlüssel frei zugänglich halten', isCorrect: false, explanation: 'Gerade Primär- und Fremdschlüssel sichern die Integrität normalisierter Tabellen.' }
            ]
          },
          {
            id: 'q-db-3-2',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Warum sollte ein Veröffentlichungsdatum in einer Datenbank als Datentyp DATE und nicht als freier Text (VARCHAR) gespeichert werden?',
            options: [
              { id: 'a', text: 'Weil nur DATE exakte chronologische Sortierungen und Datumsrechnungen erlaubt', isCorrect: true, explanation: 'Exakt! Textfelder sortieren alphabetisch, was bei Datumsangaben zu falschen Reihenfolgen führt.' },
              { id: 'b', text: 'Weil Textfelder in relationalen Datenbanken keine Ziffern und Punkte speichern', isCorrect: false, explanation: 'VARCHAR kann beliebige Zeichen speichern, interpretiert sie aber nicht als echtes Datum.' },
              { id: 'c', text: 'Weil Webbrowser Datumsangaben aus Textspalten technisch nicht anzeigen können', isCorrect: false, explanation: 'Browser zeigen Text problemlos an; der Nachteil liegt bei Sortierung und Berechnung in der Datenbank.' },
              { id: 'd', text: 'Weil der Datentyp DATE automatisch auch die Zeitzone und Uhrzeit des Nutzers ermittelt', isCorrect: false, explanation: 'DATE speichert nur das Kalenderdatum; für Uhrzeit und Zeitzone braucht man DATETIME oder TIMESTAMP.' }
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
              { id: 'a', text: 'Bei großen, unstrukturierten Datenmengen wie Feeds oder flexiblen JSON-Dokumenten', isCorrect: true, explanation: 'Richtig! NoSQL-Systeme skalieren flexibel für große, dokumentenorientierte oder unstrukturierte Datenströme.' },
              { id: 'b', text: 'Bei klassischen Buchhaltungs- und Rechnungssystemen mit strengen Tabellenbezügen', isCorrect: false, explanation: 'Streng strukturierte Finanzdaten mit festen Relationen sind ein klassischer Fall für relationale SQL-Datenbanken.' },
              { id: 'c', text: 'Bei rein statischen Visitenkarten-Websites ohne dynamische Benutzerinteraktionen', isCorrect: false, explanation: 'Statische Websites benötigen meist überhaupt keine Datenbank.' },
              { id: 'd', text: 'Bei lokalen Druckvorstufen-Workflows zur direkten PDF/X-4-Ausgabe im Offsetdruck', isCorrect: false, explanation: 'PDF-Ausgabe erfolgt über Layout- und RIP-Software, nicht über NoSQL-Datenbanken.' }
            ]
          },
          {
            id: 'q-db-3-5',
            chapterId: 'database',
            moduleId: 'db-3',
            question: 'Welche 4 Kernfragen muss ein Mediengestalter bei der Konzeption eines neuen Datenbanksystems beantworten?',
            options: [
              { id: 'a', text: '1. Welche Tabellen? 2. Welcher Primärschlüssel? 3. Welche Beziehungen? 4. Welche Datentypen?', isCorrect: true, explanation: 'Exakt! Tabellen, Primärschlüssel, Verknüpfungen (1:n, n:m) und Datentypen bilden den Leitfaden der Datenbankplanung.' },
              { id: 'b', text: '1. Welche Schriftart? 2. Welches Logo? 3. Welche Hausfarbe? 4. Welcher Rasterabstand?', isCorrect: false, explanation: 'Das sind Fragen des Corporate Designs, nicht der Datenbankmodellierung.' },
              { id: 'c', text: '1. Welcher Monitor? 2. Welches Betriebssystem? 3. Welche Maus? 4. Welcher Drucker?', isCorrect: false, explanation: 'Das betrifft Arbeitsplatz-Hardware, nicht das Datenmodell.' },
              { id: 'd', text: '1. CSS Grid? 2. Flexbox? 3. Farbprofil RGB? 4. Farbprofil CMYK?', isCorrect: false, explanation: 'Das sind Fragen zu Frontend-Layout und Farbraum, nicht zur Datenbankkonzeption.' }
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
              { id: 'a', text: 'Objekte stehen in geschweiften Klammern { }, Arrays in eckigen Klammern [ ]', isCorrect: true, explanation: 'Exakt! Objekte { } bündeln Schlüssel-Wert-Paare; Arrays [ ] listen geordnete Werte oder Objekte auf.' },
              { id: 'b', text: 'Objekte stehen in spitzen Klammern < >, Arrays in runden Klammern ( )', isCorrect: false, explanation: 'Spitze Klammern gehören zu XML und HTML, nicht zu JSON.' },
              { id: 'c', text: 'Objekte stehen in eckigen Klammern [ ], Arrays in geschweiften Klammern { }', isCorrect: false, explanation: 'Genau umgekehrt: { } sind Objekte und [ ] sind Arrays.' },
              { id: 'd', text: 'Objekte und Arrays nutzen beide geschweifte Klammern { } mit Typ-Kennung', isCorrect: false, explanation: 'JSON unterscheidet beide Strukturen direkt über { } für Objekte und [ ] für Arrays.' }
            ]
          },
          {
            id: 'q-db-4-3',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Welcher der folgenden Datensätze ist ein gültiges, syntaktisch fehlerfreies JSON-Objekt?',
            options: [
              { id: 'a', text: '{ "projekt": "Portfolio", "version": 1.2, "aktiv": true }', isCorrect: true, explanation: 'Perfekt! Schlüssel in doppelten Anführungszeichen, Dezimalzahl mit Punkt (1.2) und kleingeschriebener Boolean (true).' },
              { id: 'b', text: "{ 'projekt': 'Portfolio', \"version\": 1,2, \"aktiv\": true }", isCorrect: false, explanation: 'Einfache Anführungszeichen (\') und ein deutsches Komma in Zahlen (1,2) sind in JSON ungültig.' },
              { id: 'c', text: '{ projekt: "Portfolio", "version": 1.2, "aktiv": True, }', isCorrect: false, explanation: 'Schlüssel müssen in Anführungszeichen stehen, true wird kleingeschrieben und ein abschließendes Komma ist verboten.' },
              { id: 'd', text: '<projekt name="Portfolio" version="1.2" aktiv="true" />', isCorrect: false, explanation: 'Das ist XML-Syntax, kein gültiges JSON-Objekt.' }
            ],
            examTip: 'Merke: Schlüssel immer in doppelten Anführungszeichen ("schluessel"), Zahlen mit Punkt (1.2)!'
          },
          {
            id: 'q-db-4-4',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Warum hat JSON das ältere XML-Format im Web und in Web-Apps für APIs weitgehend verdrängt?',
            options: [
              { id: 'a', text: 'JSON ist ohne schließende Tags kompakter, schneller zu parsen und direkt im Browser nutzbar', isCorrect: true, explanation: 'Richtig! Kompaktere Dateigröße, schnelles Parsing, native JavaScript-Integration und gute Lesbarkeit sprechen für JSON.' },
              { id: 'b', text: 'XML ist technisch auf wenige Kilobyte Dateigröße begrenzt und scheitert an größeren APIs', isCorrect: false, explanation: 'XML kann beliebig groß sein, erzeugt durch schließende Tags aber deutlich mehr Overhead.' },
              { id: 'c', text: 'JSON unterstützt im Gegensatz zu XML direkt eingebettete hochauflösende Rasterbilder', isCorrect: false, explanation: 'Beide Formate sind textbasiert und referenzieren Bilder in der Regel über URLs oder Base64.' },
              { id: 'd', text: 'XML wird von modernen Webservern nicht mehr unterstützt und lässt sich nicht über HTTP senden', isCorrect: false, explanation: 'XML funktioniert weiterhin über HTTP, ist für Web-APIs aber schwergewichtiger als JSON.' }
            ],
            merksatz: 'JSON ist kompakter als XML, schneller im Parsing und nativ im Webbrowser integriert.'
          },
          {
            id: 'q-db-4-5',
            chapterId: 'database',
            moduleId: 'db-4',
            question: 'Wie arbeiten ein Web-Server und das von dir gestaltete Frontend-Design über eine Web-API typischerweise zusammen?',
            options: [
              { id: 'a', text: 'Der Server liefert strukturierte JSON-Daten und das Frontend stellt sie visuell im Interface dar', isCorrect: true, explanation: 'Exakt! Beispiel: Der Server sendet {"temp": 22}, das Frontend rendert daraus ein Wetter-Icon und ein 22°C-Badge.' },
              { id: 'b', text: 'Der Server rendert jede Unterseite als fertige Bitmap-Grafik und der Browser zeigt nur das Bild an', isCorrect: false, explanation: 'Das wäre ineffizient, nicht interaktiv und nicht barrierefrei.' },
              { id: 'c', text: 'Das Frontend speichert alle Nutzerdaten dauerhaft lokal und fragt den Server nur beim ersten Aufruf', isCorrect: false, explanation: 'Dynamische Web-Apps tauschen regelmäßig strukturierte Daten über APIs mit dem Server aus.' },
              { id: 'd', text: 'Server und Frontend speichern Daten und CSS-Design immer gemeinsam in einer untrennbaren Datei', isCorrect: false, explanation: 'Die saubere Trennung von Daten (JSON) und Präsentation (HTML/CSS) ist das Grundprinzip moderner Web-APIs.' }
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
      { task: 'Medienneutrale Daten', detail: 'Inhalte sind unabhängig von der späteren Ausgabe (Print, Web, App) und strukturiert gespeichert.' },
      { task: 'Inhalt/Struktur/Form', detail: 'Fundamentale Trennung von Inhalten (Text/Bild), logischer Struktur (Tags) und visuellem Layout (CSS).' },
      { task: 'Single Source Publishing', detail: 'Ein zentraler Datenbestand (z.B. Datenbank) speist alle Medienkanäle fehlerfrei und gleichzeitig.' },
      { task: 'Web vs. Print Spezifikationen', detail: 'Web: sRGB, 72/144 DPI. Print: CMYK, 300 DPI, Beschnittzugabe beachten.' },
      { task: 'XML-Wohlgeformtheit', detail: 'Regeln: Ein Root-Element, alle Tags schließen, keine Überkreuzungen, Case-Sensitivity.' },
      { task: 'Die IHK-Prüfungskette', detail: 'XML (speichert) → DTD/XSD (prüft) → XPath (sucht) → XSLT (macht Design/HTML).' },
      { task: 'Vergleich: XML vs. JSON', detail: 'JSON ist kompakter, schneller im Parsing und nativ in Web-APIs integriert.' }
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
              { id: 'a', text: 'Strukturiert gespeicherte Inhalte ohne Bindung an ein bestimmtes Design oder Ausgabemedium', isCorrect: true, explanation: 'Exakt! Medienneutrale Daten lassen sich flexibel für Web, Print, App oder Newsletter ausgeben.' },
              { id: 'b', text: 'Bild- und Textdateien, die vorab einheitlich in Graustufen ohne Farbprofil abgelegt werden', isCorrect: false, explanation: 'Medienneutralität bedeutet Unabhängigkeit vom Ausgabekanal, nicht Verzicht auf Farbe.' },
              { id: 'c', text: 'Druckfertige PDF-Dokumente, bei denen Bilder und Grafiken extern ausgelagert wurden', isCorrect: false, explanation: 'PDFs sind layoutgebundene Endformate, keine medienneutralen Quelldaten.' },
              { id: 'd', text: 'Komprimierte Webgrafiken, die automatisch für alle Browsergrößen skaliert werden können', isCorrect: false, explanation: 'Responsivität im Web ist nur ein Kanal; Medienneutralität umfasst alle Ausgabemedien.' }
            ],
            merksatz: 'Medienneutrale Daten trennen Inhalt und Layout für beliebige Ausgabekanäle.'
          },
          {
            id: 'q-med-1-2',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Welche 4 Bereiche werden bei einer medienneutralen Produktion sauber voneinander getrennt?',
            options: [
              { id: 'a', text: 'Inhalt, Struktur, Gestaltung und Ausgabe', isCorrect: true, explanation: 'Richtig! Content (Inhalt), Hierarchie (Struktur), Style (Gestaltung) und Medium (Ausgabe) werden sauber getrennt.' },
              { id: 'b', text: 'Farbraum, Papiergewicht, Druckfarbe und Veredelung', isCorrect: false, explanation: 'Das sind spezifische Parameter der Printproduktion, nicht die vier Trennungsebenen.' },
              { id: 'c', text: 'Entwurf, Korrektur, Freigabe und Archivierung', isCorrect: false, explanation: 'Das sind Ablaufphasen im Projekt, nicht die vier Daten- und Ausgabebereiche.' },
              { id: 'd', text: 'Kunde, Redaktion, Druckerei und Versanddienstleister', isCorrect: false, explanation: 'Das sind beteiligte Rollen und Partner, keine strukturellen Ebenen der Datenproduktion.' }
            ]
          },
          {
            id: 'q-med-1-3',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Warum sollte ein Text in medienneutralen Quelldaten semantisch als „H1“ und nicht als „fett und 24pt“ deklariert werden?',
            options: [
              { id: 'a', text: 'Weil das System so die Bedeutung kennt und jedes Ausgabemedium die Überschrift passend formatiert', isCorrect: true, explanation: 'Genau! Semantik transportiert Bedeutung – im Web wird daraus ein <h1>, im Magazin eine passende Druck-Headline.' },
              { id: 'b', text: 'Weil fette Schriftschnitte in modernen Satzsystemen nicht mehr direkt zugewiesen werden können', isCorrect: false, explanation: 'Schriftschnitte sind technisch problemlos möglich, gehören aber in die Gestaltungsebene.' },
              { id: 'c', text: 'Weil Punktgrößen wie 28 pt ausschließlich im Printbereich und nie auf Bildschirmen funktionieren', isCorrect: false, explanation: 'Maßeinheiten lassen sich umrechnen; entscheidend ist die Trennung von Bedeutung und Aussehen.' },
              { id: 'd', text: 'Weil XML- und JSON-Formate grundsätzlich keine numerischen Werte für Schriftgrößen erlauben', isCorrect: false, explanation: 'XML und JSON können Zahlen speichern, sollten aber in medienneutralen Daten keine feste Optik vorgeben.' }
            ],
            merksatz: 'Semantische Rollen (H1, Preis) ermöglichen die flexible Formatierung je nach Zielmedium.'
          },
          {
            id: 'q-med-1-4',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Worin liegt der fundamentale Nachteil eines rein layoutbasierten Workflows gegenüber einem strukturbasierten?',
            options: [
              { id: 'a', text: 'Der Inhalt ist fest im Layout eingebunden und muss für andere Kanäle manuell neu gesetzt werden', isCorrect: true, explanation: 'Richtig! Im layoutbasierten Workflow (z. B. Text direkt in InDesign) ist automatisierte Mehrfachnutzung kaum möglich.' },
              { id: 'b', text: 'Layoutbasierte Dokumente lassen sich im Offsetdruck technisch nicht farbverbindlich ausgeben', isCorrect: false, explanation: 'Für reinen Print sind layoutbasierte Workflows genau der klassische Standard.' },
              { id: 'c', text: 'Strukturbasierte Quelldaten können im Gegensatz zu Layoutdateien keine Bilddaten einbinden', isCorrect: false, explanation: 'Strukturierte Daten referenzieren Bilder und Metadaten sehr effizient.' },
              { id: 'd', text: 'Beide Verfahren liefern identische Datenstrukturen und unterscheiden sich nur in der Softwarewahl', isCorrect: false, explanation: 'Der Unterschied liegt fundamental in der Trennung von Inhalt und Layout.' }
            ]
          },
          {
            id: 'q-med-1-5',
            chapterId: 'crossmedia',
            moduleId: 'med-1',
            question: 'Warum eignet sich ein fertig gestaltetes Druck-PDF üblicherweise NICHT als medienneutraler Ausgangsdatenbestand?',
            options: [
              { id: 'a', text: 'Weil ein PDF bereits fest auf ein Ausgabemedium, starre Seitenmaße und ein Layout fixiert ist', isCorrect: true, explanation: 'Exakt! Das PDF ist das layoutgebundene Endprodukt einer Ausgabe, nicht die medienneutrale Quelle.' },
              { id: 'b', text: 'Weil Druck-PDFs aus Sicherheitsgründen grundsätzlich keinen kopierbaren Text enthalten dürfen', isCorrect: false, explanation: 'PDFs enthalten in der Regel Text, allerdings fest in ein starres Seitenlayout eingebunden.' },
              { id: 'c', text: 'Weil PDF-Dateien proprietär sind und sich nicht auf mobilen Endgeräten öffnen lassen', isCorrect: false, explanation: 'PDF ist ein offener ISO-Standard und überall lesbar, aber nicht medienneutral strukturiert.' },
              { id: 'd', text: 'Weil in einem PDF-Dokument keine Vektorgrafiken oder Metadaten gespeichert werden können', isCorrect: false, explanation: 'PDF unterstützt Vektoren und Metadaten, bleibt aber auf ein fixes Seitenlayout festgelegt.' }
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
              { id: 'a', text: 'Inhalte werden einmal zentral gepflegt und konsistent über alle Kanäle ausgespielt', isCorrect: true, explanation: 'Exakt! Aktualisierungen erfolgen zeitsparend, einheitlich und fehlerfrei für Print, Web und App.' },
              { id: 'b', text: 'Gestalterische Templates für Print und Web werden vollständig durch KI ersetzt', isCorrect: false, explanation: 'Medienspezifische Templates und Ausgabedesigns müssen weiterhin professionell gestaltet werden.' },
              { id: 'c', text: 'Alle digitalen Ausgabekanäle laufen zwingend auf demselben physischen Webserver', isCorrect: false, explanation: 'Single Source meint eine zentrale Datenquelle, nicht zwingend einen einzigen Server.' },
              { id: 'd', text: 'Jede Änderung im Webshop wird automatisch ohne Freigabe sofort in den Druck geschickt', isCorrect: false, explanation: 'Freigabe- und Qualitätskontrollen bleiben im Publishing-Workflow weiterhin unverzichtbar.' }
            ],
            merksatz: 'Single Source: Zentrale Datenpflege verhindert Datenchaos und spart immense Korrekturzeit.'
          },
          {
            id: 'q-med-2-2',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Warum müssen Bilder bei der Ausgabe für Print und Web unterschiedlich aufbereitet werden?',
            options: [
              { id: 'a', text: 'Print braucht 300 dpi, CMYK und Beschnitt; Web braucht sRGB, geringere Auflösung und kleine Dateien', isCorrect: true, explanation: 'Richtig! Deshalb liegt das medienneutrale Masterbild hochauflösend vor und wird kanalabhängig konvertiert (Web typ. 72–144 dpi).' },
              { id: 'b', text: 'Print verarbeitet ausschließlich Vektordaten, während Web-Browser nur unkomprimierte Rasterbilder zeigen', isCorrect: false, explanation: 'Beide Kanäle nutzen sowohl Raster- als auch Vektorgrafiken, aber mit unterschiedlichen Zielparametern.' },
              { id: 'c', text: 'Print nutzt das additive RGB-Farbmodell, während Webseiten auf das subtraktive CMYK-Modell setzen', isCorrect: false, explanation: 'Genau umgekehrt: Bildschirme nutzen additives RGB, der Druck nutzt subtraktives CMYK.' },
              { id: 'd', text: 'Print verzichtet auf Farbprofile, während Webbrowser zwingend 300 dpi mit 3 mm Beschnitt fordern', isCorrect: false, explanation: 'Farbprofile, 300 dpi und Beschnitt sind klassische Anforderungen der Druckvorstufe.' }
            ]
          },
          {
            id: 'q-med-2-3',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Wie funktioniert XML als Format für medienneutrale Daten?',
            options: [
              { id: 'a', text: 'XML beschreibt Daten über frei definierbare Tags hierarchisch und ohne feste Layoutvorgaben', isCorrect: true, explanation: 'Richtig! Mit eigenen Tags (z. B. <produktname>…</produktname>) trennt XML Struktur sauber vom Layout.' },
              { id: 'b', text: 'XML legt Schriftarten, Zeilenabstände und Seitenränder verbindlich für alle Drucksysteme fest', isCorrect: false, explanation: 'XML enthält selbst keine Layout- oder Schriftartvorgaben – dafür gibt es Stylesheets/Templates.' },
              { id: 'c', text: 'XML komprimiert hochauflösende Bild- und Videodaten verlustfrei in einem einzigen Container', isCorrect: false, explanation: 'XML ist ein textbasiertes Auszeichnungsformat für strukturierte Daten, kein Medien-Codec.' },
              { id: 'd', text: 'XML ist ein proprietäres Austauschformat, das ausschließlich in speziellen Satzprogrammen läuft', isCorrect: false, explanation: 'XML ist ein offener, plattformunabhängiger W3C-Standard.' }
            ]
          },
          {
            id: 'q-med-2-4',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Welche Reihenfolge beschreibt den offiziellen IHK-Produktionsablauf medienneutraler Daten korrekt?',
            options: [
              { id: 'a', text: 'Daten erfassen → Inhalt & Design trennen → Template wählen → Mediengerecht ausgeben → Prüfen', isCorrect: true, explanation: 'Exakt die 5-Schritte-Kette aus den IHK-Prüfungshinweisen für medienneutrale Produktion!' },
              { id: 'b', text: 'Template drucken → Layout fixieren → Daten erfassen → Mediengerecht ausgeben → Prüfen', isCorrect: false, explanation: 'Zuerst werden Daten strukturiert erfasst und vom Layout getrennt, erst danach folgt die Ausgabe.' },
              { id: 'c', text: 'Inhalt & Design verbinden → PDF erzeugen → Template wählen → Daten erfassen → Prüfen', isCorrect: false, explanation: 'Inhalt und Gestaltung dürfen gerade nicht vorab fest miteinander verbunden werden.' },
              { id: 'd', text: 'Prüfen → Mediengerecht ausgeben → Daten erfassen → Template wählen → Inhalt trennen', isCorrect: false, explanation: 'Die Reihenfolge ist verdreht: Qualitätskontrolle steht am Ende der Ausgabekette.' }
            ],
            merksatz: 'Erfassen → Trennen → Vorlage wählen → Ausgeben → Kontrollieren.'
          },
          {
            id: 'q-med-2-5',
            chapterId: 'crossmedia',
            moduleId: 'med-2',
            question: 'Ist eine XML- oder JSON-Datei automatisch medienneutral?',
            options: [
              { id: 'a', text: 'Nein, entscheidend ist eine saubere Struktur ohne feste Layout- oder Zielmedium-Vorgaben', isCorrect: true, explanation: 'Genau! Enthält eine XML-Datei feste Spaltenbreiten oder Seitenumbrüche, ist sie nicht mehr medienneutral.' },
              { id: 'b', text: 'Ja, jede syntaktisch wohlgeformte XML- oder JSON-Datei ist automatisch medienneutral', isCorrect: false, explanation: 'Die Dateiendung allein garantiert keine Medienneutralität, wenn Layoutdaten darin verankert sind.' },
              { id: 'c', text: 'Ja, weil das W3C Layout-Attribute innerhalb von XML- und JSON-Dateien technisch sperrt', isCorrect: false, explanation: 'XML und JSON lassen beliebige Felder zu – die Trennung von Inhalt und Design ist eine Konzeptionsleistung.' },
              { id: 'd', text: 'Nein, weil echte Medienneutralität ausschließlich über binäre Datenbank-Exports erreicht wird', isCorrect: false, explanation: 'Auch textbasierte Formate wie XML und JSON sind bestens geeignet, sofern sie layoutfrei strukturiert sind.' }
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
              { id: 'a', text: 'Es überführt neutrale Daten nach festen Designregeln in das passende Zielmedium', isCorrect: true, explanation: 'Richtig! Das Template bereitet die Rohdaten gezielt für ein Zielmedium (z. B. Webshop oder Printkatalog) auf.' },
              { id: 'b', text: 'Es prüft die XML-Datei lediglich auf Rechtschreibfehler und kürzt zu lange Produkttexte', isCorrect: false, explanation: 'Templates steuern Layout und Darstellung, nicht redaktionelles Lektorat.' },
              { id: 'c', text: 'Es ersetzt die zentrale Datenbank und speichert sämtliche Produktinhalte dauerhaft im Layout', isCorrect: false, explanation: 'Daten bleiben zentral gespeichert; das Template dient nur der Ausgabegestaltung.' },
              { id: 'd', text: 'Es konvertiert alle fremden Bildformate automatisch in unkomprimierte Rohdaten für Archive', isCorrect: false, explanation: 'Archivierung von Rohdaten ist Aufgabe des DAM/Datenmanagements, nicht des Ausgabe-Templates.' }
            ]
          },
          {
            id: 'q-med-3-2',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Was unterscheidet Inhalt (Content) von Metadaten?',
            options: [
              { id: 'a', text: 'Inhalt ist für Nutzer sichtbar; Metadaten beschreiben und verwalten diesen Inhalt im Hintergrund', isCorrect: true, explanation: 'Exakt! Produkttext und Bild sind Inhalt; Bildrechte, Autor und Erstelldatum sind Metadaten (IHK-Musterantwort).' },
              { id: 'b', text: 'Inhalt liegt immer in digitaler Form vor, während Metadaten ausschließlich gedruckt archiviert werden', isCorrect: false, explanation: 'Beide werden digital verwaltet – der Unterschied liegt in Darstellung vs. Beschreibung.' },
              { id: 'c', text: 'Inhalt umfasst ausschließlich Bilder und Grafiken, während Metadaten alle Fließtexte enthalten', isCorrect: false, explanation: 'Auch Texte und Überschriften gehören zum Inhalt; Metadaten sind Daten über Daten.' },
              { id: 'd', text: 'Beide Begriffe werden im Publishing synonym für sämtliche Daten innerhalb einer XML-Datei genutzt', isCorrect: false, explanation: 'Inhalt und Metadaten erfüllen klar getrennte Aufgaben bei der Publikation und Verwaltung.' }
            ],
            merksatz: 'Inhalt = was veröffentlicht wird. Metadaten = Angaben zur Verwaltung & Rechtssicherheit (Bildrechte, Autor).'
          },
          {
            id: 'q-med-3-3',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Warum ist eine Qualitätskontrolle bei Single Source Publishing besonders kritisch?',
            options: [
              { id: 'a', text: 'Weil sich fehlerhafte oder veraltete Daten automatisch in alle Ausgabekanäle verbreiten', isCorrect: true, explanation: 'Richtig! Ein falscher Preis im zentralen Datenbestand landet sofort gleichzeitig in Web, Print und Newsletter.' },
              { id: 'b', text: 'Weil schon ein einzelner Tippfehler die gesamte Datenbankdatei unwiderruflich beschädigt', isCorrect: false, explanation: 'Inhaltliche Fehler beschädigen die Datei nicht technisch, multiplizieren sich aber in alle Medien.' },
              { id: 'c', text: 'Weil nachträgliche Korrekturen an zentralen Quelldaten im SSP technisch gesperrt sind', isCorrect: false, explanation: 'Zentrale Daten lassen sich jederzeit korrigieren – aber bereits gedruckte Auflagen nicht mehr.' },
              { id: 'd', text: 'Weil jedes Zielmedium eine völlig getrennte, unabhängige Datenquelle von Hand pflegen muss', isCorrect: false, explanation: 'Bei SSP gibt es genau eine zentrale Quelle – deshalb wirkt sich jeder Datenfehler kanalübergreifend aus.' }
            ]
          },
          {
            id: 'q-med-3-4',
            chapterId: 'crossmedia',
            moduleId: 'med-3',
            question: 'Welche 2 Vorteile und welche 2 Herausforderungen kennzeichnen medienneutrale Workflows?',
            options: [
              { id: 'a', text: 'Vorteile: Zentrale Pflege & Mehrfachnutzung; Hürden: Strukturierungsaufwand & Medienanpassung', isCorrect: true, explanation: 'Genau! Zentrale Datenpflege und Mehrfachnutzung stehen hohem Strukturierungsaufwand und komplexen Zielmedien-Templates gegenüber.' },
              { id: 'b', text: 'Vorteile: Geringer Startaufwand & keine Templates; Hürden: Nur ein Ausgabekanal nutzbar', isCorrect: false, explanation: 'Genau umgekehrt: Der Startaufwand ist höher, dafür sind viele Kanäle aus einer Quelle bedienbar.' },
              { id: 'c', text: 'Vorteile: Verzicht auf Typografie & Bilder; Hürden: Es lassen sich nur Zahlen verarbeiten', isCorrect: false, explanation: 'Medienneutrale Workflows verarbeiten Texte, Zahlen und Medienassets für voll gestaltete Ausgaben.' },
              { id: 'd', text: 'Vorteile: Automatische Druckfreigabe ohne Prüfung; Hürden: Keine Nutzung für Webshops möglich', isCorrect: false, explanation: 'Webshops sind sogar ein Paradebeispiel für SSP, und Qualitätskontrolle bleibt unerlässlich.' }
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
              { id: 'a', text: 'HTML nutzt feste Tags zur Darstellung; in XML definiert man eigene Tags für die Datenbedeutung', isCorrect: true, explanation: 'Richtig! HTML hat vordefinierte Tags (z. B. <h1>), während XML eigene semantische Tags (z. B. <produkt>) ermöglicht.' },
              { id: 'b', text: 'HTML dient ausschließlich lokalen Offline-Dokumenten, während XML nur im Webbrowser läuft', isCorrect: false, explanation: 'HTML ist gerade die Kernsprache für Webseiten im Browser; XML dient plattformübergreifendem Datenaustausch.' },
              { id: 'c', text: 'XML erlaubt nur numerische Tag-Namen ohne Buchstaben, während HTML Textnamen verwendet', isCorrect: false, explanation: 'XML-Tag-Namen bestehen regulär aus Buchstaben und dürfen sogar nicht mit einer Ziffer beginnen.' },
              { id: 'd', text: 'Beide Sprachen verwenden exakt denselben festen Tag-Katalog und unterscheiden sich nur bei CSS', isCorrect: false, explanation: 'XML besitzt keinen festen Tag-Katalog – genau darin liegt seine Erweiterbarkeit.' }
            ],
            merksatz: 'HTML = feste Tags für die Präsentation | XML = frei erfundene Tags für die Bedeutung.'
          },
          {
            id: 'q-med-4-2',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welche der folgenden Bedingungen MUSS zwingend erfüllt sein, damit ein XML-Dokument als „wohlgeformt“ (well-formed) gilt?',
            options: [
              { id: 'a', text: 'Genau ein Wurzelelement, alle Tags geschlossen, sauber verschachtelt und Case-Sensitivity beachtet', isCorrect: true, explanation: 'Exakt! Root-Element, geschlossene Tags, korrekte Verschachtelung ohne Überkreuzung und Groß-/Kleinschreibung sind Pflicht.' },
              { id: 'b', text: 'Mindestens zwei Wurzelelemente, optionale End-Tags und Verzicht auf Attribute in den Elementen', isCorrect: false, explanation: 'Ein XML-Dokument darf immer nur genau ein Wurzelelement haben und jedes Tag muss geschlossen sein.' },
              { id: 'c', text: 'Ausschließlich klein geschriebene Tag-Namen sowie mindestens eine eingebettete CSS-Datei', isCorrect: false, explanation: 'Großbuchstaben sind erlaubt, solange öffnendes und schließendes Tag exakt gleich geschrieben sind; CSS ist optional.' },
              { id: 'd', text: 'Eine vollständige deutsche Beschriftung aller Tags sowie ein verknüpftes Druck-PDF im Header', isCorrect: false, explanation: 'Die Wohlgeformtheit prüft formale XML-Syntaxregeln, nicht Sprache oder Dateianhänge.' }
            ]
          },
          {
            id: 'q-med-4-3',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welches XML-Codesegment enthält einen groben Syntaxfehler und ist NICHT wohlgeformt?',
            options: [
              { id: 'a', text: '<artikel><titel>Katalog</artikel></titel>', isCorrect: true, explanation: 'Richtig! Die Tags sind überkreuzt verschachtelt: <titel> wurde zuletzt geöffnet und muss zuerst geschlossen werden (<artikel><titel>Katalog</titel></artikel>).' },
              { id: 'b', text: '<produkt><name>Stuhl</name><preis>99</preis></produkt>', isCorrect: false, explanation: 'Dieses Segment ist vollständig wohlgeformt.' },
              { id: 'c', text: '<shop><produkt waehrung="EUR">Tisch</produkt></shop>', isCorrect: false, explanation: 'Dieses Segment ist vollständig wohlgeformt.' },
              { id: 'd', text: '<katalog><seite>Inhalt</seite></katalog>', isCorrect: false, explanation: 'Dieses Segment ist vollständig wohlgeformt.' }
            ]
          },
          {
            id: 'q-med-4-4',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welche Aufgabe übernimmt XSLT (Extensible Stylesheet Language Transformations) im Mediendesign-Workflow?',
            options: [
              { id: 'a', text: 'Es transformiert XML-Daten anhand von Vorlagen in Zielformate wie HTML', isCorrect: true, explanation: 'Exakt! XML (Rohdaten) + XSLT (Transformationsvorlage) ergibt z. B. formatiertes HTML für den Webbrowser.' },
              { id: 'b', text: 'Es prüft die Einhaltung erlaubter Datentypen und Pflichtfelder einer XML-Datei', isCorrect: false, explanation: 'Die Struktur- und Datentypprüfung übernimmt ein XML-Schema (XSD) oder eine DTD.' },
              { id: 'c', text: 'Es adressiert gezielt einzelne Knoten und Attribute innerhalb eines XML-Baums', isCorrect: false, explanation: 'Das gezielte Suchen und Adressieren von Knoten ist Aufgabe von XPath.' },
              { id: 'd', text: 'Es komprimiert große XML-Bestände verlustfrei für die Langzeitarchivierung', isCorrect: false, explanation: 'XSLT dient der Transformation in Zielformate, nicht der Dateikompression.' }
            ],
            merksatz: 'XSLT transformiert XML-Rohdaten in gestaltetes HTML oder Druckformate.'
          },
          {
            id: 'q-med-4-5',
            chapterId: 'crossmedia',
            moduleId: 'med-4',
            question: 'Welche 4-teilige IHK-Prüfungskette beschreibt das Zusammenspiel von XML und seinen Zusatztechnologien perfekt?',
            options: [
              { id: 'a', text: 'XML → DTD/XSD → XPath → XSLT', isCorrect: true, explanation: 'Perfekt! XML speichert Daten, DTD/XSD prüft die Struktur, XPath sucht Knoten und XSLT transformiert sie in Zielformate wie HTML.' },
              { id: 'b', text: 'HTML → CSS → JavaScript → PHP', isCorrect: false, explanation: 'Das ist der klassische Web-Stack, nicht die XML-Technologiefamilie.' },
              { id: 'c', text: 'JSON → SQL → REST → GraphQL', isCorrect: false, explanation: 'Das sind API- und Datenbanktechnologien, nicht die XML-Verarbeitungskette.' },
              { id: 'd', text: 'RGB → ICC → CMYK → PDF/X-4', isCorrect: false, explanation: 'Das beschreibt den Farbmanagement-Workflow in der Druckvorstufe.' }
            ],
            merksatz: 'Die Prüfungskette: XML speichert → DTD/XSD prüft → XPath sucht → XSLT macht Design/HTML!'
          }
        ]
      }
    ]
  },
  {
    id: 'graphics',
    number: 9,
    title: 'Digitale Bild- & Grafikdaten',
    subtitle: 'Vektor vs. Pixel, Farbräume & medienneutrale Daten',
    description: 'Meistere die technischen Grundlagen der digitalen Produktion: SVG vs. WebP, Kompression, Auflösung und medienneutrale Workflows.',
    accentColor: 'orange',
    examMerksatz: 'Medienneutrale Datenhaltung (Single Source Publishing) ermöglicht die effiziente Nutzung von Inhalten in verschiedenen Zielkanälen (Web, App, Print) durch Trennung von Inhalt und Layout.',
    examChecklist: [
      { task: 'Vektor vs. Pixel', detail: 'Vektoren (SVG) sind mathematisch berechnet und verlustfrei skalierbar; Pixel (WebP, JPG) sind rasterbasiert.' },
      { task: 'Verlustfreie vs. Verlustbehaftete Kompression', detail: 'JPG (verlustbehaftet/Lossy), PNG/WebP (verlustfrei möglich/Lossless).' },
      { task: 'RGB vs. CMYK', detail: 'RGB für Bildschirme (additiv), CMYK für Druck (subtraktiv). Crossmedia nutzt RGB als Basis.' },
      { task: 'Medienneutralität', detail: 'Daten werden in einem neutralen Format (oft XML/JSON) und Farbraum (RGB) vorgehalten.' }
    ],
    modules: [
      {
        id: 'gfx-1',
        chapterId: 'graphics',
        title: 'Pixel vs. Vektor (SVG & WebP)',
        shortDesc: 'Skalierbarkeit, Auflösung und moderne Webformate',
        estimatedMinutes: 4,
        miniGameType: 'graphics_format_match',
        nuggets: [
          {
            id: 'n-gfx-1',
            title: 'Pixelgrafiken (Rastergrafiken)',
            coreConcept: 'Bestehen aus einem Gitter von Farbpunkten.',
            bulletPoints: [
              'Vorteil: Realistische Fotos, komplexe Farbverläufe.',
              'Nachteil: Verpixeln beim Vergrößern, hohe Dateigrößen bei hoher Auflösung.',
              'Formate: WebP (Modern!), JPG, PNG, GIF.'
            ]
          },
          {
            id: 'n-gfx-2',
            title: 'Vektorgrafiken (SVG)',
            coreConcept: 'Bestehen aus mathematischen Pfaden (Linien, Kurven).',
            bulletPoints: [
              'Vorteil: Unendlich verlustfrei skalierbar, sehr kleine Dateigrößen für Icons/Logos, im Code editierbar.',
              'Nachteil: Nicht für Fotos geeignet.',
              'Format: SVG (Scalable Vector Graphics) – basiert auf XML!'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-gfx-1-1',
            chapterId: 'graphics',
            moduleId: 'gfx-1',
            question: 'Welches Format ist für ein responsives Firmenlogo im Web am besten geeignet, um auf allen Displaygrößen scharf zu bleiben?',
            options: [
              { id: 'a', text: 'SVG', isCorrect: true, explanation: 'Richtig! SVG ist vektorbasiert, bleibt bei jeder Skalierung gestochen scharf und ist sehr speichereffizient.' },
              { id: 'b', text: 'JPG', isCorrect: false, explanation: 'JPG ist eine verlustbehaftete Rastergrafik und verpixelt beim Vergrößern.' },
              { id: 'c', text: 'BMP', isCorrect: false, explanation: 'BMP ist unkomprimiert, pixelbasiert und fürs Web ungeeignet.' },
              { id: 'd', text: 'TIFF', isCorrect: false, explanation: 'TIFF ist ein Print-/Archivformat für Rasterdaten und kein gängiges Web-Logoformat.' }
            ]
          },
          {
            id: 'q-gfx-1-2',
            chapterId: 'graphics',
            moduleId: 'gfx-1',
            question: 'Was passiert mit einer Pixelgrafik (Rastergrafik), wenn sie extrem stark vergrößert wird?',
            options: [
              { id: 'a', text: 'Es entsteht sichtbare Treppchenbildung, weil die einzelnen Bildpunkte vergrößert werden', isCorrect: true, explanation: 'Richtig! Da Rastergrafiken aus einem festen Pixelraster bestehen, führt starkes Vergrößern zu Unschärfe und Treppchenbildung (Verpixelung).' },
              { id: 'b', text: 'Sie wird vom Betriebssystem automatisch in mathematische Vektorpfade umgerechnet', isCorrect: false, explanation: 'Eine Vektorisierung erfolgt nicht automatisch beim Vergrößern, sondern erfordert spezielle Nachzeichnung.' },
              { id: 'c', text: 'Die Dateigröße reduziert sich proportional, da weniger Bildpunkte pro Fläche vorliegen', isCorrect: false, explanation: 'Die reine Skalierung bei der Darstellung verringert nicht automatisch die gespeicherte Pixelanzahl.' },
              { id: 'd', text: 'Die Farbdarstellung wechselt automatisch vom RGB- in den CMYK-Druckfarbraum', isCorrect: false, explanation: 'Der Farbraum bleibt beim Skalieren unverändert.' }
            ]
          },
          {
            id: 'q-gfx-1-3',
            chapterId: 'graphics',
            moduleId: 'gfx-1',
            question: 'Auf welcher Auszeichnungssprache basiert das Vektorgrafik-Format SVG (Scalable Vector Graphics)?',
            options: [
              { id: 'a', text: 'XML', isCorrect: true, explanation: 'Exakt! SVG basiert auf XML (Extensible Markup Language), sodass Pfade und Formen textbasiert beschrieben werden.' },
              { id: 'b', text: 'JSON', isCorrect: false, explanation: 'JSON ist ein Datenaustauschformat, aber nicht die Auszeichnungssprache hinter SVG.' },
              { id: 'c', text: 'PostScript', isCorrect: false, explanation: 'PostScript ist eine Seitenbeschreibungssprache aus dem Druckbereich (z. B. EPS), nicht die Basis von SVG.' },
              { id: 'd', text: 'SQL', isCorrect: false, explanation: 'SQL ist eine Datenbankabfragesprache und keine Auszeichnungssprache für Vektorgrafiken.' }
            ],
            merksatz: 'SVG ist ein XML-basiertes Vektorformat – unendlich skalierbar und per Code/CSS manipulierbar!'
          }
        ]
      },
      {
        id: 'gfx-2',
        chapterId: 'graphics',
        title: 'Kompression & Bildbewertung',
        shortDesc: 'Lossy vs. Lossless und das Allround-Talent WebP',
        estimatedMinutes: 3,
        nuggets: [
          {
            id: 'n-gfx-3',
            title: 'Verlustbehaftet (Lossy) vs. Verlustfrei (Lossless)',
            coreConcept: 'Dateigröße vs. Bildqualität.',
            bulletPoints: [
              'Lossy: Bildinformationen werden unwiderruflich gelöscht (z. B. JPG). Spart extrem viel Platz, führt aber zu Artefakten.',
              'Lossless: Alle Daten bleiben erhalten (z. B. PNG, WebP-Lossless). Ideal für Grafiken mit Text oder Transparenz.'
            ]
          },
          {
            id: 'n-gfx-4',
            title: 'WebP: Der IHK-Prüfungsfavorit',
            coreConcept: 'Das moderne All-in-One Format von Google.',
            bulletPoints: [
              'Unterstützt Lossy UND Lossless Kompression.',
              'Unterstützt Alphakanäle (Transparenz) wie PNG.',
              'Unterstützt Animationen wie GIF.',
              'Dateigröße meist 25-30% kleiner als JPG/PNG bei gleicher Qualität.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-gfx-2-1',
            chapterId: 'graphics',
            moduleId: 'gfx-2',
            question: 'Was ist ein wesentlicher Vorteil des WebP-Formats gegenüber dem klassischen JPG?',
            options: [
              { id: 'a', text: 'Bessere Kompression bei gleicher Qualität sowie Unterstützung von Transparenz', isCorrect: true, explanation: 'Exakt! WebP verbindet effiziente Kompression mit Alphakanal-Transparenz und Animation.' },
              { id: 'b', text: 'Native Unterstützung des CMYK-Farbraums für die direkte Offsetdruck-Belichtung', isCorrect: false, explanation: 'WebP ist ein reines Web-Bildformat im RGB-Raum und kein klassisches Druckvorstufenformat.' },
              { id: 'c', text: 'Unbegrenzte verlustfreie Skalierbarkeit durch mathematisch definierte Vektorpfade', isCorrect: false, explanation: 'WebP ist ein Rastergrafikformat; Vektorpfade bietet SVG.' },
              { id: 'd', text: 'Verzicht auf jegliche Bildkompression bei gleichzeitig halbierter Pixelauflösung', isCorrect: false, explanation: 'WebP erzielt kleinere Dateien durch moderne verlustbehaftete oder verlustfreie Kompression, nicht durch Halbierung der Auflösung.' }
            ]
          },
          {
            id: 'q-gfx-2-2',
            chapterId: 'graphics',
            moduleId: 'gfx-2',
            question: 'Welches Kompressionsverfahren eignet sich am besten für Screenshots mit feinem Text und transparentem Hintergrund?',
            options: [
              { id: 'a', text: 'Verlustfreie Kompression wie PNG oder verlustfreies WebP', isCorrect: true, explanation: 'Richtig! Verlustfreie (Lossless) Kompression verhindert Artefakte an scharfen Textkanten und unterstützt Transparenz.' },
              { id: 'b', text: 'Stark verlustbehaftete JPG-Kompression mit geringer Qualität', isCorrect: false, explanation: 'JPG erzeugt störende Artefakte an Textkanten und unterstützt keinen Alphakanal.' },
              { id: 'c', text: 'Unkomprimierte CMYK-Farbseparation im Druckformat TIFF', isCorrect: false, explanation: 'TIFF im CMYK-Raum ist für Web-Screenshots wegen Dateigröße und Browser-Support ungeeignet.' },
              { id: 'd', text: 'Reduzierte 8-Bit-Palette ohne feine Abstufungen als animiertes GIF', isCorrect: false, explanation: 'GIF kennt nur 256 Farben und keine weiche Halbtransparenz (Alphakanal).' }
            ]
          },
          {
            id: 'q-gfx-2-3',
            chapterId: 'graphics',
            moduleId: 'gfx-2',
            question: 'Was versteht man unter "Kompression-Artefakten" bei einer JPG-Datei?',
            options: [
              { id: 'a', text: 'Sichtbare Blockbildungen und Fransen an Kanten durch verlustbehaftete Kompression', isCorrect: true, explanation: 'Exakt! JPG fasst ähnliche 8×8-Pixelblöcke zusammen, was bei starker Kompression sichtbare Störungen erzeugt.' },
              { id: 'b', text: 'Automatisch eingebettete Metadaten zu Kamera, Brennweite und Aufnahmedatum', isCorrect: false, explanation: 'Das sind EXIF-Metadaten, keine Kompressionsartefakte.' },
              { id: 'c', text: 'Gezielte Kantenverstärkung zur besseren Lesbarkeit von Texten in Rasterbildern', isCorrect: false, explanation: 'Artefakte sind unerwünschte Qualitätsverluste, keine gewollte Schärfung.' },
              { id: 'd', text: 'Unsichtbare digitale Markierungen zum Schutz des Urheberrechts im Bildmaterial', isCorrect: false, explanation: 'Das sind digitale Wasserzeichen, keine Kompressionsartefakte.' }
            ],
            examTip: 'IHK-Merksatz: Verlustbehaftete Kompression (JPG) spart Speicher, erzeugt aber irreversible Kompressionsartefakte.'
          }
        ]
      },
      {
        id: 'gfx-3',
        chapterId: 'graphics',
        title: 'Crossmedia & Medienneutrale Daten',
        shortDesc: 'Single Source Publishing: Einmal erstellen, überall nutzen',
        estimatedMinutes: 4,
        nuggets: [
          {
            id: 'n-gfx-5',
            title: 'Was bedeutet medienneutral?',
            coreConcept: 'Inhalte ohne Kanalspezialisierung speichern.',
            bulletPoints: [
              'Inhalt (XML/Daten) ist getrennt von der Form (CSS/Layout).',
              'Farbraum: Speicherung in eciRGB (großer RGB-Farbraum) statt CMYK.',
              'Vorteil: Bilder können später sowohl für Web (sRGB) auch für Druck (ISO Coated v2) perfekt konvertiert werden.'
            ],
            examFavorite: true
          },
          {
            id: 'n-gfx-6',
            title: 'Workflow: RGB vs. CMYK',
            coreConcept: 'Farben für verschiedene Ausgabemedien.',
            bulletPoints: [
              'RGB: Additive Farbmischung (Licht), für Monitore.',
              'CMYK: Subtraktive Farbmischung (Pigment), für Druck.',
              'IHK-Regel: Im medienneutralen Workflow erfolgt die Konvertierung nach CMYK erst so spät wie möglich ("Late Binding").'
            ]
          }
        ],
        quizQuestions: [
          {
            id: 'q-gfx-3-1',
            chapterId: 'graphics',
            moduleId: 'gfx-3',
            question: 'Was versteht man unter medienneutraler Datenhaltung?',
            options: [
              { id: 'a', text: 'Daten werden unabhängig vom Ausgabekanal für Web, Print und App aufbereitet', isCorrect: true, explanation: 'Richtig! Die Trennung von Inhalt und medienspezifischem Format macht Inhalte mehrfach nutzbar.' },
              { id: 'b', text: 'Daten werden ausschließlich auf lokalen Wechselmedien ohne Cloud-Anbindung archiviert', isCorrect: false, explanation: 'Medienneutralität meint Unabhängigkeit vom Ausgabemedium, nicht vom Speichermedium.' },
              { id: 'c', text: 'Alle Bilder werden vorab in Graustufen ohne Farbprofil vereinheitlicht gespeichert', isCorrect: false, explanation: 'Medienneutrale Bilddaten bleiben im großen RGB-Farbraum, nicht in Graustufen.' },
              { id: 'd', text: 'Sämtliche Metadaten und Strukturmerkmale werden vor der Ausgabe entfernt', isCorrect: false, explanation: 'Genau das Gegenteil: Struktur und Metadaten sind für medienneutrale Datenhaltung entscheidend.' }
            ]
          },
          {
            id: 'q-gfx-3-2',
            chapterId: 'graphics',
            moduleId: 'gfx-3',
            question: 'Was versteht man unter dem Prinzip des "Late Binding" bei der Farbraumkonvertierung in der Medienproduktion?',
            options: [
              { id: 'a', text: 'Bilddaten bleiben lange im neutralen RGB-Raum und werden erst bei der Druckausgabe in CMYK gewandelt', isCorrect: true, explanation: 'Richtig! Late Binding bewahrt das volle Farbspektrum für alle Kanäle bis zur finalen Druckausgabe.' },
              { id: 'b', text: 'Bilddaten werden direkt nach dem Import in den zielspezifischen CMYK-Druckfarbraum konvertiert', isCorrect: false, explanation: 'Das wäre „Early Binding“ und beschneidet frühzeitig den größeren RGB-Farbraum für digitale Kanäle.' },
              { id: 'c', text: 'Farbprofile werden erst nach dem Auflagendruck manuell in der Druckmaschine zugewiesen', isCorrect: false, explanation: 'Die Farbraumkonvertierung erfolgt vor der Druckplattenbelichtung, typischerweise beim PDF/X-Export oder im RIP.' },
              { id: 'd', text: 'Verknüpfte Bilddateien und Schriften werden erst bei der Langzeitarchivierung ins Dokument eingebettet', isCorrect: false, explanation: 'Late Binding im Farbmanagement bezieht sich auf den späten Zeitpunkt der Farbraumkonvertierung.' }
            ]
          },
          {
            id: 'q-gfx-3-3',
            chapterId: 'graphics',
            moduleId: 'gfx-3',
            question: 'Warum gilt der eciRGB-v2-Farbraum als besonders geeignet für die medienneutrale Bilddatenhaltung?',
            options: [
              { id: 'a', text: 'Weil sein großer Farbumfang sowohl sRGB fürs Web als auch Offset-CMYK gut abdeckt', isCorrect: true, explanation: 'Exakt! Der große RGB-Arbeitsfarbraum eciRGB v2 minimiert Farbverluste bei späteren Konvertierungen in sRGB oder CMYK.' },
              { id: 'b', text: 'Weil er direkt auf die vier Druckfarben Cyan, Magenta, Gelb und Schwarz begrenzt ist', isCorrect: false, explanation: 'eciRGB v2 ist ein großer RGB-Arbeitsfarbraum, kein 4-Farb-CMYK-Raum.' },
              { id: 'c', text: 'Weil er Web-Dateien beim Export automatisch ohne Qualitätsverlust um die Hälfte verkleinert', isCorrect: false, explanation: 'Ein Farbprofil definiert die Farbdarstellung, nicht die Dateikompression.' },
              { id: 'd', text: 'Weil moderne Webbrowser ausschließlich Bilder im eciRGB-v2-Profil fehlerfrei anzeigen', isCorrect: false, explanation: 'Für das Web wird standardmäßig in sRGB konvertiert; eciRGB v2 dient als medienneutraler Master-Arbeitsfarbraum.' }
            ],
            merksatz: 'Late Binding & eciRGB-v2 sichern maximale Farbqualität für die spätere Transformation in Web (sRGB) oder Print (CMYK).'
          }
        ]
      }
    ]
  },
  {
    id: 'wiso',
    number: 10,
    title: 'Wirtschafts- & Sozialkunde (WiSo)',
    subtitle: 'Recht, Sozialversicherung, Markt & Betriebswirtschaft 2026/27',
    description: 'Offizieller bundesweiter Prüfungsstoff nach PAL- & KMK-Standard: Berufsausbildung (BBiG), Arbeitsvertrag, Kündigung, Arbeitsschutz (JArbSchG, ArbZG), die 5 Säulen der Sozialversicherung, Gehaltsabrechnung, Betriebsrat (BetrVG) und Unternehmensformen.',
    accentColor: 'blue',
    examMerksatz: 'WiSo verbindet rechtliche Schutzvorschriften (BBiG, JArbSchG, KSchG), soziale Sicherheit (5 Säulen der Sozialversicherung) und betriebswirtschaftliche Realität (Markt, Rechtsformen & Verträge) in konkreten Praxisfällen einer IHK-Musterfirma.',
    examChecklist: [
      { task: 'Duales Ausbildungssystem & BBiG', detail: 'Lernorte Betrieb & Berufsschule; Zustandekommen des Ausbildungsvertrags, Rechte & Pflichten der Vertragspartner.' },
      { task: 'Probezeit & Kündigung im BBiG', detail: 'Probezeit mind. 1 bis max. 4 Monate; Kündigung in Probezeit fristlos ohne Grund; danach ordentlich nur durch Azubi mit 4 Wochen Frist bei Berufsaufgabe.' },
      { task: 'Schutzgesetze am Arbeitsplatz', detail: 'JArbSchG (max. 8 Std./Tag, 40 Std./Woche, 5-Tage-Woche, Ruhepausen), ArbZG, Mutterschutzgesetz, Bundesurlaubsgesetz (BUrlG).' },
      { task: 'Die 5 Säulen der Sozialversicherung', detail: 'Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung (wichtig: Unfallversicherung zahlt der Arbeitgeber zu 100%!).' },
      { task: 'Entgeltabrechnung (Brutto vs. Netto)', detail: 'Bruttogehalt abzüglich Lohnsteuer, Solidaritätszuschlag/Kirchensteuer und Arbeitnehmeranteile der Sozialabgaben = Nettogehalt.' },
      { task: 'Betriebliche Mitbestimmung (BetrVG)', detail: 'Betriebsrat ab 5 wahlberechtigten AN; Mitbestimmungsrechte bei Arbeitszeit, Überstunden und Urlaubsgrundsätzen; JAV ab 5 Jugendlichen/Azubis.' },
      { task: 'Unternehmens- & Rechtsformen', detail: 'Einzelunternehmen (unbeschränkte Vollhaftung), Personengesellschaften (OHG, KG), Kapitalgesellschaften (GmbH mind. 25.000 € Stammkapital, AG mind. 50.000 € Grundkapital).' },
      { task: 'Kaufvertrag & Störungen', detail: 'Zwei übereinstimmende Willenserklärungen (Antrag & Annahme); Mängelrüge, Lieferverzug und Zahlungsverzug rechtssicher anwenden.' }
    ],
    modules: [
      {
        id: 'wiso-1',
        chapterId: 'wiso',
        title: 'Berufsausbildung & Arbeitsrecht (BBiG & Schutzgesetze)',
        shortDesc: 'Ausbildungsvertrag, Rechte & Pflichten, Probezeit, Kündigung, JArbSchG & ArbZG',
        estimatedMinutes: 5,
        miniGameType: 'wiso_case_match',
        nuggets: [
          {
            id: 'n-wiso-1-1',
            title: 'Das duale System & der Berufsausbildungsvertrag',
            coreConcept: 'Das duale System bildet an zwei Lernorten aus: Betrieb (Praxis) und Berufsschule (Theorie). Geregelt durch das Berufsbildungsgesetz (BBiG).',
            bulletPoints: [
              'Der Ausbildungsvertrag muss vor Beginn schriftlich niedergelegt und von Ausbildendem, Azubi (sowie bei Minderjährigen den gesetzlichen Vertretern) unterschrieben werden.',
              'Wesentliche Vertragsinhalte: Art, sachliche und zeitliche Gliederung, Beginn und Dauer, tägliche Arbeitszeit, Dauer der Probezeit, Vergütung und Urlaub.',
              'Eintragung: Der Vertrag muss unverzüglich zur Eintragung in das Verzeichnis der Berufsausbildungsverhältnisse bei der zuständigen IHK eingereicht werden.'
            ],
            merksatz: 'Der Ausbildungsvertrag ist vor Ausbildungsbeginn schriftlich abzufassen und bei der IHK einzureichen.'
          },
          {
            id: 'n-wiso-1-2',
            title: 'Rechte & Pflichten der Vertragspartner',
            coreConcept: 'Die Pflichten des Ausbildenden spiegeln die Rechte des Auszubildenden wider und umgekehrt.',
            bulletPoints: [
              'Hauptpflichten des Ausbildenden: Ausbildungspflicht (Ausbildungsziel vermitteln), Vergütungspflicht, Fürsorgepflicht, Freistellung für Berufsschule & Prüfungen, Bereitstellung von Ausbildungsmitteln (z.B. Software, Arbeitsplatz), Zeugnisausstellung.',
              'Hauptpflichten des Auszubildenden: Lernpflicht, Weisungsgebundenheit, Sorgfaltspflicht, Schweigepflicht (Betriebsgeheimnisse wahren), Berufsschulpflicht, Führen des Ausbildungsnachweises (Berichtsheft), Benachrichtigungspflicht bei Arbeitsunfähigkeit (AU).'
            ],
            examFavorite: true,
            example: 'Ein Azubi wird 3 Wochen nur zum Kaffeekochen und Botengängen eingeteilt. Dies verstößt gegen die Ausbildungspflicht nach § 14 BBiG.'
          },
          {
            id: 'n-wiso-1-3',
            title: 'Probezeit & Kündigung im Ausbildungsverhältnis',
            coreConcept: 'Prüfungsdauerbrenner bei der IHK! Strenge gesetzliche Vorgaben nach § 20 und § 22 BBiG schützen Azubis nach der Probezeit vor willkürlicher Kündigung.',
            bulletPoints: [
              'Probezeit (§ 20 BBiG): Mindestens 1 Monat, maximal 4 Monate. Während der Probezeit kann von beiden Seiten jederzeit ohne Einhaltung einer Frist und ohne Angabe von Gründen schriftlich gekündigt werden.',
              'Nach der Probezeit kann der Betrieb nur noch außerordentlich (fristlos) aus wichtigem Grund kündigen (z.B. Diebstahl, beharrliche Arbeitsverweigerung) – Kündigung muss innerhalb von 2 Wochen nach Bekanntwerden des Grundes erfolgen.',
              'Der Auszubildende kann nach der Probezeit mit einer Frist von 4 Wochen ordentlich kündigen, wenn er die Berufsausbildung aufgibt oder sich in einem anderen Beruf ausbilden lassen will.'
            ],
            merksatz: 'Probezeit: 1 bis 4 Monate, fristlos ohne Grund. Nach der Probezeit: Betrieb kann nur aus wichtigem Grund fristlos kündigen; Azubi mit 4 Wochen Frist bei Berufswechsel!'
          },
          {
            id: 'n-wiso-1-4',
            title: 'Jugendarbeitsschutz (JArbSchG) & Arbeitszeitgesetz (ArbZG)',
            coreConcept: 'Schutz von jugendlichen Auszubildenden (unter 18 Jahren) vor Überlastung und Gefährdungen am Ausbildungsplatz.',
            bulletPoints: [
              'Höchstarbeitszeit für Jugendliche: Maximal 8 Stunden täglich, maximal 40 Stunden wöchentlich an 5 Tagen (Montag bis Freitag; Wochenende grundsätzlich frei).',
              'Ruhepausen (JArbSchG): Bei 4,5 bis 6 Std. Arbeitszeit mind. 30 Minuten Pause; bei mehr als 6 Std. mind. 60 Minuten Pause (Pausen mind. 15 Minuten lang).',
              'Schichtzeit & Freizeit: Zwischen zwei Arbeitstagen müssen mindestens 12 Stunden ununterbrochene Freizeit liegen.',
              'Arbeitszeitgesetz (Erwachsene ab 18): Regelarbeitszeit 8 Std./Werktag (Montag bis Samstag = max. 48 Std./Woche), vorübergehend auf 10 Std. erweiterbar, wenn im Schnitt von 6 Monaten 8 Std. nicht überschritten werden.'
            ],
            examFavorite: true
          }
        ],
        quizQuestions: [
          {
            id: 'q-wiso-1-1',
            chapterId: 'wiso',
            moduleId: 'wiso-1',
            question: 'Wie lange darf die Probezeit in einem Berufsausbildungsverhältnis nach dem Berufsbildungsgesetz (BBiG) maximal dauern?',
            options: [
              { id: 'a', text: 'Mindestens 1 Monat und höchstens 4 Monate', isCorrect: true, explanation: 'Richtig! § 20 BBiG schreibt zwingend vor: Die Probezeit muss mindestens einen Monat und darf höchstens vier Monate betragen.' },
              { id: 'b', text: 'Mindestens 2 Monate und höchstens 6 Monate', isCorrect: false, explanation: 'Falsch: Bis zu 6 Monate gelten für reguläre Arbeitsverhältnisse nach BGB, für Azubis gilt nach § 20 BBiG die Obergrenze von 4 Monaten.' },
              { id: 'c', text: 'Mindestens 1 Monat und höchstens 3 Monate', isCorrect: false, explanation: 'Falsch: 3 Monate werden oft vereinbart, die gesetzliche Obergrenze nach BBiG liegt aber bei 4 Monaten.' },
              { id: 'd', text: 'Frei vereinbar, sofern beide Seiten zustimmen', isCorrect: false, explanation: 'Falsch: Das BBiG ist zwingendes Schutzrecht und darf nicht zuungunsten der Auszubildenden ausgedehnt werden.' }
            ],
            merksatz: 'BBiG § 20: Probezeit mindestens 1 Monat, höchstens 4 Monate!'
          },
          {
            id: 'q-wiso-1-2',
            chapterId: 'wiso',
            moduleId: 'wiso-1',
            question: 'Ein Mediengestalter-Azubi hat seine 3-monatige Probezeit erfolgreich beendet. Nach 8 Monaten Ausbildung möchte der Betrieb dem Azubi ordentlich mit einer Frist von 4 Wochen kündigen, weil die Auftragslage eingebrochen ist. Ist diese Kündigung rechtmäßig?',
            options: [
              { id: 'a', text: 'Nein, eine ordentliche Kündigung durch den Ausbildungsbetrieb ist nach der Probezeit ausgeschlossen', isCorrect: true, explanation: 'Exakt! Nach § 22 Abs. 2 BBiG kann der Betrieb nach der Probezeit nicht mehr ordentlich (z. B. betriebsbedingt) kündigen, sondern nur außerordentlich aus wichtigem Grund.' },
              { id: 'b', text: 'Ja, bei rückläufiger Auftragslage gilt die gesetzliche Kündigungsfrist von vier Wochen zum Monatsende', isCorrect: false, explanation: 'Falsch: Wirtschaftliche Flauten berechtigen nach Ablauf der Probezeit nicht zur ordentlichen Kündigung eines Azubis.' },
              { id: 'c', text: 'Ja, sofern der Betriebsrat vorab angehört wurde und der Kündigung ausdrücklich zugestimmt hat', isCorrect: false, explanation: 'Falsch: Selbst mit Zustimmung des Betriebsrats ist eine ordentliche Kündigung durch den Betrieb nach § 22 BBiG unwirksam.' },
              { id: 'd', text: 'Ja, allerdings nur gegen Zahlung einer gesetzlichen Abfindung in Höhe von drei Monatsvergütungen', isCorrect: false, explanation: 'Falsch: Das BBiG sieht keinen Abfindungs-Freikauf vor; die ordentliche Kündigung durch den Betrieb ist schlicht unwirksam.' }
            ],
            merksatz: 'Nach der Probezeit gibt es für den Ausbildungsbetrieb keine ordentliche Kündigung mehr!'
          },
          {
            id: 'q-wiso-1-3',
            chapterId: 'wiso',
            moduleId: 'wiso-1',
            question: 'Welche maximale tägliche Arbeitszeit und welche wöchentliche Obergrenze gilt nach dem Jugendarbeitsschutzgesetz (JArbSchG) für einen 17-jährigen Auszubildenden?',
            options: [
              { id: 'a', text: 'Maximal 8 Stunden täglich und 40 Stunden wöchentlich an höchstens 5 Tagen', isCorrect: true, explanation: 'Richtig! Nach §§ 8, 15 JArbSchG gelten maximal 8 Stunden täglich, 40 Stunden wöchentlich und die 5-Tage-Woche.' },
              { id: 'b', text: 'Maximal 10 Stunden täglich und 48 Stunden wöchentlich an höchstens 6 Tagen', isCorrect: false, explanation: 'Falsch: Das entspricht den Höchstgrenzen des ArbZG für volljährige Arbeitnehmer.' },
              { id: 'c', text: 'Maximal 7 Stunden täglich und 35 Stunden wöchentlich an höchstens 5 Tagen', isCorrect: false, explanation: 'Falsch: Die gesetzliche Obergrenze im JArbSchG liegt bei 8 Stunden täglich bzw. 40 Stunden wöchentlich.' },
              { id: 'd', text: 'Maximal 8,5 Stunden täglich und 42 Stunden wöchentlich an höchstens 6 Tagen', isCorrect: false, explanation: 'Falsch: Für Jugendliche gilt die 5-Tage-Woche und grundsätzlich das 8-Stunden-Limit (Ausgleich bis 8,5 Std. nur bei Verkürzung an einem anderen Tag derselben Woche).' }
            ],
            merksatz: 'JArbSchG: Max. 8 Stunden am Tag, max. 40 Stunden in der Woche, 5-Tage-Woche!'
          },
          {
            id: 'q-wiso-1-4',
            chapterId: 'wiso',
            moduleId: 'wiso-1',
            question: 'Wie hoch ist der gesetzliche Mindesturlaubsanspruch nach dem Bundesurlaubsgesetz (BUrlG) bei einer 5-Tage-Woche und wie ist er im Vergleich zum JArbSchG geregelt?',
            options: [
              { id: 'a', text: 'BUrlG: 20 Arbeitstage bei 5-Tage-Woche; JArbSchG: je nach Alter 30, 27 oder 25 Werktage', isCorrect: true, explanation: 'Richtig! Das BUrlG garantiert 24 Werktage (= 20 Arbeitstage bei 5-Tage-Woche). Für Jugendliche unter 16/17/18 Jahren gelten 30/27/25 Werktage nach § 19 JArbSchG.' },
              { id: 'b', text: 'BUrlG: 15 Arbeitstage bei 5-Tage-Woche; JArbSchG: einheitlich 20 Werktage für alle Azubis', isCorrect: false, explanation: 'Falsch: Beide Werte liegen deutlich unter dem gesetzlichen Mindesturlaub.' },
              { id: 'c', text: 'BUrlG: 30 Arbeitstage für Erwachsene; JArbSchG: einheitlich 20 Werktage für Jugendliche', isCorrect: false, explanation: 'Falsch: Jugendliche genießen höheren Schutz und erhalten mehr gesetzlichen Mindesturlaub als Erwachsene.' },
              { id: 'd', text: 'BUrlG: 24 Arbeitstage ab dem 2. Berufsjahr; JArbSchG: 18 Werktage während der Ausbildung', isCorrect: false, explanation: 'Falsch: Der volle Urlaubsanspruch entsteht bereits nach 6 Monaten Wartezeit und liegt für Jugendliche höher.' }
            ],
            merksatz: 'BUrlG: Mind. 20 Arbeitstage (5-Tage-Woche). JArbSchG: Unter 16 = 30, unter 17 = 27, unter 18 = 25 Werktage!'
          },
          {
            id: 'q-wiso-1-5',
            chapterId: 'wiso',
            moduleId: 'wiso-1',
            question: 'Wann greift das Kündigungsschutzgesetz (KSchG) für reguläre Arbeitnehmer und welche drei Kündigungsgründe unterscheidet es?',
            options: [
              { id: 'a', text: 'Ab über 10 Vollzeitkräften nach 6 Monaten; Gründe: personen-, verhaltens- oder betriebsbedingt', isCorrect: true, explanation: 'Exakt! Das KSchG gilt bei mehr als 10 Vollzeit-Beschäftigten nach 6 Monaten Wartezeit; Kündigungen müssen sozial gerechtfertigt sein.' },
              { id: 'b', text: 'In allen Betrieben ab dem ersten Beschäftigten ab Tag 1; Gründe: wirtschaftlich oder persönlich', isCorrect: false, explanation: 'Falsch: Kleinbetriebe mit bis zu 10 Vollzeit-Beschäftigten fallen nicht unter das KSchG.' },
              { id: 'c', text: 'Ab 5 Beschäftigten nach dem 1. Ausbildungsjahr; Gründe: nur betriebs- oder fristlos bedingt', isCorrect: false, explanation: 'Falsch: Für Auszubildende gilt vorrangig das BBiG, und die KSchG-Schwelle liegt bei mehr als 10 Arbeitnehmern.' },
              { id: 'd', text: 'Ab 50 Beschäftigten nach 2 Jahren Betriebszugehörigkeit; Gründe: nur betriebsbedingt zulässig', isCorrect: false, explanation: 'Falsch: Die Schwellenwerte sind > 10 Beschäftigte und 6 Monate Wartezeit mit drei anerkannten Kündigungsgründen.' }
            ],
            merksatz: 'KSchG: Gilt ab >10 Mitarbeitern nach 6 Monaten Wartezeit: personen-, verhaltens- oder betriebsbedingt!'
          }
        ]
      },
      {
        id: 'wiso-2',
        chapterId: 'wiso',
        title: 'Arbeitsverhältnis, Entgeltabrechnung & Mitbestimmung',
        shortDesc: 'Arbeitsvertrag, Brutto vs. Netto, Tarifverträge & Betriebsrat (BetrVG)',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-wiso-2-1',
            title: 'Der Arbeitsvertrag & die Tarifordnung',
            coreConcept: 'Das Zustandekommen des Arbeitsvertrags basiert auf zwei übereinstimmenden Willenserklärungen (Angebot und Annahme). Geregelt durch BGB, Nachweisgesetz und Tarifvertragsrecht.',
            bulletPoints: [
              'Rangfolge der Rechtsquellen (Günstigkeitsprinzip): Grundgesetz → Gesetze (z.B. BGB, BUrlG, ArbZG) → Tarifvertrag → Betriebsvereinbarung → Einzelarbeitsvertrag → Direktionsrecht.',
              'Günstigkeitsprinzip: Eine rangniedrigere Regelung darf von einer ranghöheren nur abweichen, wenn sie für den Arbeitnehmer günstiger ist (z.B. 30 Tage Urlaub im Arbeitsvertrag, obwohl gesetzlich nur 20 Tage bei 5-Tage-Woche vorgeschrieben sind).',
              'Tarifparteien: Gewerkschaften (z.B. ver.di für Medien) und Arbeitgeberverbände. Tarifautonomie bedeutet: Der Staat mischt sich nicht in Tarifverhandlungen ein.'
            ],
            merksatz: 'Günstigkeitsprinzip: Der Arbeitsvertrag darf geltende Gesetze und Tarifverträge nur zugunsten des Arbeitnehmers übertreffen!'
          },
          {
            id: 'n-wiso-2-2',
            title: 'Entgeltabrechnung: Vom Brutto zum Netto',
            coreConcept: 'Der Arbeitgeber ist verpflichtet, die gesetzlichen Abzüge (Steuern und Sozialversicherungsbeiträge) direkt vom Bruttogehalt einzubehalten und an Finanzamt bzw. Krankenkassen abzuführen.',
            bulletPoints: [
              'Gesamtbrutto = Grundgehalt + Zuschläge (z.B. Überstunden) + vermögenswirksame Leistungen (VWL) + geldwerte Vorteile.',
              'Gesetzliche Abzüge 1 (Steuern): Lohnsteuer (nach Steuerklasse I bis VI), Solidaritätszuschlag (nur noch ab hohen Einkommen), Kirchensteuer (8% bzw. 9% der Lohnsteuer).',
              'Gesetzliche Abzüge 2 (Sozialversicherung): Arbeitnehmeranteile zu Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung.',
              'Nettogehalt = Bruttogehalt - Steuern - Arbeitnehmeranteil Sozialversicherung.',
              'Auszahlungsbetrag = Nettogehalt - persönliche Abzüge (z.B. Pfändung, VWL-Eigenanteil).'
            ],
            examFavorite: true,
            example: 'Ein Bruttogehalt von 2.800 € führt nach Abzug von ca. 270 € Lohnsteuer und ca. 560 € Sozialabgaben zu einem Nettogehalt von ca. 1.970 €.'
          },
          {
            id: 'n-wiso-2-3',
            title: 'Betriebliche Mitbestimmung: Der Betriebsrat & JAV',
            coreConcept: 'Geregelt durch das Betriebsverfassungsgesetz (BetrVG). Vertritt die Interessen der Belegschaft gegenüber der Geschäftsleitung.',
            bulletPoints: [
              'Voraussetzung für Betriebsrat: Mindestens 5 ständige wahlberechtigte Arbeitnehmer (ab 18 Jahre), von denen 3 wählbar sind (mind. 6 Monate im Betrieb). Amtszeit: 4 Jahre.',
              'Mitbestimmungsrechte des Betriebsrats: 1. Echte Mitbestimmung (§ 87 BetrVG: Lage der Arbeitszeit, Pausen, Urlaubsplanung, Überstunden, Überwachungstechnik). 2. Mitwirkung/Anhörung (§ 102 BetrVG: Bei jeder Kündigung MUSS der Betriebsrat vorher angehört werden, sonst ist sie unwirksam!). 3. Informationsrechte (Wirtschaftliche Lage).',
              'Jugend- und Auszubildendenvertretung (JAV): Kann in Betrieben mit Betriebsrat gegründet werden, wenn mindestens 5 Arbeitnehmer unter 18 Jahren oder Azubis unter 25 Jahren beschäftigt sind.'
            ],
            merksatz: 'Jede Kündigung ohne vorherige Anhörung des Betriebsrats ist nach § 102 BetrVG unwirksam!'
          }
        ],
        quizQuestions: [
          {
            id: 'q-wiso-2-1',
            chapterId: 'wiso',
            moduleId: 'wiso-2',
            question: 'Was besagt das sogenannte "Günstigkeitsprinzip" im Arbeits- und Tarifrecht?',
            options: [
              { id: 'a', text: 'Einzelarbeitsverträge dürfen von Tarifverträgen abweichen, wenn sie für Beschäftigte günstiger sind', isCorrect: true, explanation: 'Richtig! Das Günstigkeitsprinzip (§ 4 Abs. 3 TVG) erlaubt Besserstellungen wie mehr Urlaub oder höheres Gehalt, verbietet aber Verschlechterungen.' },
              { id: 'b', text: 'Arbeitgeber dürfen bei mehreren geltenden Regeln die für den Betrieb wirtschaftlich günstigste wählen', isCorrect: false, explanation: 'Falsch: Das Günstigkeitsprinzip schützt die Beschäftigten, nicht die Kosteneinsparung des Betriebs.' },
              { id: 'c', text: 'Alle Beschäftigten gleicher Qualifikation erhalten unabhängig vom Vertrag exakt denselben Tariflohn', isCorrect: false, explanation: 'Besserstellungen im Einzelvertrag sind ausdrücklich zulässig; Diskriminierungsschutz regelt das AGG.' },
              { id: 'd', text: 'Ein gültiger Tarifvertrag hat rechtlich stets Vorrang vor zwingenden Bundesgesetzen und dem BGB', isCorrect: false, explanation: 'Falsch: Zwingendes Gesetzesrecht und das Grundgesetz stehen in der Normenhierarchie über Tarifverträgen.' }
            ],
            merksatz: 'Günstigkeitsprinzip: Abweichungen vom Tarifvertrag sind nur erlaubt, wenn sie den Arbeitnehmer besserstellen!'
          },
          {
            id: 'q-wiso-2-2',
            chapterId: 'wiso',
            moduleId: 'wiso-2',
            question: 'Welche Rechtsfolge hat es, wenn die Geschäftsführung einer Medienagentur einem festangestellten Webdesigner kündigt, ohne den bestehenden Betriebsrat vor Ausspruch der Kündigung anzuhören?',
            options: [
              { id: 'a', text: 'Die Kündigung ist ohne vorherige Anhörung nach § 102 BetrVG unwirksam', isCorrect: true, explanation: 'Exakt! Nach § 102 Abs. 1 BetrVG ist der Betriebsrat vor jeder Kündigung anzuhören. Eine ohne Anhörung ausgesprochene Kündigung ist von vornherein unwirksam.' },
              { id: 'b', text: 'Die Kündigung bleibt gültig, der Betriebsrat erhält eine Entschädigung', isCorrect: false, explanation: 'Falsch: Die Kündigung selbst ist nach § 102 Abs. 1 Satz 3 BetrVG absolut unwirksam.' },
              { id: 'c', text: 'Die Kündigung bleibt wirksam, die Kündigungsfrist verdoppelt sich aber', isCorrect: false, explanation: 'Falsch: Es gibt keine Fristverlängerung – die Kündigung ist rechtsunwirksam.' },
              { id: 'd', text: 'Die Kündigung wird wirksam, sobald die Anhörung nachträglich erfolgt', isCorrect: false, explanation: 'Falsch: Eine unterlassene Anhörung vor Ausspruch der Kündigung kann nicht rückwirkend geheilt werden.' }
            ],
            merksatz: 'Ohne vorherige Betriebsratsanhörung ist jede Kündigung unwirksam (§ 102 BetrVG)!'
          },
          {
            id: 'q-wiso-2-3',
            chapterId: 'wiso',
            moduleId: 'wiso-2',
            question: 'Welcher Bestandteil wird bei einer Standard-Gehaltsabrechnung NICHT von den gesetzlichen Sozialversicherungsbeiträgen abgezogen?',
            options: [
              { id: 'a', text: 'Die gesetzliche Unfallversicherung', isCorrect: true, explanation: 'Richtig! Die Beiträge zur gesetzlichen Unfallversicherung (Berufsgenossenschaft, z. B. BG ETEM) trägt der Arbeitgeber zu 100 % allein.' },
              { id: 'b', text: 'Die gesetzliche Krankenversicherung', isCorrect: false, explanation: 'Die Krankenversicherung wird paritätisch vom Bruttogehalt von Arbeitgeber und Arbeitnehmer getragen.' },
              { id: 'c', text: 'Die gesetzliche Rentenversicherung', isCorrect: false, explanation: 'Die Rentenversicherung wird zur Hälfte vom Bruttolohn des Arbeitnehmers abgezogen.' },
              { id: 'd', text: 'Die gesetzliche Pflegeversicherung', isCorrect: false, explanation: 'Die Pflegeversicherung wird monatlich anteilig vom Bruttogehalt des Arbeitnehmers abgezogen.' }
            ],
            merksatz: 'Prüfungsfalle: Die Unfallversicherung bezahlt der Arbeitgeber zu 100% alleine!'
          },
          {
            id: 'q-wiso-2-4',
            chapterId: 'wiso',
            moduleId: 'wiso-2',
            question: 'Worin besteht der rechtliche Unterschied zwischen einem Manteltarifvertrag (Rahmentarifvertrag) und einem Lohn-/Gehaltstarifvertrag?',
            options: [
              { id: 'a', text: 'Der Manteltarifvertrag regelt langfristig Rahmenbedingungen; der Entgelttarifvertrag regelt kürzerfristig Löhne', isCorrect: true, explanation: 'Richtig! Manteltarifverträge regeln Arbeitszeit, Urlaub und Kündigungsfristen über mehrere Jahre; Entgelttarifverträge laufen meist 12–24 Monate.' },
              { id: 'b', text: 'Der Manteltarifvertrag gilt ausschließlich für Führungskräfte; der Entgelttarifvertrag gilt nur für Auszubildende', isCorrect: false, explanation: 'Falsch: Beide Tarifvertragsarten gelten für die tarifgebundenen Beschäftigten der jeweiligen Branche.' },
              { id: 'c', text: 'Der Manteltarifvertrag wird vom Gesetzgeber erlassen; der Entgelttarifvertrag wird vom Betriebsrat beschlossen', isCorrect: false, explanation: 'Falsch: Beide werden im Rahmen der Tarifautonomie zwischen Gewerkschaften und Arbeitgeberverbänden ausgehandelt.' },
              { id: 'd', text: 'Der Manteltarifvertrag gilt nur bei unbefristeten Verträgen; der Entgelttarifvertrag nur bei befristeten Stellen', isCorrect: false, explanation: 'Falsch: Der Unterschied liegt im Regelungsgegenstand (Rahmenbedingungen vs. Vergütung) und in der Laufzeit.' }
            ],
            merksatz: 'Manteltarifvertrag = Rahmenbedingungen & lange Laufzeit. Entgelttarifvertrag = Lohnhöhe & kurze Laufzeit!'
          },
          {
            id: 'q-wiso-2-5',
            chapterId: 'wiso',
            moduleId: 'wiso-2',
            question: 'Welche formale Voraussetzung muss erfüllt sein, damit eine Gewerkschaft einen regulären unbefristeten Streik rechtmäßig ausrufen darf?',
            options: [
              { id: 'a', text: 'Friedenspflicht beendet, Verhandlungen für gescheitert erklärt und mind. 75 % Zustimmung in der Urabstimmung', isCorrect: true, explanation: 'Exakt! Während der Tariflaufzeit gilt Friedenspflicht. Nach gescheiterten Verhandlungen erfordert ein Erzwingungsstreik mind. 75 % Zustimmung der Gewerkschaftsmitglieder.' },
              { id: 'b', text: 'Friedenspflicht beendet, Zustimmung des Bundeswirtschaftsministeriums und Anmeldung beim Arbeitsgericht', isCorrect: false, explanation: 'Falsch: Wegen der Tarifautonomie (Art. 9 Abs. 3 GG) mischt sich der Staat nicht durch Genehmigungen ein.' },
              { id: 'c', text: 'Spontaner Arbeitsniederlegungsbeschluss einzelner Abteilungen während der Arbeitszeit ohne Gewerkschaft', isCorrect: false, explanation: 'Falsch: Ein sogenannter „wilder Streik“ ohne Gewerkschaftsträger ist in Deutschland rechtswidrig und kann arbeitsrechtliche Folgen haben.' },
              { id: 'd', text: 'Einfache Mehrheit von über 50 % im Betriebsrat sowie vorherige schriftliche Mitteilung an die Geschäftsleitung', isCorrect: false, explanation: 'Falsch: Der Betriebsrat unterliegt der Friedenspflicht und darf niemals zum Streik aufrufen – das dürfen nur Gewerkschaften.' }
            ],
            merksatz: 'Streik: Friedenspflicht abgelaufen + Urabstimmung (mind. 75 % Zustimmung) + Gewerkschaftsführung!'
          }
        ]
      },
      {
        id: 'wiso-3',
        chapterId: 'wiso',
        title: 'Soziale Sicherung & die 5 Säulen der Sozialversicherung',
        shortDesc: 'Kranken-, Unfall-, Renten-, Arbeitslosen- & Pflegeversicherung im Prüfungsfokus',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-wiso-3-1',
            title: 'Das Solidaritätsprinzip & die 5 Säulen',
            coreConcept: 'Das deutsche Sozialversicherungssystem schützt Bürger vor den existenziellen Lebensrisiken. Gegründet von Bismarck (1883 ff.).',
            bulletPoints: [
              'Solidaritätsprinzip: Die Beiträge richten sich nach der finanziellen Leistungsfähigkeit (Einkommen bis zur Beitragsbemessungsgrenze), die Leistungen richten sich nach dem konkreten Bedarf (z.B. medizinische Behandlung).',
              'Generationenvertrag: In der Rentenversicherung zahlen die heutigen Beitragszahler die Renten der heutigen Ruheständler (Umlageverfahren).',
              'Die 5 Zweige: 1. Krankenversicherung (1883), 2. Unfallversicherung (1884), 3. Rentenversicherung (1889), 4. Arbeitslosenversicherung (1927), 5. Pflegeversicherung (1995).'
            ],
            merksatz: 'Die 5 Säulen: Kranken-, Unfall-, Renten-, Arbeitslosen- und Pflegeversicherung. Träger, Leistungen und Finanzierung müssen sicher beherrscht werden!'
          },
          {
            id: 'n-wiso-3-2',
            title: 'Träger, Finanzierung & Leistungen im Vergleich',
            coreConcept: 'Die IHK prüft in jeder WiSo-Prüfung Träger und Kostenverteilung der Sozialversicherungen.',
            bulletPoints: [
              '1. Krankenversicherung: Träger: Krankenkassen (AOK, TK, Barmer etc.). Finanzierung: AG und AN je ca. 50% (zzgl. kassenindividueller Zusatzbeitrag). Leistung: Ärztliche Behandlung, Medikamente, Krankengeld ab der 7. Krankheitswoche.',
              '2. Unfallversicherung: Träger: Berufsgenossenschaften (z.B. BG ETEM für Druck & Medien). Finanzierung: 100% durch den Arbeitgeber! Leistung: Arbeits- und Wegeunfälle, Berufskrankheiten, Rehabilitation, Verletztengeld.',
              '3. Rentenversicherung: Träger: Deutsche Rentenversicherung (DRV). Finanzierung: AG 50%, AN 50%. Leistung: Altersrente, Erwerbsminderungsrente, Reha.',
              '4. Arbeitslosenversicherung: Träger: Bundesagentur für Arbeit (BA). Finanzierung: AG 50%, AN 50%. Leistung: Arbeitslosengeld I (ALG I), Berufsberatung, Weiterbildung.',
              '5. Pflegeversicherung: Träger: Pflegekassen bei den Krankenkassen. Finanzierung: AG und AN je 50% (Kinderlose ab 23 Jahren zahlen einen Zuschlag). Leistung: Pflegegeld, Pflegesachleistungen nach Pflegegraden (1-5).'
            ],
            examFavorite: true
          },
          {
            id: 'n-wiso-3-3',
            title: 'Entgeltfortzahlung im Krankheitsfall vs. Krankengeld',
            coreConcept: 'Prüfungsklassiker: Wer zahlt wann bei Arbeitsunfähigkeit?',
            bulletPoints: [
              'Woche 1 bis 6: Der Arbeitgeber zahlt 100% des regulären Gehalts weiter (Entgeltfortzahlungsgesetz - EntgFG), vorausgesetzt das Arbeitsverhältnis besteht seit mind. 4 Wochen.',
              'Ab der 7. Woche (Tag 43): Die Krankenkasse übernimmt und zahlt Krankengeld (70% des Bruttoeinkommens, max. 90% des Nettoentgelts) für dieselbe Krankheit für maximal 78 Wochen innerhalb von 3 Jahren.',
              'Meldepflicht: Der Arbeitnehmer muss dem Arbeitgeber die Arbeitsunfähigkeit und deren voraussichtliche Dauer unverzüglich mitteilen. Eine ärztliche Arbeitsunfähigkeitsbescheinigung (eAU) ist spätestens am 4. Kalendertag vorzulegen (Arbeitgeber kann sie ab dem 1. Tag verlangen).'
            ],
            merksatz: 'Erste 6 Wochen: Arbeitgeber zahlt 100% (Entgeltfortzahlung). Ab 7. Woche: Krankenkasse zahlt Krankengeld (70% vom Brutto, max. 90% vom Netto)!'
          }
        ],
        quizQuestions: [
          {
            id: 'q-wiso-3-1',
            chapterId: 'wiso',
            moduleId: 'wiso-3',
            question: 'Welcher Träger ist für die gesetzliche Unfallversicherung in Betrieben der Medienbranche zuständig und wer trägt die Beiträge?',
            options: [
              { id: 'a', text: 'Die Berufsgenossenschaft (z. B. BG ETEM); die Beiträge werden zu 100% allein vom Arbeitgeber getragen', isCorrect: true, explanation: 'Richtig! Gesetzliche Unfallversicherung ist reine Unternehmerhaftpflicht. Träger sind die Berufsgenossenschaften, finanziert zu 100% vom Arbeitgeber.' },
              { id: 'b', text: 'Die gesetzlichen Krankenkassen; finanziert zu gleichen Teilen (50/50) von Arbeitgeber und Arbeitnehmer', isCorrect: false, explanation: 'Falsch: Krankenkassen sind Träger der Krankenversicherung, nicht der Unfallversicherung.' },
              { id: 'c', text: 'Die Deutsche Rentenversicherung Bund; finanziert aus dem Steueraufkommen des Bundes', isCorrect: false, explanation: 'Falsch: Rentenversicherung finanziert sich aus Beiträgen von AG/AN und Bundeszuschuss.' },
              { id: 'd', text: 'Die Bundesagentur für Arbeit; finanziert zu 100% vom Arbeitnehmer', isCorrect: false, explanation: 'Falsch: Die Bundesagentur für Arbeit ist für Arbeitslosigkeit zuständig.' }
            ],
            merksatz: 'Unfallversicherung: Träger = Berufsgenossenschaft, Finanzierung = 100% Arbeitgeber!'
          },
          {
            id: 'q-wiso-3-2',
            chapterId: 'wiso',
            moduleId: 'wiso-3',
            question: 'Ein Mitarbeiter erkrankt schwer und ist wegen derselben Diagnose 10 Wochen lang ununterbrochen arbeitsunfähig geschrieben. Wer zahlt in den ersten 6 Wochen und wer ab der 7. Woche die finanzielle Unterstützung?',
            options: [
              { id: 'a', text: 'Woche 1–6: Arbeitgeber zahlt volles Gehalt; ab Woche 7: Krankenkasse zahlt Krankengeld', isCorrect: true, explanation: 'Perfekt! Nach dem Entgeltfortzahlungsgesetz zahlt der Arbeitgeber bis zu 6 Wochen 100 % Entgeltfortzahlung; ab Woche 7 springt die Krankenkasse mit Krankengeld ein.' },
              { id: 'b', text: 'Woche 1–6: Krankenkasse zahlt Krankengeld; ab Woche 7: Arbeitsagentur zahlt Übergangsgeld', isCorrect: false, explanation: 'Falsch: Der Arbeitgeber ist zunächst zur 6-wöchigen Entgeltfortzahlung verpflichtet.' },
              { id: 'c', text: 'Woche 1–10: Berufsgenossenschaft zahlt ab dem ersten Krankheitstag volles Verletztengeld', isCorrect: false, explanation: 'Falsch: Die Berufsgenossenschaft leistet nur bei Arbeitsunfällen oder Berufskrankheiten, nicht bei allgemeiner Erkrankung.' },
              { id: 'd', text: 'Woche 1–10: Arbeitgeber zahlt durchgehend 100 % Gehalt und rechnet mit der Rentenkasse ab', isCorrect: false, explanation: 'Falsch: Die gesetzliche Entgeltfortzahlung durch den Arbeitgeber endet bei derselben Krankheit nach genau 6 Wochen.' }
            ],
            merksatz: '1.–6. Woche: Arbeitgeber (100% Entgeltfortzahlung). Ab 7. Woche: Krankenkasse (Krankengeld).'
          },
          {
            id: 'q-wiso-3-3',
            chapterId: 'wiso',
            moduleId: 'wiso-3',
            question: 'Was versteht man unter dem "Umlageverfahren" in der gesetzlichen Rentenversicherung (Generationenvertrag)?',
            options: [
              { id: 'a', text: 'Aktuelle Beiträge der Erwerbstätigen finanzieren direkt die laufenden Renten der heutigen Rentner', isCorrect: true, explanation: 'Richtig! Beim Umlageverfahren (Generationenvertrag) wird kein eigener Spartopf angespart, sondern laufend umverteilt.' },
              { id: 'b', text: 'Jeder Versicherte spart seine Beiträge verzinst auf einem eigenen Konto für den Ruhestand an', isCorrect: false, explanation: 'Das beschreibt das Kapitaldeckungsverfahren (wie bei privaten Rentenversicherungen), nicht das gesetzliche Umlageverfahren.' },
              { id: 'c', text: 'Alle Rentenzahlungen werden vollständig aus den Währungs- und Goldreserven der Bundesbank gedeckt', isCorrect: false, explanation: 'Falsch: Die Rentenversicherung finanziert sich über laufende Sozialbeiträge und Bundeszuschüsse.' },
              { id: 'd', text: 'Die Rentenbeiträge werden zentral an den internationalen Kapitalmärkten in Aktienfonds angelegt', isCorrect: false, explanation: 'Falsch: Die gesetzliche Rentenversicherung basiert im Kern auf dem Umlageverfahren.' }
            ],
            merksatz: 'Umlageverfahren: Die Jungen zahlen heute direkt für die Alten (Generationenvertrag).'
          },
          {
            id: 'q-wiso-3-4',
            chapterId: 'wiso',
            moduleId: 'wiso-3',
            question: 'Welche Funktion hat die "Beitragsbemessungsgrenze" (BBG) in den deutschen Sozialversicherungen?',
            options: [
              { id: 'a', text: 'Sie legt das maximale Bruttoeinkommen fest, bis zu dem Sozialabgaben berechnet werden', isCorrect: true, explanation: 'Richtig! Einkommensanteile oberhalb der BBG sind beitragsfrei; zugleich sind dadurch auch Leistungen wie Rente oder Krankengeld nach oben gedeckelt.' },
              { id: 'b', text: 'Sie legt fest, ab welchem Jahreseinkommen Arbeitnehmer überhaupt Einkommensteuer zahlen', isCorrect: false, explanation: 'Falsch: Das ist der steuerliche Grundfreibetrag im Einkommensteuerrecht.' },
              { id: 'c', text: 'Sie begrenzt das zulässige monatliche Bruttogehalt von Fachkräften in Tarifverträgen', isCorrect: false, explanation: 'Falsch: Es gibt keine gesetzliche Obergrenze für Gehälter.' },
              { id: 'd', text: 'Sie definiert die untere Einkommensgrenze für versicherungsfreie Minijobs im Betrieb', isCorrect: false, explanation: 'Falsch: Das ist die Geringfügigkeitsgrenze, nicht die Beitragsbemessungsgrenze.' }
            ],
            merksatz: 'Beitragsbemessungsgrenze: Einkommen oberhalb dieser Grenze ist beitragsfrei zur Sozialversicherung!'
          },
          {
            id: 'q-wiso-3-5',
            chapterId: 'wiso',
            moduleId: 'wiso-3',
            question: 'Warum raten Verbraucherzentralen und Gewerkschaften auch Mediengestaltern dringend zum frühzeitigen Abschluss einer privaten Berufsunfähigkeitsversicherung (BU)?',
            options: [
              { id: 'a', text: 'Weil die gesetzliche Rente keinen Berufsschutz mehr bietet, sondern nur eine knappe Erwerbsminderungsrente', isCorrect: true, explanation: 'Exakt! Für nach 1961 Geborene zählt nicht mehr der erlernte Beruf, sondern ob überhaupt noch irgendeine Tätigkeit (mind. 6 Std./Tag) möglich ist.' },
              { id: 'b', text: 'Weil die Entgeltfortzahlung des Arbeitgebers bei längerer Krankheit erst ab dem vierten Monat einsetzt', isCorrect: false, explanation: 'Falsch: Der Arbeitgeber zahlt ab dem ersten Krankheitstag bis zu 6 Wochen weiter – danach schützt aber keine BU-Leistung des Betriebs.' },
              { id: 'c', text: 'Weil der Gesetzgeber den Abschluss einer privaten Berufsunfähigkeitsversicherung verbindlich vorschreibt', isCorrect: false, explanation: 'Falsch: Die Berufsunfähigkeitsversicherung ist eine freiwillige Individualversicherung.' },
              { id: 'd', text: 'Weil gesetzliche Krankenkassen typische Erkrankungen durch Bildschirmarbeit nicht erstatten', isCorrect: false, explanation: 'Falsch: Die GKV übernimmt medizinische Behandlungen, ersetzt aber keinen dauerhaften Einkommensverlust im gelernten Beruf.' }
            ],
            merksatz: 'Gesetzlich gibt es nur noch Erwerbsminderungsrente ohne Berufsschutz – eine private BU sichert den eigenen Lebensstandard!'
          }
        ]
      },
      {
        id: 'wiso-4',
        chapterId: 'wiso',
        title: 'Wirtschaftsordnung, Markt & Unternehmensformen',
        shortDesc: 'Soziale Marktwirtschaft, Angebot & Nachfrage, Rechtsformen (GmbH, AG, OHG, KG) & Kaufvertrag',
        estimatedMinutes: 5,
        nuggets: [
          {
            id: 'n-wiso-4-1',
            title: 'Die Soziale Marktwirtschaft & Preisbildung',
            coreConcept: 'Verbindung von wirtschaftlicher Freiheit (freier Markt, Wettbewerb, Privateigentum) mit sozialem Ausgleich (Sozialversicherungen, Kündigungsschutz, Kartellverbot). Begründet von Ludwig Erhard.',
            bulletPoints: [
              'Markt & Preisbildung: Der Marktpreis entsteht durch das Zusammenspiel von Angebot und Nachfrage (Gleichgewichtspreis).',
              'Marktformen: Polypol (viele Anbieter, viele Nachfrager = vollkommener Wettbewerb), Oligopol (wenige Anbieter, viele Nachfrager = z.B. Tankstellen/Mobilfunk), Monopol (ein einziger Anbieter bestimmt den Preis = z.B. Schienennetz).',
              'Eingriffe des Staates: Soziale Hilfen, progressive Einkommensteuer, Arbeitsschutzgesetze, Kartellamt gegen Monopolbildung.'
            ],
            merksatz: 'Soziale Marktwirtschaft = Freier Markt und Wettbewerb, abgesichert durch sozialen Ausgleich und staatliche Leitplanken!'
          },
          {
            id: 'n-wiso-4-2',
            title: 'Unternehmensformen & Haftungsrisiken',
            coreConcept: 'Die Wahl der Rechtsform entscheidet über Haftung, Startkapital, Geschäftsführung und Kreditwürdigkeit einer Agentur oder Druckerei.',
            bulletPoints: [
              'Einzelunternehmen: 1 Inhaber. Haftung: Unbeschränkt, persönlich mit Geschäfts- und Privatvermögen! Kein Mindestkapital.',
              'Offene Handelsgesellschaft (OHG): Mind. 2 Gesellschafter. Haftung: Unbeschränkt, persönlich und solidarisch (jeder haftet für alle Schulden).',
              'Kommanditgesellschaft (KG): Mind. ein Komplementär (vollhaftend mit Privatvermögen) und mind. ein Kommanditist (Teilhafter, haftet nur mit seiner Vermögenseinlage).',
              'Gesellschaft mit beschränkter Haftung (GmbH): Kapitalgesellschaft. Mindeststammkapital: 25.000 € (mind. 12.500 € bei Gründung eingezahlt). Haftung: Nur mit dem Gesellschaftsvermögen (keine Privathaftung!). Vertreten durch Geschäftsführer.',
              'Aktiengesellschaft (AG): Mindestgrundkapital: 50.000 €. Organe: Vorstand (Leitung), Aufsichtsrat (Kontrolle), Hauptversammlung (Aktionäre).'
            ],
            examFavorite: true,
            example: 'Eine Agentur geht pleite und hinterlässt 100.000 € Schulden. Als Einzelunternehmer haftet der Gründer mit seinem Privathaus. Bei einer GmbH haftet nur das Agenturvermögen.'
          },
          {
            id: 'n-wiso-4-3',
            title: 'Der Kaufvertrag & Kaufvertragsstörungen',
            coreConcept: 'Rechtsgeschäft entsteht durch zwei übereinstimmende Willenserklärungen: Antrag (Angebot) und Annahme (Bestellung).',
            bulletPoints: [
              'Pflichten beim Kaufvertrag: Verkäufer muss Ware mangelfrei und rechtzeitig übergeben sowie Eigentum verschaffen (§ 433 BGB). Käufer muss vereinbarten Preis zahlen und Ware annehmen.',
              'Kaufvertragsstörungen: 1. Mangelhafte Lieferung (Sachmangel: Falsche Farbe, beschädigt, Zuweniglieferung). 2. Lieferverzug (Ware kommt zu spät). 3. Zahlungsverzug (Kunde zahlt nicht rechtzeitig). 4. Annahmeverzug (Kunde nimmt bestellte Ware nicht ab).',
              'Rechte des Käufers bei Mängeln (Vorrang): Zuerst immer Nacherfüllung verlangen (Nachbesserung/Reparatur oder Ersatzlieferung). Erst nach Fristablauf: Rücktritt vom Vertrag, Minderung des Kaufpreises oder Schadensersatz.'
            ],
            merksatz: 'Bei mangelhafter Ware gilt das Recht der zweiten Andienung: Der Verkäufer darf zuerst reparieren oder neu liefern (Nacherfüllung)!'
          }
        ],
        quizQuestions: [
          {
            id: 'q-wiso-4-1',
            chapterId: 'wiso',
            moduleId: 'wiso-4',
            question: 'Welches Mindeststammkapital ist gesetzlich vorgeschrieben, um eine Gesellschaft mit beschränkter Haftung (GmbH) zu gründen, und wie haftet sie für Geschäftsschulden?',
            options: [
              { id: 'a', text: 'Mindestens 25.000 € Stammkapital; die Haftung beschränkt sich auf das Gesellschaftsvermögen', isCorrect: true, explanation: 'Richtig! § 5 Abs. 1 GmbHG schreibt 25.000 € Stammkapital vor; die Gesellschafter haften grundsätzlich nicht privat.' },
              { id: 'b', text: 'Mindestens 50.000 € Grundkapital; die Gesellschafter haften zusätzlich mit ihrem Privatvermögen', isCorrect: false, explanation: 'Falsch: 50.000 € ist das Grundkapital einer Aktiengesellschaft (AG), und auch dort ist die Haftung beschränkt.' },
              { id: 'c', text: 'Kein gesetzliches Mindestkapital; die Haftung erfolgt stets persönlich und unbeschränkt', isCorrect: false, explanation: 'Falsch: Das gilt für Einzelunternehmen, GbR oder OHG, nicht für eine reguläre GmbH.' },
              { id: 'd', text: 'Mindestens 10.000 € Stammkapital; die Haftung greift erst ab einem Jahresumsatz von 100.000 €', isCorrect: false, explanation: 'Falsch: Das Mindeststammkapital der GmbH beträgt 25.000 € unabhängig vom Umsatz.' }
            ],
            merksatz: 'GmbH: Mindeststammkapital 25.000 €; Haftung beschränkt auf das Gesellschaftsvermögen!'
          },
          {
            id: 'q-wiso-4-2',
            chapterId: 'wiso',
            moduleId: 'wiso-4',
            question: 'In einer Kommanditgesellschaft (KG) gibt es zwei Typen von Gesellschaftern. Worin besteht der wesentliche Unterschied zwischen Komplementär und Kommanditist bezüglich der Haftung?',
            options: [
              { id: 'a', text: 'Der Komplementär haftet persönlich und unbeschränkt; der Kommanditist nur bis zur Höhe seiner Einlage', isCorrect: true, explanation: 'Perfekt! Komplementär = Vollhafter (Privat- und Geschäftsvermögen), Kommanditist = Teilhafter (nur eingetragene Vermögenseinlage).' },
              { id: 'b', text: 'Beide Gesellschaftergruppen haften ausschließlich mit dem Gesellschaftsvermögen bis 25.000 €', isCorrect: false, explanation: 'Falsch: Bei einer Personengesellschaft wie der KG haftet mindestens ein Partner (Komplementär) voll persönlich.' },
              { id: 'c', text: 'Der Kommanditist führt die Geschäfte und haftet unbeschränkt; der Komplementär haftet gar nicht', isCorrect: false, explanation: 'Falsch: Es ist genau umgekehrt – der Komplementär führt die Geschäfte und haftet unbeschränkt.' },
              { id: 'd', text: 'Beide Gesellschafter haften stets gesamtschuldnerisch zu gleichen Teilen mit ihrem Privatvermögen', isCorrect: false, explanation: 'Falsch: Das gilt für die OHG; die KG trennt bewusst in Vollhafter und Teilhafter.' }
            ],
            merksatz: 'KG: Komplementär = haftet VOLL (mit Privatvermögen), Kommanditist = haftet TEIL (nur Einlage)!'
          },
          {
            id: 'q-wiso-4-3',
            chapterId: 'wiso',
            moduleId: 'wiso-4',
            question: 'Eine Druckerei liefert 5.000 Kundenflyer, die erhebliche Fehldrucke und Farbstreifen aufweisen (Sachmangel). Welches vorrangige Recht hat der Käufer nach BGB gegenüber der Druckerei?',
            options: [
              { id: 'a', text: 'Recht auf Nacherfüllung durch Nachbesserung oder mangelfreie Neulieferung', isCorrect: true, explanation: 'Richtig! Nach § 439 BGB gilt der Vorrang der Nacherfüllung. Erst wenn sie scheitert oder verweigert wird, greifen Rücktritt oder Minderung.' },
              { id: 'b', text: 'Sofortiger Rücktritt vom Vertrag und Rückzahlung des Kaufpreises ohne Frist', isCorrect: false, explanation: 'Falsch: Das BGB gewährt dem Verkäufer zunächst das Recht zur zweiten Andienung (Nacherfüllung nach § 439 BGB).' },
              { id: 'c', text: 'Sofortige Minderung des Kaufpreises um 50 % ohne vorherige Fristsetzung', isCorrect: false, explanation: 'Falsch: Eine Kaufpreisminderung ist grundsätzlich erst nach erfolgloser Frist zur Nacherfüllung zulässig.' },
              { id: 'd', text: 'Sofortiger Schadensersatz statt der Leistung ohne Nacherfüllungsverlangen', isCorrect: false, explanation: 'Falsch: Auch Schadensersatz statt der Leistung setzt in der Regel zunächst ein erfolgloses Nacherfüllungsverlangen voraus.' }
            ],
            merksatz: 'Recht der zweiten Andienung: Bei Sachmängeln zuerst immer Nacherfüllung verlangen!'
          },
          {
            id: 'q-wiso-4-4',
            chapterId: 'wiso',
            moduleId: 'wiso-4',
            question: 'Was versteht man unter Inflation und welche geldpolitische Maßnahme ergreift die Europäische Zentralbank (EZB) typischerweise zur Bekämpfung einer zu hohen Inflationsrate?',
            options: [
              { id: 'a', text: 'Anhaltender Anstieg des Preisniveaus mit Kaufkraftverlust; die EZB erhöht die Leitzinsen zur Bremsung', isCorrect: true, explanation: 'Richtig! Höhere Leitzinsen verteuern Kredite, machen Sparen attraktiver, dämpfen die Nachfrage und bremsen den Preisauftrieb.' },
              { id: 'b', text: 'Anhaltendes Sinken des Preisniveaus bei steigender Kaufkraft; die EZB senkt direkt die Mehrwertsteuer', isCorrect: false, explanation: 'Falsch: Sinkende Preise heißen Deflation; zudem beschließt die Politik über Steuern, nicht die EZB.' },
              { id: 'c', text: 'Kurzfristige Preisschwankung einzelner Rohstoffe; die EZB weitet die Geldmenge über neue Kredite aus', isCorrect: false, explanation: 'Falsch: Eine Ausweitung der Geldmenge würde die Inflation noch weiter anheizen.' },
              { id: 'd', text: 'Überhitzung der Exportwirtschaft im Euroraum; die EZB fixiert verbindliche Höchstpreise für Händler', isCorrect: false, explanation: 'Falsch: Die EZB steuert über geldpolitische Instrumente wie Leitzinsen, nicht über staatliche Preisdeckel.' }
            ],
            merksatz: 'Inflation = Kaufkraftverlust. Reaktion der EZB: Leitzinsen anheben, um den Geldwert zu stabilisieren!'
          },
          {
            id: 'q-wiso-4-5',
            chapterId: 'wiso',
            moduleId: 'wiso-4',
            question: 'Worin liegt der fundamentale rechtliche Unterschied zwischen der gesetzlichen Sachmängelhaftung (Gewährleistung) und einer kaufmännischen Garantie?',
            options: [
              { id: 'a', text: 'Gewährleistung ist ein gesetzlicher Anspruch gegen den Verkäufer; Garantie eine freiwillige Zusicherung', isCorrect: true, explanation: 'Exakt! Die 2-jährige Gewährleistung nach BGB gilt für Mängel bei Übergabe und kann beim Verbrauchsgüterkauf nicht ausgeschlossen werden; Garantie ist eine freiwillige Leistung zu eigenen Bedingungen.' },
              { id: 'b', text: 'Garantie ist eine zweijährige gesetzliche Pflicht des Verkäufers; Gewährleistung eine freiwillige Leistung', isCorrect: false, explanation: 'Falsch: Genau umgekehrt – die Gewährleistung ist gesetzlich verankert, die Garantie freiwillig.' },
              { id: 'c', text: 'Gewährleistung gilt ausschließlich für Software-Lizenzen; Garantie greift nur für physische Hardware', isCorrect: false, explanation: 'Falsch: Gewährleistungsrechte gelten für alle Kaufverträge über bewegliche Sachen und digitale Produkte.' },
              { id: 'd', text: 'Beide Begriffe sind rechtlich identisch und können vom Händler in den AGB vollständig gestrichen werden', isCorrect: false, explanation: 'Falsch: Die gesetzliche Gewährleistung darf beim Verbrauchsgüterkauf gegenüber Privatkunden nicht ausgeschlossen werden.' }
            ],
            merksatz: 'Gewährleistung = 2 Jahre gesetzliche Pflicht des Verkäufers! Garantie = freiwilliges Versprechen!'
          }
        ]
      }
    ]
  },
  IHK_ORIGINAL_CHAPTER,
  PROJECT_PHASES_CHAPTER
];
/**
 * Returns Level 2 (Mastery / IHK-Transfer) questions for a module.
 * If explicitly defined in level2QuizQuestions, returns those;
 * otherwise transforms base questions into clean, challenging IHK transfer questions
 * with authentic option texts, deterministic shuffling, and detailed trap explanations.
 */
export function getModuleLevel2Questions(module: LearningModule): QuizQuestion[] {
  const sourceQuestions = module.level2QuizQuestions && module.level2QuizQuestions.length > 0
    ? module.level2QuizQuestions
    : module.quizQuestions;

  return sourceQuestions.map((q) => {
    // Preserve authentic option text without appending synthetic meta-phrases
    const cleanOptions = q.options.map(opt => ({
      ...opt,
      text: opt.text.trim(),
      trapExplanation:
        opt.trapExplanation ||
        (opt.isCorrect
          ? undefined
          : `Klassische Prüfungsfalle: ${opt.explanation}`)
    }));

    // Deterministic pseudo-shuffle per question so correct answer isn't always at index 0
    const shuffledOptions = [...cleanOptions].sort((a, b) => {
      const valA = (q.id + a.id + a.text).split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
      const valB = (q.id + b.id + b.text).split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
      return valA - valB;
    });

    return {
      ...q,
      id: q.id.startsWith('l2-') ? q.id : `l2-${q.id}`,
      // Keep question text natural and clean without artificial prefixes
      question: q.question,
      // Only keep scenario if explicitly defined for this question (no generic mad-libs)
      scenario: q.scenario || undefined,
      options: shuffledOptions,
      examTip:
        q.examTip ||
        'IHK-Experten-Rat: Bei dieser Transferleistung ist absolute Präzision gefragt. Achte auf Nuancen in der Formulierung, die den Unterschied zwischen "fast richtig" und "fachlich perfekt" ausmachen.',
    };
  });
}



