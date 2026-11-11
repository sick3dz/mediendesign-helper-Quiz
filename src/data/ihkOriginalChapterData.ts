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
            { id: 'a', text: 'Einheitliche Verzeichnishierarchie, verbindliche Namenskonventionen und Einbettung strukturierter Metadaten', isCorrect: true, explanation: 'Richtig! Das entspricht exakt den 3 Punkten aus Teilaufgabe a).' },
            { id: 'b', text: 'Flache Dateiablage im Hauptverzeichnis, chronologische Sortierung und Verzicht auf Verschlagwortung', isCorrect: false, explanation: 'Das führt zu unübersichtlichem Datenchaos und redundanten Dateiversionen.' },
            { id: 'c', text: 'Ausschließliche Kennzeichnung nach Erstellungsdatum ohne Kundenkürzel, Projektkennung oder Inhaltsangaben', isCorrect: false, explanation: 'Dateinamen müssen systematisch und selbsterklärend sein.' },
            { id: 'd', text: 'Verteilung der Assets auf private Mitarbeiter-Festplatten ohne Versionskontrolle und Server-Synchronisation', isCorrect: false, explanation: 'Rohdaten müssen als Master-Fundament zentral gesichert werden.' }
          ]
        },
        {
          id: 'q-ihk-1-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: 'Aufgabe 1b (3 Punkte): Was zeichnet medienneutrale Daten bezüglich Farbraum und Format aus?',
          options: [
            { id: 'a', text: 'Sie liegen im hochauflösenden RGB-Farbraum (z.B. eciRGBv2) in verlustfreien Formaten vor und werden erst beim Export in Ziel-Farbräume konvertiert', isCorrect: true, explanation: 'Richtig! Das schützt vor frühem Farbraumverlust.' },
            { id: 'b', text: 'Sie werden frühzeitig in 8-Bit-Standard-CMYK konvertiert und fest auf ein spezifisches Druckpapier profiliert', isCorrect: false, explanation: 'Falsch. Frühe CMYK-Wandlung beschränkt den Farbraum irreversibel.' },
            { id: 'c', text: 'Sie werden im sRGB-Farbraum als komprimierte JPEG-Dateien abgelegt, um Rendering-Probleme im Browser zu vermeiden', isCorrect: false, explanation: 'sRGB und JPEG bieten keine ausreichenden Reserven für hochwertige Printausgaben.' },
            { id: 'd', text: 'Sie werden als hardwarekalibrierte LAB-Graustufen abgespeichert und erst an der Druckmaschine nachträglich eingefärbt', isCorrect: false, explanation: 'LAB-Graustufen enthalten keine Farbinformationen.' }
          ]
        },
        {
          id: 'q-ihk-1-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-1',
          question: 'Aufgabe 1c (4 Punkte): Welche zwei Hauptvorteile bietet die medienneutrale Datenhaltung im Medienbetrieb?',
          options: [
            { id: 'a', text: '1. Zeitersparnis & Redundanzvermeidung (Single Source of Truth); 2. Maximale Qualitäts- & Zukunftssicherheit für neue Medienkanäle', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für Teilaufgabe c)!' },
            { id: 'b', text: '1. Vollständiger Wegfall von Farbprofilen im Workflow; 2. Automatische Reduzierung der Druckfarbkosten durch Druckfarbeneinsparung', isCorrect: false, explanation: 'Farbprofile bleiben unverzichtbar; Druckfarbenkosten sinken dadurch nicht.' },
            { id: 'c', text: '1. Verzicht auf Schriftlizenzierung durch Bildrasterung; 2. Automatische Hardwarekalibrierung aller Endgeräte beim Kunden', isCorrect: false, explanation: 'Medienneutralität ersetzt weder Schriftlizenzen noch Monitorkalibrierungen.' },
            { id: 'd', text: '1. Direkte Wandlung aller Pixelgrafiken in Vektoren; 2. Automatischer Export ohne redaktionelle Korrekturschleifen', isCorrect: false, explanation: 'Pixelbilder werden nicht automatisch zu Vektoren, Freigabeschleifen bleiben nötig.' }
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
            { id: 'b', text: 'Das Bildmaterial direkt im Ausgabefarbraum ISO Coated v2 erfassen und dieselbe CMYK-Datei unverändert für Web und App bereitstellen', isCorrect: false, explanation: 'Falsch. Browser und Apps können CMYK-Farben oft nicht farbkorrekt darstellen.' },
            { id: 'c', text: 'Die Aufnahmen in sRGB mit 72 ppi als Master sichern und vor dem Druck durch bilineare Interpolation auf 300 ppi künstlich hochrechnen', isCorrect: false, explanation: '72 ppi als Master reicht im Offsetdruck qualitativ nicht aus; Interpolation erzeugt Unschärfe.' },
            { id: 'd', text: 'Die Rohdaten ausschließlich im gerätespezifischen Kamera-Farbprofil belassen und ohne Farbkonvertierung an die Kanäle verteilen', isCorrect: false, explanation: 'Kamera-Rohdaten müssen über standardisierte Arbeitsfarbräume aufbereitet werden.' }
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
            { id: 'b', text: 'Weil die wiederholte Separation in unterschiedliche CMYK-Druckstandards zu unkontrollierbarem Tonwertzuwachs und Farbstichen führt', isCorrect: false, explanation: 'Dies ist zwar ein Nebeneffekt, aber der primäre Qualitätsverlust liegt im Gamut-Beschnitt.' },
            { id: 'c', text: 'Weil moderne Betriebssysteme CMYK-Dateien beim Öffnen im Bildbetrachter generell als defekte Systemdateien blockieren', isCorrect: false, explanation: 'Betriebssysteme blockieren CMYK nicht, stellen sie aber im Web teils verfälscht dar.' },
            { id: 'd', text: 'Weil bei der Konvertierung nach CMYK automatisch alle Vektorebenen und Pfadinformationen unwiderruflich gelöscht werden', isCorrect: false, explanation: 'Die Farbraumkonvertierung betrifft die Farbwerte, nicht zwingend die Vektorebenen.' }
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
            { id: 'b', text: 'Weil es native CMYK-Separationen mit 300 ppi direkt im Browser ohne Renderer darstellen kann', isCorrect: false, explanation: 'Browser arbeiten im sRGB-Farbraum und nicht in nativer CMYK-Separation.' },
            { id: 'c', text: 'Weil es Rasterbilder automatisch in hardwarebeschleunigte 3D-Polygonnetze für WebGL transformiert', isCorrect: false, explanation: 'SVG ist ein zweidimensionales Vektorformat und kein 3D-Konverter.' },
            { id: 'd', text: 'Weil es als proprietäres Binärformat ausschließlich mit speziellen Adobe-Server-Plugins funktioniert', isCorrect: false, explanation: 'SVG ist ein offener, XML-basierter W3C-Standard.' }
          ]
        },
        {
          id: 'q-ihk-2-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: 'Aufgabe 2 - GIF vs. PNG-24 (4 Punkte): Welche Beschränkung hat GIF gegenüber PNG-24 bei Transparenzen und Farben?',
          options: [
            { id: 'a', text: 'GIF bietet max. 256 Farben und nur harte 1-Bit-Transparenz; PNG-24 hat 16,7 Mio. Farben und stufenlose Alpha-Transparenz', isCorrect: true, explanation: 'Exakte IHK-Gegenüberstellung aus den Bewertungskriterien!' },
            { id: 'b', text: 'GIF bietet echte 16-Bit-Farbtiefe pro Kanal; PNG-24 ist auf indexierte Paletten mit maximal 128 Farben limitiert', isCorrect: false, explanation: 'Genau umgekehrt: GIF ist palettenbasiert (max. 256 Farben), PNG-24 hat True Color.' },
            { id: 'c', text: 'PNG-24 komprimiert verlustbehaftet wie JPEG; GIF speichert Bildinhalte mit verlustfreiem LZW-Algorithmus ab', isCorrect: false, explanation: 'PNG komprimiert verlustfrei (Deflate-Algorithmus).' },
            { id: 'd', text: 'GIF unterstützt stufenlose Alphamasken; PNG-24 kann Bildhintergründe nur vollkommen deckend darstellen', isCorrect: false, explanation: 'Falsch herum: PNG-24 bietet echten 8-Bit-Alpha-Kanal für weiche Verläufe.' }
          ]
        },
        {
          id: 'q-ihk-2-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-2',
          question: 'Aufgabe 2 - EPS & TIFF (4 Punkte): Wie unterscheiden sich EPS und TIFF für den Einsatz im Printmedium?',
          options: [
            { id: 'a', text: 'EPS speichert vektorbasierte Pfade; TIFF ist ein hochauflösendes, verlustfreies Pixelformat für Rasterbilder', isCorrect: true, explanation: 'Richtig! EPS = Vektor, TIFF = Pixel.' },
            { id: 'b', text: 'EPS ist ein komprimiertes Webformat für Mobilgeräte; TIFF dient ausschließlich als Druckplatten-Belichtungsdatei', isCorrect: false, explanation: 'EPS ist für moderne Webseiten ungeeignet; TIFF ist ein Standard-Pixelformat.' },
            { id: 'c', text: 'TIFF speichert mathematische Bézierkurven verlustfrei ab; EPS rastert Grafiken stets in feste 300-ppi-Bitmaps um', isCorrect: false, explanation: 'Falsch: TIFF basiert auf Pixeln, während EPS native Vektorbeschreibungen speichert.' },
            { id: 'd', text: 'EPS kann keine Vektoren oder Pfadinformationen einbetten; TIFF ist das primäre Austauschformat für Weblogos', isCorrect: false, explanation: 'EPS basiert auf PostScript-Vektoren; TIFF wird im Web wegen Dateigröße kaum genutzt.' }
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
            { id: 'b', text: 'EPS für responsive Smartphone-Websites, SVG ausschließlich für den CMYK-Druck, GIF für farbechte Verläufe und TIFF für Web-Banner', isCorrect: false, explanation: 'EPS wird im modernen Web nicht nativ gerendert; SVG ist der ideale Webstandard.' },
            { id: 'c', text: 'GIF für großformatige Werbebanner, PNG-24 für belichtete Druckplatten, SVG nur für Schwarz-Weiß-Grafiken ohne Kurven', isCorrect: false, explanation: 'GIF skaliert nicht auf Großformaten; Druckplatten werden über PDF/X belichtet.' },
            { id: 'd', text: 'Alle 5 Formate sind für Web und Print technisch identisch einsetzbar, da moderne Ausgabegeräte jedes Format beliebig adaptieren', isCorrect: false, explanation: 'Formate besitzen fundamentale technische Unterschiede in Vektor-/Pixelarchitektur und Farbtiefe.' }
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
            { id: 'b', text: 'Weil GIF-Dateien im Browser beim Rendern auf dunklen Hintergründen automatisch ein inverses Farbprofil erzwingen', isCorrect: false, explanation: 'Browser erzwingen kein inverses Farbprofil; das Problem liegt am harten Mattierungs-Rand.' },
            { id: 'c', text: 'Weil der Farbumfang von GIF im RGB-Modus auf 16 Grundfarben beschränkt ist und dunkle Farbtöne automatisch abgeschnitten werden', isCorrect: false, explanation: 'GIF unterstützt bis zu 256 frei definierbare Farben aus dem 24-Bit-Farbraum.' },
            { id: 'd', text: 'Weil GIF-Dateien transparente Bereiche grundsätzlich als hochglänzenden Schmuckfarbenkanal interpretieren', isCorrect: false, explanation: 'GIF kennt keine Schmuckfarbenkanäle, sondern lediglich eine binäre Index-Transparenz.' }
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
            { id: 'b', text: 'Es dokumentiert die finale Druckabnahme nach Abschluss aller Produktions- und Belichtungsprozesse', isCorrect: false, explanation: 'Das Briefing steht am Projektbeginn und nicht am Ende der Produktion.' },
            { id: 'c', text: 'Es stellt die formale Schlussrechnung mit detaillierter Aufstellung aller geleisteten Arbeitsstunden dar', isCorrect: false, explanation: 'Die Abrechnung erfolgt nach Projektfertigstellung über Rechnungsdokumente.' },
            { id: 'd', text: 'Es ersetzt den schriftlichen Arbeitsvertrag und die behördliche Gewerbeanmeldung der beteiligten Agentur', isCorrect: false, explanation: 'Ein Briefing ist eine fachliche Arbeitsgrundlage und kein behördlicher Vertrag.' }
          ]
        },
        {
          id: 'q-ihk-3-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: 'Aufgabe 3b (4 Punkte): Nenne vier wichtige Informationen, die vor der Bearbeitung im Briefing geklärt werden sollten.',
          options: [
            { id: 'a', text: '1. Zielgruppe; 2. Projektziele/Botschaft; 3. Medienkanäle/Formate; 4. Corporate Identity & Zeitrahmen', isCorrect: true, explanation: 'Richtig! Das sind die 4 geforderten Informationsbereiche.' },
            { id: 'b', text: '1. Druckmaschinentyp; 2. Urlaubsplanung der Druckerei; 3. Wetter am Abgabetag; 4. Büromöblierung des Kunden', isCorrect: false, explanation: 'Dies sind keine strategischen Inhalte für ein kreatives Gestaltungskonzept.' },
            { id: 'c', text: '1. Hardwarekonfiguration des Designers; 2. Stromkosten der Agentur; 3. Monitorauflösung; 4. Papierlagerfläche', isCorrect: false, explanation: 'Interne Betriebsdaten der Agentur gehören nicht in das Kundenbriefing.' },
            { id: 'd', text: '1. ICC-Profile der Druckerei; 2. Leasingverträge der Kameras; 3. Versicherungsbeiträge; 4. Telefontarife', isCorrect: false, explanation: 'Technische Detailparameter und Verwaltungskosten sind kein Gegenstand des Briefings.' }
          ]
        },
        {
          id: 'q-ihk-3-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: 'Aufgabe 3c (4 Punkte): Erläutere zwei mögliche Probleme, die bei einem unvollständigen oder unklaren Briefing entstehen.',
          options: [
            { id: 'a', text: '1. Entwürfe am Kundenwunsch / an der Zielgruppe vorbei; 2. Erheblicher Zeitverzug und Mehrkosten durch Fehlkorrekturen', isCorrect: true, explanation: 'Exakte IHK-Musterantwort aus Teil c)!' },
            { id: 'b', text: '1. Plötzlicher Totalausfall des Servers; 2. Unbeabsichtigter Stromausfall an den Belichtungseinheiten der Druckerei', isCorrect: false, explanation: 'Das sind unvorhersehbare technische Betriebsstörungen, keine Briefingfehler.' },
            { id: 'c', text: '1. Unbeabsichtigtes Löschen aller Schriftbibliotheken; 2. Automatische Umwandlung aller Farbfotos in Graustufen', isCorrect: false, explanation: 'Unvollständige Vorgaben führen zu Fehldesign, nicht zu Softwarefehlern.' },
            { id: 'd', text: '1. Verpflichtende Reduzierung der Bildauflösung; 2. Ausschluss jeglicher Gewährleistungsansprüche im Druckprozess', isCorrect: false, explanation: 'Auflösung und Gewährleistung unterliegen technischen und rechtlichen Normen.' }
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
            { id: 'a', text: 'Durch ein strukturiertes Re-Briefing / Protokollabgleich, in dem offene Punkte schriftlich präzisiert und vom Kunden gegengezeichnet werden', isCorrect: true, explanation: 'Richtig! Das Re-Briefing schützt vor Missverständnissen.' },
            { id: 'b', text: 'Durch eigenmächtige Festlegung aller Designparameter nach persönlichem Geschmack des Gestalters ohne weitere Rücksprache', isCorrect: false, explanation: 'Erzeugt ein extremes Reklamationsrisiko und führt zu vergeblichen Entwurfsphasen.' },
            { id: 'c', text: 'Durch sofortigen Projektstopp und fristlose Kündigung des Gestaltungsauftrags ohne Klärungsversuch', isCorrect: false, explanation: 'Unprofessionell; Unklarheiten müssen partnerschaftlich im Dialog gelöst werden.' },
            { id: 'd', text: 'Durch vollständige Überlassung aller gestalterischen Entscheidungen an automatisierte Bildgeneratoren ohne Prüfung', isCorrect: false, explanation: 'KI-Werkzeuge können unklare Kundenabsprachen und Markenwerte nicht eigenständig klären.' }
          ]
        },
        {
          id: 'l2-ihk-3-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-3',
          question: '[IHK Transfer] Warum ist die exakte Definition der Zielgruppe im Briefing entscheidend für die spätere Wahl von Farben, Typografie und Tonalität?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 3: Zielgruppenanalyse.',
          options: [
            { id: 'a', text: 'Falsche Zielgruppenansprache führt zu mangelnder Werbewirkung; unklare Formate erzwingen zeit- und kostenintensive Neuentwürfe im Layout', isCorrect: true, explanation: 'Richtig! Zielverfehlung und Budgetüberschreitung sind die Hauptfolgen.' },
            { id: 'b', text: 'Fehlende Vorgaben führen zu mechanischen Druckmaschinenfehlern und blockieren die Papierführung in der Weiterverarbeitung', isCorrect: false, explanation: 'Briefingmängel betreffen die Konzeption und Gestaltung, nicht die Druckmaschinenmechanik.' },
            { id: 'c', text: 'Unvollständige Kundenbriefings machen Druckfarben lichtunbeständig und führen zu vorzeitigem Verblassen im Außenbereich', isCorrect: false, explanation: 'Die Lichtechtheit hängt von den Pigmenten der Druckfarben ab.' },
            { id: 'd', text: 'Ohne detaillierte Vorgaben verweigert die Druckerei die Druckplattenbelichtung aus urheberrechtlichen Bedenken', isCorrect: false, explanation: 'Druckereien prüfen übermittelte Druck-PDFs auf Druckbarkeit, nicht auf Briefingdetails.' }
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
            { id: 'b', text: 'TIFF speichert skalierbare Vektorkurven; RAW komprimiert Fotos verlustbehaftet für extrem schnelle Web-Ladezeiten', isCorrect: false, explanation: 'TIFF basiert primär auf Pixeln; RAW ist unkomprimiert und sehr groß.' },
            { id: 'c', text: 'RAW besitzt kleinere Dateigrößen als JPEG; TIFF kann ausschließlich Schwarz-Weiß-Strichzeichnungen ohne Halbtöne abbilden', isCorrect: false, explanation: 'RAW-Dateien sind viel größer als JPEGs; TIFF unterstützt vollen Farbumfang.' },
            { id: 'd', text: 'TIFF dient ausschließlich der Videoausgabe; RAW kann ohne Konvertierung direkt im Offsetdruck belichtet werden', isCorrect: false, explanation: 'RAW kann nicht direkt belichtet werden; TIFF ist ein Druckvorstufenklassiker.' }
          ]
        },
        {
          id: 'q-ihk-4-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-4',
          question: 'Aufgabe 4b (2 Punkte): Wie viele Tonwertabstufungen pro Kanal sind bei 8 Bit bzw. 16 Bit Datentiefe möglich?',
          options: [
            { id: 'a', text: '8 Bit = 256 Tonwerte; 16 Bit = 65.536 Tonwerte pro Kanal', isCorrect: true, explanation: 'Richtig! 2^8 = 256 und 2^16 = 65.536.' },
            { id: 'b', text: '8 Bit = 64 Tonwerte; 16 Bit = 512 Tonwerte pro Kanal', isCorrect: false, explanation: 'Mathematisch falsch: 2^6 = 64 und 2^9 = 512.' },
            { id: 'c', text: '8 Bit = 1.024 Tonwerte; 16 Bit = 4.096 Tonwerte pro Kanal', isCorrect: false, explanation: '1.024 entspricht 10 Bit, 4.096 entspricht 12 Bit.' },
            { id: 'd', text: '8 Bit = 512 Tonwerte; 16 Bit = 16.384 Tonwerte pro Kanal', isCorrect: false, explanation: '512 entspricht 9 Bit, 16.384 entspricht 14 Bit.' }
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
            { id: 'b', text: 'Zacken im Histogramm belegen eine höhere Schärfe, da Photoshop fehlende Tonwertstufen automatisch mit Nachbarwerten füllt', isCorrect: false, explanation: 'Falsch. Kämme bedeuten fehlende Bilddaten und Tonwertverlust.' },
            { id: 'c', text: 'Kämme im Diagramm zeigen an, dass das Bild für den Zeitungsdruck zu viele Farbkanäle besitzt und gewandelt werden muss', isCorrect: false, explanation: 'Histogramme zeigen die Helligkeitsverteilung pro Kanal, nicht das Druckverfahren.' },
            { id: 'd', text: 'Lücken im Histogramm entstehen ausschließlich durch Staub auf dem Kamerasensor und haben keinen sichtbaren Einfluss', isCorrect: false, explanation: 'Histogrammlücken resultieren aus digitaler Tonwertspreizung bei geringer Bittiefe.' }
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
            { id: 'b', text: 'Abb. 1 (8 Bit) liefert das bessere Druckergebnis, da die Kämme im Histogramm zu einem schärferen Rasterpunkt auf der Druckplatte führen', isCorrect: false, explanation: 'Kämme im Histogramm führen zu hässlichen Tonwertabrissen (Banding), nicht zu Schärfe.' },
            { id: 'c', text: 'Abb. 2 zeigt ein vektorisiertes Bild, bei dem der Kurvenverlauf durch Bézierpfade unabhängig von Tonwerten dargestellt wird', isCorrect: false, explanation: 'Histogramme stellen Pixeltonwerte dar und keine Vektorpfade.' },
            { id: 'd', text: 'Beide Histogramme liefern im Offsetdruck identische Resultate, da Druckplatten physikalisch maximal 64 Tonwerte differenzieren können', isCorrect: false, explanation: 'Moderne Belichter und Rasterverfahren differenzieren bis zu 256 Tonwertstufen im Druck.' }
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
            { id: 'b', text: 'Weil RAW-Dateien bereits das finale CMYK-Farbprofil der Druckerei enthalten und keine weitere Profilkonvertierung mehr erfordern', isCorrect: false, explanation: 'RAW-Daten sind sensorspezifische RGB-Rohdaten ohne CMYK-Separation.' },
            { id: 'c', text: 'Weil JPEG-Bilder beim Import in Bildbearbeitungsprogramme grundsätzlich in den indexierten Farbraum mit 256 Farben gewandelt werden', isCorrect: false, explanation: 'Standard-JPEGs arbeiten mit 8 Bit pro RGB-Kanal (16,7 Mio. Farben), nicht mit 256 Farben.' },
            { id: 'd', text: 'Weil die Belichtungskorrektur im RAW-Converter die physikalische Bildauflösung von 72 ppi automatisch auf 300 ppi vervierfacht', isCorrect: false, explanation: 'Auflösung und Belichtung sind voneinander unabhängige Bildparameter.' }
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
            { id: 'b', text: '1. Vektoren unterstützen nur 16 Volltonfarben; 2. Pixelbilder können stufenlos ohne Qualitätsverlust auf beliebige Größen vergrößert werden', isCorrect: false, explanation: 'Falsch herum: Vektoren sind beliebig vergrößerbar, Pixelbilder verpixeln.' },
            { id: 'c', text: '1. Pixelbilder basieren auf Koordinaten und Bézierkurven; 2. Vektorgrafiken bestehen aus einem starren Raster von quadratischen Farbquadraten', isCorrect: false, explanation: 'Begriffe wurden vertauscht: Vektoren nutzen Kurven, Pixel nutzen Raster.' },
            { id: 'd', text: '1. Vektordateien können nur auf Mac-Systemen geöffnet werden; 2. Pixeldateien sind ausschließlich für den Monitordarstellungsmodus reserviert', isCorrect: false, explanation: 'Beide Grafikarten sind plattformunabhängig und im Druck sowie Web einsetzbar.' }
          ]
        },
        {
          id: 'q-ihk-5-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: 'Aufgabe 5b (2 Punkte): Erkläre, warum die SVG-Datei für eine starke Vergrößerung des Logos besser geeignet ist als die PNG-Datei.',
          options: [
            { id: 'a', text: 'Weil SVG-Pfade bei jeder Skalierung mathematisch neu berechnet werden und Kanten stets gestochen scharf bleiben', isCorrect: true, explanation: 'Richtig! Vektoren verlieren nie an Schärfe.' },
            { id: 'b', text: 'Weil SVG-Dateien beim Skalieren automatisch eine Interpolation auf feste 300 ppi im Ausgabegerät durchführen', isCorrect: false, explanation: 'Vektoren besitzen keine feste ppi-Auflösung, sondern stufenlose Pfadgeometrien.' },
            { id: 'c', text: 'Weil PNG-Dateien technisch auf Bildschirmdiagonalen von maximal 10 Zoll beschränkt sind und darüber nicht laden', isCorrect: false, explanation: 'PNGs laden auf beliebigen Bildschirmdiagonalen, verpixeln aber bei unzureichender Pixelmenge.' },
            { id: 'd', text: 'Weil SVG-Grafiken beim Vergrößern automatisch zusätzliche Pixelraster über einen integrierten Weichzeichner generieren', isCorrect: false, explanation: 'SVG arbeitet mit mathematischen Kurven und benötigt keine weichgezeichneten Raster.' }
          ]
        },
        {
          id: 'q-ihk-5-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: 'Aufgabe 5c (4 Punkte): Beschreibe zwei mögliche technische Probleme beim Einsatz der PNG-Datei (500 x 300px) auf einem Werbebanner (3 x 2m).',
          options: [
            { id: 'a', text: '1. Extreme Treppeneffekte / Pixelierung an Kanten; 2. Unscharfe, matschige Darstellung durch zu geringe effektive ppi-Auflösung', isCorrect: true, explanation: 'Exakte IHK-Musterlösung für Teil c)!' },
            { id: 'b', text: '1. Unbeabsichtigte Farbumkehrung aller CMYK-Werte; 2. Abreißen der Farbschichten während des physischen Trocknungsvorgangs', isCorrect: false, explanation: 'Geringe Auflösung führt zu Pixelierung, nicht zu physikalischen Farbfehlern.' },
            { id: 'c', text: '1. Automatische Spiegelung des gesamten Motivs; 2. Vollständiger Verlust aller eingebetteten Schriften und Schnittmarken', isCorrect: false, explanation: 'Bilder spiegeln sich nicht selbstständig; PNGs betten ohnehin keine Vektorschriften ein.' },
            { id: 'd', text: '1. Blockade des Druck-RIPs durch Vektorschleifen; 2. Automatische Verkleinerung des Banners auf DIN A4 durch den Drucker', isCorrect: false, explanation: 'PNG enthält keine Vektorschleifen, Druckmaße werden im RIP gesteuert.' }
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
            { id: 'b', text: '200 cm * 2,54 = 508 Zoll -> 500 px / 508 Zoll = ca. 0,98 ppi (Rechenfehler durch Multiplikation statt Division)', isCorrect: false, explanation: 'Falsch: 1 Zoll = 2,54 cm, daher muss durch 2,54 geteilt werden.' },
            { id: 'c', text: '500 px / 200 cm = 2,5 ppi (Rechenfehler durch vergessene Umrechnung von Zentimetern in Zoll)', isCorrect: false, explanation: 'Falsch: ppi bedeutet Pixel per INCH (Zoll), nicht Pixel pro Zentimeter.' },
            { id: 'd', text: '500 px * 2,54 / 200 cm = ca. 6,35 dpi -> aufgerundet 300 ppi durch RIP-Interpolation', isCorrect: false, explanation: 'Falsch: RIP-Interpolation erhöht nicht die optische Schärfe des Ausgangsbildes.' }
          ]
        },
        {
          id: 'l2-ihk-5-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-5',
          question: '[IHK Transfer] Wann muss eine Vektorgrafik im Produktionsprozess zwingend gerastert (in Pixel gewandelt) werden?',
          scenario: 'IHK Prüfungszettel Teil 1 - Aufgabe 5: Rasterungsprozesse.',
          options: [
            { id: 'a', text: 'Beim finalen Druck-RIP (Raster Image Processor) zur Erzeugung von Druckrastern oder beim Export in Pixelformate für Web-Bitmaps', isCorrect: true, explanation: 'Richtig! Die Belichtungseinheit/Drucker benötigt am Ende Belichtungspixel.' },
            { id: 'b', text: 'Bereits vor der ersten Skizzenphase im Entwurfsprozess zur Bestimmung der maximal zulässigen Pfadkomplexität', isCorrect: false, explanation: 'Im Entwurf bleiben Pfade voll editierbar als Vektoren.' },
            { id: 'c', text: 'Ausschließlich bei der Archivierung auf externen Festplatten, um den Speicherplatzbedarf von Vektordateien zu senken', isCorrect: false, explanation: 'Vektordateien sind meist kleiner als gerasterte Bitmaps; Vektoren werden archiviert.' },
            { id: 'd', text: 'Beim Versenden der Datei per E-Mail, da E-Mail-Programme vektorbasierte Grafiken generell nicht übertragen können', isCorrect: false, explanation: 'E-Mail-Programme übertragen beliebige Dateiformate unverändert als Anhang.' }
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
            { id: 'b', text: 'Verbindliche Festlegung der Druckplattenkosten und Speditionstarife vor Beginn der ersten Gestaltungsentwürfe', isCorrect: false, explanation: 'Druck- und Speditionskosten sind Aufgabe der Produktion/Kalkulation, nicht der Recherche.' },
            { id: 'c', text: 'Auswahl und Beschaffung neuer Hardware- und Arbeitsplatzsysteme für das gesamte Kreativteam der Agentur', isCorrect: false, explanation: 'IT-Beschaffung gehört zur Infrastruktur und nicht zur Entwurfsrecherche.' },
            { id: 'd', text: 'Schulung des Kunden in komplexen Farbmanagement- und Bildbearbeitungsprogrammen für künftige Eigenkorrekturen', isCorrect: false, explanation: 'Kunden erhalten Entwürfe und Abstimmungen, aber keine Softwareschulungen.' }
          ]
        },
        {
          id: 'q-ihk-6-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6b (3 Punkte): Erläutere, wie ein Moodboard zur Entwicklung eines Gestaltungskonzepts beiträgt.',
          options: [
            { id: 'a', text: 'Es visualisiert die angestrebte emotionale Stimmung, Farbwelt und Typografie und schafft ein gemeinsames visuelles Verständnis mit dem Kunden', isCorrect: true, explanation: 'Exakte IHK-Antwort aus Teil b)!' },
            { id: 'b', text: 'Es fungiert als fertige, belichtungsfähige Druckdatei für den Katalogdruck und ersetzt die Reinzeichnung in InDesign', isCorrect: false, explanation: 'Ein Moodboard ist eine konzeptionelle Collage und keine Druckdatei.' },
            { id: 'c', text: 'Es dient primär der mathematischen Berechnung des exakten Farbmengenverbrauchs für die spätere Druckkalkulation', isCorrect: false, explanation: 'Farbmengen werden erst nach Fertigstellung der Druckform im RIP berechnet.' },
            { id: 'd', text: 'Es stellt ein amtlich beglaubigtes Dokument zur markenrechtlichen Absicherung der Wort-Bild-Marke beim Patentamt dar', isCorrect: false, explanation: 'Markenrechtliche Prüfungen erfolgen über Rechtsanwälte und Patentämter.' }
          ]
        },
        {
          id: 'q-ihk-6-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6c (3 Punkte): Nenne drei Möglichkeiten, erste Gestaltungsideen zu visualisieren.',
          options: [
            { id: 'a', text: '1. Skizzen / Scribbles; 2. Moodboards; 3. Layout-Entwürfe / Wireframes / Mockups', isCorrect: true, explanation: 'Richtig! Das sind die 3 geforderten Visualisierungsformen.' },
            { id: 'b', text: '1. Maschinencode / Binärdaten; 2. SQL-Datenbanktabellen; 3. Netzwerkprotokolle', isCorrect: false, explanation: 'Das sind Software- und Datenstrukturen, keine Gestaltungsvisualisierungen.' },
            { id: 'c', text: '1. Telefonprotokolle; 2. Speditionslieferscheine; 3. Zahlungserinnerungen', isCorrect: false, explanation: 'Das sind kaufmännische Geschäftsbelege.' },
            { id: 'd', text: '1. Audio-Testaufnahmen; 2. Filmabspann-Texte; 3. Physische 3D-Belichtungsformen', isCorrect: false, explanation: 'Dies sind keine visuellen Entwurfsmethoden für grafische Grundideen.' }
          ]
        },
        {
          id: 'q-ihk-6-4',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-6',
          question: 'Aufgabe 6d (2 Punkte): Erläutere, warum entwickelte Entwürfe mit den Anforderungen des Briefings abgeglichen werden müssen.',
          options: [
            { id: 'a', text: 'Um sicherzustellen, dass die Zielgruppenanforderungen, Botschaften und CI-Vorgaben eingehalten wurden und Fehlentwürfe verhindert werden', isCorrect: true, explanation: 'Exakte IHK-Erklärung aus Teil d)!' },
            { id: 'b', text: 'Damit der Gestalter nachweist, dass alle im Briefing genannten Schriften im Betriebssystem ordnungsgemäß installiert sind', isCorrect: false, explanation: 'Der Briefing-Abgleich prüft inhaltliche und strategische Konformität, nicht Systemschriften.' },
            { id: 'c', text: 'Weil unkontrollierte Entwürfe automatisch das Erlöschen der Agenturhaftpflichtversicherung bei Reklamationen nach sich ziehen', isCorrect: false, explanation: 'Versicherungsrechtliche Fragen sind kein primärer didaktischer Grund des Gestaltungsabgleichs.' },
            { id: 'd', text: 'Weil die gesetzlichen Bestimmungen der DSGVO einen schriftlichen Protokollabgleich vor jeder Layoutpräsentation vorschreiben', isCorrect: false, explanation: 'Die DSGVO regelt den Schutz personenbezogener Daten, nicht Gestaltungsabgleiche.' }
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
            { id: 'b', text: 'Durch konsequentes Festhalten am allerersten Entwurf ohne Zwischenabstimmungen, um den kreativen Prozess nicht zu stören', isCorrect: false, explanation: 'Führt zu hohem Risiko, dass der Entwurf völlig an den Erwartungen des Kunden vorbeigeht.' },
            { id: 'c', text: 'Indem der Kunde erst nach dem finalen Druck der gesamten Gesamtauflage zur visuellen Begutachtung hinzugezogen wird', isCorrect: false, explanation: 'Zu diesem Zeitpunkt sind Korrekturen nur noch mit immensen Neudruckkosten möglich.' },
            { id: 'd', text: 'Indem alle gestalterischen Elemente vom Kunden selbst vorgezeichnet und von der Agentur nur technisch reproduziert werden', isCorrect: false, explanation: 'Die Agentur liefert die professionelle Konzeption und Gestaltung auf Basis des Briefings.' }
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
            { id: 'b', text: 'Scribbles stellen voll funktionsfähige Web-Applikationen dar; Mockups sind grobe Handskizzen auf Packpapier ohne Farbinformation', isCorrect: false, explanation: 'Genau umgekehrt: Scribbles sind Handskizzen, Mockups sind detaillierte Gestaltungsmodelle.' },
            { id: 'c', text: 'Scribbles werden ausschließlich mit Vektorprogrammen erstellt; Mockups basieren auf maschinengestützten 3D-Renderings', isCorrect: false, explanation: 'Scribbles entstehen meist analog oder per Stift-Tablet; Mockups sind 2D/3D-Layouts.' },
            { id: 'd', text: 'Scribbles und Mockups sind synonyme Fachbegriffe ohne funktionale oder methodische Differenzierung im Design-Workflow', isCorrect: false, explanation: 'Sie bezeichnen klar voneinander getrennte Phasen im Entwurfsprozess (Grob- vs. Feinentwurf).' }
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
            { id: 'b', text: 'Weil ISO Coated v2 ausschließlich monochrome Graustufenbilder ohne Farbseparation unterstützt', isCorrect: false, explanation: 'ISO Coated v2 ist das Standard-Farbprofil für gestrichenen 4-Farb-Offsetdruck.' },
            { id: 'c', text: 'Weil Rotationsdruckmaschinen für Zeitungen grundsätzlich nur RGB-Daten annehmen und CMYK-Profile ablehnen', isCorrect: false, explanation: 'Druckmaschinen arbeiten im 4-Farbdruck immer mit CMYK-Druckfarben.' },
            { id: 'd', text: 'Weil ungestrichenes Zeitungspapier physikalisch keine Druckfarbe aufnehmen kann und sofort reißt', isCorrect: false, explanation: 'Zeitungspapier saugt Tinte extrem stark auf; Überfeuchtung führt zum Reißen.' }
          ]
        },
        {
          id: 'q-ihk-7-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: 'Aufgabe 7b (4 Punkte): Beschreibe, wie die Datei einer Anzeige für die Ausgabe auf Zeitungspapier farblich aufbereitet werden sollte.',
          options: [
            { id: 'a', text: 'Profilkonvertierung in das Zeitungsprofil (z.B. ISOnewspaper/PSO SNP), Begrenzung des Gesamtfarbauftrags auf max. 240% und Berücksichtigung des Punktzuwachses', isCorrect: true, explanation: 'Richtig! Das entspricht den 4 Punkten aus Teil b).' },
            { id: 'b', text: 'Erhöhung des Farbauftrags auf 360% durch manuelle Zugabe von Cyan und Magenta in den Tiefen zur Kontraststeigerung', isCorrect: false, explanation: '360% Farbauftrag führt auf Zeitungspapier zu starkem Verschmieren und Durchschlagen.' },
            { id: 'c', text: 'Umwandlung aller Bilddaten in indexierte GIF-Dateien mit standardisierter 256-Farben-Webpalette zur Rauschunterdrückung', isCorrect: false, explanation: 'GIF ist ein Webformat und für hochwertige Zeitungsreproduktionen ungeeignet.' },
            { id: 'd', text: 'Export als unkomprimierte RGB-TIFF-Datei ohne Einbettung von Farbprofilen mit nativer Monitorauflösung von 72 ppi', isCorrect: false, explanation: 'Druckdaten müssen CMYK-separiert sein und 150-200 ppi für Zeitungsdruck aufweisen.' }
          ]
        },
        {
          id: 'q-ihk-7-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-7',
          question: 'Aufgabe 7c (3 Punkte): Erläutere, warum beim Zeitungsdruck der maximal zulässige Gesamtfarbauftrag berücksichtigt werden muss.',
          options: [
            { id: 'a', text: 'Um das Durchschlagen der Tinte auf die Rückseite, das Verschmieren/Ablegen im Stapel und zu lange Trocknungszeiten zu verhindern', isCorrect: true, explanation: 'Exakte IHK-Begründung aus Teil c)!' },
            { id: 'b', text: 'Um den Papiereinkaufspreis der Druckerei durch Reduktion des mechanischen Papiergewichts um 20% zu senken', isCorrect: false, explanation: 'Der Farbauftrag (TAC) reduziert nicht das Flächengewicht des Zeitungspapiers.' },
            { id: 'c', text: 'Weil übermäßiger Farbauftrag die Druckzylinder elektrostatisch auflädt und zu Funkenflug an der Papierbahn führt', isCorrect: false, explanation: 'Das Problem ist chemisch-mechanischer Natur (Trocknung und Viskosität), kein Funkenflug.' },
            { id: 'd', text: 'Weil Zeitungen mit hohem Farbauftrag das zulässige Postversandgewicht für Standardzustellungen überschreiten', isCorrect: false, explanation: 'Das getrocknete Farbgewicht ist im Verhältnis zum Papiergewicht vernachlässigbar.' }
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
            { id: 'b', text: 'Die Pixel werden automatisch in skalierbare Vektorpfade umgewandelt, um die Schärfe im Rotationsdruck zu erhalten', isCorrect: false, explanation: 'Farbprofile konvertieren Farbwerte in Pixeln, wandeln Rasterbilder aber nicht in Vektoren.' },
            { id: 'c', text: 'Sämtliche Farbinformationen in den Schatten werden linear abgeschnitten und durch reines 100% Schwarz ersetzt', isCorrect: false, explanation: 'Das Profil nutzt intelligente Farbreduktion (GCR/UCR) und schneidet Farben nicht hart ab.' },
            { id: 'd', text: 'Die physikalische Bildauflösung wird bei der Profilkonvertierung automatisch von 300 ppi auf 150 ppi halbiert', isCorrect: false, explanation: 'Die Pixelanzahl bleibt erhalten; die Neuberechnung betrifft ausschließlich die CMYK-Farbkanäle.' }
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
            { id: 'b', text: 'Weil Zeitungsdruckereien mit thermischen Laserdruckern arbeiten, die Farbpartikel durch Hitze auf das Doppelte aufblähen', isCorrect: false, explanation: 'Zeitungsdruck erfolgt im Rollenoffset mit flüssigen Druckfarben, nicht mit Laserdruckern.' },
            { id: 'c', text: 'Weil gestrichenes Bilderdruckpapier aus reiner Kunststofffolie besteht und dadurch jegliche Farbaufnahme blockiert', isCorrect: false, explanation: 'Bilderdruckpapier besteht aus Zellstoff mit Kreide-/Bindemittelstrich, nicht aus Plastik.' },
            { id: 'd', text: 'Weil der Punktzuwachs bei beiden Papierarten identisch ist und Unterschiede lediglich auf subjektiver Wahrnehmung beruhen', isCorrect: false, explanation: 'Der Punktzuwachs ist messbar genormt (ISO 12647-2 vs. ISO 12647-3) und physikalisch real.' }
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
            { id: 'b', text: 'Weil Layouter dadurch keine redaktionellen Texte mehr Korrektur lesen müssen und Satzfehler automatisch entfallen', isCorrect: false, explanation: 'Korrekturlesen bleibt für alle Ausgabekanäle unverzichtbar.' },
            { id: 'c', text: 'Weil Ausgabemedien wie Webseiten ohne Stylesheets grundsätzlich eine höhere Ladegeschwindigkeit und Konversionsrate erzielen', isCorrect: false, explanation: 'Webseiten benötigen CSS zur Darstellung; Inhalt und Layout werden im Code getrennt.' },
            { id: 'd', text: 'Weil Schriften im Offsetdruck nur dann eingebunden werden können, wenn Texte vollständig ohne Formatierung vorliegen', isCorrect: false, explanation: 'Druckschriften werden im PDF eingebettet, unabhängig von der Datentrennung in der Datenbank.' }
          ]
        },
        {
          id: 'q-ihk-8-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: 'Aufgabe 8b (3 Punkte): Nenne drei Arten von Produktinformationen, die unabhängig vom Ausgabemedium gespeichert werden können.',
          options: [
            { id: 'a', text: '1. Produktbeschreibungs-Texte; 2. Technische Daten / Maße / Preise; 3. Verweise auf hochauflösende Master-Bilder', isCorrect: true, explanation: 'Richtig! Das sind die 3 geforderten Inhaltskategorien.' },
            { id: 'b', text: '1. InDesign-Satzspiegel; 2. CSS-Stylesheets; 3. Druckplatten-Passkreuze und Schneidemarken', isCorrect: false, explanation: 'Das sind medienspezifische Layout- und Drucksteuerungsdaten.' },
            { id: 'c', text: '1. Belichtungszeiten im CTP; 2. Farbzonenvoreinstellungen; 3. Monitorauflösungen der Grafiker', isCorrect: false, explanation: 'Dies sind fertigungstechnische Parameter der Druckerei und der Arbeitsplätze.' },
            { id: 'd', text: '1. Papierlaufrichtungen; 2. Falzschemata der Weiterverarbeitung; 3. Rasterwinkelungen der Druckfarben', isCorrect: false, explanation: 'Dies sind rein physikalische Fertigungsparameter des Druck- und Weiterverarbeitungsprozesses.' }
          ]
        },
        {
          id: 'q-ihk-8-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-8',
          question: 'Aufgabe 8c (4 Punkte): Beschreibe anhand des Beispiels, wie ein und derselbe Inhalt für 2 unterschiedliche Ausgabemedien aufbereitet werden kann.',
          options: [
            { id: 'a', text: 'Aus der PIM-Datenbank wird der Text für den Print-Katalog in InDesign als CMYK-Layout platziert und für die Website dynamisch per HTML/CSS (sRGB) gerendert', isCorrect: true, explanation: 'Exakte IHK-Beispielantwort aus Teil c)!' },
            { id: 'b', text: 'Der Text wird für Print manuell auf Papier ausgedruckt und für den Webshop per Flachbettscanner als Bitmap-Grafik digitalisiert', isCorrect: false, explanation: 'Dies widerspricht jedem modernen medienneutralen Digital-Workflow.' },
            { id: 'c', text: 'Für jeden Ausgabekanal wird ein separater Redakteur beauftragt, der Produktbeschreibungen und Maßangaben jedes Mal neu formuliert', isCorrect: false, explanation: 'Dies erzeugt extremen Personalaufwand, Zeitverzögerungen und fatale Dateninkonsistenzen.' },
            { id: 'd', text: 'Der Inhalt wird ausschließlich im Newsletter versendet; Print-Katalog und Webshop greifen auf statische Platzhaltergrafiken zurück', isCorrect: false, explanation: 'Crossmedia Publishing bedient alle Kanäle konsistent mit echtem Content.' }
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
            { id: 'b', text: 'Das PIM-System steuert als Maschinensoftware direkt die Farbzonen und Druckplattenbelichter der Druckerei', isCorrect: false, explanation: 'Die Druckmaschinensteuerung erfolgt über CIP4/JDF-Schnittstellen und das Druck-RIP.' },
            { id: 'c', text: 'Ein PIM-System dient ausschließlich dem vektorbasierten Zeichnen von Produktlogos und Konstruktionsplänen', isCorrect: false, explanation: 'Konstruktionspläne entstehen in CAD-Software; PIM verwaltet Produkttexte und -daten.' },
            { id: 'd', text: 'PIM-Systeme verschlüsseln Bilddateien, um den Zugriff von Suchmaschinen auf die Website des Unternehmens zu verhindern', isCorrect: false, explanation: 'PIM-Systeme unterstützen SEO durch strukturierte Bereitstellung relevanter Metadaten.' }
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
            { id: 'b', text: 'Weil relationale SQL-Datenbanken keine typografischen Zeichen oder Zahlenwerte dauerhaft abspeichern können', isCorrect: false, explanation: 'Datenbanken speichern Textzeichen und Formatierungscodes problemlos als Strings ab.' },
            { id: 'c', text: 'Weil der Einsatz von CMYK-Farbcodes im World Wide Web durch das W3C-Konsortium ausdrücklich untersagt ist', isCorrect: false, explanation: 'CSS Color Module Level 4 erlaubt theoretisch CMYK-Funktionen, Standard ist sRGB.' },
            { id: 'd', text: 'Weil Formatierungscodes in Datenbanken zu unkontrollierbarem Papierstau an den Bogenoffsetmaschinen führen', isCorrect: false, explanation: 'Papierstau ist ein mechanisches Problem der Papieranlage, keine Folge von Softwarecodes.' }
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
            { id: 'a', text: '18 cm / 2,54 = 7,0866 Zoll -> 1800 px / 7,0866 Zoll = ca. 254 ppi (effektive Auflösung)', isCorrect: true, explanation: 'Exakter IHK-Rechenweg für Teil a)!' },
            { id: 'b', text: '1800 px / 18 cm = 100 ppi (falscher Rechenweg: Umrechnung von Zentimetern in Zoll wurde vergessen)', isCorrect: false, explanation: 'Falsch. ppi bezieht sich auf Zoll (Inch), daher muss durch 2,54 umgerechnet werden.' },
            { id: 'c', text: '1800 px * 2,54 / 18 cm = 254 dpi (Rechenfehler: Formelansatz mit falscher Einheitenverknüpfung)', isCorrect: false, explanation: 'Falsch: Multiplikation statt Division im falschen Term.' },
            { id: 'd', text: '18 cm * 2,54 = 45,72 Zoll -> 1800 px / 45,72 Zoll = ca. 39 ppi (fälschliche Multiplikation mit 2,54)', isCorrect: false, explanation: 'Falsch: 18 cm müssen durch 2,54 geteilt werden, um Zoll zu erhalten.' }
          ]
        },
        {
          id: 'q-ihk-9-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: 'Aufgabe 9b (2 Punkte): Beurteile, ob die vorhandene Bildauflösung (254 ppi) für die geforderten 300 ppi ausreicht. Begründen Sie Ihre Antwort.',
          options: [
            { id: 'a', text: 'Nein, die effektive Auflösung von 254 ppi liegt unter der geforderten Mindestauflösung von 300 ppi für den hochwertigen Druck', isCorrect: true, explanation: 'Exakte IHK-Beurteilung aus Teil b)!' },
            { id: 'b', text: 'Ja, 254 ppi reichen völlig aus, da im professionellen Offsetdruck grundsätzlich 72 ppi als Standardausgabe genügen', isCorrect: false, explanation: '72 ppi ist eine veraltete Bildschirm-Richtgröße, im hochwertigen Offsetdruck sind 300 ppi gefordert.' },
            { id: 'c', text: 'Ja, weil jede Auflösung über 150 ppi für gestrichenes Bilderdruckpapier automatisch als druckfertig zertifiziert ist', isCorrect: false, explanation: 'Für 60er/70er Raster im Bilderdruck ist ein Qualitätsfaktor von 1,5 bis 2 (ca. 300 ppi) nötig.' },
            { id: 'd', text: 'Nein, die Auflösung ist unerheblich, da die Datei vor dem Druck zwingend in ein SVG-Vektorformat gewandelt werden muss', isCorrect: false, explanation: 'Halbtonfotos werden als Rastergrafiken gedruckt und nicht in Vektordateien gewandelt.' }
          ]
        },
        {
          id: 'q-ihk-9-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-9',
          question: 'Aufgabe 9c (4 Punkte): Berechne die maximal mögliche Druckbreite in Zentimetern, wenn das Bild (1800 px) mit geforderten 300 ppi gedruckt werden soll.',
          options: [
            { id: 'a', text: '1800 px / 300 ppi = 6 Zoll -> 6 * 2,54 cm = 15,24 cm maximal mögliche Druckbreite', isCorrect: true, explanation: 'Exakter IHK-Rechenweg für Teil c)!' },
            { id: 'b', text: '1800 px / 300 ppi = 6 cm (Rechenfehler: Division ergibt Zoll und nicht direkt Zentimeter)', isCorrect: false, explanation: 'Falsch. Umrechnung von Zoll in cm (* 2,54) wurde vergessen.' },
            { id: 'c', text: '1800 px / (300 / 2,54) = 1800 / 118,11 = 24,00 cm (Rechenfehler durch falschen Quotienten)', isCorrect: false, explanation: 'Falsch: 1800 / 118,11 ergibt ca. 15,24 cm und nicht 24 cm.' },
            { id: 'd', text: '1800 px / 100 ppi = 18,00 cm (falsch: bei 18 cm Breite beträgt die Auflösung nur 254 ppi)', isCorrect: false, explanation: 'Bei 18 cm Druckbreite wird die geforderte Auflösung von 300 ppi verfehlt.' }
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
            { id: 'b', text: '3600 px / 100 ppi = 36 cm (Rechenfehler: Umrechnung von Zentimetern in Zoll wurde ausgelassen)', isCorrect: false, explanation: 'Falsch: Division durch 100 ignoriert die geforderten 300 ppi und den Zollfaktor 2,54.' },
            { id: 'c', text: '3600 px / 300 ppi = 12 cm (Rechenfehler: Ergebnis in Zoll wurde irrtümlich als Zentimeter gewertet)', isCorrect: false, explanation: 'Falsch: 12 Zoll entsprechen 30,48 cm und nicht 12 cm.' },
            { id: 'd', text: '3600 px / (300 / 2,54) = ca. 45,72 cm (Rechenfehler durch unkorrekte Bruchrechnung im Nenner)', isCorrect: false, explanation: 'Falsch: Die maximale Druckbreite bei 300 ppi beträgt exakt 30,48 cm.' }
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
            { id: 'b', text: 'Weil die Interpolation im Photoshop-Algorithmus alle Farbkanäle zwingend in eine 1-Bit-Strichgrafik reduziert', isCorrect: false, explanation: 'Interpolation behält Farbinformationen bei, interpoliert aber weichgezeichnete Pixel.' },
            { id: 'c', text: 'Weil Auflösungen von 300 ppi in modernen Druck-RIPs generell nicht verarbeitet werden dürfen', isCorrect: false, explanation: '300 ppi ist der weltweite Standard für qualitativ hochwertige Druckbelichtungen.' },
            { id: 'd', text: 'Weil Photoshop beim Hochrechnen automatisch alle Schärfeinformationen aus den EXIF-Metadaten unwiederbringlich entfernt', isCorrect: false, explanation: 'EXIF-Daten enthalten Metadaten wie Kameraeinstellungen, keine Pixelinformationen.' }
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
            { id: 'b', text: '1. Feste Druckauflösung von 300 ppi erzwingen; 2. Speichern im unkomprimierten TIFF; 3. Beibehaltung des Druck-CMYK-Farbraums', isCorrect: false, explanation: 'Das sind klassische Druckanforderungen, die für Webseiten viel zu große Datenmengen erzeugen.' },
            { id: 'c', text: '1. Manuelle Konvertierung in 1-Bit-Strichfilm; 2. Einbettung aller Schnittmarken; 3. Umwandlung aller Pixel in EPS-Vektoren', isCorrect: false, explanation: 'Schnittmarken und Strichfilme gehören in die Druckplattenbelichtung, nicht ins Webdesign.' },
            { id: 'd', text: '1. Löschung aller RGB-Kanäle; 2. Reduzierung auf 16 Web-Sicherheitsfarben; 3. Verdoppelung der Bildmaße für Retina-Displays', isCorrect: false, explanation: 'Web-Sicherheitsfarben sind veraltet; RGB-Kanäle müssen erhalten bleiben.' }
          ]
        },
        {
          id: 'q-ihk-10-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: 'Aufgabe 10b (3 Punkte): Ein Bild (1300 x 867 Pixel) wird unter Beibehaltung des Seitenverhältnisses auf 960 Pixel Breite reduziert. Berechnen Sie die Bildhöhe in ganzen Pixeln.',
          options: [
            { id: 'a', text: '867 / 1300 * 960 = 640.24 -> gerundet 640 Pixel Höhe', isCorrect: true, explanation: 'Exakter IHK-Rechenweg für Teil b)!' },
            { id: 'b', text: '1300 / 960 * 867 = 1174.12 -> gerundet 1174 Pixel Höhe (Seitenverhältnis verkehrt berechnet)', isCorrect: false, explanation: 'Falsch: Bei Verkleinerung der Breite muss auch die Höhe kleiner werden.' },
            { id: 'c', text: '867 - (1300 - 960) = 527 -> 527 Pixel Höhe (Differenzrechnung statt proportionaler Dreisatz)', isCorrect: false, explanation: 'Falsch: Skalierung erfordert proportionale Division/Multiplikation, keine Subtraktion.' },
            { id: 'd', text: '960 / 1300 * 867 = 640.24 -> 867 Pixel Höhe (Fehler: Bildhöhe fälschlicherweise unverändert übernommen)', isCorrect: false, explanation: 'Falsch: Die Höhe muss proportional auf 640 Pixel angepasst werden.' }
          ]
        },
        {
          id: 'q-ihk-10-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-10',
          question: 'Aufgabe 10c (4 Punkte): Auf der Startseite eines Erlebnisbauernhofs soll das Motiv (Ferkel-Nahaufnahme) eingesetzt werden. Erläutern Sie, ob dieses Bild dafür geeignet ist.',
          options: [
            { id: 'a', text: 'Ungeeignet: Makro-Ausschnitt bietet keinen Hof-Kontext (keine Attraktionen/Natur), wirkt durch Schlamm unruhig und bietet keinen Negativraum für Text/Buttons', isCorrect: true, explanation: 'Exakte IHK-Musterbewertung aus Teil c)!' },
            { id: 'b', text: 'Hervorragend geeignet: Das Motiv transportiert alle Facetten des Hofes wie Gastronomie, Spielplätze und Übernachtungsangebote auf einen Blick', isCorrect: false, explanation: 'Falsch: Eine Nahaufnahme eines Ferkels zeigt weder das Außengelände noch das Freizeitangebot.' },
            { id: 'c', text: 'Ungeeignet: CMYK-Farbbilder sind in modernen Webbrowsern aus urheberrechtlichen Gründen grundsätzlich gesperrt', isCorrect: false, explanation: 'Falsch: CMYK betrifft Farbdarstellung und nicht Urheberrecht; es geht um die Motivwirkung.' },
            { id: 'd', text: 'Hervorragend geeignet: Die Nahaufnahme verfügt über ausreichend Weißraum am Bildrand zur Platzierung langer Menü-Navigationsleisten', isCorrect: false, explanation: 'Falsch: Das Makro ist randabfallend und extrem detailreich ohne Negativraum.' }
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
            { id: 'b', text: 'Weil Webserver Bilddateien beim Hochladen automatisch um 95% ihrer visuellen Bildschärfe und Tonwertstufen berauben', isCorrect: false, explanation: 'Webserver komprimieren Dateien nur bei explizit konfigurierten Optimierungs-Pipelines.' },
            { id: 'c', text: 'Weil Monitore technisch maximal 100 KB Bilddaten im Grafikspeicher gleichzeitig puffern und anzeigen können', isCorrect: false, explanation: 'Moderne Grafikkarten verfügen über mehrere Gigabyte Videospeicher.' },
            { id: 'd', text: 'Weil die physikalische ppi-Zahl beim Webspeichern automatisch von 240 ppi auf 0 ppi zurückgesetzt wird', isCorrect: false, explanation: 'Die ppi-Zahl im Datei-Header ist im Web irrelevant; entscheidend sind Pixelmaße und Kompression.' }
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
            { id: 'b', text: 'Ein fehlerhaft belichtetes fotografisches Filmnegativ, das vor der Webnutzung digital invertiert werden muss', isCorrect: false, explanation: 'Negativraum ist ein kompositorischer Gestaltungsbegriff für unbesetzte Flächen.' },
            { id: 'c', text: 'Einen deckenden schwarzen Zierrahmen um das Banner, der den Bildinhalt von der restlichen Website abgrenzt', isCorrect: false, explanation: 'Ein Rahmen ist ein Begrenzungselement und kein kompositorischer Weißraum/Negativraum.' },
            { id: 'd', text: 'Einen gesperrten Bildbereich mit negativen Farb- und Kontrastwerten, der vom Druck-RIP nicht belichtet werden kann', isCorrect: false, explanation: 'Negative Farbwerte existieren im digitalen Standard-Farbmodell nicht.' }
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
            { id: 'b', text: 'Die gesamte 45°-Linie wird parallel nach unten verschoben, um das Gesamtbild gleichmäßig dunkler zu belichten', isCorrect: false, explanation: 'Falsch. Das dunkelt auch die sonnigen Fachwerkhäuser unerwünscht ab.' },
            { id: 'c', text: 'Die Gradationskurve wird S-förmig nach unten durchgebogen, um die Schatten maximal zu verdunkeln und die Lichter aufzuhellen', isCorrect: false, explanation: 'Falsch. Dies würde den Kontrast noch weiter steigern und die Tunneltiefen absaufen lassen.' },
            { id: 'd', text: 'Die Kurve wird waagerecht auf die 100%-Marke gelegt, um sämtliche Bildbereiche in vollflächiges Schwarz umzuwandeln', isCorrect: false, explanation: 'Falsch. Eine waagerechte Kurve zerstört alle Tonwertabstufungen.' }
          ]
        },
        {
          id: 'q-ihk-11-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: 'Aufgabe 11b (4 Punkte): Beschreiben Sie, wie sich die vorgenommene Korrektur auf Vierteltöne, Mitteltöne und Dreivierteltöne auswirkt.',
          options: [
            { id: 'a', text: 'Dreivierteltöne (Schatten im Tunnel) werden stark aufgehellt; Mitteltöne leicht angehoben; Vierteltöne (sonnige Fachwerkhäuser) bleiben unverändert', isCorrect: true, explanation: 'Exakte IHK-Musterantwort aus Teil b)!' },
            { id: 'b', text: 'Alle drei Tonwertbereiche werden über das gesamte Spektrum hinweg absolut gleichmäßig um 50% aufgehellt', isCorrect: false, explanation: 'Falsch. Die Gradationskurve arbeitet selektiv und nicht linear über alle Tonwerte.' },
            { id: 'c', text: 'Vierteltöne werden komplett in reines Schwarz überführt, während Dreivierteltöne zu reinem Weiß gebleicht werden', isCorrect: false, explanation: 'Falsch. Dies wäre eine extreme Tontrennung (Posterisation).' },
            { id: 'd', text: 'Die selektive Tonwertänderung wirkt sich ausschließlich auf den Cyan-Kanal aus; Gelb und Magenta bleiben unberührt', isCorrect: false, explanation: 'Falsch. Die Tonwertkorrektur wurde auf die Gesamthelligkeit (RGB/Composite) angewendet.' }
          ]
        },
        {
          id: 'q-ihk-11-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-11',
          question: 'Aufgabe 11c (2 Punkte): Erläutern Sie ein mögliches Problem, das bei einer zu starken Aufhellung der dunklen Bildbereiche entstehen kann.',
          options: [
            { id: 'a', text: 'Verstärkung von störendem Sensorrauschen in den Schatten, flauer Kontrast und sichtbare Tonwertabrisse im Mauerwerk', isCorrect: true, explanation: 'Exakte IHK-Warnung aus Teil c)!' },
            { id: 'b', text: 'Vollständiges Ausbleichen und Verschwinden der sonnenbeschienenen Fachwerkhäuser im Hintergrund des Bildes', isCorrect: false, explanation: 'Falsch. Die Lichter wurden durch den Fixierpunkt auf der 45°-Linie geschützt.' },
            { id: 'c', text: 'Automatische irreversible Zerstörung der Datei durch mathematischen Überlauf im Gradationsmodul der Software', isCorrect: false, explanation: 'Bildverarbeitungsprogramme stürzen durch Kurvenanpassungen nicht ab.' },
            { id: 'd', text: 'Unzulässige Verschiebung des Rasterwinkels im Druck-RIP mit Entstehung störender Moiré-Muster im Bild', isCorrect: false, explanation: 'Aufgehellte Schatten reduzieren den Gesamtfarbauftrag eher, statt ihn zu verdoppeln.' }
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
            { id: 'b', text: 'Vollständiges Freistellen des Tunnelportals, um den dunklen Vordergrund durch eine gleichmäßige Volltonfläche zu ersetzen', isCorrect: false, explanation: 'Der Kunde wünscht authentische Bildwirkung und keinen künstlichen Freisteller.' },
            { id: 'c', text: 'Automatische Vektorisierung aller Bildkonturen zur verlustfreien Skalierung auf großformatige City-Light-Plakate', isCorrect: false, explanation: 'Fotos werden im Druck als gerasterte Bilddaten reproduziert, nicht vektorisiert.' },
            { id: 'd', text: 'Erzeugung eines gleichmäßigen Grauschleiers über der gesamten Szene, um den Motivkontrast künstlich auf null zu reduzieren', isCorrect: false, explanation: 'Ein Grauschleier zerstört die Brillanz und die Bildqualität im Druck.' }
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
            { id: 'b', text: 'Eine globale Helligkeitserhöhung schützt die Lichter vor Überbelichtung, während die Gradationskurve immer das gesamte Bild gleichmäßig aufhellt', isCorrect: false, explanation: 'Genau umgekehrt: Globale Helligkeit brennt Lichter aus, Gradationskurven bieten selektiven Schutz.' },
            { id: 'c', text: 'Gradationskurven lassen sich ausschließlich auf Graustufenbilder anwenden; für Farbbilder steht nur der lineare Helligkeitsregler zur Verfügung', isCorrect: false, explanation: 'Gradationskurven funktionieren in RGB, CMYK und LAB gleichermaßen für jeden Kanal.' },
            { id: 'd', text: 'Zwischen selektiver Gradationskurven-Anpassung und linearer Helligkeitsverschiebung existiert mathematisch kein messbarer Unterschied', isCorrect: false, explanation: 'Lineare Verschiebung addiert einen Festwert; Kurven nutzen nichtlineare Polynom-Funktionen.' }
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
            { id: 'b', text: 'Die rein physikalische Speicherkapazität und Umdrehungsgeschwindigkeit der im Rechner verbauten Festplatte', isCorrect: false, explanation: 'Hardware-Kennzahlen des Rechners sind keine Metadaten einer Bilddatei.' },
            { id: 'c', text: 'Ein spezielles Softwareprogramm zur hardwarebeschleunigten Retusche von fehlerhaften Bilddaten in der Druckvorstufe', isCorrect: false, explanation: 'Metadaten sind Informationsattribute und kein Anwendungsprogramm.' },
            { id: 'd', text: 'Die gemessene Übertragungsrate und Bandbreite der Internetverbindung zwischen Agenturserver und Druckereiserver', isCorrect: false, explanation: 'Netzwerkbandbreiten betreffen die Infrastruktur, nicht den Dateninhalt der Datei.' }
          ]
        },
        {
          id: 'q-ihk-12-2',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: 'Aufgabe 12b (4 Punkte): Nennen Sie vier Metadaten, die für die Verwaltung und Suche nach Bilddateien hilfreich sind.',
          options: [
            { id: 'a', text: '1. Titel / Beschreibung; 2. Urheber / Fotograf; 3. Stichwörter / Tags; 4. Nutzungsrechte / Lizenzablaufdatum', isCorrect: true, explanation: 'Richtig! Das entspricht genau den 4 Punkten aus Teil b).' },
            { id: 'b', text: '1. Monitor-Farbkalibrierung; 2. Mauszeiger-Position; 3. Raumtemperatur im Büro; 4. Tastaturanschläge pro Minute', isCorrect: false, explanation: 'Dies sind irrelevante Umgebungs- und Eingabewerte ohne Bezug zur Bildorganisation.' },
            { id: 'c', text: '1. Firmenname der Druckerei; 2. Einkaufspreis des Papiers; 3. Kennzeichen des Speditionsfahrzeugs; 4. Postleitzahl des Lagers', isCorrect: false, explanation: 'Dies sind betriebswirtschaftliche Logistikdaten, keine Bildmetadaten.' },
            { id: 'd', text: '1. Seriennummer des Scanners; 2. Modellbezeichnung der Blitzanlage; 3. Büroetage des Fotografen; 4. Telefontarif des Kunden', isCorrect: false, explanation: 'Dies sind Inventar- und Nebenkostendaten ohne Nutzen für Bildsuchsysteme.' }
          ]
        },
        {
          id: 'q-ihk-12-3',
          chapterId: 'ihk-original-teil1',
          moduleId: 'ihk-orig-12',
          question: 'Aufgabe 12c (4 Punkte): Beschreiben Sie zwei Vorteile eines zentralen Digital-Asset-Management-Systems (DAM) gegenüber einer unstrukturierten Ordnerablage.',
          options: [
            { id: 'a', text: '1. Single Source of Truth verhindert veraltete Dateiversionen/Dubletten; 2. Schnelle metadatenbasierte Suche & Lizenzrechte-Schutz vor Abmahnungen', isCorrect: true, explanation: 'Exakte IHK-Musterlösung aus Teil c)!' },
            { id: 'b', text: '1. Vollständiger Verzicht auf Serverstrom; 2. Automatischer Druck aller Assets ohne manuelle Druckfreigabe', isCorrect: false, explanation: 'Ein DAM benötigt Serverinfrastruktur und ersetzt keine redaktionelle Druckfreigabe.' },
            { id: 'c', text: '1. Automatisches Unlesbarmachen archivierter Daten; 2. Permanente Reduzierung der Bildwiederholrate am Arbeitsplatz', isCorrect: false, explanation: 'Ein DAM sichert die Lesbarkeit und beeinträchtigt Monitore nicht.' },
            { id: 'd', text: '1. Gleichzeitige Löschung aller Masterdateien nach 14 Tagen; 2. Verbot jeglicher Verschlagwortung zur Speicherplatzeinsparung', isCorrect: false, explanation: 'Ein DAM archiviert Masterdaten langfristig und basiert auf strukturierter Verschlagwortung.' }
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
            { id: 'b', text: 'Indem das System alle erfassten Fotodateien nach Ablauf von 7 Tagen unwiderruflich von sämtlichen Servern löscht', isCorrect: false, explanation: 'Ein DAM löscht keine wertvollen Kunden-Assets unkontrolliert, sondern sperrt deren Verwendung.' },
            { id: 'c', text: 'Indem sichtbare Wasserzeichen irreversibel und deckend über das Zentrum aller gespeicherten Bilder eingebrannt werden', isCorrect: false, explanation: 'Ein DAM bewahrt hochauflösende Masterdateien ohne zerstörerische Wasserzeichen auf.' },
            { id: 'd', text: 'Indem das DAM-System jegliche Weitergabe von Bildmaterial an Druckereien oder Webagenturen standardmäßig blockiert', isCorrect: false, explanation: 'Ein DAM ermöglicht kontrollierten, rollenbasierten Zugriff für Produktionspartner.' }
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
            { id: 'b', text: 'EXIF (Exchangeable Image File Format) & TIFF-Header (nur für primäre Kameradaten, unzureichend für erweiterte Redaktionsdaten)', isCorrect: false, explanation: 'EXIF speichert technische Kameradaten (Blende/Zeit), deckt aber redaktionelle Rechte nicht voll ab.' },
            { id: 'c', text: 'Dublin Core & Schema.org (primär für semantische Webdokumente, kein nativer Bildmetadatenstandard)', isCorrect: false, explanation: 'Dublin Core und Schema.org sind Webstandards, nicht die primären eingebetteten Bildstandards.' },
            { id: 'd', text: 'ID3v2 & Vorbis Comment (spezifische Metadatencontainer für digitale Audioproduktionen)', isCorrect: false, explanation: 'ID3 und Vorbis sind Metadatenstandards für Audiodateien (MP3/OGG), nicht für Bilddateien.' }
          ]
        }
      ]
    }
  ]
};
