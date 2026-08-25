/**
 * Short-lived ingest token used to authorise analytics batches.
 *
 * The SDK runs in the browser, where no confidential credential can be kept, so
 * it exchanges the project's **public** `clientId` for a token scoped to
 * analytics ingestion and nothing else. The backend authorises the exchange by
 * the request's `Origin`, which the page cannot forge.
 *
 * The token is read synchronously at flush time — the flush-on-hide path runs
 * during `pagehide` and cannot await anything — so it is fetched ahead of time
 * and cached, both in memory and in `sessionStorage` so a multi-page visit
 * exchanges once per tab rather than once per navigation.
 */

/** `sessionStorage` key holding the cached token for this tab. */
const TOKEN_STORAGE_KEY = '__intlayer_public_token__';

/**
 * Refresh margin: a token within this window of expiry is treated as expired,
 * so a batch is never sent with a token that dies in flight.
 */
const EXPIRY_MARGIN_MS = 60 * 1000;

type CachedToken = {
  token: string;
  /** Epoch milliseconds. */
  expiresAt: number;
};

/** Reads the cached token for this tab, ignoring an unusable cache. */
const readStoredToken = (): CachedToken | null => {
  try {
    const raw = window.sessionStorage?.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedToken;

    if (typeof parsed?.token !== 'string') return null;
    if (typeof parsed?.expiresAt !== 'number') return null;

    return parsed;
  } catch {
    // Private mode, disabled storage, or corrupted entry — start fresh.
    return null;
  }
};

/** Persists the token for this tab. Best-effort: storage may be unavailable. */
const writeStoredToken = (cached: CachedToken): void => {
  try {
    window.sessionStorage?.setItem(TOKEN_STORAGE_KEY, JSON.stringify(cached));
  } catch {
    /* ignore — the in-memory cache still applies for this page */
  }
};

/** Options accepted by {@link createPublicTokenManager}. */
export type PublicTokenManagerOptions = {
  /** Backend base URL, without a trailing slash. */
  backendURL: string;
  /** The project's public key (`editor.clientId`). */
  clientId?: string;
};

/** Synchronous accessor + background refresher for the ingest token. */
export type PublicTokenManager = {
  /**
   * The currently valid token, or `undefined` when none has been obtained yet.
   * Never blocks and never triggers a request.
   */
  getToken: () => string | undefined;
  /**
   * Ensures a valid token is being fetched. Safe to call repeatedly:
   * concurrent calls share a single in-flight exchange.
   */
  prime: () => void;
};

/**
 * Creates the ingest token manager for a project.
 *
 * Every failure path is silent: analytics must never break, slow, or log noise
 * into the host application. Without a token the client falls back to sending
 * its public `clientId`, which the backend still accepts.
 *
 * @param options - Backend URL and the public project key.
 * @returns A manager exposing a synchronous {@link PublicTokenManager.getToken}.
 */
export const createPublicTokenManager = ({
  backendURL,
  clientId,
}: PublicTokenManagerOptions): PublicTokenManager => {
  const endpoint = `${backendURL.replace(/\/$/, '')}/api/public/token`;

  let cached: CachedToken | null = null;
  let pendingExchange: Promise<void> | null = null;

  const isUsable = (candidate: CachedToken | null): candidate is CachedToken =>
    candidate !== null && candidate.expiresAt - EXPIRY_MARGIN_MS > Date.now();

  const getToken = (): string | undefined => {
    if (isUsable(cached)) return cached.token;

    if (typeof window !== 'undefined') {
      const stored = readStoredToken();
      if (isUsable(stored)) {
        cached = stored;
        return stored.token;
      }
    }

    return undefined;
  };

  const exchange = async (): Promise<void> => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
        // The exchange is authorised by `Origin`, never by cookies.
        credentials: 'omit',
        mode: 'cors',
      });

      if (!response.ok) return;

      const payload = (await response.json()) as {
        data?: { token?: string | null; expiresIn?: number };
      };

      const token = payload?.data?.token;
      const expiresIn = payload?.data?.expiresIn ?? 0;

      // A `null` token means the key is unknown or the origin is not allowed.
      if (!token || expiresIn <= 0) return;

      cached = { token, expiresAt: Date.now() + expiresIn * 1000 };

      if (typeof window !== 'undefined') writeStoredToken(cached);
    } catch {
      /* swallow — best-effort, the `clientId` fallback still reports */
    } finally {
      pendingExchange = null;
    }
  };

  const prime = (): void => {
    if (!clientId || typeof fetch !== 'function') return;
    if (getToken()) return;
    if (pendingExchange) return;

    pendingExchange = exchange();
  };

  return { getToken, prime };
};
