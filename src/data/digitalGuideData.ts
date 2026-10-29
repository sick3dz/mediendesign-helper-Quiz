export interface DigitalTopic {
  id: string;
  title: string;
  category: string;
  iconName: string;
  ihkFocusSummary: string;
  whatFailsAway: string;
  whatIsNewAndTested: string;
  keyConcepts: {
    term: string;
    explanation: string;
    examTip?: string;
  }[];
}

export const DIGITAL_GUIDE_TOPICS: DigitalTopic[] = [
  {
    id: 'designkonzeption-hauptfokus',
    title: '1. ★ Fachrichtung Designkonzeption (IHK Kern-Schwerpunkt)',
    category: 'Konzeption & Brand Strategy',
    iconName: 'Sparkles',
    ihkFocusSummary: 'Zielgruppenanalyse, Personas, Storytelling, Gestaltgesetze, Corporate Design & Pitch-Präsentationen.',
    whatFailsAway: 'Reine drucktechnische Druckbogen-Passermarken & Druckplattenbelichtung.',
    whatIsNewAndTested: 'Personas & User Journeys, Informationsarchitektur (Sitemaps), Gestaltgesetze der Wahrnehmung & Pitch-Decks.',
    keyConcepts: [
      {
        term: 'Persona & User Journey Mapping',
        explanation: 'Fiktive, datenbasierte Repräsentanten der Zielgruppe mit Bedürfnissen, Pain-Points & Verhaltensweisen. Die User Journey zeichnet alle Touchpoints vom Erstkontakt bis zur Konvertierung auf.',
        examTip: 'IHK-Aufgabe: Erstelle aus einer kurzen Zielgruppen-Beschreibung eine vollständige Persona mit Pain Points & Zielen!'
      },
      {
        term: 'Gestaltgesetze der Wahrnehmung',
        explanation: 'Gesetz der Nähe, Ähnlichkeit, Prägnanz, Geschlossenheit, Kontinuität und gemeinsamen Schicksals. Sie steuern die visuelle Ordnung & Aufmerksamkeit des Nutzers.',
        examTip: 'Beliebte Prüfungsfrage: Welches Gestaltgesetz bewirkt, dass zusammengehörige Formularfelder als Gruppe wahrgenommen werden? -> Gesetz der Nähe!'
      },
      {
        term: 'Informationsarchitektur (IA) & Sitemaps',
        explanation: 'Strukturierung und Hierarchisierung von Inhalten für intuitive Auffindbarkeit (z. B. flache vs. tiefe Hierarchie, Card Sorting).',
        examTip: 'Flache Hierarchien (max. 3 Klicks) vermeiden Frustration und verbessern die Usability.'
      },
      {
        term: 'Corporate Design (CD) & Styleguides',
        explanation: 'Einheitliches visuelles Erscheinungsbild (Logo-Grid, Farbklang/Paletten, Typografie-Hierarchie, Bildsprache) für Markenidentität auf allen Touchpoints.',
        examTip: 'Achte bei digitalen Styleguides stets auf Barrierefreiheit (Farbkontraste & Schriftskalierung).'
      }
    ]
  },
  {
    id: 'ixd-usability',
    title: '2. Interaktionsdesign (IxD) & Usability',
    category: 'Nutzerzentrierte Gestaltung',
    iconName: 'MousePointer',
    ihkFocusSummary: 'Zentrale Unterscheidung von UI, IxD und UX sowie Verhaltensmuster digitaler Schnittstellen.',
    whatFailsAway: 'Klassische Offset-Druckbogenmontage, Papierlaufrichtung & Farbauftrag.',
    whatIsNewAndTested: 'Verhalten digitaler Oberflächen, Feedback-Latenzen, Fitts\' Law & Affordance vs. Signifier.',
    keyConcepts: [
      {
        term: 'UI vs. IxD vs. UX Formel',
        explanation: 'UI = Visuelle Oberfläche ("Wie sieht es aus?"), IxD = Verhalten & Interaktion ("Wie funktioniert es?"), UX = Gesamtes Nutzungserlebnis ("Wie fühlt es sich an?").',
        examTip: 'Häufige IHK-Prüfungsfrage: Ordne 3 Aussagen den Begriffen UI, IxD und UX exakt zu.'
      },
      {
        term: 'Affordance vs. Signifier',
        explanation: 'Affordance ist die physikalische Nutzungseigenschaft (z. B. ein Taster lässt sich drücken). Signifier ist das visuelle Signal (z. B. Schatten/Button-Farbe), das zeigt WIE es bedient wird.',
        examTip: 'Typisches Szenario: Ein flaches Bild sieht aus wie ein Button, ist aber unklickbar -> Falscher Signifier!'
      },
      {
        term: 'Sofortiges Feedback (< 200ms)',
        explanation: 'Jede Nutzeraktion erfordert innerhalb von 200ms Rückmeldung (Hover-Status, Lade-Spinner, Klick-Effekt), um Unsicherheit zu vermeiden.',
        examTip: 'Fehlendes Feedback führt bei ADHS & Senioren zu Mehrfachklicks und Abbruch.'
      }
    ]
  },
  {
    id: 'wireframe-prototyping',
    title: '3. Wireframing, Prototyping & Design-Systeme',
    category: 'Entwurf & Prototypen',
    iconName: 'Layers',
    ihkFocusSummary: 'Schrittweiser Entwurfsprozess von der ersten Idee bis zum klickbaren High-Fidelity Prototyp.',
    whatFailsAway: 'Druckvorstufe, Repro-Technik, Ausschießschemata & Farbauszüge.',
    whatIsNewAndTested: 'Low-Fi vs. High-Fi Wireframes, Komponenten-Bibliotheken, Klickpfade & Usability-Testing.',
    keyConcepts: [
      {
        term: 'Low-Fidelity vs. High-Fidelity',
        explanation: 'Low-Fi (Papier/Graustufen): Schneller Entwurf von Struktur & Informationsarchitektur ohne Ablenkung durch Farben. High-Fi: Detailliertes Design mit echten Schriften, Farben & Interaktionen.',
        examTip: 'Warum startet man mit Low-Fi? Um Frustration & Kosten bei frühen Feedback-Runden gering zu halten.'
      },
      {
        term: 'UI-Kits & Design-Systeme',
        explanation: 'Zentrale Sammlungen wiederverwendbarer UI-Komponenten (Buttons, Input-Felder, Modals) für konsistente Benutzeroberflächen.',
        examTip: 'Vorteil: Schnellere Entwicklung & Konsistency über alle Unterseiten hinweg.'
      }
    ]
  },
  {
    id: 'responsive-publishing',
    title: '4. Responsive Design & Digitales Publishing',
    category: 'Screen-Design & Medien',
    iconName: 'Monitor',
    ihkFocusSummary: 'Flexible Layouts für Smartphones, Tablets & Dekstops sowie moderne Bildformate.',
    whatFailsAway: 'Druckkostenberechnung, Papiergewicht (g/m²), Bindungsarten & Falzarten.',
    whatIsNewAndTested: 'Breakpoints, CSS Flexbox & Grid, Vektorgrafiken (SVG) & moderne Formate (WebP, AVIF).',
    keyConcepts: [
      {
        term: 'Relative Einheiten vs. Absolute Einheiten',
        explanation: 'Verwende rem, em, %, vw, vh für skalierbare Layouts anstelle starrer Pixel-Werte (px).',
        examTip: 'IHK fragt oft nach der besten Einheit für Barrierefreie Schriftgrößen: Antwort ist "rem"!'
      },
      {
        term: 'SVG vs. WebP vs. AVIF',
        explanation: 'SVG: Skalierbare Vektoren für Logos & Icons. WebP/AVIF: Hochkomprimierte Pixelbilder für schnelle Ladezeiten im Web.',
        examTip: 'Warum eignet sich PNG/JPEG weniger für moderne Webseiten? Größere Dateimenge & langsamere Ladezeit.'
      }
    ]
  },
  {
    id: 'security-dsgvo',
    title: '5. IT-Sicherheit, Datenschutz & DSGVO',
    category: 'Recht & Sicherheit',
    iconName: 'ShieldAlert',
    ihkFocusSummary: 'Schutz von Nutzerdaten, rechtssichere Webseiten und Erkennung von Sicherheitsrisiken.',
    whatFailsAway: 'Urheberrecht rein klassischer Print-Erzeugnisse.',
    whatIsNewAndTested: 'DSGVO (Cookie-Banner, Datenschutz, Impressumspflicht), HTTPS/SSL & Phishing/Fake-Shop Erkennung.',
    keyConcepts: [
      {
        term: 'DSGVO Grundprinzipien',
        explanation: 'Datensparsamkeit, Zweckbindung und aktive Einwilligung (Opt-in) vor der Datenerfassung.',
        examTip: 'Ein vorausgewähltes Häkchen beim Newsletter ist laut DSGVO UNZULÄSSIG (Opt-In ist Pflicht!).'
      },
      {
        term: 'Phishing & Fake-Shop Merkmale',
        explanation: 'Verdächtige URLs (z.B. rn-amazon.com), fehlendes Impressum, reine Vorkasse-Zahlung & fehlerhaftes SSL-Zertifikat.',
        examTip: 'Prüfungsaufgabe: Identifiziere 4 Sicherheitsmängel in einer abgebildeten E-Mail/Webseite.'
      }
    ]
  },
  {
    id: 'a11y-wcag',
    title: '6. Barrierefreiheit (WCAG 2.2 - POUR)',
    category: 'Inklusive Medien',
    iconName: 'CheckCircle2',
    ihkFocusSummary: 'Barrierefreie Gestaltung digitaler Produkte für Menschen mit Einschränkungen nach BFSG/WCAG.',
    whatFailsAway: 'Keine Entsprechung in reiner Drucktechnik.',
    whatIsNewAndTested: 'Die 4 POUR-Grundsätze, Kontrastwerte (4.5:1), Alt-Texte & Screenreader-Kompatibilität.',
    keyConcepts: [
      {
        term: 'POUR Grundsätze',
        explanation: 'Perceivable (Wahrnehmbar), Operable (Bedienbar), Understandable (Verständlich), Robust (Robust).',
        examTip: 'Merksatz: Alle digitalen Medien müssen für alle Menschen zugänglich gestaltet sein.'
      },
      {
        term: 'Farbkontrast & Alt-Texte',
        explanation: 'Mindestkontrast von 4.5:1 für normalen Text. Jedes Bild benötigt aussagekräftige Alt-Texte für Blinde & Sehbehinderte.',
        examTip: 'Achtung: Dekorationsbilder erhalten einen leeren alt="" Text, damit Screenreader sie überspringen.'
      }
    ]
  },
  {
    id: 'agile-workflows',
    title: '7. Agiles Projektmanagement & Workflows',
    category: 'Projekt & Prozess',
    iconName: 'Clock',
    ihkFocusSummary: 'Agile Methoden der Software- & Medienentwicklung zur flexiblen Projektsteuerung.',
    whatFailsAway: 'Strenge lineare Druckablaufketten.',
    whatIsNewAndTested: 'Scrum (Sprints, Product Owner, Daily), Kanban-Boards, User Stories & Git-Versionskontrolle.',
    keyConcepts: [
      {
        term: 'Scrum vs. Wasserfall',
        explanation: 'Wasserfall = starrer, sequenzieller Phasenablauf. Scrum = iterativer Ablauf in kurzen Sprints mit ständiger Anpassung.',
        examTip: 'Warum verdrängt Scrum den Wasserfall bei Digitalprojekten? Weil sich Anforderungen im Web ständig ändern.'
      },
      {
        term: 'User Stories',
        explanation: 'Formel: "Als [Rolle] möchte ich [Funktion], damit [Nutzen]". Beispielsweise: "Als Kunde möchte ich mein Passwort zurücksetzen, damit ich mein Konto wieder nutzen kann."',
        examTip: 'Wichtig in IHK-Prüfungen: Formulierung einer korrekten User Story nach Schema.'
      }
    ]
  },
  {
    id: 'databases-data',
    title: '8. Datenbanken & Schnittstellen (SQL, JSON, XML)',
    category: 'Daten & Backend',
    iconName: 'Database',
    ihkFocusSummary: 'Strukturierte Datenspeicherung und Datenaustausch über moderne Web-Schnittstellen (APIs).',
    whatFailsAway: 'Dateiformate der Druckvorstufe (EPS, DCS).',
    whatIsNewAndTested: 'Relationales Datenbankmodell, SQL SELECT/JOINs & Datenstrukturen (JSON vs. XML).',
    keyConcepts: [
      {
        term: 'SQL JOIN',
        explanation: 'Verknüpft Datensätze aus mehreren Tabellen anhand von Primär- und Fremdschlüsseln (Primary & Foreign Key).',
        examTip: 'Typische SQL-Prüfungsaufgabe: Schreibe einen SELECT Query mit INNER JOIN für Kunden & Bestellungen.'
      },
      {
        term: 'JSON vs. XML',
        explanation: 'JSON ist leichtgewichtig, nativ in JavaScript und Standard für REST-APIs. XML ist geschwätziger und nutzt Tags.',
        examTip: 'JSON verwendet Key-Value Paare in geschweiften Klammern { "name": "Wert" }.'
      }
    ]
  }
];
