import { QuestionAsset } from '../types/quiz';

export interface DigitalTopic {
  id: string;
  title: string;
  category: string;
  iconName: string;
  ihkFocusSummary: string;
  whatFailsAway: string;
  whatIsNewAndTested: string;
  asset?: QuestionAsset;
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
    asset: {
      type: 'diagram',
      title: 'IHK Leitfaden-Asset: Gestaltgesetze der Wahrnehmung',
      subtitle: 'Gesetz der Nähe, Ähnlichkeit & Prägnanz in Benutzeroberflächen.',
      description: 'Gestaltgesetze erklären, wie das menschliche Gehirn visuelle Reize strukturiert. Das Gesetz der Nähe besagt, dass nahe beieinander liegende Elemente als zusammengehörige Gruppe wahrgenommen werden (z. B. Label & Input-Feld). Das Gesetz der Ähnlichkeit verbindet gleiche Farben/Formen (z. B. primäre Action-Buttons).',
      highlights: ['Gesetz der Nähe (Gruppierung)', 'Gesetz der Ähnlichkeit (Farb-Semantik)', 'Gesetz der Geschlossenheit (Card-Container)']
    },
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
    asset: {
      type: 'diagram',
      title: 'IHK Leitfaden-Asset: Affordance vs. Signifier & Fitts\' Law',
      subtitle: 'Visuelles Signalisieren von Interaktionsmöglichkeiten und Zielgrößen.',
      description: 'Affordance beschreibt das tatsächliche Handlungspotenzial eines Elements. Der Signifier ist das eindeutige visuelle Merkmal (Schatten, Farbe, Icon), das dem Nutzer signalisiert, WO und WIE er interagieren kann. Fitts\' Law bestimmt die Klickzeit basierend auf Zielgröße und Entfernung.',
      highlights: ['Affordance = Handlungsmöglichkeit', 'Signifier = Visueller Hinweis (Signal)', 'Fitts\' Law = Zielgröße & Klick-Distanz']
    },
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
  },
  {
    id: 'graphics-image-data',
    title: '9. Digitale Bild- & Grafikdaten (Vektor, Pixel, Farbräume & Kompression)',
    category: 'Grafik & Produktion',
    iconName: 'Image',
    ihkFocusSummary: 'Vektorgrafiken (SVG), Rastergrafiken (WebP, AVIF, PNG, JPG), Auflösung (PPI/DPI) & medienneutrale Farbräume (RGB vs. CMYK).',
    whatFailsAway: 'Analoge Reprotechnik, manuelle Druckrasterätzung & starre Farbauszüge.',
    whatIsNewAndTested: 'Moderne Webformate (WebP, AVIF), verlustfreie vs. verlustbehaftete Kompression, Single Source Publishing & medienneutrale Workflows.',
    keyConcepts: [
      {
        term: 'Vektor (SVG) vs. Raster (Pixel)',
        explanation: 'Vektoren basieren auf mathematischen Pfaden (Punkte, Kurven) und sind ohne Qualitätsverlust unendlich skalierbar. Rastergrafiken bestehen aus festen Pixelmatrizen, die beim Vergrößern pixelig/unscharf werden.',
        examTip: 'IHK-Klassiker: Logos und Icons immer als SVG anlegen; Fotos und komplexe Bildmotive als WebP/JPG ausgeben.'
      },
      {
        term: 'Moderne Webformate (WebP & AVIF)',
        explanation: 'WebP bietet 25-35 % kleinere Dateigrößen als JPEG/PNG bei gleicher visueller Qualität und unterstützt Transparenz. AVIF komprimiert noch effizienter und basiert auf dem modernen AV1-Videocodec.',
        examTip: 'Für performante Ladezeiten (Core Web Vitals) werden Bilddaten im Web heute standardmäßig in WebP/AVIF bereitgestellt.'
      },
      {
        term: 'RGB vs. CMYK & Medienneutralität',
        explanation: 'RGB ist das additive Farbmodell für Bildschirme (Rot, Grün, Blau; Lichtfarben). CMYK ist das subtraktive Farbmodell für Druck (Cyan, Magenta, Yellow, Key/Schwarz; Körperfarben). Medienneutralität speichert Daten im großen RGB-Farbraum und konvertiert erst bei der Ausgabe in CMYK.',
        examTip: 'Prüfungsfalle: Warum niemals in CMYK für das Web speichern? Webbrowser interpretieren CMYK unzuverlässig und der Farbraum ist viel kleiner als sRGB.'
      },
      {
        term: 'Auflösung: PPI vs. DPI',
        explanation: 'PPI (Pixels Per Inch) beschreibt die Pixeldichte digitaler Displays und Sensoren. DPI (Dots Per Inch) beschreibt die physischen Druckpunkte pro Zoll einer Druckmaschine.',
        examTip: 'Merksatz: Bildschirme kennen nur Pixel (PPI); Druckmaschinen drucken Farbpunkte (DPI). Für Standard-Druck sind 300 DPI bei 100 % Skalierung die IHK-Norm.'
      }
    ]
  },
  {
    id: 'wiso-wirtschaft-soziales',
    title: '10. Wirtschafts- & Sozialkunde (WiSo - BBiG, Sozialversicherungen & Recht)',
    category: 'Recht & Wirtschaft',
    iconName: 'Scale',
    ihkFocusSummary: 'Berufsausbildung (BBiG), Arbeitsschutz (JArbSchG, ArbZG, BUrlG), 5 Säulen der Sozialversicherung, Mitbestimmung (BetrVG) & Unternehmensformen.',
    whatFailsAway: 'Veraltete Paragraphen vor der BBiG- und Schuldrechtsreform.',
    whatIsNewAndTested: 'Ausbildungsvertrag (§ 11 BBiG), Probezeit (1-4 Monate), Kündigungsfristen, 100% AG-Beitrag der Unfallversicherung, § 102 BetrVG Betriebsratsanhörung, Rechtsformen (GmbH, KG, OHG).',
    keyConcepts: [
      {
        term: 'Ausbildungsvertrag & Probezeit (§§ 11, 20 BBiG)',
        explanation: 'Schriftform vor Beginn zwingend. Probezeit: mind. 1, max. 4 Monate. Während der Probezeit jederzeit fristlos ohne Grund kündbar. Nach der Probezeit: Betrieb kann nur aus wichtigem Grund außerordentlich kündigen; Azubi mit 4 Wochen Frist bei Berufswechsel.',
        examTip: 'Häufigste IHK-Falle: Kündigungen bedürfen nach § 623 BGB immer der Schriftform auf Papier – mündlich oder per WhatsApp ist absolut nichtig!'
      },
      {
        term: 'Arbeitsschutz & Urlaub (JArbSchG, ArbZG, BUrlG)',
        explanation: 'JArbSchG (unter 18): max. 8 Std./Tag, 40 Std./Woche, 5-Tage-Woche, Pausen 30 Min (bei 4,5-6 Std.) bzw. 60 Min (bei >6 Std.). BUrlG: mind. 24 Werktage (= 20 Arbeitstage bei 5-Tage-Woche).',
        examTip: 'Prüfer fragen oft nach der Mindesturlaubsdauer für Jugendliche: unter 16 = 30, unter 17 = 27, unter 18 = 25 Werktage.'
      },
      {
        term: 'Die 5 Säulen der Sozialversicherung',
        explanation: '1. Kranken- (GKV), 2. Pflege- (SPV), 3. Renten- (GRV), 4. Arbeitslosen- (ALV) und 5. Gesetzliche Unfallversicherung (GUV). Säulen 1-4 werden paritätisch (ca. 50/50) getragen. Die Unfallversicherung (Berufsgenossenschaft) wird zu 100 % allein vom Arbeitgeber finanziert!',
        examTip: 'Super-Prüfungsfalle: Die Gesetzliche Unfallversicherung zahlt niemals der Arbeitnehmer – sie ist eine reine Unternehmerhaftpflicht (100 % AG)!'
      },
      {
        term: 'Betriebliche Mitbestimmung (§§ 1, 87, 102 BetrVG)',
        explanation: 'Betriebsrat wählbar ab 5 wahlberechtigten Arbeitnehmern. Echte Mitbestimmung nach § 87 BetrVG bei Arbeitszeit, Pausen, Überstunden und Urlaubsgrundsätzen. Nach § 102 BetrVG ist jede Kündigung ohne vorherige Betriebsratsanhörung unwirksam.',
        examTip: 'Wichtig: Der Betriebsrat darf niemals zum Streik aufrufen; Arbeitskämpfe führen ausschließlich Gewerkschaften!'
      },
      {
        term: 'Rechtsformen & Kaufvertragsstörungen',
        explanation: 'GmbH: Kapitalgesellschaft, mind. 25.000 € Stammkapital, Haftung auf Gesellschaftsvermögen beschränkt. KG: Komplementär haftet voll mit Privatvermögen, Kommanditist nur mit Einlage. Bei Sachmängeln gilt der Vorrang der Nacherfüllung (§ 439 BGB).',
        examTip: 'Merke: Zuerst immer Nacherfüllung (Reparatur oder Neulieferung) verlangen. Ein sofortiger Rücktritt vom Kaufvertrag ist gesetzlich unwirksam.'
      }
    ]
  },
  {
    id: 'ihk-original-pruefung-12-aufgaben',
    title: '11. ★ IHK Original-Prüfung Teil 1 (12 Aufgaben - Druck & Digital)',
    category: 'IHK Original-Prüfung',
    iconName: 'Award',
    ihkFocusSummary: 'Die 12 gedruckten Original-Aufgaben (a, b, c, d) mit Histogrammen, Gradationskurven, TAC-Farbauftrag & PPI-Rechenwegen.',
    whatFailsAway: 'Veraltete Faustregeln ohne mathematische IHK-Musterlösung.',
    whatIsNewAndTested: 'Medienneutrale Datenhaltung (Single Source), Bit-Datentiefe (8 Bit vs 16 Bit), TAC 240% vs 300%, PPI-Grenzmaße & Gradationskurve Tunnel.',
    asset: {
      type: 'ppi_blueprint',
      title: 'IHK Original-Kapitel 11: 120 Punkte Abschluss-Prüfungsdossier',
      subtitle: 'Enthält alle 12 Original-Aufgaben mit Histogramm, Gradationskurve Tunnel & TAC-Farbauftrag.',
      description: 'Kapitel 11 bildet den offiziellen Abschluss des IHK-Lernpfads. Es deckt alle 12 Aufgaben der gedruckten IHK-Prüfungsseiten 1–5 vollständig in Level 1 (Fakten & Grundlagen) und Level 2 (Praxisfälle & Rechenwege) ab.',
      highlights: ['Medienneutralität (Single Source)', 'PPI-Formel & Skalierung', 'Gradationskurve Tunnel-Aufstellung', 'Datentiefe 8-Bit vs 16-Bit']
    },
    keyConcepts: [
      {
        term: 'Medienneutrale Datenhaltung (Single Source of Truth)',
        explanation: 'Master-Dateien im hochauflösenden RGB-Farbraum (eciRGBv2) und verlustfreien Formaten (TIFF/RAW) pflegen. Erst beim Export in Ziel-Farbräume konvertieren (ISO Coated v2 für Print, sRGB für Web).',
        examTip: 'IHK-Aufgabe 1: Welche 3 Strukturierungsmaßnahmen nutzen dem Kundenbestand? -> Verzeichnishierarchie, Namenskonventionen & Metadaten.'
      },
      {
        term: 'PPI-Berechnung & Druckauflösung',
        explanation: 'Formel: 18 cm / 2,54 = 7,0866 Zoll -> 1800 px / 7,0866 Zoll = 254 ppi. Bei 300 ppi geforderter Offset-Auflösung beträgt die maximale Druckbreite 15,24 cm.',
        examTip: 'IHK-Aufgabe 9: Immer erst Zentimeter durch 2,54 in Zoll umrechnen, bevor Pixel dividiert werden!'
      },
      {
        term: 'Gesamtfarbauftrag (TAC) & Papierklassen',
        explanation: 'ISO Coated v2 erlaubt bis zu 300% TAC. Ungestrichenes Zeitungspapier (PSO SNP) erfordert eine Begrenzung auf max. 240% TAC, um Punktezuwachs und Ablegen zu verhindern.',
        examTip: 'IHK-Aufgabe 7: Profil ISO Coated v2 erzeugt auf Zeitungspapier Verschmieren und Trocknungsstau!'
      },
      {
        term: 'Gradationskurve Schattenaufhellung (Tunnel-Motiv)',
        explanation: 'Schatten im Dreivierteltonbereich um 25 % anheben, um das Tunnelmauerwerk aufzuhellen, während der Lichterpunkt bei 0 % unberührt auf der 45°-Linie fixiert bleibt.',
        examTip: 'IHK-Aufgabe 11: So bleiben sonnige Fachwerkhäuser im Hintergrund geschützt und zeichnen nicht aus!'
      }
    ]
  },
  {
    id: 'projektphasen-management-leitfaden',
    title: '12. ★ Projektphasen & Projektmanagement (DIN 69901 & Tuckman)',
    category: 'Projektmanagement & Organisation',
    iconName: 'Workflow',
    ihkFocusSummary: 'DIN 69901 (7 Merkmale), 5 Phasen DIN 69901-2, Tuckman Teamentwicklung (Forming bis Adjourning) & nachhaltige Lessons Learned.',
    whatFailsAway: 'Reine intuitive "Bauchgefühl"-Projektarbeit ohne Phasenabgrenzung und ohne Risikopuffer.',
    whatIsNewAndTested: 'Projekt vs. Routine, 5 PM-Phasen (Initialisierung, Definition, Planung, Steuerung, Abschluss), Scope Creep Schutz (Nicht-Ziele), PSP & Soll-Ist-Controlling, Tuckman (Forming, Storming, Norming, Performing, Adjourning 1977).',
    asset: {
      type: 'pm_cycle',
      title: 'IHK Leitfaden-Asset: Der DIN 69901-2 Projektmanagement-Kreislauf',
      subtitle: 'Original-Prozessmodell nach Christoph Schulze: Von der Initialisierung bis zum Erfahrungstransfer.',
      description: 'Projektmanagement ist ein geschlossenes, iteratives System: 1. Initialisierung (Projektidee & Nutzen klären), 2. Definition (Ziele, Nicht-Ziele & Stakeholder), 3. Planung (PSP, Termine, Kosten & Puffer), 4. Steuerung (Controlling, Soll-Ist & formale Abnahme), 5. Abschluss (Erfahrungen sichern, Nachkalkulation & Entlastung). Die gesicherten Lessons Learned fließen direkt in die Initialisierung zukünftiger Projekte ein.',
      imageUrl: '/src/assets/images/din69901_pm_cycle_1794249501102.jpg',
      highlights: [
        'DIN 69901: 7 konstitutive Projektmerkmale & 3 limitierte Ressourcen',
        'Tuckman 4+1: Forming, Storming, Norming, Performing & Adjourning (1977)',
        'Scope Creep Schutz: Nicht-Ziele in der Definition verbindlich fixieren',
        'Prüfungsfalle: Formale Ergebnisabnahme gehört zur Phase Steuerung!',
        'Erfahrungssicherung: Lessons Learned müssen auffindbar & nutzbar sein'
      ]
    },
    keyConcepts: [
      {
        term: 'Seite 1: DIN 69901 Projektdefinition & Abgrenzung zur Routine',
        explanation: 'Ein Projekt ist ein zielgerichtetes, einmaliges, neuartiges, komplexes und zeitlich befristetes Vorhaben unter Einsatz begrenzter Ressourcen (Personal, Budget, Sachmittel) mit inhärentem Risiko (7 Merkmale). Abgrenzung: Ein Projekt ist neuartig (z. B. Entwicklung eines Sonder-Standbogens/Falzung), während Routine eine wiederkehrende Daueraufgabe ist (z. B. periodischer Nachdruck).',
        examTip: 'IHK-Aufgabe: Unterscheide stets nach Neuartigkeit & Einmaligkeit. Nachdrucke bestehender Vorlagen sind NIEMALS ein Projekt!'
      },
      {
        term: 'Seite 2: Tuckman Phase 1: Forming (Orientierung & Scheinharmonie)',
        explanation: 'Erstes Kennenlernen, Abtasten, Höflichkeit, Unsicherheit und Fixierung auf die Führungskraft. Gefahr: "Scheinharmonie" – Konflikte werden verdrängt, weil niemand anecken will. Führungsaufgabe: Orientierung bieten, klare Ziele & Rollen setzen, Erwartungen klären und gegenseitiges Kennenlernen ermöglichen.',
        examTip: 'Häufige Prüfungsfalle: Scheinharmonie im Forming ist keine echte Teamreife, sondern Orientierungssuche!'
      },
      {
        term: 'Seite 3: Tuckman Phase 2: Storming & Phase 3: Norming',
        explanation: 'Storming: Erste Meinungsverschiedenheiten, Machtkämpfe, verdeckte Konflikte & Hinterfragen von Aufgaben. Führungsaufgabe Storming: Moderieren statt Urteilen, Konflikte ansprechbar machen, fairen Streitrahmen sichern. Norming: Entwicklung ungeschriebener Spielregeln, Wir-Gefühl, kollegiale Konfliktlösung. Führungsaufgabe Norming: Loslassen, Verantwortung abgeben, Micromanagement vermeiden.',
        examTip: 'Führungsstil-Regel: Im Storming sachlich moderieren, im Norming Vertrauen schenken und Verantwortung abgeben!'
      },
      {
        term: 'Seite 4: Tuckman Phase 4: Performing & Phase 5: Adjourning (1977)',
        explanation: 'Performing: Selbstständige Hochleistung, Flow, Synergie & konstruktive Streitkultur. Führungsaufgabe: Servant Leadership, Hindernisse aus dem Weg räumen. Achtung Rückfall-Falle: Personelle Wechsel werfen das Team zur Neujustierung zurück! Adjourning (Erweiterung 1977 von Tuckman & Jensen): Auflösungsphase mit emotionaler Ambivalenz. Führungsaufgabe: Bewusster Abschluss, Retrospektive & Würdigung.',
        examTip: 'IHK-Merksatz: Adjourning wurde 1977 von Tuckman & Jensen ergänzt; ein fehlender Abschluss beschädigt den Neustart im nächsten Team!'
      },
      {
        term: 'Seite 5: DIN 69901-2 Die 5 PM-Phasen & Phase 1 Initialisierung',
        explanation: 'Die 5 PM-Phasen nach DIN 69901-2: 1. Initialisierung, 2. Definition, 3. Planung, 4. Steuerung, 5. Abschluss. PM-Phasen steuern das Vorhaben; fachliche Phasen erstellen das Produkt. Hauptfehler: Die fachliche Arbeit beginnt zu früh (Design/Code vor Zielklärung)! Initialisierung klärt die Projektidee, Machbarkeit, ersten Nutzen und die Entscheidung über das OB (Go/No-Go des Auftraggebers).',
        examTip: 'Prüfungsfalle: Nenne bei PM-Phasen niemals operative Tätigkeiten wie "Drucken" – das sind rein fachliche Phasen!'
      },
      {
        term: 'Seite 6: DIN 69901-2 Phasen 2–4 (Definition, Planung & Steuerung)',
        explanation: 'Phase 2 (Definition): WAS soll erreicht werden? Stakeholder-Analyse, Kernteam & explizite Nicht-Ziele (Schutz vor Scope Creep). Phase 3 (Planung): Projektstrukturplan (PSP) als zerlegendes Fundament & Messbasis für Abweichungen. Phase 4 (Steuerung): Fachliche Umsetzung begleiten, Soll-Ist-Controlling. Wichtige IHK-Prüfungsfalle: Die formale Ergebnisabnahme gehört zur Phase Steuerung!',
        examTip: '70% Prüfungsfehler: Die Abnahme des Projektergebnisses gehört im DIN-Prozessmodell zur Steuerung, NICHT zum Abschluss!'
      },
      {
        term: 'Seite 7: DIN 69901-2 Phase 5 Abschluss & der geschlossene Kreislauf',
        explanation: 'Phase 5 (Abschluss): Nach der Abnahme folgen Projektabschlussbericht, Nachkalkulation, revisionssichere Archivierung und Entlastung der Projektleitung. Erfahrungssicherung (Lessons Learned): Erkenntnisse dürfen kein "Datenfriedhof" sein; sie müssen auffindbar und operativ für künftige Projekte nutzbar gemacht werden. Der DIN-Kreislauf speist dieses Wissen direkt zurück in die Initialisierung neuer Vorhaben.',
        examTip: 'Merksatz: Dokumentieren allein reicht nicht – Lessons Learned müssen in Folgeprojekten tatsächlich nutzbar sein!'
      },
      {
        term: 'IHK-Übersichtstabelle: Tuckman Teamentwicklung & Führungsmatrix',
        explanation: 'Forming -> Führung: Direktive Orientierung, Rollen klären. Storming -> Führung: Neutrale Moderation, Konflikte klären. Norming -> Führung: Loslassen, Spielregeln vertrauen. Performing -> Führung: Servant Leadership, Hindernisse aus dem Weg räumen. Adjourning -> Führung: Bewusster Abschluss, Lessons Learned & Würdigung.',
        examTip: 'IHK-Synthese: DIN 69901-2 steuert die Hard Skills (Prozesse/Zahlen), Tuckman steuert die Soft Skills (Teamreife/Führung).'
      }
    ]
  }
];

