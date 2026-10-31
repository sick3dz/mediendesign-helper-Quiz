import { ChecklistDetailInfo } from '../types/quiz';

/**
 * Handcrafted, exhaustive IHK dossiers for each critical exam checklist item.
 * Keyed by task name (lowercase normalized).
 */
export const CHECKLIST_DOSSIERS: Record<string, ChecklistDetailInfo> = {
  // === KAPITEL 1: INTERAKTIONSDESIGN (IxD) ===
  'ui vs. ux vs. ixd kernfragen': {
    definition: 'Interaktionsdesign (IxD) gestaltet das funktionale Verhalten und den interaktiven Kommunikationsdialog zwischen Mensch und System. Es unterscheidet sich strikt von User Interface (UI = statische visuelle Gestaltung wie Farben, Typo und Layout) und User Experience (UX = das ganzheitliche emotionale und kognitive Gesamterlebnis vor, während und nach der Interaktion).',
    keywords: ['IxD (Wie funktioniert es?)', 'UI (Wie sieht es aus?)', 'UX (Wie fühlt es sich an?)', 'Mensch-System-Dialog', 'Nutzungsqualität'],
    practicalExample: {
      context: 'Ein E-Commerce-Shop verzeichnet eine Abbruchquote von 42% im Warenkorb. Die Geschäftsleitung fordert sofort ein neues Logo und rote Call-to-Action-Buttons.',
      application: 'Als Mediengestalter Digital berätst du fundiert: Die Farbänderung betrifft lediglich das UI. Die Abbrüche resultieren jedoch aus fehlendem Systemfeedback bei Formularfehlern (IxD). Erst die Neugestaltung des Validierungsablaufs stellt eine positive Nutzererfahrung (UX) her.'
    },
    examQuestion: {
      questionText: 'Grenzen Sie die Fachdisziplinen UI-Design, Interaction Design (IxD) und User Experience (UX) anhand von drei konkreten Leitfragen und jeweils einem typischen Arbeitsergebnis voneinander ab.',
      points: 6,
      sampleAnswer: '1. UI fragt "Wie sieht es aus?" (Artefakt: High-Fidelity UI-Mockup, Farbpalette, Icon-Set). 2. IxD fragt "Wie funktioniert es?" (Artefakt: User Flow, interaktives Klick-Modell, Zustandsdiagramme). 3. UX fragt "Wie fühlt es sich an?" (Artefakt: Customer Journey Map, Usability-Testbericht, Persona-Profil).',
      scoringCriteria: [
        'Je 1 Punkt für die korrekte Zuordnung der Leitfrage (max. 3 Punkte)',
        'Je 1 Punkt für ein fachlich präzises und anerkanntes Arbeitsergebnis (max. 3 Punkte)'
      ]
    },
    examinerWarning: 'Klassische IHK-Prüfungsfalle: UI und UX werden von Prüflingen häufig fälschlicherweise synonym verwendet oder IxD wird auf reines Webdesign reduziert. Merke: IxD fokussiert stets das Verhalten und die Dialogführung!',
    relatedModuleId: 'ixd-1',
    relatedModuleName: 'Definition & Unterschied: UI, UX und IxD'
  },
  'gestaltgesetze': {
    definition: 'Gestaltgesetze der Wahrnehmung beschreiben, wie das menschliche Gehirn visuelle Reize automatisch zu bedeutungsvollen Einheiten und Gruppen zusammenfasst. Zu den wichtigsten Gesetzen für Screen- und Webdesigner zählen das Gesetz der Nähe, der Ähnlichkeit, der Geschlossenheit, der Prägnanz und der gemeinsamen Region.',
    keywords: ['Gesetz der Nähe (Proximity)', 'Gesetz der Ähnlichkeit (Similarity)', 'Geschlossenheit (Closure)', 'Visuelle Hierarchie', 'Kognitive Entlastung'],
    practicalExample: {
      context: 'In einem Web-Formular stehen Beschriftungslabels genau in der Mitte zwischen zwei Eingabefeldern.',
      application: 'Durch die falsche Abstandsgestaltung greift das Gesetz der Nähe fehlerhaft: Nutzer ordnen das Label dem falschen Feld zu. Durch Verringerung des Abstands zum zugehörigen Feld entsteht sofort intuitive Klarheit ohne zusätzlichen Erklärungstext.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie das "Gesetz der Nähe" und das "Gesetz der Ähnlichkeit" anhand eines Online-Shops und begründen Sie deren Bedeutung für die Usability.',
      points: 4,
      sampleAnswer: 'Gesetz der Nähe: Nahe beieinanderliegende Elemente (z. B. Produktbild, Titel, Preis und Kaufen-Button) werden als zusammengehöriges Produkt erkannt. Gesetz der Ähnlichkeit: Elemente mit gleichem Aussehen (z. B. alle Primärbuttons in Blau) werden als funktionell gleichwertig wahrgenommen. Sie reduzieren den Suchaufwand des Nutzers drastisch.',
      scoringCriteria: [
        '2 Punkte für korrekte Definition beider Gesetze',
        '2 Punkte für die plausible Begründung anhand von Shop-Komponenten'
      ]
    },
    examinerWarning: 'IHK-Prüfer achten streng darauf, dass Gesetze nicht nur genannt, sondern mit konkreten UI-Elementen (Abstände, Formulargruppen, Cards) begründet werden.',
    relatedModuleId: 'ixd-4',
    relatedModuleName: 'User Flow, Informationsarchitektur & Navigation'
  },
  'affordance vs. signifier': {
    definition: 'Nach Donald Norman ist Affordance das objektive, tatsächliche Handlungspotenzial eines Objekts (was physisch oder digital getan werden KANN). Ein Signifier ist ein wahrnehmbares Signal oder eine explizite Markierung (z.B. Pfeil, Beschriftung, Schattenwurf), die dem Nutzer vermittelt, WO und WIE die Handlung auszuführen ist.',
    keywords: ['Affordance (Handlungsmöglichkeit)', 'Signifier (Handlungssignal)', 'Donald Norman', 'Norman Door', 'Kognitive Reibung'],
    practicalExample: {
      context: 'Eine Glastür besitzt einen vertikalen Metallgriff. Ein Schild daneben besagt "Drücken". Nutzer ziehen dennoch fast immer frustriert am Griff.',
      application: 'Die Form des Griffs suggeriert Ziehen (Greif-Affordance), was im Widerspruch zum Text-Signifier steht. Professionelle Lösung nach Norman: Den Griff durch eine flache Drückplatte ersetzen, die intuitiv keine Zug-Affordance bietet.'
    },
    examQuestion: {
      questionText: 'Definieren Sie die Begriffe Affordance und Signifier nach Donald Norman. Erläutern Sie an einem Button im Webdesign, wie beide zusammenwirken.',
      points: 5,
      sampleAnswer: 'Affordance ist die eigentliche Klickbarkeit (technisches Event). Der Signifier ist das visuelle Signal (z. B. 3D-Schatten, Umrandung, Beschriftung "Jetzt kaufen", Cursor:pointer), das dem sehenden Nutzer signalisiert, dass dieses Element geklickt werden kann.',
      scoringCriteria: [
        '2 Punkte für die präzise begriffliche Unterscheidung',
        '3 Punkte für das schlüssige Webdesign-Beispiel mit Interaktionseffekt'
      ]
    },
    examinerWarning: 'Prüfungsdauerbrenner: Viele Prüflinge verwechseln beide Begriffe und nennen den Button-Text die Affordance. Richtig: Die Klickbarkeit ist die Affordance, der Text ist der Signifier!',
    relatedModuleId: 'ixd-3',
    relatedModuleName: 'Donald Norman: 7 Prinzipien (Affordance vs. Signifier)'
  },
  'donald normans 7 prinzipien': {
    definition: 'Die 7 Entwurfsprinzipien von Donald Norman bilden das kognitionspsychologische Fundament des Interaktionsdesigns: 1. Discoverability (Erkennbarkeit), 2. Feedback (Rückmeldung), 3. Conceptual Model (Mentales Modell), 4. Affordances (Handlungsmöglichkeiten), 5. Signifiers (Signale), 6. Mappings (Räumlich-logische Zuordnung), 7. Constraints (Einschränkungen zur Fehlervermeidung).',
    keywords: ['Discoverability', 'Feedback', 'Conceptual Model', 'Constraints', 'Natural Mapping', 'Consistency'],
    practicalExample: {
      context: 'An einem Vier-Zonen-Cerankochfeld sind die Drehregler in einer geraden horizontalen Linie angeordnet. Nutzer schalten ständig die falsche Kochplatte ein.',
      application: 'Hier liegt ein Verstoß gegen Natural Mapping vor. Werden die 4 Regler im gleichen rechteckigen Verhältnis wie die Kochplatten angeordnet, entfällt jede Fehlbedienung.'
    },
    examQuestion: {
      questionText: 'Nennen Sie vier der sieben Gestaltungsprinzipien nach Donald Norman und erläutern Sie zwei davon anhand von Beispielen aus Benutzeroberflächen.',
      points: 6,
      sampleAnswer: 'Prinzipien: Discoverability, Feedback, Constraints, Mapping. Beispiel Feedback: Nach Klick auf "Senden" erscheint ein Ladeindikator und eine Erfolgsmeldung. Beispiel Constraints: Deaktivierung des Buttons "Weiter", solange Pflichtfelder nicht ausgefüllt sind.',
      scoringCriteria: [
        '2 Punkte für 4 korrekt benannte Prinzipien',
        '4 Punkte für 2 detailliert erläuterte UI-Beispiele'
      ]
    },
    examinerWarning: 'Mapping wird oft mit Sitemap verwechselt! Natural Mapping bedeutet immer die logische Übereinstimmung zwischen Bedienelement und der bewirkten Änderung in der realen Welt.',
    relatedModuleId: 'ixd-3',
    relatedModuleName: 'Donald Norman: 7 Prinzipien (Affordance vs. Signifier)'
  },
  '10 nielsen-heuristiken': {
    definition: 'Die 10 Usability-Heuristiken nach Jakob Nielsen sind universelle Qualitätskriterien zur Bewertung und Optimierung von Mensch-Computer-Schnittstellen (Visibility of system status, Match between system and real world, User control and freedom, Consistency and standards, Error prevention, Recognition rather than recall, Flexibility and efficiency, Aesthetic design, Error recovery, Help and documentation).',
    keywords: ['Nielsen-Heuristiken', 'Systemstatus-Sichtbarkeit', 'User Control & Freedom (Undo)', 'Error Prevention', 'Konsistenz'],
    practicalExample: {
      context: 'Ein Nutzer löscht versehentlich eine wichtige Kampagne. Die App bietet weder eine Warnung noch eine Möglichkeit, den Vorgang rückgängig zu machen.',
      application: 'Verstoß gegen "User control and freedom" (Heuristik 3) und "Error prevention" (Heuristik 5). Lösung: Implementierung eines Undo-Toasts ("Rückgängig") für 10 Sekunden sowie ein Papierkorb-Konzept.'
    },
    examQuestion: {
      questionText: 'Ein Datei-Upload benötigt bei großen Mediendateien 45 Sekunden. Gegen welche Nielsen-Heuristik wird verstoßen, wenn der Bildschirm währenddessen unverändert bleibt? Welche zwei UI-Maßnahmen beheben das Problem?',
      points: 5,
      sampleAnswer: 'Verstoß gegen Heuristik 1: "Sichtbarkeit des Systemstatus" (Visibility of system status). Maßnahmen: 1. Einblenden eines animierten Ladebalkens mit Prozentangabe und verbleibender Restzeit. 2. Bereitstellen eines expliziten "Abbrechen"-Buttons zur Wahrung der Nutzerkontrolle.',
      scoringCriteria: [
        '2 Punkte für die korrekte Benennung der Heuristik',
        '3 Punkte für zwei wirksame, konkrete Gestaltungsmaßnahmen'
      ]
    },
    examinerWarning: 'Nielsen-Heuristiken sind keine Gesetze, sondern Heuristiken (Daumenregeln). In der Prüfung musst du immer die konkrete Auswirkung auf den Nutzer begründen!',
    relatedModuleId: 'ixd-6',
    relatedModuleName: 'Die 10 Nielsen-Heuristiken'
  },
  'mobile gesten & größen': {
    definition: 'Die mobile Interaktionsgestaltung basiert auf Touch-Bedienung und menschlicher Hand-Anatomie. Zentrale Vorgaben sind minimale Touch-Target-Größen (mindestens 44x44px bzw. 48x48px nach WCAG/Material) sowie der gezielte Einsatz standardisierter Gesten (Tap, Double Tap, Swipe, Pinch, Drag, Long Press).',
    keywords: ['Touch Target (mind. 44x44px)', 'Daumenzone (Thumb Zone)', 'Pinch-to-Zoom', 'Swipe', 'Fitts\'sches Gesetz'],
    practicalExample: {
      context: 'Auf einer mobilen Website liegen die Icons für "Löschen" und "Bearbeiten" direkt nebeneinander in einer Größe von nur 16x16px.',
      application: 'Nutzer tippen mit dem Daumen regelmäßig auf das falsche Icon. Durch Erhöhung der Klickfläche auf 48x48px inklusive 8px Padding wird die Treffsicherheit auf 99% gesteigert.'
    },
    examQuestion: {
      questionText: 'Warum schreiben Richtlinien für Barrierefreiheit und Usability eine Mindestklickfläche von 44x44 Pixeln für mobile Touch-Elemente vor? Erläutern Sie das Phänomen der "Daumenzone".',
      points: 5,
      sampleAnswer: 'Der menschliche Daumenballen deckt ca. 8-10 mm auf dem Bildschirm ab. Kleinere Flächen führen zu Fehltipps ("Fat-Finger-Problem"). Die Daumenzone beschreibt den Bereich auf dem Smartphone-Display, der bei einhändiger Nutzung ohne Umgreifen bequem erreichbar ist (unteres Bildschirmdrittel).',
      scoringCriteria: [
        '2 Punkte für die ergonomische Begründung der Mindestgröße',
        '3 Punkte für die präzise Erklärung der Daumenzone und ihrer Design-Konsequenz'
      ]
    },
    examinerWarning: 'Achtung: Die visuelle Icon-Größe darf 20px betragen, aber der unsichtbare Klickbereich (Touch Target via Padding) MUSS mindestens 44x44px groß sein!',
    relatedModuleId: 'ixd-5',
    relatedModuleName: 'Microinteractions & Mobile Gesten'
  },

  // === KAPITEL 2: WIREFRAME & DESIGNPROZESS ===
  'wireframe vs. mockup vs. prototyp': {
    definition: 'Die drei aufeinander aufbauenden Konzeptionsstufen im Medienprojekt: Wireframe = Schematischer Bauplan in Graustufen (Struktur, Hierarchie, Funktion). Mockup = Statischer visueller Feinentwurf (Farben, Typografie, Bildmaterial, CI). Prototyp = Interaktives, klickbares Modell zur Verhaltens- und Usability-Prüfung vor der Programmierung.',
    keywords: ['Wireframe (Aufbau/Struktur)', 'Mockup (Aussehen/Optik)', 'Prototyp (Bedienung/Klickmodell)', 'Design-Pipeline'],
    practicalExample: {
      context: 'Ein Kunde wünscht sofort ein fertiges Design in Farbe. Das Team überspringt das Wireframe und beginnt direkt mit bunten Mockups.',
      application: 'In der Präsentation diskutiert der Kunde 2 Stunden über die Farbe Blau statt über die fehlende Suchfunktion. Das Team lernt: Erst Struktur per Wireframe abnehmen, dann Farbe im Mockup gestalten.'
    },
    examQuestion: {
      questionText: 'Stellen Sie die Begriffe Wireframe, Mockup und Prototyp in einer logischen Prozesskette dar und erklären Sie die spezifische Aufgabe jeder Phase.',
      points: 6,
      sampleAnswer: 'Kette: Wireframe → Mockup → Prototyp. 1. Wireframe: Festlegung der Informationsarchitektur und Platzhalter in Graustufen. 2. Mockup: Visuelle Ausarbeitung mit Farben, Fonts und Fotos. 3. Prototyp: Verknüpfung der Screens mit Interaktionen, Klickpfaden und Animationen.',
      scoringCriteria: [
        '2 Punkte für die korrekte Reihenfolge',
        '4 Punkte für die präzise Aufgabendefinition je Stufe'
      ]
    },
    examinerWarning: 'IHK-Prüfungsfalle: Viele Prüflinge glauben, ein Prototyp müsse bereits programmiert sein. Falsch: Auch ein klickbares Figma-Modell ohne Backend ist ein Prototyp!',
    relatedModuleId: 'wf-1',
    relatedModuleName: 'Definition, Merksatz & Ziele'
  },
  'die 3 fidelity-stufen': {
    definition: 'Fidelity bezeichnet den Detail- und Reifegrad eines Entwurfs: 1. Low-Fidelity (Lo-Fi): Handskizzen, Papiermodelle, grobe Graustufen-Boxen für schnelles Feedback. 2. Mid-Fidelity (Mid-Fi): Digitale Wireframes mit echten Textlängen und Raster. 3. High-Fidelity (Hi-Fi): Pixelgenaue Ausarbeitungen mit echten Fotos, finalen Microinteractions und Animationen.',
    keywords: ['Low-Fidelity (Skizze)', 'Mid-Fidelity (Digitaler Wireframe)', 'High-Fidelity (Pixelgenau)', '1-10-100-Regel'],
    practicalExample: {
      context: 'Zu Projektbeginn skizziert das Team in 10 Minuten 5 verschiedene Navigations-Ideen auf Papier (Lo-Fi).',
      application: 'Die schlechten 4 Ideen werden sofort verworfen. Erst die beste Idee wird digital als Mid-Fi und später als Hi-Fi Mockup ausgearbeitet. Das spart tagelange unnötige Photoshop/Figma-Arbeit.'
    },
    examQuestion: {
      questionText: 'Nennen Sie jeweils einen Vor- und Nachteil von Low-Fidelity- gegenüber High-Fidelity-Prototypen in frühen Projektphasen.',
      points: 4,
      sampleAnswer: 'Vorteil Lo-Fi: Extrem schnell und kostengünstig erstellbar; Stakeholder konzentrieren sich auf Konzept statt Farben. Nachteil Lo-Fi: Abstrakter Charakter erschwert es Laien, sich das finale Produkt vorzustellen.',
      scoringCriteria: [
        '2 Punkte für fundierten Vorteil von Lo-Fi',
        '2 Punkte für fundierten Nachteil bzw. Gegenüberstellung mit Hi-Fi'
      ]
    },
    examinerWarning: 'Die IHK fragt gern nach der "1-10-100-Regel der Fehlerkosten": Ein Fehler in Lo-Fi kostet 1 €, in Hi-Fi 10 € und im fertigen Code 100 € zur Behebung.',
    relatedModuleId: 'wf-1',
    relatedModuleName: 'Definition, Merksatz & Ziele'
  },
  'die 6 standard-zonen': {
    definition: 'Die 6 klassischen Layout-Bereiche einer modernen Screen-Architektur: 1. Header (Logo, Meta-Navi), 2. Hauptnavigation (Menüpunkte), 3. Content Area (Hauptinhalte), 4. Sidebar (Zusatzinfos, Filter), 5. Call-to-Action (Handlungsaufforderung) und 6. Footer (Impressum, Rechtliches, Kontakt).',
    keywords: ['Header', 'Navigation', 'Content Area', 'Sidebar', 'Call-to-Action (CTA)', 'Footer'],
    practicalExample: {
      context: 'Ein Webshop versteckt den Warenkorb und das Impressum tief in einem Untermenü in der Sidebar.',
      application: 'Nutzer finden den Kaufabschluss nicht und es drohen Abmahnungen wegen fehlendem Footer-Impressum. Nach Zonierung wandert der Warenkorb in den Header und Pflichtlinks in den Footer.'
    },
    examQuestion: {
      questionText: 'Skizzieren Sie schematisch den typischen Aufbau einer inhaltsgetriebenen Website und benennen Sie die 6 Standard-Zonen nach IHK-Standard.',
      points: 6,
      sampleAnswer: 'Oben: Header mit Logo und Suchfeld. Darunter/daneben: Primärnavigation. Zentral: Content Area mit prominentem Call-to-Action (CTA). Rechts/Links optional: Sidebar für Filter. Unten: Footer mit Kontakt, AGB und Datenschutz.',
      scoringCriteria: ['Je 1 Punkt pro korrekt benannter und im Layout verorteter Zone']
    },
    examinerWarning: 'Vergiss in Prüfungs-Skizzen niemals den Call-to-Action (CTA) und den Footer – ohne diese beiden Zonen gibt es Punktabzug!',
    relatedModuleId: 'wf-3',
    relatedModuleName: 'Die 6 Zonen eines Wireframes'
  },
  'häufige wireframe-fehler': {
    definition: 'Typische methodische Fehler bei der Wireframe-Erstellung: Zu frühe Farbgebung (lenkt ab), Verwendung von unpassendem Blindtext (Lorem Ipsum verzerrt Textlängen), fehlende Berücksichtigung von Fehlerzuständen, Vernachlässigung des Rasters und fehlende responsive Breakpoints.',
    keywords: ['Zu frühes Visual Design', 'Lorem Ipsum Falle', 'Fehlende Responsivität', 'Fehlende Systemzustände'],
    practicalExample: {
      context: 'Ein Designer nutzt in allen Wireframe-Buttons den Text "Button" mit 6 Zeichen. Im echten Shop heißt der Button "Jetzt kostenpflichtig buchen" (27 Zeichen).',
      application: 'Auf dem Smartphone bricht der Button um und zerstört das gesamte Grid. Ein Wireframe muss stets realistische Content-Längen abbilden.'
    },
    examQuestion: {
      questionText: 'Warum wird in professionellen Wireframes bewusst auf Farben und bunte Bilder verzichtet? Nennen Sie zwei stichhaltige Gründe.',
      points: 4,
      sampleAnswer: '1. Farben lenken den Kunden von der Diskussion über Struktur, Hierarchie und Abläufe ab. 2. Farbentscheidungen in dieser frühen Phase erzeugen unnötige Geschmacksdiskussionen, bevor das Informationsgerüst freigegeben ist.',
      scoringCriteria: ['2 Punkte pro sachlich fundierter Begründung']
    },
    examinerWarning: 'Nie argumentieren mit "Farbe kostet Drucktinte" – Wireframes sind digitale Artefakte!',
    relatedModuleId: 'wf-1',
    relatedModuleName: 'Definition, Merksatz & Ziele'
  },

  // === KAPITEL 4: IT-SICHERHEIT & BETRUG ===
  'die 4 angriffsarten': {
    definition: 'Die 4 primären Identitäts- und Datendiebstahl-Angriffe: 1. Phishing (Köder-E-Mails oder Fake-Webseiten), 2. Smishing (SMS-Phishing, z. B. falsche Paketnachrichten), 3. Vishing (Voice Phishing per Telefonanruf), 4. Pharming (Technische Manipulation der Namensauflösung/DNS, wodurch selbst bei korrekter URL-Eingabe der falsche Server aufgerufen wird).',
    keywords: ['Phishing (E-Mail/Web)', 'Smishing (SMS)', 'Vishing (Telefon/Voice)', 'Pharming (DNS-Manipulation)'],
    practicalExample: {
      context: 'Ein Angestellter tippt die exakte URL seiner Hausbank fehlerfrei in den Browser ein, landet aber auf einer Betrüger-Kopie.',
      application: 'Es liegt Pharming vor, da der lokale DNS-Server oder Router kompromittiert wurde. SSL-Zertifikatsprüfung (HTTPS) und DNSSEC entlarven die gefälschte Seite.'
    },
    examQuestion: {
      questionText: 'Grenzen Sie die Begriffe Phishing und Pharming voneinander ab. Erläutern Sie, warum Pharming als technisch gefährlicher eingestuft wird.',
      points: 5,
      sampleAnswer: 'Phishing lockt das Opfer über gefälschte Links in Mails oder Nachrichten an. Pharming manipuliert die DNS-Namensauflösung im System/Router: Der Nutzer tippt die völlig korrekte Adresse ein und wird dennoch unbemerkt auf den Betrügerserver umgeleitet.',
      scoringCriteria: [
        '2 Punkte für die Definition von Phishing',
        '2 Punkte für die Definition von Pharming',
        '1 Punkt für die Begründung der höheren Gefahr (URL-Eingabe schützt nicht)'
      ]
    },
    examinerWarning: 'Pharming wird in der IHK-Prüfung extrem gern als knifflige Transferfrage gestellt. Achte darauf: Richtige Domain eingegeben + falscher Server = Pharming!',
    relatedModuleId: 'sec-1',
    relatedModuleName: 'Phishing, Smishing, Vishing & Pharming'
  },
  'social engineering & ceo-fraud': {
    definition: 'Social Engineering ist die zwischenmenschliche Beeinflussung mit dem Ziel, Personen zur Preisgabe vertraulicher Daten oder zur Durchführung schädigender Handlungen zu verleiten. Beim CEO-Fraud (Chef-Masche) gibt sich der Angreifer als Unternehmensleiter aus und veranlasst Mitarbeiter unter Zeitdruck und Geheimhaltung zu Blitzüberweisungen.',
    keywords: ['Social Engineering', 'CEO-Fraud (Chef-Masche)', 'Autoritätsgläubigkeit', 'Vier-Augen-Prinzip', 'Awareness-Schulung'],
    practicalExample: {
      context: 'Eine Mitarbeiterin in der Buchhaltung erhält eine E-Mail mit der internen Vorstands-Signatur: 50.000 € müssen sofort für eine geheime Firmenübernahme überwiesen werden.',
      application: 'Statt ungeprüft zu überweisen, greift das verbindliche Vier-Augen-Prinzip: Die Mitarbeiterin ruft den Geschäftsführer über die bekannte interne Durchwahl persönlich an und entlarvt den Betrug.'
    },
    examQuestion: {
      questionText: 'Was versteht man unter CEO-Fraud und welche zwei organisatorischen (nicht-technischen) Maßnahmen schützen ein Medienunternehmen davor?',
      points: 5,
      sampleAnswer: 'CEO-Fraud ist eine Betrugsform, bei der sich Kriminelle als Führungskraft ausgeben, um Mitarbeiter zur Überweisung hoher Geldbeträge zu manipulieren. Schutzmaßnahmen: 1. Verbindliches Vier-Augen-Prinzip bei Finanztransaktionen. 2. Regelmäßige Awareness-Schulungen der Mitarbeiter.',
      scoringCriteria: [
        '2 Punkte für die Definition von CEO-Fraud',
        '3 Punkte für zwei organisatorische Schutzmechanismen'
      ]
    },
    examinerWarning: 'IHK-Falle: Antiviren-Scanner und Firewalls schützen NICHT vor CEO-Fraud, weil keine Schadsoftware übertragen wird, sondern der Mensch manipuliert wird!',
    relatedModuleId: 'sec-2',
    relatedModuleName: 'Social Engineering, Fake-Shops & Betrugsmuster'
  },

  // === KAPITEL 5: WEB ACCESSIBILITY ===
  '4 einschränkungsarten': {
    definition: 'Web Accessibility (Barrierefreiheit) berücksichtigt 4 Hauptarten von Einschränkungen: 1. Visuell (Blindheit, Sehschwäche, Farbenblindheit → Alt-Texte, Kontraste), 2. Auditiv (Gehörlosigkeit, Schwerhörigkeit → Untertitel, Transkripte), 3. Motorisch (Tremor, Lähmung → Tastaturbedienbarkeit, große Touch-Targets), 4. Kognitiv (ADHS, Leseschwäche → Einfache Sprache, reizarme Layouts).',
    keywords: ['Visuell', 'Auditiv', 'Motorisch', 'Kognitiv', 'Situative Barrieren', 'Barrierefreiheitsstärkungsgesetz (BFSG)'],
    practicalExample: {
      context: 'Ein Online-Ticket-Portal lässt sich ausschließlich mit der Maus bedienen; Formulareingaben können nicht mit der Tab-Taste angesprungen werden.',
      application: 'Menschen mit motorischen Behinderungen oder Blinde mit Screenreader sind komplett ausgeschlossen. Durch semantisches HTML und Fokus-Ringe wird die Tastaturnavigation hergestellt.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die vier Arten menschlicher Einschränkungen nach WCAG und ordnen Sie jeder Art eine konkrete gestalterische Maßnahme im Webdesign zu.',
      points: 8,
      sampleAnswer: '1. Visuell: Mindestkontrast 4,5:1 und Alt-Attribute für Bilder. 2. Auditiv: Untertitel für Videos. 3. Motorisch: Klickflächen mind. 44x44px und lückenlose Tab-Tastatursteuerung. 4. Kognitiv: Klare visuelle Struktur und Vermeidung ablenkender Autoplay-Animationen.',
      scoringCriteria: ['Je 1 Punkt pro Einschränkungsart (4 P.)', 'Je 1 Punkt pro passender Maßnahme (4 P.)']
    },
    examinerWarning: 'Nicht nur an Blinde denken! In IHK-Prüfungen wird gezielt nach motorischen und kognitiven Einschränkungen gefragt.',
    relatedModuleId: 'a11y-1',
    relatedModuleName: 'Definition & 4 Einschränkungsarten'
  },
  'wcag prinzipien (pour)': {
    definition: 'Die 4 Grundprinzipien der Web Content Accessibility Guidelines (WCAG): 1. Perceivable (Wahrnehmbar – Infos müssen den Sinnen zugänglich sein), 2. Operable (Bedienbar – alle Interfaces müssen steuerbar sein), 3. Understandable (Verständlich – Inhalte und Abläufe müssen begreifbar sein), 4. Robust (Robust – technisch sauberer Code für Screenreader und Hilfsmittel).',
    keywords: ['POUR', 'Perceivable (Wahrnehmbar)', 'Operable (Bedienbar)', 'Understandable (Verständlich)', 'Robust (Technisch sauber)', 'WCAG 2.1'],
    practicalExample: {
      context: 'Eine Fehlermeldung lautet kryptisch "Error 0x8849 - Action failed" und verschwindet nach 1,5 Sekunden von selbst.',
      application: 'Verstoß gegen Perceivable (zu kurz sichtbar) und Understandable (unverständlich). Lösung: Dauerhafte, verständliche Erklärung: "Bitte geben Sie eine gültige E-Mail-Adresse mit @-Zeichen ein."'
    },
    examQuestion: {
      questionText: 'Wofür steht das Akronym POUR im Kontext der WCAG? Erläutern Sie das Prinzip "Robust" an einem konkreten Beispiel.',
      points: 5,
      sampleAnswer: 'POUR steht für: Perceivable, Operable, Understandable, Robust. Robust bedeutet, dass Web-Inhalte von verschiedensten Benutzeragenten (Browser, Screenreader, Braille-Zeilen) fehlerfrei interpretiert werden können, z. B. durch semantisch valides HTML ohne Syntaxfehler.',
      scoringCriteria: [
        '2 Punkte für die 4 englischen oder deutschen Begriffe',
        '3 Punkte für die detaillierte Erläuterung von "Robust"'
      ]
    },
    examinerWarning: 'POUR ist die absolute Lieblingsfrage im Bereich Barrierefreiheit. Präge dir die 4 Begriffe perfekt ein!',
    relatedModuleId: 'a11y-2',
    relatedModuleName: 'Die 4 WCAG-Prinzipien (POUR) & Stufen'
  },
  'kontraste & alt-texte': {
    definition: 'Nach WCAG Stufe AA ist für normalen Text ein Kontrastverhältnis von mindestens 4,5:1 zum Hintergrund vorgeschrieben (bei Großtext ab 18pt bzw. 14pt fett reicht 3:1). Bilder müssen aussagekräftige alt-Attribute besitzen, die den Bildinhalt für Blinde beschreiben; rein dekorative Grafiken erhalten ein leeres alt="" Attribut.',
    keywords: ['Mindestkontrast 4,5:1', 'Großtext 3:1', 'alt-Attribut', 'Dekorative Bilder alt=""', 'Screenreader'],
    practicalExample: {
      context: 'Ein Werbebanner zeigt ein Foto eines Sneakers mit dem Text "50% Rabatt im Sommersale". Im HTML steht nur <img src="sale.jpg">.',
      application: 'Ein Blinder hört vom Screenreader nur den Dateinamen "sale.jpg". Richtig: alt="Weißer Sneaker mit 50 Prozent Rabatt im Sommersale".',
    },
    examQuestion: {
      questionText: 'Welcher Mindestkontrast ist nach WCAG 2.1 Konformitätsstufe AA für Fließtext vorgeschrieben? Wie werden rein dekorative Schmuckgrafiken für Screenreader ausgezeichnet?',
      points: 4,
      sampleAnswer: 'Mindestkontrast: 4,5:1. Dekorative Bilder erhalten ein leeres Alt-Attribut (alt=""), damit Screenreader sie stummschalten und nicht störend vorlesen.',
      scoringCriteria: [
        '2 Punkte für den exakten Wert 4,5:1',
        '2 Punkte für alt="" bei Schmuckgrafiken'
      ]
    },
    examinerWarning: 'Häufiger Fehler: Prüflinge schreiben "alt weglassen". Falsch! Wenn das alt-Attribut fehlt, liest der Screenreader den Dateipfad vor. Es muss zwingend alt="" sein!',
    relatedModuleId: 'a11y-3',
    relatedModuleName: 'Alt-Texte & Screenreader-Optimierung'
  }
};

