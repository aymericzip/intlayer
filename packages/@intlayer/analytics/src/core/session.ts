/**
 * Anonymous, per-tab session identity. Stored in `sessionStorage` so it is
 * cleared when the tab closes and is never shared across sites — no durable
 * cookie, no cross-site tracking, no PII.
 */

const SESSION_STORAGE_KEY = '__intlayer_analytics_sid__';

/**
 * Generates a random, opaque session identifier.
 *
 * @returns A URL-safe random string.
 */
const generateSessionId = (): string => {
  const cryptoObj =
    typeof globalThis !== 'undefined'
      ? (globalThis.crypto as Crypto | undefined)
      : undefined;

  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID (older RN/Lynx)
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

/**
 * Returns the current session id, creating and persisting one on first access.
 * Degrades gracefully to an in-memory id when `sessionStorage` is unavailable
 * (private mode, native runtimes).
 *
 * @returns The stable session id for the lifetime of the tab.
 */
export const getSessionId = (): string => {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return generateSessionId();
  }

  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;

    const created = generateSessionId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
    return created;
  } catch {
    // sessionStorage can throw (Safari private mode, quota) — never break the app
    return generateSessionId();
  }
};
