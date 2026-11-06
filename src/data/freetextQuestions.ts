export interface FreetextQuestion {
  id: string;
  category: string;
  title: string;
  question: string;
  maxPoints: number;
  requiredKeywords: string[];
  modelAnswer: string;
  hint: string;
}

export const FREETEXT_QUESTIONS: FreetextQuestion[] = [
  {
    id: 'ft-1',
    category: 'Kapitel 1: UX & Interaktionsdesign',
    title: 'Gestaltsgesetze in der Web-UI',
    question: 'Erläutere das Gestaltgesetz der "Gleichheit" (Similarity) und beschreibe ein konkretes Anwendungsbeispiel in einer modernen Web-Oberfläche.',
    maxPoints: 10,
    requiredKeywords: ['gleichheit', 'similarity', 'ähnlichkeit', 'optisch', 'elemente', 'gruppe', 'zusammengehörigkeit', 'farbe', 'form'],
    modelAnswer: 'Das Gestaltgesetz der Gleichheit besagt, dass visuelle Elemente mit ähnlichen Eigenschaften (z.B. gleiche Farbe, Form, Größe oder Textur) vom menschlichen Gehirn automatisch als zusammengehörend oder als Gruppe wahrgenommen werden. Ein typisches Anwendungsbeispiel in einer Web-UI sind Produktkarten in einem Onlineshop: Alle "In den Warenkorb"-Buttons besitzen exakt dieselbe blaue Hintergrundfarbe und abgerundete Form, wodurch der Nutzer sofort erkennt, dass sie die gleiche funktionale Bedeutung haben.',
    hint: 'Denke an visuelle Merkmale wie Farbe, Form oder Größe und deren Wirkung auf die Gruppierung im UI.',
  },
  {
    id: 'ft-2',
    category: 'Kapitel 4: IT-Sicherheit & DSGVO',
    title: 'Datenschutz-Grundverordnung (DSGVO) - Recht auf Vergessenwerden',
    question: 'Beschreibe das "Recht auf Vergessenwerden" (Art. 17 DSGVO). Unter welchen Bedingungen kann eine betroffene Person die Löschung ihrer personenbezogenen Daten verlangen?',
    maxPoints: 12,
    requiredKeywords: ['dsgvo', 'löschung', 'personenbezogene', 'daten', 'einwilligung', 'widerruf', 'zweck', 'unrechtmäßig'],
    modelAnswer: 'Das Recht auf Vergessenwerden nach Art. 17 DSGVO gibt betroffenen Personen das Recht, von einem Verantwortlichen die unverzügliche Löschung ihrer personenbezogenen Daten zu verlangen. Dies gilt u.a., wenn: 1. Die Daten für die Zwecke, für die sie erhoben wurden, nicht mehr notwendig sind, 2. Die Einwilligung widerrufen wurde und keine andere Rechtsgrundlage vorliegt, 3. Die Daten unrechtmäßig verarbeitet wurden, oder 4. Eine gesetzliche Löschungspflicht besteht. Ausnahmen gelten z.B. für die Meinungsfreiheit oder rechtliche Aufbewahrungspflichten.',
    hint: 'Beziehe dich auf Art. 17 DSGVO, den Zweck der Datenerhebung und den Widerruf von Einwilligungen.',
  },
  {
    id: 'ft-3',
    category: 'Kapitel 7 & 8: Medientechnik & Bilddaten',
    title: 'Medienneutralität / Single Source Publishing',
    question: 'Erläutere den Begriff der Medienneutralität (Single Source Publishing) im Rahmen der Medienproduktion. Warum sollten Bild- und Text-Assets in einem medienneutralen Master-Archiv vorgehalten werden?',
    maxPoints: 10,
    requiredKeywords: ['medienneutralität', 'single source', 'publishing', 'format', 'ausgabe', 'print', 'digital', 'farbraum', 'rgb', 'cmyk'],
    modelAnswer: 'Medienneutralität bedeutet, dass Inhalte (Text, Bild, Vektoren) unabhängig von einem spezifischen Ausgabekanal (z.B. Print-Flyer, Website, Social Media oder App) in einem universellen, verlustfreien Master-Format gespeichert werden. Durch Single Source Publishing vermeidet man Medienbrüche: Assets werden zentral gepflegt und erst beim Export automatisch in den jeweiligen Ziel-Farbraum (z.B. RGB für Web, CMYK für Offsetdruck) konvertiert. Dies spart Zeit, vermeidet Redundanzen und sichert konsistente Qualität.',
    hint: 'Erkläre die Trennung von Inhalt und Ausgabekanal sowie die Bedeutung für Print und Digital.',
  },
  {
    id: 'ft-4',
    category: 'Kapitel 10: WiSo & Arbeitsrecht',
    title: 'Probezeit und Kündigungsschutz im Ausbildungsverhältnis',
    question: 'Beschreibe die gesetzlichen Bestimmungen zur Probezeit nach dem Berufsbildungsgesetz (BBiG) und erläutere, wie in dieser Zeit gekündigt werden kann.',
    maxPoints: 12,
    requiredKeywords: ['probezeit', 'bbig', 'monate', 'fristlos', 'ohne grund', 'schriftform', 'papier', 'paragraf 20'],
    modelAnswer: 'Nach § 20 BBiG muss das Ausbildungsverhältnis mit einer Probezeit beginnen. Die gesetzliche Höchstdauer beträgt 4 Monate (mindestens 1 Monat). Während dieser Probezeit kann das Ausbildungsverhältnis von beiden Vertragspartnern jederzeit fristlos und ohne Angabe von Gründen gekündigt werden (§ 22 Abs. 1 BBiG). Die Kündigung bedarf zwingend der Schriftform auf Papier mit eigenhändiger Unterschrift (§ 623 BGB); digitale Kündigungen per E-Mail oder WhatsApp sind unwirksam.',
    hint: 'Nenne die Dauer laut BBiG, die Fristlosigkeit und die zwingende Schriftform.',
  },
  {
    id: 'ft-5',
    category: 'Kapitel 5: Barrierefreiheit (WCAG 2.1)',
    title: 'WCAG-Prinzip "Wahrnehmbarkeit" (Perceivable)',
    question: 'Erläutere das erste Prinzip der WCAG 2.1 ("Wahrnehmbar" / Perceivable). Welche konkreten Anforderungen müssen für visuelle und auditive Inhalte erfüllt sein?',
    maxPoints: 10,
    requiredKeywords: ['wahrnehmbar', 'perceivable', 'kontrast', 'alternativtext', 'alt-text', 'untertitel', 'vorlesefunktion', 'screenreader'],
    modelAnswer: 'Das Prinzip "Wahrnehmbar" (Perceivable) besagt, dass Informationen und Benutzeroberflächenelemente den Benutzern so präsentiert werden müssen, dass sie diese wahrnehmen können (d.h. sie dürfen sich nicht auf einen einzigen Sinneskanal verlassen). Konkrete Anforderungen sind: 1. Alternativtexte (Alt-Texte) für Bilder und Grafiken für Screenreader-Nutzer, 2. Untertitel und Transkripte für Audio- und Videoinhalte, 3. Ausreichende Farbkontraste (mind. 4.5:1 für Normaltext) und 4. Skalierbarkeit von Texten ohne Informationsverlust.',
    hint: 'Nenne Screenreader-Alternativen für Bilder, Untertitel für Videos und Kontrastvorgaben.',
  },
  {
    id: 'ft-6',
    category: 'Kapitel 2 & 6: Projektmanagement & Workflow',
    title: 'Scrum-Rollen und Sprints',
    question: 'Beschreibe die drei Kernrollen im Scrum-Framework sowie die Funktion eines "Sprints".',
    maxPoints: 12,
    requiredKeywords: ['scrum', 'product owner', 'scrum master', 'developer', 'entwicklungsteam', 'sprint', 'inkrement', 'ziel'],
    modelAnswer: 'Die drei Kernrollen in Scrum sind: 1. Product Owner (verantwortlich für das Product Backlog und die geschäftliche Priorisierung), 2. Scrum Master (Agiler Coach, schützt das Team vor Störungen und unterstützt den Scrum-Prozess), und 3. Developers / Entwicklerteam (selbstorganisiertes Team, das das nutzbare Produkt-Inkrement umsetzt). Ein Sprint ist ein zeitlich fixer Iterationszeitraum (meist 2 bis 4 Wochen), in dem ein potenziell auslieferbares Produkt-Inkrement erstellt wird.',
    hint: 'Erkläre Product Owner, Scrum Master, Developer und die Definition des Sprints.',
  },
];
