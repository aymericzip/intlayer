import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { defu } from 'defu';
import type { FetcherOptions } from '../fetcher';
import { getOAuthAPI } from '../getIntlayerAPI/oAuth';

/**
 * Shape of the various OAuth2 token payloads the backend may return. Only the
 * fields used to derive the expiration timestamp are described here.
 */
type OAuthTokenLike = {
  accessToken?: string;
  accessTokenExpiresAt?: string | Date;
  expires_in?: number;
  expiresIn?: number;
  expiresAt?: string | Date;
};

/**
 * Any asynchronous API method exposed by a domain section
 * (e.g. `getDictionaries`, `pushDictionaries`).
 */
type AsyncMethod<Arguments extends unknown[], Result> = (
  ...args: Arguments
) => Promise<Result>;

/**
 * A domain section factory: builds a plain object of async methods from shared
 * fetcher options and the Intlayer configuration.
 */
type SectionFactory<Section extends Record<string, unknown>> = (
  fetcherOptions: FetcherOptions,
  intlayerConfig: IntlayerConfig
) => Section;

const ONE_MINUTE_MS = 60_000;

/**
 * Resolves the expiration timestamp (in ms since epoch) from an OAuth2
 * token-like payload, supporting both absolute dates and relative durations.
 */
const getExpiryTimestamp = (
  token: OAuthTokenLike | undefined
): number | undefined => {
  if (!token) return undefined;

  const dateLike = (token.accessTokenExpiresAt ?? token.expiresAt) as
    | string
    | Date
    | undefined;

  if (dateLike) {
    const timestamp =
      typeof dateLike === 'string'
        ? Date.parse(dateLike)
        : dateLike.getTime?.();
    if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
      return timestamp;
    }
  }

  const seconds = token.expires_in ?? token.expiresIn;
  if (typeof seconds === 'number' && Number.isFinite(seconds)) {
    return Date.now() + seconds * 1000;
  }

  return undefined;
};

/**
 * Options accepted when creating an {@link AuthManager}.
 */
export type AuthManagerOptions = {
  /**
   * Base fetcher options merged into every request (e.g. custom headers).
   */
  baseFetcherOptions?: FetcherOptions;
  /**
   * A pre-issued CLI session token (prefixed with `clisession_`). When provided,
   * it is used directly as the Bearer token and the OAuth2 `client_credentials`
   * exchange is skipped entirely.
   */
  sessionToken?: string;
};

/**
 * Options accepted when binding a domain section to an {@link AuthManager}.
 */
export type BindSectionOptions = {
  /**
   * Forces auth injection on (`false`) or off (`true`). Defaults to enabled
   * whenever credentials are available.
   */
  skipAuth?: boolean;
};

/**
 * Manages CMS authentication for a set of API calls.
 *
 * The manager owns a single mutable {@link FetcherOptions} object
 * (`fetcherOptions`). Domain factories bound through it share the same
 * reference, so refreshing the token in place transparently authenticates every
 * call — without rebuilding the API clients.
 */
export type AuthManager = {
  /**
   * Mutable fetcher options carrying the `Authorization` header. Bound sections
   * share this reference so the injected token is reused everywhere.
   */
  fetcherOptions: FetcherOptions;
  /**
   * The resolved Intlayer configuration (merged with the build-time defaults).
   */
  intlayerConfig: IntlayerConfig;
  /**
   * `true` when credentials are available — either a session token or a
   * `clientId`/`clientSecret` pair in the configuration.
   */
  hasCredentials: boolean;
  /**
   * Ensures a valid access token is available and applies it to
   * `fetcherOptions`. Called automatically by {@link withAuth}.
   */
  ensureAuth: () => Promise<void>;
  /**
   * Forces a token refresh on the next call by clearing the cached token.
   */
  reset: () => void;
  /**
   * Wraps a single API method so it injects (and, on failure, refreshes) the
   * access token on every invocation while preserving the method's signature.
   */
  withAuth: <Arguments extends unknown[], Result>(
    method: AsyncMethod<Arguments, Result>,
    skipAuth?: boolean
  ) => AsyncMethod<Arguments, Result>;
  /**
   * Instantiates a domain factory with the managed fetcher options and config,
   * returning a section whose every method authenticates automatically.
   *
   * @example
   * ```ts
   * const dictionary = authManager.bindSection(getDictionaryAPI);
   * await dictionary.pushDictionaries(dictionaries);
   * ```
   */
  bindSection: <Section extends Record<string, unknown>>(
    factory: SectionFactory<Section>,
    options?: BindSectionOptions
  ) => Section;
};

