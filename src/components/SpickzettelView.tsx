import React, { useState } from 'react';
import { CHAPTERS } from '../data/chaptersData';
import { DIGITAL_GUIDE_TOPICS } from '../data/digitalGuideData';
import { BionicText } from '../utils/bionicReading';
import {
  BookOpen,
  Sparkles,
  CheckSquare,
  Search,
  Copy,
  Check,
  ArrowLeft,
  Monitor,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Clock,
  Database,
  MousePointer,
  XCircle,
  Zap,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  bionic: boolean;
  onBack?: () => void;
}

export const SpickzettelView: React.FC<Props> = ({ bionic, onBack }) => {
  const [activeTab, setActiveTab] = useState<'digital-guide' | 'comparisons' | 'chapters'>('digital-guide');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    soundEffects.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
    MousePointer: <MousePointer className="w-5 h-5 text-indigo-500" />,
    Layers: <Layers className="w-5 h-5 text-indigo-500" />,
    Monitor: <Monitor className="w-5 h-5 text-indigo-500" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-500" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    Clock: <Clock className="w-5 h-5 text-amber-500" />,
    Database: <Database className="w-5 h-5 text-indigo-500" />,
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
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Prüfungs-Spickzettel & IHK Digital-Leitfaden</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          IHK-Wissen für Digitalmedien (Ohne Print)
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <BionicText
            text="Die Ausbildungsverordnung setzt verstärkt auf rein digitale Medien, Usability, Barrierefreiheit & Web-Entwicklung. Nutze diese Zusammenfassung für deine gezielte Prüfungsvorbereitung!"
            enabled={bionic}
          />
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('digital-guide');
            }}
            className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'digital-guide'
                ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>IHK Digital-Fokus Leitfaden</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('comparisons');
            }}
            className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'comparisons'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Schnell-Vergleiche</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('chapters');
            }}
            className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'chapters'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Kapitel-Merksätze</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Nach Begriffen suchen (z. B. WCAG, SQL, Wireframe, DSGVO, SVG)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* TAB 1: IHK Digital-Fokus Leitfaden */}
      {activeTab === 'digital-guide' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs">
            <span className="text-xl shrink-0">💡</span>
            <div>
              <span className="font-extrabold text-amber-900 dark:text-amber-200 block mb-0.5">
                Was ändert sich durch den Entfall von reinem Print?
              </span>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                Klassische Offset-Druckmängel, Bogenausschießung und Farbdichtemessungen rücken in den Hintergrund. Die IHK prüft stattdessen vertieft <strong>Interaktionsdesign (IxD)</strong>, <strong>Responsive Web-Design</strong>, <strong>Barrierefreiheit (WCAG 2.2)</strong>, <strong>IT-Sicherheit/DSGVO</strong> sowie <strong>Datenbanken & Schnittstellen</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {DIGITAL_GUIDE_TOPICS.filter(
              t =>
                !searchTerm ||
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.ihkFocusSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.keyConcepts.some(k => k.term.toLowerCase().includes(searchTerm.toLowerCase()))
            ).map(topic => (
              <div
                key={topic.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60">
                      {iconMap[topic.iconName] || <BookOpen className="w-5 h-5 text-indigo-500" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {topic.category}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {topic.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {topic.ihkFocusSummary}
                  </span>
                </div>

                {/* Shift comparison: What falls away vs. What is tested */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                    <div className="flex items-center gap-1.5 font-extrabold text-rose-700 dark:text-rose-300 mb-1">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Tritt in den Hintergrund (Print)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{topic.whatFailsAway}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                    <div className="flex items-center gap-1.5 font-extrabold text-emerald-700 dark:text-emerald-300 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Wird vertieft geprüft (Digital)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{topic.whatIsNewAndTested}</p>
                  </div>
                </div>

                {/* Key Concepts List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Die wichtigsten IHK-Schlüsselkonzepte:
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {topic.keyConcepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750"
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          📌 {concept.term}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {concept.explanation}
                        </p>
                        {concept.examTip && (
                          <div className="mt-2 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-200/50 dark:border-indigo-800/50 inline-block">
                            🎯 IHK-Prüfungs-Tipp: {concept.examTip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Quick Comparison Tables */}
      {activeTab === 'comparisons' && (
        <section className="space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Schnell-Vergleiche & Prüfungsformeln
          </h3>

          <div className="space-y-4">
            {quickComparisons
              .filter(
                c =>
                  !searchTerm ||
                  c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  c.formula.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(cmp => (
                <div
                  key={cmp.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cmp.title}</h4>
                    <button
                      onClick={() => copyToClipboard(cmp.formula, cmp.id)}
                      className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                      title="Merksatz kopieren"
                    >
                      {copiedId === cmp.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
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
                            <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                              {row.term}
                            </td>
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
      )}

      {/* TAB 3: Official Merksätze by Chapter */}
      {activeTab === 'chapters' && (
        <section className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Kapitel-Merksätze (Wort für Wort prüfungsrelevant)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTERS.map(ch => (
              <div
                key={ch.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                    Kapitel {ch.number} · {ch.title}
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium italic mt-2 leading-relaxed">
                    "{ch.examMerksatz}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Checkliste:
                  </span>
                  {ch.examChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400"
                    >
                      <CheckSquare className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

