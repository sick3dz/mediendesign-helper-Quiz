declare const __APP_BUILD_ID__: string | undefined;
declare const __APP_BUILT_AT__: string | undefined;

export const UPDATE_CHECK_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 hours
const FAILURE_RETRY_COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes
const UPDATE_STATE_STORAGE_KEY = 'designkonzept_app_update_state_v1';
const RELOAD_QUERY_PARAM = '__app_reload';

export interface AppUpdateStatus {
  currentBuildId: string;
  currentBuiltAt: string | null;
  lastCheckedAt: number | null;
  lastAttemptedAt: number | null;
  updateAvailable: boolean;
  detectedBuildId: string | null;
  detectedBuiltAt: string | null;
  detectedSignature: string | null;
  isChecking: boolean;
  lastError: string | null;
}

export interface AppUpdateCheckResult {
  checked: boolean;
  updateAvailable: boolean;
  status: AppUpdateStatus;
  error?: string;
}

interface PersistedUpdateState {
  lastCheckedAt: number | null;
  lastAttemptedAt: number | null;
  updateAvailable: boolean;
  detectedBuildId: string | null;
  detectedBuiltAt: string | null;
  detectedSignature: string | null;
}

const CURRENT_BUILD_ID =
  typeof __APP_BUILD_ID__ === 'string' && __APP_BUILD_ID__.length > 0
    ? __APP_BUILD_ID__
    : 'runtime-local';

const CURRENT_BUILT_AT =
  typeof __APP_BUILT_AT__ === 'string' && __APP_BUILT_AT__.length > 0
    ? __APP_BUILT_AT__
    : null;

function getDomAssetSignature(doc: Document = document): string | null {
  if (typeof doc === 'undefined') return null;
  const assets: string[] = [];
  doc.querySelectorAll('script[src], link[rel="stylesheet"][href]').forEach((el) => {
    const raw = el.getAttribute('src') || el.getAttribute('href') || '';
    const cleaned = raw.split('?')[0].split('#')[0];
    const match = cleaned.match(/\/assets\/[^/]+-[a-zA-Z0-9_-]{6,}\.(?:js|css)$/);
    if (match) {
      assets.push(match[0]);
    }
  });
  if (assets.length === 0) return null;
  return Array.from(new Set(assets)).sort().join('|');
}