/**
 * Creates an instance-scoped {@link AuthManager} handling the OAuth2
 * `client_credentials` flow (or a pre-issued CLI session token).
 *
 * Unlike a global token cache, each manager keeps its own token state, so
 * independent SDK instances never interfere with one another.
 *
 * @param intlayerConfig - Intlayer configuration carrying the `editor`
 * credentials. Defaults to the build-time configuration.
 * @param options - Optional session token and base fetcher options.
 */
export const createAuthManager = (
  intlayerConfig: Pick<IntlayerConfig, 'editor'> = { editor },
  options: AuthManagerOptions = {}
): AuthManager => {
  const { baseFetcherOptions = {}, sessionToken } = options;

  const resolvedConfig = defu(intlayerConfig ?? {}, {
    editor,
  }) as IntlayerConfig;

  // `credentials: 'omit'` prevents the browser from attaching session cookies;
  // authentication is handled exclusively through the injected Bearer token.
  // This is required because the backend only allows credentialed requests for
  // whitelisted first-party origins.
  const fetcherOptions: FetcherOptions = {
    ...baseFetcherOptions,
    credentials: 'omit',
  };

  const hasCredentials =
    Boolean(sessionToken) ||
    Boolean(
      resolvedConfig?.editor?.clientId && resolvedConfig?.editor?.clientSecret
    );

  // A session token is used as-is and never expires within the SDK's concern,
  // so inject it once up-front and skip the OAuth2 exchange.
  if (sessionToken) {
    fetcherOptions.headers = {
      ...(fetcherOptions.headers ?? {}),
      Authorization: `Bearer ${sessionToken}`,
    } as HeadersInit;
  }

  let accessToken: string | undefined;
  let expiryTimestamp: number | undefined;
  let pendingRefresh: Promise<void> | undefined;

  const needsRefresh = (): boolean => {
    if (!accessToken) return true;
    if (!expiryTimestamp) return false; // Unknown expiry: assume usable until failure.

    // Refresh one minute before the actual expiry to avoid edge-of-expiry races.
    return Date.now() + ONE_MINUTE_MS >= expiryTimestamp;
  };

  const refreshToken = async (): Promise<void> => {
    const doRefresh = async (): Promise<void> => {
      const oAuthAPI = getOAuthAPI({}, resolvedConfig);
      const response = await oAuthAPI.getOAuth2AccessToken();
      const tokenData = response?.data as OAuthTokenLike | undefined;

      accessToken = tokenData?.accessToken;
      expiryTimestamp = getExpiryTimestamp(tokenData);
    };

    // De-duplicate concurrent refreshes so a burst of calls triggers one fetch.
    pendingRefresh ??= doRefresh().finally(() => {
      pendingRefresh = undefined;
    });

    await pendingRefresh;
  };

  const applyAuthHeader = (): void => {
    if (!accessToken) return;
    fetcherOptions.headers = {
      ...(fetcherOptions.headers ?? {}),
      Authorization: `Bearer ${accessToken}`,
    } as HeadersInit;
  };

  const ensureAuth = async (): Promise<void> => {
    if (sessionToken) return; // Already injected; nothing to refresh.
    if (needsRefresh()) {
      await refreshToken();
    }
    applyAuthHeader();
  };

  const reset = (): void => {
    accessToken = undefined;
    expiryTimestamp = undefined;
  };

  const withAuth = <Arguments extends unknown[], Result>(
    method: AsyncMethod<Arguments, Result>,
    skipAuth = !hasCredentials
  ): AsyncMethod<Arguments, Result> => {
    if (skipAuth) return method;

    return async (...args: Arguments): Promise<Result> => {
      await ensureAuth();

      try {
        return await method(...args);
      } catch (error) {
        // The token may have been revoked or expired early: refresh once and
        // retry before surfacing the error. A session token cannot be
        // refreshed, so re-throw immediately in that case.
        if (sessionToken) throw error;

        await refreshToken();
        applyAuthHeader();
        return await method(...args);
      }
    };
  };

  const bindSection = <Section extends Record<string, unknown>>(
    factory: SectionFactory<Section>,
    bindOptions: BindSectionOptions = {}
  ): Section => {
    const section = factory(fetcherOptions, resolvedConfig);
    const skipAuth = bindOptions.skipAuth ?? !hasCredentials;

    return new Proxy(section, {
      get(target, property, receiver) {
        const value = Reflect.get(target, property, receiver);

        if (typeof value !== 'function') return value;

        return withAuth(
          (value as AsyncMethod<unknown[], unknown>).bind(target),
          skipAuth
        );
      },
    });
  };

  return {
    fetcherOptions,
    intlayerConfig: resolvedConfig,
    hasCredentials,
    ensureAuth,
    reset,
    withAuth,
    bindSection,
  };
};
