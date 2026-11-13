import React from 'react';
import { Keyboard, X } from 'lucide-react';

export function isMacLikePlatform(): boolean {
  if (typeof navigator === 'undefined') return true;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = (
    nav.userAgentData?.platform ||
    navigator.platform ||
    navigator.userAgent ||
    ''
  ).toLowerCase();
  return /mac|iphone|ipad|ipod/.test(platform);
}

interface ShortcutRow {
  label: string;
  keys: string[];
  altKeys?: string[];
}

interface ShortcutGroup {
  title: string;
  rows: ShortcutRow[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotebookShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isMac = isMacLikePlatform();
  const cmd = isMac ? '⌘' : 'Strg';
  const shift = isMac ? '⇧' : 'Umschalt';
  const del = isMac ? '⌫' : 'Entf';

  const groups: ShortcutGroup[] = [
    {
      title: 'Bearbeiten',
      rows: [
        { label: 'Rückgängig machen', keys: [cmd, 'Z'] },
        {
          label: 'Wiederholen',
          keys: isMac ? ['⇧', '⌘', 'Z'] : ['Strg', 'Umschalt', 'Z'],
          altKeys: [cmd, 'Y'],
        },
        { label: 'Bild aus Zwischenablage einfügen', keys: [cmd, 'V'] },
        { label: 'Markiertes Element / Haftnotiz löschen', keys: [del] },
        { label: 'Auswahl, Menü oder Vollbild schließen', keys: ['Esc'] },
      ],
    },
    {
      title: 'Werkzeuge (außerhalb von Textfeldern)',
      rows: [
        { label: 'Hand / Verschieben & Auswählen', keys: ['1'] },
        { label: 'Textmarker (nochmal drücken: Optionen)', keys: ['2'] },
        { label: 'Freihand-Stift (nochmal drücken: Optionen)', keys: ['3'] },
        { label: 'Gerade Stift- oder Marker-Linie zeichnen', keys: [shift, 'Ziehen'] },
        { label: 'Radierer', keys: ['4'] },
        { label: 'Textfeld (nochmal drücken: Optionen)', keys: ['5'] },
        { label: 'Klebezettel (nochmal drücken: Farbe)', keys: ['6'] },
        { label: 'Lern-Sticker (nochmal drücken: Auswahl)', keys: ['7'] },
        { label: 'Nur-Stift-Modus (Apple Pencil Schutz)', keys: [shift, 'P'] },
      ],
    },
    {
      title: 'Textfeld formatieren (beim Tippen)',
      rows: [
        { label: 'Fett ein-/ausschalten', keys: [cmd, 'B'] },
        { label: 'Kursiv ein-/ausschalten', keys: [cmd, 'I'] },
        { label: 'Unterstrichen ein-/ausschalten', keys: [cmd, 'U'] },
        {
          label: 'Durchgestrichen ein-/ausschalten',
          keys: isMac ? ['⇧', '⌘', 'X'] : ['Strg', 'Umschalt', 'X'],
        },
      ],
    },
    {
      title: 'Ansicht & Seitensteuerung',
      rows: [
        { label: 'Vorherige / Nächste Seite', keys: ['←'], altKeys: ['→'] },
        { label: 'Hineinzoomen', keys: [cmd, '+'] },
        { label: 'Herauszoomen', keys: [cmd, '-'] },
        { label: 'Zoom auf 100 % zurücksetzen', keys: [cmd, '0'] },
        { label: 'Aktuelle Seite um 90° drehen', keys: [shift, 'R'] },
        { label: 'Vollbildmodus umschalten', keys: ['F'], altKeys: isMac ? ['⇧', '⌘', 'F'] : ['Strg', 'Umschalt', 'F'] },
        { label: 'Seitenübersicht ein-/ausblenden', keys: ['G'], altKeys: isMac ? ['⇧', '⌘', 'S'] : ['Strg', 'Umschalt', 'S'] },
        { label: 'Diese Übersicht öffnen/schließen', keys: ['?'], altKeys: [cmd, '/'] },
      ],
    },
  ];

  const renderKeyCap = (k: string, idx: number) => (
    <kbd
      key={`${k}-${idx}`}
      className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono text-[11px] font-bold shadow-2xs"
    >
      {k}
    </kbd>
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notebook-shortcuts-title"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full my-auto flex flex-col max-h-[86vh] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="notebook-shortcuts-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight"
              >
                Tastaturkürzel im Heft
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isMac
                  ? 'Optimiert für Mac & iPad-Tastatur (Strg funktioniert ebenso)'
                  : 'Optimiert für Tastatursteuerung (Mac-⌘ funktioniert ebenso)'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Übersicht schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {groups.map((group) => (
            <section key={group.title} className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {group.title}
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-xl bg-slate-50/60 dark:bg-slate-950/40">
                {group.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 px-3.5 py-2 text-xs"
                  >
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {row.label}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="inline-flex items-center gap-1">
                        {row.keys.map((k, idx) => renderKeyCap(k, idx))}
                      </span>
                      {row.altKeys && (
                        <>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                            /
                          </span>
                          <span className="inline-flex items-center gap-1">
                            {row.altKeys.map((k, idx) => renderKeyCap(k, idx))}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
          <span>Beim Tippen in Textfeldern bleiben Textkürzel unverändert.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs cursor-pointer transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
