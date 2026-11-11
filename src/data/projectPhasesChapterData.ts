import { Chapter } from '../types/quiz';

export const PROJECT_PHASES_CHAPTER: Chapter = {
  id: 'project-phases',
  number: 12,
  title: 'Projektphasen & Projektmanagement',
  subtitle: 'Projektmerkmale, Teamentwicklung & Phasenmodell (Tuckman)',
  description: 'Lerne die 7 konstitutiven Merkmale von Projekten nach DIN 69901, Teamentwicklung als Führungsaufgabe und die 4 Phasen nach Bruce Tuckman.',
  accentColor: 'teal',
  examMerksatz: 'Ein Projekt ist ein zielgerichtetes, einmaliges, neuartiges, komplexes und zeitlich befristetes Vorhaben unter Einsatz begrenzter Ressourcen mit inhärentem Risiko (DIN 69901).',
  examChecklist: [
    {
      task: 'Die 7 konstitutiven Projektmerkmale',
      detail: 'Zielvorgabe, Neuartigkeit, Einmaligkeit, Komplexität, zeitliche Begrenzung, begrenzte Ressourcen, Risiko/Unsicherheit benennen und erklären können.',
    },
    {
      task: 'Projekt vs. Routineaufgabe',
      detail: 'Abgrenzung sicher beherrschen: Entwicklung eines Standbogens/Sonderfalzung (Projekt) vs. periodischer Nachdruck aus bestehender Serie (Routine).',
    },
    {
      task: 'Die 3 begrenzten Ressourcen-Arten',
      detail: 'Projektmitarbeiter (Personal), finanzielle Mittel (Projektbudget) und technische Ressourcen (Maschinen, Software, Materialien).',
    },
    {
      task: 'Tuckman-Modell (4+1 Phasen)',
      detail: 'Forming, Storming, Norming, Performing und Adjourning (1977) in ihrer Reihenfolge und Dynamik kennen.',
    },
    {
      task: 'Phase 1: Forming & Scheinharmonie',
      detail: 'Abtasten, Höflichkeit, Konfliktvermeidung, Fixierung auf Führungskraft und die Gefahr trügerischer Scheinharmonie.',
    },
    {
      task: 'Führungsaufgabe im Forming',
      detail: 'Orientierung bieten, klare Ziele und Rollen setzen, Erwartungen klären und Kennenlernen ermöglichen.',
    },
    {
      task: 'Phase 2: Storming & konstruktive Reibung',
      detail: 'Meinungsverschiedenheiten, Infragestellen von Rollen und Aufgaben, Lagerbildung und verdeckte Konflikte als gesunden Reifeprozess verstehen.',
    },
    {
      task: 'Führungsaufgabe im Storming: Moderieren statt Urteilen',
      detail: 'Konflikte nicht zudecken oder aussitzen, sondern Reibungspunkte ansprechbar machen, Rollen klären und fairen Streitrahmen sichern.',
    },
    {
      task: 'Phase 3: Norming & Wir-Gefühl',
      detail: 'Entwicklung ungeschriebener Spielregeln, eigenständige Konfliktlösung unter Kollegen ohne Führungskraft und gemeinsamer Stolz.',
    },
    {
      task: 'Führungsaufgabe im Norming: Loslassen & Vertrauen',
      detail: 'Verantwortung abgeben, Entscheidungen ins Team verlagern und die Gefahr von Überkontrolle / Micromanagement meiden.',
    },
    {
      task: 'Phase 4: Performing & Flow',
      detail: 'Selbstständige Hochleistung, hohes Vertrauen, konstruktive Streitkultur und Synergie (Gruppe leistet mehr als Summe der Einzelnen).',
    },
    {
      task: 'Die Rückfall-Falle im Performing',
      detail: 'Verstehen, dass Performing kein statischer Dauerzustand ist; Reorganisation, Zu- oder Abgänge werfen das Team zur Neu-Justierung zurück.',
    },
    {
      task: 'Führungsaufgabe im Performing: Loslassen & Hindernisse räumen',
      detail: 'Ziele setzen, Hindernisse aus dem Weg räumen, ansprechbar bleiben, nicht mikromanagen und Erfolge sichtbar würdigen.',
    },
    {
      task: 'Phase 5: Adjourning (Auflösungsphase 1977)',
      detail: 'Erweiterung durch Bruce Tuckman & Mary Ann Jensen (1977); emotionale Ambivalenz aus Stolz, Wehmut und Zukunftsfragen nach Zielerreichung.',
    },
    {
      task: 'Führungsaufgabe im Adjourning: Bewusster Abschluss',
      detail: 'Abschluss nicht versanden lassen: Retrospektive (Lessons Learned), persönliche Würdigung und gemeinsames Abschlussritual sichern Lernerfolge.',
    },
    {
      task: 'Die 5 Projektmanagementphasen (DIN 69901-2)',
      detail: 'Initialisierung, Definition, Planung, Steuerung und Abschluss in ihrer Funktion und logischen Reihenfolge beherrschen.',
    },
    {
      task: 'PM-Phasen vs. Fachliche Projektphasen',
      detail: 'Klare Trennung: Management- & Steuerungsprozesse (DIN 69901-2) vs. operative Produkterstellung (Entwurf, Satz, Druck, Code).',
    },
    {
      task: 'Phase 1: Initialisierung (Projektidee & Machbarkeit)',
      detail: 'Klären, ob überhaupt ein Projekt entstehen soll: Anlass, erster Nutzen, Machbarkeit, grobe Ziele und Zuständigkeiten.',
    },
    {
      task: 'Phase 2: Definition & Nicht-Ziele',
      detail: 'Projektgegenstand abgrenzen, Nicht-Ziele definieren (Schutz vor Scope Creep), Stakeholder analysieren und Kernteam festlegen.',
    },
    {
      task: 'Phase 3: Planung & Projektstrukturplan (PSP)',
      detail: 'Hierarchische Zerlegung des Projekts in Arbeitspakete im PSP; Termin-, Ressourcen-, Kostenpläne als Messbasis für Abweichungen.',
    },
    {
      task: 'Phase 4: Steuerung & Projektcontrolling',
      detail: 'Soll-Ist-Vergleiche von Terminen und Kosten; fachliche Umsetzung ist nach DIN 69901-2 keine eigene PM-Phase, sondern wird durch PM gesteuert.',
    },
    {
      task: 'Ergebnisabnahme in der Steuerung (DIN 69901-2)',
      detail: 'Wichtige IHK-Besonderheit: Die formale Abnahme des Projektergebnisses wird im Prozessmodell der DIN 69901-2 der Phase Steuerung zugeordnet.',
    },
    {
      task: 'Phase 5: Geordneter Projektabschluss',
      detail: 'Nach der Abnahme: Projektabschlussbericht, Nachkalkulation, Archivierung und formale Entlastung der Projektleitung.',
    },
    {
      task: 'Nachkalkulation & Revisionsarchivierung',
      detail: 'Soll- vs. Ist-Kosten ermitteln, Deckungsbeitrag prüfen und revisionssichere Ablage von Verträgen, Pflichtenheften und Quelldaten.',
    },
    {
      task: 'Erfahrungssicherung: Lessons Learned nutzbar machen',
      detail: 'Erkenntnisse dürfen nicht im Archiv verstauben, sondern müssen für Folgeprojekte auffindbar und wirksam nutzbar sein.',
    },
    {
      task: 'Der geschlossene DIN 69901-2 Gesamt-Kreislauf',
      detail: 'Initialisierung → Definition → Planung → Steuerung → Abschluss: Wie Erfahrungssicherung die Reife künftiger Projekt-Initialisierungen steigert.',
    },
  ],
  modules: [
    // MODUL 1 (SEITE 1 VON 7)
    {
      id: 'projphase-1',
      chapterId: 'project-phases',
      title: 'Seite 1: Projektmerkmale & Abgrenzung zur Routine',
      shortDesc: 'Die 7 konstitutiven Merkmale nach DIN 69901 & Abgrenzung zu Routineaufgaben',
      estimatedMinutes: 5,
      miniGameType: 'project_vs_routine',
      nuggets: [
        {
          id: 'n-pp-1',
          title: 'Die 7 Merkmale eines Projekts (DIN 69901)',
          coreConcept: 'Ein Projekt unterscheidet sich fundamental von laufenden Routinearbeiten im Betrieb.',
          bulletPoints: [
            '1. Vorgegebenes Ziel: Jedes Projekt verfolgt ein klares, definiertes Ergebnis (Soll-Zustand).',
            '2. Neuartigkeit: Die Aufgabenstellung wurde in dieser Form zuvor meist noch nicht durchgeführt.',
            '3. Einmaligkeit: Das Vorhaben wird in der Regel nur ein einziges Mal realisiert.',
            '4. Komplexität: Zahlreiche Teilaufgaben und Problemstellungen greifen ineinander; viele Schritte sind anfangs noch unklar.',
            '5. Zeitliche Begrenzung: Ein Projekt hat immer einen festen Anfangs- und/oder Endzeitpunkt (Deadline).',
            '6. Begrenzte Ressourcen: Personal (Mitarbeiter), Finanzen (Budget) und Technik (Maschinen/Material) stehen nur limitiert zur Verfügung.',
            '7. Risiko / Unsicherheit: Da Aktivitäten voneinander abhängen und Unvorhergesehenes auftreten kann, birgt jedes Projekt Risiken.'
          ],
          examFavorite: true,
          example: 'Einführung einer neuen 8-Farben-Offset-Druckmaschine: Einmalig, neuartig, fest terminiert, begrenztes Budget und technisches Umstellungsrisiko.',
          merksatz: 'Zielvorgabe, Neuartigkeit, Einmaligkeit, Komplexität, Zeitgrenze, Ressourcenlimit, Risiko!'
        },
        {
          id: 'n-pp-2',
          title: 'Projekt vs. Routineaufgabe: Der IHK-Vergleich',
          coreConcept: 'Die Einmaligkeit und Neuartigkeit trennt Projekte von zyklischen Standardaufgaben.',
          bulletPoints: [
            'Projekt (Einmalig & Neuartig): z. B. Entwicklung eines Standbogens einer besonderen Falzung für eine neue Flyerserie inklusive Stanzkontur.',
            'Routineaufgabe (Wiederkehrend & Standard): z. B. die Produktion und der Nachdruck weiterer Flyer aus der bereits bestehenden Serie in festen Abständen.',
            'Routineaufgaben laufen nach etablierten Standardprozessen ab, besitzen kein neuartiges Ziel und bergen kaum Planungsunsicherheit.',
            'In der Praxis können aus erfolgreichen Projektergebnissen (z. B. neu eingeführter Workflow) spätere Routineaufgaben für das Team werden.'
          ],
          examFavorite: true,
          example: 'Projekt: Entwicklung der App. Routine: Monatliche Server-Updates und Backup-Kontrollen.',
          merksatz: 'Entwicklung der Sonderfalzung = Projekt! Zyklischer Nachdruck = Routineaufgabe!'
        },
        {
          id: 'n-pp-3',
          title: 'Die 3 begrenzten Ressourcen & Risikofaktoren',
          coreConcept: 'Erfolgreiches Projektmanagement balanciert Personal, Budget und Technik unter Unsicherheit.',
          bulletPoints: [
            'Projektmitarbeiter: Qualifizierte Fachkräfte (z. B. Mediengestalter, Programmierer, Drucktechniker) stehen nur begrenzt zur Verfügung.',
            'Finanzielle Ressourcen: Das Projektbudget ist vertraglich oder betriebsintern strikt gedeckelt.',
            'Technische Ressourcen: Spezialmaschinen, Druckplattenbelichter, Lizenzen und Produktionsmaterialien müssen präzise disponiert werden.',
            'Risiko & Unsicherheit: Abhängigkeiten von Zulieferern, unvollständige Kundenbriefings oder technische Engpässe erfordern kontinuierliches Risikomanagement.'
          ],
          examFavorite: true,
          merksatz: 'Personal + Budget + Technik = Die 3 begrenzten Ressourcen jeder Projektplanung!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-1-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: 'Welche 7 konstitutiven Merkmale kennzeichnen ein Projekt nach gängiger IHK-Definition (DIN 69901)?',
          options: [
            {
              id: 'a',
              text: 'Vorgegebenes Ziel, Neuartigkeit, Einmaligkeit, Komplexität, zeitliche Begrenzung, begrenzte Ressourcen, Risiko/Unsicherheit',
              isCorrect: true,
              explanation: 'Exakt! Das sind die 7 im IHK-Lehrplan und Skript verankerten Wesensmerkmale eines Projekts.'
            },
            {
              id: 'b',
              text: 'Unbegrenztes Budget, dauerhafte Durchführung ohne Endtermin, keine Risiken, ausschließlich Einzelarbeit',
              isCorrect: false,
              explanation: 'Falsch: Ein Projekt hat immer feste Ressourcenlimits, Befristung und inhärentes Risiko.'
            },
            {
              id: 'c',
              text: 'Tägliche Wiederholung in festgeschriebenen Abständen ohne jede Neuerung',
              isCorrect: false,
              explanation: 'Falsch: Das beschreibt eine Routineaufgabe.'
            },
            {
              id: 'd',
              text: 'Rein mündliche Absprachen ohne definiertes Soll-Ziel oder Terminvorgaben',
              isCorrect: false,
              explanation: 'Falsch: Zielvorgabe und Zeitbegrenzung sind zwingende Kernmerkmale.'
            }
          ],
          merksatz: 'Die 7 Merkmale: Ziel, Neuartigkeit, Einmaligkeit, Komplexität, Zeitgrenze, Ressourcenlimit, Risiko!'
        },
        {
          id: 'q-pp-1-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: 'Welches Praxisbeispiel beschreibt nach dem IHK-Skript eindeutig ein PROJEKT und KEINE Routineaufgabe?',
          options: [
            {
              id: 'a',
              text: 'Die Entwicklung eines Standbogens einer besonderen Falzung für eine neue Flyerserie',
              isCorrect: true,
              explanation: 'Richtig! Original-Beispiel aus dem IHK-Skript: Einmalig, neuartig und erfordert Planung vor Beginn.'
            },
            {
              id: 'b',
              text: 'Die Produktion und der Nachdruck weiterer Flyer aus der bestehenden Flyerserie alle 3 Monate',
              isCorrect: false,
              explanation: 'Falsch: Der zyklische Nachdruck ist eine klassische Routineaufgabe.'
            },
            {
              id: 'c',
              text: 'Das tägliche Kontrollieren des Posteingangs und Verteilen von Standardaufträgen',
              isCorrect: false,
              explanation: 'Falsch: Das ist wiederkehrende Routinearbeit im Tagesgeschäft.'
            },
            {
              id: 'd',
              text: 'Das wöchentliche Reinigen der Farbwalzen an der Druckmaschine nach Schichtende',
              isCorrect: false,
              explanation: 'Falsch: Das ist eine permanente Standard-Wartung.'
            }
          ]
        },
        {
          id: 'q-pp-1-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: 'Welche drei konkreten Ressourcen-Kategorien stehen bei Projekten in der Regel nur in begrenztem Maße zur Verfügung?',
          options: [
            { id: 'a', text: 'Projektmitarbeiter (Personal), finanzielle Mittel (Budget) und technische Betriebsmittel (Maschinen, Software & Material)', isCorrect: true, explanation: 'Korrekt! Genau diese drei Säulen nennt das IHK-Skript unter "Begrenzte Ressourcen".' },
            { id: 'b', text: 'Allgemeine Büroausstattung wie Schreibtischlampen, Kaffeemaschinen und Raumluftbefeuchter im Agenturgebäude', isCorrect: false, explanation: 'Falsch: Das sind allgemeine Arbeitsplatzbedingungen, keine Projektressourcen im engeren Sinne.' },
            { id: 'c', text: 'Ausschließliche persönliche Rücklagen des Projektleiters ohne jeglichen Einbezug von betrieblichem Unternehmenskapital', isCorrect: false, explanation: 'Falsch: Das Projektbudget ist fest eingeplantes Unternehmenskapital.' },
            { id: 'd', text: 'Unbegrenzte Serverkapazitäten in externen Cloud-Netzwerken und vollautomatisierte KI-Rechenzentren', isCorrect: false, explanation: 'Falsch: Ressourcen sind immer limitiert und müssen budgetiert werden.' }
          ]
        },
        {
          id: 'q-pp-1-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: 'Warum zeichnet sich ein Projekt stets durch ein inhärentes Risiko bzw. Unsicherheit aus?',
          options: [
            { id: 'a', text: 'Weil viele Aktivitäten schwer im Voraus planbar sind, von vorgelagerten Schritten abhängen und Änderungen auftreten können', isCorrect: true, explanation: 'Richtig! Die Neuartigkeit und Komplexität führen unvermeidlich zu Planungsunsicherheiten und Risiken.' },
            { id: 'b', text: 'Weil Projekte grundsätzlich ohne verbindliche Leistungsvereinbarungen und ohne Terminabsprachen durchgeführt werden', isCorrect: false, explanation: 'Falsch: Gesetzliche und vertragliche Grundlagen gelten unverändert.' },
            { id: 'c', text: 'Weil technische Produktionsmittel wie Druckmaschinen und Belichter bei neuen Vorhaben grundsätzlich versagen', isCorrect: false, explanation: 'Risiken resultieren aus der Komplexität des Vorhabens, nicht aus pauschalem Maschinenausfall.' },
            { id: 'd', text: 'Weil das Deutsche Institut für Normung (DIN) für jedes geführte Medienprojekt ein bewusstes Scheitern vorschreibt', isCorrect: false, explanation: 'Völlig abwegig: Normen dienen dem Erfolg und der Qualitätssicherung.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-1-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: '[IHK-Fallanalyse] Eine Großdruckerei beschließt die Anschaffung und Inbetriebnahme einer hochmodernen 8-Farben-Offsetmaschine. Der Werkstattleiter meint: „Das ist kein Projekt, sondern reines Tagesgeschäft.“ Wie ist dies nach den 7 Projektmerkmalen zu bewerten?',
          scenario: 'Ein Auszubildender soll im Fachgespräch begründen, warum eine Maschineneinführung als Projekt geführt werden muss.',
          options: [
            { id: 'a', text: 'Die Aussage ist falsch: Die Maschineneinführung ist einmalig, neuartig, komplex (Schulung, Profile, Fundament), zeitlich befristet, budgetiert und birgt hohe Risiken – somit ein echtes Projekt', isCorrect: true, explanation: 'Exakt! Auch im Skript genannt: Die Einführung einer neuen Druckmaschine ist ein Paradebeispiel für ein Investitions- und Organisationsprojekt.' },
            { id: 'b', text: 'Die Aussage ist richtig: Da der Einkauf ohnehin laufend Maschinenersatzteile bestellt, gilt jede neue Produktionsanlage als reines operatives Tagesgeschäft', isCorrect: false, explanation: 'Falsch: Eine Neuanlage greift tief in den gesamten Betrieb ein und erfüllt alle 7 Kriterien.' },
            { id: 'c', text: 'Es handelt sich nur dann um ein Projekt, wenn die Anlage über ein Leasingmodell finanziert wurde und keine Eigenmittel des Betriebs gebunden werden', isCorrect: false, explanation: 'Falsch: Die Finanzierungsform ändert nichts am Projektcharakter des Vorhabens.' },
            { id: 'd', text: 'Es ist eine reine Routineaufgabe, da der mechanische Aufbau von Produktionsmaschinen im Offsetdruck gesetzlich von jeder Projektplanung befreit ist', isCorrect: false, explanation: 'Falsch: Ein Maschinenaufbau erfordert intensive Dokumentation und Projektmanagement.' }
          ],
          examTip: 'IHK-Tipp: Bei Fallfragen immer die 7 Merkmale abprüfen: Einmalig? Neuartig? Befristet? Budgetgrenze? Hohes Risiko? Wenn ja → PROJEKT!'
        },
        {
          id: 'l2-pp-1-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: '[IHK-Transfer] Eine Digitalagentur betreut seit 3 Jahren einen Kunden-Webshop im laufenden Betrieb. Welche der folgenden Beauftragungen begründet den Start eines NEUEN EIGENSTÄNDIGEN PROJEKTS?',
          scenario: 'Die Agenturleitung muss Arbeitsstunden zwischen Projektbudget und laufendem Betreuungsvertrag sauber trennen.',
          options: [
            { id: 'a', text: 'Kompletter technischer und visueller Relaunch mit responsivem Neudesign, Headless-CMS-Anbindung und festem Go-Live-Termin zur Weihnachts-Saison', isCorrect: true, explanation: 'Richtig! Ein Relaunch mit neuer Architektur, festem Stichtag und definiertem Budget ist ein vollwertiges Projekt.' },
            { id: 'b', text: 'Das wöchentliche Austauschen von zwei Aktionspreisen und Werbebannern auf der Startseite im Rahmen der laufenden Redaktionsroutine', isCorrect: false, explanation: 'Falsch: Das ist wiederkehrende Content-Pflege (Routineaufgabe).' },
            { id: 'c', text: 'Das monatliche Einspielen von regulären Sicherheits-Patches und Software-Updates auf dem bestehenden Kunden-Webserver', isCorrect: false, explanation: 'Falsch: Wartung im Regelbetrieb ist eine Routineaufgabe.' },
            { id: 'd', text: 'Die kontinuierliche Beantwortung und Bearbeitung eingehender Kunden-Support-Anfragen im regulären Helpdesk-Ticketsystem', isCorrect: false, explanation: 'Falsch: Support ist fortlaufende Linientätigkeit.' }
          ],
          examTip: 'Achte auf den Unterschied: Laufende Instandhaltung = Routine. Fundamentale Neuentwicklung mit festem Endtermin = Projekt.'
        },
        {
          id: 'l2-pp-1-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-1',
          question: '[IHK-Entscheidungskompetenz] Zu Beginn eines Projekts sind viele Teilaufgaben und Problemstellungen noch unklar (Komplexität). Welche Konsequenz ergibt sich daraus für den Projektstart?',
          scenario: 'Ein Projektleiter wird gefragt, warum er nicht sofort mit dem Druck bzw. Programmieren beginnt, sondern eine Voranalyse fordert.',
          options: [
            { id: 'a', text: 'Vor dem Projektstart müssen Rahmenbedingungen, Risiken und Abhängigkeiten strukturiert durchdacht und koordiniert werden, um Fehlentwicklungen vorzubeugen', isCorrect: true, explanation: 'Exakt! Zitat aus dem Skript: "Vor dem Projektstart müssen eine Vielzahl von Teilaufgaben und Problemstellungen durchdacht und koordiniert werden."' },
            { id: 'b', text: 'Man sollte ohne vorherige Konzeption sofort mit der Ausführung beginnen und bei Fehlern den Auftraggeber dafür verantwortlich machen', isCorrect: false, explanation: 'Unprofessionell und widerspricht allen Management-Prinzipien.' },
            { id: 'c', text: 'Das Projekt muss bei der geringsten Unklarheit sofort storniert werden, da Projekte per DIN-Definition zu 100 % vorhersagbar sein müssen', isCorrect: false, explanation: 'Falsch: Projekte beinhalten naturgemäß Unsicherheiten; professionelles Management steuert diese.' },
            { id: 'd', text: 'Die Ressourcenplanung und Budgetierung darf erst nach vollständigem Abschluss aller fachlichen Umsetzungsarbeiten durchgeführt werden', isCorrect: false, explanation: 'Falsch: Ressourcenplanung ist das A&O vor Beginn.' }
          ]
        }
      ]
    },
    // MODUL 2 (SEITE 2 VON 7)
    {
      id: 'projphase-2',
      chapterId: 'project-phases',
      title: 'Seite 2: Teamentwicklung & Phase 1: Forming',
      shortDesc: 'Bruce Tuckman Modell, Teamentwicklung als Führungsaufgabe & Forming-Phase',
      estimatedMinutes: 5,
      miniGameType: 'forming_leadership',
      nuggets: [
        {
          id: 'n-pp-2-1',
          title: 'Warum Teamentwicklung kein Selbstläufer ist',
          coreConcept: 'Gute Teams entstehen nicht automatisch durch bloßes Zusammenstellen fähiger Talente.',
          bulletPoints: [
            'Zusammengewürfelt vs. echtes Team: Meist werden Mitarbeiter zusammengewürfelt; was zum echten Team führt, ist Beziehungsarbeit.',
            'Der Besetzungs-Irrtum: „Stell die passenden Talente zusammen, gib ihnen ein Ziel, halt dich raus, der Rest ergibt sich“ scheitert in der Praxis fast immer.',
            'Fähige Menschen können ein schlechtes Team bilden, und durchschnittliche Menschen ein hervorragendes Team.',
            'Der Unterschied liegt nicht im Einzelnen, sondern im Dazwischen: Vertrauen, gemeinsame Regeln und Verlässlichkeit.',
            'Teamentwicklung ist eine Führungsaufgabe und keine reine Personalentscheidung: Vertrauen lässt sich nicht anordnen, sondern nur ermöglichen.'
          ],
          examFavorite: true,
          merksatz: 'Teamentwicklung lässt sich nicht anordnen – Führung muss Vertrauen und Spielregeln ermöglichen!'
        },
        {
          id: 'n-pp-2-2',
          title: 'Das Phasenmodell nach Bruce Tuckman (1965 / 1977)',
          coreConcept: 'Teamentwicklung durchläuft 4 typische Phasen (+ 1 Abschlussphase).',
          bulletPoints: [
            '1. Forming (Orientierungsphase): Höfliches Abtasten, Rollenunklarheit, Scheinharmonie.',
            '2. Storming (Konfrontationsphase): Erste Reibungspunkte, Konflikte um Rollen und Arbeitsweisen.',
            '3. Norming (Organisationsphase): Etablierung verbindlicher Spielregeln, Wir-Gefühl und Akzeptanz.',
            '4. Performing (Hochleistungsphase): Selbstorganisiertes Arbeiten, hohe Produktivität, gegenseitiges Vertrauen.',
            '5. Adjourning / Mourning (1977 ergänzt): Projektabschluss, Reflexion und geordnete Teamauflösung.',
            'Situative Führung: Jede Phase verlangt einen anderen Führungsstil – was in der einen hilft, schadet in der anderen!'
          ],
          examFavorite: true,
          example: 'Ein agiler Laissez-faire-Stil schadet im Forming, weil das Team noch Orientierung braucht. Umgekehrt erstickt stark autoritäre Führung ein reifes Team im Performing.',
          merksatz: 'Forming → Storming → Norming → Performing (+ Adjourning)!'
        },
        {
          id: 'n-pp-2-3',
          title: 'Phase 1: Forming (Die höfliche Anfangszeit)',
          coreConcept: 'Höflichkeit und Orientierungsbedarf prägen den Start; Scheinharmonie ist die größte Führungsfalle.',
          bulletPoints: [
            'Woran man Forming erkennt: Viel vorsichtige Zustimmung, wenig Widerspruch. Fragen werden an die Führungskraft gerichtet statt untereinander geklärt. Rollen sind noch unklar, Energie hat noch keine Richtung.',
            'Der typische Fehler: Oberflächliche Scheinharmonie mit echter Teamreife verwechseln („Läuft doch super, alle ziehen mit“ = Trugschluss; die Harmonie hält nur, solange nichts Kritisches passiert).',
            'Was Führung tun muss: Orientierung bieten! Klare Ziele, verbindliche Rollen und klare Erwartungen definieren („Wer macht was, worauf arbeiten wir hin, wie treffen wir Entscheidungen?“).',
            'Grundlagenarbeit vor Aktionismus: Sich die Zeit nehmen, Spielregeln zu setzen, erspart später im Storming enorme Reibungsverluste.',
            'Früh Gelegenheiten schaffen, in denen sich die Teammitglieder untereinander austauschen und Vertrauen aufbauen.'
          ],
          examFavorite: true,
          example: 'Im Kickoff-Meeting sofort Zuständigkeiten, Freigabepfade und Kommunikationskanäle (Slack, Jira) verbindlich vereinbaren.',
          merksatz: 'Forming braucht Orientierung, klare Rollen und Ziele – verwechsle Höflichkeit niemals mit Teamreife!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-2-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: 'In welcher korrekten Reihenfolge durchläuft ein Team die Phasen der Teamentwicklung nach Bruce Tuckman?',
          options: [
            { id: 'a', text: 'Forming (Orientierungsphase) → Storming (Konfrontationsphase) → Norming (Organisationsphase) → Performing (Hochleistungsphase)', isCorrect: true, explanation: 'Exakt! Das 4-Phasen-Modell von Bruce Tuckman (1965), 1977 um Adjourning (Auflösung) ergänzt.' },
            { id: 'b', text: 'Performing (Hochleistungsphase) → Storming (Konfrontationsphase) → Forming (Orientierungsphase) → Norming (Organisationsphase)', isCorrect: false, explanation: 'Falsch: Ein neues Team kann nicht mit der Hochleistungsphase beginnen.' },
            { id: 'c', text: 'Storming (Konfrontationsphase) → Forming (Orientierungsphase) → Performing (Hochleistungsphase) → Norming (Organisationsphase)', isCorrect: false, explanation: 'Falsch: Die Orientierung (Forming) geht der Konfrontation (Storming) immer voraus.' },
            { id: 'd', text: 'Norming (Organisationsphase) → Performing (Hochleistungsphase) → Forming (Orientierungsphase) → Storming (Konfrontationsphase)', isCorrect: false, explanation: 'Falsch: Regeln (Norming) können erst nach Klärung der Reibungspunkte entstehen.' }
          ],
          merksatz: 'Forming → Storming → Norming → Performing!'
        },
        {
          id: 'q-pp-2-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: 'Warum ist Teamentwicklung nach dem IHK-Leitfaden eine Führungsaufgabe und keine reine Personalentscheidung?',
          options: [
            { id: 'a', text: 'Weil fähige Talente nicht automatisch ein gutes Team bilden; Vertrauen und gemeinsame Spielregeln müssen von der Führung aktiv ermöglicht und begleitet werden', isCorrect: true, explanation: 'Richtig! Der Unterschied liegt nicht in den Einzelpersonen, sondern in dem, was dazwischen entsteht (Vertrauen, Verlässlichkeit).' },
            { id: 'b', text: 'Weil die Personalabteilung per Betriebsverfassungsgesetz rechtlich daran gehindert ist, interne Kick-off-Workshops für Projektteams zu moderieren', isCorrect: false, explanation: 'Falsch: Das ist arbeitsrechtlicher Unsinn.' },
            { id: 'c', text: 'Weil jede Führungskraft im Medienbereich vor Projektbeginn für alle beteiligten Mitarbeiter eine benotete Wissensprüfung durchführen muss', isCorrect: false, explanation: 'Falsch: Teamentwicklung ist keine schulische Wissensabfrage.' },
            { id: 'd', text: 'Weil ein echtes Team erst dann entsteht, wenn die Projektleitung sämtliche fachlichen Umsetzungsaufgaben ohne Zuarbeit des Teams eigenhändig ausführt', isCorrect: false, explanation: 'Falsch: Das widerspricht dem Wesen von Teamarbeit.' }
          ],
          merksatz: 'Teamentwicklung ist eine Führungsaufgabe – Vertrauen lässt sich nicht anordnen, nur ermöglichen!'
        },
        {
          id: 'q-pp-2-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: 'Woran lässt sich die Forming-Phase (Phase 1) in einem neu zusammengestellten Projektteam typischerweise erkennen?',
          options: [
            { id: 'a', text: 'Vorsichtige Höflichkeit, viel Zustimmung, kaum offene Konflikte und Fragen werden vor allem an die Führungskraft gerichtet', isCorrect: true, explanation: 'Genau! Man tastet sich ab, meidet Risiken und orientiert sich stark an der formalen Leitfigur.' },
            { id: 'b', text: 'Aggressive Machtkämpfe um Führungspositionen, lautstarke Kritik an der Projektleitung und offene Cliquenbildung im Team', isCorrect: false, explanation: 'Falsch: Das kennzeichnet die nachfolgende Storming-Phase.' },
            { id: 'c', text: 'Blindes, intuitives Vertrauen, maximale selbstorganisierte Geschwindigkeit und vollständiges Fehlen formaler Führung', isCorrect: false, explanation: 'Falsch: Das ist die Performing-Phase.' },
            { id: 'd', text: 'Gemeinsame Trauer über das nahende Projektende, Wehmut und emotionale Vorbereitung auf die bevorstehende Teamauflösung', isCorrect: false, explanation: 'Falsch: Das beschreibt die Adjourning-/Mourning-Phase.' }
          ]
        },
        {
          id: 'q-pp-2-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: 'Welcher typische Fehler wird von unerfahrenen Führungskräften in der Forming-Phase besonders häufig begangen?',
          options: [
            {
              id: 'a',
              text: 'Die oberflächliche Scheinharmonie und Konfliktvermeidung mit echter, belastbarer Teamreife zu verwechseln',
              isCorrect: true,
              explanation: 'Richtig! Die Formel „Läuft doch super, alle ziehen mit“ ist im Forming fast immer ein Trugschluss, der beim ersten Problem kollabiert.'
            },
            {
              id: 'b',
              text: 'Zu Beginn klare Rollen, Ziele und Erwartungen mit dem Team zu vereinbaren',
              isCorrect: false,
              explanation: 'Falsch: Das ist genau das richtige Führungsverhalten!'
            },
            {
              id: 'c',
              text: 'Den Teammitgliedern Orientierung bei Freigaben und Entscheidungen zu geben',
              isCorrect: false,
              explanation: 'Falsch: Orientierung ist im Forming dringend geboten.'
            },
            {
              id: 'd',
              text: 'Ein strukturiertes Kickoff-Meeting mit Kennenlern-Möglichkeit durchzuführen',
              isCorrect: false,
              explanation: 'Falsch: Das ist vorbildliche Projektpraxis.'
            }
          ],
          merksatz: 'Scheinharmonie-Falle: Vorsichtige Höflichkeit im Forming ist noch keine belastbare Teamreife!'
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-2-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: '[IHK-Fallanalyse] Nach dem Kickoff-Meeting eines App-Projekts bemerkt die Projektleiterin, dass alle Teammitglieder jede Detailentscheidung bei ihr rückversichern und kaum miteinander sprechen. Wie ist dieses Verhalten nach Tuckman zu bewerten und was ist zu tun?',
          scenario: 'Die Projektleiterin möchte wissen, ob das Team unfähig ist oder ein Phasenphänomen vorliegt.',
          options: [
            { id: 'a', text: 'Das Team befindet sich in der Forming-Phase (Orientierung/Unsicherheit). Das Verhalten ist normal; die Führungskraft muss aktiv Orientierung, Struktur und Sicherheit geben, anstatt Eigeninitiative vorauszusetzen', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für die Orientierungsphase.' },
            { id: 'b', text: 'Das Team befindet sich bereits in der Performing-Phase; die Führungskraft muss sich sofort vollständig zurückziehen und jegliche operative Kommunikation unterbinden', isCorrect: false, explanation: 'Falsch: Performing zeichnet sich durch hohe Autonomie und Reife aus, nicht durch Unsicherheit.' },
            { id: 'c', text: 'Das Team demonstriert verdeckten Widerstand der Storming-Phase; die Projektleitung muss disziplinarische Abmahnungen wegen mangelnder Arbeitsbereitschaft erteilen', isCorrect: false, explanation: 'Falsch: Scheu und Unsicherheit im Forming sind kein böswilliger Widerstand, sondern ein natürlicher Orientierungsprozess.' },
            { id: 'd', text: 'Es handelt sich um ein methodisch fehlerfreies Adjourning; die Projektleitung muss das Vorhaben sofort beenden und die Mitarbeiter auflösen', isCorrect: false, explanation: 'Falsch: Adjourning ist die Auflösungsphase am Ende des Projekts und nicht der Beginn.' }
          ],
          examTip: 'IHK-Tipp: Bei Fragen nach Teamstart immer prüfen: Gibt die Führungskraft Orientierung? Werden Rollen geklärt? Beides ist in Phase 1 Pflicht!'
        },
        {
          id: 'l2-pp-2-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: '[IHK-Transfer] Ein Abteilungsleiter argumentiert: „Gute Leute brauchen keine Kennenlernphase oder Rollenabsprachen – Zeit ist Geld, wir legen sofort mit der Produktion los.“ Welche Konsequenzen hat dieser Verzicht auf die Forming-Grundlagen?',
          scenario: 'In einem Redaktionsprojekt wird die Forming-Phase übersprungen, um 3 Tage Zeit zu sparen.',
          options: [
            { id: 'a', text: 'Das Team überspringt die Klärungsphase; bei den ersten inhaltlichen Differenzen eskalieren ungeklärte Rollen zu destruktiven Konflikten im Storming mit hohem Nacharbeitsaufwand', isCorrect: true, explanation: 'Richtig! Ohne klares Fundament im Forming wird das Storming oft destruktiv.' },
            { id: 'b', text: 'Das Projekt spart durch den Verzicht auf Kennenlernen nachweislich 20 % der Gesamtkosten ein, ohne jegliche Qualitätseinbußen im Endergebnis', isCorrect: false, explanation: 'Falsch: Eingesparte Zeit am Anfang wird später durch Missverständnisse und Reibungsverluste mehrfach draufgezahlt.' },
            { id: 'c', text: 'Das Team wechselt durch den schnellen Start direkt in die Performing-Phase und erreicht Spitzenleistungen ohne Reibungsverluste', isCorrect: false, explanation: 'Falsch: Phasen können in ihrer Dynamik nicht einfach wirkungslos übersprungen werden.' },
            { id: 'd', text: 'Der Verzicht auf Rollenabsprachen führt dazu, dass die gesetzliche Gewährleistung der Druckerei automatisch erlischt', isCorrect: false, explanation: 'Falsch: Interne Teamdynamiken berühren nicht die kaufmännische Gewährleistung von Lieferanten.' }
          ]
        },
        {
          id: 'l2-pp-2-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-2',
          question: '[IHK-Führungsverhalten] Was bedeutet der Grundsatz: „Was in der einen Phase hilft, schadet in der anderen“ für die Führungskraft im Übergang von Forming zu späteren Phasen?',
          scenario: 'Eine Führungskraft möchte ihren Führungsstil über die gesamte Projektlaufzeit unverändert beibehalten.',
          options: [
            { id: 'a', text: 'Eine Führungskraft, die im Forming klare Vorgaben macht, gibt Sicherheit; würde sie dieselbe dirigistische Kontrolle jedoch in der Performing-Phase beibehalten, würde sie die Autonomie und Motivation des reifen Teams ersticken', isCorrect: true, explanation: 'Richtig! Der Führungsstil muss zwingend mit der Teamreife wachsen (situatives Führen).' },
            { id: 'b', text: 'In der Forming-Phase ist ausschließliche Laissez-faire-Führung gefordert, während in der Performing-Phase strikte Kontrollen den Arbeitsfluss sichern', isCorrect: false, explanation: 'Genau verkehrt herum: Zu Beginn braucht das Team Struktur; später benötigt es Freiraum.' },
            { id: 'c', text: 'Führungskräfte müssen in allen Phasen von Forming bis Adjourning exakt denselben autoritären Führungsstil durchsetzen, um Rollenkonflikte zu unterdrücken', isCorrect: false, explanation: 'Starrer Führungsstil verhindert Teamentwicklung und blockiert Motivation.' },
            { id: 'd', text: 'Situatives Führen bedeutet, die Leitungsrolle nach Abschluss der ersten Arbeitswoche vollständig abzugeben und Entscheidungen dem Zufall zu überlassen', isCorrect: false, explanation: 'Führungskraft bleibt immer verantwortlich für Rahmenbedingungen und Zielerreichung.' }
          ],
          examTip: 'Merke: Situative Führung passt den Führungsstil exakt an die aktuelle Teamphase an!'
        }
      ]
    },
    // MODUL 3 (SEITE 3 VON 7)
    {
      id: 'projphase-3',
      chapterId: 'project-phases',
      title: 'Seite 3: Storming & Norming (Konflikte, Spielregeln & Führung)',
      shortDesc: 'Phase 2: Reibung & Streitkultur, Phase 3: Wir-Gefühl & Spielregeln etablieren',
      estimatedMinutes: 6,
      miniGameType: 'storming_norming_match',
      nuggets: [
        {
          id: 'n-pp-3-1',
          title: 'Phase 2: Storming – Wenn es zum ersten Mal knirscht',
          coreConcept: 'Im Storming kippt die anfängliche Höflichkeit: Meinungen prallen aufeinander und Rollen werden infrage gestellt.',
          bulletPoints: [
            'Die Höflichkeit kippt: Meinungen prallen aufeinander, Rollen werden hinterfragt und die Aufgabenverteilung wird oft als ungerecht empfunden.',
            'Offene oder verdeckte Konflikte: Manchmal offener Streit, oft aber subtile Signale wie Augenrollen, auffallend kurze Mails, Schweigen im Meeting oder Flurfunk.',
            'Woran man es erkennt: Diskussionen werden zäher und persönlicher. Früher schnelle Entscheidungen ziehen sich quälend lang hin.',
            'Lagerbildung & Frust gegen Führung: Es bilden sich verfeindete Cliquen und der Frust richtet sich häufig nach oben („die da oben haben keine Ahnung vom Arbeitsaufwand“).',
            'Kein Rückschritt, sondern Reifung: Reibung entsteht, weil Teammitglieder anfangen, sich mit eigenen Ansprüchen einzubringen. Ein Team ohne Storming bleibt oberflächlich und riskiert nichts!'
          ],
          examFavorite: true,
          example: 'Zwei Mediengestalter streiten über das Bildkonzept: Früher nickten beide brav; jetzt verteidigt jeder vehement seinen Ansatz und fühlt sich bei der Arbeitsverteilung benachteiligt.',
          merksatz: 'Storming ist kein Rückschritt, sondern der Moment, in dem ein Team echt wird!'
        },
        {
          id: 'n-pp-3-2',
          title: 'Führung im Storming: Moderieren statt Urteilen',
          coreConcept: 'Führungskräfte müssen Streitkultur ermöglichen, statt Konflikte mit Scheinharmonie zu ersticken.',
          bulletPoints: [
            'Typischer Fehler 1: Konflikt zudecken wollen. Der Reflex nach schneller Einigkeit („Reißt euch zusammen, habt euch lieb“) presst Spannungen unter die Oberfläche -> führt zu dauerhafter Lähmung!',
            'Typischer Fehler 2: Sich heraushalten und hoffen, dass es sich von allein legt (tut es fast nie und verhärtet die Fronten).',
            'Was Führung tun muss: Konflikte nicht ersticken, sondern in geordnete, lösungsorientierte Bahnen lenken.',
            'Reibungspunkte ansprechbar machen & Rollen klären: Die häufigste Ursache von Storming sind ungeklärte Zuständigkeiten und Schnittstellen.',
            'Moderieren statt urteilen: Nicht den inhaltlichen Richter spielen, sondern für ein faires, produktives Austragen sorgen.'
          ],
          examFavorite: true,
          merksatz: 'Ein Team, das lernt, gut zu streiten, ist am Ende stärker als eines, das nie gestritten hat!'
        },
        {
          id: 'n-pp-3-3',
          title: 'Phase 3: Norming – Die gemeinsamen Regeln entstehen',
          coreConcept: 'Nach erfolgreichem Storming findet das Team seinen eigenen Rhythmus und wechselt vom „Ich“ zum „Wir“.',
          bulletPoints: [
            'Entwicklung ungeschriebener Regeln: Das Team etabliert eigene Normen für Umgang, Entscheidungsfindung und Zusammenarbeit („wie man miteinander umgeht, was okay ist und was nicht“).',
            'Eigenständige Konfliktlösung: Meinungsverschiedenheiten werden nun direkt untereinander geklärt, ohne dass die Führungskraft als Schlichter einschreiten muss.',
            'Gegenseitige Unterstützung & Wir-Gefühl: Kollegen helfen sich unaufgefordert ohne Dienstanweisung; es entsteht echter Stolz auf gemeinsam Erreichtes.',
            'Stabilere Stimmung: Die Harmonie basiert nun auf echten gemeinsamen Erfahrungen statt auf ängstlicher Höflichkeit.',
            'Typischer Führungsfehler: Zu viel Kontrolle! Wenn die Führungskraft den engen Steuerungsmodus beibehält, würgt sie die aufkeimende Selbstständigkeit ab.',
            'Aufgabe der Führung: Verantwortung abgeben! Regeln sichtbar machen, bestärken, Raum geben, Zutrauen zeigen und Fehler als Lernchancen zulassen.'
          ],
          examFavorite: true,
          example: 'Designer und Techniker stimmen Dateibenennungen und Übergaben eigenständig ab. Als ein Kollege unter Termindruck gerät, übernimmt ein anderer ungefragt Teilaufgaben.',
          merksatz: 'Norming ist die Phase, in der Führung Verantwortung abgeben und loslassen muss!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-3-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: 'Welche Symptome und Dynamiken kennzeichnen nach Bruce Tuckman und Christoph Schulze die Phase 2 (Storming)?',
          options: [
            {
              id: 'a',
              text: 'Meinungen prallen aufeinander, Rollen und Aufgabenverteilung werden als ungerecht empfunden, zähe Diskussionen und Frust richten sich oft gegen „die da oben“',
              isCorrect: true,
              explanation: 'Exakt! Im Storming bricht die anfängliche Höflichkeit auf. Es kommt zu Reibungen, Cliquenbildung, zähen Abstimmungen und offener oder verdeckter Kritik an Führung und Aufgabenverteilung.'
            },
            {
              id: 'b',
              text: 'Absolute Harmonie, blindes Vertrauen und vollkommen reibungslose, fehlerfreie Zusammenarbeit ohne jede Diskussion',
              isCorrect: false,
              explanation: 'Falsch: Das beschreibt eher die Performing-Phase (Phase 4), keinesfalls die turbulente Storming-Phase.'
            },
            {
              id: 'c',
              text: 'Übervorsichtige Höflichkeit, starkes Abtasten und die Vermeidung jedes noch so kleinen Risikos aus Angst vor Ablehnung',
              isCorrect: false,
              explanation: 'Falsch: Das sind die typischen Merkmale der Forming-Phase (Phase 1).'
            },
            {
              id: 'd',
              text: 'Die offizielle Auflösung der Arbeitsgruppe und die Dokumentation von Lessons Learned nach Projektabschluss',
              isCorrect: false,
              explanation: 'Falsch: Das ist die Adjourning-Phase (Phase 5).'
            }
          ],
          examTip: 'Merke: Storming ist kein Rückschritt, sondern der Moment, in dem ein Team durch eigene Vorstellungen und Reibung erst echt wird!'
        },
        {
          id: 'q-pp-3-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: 'Welcher typische Fehler einer Führungskraft führt in der Storming-Phase zu einer dauerhaften Lähmung des Teams?',
          options: [
            {
              id: 'a',
              text: 'Den Konflikt aus einem Reflex nach schneller Einigkeit zudecken wollen, wodurch die Spannungen unter die Oberfläche wandern und verdeckt schwelen',
              isCorrect: true,
              explanation: 'Richtig! Wer Konflikte mit erzwungener Scheinharmonie unterdrückt („Habt euch gefälligst wieder lieb“), erzeugt Flurfunk, Zynismus und blockiert das Team dauerhaft.'
            },
            {
              id: 'b',
              text: 'Reibungspunkte offen ansprechbar machen und die unklaren Rollen und Schnittstellen klären',
              isCorrect: false,
              explanation: 'Falsch: Das ist genau die empfohlene, professionelle Führungsintervention!'
            },
            {
              id: 'c',
              text: 'Den Streitprozess unparteiisch moderieren, statt autoritär als inhaltlicher Richter aufzutreten',
              isCorrect: false,
              explanation: 'Falsch: Auch das ist eine vorbildliche Vorgehensweise.'
            },
            {
              id: 'd',
              text: 'Einen geschützten Raum für sachliche Retrospektiven zur Verfügung stellen',
              isCorrect: false,
              explanation: 'Falsch: Das fördert eine gesunde Streitkultur.'
            }
          ],
          examTip: 'Merke: Führung im Storming bedeutet Moderieren statt Urteilen – niemals Konflikte mit Scheinharmonie ersticken!'
        },
        {
          id: 'q-pp-3-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: 'Woran erkennt eine Führungskraft, dass ihr Team die Phase 3 (Norming) erreicht hat?',
          options: [
            { id: 'a', text: 'Das Team entwickelt ein echtes „Wir-Gefühl“, akzeptiert gemeinsame Arbeitsstandards und Rollen und tauscht konstruktives Feedback ohne persönliche Angriffe aus', isCorrect: true, explanation: 'Exakte Kennzeichen des Normings nach Tuckman.' },
            { id: 'b', text: 'Alle Teammitglieder fordern tägliche Einzelarbeitsverträge und verweigern jegliche Kommunikation über gemeinsame Projektziele', isCorrect: false, explanation: 'Dies deutet auf schwere Störungen hin und widerspricht dem Norming grundlegend.' },
            { id: 'c', text: 'Die Mitarbeiter arbeiten strikt gegeneinander und versuchen, die Arbeitsergebnisse anderer Abteilungen gezielt abzuwerten', isCorrect: false, explanation: 'Das ist destruktives Verhalten einer fehlgeleiteten Storming-Phase.' },
            { id: 'd', text: 'Das Projektteam löst sich eigenständig auf und übergibt die finale Dokumentation an das Unternehmensarchiv', isCorrect: false, explanation: 'Das beschreibt das Adjourning am Projektende.' }
          ],
          examTip: 'Merke: Norming = Ungeschriebene Regeln + Peer-to-Peer Konfliktlösung + Wir-Gefühl!'
        },
        {
          id: 'q-pp-3-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: 'Was ist der größte Führungsfehler in der Phase 3 (Norming)?',
          options: [
            {
              id: 'a',
              text: 'Zu viel Kontrolle: Das Beibehalten des engen Steuerungsmodus aus der Storming-Phase, was die aufkeimende Selbstständigkeit und Verantwortung ausbremst',
              isCorrect: true,
              explanation: 'Exakt! Christoph Schulze betont: In der Norming-Phase muss die Führungskraft Verantwortung abgeben und loslassen. Wer weiter micromanagt, erstickt die Eigeninitiative.'
            },
            {
              id: 'b',
              text: 'Dem Team Raum geben und Entscheidungen schrittweise an die Beteiligten zu übertragen',
              isCorrect: false,
              explanation: 'Falsch: Das ist genau das richtige Führungsverhalten im Norming.'
            },
            {
              id: 'c',
              text: 'Gemeinsame Meilensteine und funktionierende Regeln wertzuschätzen und sichtbar zu machen',
              isCorrect: false,
              explanation: 'Falsch: Das bestärkt das Team und fördert die Festigung der Kultur.'
            },
            {
              id: 'd',
              text: 'Fehler als Lernchancen zuzulassen und Vertrauen in die Problemlösungskompetenz des Teams zu setzen',
              isCorrect: false,
              explanation: 'Falsch: Das ist essenziell für den Übergang in die Hochleistungsphase (Performing).'
            }
          ],
          examTip: 'Merksatz: Norming ist die Phase, in der Führung Verantwortung abgeben und loslassen muss!'
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-3-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: '[IHK-Praxisfall: Werbeagentur] Nach 3 Wochen Projektarbeit prallen Frontend-Entwickler und Mediengestalter aufeinander. Die Entwickler beschweren sich über unvollständige Design-Tokens; die Gestalter klagen über mangelnde visuelle Umsetzung. In Meetings rollen die Beteiligten mit den Augen und verlangen von dir als Projektleiter eine Machtentscheidung („Sag denen endlich, wie sie arbeiten sollen!“). Wie handelst du nach dem Phasenmodell professionell?',
          scenario: 'Ein Projektleiter wird von zwei zerstrittenen Lagern im Team aufgefordert, als Schiedsrichter ein inhaltliches Machturteil zu fällen.',
          options: [
            { id: 'a', text: 'Nicht als Richter ein inhaltliches Machtwort sprechen, sondern den Prozess moderieren: Reibungspunkte in einem Workshop offen ansprechen, Schnittstellen und Rollen verbindlich vereinbaren und die Streitkultur auf die Sachebene lenken', isCorrect: true, explanation: 'Richtig! Storming braucht Moderation und Klärung, kein autoritäres Machtwort.' },
            { id: 'b', text: 'Sofort einseitig für die Entwickler Partei ergreifen und den Gestaltern androhen, bei weiteren Rückfragen externe Freelancer einzusetzen', isCorrect: false, explanation: 'Einseitige Parteinahme spaltet das Team dauerhaft und zerstört jegliches Vertrauen.' },
            { id: 'c', text: 'Beide Parteien schriftlich abmahnen und anordnen, dass fachliche Meinungsverschiedenheiten künftig mit disziplinarischen Aktennotizen geahndet werden', isCorrect: false, explanation: 'Rechtlich unzulässig und menschlich destruktiv; Konflikte müssen moderiert werden.' },
            { id: 'd', text: 'Die Beschwerden vollständig ignorieren und darauf hoffen, dass sich die tiefen Spannungen durch Zeitablauf von selbst auflösen', isCorrect: false, explanation: 'Aussitzen führt zur Verfestigung destruktiver Lagerbildung.' }
          ],
          examTip: 'Prüfer-Tipp: Führungskraft = Moderator und Prozessgestalter, nicht inhaltlicher Streitrichter!'
        },
        {
          id: 'l2-pp-3-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: '[IHK-Führungsverhalten] Warum bezeichnet der Führungsleitfaden den Satz: „Ein Team, das lernt, gut zu streiten, ist am Ende stärker als eines, das nie gestritten hat“ als zentralen Erfolgsfaktor?',
          scenario: 'In einer Qualitätsmanagement-Schulung wird diskutiert, ob Konflikte im Projekt grundsätzlich vermieden werden müssen.',
          options: [
            { id: 'a', text: 'Weil produktiv ausgetragene Konflikte unterschiedliche Perspektiven sichtbar machen, Rollen schärfen und echtes Vertrauen schaffen; Teams ohne Streitkultur bleiben oberflächlich und brechen bei echten Krisen auseinander', isCorrect: true, explanation: 'Richtig! Reife Teams brauchen eine konstruktive, angstfreie Streitkultur.' },
            { id: 'b', text: 'Weil permanenter Streit im Team die Durchlaufzeiten senkt und die Fehlerquote bei Druckmaschinen technisch eliminiert', isCorrect: false, explanation: 'Streit senkt keine Durchlaufzeiten; es geht um sachliche Klärung komplexer Fragen.' },
            { id: 'c', text: 'Weil Tuckman Konflikte als formale Pflichtmaßnahme vorschreibt, um leistungsschwache Mitarbeiter vorzeitig kündigen zu können', isCorrect: false, explanation: 'Tuckmans Modell ist ein sozialpsychologisches Entwicklungsmodell, kein Kündigungsinstrument.' },
            { id: 'd', text: 'Weil Teams, die lautstark streiten, nachweislich keine schriftliche Dokumentation oder Meilensteinplanung mehr benötigen', isCorrect: false, explanation: 'Methodische Planung und Dokumentation bleiben in jeder Projektphase unverzichtbar.' }
          ],
          examTip: 'IHK-Leitsatz: Konstruktive Streitkultur ist das Fundament für echte Leistungsfähigkeit (Performing)!'
        },
        {
          id: 'l2-pp-3-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-3',
          question: '[IHK-Transfer: Situatives Führen] In der Norming-Phase beginnt dein Team, sich morgens selbstständig abzustimmen, Arbeitsaufträge untereinander aufzuteilen und bei Engpässen kollegial einzuspringen. Welche Gefahr droht, wenn du als Projektleiter weiterhin jede Teilaufgabe minutengenau vorschreibst und tägliche Einzelkontrollen durchführst?',
          scenario: 'Eine Projektleitung hält an striktem Micromanagement fest, obwohl das Team bereits eine solide Kooperationskultur entwickelt hat.',
          options: [
            { id: 'a', text: 'Die Führungskraft signalisiert Misstrauen, demotiviert das selbstorganisierte Team und blockiert den natürlichen Übergang in die Hochleistungsphase (Performing)', isCorrect: true, explanation: 'Richtig! Micromanagement im Norming zerstört das aufkeimende Wir-Gefühl.' },
            { id: 'b', text: 'Das Team arbeitet durch die lückenlose Überwachung doppelt so schnell und schließt das Gesamtprojekt in halber Zeit ab', isCorrect: false, explanation: 'Micromanagement senkt die Geschwindigkeit durch bürokratische Kontrollschleifen.' },
            { id: 'c', text: 'Die DIN 69901-2 verlangt im Norming zwingend die stündliche Einzelkontrolle aller Projektbeteiligten durch den Projektleiter', isCorrect: false, explanation: 'Weder DIN-Norm noch Führungslehre fordern Micromanagement.' },
            { id: 'd', text: 'Es entsteht kein Schaden, da Mitarbeiter im Medienbetrieb permanente Einzelanweisungen der Eigeninitiative vorziehen', isCorrect: false, explanation: 'Kreative Fachkräfte benötigen Gestaltungsspielräume zur Problemlösung.' }
          ],
          examTip: 'IHK-Führungsregel: Was im Forming hilft (enge Führung), schadet im Norming (Überkontrolle)!'
        }
      ]
    },
    // MODUL 4 (SEITE 4 VON 7)
    {
      id: 'projphase-4',
      chapterId: 'project-phases',
      title: 'Seite 4: Performing & Adjourning (Höchstleistung, Rückfall & Projektabschluss)',
      shortDesc: 'Phase 4: Flow & Synergie, die Rückfall-Dynamik, Phase 5: Adjourning & bewusster Abschluss',
      estimatedMinutes: 6,
      miniGameType: 'performing_adjourning_flow',
      nuggets: [
        {
          id: 'n-pp-4-1',
          title: 'Phase 4: Performing – Wenn das Team einfach läuft',
          coreConcept: 'Das Ziel der Teamentwicklung: Autonome Höchstleistung, blindes Vertrauen und echter Flow.',
          bulletPoints: [
            'Das Ziel aller Phasen: Das Team arbeitet weitgehend selbstständig, Rollen sind glasklar, gegenseitiges Vertrauen ist tief verankert.',
            'Konfliktfestigkeit: Man kann sich inhaltlich streiten, ohne dass es den Zusammenhalt oder das Projekt gefährdet. Probleme werden ohne Chef gelöst.',
            'Der Flow-Zustand: Die Gruppe leistet messbar mehr als die bloße Summe ihrer Einzelnen (Synergieeffekt). Das ist ein echtes „eingespieltes Team“.',
            'Woran man es erkennt: Das Team trägt sich selbst; neue Herausforderungen werden nicht als Bedrohung, sondern mit Leichtigkeit und Neugier angenommen.',
            'Die Führungskraft im Abseits: Die Leitung merkt, dass sie an vielen operativen Stellen gar nicht mehr gebraucht wird – ein herausragendes Qualitätsmerkmal!'
          ],
          examFavorite: true,
          example: 'Zwei Tage vor Druckabgabe fällt der Bildserver aus: Statt in Panik zu geraten, teilen Entwickler und Grafiker ohne Rücksprache mit dem Chef Workarounds auf und halten den Termin pünktlich ein.',
          merksatz: 'Im Performing leistet die Gruppe mehr als die Summe ihrer Einzelnen – das Team trägt sich selbst!'
        },
        {
          id: 'n-pp-4-2',
          title: 'Die Rückfall-Falle & Führung im Performing',
          coreConcept: 'Performing ist kein statischer Dauerzustand. Veränderungen werfen das Team zurück.',
          bulletPoints: [
            'Typischer Irrtum: Zu glauben, jetzt sei man dauerhaft fertig. Performing ist ein dynamischer, fragiler Zustand.',
            'Die Rückfall-Auslöser: Ein neues Teammitglied, ein Abgang, ein verändertes Projektziel oder eine Umstrukturierung werfen das Team zurück – oft bis ins Storming!',
            'Kein Versagen, sondern Normalität: Wer die Dynamik kennt, erschrickt nicht, sondern versteht, dass sich das Team neu justieren muss.',
            'Führungsaufgabe im Performing: Loslassen, aber nicht verschwinden! (Servant Leadership)',
            'Die beste Führung ist zurückhaltend: Ziele setzen, Hindernisse aus dem Weg räumen, ansprechbar bleiben, aber strikt auf Micromanagement verzichten.',
            'Wertschätzung: Teams im Performing brauchen keine Motivationsreden, aber das ehrliche Gefühl, dass ihre Leistung von der Unternehmensleitung gesehen und gewürdigt wird.'
          ],
          examFavorite: true,
          merksatz: 'Loslassen, aber nicht verschwinden – Hindernisse wegräumen statt mikromanagen!'
        },
        {
          id: 'n-pp-4-3',
          title: 'Phase 5: Adjourning – Wenn das Team auseinandergeht',
          coreConcept: '1977 von Bruce Tuckman & Mary Ann Jensen ergänzt: Das bewusste Ende und die Auflösung des Teams.',
          bulletPoints: [
            'Die 5. Phase (1977): Tuckman und Jensen werteten 22 Folgestudien aus und ergänzten das Modell um Adjourning (Auflösung/Mourning), da jedes Projekt befristet ist.',
            'Wann Adjourning beginnt: Wenn die gemeinsame Aufgabe erledigt ist, das Event vorbei ist oder die Abteilung neu aufgestellt wird.',
            'Gefühlsgemisch: Stolz auf das Erreichte, Wehmut über den Abschied, bei vielen auch Unsicherheit über die Folgeprojekte.',
            'Woran man es erkennt: Die Arbeit läuft aus, Gedanken wandern zum nächsten Projekt; manche ziehen sich zurück, andere hängen sich für einen perfekten Abschluss noch einmal voll rein.',
            'Kardinalfehler: Das Ende einfach passieren lassen! (Letztes Meeting fällt aus, niemand sagt danke, Teammitglieder verstreuen sich wortlos).',
            'Folge eines lieblosen Abschlusses: Erfahrungen gehen verloren und wer einen lieblosen Abschluss erlebt, startet im nächsten Projekt viel vorsichtiger und misstrauischer ins Forming!',
            'Was Führung tun muss: Den Abschluss bewusst gestalten! 1. Retrospektive (Was lief gut, was machen wir anders?), 2. Ehrliche Würdigung jedes Beitrags, 3. Ein gemeinsames Ritual (Foto, Essen, Erinnerungsstück).'
          ],
          examFavorite: true,
          example: 'Nach dem erfolgreichen Messeauftritt führt die Projektleitung ein Debriefing durch, überreicht jedem ein gerahmtes Messeteam-Foto und dokumentiert Lessons Learned für das Folgejahr.',
          merksatz: 'Ein liebloser Abschluss im Adjourning beschädigt das Vertrauen für das nächste Projekt-Forming!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-4-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: 'Welche Kriterien kennzeichnen die Phase 4 (Performing) nach Bruce Tuckman?',
          options: [
            { id: 'a', text: 'Autonome Selbstorganisation, glasklare Rollen, sachliche Streitkultur ohne Beziehungsgefährdung und ein Synergieeffekt („Flow“), bei dem das Team mehr leistet als die Summe seiner Einzelnen', isCorrect: true, explanation: 'Exakte IHK-Definition der Performing-Phase nach Bruce Tuckman.' },
            { id: 'b', text: 'Permanente Kontrolle durch den Abteilungsleiter, strikte Einzelarbeit ohne fachlichen Austausch und Verbot von Teammeetings', isCorrect: false, explanation: 'Performing zeichnet sich durch hohe Kooperation und Autonomie aus, nicht durch Isolation.' },
            { id: 'c', text: 'Vorsichtiges Abtasten, Scheinharmonie aus Angst vor Kritik und ausschließliche Orientierung an formalen Vorgaben', isCorrect: false, explanation: 'Das sind typische Merkmale der Forming-Phase (Orientierung).' },
            { id: 'd', text: 'Persönliche Machtkämpfe, offene Lagerbildung um Reviere und Infragestellung der Projektleitung bei jeder Entscheidung', isCorrect: false, explanation: 'Das sind klassische Merkmale der Storming-Phase (Konfrontation).' }
          ],
          examTip: 'Merke: Performing = Höchstleistung + Synergie + Selbstorganisation + konstruktive Streitkultur!'
        },
        {
          id: 'q-pp-4-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: 'Warum ist die Annahme, ein Team bleibe nach Erreichen der Performing-Phase dauerhaft in dieser Hochleistungsphase, ein gravierender Führungsirrtum?',
          options: [
            { id: 'a', text: 'Weil jede Veränderung der Teamzusammensetzung, neue Aufgaben oder externe Krisen das Team sofort in frühere Phasen (Storming oder Norming) zurückwerfen können', isCorrect: true, explanation: 'Richtig! Teamentwicklung ist dynamisch und kein einmalig abgeschlossener Zustand.' },
            { id: 'b', text: 'Weil die DIN 69901-2 vorschreibt, dass Performing-Teams nach spätestens 14 Tagen gesetzlich verpflichtet sind, wieder in die Forming-Phase zu wechseln', isCorrect: false, explanation: 'DIN-Normen schreiben keine künstlichen Rückschritte in Phasenmodellen vor.' },
            { id: 'c', text: 'Weil Teams im Performing automatisch die Arbeit einstellen, sobald alle Zwischenziele erreicht wurden', isCorrect: false, explanation: 'Im Performing arbeitet das Team hochproduktiv an der Zielerreichung weiter.' },
            { id: 'd', text: 'Weil Bruce Tuckman die Performing-Phase in seiner Revision von 1977 vollständig aus dem Phasenmodell gestrichen hat', isCorrect: false, explanation: 'Tuckman ergänzte 1977 die Phase Adjourning; Performing blieb zentraler Bestandteil.' }
          ],
          examTip: 'Merksatz: Veränderungen werfen das Team zurück – das ist kein Versagen, sondern eine notwendige Neu-Justierung!'
        },
        {
          id: 'q-pp-4-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: 'Wann und warum wurde das ursprüngliche 4-Phasen-Modell von Bruce Tuckman um die fünfte Phase „Adjourning“ erweitert?',
          options: [
            { id: 'a', text: '1977 durch Bruce Tuckman und Mary Ann Jensen, weil temporäre Projekte ein definiertes Ende haben und die Auflösungsphase für Reflexion und emotionalen Abschluss unverzichtbar ist', isCorrect: true, explanation: 'Historisch und methodisch exakte IHK-Antwort!' },
            { id: 'b', text: '1965 direkt im Ursprungswerk, um von Beginn an fünf symmetrische Phasen im wissenschaftlichen Diagramm abbilden zu können', isCorrect: false, explanation: '1965 veröffentlichte Tuckman zunächst nur die vier Phasen Forming bis Performing.' },
            { id: 'c', text: '2009 durch das Deutsche Institut für Normung (DIN), um das Tuckman-Modell mit der DIN 69901-2 harmonisieren zu können', isCorrect: false, explanation: 'Das DIN hat das Tuckman-Modell nicht erweitert; die Erweiterung stammt von Jensen & Tuckman (1977).' },
            { id: 'd', text: '1985 durch europäische Gewerkschaften, um Urlaubsansprüche nach Projektende tarifvertraglich abzusichern', isCorrect: false, explanation: 'Adjourning ist ein sozialpsychologisches Phasenkonzept und keine Tarifregelung.' }
          ],
          examTip: 'IHK-Fakt: Tuckman & Jensen (1977) ergänzten das Modell um die 5. Phase Adjourning (Auflösung)!'
        },
        {
          id: 'q-pp-4-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: 'Welche langfristige Konsequenz droht für künftige Projekte im Betrieb, wenn das Projektende im Adjourning lieblos übergangen wird („einfach auslaufen lassen“)?',
          options: [
            { id: 'a', text: 'Erfahrungen gehen verloren (keine Lessons Learned), Mitarbeiter fühlen sich emotional nicht gewürdigt und starten mit Frustration oder Zynismus in künftige Projekte', isCorrect: true, explanation: 'Exakte IHK-Begründung für die Bedeutung des Adjournings!' },
            { id: 'b', text: 'Die kaufmännische Software blockiert den Rechnungsversand an Kunden, solange das Adjourning nicht im ERP-System quittiert wurde', isCorrect: false, explanation: 'Falsch: Buchhaltungssoftware steuert Faktura unabhängig von internen Teamworkshops.' },
            { id: 'c', text: 'Alle im Projekt erstellten Druckdaten und Programm-Codes werden automatisch nach 30 Tagen gelöscht', isCorrect: false, explanation: 'Daten bleiben erhalten; das Risiko liegt im Wissensverlust und der Teammotivation.' },
            { id: 'd', text: 'Die IHK verweigert dem ausbildenden Betrieb die Berechtigung zur Abnahme von Mediengestalter-Prüfungen', isCorrect: false, explanation: 'Adjourning ist eine methodische Best Practice, kein Prüfungszulassungskriterium.' }
          ],
          examTip: 'Merksatz: Ein liebloser Abschluss im Adjourning beschädigt das nächste Projekt-Forming!'
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-4-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: '[IHK-Praxisfall: Werbeagentur] Ein eingespieltes Digital-Team befindet sich seit zwei Monaten in der Performing-Phase. Wegen eines neuen Großkunden wird ein zusätzlicher Senior-UX-Designer eingestellt. Bereits in der ersten Woche kommt es zu Kompetenzstreitigkeiten mit dem bisherigen Art Director, Deadlines wackeln und der Teamleiter klagt: „Das Team funktioniert plötzlich überhaupt nicht mehr.“ Wie analysierst du die Situation und welche Führungsempfehlung gibst du?',
          scenario: 'Ein Projektleiter interpretiert das Wiederaufflammen von Reibungen nach einem Neuzugang als Totalversagen des Teams.',
          options: [
            { id: 'a', text: 'Durch das neue Teammitglied wurde das soziale Gefüge verändert; das Team fällt automatisch ins Storming zurück. Empfehlung: Keine Vorwürfe machen, sondern Rollen und Zuständigkeiten im Team gemeinsam neu abstimmen', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für personelle Veränderungen in reifen Teams.' },
            { id: 'b', text: 'Den neuen Senior-UX-Designer sofort fristlos kündigen, um die alte Gruppenharmonie der Performing-Phase künstlich wiederherzustellen', isCorrect: false, explanation: 'Unprofessionell: Personelle Wechsel sind normal und erfordern Teamintegration.' },
            { id: 'c', text: 'Den Art Director disziplinarisch abmahnen, weil er sich dem neuen Mitarbeiter bedingungslos unterordnen muss', isCorrect: false, explanation: 'Einseitige Parteinahme verstärkt Konflikte und ignoriert etablierte Kompetenzen.' },
            { id: 'd', text: 'Das Projekt sofort stilllegen, da ein Team nach dem Verlassen der Performing-Phase nie wieder produktiv werden kann', isCorrect: false, explanation: 'Teams durchlaufen Phasen zyklisch und erreichen nach kurzer Klärung erneut das Performing.' }
          ],
          examTip: 'IHK-Prüfungstipp: Personelle Veränderungen = Zwingender Rückfall in frühere Phasen (Neu-Justierung)!'
        },
        {
          id: 'l2-pp-4-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: '[IHK-Führungsverhalten: Servant Leadership] Was bedeutet die Führungsmaxime „Loslassen, aber nicht verschwinden“ für die Projektleitung in der Performing-Phase konkret im Projektalltag?',
          scenario: 'Ein Projektleiter fragt sich, was seine Daseinsberechtigung ist, wenn das Team alle Aufgaben autonom erledigt.',
          options: [
            { id: 'a', text: 'Die Führungskraft nimmt sich aus operativen Einzelfragen heraus (kein Micromanagement), konzentriert sich auf Rahmenbedingungen, räumt bürokratische Hindernisse aus dem Weg, bleibt als Coach ansprechbar und sorgt für sichtbare Wertschätzung der Teamleistung', isCorrect: true, explanation: 'Richtig! Das ist modernes Servant Leadership im Performing.' },
            { id: 'b', text: 'Die Führungskraft zieht sich physisch und kommunikativ vollständig aus dem Unternehmen zurück und reagiert weder auf strategische Anfragen noch auf dringende personelle Engpässe', isCorrect: false, explanation: 'Das ist pflichtvergessenes Laissez-faire und kein verantwortungsvolles Führen.' },
            { id: 'c', text: 'Tägliche mehrstündige Einzelberichte und Kontrolllisten anfordern, um dem reifen Team unmissverständlich zu demonstrieren, wer die eigentliche formale Weisungsbefugnis innehat', isCorrect: false, explanation: 'Micromanagement zerstört Autonomie, Vertrauen und Leistung im Performing.' },
            { id: 'd', text: 'Alle Teammitglieder anweisen, ihre Gehaltseinstufungen, Urlaubsansprüche und disziplinarischen Bewertungen eigenmächtig ohne Einbezug von Führungskräften auszuhandeln', isCorrect: false, explanation: 'Personalrechtliche Aufgaben verbleiben bei der Linienführung und gehören nicht ins Projektteam.' }
          ],
          examTip: 'Prüfer-Merksatz: Führung im Performing = Hindernisse räumen, Rahmen sichern, Wertschätzung geben!'
        },
        {
          id: 'l2-pp-4-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-4',
          question: '[IHK-Transfer: Adjourning & ROI] Die Geschäftsführung einer Agentur argumentiert: „Nach erfolgreichem Projektabschluss bringt ein Adjourning-Meeting kein Geld mehr ein. Wir streichen die Nachbesprechung komplett.“ Mit welchen betriebswirtschaftlichen und methodischen Argumenten widerlegst du diese Ansicht als Projektmanager?',
          scenario: 'Ein Einsparungsvorschlag zielt auf die ersatzlose Streichung aller Abschluss- und Retrospektiven-Meetings ab.',
          options: [
            { id: 'a', text: 'Ein professionelles Adjourning sichert das organisatorische Lernen (Vermeidung wiederkehrender Fehler durch Lessons Learned), würdigt den Mitarbeitereinsatz (Bindung & Motivation) und verhindert, dass enttäuschte Teammitglieder im nächsten Projekt mit Misstrauen und Verunsicherung starten', isCorrect: true, explanation: 'Exakte betriebswirtschaftliche und führungspsychologische IHK-Argumentation!' },
            { id: 'b', text: 'Die Streichung ist betriebswirtschaftlich geboten, weil Lessons Learned nach IHK-Prüfungsstandards und DIN-Vorgaben grundsätzlich nicht in nachfolgende Kundenprojekte übertragen werden dürfen', isCorrect: false, explanation: 'Falsch: Kontinuierlicher Wissenstransfer ist Kernziel moderner Qualitätsstandards.' },
            { id: 'c', text: 'Ein formales Adjourning ist im Projektmanagement ausschließlich dann erforderlich, wenn der Kunde die Schlussrechnung bemängelt oder die Projektabnahme vor Gericht verhandelt werden muss', isCorrect: false, explanation: 'Das kaufmännische Mahnwesen hat nichts mit der Teambezogenen Reflexion im Adjourning zu tun.' },
            { id: 'd', text: 'Im Rahmen des Adjournings müssen primär neue Akquiseverträge unterzeichnet werden, weshalb die Nachbesprechung als reine Vertriebsveranstaltung für den Außendienst zu werten ist', isCorrect: false, explanation: 'Adjourning ist eine interne Teammaßnahme zum Projektabschluss und kein Vertriebsevent.' }
          ],
          examTip: 'IHK-Begründung: Adjourning sichert Wissensmanagement, Mitarbeitermotivation und fehlerfreie Nachfolgeprojekte!'
        }
      ]
    },
    // MODUL 5 (SEITE 5 VON 7)
    {
      id: 'projphase-5',
      chapterId: 'project-phases',
      title: 'Seite 5: Die 5 Projektmanagement-Phasen (DIN 69901-2) & Initialisierung',
      shortDesc: 'Phasenmodell nach DIN 69901-2, PM- vs. Fachphasen & Phase 1: Initialisierung (Projektidee prüfen)',
      estimatedMinutes: 6,
      miniGameType: 'pm_phases_sorter',
      nuggets: [
        {
          id: 'n-pp-5-1',
          title: 'Die 5 Projektmanagementphasen nach DIN 69901-2',
          coreConcept: 'Projekte brauchen Struktur: Von der ersten Idee bis zum Abschluss strukturieren 5 Phasen die Managementaufgaben.',
          bulletPoints: [
            '1. Initialisierung: Die Projektidee klären (Soll überhaupt ein Projekt entstehen?).',
            '2. Definition: Ziele, Lastenheft und offiziellen Projektauftrag präzisieren.',
            '3. Planung: Termine, Meilensteine, Kosten, PSP und Ressourcen festlegen.',
            '4. Steuerung: Fortschritte überwachen, Soll-Ist-Vergleiche durchführen und Abweichungen korrigieren.',
            '5. Abschluss: Projektergebnis übergeben, Retrospektive durchführen und Team entlasten.',
            'Kein starres Dogma: Laut DIN 69901-2 und GPM-Fachbeiträgen müssen die 5 Phasen nicht zwingend strikt sequenziell ablaufen. Überschneidungen, Wiederholungen und Rücksprünge sind oft unvermeidbar und sinnvoll!'
          ],
          examFavorite: true,
          example: 'Bei der Neuentwicklung einer App wird während der Steuerung festgestellt, dass eine Schnittstelle unzureichend spezifiziert war -> Rücksprung in die Planungsphase.',
          merksatz: 'Initialisierung -> Definition -> Planung -> Steuerung -> Abschluss (DIN 69901-2)!'
        },
        {
          id: 'n-pp-5-2',
          title: 'PM-Phasen vs. Fachliche Phasen & Warum Phasen nötig sind',
          coreConcept: 'Managementaufgaben steuern das Projekt – fachliche Phasen erstellen das Produkt.',
          bulletPoints: [
            'Wichtige Unterscheidung: Projektmanagementphasen (DIN 69901-2) organisieren Führung und Kontrolle. Fachliche Phasen (z. B. Konzeption, Screendesign, Druckvorstufe, Druck) erstellen das eigentliche Produktergebnis.',
            'Umgang mit Unsicherheit: Zu Projektbeginn stehen selten alle Informationen fest. Phasen machen sichtbar, welche Fragen zu welchem Zeitpunkt die meiste Aufmerksamkeit erfordern.',
            'Kardinalfehler ohne Phasenstruktur: Die fachliche Arbeit beginnt zu früh! Ein Team entwickelt bereits Gestaltungslösungen, obwohl Ziele und Zuständigkeiten noch ungeklärt sind.',
            'Spätere Probleme vorbeugen: Fehler, die in der Umsetzung eskalieren, haben ihre Ursache fast immer in einer unzureichenden Initialisierung oder Definition.',
            'Kein Bürokratismus: Phasen sind keine bürokratische Last, sondern das Fundament für tragfähige Entscheidungen und einen belastbaren Rahmen.'
          ],
          examFavorite: true,
          example: 'Ein Mediengestalter fängt sofort mit dem Layouten in InDesign an, bevor der Kunde den Freigabeprozess und die Seitenzahl freigegeben hat -> 3 Wochen Arbeit für den Papierkorb.',
          merksatz: 'PM-Phasen steuern das Projekt – Fachphasen erstellen das Produktergebnis!'
        },
        {
          id: 'n-pp-5-3',
          title: 'Phase 1 im Detail: Initialisierung – Die Projektidee klären',
          coreConcept: 'In der Initialisierungsphase steht die grundlegende Entscheidung über das „OB“ im Mittelpunkt.',
          bulletPoints: [
            'Der Anlass: Ein betriebliches Problem soll gelöst, eine Marktchance ergriffen oder eine Veränderung umgesetzt werden.',
            'Die Kernfrage: Soll aus dieser Idee überhaupt ein offizielles Projekt werden?',
            'Hauptaufgaben: Machbarkeitsprüfung, erster grober Nutzen, Skizzierung erster Zielvorstellungen und Klären von Grundsatz-Zuständigkeiten.',
            'Nutzenprüfung: Rechtfertigt der erwartete wirtschaftliche oder strategische Nutzen den geforderten Ressourcenaufwand?',
            'Ergebnis der Phase: Eine fundierte Entscheidung („Go“ oder „No-Go“) der Geschäftsleitung, ob das Vorhaben in die Definitionsphase übergehen darf.'
          ],
          examFavorite: true,
          example: 'Eine Druckerei überlegt, eine gebrauchte Digitaldruckmaschine für Textildruck anzuschaffen: In der Initialisierung wird geprüft, ob ausreichend Kundenbedarf besteht und sich die Investition amortisiert.',
          merksatz: 'Initialisierung entscheidet über das OB – Definition klärt das WAS!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-5-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: 'In welcher logischen Reihenfolge verlaufen die 5 Projektmanagementphasen nach DIN 69901-2?',
          options: [
            {
              id: 'a',
              text: '1. Initialisierung → 2. Definition → 3. Planung → 4. Steuerung → 5. Abschluss',
              isCorrect: true,
              explanation: 'Exakt! Das ist die genormte Fünfteilung der DIN 69901-2: Von der Prüfung der Idee (Initialisierung) über Zielpräzisierung (Definition), Detailplanung, Umsetzungskontrolle (Steuerung) bis zum Abschluss.'
            },
            {
              id: 'b',
              text: '1. Entwurf → 2. Reinzeichnung → 3. Belichtung → 4. Druck → 5. Weiterverarbeitung',
              isCorrect: false,
              explanation: 'Falsch: Das sind fachliche Phasen der Printproduktion, keine Managementphasen nach DIN 69901-2.'
            },
            {
              id: 'c',
              text: '1. Planung → 2. Steuerung → 3. Definition → 4. Abschluss → 5. Initialisierung',
              isCorrect: false,
              explanation: 'Falsch: Ohne Initialisierung und Definition kann nicht sinnvoll geplant werden.'
            },
            {
              id: 'd',
              text: '1. Forming → 2. Storming → 3. Norming → 4. Performing → 5. Adjourning',
              isCorrect: false,
              explanation: 'Falsch: Das ist das gruppendynamische Teamentwicklungsmodell nach Bruce Tuckman, nicht das Prozessmodell nach DIN 69901-2.'
            }
          ],
          examTip: 'IHK-Prüfungsfalle: Verwechsle niemals Tuckmans Teambildungsphasen mit den DIN-Projektmanagementphasen!'
        },
        {
          id: 'q-pp-5-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: 'Wie unterscheiden sich Projektmanagementphasen nach DIN 69901-2 von fachlichen Projektphasen?',
          options: [
            { id: 'a', text: 'Projektmanagementphasen strukturieren Führungs-, Planungs- und Kontrollaufgaben; in den fachlichen Phasen hingegen entsteht das eigentliche inhaltliche Produktergebnis (z. B. Entwurf, Programmierung, Druck)', isCorrect: true, explanation: 'Exakte IHK-Differenzierung nach Christoph Schulze!' },
            { id: 'b', text: 'Projektmanagementphasen gelten ausschließlich für die Bauwirtschaft, während fachliche Phasen nur in Werbeagenturen zur Anwendung kommen', isCorrect: false, explanation: 'Die DIN 69901-2 ist branchenunabhängig für alle Projektarten gültig.' },
            { id: 'c', text: 'Es gibt keinen methodischen Unterschied; beide Begriffe sind rechtlich geschützte Synonyme für denselben Arbeitsablauf', isCorrect: false, explanation: 'Management und Facharbeit sind zwei komplementäre Ebenen jedes Projekts.' },
            { id: 'd', text: 'Fachliche Phasen finden immer vollständig vor Beginn der eigentlichen Projektmanagementphasen statt', isCorrect: false, explanation: 'Fachliche Phasen sind in die steuernden Projektmanagementphasen eingebettet.' }
          ],
          examTip: 'Merke: PM-Phasen managen das Projekt – fachliche Phasen erzeugen das Produkt!'
        },
        {
          id: 'q-pp-5-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: 'Was ist laut Christoph Schulze der typische Hauptfehler, wenn in einem Unternehmen auf eine saubere Phasenstrukturierung verzichtet wird?',
          options: [
            { id: 'a', text: 'Die fachliche Arbeit beginnt viel zu früh: Es werden bereits operative Lösungen entwickelt, obwohl Ziele, Verantwortlichkeiten und der Nutzen noch ungeklärt sind', isCorrect: true, explanation: 'Zentraler Lehrsatz von Christoph Schulze: Erst managen, dann produzieren!' },
            { id: 'b', text: 'Es werden Angebote ohne Prüfung der Machbarkeit und Risikobewertung direkt als verbindlicher Festpreisauftrag übernommen', isCorrect: false, explanation: 'Zwar ein häufiger Vertriebsfehler, aber der didaktische Hauptfehler ist der verfrühte Sprung in die fachliche Produktion.' },
            { id: 'c', text: 'Die Dokumentation wird vernachlässigt, wodurch bei Personalausfällen kein systematischer Wissenstransfer mehr möglich ist', isCorrect: false, explanation: 'Wissensverlust ist ein Abschlussfehler, betrifft aber nicht den Phasenstart.' },
            { id: 'd', text: 'Die Projektleitung verliert automatisch ihre formale Akkreditierung nach ISO 9001 bei der zuständigen Handwerkskammer', isCorrect: false, explanation: 'Normenkonformität im Projekt führt nicht automatisch zum Verlust von Unternehmenszertifikaten.' }
          ],
          examTip: 'IHK-Warnung: Verfrühter Aktionismus in der Facharbeit ohne geklärte Ziele ist der Projektkiller Nr. 1!'
        },
        {
          id: 'q-pp-5-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: 'Welche zentrale Kernfrage und Aufgabenstellung steht in der Phase 1 (Initialisierung) nach DIN 69901-2 im Fokus?',
          options: [
            {
              id: 'a',
              text: 'Die Frage nach dem „OB“: Prüfen der Projektidee, Analyse des grundsätzlichen Nutzens, Machbarkeit und Klären von ersten Zuständigkeiten',
              isCorrect: true,
              explanation: 'Hervorragend! In der Initialisierung wird geklärt, ob aus einer Idee überhaupt ein Projekt werden soll (Machbarkeit & Nutzen), bevor Ressourcen für die Detailplanung gebunden werden.'
            },
            {
              id: 'b',
              text: 'Die detaillierte Tageseinsatzplanung der Maschinen für die nächsten 12 Monate',
              isCorrect: false,
              explanation: 'Falsch: Das gehört in die Phase 3 (Planung) bzw. Liniensteuerung.'
            },
            {
              id: 'c',
              text: 'Das Schreiben des Abschlussberichts und das Entlasten des Projektleiters',
              isCorrect: false,
              explanation: 'Falsch: Das ist Phase 5 (Abschluss).'
            },
            {
              id: 'd',
              text: 'Der Vergleich von Ist-Kosten mit Soll-Kosten während des laufenden Drucks',
              isCorrect: false,
              explanation: 'Falsch: Das ist Phase 4 (Steuerung).'
            }
          ],
          examTip: 'Merke: Initialisierung = Klären des OB (Idee, Nutzen, Machbarkeit)!'
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-5-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: '[IHK-Praxisfall: Werbeagentur] Ein Kunde ruft in der Agentur an und wünscht einen modernen Online-Konfigurator für Drucksachen. Der Junior-Projektleiter weist das Entwicklerteam sofort an, mit der Frontend-Programmierung in React zu beginnen. Nach 4 Wochen stellt sich heraus, dass der Kunde gar kein Backend-Budget hat und die Schnittstellen zur Druckerei völlig ungeklärt sind. Welcher methodische Fehler liegt vor?',
          scenario: 'Ein Projektleiter überspringt Initialisierung und Definition und startet sofort mit fachlicher Facharbeit.',
          options: [
            { id: 'a', text: 'Verfrühter Sprung in die fachliche Umsetzung: Die Phasen Initialisierung (Machbarkeit/Wirtschaftlichkeit) und Definition (Schnittstellen/Lastenheft) wurden sträflich übergangen', isCorrect: true, explanation: 'Klassischer PM-Fehler: Wer vor der Klärung programmiert, zahlt am Ende drauf.' },
            { id: 'b', text: 'Der Fehler lag ausschließlich in der falschen Wahl des Frontend-Frameworks (React statt nativer HTML-Programmierung)', isCorrect: false, explanation: 'Die Technologie ist zweitrangig; der methodische Management-Ablauf war fundamental fehlerhaft.' },
            { id: 'c', text: 'Es liegt kein methodischer Fehler vor, da agiles Projektmanagement grundsätzlich auf jegliche Budget- und Schnittstellenprüfung verzichtet', isCorrect: false, explanation: 'Auch agile Projekte klären vorab Budgetrahmen und grundlegende Machbarkeiten.' },
            { id: 'd', text: 'Der Junior-Projektleiter hätte vorab prüfen müssen, ob die Druckmaschinen des Kunden mit WLAN ausgestattet sind', isCorrect: false, explanation: 'WLAN-Anbindung an Druckmaschinen ist nicht die Ursache fehlender Schnittstellendefinitionen.' }
          ],
          examTip: 'Prüfer-Tipp: Wer Initialisierung und Definition überspringt, erzeugt zwangsläufig Kostenexplosionen!'
        },
        {
          id: 'l2-pp-5-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: '[IHK-Führungsverhalten: DIN 69901-2 vs. Realität] Die DIN 69901-2 listet fünf Phasen auf (Initialisierung bis Abschluss). Ein Projektprüfer behauptet: „Wer diese Phasen nicht streng wie auf einer Einbahnstraße nacheinander abarbeitet, verstößt gegen die Norm.“ Wie begegnest du dieser Aussage fachlich fundiert?',
          scenario: 'In der mündlichen IHK-Prüfung wird über die Starrheit bzw. Flexibilität von Phasenmodellen debattiert.',
          options: [
            { id: 'a', text: 'Die Behauptung ist falsch: Weder die DIN 69901-2 noch die GPM fordern ein starres Schema. Überschneidungen, Rücksprünge (z. B. von Steuerung zu Planung) und iterative Zyklen sind in der Praxis unverzichtbar', isCorrect: true, explanation: 'Richtig! Phasenmodelle bieten Orientierung, sind aber keine bürokratische Zwangsjacke.' },
            { id: 'b', text: 'Die Behauptung ist völlig korrekt: Jeder methodische Rücksprung im Projekt führt zum sofortigen Erlöschen aller Qualitätszertifikate', isCorrect: false, explanation: 'Qualitätsmanagement fordert kontrollierte Anpassungen bei Planabweichungen.' },
            { id: 'c', text: 'Die Behauptung gilt ausschließlich für Printprojekte, während digitale Medienprojekte laut Norm gar keine Phasen kennen', isCorrect: false, explanation: 'Die DIN 69901-2 gilt für Medien-, Software- und Bauprojekte gleichermaßen.' },
            { id: 'd', text: 'Phasenmodelle müssen nach internationalen Bestimmungen grundsätzlich von hinten nach vorne abgearbeitet werden', isCorrect: false, explanation: 'Das Projekt beginnt logisch mit der Initialisierung und endet mit dem Abschluss.' }
          ],
          examTip: 'IHK-Argumentation: Phasen geben Orientierung bei Unsicherheit – sie sind kein bürokratisches Dogma!'
        },
        {
          id: 'l2-pp-5-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-5',
          question: '[IHK-Entscheidungskompetenz] Warum gilt die Entscheidung am Ende der Initialisierungsphase als eine der wirtschaftlich wichtigsten Weichenstellungen im gesamten Projektlebenszyklus?',
          scenario: 'Ein Managementboard muss über die Freigabe einer kostspieligen Marketingkampagne entscheiden.',
          options: [
            { id: 'a', text: 'Weil ein rechtzeitiges „Nein“ in der Initialisierung (Projektidee verwerfen) das Unternehmen vor immensen Fehlinvestitionen schützt, bevor teure Planungs- und Umsetzungskapazitäten gebunden werden', isCorrect: true, explanation: 'Richtig! In der Initialisierung sind die Ausstiegskosten am geringsten.' },
            { id: 'b', text: 'Weil in der Initialisierungsphase bereits 100 % aller Rechnungen der beteiligten Lieferanten beglichen werden müssen', isCorrect: false, explanation: 'Rechnungen werden phasenbezogen nach Leistungserbringung bezahlt.' },
            { id: 'c', text: 'Weil nach Abschluss der Initialisierung laut Arbeitsrecht keine Kündigungen von Projektleitern mehr zulässig sind', isCorrect: false, explanation: 'Arbeitsrechtliche Kündigungsfristen sind völlig unabhängig von Projektphasen.' },
            { id: 'd', text: 'Weil in der Initialisierungsphase bereits die verbindliche Belichtung aller Druckplatten für die Gesamtauflage beauftragt wird', isCorrect: false, explanation: 'Druckplatten werden erst in der Produktionsphase nach Freigabe belichtet.' }
          ],
          examTip: 'Merke: Der Mut zum Projektabbruch in der Initialisierungsphase spart Unternehmen Millionen!'
        }
      ]
    },
    // MODUL 6 (SEITE 6 VON 7)
    {
      id: 'projphase-6',
      chapterId: 'project-phases',
      title: 'Seite 6: Phasen 2–4 (Definition, Planung & Steuerung nach DIN 69901-2)',
      shortDesc: 'Ziele & Nicht-Ziele (Definition), PSP & Pläne (Planung), Soll-Ist-Controlling & Abnahme (Steuerung)',
      estimatedMinutes: 7,
      miniGameType: 'pm_lifecycle_sim',
      nuggets: [
        {
          id: 'n-pp-6-1',
          title: 'Phase 2: Definition – Ziele, Nicht-Ziele & Rahmenbedingungen',
          coreConcept: 'In der Definitionsphase wird das Vorhaben präzisiert: Inhalt und Umfang werden abgegrenzt, Stakeholder und Risiken analysiert sowie das Kernteam aufgestellt. Nicht-Ziele schützen vor Scope Creep.',
          bulletPoints: [
            'Ziele präzisieren: Was soll am Ende konkret vorliegen? Erwartete Wirkungen und den betriebswirtschaftlichen Nutzen messbar beschreiben.',
            'Nicht-Ziele definieren (Schutz vor Scope Creep): Explizit festlegen, was NICHT Bestandteil des Projekts ist (z. B. keine Mehrsprachigkeit, keine Schnittstelle zu Drittsystemen). Ohne diese Grenze ufern Kundenwünsche und Projektbudgets fast zwangsläufig aus.',
            'Stakeholder & Rahmenbedingungen: Welche Personen/Gruppen haben berechtigte Interessen? Welche rechtlichen, technischen oder Corporate-Design-Vorgaben gelten?',
            'Projektorganisation: Kernteam, Rollen und Verantwortlichkeiten (z. B. Projektleiter, technischer Lead, Kunde als Freigabeverantwortlicher) festlegen.'
          ],
          example: 'Bei einem Relaunch der Unternehmens-Website wird ausdrücklich als Nicht-Ziel festgehalten: "Einbindung eines Webshops oder externer Bezahlschnittstellen ist nicht Bestandteil dieses Projekts." Fragt der Kunde später nach einer Shop-Funktion, kann sofort auf ein separates Folgeprojekt verwiesen werden.',
          examFavorite: true,
          merksatz: 'Nicht-Ziele sind der wirksamste Schutzschild gegen das gefürchtete Scope Creep (schleichende Projektüberladung)!'
        },
        {
          id: 'n-pp-6-2',
          title: 'Phase 3: Planung – Den Weg strukturieren (PSP & Pläne)',
          coreConcept: 'Die Planungsphase strukturiert das Vorgehen systematisch. Der Projektstrukturplan (PSP) zerlegt das Vorhaben hierarchisch in planbare Arbeitspakete. Ein Plan ist kein starres Dogma, sondern die Messbasis für Abweichungen.',
          bulletPoints: [
            'Projektstrukturplan (PSP): Das zentrale Ordnungs- und Führungsinstrument im PM. Er zerlegt das Gesamtprojekt stufenweise in Teilaufgaben und konkrete Arbeitspakete (AP).',
            'Spezifische Pläne ableiten: Aus dem PSP werden der Ablauf- und Terminplan (Gantt-Diagramm, Netzplan mit Meilensteinen), der Ressourcen- und Personalplan sowie der Kosten- und Finanzmittelplan erstellt.',
            'Risikomanagement: Identifikation möglicher Störfaktoren (z. B. Lieferverzögerung, Ausfall von Spezialisten) und Definition von Gegenmaßnahmen und Zeitpuffern.',
            'Der Plan als Messbasis: Professionelle Planung ist kein unveränderliches Gesetz, sondern schafft erst die transparente Grundlage, um spätere Abweichungen in der Praxis überhaupt erkennen und begründet entscheiden zu können.'
          ],
          example: 'Für die Erstellung einer 64-seitigen Imagebroschüre wird der PSP in 4 Teilbereiche gegliedert: Konzeption/Text, Fotografie/Bildbearbeitung, Satz/Reinzeichnung und Druck/Veredelung. Jedem Arbeitspaket wird ein Verantwortlicher, ein Stundenbudget und ein fixer Abgabetermin zugewiesen.',
          examFavorite: true,
          merksatz: 'Der Projektstrukturplan (PSP) ist das Fundament der Planung – er zerlegt das Gesamte in beherrschbare Arbeitspakete!'
        },
        {
          id: 'n-pp-6-3',
          title: 'Phase 4: Steuerung – Die Umsetzung begleiten, Controlling & Abnahme',
          coreConcept: 'Die fachliche Umsetzung ist im DIN 69901-2 Prozessmodell KEINE eigenständige PM-Phase! Das Projektmanagement übernimmt währenddessen die kontinuierliche Steuerung (Controlling). Auch die formale Abnahme des Projektergebnisses wird der Steuerung zugeordnet.',
          bulletPoints: [
            'Fachliche Umsetzung vs. PM-Steuerung: Grafiker gestalten, Texter schreiben, Entwickler codieren – das ist operative Facharbeit. Die zugehörige PM-Phase heißt "Steuerung" (Überwachung von Zeit, Kosten, Qualität und Risiken).',
            'Projektcontrolling & Soll-Ist-Vergleich: Fortlaufender Abgleich von Planwerten (Soll) mit den realen Fortschritten und Kosten (Ist). Bei Differenzen greift das Risikomanagement oder ein geordnetes Change-Request-Verfahren.',
            'Wichtige Prüfungsfalle DIN 69901-2: Die formale Abnahme des Projektergebnisses durch den Kunden/Auftraggeber ist prozessual der Phase "Steuerung" zugeordnet (sie schließt die Steuerung der fachlichen Umsetzung ab)!',
            'Vorbereitung des Abschlusses: Erst wenn das Ergebnis abgenommen ist, kann die letzte Phase (Phase 5: Abschluss mit Entlastung und Lessons Learned) beginnen.'
          ],
          example: 'Während die Medienproduktion für eine Plakatkampagne läuft, stellt die Projektleiterin fest, dass der Proof-Freigabeprozess 4 Tage Verzug hat. Durch Soll-Ist-Vergleich zieht sie den zeitlichen Puffer im Expressdruck, sodass der Eröffnungstermin gesichert bleibt. Nach Lieferung erfolgt die formale Abnahme mit dem Kunden.',
          examFavorite: true,
          merksatz: 'In der DIN 69901-2 ist die fachliche Umsetzung keine eigene PM-Phase – das PM steuert; und die formale Abnahme gehört prozessual noch in die Steuerung!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-6-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: 'Welche zentrale Funktion erfüllen ausdrücklich formulierte „Nicht-Ziele“ in der Definitionsphase (Phase 2 nach DIN 69901-2)?',
          options: [
            {
              id: 'a',
              text: 'Sie dienen als vertraglicher und inhaltlicher Schutz vor unkontrolliertem Ausufern des Projektumfangs (Scope Creep)',
              isCorrect: true,
              explanation: 'Richtig! Nicht-Ziele grenzen glasklar ab, was NICHT geliefert wird. Das verhindert spätere endlose Nachforderungen des Kunden ohne Budgetausgleich.'
            },
            {
              id: 'b',
              text: 'Sie listen alle Mitarbeiter auf, die im Projekt keine Überstunden machen dürfen',
              isCorrect: false,
              explanation: 'Falsch: Nicht-Ziele beziehen sich auf den inhaltlichen Projektgegenstand, nicht auf Arbeitszeiten.'
            },
            {
              id: 'c',
              text: 'Sie ersetzen die Notwendigkeit eines Projektstrukturplans (PSP) in der Planungsphase',
              isCorrect: false,
              explanation: 'Falsch: Der PSP ist in Phase 3 unerlässlich.'
            },
            {
              id: 'd',
              text: 'Sie dokumentieren Fehler, die in vergangenen Projekten passiert sind',
              isCorrect: false,
              explanation: 'Falsch: Vergangene Fehler gehören zu den Lessons Learned des Projektabschlusses.'
            }
          ],
          examTip: 'IHK-Merksatz: Wer in der Definition vergisst, Nicht-Ziele festzuhalten, bezahlt das in der Steuerung mit Scope Creep!'
        },
        {
          id: 'q-pp-6-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: 'Welches Instrument bildet in der Planungsphase (Phase 3) das hierarchische Fundament, aus dem Termin-, Ressourcen- und Kostenpläne abgeleitet werden?',
          options: [
            {
              id: 'a',
              text: 'Der Projektstrukturplan (PSP)',
              isCorrect: true,
              explanation: 'Korrekt! Der Projektstrukturplan (PSP) zerlegt das Gesamte stufenweise in Teilaufgaben und konkrete Arbeitspakete (AP).'
            },
            {
              id: 'b',
              text: 'Das Arbeitszeugnis des Projektleiters',
              isCorrect: false,
              explanation: 'Falsch: Völlig unpassend.'
            },
            {
              id: 'c',
              text: 'Die DIN-Farbfächertabelle für Sonderfarben',
              isCorrect: false,
              explanation: 'Falsch: Fachwerkzeug der Druckvorstufe, kein PM-Planungsinstrument.'
            },
            {
              id: 'd',
              text: 'Das Abnahmeprotokoll des Kunden',
              isCorrect: false,
              explanation: 'Falsch: Das Abnahmeprotokoll entsteht erst bei der Abnahme in der Steuerung.'
            }
          ],
          examTip: 'IHK-Klassiker: Der PSP ist das zentrale Strukturierungsinstrument des Projektmanagements.'
        },
        {
          id: 'q-pp-6-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: 'Warum gibt es im Phasenmodell der DIN 69901-2 keine eigenständige Phase namens „Umsetzung“ oder „Produktion“?',
          options: [
            {
              id: 'a',
              text: 'Weil die eigentliche fachliche Produktion operatives Tageshandwerk ist; das Projektmanagement steuert und überwacht diese Tätigkeiten in der Phase „Steuerung“',
              isCorrect: true,
              explanation: 'Sehr gut! DIN 69901-2 ist eine Projektmanagement-Norm. Während Fachkräfte gestalten oder programmieren, besteht die PM-Aufgabe in der Steuerung (Controlling, Soll-Ist-Abgleich, Risikosteuerung).'
            },
            {
              id: 'b',
              text: 'Weil in Projekten nach DIN-Norm grundsätzlich nichts physisch hergestellt werden darf',
              isCorrect: false,
              explanation: 'Falsch: Natürlich entstehen in Projekten Produkte (Print, Web, Software).'
            },
            {
              id: 'c',
              text: 'Weil die Umsetzung bereits vor der Initialisierung komplett abgeschlossen sein muss',
              isCorrect: false,
              explanation: 'Falsch: Vorzeitige Umsetzung vor der Planung ist ein gravierender PM-Fehler.'
            },
            {
              id: 'd',
              text: 'Weil die Norm DIN 69901-2 ausschließlich für Behörden und Ministerien gilt',
              isCorrect: false,
              explanation: 'Falsch: Die DIN 69901-2 ist der Standard für das branchenübergreifende Projektmanagement in der Wirtschaft.'
            }
          ],
          examTip: 'Wichtig für IHK-Klausuren: Die DIN-Phasen beschreiben PM-Aufgaben – Facharbeit wird gesteuert!'
        },
        {
          id: 'q-pp-6-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: 'Achtung Prüfungsfalle: Welcher Phase wird im Prozessmodell der DIN 69901-2 die formale Abnahme des Projektergebnisses zugeordnet?',
          options: [
            {
              id: 'a',
              text: 'Der Phase 4: Steuerung',
              isCorrect: true,
              explanation: 'Exakt! Nach dem Prozessmodell der DIN 69901-2 ist die formale Abnahme des Projektergebnisses noch Bestandteil der Steuerungsphase, da erst mit ihr die fachliche Umsetzung offiziell abgeschlossen wird.'
            },
            {
              id: 'b',
              text: 'Ausschließlich der Phase 5: Abschluss',
              isCorrect: false,
              explanation: 'Prüfungsfalle: Viele vermuten die Abnahme im Abschluss, doch DIN 69901-2 ordnet sie prozessual der Steuerung zu. Der Abschluss befasst sich mit Lessons Learned, Entlastung und Teamauflösung.'
            },
            {
              id: 'c',
              text: 'Der Phase 1: Initialisierung',
              isCorrect: false,
              explanation: 'Falsch: In Phase 1 gibt es noch gar kein Produkt zum Abnehmen.'
            },
            {
              id: 'd',
              text: 'Der Phase 2: Definition',
              isCorrect: false,
              explanation: 'Falsch: In Phase 2 werden Ziele definiert, aber noch nicht abgenommen.'
            }
          ],
          examTip: 'Häufige Prüfungsfalle: Die Abnahme des Ergebnisses gehört zur Steuerung, die administrative Projektauflösung zum Abschluss!'
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-6-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: '[IHK-Praxisfall: Scope Creep & Change Request] Drei Wochen vor Drucklegung eines 200-seitigen Katalogs fordert der Marketingleiter des Kunden plötzlich: „Wir wollen zusätzlich bei 50 Produkten QR-Codes mit personalisierten Landingpages einbinden – das muss im Festpreis drin sein!“ Wie reagiert der Projektleiter fachlich korrekt?',
          scenario: 'Ein Kunde verlangt erhebliche Zusatzleistungen kurz vor Projektabschluss im Rahmen des ursprünglichen Budgets.',
          options: [
            {
              id: 'a',
              text: 'Er verweist auf die im Pflichtenheft (Phase 2: Definition) fixierten Ziele und Nicht-Ziele und eröffnet ein formelles Change-Request-Verfahren mit Ausweisung von Zusatzkosten und Terminverschiebung',
              isCorrect: true,
              explanation: 'Hervorragend! Exakt so wird Scope Creep abgewehrt: Der Projektleiter belegt anhand der Definitionsunterlagen, dass dies ein Neuaufwand ist, und bietet die Umsetzung transparent über ein Änderungsverfahren (Change Request) an.'
            },
            {
              id: 'b',
              text: 'Er gibt sofort nach und lässt die Mediengestalter unbezahlte Nachtschichten einlegen, um den Kunden zufriedenzustellen',
              isCorrect: false,
              explanation: 'Falsch: Unwirtschaftlich und unprofessionell; führt zu Burnout und Qualitätsmängeln.'
            },
            {
              id: 'c',
              text: 'Er kündigt dem Kunden fristlos den Vertrag und schaltet sofort die Schlichtungsstelle der IHK ein',
              isCorrect: false,
              explanation: 'Falsch: Kundenwünsche sind alltäglich; dafür gibt es das geregelte Change-Management.'
            },
            {
              id: 'd',
              text: 'Er druckt heimlich ohne QR-Codes und hofft, dass es dem Marketingleiter bei der Lieferung nicht auffällt',
              isCorrect: false,
              explanation: 'Falsch: Täuschung führt zur Verweigerung der Abnahme und Schadensersatzansprüchen.'
            }
          ],
          examTip: 'IHK-Handlungsempfehlung: Bei Leistungsänderungen immer Change Request mit Budget- und Terminauswirkung vorlegen!'
        },
        {
          id: 'l2-pp-6-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: '[IHK-Transfer: Planungsverständnis nach DIN 69901-2] Ein Kollege behauptet: „Eine detaillierte Planung in Phase 3 ist sinnlos, weil in Medienprojekten durch unvorhergesehene Kundenänderungen sowieso kein Plan bis zum Ende hält.“ Welche fundierte Erwiderung trifft den Kern der Norm?',
          scenario: 'Diskussion im Team über den Sinn und Zweck von Projektplänen bei hoher Dynamik.',
          options: [
            { id: 'a', text: 'Ein Projektplan ist kein starres Gesetz, sondern das unverzichtbare Referenzmodell („Baseline“), an dem Planabweichungen, Budgetrisiken und Terminverzögerungen in Phase 4 überhaupt erst gemessen und gesteuert werden können', isCorrect: true, explanation: 'Exakte IHK-Musterantwort zur Funktion des Projektplans!' },
            { id: 'b', text: 'Der Kollege hat recht: Pläne werden nur aus formalen Gründen gezeichnet, um dem Kunden bei der Abrechnung eine Arbeitsleistung vorzutäuschen', isCorrect: false, explanation: 'Planung dient der internen Steuerung und Ressourcensicherung, nicht der Täuschung.' },
            { id: 'c', text: 'In der DIN 69901-2 ist festgeschrieben, dass Kundenänderungen nach Unterzeichnung des Projektplans gesetzlich verboten sind', isCorrect: false, explanation: 'Änderungen sind normal und werden über strukturiertes Change Management gesteuert.' },
            { id: 'd', text: 'Ein Projektplan verhindert zu 100 %, dass unvorhergesehene Risiken oder personelle Engpässe während der Produktion auftreten können', isCorrect: false, explanation: 'Pläne verhindern Risiken nicht vollständig, ermöglichen aber gezielte Gegenmaßnahmen.' }
          ],
          examTip: 'Prüfungsargument: Planung ist die unersetzliche Messbasis für jedes Projektcontrolling!'
        },
        {
          id: 'l2-pp-6-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-6',
          question: '[IHK-Entscheidungskompetenz: Phasenübergang Steuerung zu Abschluss] Die Digitalagentur hat die neue E-Learning-Plattform termingerecht gelauncht. Der Kunde hat die formale Abnahmeerklärung ohne Mängel unterzeichnet. Welcher Schritt steht nun nach DIN 69901-2 prozessual an?',
          scenario: 'Abschluss der Steuerung und Einleitung der Phase 5 (Abschluss).',
          options: [
            {
              id: 'a',
              text: 'Übergang in Phase 5 (Abschluss): Durchführung der Retrospektive (Lessons Learned), Erstellung des Projektabschlussberichts, formale Entlastung der Projektleitung und Freigabe der Teamressourcen',
              isCorrect: true,
              explanation: 'Perfekt! Da die Abnahme prozessual der Steuerung zugeordnet ist, leitet ihre Unterzeichnung nun die finale Phase 5 (Abschluss) ein. Hier werden die Erfahrungen gesichert, der Abschlussbericht erstellt und das Team geordnet aufgelöst/entlastet.'
            },
            {
              id: 'b',
              text: 'Das Projekt wird sofort stillschweigend beendet; alle Projektdaten auf den Servern werden unverzüglich gelöscht',
              isCorrect: false,
              explanation: 'Falsch: Archivierung und Lessons Learned sind Pflichtbestandteile des Abschlusses.'
            },
            {
              id: 'c',
              text: 'Rückkehr in Phase 2 (Definition), um die gesamte Plattform noch einmal von vorne zu definieren',
              isCorrect: false,
              explanation: 'Falsch: Das Vorhaben ist erfolgreich umgesetzt und abgenommen.'
            },
            {
              id: 'd',
              text: 'Beginn einer neuen Phase 3 (Planung) mit dem gleichen Projektbudget für private Agenturzwecke',
              isCorrect: false,
              explanation: 'Falsch: Veruntreuung von Projektmitteln.'
            }
          ],
          examTip: 'Merke: Mit der Abnahme endet die Steuerung – danach folgt Phase 5 (Abschluss) mit Lessons Learned und Entlastung!'
        }
      ]
    },
    // MODUL 7 (SEITE 7 VON 7 - FINALE)
    {
      id: 'projphase-7',
      chapterId: 'project-phases',
      title: 'Seite 7: Phase 5: Abschluss & der DIN 69901-2 Gesamt-Kreislauf',
      shortDesc: 'Erfahrungen sichern (Lessons Learned), Nachkalkulation, Archivierung & der vollständige DIN-Kreislauf',
      estimatedMinutes: 7,
      miniGameType: 'pm_cycle_final',
      nuggets: [
        {
          id: 'n-pp-7-1',
          title: 'Phase 5: Abschluss – Die 4 Säulen des geordneten Projektendes',
          coreConcept: 'Mit der formalen Abnahme des Projektergebnisses endet die Steuerungsphase. Danach folgt der geordnete Projektabschluss mit vier Kernaufgaben: Projektabschlussbericht, Nachkalkulation, Archivierung und Entlastung der Projektleitung.',
          bulletPoints: [
            '1. Projektabschlussbericht: Schriftliche Gegenüberstellung von ursprünglichen Zielen und erreichten Ergebnissen, Dokumentation von Terminen, Aufwänden und Qualitätskriterien.',
            '2. Nachkalkulation: Ermittlung aller tatsächlichen Personalkosten, Fremdleistungen und Sachausgaben im Vergleich zum veranschlagten Budget (Wirtschaftlichkeitsanalyse und Deckungsbeitrag).',
            '3. Revisionssichere Archivierung: Strukturierte Ablage aller Verträge, Pflichtenhefte, Abnahmeprotokolle und offenen Quelldateien zur Sicherung von Gewährleistungsansprüchen und späteren Nachauflagen.',
            '4. Formale Entlastung & Teamfreigabe: Das Management entlastet die Projektleitung offiziell von ihrer Verantwortung; Teammitglieder und technische Ressourcen werden geordnet für neue Vorhaben freigegeben.'
          ],
          example: 'Nach Auslieferung der Messe-Printmedien vergleicht die Agentur die Soll-Stunden mit den Ist-Stunden in der Zeiterfassung. Dabei stellt sich heraus, dass die Reinzeichnung 15 Stunden mehr als geplant benötigte. Die Nachkalkulation dient als Basis für ein realistischeres Angebot beim nächsten Messeprojekt.',
          examFavorite: true,
          merksatz: 'Ein Projekt ist erst beendet, wenn Bericht, Nachkalkulation, Archivierung und Entlastung vollständig durchgeführt wurden!'
        },
        {
          id: 'n-pp-7-2',
          title: 'Erfahrungssicherung: Lessons Learned nachhaltig nutzbar machen',
          coreConcept: 'Gerade die Erfahrungssicherung verdient besondere Aufmerksamkeit. Nach einem langen Projekt eilt der Blick oft sofort zum nächsten Vorhaben. Wertvolles Wissen geht verloren, wenn Erkenntnisse nur abgeheftet werden, statt auffindbar und nutzbar zu sein.',
          bulletPoints: [
            'Das Phänomen des "sofortigen Blicks nach vorn": Nach Projektabschluss richten Teams ihren Fokus hastig auf das nächste dringende Vorhaben; dadurch geraten Reibungspunkte, Fehlannahmen und funktionierende Vorgehensweisen in Vergessenheit.',
            'Lessons Learned sind kein Datenfriedhof: Erkenntnisse bringen nur dann einen nachhaltigen betriebswirtschaftlichen Nutzen, wenn sie nicht ausschließlich in einem statischen Dokument abgelegt werden.',
            'Auffindbarkeit & Nutzbarkeit: Erfahrungen müssen für zukünftige Projektleiter und Teams schnell auffindbar, strukturiert und direkt in operative Arbeitsmittel (z. B. Standard-Checklisten, Schätzformeln, Briefing-Templates) überführt werden.',
            'Fehlerkultur & Retrospektive: Eine offene Reflexion ohne Schuldzuweisungen analysiert, warum Schätzungen oder Prozesse nicht wie erwartet funktionierten, um Wiederholungsfehler systematisch auszuschließen.'
          ],
          example: 'Im Projekt "Katalog 2026" führte ein ungeklärter Freigabeprozess des Kunden zu 2 Wochen Verzug. Das Team dokumentiert diese Lessons Learned und überführt sie in eine neue Standard-Checkliste für Phase 2 (Definition), in der künftig feste Freigabefristen vertraglich vereinbart werden müssen.',
          examFavorite: true,
          merksatz: 'Lessons Learned haben nur dann Wert, wenn sie auffindbar und in Folgeprojekten tatsächlich nutzbar sind!'
        },
        {
          id: 'n-pp-7-3',
          title: 'Der vollständige Projektmanagement-Kreislauf nach DIN 69901-2',
          coreConcept: 'Projektmanagement nach DIN 69901-2 ist keine Einbahnstraße, sondern ein geschlossener Lernkreislauf. Die Erfahrungen aus dem Abschluss fließen direkt in die Initialisierung zukünftiger Projekte ein.',
          imageUrl: '/assets/aistudio/IMG_3246_0e617e58.jpeg',
          imageCaption: 'Original-Kreislaufmodell aus dem Skript von Christoph Schulze (Seite 7): Initialisierung (Projektidee klären) → Definition (Ziele und Rahmenbedingungen klären) → Planung (Vorgehen strukturieren) → Steuerung (Fortschritt steuern) → Abschluss (Erfahrungen sichern).',
          bulletPoints: [
            '1. Initialisierung: Projektidee und Nutzen klären – Entscheidung über das OB (Go/No-Go).',
            '2. Definition: Ziele, Nicht-Ziele (Scope Creep Schutz), Rahmenbedingungen & Kernteam klären.',
            '3. Planung: Vorgehen strukturieren mit Projektstrukturplan (PSP), Terminen, Ressourcen & Kosten (Plan als Messbasis).',
            '4. Steuerung: Operative Umsetzung begleiten, Soll-Ist-Controlling, Risikomanagement und formale Ergebnisabnahme.',
            '5. Abschluss: Erfahrungen sichern, Nachkalkulation, Archivierung und Transfer in die Organisation.',
            'Der Kreislauf-Effekt: Erkenntnisse aus Phase 5 erhöhen die Reife künftiger Vorhaben bereits ab der ersten Initialisierungsprüfung.'
          ],
          example: 'Dank der Erfahrungssicherung aus einem früheren Web-Projekt weiß die Agentur bei einer neuen Kundenanfrage (Initialisierung) sofort, welche Schnittstellen-Risiken bestehen und wie realistisch die Budgetschätzung sein muss.',
          examFavorite: true,
          merksatz: 'Projektmanagement ist ein geschlossener Kreis: Aus dem Abschluss von heute entstehen die Erfolgsstandards für das Projekt von morgen!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-pp-7-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: 'Welches formale Ereignis beendet im Prozessmodell der DIN 69901-2 die Phase „Steuerung“ und leitet den geordneten Projektabschluss (Phase 5) ein?',
          options: [
            { id: 'a', text: 'Die formale Abnahme des Projektergebnisses durch den Kunden / Auftraggeber', isCorrect: true, explanation: 'Richtig! Ohne Abnahme endet die Steuerungsphase nicht.' },
            { id: 'b', text: 'Der formale Kick-off-Workshop zur Vorstellung des Projektstrukturplans im Team', isCorrect: false, explanation: 'Der Kick-off findet am Anfang in Phase 2 bzw. 3 statt.' },
            { id: 'c', text: 'Das Erstellen des ersten Rohentwurfs in Photoshop oder InDesign', isCorrect: false, explanation: 'Entwürfe entstehen in der fachlichen Umsetzungsphase.' },
            { id: 'd', text: 'Die Genehmigung der Projektidee durch die Geschäftsführung in der Initialisierung', isCorrect: false, explanation: 'Die Genehmigung der Idee steht am Ende von Phase 1.' }
          ],
          examTip: 'IHK-Prüfungsfalle: Die Abnahme des Ergebnisses beendet die Steuerung, erst danach beginnt der Projektabschluss!'
        },
        {
          id: 'q-pp-7-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: 'Welche Bedingung muss laut Christoph Schulze zwingend erfüllt sein, damit „Lessons Learned“ einen nachhaltigen betriebswirtschaftlichen Nutzen entfalten?',
          options: [
            { id: 'a', text: 'Erkenntnisse dürfen nicht ausschließlich dokumentiert werden („Datenfriedhof“), sondern müssen auffindbar und tatsächlich in künftigen Projekten nutzbar sein', isCorrect: true, explanation: 'Exakte IHK-Kernbotschaft aus Christoph Schulzes Skript!' },
            { id: 'b', text: 'Erkenntnisse müssen zwingend von einem externen Wirtschaftsprüfer beglaubigt und öffentlich publiziert werden', isCorrect: false, explanation: 'Lessons Learned sind betriebsinterne Wissensressourcen ohne Notarpflicht.' },
            { id: 'c', text: 'Erkenntnisse müssen belegen, dass der Kunde für alle aufgetretenen Terminverzögerungen die alleinige Schuld trägt', isCorrect: false, explanation: 'Lessons Learned dienen dem konstruktiven Lernen, nicht der Schuldzuweisung.' },
            { id: 'd', text: 'Erkenntnisse dürfen ausschließlich mündlich ohne jegliche schriftliche Fixierung an Auszubildende weitergegeben werden', isCorrect: false, explanation: 'Ohne strukturierte Dokumentation und Bereitstellung verpufft das Wissen.' }
          ],
          examTip: 'Kernbotschaft aus Seite 7: Erfahrungssicherung muss auffindbar und tatsächlich nutzbar sein!'
        },
        {
          id: 'q-pp-7-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: 'Welche vier Kernaufgaben bilden das Pflichtprogramm der Phase 5 (Abschluss) nach DIN 69901-2?',
          options: [
            { id: 'a', text: 'Projektabschlussbericht, Nachkalkulation, Archivierung der Projektdokumentation und Sicherung gewonnener Erfahrungen (Lessons Learned)', isCorrect: true, explanation: 'Exaktes Pflichtprogramm der Phase 5 nach DIN 69901-2 und Christoph Schulze!' },
            { id: 'b', text: 'Grobkonzept, Feinkonzept, Screendesign und Programmierung der Frontend-Komponenten', isCorrect: false, explanation: 'Das sind fachliche Produktionsschritte der Umsetzung.' },
            { id: 'c', text: 'Forming, Storming, Norming und Performing zur Teamentwicklung nach Tuckman', isCorrect: false, explanation: 'Das sind die Phasen der Teamentwicklung, nicht die PM-Abschlussaufgaben.' },
            { id: 'd', text: 'Bedarfsanalyse, Wirtschaftlichkeitsrechnung, Projektantrag und Machbarkeitsprüfung', isCorrect: false, explanation: 'Das sind Kernaufgaben der Phase 1 (Initialisierung).' }
          ],
          examTip: 'Auswendig lernen für die IHK: Abschlussbericht, Nachkalkulation, Archivierung, Erfahrungssicherung!'
        },
        {
          id: 'q-pp-7-4',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: 'Warum stellt das Schaubild der DIN 69901-2 die fünf Phasen als geschlossenen Kreis dar (siehe Original-Schaubild)?',
          asset: {
            type: 'pm_cycle',
            title: 'Projektmanagement-Kreislauf (DIN 69901-2)',
            subtitle: 'Infografik & Original-Diagramm aus dem Lehrskript von Christoph Schulze (Seite 7)',
            description: 'Der geschlossene Kreislauf zeigt die fünf Projektmanagement-Phasen: Initialisierung (Projektidee klären) → Definition (Ziele und Rahmenbedingungen klären) → Planung (Vorgehen strukturieren) → Steuerung (Fortschritt steuern) → Abschluss (Erfahrungen sichern). Im Zentrum steht das Projektmanagement.',
            imageUrl: '/src/assets/images/din69901_pm_cycle_1794249501102.jpg'
          },
          options: [
            { id: 'a', text: 'Weil das Projektmanagement ein lernendes System ist: Die Erfahrungen aus Phase 5 fließen direkt als Qualitätsverbesserung in künftige Initialisierungsphasen ein', isCorrect: true, explanation: 'Richtig! Der geschlossene Kreislauf sichert kontinuierliche Unternehmensverbesserung.' },
            { id: 'b', text: 'Weil Projekte nach Vorgabe der DIN-Norm niemals enden dürfen und nach dem Abschluss sofort von vorn beginnen müssen', isCorrect: false, explanation: 'Jedes Projekt endet mit der Entlastung; der Kreislauf betrifft das organisatorische Lernen.' },
            { id: 'c', text: 'Weil der Kreis optisch an die Farbkreise der Druckvorstufe angelehnt ist und rein dekorativen Zwecken dient', isCorrect: false, explanation: 'Der Kreis symbolisiert den kybernetischen Regelkreis und das Qualitätsmanagement.' },
            { id: 'd', text: 'Weil in jeder Phase exakt dieselben Mitarbeiter ohne Pause in der gleichen Arbeitskonstellation verbleiben müssen', isCorrect: false, explanation: 'Projektteams werden nach Projektende typischerweise neu zusammengesetzt.' }
          ],
          examTip: 'Schaubild-Analyse: Der Kreis belegt den kontinuierlichen Erfahrungs- und Qualitätskreislauf!'
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-pp-7-1',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: '[IHK-Praxisfall: Der verfrühte Sprung ins nächste Vorhaben] Nach erfolgreicher Auslieferung eines komplexen Verpackungssortiments will der Account Manager das Projekt sofort ad acta legen: „Der Kunde hat bezahlt, jetzt müssen wir sofort ohne Pause an die nächste Kampagne ran!“ Warum greift die Geschäftsführung ein und besteht auf Phase 5 (Abschluss)?',
          scenario: 'Druckagentur überspringt aus Zeitmangel die Phase 5 nach erfolgreicher Auslieferung.',
          options: [
            { id: 'a', text: 'Weil ohne Nachkalkulation unklar bleibt, ob das Projekt rentabel war, und ohne Lessons Learned dieselben Fehler beim nächsten Kunden erneut teures Geld kosten', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für die unternehmerische Notwendigkeit der Phase 5!' },
            { id: 'b', text: 'Weil die IHK bei jedem beendeten Druckprojekt eine Vor-Ort-Inspektion des Maschinenparks vorschreibt', isCorrect: false, explanation: 'Die IHK kontrolliert keine betrieblichen Druckmaschinen nach Projektabschluss.' },
            { id: 'c', text: 'Weil die Mediengestalter laut Tarifvertrag nach jedem Projekt Anspruch auf eine dreiwöchige Sonderurlaubsphase haben', isCorrect: false, explanation: 'Tarifverträge koppeln Erholungsurlaub nicht an das Ende einzelner Projekte.' },
            { id: 'd', text: 'Weil das Projekt ohne Abschlussbesprechung handelsrechtlich als unvollendet gilt und der Kunde den Rechnungsbetrag zurückfordern darf', isCorrect: false, explanation: 'Die kaufmännische Fälligkeit hängt an der Abnahme, nicht an internen Abschlussmeetings.' }
          ],
          examTip: 'IHK-Transfer: Phase 5 sichert Rentabilität (Nachkalkulation), Rechtssicherheit (Archiv) und Zukunft (Lessons Learned)!'
        },
        {
          id: 'l2-pp-7-2',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: '[IHK-Transfer: Datenfriedhof vs. gelebte Erfahrungssicherung] Eine Digitalagentur stellt fest, dass in drei aufeinanderfolgenden App-Projekten dieselben Verzögerungen bei der Apple-App-Store-Zulassung auftraten, obwohl jedes Mal ein Abschlussbericht geschrieben wurde. Worin liegt das strukturelle Versäumnis bei der Erfahrungssicherung?',
          scenario: 'Wiederholungsfehler trotz vorhandener Abschlussdokumentation.',
          options: [
            { id: 'a', text: 'Die Lessons Learned wurden lediglich als statisches Dokument archiviert („Datenfriedhof“), anstatt die Erkenntnisse auffindbar und operativ nutzbar in Standard-Checklisten und Zeitpuffern für Phase 2 & 3 zu verankern', isCorrect: true, explanation: 'Exakter Prüfungsfall zur gelebten Erfahrungssicherung nach Christoph Schulze!' },
            { id: 'b', text: 'Die Agentur hätte für das Nachfolgeprojekt einen pauschalen Risikoaufschlag von 100 % auf alle Posten kalkulieren müssen', isCorrect: false, explanation: 'Pauschale Mondpreise lösen organisatorische Prozessmängel nicht.' },
            { id: 'c', text: 'Das Team hätte auf die Programmierung verzichten und dem Kunden stattdessen nur interaktive PDF-Dateien ausliefern sollen', isCorrect: false, explanation: 'PDF-Dateien erfüllen nicht die Anforderungen an eine native mobile Applikation.' },
            { id: 'd', text: 'Man hätte die Apple-Zulassung einfach in Phase 1 (Initialisierung) vor Beginn jeglicher Programmierung verlegen müssen', isCorrect: false, explanation: 'Apple prüft fertige Binary-Builds und keine bloßen Projektideen.' }
          ],
          examTip: 'Prüfungsfalle: Dokumentieren allein reicht nicht – Wissen muss in Arbeitsstandards überführt werden!'
        },
        {
          id: 'l2-pp-7-3',
          chapterId: 'project-phases',
          moduleId: 'projphase-7',
          question: '[IHK-Gesamtsynthese: DIN 69901-2 vs. Tuckman-Modell] In der IHK-Abschlussprüfung wirst du gebeten, die Beziehung zwischen dem prozessualen Phasenmodell nach DIN 69901-2 und dem sozialpsychologischen Phasenmodell nach Bruce Tuckman darzustellen. Welche Synthese ist fachlich makellos?',
          scenario: 'Gegenüberstellung der beiden großen Leitmodelle aus Kapitel 12.',
          options: [
            { id: 'a', text: 'DIN 69901-2 strukturiert die sachlich-organisatorischen Führungs- und Managementprozesse des Projekts (Was/Wie/Controlling), während Tuckman die zwischenmenschliche Dynamik und Reifung des Projektteams beschreibt (Forming, Storming, Norming, Performing, Adjourning). Beide Dimensionen bedingen sich gegenseitig', isCorrect: true, explanation: 'Brillante IHK-Gesamtsynthese der beiden Modelle!' },
            { id: 'b', text: 'DIN 69901-2 regelt ausschließlich die agile Softwareentwicklung (Scrum/Kanban), während Bruce Tuckman das klassische sequentielle Wasserfallmodell für den analogen Printbereich normiert hat', isCorrect: false, explanation: 'Beide Modelle sind branchen- und methodenunabhängig einsetzbar.' },
            { id: 'c', text: 'Das Phasenmodell von Tuckman gilt ausschließlich für Teams in handwerklichen Kleinbetrieben, während die DIN 69901-2 als Norm für IT-Großprojekte in multinationalen Konzernen entwickelt wurde', isCorrect: false, explanation: 'Sozialpsychologie und Projektmanagementnorm gelten für jede Art von Teamarbeit.' },
            { id: 'd', text: 'Zwischen beiden Konzepten besteht kein sachlicher Unterschied; es handelt sich um zwei wörtlich übersetzte Fassungen desselben europäischen Normenabschnitts für das Qualitätsmanagement', isCorrect: false, explanation: 'Es handelt sich um zwei völlig unterschiedliche, sich ergänzende Modelle (Prozess vs. Mensch).' }
          ],
          examTip: 'Meister-Synthese: DIN 69901-2 = Projekt- & Prozessmanagement; Tuckman = Teamdynamik & Führung!'
        }
      ]
    }
  ]
};