function extractHtmlAssetSignature(html: string): string | null {
  const matches = html.match(/(?:\.?\/)?assets\/[^"'`\s?]+-[a-zA-Z0-9_-]{6,}\.(?:js|css)/g);
  if (!matches || matches.length === 0) return null;
  const normalized = matches.map((m) => (m.startsWith('/') ? m : `/${m.replace(/^\.\//, '')}`));
  return Array.from(new Set(normalized)).sort().join('|');
}

function readPersistedState(): PersistedUpdateState {
  const fallback: PersistedUpdateState = {
    lastCheckedAt: null,
    lastAttemptedAt: null,
    updateAvailable: false,
    detectedBuildId: null,
    detectedBuiltAt: null,
    detectedSignature: null,
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(UPDATE_STATE_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedUpdateState>;

    const state: PersistedUpdateState = {
      lastCheckedAt:
        typeof parsed.lastCheckedAt === 'number' && Number.isFinite(parsed.lastCheckedAt)
          ? parsed.lastCheckedAt
          : null,
      lastAttemptedAt:
        typeof parsed.lastAttemptedAt === 'number' && Number.isFinite(parsed.lastAttemptedAt)
          ? parsed.lastAttemptedAt
          : null,
      updateAvailable: Boolean(parsed.updateAvailable),
      detectedBuildId:
        typeof parsed.detectedBuildId === 'string' ? parsed.detectedBuildId : null,
      detectedBuiltAt:
        typeof parsed.detectedBuiltAt === 'string' ? parsed.detectedBuiltAt : null,
      detectedSignature:
        typeof parsed.detectedSignature === 'string' ? parsed.detectedSignature : null,
    };

    // If the app is already running the detected build or asset signature, clear update flag.
    const currentSignature = typeof document !== 'undefined' ? getDomAssetSignature(document) : null;
    const matchedBuild =
      Boolean(state.detectedBuildId) && state.detectedBuildId === CURRENT_BUILD_ID;
    const matchedSignature =
      Boolean(state.detectedSignature) &&
      Boolean(currentSignature) &&
      state.detectedSignature === currentSignature;

    if (state.updateAvailable && (matchedBuild || matchedSignature)) {
      state.updateAvailable = false;
      state.detectedBuildId = null;
      state.detectedBuiltAt = null;
      state.detectedSignature = null;
      writePersistedState(state);
    }

    return state;
  } catch {
    return fallback;
  }
}

function writePersistedState(state: PersistedUpdateState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(UPDATE_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors
  }
}

let inMemoryStatus: AppUpdateStatus = (() => {
  const persisted = readPersistedState();
  return {
    currentBuildId: CURRENT_BUILD_ID,
    currentBuiltAt: CURRENT_BUILT_AT,
    lastCheckedAt: persisted.lastCheckedAt,
    lastAttemptedAt: persisted.lastAttemptedAt,
    updateAvailable: persisted.updateAvailable,
    detectedBuildId: persisted.detectedBuildId,
    detectedBuiltAt: persisted.detectedBuiltAt,
    detectedSignature: persisted.detectedSignature,
    isChecking: false,
    lastError: null,
  };
})();

const listeners = new Set<(status: AppUpdateStatus) => void>();
let activeCheckPromise: Promise<AppUpdateCheckResult> | null = null;

function notifyListeners(): void {
  const snapshot = { ...inMemoryStatus };
  listeners.forEach((fn) => fn(snapshot));
}

function updateState(patch: Partial<AppUpdateStatus>, persist = true): AppUpdateStatus {
  inMemoryStatus = {
    ...inMemoryStatus,
    ...patch,
  };
  if (persist) {
    writePersistedState({
      lastCheckedAt: inMemoryStatus.lastCheckedAt,
      lastAttemptedAt: inMemoryStatus.lastAttemptedAt,
      updateAvailable: inMemoryStatus.updateAvailable,
      detectedBuildId: inMemoryStatus.detectedBuildId,
      detectedBuiltAt: inMemoryStatus.detectedBuiltAt,
      detectedSignature: inMemoryStatus.detectedSignature,
    });
  }
  notifyListeners();
  return { ...inMemoryStatus };
}

export function cleanReloadQueryParamOnBoot(): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has(RELOAD_QUERY_PARAM)) {
      url.searchParams.delete(RELOAD_QUERY_PARAM);
      const nextUrl = `${url.pathname}${url.search}${url.hash}` || '/';
      window.history.replaceState(null, '', nextUrl);
    }
  } catch {
    // ignore URL errors
  }
}

export function getAppUpdateStatus(): AppUpdateStatus {
  return { ...inMemoryStatus };
}

export function subscribeAppUpdateStatus(listener: (status: AppUpdateStatus) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function shouldRunScheduledUpdateCheck(now: number = Date.now()): boolean {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return false;
  }
  if (
    inMemoryStatus.lastAttemptedAt !== null &&
    now - inMemoryStatus.lastAttemptedAt < FAILURE_RETRY_COOLDOWN_MS
  ) {
    return false;
  }
  if (inMemoryStatus.lastCheckedAt === null) {
    return true;
  }
  return now - inMemoryStatus.lastCheckedAt >= UPDATE_CHECK_INTERVAL_MS;
}

async function fetchWithTimeout(input: string, timeoutMs: number = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timer);
  }
}

