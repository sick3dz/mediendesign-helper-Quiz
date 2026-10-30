import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { soundEffects } from '../services/audioService';
import { BionicText } from '../utils/bionicReading';

type DataFormat = 'json' | 'xml' | 'markdown';

interface Props {
  bionic: boolean;
  onBack?: () => void;
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

const SNIPPETS: Record<string, { label: string; format: DataFormat; code: string; tip: string }> = {
  json_nested: {
    label: 'Verschachteltes JSON',
    format: 'json',
    code: `{
  "projekt": "IHK-Abschluss",
  "beteiligte": [
    { "name": "Max", "rolle": "Dev" },
    { "name": "Lisa", "rolle": "Design" }
  ],
  "status": "In Bearbeitung"
}`,
    tip: 'Verschachtelung ist IHK-Standard. Achte darauf, dass jedes Objekt in {} und jedes Array in [] steht.',
  },
  json_pitfall: {
    label: 'JSON Fallstrick',
    format: 'json',
    code: `{
  'fehler': "Einfache Anführungszeichen sind ungültig",
  keine_quotes: "Schlüssel müssen in Quotes stehen",
  "trailing_comma": "Kein Komma am Ende!",
}`,
    tip: 'Prüfungs-Check: JSON erlaubt NUR doppelte Anführungszeichen für Schlüssel und Strings!',
  },
  xml_svg: {
    label: 'SVG (XML-Basis)',
    format: 'xml',
    code: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="indigo" />
  <rect x="10" y="10" width="30" height="30" fill="amber" />
</svg>`,
    tip: 'SVG ist XML! Es nutzt Tags für geometrische Formen. xmlns ist Pflicht für die Validität im Web.',
  },
  xml_attr: {
    label: 'XML mit Attributen',
    format: 'xml',
    code: `<kurs id="K-102" kategorie="Design">
  <titel>UI Grundlagen</titel>
  <dozent intern="true">Dr. Schmidt</dozent>
</kurs>`,
    tip: 'Unterscheide Element-Inhalt (<titel>) von Meta-Daten in Attributen (id="K-102").',
  },
  md_table: {
    label: 'IHK Tabelle',
    format: 'markdown',
    code: `| Phase | Dauer | Status |
| :--- | :---: | ---: |
| Analyse | 2h | Erledigt |
| Design | 5h | Aktiv |

> Tipp: Tabellen brauchen Trennstriche!`,
    tip: 'Tabellen sind in MD nicht nativ, sondern eine GFM-Erweiterung (GitHub Flavored Markdown).',
  },
  md_assets: {
    label: 'Bild & Link',
    format: 'markdown',
    code: `![IHK Logo](https://link-zu-bild.de/logo.png)
    
[Hier geht es zur Anmeldung](https://ihk.de)

**Wichtig:** Alt-Text für Barrierefreiheit nie vergessen!`,
    tip: 'Syntax: ![Alt-Text](URL) für Bilder. Ohne ! ist es ein normaler Link.',
  },
  json_ihk_full: {
    label: 'IHK Event (Komplex)',
    format: 'json',
    code: `{
  "event": "Design-Night 2026",
  "datum": "2026-11-15",
  "tickets": [
    { "typ": "Standard", "preis": 49.00, "kontingent": 150 },
    { "typ": "VIP", "preis": 129.00, "kontingent": 20 }
  ],
  "location": {
    "name": "Design-Hub",
    "stadt": "Berlin",
    "barrierefrei": true
  },
  "tags": ["Design", "Networking", "Web"]
}`,
    tip: 'Komplexe Datenmodelle kombinieren Objekte ({}) und Arrays ([]) für Listen.',
  },
  xml_ihk_complex: {
    label: 'IHK Kurs (XML/Attr)',
    format: 'xml',
    code: `<akademie standort="Nord">
  <kurs id="WEB-01" typ="Zertifikat">
    <titel>Web-Design Master</titel>
    <teilnehmer max="12">
      <person status="aktiv">Max Mustermann</person>
      <person status="warteliste">Erika Muster</person>
    </teilnehmer>
    <gebuehren waehrung="EUR">1200.00</gebuehren>
  </kurs>
</akademie>`,
    tip: 'Verschachtelung in XML bildet Hierarchien ab. Attribute sparen Platz gegenüber Elementen.',
  },
};

export const DataSandboxView: React.FC<Props> = ({ bionic, onBack }) => {
  const [format, setFormat] = useState<DataFormat>('json');
  const [code, setCode] = useState(EXAMPLES.json);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [examCheckMode, setExamCheckMode] = useState(false);

  useEffect(() => {
    validateAndParse(code, format);
  }, [code, format]);

  const handleFormatChange = (f: DataFormat) => {
    soundEffects.playClick();
    setFormat(f);
    setCode(EXAMPLES[f]);
    setError(null);
  };

  const insertSnippet = (snippetCode: string, snippetFormat: DataFormat) => {
    soundEffects.playClick();
    setFormat(snippetFormat);
    setCode(snippetCode);
  };

  const validateAndParse = (value: string, fmt: DataFormat) => {
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

        {/* Quick Insert Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IHK-Bausteine schnell einfügen</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SNIPPETS).map(([key, snippet]) => (
              <button
                key={key}
                onClick={() => insertSnippet(snippet.code, snippet.format)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
                title={snippet.tip}
              >
                <ChevronRight className="w-3 h-3 text-indigo-500" />
                {snippet.label}
              </button>
            ))}
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
            {error ? (
              <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Syntax-Fehler
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valide Struktur
              </span>
            )}
          </div>
          <div className="relative group">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-[450px] p-4 font-mono text-sm bg-slate-950 text-slate-300 rounded-2xl border-2 transition-all focus:outline-none scrollbar-thin scrollbar-thumb-slate-700 ${
                error ? 'border-rose-500/50 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
              }`}
              spellCheck={false}
            />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                UTF-8 Encoding
              </span>
            </div>
          </div>
          
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
              <strong className="block mb-0.5 uppercase tracking-wider">IHK Prüfungs-Info:</strong>
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
                  <JsonVisualizer data={parsedData} originalCode={code} examMode={examCheckMode} />
                )}
                {format === 'xml' && (
                  <XmlVisualizer data={code} examMode={examCheckMode} />
                )}
                {format === 'markdown' && (
                  <MarkdownVisualizer data={code} examMode={examCheckMode} />
                )}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300">
              <Lightbulb className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Erkenntnis</span>
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

/* Sub-Visualizers */

const JsonVisualizer: React.FC<{ data: any; originalCode: string; examMode: boolean }> = ({ data, originalCode, examMode }) => {
  const checkPitfalls = () => {
    const findings = [];
    if (originalCode.includes("'")) findings.push("IHK-Fehler: Einfache Anführungszeichen (') sind in JSON verboten!");
    if (originalCode.match(/[a-z0-9_]+:/i)) {
       // Check if keys are unquoted
       const rawKeys = originalCode.match(/([a-z0-9_]+):/gi) || [];
       const jsonKeys = JSON.stringify(data);
       if (rawKeys.some(rk => !jsonKeys.includes(`"${rk.replace(':','')}"`))) {
         findings.push("IHK-Fehler: Schlüssel müssen zwingend in doppelten Anführungszeichen stehen.");
       }
    }
    return findings;
  };

  const findings = examMode ? checkPitfalls() : [];

  const renderItem = (key: string, value: any, depth = 0) => {
    const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const type = Array.isArray(value) ? 'Array' : typeof value;

    return (
      <div key={key} className="space-y-2 relative" style={{ marginLeft: depth * 14 }}>
        {/* Visual Connector Line for Nested Items */}
        {depth > 0 && (
          <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />
        )}

        <div className="flex items-start gap-2 group">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-tighter mb-0.5">Key</span>
            <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shadow-2xs group-hover:bg-indigo-100 transition-colors">
              "{key}"
            </span>
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
    <div className="space-y-4">
      {findings.length > 0 && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-900/60 space-y-1.5 shadow-sm">
          {findings.map((f, i) => (
            <div key={i} className="text-[10px] font-black text-rose-600 dark:text-rose-400 flex items-center gap-2 uppercase tracking-tight">
              <div className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 text-[10px]">!</div>
              {f}
            </div>
          ))}
        </div>
      )}
      <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10 rounded-2xl border border-slate-100 dark:border-slate-800/40 space-y-5">
        {Object.entries(data).map(([k, v]) => renderItem(k, v))}
      </div>
    </div>
  );
};

const XmlVisualizer: React.FC<{ data: string; examMode: boolean }> = ({ data, examMode }) => {
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

  const isSvg = data.includes('<svg');
  const findings = [];
  if (examMode) {
    if (isSvg) findings.push("IHK-Info: SVG ist XML-basiert. Tags wie <circle> definieren Pfade.");
    if (isSvg && !data.includes('xmlns=')) findings.push("Prüfungs-Check: xmlns Attribut fehlt für Standard-Validität.");
    
    // Accessibility check: look for image-like tags without alt or title
    if ((data.includes('<img') || data.includes('<bild')) && !data.includes('alt=')) {
      findings.push("BARRIEREFREIHEIT: Bilder brauchen IMMER ein alt-Attribut!");
    }
  }

  return (
    <div className="space-y-4 font-mono">
       {findings.map((f, i) => (
        <div key={i} className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 shadow-2xs">
          <div className="w-4 h-4 rounded bg-indigo-500 text-white flex items-center justify-center shrink-0">?</div>
          {f}
        </div>
      ))}
      <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10 rounded-2xl border border-slate-100 dark:border-slate-800/40 space-y-4">
        {parts.map((part, i) => (
          <div key={i} className="flex flex-col gap-1">
            {part.type === 'tag' ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                   <span className="text-[8px] font-black text-indigo-400 uppercase tracking-tighter">Tag</span>
                   <div className="flex items-center gap-1">
                      <span className="text-slate-400 text-xs">&lt;</span>
                      <span className={`text-xs font-black ${part.value.startsWith('/') ? 'text-slate-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {part.value}
                      </span>
                      {part.attr && (
                        <span className="text-[10px] text-purple-500 font-bold ml-1 italic">{part.attr}</span>
                      )}
                      <span className="text-slate-400 text-xs">&gt;</span>
                    </div>
                </div>
                {examMode && part.attr && !part.attr.includes('"') && (
                  <span className="text-[8px] text-rose-500 font-black uppercase mt-0.5 ml-8">Fallstrick: Attribute brauchen "..."</span>
                )}
              </div>
            ) : (
              <div className="flex flex-col ml-8 border-l-2 border-amber-200 dark:border-amber-900/40 pl-3">
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-tighter mb-0.5">Content</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-amber-50/30 dark:bg-amber-950/10 px-1.5 py-0.5 rounded">
                  {part.value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MarkdownVisualizer: React.FC<{ data: string; examMode: boolean }> = ({ data, examMode }) => {
  const lines = data.split('\n');
  
  return (
    <div className="space-y-2">
      {examMode && data.includes('![') && !data.includes('alt=') && (
        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800 mb-2">
          IHK-Tipp: Bilder in MD nutzen ![Alt-Text](URL). Der Alt-Text ist Pflicht für Barrierefreiheit!
        </div>
      )}
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
              <div className={`text-sm ${isHeader ? 'font-black text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                {line || '\u00A0'}
              </div>
            </div>
            {examMode && isTable && i === 0 && (
              <div className="mt-1 text-[9px] font-bold text-indigo-500">
                INFO: MD-Tabellen brauchen eine Trennzeile (---) unter dem Header!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
