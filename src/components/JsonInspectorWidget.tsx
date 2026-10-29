import React, { useState } from 'react';
import { soundEffects } from '../services/audioService';
import { Code, Eye, Sparkles, CheckCircle2, AlertCircle, Sun, CloudRain, CloudSun, Check, RefreshCw } from 'lucide-react';

interface WeatherData {
  ort: string;
  temp: number;
  status: string;
  regenwahrscheinlichkeit: number;
  aktiv: boolean;
}

interface ProjectData {
  projekt: string;
  version: number;
  aktiv: boolean;
  farben: string[];
  leadDesigner: string;
}

export const JsonInspectorWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live-mapper' | 'syntax-quiz'>('live-mapper');
  const [scenario, setScenario] = useState<'weather' | 'project'>('weather');

  // Weather Scenario State
  const [weatherData, setWeatherData] = useState<WeatherData>({
    ort: 'Berlin',
    temp: 22,
    status: 'Sonnig',
    regenwahrscheinlichkeit: 10,
    aktiv: true,
  });

  // Project Scenario State
  const [projectData, setProjectData] = useState<ProjectData>({
    projekt: 'Portfolio Website',
    version: 1.2,
    aktiv: true,
    farben: ['#4f46e5', '#10b981', '#f59e0b'],
    leadDesigner: 'Anna Müller',
  });

  // Syntax Quiz State
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const syntaxQuestions = [
    {
      code: `{\n  'farbe': 'Blau',\n  "version": 1\n}`,
      error: 'Einfache Anführungszeichen',
      isCorrect: false,
      explanation: 'In JSON sind einfache Anführungszeichen (\' \') ungültig! Schlüssel und Strings MÜSSEN in doppelten Anführungszeichen (" ") stehen.',
    },
    {
      code: `{\n  "temp": 24.5,\n  "status": "Heiter",\n  "sonnig": true\n}`,
      error: 'Valides JSON',
      isCorrect: true,
      explanation: 'Perfekt! Schlüssel in doppelten Anführungszeichen, Number mit Punkt (24.5) und Boolean kleingeschrieben (true).',
    },
    {
      code: `{\n  "titel": "App",\n  "seiten": 12,\n}`,
      error: 'Trailing Comma (Komma am Ende)',
      isCorrect: false,
      explanation: 'Trailing Commas (Komma nach dem letzten Element vor der schließenden Klammer) sind in striktem JSON verboten!',
    },
  ];

  const [currentSyntaxIdx, setCurrentSyntaxIdx] = useState(0);
  const currentSyntaxQ = syntaxQuestions[currentSyntaxIdx];

  const handleWeatherChange = (key: keyof WeatherData, val: any) => {
    soundEffects.playClick();
    setWeatherData(prev => ({ ...prev, [key]: val }));
  };

  const handleProjectChange = (key: keyof ProjectData, val: any) => {
    soundEffects.playClick();
    setProjectData(prev => ({ ...prev, [key]: val }));
  };

  const handleSyntaxAnswer = (userSaysValid: boolean) => {
    const isAnswerCorrect = userSaysValid === currentSyntaxQ.isCorrect;
    if (isAnswerCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
    setQuizAnswer(userSaysValid ? 1 : 0);
    setShowExplanation(true);
  };

  const nextSyntaxQuestion = () => {
    soundEffects.playClick();
    setQuizAnswer(null);
    setShowExplanation(false);
    setCurrentSyntaxIdx((prev) => (prev + 1) % syntaxQuestions.length);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Interaktives JSON-Labor: Rohdaten zu UI-Design
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verstehe live, wie Web-APIs Daten im JSON-Format an dein gestaltetes Frontend übergeben.
            </p>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('live-mapper')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'live-mapper'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Live-Mapping
          </button>
          <button
            onClick={() => setActiveTab('syntax-quiz')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'syntax-quiz'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Syntax-Detektiv
          </button>
        </div>
      </div>

      {activeTab === 'live-mapper' && (
        <div className="space-y-4">
          {/* Scenario Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Prüfungsszenario:</span>
            <button
              onClick={() => {
                soundEffects.playClick();
                setScenario('weather');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                scenario === 'weather'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              1. Wetter-API (aus PDF Seite 2 & 3)
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setScenario('project');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                scenario === 'project'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              2. Projekt-Objekt (aus PDF Seite 1)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: JSON Code Block */}
            <div className="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-indigo-400">SERVER-RESPONSE (JSON)</span>
                <span>Content-Type: application/json</span>
              </div>

              {scenario === 'weather' ? (
                <pre className="text-slate-200 leading-relaxed overflow-x-auto">
{`{
  "ort": `}<span className="text-emerald-400">"{weatherData.ort}"</span>{`,
  "temp": `}<span className="text-amber-400">{weatherData.temp}</span>{`,
  "status": `}<span className="text-emerald-400">"{weatherData.status}"</span>{`,
  "regen": `}<span className="text-amber-400">{weatherData.regenwahrscheinlichkeit}</span>{`,
  "aktiv": `}<span className="text-purple-400">{String(weatherData.aktiv)}</span>{`
}`}
                </pre>
              ) : (
                <pre className="text-slate-200 leading-relaxed overflow-x-auto">
{`{
  "projekt": `}<span className="text-emerald-400">"{projectData.projekt}"</span>{`,
  "version": `}<span className="text-amber-400">{projectData.version}</span>{`,
  "aktiv": `}<span className="text-purple-400">{String(projectData.aktiv)}</span>{`,
  "farben": [`}{projectData.farben.map((c, i) => (
                    <span key={i} className="text-emerald-400">"{c}"{i < projectData.farben.length - 1 ? ', ' : ''}</span>
                  ))}{`],
  "lead": `}<span className="text-emerald-400">"{projectData.leadDesigner}"</span>{`
}`}
                </pre>
              )}

              {/* Interactive JSON Modifiers */}
              <div className="pt-3 border-t border-slate-800 text-[11px] space-y-2">
                <div className="text-slate-400 font-sans font-medium">JSON-Werte live manipulieren:</div>
                {scenario === 'weather' ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleWeatherChange('temp', weatherData.temp === 22 ? 31 : 22)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      temp: {weatherData.temp === 22 ? '31' : '22'}
                    </button>
                    <button
                      onClick={() => handleWeatherChange('status', weatherData.status === 'Sonnig' ? 'Regnerisch' : 'Sonnig')}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      status: {weatherData.status === 'Sonnig' ? '"Regnerisch"' : '"Sonnig"'}
                    </button>
                    <button
                      onClick={() => handleWeatherChange('regenwahrscheinlichkeit', weatherData.status === 'Regnerisch' ? 85 : 5)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      regen: {weatherData.status === 'Regnerisch' ? '85%' : '5%'}
                    </button>
                    <button
                      onClick={() => handleWeatherChange('aktiv', !weatherData.aktiv)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      aktiv: {String(!weatherData.aktiv)}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleProjectChange('version', Math.round((projectData.version + 0.1) * 10) / 10)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      +0.1 Version ({projectData.version})
                    </button>
                    <button
                      onClick={() => handleProjectChange('aktiv', !projectData.aktiv)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      Toggle aktiv ({String(projectData.aktiv)})
                    </button>
                    <button
                      onClick={() =>
                        handleProjectChange(
                          'leadDesigner',
                          projectData.leadDesigner === 'Anna Müller' ? 'Ben Weber' : 'Anna Müller'
                        )
                      }
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer transition-colors"
                    >
                      Lead: {projectData.leadDesigner === 'Anna Müller' ? 'Ben' : 'Anna'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Rendered Frontend UI Component */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-700 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>FRONTEND-UI (Mediendesigner Ansicht)</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    Live gerendert
                  </span>
                </div>

                {scenario === 'weather' ? (
                  <div className="space-y-4">
                    <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-sky-500/10 dark:from-indigo-950/40 dark:to-sky-950/40 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/60 text-center space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-bold">{weatherData.ort}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          weatherData.aktiv ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {weatherData.aktiv ? 'LIVE-FEED' : 'OFFLINE'}
                        </span>
                      </div>

                      <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 mx-auto flex items-center justify-center shadow-sm">
                        {weatherData.status === 'Sonnig' ? (
                          <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />
                        ) : (
                          <CloudRain className="w-8 h-8 text-sky-500" />
                        )}
                      </div>

                      <div>
                        <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                          {weatherData.temp}°C
                        </div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          {weatherData.status} (Regen: {weatherData.regenwahrscheinlichkeit}%)
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        💡 Mediengestalter-Kontext (PDF Seite 2 & 3):
                      </p>
                      <p className="mt-1">
                        Der Server liefert reinen Text im JSON-Format. Deine gestaltete Benutzeroberfläche bindet diese Werte per Data-Binding in Kreis-Container, Icons und Typografie ein!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900 dark:text-white text-base">
                          {projectData.projekt}
                        </h5>
                        <span className="text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md font-bold">
                          v{projectData.version}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Projekt-Lead: <span className="font-semibold text-slate-800 dark:text-slate-200">{projectData.leadDesigner}</span>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                          Farb-Array (farben: [ ]):
                        </span>
                        <div className="flex items-center gap-2">
                          {projectData.farben.map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs font-mono">
                              <span
                                className="w-5 h-5 rounded-md border border-slate-300 dark:border-slate-600 shadow-2xs"
                                style={{ backgroundColor: c }}
                              />
                              <span className="text-[10px] text-slate-600 dark:text-slate-400">{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        💡 JSON-Syntaxregel (PDF Seite 1):
                      </p>
                      <p className="mt-1">
                        Objekte mit geschweiften Klammern <code className="text-indigo-600 font-bold">{'{ }'}</code> bündeln Eigenschaften. Listen mit eckigen Klammern <code className="text-indigo-600 font-bold">{'[ ]'}</code> speichern Arrays wie Farbpaletten oder Mitarbeiter.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'syntax-quiz' && (
        <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              Frage {currentSyntaxIdx + 1} von {syntaxQuestions.length}: Ist dieses JSON syntaktisch gültig?
            </span>
            <span className="text-slate-400 text-[11px]">IHK-Syntax-Training</span>
          </div>

          <pre className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
            {currentSyntaxQ.code}
          </pre>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSyntaxAnswer(true)}
              disabled={showExplanation}
              className="flex-1 py-2.5 px-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              ✓ Ja, valides JSON
            </button>
            <button
              onClick={() => handleSyntaxAnswer(false)}
              disabled={showExplanation}
              className="flex-1 py-2.5 px-4 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-200 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              ✗ Nein, Syntaxfehler
            </button>
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-xl text-xs space-y-2 border ${
              (quizAnswer === 1 && currentSyntaxQ.isCorrect) || (quizAnswer === 0 && !currentSyntaxQ.isCorrect)
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {(quizAnswer === 1 && currentSyntaxQ.isCorrect) || (quizAnswer === 0 && !currentSyntaxQ.isCorrect) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Richtig erkannt!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Nicht ganz richtig!</span>
                  </>
                )}
              </div>
              <p>{currentSyntaxQ.explanation}</p>
              <button
                onClick={nextSyntaxQuestion}
                className="mt-2 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Nächstes Syntax-Beispiel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
