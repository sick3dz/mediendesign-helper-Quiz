import { QuizQuestion } from '../types/quiz';

export const EXAM_QUESTIONS: QuizQuestion[] = [
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
  }
];

export function calculateIhkGrade(percentage: number): { grade: string; text: string; passed: boolean } {
  if (percentage >= 92) return { grade: '1', text: 'Sehr gut', passed: true };
  if (percentage >= 81) return { grade: '2', text: 'Gut', passed: true };
  if (percentage >= 67) return { grade: '3', text: 'Befriedigend', passed: true };
  if (percentage >= 50) return { grade: '4', text: 'Ausreichend', passed: true };
  if (percentage >= 30) return { grade: '5', text: 'Mangelhaft', passed: false };
  return { grade: '6', text: 'Ungenügend', passed: false };
}
