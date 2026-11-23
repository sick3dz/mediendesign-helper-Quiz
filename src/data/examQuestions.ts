import { QuizQuestion } from '../types/quiz';
import { IHK_ORIGINAL_CHAPTER } from './ihkOriginalChapterData';

const ihkOriginalExamQuestions: QuizQuestion[] = IHK_ORIGINAL_CHAPTER.modules.flatMap(m => m.quizQuestions);

const BASE_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'exam-1',
    chapterId: 'ixd',
    question: 'Aufgabe 1 (IxD): Was ist die zentrale Aufgabe des Interaktionsdesigns?',
    options: [
      { id: 'a', text: 'Die technische Entwicklung von SQL-Datenbanken, APIs und serverseitiger Geschäftslogik', isCorrect: false, explanation: 'Das gehört zur Backend-Entwicklung, nicht zum Interaktionsdesign.' },
      { id: 'b', text: 'Die Gestaltung des Verhaltens zwischen Nutzer und System für effiziente und verständliche Bedienung', isCorrect: true, explanation: 'Original-Prüfungsantwort: Interaktionsdesign gestaltet Kommunikation und Verhalten zwischen Mensch und System.' },
      { id: 'c', text: 'Die rein visuelle Gestaltung von Farbpaletten, Typografie, Illustrationen und Vektorlogos', isCorrect: false, explanation: 'Das betrifft primär UI-Design und klassisches Grafikdesign.' },
      { id: 'd', text: 'Die Kalkulation von Druckauflagen, Papiersorten und Weiterverarbeitungskosten im Offsetdruck', isCorrect: false, explanation: 'Das sind Aufgaben der Medienproduktion und Druckvorstufe.' }
    ],
    merksatz: 'Interaktionsdesign gestaltet das Verhalten digitaler Produkte, damit Nutzer ihre Ziele effizient, verständlich und angenehm erreichen können.'
  },
  {
    id: 'exam-2',
    chapterId: 'ixd',
    question: 'Aufgabe 2 (IxD): Wie unterscheiden sich UI, IxD und UX in einem Satz?',
    options: [
      { id: 'a', text: 'UI gestaltet die Oberfläche, IxD das Bedienverhalten und UX das gesamte Nutzungserlebnis', isCorrect: true, explanation: 'Exakt die IHK-Differenzierungsformel: UI („Wie sieht es aus?“), IxD („Wie funktioniert es?“), UX („Wie fühlt es sich an?“).' },
      { id: 'b', text: 'UI gilt für mobile Apps, IxD für Desktop-Software und UX für klassische Printmedien', isCorrect: false, explanation: 'Falsch: Alle drei Disziplinen greifen geräteübergreifend im digitalen Produktdesign ineinander.' },
      { id: 'c', text: 'UI übernimmt den Programmcode, IxD die Datenbankstruktur und UX die Vermarktung', isCorrect: false, explanation: 'Falsch: UI, IxD und UX sind Gestaltungs- und Nutzungsdisziplinen, keine Trennung in Code und Marketing.' },
      { id: 'd', text: 'UI bestimmt die Zielgruppe, IxD die Markenfarben und UX die technische Server-Architektur', isCorrect: false, explanation: 'Falsch: Markenfarben gehören zum UI, während UX das Gesamterlebnis der Nutzer beschreibt.' }
    ]
  },
  {
    id: 'exam-3',
    chapterId: 'ixd',
    question: 'Aufgabe 3 (IxD): Warum ist sofortiges Feedback bei Benutzeraktionen unverzichtbar?',
    options: [
      { id: 'a', text: 'Der Nutzer erkennt direkt den Status seiner Aktion und bleibt sicher orientiert', isCorrect: true, explanation: 'Richtig: Sofortiges Feedback meldet Erfolg oder Misserfolg zurück und verhindert Unsicherheit sowie Mehrfachklicks.' },
      { id: 'b', text: 'Das System kann Nutzerklicks erst nach einer bestätigten Rückmeldung in der Datenbank speichern', isCorrect: false, explanation: 'Falsch: Datenbank-Schreibvorgänge funktionieren technisch auch ohne visuelles Feedback.' },
      { id: 'c', text: 'Nur durch Feedback-Dialoge lassen sich verpflichtende Datenschutzhinweise im Browser einblenden', isCorrect: false, explanation: 'Falsch: Datenschutzhinweise sind unabhängig vom Interaktionsfeedback einzelner Bedienelemente.' },
      { id: 'd', text: 'Browser brechen laufende Netzwerkanfragen ab, wenn keine sichtbare Animation ausgelöst wird', isCorrect: false, explanation: 'Falsch: Netzwerkanfragen laufen unabhängig von visuellen Rückmeldungen im Interface.' }
    ]
  },
  {
    id: 'exam-4',
    chapterId: 'wireframe',
    question: 'Aufgabe 4 (Wireframe): Was ist der Unterschied zwischen Wireframe und Mockup?',
    options: [
      { id: 'a', text: 'Ein Wireframe zeigt schematisch Struktur und Funktion; ein Mockup zeigt die visuelle Ausgestaltung', isCorrect: true, explanation: 'Richtig: Das Wireframe klärt Aufbau und Nutzerführung, das Mockup ergänzt Farben, Bilder und Typografie.' },
      { id: 'b', text: 'Ein Wireframe ist ein vollständig klickbarer Prototyp; ein Mockup eine grobe Bleistiftskizze', isCorrect: false, explanation: 'Falsch: Grobe Handskizzen nennt man Scribbles, klickbare Modelle sind Prototypen.' },
      { id: 'c', text: 'Ein Mockup legt zuerst die Informationsarchitektur fest; ein Wireframe definiert danach die Farben', isCorrect: false, explanation: 'Falsch: Die Reihenfolge ist umgekehrt – erst kommt das Wireframe, dann das visuelle Mockup.' },
      { id: 'd', text: 'Ein Wireframe wird ausschließlich in HTML programmiert; ein Mockup entsteht nur für Druckmedien', isCorrect: false, explanation: 'Falsch: Beide werden im digitalen Design meist in Werkzeugen wie Figma oder Adobe XD erstellt.' }
    ],
    merksatz: 'Wireframe = Aufbau | Mockup = Aussehen | Prototyp = Bedienung | Entwicklung = funktionierende Umsetzung.'
  },
  {
    id: 'exam-5',
    chapterId: 'wireframe',
    question: 'Aufgabe 5 (Wireframe): Warum werden Wireframes in einer frühen Phase erstellt?',
    options: [
      { id: 'a', text: 'Um Seitenstruktur und Nutzerführung früh abzustimmen und spätere Änderungskosten zu senken', isCorrect: true, explanation: 'Richtig: Frühe Wireframes decken Missverständnisse auf, bevor teure Design- oder Entwicklungsarbeit beginnt.' },
      { id: 'b', text: 'Um die finalen Druckfarben im CMYK-Farbraum verbindlich mit dem Kunden freizugeben', isCorrect: false, explanation: 'Falsch: Wireframes sind bewusst farblos/schematisch und dienen der Strukturplanung im Digitalbereich.' },
      { id: 'c', text: 'Um aus der Skizze automatisch produktionsreifen Frontend- und Backend-Quellcode zu erzeugen', isCorrect: false, explanation: 'Falsch: Wireframes dienen der Konzeption und erzeugen keinen produktionsreifen Anwendungscode.' },
      { id: 'd', text: 'Um die Ladegeschwindigkeit hochauflösender Produktfotos bereits vor dem Fotoshooting zu messen', isCorrect: false, explanation: 'Falsch: Wireframes verwenden lediglich Platzhalter und prüfen keine realen Dateigrößen.' }
    ]
  },
  {
    id: 'exam-6',
    chapterId: 'prototype',
    question: 'Aufgabe 6 (Prototyp): Was zeichnet einen "Klickdummy" aus?',
    options: [
      { id: 'a', text: 'Ein interaktiver Prototyp mit verlinkten Bereichen, aber ohne echte Datenverarbeitung', isCorrect: true, explanation: 'Richtig: Ein Klickdummy simuliert Navigation und Abläufe über Hotspots ohne Backend-Logik.' },
      { id: 'b', text: 'Ein automatisiertes Testskript, das Nutzerklicks zur Lastprüfung auf einem Webserver simuliert', isCorrect: false, explanation: 'Falsch: Das wäre ein automatisierter Last- oder UI-Test, kein Klickdummy.' },
      { id: 'c', text: 'Eine statische Seitenansicht ohne Verlinkungen, die ausschließlich der Farbabstimmung dient', isCorrect: false, explanation: 'Falsch: Das beschreibt ein Mockup; ein Klickdummy ist gerade durch verlinkte Klickpfade definiert.' },
      { id: 'd', text: 'Eine vollständig programmierte Beta-Version mit aktiver Datenbank und Live-Zahlungsabwicklung', isCorrect: false, explanation: 'Falsch: Ein Klickdummy besitzt noch keine echte Backend-Programmierung oder Datenbankanbindung.' }
    ]
  },
  {
    id: 'exam-7',
    chapterId: 'prototype',
    question: 'Aufgabe 7 (Prototyp): Was unterscheidet einen horizontalen von einem vertikalen Prototyp?',
    options: [
      { id: 'a', text: 'Horizontal bedeutet Darstellung im Querformat; vertikal bedeutet Darstellung im Hochformat', isCorrect: false, explanation: 'Häufige Verwechslung: Die Begriffe beziehen sich auf Funktionsbreite und -tiefe, nicht auf das Displayformat.' },
      { id: 'b', text: 'Horizontal zeigt viele Bereiche oberflächlich; vertikal arbeitet wenige Funktionen tief aus', isCorrect: true, explanation: 'Richtig: Horizontal bildet die Breite der Anwendung ab, vertikal geht bei einzelnen Abläufen (z. B. Checkout) ins Detail.' },
      { id: 'c', text: 'Horizontal richtet sich an Desktop-Browser; vertikal richtet sich ausschließlich an Mobilgeräte', isCorrect: false, explanation: 'Falsch: Beide Prototyp-Arten sind für jede Plattform einsetzbar.' },
      { id: 'd', text: 'Horizontal beschreibt statische Wireframes; vertikal beschreibt bereits programmierte Apps', isCorrect: false, explanation: 'Falsch: Beide Begriffe bezeichnen den Abdeckungsgrad interaktiver Prototypen.' }
    ]
  },
  {
    id: 'exam-8',
    chapterId: 'security',
    question: 'Aufgabe 8 (Sicherheit): Was versteht man unter "Phishing"?',
    options: [
      { id: 'a', text: 'Das Durchsuchen von Papiermüll und Datenträgern nach notierten Zugangsdaten', isCorrect: false, explanation: 'Falsch: Das nennt man Dumpster Diving, nicht Phishing.' },
      { id: 'b', text: 'Das Erschleichen vertraulicher Daten über gefälschte E-Mails, Nachrichten oder Webseiten', isCorrect: true, explanation: 'Richtig: Beim Phishing täuschen Angreifer vertrauenswürdige Absender vor, um Passwörter oder Bankdaten abzugreifen.' },
      { id: 'c', text: 'Das automatische Überlasten eines Webservers durch Millionen gleichzeitiger Anfragen', isCorrect: false, explanation: 'Falsch: Das beschreibt einen DDoS-Angriff.' },
      { id: 'd', text: 'Das unbemerkte Mitlesen unverschlüsselter Datenpakete in öffentlichen WLAN-Netzwerken', isCorrect: false, explanation: 'Falsch: Das bezeichnet man als Sniffing bzw. Man-in-the-Middle-Angriff.' }
    ]
  },
  {
    id: 'exam-9',
    chapterId: 'security',
    question: 'Aufgabe 9 (Sicherheit): Woran erkennt man typischerweise einen Fake-Shop?',
    options: [
      { id: 'a', text: 'Schnelle Ladezeiten, gültiges HTTPS-Zertifikat und eine mobiloptimierte Produktansicht', isCorrect: false, explanation: 'Falsch: Auch Fake-Shops nutzen heute kostenlose HTTPS-Zertifikate und moderne Templates.' },
      { id: 'b', text: 'Unrealistisch niedrige Preise, fehlendes Impressum, reine Vorkasse und negative Bewertungen', isCorrect: true, explanation: 'Richtig: Extreme Rabatte, lückenhaftes Impressum und eingeschränkte Zahlungsarten (nur Vorkasse) sind klare Warnsignale.' },
      { id: 'c', text: 'Angebot von Kauf auf Rechnung, Käuferschutz-Zahlungsarten und 30 Tagen Rückgaberecht', isCorrect: false, explanation: 'Falsch: Das sind typische Vertrauensmerkmale seriöser Online-Händler.' },
      { id: 'd', text: 'Einsatz von SVG-Vektorgrafiken, Cookie-Bannern und einer Produktsuche mit Filterfunktion', isCorrect: false, explanation: 'Falsch: Technische Standardfunktionen einer Website sagen nichts über die Seriosität aus.' }
    ]
  },
  {
    id: 'exam-10',
    chapterId: 'security',
    question: 'Aufgabe 10 (Sicherheit): Was unterscheidet Datenschutz von Datensicherheit?',
    options: [
      { id: 'a', text: 'Datenschutz schützt personenbezogene Daten; Datensicherheit schützt alle Daten vor Verlust und Zugriff', isCorrect: true, explanation: 'Richtig: Datenschutz wahrt das Persönlichkeitsrecht (DSGVO), Datensicherheit schützt sämtliche Daten technisch und organisatorisch.' },
      { id: 'b', text: 'Datenschutz umfasst technische Firewalls und Backups; Datensicherheit regelt nur Verträge', isCorrect: false, explanation: 'Falsch: Genau umgekehrt – Firewalls und Backups sind Maßnahmen der Datensicherheit.' },
      { id: 'c', text: 'Datenschutz gilt nur für Behörden und Banken; Datensicherheit gilt ausschließlich für Privatpersonen', isCorrect: false, explanation: 'Falsch: Beide Bereiche gelten für Unternehmen, Behörden und Organisationen jeder Größe.' },
      { id: 'd', text: 'Datenschutz betrifft digitale Cloud-Dienste; Datensicherheit betrifft ausschließlich Papierakten', isCorrect: false, explanation: 'Falsch: Sowohl Datenschutz als auch Datensicherheit gelten für digitale und analoge Daten gleichermaßen.' }
    ]
  },
  {
    id: 'exam-11',
    chapterId: 'a11y',
    question: 'Aufgabe 11 (A11y): Welche vier Prinzipien bilden das Fundament der WCAG (POUR)?',
    options: [
      { id: 'a', text: 'Wahrnehmbarkeit, Bedienbarkeit, Verständlichkeit, Robustheit', isCorrect: true, explanation: 'Richtig! POUR steht für Perceivable (Wahrnehmbar), Operable (Bedienbar), Understandable (Verständlich) und Robust (Robust).' },
      { id: 'b', text: 'Planung, Organisation, Umsetzung, Review', isCorrect: false, explanation: 'Falsch: Das sind Begriffe aus dem Projektmanagement, nicht aus den WCAG-Richtlinien.' },
      { id: 'c', text: 'Performance, Optik, Usability, Rendering', isCorrect: false, explanation: 'Falsch: Diese Begriffe gehören zur Web-Performance und Gestaltung, bilden aber nicht POUR.' },
      { id: 'd', text: 'Prototyping, Orientierung, Übersichtlichkeit, Responsivität', isCorrect: false, explanation: 'Falsch: Wichtige UX-Aspekte, aber nicht die vier offiziellen WCAG-Grundprinzipien.' }
    ]
  },
  {
    id: 'exam-12',
    chapterId: 'a11y',
    question: 'Aufgabe 12 (A11y): Was ist "semantisches HTML" und warum ist es für Barrierefreiheit essenziell?',
    options: [
      { id: 'a', text: 'Elemente werden nach ihrer inhaltlichen Bedeutung eingesetzt, damit Screenreader die Struktur erfassen', isCorrect: true, explanation: 'Richtig: Semantische Tags wie <header>, <nav>, <main> und <footer> machen die Seitenstruktur für Hilfstechnologien navigierbar.' },
      { id: 'b', text: 'Texte werden automatisch per KI vereinfacht, damit Nutzer mit Leseschwäche sie besser verstehen', isCorrect: false, explanation: 'Falsch: Semantisches HTML beschreibt die strukturelle Auszeichnung im Code, keine automatische Textumschreibung.' },
      { id: 'c', text: 'Seiten werden einheitlich aus verschachtelten <div>-Containern aufgebaut, um Darstellungskonflikte zu vermeiden', isCorrect: false, explanation: 'Falsch: Reine <div>-Strukturen („Div-Suppe“) liefern Screenreadern keine semantische Bedeutung.' },
      { id: 'd', text: 'Farben und Kontraste werden im HTML-Code fest hinterlegt, damit kein externes CSS benötigt wird', isCorrect: false, explanation: 'Falsch: Gestaltung und Kontraste gehören in CSS; HTML beschreibt die logische Dokumentstruktur.' }
    ]
  },
  {
    id: 'exam-13',
    chapterId: 'project',
    question: 'Aufgabe 13 (Projekt): Wie unterscheiden sich Lastenheft und Pflichtenheft?',
    options: [
      { id: 'a', text: 'Das Lastenheft erstellt der Auftraggeber für das Was; das Pflichtenheft der Auftragnehmer für das Wie', isCorrect: true, explanation: 'Richtig: Auftraggeber beschreibt im Lastenheft die Anforderungen (WAS), Auftragnehmer im Pflichtenheft die konkrete Umsetzung (WIE).' },
      { id: 'b', text: 'Das Lastenheft dokumentiert die Projektkosten; das Pflichtenheft regelt die Abnahme nach Projektende', isCorrect: false, explanation: 'Falsch: Beide Dokumente entstehen in der frühen Projektphase zur Leistungs- und Lösungsbeschreibung.' },
      { id: 'c', text: 'Das Pflichtenheft formuliert der Auftraggeber zu Beginn; das Lastenheft erstellt die Agentur als Angebot', isCorrect: false, explanation: 'Falsch: Genau umgekehrt – zuerst liefert der Auftraggeber das Lastenheft, danach der Auftragnehmer das Pflichtenheft.' },
      { id: 'd', text: 'Das Lastenheft gilt nur für interne Projekte; das Pflichtenheft wird erst bei externen Aufträgen erstellt', isCorrect: false, explanation: 'Falsch: Beide Hefte gehören zusammen und dokumentieren Anforderung und Lösungskonzept.' }
    ]
  },
  {
    id: 'exam-14',
    chapterId: 'project',
    question: 'Aufgabe 14 (Projekt): Was ist ein "Meilenstein" im Projektmanagement?',
    options: [
      { id: 'a', text: 'Ein definierter Kontrollpunkt im Projektverlauf, an dem Zwischenergebnisse verbindlich geprüft werden', isCorrect: true, explanation: 'Richtig: Ein Meilenstein (z. B. Konzeptfreigabe) hat die Zeitdauer null und markiert einen wichtigen Prüfpunkt.' },
      { id: 'b', text: 'Eine mehrwöchige Projektphase, in der das gesamte Team an der finalen Umsetzung arbeitet', isCorrect: false, explanation: 'Falsch: Eine Arbeitsphase hat eine Dauer; ein Meilenstein ist ein punktuelles Ereignis ohne Zeitdauer.' },
      { id: 'c', text: 'Die vertraglich vereinbarte maximale Gesamtbudgetgrenze eines abgeschlossenen Kundenprojekts', isCorrect: false, explanation: 'Falsch: Das beschreibt den Kostenrahmen, keinen zeitlichen Kontrollpunkt.' },
      { id: 'd', text: 'Ein dokumentierter Qualitätsmangel, der vor der Übergabe an den Kunden behoben werden muss', isCorrect: false, explanation: 'Falsch: Das wäre ein Mangel bzw. Fehlerbericht, kein Meilenstein.' }
    ]
  },
  {
    id: 'exam-15',
    chapterId: 'project',
    question: 'Aufgabe 15 (Scrum): Was versteht man unter einem "Sprint" im Scrum-Modell?',
    options: [
      { id: 'a', text: 'Ein kurzer, fest begrenzter Arbeitszeitraum, in dem ein geplanter Produktteil umgesetzt wird', isCorrect: true, explanation: 'Richtig: Ein Sprint dauert in der Regel 1 bis 4 Wochen und liefert am Ende ein prüfbares Produktinkrement.' },
      { id: 'b', text: 'Die abschließende Testwoche unmittelbar vor dem geplanten Veröffentlichungstermin des Produkts', isCorrect: false, explanation: 'Falsch: Sprints laufen fortlaufend während der gesamten Produktentwicklung, nicht nur am Ende.' },
      { id: 'c', text: 'Ein monatliches Statusmeeting, in dem ausschließlich Budgetabweichungen protokolliert werden', isCorrect: false, explanation: 'Falsch: Ein Sprint ist ein ganzer Arbeitszyklus, kein einzelnes Meeting.' },
      { id: 'd', text: 'Eine langfristige Planungsphase über mindestens zwölf Monate ohne zwischenzeitliche Kundenfreigabe', isCorrect: false, explanation: 'Falsch: Das widerspricht dem agilen Grundprinzip kurzer, iterativer Lieferzyklen.' }
    ]
  },
  {
    id: 'exam-16',
    chapterId: 'database',
    question: 'Aufgabe 16 (Datenbanken): Welche Aussage zu Primär- und Fremdschlüsseln ist fachlich korrekt?',
    options: [
      { id: 'a', text: 'Der Primärschlüssel identifiziert Datensätze eindeutig; der Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle', isCorrect: true, explanation: 'Richtig! Fremdschlüssel stellen relationale Verbindungen her (z. B. Kunden_ID in der Tabelle Projekte).' },
      { id: 'b', text: 'Der Primärschlüssel darf mehrfach vorkommen; der Fremdschlüssel muss hingegen in jeder Zeile eindeutig sein', isCorrect: false, explanation: 'Falsch herum: Der Primärschlüssel muss eindeutig sein, während ein Fremdschlüssel mehrfach auftreten darf.' },
      { id: 'c', text: 'Der Primärschlüssel verschlüsselt Nutzerpasswörter; der Fremdschlüssel steuert die Zugriffsrechte im Netzwerk', isCorrect: false, explanation: 'Falsch: Schlüssel in relationalen Datenbanken dienen der Identifikation und Verknüpfung, nicht der Kryptografie.' },
      { id: 'd', text: 'Der Primärschlüssel verknüpft externe Bilddateien; der Fremdschlüssel definiert die maximale Spaltenanzahl einer Tabelle', isCorrect: false, explanation: 'Falsch: Beide Schlüssel steuern Identität und Beziehungen zwischen Tabellen in relationalen Datenbanken.' }
    ],
    merksatz: 'Der Primärschlüssel identifiziert ein Objekt eindeutig; der Fremdschlüssel stellt die relationale Verbindung her.'
  },
  {
    id: 'exam-17',
    chapterId: 'database',
    question: 'Aufgabe 17 (SQL): Warum ist die WHERE-Bedingung bei UPDATE und DELETE lebenswichtig?',
    options: [
      { id: 'a', text: 'Weil ohne WHERE-Bedingung ausnahmslos alle Datensätze der gesamten Tabelle geändert oder gelöscht werden', isCorrect: true, explanation: 'Goldene IHK-Prüfungsregel: UPDATE und DELETE ohne WHERE führen zu vollständigem Überschreiben oder Datenverlust.' },
      { id: 'b', text: 'Weil der Datenbankserver den Befehl ohne WHERE-Klausel mit einem Syntaxfehler sofort ablehnt', isCorrect: false, explanation: 'Falsch: SQL führt UPDATE und DELETE ohne WHERE syntaktisch fehlerfrei auf sämtliche Zeilen aus.' },
      { id: 'c', text: 'Weil ohne WHERE-Bedingung nur der allererste Datensatz der Tabelle bearbeitet oder entfernt wird', isCorrect: false, explanation: 'Falsch: Nicht nur der erste, sondern jeder einzelne Datensatz der Tabelle wird betroffen.' },
      { id: 'd', text: 'Weil WHERE automatisch ein Sicherheits-Backup der geänderten Tabelle vor dem Ausführen anlegt', isCorrect: false, explanation: 'Falsch: WHERE filtert lediglich die betroffenen Zeilen und erstellt kein Backup.' }
    ],
    merksatz: 'Bei UPDATE und DELETE immer peinlich genau prüfen, ob die WHERE-Bedingung stimmt!'
  },
  {
    id: 'exam-18',
    chapterId: 'database',
    question: 'Aufgabe 18 (Datenmodellierung): Wie wird eine n:m-Beziehung (z. B. ein Web-Projekt nutzt mehrere Bilder und ein Bild kommt in mehreren Projekten vor) gelöst?',
    options: [
      { id: 'a', text: 'Über eine Zwischentabelle, die die Fremdschlüssel beider beteiligten Tabellen speichert', isCorrect: true, explanation: 'Richtig! Eine Verknüpfungstabelle (z. B. Projekt_Bilder mit Projekt_ID und Bild_ID) löst n:m sauber auf.' },
      { id: 'b', text: 'Indem sämtliche zugehörigen Bild-IDs kommagetrennt in einem einzigen Textfeld gespeichert werden', isCorrect: false, explanation: 'Falsch: Das verletzt die 1. Normalform und erschwert strukturierte Abfragen enorm.' },
      { id: 'c', text: 'Indem alle Spalten der Bildertabelle mehrfach nebeneinander direkt in die Projekttabelle kopiert werden', isCorrect: false, explanation: 'Falsch: Das erzeugt massive Redundanzen und begrenzt die Anzahl verknüpfbarer Bilder.' },
      { id: 'd', text: 'Indem beide Tabellen ohne Fremdschlüssel getrennt bleiben und erst im Frontend zusammengeführt werden', isCorrect: false, explanation: 'Falsch: Ohne referenzielle Verknüpfung geht die Datenintegrität verloren.' }
    ],
    merksatz: 'n:m benötigt zwingend eine Zwischentabelle mit den beiden Fremdschlüsseln.'
  },
  {
    id: 'exam-19',
    chapterId: 'database',
    question: 'Aufgabe 19 (JSON vs. XML): Aus welchen 4 Gründen hat JSON das XML-Format im Web und bei APIs weitgehend verdrängt?',
    options: [
      { id: 'a', text: 'Hohe Kompaktheit, schnelles Parsing, native Browser-Integration und gute Lesbarkeit', isCorrect: true, explanation: 'Richtig! JSON spart schließende End-Tags, wird extrem schnell geparst und ist nativ in JavaScript/Browser integriert.' },
      { id: 'b', text: 'Native CMYK-Unterstützung, verlustfreie Bildkompression, feste Druckprofile und Vektorpfade', isCorrect: false, explanation: 'Falsch: JSON ist ein textbasiertes Datenaustauschformat und kein Grafik- oder Druckformat.' },
      { id: 'c', text: 'Exklusive Unterstützung für UTF-8-Umlaute, integrierte SQL-Engine und automatische Verschlüsselung', isCorrect: false, explanation: 'Falsch: Auch XML unterstützt UTF-8; JSON enthält weder eine SQL-Engine noch eingebaute Verschlüsselung.' },
      { id: 'd', text: 'Pflicht zur DTD-Schema-Validierung, doppelte Tag-Struktur und direkte Ansteuerung von Druckmaschinen', isCorrect: false, explanation: 'Falsch: DTD und doppelte Tags sind typische Merkmale von XML, nicht von JSON.' }
    ],
    merksatz: 'JSON ist kompakter, schneller geparst, nativ in JavaScript integriert und bietet weniger visuellen Lärm als XML.'
  },
  {
    id: 'exam-20',
    chapterId: 'database',
    question: 'Aufgabe 20 (JSON-Syntax): Welche syntaktische Regel gilt in JSON ausnahmslos für Schlüssel und Datentypen?',
    options: [
      { id: 'a', text: 'Schlüssel und Strings stehen in doppelten Anführungszeichen, Dezimalzahlen nutzen einen Punkt', isCorrect: true, explanation: 'Richtig! Einfache Anführungszeichen, deutsches Komma in Zahlen sowie Funktionen oder undefined sind in JSON unzulässig.' },
      { id: 'b', text: 'Schlüssel stehen ohne Anführungszeichen, und Dezimalzahlen nutzen das landesspezifische Komma', isCorrect: false, explanation: 'Falsch: In JSON müssen Schlüssel zwingend in doppelten Anführungszeichen stehen und Zahlen den Dezimalpunkt nutzen.' },
      { id: 'c', text: 'Schlüssel stehen in einfachen Anführungszeichen, und Funktionen dürfen direkt als Werte gespeichert werden', isCorrect: false, explanation: 'Falsch: Weder einfache Anführungszeichen noch Funktionen sind in gültigem JSON erlaubt.' },
      { id: 'd', text: 'Nach dem letzten Element eines Objekts oder Arrays muss zwingend ein abschließendes Komma stehen', isCorrect: false, explanation: 'Falsch: Ein nachgestelltes Komma (Trailing Comma) führt in JSON zu einem Syntaxfehler.' }
    ],
    merksatz: 'In JSON: Schlüssel immer "in_doppelten_anfuehrungszeichen", Zahlen mit Punkt (z. B. 19.99), keine Funktionen.'
  },
  {
    id: 'exam-21',
    chapterId: 'database',
    question: 'Aufgabe 21 (JSON & Web-APIs): Wie läuft der Datenaustausch zwischen Server und dem Frontend-Design einer App (z. B. Wetter-App) ab?',
    options: [
      { id: 'a', text: 'Die App fragt den Server an, erhält schlanke JSON-Rohdaten und rendert diese visuell im Interface', isCorrect: true, explanation: 'Richtig: Der Server liefert strukturierte Daten per JSON-API (z. B. {"temp": 22}), das Frontend gestaltet die Anzeige.' },
      { id: 'b', text: 'Der Server rendert jede Bildschirmansicht als fertige JPEG-Grafik und sendet sie an die App', isCorrect: false, explanation: 'Falsch: APIs übertragen kompakte strukturierte Textdaten statt fertiger Pixelbilder.' },
      { id: 'c', text: 'Das Frontend berechnet aktuelle Wetterwerte lokal im Gerät und meldet sie anschließend an den Server', isCorrect: false, explanation: 'Falsch: Aktuelle Wetterdaten werden zentral von externen Diensten über APIs bereitgestellt.' },
      { id: 'd', text: 'Die App lädt bei jedem Öffnen die gesamte SQL-Datenbank herunter und filtert sie lokal im Browser', isCorrect: false, explanation: 'Falsch: Aus Sicherheits- und Performancegründen liefert der Server nur gezielt angefragte JSON-Ausschnitte.' }
    ],
    merksatz: 'Server liefert JSON-Rohdaten via API – Frontend-Design setzt sie für den Nutzer visuell ansprechend in Szene.'
  },
  {
    id: 'exam-22',
    chapterId: 'crossmedia',
    question: 'Aufgabe 22 (Medienneutrale Workflows): Was unterscheidet einen layoutbasierten von einem strukturbasierten Workflow?',
    options: [
      { id: 'a', text: 'Layoutbasiert verbindet Inhalt direkt mit der Gestaltung; strukturbasiert erfasst Daten neutral und wendet Templates später an', isCorrect: true, explanation: 'Original-Prüfungsantwort: Im layoutbasierten Workflow (z. B. InDesign) erzwingt ein Medienwechsel Neugestaltung; strukturbasiert bleiben Inhalte wiederverwendbar.' },
      { id: 'b', text: 'Layoutbasiert eignet sich ausschließlich für Webseiten; strukturbasiert wird nur im klassischen Bogenoffset eingesetzt', isCorrect: false, explanation: 'Falsch: Gerade der strukturbasierte Workflow ermöglicht Crossmedia-Ausgabe für Web, App und Print.' },
      { id: 'c', text: 'Layoutbasiert verarbeitet Bilder und Texte gemeinsam; strukturbasiert kann technisch ausschließlich reine Fließtexte verwalten', isCorrect: false, explanation: 'Falsch: Auch strukturbasierte Workflows binden Bilder über Referenzen und Metadaten sauber ein.' },
      { id: 'd', text: 'Layoutbasiert arbeitet immer über zentrale PIM-Datenbanken; strukturbasiert pflegt jeden Ausgabekanal manuell separat', isCorrect: false, explanation: 'Falsch: Genau umgekehrt – zentrale Datenbanken sind das Fundament strukturbasierter Workflows.' }
    ],
    merksatz: 'Strukturbasiert trennt Inhalt und Layout: Einmal neutral erfassen, Templates formatieren für Print, Web und App.'
  },
  {
    id: 'exam-23',
    chapterId: 'crossmedia',
    question: 'Aufgabe 23 (Semantische Strukturierung): Warum ist eine rein semantische Auszeichnung (z. B. H1 statt „fett und 24pt“) unverzichtbar für medienneutrale Daten?',
    options: [
      { id: 'a', text: 'Das Ausgabesystem erkennt die inhaltliche Rolle und wendet je Kanal die passende Darstellung an', isCorrect: true, explanation: 'Richtig: Durch Semantik weiß jedes Zielmedium (Web-<h1>, Print-Headline, App-Titel), wie das Element formatiert werden muss.' },
      { id: 'b', text: 'Moderne Webbrowser ignorieren feste Schriftgrößen in Punkt vollständig und zeigen nur Standardtext an', isCorrect: false, explanation: 'Falsch: Browser können pt verarbeiten, doch feste Formatierungen verhindern flexible Kanalanpassung.' },
      { id: 'c', text: 'Layoutprogramme im Druckbereich können fette Schriftschnitte technisch nicht ohne HTML-Tags belichten', isCorrect: false, explanation: 'Falsch: Layoutprogramme arbeiten mit Absatz- und Zeichenformaten, nutzen Semantik aber für automatische Zuordnung.' },
      { id: 'd', text: 'Semantische Auszeichnung verschlüsselt den Text automatisch gegen unbefugtes Kopieren im Internet', isCorrect: false, explanation: 'Falsch: Semantik beschreibt die logische Bedeutung von Inhalten und bietet keinen Kopierschutz.' }
    ],
    merksatz: 'Semantik definiert die logische Bedeutung (H1, Preis), das Template bestimmt das jeweilige Kanallayout.'
  },
  {
    id: 'exam-24',
    chapterId: 'crossmedia',
    question: 'Aufgabe 24 (Single Source & Qualitätskontrolle): Warum ist eine strikte Qualitätsprüfung bei Single Source Publishing (SSP) besonders überlebenswichtig?',
    options: [
      { id: 'a', text: 'Weil Fehler im zentralen Datenbestand automatisch in alle angeschlossenen Ausgabekanäle übernommen werden', isCorrect: true, explanation: 'Richtig: Preisfehler, Tippfehler oder fehlende Pflichtfelder multiplizieren sich bei SSP sofort in Webshop, Katalog und Newsletter.' },
      { id: 'b', text: 'Weil bereits ein fehlendes Komma den gesamten zentralen Server dauerhaft beschädigt und löscht', isCorrect: false, explanation: 'Falsch: Der Server wird nicht gelöscht, doch inhaltliche Fehler verbreiten sich unkontrolliert über alle Kanäle.' },
      { id: 'c', text: 'Weil Korrekturen nach der ersten Veröffentlichung in einer zentralen Datenbank technisch gesperrt sind', isCorrect: false, explanation: 'Falsch: Daten lassen sich zentral korrigieren, doch fehlerhafte Print-Auflagen oder Newsletter sind dann bereits draußen.' },
      { id: 'd', text: 'Weil Single Source Publishing gesetzlich nur einmal pro Geschäftsjahr exportiert werden darf', isCorrect: false, explanation: 'Falsch: Exporte können beliebig oft und automatisiert erfolgen.' }
    ]
  },
  {
    id: 'exam-25',
    chapterId: 'crossmedia',
    question: 'Aufgabe 25 (XML-Wohlgeformtheit): Welche 4 Regeln MUSS ein XML-Dokument zwingend einhalten, um „wohlgeformt“ (well-formed) zu sein?',
    options: [
      { id: 'a', text: 'Ein Root-Element, geschlossene Tags, korrekte Verschachtelung ohne Überkreuzung und Case-Sensitivity', isCorrect: true, explanation: 'Richtig! Verstößt ein XML-Dokument gegen diese vier Regeln (inkl. Groß-/Kleinschreibung), bricht der Parser ab.' },
      { id: 'b', text: 'Ausschließlich Kleinbuchstaben, keine Ziffern in Tag-Namen, genau ein Absatz und Verzicht auf Attribute', isCorrect: false, explanation: 'Falsch: Großbuchstaben, Ziffern (nicht am Anfang), beliebig viele Absätze und Attribute sind erlaubt.' },
      { id: 'c', text: 'Mindestens zwei Root-Elemente, offene Einzel-Tags ohne Schrägstrich und frei wählbare Großschreibung', isCorrect: false, explanation: 'Falsch: Das verletzt fast jede Wohlgeformtheitsregel von XML.' },
      { id: 'd', text: 'Eingebettetes CMYK-Farbprofil, 300 ppi Bildauflösung, 3 mm Beschnittzugabe und PDF/X-4-Standard', isCorrect: false, explanation: 'Falsch: Das sind Print-Produktionsregeln, keine XML-Syntaxregeln.' }
    ],
    merksatz: 'Wohlgeformt: 1 Root-Element, alle Tags schließen, keine überkreuzte Schachtelung, strikte Case-Sensitivity!'
  },
  {
    id: 'exam-26',
    chapterId: 'crossmedia',
    question: 'Aufgabe 26 (XML-Zusatztechnologien & Prüfungskette): Welche 4-Stufen-Kette verbindet strukturierte Rohdaten mit Prüfung, Adressierung und fertigem Ausgabedesign?',
    options: [
      { id: 'a', text: 'XML → DTD/XSD → XPath → XSLT', isCorrect: true, explanation: 'Exakt! XML speichert Rohdaten → DTD/XSD prüft die Struktur → XPath sucht & adressiert Daten → XSLT transformiert sie in Design/HTML.' },
      { id: 'b', text: 'InDesign → PDF/X → Druck-RIP → Falzmaschine', isCorrect: false, explanation: 'Falsch: Das beschreibt einen konventionellen Print-Produktionsworkflow.' },
      { id: 'c', text: 'RAW → TIFF → PNG → WebP', isCorrect: false, explanation: 'Falsch: Das sind Bilddateiformate, keine XML-Verarbeitungskette.' },
      { id: 'd', text: 'SQL → DDL → DML → CRUD', isCorrect: false, explanation: 'Falsch: Das sind Konzepte und Befehlskategorien aus relationalen Datenbanken.' }
    ],
    merksatz: 'XML speichert → DTD/XSD prüft → XPath sucht → XSLT macht Design/HTML.'
  },
  {
    id: 'exam-27',
    chapterId: 'crossmedia',
    question: 'Aufgabe 27 (XML vs. JSON im IHK-Vergleich): Warum hat JSON das XML-Format bei modernen Web-APIs und mobilen Applikationen weitgehend verdrängt?',
    options: [
      { id: 'a', text: 'Es ist kompakter ohne End-Tags, wird schnell nativ in JavaScript geparst und nutzt direkte Schlüssel-Wert-Paare', isCorrect: true, explanation: 'Richtig! Kompaktheit, hohe Parsing-Geschwindigkeit, native JS-Integration und gute Lesbarkeit sind die Hauptvorteile.' },
      { id: 'b', text: 'Es unterstützt als einziges Format Umlaute und Sonderzeichen nach dem weltweiten UTF-8-Standard', isCorrect: false, explanation: 'Falsch: Auch XML unterstützt UTF-8 und alle internationalen Zeichensätze vollständig.' },
      { id: 'c', text: 'Es lässt sich ohne Webbrowser direkt als fertiges Druck-PDF an Offsetdruckmaschinen übergeben', isCorrect: false, explanation: 'Falsch: JSON ist ein reines Datenaustauschformat, kein Druckausgabeformat.' },
      { id: 'd', text: 'Es bietet eine strengere Schema-Prüfung als XSD und ersetzt relationale Datenbanken vollständig', isCorrect: false, explanation: 'Falsch: Gerade bei strenger Dokumentvalidierung und Druckvorstufe hat XML/XSD weiterhin Stärken.' }
    ],
    merksatz: 'JSON ist kompakter als XML, schneller im Parsing und nativ im Webbrowser integriert.'
  },
  {
    id: 'exam-27b',
    chapterId: 'graphics',
    question: 'Aufgabe 27b (Bilddaten & Vektoren): Warum ist das SVG-Format für Icons und Responsive Webdesign dem PNG-Format überlegen?',
    options: [
      { id: 'a', text: 'SVG basiert auf mathematischen XML-Vektoren und skaliert verlustfrei auf jede Display-Auflösung', isCorrect: true, explanation: 'Richtig! SVG bleibt auf Standard- wie Retina/HiDPI-Displays gestochen scharf, ohne die Dateigröße aufzublähen.' },
      { id: 'b', text: 'SVG unterstützt native CMYK-Farbprofile und lässt sich direkt für den Offsetdruck belichten', isCorrect: false, explanation: 'Falsch: SVG arbeitet primär im RGB-Farbraum für das Web, nicht mit nativer CMYK-Separation.' },
      { id: 'c', text: 'SVG komprimiert hochauflösende Porträtfotos deutlich effizienter als PNG oder WebP', isCorrect: false, explanation: 'Falsch: Für komplexe Fotos sind Rasterformate (WebP/JPEG/AVIF) geeignet, nicht SVG.' },
      { id: 'd', text: 'SVG speichert mehrere Pixelgrößen gleichzeitig in einer Datei und schaltet diese je Bildschirm um', isCorrect: false, explanation: 'Falsch: SVG speichert keine festen Pixelraster, sondern mathematische Pfade.' }
    ],
    merksatz: 'SVG = XML-Vektoren für verlustfreie Skalierbarkeit im Responsive Webdesign!'
  },
  {
    id: 'exam-27c',
    chapterId: 'graphics',
    question: 'Aufgabe 27c (Farbmanagement): Welches Farbprofil gilt als kleinster gemeinsamer Nenner für medienneutrale Web-Grafiken?',
    options: [
      { id: 'a', text: 'sRGB', isCorrect: true, explanation: 'Exakt! sRGB (Standard-RGB) wird von nahezu allen Consumer-Displays und Webbrowsern einheitlich interpretiert.' },
      { id: 'b', text: 'ISO Coated v2', isCorrect: false, explanation: 'Falsch: ISO Coated v2 ist ein CMYK-Druckfarbprofil für gestrichenes Bilderdruckpapier.' },
      { id: 'c', text: 'ProPhoto RGB', isCorrect: false, explanation: 'Falsch: ProPhoto RGB ist für das Web viel zu groß und führt auf Standard-Displays oft zu blassen Farben.' },
      { id: 'd', text: 'Graustufen 8-Bit', isCorrect: false, explanation: 'Falsch: Graustufen enthalten keinerlei Farbinformationen.' }
    ],
    merksatz: 'sRGB ist der verbindliche Standard-Farbraum für das World Wide Web!'
  },
  {
    id: 'exam-28',
    chapterId: 'wiso',
    question: 'Aufgabe 28 (WiSo - BBiG & Kündigungsrecht): Wie ist die Kündbarkeit eines Berufsausbildungsverhältnisses nach Ablauf der Probezeit gesetzlich geregelt?',
    options: [
      { id: 'a', text: 'Der Betrieb kann nur aus wichtigem Grund kündigen; der Azubi zusätzlich ordentlich mit 4 Wochen Frist bei Berufswechsel', isCorrect: true, explanation: 'Richtig! Nach § 22 Abs. 2 BBiG ist eine ordentliche Kündigung durch den Ausbildungsbetrieb nach der Probezeit ausgeschlossen.' },
      { id: 'b', text: 'Beide Vertragsparteien können jederzeit ordentlich mit einer Frist von vier Wochen ohne Angabe von Gründen kündigen', isCorrect: false, explanation: 'Falsch: Das BBiG schützt Auszubildende nach der Probezeit besonders streng vor ordentlicher Kündigung.' },
      { id: 'c', text: 'Eine Kündigung durch den Betrieb oder den Auszubildenden ist bis zur Abschlussprüfung gesetzlich ausgeschlossen', isCorrect: false, explanation: 'Falsch: Fristlose Kündigung aus wichtigem Grund sowie Kündigung durch den Azubi bei Berufsaufgabe/-wechsel bleiben möglich.' },
      { id: 'd', text: 'Jede Kündigung nach der Probezeit muss vorab von der zuständigen IHK geprüft und genehmigt werden', isCorrect: false, explanation: 'Falsch: Die IHK wird informiert, erteilt aber keine Kündigungsgenehmigung.' }
    ],
    merksatz: 'Nach der Probezeit: Betrieb kann nur außerordentlich fristlos kündigen; Azubi mit 4 Wochen Frist bei Berufswechsel!'
  },
  {
    id: 'exam-29',
    chapterId: 'wiso',
    question: 'Aufgabe 29 (WiSo - Sozialversicherung): Welcher Zweig der gesetzlichen Sozialversicherung wird zu 100% allein vom Arbeitgeber finanziert?',
    options: [
      { id: 'a', text: 'Die gesetzliche Unfallversicherung', isCorrect: true, explanation: 'Exakt! Die gesetzliche Unfallversicherung (Berufsgenossenschaft, z. B. BG ETEM) wird zu 100 % vom Arbeitgeber getragen.' },
      { id: 'b', text: 'Die gesetzliche Krankenversicherung', isCorrect: false, explanation: 'Falsch: Die Krankenversicherung wird grundsätzlich paritätisch (ca. 50/50) von Arbeitnehmer und Arbeitgeber getragen.' },
      { id: 'c', text: 'Die gesetzliche Rentenversicherung', isCorrect: false, explanation: 'Falsch: Die Rentenversicherung wird je zur Hälfte von Arbeitnehmer und Arbeitgeber finanziert.' },
      { id: 'd', text: 'Die gesetzliche Arbeitslosenversicherung', isCorrect: false, explanation: 'Falsch: Die Arbeitslosenversicherung wird ebenfalls paritätisch von beiden Seiten bezahlt.' }
    ],
    merksatz: 'Die gesetzliche Unfallversicherung (Berufsgenossenschaft) bezahlt der Arbeitgeber zu 100% allein!'
  },
  {
    id: 'exam-30',
    chapterId: 'wiso',
    question: 'Aufgabe 30 (WiSo - Mitbestimmung & Kündigungsschutz): Ein Agenturleiter kündigt einem Mediengestalter, ohne zuvor den bestehenden Betriebsrat anzuhören. Welche rechtliche Konsequenz hat dies?',
    options: [
      { id: 'a', text: 'Die ausgesprochene Kündigung ist nach § 102 BetrVG von vornherein unwirksam', isCorrect: true, explanation: 'Richtig! Die vorherige Anhörung des Betriebsrats ist zwingende Wirksamkeitsvoraussetzung jeder Arbeitgeberkündigung.' },
      { id: 'b', text: 'Die Kündigung tritt verzögert in Kraft und wird nach zwei Monaten automatisch wirksam', isCorrect: false, explanation: 'Falsch: Eine ohne Betriebsratsanhörung ausgesprochene Kündigung heilt nicht durch Zeitablauf.' },
      { id: 'c', text: 'Die Kündigung bleibt wirksam, der Arbeitgeber muss jedoch eine pauschale Abfindung zahlen', isCorrect: false, explanation: 'Falsch: Der Verfahrensfehler macht die Kündigung selbst unwirksam, nicht bloß abfindungspflichtig.' },
      { id: 'd', text: 'Der Betriebsrat kann die Kündigung nur innerhalb von 24 Stunden per Einspruch aufheben', isCorrect: false, explanation: 'Falsch: Ohne vorherige Anhörung ist die Kündigung bereits kraft Gesetzes unwirksam.' }
    ],
    merksatz: 'Jede Kündigung ohne vorherige Anhörung des Betriebsrats ist absolut unwirksam (§ 102 BetrVG)!'
  },
  {
    id: 'exam-31',
    chapterId: 'wiso',
    question: 'Aufgabe 31 (WiSo - Unternehmensformen & Haftung): Welche der folgenden Unternehmensformen schützt das Privatvermögen der Gesellschafter vor geschäftlichen Schulden?',
    options: [
      { id: 'a', text: 'Gesellschaft mit beschränkter Haftung (GmbH)', isCorrect: true, explanation: 'Richtig! Als Kapitalgesellschaft haftet die GmbH grundsätzlich nur mit ihrem Gesellschaftsvermögen (mind. 25.000 € Stammkapital).' },
      { id: 'b', text: 'Einzelunternehmen (e. K.)', isCorrect: false, explanation: 'Falsch: Der Einzelunternehmer haftet unbeschränkt persönlich mit seinem gesamten Privatvermögen.' },
      { id: 'c', text: 'Offene Handelsgesellschaft (OHG)', isCorrect: false, explanation: 'Falsch: Alle Gesellschafter einer OHG haften unbeschränkt, persönlich und solidarisch mit ihrem Privatvermögen.' },
      { id: 'd', text: 'Komplementär einer Kommanditgesellschaft (KG)', isCorrect: false, explanation: 'Falsch: Der Komplementär ist Vollhafter und haftet persönlich mit seinem Privatvermögen.' }
    ],
    merksatz: 'GmbH = Kapitalgesellschaft mit Haftungsbeschränkung auf das Gesellschaftsvermögen!'
  },
  {
    id: 'exam-32',
    chapterId: 'project-phases',
    question: 'Aufgabe 32 (Projektphasen - DIN 69901): Welche Kombination nennt ausschließlich konstitutive Merkmale eines Projekts?',
    options: [
      { id: 'a', text: 'Zielvorgabe, Neuartigkeit, Einmaligkeit, Komplexität, zeitliche Befristung, begrenzte Ressourcen, Risiko', isCorrect: true, explanation: 'Original aus DIN 69901 und IHK-Lehrplan: Die sieben konstitutiven Merkmale eines Projekts.' },
      { id: 'b', text: 'Dauerhafte Wiederholung, unbegrenztes Budget, risikolose Ausführung und Verzicht auf Meilensteine', isCorrect: false, explanation: 'Falsch: Diese Eigenschaften widersprechen der DIN-Definition eines Projekts.' },
      { id: 'c', text: 'Tägliche Standard-Wartung, offene Endlaufzeit, gleichbleibender Ablauf und feste Linienabteilung', isCorrect: false, explanation: 'Falsch: Das beschreibt wiederkehrende Linienroutine im Regelbetrieb.' },
      { id: 'd', text: 'Reine Software-Entwicklung, agiles Entwicklerteam, zwingende Cloud-Nutzung und offene Zielsetzung', isCorrect: false, explanation: 'Falsch: Projekte sind branchenunabhängig und besitzen stets eine klare Zielvorgabe.' }
    ],
    merksatz: 'Projekte sind einmalig, neuartig, zielgerichtet, befristet, ressourcenlimitiert und risikobehaftet!'
  },
  {
    id: 'exam-33',
    chapterId: 'project-phases',
    question: 'Aufgabe 33 (Projekt vs. Routine): Welche der folgenden Tätigkeiten ist nach IHK-Standard ein echtes PROJEKT und keine Routineaufgabe?',
    options: [
      { id: 'a', text: 'Die Entwicklung eines Standbogens mit neuer Sonderfalzung und Stanzkontur für eine Flyerserie', isCorrect: true, explanation: 'Richtig! Einmalige, neuartige Konstruktion mit klarer Zielvorgabe und eigener Planung.' },
      { id: 'b', text: 'Der vierteljährliche Nachdruck weiterer 10.000 Flyer aus der bereits bestehenden Flyerserie', isCorrect: false, explanation: 'Falsch: Periodischer Nachdruck ohne Neuentwicklung ist eine wiederkehrende Routineaufgabe.' },
      { id: 'c', text: 'Das tägliche Reinigen und Kalibrieren der Gummitücher und Farbwerke an der Druckmaschine', isCorrect: false, explanation: 'Falsch: Regelmäßige Maschinenwartung gehört zum laufenden Routinebetrieb.' },
      { id: 'd', text: 'Das wöchentliche Prüfen, Kontieren und Bezahlen von Eingangsrechnungen in der Buchhaltung', isCorrect: false, explanation: 'Falsch: Wiederkehrende Verwaltungstätigkeiten gehören zum Regelbetrieb.' }
    ],
    merksatz: 'Neuentwicklung von Falzung/Standbogen = Projekt! Wiederholter Nachdruck = Routine!'
  },
  {
    id: 'exam-34',
    chapterId: 'project-phases',
    question: 'Aufgabe 34 (Teamentwicklung nach Tuckman): Welches Verhalten ist in der Forming-Phase (Phase 1) für die Projektleitung am wichtigsten, um das Team vor späteren Fehlentwicklungen zu schützen?',
    options: [
      { id: 'a', text: 'Klare Orientierung geben sowie Ziele, Rollen und Spielregeln eindeutig klären', isCorrect: true, explanation: 'Richtig! Im Forming herrscht oft oberflächliche Höflichkeit; klare Ziele, Rollen und Erwartungen verhindern spätere Reibungen im Storming.' },
      { id: 'b', text: 'Sich vollständig zurückziehen und dem Team ohne Vorgaben freie Hand lassen', isCorrect: false, explanation: 'Falsch: Voreiliges Laissez-faire im Forming führt im Storming häufig zu schweren Rollenkonflikten.' },
      { id: 'c', text: 'Direkt kontroverse Streitgespräche und persönliche Kritikrunden ansetzen', isCorrect: false, explanation: 'Falsch: Das zerstört die psychologische Sicherheit in der Kennenlernphase.' },
      { id: 'd', text: 'Das Team sofort neu besetzen, falls in der ersten Woche keine Höchstleistung entsteht', isCorrect: false, explanation: 'Falsch: Jedes Team benötigt Zeit, um sich über die Phasen hinweg einzuspielen.' }
    ],
    merksatz: 'Forming verlangt Orientierung und Rollenklarheit – nicht voreiligen Laissez-faire-Stil!'
  },
  {
    id: 'exam-35',
    chapterId: 'project-phases',
    question: 'Aufgabe 35 (Storming - Wenn es zum ersten Mal knirscht): Ein Team streitet über die Aufgabenverteilung; Frust richtet sich gegen „die da oben“. Welche Reaktion der Führungskraft ist nach den Grundsätzen von Christoph Schulze richtig?',
    options: [
      { id: 'a', text: 'Konflikte moderieren, Reibungspunkte offen ansprechen und Rollen sowie Schnittstellen klären', isCorrect: true, explanation: 'Richtig! Moderieren statt urteilen: Wer Konflikte mit Scheinharmonie zudeckt, presst Spannungen nur unter die Oberfläche.' },
      { id: 'b', text: 'Den Streit mit sofortigen Abmahnungen beenden und verbindlich harmonisches Verhalten anordnen', isCorrect: false, explanation: 'Falsch: Verordnete Harmonie lähmt das Team und löst die eigentlichen Rollenkonflikte nicht.' },
      { id: 'c', text: 'Sich komplett heraushalten und abwarten, bis sich die Meinungsverschiedenheiten von selbst legen', isCorrect: false, explanation: 'Falsch: Konflikte im Storming lösen sich selten allein; ohne Moderation verhärten sich Fronten.' },
      { id: 'd', text: 'Das Projekt umgehend abbrechen und die Teammitglieder auf getrennte Abteilungen verteilen', isCorrect: false, explanation: 'Falsch: Reibung im Storming ist ein normaler und notwendiger Entwicklungsschritt eines Teams.' }
    ],
    merksatz: 'Führung im Storming: Moderieren statt urteilen – Konflikte konstruktiv austragen lassen!'
  },
  {
    id: 'exam-36',
    chapterId: 'project-phases',
    question: 'Aufgabe 36 (Norming - Die gemeinsamen Regeln entstehen): Was ist der schwerwiegendste Führungsfehler, wenn ein Team die Norming-Phase erreicht und beginnt, eigenverantwortlich Spielregeln zu leben?',
    options: [
      { id: 'a', text: 'Enges Micromanagement beibehalten und dadurch die entstehende Selbstorganisation ersticken', isCorrect: true, explanation: 'Richtig! Im Norming muss die Führungskraft loslassen und Verantwortung abgeben, statt weiter jeden Schritt zu kontrollieren.' },
      { id: 'b', text: 'Dem Team Vertrauen schenken und erste operative Entscheidungen schrittweise ins Team verlagern', isCorrect: false, explanation: 'Falsch: Genau dieses schrittweise Übergeben von Verantwortung ist im Norming gewünscht.' },
      { id: 'c', text: 'Entstehende Spielregeln und Arbeitsabläufe transparent machen und konstruktiv bestärken', isCorrect: false, explanation: 'Falsch: Das sichtbare Festigen gemeinsamer Regeln stärkt die Teamkultur.' },
      { id: 'd', text: 'Erste erreichte Zwischenziele und gelungene Zusammenarbeit bewusst gemeinsam anerkennen', isCorrect: false, explanation: 'Falsch: Wertschätzung für gemeinsame Fortschritte fördert das Wir-Gefühl.' }
    ],
    merksatz: 'Norming ist die Phase, in der Führung Verantwortung abgeben und vertrauen muss!'
  },
  {
    id: 'exam-37',
    chapterId: 'project-phases',
    question: 'Aufgabe 37 (Performing & Rückfall-Dynamik): Was passiert nach dem Modell von Bruce Tuckman, wenn in ein eingespieltes Hochleistungsteam (Performing) ein neues Mitglied aufgenommen wird oder sich die Projektziele drastisch ändern?',
    options: [
      { id: 'a', text: 'Das Team fällt in frühere Phasen zurück, weil Rollen und Schnittstellen neu geklärt werden müssen', isCorrect: true, explanation: 'Richtig! Performing ist kein Dauerzustand; personelle oder inhaltliche Wechsel werfen ein Team oft bis ins Forming/Storming zurück.' },
      { id: 'b', text: 'Das Team bleibt stabil im Performing, da erreichte Teamentwicklungsstufen unumkehrbar sind', isCorrect: false, explanation: 'Falsch: Teamentwicklung verläuft dynamisch und zyklisch, nicht als Einbahnstraße.' },
      { id: 'c', text: 'Das Team wechselt direkt in die Adjourning-Phase und muss organisatorisch aufgelöst werden', isCorrect: false, explanation: 'Falsch: Veränderungen erfordern Neu-Justierung, aber keine Auflösung des Teams.' },
      { id: 'd', text: 'Das neue Mitglied passt sich automatisch an, sodass weder Orientierung noch Klärung nötig sind', isCorrect: false, explanation: 'Falsch: Neue Mitglieder verändern stets Dynamik, Rollenverständnis und Kommunikation im Team.' }
    ],
    merksatz: 'Veränderungen werfen ein Team zurück – Teamentwicklung ist dynamisch und zyklisch!'
  },
  {
    id: 'exam-38',
    chapterId: 'project-phases',
    question: 'Aufgabe 38 (Adjourning - Die 5. Phase nach Tuckman & Jensen): Warum schadet ein liebloser Projektabschluss („Meeting fällt aus, niemand sagt danke“) nicht nur dem aktuellen Projekt, sondern auch zukünftigen Projekten?',
    options: [
      { id: 'a', text: 'Lessons Learned gehen verloren und Mitarbeitende starten misstrauischer in das nächste Projekt', isCorrect: true, explanation: 'Richtig nach Christoph Schulze: Ein fehlender Abschluss verhindert organisatorisches Lernen und belastet das Forming künftiger Teams.' },
      { id: 'b', text: 'Der Auftraggeber ist ohne internes Abschlussmeeting rechtlich von der Zahlungspflicht befreit', isCorrect: false, explanation: 'Falsch: Zahlungsansprüche richten sich nach Werkvertrag und Abnahme, nicht nach internen Team-Meetings.' },
      { id: 'c', text: 'Die DIN 69901 schreibt zwingend vor, dass Projekte ohne Abschlussfeier als gescheitert gelten', isCorrect: false, explanation: 'Falsch: Die DIN fordert strukturierte Abschlussprozesse, aber keine gesetzliche Ungültigkeit ohne Feier.' },
      { id: 'd', text: 'Ohne Abschlussmeeting verfallen automatisch alle Nutzungsrechte an den erstellten Mediendaten', isCorrect: false, explanation: 'Falsch: Nutzungsrechte werden vertraglich geregelt und hängen nicht vom Abschlussmeeting ab.' }
    ],
    merksatz: 'Ein liebloser Abschluss im Adjourning beschädigt das nächste Projekt-Forming!'
  },
  {
    id: 'exam-39',
    chapterId: 'project-phases',
    question: 'Aufgabe 39 (DIN 69901-2 - Die 5 Projektmanagementphasen): Welche Reihe nennt die fünf genormten Phasen des Projektmanagements in korrekter Reihenfolge?',
    options: [
      { id: 'a', text: '1. Initialisierung → 2. Definition → 3. Planung → 4. Steuerung → 5. Abschluss', isCorrect: true, explanation: 'Richtig! Diese fünf DIN-69901-2-Phasen dienen der Projektführung, während fachliche Phasen (z. B. Satz, Druck) das Produkt herstellen.' },
      { id: 'b', text: '1. Entwurf → 2. Reinzeichnung → 3. Belichtung → 4. Druck → 5. Weiterverarbeitung', isCorrect: false, explanation: 'Falsch: Das sind fachliche Produktionsphasen der Drucktechnik, keine PM-Phasen.' },
      { id: 'c', text: '1. Forming → 2. Storming → 3. Norming → 4. Performing → 5. Adjourning', isCorrect: false, explanation: 'Falsch: Das ist das Phasenmodell der Teamentwicklung nach Tuckman.' },
      { id: 'd', text: '1. Planung → 2. Initialisierung → 3. Steuerung → 4. Definition → 5. Abschluss', isCorrect: false, explanation: 'Falsch: Die Reihenfolge stimmt nicht; Initialisierung und Definition liegen immer vor der Planung.' }
    ],
    merksatz: 'DIN 69901-2: Initialisierung → Definition → Planung → Steuerung → Abschluss!'
  },
  {
    id: 'exam-40',
    chapterId: 'project-phases',
    question: 'Aufgabe 40 (Initialisierung & Phasenlogik): Was ist der laut Christoph Schulze gravierendste Fehler, wenn Projekte ohne saubere Initialisierung und Phasenstruktur gestartet werden?',
    options: [
      { id: 'a', text: 'Die fachliche Arbeit beginnt zu früh, obwohl Ziele, Nutzen und Zuständigkeiten noch ungeklärt sind', isCorrect: true, explanation: 'Volltreffer! Wer die Initialisierung überspringt, produziert Fehlentwicklungen, kostspielige Korrekturschleifen und Reibungsverluste.' },
      { id: 'b', text: 'Die Druckmaschine kann ohne offiziellen Projektantrag keine Sonderfarben korrekt separieren', isCorrect: false, explanation: 'Falsch: Technische Druckparameter hängen nicht von der Projektinitialisierung ab.' },
      { id: 'c', text: 'Der Projektleiter verliert automatisch das Recht, später einen Projektstrukturplan zu erstellen', isCorrect: false, explanation: 'Falsch: Ein PSP lässt sich auch nachholen, doch fehlende Zielklärung zu Beginn verursacht teure Nacharbeit.' },
      { id: 'd', text: 'Das Projektteam überspringt zwangsläufig die Norming-Phase und bleibt dauerhaft im Adjourning', isCorrect: false, explanation: 'Falsch: Das vermischt Tuckmans Teamphasen mit dem Startfehler der fachlichen Überstürzung.' }
    ],
    merksatz: 'Initialisierung klärt das OB – wer zu früh mit der Facharbeit beginnt, zahlt später drauf!'
  },
  {
    id: 'exam-41',
    chapterId: 'project-phases',
    question: 'Aufgabe 41 (Phase 2: Definition & Nicht-Ziele): Warum ist die explizite Definition von „Nicht-Zielen“ in der Definitionsphase ein unverzichtbarer Bestandteil professionellen Projektmanagements?',
    options: [
      { id: 'a', text: 'Sie schützt vor schleichender Leistungsausweitung, indem ausgeschlossene Leistungen klar abgegrenzt werden', isCorrect: true, explanation: 'Korrekt! Klare Nicht-Ziele verhindern „Scope Creep“ und bewahren das Projekt vor Termin- und Budgetkrisen.' },
      { id: 'b', text: 'Sie ersetzt den Projektstrukturplan sowie die gesamte Termin- und Ressourcenplanung in Phase 3', isCorrect: false, explanation: 'Falsch: Der PSP bleibt das zentrale Planungsinstrument und wird durch Nicht-Ziele nicht ersetzt.' },
      { id: 'c', text: 'Sie schließt jegliche Änderungswünsche des Kunden auch gegen gesonderte Zusatzvergütung aus', isCorrect: false, explanation: 'Falsch: Änderungen bleiben über Change Requests möglich, werden aber klar als Zusatzleistung erkennbar.' },
      { id: 'd', text: 'Sie legt verbindlich fest, welche Teammitglieder bei Verzögerungen aus dem Projekt ausscheiden', isCorrect: false, explanation: 'Falsch: Nicht-Ziele grenzen den fachlichen Projektumfang ab, keine personellen Sanktionen.' }
    ],
    merksatz: 'Nicht-Ziele in der Definition sind der beste Schutz vor unkontrolliertem Scope Creep!'
  },
  {
    id: 'exam-42',
    chapterId: 'project-phases',
    question: 'Aufgabe 42 (Phase 4: Steuerung nach DIN 69901-2): Welche Aussage zur Phase „Steuerung“ und der formalen Abnahme des Projektergebnisses entspricht der DIN 69901-2?',
    options: [
      { id: 'a', text: 'Die Steuerung begleitet die Umsetzung per Soll-Ist-Vergleich; die formale Ergebnisabnahme gehört noch zur Steuerung', isCorrect: true, explanation: 'Exakt! Nach DIN 69901-2 ist Umsetzung keine eigene PM-Phase, und die formale Ergebnisabnahme schließt die Steuerung vor dem Abschluss ab.' },
      { id: 'b', text: 'Die formale Abnahme des Projektergebnisses erfolgt bereits am Ende der Definitionsphase durch den Projektleiter', isCorrect: false, explanation: 'Falsch: In der Definition existiert noch kein fertiges Projektergebnis zur Abnahme.' },
      { id: 'c', text: 'Während der Steuerung darf der Projektplan bei Abweichungen oder Risiken nicht mehr angepasst werden', isCorrect: false, explanation: 'Falsch: Der Plan dient als Messbasis; bei Abweichungen wird in der Steuerung aktiv gegengesteuert.' },
      { id: 'd', text: 'Die Steuerung löst Meilensteine und Projektcontrolling ab, sobald die fachliche Umsetzung begonnen hat', isCorrect: false, explanation: 'Falsch: Meilensteine und Soll-Ist-Controlling sind gerade die Kerninstrumente der Steuerung.' }
    ],
    merksatz: 'DIN 69901-2 Prüfungsfalle: Die formale Ergebnisabnahme gehört zur Phase Steuerung!'
  },
  {
    id: 'exam-43',
    chapterId: 'project-phases',
    question: 'Aufgabe 43 (Phase 5: Abschluss & Lessons Learned): Welche Anforderung muss nach Christoph Schulze erfüllt sein, damit die Erfahrungssicherung („Lessons Learned“) für das Unternehmen einen messbaren Mehrwert stiftet?',
    options: [
      { id: 'a', text: 'Die Erkenntnisse müssen für künftige Projekte auffindbar und im Arbeitsalltag nutzbar bleiben', isCorrect: true, explanation: 'Richtig! Statt in einem statischen Bericht zu verstauben, sollten Lessons Learned in Checklisten und Schätzstandards einfließen.' },
      { id: 'b', text: 'Im Bericht sollten kritische Fehler bewusst ausgespart werden, um das Teamklima nicht zu belasten', isCorrect: false, explanation: 'Falsch: Eine ehrliche, konstruktive Fehleranalyse ist die Grundvoraussetzung für echtes Lernen.' },
      { id: 'c', text: 'Die Erfahrungssicherung muss bereits vor dem Kick-off in der Initialisierung abgeschlossen sein', isCorrect: false, explanation: 'Falsch: Lessons Learned entstehen nach der Ergebnisabnahme im Projektabschluss.' },
      { id: 'd', text: 'Eine strukturierte Erfahrungssicherung ersetzt die kaufmännische Nachkalkulation vollständig', isCorrect: false, explanation: 'Falsch: Nachkalkulation und Lessons Learned sind zwei eigenständige Bausteine des Projektabschlusses.' }
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
      { id: 'a', text: 'Weil Erfahrungen und Nachkalkulationen aus dem Abschluss direkt in die Initialisierung künftiger Projekte einfließen', isCorrect: true, explanation: 'Volltreffer! Der Pfeil von Phase 5 zurück zu Phase 1 zeigt das lernende System: Jedes Projekt verbessert Qualitäts- und Schätzstandards für das nächste.' },
      { id: 'b', text: 'Weil Projekte nach DIN-Norm grundsätzlich unbefristet laufen und niemals formal beendet werden', isCorrect: false, explanation: 'Falsch: Projekte sind per Definition zeitlich befristet; der Rückpfeil gilt dem Wissenstransfer ins nächste Projekt.' },
      { id: 'c', text: 'Weil alle fünf Projektmanagementphasen in derselben Woche zeitgleich parallel abgearbeitet werden', isCorrect: false, explanation: 'Falsch: Die Phasen folgen einer logischen Struktur, auch wenn Rückkopplungen möglich sind.' },
      { id: 'd', text: 'Weil der Auftraggeber nach jeder Projektphase den gesamten Auftrag zwingend neu ausschreiben muss', isCorrect: false, explanation: 'Falsch: Der Kreislauf symbolisiert organisatorisches Lernen, keine erneute Ausschreibungspflicht.' }
    ],
    merksatz: 'Der DIN-Kreislauf zeigt: Nach dem Abschluss ist vor der nächsten, reiferen Initialisierung!'
  }
];

