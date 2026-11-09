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
  },

  // === KAPITEL 10: WIRTSCHAFTS- & SOZIALKUNDE (WiSo) ===
  'duales ausbildungssystem & bbig': {
    definition: 'Die duale Berufsausbildung verbindet die betriebliche Praxis mit dem schulischen Unterricht in der Berufsschule. Gesetzliche Hauptgrundlage ist das Berufsbildungsgesetz (BBiG). Der Ausbildungsvertrag bedarf nach § 11 BBiG zwingend der Schriftform und muss vor Beginn der Ausbildung von Ausbildendem, Auszubildendem (und bei Minderjährigen den gesetzlichen Vertretern) unterzeichnet sowie in das Verzeichnis der Berufsausbildungsverhältnisse bei der zuständigen Kammer (IHK) eingetragen werden.',
    keywords: ['Duales System', 'BBiG § 11 (Vertragsniederschrift)', 'Lernorte Betrieb & Berufsschule', 'Fürsorge- & Ausbildungspflicht', 'Berichtsheft (Ausbildungsnachweis)', 'IHK-Kammerverzeichnis'],
    practicalExample: {
      context: 'Ein Auszubildender im Betrieb soll über mehrere Monate ausschließlich Botengänge erledigen und Akten schreddern, ohne fachliche Anleitung zu erhalten.',
      application: 'Der Azubi kann sich auf § 14 BBiG berufen: Der Ausbildende ist gesetzlich verpflichtet, die im Ausbildungsrahmenplan festgelegten Fertigkeiten und Kenntnisse planmäßig und zielgerichtet zu vermitteln. Ausbildungsfremde Arbeiten sind unzulässig.'
    },
    examQuestion: {
      questionText: 'Nennen Sie vier wesentliche Mindestinhalte, die nach § 11 BBiG zwingend in die schriftliche Niederschrift eines Berufsausbildungsvertrags aufzunehmen sind.',
      points: 4,
      sampleAnswer: '1. Art, sachliche und zeitliche Gliederung sowie Ziel der Berufsausbildung (Ausbildungsberuf). 2. Beginn und Dauer der Berufsausbildung. 3. Dauer der regelmäßigen täglichen Ausbildungszeit. 4. Dauer der Probezeit (mind. 1, max. 4 Monate). Weitere zulässige Nennungen: Zahlung und Höhe der Vergütung, Dauer des Urlaubs, Kündigungsvoraussetzungen.',
      scoringCriteria: [
        'Je 1 Punkt pro korrekt nach § 11 BBiG benanntem Vertragsinhalt (maximal 4 Punkte)'
      ]
    },
    examinerWarning: 'Häufiger Punktabzug: Verwende präzise Fachbegriffe! Bezeichne die Zahlung als "Vergütung" (nicht "Gehalt" oder "Lohn") und formuliere "tägliche Ausbildungszeit" (nicht "normale Arbeitszeit").',
    relatedModuleId: 'wiso-1',
    relatedModuleName: 'Berufsausbildung & Arbeitsrecht (BBiG & Schutzgesetze)'
  },
  'probezeit & kündigung im bbig': {
    definition: 'Nach § 20 BBiG muss das Ausbildungsverhältnis zwingend mit einer Probezeit beginnen (mindestens 1 Monat, höchstens 4 Monate). Während der Probezeit kann das Verhältnis von beiden Seiten jederzeit ohne Einhaltung einer Kündigungsfrist und ohne Angabe von Gründen schriftlich gekündigt werden (§ 22 Abs. 1 BBiG). Nach der Probezeit kann der Ausbildende nur noch außerordentlich aus wichtigem Grund fristlos kündigen (Ausschlussfrist: 2 Wochen ab Kenntnis der Kündigungstatsache, § 626 BGB). Der Auszubildende hat nach der Probezeit ein Sonderkündigungsrecht mit 4 Wochen Frist bei Berufsaufgabe oder Wechsel der Fachrichtung (§ 22 Abs. 2 Nr. 2 BBiG).',
    keywords: ['BBiG § 20 (Probezeit 1-4 Monate)', 'Fristlos ohne Grund in Probezeit', 'Wichtiger Grund (§ 626 BGB)', '2-Wochen-Ausschlussfrist', '4-Wochen-Frist bei Berufsaufgabe', 'Schriftform (§ 623 BGB)'],
    practicalExample: {
      context: 'Ein Mediengestalter-Azubi im 3. Ausbildungsmonat erhält vom Chef am Freitag mündlich die Kündigung, weil er unpünktlich war.',
      application: 'Die Kündigung ist nach § 22 Abs. 3 BBiG und § 623 BGB absolut unwirksam (nichtig), da jede Kündigung zwingend der Schriftform auf Papier bedarf. Mündliche Kündigungen, SMS oder WhatsApp sind rechtlich wirkungslos.'
    },
    examQuestion: {
      questionText: 'Ein Auszubildender im 2. Ausbildungsjahr möchte seine Ausbildung zum Mediengestalter beenden, um ein Vollzeit-Studium der Informatik zu beginnen. Erläutern Sie die gesetzlichen Voraussetzungen und die Kündigungsfrist für diesen Fall nach dem BBiG.',
      points: 4,
      sampleAnswer: 'Gemäß § 22 Abs. 2 Nr. 2 BBiG kann der Auszubildende nach der Probezeit mit einer Kündigungsfrist von 4 Wochen kündigen, wenn er die Berufsausbildung aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will. Die Kündigung muss zwingend schriftlich unter Angabe des Kündigungsgrundes (Aufgabe der Ausbildung / Berufswechsel) erfolgen.',
      scoringCriteria: [
        '2 Punkte für die korrekte Frist von 4 Wochen',
        '1 Punkt für das Schriftformerfordernis',
        '1 Punkt für die Pflicht zur Begründungsangabe'
      ]
    },
    examinerWarning: 'IHK-Prüfungsfalle: Prüflinge vergessen, dass bei einer Kündigung durch den Azubi nach der Probezeit der Grund (Berufsaufgabe/Fachrichtungswechsel) zwingend im Kündigungsschreiben stehen MUSS, da die Kündigung sonst formnichtig ist!',
    relatedModuleId: 'wiso-1',
    relatedModuleName: 'Berufsausbildung & Arbeitsrecht (BBiG & Schutzgesetze)'
  },
  'schutzgesetze am arbeitsplatz': {
    definition: 'Arbeitsschutzgesetze teilen sich in allgemeinen und besonderen Arbeitsschutz. Für Jugendliche unter 18 Jahren gilt das Jugendarbeitsschutzgesetz (JArbSchG): max. 8 Stunden täglich (bzw. 8,5 Std. bei Freitagsausgleich), max. 40 Stunden wöchentlich, 5-Tage-Woche, Verbot von Nachtarbeit (20:00–06:00 Uhr) sowie Ruhepausen von 30 Minuten (bei 4,5–6 Std.) bzw. 60 Minuten (bei >6 Std.). Für Volljährige gilt das Arbeitszeitgesetz (ArbZG): max. 8 Std./Werktag (Verlängerung auf 10 Std. nur bei 6-Monats-Ausgleich). Das Bundesurlaubsgesetz (BUrlG) gewährt mind. 24 Werktage gesetzlichen Mindesturlaub (bezogen auf die 6-Tage-Woche = 20 Arbeitstage bei 5-Tage-Woche).',
    keywords: ['JArbSchG (max. 8 Std./Tag, 40 Std./Woche)', 'Ruhepausen (30 bzw. 60 Min)', 'ArbZG (Ruhezeit 11 Std.)', 'BUrlG (24 Werktage = 20 Arbeitstage)', 'Mutterschutzgesetz (MuSchG)'],
    practicalExample: {
      context: 'Eine 17-jährige Auszubildende soll vor einem Messe-Launch 11 Stunden arbeiten und am folgenden Samstag ebenfalls erscheinen.',
      application: 'Dies verstößt zweifach gegen das JArbSchG: Die absolute Höchstarbeitszeit von 8 (ausnahmsweise 8,5) Stunden wird überschritten (§ 8 JArbSchG) und die gesetzliche 5-Tage-Woche (§ 15 JArbSchG) wird durch den Samstagseinsatz ohne Ersatzruhetag verletzt.'
    },
    examQuestion: {
      questionText: 'Ein 16-jähriger Auszubildender arbeitet an einem Werktag von 08:00 Uhr bis 15:30 Uhr mit 30 Minuten Pause. Beurteilen Sie diese Einteilung nach dem Jugendarbeitsschutzgesetz (JArbSchG) hinsichtlich Arbeitszeit und Pausendauer.',
      points: 4,
      sampleAnswer: '1. Arbeitszeit: Anwesenheit 7,5 Stunden abzüglich 0,5 Stunden Pause = 7,0 Stunden reine Arbeitszeit. Dies ist zulässig (max. 8 Stunden nach § 8 JArbSchG). 2. Ruhepause: Bei mehr als 6 Stunden Arbeitszeit schreibt § 11 JArbSchG eine Mindestpause von insgesamt 60 Minuten vor. 30 Minuten sind unzulässig und müssen um weitere 30 Minuten aufgestockt werden.',
      scoringCriteria: [
        '2 Punkte für die Feststellung der zulässigen täglichen Arbeitszeit (7 Std. <= 8 Std.)',
        '2 Punkte für die Beanstandung der Pausendauer (60 Min Pflicht nach § 11 JArbSchG)'
      ]
    },
    examinerWarning: 'Achtung: Im Bundesurlaubsgesetz (BUrlG) wird von Werktagen (Montag bis Samstag = 6-Tage-Woche) gesprochen. 24 Werktage Mindesturlaub entsprechen in einer modernen 5-Tage-Woche exakt 20 Arbeitstagen!',
    relatedModuleId: 'wiso-1',
    relatedModuleName: 'Berufsausbildung & Arbeitsrecht (BBiG & Schutzgesetze)'
  },
  'die 5 säulen der sozialversicherung': {
    definition: 'Das deutsche Sozialversicherungssystem basiert auf dem Solidaritätsprinzip und umfasst fünf gesetzliche Pflichtversicherungen: 1. Gesetzliche Krankenversicherung (GKV, SGB V), 2. Soziale Pflegeversicherung (SPV, SGB XI), 3. Gesetzliche Rentenversicherung (GRV, SGB VI), 4. Arbeitslosenversicherung (ALV, SGB III) und 5. Gesetzliche Unfallversicherung (GUV, SGB VII). Die ersten vier Säulen werden paritätisch zu je 50% von Arbeitnehmer und Arbeitgeber finanziert. Die Gesetzliche Unfallversicherung (Träger: Berufsgenossenschaften wie die BG ETEM) wird zu 100% allein vom Arbeitgeber bezahlt.',
    keywords: ['Solidaritätsprinzip', '5 Säulen (KV, PV, RV, AV, UV)', 'Paritätische Finanzierung (50/50)', 'Berufsgenossenschaft (100% AG-Beitrag)', 'Beitragsbemessungsgrenze', 'Wege- & Arbeitsunfälle'],
    practicalExample: {
      context: 'Ein Mediengestalter stürzt auf dem direkten Weg von seiner Wohnung zur Agentur mit dem Fahrrad und bricht sich das Handgelenk.',
      application: 'Es liegt ein versicherter Wegeunfall vor. Die Kosten für Krankenhaus, Operation, Reha und Verletztengeld übernimmt die Berufsgenossenschaft (Gesetzliche Unfallversicherung), nicht die gesetzliche Krankenkasse.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die fünf Zweige der gesetzlichen Sozialversicherung in Deutschland. Geben Sie für jeden Zweig an, wer die Beiträge bezahlt (Arbeitnehmer, Arbeitgeber oder beide gemeinsam) und nennen Sie den Träger der Gesetzlichen Unfallversicherung.',
      points: 6,
      sampleAnswer: '1. Krankenversicherung: AG und AN paritätisch (je 50% zzgl. Zusatzbeitrag). 2. Pflegeversicherung: AG und AN paritätisch (je 50% zzgl. Kinderlosenzuschlag AN). 3. Rentenversicherung: AG und AN paritätisch (je 50%). 4. Arbeitslosenversicherung: AG und AN paritätisch (je 50%). 5. Unfallversicherung: 100% allein durch den Arbeitgeber finanziert. Träger der Unfallversicherung: Berufsgenossenschaften (bzw. Unfallkassen der öffentlichen Hand).',
      scoringCriteria: [
        '5 Punkte für die korrekte Benennung aller fünf Säulen inklusive Finanzierungsverteilung',
        '1 Punkt für die Nennung der Berufsgenossenschaft als Träger'
      ]
    },
    examinerWarning: 'Die beliebteste IHK-Prüfungsfalle: Bei der Finanzierung der Gesetzlichen Unfallversicherung kreuzen unzählige Prüflinge "50% AG / 50% AN" an. Falsch! Die Unfallversicherung wird ausnahmslos zu 100% vom Arbeitgeber getragen!',
    relatedModuleId: 'wiso-2',
    relatedModuleName: 'Sozialversicherung, Gehaltsabrechnung & Markt'
  },
  'entgeltabrechnung (brutto vs. netto)': {
    definition: 'Die Entgeltabrechnung ermittelt ausgehend vom Bruttoentgelt das tatsächlich ausgezahlte Nettoentgelt. Gesetzliche Abzüge gliedern sich in: 1. Steuern (Lohnsteuer nach Steuerklasse 1 bis 6, Solidaritätszuschlag bei Überschreiten der Freigrenzen, Kirchensteuer je nach Konfession). 2. Arbeitnehmeranteile zur Sozialversicherung (KV, PV, RV, AV bis zur Beitragsbemessungsgrenze). Schema: Bruttogehalt - Lohnsteuer - Kirchensteuer/Soli - AN-Sozialabgaben = Nettogehalt. Das Nettogehalt abzüglich vermögenswirksamer Leistungen (AN-Anteil) ergibt den Auszahlungsbetrag.',
    keywords: ['Bruttoentgelt', 'Lohnsteuerklassen I-VI', 'Solidaritätszuschlag', 'Arbeitnehmeranteile KV/PV/RV/AV', 'Nettogehalt / Überweisungsbetrag', 'Beitragsbemessungsgrenze'],
    practicalExample: {
      context: 'Ein Mediengestalter erhält ein Bruttogehalt von 3.000 €. Auf seinem Kontoauszug erscheinen jedoch nur 2.015 €.',
      application: 'Die Differenz von 985 € ergibt sich aus den gesetzlichen Pflichtabzügen: ca. 360 € Lohnsteuer (Steuerklasse I) und ca. 625 € Arbeitnehmer-Sozialversicherungsbeiträge (KV, PV, RV, AV).'
    },
    examQuestion: {
      questionText: 'Erläutern Sie den Unterschied zwischen Bruttoentgelt, Nettoentgelt und dem tatsächlichen Auszahlungsbetrag anhand des Abrechnungsschemas.',
      points: 4,
      sampleAnswer: '1. Bruttoentgelt: Das vertraglich vereinbarte Gesamteinkommen vor Abzug von Steuern und Sozialabgaben. 2. Nettoentgelt: Das Bruttoentgelt abzüglich Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und den Arbeitnehmeranteilen zur Sozialversicherung (KV, PV, RV, AV). 3. Auszahlungsbetrag: Der tatsächlich überwiesene Betrag, bereinigt um persönliche vermögenswirksame Leistungen (VL), Vorschüsse oder Sachbezüge.',
      scoringCriteria: [
        '2 Punkte für die präzise Definition von Brutto- und Nettoentgelt mit Abzugsposten',
        '2 Punkte für die Abgrenzung des Nettoentgelts zum Auszahlungsbetrag'
      ]
    },
    examinerWarning: 'Achte auf die korrekte Berechnungsreihenfolge: Die Lohnsteuer wird immer auf Basis des steuerpflichtigen Bruttoentgelts berechnet, nicht erst nach Abzug der Sozialversicherungsbeiträge!',
    relatedModuleId: 'wiso-2',
    relatedModuleName: 'Sozialversicherung, Gehaltsabrechnung & Markt'
  },
  'betriebliche mitbestimmung (betrvg)': {
    definition: 'Das Betriebsverfassungsgesetz (BetrVG) regelt die innerbetriebliche Mitbestimmung der Beschäftigten. In Betrieben mit mindestens fünf ständig wahlberechtigten Arbeitnehmern (ab 18 Jahren), von denen drei wählbar sind (mind. 6 Monate Betriebszugehörigkeit), kann ein Betriebsrat gewählt werden (§ 1 BetrVG). Die stärkste Befugnis ist die echte Mitbestimmung nach § 87 BetrVG (z.B. Beginn und Ende der täglichen Arbeitszeit, Pausen, Anordnung von Überstunden, Urlaubsgrundsätze, technische Überwachungseinrichtungen). Eine Jugend- und Auszubildendenvertretung (JAV) kann gewählt werden, wenn mindestens fünf Arbeitnehmer unter 18 Jahren oder Auszubildende unter 25 Jahren beschäftigt sind (§ 60 BetrVG).',
    keywords: ['BetrVG § 1 (mind. 5 wahlberechtigte AN)', 'Echte Mitbestimmung (§ 87 BetrVG)', 'Überstunden & Arbeitszeitregelungen', 'Betriebsvereinbarung', 'JAV (§ 60 BetrVG)', 'Einigungsstelle'],
    practicalExample: {
      context: 'Die Geschäftsführung installiert heimlich Kameras und eine Software, die jeden Tastenanschlag und Bildschirm der Mediengestalter aufzeichnet.',
      application: 'Dies ist nach § 87 Abs. 1 Nr. 6 BetrVG (Einführung technischer Einrichtungen zur Überwachung von Verhalten oder Leistung) zwingend mitbestimmungspflichtig. Ohne vorherige Betriebsvereinbarung mit dem Betriebsrat ist der Einsatz rechtswidrig.'
    },
    examQuestion: {
      questionText: 'Nennen Sie zwei Voraussetzungen für das Entstehen eines Betriebsrats nach § 1 BetrVG und nennen Sie zwei Bereiche, in denen der Betriebsrat ein zwingendes Mitbestimmungsrecht nach § 87 BetrVG besitzt.',
      points: 4,
      sampleAnswer: 'Voraussetzungen: 1. Mindestens fünf ständig wahlberechtigte Arbeitnehmer (mind. 18 Jahre alt). 2. Mindestens drei von ihnen müssen wählbar sein (mind. 6 Monate Betriebszugehörigkeit). Mitbestimmungsbereiche (§ 87 BetrVG): z.B. 1. Beginn und Ende der täglichen Arbeitszeit einschließlich der Pausen. 2. Vorübergehende Verkürzung oder Verlängerung der betriebsüblichen Arbeitszeit (Überstunden). (Alternativen: Urlaubsplan, Einführung von Überwachungssoftware).',
      scoringCriteria: [
        '2 Punkte für die beiden Wahlvoraussetzungen nach § 1 BetrVG',
        '2 Punkte für zwei korrekt genannte Mitbestimmungstatbestände nach § 87 BetrVG'
      ]
    },
    examinerWarning: 'Wichtig: Ein Betriebsrat ist ein Recht der Belegschaft, aber KEINE Pflicht. Der Arbeitgeber muss keinen Betriebsrat gründen, darf aber dessen Wahl in keiner Weise behindern oder beeinflussen (§ 20 BetrVG).',
    relatedModuleId: 'wiso-3',
    relatedModuleName: 'Betriebsrat, Mitbestimmung & Unternehmensformen'
  },
  'unternehmens- & rechtsformen': {
    definition: 'Die Rechtsform bestimmt Haftung, Mindestkapital, Geschäftsführung und Vertretung eines Unternehmens. Hauptformen: 1. Einzelunternehmen (1 Inhaber, volle unbeschränkte persönliche Haftung mit Betriebs- und Privatvermögen, kein Mindestkapital). 2. Personengesellschaften (z.B. OHG: alle Gesellschafter haften unbeschränkt, unmittelbar und solidarisch; KG: Komplementär haftet voll und unbeschränkt, Kommanditist haftet nur beschränkt bis zur Höhe seiner im Handelsregister eingetragenen Einlage). 3. Kapitalgesellschaften (z.B. GmbH: Mindeststammkapital 25.000 €, Haftung auf das Gesellschaftsvermögen beschränkt; AG: Mindestgrundkapital 50.000 €, Organe: Vorstand, Aufsichtsrat, Hauptversammlung).',
    keywords: ['Einzelunternehmen (Vollhaftung)', 'OHG (solidarische Vollhaftung)', 'KG (Komplementär vs. Kommanditist)', 'GmbH (mind. 25.000 € Stammkapital)', 'AG (mind. 50.000 € Grundkapital)', 'Handelsregister (Abteilung A und B)'],
    practicalExample: {
      context: 'Drei Mediengestalter möchten eine Agentur gründen, haben jedoch Angst, bei Schadensersatzforderungen oder Insolvenz ihr privates Vermögen zu verlieren.',
      application: 'Sie entscheiden sich für eine GmbH. Mit Aufbringung des gesetzlichen Mindeststammkapitals von 25.000 € ist die Haftung für Verbindlichkeiten auf das Gesellschaftsvermögen beschränkt; das private Vermögen der Gesellschafter bleibt geschützt.'
    },
    examQuestion: {
      questionText: 'Vergleichen Sie eine Offene Handelsgesellschaft (OHG) und eine Gesellschaft mit beschränkter Haftung (GmbH) hinsichtlich des gesetzlichen Mindestkapitals und des Haftungsumfangs der Gesellschafter.',
      points: 4,
      sampleAnswer: '1. Mindestkapital: Die OHG benötigt kein gesetzlich vorgeschriebenes Mindestkapital; bei der GmbH beträgt das Mindeststammkapital 25.000 €. 2. Haftung: Die Gesellschafter der OHG haften persönlich, unbeschränkt, unmittelbar und solidarisch (gesamtschuldnerisch) mit ihrem Geschäfts- und Privatvermögen; bei der GmbH haftet ausschließlich die Gesellschaft mit ihrem Gesellschaftsvermögen.',
      scoringCriteria: [
        '2 Punkte für die Gegenüberstellung des Mindestkapitals (0 € vs. 25.000 €)',
        '2 Punkte für die Unterscheidung der persönlichen Vollhaftung vs. beschränkte Gesellschaftshaftung'
      ]
    },
    examinerWarning: 'Sehr beliebte Frage: "Welcher Gesellschafter der KG haftet voll?" Merke dir die Eselsbrücke: Der KompleMENTÄR haftet KOMPLETT (unbeschränkt mit Privatvermögen), der KommanDITIST haftet nur mit seiner Distanz-Einlage!',
    relatedModuleId: 'wiso-3',
    relatedModuleName: 'Betriebsrat, Mitbestimmung & Unternehmensformen'
  },
  'kaufvertrag & störungen': {
    definition: 'Ein Kaufvertrag kommt durch zwei übereinstimmende Willenserklärungen zustande: Antrag (Angebot) und Annahme (§§ 145 ff. BGB). Bei Pflichtverletzungen spricht man von Vertragsstörungen: 1. Schlechtleistung (Sach- oder Rechtsmangel nach § 434 BGB). Bei Vorliegen eines Mangels gilt zwingend der Vorrang der Nacherfüllung (§ 439 BGB: Käufer kann Nachbesserung/Reparatur oder Nachlieferung verlangen). Erst nach erfolglosem Ablauf einer angemessenen Frist greifen die nachrangigen Rechte: Rücktritt vom Vertrag (§ 440 BGB), Minderung des Kaufpreises (§ 441 BGB) oder Schadensersatz (§ 437 Nr. 3 BGB). Weitere Vertragsstörungen sind Lieferungsverzug, Zahlungsverzug und Annahmeverzug.',
    keywords: ['Antrag & Annahme (§§ 145 ff. BGB)', 'Sachmangel (§ 434 BGB)', 'Vorrang der Nacherfüllung (§ 439 BGB)', 'Recht der zweiten Andienung', 'Rücktritt & Minderung', 'Schadensersatz statt der Leistung'],
    practicalExample: {
      context: 'Eine Digitalagentur kauft fünf High-End Monitore. Bei der Lieferung stellt sich heraus, dass zwei Bildschirme Pixelfehler und Streifen aufweisen.',
      application: 'Es liegt ein Sachmangel vor. Die Agentur darf nicht sofort das Geld zurückverlangen oder die Rechnung kürzen, sondern muss dem Verkäufer im Rahmen der Nacherfüllung (§ 439 BGB) eine Frist zur Reparatur oder Ersatzlieferung setzen.'
    },
    examQuestion: {
      questionText: 'Ein Werbestudio kauft drei neue Grafiktabletts. Bei Inbetriebnahme erweist sich ein Gerät als defekt. Erläutern Sie, welche vorrangigen Rechte dem Käufer zustehen und unter welcher Bedingung er nachrangige Rechte wie Rücktritt oder Minderung geltend machen darf.',
      points: 4,
      sampleAnswer: '1. Vorrangiges Recht: Anspruch auf Nacherfüllung nach § 439 BGB, wahlweise durch Mangelbeseitigung (Reparatur) oder Lieferung einer neuen, mangelfreien Sache (Ersatzlieferung). 2. Bedingung für nachrangige Rechte: Der Käufer darf erst vom Vertrag zurücktreten (§ 440 BGB) oder den Kaufpreis mindern (§ 441 BGB), wenn er dem Verkäufer eine angemessene Frist zur Nacherfüllung gesetzt hat und diese erfolglos verstrichen ist (oder die Nacherfüllung zweimal fehlschlug / verweigert wurde).',
      scoringCriteria: [
        '2 Punkte für die Nennung der Nacherfüllung (Reparatur oder Neulieferung) als Primäranspruch',
        '2 Punkte für die korrekte Bedingung (erfolgloser Ablauf einer angemessenen Nachfrist)'
      ]
    },
    examinerWarning: 'Typische IHK-Falle: Prüflinge schreiben bei Defekten sofort "Kaufpreis zurückfordern" (Rücktritt). Das Gesetz gewährt dem Verkäufer jedoch das "Recht der zweiten Andienung". Ohne Nacherfüllungsverlangen ist ein Rücktritt unwirksam!',
    relatedModuleId: 'wiso-4',
    relatedModuleName: 'Vertragsrecht, Verbraucherschutz & Wirtschaftskreislauf'
  },

  // === KAPITEL 8: CROSSMEDIA & MEDIENNEUTRALITÄT ===
  'layout- vs. strukturbasiert': {
    definition: 'Im layoutbasierten Workflow (Desktop Publishing / Print-First) wird Content direkt in feste Layoutrahmen platziert (z. B. InDesign-Dokument). Änderungen erfordern manuellen Satzaufwand in jedem Kanal. Im strukturbasierten Workflow (Single Source Publishing) werden Inhalte medienneutral und rein semantisch (z.B. in XML oder Markdown) erfasst. Die Formatierung erfolgt automatisch über Templates und Stylesheets je nach Zielmedium (Print, Web, Mobile App).',
    keywords: ['Layoutbasiert (Print-First)', 'Strukturbasiert (Single Source)', 'Medienneutralität', 'Inhalt-Layout-Trennung', 'Multi-Channel Publishing'],
    practicalExample: {
      context: 'Ein Modehändler bringt vierteljährlich einen Print-Katalog und gleichzeitig einen aktualisierten Webshop heraus. Bisher tippen Layouter alle Produktpreise manuell in InDesign ab.',
      application: 'Durch die Umstellung auf einen strukturbasierten Workflow mit zentralem PIM-System (XML-Export) fließen Texte, Bilder und Preise automatisch in InDesign per EasyCatalog und zeitgleich per API in den Shopify-Webshop.'
    },
    examQuestion: {
      questionText: 'Stellen Sie den layoutbasierten und den strukturbasierten Workflow im Rahmen der medienneutralen Publikation gegenüber. Nennen Sie zwei entscheidende Vorteile des strukturbasierten Workflows.',
      points: 6,
      sampleAnswer: '1. Layoutbasiert: Text und Layout sind fest miteinander verschmolzen (z. B. InDesign-Datei). Medienwechsel bedeutet Neugestaltung. 2. Strukturbasiert: Strikte Trennung von Inhalt (Datenhaltung) und Form (Templates). Vorteile: a) Effizienzgewinn & Vermeidung von Redundanzen (Single Source of Truth), b) Kanalunabhängige automatisierte Ausspielung für Print, Web und mobile Endgeräte.',
      scoringCriteria: [
        '2 Punkte für die präzise Gegenüberstellung beider Workflow-Konzepte',
        '2 Punkte für den ersten Vorteil (Single Source of Truth / Fehlerreduktion)',
        '2 Punkte für den zweiten Vorteil (automatisierte Mehrkanal-Ausspielung)'
      ]
    },
    examinerWarning: 'IHK-Prüfer achten penibel auf das Grundprinzip: "Trennung von Inhalt und Form". Wer dieses Schlagwort vergisst, verschenkt wertvolle Kernpunkte.',
    relatedModuleId: 'cross-1',
    relatedModuleName: 'Medienneutrale Workflows & Workflows-Konzepte'
  },
  'xml- wohlgeformtheit': {
    definition: 'Ein XML-Dokument ist syntaktisch wohlgeformt (well-formed), wenn es 4 unverhandelbare Grundregeln erfüllt: 1. Genau ein einziges Wurzelelement (Root-Element) umschließt den gesamten Inhalt. 2. Jedes Start-Tag besitzt ein exakt passendes End-Tag (oder ist Empty-Tag <tag/>). 3. Elemente sind hierarchisch sauber geschachtelt (keine Überkreuzungen wie <a><b></a></b>). 4. XML beachtet strikte Case-Sensitivity (Groß-/Kleinschreibung muss übereinstimmen: <Titel> ≠ </titel>).',
    keywords: ['Wurzelelement (Root)', 'End-Tags', 'Saubere Schachtelung', 'Case-Sensitivity', 'Well-formed XML'],
    practicalExample: {
      context: 'Ein Auszubildender übergibt eine Produktliste im XML-Format. Der Parser bricht sofort mit einem Fatal Error ab.',
      application: 'Die Fehlersuche deckt auf: Ein schließendes Tag wurde als </item> geschrieben, das öffnende war <Item>. Nach Korrektur der Case-Sensitivity ist die Wohlgeformtheit hergestellt und der Parser lädt die Daten fehlerfrei.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die vier formalen Bedingungen, die ein XML-Dokument zwingend erfüllen muss, um als „wohlgeformt“ (well-formed) anerkannt zu werden.',
      points: 4,
      sampleAnswer: '1. Genau ein Root-Element (Wurzel-Tag). 2. Alle Tags müssen korrekt geschlossen werden. 3. Korrekte hierarchische Verschachtelung ohne Überschneidung. 4. Strikte Beachtung der Groß- und Kleinschreibung (Case-Sensitivity) aller Bezeichner.',
      scoringCriteria: [
        'Je 1 Punkt pro korrekt genannter Wohlgeformtheits-Bedingung (max. 4 Punkte)'
      ]
    },
    examinerWarning: 'Achtung Unterschied: Wohlgeformt (Well-formed) bedeutet nur syntaktisch fehlerfrei lesbar. Gültig (Valid) bedeutet, dass das Dokument zusätzlich gegen ein Regelwerk (DTD oder XML-Schema/XSD) geprüft und freigegeben wurde!',
    relatedModuleId: 'cross-2',
    relatedModuleName: 'XML Grundlagen & Wohlgeformtheit'
  },

  // === KAPITEL 9: DIGITALE BILD- & GRAFIKDATEN ===
  'vektor vs. pixel': {
    definition: 'Pixelgrafiken (Rasterdaten, z. B. JPG, PNG, WebP) bestehen aus einem festen Raster einzelner quadratischer Farbpunkte (Pixel). Sie besitzen eine feste physikalische Auflösung und zeigen beim Skalieren Treppeneffekte (Pixelation). Vektorgrafiken (z. B. SVG, EPS, AI) bestehen aus mathematischen Formeln, Pfaden, Ankerpunkten und Bézier-Kurven. Sie sind auflösungsunabhängig, beliebig ohne Qualitätsverlust skalierbar und weisen bei geometrischen Formen winzige Dateigrößen auf.',
    keywords: ['Rastergrafik / Pixel', 'Vektorgrafik (Mathematische Pfade)', 'Bézier-Kurven', 'Auflösungsunabhängig', 'Treppeneffekt / Artefakte'],
    practicalExample: {
      context: 'Ein Firmenlogo liegt als 300x150 Pixel PNG-Datei vor und soll für ein 4x2 Meter großes Messebanner gedruckt werden.',
      application: 'Wird das Pixelbild auf 4 Meter vergrößert, sinkt die effektive Druckauflösung auf unter 2 ppi (extreme Unschärfe und Riesenpixel). Die Grafik muss zwingend als SVG bzw. EPS als echte Vektorgrafik neu gesetzt oder nachgezeichnet werden.'
    },
    examQuestion: {
      questionText: 'Vergleichen Sie Pixel- und Vektorgrafiken anhand von Skalierbarkeit, typischem Einsatzzweck und je zwei standardisierten Dateiformaten.',
      points: 6,
      sampleAnswer: '1. Skalierbarkeit: Vektoren sind unbegrenzt verlustfrei skalierbar; Pixel verlieren beim Vergrößern Schärfe und verpixeln. 2. Einsatzzweck: Vektoren für Logos, Icons und Schriften; Pixel für detailreiche Fotos und komplexe Farbverläufe. 3. Formate: Vektor = SVG, EPS; Pixel = WebP, JPG, PNG.',
      scoringCriteria: [
        '2 Punkte für die präzise Skalierbarkeits-Erklärung',
        '2 Punkte für die Abgrenzung der Einsatzzwecke (Fotos vs. Logos)',
        '2 Punkte für je zwei korrekte Formate'
      ]
    },
    examinerWarning: 'Sehr häufige IHK-Falle: "SVG ist ein Bildformat für Fotos". Falsch! Vektoren können keine fotorealistischen Bilddaten mit Millionen Einzelnuancen wirtschaftlich abbilden!',
    relatedModuleId: 'gfx-1',
    relatedModuleName: 'Pixel vs. Vektor (SVG & WebP)'
  },
  'rgb vs. cmyk': {
    definition: 'RGB (Rot, Grün, Blau) ist ein additives Farbmodell für Selbstleuchter (Monitore, Displays, Beamer). Überlagerung aller drei Farben mit voller Intensität ergibt Weiß (Lichtfarben). CMYK (Cyan, Magenta, Yellow, blacK/Key) ist ein subtraktives Farbmodell für Körperfarben im Vierfarbdruck. Druckfarben absorbieren Lichtwellen; Überlagerung ergibt theoretisch Schwarz (in der Praxis Dunkelbraun, daher K/Key-Schwarz als vierte Druckfarbe). Der RGB-Farbraum (insbes. AdobeRGB/sRGB) ist deutlich größer als der druckbare CMYK-Farbraum (z. B. ISO Coated v2).',
    keywords: ['Additives Farbmodell (RGB)', 'Subtraktives Farbmodell (CMYK)', 'Körperfarben vs. Lichtfarben', 'Gamut / Farbraumumfang', 'ISO Coated v2'],
    practicalExample: {
      context: 'Ein Kunde liefert ein Plakat mit grell leuchtendem Neongrün in sRGB. Nach dem Offsetdruck beschwert er sich, dass das Grün stumpf und erdig aussieht.',
      application: 'Erklärung des Farbraumunterschieds: Die Neonfarbe liegt außerhalb des CMYK-Druckfarbraums (Gamut). Zur Vermeidung solcher Überraschungen muss vor Drucklegung ein Farb-Softproof mit CMYK-Profil simuliert werden oder eine Sonderfarbe (z. B. Pantone) gewählt werden.'
    },
    examQuestion: {
      questionText: 'Erklären Sie den Unterschied zwischen additiver und subtraktiver Farbmischung unter Nennung der Primärfarben, der Mischwirkung und des primären Anwendungsbereichs.',
      points: 6,
      sampleAnswer: '1. Additive Mischung: Primärfarben Rot, Grün, Blau (RGB). Mischung von Lichtfarben: Addition ergibt Weiß. Einsatz: Bildschirme, Video, Web. 2. Subtraktive Mischung: Primärfarben Cyan, Magenta, Gelb plus Schwarz (CMYK). Mischung von Druckpigmenten: Licht wird absorbiert (subtrahiert), Mischung aller Farben ergibt Schwarz. Einsatz: Vierfarb-Offsetdruck und Digitaldruck.',
      scoringCriteria: [
        '3 Punkte für die additive Mischung (RGB, Licht, Weiß, Monitor)',
        '3 Punkte für die subtraktive Mischung (CMYK, Pigment, Schwarz, Druck)'
      ]
    },
    examinerWarning: 'Wichtig für IHK-Punkte: Bei CMYK stets das "K" als Key-Color (Schwarz zur Kontrast- und Tiefensteigung) begründen können!',
    relatedModuleId: 'gfx-3',
    relatedModuleName: 'RGB vs. CMYK & medienneutrale Farbräume'
  },

  // === KAPITEL 11: IHK ORIGINAL-PRÜFUNG TEIL 1 ===
  'aufgabe 7: farbmanagement & zeitungsdruck': {
    definition: 'Im Zeitungsdruck (z. B. ICC-Profil ISOnewspaper26v4) muss der maximale Gesamtfarbauftrag (TAC / Gesamtfarbdeckung) strikt auf max. 240% begrenzt werden. Grund: Das poröse, ungestrichene Zeitungspapier besitzt eine hohe Saugfähigkeit und geringe Grammatur (ca. 45 g/m²). Zu hoher Farbauftrag (z. B. 300% aus ISO Coated v2) führt zum Durchschlagen der Farbe auf die Rückseite, extremem Schmieren und Makulatur bei hoher Rotationsgeschwindigkeit.',
    keywords: ['ISOnewspaper26v4 (max. 240% TAC)', 'ISO Coated v2 (300% TAC)', 'Papier-Saugfähigkeit', 'Farbablegen / Durchschlagen', 'Rotationsdruck'],
    practicalExample: {
      context: 'Eine Werbeagentur schickt eine Bildanzeige, die zuvor in einem Hochglanzmagazin (ISO Coated v2) gedruckt wurde, 1:1 an die Lokalzeitung.',
      application: 'Die Druckerei stoppt den Druck: Die Anzeige hat 310% Gesamtfarbauftrag. Das Motiv muss in Photoshop mit dem Profil "ISOnewspaper26v4" konvertiert werden, wodurch der Schwarzaufbau (GCR) verstärkt und Buntfarben reduziert werden, um die 240%-Grenze exakt einzuhalten.'
    },
    examQuestion: {
      questionText: 'Begründen Sie, warum für den Zeitungsdruck ein maximaler Gesamtfarbauftrag von 240% vorgeschrieben ist, während im Bogenoffset auf Bilderdruckpapier bis zu 300% zulässig sind.',
      points: 4,
      sampleAnswer: 'Zeitungspapier ist ein sehr saugfähiges, ungestrichenes Papier mit geringem Flächengewicht. Bei mehr als 240% Farbauftrag saugt das Papier zu viel Farbe auf: Die Farbe schlägt auf die Rückseite durch, trocknet bei schneller Rollenrotation nicht rechtzeitig und führt zu Farbablegen und Verwischen.',
      scoringCriteria: [
        '2 Punkte für die Papierbeschaffenheit (ungestrichen, saugfähig, dünn)',
        '2 Punkte für die technischen Druckfolgen (Durchschlagen, Trocknungsproblem, Schmieren)'
      ]
    },
    examinerWarning: 'Original-Prüfungsaufgabe 7! Prüfer verlangen stets die Begründung über die Papiereigenschaften (Saugfähigkeit, Durchschlagen) und die Trocknungszeit.',
    relatedModuleId: 'ihk-orig-7',
    relatedModuleName: 'Aufgabe 7: Farbmanagement & Zeitungsdruck'
  },
  'aufgabe 9: effektiv-ppi & rechenweg': {
    definition: 'Die effektive Bildauflösung (ppi = Pixel per Inch) berechnet sich nach der Formel: Effektiv-PPI = Pixelanzahl / (Druckbreite in cm / 2,54). Für hochwertige Printprodukte im 60er- bzw. 70er-Raster gilt der Standard: 300 ppi gefordert (Qualitätsfaktor QF = 2 bei 150 lpi). Liegt ein Bild mit 1800 Pixel Breite vor und soll 18 cm breit gedruckt werden, beträgt die effektive Auflösung 1800 / (18 / 2,54) = 254 ppi. Dies liegt unter den geforderten 300 ppi. Die maximal zulässige Druckbreite bei 300 ppi errechnet sich als: 1800 px / 300 ppi * 2,54 = 15,24 cm.',
    keywords: ['1 Zoll = 2,54 cm', 'Formel: Pixel / (cm / 2,54)', 'Gefordert: 300 ppi', 'Max. Druckbreite = (Pixel / 300) * 2,54', 'Qualitätsfaktor QF = 2'],
    practicalExample: {
      context: 'Ein Kunde liefert ein Foto mit 2400 x 1600 Pixeln und verlangt einen doppelseitigen Druck mit 40 cm Breite.',
      application: 'Rechnung: 2400 / (40 / 2,54) = 152 ppi. Da 152 ppi weit unter 300 ppi liegt, wird das Bild im Druck pixelig wirken. Der Kunde muss schriftlich auf den Qualitätsmangel hingewiesen werden.'
    },
    examQuestion: {
      questionText: 'Ein digitales Bild hat eine Breite von 1800 Pixeln. Es soll im Offsetdruck mit einer Breite von 18 cm ausgegeben werden. Berechnen Sie die effektive Auflösung in ppi und ermitteln Sie die maximale Breite in cm, bei der die Qualitätsforderung von 300 ppi noch erfüllt wird (1 Inch = 2,54 cm).',
      points: 6,
      sampleAnswer: '1. Effektive Auflösung: 18 cm / 2,54 = 7,0866 Inch. 1800 px / 7,0866 Inch = 254 ppi (Anforderung von 300 ppi nicht erfüllt). 2. Maximale Druckbreite bei 300 ppi: 1800 px / 300 ppi = 6 Inch. 6 Inch * 2,54 cm/Inch = 15,24 cm.',
      scoringCriteria: [
        '3 Punkte für die korrekte Berechnung der 254 ppi inklusive Formelansatz',
        '3 Punkte für die korrekte Ermittlung der maximalen Druckbreite von 15,24 cm'
      ]
    },
    examinerWarning: 'Original-Prüfungsaufgabe 9: Achte exakt auf die Umrechnung 2,54 cm pro Zoll. Viele Prüflinge runden zu früh auf 2,5 cm, was zu Punktabzug führt!',
    relatedModuleId: 'ihk-orig-9',
    relatedModuleName: 'Aufgabe 9: Auflösungsberechnung & Effektiv-PPI'
  },
  'aufgabe 11: gradationskurve (tunnel)': {
    definition: 'Bei einem unterbelichteten Tunnel-Innenraum (Schatten zulaufend, Scheinwerfer und Sonnenlicht am Ausgang extrem hell) muss die Gradationskurve gezielt s-förmig bzw. im Dreivierteltonbereich angehoben werden: 1. Fixieren der Lichter im oberen Quadranten (ca. 90-100%), um das Ausfressen der Tunneleinfahrt zu verhindern. 2. Anheben der Tonwerte im Schatten- und Mitteltönungsbereich (ca. 25-45%), um Details im Fahrbahnbelag und an der Tunnelwand sichtbar zu machen, ohne Bildrauschen übermäßig zu verstärken.',
    keywords: ['Gradationskurve', 'Schattenaufhellung', 'Lichterfixierung', 'Ausfressen verhindern', 'Tonwertspreizung'],
    practicalExample: {
      context: 'Für ein Tourismusmagazin wird das Foto einer Tropfsteinhöhle mit Gegenlicht eingereicht. Die Höhlenwände sind komplett schwarz.',
      application: 'Anstatt die Gesamtbelichtung hochzuziehen (wodurch die Lichtscheinwerfer ausbleichen), wird die Gradationskurve verwendet: Kontrollpunkte fixieren das Licht, während die dunklen Höhlenwände gezielt um 30% aufgehellt werden.'
    },
    examQuestion: {
      questionText: 'Beschreiben Sie anhand des IHK-Prüfungsbeispiels (Tunnel mit Gegenlicht am Ausgang), wie eine Gradationskurve in Photoshop angepasst werden muss, um Zeichnung in den Schatten zu gewinnen, ohne die Lichter zu zerstören.',
      points: 5,
      sampleAnswer: '1. Lichterpunkt im oberen Bereich fixieren, damit die Tunneleinfahrt nicht ausfrisst. 2. Kurve im Bereich der Tiefen/Schatten (unteres Drittel bis Mitte) nach oben biegen, um die dunklen Tunnelwände und Fahrbahndetails aufzuhellen. 3. Schwarzpunkt so wählen, dass Kontrast erhalten bleibt und kein Grauschleier entsteht.',
      scoringCriteria: [
        '2 Punkte für die Fixierung der Lichter im oberen Bereich',
        '2 Punkte für die gezielte Schattenaufhellung im unteren Bereich',
        '1 Punkt für die Vermeidung von Kontrastverlust/Grauschleier'
      ]
    },
    examinerWarning: 'Original-Prüfungsaufgabe 11! IHK-Prüfer verlangen explizit zwei Schritte: Lichter fixieren und Schatten differenziert anheben!',
    relatedModuleId: 'ihk-orig-11',
    relatedModuleName: 'Aufgabe 11: Bildoptimierung & Gradationskurve'
  },

  // === KAPITEL 12: PROJEKTPHASEN & PROJEKTMANAGEMENT ===
  'die 7 konstitutiven projektmerkmale': {
    definition: 'Nach DIN 69901 und IHK-Prüfungsstandard ist ein Projekt ein Vorhaben, das durch die Gesamtheit von 7 konstitutiven Merkmalen gekennzeichnet ist: 1. Vorgegebenes Ziel (klar definierter Soll-Zustand). 2. Neuartigkeit (Aufgaben, die in dieser Form noch nicht durchgeführt wurden). 3. Einmaligkeit (singuläre Durchführung). 4. Komplexität (Vielzahl vernetzter Teilaufgaben und anfängliche Unklarheiten). 5. Zeitliche Begrenzung (fester Anfangs- und/oder Endzeitpunkt). 6. Begrenzte Ressourcen (Mitarbeiter, Budget, Technik/Material). 7. Risiko & Unsicherheit (Abhängigkeiten und Planungsänderungen).',
    keywords: ['DIN 69901', '7 Projektmerkmale', 'Vorgegebenes Ziel', 'Neuartigkeit', 'Einmaligkeit', 'Komplexität', 'Zeitliche Begrenzung', 'Begrenzte Ressourcen', 'Inhärentes Risiko'],
    practicalExample: {
      context: 'Ein Auszubildender soll im Prüfungsgespräch darlegen, warum die Neuentwicklung eines Printmagazins als Projekt gilt, der monatliche Druck jedoch nicht.',
      application: 'Die Erstentwicklung des Magazins erfüllt alle 7 Kriterien (neues Layoutkonzept, Redaktionsaufbau, einmalig, Deadline, Budget, Risiko). Der monatliche Nachdruck ist eine zyklische Routineaufgabe nach festem Schema.'
    },
    examQuestion: {
      questionText: 'Nennen Sie fünf der sieben konstitutiven Merkmale eines Projekts nach DIN 69901 und erläutern Sie zwei davon an einem medientechnischen Beispiel.',
      points: 7,
      sampleAnswer: '1. Nennung: Vorgegebenes Ziel, Neuartigkeit, Einmaligkeit, zeitliche Begrenzung, begrenzte Ressourcen (oder Komplexität, Risiko). 2. Erläuterung Einmaligkeit: Entwicklung eines neuen Falz-Standbogens für eine Produktverpackung wird nur ein einziges Mal konstruiert. 3. Erläuterung begrenzte Ressourcen: Für die Kampagne stehen maximal 3 Mediengestalter und 15.000 € Budget zur Verfügung.',
      scoringCriteria: [
        '5 Punkte für die Nennung von 5 Merkmalen (je 1 Punkt)',
        '2 Punkte für die präzise Erläuterung an medientechnischen Praxisbeispielen'
      ]
    },
    examinerWarning: 'Sehr beliebte IHK-Einstiegsfrage! Werden Routineaufgaben wie "tägliches Drucken" als Projekt deklariert, führt dies sofort zu Punktabzug. Merke: Ohne Neuartigkeit und Einmaligkeit existiert kein Projekt!',
    relatedModuleId: 'projphase-1',
    relatedModuleName: 'Seite 1: Projektmerkmale & Abgrenzung zur Routine'
  },
  'projekt vs. routineaufgabe': {
    definition: 'Die fundamentale IHK-Differenzierung: Projekte sind einmalige, neuartige, zielgerichtete und risikobehaftete Vorhaben mit klarem Endtermin (z. B. Standbogen-Entwicklung einer Sonderfalzung, Relaunch eines Webshops, Einführung einer neuen Druckmaschine). Routineaufgaben hingegen sind dauerhafte, wiederkehrende Arbeitsabläufe in festen zeitlichen Abständen nach standardisierten Schemata ohne Neuartigkeit oder Planungsrisiko (z. B. Nachdruck weiterer Flyer aus bestehender Serie, monatliche Server-Backups, tägliche Druckmaschinen-Reinigung).',
    keywords: ['Projekt (Einmalig & Neuartig)', 'Routineaufgabe (Wiederkehrend & Standard)', 'Standbogen Sonderfalzung', 'Zyklischer Nachdruck', 'Tagesgeschäft / Linienorganisation'],
    practicalExample: {
      context: 'Eine Agenturleitung fragt den Mediengestalter, welche Aufgaben in das Projektbudget gebucht werden dürfen und welche über den laufenden Pflegevertrag abgerechnet werden.',
      application: 'Die Entwicklung eines neuen interaktiven Produktkonfigurators ist ein Projekt (neue Architektur, Meilensteine, Budgetgrenze). Das monatliche Korrigieren von Produktpreisen ist eine Routineaufgabe und fällt in die laufende Betreuung.'
    },
    examQuestion: {
      questionText: 'Grenzen Sie die Begriffe "Projekt" und "Routineaufgabe" anhand von zwei Unterscheidungskriterien und jeweils einem konkreten Beispiel aus der Medienproduktion voneinander ab.',
      points: 6,
      sampleAnswer: 'Kriterium 1: Einmaligkeit vs. Wiederholung. Projekt: Entwicklung einer Stanzform für eine neue Medikamentenverpackung (einmalig). Routine: Ausstanzen von 50.000 Faltschachteln im monatlichen Turnus (wiederkehrend). Kriterium 2: Neuartigkeit/Risiko vs. Standardprozess. Projekt: Erstimplementierung eines Redaktionssystems mit Workflow-Schulung (hohes Risiko, neuartig). Routine: Wöchentliche Datensicherung des Redaktionsservers (risikolos, standardisiert).',
      scoringCriteria: [
        '2 Punkte für die theoretische Differenzierung (Kriterien)',
        '2 Punkte für das schlüssige Projekt-Beispiel',
        '2 Punkte für das schlüssige Routine-Beispiel'
      ]
    },
    examinerWarning: 'Typische Prüfungsfalle: Die Wiederholung eines bereits entwickelten Printprodukts wird fälschlicherweise als "Folge-Projekt" bezeichnet. Solange keine neuen Rahmenbedingungen oder Neuentwicklungen vorliegen, bleibt es eine Routinearbeit!',
    relatedModuleId: 'projphase-1',
    relatedModuleName: 'Seite 1: Projektmerkmale & Abgrenzung zur Routine'
  },
  'die 3 begrenzten ressourcen-arten': {
    definition: 'Jedes Projekt ist durch knappe Ressourcen begrenzt. Nach dem IHK-Standard unterteilen sich diese in 3 Hauptkategorien: 1. Projektmitarbeiter (Personalressourcen): Verfügbarkeit qualifizierter Fachkräfte (Entwickler, Designer, Projektleiter) mit spezifischen Skillsets. 2. Finanzielle Ressourcen (Projektbudget): Gedeckelte Kostenrahmen für Gehälter, Fremdleistungen, Lizenzen und Marketing. 3. Technische Ressourcen (Sachmittel & Infrastruktur): Hardware, Druck- und Weiterverarbeitungsmaschinen, Softwarelizenzen, Serverkapazitäten und Rohmaterialien (Papier, Druckfarben).',
    keywords: ['Personalressourcen (Projektmitarbeiter)', 'Finanzielle Ressourcen (Budget)', 'Technische Ressourcen (Maschinen/Material)', 'Magisches Dreieck', 'Ressourcenallokation'],
    practicalExample: {
      context: 'Zwei Wochen vor dem Drucktermin fällt die vorgesehene Druckmaschine wegen eines Zylinderschadens aus.',
      application: 'Es liegt ein Engpass bei den technischen Ressourcen vor. Die Projektleitung muss umgehend reagieren: Entweder Fremdvergabe an Partnerdruckerei (erfordert Budget-Puffer) oder Umplanung auf andere Maschinen, um den Endtermin nicht zu gefährden.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die drei Kategorien begrenzter Ressourcen in der Projektplanung und geben Sie für jede Kategorie ein konkretes Beispiel aus einer Werbeagentur an.',
      points: 6,
      sampleAnswer: '1. Projektmitarbeiter: Ein UI/UX-Designer und zwei Frontend-Entwickler für 120 Arbeitsstunden. 2. Finanzielle Ressourcen: Ein maximales Kundenbudget von 25.000 € für die Umsetzung. 3. Technische Ressourcen: Lizenzen für Figma und Test-Smartphones für das Usability-Labor.',
      scoringCriteria: [
        'Je 1 Punkt für die korrekte Kategorie (max. 3 Punkte)',
        'Je 1 Punkt für das realistische Agenturbeispiel (max. 3 Punkte)'
      ]
    },
    examinerWarning: 'IHK-Prüfer verlangen die exakte Nennung der Dreiteilung (Personal, Finanzen, Technik/Material). Allgemeine Begriffe wie "Zeit" zählen zum Terminplan, nicht zu den Sach-/Finanzressourcen!',
    relatedModuleId: 'projphase-1',
    relatedModuleName: 'Seite 1: Projektmerkmale & Abgrenzung zur Routine'
  },
  'tuckman-modell (4+1 phasen)': {
    definition: 'Das Phasenmodell der Teamentwicklung nach Bruce Tuckman (1965, 1977 um Adjourning ergänzt) beschreibt die unvermeidlichen Reifestadien einer Gruppe: 1. Forming (Orientierungsphase): Höflichkeit, Abtasten, Klärung der Orientierung. 2. Storming (Konfrontationsphase): Rollenkonflikte, Machtkämpfe, Reibung. 3. Norming (Organisationsphase): Etablierung verbindlicher Spielregeln und Wir-Gefühl. 4. Performing (Hochleistungsphase): Autonomes, hocheffizientes Arbeiten mit blindem Vertrauen. 5. Adjourning / Mourning (Auflösungsphase): Projektabschluss, Trennung und Reflexion. Kernbotschaft: Teamentwicklung ist nicht linear anordnenbar, sondern erfordert situative Führung je Phase.',
    keywords: ['Bruce Tuckman (1965/1977)', 'Forming (Orientierung)', 'Storming (Konfrontation)', 'Norming (Organisation)', 'Performing (Leistung)', 'Adjourning (Auflösung)', 'Situative Führung'],
    practicalExample: {
      context: 'In einem Redaktionsprojekt wundert sich der Abteilungsleiter, warum nach zwei harmonischen Wochen plötzlich Streit über Zuständigkeiten und Werkzeuge ausbricht.',
      application: 'Erklärung anhand des Modells: Das Team ist von der Forming- in die Storming-Phase übergegangen. Der Konflikt ist normal und notwendig, um Rollen zu klären. Die Leitung muss moderieren statt autoritär zu bestrafen.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die vier klassischen Phasen der Teamentwicklung nach Bruce Tuckman in der richtigen Reihenfolge und beschreiben Sie kurz die fünfte, später ergänzte Phase.',
      points: 5,
      sampleAnswer: '1. Forming (Orientierungsphase). 2. Storming (Konfrontationsphase / Nahkampf). 3. Norming (Organisationsphase / Regelbildung). 4. Performing (Hochleistungsphase). 5. Adjourning / Mourning: Die Phase des Projektabschlusses und der geordneten Auflösung des Teams nach Erreichen des Ziels.',
      scoringCriteria: [
        'Je 1 Punkt für die vier Phasen in korrekter Reihenfolge (max. 4 Punkte)',
        '1 Punkt für die Erläuterung der 5. Phase (Adjourning / Auflösung)'
      ]
    },
    examinerWarning: 'Beliebter IHK-Klassiker! Unbedingt auf die exakte chronologische Abfolge achten. Storming vor Forming oder Norming vor Storming ist falsch!',
    relatedModuleId: 'projphase-2',
    relatedModuleName: 'Seite 2: Teamentwicklung & Phase 1: Forming'
  },
  'phase 1: forming & scheinharmonie': {
    definition: 'In der Forming-Phase (Orientierungsphase) sind Teammitglieder vorsichtig freundlich, tasten sich ab und meiden offene Risiken oder Widersprüche. Fragen richten sich fast ausschließlich an die Leitungsperson. Der größte Führungsfehler besteht darin, diese oberflächliche Scheinharmonie mit echter Teamreife zu verwechseln („Läuft doch super, alle ziehen mit“). Diese Harmonie ist trügerisch und bricht beim ersten fachlichen oder zeitlichen Problem zusammen, da noch kein Fundament aus Vertrauen und geklärten Rollen existiert.',
    keywords: ['Forming', 'Scheinharmonie-Falle', 'Abtasten & Vorsicht', 'Konfliktvermeidung', 'Fokussierung auf Leitung', 'Orientierungsbedarf'],
    practicalExample: {
      context: 'Im Kickoff stimmen alle Entwickler brav einer sehr knapp kalkulierten Deadline zu. Nach 3 Wochen stellt sich heraus, dass niemand die Termine einhalten kann.',
      application: 'Ursache: Im Forming traute sich niemand, die Bedenken offen anzusprechen. Die Führungskraft hätte aktiv nach Risiken fragen und eine Atmosphäre psychologischer Sicherheit schaffen müssen.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie das Phänomen der "Scheinharmonie" in der Forming-Phase und begründen Sie, warum es für die Projektleitung ein Risiko darstellt.',
      points: 4,
      sampleAnswer: 'Scheinharmonie bedeutet, dass im Forming Konflikte und Zweifel aus Höflichkeit oder Angst vor Ablehnung nicht ausgesprochen werden. Für die Projektleitung ist dies gefährlich, weil sie eine falsche Teamreife vorgaukelt. Ungeklärte Probleme brechen später in der Storming-Phase unkontrolliert und destruktiv auf.',
      scoringCriteria: [
        '2 Punkte für die Erklärung des Zustandekommens (Höflichkeit, Konfliktvermeidung)',
        '2 Punkte für die schlüssige Ableitung des Projektrisikos (ungeklärte Probleme eskalieren später)'
      ]
    },
    examinerWarning: 'Merke: Harmonie im Forming ist nicht belastbar. Prüfer fragen oft nach dem Unterschied zwischen echter Reife (Performing) und Scheinharmonie (Forming)!',
    relatedModuleId: 'projphase-2',
    relatedModuleName: 'Seite 2: Teamentwicklung & Phase 1: Forming'
  },
  'führungsaufgabe im forming': {
    definition: 'Im Forming benötigt das Team vor allem Orientierung. Wesentliche Führungsaufgaben: 1. Klare Zieldefinition und Erwartungen formulieren. 2. Verbindliche Rollen- und Aufgabenverteilung festlegen („Wer macht was?“). 3. Entscheidungsregeln und Kommunikationskanäle (Tools, Freigabepfade) vereinbaren. 4. Kennenlernen und Vertrauensaufbau durch gezielte Dialogformate ermöglichen. Laissez-faire-Führung ist im Forming fatal, weil Teams ohne Führung orientierungslos bleiben.',
    keywords: ['Orientierung geben', 'Klare Rollen & Aufgaben', 'Entscheidungsregeln vereinbaren', 'Grundlagenarbeit vor Aktionismus', 'Situatives Führen'],
    practicalExample: {
      context: 'Ein frisch zusammengestelltes Projektteam will ohne Rollendefinition sofort mit der Entwicklung beginnen.',
      application: 'Die erfahrene Führungskraft bremst den blinden Aktionismus und investiert die ersten Tage in eine strukturierte Rollenmatrix (RACI) und Kommunikationsregeln. Dies erspart dem Projekt später wochenlange Reibungsverluste.'
    },
    examQuestion: {
      questionText: 'Beschreiben Sie drei konkrete Führungsmaßnahmen, die ein Projektleiter in der Forming-Phase ergreifen muss, um das Team optimal auf spätere Projektphasen vorzubereiten.',
      points: 6,
      sampleAnswer: '1. Klare Ziel- und Rollenverteilung definieren (Aufgabenpakete, Verantwortlichkeiten). 2. Verbindliche Spielregeln für Kommunikation und Entscheidungsfindung etablieren. 3. Kennenlern-Möglichkeiten und geschützte Dialogräume schaffen, damit Vertrauen zwischen den Teammitgliedern wachsen kann.',
      scoringCriteria: [
        'Je 2 Punkte für eine fundierte und praxisnahe Führungsmaßnahme (max. 6 Punkte)'
      ]
    },
    examinerWarning: 'IHK-Prüfer verlangen konkrete Führungsinstrumente (Rollenklärung, Spielregeln, Zieldefinition) statt allgemeiner Phrasen wie "nett sein" oder "motivieren"!',
    relatedModuleId: 'projphase-2',
    relatedModuleName: 'Seite 2: Teamentwicklung & Phase 1: Forming'
  },
  'phase 2: storming & konstruktive reibung': {
    definition: 'Im Storming (Konfrontationsphase) prallen unterschiedliche Meinungen, Arbeitsstile und Wertvorstellungen aufeinander. Rollen und die Aufgabenverteilung werden hinterfragt; Frust richtet sich oft gegen Führungskräfte („die da oben“). Symptome reichen von offener Konfrontation bis zu verdeckten Spannungen (Augenrollen, Schweigen, Cliquenbildung, Flurfunk). Kernlehre nach Christoph Schulze: Storming ist kein Rückschritt, sondern das Reifesignal, an dem ein Team echt wird, weil Mitglieder eigene Vorstellungen einbringen.',
    keywords: ['Storming', 'Reibung & Konflikte', 'Lagerbildung / Cliquen', 'Rollenkonflikte', 'Streitkultur', 'Psychologische Reifung'],
    practicalExample: {
      context: 'Nach der euphorischen Einführung eines neuen Redaktionssystems beklagen sich die Redakteure lautstark, dass die Mediengestalter ihnen zu wenig Freiraum lassen.',
      application: 'Die Projektleitung erkennt darin das typische Storming. Statt zu resignieren, nutzt sie den Konflikt, um Schnittstellen präzise zu schärfen und die Zusammenarbeit auf eine belastbare Basis zu stellen.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie zwei typische Symptome der Storming-Phase und begründen Sie, warum das Durchlaufen dieser Phase für eine spätere Hochleistung des Teams unverzichtbar ist.',
      points: 6,
      sampleAnswer: '1. Symptome: Zähe Diskussionen, Rollenkonflikte, Cliquenbildung und Frust gegen Führung („die da oben“). 2. Begründung: Reibung entsteht, weil Teammitglieder beginnen, sich aktiv mit eigenen Ansprüchen einzubringen. Ohne diesen Klärungsprozess bleiben Rollen ungeklärt und das Team scheitert bei der ersten ernsthaften Belastung.',
      scoringCriteria: [
        '2 Punkte für die Nennung und Erläuterung zweier realistischer Symptome',
        '4 Punkte für die fundierte Begründung des Reifungswerts (psychologische Reife, geklärte Rollen)'
      ]
    },
    examinerWarning: 'Beliebter IHK-Prüfungsirrtum: Viele Prüflinge halten Storming für ein Versagen der Leitung. Stelle im Prüfungsgespräch klar heraus: Storming ist eine notwendige Entwicklungsstufe, kein Managementfehler!',
    relatedModuleId: 'projphase-3',
    relatedModuleName: 'Seite 3: Storming & Norming (Konflikte, Spielregeln & Führung)'
  },
  'führungsaufgabe im storming: moderieren statt urteilen': {
    definition: 'In der Storming-Phase muss die Führungskraft als neutraler Moderator und Prozessbegleiter agieren, nicht als inhaltlicher Richter. Die zwei Kardinalfehler: 1. Zudecken wollen (Scheinharmonie erzwingen presst Konflikte in den Untergrund und erzeugt Dauerlähmung). 2. Aussitzen und hoffen, dass es sich von allein legt. Korrekte Führungsmaßnahmen: Reibungspunkte offen ansprechbar machen, Ursachen (meist unklare Rollen/Schnittstellen) klären und einen fairen, sachlichen Rahmen für produktives Streiten sichern.',
    keywords: ['Moderieren statt urteilen', 'Konfliktzudecken vermeiden', 'Rollen- & Schnittstellenklärung', 'Streitkultur fördern', 'Prozessbegleitung'],
    practicalExample: {
      context: 'Zwei Entwickler streiten erbittert über Git-Branching-Strategien und verlangen vom Teamleiter eine Verwarnung des jeweils anderen.',
      application: 'Der Teamleiter verhängt keine Strafe und fällt kein vorschnelles Machturteil. Stattdessen setzt er einen einstündigen Workshop an, lässt beide Vor- und Nachteile an die Wand schreiben und moderiert die Einigung auf ein gemeinsames Regelwerk.'
    },
    examQuestion: {
      questionText: 'Beschreiben Sie die zwei häufigsten Führungsfehler in der Storming-Phase und erläutern Sie das empfohlene Führungsverhalten nach Christoph Schulze.',
      points: 6,
      sampleAnswer: '1. Fehler 1: Konflikt zudecken (erzwungene Harmonie erzeugt verdeckte Blockaden). Fehler 2: Nicht-Einmischen / Aussitzen (führt zur Verhärtung der Fronten). 2. Empfohlenes Verhalten: Moderieren statt urteilen: Reibungspunkte ansprechbar machen, Rollen klären und den Streit sachorientiert austragen lassen („Ein Team, das lernt, gut zu streiten, ist am Ende stärker“).',
      scoringCriteria: [
        '2 Punkte für Fehler 1 (Zudecken / Scheinharmonie)',
        '2 Punkte für Fehler 2 (Aussitzen / Laissez-faire)',
        '2 Punkte für das empfohlene Moderations- und Klärungsverhalten'
      ]
    },
    examinerWarning: 'IHK-Prüfer achten streng auf den Leitsatz: Moderieren statt Urteilen! Ein autoritärer Schiedsspruch der Führungskraft löst den Teamkonflikt nicht nachhaltig.',
    relatedModuleId: 'projphase-3',
    relatedModuleName: 'Seite 3: Storming & Norming (Konflikte, Spielregeln & Führung)'
  },
  'phase 3: norming & wir-gefühl': {
    definition: 'Im Norming (Organisationsphase) entwickelt das Team einen eigenen Rhythmus und ungeschriebene Gesetze: Wie man miteinander umgeht, wie Entscheidungen getroffen werden und was akzeptiert wird. Das Denken wandelt sich vom egozentrischen „Ich“ zum kooperativen „Wir“. Merkmale: Konflikte werden eigenständig auf Peer-Ebene gelöst, gegenseitige Unterstützung erfolgt unaufgefordert ohne Dienstanweisung, es herrscht echter kollektiver Stolz und eine belastbare, gefestigte Arbeitsatmosphäre.',
    keywords: ['Norming', 'Ungeschriebene Spielregeln', 'Wir-Gefühl', 'Peer-to-Peer Konfliktlösung', 'Gegenseitige Hilfe ohne Weisung', 'Kollektiver Stolz'],
    practicalExample: {
      context: 'Ein Teammitglied fällt kurz vor der Messe wegen Krankheit aus. Ohne Rücksprache mit dem Chef teilen die anderen drei Kollegen die restlichen Messetafeln untereinander auf.',
      application: 'Klassisches Zeichen von Norming: Die Gruppe übernimmt kollektive Verantwortung für das Gesamtergebnis, ohne auf Weisungen der Führungskraft zu warten.'
    },
    examQuestion: {
      questionText: 'Nennen Sie drei beobachtbare Indikatoren im Arbeitsalltag, die belegen, dass ein Projektteam von der Storming- in die Norming-Phase übergegangen ist.',
      points: 6,
      sampleAnswer: '1. Konflikte und Meinungsverschiedenheiten werden eigenständig untereinander gelöst, ohne die Projektleitung einzuschalten. 2. Teammitglieder helfen sich bei Arbeitsspitzen unaufgefordert gegenseitig. 3. Es entstehen verbindliche, ungeschriebene Spielregeln und ein spürbarer gemeinsamer Stolz auf Teamerfolge („Wir-Gefühl“).',
      scoringCriteria: [
        'Je 2 Punkte für einen präzisen, beobachtbaren Indikator aus der Praxis (max. 6 Punkte)'
      ]
    },
    examinerWarning: 'Achte auf die Differenzierung: Im Forming ist Hilfe von der Leitung angeordnet; im Norming entsteht sie intrinsisch und unaufgefordert aus dem Team heraus!',
    relatedModuleId: 'projphase-3',
    relatedModuleName: 'Seite 3: Storming & Norming (Konflikte, Spielregeln & Führung)'
  },
  'führungsaufgabe im norming: loslassen & vertrauen': {
    definition: 'Im Norming muss die Führungskraft den Führungsstil radikal anpassen: Von der engen Steuerung hin zu Delegation, Vertrauen und Loslassen („Norming ist die Phase, in der Führung Verantwortung abgeben muss“). Der größte Fehler ist Überkontrolle (Micromanagement): Wer die enge Kontrolle aus dem Storming beibehält, signalisiert Misstrauen und würgt die Selbstständigkeit ab. Kernaufgaben: Entstehende Regeln sichtbar bestärken, Entscheidungen ins Team verlagern und Fehler als Lernchancen zulassen.',
    keywords: ['Verantwortung abgeben', 'Loslassen & Vertrauen', 'Gefahr von Überkontrolle / Micromanagement', 'Regeln sichtbar machen & bestärken', 'Selbstorganisation fördern'],
    practicalExample: {
      context: 'Nachdem das Team eigene Review-Rituale eingeführt hat, überlegt der Projektleiter, ob er weiterhin bei jeder Teilabnahme anwesend sein muss.',
      application: 'Der Projektleiter zieht sich bewusst aus den operativen Detailabnahmen zurück und überlässt diese dem Team. Er konzentriert sich auf Rahmenbedingungen und stärkt dadurch das Vertrauen der Mitarbeiter.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie, warum Überkontrolle (Micromanagement) der schwerwiegendste Führungsfehler in der Norming-Phase ist, und nennen Sie zwei adäquate Führungsmaßnahmen.',
      points: 6,
      sampleAnswer: '1. Begründung Überkontrolle: Im Norming entsteht gerade die Eigenverantwortung des Teams. Werden weiterhin alle Entscheidungen und Kontrollen durch die Leitung monopolisiert, wird das Team entmündigt und fällt in Passivität oder erneutes Aufbegehren zurück. 2. Führungsmaßnahmen: Verantwortung abgeben und Entscheidungsbefugnisse delegieren; erfolgreiche Teamregeln loben und sichtbar bestärken.',
      scoringCriteria: [
        '3 Punkte für die Begründung des Schadens durch Überkontrolle',
        '3 Punkte für die Benennung zweier zielgerichteter Führungsmaßnahmen'
      ]
    },
    examinerWarning: 'Prüfungsfokus: Situatives Führen verlangt Loslassen im Norming. Wer antwortet, die Führungskraft müsse im Norming die Kontrollen verschärfen, belegt fehlendes Führungsverständnis!',
    relatedModuleId: 'projphase-3',
    relatedModuleName: 'Seite 3: Storming & Norming (Konflikte, Spielregeln & Führung)'
  },
  'phase 4: performing & flow': {
    definition: 'Im Performing (Hochleistungsphase) arbeitet das Team weitgehend autonom, hocheffizient und rollenklar. Es herrscht tiefes wechselseitiges Vertrauen und psychologische Sicherheit: Meinungsverschiedenheiten werden rein sachlich ausgetragen, ohne die Beziehungen zu gefährden. Durch den Flow-Zustand entsteht echte Synergie: Das Team leistet mehr als die Summe seiner Einzelteile („eingespieltes Team“). Die Führungskraft wird im operativen Tagesgeschäft kaum noch gebraucht.',
    keywords: ['Performing', 'Autonomie & Selbstorganisation', 'Flow & Synergieeffekt', 'Psychologische Sicherheit', 'Sachebene bei Konflikten', 'Eingespieltes Team'],
    practicalExample: {
      context: 'Ein unerwarteter technischer Fehler bedroht den Go-Live einer medienübergreifenden Werbekampagne am Wochenende.',
      application: 'Das Team organisiert sich in Minutenschnelle selbst, verteilt die Fehlerbehebung ohne Weisung von oben und löst das Problem souverän mit Gelassenheit und Humor.'
    },
    examQuestion: {
      questionText: 'Beschreiben Sie drei Merkmale der Performing-Phase nach Bruce Tuckman und erläutern Sie, wie sich die Rolle der Führungskraft in dieser Phase verändert.',
      points: 6,
      sampleAnswer: '1. Merkmale: Autonome Problemlösung ohne Chef, Synergieeffekt („Flow“), sachliche Streitkultur ohne persönliche Kränkung. 2. Rolle der Führung: Zurückhaltung im Tagesgeschäft (kein Micromanagement), Konzentration auf Rahmenbedingungen und strategische Zielsetzung (Servant Leadership).',
      scoringCriteria: [
        '3 Punkte für die drei präzisen Merkmale (je 1 Punkt)',
        '3 Punkte für die fundierte Darstellung des gewandelten Führungsverhaltens'
      ]
    },
    examinerWarning: 'Achte im Prüfungsgespräch darauf: Performing bedeutet nicht Abwesenheit von Konflikten, sondern die Fähigkeit, Konflikte hochproduktiv und ohne Beziehungsbruch auf der Sachebene zu lösen!',
    relatedModuleId: 'projphase-4',
    relatedModuleName: 'Seite 4: Performing & Adjourning (Höchstleistung, Rückfall & Projektabschluss)'
  },
  'die rückfall-falle im performing': {
    definition: 'Performing ist kein statischer Endzustand, den ein Team für immer behält. Nach Tuckman ist Teamentwicklung ein zyklischer Prozess: Jede personelle Veränderung (Neuzugang, Kündigung), Reorganisation oder gravierende Zieländerung bricht bestehende Rollenmuster auf und wirft das Team unweigerlich in frühere Phasen zurück (oft bis ins Storming). Dies ist kein Zeichen von Führungsversagen, sondern eine notwendige Phase der Neu-Justierung.',
    keywords: ['Rückfall-Dynamik', 'Performing ist kein Dauerzustand', 'Personeller Wechsel', 'Reorganisation', 'Neu-Justierung', 'Zyklisches Phasenmodell'],
    practicalExample: {
      context: 'In einem extrem erfolgreichen Entwicklerteam scheidet der Lead-Entwickler aus und zwei Nachwuchskräfte kommen hinzu. Plötzlich herrscht wieder Unsicherheit und Unruhe.',
      application: 'Die erfahrene Führungskraft gerät nicht in Panik, sondern weiß: Das Team muss sich neu justieren. Sie moderiert die Rollenneuverteilung und begleitet die Gruppe zügig durch das erneute Forming und Storming.'
    },
    examQuestion: {
      questionText: 'Begründen Sie, warum der Wechsel eines Teammitglieds ein Hochleistungsteam (Performing) wieder zurückwerfen kann, und wie die Projektleitung darauf reagieren sollte.',
      points: 5,
      sampleAnswer: '1. Begründung: Ein Neuzugang verändert das soziale Beziehungsgefüge, Statusfragen und eingespielte Abstimmungswege. Das Team fällt zur Neu-Orientierung zurück in Forming/Storming. 2. Reaktion: Nicht als Versagen deuten, sondern aktiv Raum und Zeit für die Neu-Justierung von Rollen und Spielregeln geben.',
      scoringCriteria: [
        '3 Punkte für die sozialpsychologische Begründung (Status, Schnittstellen, Normen)',
        '2 Punkte für die adäquate Reaktion der Führungskraft'
      ]
    },
    examinerWarning: 'Beliebter Prüfer-Fallstrick: Prüflinge glauben oft fälschlicherweise, ein einmal erreichtes Performing bleibe für immer stabil. Betone stets die Dynamik und Fragilität von Teamstrukturen!',
    relatedModuleId: 'projphase-4',
    relatedModuleName: 'Seite 4: Performing & Adjourning (Höchstleistung, Rückfall & Projektabschluss)'
  },
  'führungsaufgabe im performing: loslassen & hindernisse räumen': {
    definition: 'Die beste Führung im Performing ist zurückhaltend und dienend („Servant Leadership“): Die Maxime lautet „Loslassen, aber nicht verschwinden“. Kernaufgaben: 1. Übergeordnete Ziele und Rahmenbedingungen vorgeben. 2. Bürokratische und organisatorische Hindernisse aus dem Weg räumen. 3. Als Sparringspartner ansprechbar bleiben, ohne operativ einzugreifen. 4. Striktes Vermeiden von Micromanagement. 5. Erreichte Erfolge sichtbar vor dem Management würdigen.',
    keywords: ['Loslassen aber nicht verschwinden', 'Servant Leadership', 'Hindernisse wegräumen', 'Kein Micromanagement', 'Sichtbare Wertschätzung'],
    practicalExample: {
      context: 'Das Performing-Team benötigt eine teure Spezialsoftware für 3D-Rendering, um einen drohenden Lieferengpass zu vermeiden.',
      application: 'Die Führungskraft diskutiert nicht über die fachliche Notwendigkeit, sondern setzt bei der Geschäftsleitung innerhalb von 2 Stunden das Budget durch, damit das Team ohne Verzug weiterarbeiten kann.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie den Führungsgrundsatz "Loslassen, aber nicht verschwinden" in der Performing-Phase anhand von zwei konkreten Beispielen aus dem Projektmanagement.',
      points: 6,
      sampleAnswer: '1. Loslassen: Keine operative Einmischung in technische Detailentscheidungen; das Team bestimmt Werkzeuge und Abläufe autonom. 2. Nicht verschwinden: Die Führungskraft bleibt ansprechbar, schirmt das Team vor externen Störungen ab, räumt bürokratische Hürden beiseite und sorgt für Wertschätzung der Leistung vor Auftraggebern.',
      scoringCriteria: [
        '3 Punkte für die Erläuterung des Loslassens mit Praxisbeispiel',
        '3 Punkte für die Erläuterung des Nicht-Verschwindens mit Schutz- und Unterstützungsfunktion'
      ]
    },
    examinerWarning: 'Prüfer achten auf die Balance: Weder autoritäres Eingreifen (Micromanagement) noch vollständiges Abtauchen (Laissez-faire) ist im Performing angebracht!',
    relatedModuleId: 'projphase-4',
    relatedModuleName: 'Seite 4: Performing & Adjourning (Höchstleistung, Rückfall & Projektabschluss)'
  },
  'phase 5: adjourning (auflösungsphase 1977)': {
    definition: '1977 erweiterten Bruce Tuckman und Mary Ann Jensen das Modell nach Auswertung von 22 Studien um die 5. Phase: Adjourning (Auflösung, Beendigung oder Mourning). Sie tritt ein, wenn das befristete Projektziel erreicht ist oder die Gruppe aufgelöst wird. Typische Kennzeichen: Emotionale Ambivalenz aus Stolz auf das Erreichte, Abschiedsschmerz/Wehmut und Zukunftsunsicherheit. Die Arbeitsleistung läuft aus; Gedanken wandern bereits zum nächsten Projekt.',
    keywords: ['Adjourning (1977)', 'Mary Ann Jensen', 'Auflösungsphase / Mourning', 'Projektabschluss', 'Emotionale Ambivalenz', 'Stolz & Wehmut'],
    practicalExample: {
      context: 'Nach dem Abschluss des einjährigen Relaunch-Projekts eines Verlagsportals wird das Projektteam aufgelöst.',
      application: 'Die Mitglieder empfinden Freude über den gelungenen Launch, aber gleichzeitig Bedauern über das Ende der vertrauten Zusammenarbeit. Die Projektleitung muss diesem emotionalen Übergang Raum geben.'
    },
    examQuestion: {
      questionText: 'Nennen Sie das Jahr und die Autoren der Erweiterung des Tuckman-Modells um die Phase "Adjourning" und beschreiben Sie die typische Gefühlslage der Teammitglieder in dieser Phase.',
      points: 5,
      sampleAnswer: '1. Jahr & Autoren: 1977 von Bruce Tuckman und Mary Ann Jensen. 2. Gefühlslage: Eine gemischte Gefühlslage (Ambivalenz) aus Stolz und Erleichterung über das Erreichte, Wehmut über den bevorstehenden Abschied von vertrauten Kollegen sowie Unsicherheit hinsichtlich neuer Rollen in Folgeprojekten.',
      scoringCriteria: [
        '2 Punkte für die korrekte Nennung (1977, Jensen & Tuckman)',
        '3 Punkte für die differenzierte Beschreibung der Gefühle (Stolz, Wehmut, Zukunftsangst)'
      ]
    },
    examinerWarning: 'IHK-Detailwissen: Wer weiß, dass Adjourning erst 1977 gemeinsam mit Mary Ann Jensen ergänzt wurde, sammelt wertvolle Zusatzpunkte bei anspruchsvollen Prüfern!',
    relatedModuleId: 'projphase-4',
    relatedModuleName: 'Seite 4: Performing & Adjourning (Höchstleistung, Rückfall & Projektabschluss)'
  },
  'führungsaufgabe im adjourning: bewusster abschluss': {
    definition: 'Im Adjourning darf das Projektende keinesfalls lieblos versanden („Letztes Meeting fällt aus, keiner sagt danke“). Ein liebloser Abschluss zerstört Erfahrungen und führt dazu, dass Mitarbeiter im nächsten Projekt viel ängstlicher ins Forming starten. Die 3 unverzichtbaren Führungsaufgaben: 1. Retrospektive / Lessons Learned: Was lief gut, was verbessern wir? 2. Individuelle und ehrliche Würdigung der Beiträge jedes Einzelnen. 3. Verbindendes Abschlussritual: Abschlussessen, Teamfoto oder Erinnerungsstück.',
    keywords: ['Bewusster Abschluss', 'Gefahr des Versandens', 'Retrospektive / Lessons Learned', 'Individuelle Würdigung', 'Abschlussritual', 'Schutz künftiger Forming-Phasen'],
    practicalExample: {
      context: 'Das Budget ist aufgebraucht und der Kunde drängt auf sofortigen Projektschluss.',
      application: 'Die Projektleitung setzt sich durch und investiert zwei Stunden in ein Abschlussmeeting mit Pizza, Feedback-Runde und Dokumentation der Best Practices. Die Mitarbeiter gehen hochmotiviert in ihre nächsten Aufgaben.'
    },
    examQuestion: {
      questionText: 'Beschreiben Sie die drei zentralen Säulen eines professionellen Projektabschlusses im Adjourning und begründen Sie, warum das Versäumen dieser Phase künftige Projekte schädigt.',
      points: 6,
      sampleAnswer: '1. Drei Säulen: Retrospektive (systematische Lessons Learned), persönliche Würdigung aller Leistungen und ein gemeinsames Abschlussritual (Foto/Essen). 2. Begründung: Ohne Lessons Learned werden Fehler wiederholt; ohne Würdigung sinkt die Motivation und Mitarbeiter starten im nächsten Projekt mit Misstrauen und Vorsicht ins Forming.',
      scoringCriteria: [
        '3 Punkte für die drei Säulen (Retrospektive, Würdigung, Ritual)',
        '3 Punkte für die Begründung des Schadens für künftige Projekte (Wissensverlust, Misstrauen)'
      ]
    },
    examinerWarning: 'Merke für die IHK-Prüfung: Das Projekt ist erst abgeschlossen, wenn das Adjourning (Abschlussbericht, Retrospektive, Entlastung/Dank) vollständig durchgeführt wurde!',
    relatedModuleId: 'projphase-4',
    relatedModuleName: 'Seite 4: Performing & Adjourning (Höchstleistung, Rückfall & Projektabschluss)'
  },
  'die 5 projektmanagementphasen (din 69901-2)': {
    definition: 'Das Prozessmodell der DIN 69901-2 gliedert das Projektmanagement in fünf aufeinander aufbauende Phasen: 1. Initialisierung (Projektidee & Machbarkeit prüfen, Entscheidung über das OB). 2. Definition (Ziele, Lastenheft, Projektauftrag). 3. Planung (Termine, PSP, Meilensteine, Kosten, Ressourcen). 4. Steuerung (Fortschrittsüberwachung, Soll-Ist-Vergleich, Risikomanagement). 5. Abschluss (Ergebnisabnahme, Lessons Learned, Entlastung). Nach DIN und GPM handelt es sich nicht um ein starres Schema: Rücksprünge, Überschneidungen und iterative Zyklen sind in der Praxis unvermeidlich.',
    keywords: ['DIN 69901-2', '5 Projektmanagementphasen', 'Initialisierung', 'Definition', 'Planung', 'Steuerung', 'Abschluss', 'Kein starres Schema / GPM'],
    practicalExample: {
      context: 'Ein Kunde verlangt die Einführung eines automatisierten Web-to-Print-Systems in 8 Wochen.',
      application: 'Die Agentur führt das Vorhaben geordnet durch die 5 Phasen: Zuerst Initialisierung (Machbarkeit), dann Definition (Schnittstellen/Ziele), detaillierte Meilensteinplanung, agile Steuerung und formale Projektabnahme.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die fünf Projektmanagementphasen nach DIN 69901-2 in der richtigen Reihenfolge und begründen Sie, warum es sich dabei nicht um ein starres Schema handeln muss.',
      points: 7,
      sampleAnswer: '1. Reihenfolge: Initialisierung, Definition, Planung, Steuerung, Abschluss. 2. Begründung: Projekte zeichnen sich durch Unsicherheit und neue Erkenntnisse aus. Bei veränderten Anforderungen oder technischen Hürden sind iterative Rücksprünge (z. B. von Steuerung zu Planung) und Phasenüberschneidungen nach GPM-Standard praxisnotwendig.',
      scoringCriteria: [
        '5 Punkte für die korrekte Benennung der 5 Phasen in richtiger Reihenfolge',
        '2 Punkte für die fundierte Begründung (Nicht-Starrheit, Iterationen, Rücksprünge)'
      ]
    },
    examinerWarning: 'Achtung: Verwechsle nicht die Teamentwicklungsphasen nach Tuckman (Forming bis Adjourning) mit den DIN-Projektmanagementphasen (Initialisierung bis Abschluss)!',
    relatedModuleId: 'projphase-5',
    relatedModuleName: 'Seite 5: Die 5 Projektmanagement-Phasen (DIN 69901-2) & Initialisierung'
  },
  'pm-phasen vs. fachliche projektphasen': {
    definition: 'Fundamentale IHK-Differenzierung: Projektmanagementphasen (DIN 69901-2) steuern den organisatorischen Führungsrahmen (Ziele, Meilensteine, Budgets, Risiken). Fachliche Projektphasen hingegen beschreiben den produktspezifischen Herstellungsprozess, in dem das konkrete Arbeitsergebnis entsteht (z. B. bei Medien: Briefing, Grobkonzept, Screendesign, Frontend-Coding, Druckplattenbelichtung, Druck, Falzung). Hauptfehler ohne Trennung: Fachliche Arbeiten beginnen zu früh, bevor Ziele und Rahmenbedingungen geregelt sind.',
    keywords: ['PM-Phasen vs. Fachliche Phasen', 'Führungs- & Steuerungsprozesse', 'Produktspezifische Herstellungsphasen', 'Fehler: Zu früher Beginn', 'DIN 69901-2'],
    practicalExample: {
      context: 'In einem Katalogprojekt will der Grafiker bereits im Entwurfsmuster Bilder retuschieren, obwohl das Format und das Druckbudget noch gar nicht feststehen.',
      application: 'Der Projektmanager stoppt die fachliche Gestaltung und führt erst die PM-Phasen Initialisierung und Definition durch, um teure Fehlgestaltungen zu vermeiden.'
    },
    examQuestion: {
      questionText: 'Grenzen Sie den Begriff "Projektmanagementphase" von einer "fachlichen Projektphase" anhand von zwei Unterscheidungskriterien und je einem Beispiel aus der Medienproduktion ab.',
      points: 6,
      sampleAnswer: '1. Projektmanagementphase: Dient der Steuerung, Organisation und Kontrolle des Gesamtprojekts (Beispiel: Soll-Ist-Vergleich der Projektkosten in der Steuerungsphase). 2. Fachliche Phase: Dient der inhaltlichen, handwerklichen oder technischen Erstellung des eigentlichen Produkts (Beispiel: Farbkorrektur und Druckplattenbelichtung im CTP-Workflow).',
      scoringCriteria: [
        '2 Punkte für die Definition und Funktion von PM-Phasen',
        '2 Punkte für die Definition und Funktion von Fachphasen',
        '2 Punkte für die passenden Medienbeispiele'
      ]
    },
    examinerWarning: 'Typische Prüfungsfalle: Nenne bei der Frage nach PM-Phasen niemals operative Schritte wie "Drucken" oder "Gestalten" – das sind rein fachliche Projektphasen!',
    relatedModuleId: 'projphase-5',
    relatedModuleName: 'Seite 5: Die 5 Projektmanagement-Phasen (DIN 69901-2) & Initialisierung'
  },
  'phase 1: initialisierung (projektidee & machbarkeit)': {
    definition: 'Die Initialisierung (Phase 1 nach DIN 69901-2) klärt die fundamentale Frage nach dem „OB“: Soll aus einer Anregung, einem Problem oder einer Marktchance überhaupt ein offizielles Projekt entstehen? Kernaktivitäten: 1. Erste Zielvorstellungen und Nutzen skizzieren. 2. Machbarkeitsprüfung (technisch, zeitlich, wirtschaftlich). 3. Grundsätzliche Zuständigkeiten klären. 4. Voruntersuchung und Wirtschaftlichkeitsbetrachtung. Am Ende steht die Go-/No-Go-Entscheidung des Auftraggebers.',
    keywords: ['Initialisierung', 'Frage nach dem OB', 'Projektidee & Anlass', 'Machbarkeitsprüfung', 'Nutzenskizze', 'Go-/No-Go-Entscheidung'],
    practicalExample: {
      context: 'Ein Verlag erwägt, eine eigene native Lese-App für Android und iOS programmieren zu lassen.',
      application: 'In der Initialisierungsphase wird geprüft: Gibt es ausreichend Abonnenten? Welche Entwicklungskosten entstehen? Ist die Technik machbar? Erst nach positivem Nutzen-Kosten-Verhältnis wird die Freigabe zur Definitionsphase erteilt.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie die Hauptaufgabe der Initialisierungsphase nach DIN 69901-2 und nennen Sie drei Prüfkriterien, die vor der Entscheidung über den Projektstart untersucht werden müssen.',
      points: 6,
      sampleAnswer: '1. Hauptaufgabe: Grundsätzliche Klärung der Projektidee und Entscheidung, ob überhaupt ein Projekt gestartet werden soll (Frage nach dem OB). 2. Prüfkriterien: Technologische Machbarkeit, wirtschaftlicher Nutzen/Rentabilität (Kosten-Nutzen-Verhältnis) und Verfügbarkeit von Mindestressourcen/Zuständigkeiten.',
      scoringCriteria: [
        '3 Punkte für die präzise Erläuterung der Phase (Entscheidung über das OB, Nutzen)',
        '3 Punkte für drei valide Prüfkriterien (Machbarkeit, Wirtschaftlichkeit, Zuständigkeit)'
      ]
    },
    examinerWarning: 'Merke: Die Initialisierung erarbeitet noch keinen fertigen Projektstrukturplan (der gehört in die Planung!), sondern entscheidet nur über das Entstehen des Projekts!',
    relatedModuleId: 'projphase-5',
    relatedModuleName: 'Seite 5: Die 5 Projektmanagement-Phasen (DIN 69901-2) & Initialisierung'
  },
  'phase 2: definition & nicht-ziele': {
    definition: 'In der Definitionsphase (Phase 2 nach DIN 69901-2) wird das WAS verbindlich geklärt: Projektinhalt und -umfang werden präzisiert und scharf abgegrenzt. Von entscheidender IHK-Relevanz ist die explizite Formulierung von Nicht-Zielen: Durch das schriftliche Festhalten, was ausdrücklich NICHT zum Leistungsumfang gehört, wird das gefürchtete Scope Creep (schleichende Ausuferung) verhindert. Zudem werden Stakeholder analysiert, Rahmenbedingungen erhoben und das Kernteam mit seinen Rollen besetzt.',
    keywords: ['Phase 2: Definition', 'Nicht-Ziele', 'Scope Creep Abwehr', 'Projektgegenstand abgrenzen', 'Stakeholder-Analyse', 'Kernteam & Rollen', 'DIN 69901-2'],
    practicalExample: {
      context: 'Beim Relaunch einer Corporate Website wird vertraglich vereinbart: Nicht-Ziele sind Mehrsprachigkeit und Online-Shop.',
      application: 'Als der Kunde später beiläufig nach einer englischen Sprachversion fragt, weist der Projektmanager auf die definierten Nicht-Ziele hin und unterbreitet ein separates Zusatzangebot (Change Request) mit Budget- und Terminanpassung.'
    },
    examQuestion: {
      questionText: 'Erklären Sie, warum das explizite Festlegen von „Nicht-Zielen“ in der Projektdefinitionsphase ein unverzichtbares Instrument des Projektmanagements ist, und beschreiben Sie den Begriff „Scope Creep“.',
      points: 6,
      sampleAnswer: '1. Bedeutung von Nicht-Zielen: Sie definieren glasklar die Grenzen des Projektumfangs und verhindern Missverständnisse mit dem Auftraggeber über unausgesprochene Erwartungen. 2. Scope Creep: Bezeichnet das unbemerkte, schleichende Ausufern des Leistungsumfangs während der Projektlaufzeit durch wiederholte Zusatzwünsche ohne Anpassung von Zeit- und Budgetressourcen, was fast zwangsläufig zu Projektkrisen führt.',
      scoringCriteria: [
        '3 Punkte für die Erläuterung der Schutzfunktion von Nicht-Zielen',
        '3 Punkte für die Definition von Scope Creep und dessen Gefahren'
      ]
    },
    examinerWarning: 'Fehlt in der Prüfungsantwort bei der Definitionsphase das Thema "Nicht-Ziele" oder "Scope Creep", fehlen fast immer die entscheidenden Transferpunkte!',
    relatedModuleId: 'projphase-6',
    relatedModuleName: 'Seite 6: Phasen 2–4 (Definition, Planung & Steuerung nach DIN 69901-2)'
  },
  'phase 3: planung & projektstrukturplan (psp)': {
    definition: 'Die Planungsphase (Phase 3 nach DIN 69901-2) strukturiert den Weg zum Ziel: Das Vorhaben wird in handhabbare Einheiten zerlegt. Zentrales Element ist der Projektstrukturplan (PSP), der das Gesamtprojekt hierarchisch in Teilaufgaben und Arbeitspakete (AP) gliedert. Auf dieser Basis entstehen Terminplan (Gantt, Netzplan mit Meilensteinen), Ressourcen- und Kosten-/Finanzmittelpläne. Zentrales IHK-Verständnis: Ein Projektplan ist kein unumstößliches Gesetz, sondern die unersetzbare Messbasis, um Abweichungen in der Steuerung überhaupt transparent erkennen zu können.',
    keywords: ['Phase 3: Planung', 'Projektstrukturplan (PSP)', 'Arbeitspakete (AP)', 'Termin- & Ablaufplan', 'Kosten- & Ressourcenplan', 'Plan als Messbasis', 'DIN 69901-2'],
    practicalExample: {
      context: 'Für die Konzeption und Drucklegung eines 100-seitigen Geschäftsberichts wird das Vorhaben in Teilaufgaben gegliedert.',
      application: 'Der Mediengestalter erstellt einen PSP mit 4 Ebenen: Text/Konzept, Fotografie, Satz/Layout und CTP/Druck. Jedes Arbeitspaket erhält klare Verantwortliche, Stundenbudgets und Pufferzeiten.'
    },
    examQuestion: {
      questionText: 'Nennen Sie das zentrale Instrument der Projektplanungsphase nach DIN 69901-2 und begründen Sie, warum eine professionelle Projektplanung kein starres Dogma darstellt.',
      points: 6,
      sampleAnswer: '1. Zentrales Instrument: Der Projektstrukturplan (PSP), der das Gesamtvorhaben hierarchisch in Teilaufgaben und Arbeitspakete zerlegt. 2. Begründung: Planung ist kein starres Gesetz, da in komplexen Projekten stets unvorhersehbare Dynamiken auftreten. Die Planung schafft aber die verbindliche Messbasis (Soll-Werte), an der Abweichungen (Ist-Werte) überhaupt erst erkannt, bewertet und aktiv nachgesteuert werden können.',
      scoringCriteria: [
        '2 Punkte für die Nennung und Erläuterung des PSP',
        '4 Punkte für die fundierte Begründung des Plans als Vergleichs-/Messbasis'
      ]
    },
    examinerWarning: 'Prüfungsfalle: Behaupte niemals, dass ein Plan starr bis zum Ende durchgezogen werden muss. Pläne sind adaptive Steuerungsinstrumente!',
    relatedModuleId: 'projphase-6',
    relatedModuleName: 'Seite 6: Phasen 2–4 (Definition, Planung & Steuerung nach DIN 69901-2)'
  },
  'phase 4: steuerung & projektcontrolling': {
    definition: 'Die Steuerungsphase (Phase 4 nach DIN 69901-2) begleitet die operative Umsetzung. Da die eigentliche fachliche Produkterstellung (Satz, Programmierung, Druck) operatives Handwerk ist, existiert nach DIN 69901-2 keine Phase "Umsetzung" – das PM übernimmt die Steuerung. Kernaufgaben: Kontinuierlicher Soll-Ist-Vergleich von Terminen, Meilensteinen und Kosten (Projektcontrolling), Risikoüberwachung, Steuerung von Qualitätsvorgaben sowie formelles Änderungsmanagement (Change Request) bei Abweichungen.',
    keywords: ['Phase 4: Steuerung', 'Projektcontrolling', 'Soll-Ist-Vergleich', 'Keine eigenständige Umsetzungsphase', 'Change Request', 'Risikosteuerung', 'DIN 69901-2'],
    practicalExample: {
      context: 'In einer Medienkampagne benötigt der Kunde für die Korrekturabzüge 5 Tage länger als im Terminplan vorgesehen.',
      application: 'Der Projektmanager erkennt die Planabweichung im Soll-Ist-Vergleich, zieht die geplante Pufferzeit in der Druckvorstufe und sichert so den fixen Erscheinungstermin ohne Budgetüberschreitung.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie, warum im Phasenmodell der DIN 69901-2 die "fachliche Umsetzung" keine eigenständige Phase bildet, und beschreiben Sie zwei Kernaktivitäten der Phase "Steuerung".',
      points: 6,
      sampleAnswer: '1. Begründung: Die DIN 69901-2 definiert Management- und Führungsphasen. Die fachliche Umsetzung ist operatives Produktergebnis; das Projektmanagement hat die Aufgabe, diesen Prozess organisatorisch zu steuern. 2. Kernaktivitäten: a) Projektcontrolling durch regelmäßige Soll-Ist-Vergleiche von Terminen, Kosten und Fertigstellungsgrad. b) Steuerung von Abweichungen und Risiken sowie Einleitung von Change-Request-Verfahren.',
      scoringCriteria: [
        '2 Punkte für die saubere Trennung von Management- vs. Fachphase',
        '4 Punkte für zwei präzise beschriebene Steuerungsaktivitäten'
      ]
    },
    examinerWarning: 'Merke: Projektcontrolling ist nicht nur Kontrolle am Ende, sondern kontinuierliche proaktive Steuerung während der gesamten Laufzeit!',
    relatedModuleId: 'projphase-6',
    relatedModuleName: 'Seite 6: Phasen 2–4 (Definition, Planung & Steuerung nach DIN 69901-2)'
  },
  'ergebnisabnahme in der steuerung (din 69901-2)': {
    definition: 'Häufigste IHK-Prüfungsfalle im DIN-Prozessmodell: Die formale Abnahme des Projektergebnisses (z. B. Unterzeichnung des Abnahmeprotokolls durch den Kunden nach Überprüfung gegen das Pflichtenheft) wird nach DIN 69901-2 der Phase „Steuerung“ zugeordnet! Sie beendet die operative Steuerungsverantwortung für das Erzeugnis. Erst nach erfolgter Abnahme beginnt Phase 5 (Abschluss), in der organisatorische, administrative und zwischenmenschliche Aufgaben (Lessons Learned, Entlastung, Teamauflösung) erfolgen.',
    keywords: ['Ergebnisabnahme', 'Phase Steuerung (DIN 69901-2)', 'IHK-Prüfungsfalle', 'Abnahmeprotokoll', 'Übergang zu Phase 5 Abschluss', 'Pflichtenheftabgleich'],
    practicalExample: {
      context: 'Nach Fertigstellung einer App-Anwendung testet der Auftraggeber alle Kriterien anhand der Leistungsbeschreibung.',
      application: 'Der Kunde unterzeichnet das Abnahmeprotokoll. Dieser Schritt schließt prozessual die Phase Steuerung ab. Erst danach führt die Agentur die interne Projektabschlussanalyse (Phase 5) durch.'
    },
    examQuestion: {
      questionText: 'Ordnen Sie die „formale Abnahme des Projektergebnisses“ der zuständigen Phase nach DIN 69901-2 zu und begründen Sie die Abgrenzung zur anschließenden Phase „Abschluss“.',
      points: 6,
      sampleAnswer: '1. Zuordnung: Die formale Abnahme des Projektergebnisses gehört zur Phase 4 (Steuerung). 2. Begründung und Abgrenzung: Mit der Abnahme wird nachgewiesen, dass die fachliche Umsetzung das vertraglich vereinbarte Ergebnis erbracht hat. Die daran anschließende Phase 5 (Abschluss) befasst sich nicht mehr mit der Produkterstellung, sondern mit der administrativen Projektauflösung (Lessons Learned, Abschlussbericht, Entlastung der Projektleitung und Teamfreigabe).',
      scoringCriteria: [
        '2 Punkte für die korrekte Zuordnung zur Phase Steuerung',
        '4 Punkte für die schlüssige Begründung und Abgrenzung zur Abschlussphase'
      ]
    },
    examinerWarning: 'Achtung: Fast 70 % aller Prüfungsteilnehmer ordnen die Abnahme fälschlicherweise dem Abschluss zu. In DIN 69901-2 gehört die Abnahme des Gegenstands zwingend zur Steuerung!',
    relatedModuleId: 'projphase-6',
    relatedModuleName: 'Seite 6: Phasen 2–4 (Definition, Planung & Steuerung nach DIN 69901-2)'
  },
  'phase 5: geordneter projektabschluss': {
    definition: 'Nachdem die formale Abnahme des Projektergebnisses die Steuerung beendet hat, folgt Phase 5 (Abschluss nach DIN 69901-2). Der Abschluss umfasst vier konstitutive Pflichtelemente: 1. Erstellung des Projektabschlussberichts (Soll-Ist-Abgleich der Ziele und Termine). 2. Kaufmännische Nachkalkulation. 3. Revisionssichere Archivierung. 4. Formale Entlastung der Projektleitung und organisatorische Freigabe des Projektteams. Erst wenn diese Schritte vollzogen sind, gilt das Projekt offiziell als beendet.',
    keywords: ['Phase 5: Abschluss', 'Projektabschlussbericht', 'Formale Entlastung', 'Teamfreigabe', 'Revisionsarchivierung', 'DIN 69901-2'],
    practicalExample: {
      context: 'Nach Auslieferung einer Kampagne fordert der Auftraggeber den Projektabschlussbericht an, um die Projektleiterin formal zu entlasten.',
      application: 'Die Projektleitung fasst Meilensteine, Qualitätsprüfungen und Kostenabweichungen im Abschlussbericht zusammen. Die Geschäftsführung spricht die offizielle Entlastung aus und überführt die Mitarbeiter in neue Projekte.'
    },
    examQuestion: {
      questionText: 'Nennen Sie die vier Pflichtbestandteile eines geordneten Projektabschlusses nach DIN 69901-2 und erklären Sie die Bedeutung der „formalen Entlastung“ der Projektleitung.',
      points: 6,
      sampleAnswer: '1. Die vier Pflichtbestandteile: a) Projektabschlussbericht, b) Nachkalkulation, c) Revisionssichere Archivierung der Projektdokumentation, d) Sicherung der Erfahrungen (Lessons Learned). 2. Formale Entlastung: Bestätigt durch Auftraggeber/Management, dass die Projektleitung ihre Pflichten ordnungsgemäß erfüllt hat, beendet die persönliche Haftung/Verantwortung für das Projekt und gibt das Team für neue Aufgaben frei.',
      scoringCriteria: [
        '4 Punkte für die vier korrekten Abschlussbestandteile',
        '2 Punkte für die präzise Erklärung der formalen Entlastung'
      ]
    },
    examinerWarning: 'Häufiger Fehler: Zu behaupten, ein Projekt ende mit der Übergabe des Produkts. Ohne Abschlussbericht, Nachkalkulation und Entlastung ist das Projekt nach DIN nicht abgeschlossen!',
    relatedModuleId: 'projphase-7',
    relatedModuleName: 'Seite 7: Phase 5: Abschluss & der DIN 69901-2 Gesamt-Kreislauf'
  },
  'nachkalkulation & revisionsarchivierung': {
    definition: 'Die Nachkalkulation vergleicht nach Projektabschluss alle tatsächlich angefallenen Ist-Kosten (Arbeitsstunden, Fremdleistungen, Materialaufwand) mit der Vorkalkulation des Angebots. Sie deckt verdeckte Verluste auf und liefert realistische Kennzahlen für künftige Angebote. Die Revisionsarchivierung stellt sicher, dass Verträge, Freigabeprotokolle, Rechnungen und offene Produktionsdateien strukturiert und auffindbar gesichert werden, um Gewährleistungsansprüche abzusichern und spätere Nachdrucke/Updates zu ermöglichen.',
    keywords: ['Nachkalkulation', 'Soll-Ist-Kostenabgleich', 'Deckungsbeitrag', 'Wirtschaftlichkeitsprüfung', 'Revisionssichere Archivierung', 'Gewährleistung'],
    practicalExample: {
      context: 'In einer Medienagentur stellt sich bei der Nachkalkulation heraus, dass 40 unbezahlte Korrekturstunden angefallen sind.',
      application: 'Die Agentur analysiert die Ursache (mangelhafte Freigaberegeln im Briefing) und passt ihre künftigen Stundensätze und Korrekturschleifen-Klauseln an.'
    },
    examQuestion: {
      questionText: 'Erläutern Sie zwei betriebswirtschaftliche Gründe für die Durchführung einer Nachkalkulation und nennen Sie zwei Anforderungen an eine revisionssichere Projektarchivierung.',
      points: 6,
      sampleAnswer: '1. Gründe für Nachkalkulation: a) Feststellung der tatsächlichen Rentabilität/des Deckungsbeitrags des Projekts; b) Ermittlung realistischer Kennzahlen und Stundensätze zur Schärfung künftiger Angebotskalkulationen. 2. Anforderungen an Archivierung: a) Strukturierte, unveränderbare und rechtssichere Aufbewahrung aller Freigaben/Verträge (Gewährleistung); b) Schnelle Auffindbarkeit aller offenen Quelldaten für Folgeaufträge.',
      scoringCriteria: [
        '3 Punkte für zwei fundierte betriebswirtschaftliche Gründe der Nachkalkulation',
        '3 Punkte für zwei präzise Kriterien der Revisionsarchivierung'
      ]
    },
    examinerWarning: 'Prüfer-Tipp: Bei der Nachkalkulation immer den Lerneffekt für künftige Angebote erwähnen – sie dient nicht nur der Vergangenheitsbewältigung!',
    relatedModuleId: 'projphase-7',
    relatedModuleName: 'Seite 7: Phase 5: Abschluss & der DIN 69901-2 Gesamt-Kreislauf'
  },
  'erfahrungssicherung: lessons learned nutzbar machen': {
    definition: 'Erfahrungssicherung (Lessons Learned) im Sinne von DIN 69901-2 und Christoph Schulze: Nach Projektende richtet sich der Blick oft vorschnell auf das nächste Vorhaben; dadurch geht wertvolles Erfahrungswissen über Fehlannahmen, Reibungspunkte oder erfolgreiche Vorgehensweisen verloren. Kernprinzip: Lessons Learned entfalten nur dann einen nachhaltigen betriebswirtschaftlichen Nutzen, wenn Erkenntnisse nicht ausschließlich dokumentiert, sondern für zukünftige Projekte schnell auffindbar und operativ nutzbar gemacht werden (z. B. in Checklisten, Risikofiltern oder Schätzstandards).',
    keywords: ['Erfahrungssicherung', 'Lessons Learned', 'Auffindbarkeit & Nutzbarkeit', 'Retrospektive', 'Vermeidung von Datenfriedhöfen', 'Organisationales Lernen'],
    practicalExample: {
      context: 'Nach einem Magazin-Relaunch stellt das Team fest, dass das Lektorat zu spät eingebunden wurde.',
      application: 'Anstatt die Erkenntnis in einem Protokoll verstauben zu lassen, aktualisiert das Team die Standard-Checkliste für Phase 3 (Planung) und verankert dort eine Pflichtprüfung des Lektoratstermins.'
    },
    examQuestion: {
      questionText: 'Beschreiben Sie das typische Problem bei der Erfahrungssicherung nach Projekten („Blick nach vorn“) und erklären Sie, wie Lessons Learned gestaltet sein müssen, um nachhaltigen Nutzen zu stiften.',
      points: 6,
      sampleAnswer: '1. Typisches Problem: Teams wenden sich unmittelbar dem nächsten drängenden Projekt zu. Reflexion unterbleibt und Wissen über Schwierigkeiten oder Fehlannahmen geht verloren („Datenfriedhof“ oder Vergessen). 2. Nachhaltige Gestaltung: Erkenntnisse dürfen nicht nur passiv abgeheftet werden, sondern müssen zentral auffindbar sein und direkt in operative Standards (Checklisten, Briefingvorlagen, Qualitätsrichtlinien) für neue Projekte überführt werden.',
      scoringCriteria: [
        '3 Punkte für die präzise Analyse des Problems („sofortiger Blick nach vorn“)',
        '3 Punkte für die Kriterien der nachhaltigen Nutzbarkeit und Auffindbarkeit'
      ]
    },
    examinerWarning: 'Achtung IHK-Falle: Dokumentation allein ist KEINE Erfahrungssicherung! Ohne Auffindbarkeit und Nutzbarkeit in Folgeprojekten ist der Nutzen gleich null.',
    relatedModuleId: 'projphase-7',
    relatedModuleName: 'Seite 7: Phase 5: Abschluss & der DIN 69901-2 Gesamt-Kreislauf'
  },
  'der geschlossene din 69901-2 gesamt-kreislauf': {
    definition: 'Der Projektmanagement-Kreislauf nach DIN 69901-2 (Original-Schaubild Seite 7): Projektmanagement ist ein iteratives, zyklisches System bestehend aus 1. Initialisierung (Projektidee klären), 2. Definition (Ziele und Rahmenbedingungen klären), 3. Planung (Vorgehen strukturieren), 4. Steuerung (Fortschritt steuern) und 5. Abschluss (Erfahrungen sichern). Der Pfeil von Phase 5 zurück zu Phase 1 schließt den Kreislauf: Die gesicherten Erfahrungen und Nachkalkulationen erhöhen unmittelbar die Entscheidungsqualität und Reife zukünftiger Initialisierungsphasen.',
    keywords: ['DIN 69901-2 Kreislauf', '5 Phasen Zyklus', 'Pfeil von Abschluss zu Initialisierung', 'Organisationales Lernen', 'Iteratives Phasenmodell', 'Christoph Schulze Schaubild'],
    practicalExample: {
      context: 'Ein Verlag startet die Planung für das Jahrbuch 2027.',
      application: 'In der Initialisierung greift der Verlag auf den Abschlussbericht und die Lessons Learned des Jahrbuchs 2026 zurück. Papierbestellfristen und Pufferzeiten werden von vornherein realistischer angesetzt.'
    },
    examQuestion: {
      questionText: 'Skizzieren Sie den Projektmanagement-Kreislauf nach DIN 69901-2 mit seinen 5 Phasen und begründen Sie, warum das Modell als geschlossener Kreislauf dargestellt wird.',
      points: 6,
      sampleAnswer: '1. Die 5 Phasen im Kreis: Initialisierung (Projektidee klären) → Definition (Ziele & Rahmenbedingungen) → Planung (Vorgehen strukturieren) → Steuerung (Fortschritt steuern) → Abschluss (Erfahrungen sichern). 2. Begründung des Kreislaufs: Projektmanagement ist ein lernendes System. Erkenntnisse aus dem Abschluss (Erfahrungswerte, Nachkalkulationen, vermiedene Fehler) fließen unmittelbar als Qualitätsstandards in die Initialisierung neuer Vorhaben ein.',
      scoringCriteria: [
        '3 Punkte für die fehlerfreie Reihenfolge und Benennung der 5 DIN-Phasen',
        '3 Punkte für die Begründung des geschlossenen Kreislaufs (Erfahrungstransfer)'
      ]
    },
    examinerWarning: 'Zeichne oder beschreibe in der Prüfung immer die Pfeilrichtung von Phase 5 (Abschluss) zurück zu Phase 1 (Initialisierung) – das ist der Kern des kontinuierlichen Verbesserungsprozesses!',
    relatedModuleId: 'projphase-7',
    relatedModuleName: 'Seite 7: Phase 5: Abschluss & der DIN 69901-2 Gesamt-Kreislauf'
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
