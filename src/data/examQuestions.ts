import { QuizQuestion } from '../types/quiz';
import { IHK_ORIGINAL_CHAPTER } from './ihkOriginalChapterData';

const ihkOriginalExamQuestions: QuizQuestion[] = IHK_ORIGINAL_CHAPTER.modules.flatMap(m => m.quizQuestions);

const BASE_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'exam-1',
    chapterId: 'ixd',
    question: 'Aufgabe 1 (IxD): Was ist die zentrale Aufgabe des Interaktionsdesigns?',
    options: [
      { id: 'a', text: 'Die Programmierung von SQL-Datenbanken und Servern', isCorrect: false, explanation: 'Backend-Entwicklung.' },
      { id: 'b', text: 'Gestaltung der Kommunikation & des Verhaltens zwischen Benutzer und System, damit Aufgaben effizient und verständlich erledigt werden', isCorrect: true, explanation: 'Original-Prüfungsantwort aus dem PDF (Seite 1 & 8)!' },
      { id: 'c', text: 'Ausschließliche Auswahl von Farbpaletten und Vektorlogos', isCorrect: false, explanation: 'Das ist UI- bzw. Grafikdesign.' },
      { id: 'd', text: 'Berechnung von Offset-Druckkosten', isCorrect: false, explanation: 'Druckvorstufe.' }
    ],
    merksatz: 'Interaktionsdesign gestaltet das Verhalten digitaler Produkte, damit Nutzer ihre Ziele effizient, verständlich und angenehm erreichen können.'
  },
  {
    id: 'exam-2',
    chapterId: 'ixd',
    question: 'Aufgabe 2 (IxD): Wie unterscheiden sich UI, IxD und UX in einem Satz?',
    options: [
      { id: 'a', text: 'UI = Oberfläche ("Wie sieht es aus?"), IxD = Verhalten ("Wie funktioniert es?"), UX = Nutzungserlebnis ("Wie fühlt es sich an?")', isCorrect: true, explanation: 'Exakt die IHK-Differenzierungsformel aus dem PDF!' },
      { id: 'b', text: 'UI ist für Mobile, IxD für Desktop und UX für Druckmedien', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Es gibt keinen Unterschied, alle meinen dasselbe', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'UI ist Code, IxD ist Design und UX ist Marketing', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-3',
    chapterId: 'ixd',
    question: 'Aufgabe 3 (IxD): Warum ist sofortiges Feedback bei Benutzeraktionen unverzichtbar?',
    options: [
      { id: 'a', text: 'Der Nutzer erhält Rückmeldung über den Erfolg oder Misserfolg seiner Aktion und bleibt orientiert', isCorrect: true, explanation: 'PDF Seite 9: Verhindert Unsicherheit und Mehrfachklicks.' },
      { id: 'b', text: 'Damit die Website mehr Strom verbraucht', isCorrect: false, explanation: 'Unsinn.' },
      { id: 'c', text: 'Um zwingend ein Popup-Werbebanner zu öffnen', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Weil Browser ohne Feedback abstürzen', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-4',
    chapterId: 'wireframe',
    question: 'Aufgabe 4 (Wireframe): Was ist der Unterschied zwischen Wireframe und Mockup?',
    options: [
      { id: 'a', text: 'Ein Wireframe zeigt Struktur & Funktion (schematisch); ein Mockup ergänzt diese Struktur um visuelle Gestaltung (Farben, Bilder, Typografie)', isCorrect: true, explanation: 'PDF Seite 18, Aufgabe 2!' },
      { id: 'b', text: 'Ein Wireframe ist interaktiv klickbar, ein Mockup ist auf Papier', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Ein Mockup wird vor dem Wireframe gezeichnet', isCorrect: false, explanation: 'Falsch, Wireframe kommt zuerst.' },
      { id: 'd', text: 'Ein Wireframe darf nur in HTML programmiert werden', isCorrect: false, explanation: 'Falsch.' }
    ],
    merksatz: 'Wireframe = Aufbau | Mockup = Aussehen | Prototyp = Bedienung | Entwicklung = funktionierende Umsetzung.'
  },
  {
    id: 'exam-5',
    chapterId: 'wireframe',
    question: 'Aufgabe 5 (Wireframe): Warum werden Wireframes in einer frühen Phase erstellt?',
    options: [
      { id: 'a', text: 'Zur Planung von Seitenstruktur & Nutzerführung, Vermeidung von Missverständnissen und frühzeitigen Kostenreduktion', isCorrect: true, explanation: 'PDF Seite 10 & 18.' },
      { id: 'b', text: 'Um die Druckfarben für CMYK abzustimmen', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Um fertigen Programmcode zu generieren', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Weil Kunden keine bunten Entwürfe mögen', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-6',
    chapterId: 'prototype',
    question: 'Aufgabe 6 (Prototyp): Was zeichnet einen "Klickdummy" aus?',
    options: [
      { id: 'a', text: 'Ein einfacher interaktiver Prototyp mit verlinkten Hotspots/Bereichen, ohne echte Datenverarbeitung', isCorrect: true, explanation: 'PDF Seite 24 & 27: Einfache Navigationstests ohne Backend-Logik.' },
      { id: 'b', text: 'Eine Puppe für Crashtests im Auto', isCorrect: false, explanation: 'Nicht im UX-Kontext.' },
      { id: 'c', text: 'Eine Website mit gefälschten Bot-Klicks', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Ein fertig programmiertes Endprodukt', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-7',
    chapterId: 'prototype',
    question: 'Aufgabe 7 (Prototyp): Was unterscheidet einen horizontalen von einem vertikalen Prototyp?',
    options: [
      { id: 'a', text: 'Horizontal = Querformat, Vertikal = Hochformat', isCorrect: false, explanation: 'Häufige Verwechslung, meint aber funktionale Tiefe!' },
      { id: 'b', text: 'Horizontal = viele Bereiche oberflächlich; Vertikal = wenige Funktionen, dafür bis ins Detail tief ausgearbeitet', isCorrect: true, explanation: 'PDF Seite 22: Horizontal zeigt Breite, Vertikal zeigt Tiefe (z. B. ganzer Checkout).' },
      { id: 'c', text: 'Horizontal ist für Desktop, Vertikal für Smartwatches', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Horizontal benötigt keine Klickbarkeit', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-8',
    chapterId: 'security',
    question: 'Aufgabe 8 (Sicherheit): Was versteht man unter "Phishing"?',
    options: [
      { id: 'a', text: 'Das Durchsuchen von Mülleimern nach Passwörtern', isCorrect: false, explanation: 'Das nennt man Dumpster Diving.' },
      { id: 'b', text: 'Der Versuch, durch gefälschte E-Mails, Nachrichten oder Webseiten an vertrauliche Daten (Passwörter, Bankdaten) zu gelangen', isCorrect: true, explanation: 'PDF Seite 29 & 36!' },
      { id: 'c', text: 'Eine legale Methode zur Kundenbefragung', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Eine Programmiersprache für Netzwerke', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-9',
    chapterId: 'security',
    question: 'Aufgabe 9 (Sicherheit): Woran erkennt man typischerweise einen Fake-Shop?',
    options: [
      { id: 'a', text: 'Schnelle Ladezeiten und HTTPS-Zertifikat', isCorrect: false, explanation: 'Das haben seriöse und gefälschte Seiten.' },
      { id: 'b', text: 'Unrealistisch günstige Preise, fehlendes Impressum, nur Vorkasse/Überweisung, schlechte Bewertungen', isCorrect: true, explanation: 'PDF Seite 31 & 36!' },
      { id: 'c', text: 'Kauf auf Rechnung und 30 Tage Rückgaberecht', isCorrect: false, explanation: 'Das sind kundenfreundliche Merkmale seriöser Händler.' },
      { id: 'd', text: 'Verwendung von Vektorgrafiken', isCorrect: false, explanation: 'Grafikformat hat keine Aussagekraft.' }
    ]
  },
  {
    id: 'exam-10',
    chapterId: 'security',
    question: 'Aufgabe 10 (Sicherheit): Was unterscheidet Datenschutz von Datensicherheit?',
    options: [
      { id: 'a', text: 'Datenschutz schützt personenbezogene Daten/Privatsphäre; Datensicherheit schützt Daten allgemein vor Verlust, Manipulation und unbefugtem Zugriff', isCorrect: true, explanation: 'PDF Seite 35 & 37 (Aufgabe 5)!' },
      { id: 'b', text: 'Datenschutz ist technisch, Datensicherheit ist politisch', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Datensicherheit gilt nur für Smartphones', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Es gibt keinen rechtlichen Unterschied', isCorrect: false, explanation: 'Grundlegender Unterschied im Gesetz.' }
    ]
  },
  {
    id: 'exam-11',
    chapterId: 'a11y',
    question: 'Aufgabe 11 (A11y): Welche vier Prinzipien bilden das Fundament der WCAG (POUR)?',
    options: [
      { id: 'a', text: 'Wahrnehmbarkeit (Perceivable), Bedienbarkeit (Operable), Verständlichkeit (Understandable), Robustheit (Robust)', isCorrect: true, explanation: 'PDF Seite 40 & 47 (Aufgabe 2)!' },
      { id: 'b', text: 'Planung, Organisation, Umsetzung, Review', isCorrect: false, explanation: 'Das sind Projektmanagement-Phasen.' },
      { id: 'c', text: 'Performance, Optik, Usability, Rendering', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Prototyp, Open-Source, Usability, Responsive', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-12',
    chapterId: 'a11y',
    question: 'Aufgabe 12 (A11y): Was ist "semantisches HTML" und warum ist es für Barrierefreiheit essenziell?',
    options: [
      { id: 'a', text: 'Es verwendet Elemente nach ihrer Bedeutung (<header>, <nav>, <main>, <footer>), wodurch Screenreader die Struktur korrekt verstehen', isCorrect: true, explanation: 'PDF Seite 43 & 48 (Aufgabe 4)!' },
      { id: 'b', text: 'Es ersetzt allen Text durch künstliche Intelligenz', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Es besteht ausschließlich aus geschachtelten <div>-Containern', isCorrect: false, explanation: 'Das wäre "Div-Suppe" und anti-semantisch!' },
      { id: 'd', text: 'Es zwingt Webseiten immer in Schwarz-Weiß dargestellt zu werden', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-13',
    chapterId: 'project',
    question: 'Aufgabe 13 (Projekt): Wie unterscheiden sich Lastenheft und Pflichtenheft?',
    options: [
      { id: 'a', text: 'Lastenheft = vom Auftraggeber (WAS soll erreicht werden?); Pflichtenheft = vom Auftragnehmer (WIE wird das Ziel konkret umgesetzt?)', isCorrect: true, explanation: 'PDF Seite 57 & 61 (Aufgabe 4)!' },
      { id: 'b', text: 'Lastenheft ist für Rechnungen, Pflichtenheft für Kündigungen', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Pflichtenheft schreibt der Kunde, Lastenheft die Agentur', isCorrect: false, explanation: 'Genau verkehrt herum!' },
      { id: 'd', text: 'Beide Hefte werden von der IHK verfasst', isCorrect: false, explanation: 'Falsch.' }
    ]
  },
  {
    id: 'exam-14',
    chapterId: 'project',
    question: 'Aufgabe 14 (Projekt): Was ist ein "Meilenstein" im Projektmanagement?',
    options: [
      { id: 'a', text: 'Ein wichtiger Kontrollpunkt innerhalb eines Projekts, an dem der Zwischenfortschritt überprüft wird (z. B. Konzeptfreigabe)', isCorrect: true, explanation: 'PDF Seite 52 & 60 (Aufgabe 3)!' },
      { id: 'b', text: 'Der physische Stein vor dem Firmengebäude', isCorrect: false, explanation: 'Nicht im PM-Sinn.' },
      { id: 'c', text: 'Ein Zeitraum von exakt 365 Tagen', isCorrect: false, explanation: 'Meilensteine haben die Zeitdauer null.' },
      { id: 'd', text: 'Ein Fehler im Programmcode', isCorrect: false, explanation: 'Das wäre ein Bug.' }
    ]
  },
  {
    id: 'exam-15',
    chapterId: 'project',
    question: 'Aufgabe 15 (Scrum): Was versteht man unter einem "Sprint" im Scrum-Modell?',
    options: [
      { id: 'a', text: 'Ein kurzer, festgelegter Arbeitszeitraum (meist 1 bis 4 Wochen), in dem ein bestimmter Teil des Projekts umgesetzt wird', isCorrect: true, explanation: 'PDF Seite 58 & 61 (Aufgabe 5)!' },
      { id: 'b', text: 'Das möglichst schnelle Weglaufen vor dem Kunden', isCorrect: false, explanation: 'Scherzhafte Option.' },
      { id: 'c', text: 'Ein monatliches Meeting ohne Ergebnis', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Eine Phase von mindestens 12 Monaten ohne Zwischenprüfung', isCorrect: false, explanation: 'Das widerspricht der agilen Idee.' }
    ]
  },
  {
    id: 'exam-16',
    chapterId: 'database',
    question: 'Aufgabe 16 (Datenbanken): Welche Aussage zu Primär- und Fremdschlüsseln ist fachlich korrekt?',
    options: [
      { id: 'a', text: 'Der Primärschlüssel identifiziert jeden Datensatz eindeutig; der Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle, um sie zu verbinden', isCorrect: true, explanation: 'Genau so im PDF definiert! Fremdschlüssel stellen Beziehungen her (z. B. Kunden_ID in der Tabelle Projekte).' },
      { id: 'b', text: 'Fremdschlüssel dürfen niemals Zahlen sein', isCorrect: false, explanation: 'Fremdschlüssel sind meist numerische IDs.' },
      { id: 'c', text: 'Ein Primärschlüssel muss in jeder Zeile identisch sein', isCorrect: false, explanation: 'Ein Primärschlüssel muss strikt eindeutig (unique) sein!' },
      { id: 'd', text: 'Beide Schlüssel dienen nur dem CSS-Styling', isCorrect: false, explanation: 'Unsinn.' }
    ],
    merksatz: 'Der Primärschlüssel identifiziert ein Objekt eindeutig; der Fremdschlüssel stellt die relationale Verbindung her.'
  },
  {
    id: 'exam-17',
    chapterId: 'database',
    question: 'Aufgabe 17 (SQL): Warum ist die WHERE-Bedingung bei UPDATE und DELETE lebenswichtig?',
    options: [
      { id: 'a', text: 'Weil ohne WHERE-Bedingung ausnahmslos alle Datensätze der gesamten Tabelle geändert oder gelöscht werden', isCorrect: true, explanation: 'Goldene IHK-Prüfungsregel: UPDATE und DELETE ohne WHERE führen zu partiellem oder vollständigem Datenverlust!' },
      { id: 'b', text: 'Weil der Server sonst automatisch abstürzt', isCorrect: false, explanation: 'Der Server stürzt nicht ab, sondern führt den Befehl für alle Zeilen aus.' },
      { id: 'c', text: 'Weil SQL nur dann bunte Schriftarten anzeigt', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Weil WHERE das Passwort des Benutzers generiert', isCorrect: false, explanation: 'Falsch.' }
    ],
    merksatz: 'Bei UPDATE und DELETE immer peinlich genau prüfen, ob die WHERE-Bedingung stimmt!'
  },
  {
    id: 'exam-18',
    chapterId: 'database',
    question: 'Aufgabe 18 (Datenmodellierung): Wie wird eine n:m-Beziehung (z. B. ein Web-Projekt nutzt mehrere Bilder und ein Bild kommt in mehreren Projekten vor) gelöst?',
    options: [
      { id: 'a', text: 'Über eine Zwischentabelle (Verknüpfungstabelle), die die Fremdschlüssel beider Tabellen speichert', isCorrect: true, explanation: 'Richtig! Z. B. Projekt_Bilder mit Projekt_ID und Bild_ID. So bleibt das System flexibel und normalisiert.' },
      { id: 'b', text: 'Man schreibt alle Bild-Namen kommagetrennt in ein einziges Textfeld', isCorrect: false, explanation: 'Verletzt die 1. Normalform und erschwert Abfragen enorm.' },
      { id: 'c', text: 'Man darf Bilder nicht in Datenbanken speichern', isCorrect: false, explanation: 'Bildpfade und Metadaten werden standardmäßig in Datenbanken verwaltet.' },
      { id: 'd', text: 'n:m-Beziehungen werden in HTML-Kommentaren gepflegt', isCorrect: false, explanation: 'Falsch.' }
    ],
    merksatz: 'n:m benötigt zwingend eine Zwischentabelle mit den beiden Fremdschlüsseln.'
  },
  {
    id: 'exam-19',
    chapterId: 'database',
    question: 'Aufgabe 19 (JSON vs. XML): Aus welchen 4 Gründen hat JSON das XML-Format im Web und bei APIs weitgehend verdrängt?',
    options: [
      { id: 'a', text: 'Kompaktheit (keine End-Tags), schnellere Verarbeitungsgeschwindigkeit (Parsing), native Browser-Integration und leichtere Lesbarkeit', isCorrect: true, explanation: 'Exakt die 4 Kernargumente aus dem IHK-Prüfungs-PDF (Seite 2)!' },
      { id: 'b', text: 'Weil XML keine Sonderzeichen wie Ä, Ö, Ü speichern darf', isCorrect: false, explanation: 'XML unterstützt UTF-8.' },
      { id: 'c', text: 'Weil Google XML auf allen Plattformen gesperrt hat', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Weil JSON nur für Druckmedien optimiert ist', isCorrect: false, explanation: 'JSON ist das Web-Format schlechthin.' }
    ],
    merksatz: 'JSON ist kompakter, schneller geparst, nativ in JavaScript integriert und bietet weniger visuellen Lärm als XML.'
  },
  {
    id: 'exam-20',
    chapterId: 'database',
    question: 'Aufgabe 20 (JSON-Syntax): Welche syntaktische Regel gilt in JSON ausnahmslos für Schlüssel und Datentypen?',
    options: [
      { id: 'a', text: 'Schlüssel und Strings müssen immer in doppelten Anführungszeichen ("...") stehen; Zahlen nutzen den Dezimalpunkt; Funktionen und undefined sind verboten', isCorrect: true, explanation: 'Richtig! Einfache Anführungszeichen (\'...\') oder deutsches Komma in Zahlen sind in JSON strikt unzulässig.' },
      { id: 'b', text: 'Schlüssel dürfen niemals Anführungszeichen haben', isCorrect: false, explanation: 'In JSON müssen Schlüssel immer in doppelten Anführungszeichen stehen.' },
      { id: 'c', text: 'Zahlen müssen immer in spitzen Klammern stehen', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Nach dem letzten Element muss zwingend ein Komma stehen', isCorrect: false, explanation: 'Das Trailing Comma ist in JSON verboten.' }
    ],
    merksatz: 'In JSON: Schlüssel immer "in_doppelten_anfuehrungszeichen", Zahlen mit Punkt (z. B. 19.99), keine Funktionen.'
  },
  {
    id: 'exam-21',
    chapterId: 'database',
    question: 'Aufgabe 21 (JSON & Web-APIs): Wie läuft der Datenaustausch zwischen Server und dem Frontend-Design einer App (z. B. Wetter-App) ab?',
    options: [
      { id: 'a', text: 'Die App fragt den Server an, dieser schickt schlanke JSON-Rohdaten zurück (z. B. {"temp": 22}), und das gestaltete Frontend visualisiert diese Werte im Interface', isCorrect: true, explanation: 'Exakt! Der Server liefert die Daten via JSON-API, der Mediengestalter gestaltet die visuelle Benutzeroberfläche.' },
      { id: 'b', text: 'Der Server druckt die Daten aus und schickt einen Brief an den Client', isCorrect: false, explanation: 'Unsinn.' },
      { id: 'c', text: 'Das Frontend berechnet die Wetterdaten autonom ohne Serverzugriff', isCorrect: false, explanation: 'Wetterdaten stammen von externen Wetterdiensten über APIs.' },
      { id: 'd', text: 'Der Server schickt ausschließlich Pixel-Grafiken statt strukturierter Daten', isCorrect: false, explanation: 'APIs liefern strukturierte Textdaten (JSON), um Bandbreite zu sparen.' }
    ],
    merksatz: 'Server liefert JSON-Rohdaten via API – Frontend-Design setzt sie für den Nutzer visuell ansprechend in Szene.'
  },
  {
    id: 'exam-22',
    chapterId: 'crossmedia',
    question: 'Aufgabe 22 (Medienneutrale Workflows): Was unterscheidet einen layoutbasierten von einem strukturbasierten Workflow?',
    options: [
      { id: 'a', text: 'Im layoutbasierten Workflow wird der Inhalt direkt in die Gestaltung integriert (z. B. InDesign), was bei Medienwechsel Neugestaltung erzwingt; im strukturbasierten Workflow werden Daten zuerst medienneutral erfasst und das Layout erst per Template angewendet', isCorrect: true, explanation: 'Original-Prüfungsantwort aus dem offiziellen IHK-Winter-2026/27-Leitfaden (Frage 2)!' },
      { id: 'b', text: 'Im layoutbasierten Workflow darf nur mit dem Bleistift gezeichnet werden', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Ein strukturbasierter Workflow kann nur Text, aber niemals Bilder verarbeiten', isCorrect: false, explanation: 'Falsch, Bilder werden als Metadaten und Pfade eingebunden.' },
      { id: 'd', text: 'Es gibt in modernen Agenturen keinen Unterschied zwischen beiden Methoden', isCorrect: false, explanation: 'Falsch.' }
    ],
    merksatz: 'Strukturbasiert trennt Inhalt und Layout: Einmal neutral erfassen, Templates formatieren für Print, Web und App.'
  },
  {
    id: 'exam-23',
    chapterId: 'crossmedia',
    question: 'Aufgabe 23 (Semantische Strukturierung): Warum ist eine rein semantische Auszeichnung (z. B. H1 statt „fett und 24pt“) unverzichtbar für medienneutrale Daten?',
    options: [
      { id: 'a', text: 'Weil nur durch die Semantik das Ausgabesystem die inhaltliche Rolle kennt und entscheiden kann, wie das Element im Web (z. B. <h1>), im Druckmagazin (große Headline) oder in der App optimal dargestellt wird', isCorrect: true, explanation: 'Exakt! IHK-Prüfungsfrage 3 aus dem PDF: Ohne Semantik ist es nur beliebiger Text ohne Zuordnung.' },
      { id: 'b', text: 'Weil das W3C Schriftgrößen über 20pt im Internet verboten hat', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Weil Druckmaschinen das Wort „fett“ nicht lesen können', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Weil Semantik die Dateigröße verzehnfacht', isCorrect: false, explanation: 'Semantischer Text ist extrem kompakt.' }
    ],
    merksatz: 'Semantik definiert die logische Bedeutung (H1, Preis), das Template bestimmt das jeweilige Kanallayout.'
  },
  {
    id: 'exam-24',
    chapterId: 'crossmedia',
    question: 'Aufgabe 24 (Single Source & Qualitätskontrolle): Warum ist eine strikte Qualitätsprüfung bei Single Source Publishing (SSP) besonders überlebenswichtig?',
    options: [
      { id: 'a', text: 'Weil falsche Daten, Preisfehler oder fehlende Pflichtfelder im zentralen Datenbestand automatisch und unbemerkt in ALLE Ausgaben (Webshop, Druckkatalog, Newsletter) multipliziert werden', isCorrect: true, explanation: 'Richtig! Frage 10 der IHK-Musterantworten: Fehlerausbreitung in alle Kanäle vermeiden.' },
      { id: 'b', text: 'Weil der Arbeitsspeicher des Computers sonst dauerhaft gelöscht wird', isCorrect: false, explanation: 'Unsinn.' },
      { id: 'c', text: 'Weil Druckereien bei Tippfehlern die Polizei rufen', isCorrect: false, explanation: 'Unsinn.' },
      { id: 'd', text: 'Weil Single Source Publishing nur einmal pro Jahr ausgeführt werden darf', isCorrect: false, explanation: 'Falsch.' }
    ],
  },
  {
    id: 'exam-25',
    chapterId: 'crossmedia',
    question: 'Aufgabe 25 (XML-Wohlgeformtheit): Welche 4 Regeln MUSS ein XML-Dokument zwingend einhalten, um „wohlgeformt“ (well-formed) zu sein?',
    options: [
      { id: 'a', text: '1. Genau ein Root-Element, 2. Alle Tags müssen geschlossen werden, 3. Korrekte Verschachtelung ohne Überkreuzung, 4. Beachtung von Case-Sensitivity (Groß-/Kleinschreibung)', isCorrect: true, explanation: 'Original-Prüfungsregeln aus dem PDF (Seite 1, Abschnitt 2)! Werden sie verletzt, stürzt das lesende Programm ab.' },
      { id: 'b', text: '1. Nur Kleinbuchstaben erlaubt, 2. Keine Zahlen erlaubt, 3. Nur ein Absatz, 4. Keine Attribute', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: '1. Mindestens 3 Root-Elemente nebeneinander, 2. Tags dürfen offen bleiben, 3. Keine Anführungszeichen', isCorrect: false, explanation: 'Völlig falsch, das verletzt alle Wohlgeformtheitsregeln.' },
      { id: 'd', text: '1. Druckfarbraum CMYK, 2. 300 DPI Bildauflösung, 3. Beschnittzugabe 3mm, 4. PDF/X-3 Standard', isCorrect: false, explanation: 'Das sind Print-Produktionsregeln, keine XML-Syntaxregeln.' }
    ],
    merksatz: 'Wohlgeformt: 1 Root-Element, alle Tags schließen, keine überkreuzte Schachtelung, strikte Case-Sensitivity!'
  },
  {
    id: 'exam-26',
    chapterId: 'crossmedia',
    question: 'Aufgabe 26 (XML-Zusatztechnologien & Prüfungskette): Welche 4-Stufen-Kette verbindet strukturierte Rohdaten mit Prüfung, Adressierung und fertigem Ausgabedesign?',
    options: [
      { id: 'a', text: 'XML (speichert Rohdaten) → DTD/XSD (prüft Struktur/Regelwerk) → XPath (sucht & adressiert Daten) → XSLT (transformiert in Design/HTML)', isCorrect: true, explanation: 'Exakt! Das ist die unverzichtbare IHK-Zusammenfassungskette aus dem PDF (Seite 2 & 3).' },
      { id: 'b', text: 'InDesign → PDF-Export → Druckerei → Falzmaschine', isCorrect: false, explanation: 'Das ist ein konventioneller Print-Workflow.' },
      { id: 'c', text: 'Photoshop → JPG → PNG → GIF', isCorrect: false, explanation: 'Das sind Bildformate.' },
      { id: 'd', text: 'SQL → DDL → DML → CRUD', isCorrect: false, explanation: 'Das sind Datenbankbegriffe.' }
    ],
    merksatz: 'XML speichert → DTD/XSD prüft → XPath sucht → XSLT macht Design/HTML.'
  },
  {
    id: 'exam-27',
    chapterId: 'crossmedia',
    question: 'Aufgabe 27 (XML vs. JSON im IHK-Vergleich): Warum hat JSON das XML-Format bei modernen Web-APIs und mobilen Applikationen weitgehend verdrängt?',
    options: [
      { id: 'a', text: 'JSON ist durch den Verzicht auf schließende Tags spürbar kompakter (kleinere Dateigröße), wird extrem schnell nativ in JavaScript im Browser geparst und nutzt direkte Schlüssel-Wert-Paare', isCorrect: true, explanation: 'Richtig! Die 4 Kernargumente aus der Vergleichstabelle des Prüfungs-PDFs (Kompaktheit, Geschwindigkeit, native JS-Integration, Lesbarkeit).' },
      { id: 'b', text: 'Weil XML im Internet seit 2020 gesetzlich verboten ist', isCorrect: false, explanation: 'Falsch.' },
      { id: 'c', text: 'Weil JSON nur maximal 5 Buchstaben lang sein darf', isCorrect: false, explanation: 'Unsinn.' },
      { id: 'd', text: 'Weil XML-Dateien ausschließlich auf Floppy Disks gespeichert werden können', isCorrect: false, explanation: 'Unsinn.' }
    ],
    merksatz: 'JSON ist kompakter als XML, schneller im Parsing und nativ im Webbrowser integriert.'
  },
  {
    id: 'exam-27b',
    chapterId: 'graphics',
    question: 'Aufgabe 27b (Bilddaten & Vektoren): Warum ist das SVG-Format für Icons und Responsive Webdesign dem PNG-Format überlegen?',
    options: [
      { id: 'a', text: 'SVG basiert auf mathematischen XML-Vektoren und lässt sich verlustfrei auf beliebige Display-Auflösungen (auch Retina/HiDPI) ohne Qualitätsverlust und ohne Speicheranstieg skalieren', isCorrect: true, explanation: 'Richtig! SVG ist ein offener Vektor-Standard auf XML-Basis und bleibt bei jeder Bildschirmgröße gestochen scharf.' },
      { id: 'b', text: 'SVG kann nur von Druckmaschinen gelesen werden', isCorrect: false, explanation: 'Falsch: SVG ist der Standard für moderne Webbrowser.' },
      { id: 'c', text: 'SVG verbraucht zehnmal mehr Speicherplatz als PNG', isCorrect: false, explanation: 'Falsch: Für Vektordaten ist SVG deutlich kompakter.' },
      { id: 'd', text: 'SVG unterstützt keine Transparenzen', isCorrect: false, explanation: 'Falsch: SVG unterstützt native Alpha-Transparenzen und CSS-Styling.' }
    ],
    merksatz: 'SVG = XML-Vektoren für verlustfreie Skalierbarkeit im Responsive Webdesign!'
  },
  {
    id: 'exam-27c',
    chapterId: 'graphics',
    question: 'Aufgabe 27c (Farbmanagement): Welches Farbprofil gilt als kleinster gemeinsamer Nenner für medienneutrale Web-Grafiken?',
    options: [
      { id: 'a', text: 'sRGB (Standard-RGB) – da es von nahezu allen Consumer-Displays und Webbrowsern einheitlich interpretiert wird', isCorrect: true, explanation: 'Exakt! sRGB ist der universelle Internet-Standard zur Vermeidung unkontrollierter Farbabweichungen.' },
      { id: 'b', text: 'ISO Coated v2 (Druckfarbraum)', isCorrect: false, explanation: 'Falsch: Das ist ein CMYK-Profil für gestrichenes Papier.' },
      { id: 'c', text: 'ProPhoto RGB', isCorrect: false, explanation: 'Falsch: Viel zu groß für Web, führt auf Standard-Displays zu ausgewaschenen Farben.' },
      { id: 'd', text: 'Graustufen 8-Bit', isCorrect: false, explanation: 'Falsch: Enthält keinerlei Farbinformationen.' }
    ],
    merksatz: 'sRGB ist der verbindliche Standard-Farbraum für das World Wide Web!'
  },
  {
    id: 'exam-28',
    chapterId: 'wiso',
    question: 'Aufgabe 28 (WiSo - BBiG & Kündigungsrecht): Wie ist die Kündbarkeit eines Berufsausbildungsverhältnisses nach Ablauf der Probezeit gesetzlich geregelt?',
    options: [
      { id: 'a', text: 'Der Ausbildungsbetrieb kann nur noch außerordentlich aus wichtigem Grund kündigen; der Azubi kann mit 4 Wochen Frist bei Berufsaufgabe oder Berufswechsel ordentlich kündigen', isCorrect: true, explanation: 'Richtig! Nach § 22 Abs. 2 BBiG ist die ordentliche Kündigung durch den Betrieb nach der Probezeit gesetzlich ausgeschlossen.' },
      { id: 'b', text: 'Beide Seiten können jederzeit mit einer Frist von 4 Wochen ohne Begründung kündigen', isCorrect: false, explanation: 'Falsch: Das BBiG schützt Azubis besonders vor betriebsbedingten Kündigungen.' },
      { id: 'c', text: 'Eine Kündigung ist nach der Probezeit unter keinen Umständen mehr möglich', isCorrect: false, explanation: 'Falsch: Bei schweren Pflichtverletzungen (z. B. Diebstahl) ist eine fristlose Kündigung aus wichtigem Grund möglich.' },
      { id: 'd', text: 'Die IHK entscheidet allein über die Kündigung', isCorrect: false, explanation: 'Falsch.' }
    ],
    merksatz: 'Nach der Probezeit: Betrieb kann nur außerordentlich fristlos kündigen; Azubi mit 4 Wochen Frist bei Berufswechsel!'
  },
  {
    id: 'exam-29',
    chapterId: 'wiso',
    question: 'Aufgabe 29 (WiSo - Sozialversicherung): Welcher Zweig der gesetzlichen Sozialversicherung wird zu 100% allein vom Arbeitgeber finanziert?',
    options: [
      { id: 'a', text: 'Die gesetzliche Unfallversicherung (Berufsgenossenschaft, z. B. BG ETEM)', isCorrect: true, explanation: 'Exakt! Die Unfallversicherung ist eine reine Unternehmerhaftpflicht und wird zu 100% vom Arbeitgeber getragen.' },
      { id: 'b', text: 'Die gesetzliche Krankenversicherung', isCorrect: false, explanation: 'Falsch: Wird paritätisch (ca. 50/50) finanziert.' },
      { id: 'c', text: 'Die gesetzliche Rentenversicherung', isCorrect: false, explanation: 'Falsch: Wird je zur Hälfte von AN und AG getragen.' },
      { id: 'd', text: 'Die Arbeitslosenversicherung', isCorrect: false, explanation: 'Falsch: Wird je zur Hälfte von AN und AG getragen.' }
    ],
    merksatz: 'Die gesetzliche Unfallversicherung (Berufsgenossenschaft) bezahlt der Arbeitgeber zu 100% allein!'
  },
  {
    id: 'exam-30',
    chapterId: 'wiso',
    question: 'Aufgabe 30 (WiSo - Mitbestimmung & Kündigungsschutz): Ein Agenturleiter kündigt einem Mediengestalter, ohne zuvor den bestehenden Betriebsrat anzuhören. Welche rechtliche Konsequenz hat dies?',
    options: [
      { id: 'a', text: 'Die Kündigung ist nach § 102 BetrVG von vornherein unwirksam', isCorrect: true, explanation: 'Richtig! Die zwingende Anhörung des Betriebsrats ist eine Wirksamkeitsvoraussetzung jeder arbeitgeberseitigen Kündigung.' },
      { id: 'b', text: 'Die Kündigung wird nach 2 Monaten automatisch wirksam', isCorrect: false, explanation: 'Falsch: Sie bleibt unwirksam.' },
      { id: 'c', text: 'Der Mitarbeiter erhält lediglich ein Schmerzensgeld von 500 €', isCorrect: false, explanation: 'Falsch.' },
      { id: 'd', text: 'Der Betriebsrat wird wegen Untätigkeit aufgelöst', isCorrect: false, explanation: 'Unsinn.' }
    ],
    merksatz: 'Jede Kündigung ohne vorherige Anhörung des Betriebsrats ist absolut unwirksam (§ 102 BetrVG)!'
  },
  {
    id: 'exam-31',
    chapterId: 'wiso',
    question: 'Aufgabe 31 (WiSo - Unternehmensformen & Haftung): Welche der folgenden Unternehmensformen schützt das Privatvermögen der Gesellschafter vor geschäftlichen Schulden?',
    options: [
      { id: 'a', text: 'GmbH (Gesellschaft mit beschränkter Haftung) – Haftung ist auf das Gesellschaftsvermögen beschränkt', isCorrect: true, explanation: 'Richtig! Als juristische Person haftet die GmbH ausschließlich mit ihrem Stamm- und Gesellschaftsvermögen (mind. 25.000 € Stammkapital).' },
      { id: 'b', text: 'Einzelunternehmen', isCorrect: false, explanation: 'Falsch: Der Einzelunternehmer haftet unbeschränkt persönlich mit seinem gesamten Privatvermögen.' },
      { id: 'c', text: 'OHG (Offene Handelsgesellschaft)', isCorrect: false, explanation: 'Falsch: Alle Gesellschafter haften unbeschränkt, persönlich und solidarisch mit Privatvermögen.' },
      { id: 'd', text: 'Komplementär einer KG', isCorrect: false, explanation: 'Falsch: Der Komplementär haftet als Vollhafter mit Privatvermögen.' }
    ],
    merksatz: 'GmbH = Kapitalgesellschaft mit Haftungsbeschränkung auf das Gesellschaftsvermögen!'
  },
  {
    id: 'exam-32',
    chapterId: 'project-phases',
    question: 'Aufgabe 32 (Projektphasen - DIN 69901): Welche Kombination nennt ausschließlich konstitutive Merkmale eines Projekts?',
    options: [
      { id: 'a', text: 'Zielvorgabe, Neuartigkeit, Einmaligkeit, Komplexität, zeitliche Befristung, begrenzte Ressourcen, Risiko', isCorrect: true, explanation: 'Original aus DIN 69901 und IHK-Lehrplan: Die 7 konstitutiven Merkmale eines Projekts.' },
      { id: 'b', text: 'Dauerhafte Wiederholung, unbegrenztes Budget, risikolose Ausführung, Verzicht auf Planung', isCorrect: false, explanation: 'Falsch: Das widerspricht der Definition eines Projekts.' },
      { id: 'c', text: 'Tägliche Standard-Wartung, keine Zielvereinbarung, unbegrenzte Personalressourcen', isCorrect: false, explanation: 'Falsch: Das ist Linienroutine.' },
      { id: 'd', text: 'Ausschließlich Software-Programmierung ohne Hardware-Bezug', isCorrect: false, explanation: 'Falsch: Projekte existieren in allen Branchen (Print, Bau, Digital).' }
    ],
    merksatz: 'Projekte sind einmalig, neuartig, zielgerichtet, befristet, ressourcenlimitiert und risikobehaftet!'
  },
  {
    id: 'exam-33',
    chapterId: 'project-phases',
    question: 'Aufgabe 33 (Projekt vs. Routine): Welche der folgenden Tätigkeiten ist nach IHK-Standard ein echtes PROJEKT und keine Routineaufgabe?',
    options: [
      { id: 'a', text: 'Die Entwicklung eines Standbogens einer besonderen Falzung für eine neue Flyerserie inklusive Stanzkontur', isCorrect: true, explanation: 'Richtig! Einmalige, neuartige Konstruktion mit Planung und Zielergebnis.' },
      { id: 'b', text: 'Der vierteljährliche Nachdruck weiterer 10.000 Flyer aus der bestehenden Flyerserie', isCorrect: false, explanation: 'Falsch: Periodischer Nachdruck ist eine wiederkehrende Routineaufgabe.' },
      { id: 'c', text: 'Das tägliche Reinigen der Gummitücher der Druckmaschine', isCorrect: false, explanation: 'Falsch: Standard-Wartung ist Routine.' },
      { id: 'd', text: 'Das wöchentliche Bezahlen von Eingangsrechnungen in der Buchhaltung', isCorrect: false, explanation: 'Falsch: Verwaltungstätigkeit des Regelbetriebs.' }
    ],
    merksatz: 'Neuentwicklung von Falzung/Standbogen = Projekt! Wiederholter Nachdruck = Routine!'
  },
  {
    id: 'exam-34',
    chapterId: 'project-phases',
    question: 'Aufgabe 34 (Teamentwicklung nach Tuckman): Welches Verhalten ist in der Forming-Phase (Phase 1) für die Projektleitung am wichtigsten, um das Team vor späteren Fehlentwicklungen zu schützen?',
    options: [
      { id: 'a', text: 'Klare Orientierung geben: Ziele, Erwartungen und Rollen eindeutig klären, statt die oberflächliche Scheinharmonie mit echter Teamreife zu verwechseln', isCorrect: true, explanation: 'Richtig! Aus dem IHK-Leitfaden von Christoph Schulze: Forming braucht Orientierung, klare Rollen und Spielregeln, bevor es im Storming hakt.' },
      { id: 'b', text: 'Sich komplett heraushalten (Laissez-faire), da gute Fachkräfte grundsätzlich keine Führung oder Rollenabsprachen benötigen', isCorrect: false, explanation: 'Falsch: Ein häufiger Irrtum, der im späteren Storming zu schweren Reibungsverlusten führt.' },
      { id: 'c', text: 'Sofort offene Streitgespräche und persönliche Kritik anordnen', isCorrect: false, explanation: 'Falsch: Das zerstört die psychologische Sicherheit in der Kennenlernphase.' },
      { id: 'd', text: 'Das Team nach der ersten Woche aufzulösen, weil noch keine Höchstleistung erbracht wurde', isCorrect: false, explanation: 'Falsch: Jedes Team braucht Zeit, um die Reifegrade zu durchlaufen.' }
    ],
    merksatz: 'Forming verlangt Orientierung und Rollenklarheit – nicht voreiligen Laissez-faire-Stil!'
  },
  {
    id: 'exam-35',
    chapterId: 'project-phases',
    question: 'Aufgabe 35 (Storming - Wenn es zum ersten Mal knirscht): Ein Team streitet über die Aufgabenverteilung; Frust richtet sich gegen „die da oben“. Welche Reaktion der Führungskraft ist nach den Grundsätzen von Christoph Schulze richtig?',
    options: [
      { id: 'a', text: 'Moderieren statt urteilen: Reibungspunkte ansprechbar machen, Rollen/Schnittstellen klären und einen fairen Rahmen schaffen, statt den Konflikt mit Scheinharmonie zuzudecken', isCorrect: true, explanation: 'Richtig! Wer Konflikte zudeckt, presst Spannungen unter die Oberfläche. Führung im Storming moderiert die Streitkultur und klärt Rollen, ohne ein autoritäres Sachurteil zu fällen.' },
      { id: 'b', text: 'Den Streit mit Abmahnungen sofort beenden und befehlen, dass alle ab sofort wieder harmonisch zusammenarbeiten', isCorrect: false, explanation: 'Falsch: Das zwingt das Team in eine Lähmung durch Scheinharmonie.' },
      { id: 'c', text: 'Sich heraushalten und hoffen, dass sich das Problem von alleine legt', isCorrect: false, explanation: 'Falsch: Konflikte im Storming legen sich fast nie von selbst; Fronten verhärten sich.' },
      { id: 'd', text: 'Das Projekt sofort abbrechen und alle Beteiligten auf andere Abteilungen verteilen', isCorrect: false, explanation: 'Falsch: Reibung ist ein normaler und notwendiger Entwicklungsschritt.' }
    ],
    merksatz: 'Führung im Storming: Moderieren statt urteilen – Konflikte konstruktiv austragen lassen!'
  },
  {
    id: 'exam-36',
    chapterId: 'project-phases',
    question: 'Aufgabe 36 (Norming - Die gemeinsamen Regeln entstehen): Was ist der schwerwiegendste Führungsfehler, wenn ein Team die Norming-Phase erreicht und beginnt, eigenverantwortlich Spielregeln zu leben?',
    options: [
      { id: 'a', text: 'Zu viel Kontrolle (Micromanagement): Das Beibehalten des engen Steuerungsmodus, wodurch die aufkeimende Eigenverantwortung und Selbstorganisation erstickt wird', isCorrect: true, explanation: 'Richtig! In der Norming-Phase muss die Führungskraft lernen loszulassen und Verantwortung an das Team abzugeben. Wer weiter alles micromanagt, bremst das Team aus.' },
      { id: 'b', text: 'Dem Team zu viel Vertrauen schenken und operative Entscheidungen ins Team verlagern', isCorrect: false, explanation: 'Falsch: Genau das ist die geforderte Führungsaufgabe im Norming.' },
      { id: 'c', text: 'Entstehende ungeschriebene Regeln sichtbar zu machen und positiv zu bestärken', isCorrect: false, explanation: 'Falsch: Das festigt die Teamkultur.' },
      { id: 'd', text: 'Gemeinsame Erfolge im Team zu feiern', isCorrect: false, explanation: 'Falsch: Das stärkt das Wir-Gefühl.' }
    ],
    merksatz: 'Norming ist die Phase, in der Führung Verantwortung abgeben und vertrauen muss!'
  },
  {
    id: 'exam-37',
    chapterId: 'project-phases',
    question: 'Aufgabe 37 (Performing & Rückfall-Dynamik): Was passiert nach dem Modell von Bruce Tuckman, wenn in ein eingespieltes Hochleistungsteam (Performing) ein neues Mitglied aufgenommen wird oder sich die Projektziele drastisch ändern?',
    options: [
      { id: 'a', text: 'Das Team fällt zur Neu-Justierung in eine frühere Phase zurück (oft bis ins Storming), weil Rollen, Status und Schnittstellen neu ausgehandelt werden müssen', isCorrect: true, explanation: 'Richtig! Performing ist kein unveränderlicher Dauerzustand. Personelle Wechsel erfordern eine Neu-Orientierung und Neu-Justierung des Teams – das ist kein Versagen, sondern ein normaler Reifeprozess.' },
      { id: 'b', text: 'Das Team bleibt dauerhaft im Performing, da Teamentwicklung eine unumkehrbare Einbahnstraße ist', isCorrect: false, explanation: 'Falsch: Teamentwicklung verläuft dynamisch und zyklisch.' },
      { id: 'c', text: 'Das Team muss laut DIN 69901 sofort durch die Personalabteilung aufgelöst werden', isCorrect: false, explanation: 'Falsch: DIN 69901 regelt Projektmerkmale, keine Kündigungen.' },
      { id: 'd', text: 'Der Neuzugang übernimmt automatisch die Projektleitung ohne Einarbeitung', isCorrect: false, explanation: 'Falsch.' }
    ],
    merksatz: 'Veränderungen werfen ein Team zurück – Teamentwicklung ist dynamisch und zyklisch!'
  },
  {
    id: 'exam-38',
    chapterId: 'project-phases',
    question: 'Aufgabe 38 (Adjourning - Die 5. Phase nach Tuckman & Jensen): Warum schadet ein liebloser Projektabschluss („Meeting fällt aus, niemand sagt danke“) nicht nur dem aktuellen Projekt, sondern auch zukünftigen Projekten?',
    options: [
      { id: 'a', text: 'Weil wertvolle Lessons Learned verpuffen und Mitarbeiter, die einen lieblosen Abschluss erleben, im nächsten Projekt deutlich vorsichtiger, reservierter und misstrauischer ins Forming starten', isCorrect: true, explanation: 'Exakt nach Christoph Schulze: Ein fehlender, liebloser Abschluss nimmt die Motivation, verhindert organisatorisches Lernen und erschwert den Vertrauensaufbau im Folgeprojekt.' },
      { id: 'b', text: 'Weil der Kunde das fertige Druckerzeugnis ohne Abschlussmeeting rechtlich nicht bezahlen muss', isCorrect: false, explanation: 'Falsch: Zahlungsverpflichtungen richten sich nach Werkvertrag und BGB, nicht nach internen Team-Meetings.' },
      { id: 'c', text: 'Weil Tuckman 1977 festgelegt hat, dass ohne Abschlussmeeting das Projektbudget verfällt', isCorrect: false, explanation: 'Falsch: Tuckmans Modell ist ein psychologisches Phasenmodell.' },
      { id: 'd', text: 'Weil Mediengestalter ohne Abschlussmeeting ihre IHK-Urkunde abgeben müssen', isCorrect: false, explanation: 'Falsch: Völlig abwegig.' }
    ],
    merksatz: 'Ein liebloser Abschluss im Adjourning beschädigt das nächste Projekt-Forming!'
  },
  {
    id: 'exam-39',
    chapterId: 'project-phases',
    question: 'Aufgabe 39 (DIN 69901-2 - Die 5 Projektmanagementphasen): Welche Reihe nennt die fünf genormten Phasen des Projektmanagements in korrekter Reihenfolge und grenzt sie von fachlichen Phasen ab?',
    options: [
      { id: 'a', text: '1. Initialisierung → 2. Definition → 3. Planung → 4. Steuerung → 5. Abschluss (dienen der Führung/Organisation, während fachliche Phasen wie Satz und Druck das Produkt herstellen)', isCorrect: true, explanation: 'Richtig! Die DIN 69901-2 normiert diese fünf Phasen für das Projektmanagement. Fachliche Schritte erzeugen das Produkt, PM-Phasen steuern das Projekt.' },
      { id: 'b', text: '1. Entwurf → 2. Reinzeichnung → 3. Belichtung → 4. Druck → 5. Weiterverarbeitung', isCorrect: false, explanation: 'Falsch: Das sind fachliche Produktionsphasen der Drucktechnik.' },
      { id: 'c', text: '1. Forming → 2. Storming → 3. Norming → 4. Performing → 5. Adjourning', isCorrect: false, explanation: 'Falsch: Das ist das Phasenmodell der Teamentwicklung nach Tuckman.' },
      { id: 'd', text: '1. Planung → 2. Initialisierung → 3. Steuerung → 4. Definition → 5. Abschluss', isCorrect: false, explanation: 'Falsch: Die Reihenfolge ist unlogisch; Initialisierung und Definition müssen vor der Planung liegen.' }
    ],
    merksatz: 'DIN 69901-2: Initialisierung → Definition → Planung → Steuerung → Abschluss!'
  },
  {
    id: 'exam-40',
    chapterId: 'project-phases',
    question: 'Aufgabe 40 (Initialisierung & Phasenlogik): Was ist der laut Christoph Schulze gravierendste Fehler, wenn Projekte ohne saubere Initialisierung und Phasenstruktur gestartet werden?',
    options: [
      { id: 'a', text: 'Die fachliche Arbeit beginnt zu früh: Das Team entwickelt bereits Gestaltungslösungen oder Code, obwohl Ziele, Nutzen und Verantwortlichkeiten noch ungeklärt sind', isCorrect: true, explanation: 'Volltreffer! Wer die Initialisierung überspringt, erzeugt Fehlentwicklungen, da ungeklärte Rahmenbedingungen später zu massiven Korrekturschleifen und Reibungen führen.' },
      { id: 'b', text: 'Es können keine Pantone-Sonderfarben mehr auf der Druckmaschine gedruckt werden', isCorrect: false, explanation: 'Falsch: Technische Sonderfarben haben nichts mit der Initialisierung zu tun.' },
      { id: 'c', text: 'Der Kunde muss laut BGB automatisch das doppelte Honorar zahlen', isCorrect: false, explanation: 'Falsch: Rechtlich unzutreffend.' },
      { id: 'd', text: 'Das Team überspringt automatisch die Performing-Phase', isCorrect: false, explanation: 'Falsch: Das betrifft Tuckman, nicht den Startfehler der Facharbeit.' }
    ],
    merksatz: 'Initialisierung klärt das OB – wer zu früh mit der Facharbeit beginnt, zahlt später drauf!'
  },
  {
    id: 'exam-41',
    chapterId: 'project-phases',
    question: 'Aufgabe 41 (Phase 2: Definition & Nicht-Ziele): Warum ist die explizite Definition von „Nicht-Zielen“ in der Definitionsphase ein unverzichtbarer Bestandteil professionellen Projektmanagements?',
    options: [
      { id: 'a', text: 'Sie schützt das Projekt vor „Scope Creep“ (schleichender Leistungsausweitung), indem vertraglich und inhaltlich glasklar abgegrenzt wird, welche Leistungen nicht zum vereinbarten Projektumfang gehören', isCorrect: true, explanation: 'Korrekt! Ohne klar definierte Nicht-Ziele ufern Kundenwünsche und Anforderungen während des Projekts fast zwangsläufig aus, was zu Termin- und Budgetkrisen führt.' },
      { id: 'b', text: 'Sie verbietet es den Mediengestaltern, während der Arbeitszeit Pausen einzulegen', isCorrect: false, explanation: 'Falsch: Nicht-Ziele betreffen den Projektumfang, keine arbeitszeitlichen Pausen.' },
      { id: 'c', text: 'Sie ersetzt den Projektstrukturplan (PSP) in der Planungsphase vollständig', isCorrect: false, explanation: 'Falsch: Der PSP ist das zentrale Instrument von Phase 3 (Planung) und kann nicht ersetzt werden.' },
      { id: 'd', text: 'Sie legt fest, welche Projektmitarbeiter im Falle eines Scheiterns fristlos gekündigt werden', isCorrect: false, explanation: 'Falsch: Projektmanagement dient der erfolgreichen Steuerung, nicht arbeitsrechtlichen Sanktionen.' }
    ],
    merksatz: 'Nicht-Ziele in der Definition sind der beste Schutz vor unkontrolliertem Scope Creep!'
  },
  {
    id: 'exam-42',
    chapterId: 'project-phases',
    question: 'Aufgabe 42 (Phase 4: Steuerung nach DIN 69901-2): Welche Aussage zur Phase „Steuerung“ und der formalen Abnahme des Projektergebnisses entspricht der DIN 69901-2?',
    options: [
      { id: 'a', text: 'Die Steuerung begleitet die fachliche Umsetzung durch Soll-Ist-Vergleiche von Terminen und Kosten; die formale Abnahme des Projektergebnisses durch den Auftraggeber wird nach DIN 69901-2 noch der Phase Steuerung zugeordnet', isCorrect: true, explanation: 'Exakt! Die fachliche Umsetzung ist nach DIN 69901-2 keine eigene PM-Phase, sondern wird durch Steuerung geführt. Und die formale Abnahme des Ergebnisses schließt die Steuerung ab, bevor die Phase Abschluss (Lessons Learned, Entlastung) beginnt.' },
      { id: 'b', text: 'Die Abnahme des Projektergebnisses findet ausschließlich in der Initialisierungsphase statt', isCorrect: false, explanation: 'Falsch: In der Initialisierung gibt es noch kein Ergebnis.' },
      { id: 'c', text: 'In der Steuerung darf der Projektplan unter keinen Umständen angepasst werden, selbst wenn unvorhergesehene Risiken eintreten', isCorrect: false, explanation: 'Falsch: Der Plan ist Messbasis; bei Abweichungen wird in der Steuerung aktiv nachgesteuert.' },
      { id: 'd', text: 'Die Steuerung ersetzt die Notwendigkeit von Meilensteinen und Projektcontrolling', isCorrect: false, explanation: 'Falsch: Meilensteine und Controlling sind die Kerninstrumente der Steuerung.' }
    ],
    merksatz: 'DIN 69901-2 Prüfungsfalle: Die formale Ergebnisabnahme gehört zur Phase Steuerung!'
  },
  {
    id: 'exam-43',
    chapterId: 'project-phases',
    question: 'Aufgabe 43 (Phase 5: Abschluss & Lessons Learned): Welche Anforderung muss nach Christoph Schulze erfüllt sein, damit die Erfahrungssicherung („Lessons Learned“) für das Unternehmen einen messbaren Mehrwert stiftet?',
    options: [
      { id: 'a', text: 'Die gewonnenen Erkenntnisse dürfen nicht ausschließlich in einem statischen Bericht dokumentiert werden, sondern müssen für zukünftige Projekte auffindbar und operativ nutzbar sein (z. B. in Checklisten und Schätzstandards)', isCorrect: true, explanation: 'Richtig! Ein Dokumentenfriedhof bringt keinen Nutzen. Nur auffindbare, in künftige Prozesse integrierte Erfahrungen verhindern Wiederholungsfehler.' },
      { id: 'b', text: 'Die Lessons Learned müssen alle negativen Kritikpunkte verheimlichen, um den Kunden nicht zu verunsichern', isCorrect: false, explanation: 'Falsch: Konstruktive und ehrliche Fehleranalyse ist die Kernvoraussetzung für Lernerfolg.' },
      { id: 'c', text: 'Sie müssen vor dem ersten Kick-off-Meeting in der Initialisierung fertiggestellt sein', isCorrect: false, explanation: 'Falsch: Lessons Learned entstehen nach der Abnahme im Projektabschluss.' },
      { id: 'd', text: 'Sie ersetzen die kaufmännische Nachkalkulation vollständig', isCorrect: false, explanation: 'Falsch: Nachkalkulation und Lessons Learned sind beides eigenständige Säulen des Abschlusses.' }
    ],
    merksatz: 'Lessons Learned haben nur Wert, wenn sie für Folgeprojekte auffindbar und nutzbar sind!'
  },
  {
    id: 'exam-44',
    chapterId: 'project-phases',
    question: 'Aufgabe 44 (Der DIN 69901-2 Gesamt-Kreislauf): Warum stellt das Prozessmodell der DIN 69901-2 die fünf Projektphasen als in sich geschlossenen Kreislauf dar?',
    asset: {
      type: 'pm_cycle',
      title: 'DIN 69901-2 Prozesskreislauf',
      subtitle: 'Original-Diagramm aus dem Lehrskript von Christoph Schulze (Seite 7)',
      description: 'Zirkulärer Projektlebenszyklus: 1. Initialisierung → 2. Definition → 3. Planung → 4. Steuerung → 5. Abschluss. Vom Abschluss fließt Erfahrungswissen zurück in die Initialisierung.',
      imageUrl: '/src/assets/images/din69901_pm_cycle_1794249501102.jpg'
    },
    options: [
      { id: 'a', text: 'Weil das Projektmanagement ein lernendes System ist, bei dem die gesicherten Erfahrungen und Nachkalkulationen aus dem Abschluss direkt als Qualitäts- und Schätzstandards in die Initialisierung zukünftiger Projekte zurückfließen', isCorrect: true, explanation: 'Volltreffer! Der Pfeil von Phase 5 (Abschluss) zurück zu Phase 1 (Initialisierung) schließt den Kreis: Kein Projekt steht isoliert im Raum, sondern jede Erfahrung macht das nächste Vorhaben reifer und risikoärmer.' },
      { id: 'b', text: 'Weil Projekte laut DIN-Standard niemals beendet werden dürfen, sondern unbegrenzt weiterlaufen', isCorrect: false, explanation: 'Falsch: Projekte sind per Definition zeitlich befristet.' },
      { id: 'c', text: 'Weil ein Projektleiter in allen fünf Phasen zeitgleich denselben Arbeitsplatz besetzen muss', isCorrect: false, explanation: 'Falsch: Völlig unzutreffend.' },
      { id: 'd', text: 'Weil in der Mitte immer zwingend eine Werbeagentur sitzen muss', isCorrect: false, explanation: 'Falsch: Die DIN 69901-2 ist branchenunabhängig.' }
    ],
    merksatz: 'Der DIN-Kreislauf zeigt: Nach dem Abschluss ist vor der nächsten, reiferen Initialisierung!'
  }
];

export const EXAM_QUESTIONS: QuizQuestion[] = [
  ...BASE_EXAM_QUESTIONS,
  ...ihkOriginalExamQuestions,
];

export function calculateIhkGrade(percentage: number): { grade: string; text: string; passed: boolean } {
  if (percentage >= 92) return { grade: '1', text: 'Sehr gut', passed: true };
  if (percentage >= 81) return { grade: '2', text: 'Gut', passed: true };
  if (percentage >= 67) return { grade: '3', text: 'Befriedigend', passed: true };
  if (percentage >= 50) return { grade: '4', text: 'Ausreichend', passed: true };
  if (percentage >= 30) return { grade: '5', text: 'Mangelhaft', passed: false };
  return { grade: '6', text: 'Ungenügend', passed: false };
}