export const EXAM_QUESTIONS: QuizQuestion[] = [
  ...BASE_EXAM_QUESTIONS,
  ...ihkOriginalExamQuestions,
];

export interface IhkGradeInfo {
  grade: string;
  text: string;
  pointsRange: string;
  passed: boolean;
  color: string;
}

export function calculateIhkGrade(percentage: number): IhkGradeInfo {
  if (percentage >= 92) return { grade: '1', text: 'Sehr gut', pointsRange: '100 – 92 Punkte', passed: true, color: 'text-emerald-500' };
  if (percentage >= 81) return { grade: '2', text: 'Gut', pointsRange: '91 – 81 Punkte', passed: true, color: 'text-sky-500' };
  if (percentage >= 67) return { grade: '3', text: 'Befriedigend', pointsRange: '80 – 67 Punkte', passed: true, color: 'text-indigo-500' };
  if (percentage >= 50) return { grade: '4', text: 'Ausreichend', pointsRange: '66 – 50 Punkte', passed: true, color: 'text-amber-500' };
  if (percentage >= 30) return { grade: '5', text: 'Mangelhaft', pointsRange: '49 – 30 Punkte', passed: false, color: 'text-rose-500' };
  return { grade: '6', text: 'Ungenügend', pointsRange: '29 – 0 Punkte', passed: false, color: 'text-rose-700' };
}

