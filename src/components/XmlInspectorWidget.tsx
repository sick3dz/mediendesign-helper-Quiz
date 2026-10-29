import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, Code, FileCode2, Layers, Search, Sparkles, Check, X } from 'lucide-react';

export const XmlInspectorWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wellformed' | 'pipeline' | 'compare'>('wellformed');

  // Tab 1: Well-formedness simulator toggles
  const [errorRoot, setErrorRoot] = useState(false);
  const [errorClosing, setErrorClosing] = useState(false);
  const [errorNesting, setErrorNesting] = useState(false);
  const [errorCase, setErrorCase] = useState(false);

  // Tab 2: Pipeline active step & XPath selection
  const [pipelineStep, setPipelineStep] = useState<1 | 2 | 3 | 4>(1);
  const [xpathQuery, setXpathQuery] = useState<string>('/produkt/preis');

  // Compute XML validity for Tab 1
  const isWellFormed = !errorRoot && !errorClosing && !errorNesting && !errorCase;

  // XPath evaluation helper
  const getXpathResult = () => {
    switch (xpathQuery) {
      case '/produkt/name':
        return { text: '"Designer-Stuhl"', type: 'Element-Inhalt (String)', node: '<name>Designer-Stuhl</name>' };
      case '/produkt/preis':
        return { text: '"149.00"', type: 'Element-Inhalt (Number/Text)', node: '<preis waehrung="EUR">149.00</preis>' };
      case '/produkt/preis/@waehrung':
        return { text: '"EUR"', type: 'Attribut-Wert (String)', node: 'waehrung="EUR"' };
      case '/produkt/farbe':
        return { text: '"Schwarz"', type: 'Element-Inhalt (String)', node: '<farbe>Schwarz</farbe>' };
      default:
        return { text: 'Kein Treffer', type: 'Unbekannt', node: '' };
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-700/80 p-5 shadow-lg space-y-5 my-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-mono font-bold text-xs border border-teal-500/30">
            &lt;/&gt;
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>XML-Praxis-Labor & Prüfungskette</span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30 font-mono">
                IHK Standard
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Wohlgeformtheit testen, das 4er-Ökosystem erleben und XML vs. JSON vergleichen.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('wellformed')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'wellformed'
                ? 'bg-teal-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Wohlgeformtheit
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-teal-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Prüfungskette (4er)
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-teal-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. XML vs. JSON
          </button>
        </div>
      </div>

      {/* TAB 1: WELL-FORMEDNESS SIMULATOR */}
      {activeTab === 'wellformed' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <strong className="text-teal-400">IHK-Kernregel:</strong> Eine XML-Datei muss zwingend <span className="text-white font-semibold">„wohlgeformt“ (well-formed)</span> sein. Wenn auch nur eine der 4 Regeln verletzt wird, stürzt das lesende Programm ab! Schalte unten gezielt Fehler ein/aus:
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Interactive Error Toggles */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Fehler provozieren (Regeln testen):
              </span>

              <label className="flex items-start gap-2.5 p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={errorRoot}
                  onChange={e => setErrorRoot(e.target.checked)}
                  className="mt-0.5 rounded text-teal-500 focus:ring-teal-400 accent-teal-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Regel 1: Ein einziges Root-Element</div>
                  <div className="text-slate-400 text-[11px]">Zweites Wurzelelement parallel einfügen</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={errorClosing}
                  onChange={e => setErrorClosing(e.target.checked)}
                  className="mt-0.5 rounded text-teal-500 focus:ring-teal-400 accent-teal-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Regel 2: Tags müssen geschlossen werden</div>
                  <div className="text-slate-400 text-[11px]">Schließendes &lt;/preis&gt;-Tag weglassen</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={errorNesting}
                  onChange={e => setErrorNesting(e.target.checked)}
                  className="mt-0.5 rounded text-teal-500 focus:ring-teal-400 accent-teal-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Regel 3: Korrekte Verschachtelung</div>
                  <div className="text-slate-400 text-[11px]">Tags überkreuzen (&lt;a&gt;&lt;b&gt;&lt;/a&gt;&lt;/b&gt;)</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={errorCase}
                  onChange={e => setErrorCase(e.target.checked)}
                  className="mt-0.5 rounded text-teal-500 focus:ring-teal-400 accent-teal-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Regel 4: Case-Sensitivity</div>
                  <div className="text-slate-400 text-[11px]">&lt;Name&gt; öffnen, aber mit &lt;/name&gt; schließen</div>
                </div>
              </label>

              {/* Reset Button */}
              {!isWellFormed && (
                <button
                  onClick={() => {
                    setErrorRoot(false);
                    setErrorClosing(false);
                    setErrorNesting(false);
                    setErrorCase(false);
                  }}
                  className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Alle Fehler beheben (Zurück zu Wohlgeformt)
                </button>
              )}
            </div>

            {/* Live Code Preview & Parser Result */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-sans text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">produkt.xml</span>
                  <div className="flex items-center gap-1.5">
                    {isWellFormed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Wohlgeformt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        <AlertTriangle className="w-3 h-3" /> Syntaxfehler!
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
                  {errorRoot ? (
                    <>
                      <span className="text-rose-400 font-bold">&lt;shop&gt;</span>{'\n'}
                      {'  '}&lt;produkt&gt;...&lt;/produkt&gt;{'\n'}
                      <span className="text-rose-400 font-bold">&lt;/shop&gt;</span>{'\n'}
                      <span className="text-rose-400 font-bold underline bg-rose-950/40 px-1">&lt;zweitesRoot&gt;...&lt;/zweitesRoot&gt;</span>
                      <span className="text-rose-400 text-[10px] ml-2">{'// FEHLER: 2 Root-Elemente!'}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-teal-400">&lt;produkt&gt;</span>{'\n'}
                      {'  '}{errorCase ? (
                        <>
                          <span className="text-rose-400 font-bold underline bg-rose-950/40">&lt;Name&gt;</span>Designer-Stuhl<span className="text-rose-400 font-bold underline bg-rose-950/40">&lt;/name&gt;</span>
                          <span className="text-rose-400 text-[10px] ml-2">{'// Case-Mismatch!'}</span>{'\n'}
                        </>
                      ) : errorNesting ? (
                        <>
                          <span className="text-rose-400 font-bold">&lt;name&gt;</span><span className="text-amber-400 font-bold">&lt;titel&gt;</span>Designer-Stuhl<span className="text-rose-400 font-bold underline bg-rose-950/40">&lt;/name&gt;</span><span className="text-amber-400 font-bold underline bg-rose-950/40">&lt;/titel&gt;</span>
                          <span className="text-rose-400 text-[10px] ml-2">{'// Überkreuzt!'}</span>{'\n'}
                        </>
                      ) : (
                        <>
                          <span className="text-teal-400">&lt;name&gt;</span>Designer-Stuhl<span className="text-teal-400">&lt;/name&gt;</span>{'\n'}
                        </>
                      )}
                      {'  '}{errorClosing ? (
                        <>
                          <span className="text-rose-400 font-bold underline bg-rose-950/40">&lt;preis waehrung="EUR"&gt;149.00</span>
                          <span className="text-rose-400 text-[10px] ml-2">{'// &lt;/preis&gt; FEHLT!'}</span>{'\n'}
                        </>
                      ) : (
                        <>
                          <span className="text-teal-400">&lt;preis <span className="text-amber-300">waehrung</span>=<span className="text-emerald-300">"EUR"</span>&gt;</span>149.00<span className="text-teal-400">&lt;/preis&gt;</span>{'\n'}
                        </>
                      )}
                      {'  '}&lt;farbe&gt;Schwarz&lt;/farbe&gt;{'\n'}
                      <span className="text-teal-400">&lt;/produkt&gt;</span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Explanation */}
              <div className="mt-4 pt-3 border-t border-slate-800 font-sans text-xs">
                {isWellFormed ? (
                  <div className="text-emerald-400 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>100% Wohlgeformt:</strong> 1 Root-Element, alle Tags geschlossen, korrekt geschachtelt, einheitliche Groß-/Kleinschreibung.</span>
                  </div>
                ) : (
                  <div className="text-rose-400 flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Ungültig!</strong>{' '}
                      {errorRoot && 'Eine XML-Datei darf genau ein einziges Root-Element besitzen! '}
                      {errorClosing && 'Jedes geöffnete Tag muss mit einem schließenden Tag beendet werden! '}
                      {errorNesting && 'Tags dürfen sich niemals überkreuzen! Zuerst geöffnet muss zuletzt geschlossen werden. '}
                      {errorCase && 'XML ist strikt case-sensitive: <Name> und <name> sind zwei unterschiedliche Tags! '}
                      <span className="text-rose-300 block text-[11px] mt-0.5">Parser-Konsequenz: Programm bricht mit Fatal Error ab.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE 4-STAGE EXAM PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <strong className="text-amber-400">Die IHK-Prüfungskette:</strong> Wenn du nach XML gefragt wirst, merke dir diese 4 Stationen:
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
              <button
                onClick={() => setPipelineStep(1)}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  pipelineStep === 1
                    ? 'border-teal-500 bg-teal-950/60 text-teal-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">1. XML</div>
                <div className="text-[10px] text-slate-400 font-sans">Speichert Daten strukturiert</div>
              </button>
              <button
                onClick={() => setPipelineStep(2)}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  pipelineStep === 2
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">2. DTD / XSD</div>
                <div className="text-[10px] text-slate-400 font-sans">Prüft Struktur (Gesetzbuch)</div>
              </button>
              <button
                onClick={() => setPipelineStep(3)}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  pipelineStep === 3
                    ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">3. XPath</div>
                <div className="text-[10px] text-slate-400 font-sans">Sucht Daten (Adresse)</div>
              </button>
              <button
                onClick={() => setPipelineStep(4)}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  pipelineStep === 4
                    ? 'border-fuchsia-500 bg-fuchsia-950/60 text-fuchsia-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">4. XSLT</div>
                <div className="text-[10px] text-slate-400 font-sans">Macht Design / HTML</div>
              </button>
            </div>
          </div>

          {/* Pipeline Details Card */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
            {pipelineStep === 1 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs">
                  <FileCode2 className="w-4 h-4" />
                  <span>Stufe 1: XML (Extensible Markup Language) – Die Rohdaten</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  XML definiert, was die Daten <strong>bedeuten</strong> (Semantik), nicht wie sie aussehen. Es gibt keine vordefinierten Tags – du erfindest eigene Tags passend zum Produkt.
                </p>
                <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-teal-300 border border-slate-800">
{`<produkt>
  <name>Designer-Stuhl</name>
  <preis waehrung="EUR">149.00</preis>
  <farbe>Schwarz</farbe>
</produkt>`}
                </pre>
              </div>
            )}

            {pipelineStep === 2 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                  <Layers className="w-4 h-4" />
                  <span>Stufe 2: DTD & XML-Schema (XSD) – Das „Gesetzbuch“ der Daten</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Weil jeder eigene Tags erfinden kann, definiert das Schema als Regelwerk: Welche Tags sind erlaubt? In welcher Reihenfolge? Was ist Pflicht (z. B. &lt;name&gt;) und was ist optional (z. B. &lt;farbe&gt;)?
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-xs border border-slate-800 space-y-1.5 font-sans">
                  <div className="text-emerald-400 flex items-center gap-1.5 font-mono text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> &lt;produkt&gt; validiert gegen produkt.xsd: Gültig!
                  </div>
                  <ul className="text-slate-400 text-xs list-disc list-inside space-y-0.5">
                    <li><span className="font-mono text-slate-300">&lt;name&gt;</span> ist Pflichtfeld (minOccurs="1")</li>
                    <li><span className="font-mono text-slate-300">&lt;preis&gt;</span> ist Pflichtfeld mit Attribut <span className="font-mono text-amber-300">waehrung</span></li>
                    <li><span className="font-mono text-slate-300">&lt;farbe&gt;</span> ist optional (minOccurs="0")</li>
                  </ul>
                </div>
              </div>
            )}

            {pipelineStep === 3 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <Search className="w-4 h-4" />
                  <span>Stufe 3: XPath – Die gezielte „Adresse“ im XML-Baum</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  XPath fungiert wie eine präzise Wegbeschreibung durch verschachtelte XML-Knoten, um Werte blitzschnell herauszupicken:
                </p>

                {/* Interactive XPath buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-sans">Adresse wählen:</span>
                  {['/produkt/name', '/produkt/preis', '/produkt/preis/@waehrung', '/produkt/farbe'].map(path => (
                    <button
                      key={path}
                      onClick={() => setXpathQuery(path)}
                      className={`px-2.5 py-1 rounded-md font-mono text-xs cursor-pointer transition-colors ${
                        xpathQuery === path
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {path}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 font-sans">Gefundener Knoten:</span>{' '}
                    <span className="text-cyan-300 font-bold">{getXpathResult().node}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans">Extrahierter Wert:</span>{' '}
                    <span className="text-emerald-400 font-bold">{getXpathResult().text}</span>
                  </div>
                </div>
              </div>
            )}

            {pipelineStep === 4 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-fuchsia-400 font-semibold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Stufe 4: XSLT – Die Transformation in HTML & Ausgabedesign</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  <strong>Für Mediendesigner besonders spannend:</strong> XSLT nimmt die XML-Rohdaten und wandelt sie über ein Stylesheet-Template in formatiertes HTML um, damit die Daten im Browser ansprechend aussehen.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* Transformation Schema */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5 font-mono">
                    <div className="text-slate-400 font-sans text-[11px] font-semibold">XSLT-Logik:</div>
                    <div className="text-slate-300">
                      XML (Rohdaten)<br />
                      <span className="text-fuchsia-400">+ XSLT (Design-Vorlage)</span><br />
                      <span className="text-emerald-400">= HTML (Ergebnis für Nutzer)</span>
                    </div>
                  </div>

                  {/* Rendered Result */}
                  <div className="p-3 bg-white text-slate-900 rounded-lg border border-slate-200 shadow-sm space-y-1.5 font-sans">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Gerendertes HTML im Web-Browser:
                    </div>
                    <div className="border border-slate-200 rounded p-2.5 bg-slate-50">
                      <div className="text-xs font-bold text-slate-900">Designer-Stuhl</div>
                      <div className="text-xs text-emerald-600 font-semibold mt-0.5">149.00 EUR</div>
                      <div className="text-[10px] text-slate-500 mt-1">Farbe: Schwarz</div>
                      <div className="mt-2 text-[10px] bg-indigo-600 text-white font-semibold px-2 py-1 rounded inline-block">
                        In den Warenkorb
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: XML VS JSON COMPARISON */}
      {activeTab === 'compare' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <strong className="text-teal-400">Prüfungsfokus:</strong> Warum nutzt man heute im Web fast immer JSON statt XML? Hier ist der direkte Gegenüberstellung desselben Produkts:
          </div>

          {/* Side by side code view */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {/* XML Card */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-sans">
                <span className="font-bold text-teal-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" /> XML-Format
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  ca. 128 Bytes
                </span>
              </div>
              <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
{`<produkt>
  <name>Designer-Stuhl</name>
  <preis waehrung="EUR">149.00</preis>
  <farbe>Schwarz</farbe>
</produkt>`}
              </pre>
              <div className="text-[11px] font-sans text-slate-400 pt-1">
                ⚠️ Schließende Tags erzeugen zusätzlichen Overhead und Textballast.
              </div>
            </div>

            {/* JSON Card */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-sans">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" /> JSON-Format
                </span>
                <span className="text-[10px] bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-800/50 font-bold">
                  ca. 78 Bytes (-39%)
                </span>
              </div>
              <pre className="text-amber-200 text-[11px] leading-relaxed overflow-x-auto">
{`{
  "produkt": {
    "name": "Designer-Stuhl",
    "preis": 149.00,
    "farbe": "Schwarz"
  }
}`}
              </pre>
              <div className="text-[11px] font-sans text-emerald-400 pt-1">
                ✅ Sehr kompakt, nativ in JavaScript ohne Parser-Bibliothek lesbar!
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Merkmal</th>
                  <th className="p-3 text-teal-400">XML</th>
                  <th className="p-3 text-amber-400">JSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Struktur</td>
                  <td className="p-3 font-mono text-[11px]">Baumstruktur mit Tags (&lt;tag&gt;)</td>
                  <td className="p-3 font-mono text-[11px]">Schlüssel-Wert-Paare ("key": "val")</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Lesbarkeit</td>
                  <td className="p-3">Etwas überladen durch viele End-Tags (&lt;/tag&gt;)</td>
                  <td className="p-3 text-emerald-400 font-semibold">Sehr kompakt, aufgeräumt und schlank</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Verarbeitung (Parsing)</td>
                  <td className="p-3">Langsamer zu analysieren, benötigt XML-Parser</td>
                  <td className="p-3 text-emerald-400 font-semibold">Sehr schnell, direkt nativ im Webbrowser</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">Typischer Einsatz</td>
                  <td className="p-3">Komplexe Verlagsdokumente, Druckvorstufe, InDesign, Configs</td>
                  <td className="p-3">Web-APIs, moderne Single-Page-Apps, mobiler Datenaustausch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
