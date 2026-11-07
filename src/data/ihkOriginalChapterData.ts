import { Chapter } from '../types/quiz';

export const IHK_ORIGINAL_CHAPTER: Chapter = {
  id: 'ihk-original-teil1',
  number: 11,
  title: 'IHK Original-Prüfung Teil 1 (12 Aufgaben)',
  subtitle: 'Das finale Abschluss-Kapitel am Ende des IHK-Lernpfads (Lvl 1 & Lvl 2)',
  description: 'Durchlaufe alle 12 Aufgaben aus den 5 gedruckten IHK-Prüfungsseiten mit allen Teilaufgaben (a, b, c, d) als vollständiges Quiz mit Level 1 (Fakten) & Level 2 (Rechenwege & Transfer).',
  accentColor: 'purple',
  examMerksatz: '120 Punkte insgesamt: Medienneutralität, Bildauflösungen, Farbräume, Datentiefe, Gradation und Digital-Asset-Management sicher beherrschen!',
  examChecklist: [
    { task: 'Aufgabe 1: Medienneutrale Daten', detail: 'Single Source of Truth, ECI-Farbräume, verlustfreie Masterdateien & Namenskonventionen.' },
    { task: 'Aufgabe 2: Grafikformate', detail: 'EPS, GIF, SVG, PNG-24, TIFF – Vor- und Nachteile für Print und Web.' },
    { task: 'Aufgabe 3: Gestaltungsprozess & Briefing', detail: 'Zweck des Briefings, Erfassungsbereiche und Risiken unvollständiger Vorgaben.' },
    { task: 'Aufgabe 4: Datentiefe & Histogramm', detail: '8 Bit (256 Tonwerte) vs. 16 Bit (65.536 Tonwerte), RAW vs. TIFF, Tonwertabrisse.' },
    { task: 'Aufgabe 5: Vektoren vs. Pixel', detail: 'Mathematische Pfade vs. Rasterpunkte, Skalierungsartefakte auf Großformaten.' },
    { task: 'Aufgabe 6: Recherche & Moodboard', detail: 'Recherchezweck, Moodboards zur Stimmungsfindung und Briefing-Abgleich.' },
    { task: 'Aufgabe 7: Farbmanagement & Zeitungsdruck', detail: 'ISO Coated v2 300% vs. ISOnewspaper 240%, Punktzuwachs & Papier-Saugfähigkeit.' },
    { task: 'Aufgabe 8: Multi-Channel-Publishing', detail: 'Trennung von Inhalt & Form, PIM-Systeme, Wiederverwendung für Print & Web.' },
    { task: 'Aufgabe 9: Effektiv-PPI & Rechenweg', detail: '1800px / (18cm / 2,54) = 254 ppi (< 300 ppi gefordert). Max. Druckbreite 15,24cm.' },
    { task: 'Aufgabe 10: Web-Bildaufbereitung & Motiv', detail: '1300x867 -> 960x640px, CMYK->sRGB, TIFF->WebP, Kritik Ferkel-Makromotiv.' },
    { task: 'Aufgabe 11: Gradationskurve (Tunnel)', detail: 'Schattenaufhellung im Dreivierteltonbereich, Lichterfixierung, Vermeidung von Rauschen.' },
    { task: 'Aufgabe 12: Metadaten & DAM', detail: 'IPTC/EXIF/XMP, Rechteverwaltung, Vermeidung von Dubletten im Unternehmen.' }
  ],
  modules: [
    // MODUL 1 (AUFGABE 1)
    {
      id: 'ihk-orig-1',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 1: Medienneutrale Daten & Strukturierung',
      shortDesc: 'Strukturierungsmethoden, RGB-Master & Vorteile (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 6,
      nuggets: [
        {
          id: 'n-ihk-1-1',
          title: 'Medienneutrale Datenhaltung (Single Source of Truth)',
          coreConcept: 'Master-Dateien liegen hochauflösend und universell vor und werden erst beim finale Export in Zielmedien gewandelt.',
          bulletPoints: [
            'Teil a (3 Punkte): Logische Ordnerstrukturen, einheitliche Namenskonventionen, metadatenbasiertes Tagging.',
            'Teil b (3 Punkte): Master-Dateien im RGB-Farbraum (eciRGBv2/AdobeRGB) und verlustfreien Formaten (TIFF/RAW).',
            'Teil c (4 Punkte): Single Source of Truth verhindert redundante Bearbeitung und sichert Zukunftssicherheit.'
          ],
          examFavorite: true,
          merksatz: 'Medienneutral = In RGB vorhalten, erst beim Export in Ziel-CMYK oder WebP umwandeln!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-1-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: 'Aufgabe 1a (3 Punkte): Welche drei Möglichkeiten eignen sich zur sachgerechten Datenstrukturierung eines Kundenbestands?',
          options: [
            { id: 'a', text: 'Einheitliche Verzeichnishierarchie, klare Namenskonventionen und Einbettung von Metadaten', isCorrect: true, explanation: 'Richtig! Das entspricht exakt den 3 Punkten aus Teilaufgabe a).' },
            { id: 'b', text: 'Speichern aller Dateien ungeordnet auf dem Desktop', isCorrect: false, explanation: 'Das führt zu Chaos und Redundanzen.' },
            { id: 'c', text: 'Ausschließliche Vergabe von Zufallsnummern ohne Projektbezug', isCorrect: false, explanation: 'Dateinamen müssen systematisch sein.' },
            { id: 'd', text: 'Löschen der Original-Rohdaten nach dem ersten Druck', isCorrect: false, explanation: 'Rohdaten sind das Master-Fundament.' }
          ]
        },
        {
          id: 'q-ihk-1-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: 'Aufgabe 1b (3 Punkte): Was zeichnet medienneutrale Daten bezüglich Farbraum und Format aus?',
          options: [
            { id: 'a', text: 'Sie liegen im hochauflösenden RGB-Farbraum (z.B. eciRGBv2) in verlustfreien Formaten vor und werden erst beim Export in Ziel-Farbräume konvertiert', isCorrect: true, explanation: 'Richtig! Das schützt vor frühem Farbraumverlust.' },
            { id: 'b', text: 'Sie werden sofort in 8-Bit CMYK abgespeichert, um Speicherplatz zu sparen', isCorrect: false, explanation: 'Falsch. CMYK beschränkt den Farbraum frühzeitig.' },
            { id: 'c', text: 'Sie dürfen ausschließlich als GIF-Dateien gespeichert werden', isCorrect: false, explanation: 'GIF bietet nur 256 Farben.' },
            { id: 'd', text: 'Sie sind immer Schwarz-Weiß-Grafiken', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-1-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: 'Aufgabe 1c (4 Punkte): Welche zwei Hauptvorteile bietet die medienneutrale Datenhaltung im Medienbetrieb?',
          options: [
            { id: 'a', text: '1. Zeitersparnis & Redundanzvermeidung (Single Source of Truth); 2. Maximale Qualitäts- & Zukunftssicherheit für neue Medienkanäle', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für Teilaufgabe c)!' },
            { id: 'b', text: '1. Druckfarben werden billiger; 2. Webseiten benötigen keinen Server mehr', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'c', text: '1. Schriften müssen nicht mehr lizenziert werden; 2. Tastaturkürzel ändern sich automatisch', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '1. Alle Bilder werden zu Vektoren; 2. Dateien löschen sich nach 30 Tagen von selbst', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-1-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: '[IHK Transfer] Eine Werbeagentur soll Bildmaterial für einen gedruckten Produktkatalog (Offset) und eine Mobile-App bereitstellen. Erläutere das optimale Vorgehen nach IHK-Standard.',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 1: Der Kundenbestand soll für die medienneutrale Nutzung neu organisiert werden.',
          options: [
            { id: 'a', text: 'Das Master-Bild im universellen RGB-Farbraum (eciRGBv2) als verlustfreies TIFF/RAW pflegen und per automatisiertem Export in ISO Coated v2 für Print und sRGB/WebP für Mobile umwandeln', isCorrect: true, explanation: 'Exakte IHK-Meisterlösung!' },
            { id: 'b', text: 'Das Master-Bild in CMYK anlegen und für die App einfach den Bildschirm abfotografieren', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Alle Bilder als stark komprimiertes JPEG mit 72 ppi als Master verwenden', isCorrect: false, explanation: '72 ppi ist im Print unzureichend.' },
            { id: 'd', text: 'Sämtliche Bilder vorab in den Zeitungsdruck-Farbraum konvertieren', isCorrect: false, explanation: 'Zeitungsdruck schränkt den Farbraum extrem ein.' }
          ]
        },
        {
          id: 'l2-ihk-1-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: '[IHK Transfer] Warum führt die klassische Gewohnheit, Bilder direkt beim Import in CMYK zu wandeln, zu Qualitätsverlusten im Crossmedia-Workflow?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 1: Bewertung von Farbraumkonvertierungen.',
          options: [
            { id: 'a', text: 'Weil CMYK einen deutlich kleineren Farbumfang hat als RGB; einmal abgeschnittene gesättigte Farben gehen für Web/HDR unwiederbringlich verloren', isCorrect: true, explanation: 'Exakt! Der CMYK-Farbraum beschneidet leuchtende RGB-Farben permanent.' },
            { id: 'b', text: 'Weil CMYK-Dateien im Browser zur Explosion des Arbeitsspeichers führen', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil Druckereien keine CMYK-Dateien annehmen', isCorrect: false, explanation: 'Druckereien benötigen CMYK zur Ausgabe.' },
            { id: 'd', text: 'Es gibt keinen Unterschied zwischen RGB und CMYK im Farbumfang', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 2 (AUFGABE 2)
    {
      id: 'ihk-orig-2',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 2: Grafikformate für Print & Web (Firmenlogo)',
      shortDesc: 'EPS, GIF, SVG, PNG-24, TIFF im Vor- und Nachteile-Vergleich (10 Punkte)',
      estimatedMinutes: 6,
      nuggets: [
        {
          id: 'n-ihk-2-1',
          title: 'Grafikformate im IHK-Überblick',
          coreConcept: 'Auswahl des richtigen Formats nach Anwendungsbereich (Vektor vs. Pixel, Print vs. Web, Transparenz).',
          bulletPoints: [
            'EPS (2 Pkt): Vektorbasiertes Druckformat, veraltet im Web.',
            'GIF (2 Pkt): Max. 256 Farben, 1-Bit Transparenz, veraltet für Logos.',
            'SVG (2 Pkt): Vektorbasiert, stufenlos skalierbar, ideal fürs Web.',
            'PNG-24 (2 Pkt): Pixelformat, 16,7 Mio. Farben, Alpha-Transparenz.',
            'TIFF (2 Pkt): Verlustfreies Pixelformat für die Druckvorstufe.'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-2-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: 'Aufgabe 2 - SVG (2 Punkte): Warum ist das SVG-Format die erste Wahl für ein Logo im Internet?',
          options: [
            { id: 'a', text: 'Weil es vektorbasiert ist, stufenlos ohne Schärfeverlust skaliert und sehr kleine Dateigrößen besitzt', isCorrect: true, explanation: 'Richtig! SVG ist der moderne W3C-Standard für Vektoren im Web.' },
            { id: 'b', text: 'Weil es ausschließlich im CMYK-Farbraum funktioniert', isCorrect: false, explanation: 'SVG nutzt im Web RGB.' },
            { id: 'c', text: 'Weil es Rasterbilder automatisch in 3D-Modelle umwandelt', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Weil es von Browsern ohne Internetverbindung nicht geladen wird', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-2-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: 'Aufgabe 2 - GIF vs. PNG-24 (4 Punkte): Welche Beschränkung hat GIF gegenüber PNG-24 bei Transparenzen und Farben?',
          options: [
            { id: 'a', text: 'GIF bietet max. 256 Farben und nur harte 1-Bit-Transparenz; PNG-24 hat 16,7 Mio. Farben und stufenlose Alpha-Transparenz', isCorrect: true, explanation: 'Exakte IHK-Gegenüberstellung aus den Bewertungskriterien!' },
            { id: 'b', text: 'GIF bietet mehr Farben als PNG-24', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'PNG-24 kann keine transparenten Hintergründe darstellen', isCorrect: false, explanation: 'PNG-24 ist genau dafür berühmt.' },
            { id: 'd', text: 'GIF ist ein Vektorformat, PNG ein Videoformat', isCorrect: false, explanation: 'Beide sind Rastergrafikformate.' }
          ]
        },
        {
          id: 'q-ihk-2-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: 'Aufgabe 2 - EPS & TIFF (4 Punkte): Wie unterscheiden sich EPS und TIFF für den Einsatz im Printmedium?',
          options: [
            { id: 'a', text: 'EPS speichert vektorbasierte Pfade; TIFF ist ein hochauflösendes, verlustfreies Pixelformat für Rasterbilder', isCorrect: true, explanation: 'Richtig! EPS = Vektor, TIFF = Pixel.' },
            { id: 'b', text: 'EPS ist nur für Audio, TIFF für Text', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'TIFF ist ein komprimiertes Videoformat', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'EPS kann keine Vektoren enthalten', isCorrect: false, explanation: 'EPS ist ein Encapsulated PostScript Vektorformat.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-2-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: '[IHK Original Seite 1] Ein Firmenlogo soll sowohl im Druck als auch im Internet verwendet werden. Erläutere die Eignung der 5 Formate (EPS, GIF, SVG, PNG-24, TIFF).',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 2: Vor- und Nachteile der 5 Formate (je 2 Punkte, gesamt 10 Punkte).',
          options: [
            { id: 'a', text: 'SVG für Web (Vektor), EPS/TIFF für Print, PNG-24 für Web mit Transparenz; GIF wegen 256-Farben-Beschränkung für hochwertige Logos ungeeignet', isCorrect: true, explanation: 'Vollständige IHK-Musterlösung!' },
            { id: 'b', text: 'EPS ist das beste Format für mobile Webseiten; SVG sollte nur im CMYK-Druck verwendet werden', isCorrect: false, explanation: 'Falsch herum.' },
            { id: 'c', text: 'GIF ist für großformatigen Druck auf Werbebannern am besten geeignet', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Alle 5 Formate sind für Web und Print technisch identisch einsetzbar', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-2-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: '[IHK Transfer] Warum führt die Platzierung eines GIF-Logos auf einem dunklen Website-Header oft zu einem hässlichen weißen "Säumungs-Rand" (Halo-Effekt)?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 2: Fehleranalyse bei Transparenzen.',
          options: [
            { id: 'a', text: 'Weil GIF keine Anti-Aliasing-Transparenz (Alpha-Kanal) unterstützt und Kanten-Pixel gegen den ursprünglichen hellen Hintergrund gerendert wurden', isCorrect: true, explanation: 'Richtig! Durch 1-Bit-Transparenz fehlen weiche Übergangspixel.' },
            { id: 'b', text: 'Weil GIF-Dateien im Browser automatisch invertiert werden', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil der Monitor defekt ist', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Weil GIF-Dateien nur im Druck funktionieren', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 3 (AUFGABE 3)
    {
      id: 'ihk-orig-3',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 3: Gestaltungsprozess & Kundenbriefing',
      shortDesc: 'Funktion, Erfassungsbereiche & Risiken unklarer Vorgaben (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 6,
      nuggets: [
        {
          id: 'n-ihk-3-1',
          title: 'Das Kundenbriefing im Gestaltungsprozess',
          coreConcept: 'Verbindliche Arbeits- und Informationsgrundlage zwischen Kunde und Agentur vor Entwurfsbeginn.',
          bulletPoints: [
            'Teil a (2 Pkt): Funktion als verbindliche Orientierungs- und Informationsgrundlage.',
            'Teil b (4 Pkt): 4 Informationen (Zielgruppe, Markenwerte, Formate/Medien, Termine).',
            'Teil c (4 Pkt): 2 Probleme bei unvollständigem Briefing (Gestaltung am Ziel vorbei, Zeitverzug/Mehrkosten).'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-3-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: 'Aufgabe 3a (2 Punkte): Erläutere die Funktion eines Briefings innerhalb des Gestaltungsprozesses.',
          options: [
            { id: 'a', text: 'Es dient als verbindliche Informations- und Orientierungsgrundlage für die Konzeption und Gestaltung', isCorrect: true, explanation: 'Richtig! Es sichert ab, dass Agentur und Kunde dasselbe Ziel verfolgen.' },
            { id: 'b', text: 'Es ist die finale Druckfreigabe nach Projektabschluss', isCorrect: false, explanation: 'Das Briefing steht am Anfang.' },
            { id: 'c', text: 'Es ist die Rechnung für die Druckerei', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es ersetzt den Arbeitsvertrag des Designers', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-3-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: 'Aufgabe 3b (4 Punkte): Nenne vier wichtige Informationen, die vor der Bearbeitung im Briefing geklärt werden sollten.',
          options: [
            { id: 'a', text: '1. Zielgruppe; 2. Projektziele/Botschaft; 3. Medienkanäle/Formate; 4. Corporate Identity & Zeitrahmen', isCorrect: true, explanation: 'Richtig! Das sind die 4 geforderten Informationsbereiche.' },
            { id: 'b', text: '1. Kaffeemarke des Kunden; 2. Urlaubszeiten der Druckerei; 3. Wetter am Abgabetag; 4. Tastaturlayout', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'c', text: '1. Gehalt des Designers; 2. Strompreis; 3. Monitorauflösung; 4. Papiergewicht', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es müssen vorab keine Informationen geklärt werden', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-3-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: 'Aufgabe 3c (4 Punkte): Erläutere zwei mögliche Probleme, die bei einem unvollständigen oder unklaren Briefing entstehen.',
          options: [
            { id: 'a', text: '1. Entwürfe am Kundenwunsch / an der Zielgruppe vorbei; 2. Erheblicher Zeitverzug und Mehrkosten durch fehlgeschlagene Korrekturschleifen', isCorrect: true, explanation: 'Exakte IHK-Musterantwort aus Teil c)!' },
            { id: 'b', text: '1. Der Rechner stürzt ab; 2. Der Drucker verliert Strom', isCorrect: false, explanation: 'Das sind technische Ausfälle.' },
            { id: 'c', text: '1. Die Schriften löschen sich; 2. Das Bild wird zu Schwarz-Weiß', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es entstehen keine Probleme, da ohne Briefing freier gearbeitet wird', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-3-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: '[IHK Original Seite 1] Eine Werbeagentur entwickelt eine Anzeigenkampagne für einen regionalen Bio-Lieferservice. Wie begegnet die Agentur unklaren Vorgaben im Kundengespräch?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 3: Professionelles Vorgehen im Briefing-Prozess.',
          options: [
            { id: 'a', text: 'Durch ein strukturierte Re-Briefing / Protokollabgleich, in dem offene Punkte schriftlich präzisiert und vom Kunden gegengezeichnet werden', isCorrect: true, explanation: 'Richtig! Das Re-Briefing schützt vor Missverständnissen.' },
            { id: 'b', text: 'Einfach nach eigenem Bauchgefühl gestalten ohne Rückfrage', isCorrect: false, explanation: 'Erzeugt hohes Reklamationsrisiko.' },
            { id: 'c', text: 'Den Auftrag sofort fristlos stornieren', isCorrect: false, explanation: 'Übertrieben.' },
            { id: 'd', text: 'Die Gestaltung vollständig an eine KI auslagern', isCorrect: false, explanation: 'Löst das unklare Kundenbriefing nicht.' }
          ]
        },
        {
          id: 'l2-ihk-3-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: '[IHK Transfer] Warum ist die exakte Definition der Zielgruppe im Briefing entscheidend für die spätere Wahl von Farben, Typografie und Tonalität?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 3: Zielgruppenanalyse.',
          options: [
            { id: 'a', text: 'Weil unterschiedliche Zielgruppen auf visuelle Codes (z.B. Bio-Siegel, nachhaltige Erdtöne vs. knallige Discountsymbole) emotional anders reagieren', isCorrect: true, explanation: 'Richtig! Die Visuals müssen zur Erwartungshaltung der Zielgruppe passen.' },
            { id: 'b', text: 'Weil Zielgruppen im Druckereiserver als Farbprofil hinterlegt werden', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil Schriften je nach Alter der Zielgruppe gesetzlich verboten sind', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Zielgruppen haben keinen Einfluss auf das Design', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 4 (AUFGABE 4)
    {
      id: 'ihk-orig-4',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 4: Dateiformate TIFF vs RAW, Datentiefe & Histogrammanalyse',
      shortDesc: 'TIFF vs. RAW, 8 vs. 16 Bit & Histogramm-Kammbildung (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 7,
      nuggets: [
        {
          id: 'n-ihk-4-1',
          title: 'Datentiefe & Tonwertkorrektur im Histogramm',
          coreConcept: 'Höhere Bit-Tiefe bietet Reserven für verlustfreie Kontrast- und Farbanpassungen.',
          bulletPoints: [
            'Teil a (2 Pkt): Vorteile TIFF (druckfertig/kompatibel) vs. RAW (unverarbeitet/16-Bit Dynamik).',
            'Teil b (2 Pkt): 8 Bit = 256 Tonwerte; 16 Bit = 65.536 Tonwerte pro Kanal.',
            'Teil c (6 Pkt): Histogrammanalyse – Lücken/Kämme bei 8 Bit durch Kontrastspreizung.'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-4-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-4',
          question: 'Aufgabe 4a (2 Punkte): Beschreibe jeweils einen Vorteil von TIFF und RAW für die Bildbearbeitung.',
          options: [
            { id: 'a', text: 'TIFF ist universell kompatibel und druckfertig; RAW bietet als Rohdatei den maximalen Dynamikumfang und verlustfreie Korrekturreserven', isCorrect: true, explanation: 'Richtig! Das entspricht genau den beiden Vorteilen.' },
            { id: 'b', text: 'TIFF ist vektorbasiert; RAW ist ein Videoformat', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'RAW hat kleinere Dateigrößen als JPEG', isCorrect: false, explanation: 'RAW ist unkomprimiert und sehr groß.' },
            { id: 'd', text: 'TIFF kann nur Schwarz-Weiß speichern', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-4-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-4',
          question: 'Aufgabe 4b (2 Punkte): Wie viele Tonwertabstufungen pro Kanal sind bei 8 Bit bzw. 16 Bit Datentiefe möglich?',
          options: [
            { id: 'a', text: '8 Bit = 256 Tonwerte; 16 Bit = 65.536 Tonwerte pro Kanal', isCorrect: true, explanation: 'Richtig! 2^8 = 256 und 2^16 = 65.536.' },
            { id: 'b', text: '8 Bit = 8 Tonwerte; 16 Bit = 16 Tonwerte', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: '8 Bit = 1.000 Tonwerte; 16 Bit = 2.000 Tonwerte', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Beide Datentiefen haben exakt dieselbe Anzahl', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-4-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-4',
          question: 'Aufgabe 4c (6 Punkte): Erläutere anhand von Histogramm Abb. 1 (8 Bit) die Entstehung von Qualitätsverlusten bei Tonwertkorrekturen.',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 4c: Histogrammanalyse.',
          asset: {
            type: 'histogram',
            title: 'Histogramm Abb. 1: Tonwertverteilung & Lückenbildung',
            subtitle: 'Analysiere die Lücken (Kämme) in den 256 Tonwertstufen nach einer Kontrastspreizung.',
            description: 'Bei 8 Bit stehen lediglich 256 diskrete Tonwerte pro Farbkanal zur Verfügung. Wird ein flaues Bild stark im Kontrast gedehnt, entstehen unbesetzte Tonwertstufen (Lücken/Kämme im Histogramm). Die Folge sind sichtbare Farbabrisse und Posterisation.',
            highlights: ['8-Bit Dynamik = 256 Stufen', 'Sichtbarer Tonwertabriss', 'Kammbildung im Diagramm']
          },
          options: [
            { id: 'a', text: 'Durch Spreizung geringer Tonwerte (256 Stufen) entstehen Lücken im Histogramm (Kammbildung); sichtbare Tonwertabrisse/Posterisation sind die Folge', isCorrect: true, explanation: 'Exakte IHK-Erklärung aus Teil c)!' },
            { id: 'b', text: 'Zacken im Histogramm bedeuten, dass das Bild schärfer geworden ist', isCorrect: false, explanation: 'Falsch. Kämme bedeuten fehlende Daten.' },
            { id: 'c', text: 'Das Histogramm zeigt die Seitenzahl des Dokuments', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Bei 8 Bit entstehen niemals Qualitätsverluste', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-4-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-4',
          question: '[IHK Original Seite 2] Vergleiche Abb. 1 (8 Bit, Kammbildung) mit Abb. 2 (16 Bit, glatter Verlauf) nach einer starken Aufhellung der Schatten.',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 4: Einfluss der Datentiefe.',
          options: [
            { id: 'a', text: 'Abb. 2 (16 Bit) bietet durch 65.536 Stufen genügend mathematische Zwischenwerte, sodass die Aufhellung ohne sichtbare Tonwertabrisse glatt verläuft', isCorrect: true, explanation: 'Vollständige IHK-Musterlösung!' },
            { id: 'b', text: 'Abb. 1 ist besser, weil es weniger Speicherplatz verbraucht', isCorrect: false, explanation: 'Qualitativ ist Abb. 2 weitaus überlegen.' },
            { id: 'c', text: 'Abb. 2 zeigt ein Vektorbild ohne Farbkanäle', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Beide Histogramme zeigen identische Bildqualität', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-4-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-4',
          question: '[IHK Transfer] Warum sollte die grundlegende Weißabgleich- und Belichtungskorrektur bevorzugt im RAW-Converter und nicht erst in ein exportierten 8-Bit-JPEG erfolgen?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 4: Workflow-Optimierung.',
          options: [
            { id: 'a', text: 'Weil der RAW-Converter auf unkomprimierte Sensor-Rohdaten in 16 Bit zugreift; im 8-Bit JPEG sind verworfene Lichter/Schatten fest eingebrannt', isCorrect: true, explanation: 'Richtig! RAW behält reservierte Zeichnung in den Extremwerten.' },
            { id: 'b', text: 'Weil JPEGs im RAW-Converter nicht geöffnet werden dürfen', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil JPEG-Dateien keine Farben enthalten', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es macht qualitativ keinen Unterschied', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 5 (AUFGABE 5)
    {
      id: 'ihk-orig-5',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 5: Vektorgrafiken vs. Pixelbilder',
      shortDesc: 'Unterschiede, SVG-Vergrößerung & Banner-Probleme (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 6,
      nuggets: [
        {
          id: 'n-ihk-5-1',
          title: 'Vektor vs. Pixel auf Großformaten',
          coreConcept: 'Vektoren basieren auf Pfaden und sind verlustfrei skalierbar; Pixelbilder verpixeln bei Vergrößerung.',
          bulletPoints: [
            'Teil a (4 Pkt): Vektoren = Pfade/Formeln (auflösungsunabhängig); Pixel = Farbraster (auflösungsabhängig).',
            'Teil b (2 Pkt): SVG berechnet mathematische Kurven bei Vergrößerung neu.',
            'Teil c (4 Pkt): PNG (500x300px) auf Banner (3x2m) bewirkt Treppeneffekte und Unschärfe.'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-5-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: 'Aufgabe 5a (4 Punkte): Erläutere zwei grundlegende technische Unterschiede zwischen Vektorgrafiken und Pixelbildern.',
          options: [
            { id: 'a', text: '1. Vektoren bestehen aus mathematischen Pfaden (auflösungsunabhängig); 2. Pixelbilder bestehen aus einem festen Raster von Farbpixeln (auflösungsabhängig)', isCorrect: true, explanation: 'Richtig! Das entspricht exakt den 4 Punkten aus Teil a).' },
            { id: 'b', text: '1. Vektoren sind immer Schwarz-Weiß; 2. Pixelbilder haben nur 3 Farben', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: '1. Pixelbilder können beliebig vergrößert werden; 2. Vektoren verpixeln sofort', isCorrect: false, explanation: 'Falsch herum.' },
            { id: 'd', text: 'Es gibt keine technischen Unterschiede', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-5-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: 'Aufgabe 5b (2 Punkte): Erkläre, warum die SVG-Datei für eine starke Vergrößerung des Logos besser geeignet ist als die PNG-Datei.',
          options: [
            { id: 'a', text: 'Weil SVG-Pfade bei jeder Skalierung mathematisch neu berechnet werden und Kanten stets gestochen scharf bleiben', isCorrect: true, explanation: 'Richtig! Vektoren verlieren nie an Schärfe.' },
            { id: 'b', text: 'Weil SVG-Dateien im Druck immer 300 ppi erzwingen', isCorrect: false, explanation: 'Vektoren haben keinen ppi-Faktor.' },
            { id: 'c', text: 'Weil PNG nur auf Monitoren mit 10 Zoll Diagonale funktioniert', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Weil SVG-Dateien automatisch gedruckt werden ohne Druckerei', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-5-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: 'Aufgabe 5c (4 Punkte): Beschreibe zwei mögliche technische Probleme beim Einsatz der PNG-Datei (500 x 300px) auf einem Werbebanner (3 x 2m).',
          options: [
            { id: 'a', text: '1. Extreme Treppeneffekte / Pixelierung an Kanten; 2. Unscharfe, matschige Darstellung durch zu geringe effektive ppi-Auflösung', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für Teil c)!' },
            { id: 'b', text: '1. Banner brennt beim Druck ab; 2. Farbe wird zu Wasser', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'c', text: '1. Das Logo spiegelt sich automatisch; 2. Der Text wird unlesbar klein', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es entstehen keine Probleme', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-5-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: '[IHK Transfer] Berechne die effektive Auflösung in ppi, wenn das PNG-Logo (500 Pixel Breite) auf einem Werbebanner mit 200 cm Logobreite gedruckt würde.',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 5: Effektiv-Auflösungsberechnung.',
          options: [
            { id: 'a', text: '200 cm / 2,54 = 78,74 Zoll -> 500 px / 78,74 Zoll = ca. 6,35 ppi (extremer Qualitätsverlust)', isCorrect: true, explanation: 'Exakter Rechenweg! 6,35 ppi ist völlig unbrauchbar.' },
            { id: 'b', text: '300 ppi', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: '150 ppi', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '72 ppi', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-5-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: '[IHK Transfer] Wann muss eine Vektorgrafik im Produktionsprozess zwingend gerastert (in Pixel gewandelt) werden?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 5: Rasterungsprozesse.',
          options: [
            { id: 'a', text: 'Beim finale Druck-RIP (Raster Image Processor) zur Erzeugung von Druckrastern oder beim Export in Pixelformate für Web-Bitmaps', isCorrect: true, explanation: 'Richtig! Die Belichtungseinheit/Drucker benötigt am Ende Belichtungspixel.' },
            { id: 'b', text: 'Bereits vor der ersten Skizze im Entwurf', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Vektorgrafiken werden niemals gerastert', isCorrect: false, explanation: 'Falsch, Druckplatten belichten Rasterpunkte.' },
            { id: 'd', text: 'Sobald die Datei auf einen USB-Stick kopiert wird', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 6 (AUFGABE 6)
    {
      id: 'ihk-orig-6',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 6: Recherche, Moodboard & Entwurfsprozess',
      shortDesc: 'Kulturzentrum Identity, Visualisierungsmethoden & Briefing-Abgleich (Teil a, b, c, d - 10 Punkte)',
      estimatedMinutes: 7,
      nuggets: [
        {
          id: 'n-ihk-6-1',
          title: 'Der Entwurfsprozess im Corporate Design',
          coreConcept: 'Von der Zielgruppenanalyse über das Moodboard bis zur Visualisierung und Abstimmung.',
          bulletPoints: [
            'Teil a (2 Pkt): Zweck Recherche (Zielgruppenverständnis, Vermeidung von Fehlentwürfen).',
            'Teil b (3 Pkt): Nutzen Moodboard (Festlegung Farbwelt, Bildsprache, Kundendialog).',
            'Teil c (3 Pkt): 3 Visualisierungen (Skizzen, Wireframes/Mockups, Prototypen).',
            'Teil d (2 Pkt): Briefing-Abgleich zur Sicherstellung aller Vorgaben.'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-6-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6a (2 Punkte): Beschreibe den Zweck einer Recherche- und Analysephase im Gestaltungsprozess.',
          options: [
            { id: 'a', text: 'Erfassung von Zielgruppe, Wettbewerbsumfeld und Markenwerten zur geschmacklich objektiven Fundierung des Entwurfs', isCorrect: true, explanation: 'Richtig! Verhindert subjektive Fehlgestaltung.' },
            { id: 'b', text: 'Berechnung der Druckkosten vor der Logoentwicklung', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Kauf von neuen Computern', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Schulung des Kunden in Photoshop', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-6-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6b (3 Punkte): Erläutere, wie ein Moodboard zur Entwicklung eines Gestaltungskonzepts beiträgt.',
          options: [
            { id: 'a', text: 'Es visualisiert die angestrebte emotionale Stimmung, Farbwelt und Typografie und schafft ein gemeinsames visuelles Verständnis mit dem Kunden', isCorrect: true, explanation: 'Exakte IHK-Antwort aus Teil b)!' },
            { id: 'b', text: 'Es ist die fertige Druckdatei für den Katalog', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Es berechnet den Farbverbrauch des Druckers', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es dient zur rechtlichen Absicherung beim Patentamt', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-6-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6c (3 Punkte): Nenne drei Möglichkeiten, erste Gestaltungsideen zu visualisieren.',
          options: [
            { id: 'a', text: '1. Skizzen / Scribbles; 2. Moodboards; 3. Layout-Entwürfe / Wireframes / Mockups', isCorrect: true, explanation: 'Richtig! Das sind die 3 geforderten Visualisierungsformen.' },
            { id: 'b', text: '1. HTML-Code; 2. SQL-Datenbanken; 3. C++ Programme', isCorrect: false, explanation: 'Das sind Programmiersprachen.' },
            { id: 'c', text: '1. Telefonate; 2. Rechnungen; 3. Lieferscheine', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '1. Audiospuren; 2. Video-Trailer; 3. 3D-Drucke', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-6-4',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6d (2 Punkte): Erläutere, warum entwickelte Entwürfe mit den Anforderungen des Briefings abgeglichen werden müssen.',
          options: [
            { id: 'a', text: 'Um sicherzustellen, dass die Zielgruppenanforderungen, Botschaften und CI-Vorgaben eingehalten wurden und Fehlentwürfe verhindert werden', isCorrect: true, explanation: 'Exakte IHK-Erklärung aus Teil d)!' },
            { id: 'b', text: 'Damit der Designer beweist, dass er die Schriftarten gelesen hat', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil ohne Briefing-Abgleich kein Gehalt ausgezahlt werden darf', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Weil Briefings nach 24 Stunden verfallen', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-6-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: '[IHK Original Seite 3] Eine Agentur entwickelt ein Erscheinungsbild für ein neu gegründetes Kulturzentrum. Wie verhindert die Agentur, dass Entwürfe am Kundenwunsch vorbeilaufen?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 6: Strategische Entwurfsabstimmung.',
          options: [
            { id: 'a', text: 'Durch frühzeitige Präsentation von Moodboards und Scribbles sowie kontinuierlichen Abgleich mit den Zielgruppen-Kriterien des Briefings', isCorrect: true, explanation: 'Vollständige IHK-Musterlösung!' },
            { id: 'b', text: 'Durch stures Festhalten am ersten Entwurf ohne Kundenrücksprache', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Indem man den Kunden erst nach der fertigen Druckauflage einbezieht', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Indem alle Gestaltungselemente vom Kunden selbst gezeichnet werden', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-6-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: '[IHK Transfer] Welcher Unterschied besteht zwischen einem Scribble und einem Mockup in der Nutzenstiftung für den Entwurfsprozess?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 6: Visualisierungsebenen.',
          options: [
            { id: 'a', text: 'Scribbles dienen der schnellen, spontanen Ideenfindung im Team; Mockups zeigen das detaillierte visuelle Endergebnis (Bilder, Farben, Typo) zur Kundenfreigabe', isCorrect: true, explanation: 'Richtig! Grobkonzept (Scribble) vs. Feinkonzept (Mockup).' },
            { id: 'b', text: 'Scribbles sind klickbare Prototypen, Mockups Papierzeichnungen', isCorrect: false, explanation: 'Falsch herum.' },
            { id: 'c', text: 'Scribbles werden programmiert, Mockups fotografiert', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es gibt keinen Unterschied', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 7 (AUFGABE 7)
    {
      id: 'ihk-orig-7',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 7: Farbmanagement & Zeitungsdruck',
      shortDesc: 'ISO Coated v2 (300%) vs. Zeitungsdruck (ISOnewspaper 240%) (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 7,
      nuggets: [
        {
          id: 'n-ihk-7-1',
          title: 'Farbprofile & Gesamtfarbauftrag im Zeitungsdruck',
          coreConcept: 'Unterschiedliche Papiersorten erfordern angepasste Farbprofile und begrenzte Farbaufträge.',
          bulletPoints: [
            'Teil a (3 Pkt): Warum ISO Coated v2 (300%) auf Zeitungspapier ungeeignet ist (Saugfähigkeit, Punktzuwachs).',
            'Teil b (4 Pkt): Profilkonvertierung nach ISOnewspaper / PSO SNP Paper mit TAC max. 240%.',
            'Teil c (3 Pkt): Vermeidung von Ablegen, Durchschlagen und Trocknungsproblemen.'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-7-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: 'Aufgabe 7a (3 Punkte): Erläutere, warum das Profil ISO Coated v2 (300%) für den Zeitungsdruck NICHT ohne Weiteres geeignet ist.',
          asset: {
            type: 'tac_chart',
            title: 'Gesamtfarbauftrag (TAC): ISO Coated v2 (300%) vs. ISOnewspaper (240%)',
            subtitle: 'Unterscheidliche Papierqualitäten verlangen streng begrenzte Tinten-/Farbmengen.',
            description: 'Zeitungspapier (PSO SNP Paper) ist ungestrichen, rau und extrem saugfähig. Ein Farbauftrag von 300% (C+M+Y+K) führt zu starkem Punktzuwachs, Ablegen (Verschmieren auf dem Folgebogen) und unvollständiger Trocknung. Das Zeitungsprofil begrenzt den TAC auf maximal 240%.',
            highlights: ['ISO Coated v2 = 300% TAC', 'ISOnewspaper (PSO SNP) = max. 240% TAC', 'Verhinderung von Ablegen & Verschmieren']
          },
          options: [
            { id: 'a', text: 'Weil Zeitungspapier ungestrichen und stark saugfähig ist; 300% Farbauftrag führt zu starkem Punktzuwachs, Verschmieren und Trocknungsproblemen', isCorrect: true, explanation: 'Exakte IHK-Musterantwort aus Teil a)!' },
            { id: 'b', text: 'Weil ISO Coated v2 nur Schwarz-Weiß-Bilder unterstützt', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil Zeitungsdruckereien nur RGB-Bilder verarbeiten können', isCorrect: false, explanation: 'Druck erfolgt in CMYK.' },
            { id: 'd', text: 'Weil Zeitungspapier keine Farben aufnehmen kann', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-7-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: 'Aufgabe 7b (4 Punkte): Beschreibe, wie die Datei einer Anzeige für die Ausgabe auf Zeitungspapier farblich aufbereitet werden sollte.',
          options: [
            { id: 'a', text: 'Profilkonvertierung in das Zeitungsprofil (z.B. ISOnewspaper/PSO SNP), Begrenzung des Gesamtfarbauftrags auf max. 240% und Berücksichtigung des Punktzuwachses', isCorrect: true, explanation: 'Richtig! Das entspricht den 4 Punkten aus Teil b).' },
            { id: 'b', text: 'Erhöhung des Gesamtfarbauftrags auf 400% (100% C+M+Y+K)', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Umwandlung der Anzeige in eine GIF-Datei', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Speichern als HTML-Datei', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-7-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: 'Aufgabe 7c (3 Punkte): Erläutere, warum beim Zeitungsdruck der maximal zulässige Gesamtfarbauftrag berücksichtigt werden muss.',
          options: [
            { id: 'a', text: 'Um das Durchschlagen der Tinte auf die Rückseite, das Verschmieren/Ablegen im Stapel und zu lange Trocknungszeiten zu verhindern', isCorrect: true, explanation: 'Exakte IHK-Begründung aus Teil c)!' },
            { id: 'b', text: 'Damit der Zeitungsdrucker weniger Papier verbraucht', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil zu viel Farbe die Druckmaschinen magnetisch auflädt', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'd', text: 'Weil Zeitungen sonst zu schwer zum Tragen werden', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-7-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: '[IHK Original Seite 3] Eine Anzeige liegt im CMYK-Quellfarbraum ISO Coated v2 300% vor. Was passiert bei der Konvertierung in ISOnewspaper26v4 in InDesign/Photoshop?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 7: Farbprofilkonvertierung im Detail.',
          options: [
            { id: 'a', text: 'Die Farbwerte in den tiefen Schatten werden so umgerechnet, dass die Summe C+M+Y+K an keiner Stelle 240% überschreitet und der Tonwertzuwachs korrigiert wird', isCorrect: true, explanation: 'Vollständige IHK-Erklärung der Profilkonvertierung!' },
            { id: 'b', text: 'Das Bild wird automatisch in ein Vektorformat umgewandelt', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Alle Farben werden in 100% Schwarz (K) umgewandelt', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Die Auflösung wird automatisch halbiert', isCorrect: false, explanation: 'Das Profil betrifft die Farbtrennung, nicht die Pixelanzahl.' }
          ]
        },
        {
          id: 'l2-ihk-7-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: '[IHK Transfer] Warum unterscheidet sich der Punktzuwachs (Dot Gain) auf gestrichenem Bilderdruckpapier (ca. 10-14%) deutlich von ungestrichenem Zeitungspapier (ca. 25-30%)?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 7: Papierphysik.',
          options: [
            { id: 'a', text: 'Weil die Tinte auf dem rauen, ungestrichenen Zeitungspapier tief in die Papierfasern einzieht und breitläuft (Kapillareffekt), während gestrichenes Papier ein Wegschlagen verhindert', isCorrect: true, explanation: 'Richtig! Die Beschichtung (Strich) steuert das Saugverhalten.' },
            { id: 'b', text: 'Weil Zeitungspapier mit Laserbelichtern bedruckt wird', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil gestrichenes Papier aus Kunststoff besteht', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es gibt keinen Unterschied im Punktzuwachs', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 8 (AUFGABE 8)
    {
      id: 'ihk-orig-8',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 8: Medienneutrale Datenhaltung & Multi-Channel',
      shortDesc: 'Produktkatalog, Website & Newsletter aus einer Datenquelle (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 6,
      nuggets: [
        {
          id: 'n-ihk-8-1',
          title: 'Multi-Channel Publishing & Inhalts-Trennung',
          coreConcept: 'Trennung von Inhalt (Content) und Gestaltung (Layout/CSS) ermöglicht effizientes Publizieren.',
          bulletPoints: [
            'Teil a (3 Pkt): Trennung Inhalt & Form ermöglicht flexible Mehrfachverwertung.',
            'Teil b (3 Pkt): 3 Produktinfo-Arten (Beschreibungen, Maße/Attribute, Master-Bilder).',
            'Teil c (4 Pkt): Aufbereitung desselben Inhalts für Katalog (Print) vs. Web/Newsletter.'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-8-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: 'Aufgabe 8a (3 Punkte): Erläutere, warum die Trennung von Inhalt und Gestaltung eine wesentliche Voraussetzung für medienneutrale Datenhaltung ist.',
          options: [
            { id: 'a', text: 'Weil reine Inhaltsdaten dadurch universell in verschiedenen Ausgabekanälen (Print, Web, Newsletter) wiederverwendet werden können, ohne das Layout manuell anzupassen', isCorrect: true, explanation: 'Exakte IHK-Musterantwort aus Teil a)!' },
            { id: 'b', text: 'Weil Designer dadurch keine Texte mehr lesen müssen', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil Webseiten ohne CSS schneller laden', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Weil Schriften im Druck sonst nicht eingebunden werden', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-8-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: 'Aufgabe 8b (3 Punkte): Nenne drei Arten von Produktinformationen, die unabhängig vom Ausgabemedium gespeichert werden können.',
          options: [
            { id: 'a', text: '1. Produktbeschreibungs-Texte; 2. Technische Daten / Maße / Preise; 3. Verweise auf hochauflösende Master-Bilder', isCorrect: true, explanation: 'Richtig! Das sind die 3 geforderten Inhaltskategorien.' },
            { id: 'b', text: '1. InDesign-Satzspiegel; 2. CSS-Stylesheets; 3. Druckplatten-Passkreuze', isCorrect: false, explanation: 'Das sind meidenspezifische Layout-Daten.' },
            { id: 'c', text: '1. Tastaturkürzel; 2. Monitor-Seriennummern; 3. Kaffeebestellungen', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'd', text: 'Es gibt keine medienneutralen Produktinformationen', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-8-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: 'Aufgabe 8c (4 Punkte): Beschreibe anhand des Beispiels, wie ein und derselbe Inhalt für 2 unterschiedliche Ausgabemedien aufbereitet werden kann.',
          options: [
            { id: 'a', text: 'Aus der PIM-Datenbank wird der Text für den Print-Katalog in InDesign als CMYK-Layout platziert und für die Website dynamisch per HTML/CSS (sRGB) gerendert', isCorrect: true, explanation: 'Exakte IHK-Beispielantwort aus Teil c)!' },
            { id: 'b', text: 'Der Text wird für Print ausgedruckt und für die Website mit dem Smartphone abfotografiert', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'c', text: 'Es wird für jedes Medium ein neuer Autor engagiert, der den Text komplett neu erfindet', isCorrect: false, explanation: 'Erzeugt unnötige Kosten und Inkonsistenzen.' },
            { id: 'd', text: 'Der Inhalt wird nur im Newsletter veröffentlicht, Print und Web bleiben leer', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-8-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: '[IHK Original Seite 3] Ein Unternehmen verwaltet tausende Artikel. Welche Rolle spielt ein PIM-System (Product Information Management) im Crossmedia-Workflow?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 8: Single Source im Medienbetrieb.',
          options: [
            { id: 'a', text: 'Das PIM-System dient als zentrale Single Source of Truth; Produktänderungen (z.B. Preis/Text) werden einmalig gepflegt und automatisch an Katalog, Webshop und Newsletter verteilt', isCorrect: true, explanation: 'Vollständige IHK-Erklärung der PIM-Funktion!' },
            { id: 'b', text: 'Das PIM-System ersetzt die Druckmaschine in der Druckerei', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Ein PIM-System dient ausschließlich zum Zeichnen von Vektorlogos', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'PIM-Systeme verhindern, dass Webseiten im Internet gefunden werden', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-8-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: '[IHK Transfer] Warum sollten Layout-Formatierungen (wie Schriftgröße in pt oder CMYK-Farbcodes) NIEMALS direkt in der PIM-Datenbank im Text mithergestellt werden?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 8: Medienunabhängiges Datenformat.',
          options: [
            { id: 'a', text: 'Weil Print-Formatierungen (pt/CMYK) im Web/App-Umfeld (rem/px/sRGB) zu Darstellungsfehlern führen; die Aufbereitung muss zwingend im jeweiligen Ausgabemedium erfolgen', isCorrect: true, explanation: 'Richtig! Inhaltsdaten müssen strikt frei von Layout-Codes bleiben.' },
            { id: 'b', text: 'Weil PIM-Datenbanken keine Buchstaben speichern können', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil CMYK-Farbcodes im Web illegal sind', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es macht keinen Unterschied', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 9 (AUFGABE 9)
    {
      id: 'ihk-orig-9',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 9: Effektive Bildauflösung, Druckmaße & Rechenweg',
      shortDesc: 'Formeln: 1800x1200px auf 18x12cm bei 300 ppi gefordert (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 7,
      nuggets: [
        {
          id: 'n-ihk-9-1',
          title: 'Auflösungsformeln & Rechenwege',
          coreConcept: 'Schritt-für-Schritt-Umrechnung zwischen Pixeln, Zentimetern, Zoll (Inch) und ppi.',
          bulletPoints: [
            'Teil a (4 Pkt): 18cm / 2,54 = 7,0866 Zoll -> 1800 px / 7,0866 Zoll = 254 ppi.',
            'Teil b (2 Pkt): 254 ppi < 300 ppi gefordert -> Nicht ausreichend!',
            'Teil c (4 Pkt): 1800 px / 300 ppi = 6 Zoll -> 6 * 2,54 cm = 15,24 cm max. Druckbreite.'
          ],
          examFavorite: true,
          merksatz: 'Immer erst cm in Zoll umrechnen (/ 2,54), dann Pixel durch Zoll teilen!'
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-9-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: 'Aufgabe 9a (4 Punkte): Berechne die effektive Bildauflösung in ppi bei 1800 x 1200 Pixeln und einer Druckgröße von 18 x 12 cm. Geben Sie den Rechenweg an.',
          asset: {
            type: 'ppi_blueprint',
            title: 'Rechenweg-Blueprint: Effektiv-PPI & Druckgröße',
            subtitle: 'Schritt-für-Schritt Umrechnung von Zentimetern über Zoll in Pixel pro Zoll (ppi).',
            description: '1. Umrechnung der Druckbreite von cm in Zoll: 18 cm / 2,54 cm/Zoll = 7,0866 Zoll. 2. Division der Pixelanzahl durch die Zoll-Breite: 1800 Pixel / 7,0866 Zoll = 254 ppi. Da im Offsetdruck 300 ppi gefordert sind, reicht die Datei bei 18 cm Druckbreite qualitativ nicht aus.',
            highlights: ['18 cm / 2,54 = 7,0866 Zoll', '1800 px / 7,0866 = 254 ppi', '254 ppi < 300 ppi → Reicht nicht!']
          },
          options: [
            { id: 'a', text: '18 cm / 2,54 = 7,0866 Zoll -> 1800 px / 7,0866 Zoll = ca. 254 ppi', isCorrect: true, explanation: 'Exakter IHK-Rechenweg für Teil a)!' },
            { id: 'b', text: '1800 px / 18 cm = 100 ppi', isCorrect: false, explanation: 'Falsch. Hier wurde die Umrechnung in Zoll vergessen.' },
            { id: 'c', text: '1800 * 2,54 = 4572 ppi', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '300 ppi', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-9-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: 'Aufgabe 9b (2 Punkte): Beurteile, ob die vorhandene Bildauflösung (254 ppi) für die geforderten 300 ppi ausreicht. Begründen Sie Ihre Antwort.',
          options: [
            { id: 'a', text: 'Nein, die effektive Auflösung von 254 ppi liegt unter der geforderten Mindestauflösung von 300 ppi für den hochwertigen Druck', isCorrect: true, explanation: 'Exakte IHK-Beurteilung aus Teil b)!' },
            { id: 'b', text: 'Ja, 254 ppi reichen völlig aus, da im Druck immer 72 ppi genügen', isCorrect: false, explanation: '72 ppi ist für Web, nicht für hochwertigen Druck.' },
            { id: 'c', text: 'Ja, weil 254 höher als 100 ist', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Nein, weil das Bild im RGB-Modus vorliegt', isCorrect: false, explanation: 'Es geht hier um die Pixelauflösung, nicht den Farbmodus.' }
          ]
        },
        {
          id: 'q-ihk-9-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: 'Aufgabe 9c (4 Punkte): Berechne die maximal mögliche Druckbreite in Zentimetern, wenn das Bild (1800 px) mit geforderten 300 ppi gedruckt werden soll.',
          options: [
            { id: 'a', text: '1800 px / 300 ppi = 6 Zoll -> 6 * 2,54 cm = 15,24 cm maximal mögliche Druckbreite', isCorrect: true, explanation: 'Exakter IHK-Rechenweg für Teil c)!' },
            { id: 'b', text: '1800 / 300 = 6 cm', isCorrect: false, explanation: 'Falsch. Umrechnung von Zoll in cm wurde vergessen.' },
            { id: 'c', text: '24,00 cm', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '18,00 cm', isCorrect: false, explanation: 'Bei 18 cm sinkt die Auflösung auf 254 ppi.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-9-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: '[IHK Original Seite 4] Ein Fotograf liefert ein Bild mit 3600 x 2400 Pixeln. Wie breit kann dieses Bild bei 300 ppi ohne Qualitätsverlust im Offsetdruck gedruckt werden?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 9: Master-Berechnung.',
          options: [
            { id: 'a', text: '3600 px / 300 ppi = 12 Zoll -> 12 * 2,54 cm = 30,48 cm Druckbreite (z.B. DIN A4 quer)', isCorrect: true, explanation: 'Richtig! Exakte doppelte Maße von Aufgabe 9c.' },
            { id: 'b', text: '36 cm', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: '60 cm', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '12 cm', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-9-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: '[IHK Transfer] Warum führt das bloße Umrechnen ("Neuberechnen" / Interpolation) eines 254-ppi-Bildes auf 300 ppi in Photoshop zu KEINER echten Qualitätsverbesserung im Druck?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 9: Interpolation im Druck.',
          options: [
            { id: 'a', text: 'Weil Photoshop dabei lediglich fehlende Pixel dazuerfindet (errechnet); es werden keine echten Bilddetails oder Schärfeinhalte hinzugefügt', isCorrect: true, explanation: 'Richtig! Interpolation erhöht nur die Dateigröße, nicht die echte Detailzeichnung.' },
            { id: 'b', text: 'Weil Photoshop beim Umrechnen das Bild in Schwarz-Weiß wandelt', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil 300 ppi im Druck verboten sind', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Interpolation verbessert die Schärfe perfekt', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 10 (AUFGABE 10)
    {
      id: 'ihk-orig-10',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 10: Web-Bildaufbereitung, Skalierung & Motivwirkung',
      shortDesc: 'Anforderungen, Skalierung 1300x867 -> 960x640px & Ferkel-Motivkritik (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 7,
      nuggets: [
        {
          id: 'n-ihk-10-1',
          title: 'Web-Bildaufbereitung & Bildbeurteilung',
          coreConcept: 'Technische Wandlung von Print zu Web und kritische Prüfung der Motivwirkung.',
          bulletPoints: [
            'Teil a (3 Pkt): 3 Anforderungen (CMYK->sRGB, Reduktion Pixelmaße, Webformat JPEG/WebP).',
            'Teil b (3 Pkt): Skalierung 867 / 1300 * 960 = 640 Pixel Höhe.',
            'Teil c (4 Pkt): Ferkel-Motivkritik (Makro ohne Hof-Kontext, Schlamm unruhig, kein Negativraum).'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-10-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: 'Aufgabe 10a (3 Punkte): Nennen Sie drei technische Anforderungen, die bei der Aufbereitung von Bildern für eine Website berücksichtigt werden müssen.',
          options: [
            { id: 'a', text: '1. Konvertierung von CMYK nach sRGB; 2. Anpassung der Pixelmaße an das Web-Layout; 3. Speichern in komprimiertem Web-Format (WebP/JPEG/AVIF)', isCorrect: true, explanation: 'Exakte IHK-Antwort aus Teil a)!' },
            { id: 'b', text: '1. Auflösung 300 ppi erzwingen; 2. Speichern als TIFF; 3. CMYK-Farbraum beibehalten', isCorrect: false, explanation: 'Das sind Print-Anforderungen.' },
            { id: 'c', text: '1. Bild ausdrucken; 2. Einscannen; 3. Per Fax versenden', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'd', text: 'Es gibt keine technischen Anforderungen im Web', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-10-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: 'Aufgabe 10b (3 Punkte): Ein Bild (1300 x 867 Pixel) wird unter Beibehaltung des Seitenverhältnisses auf 960 Pixel Breite reduziert. Berechnen Sie die Bildhöhe in ganzen Pixeln.',
          options: [
            { id: 'a', text: '867 / 1300 * 960 = 640.24 -> gerundet 640 Pixel Höhe', isCorrect: true, explanation: 'Exakter IHK-Rechenweg für Teil b)!' },
            { id: 'b', text: '500 Pixel', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: '720 Pixel', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: '867 Pixel', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-10-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: 'Aufgabe 10c (4 Punkte): Auf der Startseite eines Erlebnisbauernhofs soll das Motiv (Ferkel-Nahaufnahme) eingesetzt werden. Erläutern Sie, ob dieses Bild dafür geeignet ist.',
          options: [
            { id: 'a', text: 'Ungeeignet: Makro-Ausschnitt bietet keinen Hof-Kontext (keine Attraktionen/Natur), wirkt durch Schlamm unruhig und bietet keinen Negativraum für Text/Buttons', isCorrect: true, explanation: 'Exakte IHK-Musterbewertung aus Teil c)!' },
            { id: 'b', text: 'Perfekt geeignet, weil Schweine das einzige Thema eines Bauernhofs sind', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Ungeeignet, weil CMYK-Bilder auf Websites verboten sind', isCorrect: false, explanation: 'Der Farbmodus lässt sich wandeln; es geht um die Motivwirkung.' },
            { id: 'd', text: 'Perfekt geeignet, weil die Auflösung 240 ppi beträgt', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-10-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: '[IHK Original Seite 4] Das Bild hat im Original TIFF (CMYK, 240 ppi) eine Dateigröße von 4,3 MB. Warum sinkt die Dateigröße nach der Web-Aufbereitung auf ca. 95 KB?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 10: Dateigrößen-Reduktion.',
          options: [
            { id: 'a', text: 'Durch Verringerung der Pixelanzahl (1300x867 -> 960x640), Wechsel von 4 CMYK-Kanälen auf 3 RGB-Kanäle und komprimiertes WebP/JPEG-Format', isCorrect: true, explanation: 'Richtig! Alle drei Faktoren reduzieren das Datenvolumen um > 97%.' },
            { id: 'b', text: 'Weil Web-Server Dateien automatisch löschen', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Weil der Monitor nur 95 KB speichern kann', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Weil die ppi-Zahl im Web von 240 auf 0 gesetzt wird', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-10-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: '[IHK Transfer] Was versteht man unter dem gestalterischen Begriff "Negativraum" bei der Auswahl eines Hero-Bannerbildes für eine Website?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 10: UX & Layout im Webdesign.',
          options: [
            { id: 'a', text: 'Ruhige, schlichte Bildbereiche (z.B. verschwommene Wiese/Himmel), auf denen Überschriften und Call-to-Action-Buttons lesbar platziert werden können', isCorrect: true, explanation: 'Richtig! Ohne Negativraum leidet die Lesbarkeit von Texten im Banner extrem.' },
            { id: 'b', text: 'Ein fehlerhaftes Fotonegativ aus der Dunkelkammer', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Ein schwarzer Rahmen um das Banner', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Ein Bildbereich mit negativen Farbwerten', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 11 (AUFGABE 11)
    {
      id: 'ihk-orig-11',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 11: Gradationskurven-Korrektur & Tonwertsteuerung',
      shortDesc: 'Tunnel-Schattenaufhellung, Viertel/Mittel/Dreivierteltöne & Rauschen (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 7,
      nuggets: [
        {
          id: 'n-ihk-11-1',
          title: 'Gradationskurven im Druck-Workflow',
          coreConcept: 'Gezielte Steuerung von Tiefen, Mitteltönen und Lichtern im Kurvendiagramm.',
          bulletPoints: [
            'Teil a (4 Pkt): Zeichnen der Kurve (Anhebung im Dreivierteltonbereich, Lichter auf Diagonale fixieren).',
            'Teil b (4 Pkt): Wirkung auf Dreivierteltöne (stark aufgehellt), Mitteltöne (leicht angehoben), Vierteltöne (unverändert).',
            'Teil c (2 Pkt): Problem bei Überkorrektur (Farbrauschen, Tonwertabrisse, flaues Mauerwerk).'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-11-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: 'Aufgabe 11a (4 Punkte): Zeichnen Sie die erforderliche Gradationsänderung ein. Wie muss der Verlauf der Kurve gestaltet werden?',
          asset: {
            type: 'gradationskurve',
            title: 'Gradationskurve Abb. 1: Tunnel-Schattenaufhellung',
            subtitle: 'Selektive Anhebung der 3/4-Töne bei fixierten Lichtern auf der 45°-Linie.',
            description: 'Das Foto zeigt einen dunklen Tunnel im Vordergrund und sonnenbeschienene Fachwerkhäuser im Hintergrund. Um das Tunnelmauerwerk aufzuhellen, ohne die sonnigen Häuser auszubrennen, wird die Gradationskurve im Dreiviertelton-Bereich (Schatten) steil nach oben gebogen, während die Lichter am Schnittpunkt fixiert bleiben.',
            highlights: ['Dreivierteltöne stark aufgehellt (+25%)', 'Lichter bei 0% unberührt fixiert', 'Vermeidung flauer Kontraste']
          },
          options: [
            { id: 'a', text: 'Die Kurve wird im Schatten/Dreivierteltonbereich nach oben gebogen, während der Endpunkt in den Lichtern fixiert auf der 45°-Linie bleibt', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für Teil a)!' },
            { id: 'b', text: 'Die gesamte 45°-Linie wird parallel nach unten verschoben', isCorrect: false, explanation: 'Falsch. Das dunkelt das Bild weiter ab.' },
            { id: 'c', text: 'Die Kurve wird S-förmig nach unten durchgebogen', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Die Kurve wird waagerecht auf 100% gesetzt', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-11-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: 'Aufgabe 11b (4 Punkte): Beschreiben Sie, wie sich die vorgenommene Korrektur auf Vierteltöne, Mitteltöne und Dreivierteltöne auswirkt.',
          options: [
            { id: 'a', text: 'Dreivierteltöne (Schatten im Tunnel) werden stark aufgehellt; Mitteltöne leicht angehoben; Vierteltöne (sonnige Fachwerkhäuser) bleiben unverändert', isCorrect: true, explanation: 'Exakte IHK-Musterantwort aus Teil b)!' },
            { id: 'b', text: 'Alle Tonwertbereiche werden gleichmäßig um 50% verdunkelt', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Vierteltöne werden komplett Schwarz, Dreivierteltöne komplett Weiß', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Die Korrektur wirkt sich nur auf den Rotkanal aus', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-11-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: 'Aufgabe 11c (2 Punkte): Erläutern Sie ein mögliches Problem, das bei einer zu starken Aufhellung der dunklen Bildbereiche entstehen kann.',
          options: [
            { id: 'a', text: 'Verstärkung von störendem Sensorrauschen in den Schatten, flauer Kontrast und sichtbare Tonwertabrisse im Mauerwerk', isCorrect: true, explanation: 'Exakte IHK-Warnung aus Teil c)!' },
            { id: 'b', text: 'Die Fachwerkhäuser verschwinden vollständig aus dem Bild', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Das Bild wird automatisch gelöscht', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Der Monitor verbraucht doppelt so viel Strom', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-11-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: '[IHK Original Seite 5] Welches Ziel verfolgt der Reiseführer-Kunde mit dem Wunsch, dass sowohl der Tunnel im Vordergrund als auch die sonnigen Häuser im Hintergrund erkennbar sind?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 11: Zielgruppen- und Druckanforderung.',
          options: [
            { id: 'a', text: 'Ausgleich des extremen Objektkontrasts im Druck, damit das Tunnelmauerwerk plastische Zeichnung erhält, ohne den sonnigen Gesamteindruck zu zerstören', isCorrect: true, explanation: 'Vollständige IHK-Transferlösung!' },
            { id: 'b', text: 'Vollständige Entfernung des Tunnels per Freisteller', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Verwandlung des Fotos in eine Vektorzeichnung', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Absichtliche Erzeugung von Grauschleiern über den Häusern', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-11-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: '[IHK Transfer] Worin unterscheidet sich die Anhebung der Tiefen über die Gradationskurve gegenüber einer bloßen Helligkeitserhöhung des Gesamtbildes?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 11: Gradation vs. Helligkeit.',
          options: [
            { id: 'a', text: 'Die Gradationskurve erlaubt selektive Anhebung bestimmter Tonbereiche (Tiefen); bloße Helligkeitserhöhung verschiebt alle Tonwerte linear und brennt die Lichter aus', isCorrect: true, explanation: 'Richtig! Nur die Kurve ermöglicht differenzierte Tonwertsteuerung.' },
            { id: 'b', text: 'Bloße Helligkeitserhöhung schützt die Lichter vor Überbelichtung', isCorrect: false, explanation: 'Falsch herum.' },
            { id: 'c', text: 'Gradationskurven funktionieren nur bei Schwarz-Weiß-Bildern', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es gibt keinen technischen Unterschied', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ]
    },

    // MODUL 12 (AUFGABE 12)
    {
      id: 'ihk-orig-12',
      chapterId: 'ihk-original-teil1',
      title: 'Aufgabe 12: Metadaten & Digital-Asset-Management (DAM)',
      shortDesc: 'Begriff Metadaten, 4 Suchfelder & 2 DAM-Vorteile (Teil a, b, c - 10 Punkte)',
      estimatedMinutes: 6,
      nuggets: [
        {
          id: 'n-ihk-12-1',
          title: 'Metadaten & DAM im Medienunternehmen',
          coreConcept: 'Strukturierte Verwaltung tausender Digital Assets (Bilder, Logos, Texte).',
          bulletPoints: [
            'Teil a (2 Pkt): Metadaten = Strukturierte Zusatzdaten über Inhalte/Eigenschaften.',
            'Teil b (4 Pkt): 4 Metadaten-Felder (Titel, Urheber, Stichwörter/Tags, Nutzungsrechte).',
            'Teil c (4 Pkt): 2 DAM-Vorteile (Single Source / Vermeidung Dubletten, schnelle Metadaten-Suche & Lizensierungsschutz).'
          ],
          examFavorite: true
        }
      ],
      quizQuestions: [
        {
          id: 'q-ihk-12-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: 'Aufgabe 12a (2 Punkte): Erläutern Sie den Begriff "Metadaten" im Zusammenhang mit digitalen Medieninhalten.',
          options: [
            { id: 'a', text: 'Strukturierte Zusatzinformationen ("Daten über Daten"), die Eigenschaften, Urheberrechte, Inhalte und technische Parameter einer Datei beschreiben', isCorrect: true, explanation: 'Exakte IHK-Definition aus Teil a)!' },
            { id: 'b', text: 'Die physische Größe der Festplatte', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Ein Programm zur Bildbearbeitung', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Die Geschwindigkeit des Internetanschlusses', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-12-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: 'Aufgabe 12b (4 Punkte): Nennen Sie vier Metadaten, die für die Verwaltung und Suche nach Bilddateien hilfreich sind.',
          options: [
            { id: 'a', text: '1. Titel / Beschreibung; 2. Urheber / Fotograf; 3. Stichwörter / Tags; 4. Nutzungsrechte / Lizenzablaufdatum', isCorrect: true, explanation: 'Richtig! Das entspricht genau den 4 Punkten aus Teil b).' },
            { id: 'b', text: '1. Bildschirmfarbe; 2. Mausklicks; 3. Kaffeemenge; 4. Tastaturtyp', isCorrect: false, explanation: 'Unsinn.' },
            { id: 'c', text: '1. Druckereiname; 2. Papierpreis; 3. Lieferwagen-Kennzeichen; 4. Vorwahl', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es gibt keine hilfreichen Metadaten', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'q-ihk-12-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: 'Aufgabe 12c (4 Punkte): Beschreiben Sie zwei Vorteile eines zentralen Digital-Asset-Management-Systems (DAM) gegenüber einer unstrukturierten Ordnerablage.',
          options: [
            { id: 'a', text: '1. Single Source of Truth verhindert veraltete Dateiversionen/Dubletten; 2. Schnelle metadatenbasierte Suche & Lizenzrechte-Schutz vor Abmahnungen', isCorrect: true, explanation: 'Exakte IHK-Musterlösung aus Teil c)!' },
            { id: 'b', text: '1. Das DAM-System braucht keinen Strom; 2. Bilder drucken sich von selbst', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: '1. Dateien können nicht mehr geöffnet werden; 2. Der Monitor flackert', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'Es gibt keinen Unterschied zu Ordnern', isCorrect: false, explanation: 'Falsch.' }
          ]
        }
      ],
      level2QuizQuestions: [
        {
          id: 'l2-ihk-12-1',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: '[IHK Original Seite 5] Ein Unternehmen verwaltet mehrere tausend Produktbilder. Wie verhindert ein DAM-System rechtliche Abmahnungen durch abgelaufene Bildlizenzen?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 12: Lizenz- & Rechteverwaltung.',
          options: [
            { id: 'a', text: 'Durch automatische Verknüpfung von IPTC/XMP-Lizenzabgabefristen mit Warnmeldungen und automatischer Sperrung abgelaufener Assets für den Export', isCorrect: true, explanation: 'Vollständige IHK-Erklärung zur DAM-Rechteverwaltung!' },
            { id: 'b', text: 'Indem alle Fotos nach 7 Tagen automatisch gelöscht werden', isCorrect: false, explanation: 'Falsch.' },
            { id: 'c', text: 'Indem Wasserzeichen unentfernbar über alle Bilder gezeichnet werden', isCorrect: false, explanation: 'Falsch.' },
            { id: 'd', text: 'DAM-Systeme können keine Lizenzen verwalten', isCorrect: false, explanation: 'Falsch.' }
          ]
        },
        {
          id: 'l2-ihk-12-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: '[IHK Transfer] Welcher Standard beschreibt den weltweiten Industrie-Standard für bildbetreffende Metadaten (wie Fotograf, Copyright, Keywords) in Bilddateien?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 12: Metadaten-Standards.',
          options: [
            { id: 'a', text: 'IPTC (International Press Telecommunications Council) & XMP (Extensible Metadata Platform)', isCorrect: true, explanation: 'Richtig! IPTC/XMP ist der weltweite Standard im Medienbereich.' },
            { id: 'b', text: 'HTML5 & CSS3', isCorrect: false, explanation: 'Das sind Web-Auszeichnungssprachen.' },
            { id: 'c', text: 'MP3 & WAV', isCorrect: false, explanation: 'Das sind Audio-Formate.' },
            { id: 'd', text: 'RGB & CMYK', isCorrect: false, explanation: 'Das sind Farbmodelle.' }
          ]
        }
      ]
    }
  ]
};