export interface IhkExamScenario {
  id: string;
  scenarioNumber: number; // 1 to 10
  title: string;
  subtitle: string;
  companyContext: string;
  points: number; // 10 points per Hauptaufgabe
  chapterIds: string[];
  questionIds: string[];
}

export const IHK_EXAM_SCENARIOS: IhkExamScenario[] = [
  {
    id: 'scen-1',
    scenarioNumber: 1,
    title: 'Hauptaufgabe 1: Digital-Strategie & Medienkonzeption',
    subtitle: 'Interaktionsdesign, Wireframing & Prototyping (Kapitel 1 & 2)',
    companyContext: 'Die Digitalagentur "NordMedia GmbH" entwickelt für ein kommunales Nahverkehrsunternehmen eine neue mobile Fahrplan-App. Das Team soll die Nutzerführung und das Verhalten der Anwendung vor der Programmierung konzipieren.',
    points: 10,
    chapterIds: ['ixd', 'wireframe', 'prototype'],
    questionIds: ['exam-1', 'exam-2', 'exam-4', 'exam-6'],
  },
  {
    id: 'scen-2',
    scenarioNumber: 2,
    title: 'Hauptaufgabe 2: Farbmanagement & Druckvorstufe',
    subtitle: 'Color Management, ICC-Profile & TAC Gesamtfarbauftrag (Kapitel 3)',
    companyContext: 'Die "OffsetPro Druckmedien GmbH" bereitet den Druck eines hochwertigen Kunstkatalogs im Bogenoffset (ISO Coated v2) sowie von Werbebeilagen im Zeitungsdruck (PSO SNP) vor.',
    points: 10,
    chapterIds: ['color-management'],
    questionIds: ['exam-16', 'exam-17', 'exam-22'],
  },
  {
    id: 'scen-3',
    scenarioNumber: 3,
    title: 'Hauptaufgabe 3: Bildverarbeitung & Tonwertkontrolle',
    subtitle: 'Rasterfrequenz, PPI-Auflösungsberechnung & Gradationskurven (Kapitel 4)',
    companyContext: 'Der Kunde "AutoPark GmbH" liefert Bilddaten für eine Magazin-Doppelseite im A4-Format. Vor dem Druck müssen die Tonwerte in den Tiefen angehoben und die Bildauflösung auf Eignung geprüft werden.',
    points: 10,
    chapterIds: ['raster-resolution'],
    questionIds: ['exam-18', 'exam-19', 'exam-24'],
  },
  {
    id: 'scen-4',
    scenarioNumber: 4,
    title: 'Hauptaufgabe 4: Barrierefreiheit & Usability (WCAG 2.1)',
    subtitle: 'WCAG POUR-Prinzipien, Kontrastverhältnisse & Semantik (Kapitel 5)',
    companyContext: 'Im Rahmen des Barrierefreiheitsstärkungsgesetzes (BFSG) baut die "Stadt Nordstadt" ihr Bürgerportal barrierefrei um. Screenreader und Tastaturnavigation müssen uneingeschränkt funktionieren.',
    points: 10,
    chapterIds: ['a11y'],
    questionIds: ['exam-11', 'exam-12', 'exam-25'],
  },
  {
    id: 'scen-5',
    scenarioNumber: 5,
    title: 'Hauptaufgabe 5: IT-Sicherheit & Datenschutz (DSGVO)',
    subtitle: 'Verschlüsselung, Phishing-Schutz, Impressum & DSGVO (Kapitel 6)',
    companyContext: 'Der E-Commerce-Betreiber "SecuStore Shop GmbH" erlitt Versuche von Phishing-Angriffen und muss seine Systeme sowie Nutzerformulare rechtssicher nach DSGVO schützen.',
    points: 10,
    chapterIds: ['security'],
    questionIds: ['exam-8', 'exam-9', 'exam-10'],
  },
  {
    id: 'scen-6',
    scenarioNumber: 6,
    title: 'Hauptaufgabe 6: Modernes Responsive Webdesign & Datenbanken',
    subtitle: 'CSS Grid, Flexbox, SQL-Abfragen & JSON-Formate (Kapitel 7)',
    companyContext: 'Das Modelabel "Fashion Vibe" fordert einen responsive Online-Lookbook-Catalog mit dynamischer Filtermöglichkeit und optimierter SQL-Datenbankanbindung.',
    points: 10,
    chapterIds: ['web-tech'],
    questionIds: ['exam-20', 'exam-21', 'exam-23'],
  },
  {
    id: 'scen-7',
    scenarioNumber: 7,
    title: 'Hauptaufgabe 7: Medienneutrale Daten & Ausgabepfade',
    subtitle: 'PDF/X-Standards, Transparenzen & Vektor/Raster-Transformation (Kapitel 8)',
    companyContext: 'Ein Medienhaus publiziert Inhalte zeitgleich für Digital-Publishing (Tablets), Online-Portal und High-End Offsetdruck (PDF/X-4). Der Daten-Workflow muss medienneutral aufgesetzt werden.',
    points: 10,
    chapterIds: ['data-sandbox'],
    questionIds: ['exam-14', 'exam-15', 'exam-26'],
  },
  {
    id: 'scen-8',
    scenarioNumber: 8,
    title: 'Hauptaufgabe 8: Agiles Projektmanagement & Scrum',
    subtitle: 'Product Backlog, Sprints, Scrum Master & Pflichtenheft (Kapitel 9)',
    companyContext: 'Ein Software-Startup wendet Scrum an, um ein SaaS-Dashboard in 2-wöchigen Sprints zu entwickeln. Der Product Owner priorisiert die User Stories gegen das Lastenheft.',
    points: 10,
    chapterIds: ['project'],
    questionIds: ['exam-13', 'exam-27', 'exam-28'],
  },
  {
    id: 'scen-9',
    scenarioNumber: 9,
    title: 'Hauptaufgabe 9: Wirtschafts- & Sozialkunde (WiSo)',
    subtitle: 'Vertragsarten, Fristen, Kündigungsschutz & Jugendarbeitsschutz (Kapitel 10 & 11)',
    companyContext: 'Ein frisch ausgebildeter Mediengestalter prüft seinen ersten Arbeitsvertrag, Arbeitszeitregelungen und Kündigungsfristen im gewerblichen Betrieb.',
    points: 10,
    chapterIds: ['wiso-fristen', 'wiso-basis'],
    questionIds: ['exam-29', 'exam-30', 'exam-31', 'exam-34'],
  },
  {
    id: 'scen-10',
    scenarioNumber: 10,
    title: 'Hauptaufgabe 10: DIN 69901-2 PM-Kreislauf & Tuckman-Modell',
    subtitle: 'Die 5 PM-Phasen, Scope-Schutz & Teamentwicklungs-Führungsstile (Kapitel 12)',
    companyContext: 'Die Agenturleitung analysiert ein Großprojekt: Von der Initialisierung über die Definitionsphase (Nicht-Ziele) bis zum geordneten Abschluss und Tuckman-Teamphasen.',
    points: 10,
    chapterIds: ['project-phases'],
    questionIds: ['exam-35', 'exam-36', 'exam-37', 'exam-40', 'exam-41', 'exam-42', 'exam-44'],
  },
];
