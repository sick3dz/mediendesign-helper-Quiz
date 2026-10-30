import React, { useState, useRef } from 'react';
import { CHAPTERS } from '../data/chaptersData';
import { DIGITAL_GUIDE_TOPICS, DigitalTopic } from '../data/digitalGuideData';
import { BionicText } from '../utils/bionicReading';
import {
  BookOpen,
  Sparkles,
  CheckSquare,
  Search,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Monitor,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Clock,
  Database,
  MousePointer,
  XCircle,
  Zap,
  Lightbulb,
  Filter,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  bionic: boolean;
  onBack?: () => void;
}

export const SpickzettelView: React.FC<Props> = ({ bionic, onBack }) => {
  const [activeTab, setActiveTab] = useState<'digital-guide' | 'comparisons' | 'chapters'>('digital-guide');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const topicCardRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    soundEffects.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectTopic = (index: number) => {
    soundEffects.playClick();
    setSelectedTopicIndex(index);
    setTimeout(() => {
      topicCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
    MousePointer: <MousePointer className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
    Layers: <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
    Monitor: <Monitor className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-500" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    Clock: <Clock className="w-5 h-5 text-amber-500" />,
    Database: <Database className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
  };

  // Categories list
  const categories = ['all', ...Array.from(new Set(DIGITAL_GUIDE_TOPICS.map(t => t.category)))];

  // Filtered topics based on search term or category
  const filteredTopics = DIGITAL_GUIDE_TOPICS.filter(topic => {
    const matchesSearch =
      !searchTerm ||
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.ihkFocusSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.keyConcepts.some(k =>
        k.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.explanation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeTopic: DigitalTopic = DIGITAL_GUIDE_TOPICS[selectedTopicIndex] || DIGITAL_GUIDE_TOPICS[0];
  const prevTopicIndex = selectedTopicIndex > 0 ? selectedTopicIndex - 1 : null;
  const nextTopicIndex = selectedTopicIndex < DIGITAL_GUIDE_TOPICS.length - 1 ? selectedTopicIndex + 1 : null;

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
    <div className="max-w-4xl mx-auto space-y-6">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kapitelübersicht</span>
          </button>
        </div>
      )}

      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1.5 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>IHK Digital-Leitfaden & Prüfungs-Spickzettel</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          IHK-Wissen für Digitalmedien (Ohne Print)
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
          <BionicText
            text="Die Verordnung fokussiert rein digitale Medien, Usability, Barrierefreiheit & Web-Entwicklung. Nutze diesen Kapitel-Slider für zielgerichtetes Lernen ohne langes Scrollen!"
            enabled={bionic}
          />
        </p>

        {/* Primary Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mt-5 p-1 sm:p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('digital-guide');
            }}
            className={`py-2 px-1 sm:px-3 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
              activeTab === 'digital-guide'
                ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Digital-Leitfaden</span>
            <span className="sm:hidden whitespace-nowrap text-[11px] font-bold">Leitfaden</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('comparisons');
            }}
            className={`py-2 px-1 sm:px-3 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
              activeTab === 'comparisons'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200 dark:border-slate-700'
                : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Schnell-Vergleiche</span>
            <span className="sm:hidden whitespace-nowrap text-[11px] font-bold">Vergleiche</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('chapters');
            }}
            className={`py-2 px-1 sm:px-3 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
              activeTab === 'chapters'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200 dark:border-slate-700'
                : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Kapitel-Merksätze</span>
            <span className="sm:hidden whitespace-nowrap text-[11px] font-bold">Merksätze</span>
          </button>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Live-Suche (z. B. WCAG, SQL, Persona, DSGVO, SVG)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'Alle Themen' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: Digital-Fokus Leitfaden mit Kapitel-Slider */}
      {activeTab === 'digital-guide' && (
        <div className="space-y-4">
          {/* Print Change Info Alert */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs">
            <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-amber-900 dark:text-amber-200 block mb-0.5">
                Prüfungsfokus: Kein reiner Print mehr!
              </span>
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed text-[11px] font-medium">
                Offset-Druckmängel rücken in den Hintergrund. Die IHK prüft stattdessen vertieft <strong>Interaktionsdesign</strong>, <strong>Responsive Design</strong>, <strong>Barrierefreiheit (WCAG)</strong>, <strong>DSGVO</strong> & <strong>APIs</strong>.
              </p>
            </div>
          </div>

          {/* Interactive Chapter Slider Nav Pills (Visible when not searching) */}
          {!searchTerm && selectedCategory === 'all' && (
            <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                <span>Kapitel-Navigation währen:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Kapitel {selectedTopicIndex + 1} von {DIGITAL_GUIDE_TOPICS.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DIGITAL_GUIDE_TOPICS.map((topic, tIdx) => {
                  const isSelected = tIdx === selectedTopicIndex;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleSelectTopic(tIdx)}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600'
                      }`}
                    >
                      <div
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider mb-0.5 ${
                          isSelected ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        KAPITEL {tIdx + 1}
                      </div>
                      <div className="line-clamp-2 text-[11px] font-bold leading-tight">
                        {topic.title.replace(/^\d+\.\s*(★\s*)?/, '')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single Focused Topic Content or Search Results */}
          <div ref={topicCardRef} className="scroll-mt-20">
            {searchTerm || selectedCategory !== 'all' ? (
              /* Search / Category Filter View */
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {filteredTopics.length} Suchergebnisse gefunden:
                </div>
                {filteredTopics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} bionic={bionic} iconMap={iconMap} />
                ))}
              </div>
            ) : (
              /* Single Topic Slider View */
              <div className="space-y-4">
                <TopicCard topic={activeTopic} bionic={bionic} iconMap={iconMap} />

                {/* Bottom Paging Slider Navigation */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  {prevTopicIndex !== null ? (
                    <button
                      onClick={() => handleSelectTopic(prevTopicIndex)}
                      className="h-9 px-3 sm:px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs max-w-full"
                      title={`Zu Kapitel ${prevTopicIndex + 1}: ${DIGITAL_GUIDE_TOPICS[prevTopicIndex].title}`}
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline truncate max-w-[220px]">
                        Kapitel {prevTopicIndex + 1}: {DIGITAL_GUIDE_TOPICS[prevTopicIndex].title.replace(/^\d+\.\s*(★\s*)?/, '')}
                      </span>
                      <span className="sm:hidden whitespace-nowrap">
                        Kapitel {prevTopicIndex + 1}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                    Kapitel {selectedTopicIndex + 1} / {DIGITAL_GUIDE_TOPICS.length}
                  </span>

                  {nextTopicIndex !== null ? (
                    <button
                      onClick={() => handleSelectTopic(nextTopicIndex)}
                      className="h-9 px-3 sm:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ml-auto max-w-full"
                      title={`Zu Kapitel ${nextTopicIndex + 1}: ${DIGITAL_GUIDE_TOPICS[nextTopicIndex].title}`}
                    >
                      <span className="hidden sm:inline truncate max-w-[220px]">
                        Weiter zu Kapitel {nextTopicIndex + 1}: {DIGITAL_GUIDE_TOPICS[nextTopicIndex].title.replace(/^\d+\.\s*(★\s*)?/, '')}
                      </span>
                      <span className="sm:hidden whitespace-nowrap">
                        Kapitel {nextTopicIndex + 1}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveTab('comparisons');
                      }}
                      className="h-9 px-3 sm:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ml-auto"
                    >
                      <span className="hidden sm:inline">Weiter zu Schnell-Vergleichen</span>
                      <span className="sm:hidden">Zu Vergleichen</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            )}
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
                      className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
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

                  <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/50 rounded-xl border border-indigo-100 dark:border-indigo-900/60 text-xs font-bold text-indigo-950 dark:text-indigo-200 mb-3.5 font-mono">
                    💡 {cmp.formula}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="py-2.5 px-3">Begriff</th>
                          <th className="py-2.5 px-3">Frage / Fokus</th>
                          <th className="py-2.5 px-3">Erscheinung</th>
                          <th className="py-2.5 px-3">Hauptziel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {cmp.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                            <td className="py-2.5 px-3 font-extrabold text-slate-900 dark:text-white">
                              {row.term}
                            </td>
                            <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200 font-medium">{row.focus}</td>
                            <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{row.visual}</td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-200 font-medium">{row.goal}</td>
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
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Kapitel {ch.number} · {ch.title}
                  </span>
                  <p className="text-xs text-slate-900 dark:text-slate-100 font-semibold italic mt-2 leading-relaxed">
                    "{ch.examMerksatz}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Checkliste:
                  </span>
                  {ch.examChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <CheckSquare className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{item.task}</span>
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

/* Subcomponent for rendering a single Topic Card */
const TopicCard: React.FC<{
  topic: DigitalTopic;
  bionic: boolean;
  iconMap: Record<string, React.ReactNode>;
}> = ({ topic, bionic, iconMap }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/60 shrink-0">
            {iconMap[topic.iconName] || <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
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
        <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">
          {topic.ihkFocusSummary}
        </span>
      </div>

      {/* Shift comparison: What falls away vs. What is tested */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60">
          <div className="flex items-center gap-1.5 font-extrabold text-rose-800 dark:text-rose-200 mb-1">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Tritt in den Hintergrund (Print)</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-medium">{topic.whatFailsAway}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60">
          <div className="flex items-center gap-1.5 font-extrabold text-emerald-800 dark:text-emerald-200 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Wird vertieft geprüft (Digital)</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-medium">{topic.whatIsNewAndTested}</p>
        </div>
      </div>

      {/* Key Concepts List */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Die wichtigsten IHK-Schlüsselkonzepte:
        </h4>
        <div className="grid grid-cols-1 gap-2.5">
          {topic.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700"
            >
              <div className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                📌 {concept.term}
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <BionicText text={concept.explanation} enabled={bionic} />
              </p>
              {concept.examTip && (
                <div className="mt-2 text-[11px] font-bold text-indigo-800 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 inline-block">
                  🎯 IHK-Prüfungs-Tipp: {concept.examTip}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
