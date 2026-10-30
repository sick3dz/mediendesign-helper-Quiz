import React, { useState, useEffect, useRef } from 'react';
import {
  Code,
  FileJson,
  FileCode,
  FileText,
  Info,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Layout,
  Layers,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Grid,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';
import { BionicText } from '../utils/bionicReading';

type DataFormat = 'json' | 'xml' | 'markdown';

interface Props {
  bionic: boolean;
  onBack?: () => void;
}

interface IhkFinding {
  id: string;
  type: 'error' | 'warning';
  message: string;
  canFix: boolean;
  fixLabel?: string;
  fixAction?: () => string;
}

const EXAMPLES: Record<DataFormat, string> = {
  json: `{
  "produkt": "Design-Tablet",
  "preis": 599.99,
  "verfuegbar": true,
  "features": ["4K Display", "Stylus inkl."],
  "hersteller": {
    "name": "TechArt",
    "land": "Deutschland"
  }
}`,
  xml: `<produkt id="tab-001">
  <name>Design-Tablet</name>
  <preis waehrung="EUR">599.99</preis>
  <verfuegbar>true</verfuegbar>
  <features>
    <item>4K Display</item>
    <item>Stylus inkl.</item>
  </features>
</produkt>`,
  markdown: `# Projekt: Launch Kampagne
  
## Aufgabenliste
- [x] Wireframes erstellen
- [ ] Mockup finalisieren
- [ ] Prototyp testen

Wichtig: Die **Deadline** ist am Freitag!
[Mehr Infos hier](https://ihk.de)`,
};

const SNIPPETS: Record<string, { label: string; format: DataFormat; code: string; tip: string; isExample?: boolean }> = {
  // --- FULL EXAMPLES ---
  json_example: {
    label: 'Beispiel: Event',
    format: 'json',
    isExample: true,
    code: `{
  "event": "Design-Night 2026",
  "datum": "2026-11-15",
  "tickets": [
    { "typ": "Standard", "preis": 49.00 },
    { "typ": "VIP", "preis": 129.00 }
  ],
  "aktiv": true
}`,
    tip: 'Ein vollständiger Datensatz zur Veranschaulichung der Struktur.',
  },
  xml_example: {
    label: 'Beispiel: Kurs',
    format: 'xml',
    isExample: true,
    code: `<kurs id="K-101">
  <titel>UI Design</titel>
  <beschreibung>Grundlagen der Gestaltung</beschreibung>
  <status aktiv="true" />
</kurs>`,
    tip: 'Ein vollständiger XML-Baum mit Attributen.',
  },
  md_example: {
    label: 'Beispiel: Bericht',
    format: 'markdown',
    isExample: true,
    code: `# Projektbericht
    
## Status
- [x] Planung
- [ ] Umsetzung

Wichtig: [Link zur IHK](https://ihk.de)`,
    tip: 'Standard Markdown Elemente im Überblick.',
  },

  // --- LEARNING BLOCKS (GRANULAR) ---
  json_bool: {
    label: 'Boolean & Null',
    format: 'json',
    code: `"aktiv": true,
"geloescht": null`,
    tip: 'Boolean (true/false) für Zustände, null für "kein Wert".',
  },
  json_array: {
    label: 'Einfaches Array',
    format: 'json',
    code: `"liste": ["A", "B", "C"]`,
    tip: 'Eckige Klammern [] für ungeordnete Listen gleicher Elemente.',
  },
  json_nested: {
    label: 'Verschachtelt',
    format: 'json',
    code: `"details": {
  "id": 1,
  "typ": "Intern"
}`,
    tip: 'Objekte {} innerhalb von Objekten bilden Hierarchien.',
  },
  xml_attr: {
    label: 'Tag mit Attribut',
    format: 'xml',
    code: `<element id="01" status="aktiv">Inhalt</element>`,
    tip: 'Attribute (id="...") speichern Metadaten zum Element.',
  },
  xml_comment: {
    label: 'Kommentar',
    format: 'xml',
    code: `<!-- IHK: Das ist ein Kommentar -->`,
    tip: 'Kommentare werden vom Browser ignoriert, helfen aber Entwicklern.',
  },
  xml_cdata: {
    label: 'CDATA (Rohdaten)',
    format: 'xml',
    code: `<![CDATA[ 
  <p>Hier darf HTML stehen ohne Fehler</p>
]]>`,
    tip: 'CDATA erlaubt Sonderzeichen wie < oder > ohne sie zu escapen.',
  },
  md_footnote: {
    label: 'Fußnote',
    format: 'markdown',
    code: `Der Begriff[^1] wird hier erklärt.

[^1]: Das ist die Fußnote am Ende.`,
    tip: 'Fußnoten verweisen auf Erklärungen am Dokumentende.',
  },
  md_tasks: {
    label: 'Checkliste',
    format: 'markdown',
    code: `- [x] Erledigt
- [ ] Offen`,
    tip: 'Aufgabenlisten mit [x] für Checkboxen.',
  },
  md_nested: {
    label: 'Verschachtelt',
    format: 'markdown',
    code: `1. Punkt Eins
   - Unterpunkt A
   - Unterpunkt B`,
    tip: 'Einrückung (meist 3 Leerzeichen) erzeugt Hierarchien.',
  },
};

export const DataSandboxView: React.FC<Props> = ({ bionic, onBack }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [format, setFormat] = useState<DataFormat>('json');
  const [code, setCode] = useState(EXAMPLES.json);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [examCheckMode, setExamCheckMode] = useState(false);
  const [findings, setFindings] = useState<IhkFinding[]>([]);

  useEffect(() => {
    validateAndParse(code, format);
  }, [code, format, examCheckMode]);

  const handleFormatChange = (f: DataFormat) => {
    soundEffects.playClick();
    setFormat(f);
    setCode(EXAMPLES[f]);
    setError(null);
  };

  const insertSnippet = (snippetCode: string, isExample = false) => {
    soundEffects.playClick();
    
    if (isExample || !textareaRef.current) {
      setCode(snippetCode);
      return;
    }

    const { selectionStart, selectionEnd } = textareaRef.current;
    const newCode = code.substring(0, selectionStart) + 
                   snippetCode + 
                   code.substring(selectionEnd);
    
    setCode(newCode);
    
    // Set focus back to textarea after update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPos = selectionStart + snippetCode.length;
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 10);
  };

  const runFix = (action: () => string) => {
    soundEffects.playSuccess();
    setCode(action());
  };

  const checkIhkCompliance = (value: string, fmt: DataFormat): IhkFinding[] => {
    if (!examCheckMode) return [];
    const results: IhkFinding[] = [];

    if (fmt === 'json') {
      if (value.includes("'")) {
        results.push({
          id: 'json_quotes',
          type: 'error',
          message: 'JSON erlaubt nur doppelte Anführungszeichen ("). Einfache (\') sind ungültig.',
          canFix: true,
          fixLabel: 'Quotes korrigieren',
          fixAction: () => value.replace(/'/g, '"')
        });
      }
      
      // Check for trailing commas (simple regex approach)
      if (value.match(/,(\s*[}\]])/)) {
        results.push({
          id: 'json_comma',
          type: 'error',
          message: 'Trailing Comma: In JSON darf nach dem letzten Element kein Komma stehen.',
          canFix: true,
          fixLabel: 'Kommata entfernen',
          fixAction: () => value.replace(/,(\s*[}\]])/g, '$1')
        });
      }

      // Check for unquoted keys
      if (value.match(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/)) {
        results.push({
          id: 'json_keys',
          type: 'error',
          message: 'Schlüssel müssen in doppelten Anführungszeichen stehen.',
          canFix: true,
          fixLabel: 'Keys quoten',
          fixAction: () => value.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        });
      }
    }

    if (fmt === 'xml') {
      if (value.includes('<svg') && !value.includes('xmlns=')) {
        results.push({
          id: 'xml_xmlns',
          type: 'warning',
          message: 'SVG-Validität: Ein "xmlns" Attribut ist für die Korrektheit im Web-Standard nötig.',
          canFix: true,
          fixLabel: 'xmlns hinzufügen',
          fixAction: () => value.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
        });
      }

      if ((value.includes('<img') || value.includes('<bild')) && !value.includes('alt=')) {
        results.push({
          id: 'xml_alt',
          type: 'error',
          message: 'BARRIEREFREIHEIT: Bilder benötigen zwingend ein "alt" Attribut.',
          canFix: true,
          fixLabel: 'Alt-Platzhalter',
          fixAction: () => value.replace(/(<img|<bild)([^>]*?)(\/?>)/, '$1$2 alt="Beschreibung"$3')
        });
      }
    }

    if (fmt === 'markdown') {
      if (value.includes('![') && !value.match(/!\[.+\]/)) {
        results.push({
          id: 'md_alt',
          type: 'error',
          message: 'Leerer Alt-Text: Bilder in Markdown brauchen eine Beschreibung zwischen [ ].',
          canFix: false
        });
      }
      
      if (value.includes('|') && !value.includes('---')) {
        results.push({
          id: 'md_table_sep',
          type: 'warning',
          message: 'Tabellen-Syntax: Unter dem Header fehlt die Trennzeile (z.B. | --- | --- |).',
          canFix: false
        });
      }
    }

    return results;
  };

  const validateAndParse = (value: string, fmt: DataFormat) => {
    const ihkFindings = checkIhkCompliance(value, fmt);
    setFindings(ihkFindings);

    try {
      if (fmt === 'json') {
        const parsed = JSON.parse(value);
        setParsedData(parsed);
        setError(null);
      } else if (fmt === 'xml') {
        if (!value.trim().startsWith('<') || !value.trim().endsWith('>')) {
          throw new Error('XML muss mit < beginnen und mit > enden.');
        }
        setParsedData(value);
        setError(null);
      } else {
        setParsedData(value);
        setError(null);
      }
    } catch (e: any) {
      setError(e.message);
      setParsedData(null);
    }
  };

  const filteredSnippets = Object.entries(SNIPPETS).filter(([_, s]) => s.format === format);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Layout className="w-4 h-4" />
              <span>Interaktive Sandbox</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Struktur vs. Inhalt Explorer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Verstehe den IHK-Kern: Wie trennen wir die logische Struktur von den eigentlichen Daten?
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            {/* Exam Mode Toggle */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setExamCheckMode(!examCheckMode);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer text-[11px] font-black ${
                examCheckMode 
                  ? 'bg-amber-500 border-amber-400 text-white shadow-amber-200 shadow-lg' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              <ShieldAlert className={`w-3.5 h-3.5 ${examCheckMode ? 'animate-pulse' : ''}`} />
              <span>PRÜFUNGS-CHECK: {examCheckMode ? 'AKTIV' : 'AUS'}</span>
            </button>

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
              <button
                onClick={() => handleFormatChange('json')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  format === 'json' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => handleFormatChange('xml')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  format === 'xml' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>XML</span>
              </button>
              <button
                onClick={() => handleFormatChange('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  format === 'markdown' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Markdown</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Insert Toolbar - Dynamic Filtering */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Grid className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Komplette Beispiele</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSnippets.filter(([_, s]) => s.isExample).map(([key, snippet]) => (
                  <button
                    key={key}
                    onClick={() => insertSnippet(snippet.code, true)}
                    className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-[10px] font-black text-indigo-700 dark:text-indigo-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {snippet.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Einzelne IHK-Lernbausteine</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSnippets.filter(([_, s]) => !s.isExample).map(([key, snippet]) => (
                  <button
                    key={key}
                    onClick={() => insertSnippet(snippet.code)}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
                    title={snippet.tip}
                  >
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    {snippet.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Zone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" />
              Live Editor ({format.toUpperCase()})
            </span>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              Einfügen an Cursor-Position aktiv
            </span>
          </div>
          <div className="relative group">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-[350px] p-4 font-mono text-sm bg-slate-950 text-slate-300 rounded-2xl border-2 transition-all focus:outline-none scrollbar-thin scrollbar-thumb-slate-700 ${
                error || findings.some(f => f.type === 'error') ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
              spellCheck={false}
            />
          </div>

          {/* Detailed Exam Findings List */}
          {examCheckMode && findings.length > 0 && (
            <div className="animate-in slide-in-from-top-2 duration-300 space-y-2">
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest px-1">Prüfungs-Bericht:</div>
              {findings.map((finding) => (
                <div 
                  key={finding.id} 
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                    finding.type === 'error' 
                      ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50' 
                      : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black ${
                      finding.type === 'error' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {finding.type === 'error' ? '!' : '?'}
                    </div>
                    <p className={`text-[11px] font-bold ${finding.type === 'error' ? 'text-rose-900 dark:text-rose-200' : 'text-amber-900 dark:text-amber-200'}`}>
                      {finding.message}
                    </p>
                  </div>
                  {finding.canFix && finding.fixAction && (
                    <button
                      onClick={() => runFix(finding.fixAction!)}
                      className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors shadow-xs shrink-0 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      {finding.fixLabel || 'Beheben'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <strong className="block mb-0.5 uppercase tracking-wider text-slate-800 dark:text-slate-200">Format-Info:</strong>
              {format === 'json' && "JSON nutzt Schlüssel-Wert-Paare. Schlüssel müssen in doppelten Anführungszeichen stehen. Erlaubte Typen: String, Number, Boolean, Array, Object, Null."}
              {format === 'xml' && "XML ist Tag-basiert und erweiterbar. Achte auf Wohlgeformtheit (Well-formed): Alle Tags müssen geschlossen werden, ein Root-Element ist Pflicht."}
              {format === 'markdown' && "Markdown ist eine vereinfachte Auszeichnungssprache. Sie wandelt Textsymbole in semantische HTML-Struktur (H1, Li, Strong) um."}
            </div>
          </div>
        </div>

        {/* Visual Explanation Zone */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Layers className="w-3.5 h-3.5" />
            Visuelle Analyse (Struktur vs. Inhalt)
          </span>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 h-[450px] overflow-y-auto p-6 shadow-sm transition-colors space-y-4">
            {!parsedData ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                <AlertCircle className="w-12 h-12 text-slate-300" />
                <div className="text-sm font-bold text-slate-400 px-8">Warte auf valide Eingabe... Schau dir die Fallstricke im Prüfungs-Modus an!</div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                {format === 'json' && (
                  <JsonVisualizer data={parsedData} />
                )}
                {format === 'xml' && (
                  <XmlVisualizer data={code} />
                )}
                {format === 'markdown' && (
                  <MarkdownVisualizer data={code} />
                )}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300">
              <Lightbulb className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">IHK Erkenntnis</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-indigo-400 uppercase">Struktur</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Die 'Schubladen' (Tags/Keys). Sie geben den Daten eine Bedeutung für die Maschine.</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-amber-500 uppercase">Inhalt</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Die 'Wäsche' in der Schublade. Die eigentlichen Fakten und Texte für den Menschen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Sub-Visualizers - Simplified to focus on layout */

const JsonVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const renderItem = (key: string, value: any, depth = 0) => {
    const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const type = Array.isArray(value) ? 'Array' : typeof value;

    return (
      <div key={key} className="space-y-2 relative" style={{ marginLeft: depth * 14 }}>
        {depth > 0 && <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />}
        <div className="flex items-start gap-2 group">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-tighter mb-0.5">Key</span>
            <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shadow-2xs">"{key}"</span>
          </div>
          <div className="mt-4 text-slate-300 font-bold">:</div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[8px] font-black text-amber-500 uppercase tracking-tighter mb-0.5">Value ({type})</span>
            {isObject ? (
              <div className="p-3 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 mt-1 shadow-2xs">
                {Object.entries(value).map(([k, v]) => renderItem(k, v, 0))}
              </div>
            ) : isArray ? (
              <div className="space-y-1.5 mt-1">
                {value.map((item: any, idx: number) => (
                   <div key={idx} className="flex items-center gap-1.5">
                     <span className="text-[10px] text-slate-400 font-mono">[{idx}]</span>
                     <div className="px-2 py-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded text-xs text-amber-800 dark:text-amber-200 font-bold shadow-3xs flex-1 truncate">
                        {typeof item === 'object' ? '{...}' : String(item)}
                     </div>
                   </div>
                ))}
              </div>
            ) : (
              <div className={`px-2 py-1 rounded text-xs font-bold border transition-all shadow-3xs mt-1 truncate ${
                typeof value === 'boolean' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                typeof value === 'number' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
              }`}>
                {String(value)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10 rounded-2xl border border-slate-100 dark:border-slate-800/40 space-y-5">
      {Object.entries(data).map(([k, v]) => renderItem(k, v))}
    </div>
  );
};

const XmlVisualizer: React.FC<{ data: string }> = ({ data }) => {
  const tagRegex = /<(\/?[a-zA-Z0-9]+)([^>]*)>/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(data)) !== null) {
    if (match.index > lastIndex) {
      const content = data.substring(lastIndex, match.index).trim();
      if (content) parts.push({ type: 'content', value: content });
    }
    parts.push({ type: 'tag', value: match[1], attr: match[2] });
    lastIndex = tagRegex.lastIndex;
  }

  return (
    <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10 rounded-2xl border border-slate-100 dark:border-slate-800/40 space-y-4 font-mono">
      {parts.map((part, i) => (
        <div key={i} className="flex flex-col gap-1">
          {part.type === 'tag' ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                 <span className="text-[8px] font-black text-indigo-400 uppercase tracking-tighter">Tag</span>
                 <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-xs">&lt;</span>
                    <span className={`text-xs font-black ${part.value.startsWith('/') ? 'text-slate-500' : 'text-indigo-600 dark:text-indigo-400'}`}>{part.value}</span>
                    {part.attr && <span className="text-[10px] text-purple-500 font-bold ml-1 italic">{part.attr}</span>}
                    <span className="text-slate-400 text-xs">&gt;</span>
                  </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col ml-8 border-l-2 border-amber-200 dark:border-amber-900/40 pl-3">
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-tighter mb-0.5">Content</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-amber-50/30 dark:bg-amber-950/10 px-1.5 py-0.5 rounded">{part.value}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const MarkdownVisualizer: React.FC<{ data: string }> = ({ data }) => {
  const lines = data.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const isHeader = line.startsWith('#');
        const isList = line.trim().startsWith('-') || line.trim().startsWith('*');
        const isTable = line.includes('|');
        const hasLink = line.includes('[');
        return (
          <div key={i} className="group relative p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              {(isHeader || isList || hasLink || isTable) && (
                <div className="px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 rounded text-[8px] font-black text-indigo-600 dark:text-indigo-400 uppercase shrink-0">
                  {isHeader ? 'Header' : isList ? 'List' : isTable ? 'Table' : 'Format'}
                </div>
              )}
              <div className={`text-sm ${isHeader ? 'font-black text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>{line || '\u00A0'}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
