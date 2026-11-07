export interface FreetextSubTask {
  id: string; // e.g. 'a', 'b', 'c' or 'eps', 'gif', etc.
  label: string; // e.g. "a) 3 Möglichkeiten zur Strukturierung"
  points: number;
  keywordGroups: string[][]; // Array of synonym groups; at least one synonym in each group must match for credit
  modelAnswer: string;
}

export type FreetextSeries = 'ihk-teil-1' | 'themen-vertiefung';
export type FreetextTopic = 'medienneutral' | 'formate' | 'prozess' | 'ux' | 'wiso' | 'a11y';

export interface FreetextQuestion {
  id: string;
  series: FreetextSeries;
  topic: FreetextTopic;
  isOriginalSheet?: boolean; // Kennzeichnung für Aufgaben aus den Prüfungszetteln (lila Rahmen)
  diagramType?: 'histogram-comparison' | 'vector-pixel-comparison' | 'cmyk-paper-comparison' | 'media-neutral-workflow' | 'dpi-calculator' | 'photoshop-web-dialog' | 'gradation-curve-tool' | 'dam-metadata-inspector';
  category: string;
  title: string;
  scenario: string;
  question: string;
  maxPoints: number;
  subTasks: FreetextSubTask[];
  hint: string;
  // Backward compatibility fields for single-block answers
  requiredKeywords: string[];
  modelAnswer: string;
}

export const FREETEXT_TOPIC_FILTERS = [
  { id: 'all', label: 'Alle Aufgaben' },
  { id: 'ihk-teil-1', label: 'IHK Prüfung Teil 1 (Original Zettel)' },
  { id: 'medienneutral', label: 'Medienneutrale Daten' },
  { id: 'formate', label: 'Bild- & Grafikformate' },
  { id: 'prozess', label: 'Gestaltungsprozess & Briefing' },
  { id: 'ux', label: 'UX & Gestaltsgesetze' },
  { id: 'wiso-a11y', label: 'Recht, WiSo & A11y' },
] as const;

