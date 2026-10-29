import React, { useState } from 'react';
import { soundEffects } from '../services/audioService';
import { Layers, Globe, Printer, Mail, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, FileText, Check } from 'lucide-react';

interface ProductSource {
  produktname: string;
  artikelnummer: string;
  preis: number;
  kurzbeschreibung: string;
  detailtext: string;
  bildRechte: string;
  autor: string;
  kategorie: string;
  status: 'freigegeben' | 'entwurf';
}

export const CrossmediaPublishingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ssp-simulator' | 'workflow-check'>('ssp-simulator');
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'web' | 'print' | 'newsletter'>('all');

  // Single Source Data Record (the "Single Source of Truth")
  const [sourceData, setSourceData] = useState<ProductSource>({
    produktname: 'ErgoWave Pro Tastatur',
    artikelnummer: 'KB-8842',
    preis: 129.99,
    kurzbeschreibung: 'Ergonomische Tastatur mit geteiltem Tastenfeld & Handballenauflage.',
    detailtext: 'Entwickelt für schmerzfreies Arbeiten im Agenturalltag. Hochwertige mechanische Schalter mit gedämpfter Akustik und programmierbaren Makrotasten.',
    bildRechte: '© 2026 Studio Lichtbild (Print & Web Lizenz)',
    autor: 'Redaktion Hardware',
    kategorie: 'Eingabegeräte',
    status: 'freigegeben',
  });

  // Workflow Checklist State
  const [checkedSteps, setCheckedSteps] = useState<{ [stepId: number]: boolean }>({
    1: true,
    2: true,
  });

  const workflowSteps = [
    {
      id: 1,
      title: '1. Daten strukturiert erfassen',
      desc: 'Inhalte in klar bezeichneten Feldern erfassen (Produktname, Preis, Beschreibung, Metadaten).',
    },
    {
      id: 2,
      title: '2. Inhalt & Gestaltung trennen',
      desc: 'Keine Layout-Tags („fett 24pt“) einbacken, sondern semantische Rollen definieren (H1, Preis).',
    },
    {
      id: 3,
      title: '3. Passende Vorlage (Template) wählen',
      desc: 'Für jedes Zielmedium (Webshop, InDesign-Katalog, Newsletter) ein Template anbinden.',
    },
    {
      id: 4,
      title: '4. Mediengerecht ausgeben',
      desc: 'Web: RGB, 72/144 DPI, kurze Teaser. Print: CMYK, 300 DPI, vollständiger Fließtext.',
    },
    {
      id: 5,
      title: '5. Ergebnis & Qualität kontrollieren',
      desc: 'Pflichtfelder, Preise, Bildrechte und typografische Umbrüche vor Veröffentlichung prüfen.',
    },
  ];

  const handleToggleStep = (id: number) => {
    soundEffects.playClick();
    setCheckedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateSourceField = (field: keyof ProductSource, value: any) => {
    soundEffects.playClick();
    setSourceData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Single Source Publishing (SSP) & Crossmedia-Simulator
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ein zentraler Datenbestand – automatisierte Ausgabe in Webshop, Druck-Katalog und Newsletter.
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ssp-simulator')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'ssp-simulator'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Multi-Channel Ausgabe
          </button>
          <button
            onClick={() => setActiveTab('workflow-check')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'workflow-check'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            5-Schritte-Workflow
          </button>
        </div>
      </div>

      {activeTab === 'ssp-simulator' && (
        <div className="space-y-5">
          {/* Top: Central Single Source Data Box */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-teal-500/40 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider text-[11px]">
                  Zentraler medienneutraler Datensatz (Single Source of Truth)
                </span>
                <span className="text-[10px] bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold px-2 py-0.5 rounded-full">
                  Art.-Nr: {sourceData.artikelnummer}
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">Änderung wirkt auf alle Kanäle!</span>
            </div>

            {/* Quick Live Editing Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Produktname:
                </label>
                <input
                  type="text"
                  value={sourceData.produktname}
                  onChange={e => updateSourceField('produktname', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Preis (€):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={sourceData.preis}
                  onChange={e => updateSourceField('preis', parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-medium focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Status / Freigabe:
                </label>
                <button
                  onClick={() => updateSourceField('status', sourceData.status === 'freigegeben' ? 'entwurf' : 'freigegeben')}
                  className={`w-full py-1.5 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    sourceData.status === 'freigegeben'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{sourceData.status === 'freigegeben' ? 'Freigegeben' : 'In Bearbeitung'}</span>
                </button>
              </div>
            </div>

            {/* Metadaten Badge */}
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
              <span>Metadaten: <strong className="text-slate-700 dark:text-slate-300">{sourceData.bildRechte}</strong></span>
              <span>·</span>
              <span>Autor: <strong className="text-slate-700 dark:text-slate-300">{sourceData.autor}</strong></span>
            </div>
          </div>

          {/* Filter channel tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Ausgabemedium:</span>
            <button
              onClick={() => setSelectedChannel('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedChannel === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Alle 3 Kanäle vergleichen
            </button>
            <button
              onClick={() => setSelectedChannel('web')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedChannel === 'web'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              1. Webshop
            </button>
            <button
              onClick={() => setSelectedChannel('print')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedChannel === 'print'
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              2. Druckkatalog
            </button>
            <button
              onClick={() => setSelectedChannel('newsletter')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedChannel === 'newsletter'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              3. Newsletter
            </button>
          </div>

          {/* 3 Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Channel 1: Webshop Card */}
            {(selectedChannel === 'all' || selectedChannel === 'web') && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                      <Globe className="w-3.5 h-3.5" />
                      Kanal A: Web-Shop
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">RGB · 72 DPI</span>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full h-24 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center text-indigo-400 text-xs font-mono">
                      <span>⌨️ Web-Hero (sRGB)</span>
                    </div>

                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      {sourceData.produktname}
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {sourceData.kurzbeschreibung}
                    </p>

                    <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                      {sourceData.preis.toFixed(2)} €
                    </div>
                  </div>
                </div>

                <button className="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-xs">
                  In den Warenkorb
                </button>
              </div>
            )}

            {/* Channel 2: Print Catalog Card */}
            {(selectedChannel === 'all' || selectedChannel === 'print') && (
              <div className="bg-amber-50/40 dark:bg-slate-800 rounded-xl border border-amber-200/80 dark:border-slate-700 p-4 shadow-xs flex flex-col justify-between space-y-3 font-serif">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/60 dark:border-slate-700 text-xs font-sans">
                    <span className="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                      <Printer className="w-3.5 h-3.5" />
                      Kanal B: Print-Katalog
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">CMYK · 300 DPI</span>
                  </div>

                  <div className="space-y-2 font-sans">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      KATALOGSEITE 48 · {sourceData.kategorie}
                    </div>

                    <h5 className="font-bold text-slate-900 dark:text-white text-sm font-serif">
                      {sourceData.produktname}
                    </h5>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      {sourceData.detailtext}
                    </p>

                    <div className="flex items-baseline justify-between pt-1 border-t border-dashed border-amber-300 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 font-mono">Art. {sourceData.artikelnummer}</span>
                      <span className="text-sm font-bold text-rose-700 dark:text-rose-400 font-mono">
                        UVP: {sourceData.preis.toFixed(2)} €
                      </span>
                    </div>

                    <div className="text-[9px] text-slate-400 italic">
                      {sourceData.bildRechte}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-center text-slate-400 font-sans border-t border-amber-200/40 pt-1">
                  Offsetdruck ISO Coated v2
                </div>
              </div>
            )}

            {/* Channel 3: Newsletter Card */}
            {(selectedChannel === 'all' || selectedChannel === 'newsletter') && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <Mail className="w-3.5 h-3.5" />
                      Kanal C: E-Mail Newsletter
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Kompakt-Teaser</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                      TIPP DER WOCHE
                    </span>

                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      Neu: {sourceData.produktname}
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {sourceData.kurzbeschreibung}
                    </p>

                    <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      Jetzt nur {sourceData.preis.toFixed(2)} €
                    </div>
                  </div>
                </div>

                <button className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-xs">
                  Jetzt entdecken →
                </button>
              </div>
            )}
          </div>

          <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 text-xs text-teal-950 dark:text-teal-200">
            <strong>💡 Das IHK-Prüfungsfazit:</strong> Inhalt und Struktur sind medienneutral gespeichert. Ändert sich der Preis von {sourceData.preis.toFixed(2)} € auf einen neuen Betrag, wird er mit einem einzigen Klick im Webshop, im Druckkatalog und im Newsletter konsistent und fehlerfrei aktualisiert!
          </div>
        </div>
      )}

      {activeTab === 'workflow-check' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              Der offizielle IHK-Ablauf: Medienneutrale Produktion
            </span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold text-[11px]">
              Prüfungstipp: Den 5-Phasen-Kreislauf beherrschen!
            </span>
          </div>

          <div className="space-y-2.5">
            {workflowSteps.map(step => {
              const isChecked = Boolean(checkedSteps[step.id]);
              return (
                <div
                  key={step.id}
                  onClick={() => handleToggleStep(step.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors flex items-start gap-3 ${
                    isChecked
                      ? 'bg-teal-50/60 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800 text-slate-800 dark:text-slate-200'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-teal-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-0.5">
                      {step.title}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-600 dark:text-slate-300">
            <strong>Merke für die Prüfungsantwort:</strong> Erkläre nicht nur <em>„Inhalte können mehrfach genutzt werden“</em>, sondern benenne den vollständigen Ablauf:
            <span className="block mt-1 font-mono text-teal-700 dark:text-teal-300 font-bold">
              Erfassen → Trennen → Vorlage/Template wählen → Mediengerecht ausgeben → Qualität kontrollieren!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
