import { type FC, useEffect } from 'react';

/**
 * Error messages emitted by browsers when a lazily-imported module cannot be
 * fetched. Each engine words it differently, and the legacy webpack wording is
 * kept so the listener stays correct if a bundled dependency still throws it.
 */
const CHUNK_LOAD_ERROR_MESSAGES = [
  // Chrome / Edge
  'Failed to fetch dynamically imported module',
  // Firefox
  'error loading dynamically imported module',
  // Safari
  'Importing a module script failed',
  // Vite CSS preload helper
  'Unable to preload CSS',
  // Legacy webpack wording
  'ChunkLoadError',
  'Loading chunk',
] as const;

/**
 * Key used to remember the last recovery reload, so a chunk that stays
 * unreachable cannot trap the page in an endless reload loop.
 */
const LAST_RELOAD_STORAGE_KEY = 'chunk-error-last-reload';

/** Minimum delay between two recovery reloads. */
const RELOAD_COOLDOWN_MS = 10_000;

/**
 * Checks whether an error message describes a failed dynamic import.
 *
 * @param message - Message extracted from an error or promise rejection.
 * @returns `true` when the message matches a known chunk-loading failure.
 */
const isChunkLoadErrorMessage = (message: unknown): boolean =>
  typeof message === 'string' &&
  CHUNK_LOAD_ERROR_MESSAGES.some((knownMessage) =>
    message.includes(knownMessage)
  );

/**
 * Reloads the page once to pick up the freshly deployed HTML, unless a reload
 * was already attempted within the cooldown window.
 *
 * @param reason - Short label describing what triggered the recovery.
 */
const reloadOnce = (reason: string): void => {
  try {
    const lastReloadTimestamp = Number(
      window.sessionStorage.getItem(LAST_RELOAD_STORAGE_KEY) ?? '0'
    );

    if (Date.now() - lastReloadTimestamp < RELOAD_COOLDOWN_MS) {
      console.error(
        `Chunk load error (${reason}) persisted after reloading. The requested asset is missing from the server.`
      );
      return;
    }

    window.sessionStorage.setItem(LAST_RELOAD_STORAGE_KEY, String(Date.now()));
  } catch {
    // sessionStorage can throw in private browsing modes; recovery still wins
    // over a broken page, so fall through to the reload.
  }

  console.warn(`Chunk load error (${reason}) detected. Reloading page...`);
  window.location.reload();
};

/**
 * Listens for failed dynamic imports and reloads the page to recover.
 *
 * After a deployment every chunk is emitted under a new content hash, so a tab
 * opened against the previous build requests filenames that no longer exist.
 * Reloading fetches the current HTML and its valid asset references.
 */
export const ChunkErrorListener: FC = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (isChunkLoadErrorMessage(event?.message)) {
        reloadOnce('error');
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadErrorMessage(event?.reason?.message)) {
        reloadOnce('unhandledrejection');
      }
    };

    // Emitted by Vite's module-preload helper before the import itself rejects.
    const handleVitePreloadError = (event: Event) => {
      event.preventDefault();
      reloadOnce('vite:preloadError');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('vite:preloadError', handleVitePreloadError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('vite:preloadError', handleVitePreloadError);
    };
  }, []);

  return null;
};
