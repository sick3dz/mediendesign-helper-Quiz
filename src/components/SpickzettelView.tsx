import React, { useState } from 'react';
import { CHAPTERS } from '../data/chaptersData';
import { BionicText } from '../utils/bionicReading';
import { BookOpen, Sparkles, CheckSquare, Search, Copy, Check, ArrowLeft } from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  bionic: boolean;
  onBack?: () => void;
}

export const SpickzettelView: React.FC<Props> = ({ bionic, onBack }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    soundEffects.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickComparisons = [
    {
      id: 'cmp-1',
      title: 'Die goldene Kette: Wireframe vs. Mockup vs. Prototyp vs. Entwicklung',
      formula: 'Wireframe = Aufbau | Mockup = Aussehen | Prototyp = Bedienung | Entwicklung = Funktion',
      rows: [
        { term: 'Wireframe', focus: 'Aufbau & Struktur', visual: 'Schwarz-Weiß, Boxen', interaction: 'Keine', goal: 'Inhalte & Hierarchie klären' },
        { term: 'Mockup', focus: 'Aussehen & Ästhetik', visual: 'Farben, Schriften, Bilder', interaction: 'Keine (statisches Bild)', goal: 'Visuelles Branding prüfen' },
        { term: 'Prototyp', focus: 'Bedienung & Interaktion', visual: 'Klickbare Screens', interaction: 'Ja (simuliert)', goal: 'Usability & Abläufe vor Code testen' },
        { term: 'Entwicklung', focus: 'Reale Umsetzung', visual: 'Fertige Software', interaction: 'Vollständig mit Daten', goal: 'Einsatzbereites Produkt' },
      ]
    },
    {
      id: 'cmp-2',
      title: 'Lastenheft vs. Pflichtenheft (Prüfungsdauerbrenner!)',
      formula: 'Lastenheft = WAS will der Kunde? | Pflichtenheft = WIE setzt die Agentur es um?',
      rows: [
        { term: 'Lastenheft', focus: 'WAS soll erreicht werden?', visual: 'Auftraggeber (Kunde)', interaction: 'Anforderungen & Wünsche', goal: 'Basis für Angebot' },
        { term: 'Pflichtenheft', focus: 'WIE wird es konkret realisiert?', visual: 'Auftragnehmer (Agentur)', interaction: 'Technische Spezifikation', goal: 'Vertragliche Umsetzung' },
      ]
    },
    {
      id: 'cmp-3',
      title: 'Affordance vs. Signifier (Donald Norman)',
      formula: 'Affordance = Handlungsmöglichkeit | Signifier = Signalisiert die Handlung',
      rows: [
        { term: 'Affordance', focus: 'Was KANN man tun?', visual: 'Physische Form (Türgriff, 3D-Button)', interaction: 'Greifen, Drücken', goal: 'Intuitives Erkennen' },
        { term: 'Signifier', focus: 'WO und WIE handeln?', visual: 'Schild "Ziehen", Pfeilsymbol', interaction: 'Hinweis / Markierung', goal: 'Eindeutige Handlungsanweisung' },
      ]
    },
    {
      id: 'cmp-4',
      title: 'Datenschutz vs. Datensicherheit',
      formula: 'Datenschutz schützt die Person | Datensicherheit schützt die Daten',
      rows: [
        { term: 'Datenschutz', focus: 'Personenbezogene Daten (Privatsphäre)', visual: 'DSGVO / Gesetzlich', interaction: 'Recht auf informationelle Selbstbestimmung', goal: 'Missbrauch verhindern' },
        { term: 'Datensicherheit', focus: 'Alle Unternehmens- & Kundendaten', visual: 'Technisch & organisatorisch', interaction: 'Backups, Verschlüsselung, USV, 2FA', goal: 'Schutz vor Verlust & Angriff' },
      ]
    },
    {
      id: 'cmp-5',
      title: 'Relationale Datenbanken & SQL (Prüfungswissen)',
      formula: 'Primärschlüssel = Eindeutige ID | Fremdschlüssel = Verbindung | Zwischentabelle = Löst n:m auf',
      rows: [
        { term: 'Primärschlüssel (PK)', focus: 'Eindeutige Identifikation', visual: 'z. B. Kunden_ID = 502', interaction: 'Verhindert Namensverwechslung', goal: 'Einzigartigkeit jedes Datensatzes' },
        { term: 'Fremdschlüssel (FK)', focus: 'Tabellenverknüpfung', visual: 'Kunden_ID in Tabelle Projekte', interaction: 'Verweist auf Primärschlüssel', goal: 'Single Source of Truth' },
        { term: 'CRUD-Befehle', focus: 'SQL-Grundoperationen', visual: 'INSERT, SELECT, UPDATE, DELETE', interaction: 'Daten schreiben, lesen, ändern, löschen', goal: 'Immer WHERE prüfen!' },
        { term: 'Zwischentabelle', focus: 'n:m-Beziehungen auflösen', visual: 'Tabelle Projekt_Bilder', interaction: 'Projekt_ID & Bild_ID als Fremdschlüssel', goal: 'Normalisierte Verknüpfung' },
      ]
    },
    {
      id: 'cmp-6',
      title: 'JSON vs. XML (IHK-Prüfungsdauerbrenner)',
      formula: 'JSON = Schlanke Schlüssel-Wert-Paare ({}, []) | XML = Tag-basiert mit schließenden Tags (<tag></tag>)',
      rows: [
        { term: 'Syntax & Tags', focus: 'Bauweise & Kompaktheit', visual: 'JSON: { "name": "Anna" } | XML: <name>Anna</name>', interaction: 'JSON verzichtet auf schließende Tags', goal: 'Geringere Dateigröße & schnellere Ladezeit' },
        { term: 'Parsing & Speed', focus: 'Verarbeitungszeit', visual: 'Nativ in JavaScript ohne Parser-Bibliothek', interaction: 'Direkte Verarbeitung im Webbrowser', goal: 'Extrem schnelle Lade- & Rechenzeit' },
        { term: 'Datentypen', focus: 'Typisierung', visual: 'String, Number (42), Boolean (true), Null, Array, Object', interaction: 'XML speichert alles als reinen Text/String', goal: 'Direkte Nutzung ohne Typ-Casting' },
        { term: 'Web-APIs', focus: 'Datenaustausch Client/Server', visual: 'Server liefert JSON -> Frontend baut Design', interaction: 'Standard moderner Single-Page-Apps', goal: 'Trennung von Daten und Präsentation' },
      ]
    },
    {
      id: 'cmp-7',
      title: 'Layoutbasiert vs. Strukturbasiert / Medienneutral (IHK-Schwerpunkt)',
      formula: 'Layoutbasiert = Inhalt fest im Layout verklebt | Strukturbasiert (SSP) = Neutrale Daten + Templates je Kanal',
      rows: [
        { term: 'Layoutbasierter Workflow', focus: 'Direkte Gestaltung', visual: 'Text direkt in InDesign getippt', interaction: 'Formatierung direkt am Text („fett 24pt“)', goal: 'Schnell für Einzeldruck, starr bei Medienwechsel' },
        { term: 'Strukturbasierter Workflow', focus: 'Medienneutralität (SSP)', visual: 'Datenbank, XML, JSON', interaction: 'Semantische Rollen (H1, Preis, Bildrechte)', goal: 'Ein Datenbestand steuert Web, Print, App & Newsletter' },
        { term: 'Änderungsaufwand', focus: 'Aktualisierungen', visual: 'Layout: Jeder Kanal manuell | Struktur: 1x zentral', interaction: 'Single Source of Truth', goal: 'Beseitigt Redundanzen & spart Korrekturzeit' },
        { term: 'Qualitätskontrolle', focus: 'Fehlervermeidung', visual: 'Pflichtfelder, Preise, Bildrechte, CMYK/RGB', interaction: 'Strikte Prüfung vor Ausspielung', goal: 'Verhindert Fehlerausbreitung in alle Kanäle' },
      ]
    },
    {
      id: 'cmp-8',
      title: 'Das XML-Ökosystem & die 4er-Prüfungskette',
      formula: 'XML (speichert Daten) → DTD/XSD (prüft/validiert) → XPath (sucht Adresse) → XSLT (macht Design/HTML)',
      rows: [
        { term: 'Wohlgeformtheit (Well-formed)', focus: 'Syntax-Gültigkeit', visual: '1 Root, </tag>, kein Überkreuzen, Case-Sensitive', interaction: 'Verletzung führt zum Programmabsturz!', goal: 'Grundvoraussetzung für jeden Parser' },
        { term: 'DTD & Schema (XSD)', focus: 'Das Daten-„Gesetzbuch“', visual: '<name> ist Pflicht, <farbe> ist optional', interaction: 'Definiert erlaubte Tags & Reihenfolge', goal: 'Strukturelle Validierung aller Dokumente' },
        { term: 'XPath', focus: 'Adressierung im Baum', visual: '/shop/produkt/preis', interaction: 'Findet gezielt Knoten & Attribute (@waehrung)', goal: 'Präziser Datenzugriff ohne Suchen' },
        { term: 'XSLT', focus: 'Design-Transformation', visual: 'XML (Rohdaten) + XSLT (Vorlage) = HTML', interaction: 'Wandelt medienneutrale Daten ins Ausgabelayout', goal: 'Perfekte Trennung von Inhalt und Form' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kapitelübersicht</span>
          </button>
        </div>
      )}

      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Prüfungs-Spickzettel & Merksätze</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Alle IHK-Merksätze & Schnell-Vergleiche
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <BionicText
            text="Kompakte Formeln zum blitzschnellen Einprägen vor der Prüfung. Auswendig können statt seitenlangem Blättern!"
            enabled={bionic}
          />
        </p>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Nach Begriffen suchen (z. B. Affordance, Lastenheft, WCAG, Wireframe)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Quick Comparison Tables */}
      <section className="space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Die wichtigsten Prüfungs-Unterschiede</h3>

        <div className="space-y-4">
          {quickComparisons
            .filter(c => !searchTerm || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.formula.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(cmp => (
              <div key={cmp.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cmp.title}</h4>
                  <button
                    onClick={() => copyToClipboard(cmp.formula, cmp.id)}
                    className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                    title="Merksatz kopieren"
                  >
                    {copiedId === cmp.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === cmp.id ? 'Kopiert' : 'Kopieren'}</span>
                  </button>
                </div>

                <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-900 dark:text-indigo-300 mb-3.5 font-mono">
                  💡 {cmp.formula}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="py-2 px-3">Begriff</th>
                        <th className="py-2 px-3">Frage / Fokus</th>
                        <th className="py-2 px-3">Erscheinung</th>
                        <th className="py-2 px-3">Hauptziel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {cmp.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">{row.term}</td>
                          <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{row.focus}</td>
                          <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{row.visual}</td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-300">{row.goal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Official Merksätze by Chapter */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Kapitel-Merksätze (Wort für Wort prüfungsrelevant)</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHAPTERS.map(ch => (
            <div key={ch.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                  Kapitel {ch.number} · {ch.title}
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium italic mt-2 leading-relaxed">
                  "{ch.examMerksatz}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Checkliste:</span>
                {ch.examChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                    <CheckSquare className="w-3 h-3 text-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Page 62 PDF Bonus: "Diese Bereiche nicht vergessen!" */}
      <section className="bg-amber-50/80 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 p-6 transition-colors">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>PDF-Tipp (Seite 62): Diese Bereiche nicht vergessen!</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            📌 Plakatkampagne
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">Fernwirkung, 3-Sekunden-Regel, Hierarchie</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            📌 Piktogramme
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">Universelle Verständlichkeit, Reduktion</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            📌 Gestaltungsprozess
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">Briefing → Scribble → Layout → Reinzeichnung</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
            📌 Druckkosten
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">Offset vs. Digitaldruck, Auflagen, Papiergewicht</p>
          </div>
        </div>
      </section>
    </div>
  );
};
