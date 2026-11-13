import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Upload,
  Copy,
  Check,
  AlertCircle,
  X,
  HardDrive,
  RefreshCw,
  Trash2,
  RotateCcw,
  FolderArchive,
  Loader2,
} from 'lucide-react';
import {
  downloadBackupFile,
  downloadFullZipBackupFile,
  generateBackupJson,
  restoreBackupJson,
  restoreFullZipBackupFile,
  resetUserStatsToDefault,
  UserSettings,
} from '../services/storageService';
import { getCustomNotebooksBackupStats } from '../services/customNotebookDbService';
import { UserStats } from '../types/quiz';
import { soundEffects } from '../services/audioService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBackupRestored: (stats: UserStats, settings?: UserSettings) => void;
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 KB';
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}

export const BackupModal: React.FC<Props> = ({ isOpen, onClose, onBackupRestored }) => {
  const [copied, setCopied] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isImportingZip, setIsImportingZip] = useState(false);
  const [customStats, setCustomStats] = useState<{
    notebookCount: number;
    mediaCount: number;
    totalBytes: number;
  }>({ notebookCount: 0, mediaCount: 0, totalBytes: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    getCustomNotebooksBackupStats().then((res) => {
      if (active) setCustomStats(res);
    });
    return () => {
      active = false;
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExportDownload = () => {
    soundEffects.playClick();
    downloadBackupFile();
  };

  const handleExportZipDownload = async () => {
    soundEffects.playClick();
    setImportStatus(null);
    setIsExportingZip(true);
    try {
      const res = await downloadFullZipBackupFile();
      setImportStatus({
        type: 'success',
        message:
          res.notebookCount > 0
            ? `Voll-Backup (.zip) erstellt: ${res.notebookCount} eigene Hefte & ${res.mediaCount} Dateien enthalten.`
            : 'Voll-Backup (.zip) erfolgreich heruntergeladen.',
      });
    } catch (err) {
      soundEffects.playWrong();
      setImportStatus({
        type: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'ZIP-Backup konnte nicht erstellt werden.',
      });
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleCopyClipboard = () => {
    soundEffects.playClick();
    const json = generateBackupJson();
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const processImportString = (jsonStr: string) => {
    const result = restoreBackupJson(jsonStr);
    if (result.success && result.stats) {
      soundEffects.playLevelUp();
      setImportStatus({
        type: 'success',
        message: 'Fortschritt erfolgreich wiederhergestellt!',
      });
      setTimeout(() => {
        onBackupRestored(result.stats!, result.settings);
        onClose();
        setImportStatus(null);
        setPasteText('');
      }, 1200);
    } else {
      soundEffects.playWrong();
      setImportStatus({
        type: 'error',
        message: result.error || 'Fehler beim Laden des Backups.',
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = '';
    if (!file) return;

    setImportStatus(null);

    const isZipByExt = file.name.toLowerCase().endsWith('.zip');
    let isZipByHeader = false;
    if (!isZipByExt && file.size >= 4) {
      try {
        const header = new Uint8Array(await file.slice(0, 4).arrayBuffer());
        isZipByHeader = header[0] === 0x50 && header[1] === 0x4b;
      } catch {
        isZipByHeader = false;
      }
    }

    if (isZipByExt || isZipByHeader || file.type === 'application/zip') {
      setIsImportingZip(true);
      try {
        const result = await restoreFullZipBackupFile(file);
        if (result.success && result.stats) {
          soundEffects.playLevelUp();
          const detailParts: string[] = [];
          if (result.restoredCustomNotebooks > 0) {
            detailParts.push(
              `${result.restoredCustomNotebooks} ${
                result.restoredCustomNotebooks === 1 ? 'eigenes Heft' : 'eigene Hefte'
              }`
            );
          }
          if (result.restoredMedia > 0) {
            detailParts.push(
              `${result.restoredMedia} ${
                result.restoredMedia === 1 ? 'Datei' : 'Dateien'
              }`
            );
          }
          const suffix =
            detailParts.length > 0 ? ` (${detailParts.join(' · ')} geladen)` : '';
          setImportStatus({
            type: 'success',
            message: `Backup mit eigenen Inhalten wiederhergestellt${suffix}!`,
          });
          getCustomNotebooksBackupStats().then((res) => setCustomStats(res));
          setTimeout(() => {
            onBackupRestored(result.stats!, result.settings);
            onClose();
            setImportStatus(null);
            setPasteText('');
          }, 1300);
        } else {
          soundEffects.playWrong();
          setImportStatus({
            type: 'error',
            message: result.error || 'ZIP-Backup konnte nicht geladen werden.',
          });
        }
      } finally {
        setIsImportingZip(false);
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        processImportString(content);
      }
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) return;
    processImportString(pasteText.trim());
  };

  const handleResetToZero = () => {
    soundEffects.playClick();
    const fresh = resetUserStatsToDefault();
    setImportStatus({
      type: 'success',
      message: 'Spielstand erfolgreich auf 0 EXP zurückgesetzt!',
    });
    setTimeout(() => {
      onBackupRestored(fresh);
      setShowResetConfirm(false);
      onClose();
    }, 800);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full my-auto flex flex-col max-h-[88vh] overflow-hidden relative transition-colors"
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Fortschritt sichern &amp; wiederherstellen
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sichere Level, XP, Haustier, Notizen &amp; eigene Hefte (PDF/Bilder).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Status Message */}
          {importStatus && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-150 ${
                importStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/80'
              }`}
            >
              {importStatus.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Section 1: Export / Download */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                1. Extern Speichern (Backup Export)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">.json / .zip</span>
            </div>

            {/* Option A: Standard Backup (.json) */}
            <div className="p-3 bg-white dark:bg-slate-900/70 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Backup
                </span>
                <span className="text-[10px] text-slate-500 font-mono">.json Datei</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Kompakte Sicherung für Spielstand, Einstellungen und alle Markierungen, Textfelder, Sticker-Werte &amp; Blatt-Drehungen (ohne lokale Bild-/PDF-Dateien).
              </p>
              {(customStats.notebookCount > 0 || customStats.mediaCount > 0) && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-lg px-2.5 py-1.5 leading-snug">
                  Hinweis: Du hast {customStats.mediaCount}{' '}
                  {customStats.mediaCount === 1 ? 'lokale Datei' : 'lokale Dateien'} (eigene Hefte oder auf Seiten eingefügte Bilder). Für eine komplette Sicherung nutze unten das <span className="font-mono font-semibold">.zip</span>-Backup.
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleExportDownload}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Backup herunterladen</span>
                </button>

                <button
                  onClick={handleCopyClipboard}
                  className="py-2.5 px-3.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Backup-Text in Zwischenablage kopieren"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Kopiert!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>Text kopieren</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Option B: Full Backup with Custom Booklets & Media (.zip) */}
            <div className="p-3 bg-white dark:bg-slate-900/70 rounded-xl border border-indigo-200/80 dark:border-indigo-900/70 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Backup mit eigenen Inhalten
                </span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
                  .zip Archiv
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Vollständige Sicherung inklusive aller eigenen Hefte, <span className="font-semibold">Blatt Blanko</span>, lokal auf Seiten eingefügter Bilder, Textfelder, Sticker &amp; PDFs sowie dem kompletten Lernfortschritt.
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tabular-nums">
                {customStats.notebookCount > 0 || customStats.mediaCount > 0 ? (
                  <span>
                    Aktuell gespeichert: {customStats.notebookCount}{' '}
                    {customStats.notebookCount === 1 ? 'eigenes Heft' : 'eigene Hefte'} ·{' '}
                    {customStats.mediaCount}{' '}
                    {customStats.mediaCount === 1 ? 'lokale Medien-Datei' : 'lokale Medien-Dateien'} (
                    {formatBytes(customStats.totalBytes)})
                  </span>
                ) : (
                  <span>Aktuell keine lokalen Medien gespeichert – exportiert komplettes .zip Archiv</span>
                )}
              </div>
              <button
                type="button"
                onClick={handleExportZipDownload}
                disabled={isExportingZip || isImportingZip}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-60 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isExportingZip ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ZIP-Archiv wird erstellt...</span>
                  </>
                ) : (
                  <>
                    <FolderArchive className="w-4 h-4" />
                    <span>Backup mit eigenen Inhalten (.zip)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section 2: Import / Restore */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                2. Backup Importieren &amp; Laden
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Wiederherstellung</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Wähle eine gespeicherte <span className="font-mono">.json</span>- oder{' '}
              <span className="font-mono">.zip</span>-Backup-Datei aus (eigene Hefte und Bilder werden automatisch mit importiert) oder füge den JSON-Code ein:
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json,.zip,application/zip"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImportingZip || isExportingZip}
              className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/30 disabled:opacity-60 text-teal-700 dark:text-teal-300 border border-dashed border-teal-300 dark:border-teal-700/80 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isImportingZip ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600 dark:text-teal-400" />
                  <span>ZIP-Backup &amp; eigene Hefte werden wiederhergestellt...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Backup-Datei (.json oder .zip) auswählen</span>
                </>
              )}
            </button>

            {/* Alternative: Text Paste */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Oder Backup-JSON direkt einfügen:
              </span>
              <div className="flex gap-2">
                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder='Füge den Backup JSON-Code hier ein... {"app": "DesignKonzept.prep", ...}'
                  className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500 resize-none h-20"
                />
              </div>
              {pasteText.trim().length > 0 && (
                <button
                  onClick={handlePasteSubmit}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Eingefügten Fortschritt laden</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 3: Reset to 0 EXP */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                3. Spielstand auf 0 EXP zurücksetzen
              </span>
              <span className="text-[10px] text-rose-500 font-mono">Neustart</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Möchtest du komplett von vorne anfangen? Setzt EXP auf 0 und setzt alle Kapitel zurück, damit du jede Belohnung frisch erspielen kannst.
            </p>

            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>Spielstand auf 0 EXP zurücksetzen</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl space-y-2">
                <p className="text-xs font-medium text-rose-800 dark:text-rose-300 text-center">
                  Bist du sicher? Alle bisherigen XP und Antworten werden auf 0 gesetzt!
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleResetToZero}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    Ja, auf 0 EXP zurücksetzen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center leading-normal shrink-0 flex items-center justify-between">
          <span className="text-slate-400 text-[10px]">🔒 Privates lokales Backup</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