export const FREETEXT_QUESTIONS: FreetextQuestion[] = [
  // --- AUTHENTIC IHK-PRÜFUNGSVORBEREITUNG (TEIL 1) ---
  {
    id: 'ihk-p1-aufgabe-1',
    series: 'ihk-teil-1',
    topic: 'medienneutral',
    isOriginalSheet: true,
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 1: Medienneutrale Datenhaltung & Datenstrukturierung',
    scenario: 'Der vorhandene Datenbestand eines Kunden wird für die medienneutrale Nutzung neu organisiert. Die vorhandenen Daten sollen sachgerecht strukturiert werden.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zur strukturierten und medienneutralen Datenhaltung:',
    maxPoints: 10,
    hint: 'Gliedere deine Antwort in a), b) und c). Denke bei a) an Ordner, Dateinamen und Metadaten, bei b) an RGB-Master & Verlustfreiheit, und bei c) an Single Source of Truth und Zukunftssicherheit.',
    requiredKeywords: ['ordner', 'verzeichnis', 'namenskonvention', 'metadaten', 'master', 'rgb', 'ausgabe', 'zeitersparnis', 'redundanz', 'zukunftssicherheit'],
    modelAnswer: 'a) Drei Möglichkeiten zur Strukturierung: 1. Logische Verzeichnis- und Ordnerhierarchie (z.B. nach Kunde, Projekt, Dateitypen /Rohdaten, /Layouts, /Export), 2. Einheitliche Namenskonventionen (Projekt_Datum_Version_Farbraum), 3. Einbettung von Metadaten / Tagging (IPTC/XMP oder DAM-System).\nb) Medienneutrale Daten liegen in einem universellen, hochauflösenden und verlustfreien Master-Format (z.B. RGB im Farbraum eciRGBv2/AdobeRGB, RAW/TIFF oder Vektor) vor. Die Umrechnung in Ziel-Farbräume (z.B. CMYK für Offset) oder Komprimierung erfolgt erst beim tatsächlichen Medien-Export.\nc) Vorteile: 1. Zeitersparnis & Redundanzvermeidung (Single Source of Truth – Änderungen müssen nur einmal im Master vorgenommen werden), 2. Maximale Qualitäts- und Zukunftssicherheit für neue Medienkanäle und hochauflösende Displays ohne Qualitätsverlust durch frühe Farbraumreduktion.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Nennen Sie drei Möglichkeiten, Daten zu strukturieren. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['ordner', 'verzeichnis', 'hierarchie', 'dateisystem', 'struktur'],
          ['benennung', 'namenskonvention', 'dateiname', 'versionierung', 'dateinamen'],
          ['metadaten', 'tagging', 'schlagwörter', 'iptc', 'xmp', 'dam', 'datenbank', 'verschlagwortung']
        ],
        modelAnswer: 'Drei Möglichkeiten: 1. Ordner- und Verzeichnishierarchie (nach Projekt/Format/Status), 2. Einheitliche Namenskonventionen (z.B. Kunde_Projekt_Datum_v01), 3. Metadaten / Tagging (IPTC, XMP oder Digital-Asset-Management DAM).'
      },
      {
        id: 'b',
        label: 'b) Beschreiben Sie, was medienneutrale Daten auszeichnet. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['master', 'quelldaten', 'unabhängig', 'universell', 'ausgabeneutral'],
          ['rgb', 'farbraum', 'ecirgb', 'adobergb', 'farbtiefe', 'farbprofil'],
          ['verlustfrei', 'hochauflösend', 'raw', 'vektor', 'erst bei ausgabe', 'export']
        ],
        modelAnswer: 'Medienneutrale Daten sind ausgabeunabhängig und verlustfrei im Master-Format gespeichert (z.B. Vektor oder RGB in großem Farbraum wie eciRGBv2). Die Transformation in spezifische Druckfarbräume (CMYK) oder Webauflösungen erfolgt erst beim endgültigen Export.'
      },
      {
        id: 'c',
        label: 'c) Beschreiben Sie zwei Vorteile der strukturierten und medienneutralen Datenhaltung. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['single source', 'zeitersparnis', 'redundanz', 'nur einmal', 'effizient', 'schneller', 'auffindbarkeit'],
          ['qualität', 'zukunftssicherheit', 'flexibilität', 'neue kanäle', 'kein verlust', 'verlustfrei', 'displays']
        ],
        modelAnswer: '1. Zeitersparnis und Vermeidung von Redundanzen (Single Source of Truth: Änderungen am Master wirken sich konsistent aus, schnelle Auffindbarkeit). 2. Maximale Qualität und Zukunftssicherheit: Neue Medien oder Formate können jederzeit verlustfrei aus den Master-Quelldaten generiert werden.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-2',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 2: Grafikformate für Print & Web (Firmenlogo)',
    scenario: 'Ein in Illustrator erstelltes Firmenlogo soll für eine Veröffentlichung sowohl im Printmedium als auch im Internet verwendet werden.',
    question: 'Erläutern Sie die Vor- und Nachteile folgender Formate und deren Anwendung:\n- EPS\n- GIF\n- SVG\n- PNG 24\n- TIF\n(Jeweils 2 Punkte, insgesamt 10 Punkte)',
    maxPoints: 10,
    hint: 'Behandle jedes der 5 Formate einzeln mit Vor- und Nachteilen sowie der passenden Anwendung (Print vs. Web).',
    requiredKeywords: ['eps', 'vektor', 'print', 'svg', 'skalierbar', 'web', 'gif', '256', 'png', 'transparenz', 'alpha', 'tif', 'druckvorstufe', 'cmyk'],
    modelAnswer: '1. EPS (2 Pkt): Vorteile: Vektorbasiert, stufenlos skalierbar, Standard in Druckvorstufe. Nachteile: Veraltet (abgelöst durch PDF/SVG), keine native Browserunterstützung, Transparenzen problematisch. Anwendung: Nur Print / Druckerei.\n2. GIF (2 Pkt): Vorteile: Frame-Animationen, kleine Dateigröße bei wenig Farben, universell unterstützt. Nachteile: Max. 256 Farben (8-Bit), nur harte 1-Bit Transparenz, pixelbasiert. Anwendung: Früher Web, für Logos heute ungeeignet.\n3. SVG (2 Pkt): Vorteile: XML-Vektorformat, stufenlos verlustfrei skalierbar (auch Retina), minimale Dateigröße, CSS/JS-animierbar. Nachteile: Nicht für Pixel-Fotos geeignet, RIPs im Offsetdruck verarbeiten es oft nicht direkt. Anwendung: Ideales Standardformat für das Logo im Internet / Web.\n4. PNG 24 (2 Pkt): Vorteile: Verlustfrei, echter 8-Bit Alphakanal für weiche transparente Kanten, 16,7 Mio. Farben. Nachteile: Pixelbasiert (verpixelt beim Vergrößern), größer als SVG, kein CMYK. Anwendung: Fallback fürs Web bei Pixelanforderungen.\n5. TIF (2 Pkt): Vorteile: Verlustfrei, unterstützt CMYK und hohe Farbtiefe (16/32 Bit) und Ebenen. Nachteile: Riesige Dateigröße, nicht webbrowser-kompatibel, als Pixelformat nicht unbegrenzt skalierbar. Anwendung: Print / Druckvorstufe.',
    subTasks: [
      {
        id: 'eps',
        label: 'EPS (Encapsulated PostScript) – 2 Punkte',
        points: 2,
        keywordGroups: [
          ['vektor', 'skalierbar', 'verlustfrei', 'druckvorstufe'],
          ['print', 'druck', 'druckerei', 'nicht im web', 'veraltet', 'kein browser']
        ],
        modelAnswer: 'Vorteile: Vektorformat, unbegrenzt skalierbar, Print-Standard. Nachteile: Veraltet, keine Web-Browserunterstützung. Anwendung: Ausschließlich Print/Druckvorstufe.'
      },
      {
        id: 'gif',
        label: 'GIF (Graphics Interchange Format) – 2 Punkte',
        points: 2,
        keywordGroups: [
          ['animation', 'klein', 'browser', 'kompatibel'],
          ['256 farben', 'pixel', 'treppeneffekt', 'keine echte transparenz', '1-bit', 'ungeeignet für logo', 'veraltet']
        ],
        modelAnswer: 'Vorteile: Einfache Animationen, geringe Dateigröße. Nachteile: Maximal 256 Farben, keine weichen Halbton-Transparenzen, pixelbasiert. Anwendung: Frühes Web für animierte Icons; für Firmenlogos ungeeignet.'
      },
      {
        id: 'svg',
        label: 'SVG (Scalable Vector Graphics) – 2 Punkte',
        points: 2,
        keywordGroups: [
          ['vektor', 'skalierbar', 'retina', 'kleine dateigröße', 'xml', 'css'],
          ['web', 'internet', 'browser', 'online', 'logo im web']
        ],
        modelAnswer: 'Vorteile: XML-Vektorgrafik, beliebig ohne Qualitätsverlust skalierbar, gestochen scharf auf Retina, winzige Dateigröße. Nachteile: Nicht für Fotos geeignet, im Offsetdruck Konvertierung nötig. Anwendung: Standard für das Logo im Internet/Web.'
      },
      {
        id: 'png24',
        label: 'PNG 24 (Portable Network Graphics) – 2 Punkte',
        points: 2,
        keywordGroups: [
          ['transparenz', 'alpha', 'alphakanal', 'weich', 'echte transparenz', 'verlustfrei'],
          ['pixel', 'web', 'nicht im druck', 'kein cmyk', 'verpixelt']
        ],
        modelAnswer: 'Vorteile: Volle Farbtiefe (16,7 Mio. Farben), stufenloser 8-Bit-Alphakanal für transparente Schatten. Nachteile: Pixelbasiert (skaliert nicht verlustfrei), kein CMYK. Anwendung: Web-Darstellung für Pixelgrafiken mit Transparenz.'
      },
      {
        id: 'tif',
        label: 'TIF / TIFF (Tagged Image File Format) – 2 Punkte',
        points: 2,
        keywordGroups: [
          ['cmyk', 'druckvorstufe', 'farbtiefe', 'hochwertig', 'verlustfrei', 'druck'],
          ['groß', 'dateigröße', 'kein web', 'nicht im browser', 'pixel', 'print']
        ],
        modelAnswer: 'Vorteile: Höchste Bildqualität, unterstützt CMYK-Farbprofile und Ebenen, verlustfreie Kompression. Nachteile: Sehr große Dateien, keine Browseranzeige. Anwendung: Hochwertige Druckvorstufe / Print.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-3',
    series: 'ihk-teil-1',
    topic: 'prozess',
    isOriginalSheet: true,
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 3: Gestaltungsprozess & Kundenbriefing (Bio-Lieferservice)',
    scenario: 'Eine Werbeagentur erhält den Auftrag, eine Anzeigenkampagne für einen neuen regionalen Bio-Lieferservice zu entwickeln. Die Anzeigen sollen in einer Stadtzeitschrift und in sozialen Netzwerken erscheinen. Vor Beginn der Gestaltung findet ein Briefing mit dem Kunden statt.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zum Briefing und Gestaltungsprozess:',
    maxPoints: 10,
    hint: 'a) Definition/Funktion des Briefings [2P], b) 4 konkrete Inhalte/Informationen für den Bio-Lieferdienst [4P], c) 2 typische Probleme bei unvollständigem Briefing [4P].',
    requiredKeywords: ['briefing', 'zielgruppe', 'ziele', 'corporate design', 'budget', 'termine', 'zeitplan', 'formate', 'fehlgestaltung', 'mehrkosten', 'verzögerung'],
    modelAnswer: 'a) Funktion des Briefings (2 Pkt): Das Briefing bildet die verbindliche Informations- und Arbeitsgrundlage zwischen Kunde und Agentur. Es definiert Aufgabenstellung, Ziele, Rahmenbedingungen und Erwartungen, um Fehlplanungen zu vermeiden und eine klare Richtschnur für den Gestaltungsprozess zu setzen.\nb) Vier wichtige Informationen im Briefing (4 Pkt): 1. Zielgruppe (wer soll erreicht werden, z.B. gesundheitsbewusste Familien, Bio-Käufer), 2. Kernbotschaft / USP (z.B. regional, 100% bio, gleiche Tag Lieferung), 3. Corporate Design Vorgaben (Logo, Hausschrift, Markenfarben, bestehende Guidelines), 4. Technische Formate, Termine & Budget (Anzeigengröße Stadtzeitschrift in mm, Social Media Formate 1:1/9:16, Deadline, Budgetrahmen).\nc) Zwei Probleme bei unklarem Briefing (4 Pkt): 1. Fehlgestaltung an Zielgruppe oder Kundenwunsch vorbei (Entwürfe gefallen nicht, Zielgruppe wird verfehlt, Entwürfe müssen verworfen werden), 2. Zeitverzögerungen und Kostenexplosion (unnötige Korrekturschleifen, verpasste Drucktermine in der Stadtzeitschrift, Budgetüberschreitung).',
    subTasks: [
      {
        id: 'a',
        label: 'a) Erläutern Sie die Funktion eines Briefings innerhalb des Gestaltungsprozesses. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['grundlage', 'arbeitsgrundlage', 'informationsbasis', 'kommunikation', 'auftrag', 'ziel'],
          ['orientierung', 'erwartung', 'rahmenbedingungen', 'missverständnisse vermeiden', 'leitfaden', 'startpunkt']
        ],
        modelAnswer: 'Das Briefing dient als verbindliche Kommunikations- und Informationsgrundlage zwischen Kunde und Agentur. Es klärt Erwartungen, Projektziele und Rahmenbedingungen, um Fehlinterpretationen zu vermeiden.'
      },
      {
        id: 'b',
        label: 'b) Nennen Sie vier Informationen, die im Briefing geklärt werden sollten. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['zielgruppe', 'persona', 'kunden', 'empfänger'],
          ['ziel', 'botschaft', 'usp', 'aussage', 'kernbotschaft', 'angebot'],
          ['corporate design', 'cd', 'ci', 'logo', 'farben', 'schrift', 'vorgaben', 'designrichtlinien'],
          ['format', 'abmessung', 'termin', 'deadline', 'zeitplan', 'budget', 'medien', 'zeitschrift', 'social media']
        ],
        modelAnswer: '1. Zielgruppe (wer soll angesprochen werden), 2. Kernbotschaft / USP (z.B. regional, frisch), 3. Corporate Design Vorgaben (Logo, Farben, Schriftart), 4. Formate, Budget und Deadlines (Maße für Stadtzeitschrift & Social Media).'
      },
      {
        id: 'c',
        label: 'c) Erklären Sie zwei mögliche Probleme bei unvollständigem oder unklarem Briefing. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['fehlgestaltung', 'zielgruppe verfehlt', 'am kunden vorbei', 'falsches design', 'entwürfe verworfen', 'unzufrieden'],
          ['korrekturschleifen', 'zeitverzögerung', 'termin verpasst', 'mehrkosten', 'budgetüberschreitung', 'deadline verfehlt']
        ],
        modelAnswer: '1. Fehlgestaltung an den Bedürfnissen der Zielgruppe oder Vorstellungen des Kunden vorbei (Entwürfe müssen komplett neu erstellt werden). 2. Zeitliche Verzögerungen und Budgetüberschreitung durch endlose Korrekturschleifen und verpasste Druckabgabetermine.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-4',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    diagramType: 'histogram-comparison',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 4: Dateiformate (TIFF vs. RAW), Datentiefe & Histogrammanalyse',
    scenario: 'Fotografen liefern digitale Bilder in verschiedenen Dateiformaten und Datentiefen. Die Bilder sollen für ein Kundenprojekt bearbeitet und anschließend für den Druck aufbereitet werden.\nFür die Weiterverarbeitung stehen zwei Bilddateien zur Verfügung:\n• TIFF, 8 Bit/Kanal\n• RAW, mit einer Datentiefe von 16 Bit/Kanal',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zu Dateiformaten, Tonwertabstufungen und Histogrammen:',
    maxPoints: 10,
    hint: 'Gliedere in a) Vorteil TIFF & RAW [2P], b) Tonwertanzahl bei 8 Bit (256) vs. 16 Bit (65.536) [2P], c) Histogrammanalyse (Kamm-Effekt, Tonwertabrisse/Banding vs. glatte 16-Bit-Kurve) [6P].',
    requiredKeywords: ['tiff', 'raw', '256', '65536', '65.536', 'tonwerte', 'histogramm', 'kamm', 'kammeffekt', 'abriss', 'tonwertabriss', 'banding', 'posterisation', 'verlauf'],
    modelAnswer: 'a) Vorteile für Bildbearbeitung & Druckvorbereitung (2 Pkt):\n- TIFF (8 Bit/Kanal): Universelles Standardformat, das ohne Konvertierung direkt in Layoutprogrammen (InDesign) und Druck-RIPs platziert werden kann; kompaktere Dateigröße.\n- RAW (16 Bit/Kanal): Maximale Farbinformationen und Dynamikbereich der Kamerasensordaten; verlustfreie Belichtungs- und Weißabgleichskorrektur im RAW-Konverter ohne Qualitätsverluste.\nb) Mögliche Tonwertabstufungen pro Kanal (2 Pkt):\n- 8 Bit/Kanal: 2^8 = 256 Tonwertstufen pro Kanal (entspricht ca. 16,7 Millionen Farben bei 3 RGB-Kanälen).\n- 16 Bit/Kanal: 2^16 = 65.536 Tonwertstufen pro Kanal (entspricht über 281 Billionen Farben bei 3 RGB-Kanälen).\nc) Histogrammanalyse & Qualitätsverluste bei Tonwertkorrekturen (6 Pkt):\n- Abb. 1 (8 Bit/Kanal) zeigt einen deutlichen "Kamm-Effekt" (Spike-Lücken im Histogramm). Da bei 8 Bit nur 256 Stufen vorhanden sind, reißen bei starken Tonwertkorrekturen (z.B. Kontrastanhebung, Spreizung der Tiefen/Lichter) Werte ab. Qualitätsverlust: Es entsteht sichtbare Posterisation / Tonwertabrisse (Banding) – weiche Farb- und Helligkeitsverläufe (z.B. Himmel) wirken stufig, fleckig und unruhig.\n- Abb. 2 (16 Bit/Kanal) zeigt eine geschlossene, glatte Tonwertkurve. Dank der extrem hohen Auflösung von 65.536 Stufen bleiben feinste Tonwertübergänge auch nach massiven Gradations- und Tonwertkorrekturen homogen und absolut verlustfrei erhalten.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Beschreiben Sie jeweils einen Vorteil der beiden Dateiformate für die weitere Bildbearbeitung und Druckvorbereitung. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['tiff', 'standard', 'direkt', 'layout', 'druckvorstufe', 'kompatibel', 'kleinere dateigröße'],
          ['raw', 'dynamikumfang', 'belichtung', 'farbinformationen', 'sensor', 'verlustfrei', 'weißabgleich', 'reserven']
        ],
        modelAnswer: 'TIFF: Universeller Druckstandard, kann direkt ohne Entwicklung in InDesign platziert werden. RAW: Maximale Sensordaten, verlustfreie Weißabgleichs- und Belichtungskorrektur mit enormen Reserven.'
      },
      {
        id: 'b',
        label: 'b) Geben Sie an, wie viele Tonwertabstufungen pro Kanal bei 8 Bit bzw. 16 Bit möglich sind. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['256', '2^8'],
          ['65536', '65.536', '2^16']
        ],
        modelAnswer: '8 Bit/Kanal: 2^8 = 256 Tonwertabstufungen. 16 Bit/Kanal: 2^16 = 65.536 Tonwertabstufungen pro Farbkanal.'
      },
      {
        id: 'c',
        label: 'c) Erläutern Sie anhand der Histogramme den Einfluss der Datentiefe und beschreiben Sie mögliche Qualitätsverluste bei Tonwertkorrekturen. (6 Punkte)',
        points: 6,
        keywordGroups: [
          ['kamm', 'kammeffekt', 'lücken', 'unterbrechungen', 'spikes', 'abb 1', 'abb. 1', '8 bit'],
          ['tonwertabriss', 'abriss', 'banding', 'posterisation', 'abstufung', 'stufen', 'verlauf', 'himmel', 'streifen'],
          ['glatt', 'geschlossen', 'homogen', 'abb 2', 'abb. 2', '16 bit', 'hohe auflösung', 'feine nuancen', 'verlustfrei']
        ],
        modelAnswer: 'Abb. 1 (8 Bit) zeigt Kamm-Effekte (Lücken im Histogramm). Qualitätsverlust: Bei Tonwertspreizungen fehlen Zwischenwerte, es kommt zu Tonwertabrissen / Banding (streifige, stufige Übergänge statt weicher Verläufe). Abb. 2 (16 Bit) bietet durch 65.536 Stufen eine glatte, lückenlose Tonwertkurve, die selbst nach intensiven Korrekturen verlustfrei und homogen bleibt.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-5',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    diagramType: 'vector-pixel-comparison',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 5: Vektorgrafiken vs. Pixelbilder (Firmenlogo für Werbebanner)',
    scenario: 'Für einen Kunden soll ein Firmenlogo auf einer Visitenkarte, einem großformatigen Werbebanner und einer Website eingesetzt werden.\nDas Logo liegt sowohl als vektorbasierte SVG-Datei als auch als PNG-Datei mit 500 × 300 Pixeln vor.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zu Vektorgrafiken, Skalierung und Großformatdruck:',
    maxPoints: 10,
    hint: 'a) 2 technische Unterschiede (Mathematik/Pfade vs. Pixelraster; Auflösungsunabhängigkeit) [4P], b) Warum SVG bei Vergrößerung besser ist [2P], c) 2 Probleme der PNG auf dem Großbanner (Verpixelung/Aliasing, mangelnde Druckauflösung) [4P].',
    requiredKeywords: ['vektor', 'pixel', 'pfade', 'raster', 'auflösungsunabhängig', 'auflösung', 'skalierbar', 'verpixelung', 'treppeneffekt', 'banner', 'dpi', 'aliasing', 'cmyk'],
    modelAnswer: 'a) Zwei grundlegende technische Unterschiede (4 Pkt):\n1. Aufbau: Vektorgrafiken basieren auf mathematisch definierten Vektoren (Pfade, Bézierkurven, geometrische Formen mit Füll- und Konturwerten). Pixelbilder bestehen aus einem zweidimensionalen Raster einzelner quadratischer Bildpunkte (Pixel), denen feste Farbwerte zugeordnet sind.\n2. Skalierbarkeit / Auflösungsabhängigkeit: Vektorgrafiken sind auflösungsunabhängig; sie lassen sich ohne jeglichen Qualitätsverlust beliebig vergrößern oder verkleinern. Pixelbilder sind auflösungsabhängig; bei Vergrößerung sinkt die relative Pixeldichte (DPI/PPI), wodurch einzelne Pixel sichtbar werden (Interpolation / Unschärfe).\nb) Warum die SVG-Datei für starke Vergrößerung besser geeignet ist (2 Pkt):\nDie SVG-Datei wird bei jeder Darstellungsgröße mathematisch neu gerendert und bleibt stets randscharf und konturgenau. Die PNG-Datei mit nur 500 × 300 Pixeln besitzt eine feste endliche Pixelmenge; auf einem Großformatbanner (z.B. 2 × 1,2 Meter) ergibt sich daraus eine extrem niedrige effektive Auflösung von unter 10 DPI, sodass die Grafik unscharf und unbrauchbar wird.\nc) Zwei mögliche technische Probleme beim Einsatz der PNG auf einem großformatigen Werbebanner (4 Pkt):\n1. Sichtbare Verpixelung und Treppeneffekte (Aliasing): Die wenigen Pixel werden auf Metergröße gestreckt, wodurch grobe Kantenstufen, Klötzchenbildung und fransige Konturen mit bloßem Auge unansehnlich sichtbar sind.\n2. Unzureichende Druckauflösung und Farbverschiebungen: Die Auflösung liegt meilenweit unter dem Druckstandard (selbst im Großformat mindestens 50–100 DPI nötig). Zudem liegt PNG im RGB-Farbraum vor und unterstützt kein natives CMYK für den Druck-RIP, was zu matten oder verfälschten Farben im Druck führt.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Erläutern Sie zwei grundlegende technische Unterschiede zwischen Vektorgrafiken und Pixelbildern. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['mathematisch', 'pfad', 'pfade', 'kurven', 'bézier', 'linien', 'formel', 'punkte'],
          ['raster', 'pixel', 'bildpunkte', 'farbwert', 'gitter'],
          ['auflösungsunabhängig', 'beliebig skalierbar', 'ohne qualitätsverlust', 'verlustfrei', 'auflösungsabhängig', 'dpi', 'ppi']
        ],
        modelAnswer: '1. Datenstruktur: Vektorgrafiken bestehen aus mathematischen Pfaden und Kurven; Pixelbilder aus einem Raster diskreter Farbpunkte. 2. Skalierbarkeit: Vektoren sind auflösungsunabhängig beliebig vergrößerbar; Pixelbilder verpixeln beim Vergrößern (auflösungsabhängig).'
      },
      {
        id: 'b',
        label: 'b) Erklären Sie, warum die SVG-Datei für eine starke Vergrößerung besser geeignet ist als die PNG-Datei. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['mathematisch', 'neu berechnet', 'neu gerendert', 'randscharf', 'stufenlos', 'immer scharf', 'vektor'],
          ['500', 'feste pixel', 'zu wenig pixel', 'streckung', 'auflösung sinkt', 'geringe dpi']
        ],
        modelAnswer: 'SVG wird bei jeder Größe mathematisch neu und randscharf gerendert. Die PNG-Datei mit nur 500 × 300 Pixeln besitzt zu wenige Bildpunkte und führt bei Großformaten zu einer unbrauchbaren Auflösung von unter 10 DPI.'
      },
      {
        id: 'c',
        label: 'c) Beschreiben Sie zwei mögliche technische Probleme, die beim Einsatz der PNG-Datei auf dem Werbebanner auftreten können. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['verpixelung', 'treppeneffekt', 'pixelig', 'aliasing', 'unscharf', 'klötzchen', 'fransig'],
          ['druckauflösung', 'zu geringe auflösung', 'dpi', 'cmyk', 'rgb', 'farbraum', 'farbverschiebung', 'druckqualität']
        ],
        modelAnswer: '1. Sichtbare Verpixelung und Treppeneffekte (Aliasing) an den Kanten des Logos. 2. Extrem mangelhafte Druckauflösung (unter 10 DPI) sowie Farbraumprobleme (PNG ist RGB statt Druck-CMYK).'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-6',
    series: 'ihk-teil-1',
    topic: 'prozess',
    isOriginalSheet: true,
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 6: Recherche, Moodboard & Entwurfsprozess (Kulturzentrum)',
    scenario: 'Eine Agentur entwickelt ein Erscheinungsbild für ein neu gegründetes Kulturzentrum. Das Briefing wurde abgeschlossen und die Zielgruppe ist definiert. Bevor die endgültigen Layouts erstellt werden, sollen unterschiedliche gestalterische Lösungsansätze entwickelt werden.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis d) zu Recherche, Moodboards, Visualisierungsmethoden und Briefing-Abgleich:',
    maxPoints: 10,
    hint: 'Gliedere in a) Zweck der Recherchephase [2P], b) Beitrag des Moodboards [3P], c) 3 Visualisierungsmöglichkeiten & Nutzen [3P], d) Warum Abgleich mit dem Briefing zwingend ist [2P].',
    requiredKeywords: ['recherche', 'analyse', 'moodboard', 'zielgruppe', 'briefing', 'scribble', 'skizze', 'wireframe', 'prototyp', 'atmosphäre', 'abstimmung', 'abgleich'],
    modelAnswer: 'a) Zweck der Recherche- und Analysephase (2 Pkt):\nAufbau einer fundierten Wissens- und Inspirationsbasis. Durch Wettbewerbsanalyse (Benchmarking) und Zielgruppenuntersuchungen werden Marktchancen erkannt, Alleinstellungsmerkmale (USP) herausgearbeitet und Fehlentscheidungen oder Klischees im Entwurfsprozess vermieden.\nb) Beitrag eines Moodboards zum Gestaltungskonzept (3 Pkt):\nEin Moodboard visualisiert als Collage aus Bildern, Farben, Typografie, Formen und Texturen die gewünschte emotionale Atmosphäre. Es dient als "Visual Alignment" zur frühzeitigen Abstimmung zwischen Agentur und Kunde, macht abstrakte Adjektive (z.B. "lebendig", "offen") visuell greifbar und fungiert als gestalterischer Kompass in der Entwurfsphase.\nc) Drei Visualisierungsmöglichkeiten & Nutzen (3 Pkt):\n1. Scribbles / Handskizzen: Spontane, schnelle und kostengünstige Ideenfindung, um ohne Softwareaufwand viele unterschiedliche Richtungen zu testen und schnell zu verwerfen.\n2. Wireframes / Groblayouts: Klären Hierarchie, Informationsarchitektur und Raumaufteilung ohne visuelle Ablenkung durch Farben oder Bilder.\n3. Style-Tiles / UI-Prototypen: Veranschaulichen Kombinationen aus Farben, Schriften und UI-Elementen im Zusammenspiel, um frühes Feedback zur Gestaltungsanmutung einzuholen.\nd) Notwendigkeit des Briefing-Abgleichs (2 Pkt):\nDer Abgleich stellt sicher, dass das Design nicht rein nach subjektivem Geschmack entsteht, sondern die vereinbarten Kommunikationsziele, Zielgruppenanforderungen, Deadlines und technischen Vorgaben des Kunden verbindlich und passgenau erfüllt werden.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Beschreiben Sie den Zweck einer Recherche- und Analysephase im Gestaltungsprozess. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['recherche', 'analyse', 'ist-zustand', 'wettbewerb', 'konkurrenz', 'benchmark', 'markt'],
          ['informationsbasis', 'wissensbasis', 'grundlage', 'zielgruppe', 'differenzierung', 'inspiration', 'trends', 'klischees vermeiden']
        ],
        modelAnswer: 'Zweck: Aufbau einer fundierten Informations- und Inspirationsbasis. Durch Wettbewerbsanalyse (Benchmarking) und Zielgruppenrecherche werden Marktchancen identifiziert, Differenzierungsmerkmale herausgearbeitet und Fehlgestaltungen vermieden.'
      },
      {
        id: 'b',
        label: 'b) Erläutern Sie, wie ein Moodboard zur Entwicklung eines Gestaltungskonzepts beitragen kann. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['moodboard', 'collage', 'stimmung', 'visuell', 'bildwelt', 'atmosphäre', 'farbwelt', 'typografie'],
          ['abstimmung', 'kunde', 'team', 'gemeinsames verständnis', 'visual alignment', 'kommunikation', 'adjektive greifbar', 'erwartungshaltung'],
          ['roter faden', 'leitfaden', 'orientierung', 'leitplanke', 'kompass', 'entwurfsphase', 'konzept']
        ],
        modelAnswer: 'Ein Moodboard visualisiert als Collage aus Farben, Bildern, Schriften und Texturen die gewünschte emotionale Atmosphäre. Es dient als visuelle Brücke zwischen Kunde und Agentur, macht abstrakte Adjektive greifbar und fungiert als Gestaltungsleitfaden.'
      },
      {
        id: 'c',
        label: 'c) Nennen Sie drei Möglichkeiten, erste Gestaltungsideen zu visualisieren, und beschreiben Sie jeweils deren Nutzen. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['scribble', 'skizze', 'handskizze', 'schnell', 'ideenfindung', 'spontan', 'verwerfen', 'viele ideen'],
          ['wireframe', 'groblayout', 'struktur', 'aufteilung', 'hierarchie', 'raster', 'informationsarchitektur'],
          ['style tile', 'prototyp', 'klickdummy', 'layoutentwurf', 'mockup', 'feedback', 'farbkombination']
        ],
        modelAnswer: '1. Scribbles / Handskizzen: Schnelle, spontane Ideenfindung zum Entwickeln und Verwerfen vieler Ansätze. 2. Wireframes / Groblayouts: Klärung von Hierarchie und Raumaufteilung ohne Farb-Ablenkung. 3. Style-Tiles / Prototypen: Frühe Bemusterung von Farb- und Typokombinationen für Feedback.'
      },
      {
        id: 'd',
        label: 'd) Erläutern Sie, warum die entwickelten Entwürfe mit den Anforderungen des Briefings abgeglichen werden müssen. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['zielgruppe', 'briefing', 'anforderungen', 'vorgaben', 'ziele', 'kommunikationsziele'],
          ['objektivität', 'qualitätssicherung', 'am kunden vorbei', 'kontrolle', 'fehlentwicklung', 'korrekturen vermeiden', 'erfüllt']
        ],
        modelAnswer: 'Der Abgleich stellt sicher, dass Entwürfe nicht rein nach subjektivem Geschmack gestaltet werden, sondern die vereinbarten Kommunikationsziele, Zielgruppenbedürfnisse, Budget- und Terminvorgaben des Kunden objektiv und zielgerichtet erfüllen.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-7',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    diagramType: 'cmyk-paper-comparison',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 7: Farbmanagement & Zeitungsdruck (ISO Coated v2 vs. ISOnewspaper)',
    scenario: 'Die Datei einer Anzeige ist im CMYK-Quellfarbraum ISO Coated v2 300 % (ECI) angelegt.\nDie Anzeige soll nun in einer Tageszeitung auf Zeitungspapier gedruckt werden.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zur Farbraumkonvertierung, Zeitungsdruck-Eigenschaften und Gesamtfarbauftrag:',
    maxPoints: 10,
    hint: 'Gliedere in a) Warum ISO Coated v2 für Zeitungspapier ungeeignet ist [3P], b) Fachgerechte Aufbereitung (Profilkonvertierung in ISOnewspaper, Tonwertanpassung) [4P], c) Warum maximaler Gesamtfarbauftrag (TAC ca. 240%) zwingend eingehalten werden muss [3P].',
    requiredKeywords: ['iso coated', 'isonewspaper', 'zeitungspapier', 'gestrichen', 'ungestrichen', 'punktzuwachs', 'absaufen', 'gesamtfarbauftrag', 'tac', '240', 'abschmieren', 'coldset', 'trocknung', 'durchschlagen'],
    modelAnswer: 'a) Warum ISO Coated v2 für Zeitungspapier ungeeignet ist (3 Pkt):\nISO Coated v2 (FOGRA39) ist für hochwertiges, gestrichenes Bilderdruckpapier mit glatter Oberfläche und geringer Saugfähigkeit gerechnet (Punktzuwachs ca. 14%). Zeitungspapier ist hingegen stark saugfähig, ungestrichen, rau und vergilbt-grau. Bei direktem Druck ohne Anpassung führt der enorme Punktzuwachs (26–30%) dazu, dass Bildtiefen komplett schwarz absaufen, Konturen vermatschen und Farben stark verfälscht wirken.\nb) Farblicher Aufbereitungsprozess für Zeitungspapier (4 Pkt):\n1. Profilkonvertierung: Umwandlung der Bild- und Druckdaten in das offizielle Zeitungsprofil (z.B. ISOnewspaper26v4.icc oder PSO_SNP_Paper_eci.icc) via Rendering Intent "relativ farbmetrisch mit Tiefenkompensation" (oder perzeptiv).\n2. Tonwertanpassung & Unbuntaufbau: Lichter auf mindestens 3–5% Tonwert anlegen, damit sie nicht wegreißen. Schattenbereiche aufhellen, um Zeichnung zu erhalten. Starker Unbuntaufbau (GCR/UCR) sorgt für eine stabile Graubalance und reduziert Buntfarben in den Tiefen.\nc) Berücksichtigung des maximal zulässigen Gesamtfarbauftrags (3 Pkt):\nIm Rollenzeitungsdruck (Coldset) erfolgt die Trocknung rein physikalisch durch Wegschlagen der Farbe in die porösen Papierfasern – ganz ohne Heißlufttrocknung. Der Gesamtfarbauftrag (Summe C+M+Y+K) muss strikt auf maximal 220–240% limitiert sein (statt 300% bei ISO Coated). Zu hoher Farbauftrag führt zu nassem Abschmieren/Ablegen der Farbe auf Folgeseiten und Leitwalzen, Durchfeuchtung des dünnen Papiers und gefürchteten Papierbahnbrüchen in der Rotationsmaschine.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Erläutern Sie, warum das vorhandene CMYK-Profil für den Zeitungsdruck nicht ohne Weiteres geeignet ist. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['gestrichen', 'bilderdruck', 'glatt', 'hochwertig', 'iso coated', 'fogra39'],
          ['ungestrichen', 'zeitungspapier', 'saugfähig', 'porös', 'grau', 'gelblich', 'papierfärbung'],
          ['punktzuwachs', 'tonwertzuwachs', 'absaufen', 'dunkel', 'matschig', 'farbbluten', 'schatten', 'zuwachs']
        ],
        modelAnswer: 'ISO Coated v2 ist für glattes, gestrichenes Bilderdruckpapier mit geringer Saugfähigkeit berechnet. Zeitungspapier ist stark saugfähig, grau-gelblich und ungestrichen. Ohne Konvertierung führt der enorme Punktzuwachs (26–30%) zum Absaufen der Tiefen und Farbverfälschung.'
      },
      {
        id: 'b',
        label: 'b) Beschreiben Sie, wie die Datei für die Ausgabe auf Zeitungspapier farblich aufbereitet werden sollte. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['profil', 'konvertierung', 'transformation', 'farbmanagement', 'isonewspaper', 'isonewspaper26v4', 'pso snp', 'icc'],
          ['rendering intent', 'relativ farbmetrisch', 'tiefenkompensation', 'bpc', 'perzeptiv'],
          ['lichter', 'tiefen', 'tonwert', 'aufhellen', 'kontrast', 'gcr', 'ucr', 'unbuntaufbau', 'gradation']
        ],
        modelAnswer: '1. Profilkonvertierung in das Standard-Zeitungsprofil (ISOnewspaper26v4.icc) mittels "relativ farbmetrisch mit Tiefenkompensation". 2. Tonwertanpassung: Lichter auf mind. 3–5% anlegen, Schatten aufhellen und GCR/UCR-Unbuntaufbau zur Graubalancestabilisierung einsetzen.'
      },
      {
        id: 'c',
        label: 'c) Erläutern Sie, warum beim Zeitungsdruck der maximal zulässige Gesamtfarbauftrag berücksichtigt werden muss. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['gesamtfarbauftrag', 'tac', '240', '240%', '220%'],
          ['trocknung', 'wegschlagen', 'coldset', 'rollenoffset', 'ohne hitze', 'langsam'],
          ['abschmieren', 'ablegen', 'papierbahn', 'bahnbruch', 'durchfeuchtung', 'durchschlagen', 'reißen']
        ],
        modelAnswer: 'Im Rollenzeitungsdruck (Coldset) trocknet die Farbe ohne Hitze rein durch Wegschlagen. Der Gesamtfarbauftrag darf max. 220–240% betragen (Coated erlaubt 300%). Zu viel Farbe verursacht Abschmieren auf Folgeseiten, Durchfeuchtung und Papierbahnbrüche in der Maschine.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-8',
    series: 'ihk-teil-1',
    topic: 'medienneutral',
    isOriginalSheet: true,
    diagramType: 'media-neutral-workflow',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 8: Medienneutrale Datenhaltung & Multi-Channel-Publishing (Katalog vs. Web)',
    scenario: 'Ein Verlag produziert einen gedruckten Produktkatalog, eine Website und einen digitalen Newsletter. Die Produktinformationen sollen nur einmal gepflegt und anschließend für alle drei Medien genutzt werden.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zur Trennung von Inhalt und Form, medienneutralen Datenarten und Multi-Channel-Aufbereitung:',
    maxPoints: 10,
    hint: 'Gliedere in a) Warum Trennung von Inhalt und Gestaltung wesentlich ist [3P], b) 3 medienneutrale Produktinformationsarten [3P], c) Konkretes Beispiel: Aufbereitung für Print-Katalog vs. Website/Newsletter [4P].',
    requiredKeywords: ['trennung', 'inhalt', 'form', 'gestaltung', 'layout', 'single source', 'pim', 'xml', 'json', 'katalog', 'website', 'cmyk', 'rgb', '300 dpi', 'html', 'css', 'absatzformate'],
    modelAnswer: 'a) Trennung von Inhalt und Gestaltung als wesentliche Voraussetzung (3 Pkt):\nInhalte werden medienneutral und rein semantisch strukturiert in einer zentralen Datenbank (PIM / CMS / XML / JSON) gespeichert – vollkommen frei von visuellen Layout-Vorgaben wie Schriftgraden, Farbwerten oder Umbrüchen. Erst im jeweiligen Ausgabekanal werden formatspezifische Gestaltungsregeln (CSS im Web/Newsletter, Absatzformate in InDesign) angewendet. Dadurch wird das Prinzip "Single Source of Truth" realisiert: Daten werden zentral an einem Ort gepflegt und können konsistent und redundantfrei in beliebige Medienkanäle exportiert werden.\nb) Drei Arten medienneutraler Produktinformationen (3 Pkt):\n1. Stammdaten & Identifikatoren: Artikelnummer, EAN/GTIN, SKU, Hersteller-Code.\n2. Semantische Beschreibungstexte: Produktname/Titel, Beschreibungstext, Bulletpoints mit technischen Spezifikationen (Maße, Gewicht, Material).\n3. Konditionen & Mastermedien: Netto-/Bruttopreise, Verfügbarkeiten, Masterbilder im hochauflösenden RGB- oder Vektorformat.\nc) Konkrete Aufbereitung für zwei Ausgabemedien (4 Pkt):\n- 1. Gedruckter Produktkatalog (Print): Die strukturierten Daten fließen automatisiert (z.B. via XML/EasyCatalog) in ein InDesign-Seitenraster mit festen Absatz- und Tabellenformaten. Bilder werden in den Druckfarbraum CMYK (z.B. ISO Coated v2) mit 300 DPI umgewandelt und mit Schnittmarken für den Offsetdruck exportiert.\n- 2. Website / Digitaler Newsletter (Web): Inhalte werden als semantisches HTML ausgeliefert und über responsive CSS dynamisch formatiert. Bilder werden im sRGB-Farbraum komprimiert (z.B. WebP/AVIF mit 72–150 DPI und `srcset` für Retina-Displays). Ergänzt werden interaktive Buttons ("Jetzt online bestellen") und Verlinkungen zum Webshop.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Erläutern Sie, warum die Trennung von Inhalt und Gestaltung eine wesentliche Voraussetzung ist. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['trennung', 'inhalt', 'form', 'gestaltung', 'layout', 'styling', 'semantik'],
          ['datenbank', 'xml', 'json', 'pim', 'cms', 'neutral', 'rohdaten', 'single source'],
          ['stylesheets', 'css', 'absatzformate', 'indesign', 'ausgabemedium', 'flexibel', 'redundanz vermeiden', 'pflege']
        ],
        modelAnswer: 'Inhalte werden rein semantisch in einer Datenbank (PIM/CMS/XML) gespeichert – ohne feste Schriftgrößen oder Layouts. Erst bei der Ausgabe wendet das Zielmedium eigene Styles (CSS für Web, Absatzformate in InDesign) an. Dies ermöglicht Single Source of Truth ohne manuelle Doppelpflege.'
      },
      {
        id: 'b',
        label: 'b) Nennen Sie drei Arten von Produktinformationen, die unabhängig vom Ausgabemedium gespeichert werden können. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['artikelnummer', 'ean', 'sku', 'id', 'gtin', 'identifikator'],
          ['name', 'produktname', 'titel', 'bezeichnung', 'beschreibung', 'text', 'bulletpoints', 'merkmale'],
          ['preis', 'kosten', 'währung', 'technische daten', 'gewicht', 'maße', 'rohbild', 'masterbild', 'datenblatt']
        ],
        modelAnswer: '1. Stammdaten / Identifikatoren (Artikelnummer, EAN, SKU), 2. Semantische Texte (Produktname, Beschreibung, Maße/Gewicht), 3. Konditionen & Rohmedien (Preise, Verfügbarkeit, hochauflösende RGB-Masterbilder).'
      },
      {
        id: 'c',
        label: 'c) Beschreiben Sie anhand des Beispiels, wie derselbe Inhalt für zwei unterschiedliche Medien aufbereitet wird. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['print', 'katalog', 'indesign', 'cmyk', '300 dpi', 'iso coated', 'absatzformate', 'raster', 'paginierung'],
          ['website', 'web', 'newsletter', 'online', 'rgb', 'srgb', 'webp', 'html', 'css', 'responsive', 'links', 'cta']
        ],
        modelAnswer: '1. Print-Katalog: Import in InDesign mit festen Absatzformaten; Bilder in 300 DPI und CMYK (ISO Coated v2). 2. Website/Newsletter: Ausgabe als semantisches HTML mit responsiver CSS-Formatierung; Bilder als sRGB WebP (72–150 DPI) mit interaktiven Shop-Links.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-9',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    diagramType: 'dpi-calculator',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 9: Effektive Bildauflösung, Druckmaße & PPI-Berechnung',
    scenario: 'Eine Werbeagentur gestaltet eine Printanzeige. Ein vom Kunden geliefertes Foto soll in einer Größe von 18 cm × 12 cm gedruckt werden.\nDie Bilddatei besitzt 1800 × 1200 Pixel. Für den Druck wird eine effektive Bildauflösung von 300 ppi gefordert.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zur Berechnung der effektiven Bildauflösung und der maximalen Druckmaße:',
    maxPoints: 10,
    hint: 'Gliedere in a) Effektive Bildauflösung in ppi mit Rechenweg (Breite in Zoll = 18 / 2,54 -> Pixel / Zoll) [4P], b) Beurteilung gegenüber der Anforderung von 300 ppi [2P], c) Maximal mögliche Druckbreite in cm bei 300 ppi (1800 / 300 * 2,54) [4P].',
    requiredKeywords: ['18', '2,54', 'zoll', 'inch', '1800', '1200', '254', 'ppi', '300', 'nicht ausreichend', 'grenzwertig', '15,24', '15.24', 'cm', 'rechenweg'],
    modelAnswer: 'a) Berechnung der effektiven Bildauflösung in ppi (4 Pkt):\n1. Umrechnung der Druckbreite von Zentimetern in Zoll:\n18 cm / 2,54 cm/Zoll = 7,0866 Zoll (Höhe: 12 cm / 2,54 = 4,7244 Zoll)\n2. Berechnung der effektiven Auflösung (Pixel / Zoll):\n1800 Pixel / 7,0866 Zoll = 254 ppi (Kontrolle Höhe: 1200 Pixel / 4,7244 Zoll = 254 ppi)\nErgebnis: Die effektive Bildauflösung bei 18 × 12 cm beträgt gerundet 254 ppi.\n\nb) Beurteilung der vorhandenen Bildauflösung (2 Pkt):\nDie vorhandene Bildauflösung von 254 ppi reicht für die geplante Druckgröße formal nicht aus, da für den Druck 300 ppi gefordert sind. Es werden nur ca. 85% der Zielauflösung erreicht. Für hochwertige Offset-Druckraster (z.B. 60er/70er Raster mit Qualitätsfaktor 1,5 bis 2) liegt der Wert knapp unter der Norm, sodass Detailunschärfen drohen.\n\nc) Maximal mögliche Druckbreite bei 300 ppi (4 Pkt):\n1. Maximale Breite in Zoll: 1800 Pixel / 300 ppi = 6 Zoll\n2. Umrechnung in Zentimeter: 6 Zoll × 2,54 cm/Zoll = 15,24 cm\n(Kontrolle Höhe: 1200 Pixel / 300 ppi = 4 Zoll × 2,54 cm = 10,16 cm)\nErgebnis: Bei geforderten 300 ppi darf das Foto maximal 15,24 cm breit (und 10,16 cm hoch) gedruckt werden.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Berechnen Sie die effektive Bildauflösung in ppi bei der vorgesehenen Druckgröße mit Rechenweg. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['18', '2,54', '2.54', 'zoll', 'inch', '7,08', '7.08', '7,09', '7.09'],
          ['1800', '1200', 'geteilt', '/', 'durch', 'formel'],
          ['254', '254 ppi', '254 dpi', 'ca. 254', '254,0']
        ],
        modelAnswer: 'Rechenweg:\n1. Breite in Zoll: 18 cm / 2,54 = 7,0866 Zoll\n2. Auflösung = Pixel / Zoll: 1800 / 7,0866 = 254 ppi (Höhe: 1200 / 4,724 = 254 ppi).\nErgebnis: Die effektive Auflösung beträgt 254 ppi.'
      },
      {
        id: 'b',
        label: 'b) Beurteilen Sie, ob die vorhandene Bildauflösung für die geplante Druckgröße ausreicht. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['reicht nicht', 'nicht aus', 'unzureichend', 'grenzwertig', 'knapp', 'nein', 'zu gering'],
          ['300', '300 ppi', '254', 'gefordert', 'qualitätsfaktor', 'offsetdruck', 'raster', 'unschärfe']
        ],
        modelAnswer: 'Nein, die Auflösung reicht formal nicht aus. Gefordert sind 300 ppi, erreicht werden nur 254 ppi (ca. 85%). Im Qualitäts-Offsetdruck wird der Qualitätsfaktor verfehlt.'
      },
      {
        id: 'c',
        label: 'c) Berechnen Sie die maximal mögliche Druckbreite in Zentimetern bei 300 ppi. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['1800', '300', '6', '6 zoll', '6"'],
          ['2,54', '2.54', 'mal', '*', 'multipliziert'],
          ['15,24', '15.24', '15,2', '15.2', '15,24 cm']
        ],
        modelAnswer: 'Rechenweg:\n1. Breite in Zoll: 1800 Pixel / 300 ppi = 6 Zoll\n2. Breite in cm: 6 Zoll × 2,54 cm/Zoll = 15,24 cm.\nErgebnis: Das Bild darf maximal 15,24 cm breit gedruckt werden.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-10',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    diagramType: 'photoshop-web-dialog',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 10: Web-Bildaufbereitung, Skalierung & Motivwirkung (Erlebnisbauernhof)',
    scenario: 'Für die Website eines Erlebnisbauernhofs soll ein Foto webgerecht gespeichert werden.\n\nDas Bild liegt mit folgenden Eigenschaften vor:\n• Bildgröße: 1300 × 867 Pixel\n• Farbmodus: CMYK\n• Auflösungseintrag: 240 ppi\n• Dateiformat: TIFF\n• Dateigröße: 4,3 MB',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zur technischen Webaufbereitung, Bildhöhen-Berechnung und Motivbewertung:',
    maxPoints: 10,
    hint: 'Gliedere in a) 3 technische Anforderungen (sRGB-Farbraum, Web-Format wie WebP/JPEG, Kompression unter 150 KB) [3P], b) Berechnung der Bildhöhe bei 960 px Breite mit Dreisatz (640 Pixel) [3P], c) Bewertung des Schweine-Motivs als Startseiten-Keyvisual (fehlender Hofkontext, kein Platz für Text) [4P].',
    requiredKeywords: ['srgb', 'rgb', 'cmyk', 'webp', 'jpeg', 'jpg', 'tiff', 'kompression', 'dateigröße', 'dreisatz', '640', 'nahaufnahme', 'startseite', 'kontext', 'erlebnis', 'text'],
    modelAnswer: 'a) Drei technische Anforderungen für die Webaufbereitung (3 Pkt):\n1. Farbmodus / Farbraum: Umwandlung von CMYK in den Standard-Monitorfarbraum sRGB (RGB), da Webbrowser CMYK-Farben oft fehlerhaft, fahl oder gar nicht darstellen.\n2. Dateiformat & Kompression: Konvertierung vom unkomprimierten Druckformat TIFF in ein modernes Webformat mit effizienter Kompression (z.B. WebP, AVIF oder JPEG).\n3. Dateigröße & Performance: Reduzierung der Dateigröße von 4,3 MB auf ein web-optimiertes Maß (deutlich unter 200 KB) für schnelle Ladezeiten; der Header-Eintrag 240 ppi ist für Displays irrelevant (nur die Pixelabmessungen zählen).\n\nb) Berechnung der Bildhöhe bei 960 Pixel Breite (3 Pkt):\nRechenweg (Seitenverhältnis beibehalten):\n1. Seitenverhältnis (Höhe / Breite) = 867 / 1300 ≈ 0,666923\n2. Neue Höhe = 960 Pixel × (867 / 1300) = 832.320 / 1300 = 640,246 Pixel\nErgebnis: Gerundet auf ganze Pixel beträgt die neue Bildhöhe 640 Pixel (Abmessung: 960 × 640 Pixel).\n\nc) Eignung des Motivs für die Startseite des Erlebnisbauernhofs (4 Pkt):\nFür das zentrale Startseiten-Hero-Visual ist das Motiv eher ungeeignet:\n1. Fehlender Gesamtkontext & Angebotsbreite: Ein Erlebnisbauernhof zeichnet sich durch Hofladen, Gastronomie, Spielplätze, Natur und vielseitige Tiere aus. Die extreme Nahaufnahme eines einzelnen Schweinekopfes vermittelt keinen Gesamteindruck der Erlebnisangebote.\n2. Fehlender Negativraum für UI-Elemente: Das bildfüllende, zentrierte Gesicht bietet kaum ruhige Hintergrundflächen für Website-Überschriften, Einführungstexte oder Call-to-Action-Buttons ("Jetzt Hof besuchen").\n3. Ästhetische Zielgruppenwirkung: Die schlammige Nahansicht spricht nicht alle Besucher (z.B. Familien mit Kleinkindern) gleichermaßen anmutend an. Als Teaser-Kachel auf einer Unterseite (z.B. "Unsere Tiere") ist es charmant, auf der Startseite ist ein weitwinkligeres Motiv mit Menschen und Hofgelände vorzuziehen.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Nennen Sie drei technische Anforderungen, die bei der Aufbereitung von Bildern für eine Website berücksichtigt werden müssen. (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['srgb', 'rgb', 'farbmodus', 'farbraum', 'browser', 'kein cmyk', 'monitor'],
          ['webp', 'jpeg', 'jpg', 'avif', 'png', 'format', 'kein tiff', 'komprimiert', 'kompression'],
          ['dateigröße', 'kb', 'ladezeit', 'skalierung', 'pixelmaße', 'performance', 'unter 200', 'ppi irrelevant']
        ],
        modelAnswer: '1. Farbraum: Umwandlung von CMYK nach sRGB für korrekte Bildschirmfarben. 2. Dateiformat: Speichern als WebP oder JPEG statt TIFF. 3. Dateigröße: Reduzierung auf unter 200 KB für schnelle Web-Ladezeiten (ppi-Eintrag ist irrelevant).'
      },
      {
        id: 'b',
        label: 'b) Berechnen Sie die Bildhöhe in Pixeln bei einer Breite von 960 Pixeln (gerundet). (3 Punkte)',
        points: 3,
        keywordGroups: [
          ['867', '1300', '960', 'dreisatz', 'verhältnis', 'proportional'],
          ['640', '640 px', '640 pixel', '640,2', '640.2']
        ],
        modelAnswer: 'Rechenweg:\nVerhältnis = 867 / 1300 ≈ 0,6669\nNeue Höhe = 960 × (867 / 1300) = 640,246 Pixel.\nErgebnis: Gerundet auf ganze Pixel genau 640 Pixel.'
      },
      {
        id: 'c',
        label: 'c) Erläutern Sie, ob dieses Bildmotiv für die Startseite geeignet ist. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['nahaufnahme', 'detail', 'makro', 'schwein', 'nur ein tier', 'ausschnitt', 'gesicht'],
          ['gesamtkontext', 'kontext', 'angebot', 'erlebnis', 'hof', 'aktivitäten', 'vielseitig', 'hofladen', 'spielplatz', 'fehlt'],
          ['textüberlagerung', 'negativraum', 'hero', 'layout', 'platz für text', 'zentriert', 'ungeeignet für startseite', 'teaser']
        ],
        modelAnswer: 'Eher ungeeignet für die Startseite: 1. Fehlender Kontext: Zeigt nur ein Tier im Schlamm, aber kein Gesamterlebnis (Hofladen, Spielplatz, Natur). 2. Layout: Kein Negativraum für Text und Buttons. Als Detail-Teaser im Zoo-Bereich gut, aber nicht als Keyvisual.'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-11',
    series: 'ihk-teil-1',
    topic: 'formate',
    isOriginalSheet: true,
    diagramType: 'gradation-curve-tool',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 11: Gradationskurven-Korrektur & Tonwertsteuerung (Tunnel & Fachwerkhäuser)',
    scenario: 'Die abgebildete Fotografie soll für den Druck in einem Reiseführer optimiert werden.\nDer Kunde wünscht, dass sowohl der Tunnelbereich im Vordergrund als auch die von der Sonne angestrahlten Häuser im Hintergrund deutlich zu erkennen sind.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zur gezielten Gradationsänderung, Tonwertzonen und Rauschproblematik:',
    maxPoints: 10,
    hint: 'Gliedere in a) Gradationskurve (Wölbung nach oben in den Tiefen/Dreivierteltönen, Lichter fixieren) [4P], b) Auswirkung auf Vierteltöne (Lichter unverändert), Mitteltöne (moderat aufgehellt) und Dreivierteltöne (stark aufgehellt für Tunnelzeichnung) [4P], c) Problem bei zu starker Tiefenaufhellung (Bildrauschen, flauer Kontrast, Banding) [2P].',
    requiredKeywords: ['gradation', 'kurve', 'tiefen', 'dreivierteltöne', 'mitteltöne', 'vierteltöne', 'lichter', 'aufhellen', 'anheben', 'fixieren', 'rauschen', 'bildrauschen', 'kontrast', 'tunnel'],
    modelAnswer: 'a) Erforderliche Gradationsänderung im Kurvendiagramm (4 Pkt):\nDie Gradationskurve muss im Bereich der Tiefen und Dreivierteltöne (unterer/linker Kurvenverlauf) deutlich nach oben gewölbt werden, um die dunklen Tunnelbereiche selektiv aufzuhellen. Gleichzeitig muss im Bereich der Vierteltöne/Lichter (oberer/rechter Bereich) ein Fixierungspunkt gesetzt werden, sodass die Kurve dort auf der 45°-Diagonalen verbleibt. Dadurch werden nur die Schatten geöffnet, während die sonnenbeschienenen Fachwerkhäuser nicht überbelichtet werden.\n\nb) Auswirkung auf Viertel-, Mittel- und Dreivierteltöne (4 Pkt):\n- Dreivierteltöne (Schatten / Tunnel): Werden stark angehoben und aufgehellt. Versteckte Texturen, Steinstrukturen und Details im dunklen Tunnelgewölbe werden deutlich sichtbar und druckbar.\n- Mitteltöne: Werden moderat angehoben, um einen homogenen, natürlichen Helligkeitsübergang zwischen dem dunklen Vordergrund und dem hellen Ausblick zu gewährleisten.\n- Vierteltöne (Lichter / Fachwerkhäuser): Bleiben weitgehend unverändert (fixiert). Der hohe Kontrast und die brillante Zeichnung in den sonnenbeschienenen Hausfassaden und Fenstern bleiben vollständig erhalten, ohne auszufressen.\n\nc) Problem bei zu starker Aufhellung dunkler Bildbereiche (2 Pkt):\nDurch extreme Aufhellung von unterbelichteten Schattenbereichen wird das native Bildrauschen (stochastisches Luminanz- und Farbrauschen des Kamerasensors) massiv verstärkt und als störende Körnigkeit/Farbflecken sichtbar. Zudem kann der Bildeindruck flau und milchig werden (Grauschleier) oder es entstehen sichtbare Tonwertabrisse (Banding/Posterisation), da in den Tiefen nur wenige Tonwertstufen vorhanden waren.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Beschreiben Sie die erforderliche Gradationsänderung im Kurvendiagramm. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['kurve', 'bogen', 'nach oben', 'anheben', 'wölben', 'steiler', 'hochziehen'],
          ['tiefen', 'dreivierteltöne', 'dunkel', 'schatten', 'vordergrund', 'tunnel'],
          ['lichter', 'vierteltöne', 'fixieren', 'punkt setzen', 'unverändert', 'nicht ausfressen', 'schützen']
        ],
        modelAnswer: 'Die Gradationskurve wird in den Tiefen und Dreivierteltönen (Tunnelbereich) deutlich nach oben gewölbt, um die Schatten aufzuhellen. Die Vierteltöne/Lichter (Häuser) werden durch einen Kontrollpunkt auf der 45°-Linie fixiert, damit sie nicht überstrahlen.'
      },
      {
        id: 'b',
        label: 'b) Beschreiben Sie die Auswirkung auf Viertel-, Mittel- und Dreivierteltöne. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['dreivierteltöne', 'tiefen', 'stark aufgehellt', 'details sichtbar', 'tunnel geöffnet', 'zeichnung'],
          ['mitteltöne', 'moderat', 'leicht angehoben', 'übergang', 'weich'],
          ['vierteltöne', 'lichter', 'unverändert', 'fixiert', 'erhalten', 'nicht überbelichtet', 'zeichnung bleibt']
        ],
        modelAnswer: 'Dreivierteltöne (Tunnel): Stark aufgehellt, Detailzeichnung wird sichtbar. Mitteltöne: Moderat angehoben für harmonischen Übergang. Vierteltöne (Häuser): Weitgehend unverändert/fixiert, Zeichnung und Sonnenlicht bleiben geschützt.'
      },
      {
        id: 'c',
        label: 'c) Erläutern Sie ein mögliches Problem bei zu starker Aufhellung der dunklen Bereiche. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['rauschen', 'bildrauschen', 'farbrauschen', 'luminanzrauschen', 'körnig', 'iso', 'artefakte'],
          ['flau', 'grauschleier', 'kontrastarm', 'tonwertabriss', 'banding', 'posterisation', 'milchig']
        ],
        modelAnswer: 'Starkes Bildrauschen (Sensorrauschen) in den Tiefen wird massiv verstärkt und störend sichtbar. Das Bild wirkt flau/kontrastarm oder es entstehen Tonwertabrisse (Banding).'
      }
    ]
  },

  {
    id: 'ihk-p1-aufgabe-12',
    series: 'ihk-teil-1',
    topic: 'medienneutral',
    isOriginalSheet: true,
    diagramType: 'dam-metadata-inspector',
    category: 'IHK-Prüfungsvorbereitung (Teil 1)',
    title: 'Aufgabe 12: Metadaten & Digital-Asset-Management (DAM)',
    scenario: 'Ein Unternehmen verwaltet mehrere Tausend Produktbilder, Logos und Beschreibungstexte.\nDie Dateien werden von verschiedenen Mitarbeitern für Print- und Digitalmedien verwendet.',
    question: 'Bearbeiten Sie die Teilaufgaben a) bis c) zu Metadaten-Definition, Informationsarten und Vorteilen eines DAM-Systems:',
    maxPoints: 10,
    hint: 'Gliedere in a) Begriffserläuterung Metadaten ("Daten über Daten", strukturierte Zusatzinfos) [2P], b) 4 hilfreiche Metadaten für Bilddateien (Tags/Keywords, Copyright/Rechte, technische Daten, Produkt-ID) [4P], c) 2 Vorteile eines zentralen DAM (Single Source of Truth, Vermeidung von Versionschaos/Dubletten, schnelle Suche, Rechtesicherheit) [4P].',
    requiredKeywords: ['metadaten', 'daten über daten', 'iptc', 'exif', 'xmp', 'schlagwörter', 'tags', 'urheber', 'copyright', 'lizenz', 'rechte', 'dam', 'single source', 'dubletten', 'versionschaos', 'suche'],
    modelAnswer: 'a) Erläuterung des Begriffs „Metadaten“ (2 Pkt):\nMetadaten sind strukturierte „Daten über Daten“. Sie enthalten beschreibende und administrative Zusatzinformationen über eine Mediendatei (z.B. eingebettet im Datei-Header via IPTC, EXIF oder XMP oder in einer DAM-Datenbank). Sie informieren über Urheber, Nutzungsrechte, inhaltliche Schlagwörter, Aufnahmezeitpunkt und technische Parameter, ohne den visuellen Bildinhalt selbst zu verändern.\n\nb) Vier hilfreiche Metadaten für Verwaltung und Suche (4 Pkt):\n1. Inhaltsbezogene Schlagwörter / Keywords (z.B. "Sommerkampagne", "Outdoor", Produktkategorie, Farbdominanz).\n2. Urheber- und Lizenzrechte (Fotograf, Copyright-Inhaber, erlaubte Nutzungsarten Print/Web, Lizenzablaufdatum).\n3. Technische Aufnahmedaten (Pixelauflösung, Farbraum sRGB/AdobeRGB, Dateiformat, Erstellungsdatum, Farbtiefe).\n4. Eindeutige Produkt- und Workflow-Identifikatoren (Artikelnummer / SKU, Produktname, Freigabestatus "Approved").\n\nc) Zwei Vorteile eines zentralen DAM-Systems gegenüber unstrukturierter Ablage (4 Pkt):\n1. Single Source of Truth & Vermeidung von Versionschaos/Dubletten: Alle Mitarbeiter greifen zentral auf die jeweils aktuellste, freigegebene Originaldatei zu. Es entstehen keine redundanten Kopien auf lokalen Festplatten und versehentliche Verwendungen veralteter Logos oder falscher Produktbilder werden ausgeschlossen.\n2. Enorme Zeitersparnis & Rechtesicherheit: Durch strukturierte Verschlagwortung und Volltextsuche finden Mitarbeiter Assets in Sekunden statt Ordner manuell zu durchsuchen. Zudem schützen automatisierte Lizenz- und Rechteprüfungen das Unternehmen vor kostspieligen Abmahnungen durch abgelaufene Bildrechte.',
    subTasks: [
      {
        id: 'a',
        label: 'a) Erläutern Sie den Begriff „Metadaten“ im Zusammenhang mit Medieninhalten. (2 Punkte)',
        points: 2,
        keywordGroups: [
          ['daten über daten', 'zusatzinformationen', 'beschreibende daten', 'hintergrunddaten', 'informationen über'],
          ['iptc', 'exif', 'xmp', 'header', 'datenbank', 'ohne bildinhalt zu verändern', 'strukturiert']
        ],
        modelAnswer: 'Metadaten sind strukturierte „Daten über Daten“. Sie beschreiben Herkunft, Rechte, Inhalt und technische Eigenschaften einer Mediendatei (z.B. via IPTC, EXIF, XMP), ohne das eigentliche Bildpixelraster zu verändern.'
      },
      {
        id: 'b',
        label: 'b) Nennen Sie vier Metadaten, die für Verwaltung und Suche hilfreich sind. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['schlagwörter', 'keywords', 'tags', 'kategorie', 'thema', 'inhalt'],
          ['urheber', 'copyright', 'fotograf', 'rechte', 'lizenz', 'lizenzdauer', 'nutzungsrechte'],
          ['auflösung', 'farbraum', 'datum', 'format', 'dateigröße', 'technisch', 'kamera'],
          ['artikelnummer', 'sku', 'produktname', 'freigabestatus', 'status', 'version', 'id']
        ],
        modelAnswer: '1. Schlagwörter / Tags (Inhalt, Thema), 2. Urheber- und Lizenzrechte (Copyright, Fotograf, Lizenzfristen), 3. Technische Daten (Auflösung, Farbraum, Erstellungsdatum), 4. Produkt-IDs / Freigabestatus (Artikelnummer, SKU).'
      },
      {
        id: 'c',
        label: 'c) Beschreiben Sie zwei Vorteile eines zentralen DAM-Systems. (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['single source', 'zentral', 'keine dubletten', 'versionschaos', 'aktuellste version', 'konsistenz', 'einheitlich', 'redundanz'],
          ['zeitersparnis', 'schnelle suche', 'auffindbarkeit', 'rechtesicherheit', 'lizenzprüfung', 'abmahnung vermeiden', 'zugriffsrechte']
        ],
        modelAnswer: '1. Single Source of Truth: Vermeidung von Dubletten und Versionschaos; alle nutzen stets die aktuellste freigegebene Datei. 2. Zeitersparnis & Rechtesicherheit: Schnelles Wiederfinden über Tags und Schutz vor Urheberrechtsverletzungen durch Lizenzverwaltung.'
      }
    ]
  },

  // --- THEMENBEZOGENE VERTIEFUNGSAUFGABEN ---
  {
    id: 'ft-ux-1',
    series: 'themen-vertiefung',
    topic: 'ux',
    category: 'Kapitel 1: UX & Interaktionsdesign',
    title: 'Gestaltsgesetze in der Web-UI (Gleichheit & Ähnlichkeit)',
    scenario: 'Bei der Neugestaltung eines E-Commerce-Shops sollen Produktkarten und Call-to-Action Buttons nach psychologischen Wahrnehmungsprinzipien gestaltet werden.',
    question: 'Erläutere das Gestaltgesetz der "Gleichheit" (Similarity) und beschreibe ein konkretes Anwendungsbeispiel in einer modernen Web-Oberfläche.',
    maxPoints: 10,
    hint: 'Denke an visuelle Merkmale wie Farbe, Form oder Größe und deren Wirkung auf die Wahrnehmung von Zusammengehörigkeit.',
    requiredKeywords: ['gleichheit', 'similarity', 'ähnlichkeit', 'optisch', 'elemente', 'gruppe', 'zusammengehörigkeit', 'farbe', 'form'],
    modelAnswer: 'Das Gestaltgesetz der Gleichheit besagt, dass visuelle Elemente mit ähnlichen Eigenschaften (gleiche Farbe, Form, Größe oder Textur) vom menschlichen Gehirn automatisch als zusammengehörend oder als funktionale Gruppe wahrgenommen werden. Ein typisches Anwendungsbeispiel sind Action-Buttons in Onlineshops: Alle primären Warenkorb-Buttons haben dieselbe Signalfarbe und Form, wodurch der Nutzer sofort erkennt, dass sie dieselbe Funktion erfüllen.',
    subTasks: [
      {
        id: 'definition',
        label: 'Definition des Gestaltgesetzes der Gleichheit (5 Punkte)',
        points: 5,
        keywordGroups: [
          ['gleichheit', 'ähnlichkeit', 'similarity'],
          ['form', 'farbe', 'größe', 'eigenschaften', 'visuell'],
          ['zusammengehörig', 'gruppe', 'einheit', 'gehirn', 'wahrnehmung']
        ],
        modelAnswer: 'Visuell ähnliche Elemente (Farbe, Form, Größe) werden automatisch als zusammengehörige Gruppe oder funktionale Einheit interpretiert.'
      },
      {
        id: 'beispiel',
        label: 'Praxis-Anwendungsbeispiel in einer Web-Oberfläche (5 Punkte)',
        points: 5,
        keywordGroups: [
          ['button', 'cta', 'navigation', 'link', 'karten', 'produktkarte'],
          ['warenkorb', 'kaufen', 'interaktion', 'funktion', 'bedienung']
        ],
        modelAnswer: 'Beispiel: Alle primären "In den Warenkorb"-Buttons in einem Webshop teilen dieselbe Farbe und Form, sodass Nutzer die Funktion sofort erfassen.'
      }
    ]
  },

  {
    id: 'ft-recht-1',
    series: 'themen-vertiefung',
    topic: 'wiso',
    category: 'Kapitel 4: IT-Sicherheit & DSGVO',
    title: 'DSGVO: Recht auf Vergessenwerden (Art. 17)',
    scenario: 'Ein Nutzer fordert die vollständige Löschung seines Kundenkontos und aller gespeicherten Profildaten bei einer Plattform an.',
    question: 'Beschreibe das "Recht auf Vergessenwerden" (Art. 17 DSGVO). Unter welchen Bedingungen kann eine betroffene Person die Löschung ihrer personenbezogenen Daten verlangen?',
    maxPoints: 10,
    hint: 'Beziehe dich auf Art. 17 DSGVO, Zweckbindung, Widerruf von Einwilligungen und unrechtmäßige Datenverarbeitung.',
    requiredKeywords: ['dsgvo', 'löschung', 'personenbezogene', 'daten', 'einwilligung', 'widerruf', 'zweck', 'unrechtmäßig'],
    modelAnswer: 'Das Recht auf Vergessenwerden (Art. 17 DSGVO) gibt betroffenen Personen das Recht auf unverzügliche Löschung ihrer personenbezogenen Daten. Voraussetzungen sind: 1. Wegfall des Erhebungszwecks, 2. Widerruf der Einwilligung ohne anderweitige Rechtsgrundlage, 3. Unrechtmäßige Datenverarbeitung, 4. Rechtliche Verpflichtung zur Löschung. Ausnahmen bestehen z.B. bei gesetzlichen Aufbewahrungsfristen (HGB/AO).',
    subTasks: [
      {
        id: 'definition',
        label: 'Bedeutung von Art. 17 DSGVO (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['dsgvo', 'art 17', 'recht auf vergessenwerden'],
          ['löschung', 'unverzüglich', 'personenbezogene daten']
        ],
        modelAnswer: 'Betroffene können verlangen, dass ihre personenbezogenen Daten vom Verantwortlichen unverzüglich gelöscht werden.'
      },
      {
        id: 'voraussetzungen',
        label: 'Drei Bedingungen für den Löschanspruch (6 Punkte)',
        points: 6,
        keywordGroups: [
          ['zweck', 'nicht mehr notwendig', 'wegfall'],
          ['einwilligung', 'widerruf', 'widerrufen'],
          ['unrechtmäßig', 'verpflichtung', 'gesetzlich', 'aufbewahrung']
        ],
        modelAnswer: '1. Zweck der Erhebung ist entfallen, 2. Einwilligung wurde widerrufen und es gibt keine andere Rechtsgrundlage, 3. Daten wurden unrechtmäßig verarbeitet.'
      }
    ]
  },

  {
    id: 'ft-wiso-1',
    series: 'themen-vertiefung',
    topic: 'wiso',
    category: 'Kapitel 10: WiSo & Arbeitsrecht',
    title: 'Probezeit und Kündigungsschutz im Ausbildungsverhältnis',
    scenario: 'Ein Mediengestalter-Azubi im 2. Monat seiner Ausbildung soll gekündigt werden.',
    question: 'Beschreibe die gesetzlichen Bestimmungen zur Probezeit nach dem Berufsbildungsgesetz (BBiG) und erläutere, wie in dieser Zeit gekündigt werden kann.',
    maxPoints: 10,
    hint: 'Nenne die Dauer laut BBiG (§ 20), die Fristlosigkeit und die zwingende gesetzliche Schriftform.',
    requiredKeywords: ['probezeit', 'bbig', 'monate', 'fristlos', 'ohne grund', 'schriftform', 'papier', 'paragraf 20'],
    modelAnswer: 'Nach § 20 BBiG muss die Probezeit mindestens 1 Monat und darf maximal 4 Monate betragen. Während der Probezeit kann das Ausbildungsverhältnis von beiden Seiten jederzeit fristlos und ohne Angabe von Gründen gekündigt werden (§ 22 Abs. 1 BBiG). Die Kündigung bedarf zwingend der Schriftform auf Papier mit eigenhändiger Unterschrift (§ 623 BGB); digitale Formen wie E-Mail oder WhatsApp sind formnichtig.',
    subTasks: [
      {
        id: 'dauer',
        label: 'Dauer der Probezeit nach § 20 BBiG (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['bbig', 'paragraf 20', '§ 20', 'gesetz'],
          ['1 monat', 'mindestens 1'],
          ['4 monate', 'maximal 4']
        ],
        modelAnswer: 'Die Probezeit im Ausbildungsverhältnis muss mindestens 1 Monat und darf maximal 4 Monate dauern (§ 20 BBiG).'
      },
      {
        id: 'kuendigung',
        label: 'Kündigungsregeln in der Probezeit (6 Punkte)',
        points: 6,
        keywordGroups: [
          ['fristlos', 'jederzeit', 'ohne frist'],
          ['ohne grund', 'ohne angabe', 'keine begründung'],
          ['schriftform', 'papier', 'unterschrift', 'nicht digital', '§ 623']
        ],
        modelAnswer: 'Jederzeit fristlos und ohne Begründung kündbar. Zwingend vorgeschrieben ist die Schriftform auf Papier (§ 623 BGB).'
      }
    ]
  },

  {
    id: 'ft-a11y-1',
    series: 'themen-vertiefung',
    topic: 'a11y',
    category: 'Kapitel 5: Barrierefreiheit (WCAG 2.1)',
    title: 'WCAG 2.1: Prinzip "Wahrnehmbarkeit" (Perceivable)',
    scenario: 'Eine Web-Anwendung für einen öffentlichen Auftraggeber muss nach BITV 2.0 / WCAG 2.1 barrierefrei aufgebaut werden.',
    question: 'Erläutere das erste Prinzip der WCAG 2.1 ("Wahrnehmbar" / Perceivable). Welche konkreten Anforderungen müssen für visuelle und auditive Inhalte erfüllt sein?',
    maxPoints: 10,
    hint: 'Nenne Screenreader-Alternativen für Bilder, Untertitel für Videos und Kontrastvorgaben.',
    requiredKeywords: ['wahrnehmbar', 'perceivable', 'kontrast', 'alternativtext', 'alt-text', 'untertitel', 'vorlesefunktion', 'screenreader'],
    modelAnswer: 'Das Prinzip Wahrnehmbarkeit verlangt, dass alle Informationen so bereitgestellt werden, dass Benutzer sie mit ihren Sinnen erfassen können. Konkrete Maßnahmen: 1. Alternativtexte (Alt-Attribute) für Nicht-Text-Inhalte (Bilder, Diagramme), 2. Untertitel und Transkripte für zeitbasierte Medien (Video, Audio), 3. Ausreichendes Kontrastverhältnis (mind. 4.5:1 für Normaltext) und 4. Anpassbare Textdarstellung ohne Verlust von Inhalt oder Struktur.',
    subTasks: [
      {
        id: 'prinzip',
        label: 'Bedeutung des Prinzips Wahrnehmbarkeit (4 Punkte)',
        points: 4,
        keywordGroups: [
          ['wahrnehmbar', 'perceivable', 'sinne'],
          ['nicht nur ein sinneskanal', 'erfassen', 'zugänglich', 'informationen']
        ],
        modelAnswer: 'Informationen und Komponenten müssen so präsentiert werden, dass sie von den Sinnen der Nutzer (Sehen, Hören, Tasten) wahrgenommen werden können.'
      },
      {
        id: 'massnahmen',
        label: 'Konkrete Anforderungen für Bild & Ton (6 Punkte)',
        points: 6,
        keywordGroups: [
          ['alt-text', 'alternativtext', 'bildbeschreibung', 'screenreader'],
          ['untertitel', 'transkript', 'audiodeskription', 'video', 'audio'],
          ['kontrast', 'farbkontrast', '4.5:1', 'skalierbar', 'textgröße']
        ],
        modelAnswer: '1. Alt-Texte für Bilder für Screenreader, 2. Untertitel/Transkripte für Videos, 3. Ausreichender Textkontrast von mind. 4.5:1.'
      }
    ]
  }
];