export async function checkForAppUpdate(options?: {
  manual?: boolean;
}): Promise<AppUpdateCheckResult> {
  const isManual = Boolean(options?.manual);

  if (activeCheckPromise) {
    return activeCheckPromise;
  }

  if (typeof window === 'undefined') {
    return {
      checked: false,
      updateAvailable: inMemoryStatus.updateAvailable,
      status: getAppUpdateStatus(),
    };
  }

  activeCheckPromise = (async () => {
    const attemptTime = Date.now();
    updateState(
      {
        isChecking: true,
        lastAttemptedAt: attemptTime,
        ...(isManual ? { lastError: null } : {}),
      },
      true
    );

    try {
      const nonce = `${attemptTime}-${Math.random().toString(36).slice(2, 7)}`;
      const versionUrl = new URL(`version.json?__uc=${nonce}`, document.baseURI).toString();
      let remoteBuildId: string | null = null;
      let remoteBuiltAt: string | null = null;
      let remoteSignature: string | null = null;
      let verifiedRemoteSource = false;

      // 1. Primary signal: version.json emitted at build time (or served by Vite dev middleware)
      try {
        const res = await fetchWithTimeout(versionUrl);
        const contentType = (res.headers.get('content-type') || '').toLowerCase();
        if (res.ok && contentType.includes('json')) {
          const data = (await res.json()) as { buildId?: unknown; builtAt?: unknown };
          if (typeof data?.buildId === 'string' && data.buildId.trim().length > 0) {
            remoteBuildId = data.buildId.trim();
            remoteBuiltAt = typeof data.builtAt === 'string' ? data.builtAt : null;
            verifiedRemoteSource = true;
          }
        }
      } catch {
        // Fallback below will still try live index HTML
      }

      // 2. Secondary signal: compare hashed production asset URLs in live HTML
      const localSignature = getDomAssetSignature(document);
      if (localSignature || !verifiedRemoteSource) {
        const indexBase = new URL('./', document.baseURI);
        indexBase.searchParams.set('__uc', nonce);
        const htmlRes = await fetchWithTimeout(indexBase.toString());
        if (htmlRes.ok) {
          const htmlText = await htmlRes.text();
          remoteSignature = extractHtmlAssetSignature(htmlText);
          if (localSignature && remoteSignature) {
            verifiedRemoteSource = true;
          } else if (!verifiedRemoteSource && htmlText.includes('<div id="root">')) {
            verifiedRemoteSource = true;
          }
        }
      }

      if (!verifiedRemoteSource) {
        throw new Error('Serverantwort konnte nicht eindeutig geprüft werden.');
      }

      const buildChanged =
        Boolean(remoteBuildId) &&
        CURRENT_BUILD_ID !== 'runtime-local' &&
        remoteBuildId !== CURRENT_BUILD_ID;

      const assetsChanged =
        Boolean(localSignature) &&
        Boolean(remoteSignature) &&
        remoteSignature !== localSignature;

      const updateDetected = buildChanged || assetsChanged;
      const completedAt = Date.now();

      const nextStatus = updateState(
        {
          isChecking: false,
          lastCheckedAt: completedAt,
          lastAttemptedAt: completedAt,
          updateAvailable: updateDetected,
          detectedBuildId: updateDetected ? remoteBuildId : null,
          detectedBuiltAt: updateDetected ? remoteBuiltAt : null,
          detectedSignature: updateDetected ? remoteSignature : null,
          lastError: null,
        },
        true
      );

      return {
        checked: true,
        updateAvailable: updateDetected,
        status: nextStatus,
      };
    } catch {
      const errorMsg = isManual
        ? 'Prüfung fehlgeschlagen. Bitte Internetverbindung prüfen und erneut versuchen.'
        : null;
      const nextStatus = updateState(
        {
          isChecking: false,
          lastError: errorMsg,
        },
        true
      );
      return {
        checked: false,
        updateAvailable: nextStatus.updateAvailable,
        status: nextStatus,
        error: errorMsg || undefined,
      };
    } finally {
      activeCheckPromise = null;
    }
  })();

  return activeCheckPromise;
}

/**
 * Clears HTTP Cache Storage / Service Workers if present and reloads the WebApp cleanly.
 * Strictly preserves all user data in localStorage and IndexedDB (stats, settings, custom notebooks & media).
 */
export async function forceSafeAppReload(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    if ('caches' in window && typeof window.caches?.keys === 'function') {
      const keys = await window.caches.keys();
      await Promise.all(keys.map((key) => window.caches.delete(key)));
    }
  } catch {
    // ignore cache API failures
  }

  try {
    if ('serviceWorker' in navigator && typeof navigator.serviceWorker?.getRegistrations === 'function') {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
    }
  } catch {
    // ignore service worker failures
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set(RELOAD_QUERY_PARAM, String(Date.now()));
    window.location.replace(url.toString());
  } catch {
    window.location.reload();
  }
}

export function formatUpdateTimestamp(timestamp: number | null): string {
  if (!timestamp) return 'Noch nicht geprüft';
  try {
    return (
      new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(timestamp)) + ' Uhr'
    );
  } catch {
    return new Date(timestamp).toLocaleString('de-DE');
  }
}
