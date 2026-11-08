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