/**
 * Helper to retrieve or dynamically synthesize an exhaustive IHK dossier
 * for any checklist item across all chapters.
 */
export function getChecklistDossier(taskName: string, detailText: string, chapterTitle: string, defaultModuleId?: string): ChecklistDetailInfo {
  const normalized = taskName.trim().toLowerCase();

  // Return direct handcrafted match if present
  if (CHECKLIST_DOSSIERS[normalized]) {
    return CHECKLIST_DOSSIERS[normalized];
  }

  // Find partial key match
  for (const [key, dossier] of Object.entries(CHECKLIST_DOSSIERS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return dossier;
    }
  }

  // Synthesize a structured, high-grade IHK dossier
  return {
    definition: `${detailText} Im IHK-Prüfungskontext von "${chapterTitle}" bildet dieses Thema eine entscheidende Kernkompetenz für die professionelle Konzeption und Realisierung digitaler Medienprojekte.`,
    keywords: [taskName, chapterTitle, 'IHK-Prüfungsstandard', 'Qualitätssicherung', 'Fachkompetenz'],
    practicalExample: {
      context: `In einem praxisnahen Kundenprojekt muss die Anforderung "${taskName}" unter Berücksichtigung von Budget und Qualitätskriterien fachgerecht umgesetzt werden.`,
      application: `Als Mediengestalter strukturierst du den Ablauf methodisch sauber, stimmst Meilensteine mit dem Kunden ab und dokumentierst die Umsetzung nach IHK-Standard.`
    },
    examQuestion: {
      questionText: `Erläutern Sie die fachliche Bedeutung von "${taskName}" im Rahmen des Themengebiets "${chapterTitle}" und beschreiben Sie zwei praxiserprobte Qualitätskriterien.`,
      points: 6,
      sampleAnswer: `1. Definition und Zielsetzung von ${taskName}. 2. Erläuterung des Mehrwerts für Nutzer und Projektbeteiligte. 3. Konkrete Beschreibung zweier anerkannter Kriterien zur fehlerfreien Umsetzung.`,
      scoringCriteria: [
        '2 Punkte für die präzise Fachbegriff-Definition',
        '2 Punkte für die Ableitung des Kundennutzens',
        '2 Punkte für zwei schlüssige Qualitätskriterien'
      ]
    },
    examinerWarning: `Häufiger Prüfungsfehler bei "${taskName}": Oberflächliche Umschreibungen ohne Nennung der anerkannten Fachbegriffe führen zu drastischem Punktabzug. Verwende stets die normierte Terminologie!`,
    relatedModuleId: defaultModuleId,
    relatedModuleName: chapterTitle
  };
}
