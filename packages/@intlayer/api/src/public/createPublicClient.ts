import type { DictionaryAPI } from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Browser-safe Intlayer client, authenticated without any confidential
 * credential.
 *
 * This is the Google-Analytics model applied to the whole SDK: the page ships
 * only the **public** `editor.clientId`, exchanges it for a short-lived scoped
 * token, and calls the API directly. No server route, no server action, and no
 * `clientSecret` in the bundle.
 *
 * What it can do is deliberately narrow, and that is what makes shipping the
 * key safe: read the project's published dictionary content — the content the
 * page already renders — and submit analytics events. Writing content, reading
 * a project, an organization or a user still require a real credential
 * (server-side) or a signed-in user.
 *
 * @example
 * ```ts
 * import { createPublicClient } from '@intlayer/api/public';
 *
 * const client = createPublicClient();
 *
 * const keys = await client.getDictionaryKeys();
 * const [dictionary] = await client.getDictionaries(['navbar']);
 * ```
 */

/** `sessionStorage` key holding the cached token for this tab. */
const TOKEN_STORAGE_KEY = '__intlayer_public_token__';

/**
 * Refresh margin: a token within this window of expiry is treated as expired,
 * so a request is never sent with a token that dies in flight.
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
    const raw = globalThis.sessionStorage?.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedToken;

    if (typeof parsed?.token !== 'string') return null;
    if (typeof parsed?.expiresAt !== 'number') return null;

    return parsed;
  } catch {
    // Private mode, disabled storage, or a corrupted entry — start fresh.
    return null;
  }
};

/** Persists the token for this tab. Best-effort: storage may be unavailable. */
const writeStoredToken = (cached: CachedToken): void => {
  try {
    globalThis.sessionStorage?.setItem(
      TOKEN_STORAGE_KEY,
      JSON.stringify(cached)
    );
  } catch {
    /* ignore — the in-memory cache still applies for this page */
  }
};

/** Options accepted by {@link createPublicClient}. */
export type PublicClientOptions = {
  /** Overrides the build-time `editor` configuration. */
  intlayerConfig?: Pick<IntlayerConfig, 'editor'>;
};

/** The credential-free client returned by {@link createPublicClient}. */
export type PublicClient = {
  /**
   * Returns the current token, exchanging the public `clientId` for one when
   * needed. `null` when the project is unknown or the origin is not allowed.
   */
  getToken: () => Promise<string | null>;
  /** Every dictionary key published for the project. */
  getDictionaryKeys: () => Promise<string[]>;
  /**
   * Published dictionary content for the given keys.
   *
   * @param keys - Dictionary keys to fetch (at most 100 per call).
   */
  getDictionaries: (keys: string[]) => Promise<DictionaryAPI[]>;
};

/**
 * Creates a {@link PublicClient} for the configured project.
 *
 * @param options - Optional configuration override.
 * @returns A client that authenticates itself with the public project key.
 */
export const createPublicClient = ({
  intlayerConfig,
}: PublicClientOptions = {}): PublicClient => {
  const resolvedEditor = intlayerConfig?.editor ?? editor;
  const backendURL = (resolvedEditor?.backendURL ?? '').replace(/\/$/, '');
  const clientId = resolvedEditor?.clientId;

  let cached: CachedToken | null = null;
  let pendingExchange: Promise<string | null> | null = null;

  const isUsable = (candidate: CachedToken | null): candidate is CachedToken =>
    candidate !== null && candidate.expiresAt - EXPIRY_MARGIN_MS > Date.now();

  const exchange = async (): Promise<string | null> => {
    const response = await fetch(`${backendURL}/api/public/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId }),
      // Authorised by `Origin`, never by cookies.
      credentials: 'omit',
      mode: 'cors',
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as {
      data?: { token?: string | null; expiresIn?: number };
    };

    const token = payload?.data?.token;
    const expiresIn = payload?.data?.expiresIn ?? 0;

    if (!token || expiresIn <= 0) return null;

    cached = { token, expiresAt: Date.now() + expiresIn * 1000 };
    writeStoredToken(cached);

    return token;
  };

  const getToken = async (): Promise<string | null> => {
    if (isUsable(cached)) return cached.token;

    const stored = readStoredToken();
    if (isUsable(stored)) {
      cached = stored;
      return stored.token;
    }

    if (!clientId) return null;

    // De-duplicate concurrent exchanges so a burst of calls triggers one fetch.
    pendingExchange ??= exchange().finally(() => {
      pendingExchange = null;
    });

    return await pendingExchange;
  };

  /** Issues an authorised GET against the public surface. */
  const request = async <Result>(
    path: string,
    fallback: Result
  ): Promise<Result> => {
    const token = await getToken();

    if (!token) return fallback;

    const response = await fetch(`${backendURL}/api/public${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'omit',
      mode: 'cors',
    });

    if (!response.ok) return fallback;

    const payload = (await response.json()) as { data?: Result };

    return payload?.data ?? fallback;
  };

  return {
    getToken,
    getDictionaryKeys: () => request<string[]>('/dictionaries/keys', []),
    getDictionaries: (keys) =>
      request<DictionaryAPI[]>(
        `/dictionaries?keys=${encodeURIComponent(keys.join(','))}`,
        []
      ),
  };
};
