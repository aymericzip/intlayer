import type { IntlayerConfig } from '@intlayer/config/client';
import type { FetcherOptions } from './fetcher';
import { getIntlayerAPI } from './getIntlayerAPI';
import type { IntlayerAPI } from './getIntlayerAPI/index';
import { getOAuthAPI } from './getIntlayerAPI/oAuth';

type OAuthTokenLike = {
  accessToken?: string;
  accessTokenExpiresAt?: string | Date;
  expires_in?: number;
  expiresIn?: number;
  expiresAt?: string | Date;
};

const ONE_MINUTE_MS = 60_000;

/**
 * Returns the expiration timestamp in ms from an OAuth token-like object.
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
    const ts =
      typeof dateLike === 'string'
        ? Date.parse(dateLike)
        : dateLike.getTime?.();
    if (typeof ts === 'number' && Number.isFinite(ts)) return ts;
  }
  const seconds = token.expires_in ?? token.expiresIn;
  if (typeof seconds === 'number' && Number.isFinite(seconds)) {
    return Date.now() + seconds * 1000;
  }
  return undefined;
};

/**
 * Build an auto-auth proxy around getIntlayerAPI that:
 * - Fetches an OAuth2 token when needed
 * - Injects Authorization header for each request
 * - Refreshes token proactively when near expiry
 *
 * The returned API matches the shape of getIntlayerAPI.
 */
export const getIntlayerAPIProxy = (
  baseAuthOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
): IntlayerAPI => {
  const baseApi = getIntlayerAPI(baseAuthOptions, intlayerConfig);

  let currentAccessToken: string | undefined;
  let currentExpiryTs: number | undefined;
  let pendingRefresh: Promise<void> | undefined;

  const needsRefresh = (): boolean => {
    if (!currentAccessToken) return true;
    if (!currentExpiryTs) return false; // If unknown, assume usable until failure
    return Date.now() + ONE_MINUTE_MS >= currentExpiryTs; // refresh 1 min before expiry
  };

  const refreshToken = async (): Promise<void> => {
    const doRefresh = async () => {
      const authApi = getOAuthAPI(intlayerConfig);
      const res = await authApi.getOAuth2AccessToken();
      const tokenData = res?.data as OAuthTokenLike | undefined;
      currentAccessToken = tokenData?.accessToken;
      currentExpiryTs = getExpiryTimestamp(tokenData);
    };

    if (!pendingRefresh) {
      pendingRefresh = doRefresh().finally(() => {
        pendingRefresh = undefined;
      });
    }
    await pendingRefresh;
  };

  const ensureValidToken = async () => {
    if (needsRefresh()) {
      await refreshToken();
    }
  };

  const withAuthHeader = (options?: FetcherOptions): FetcherOptions => ({
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
      ...(currentAccessToken
        ? { Authorization: `Bearer ${currentAccessToken}` }
        : {}),
    },
  });

  const wrapSection = <T extends Record<string, unknown>>(
    section: T,
    skipAuth = false
  ): T => {
    return new Proxy(section, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
          // Wrap section method to inject token and headers
          return async (...args: unknown[]) => {
            if (!skipAuth) {
              await ensureValidToken();
            }

            // Inject/merge FetcherOptions on the last argument
            const lastArg = args[args.length - 1];
            if (
              lastArg &&
              typeof lastArg === 'object' &&
              (lastArg as FetcherOptions)
            ) {
              args[args.length - 1] = withAuthHeader(lastArg as FetcherOptions);
            } else {
              args.push(withAuthHeader());
            }

            try {
              return await value.apply(target, args);
            } catch (err) {
              // Best-effort retry: if token might be stale, refresh once and retry
              if (!skipAuth) {
                await refreshToken();
                const retryLastArg = args[args.length - 1];
                if (retryLastArg && typeof retryLastArg === 'object') {
                  args[args.length - 1] = withAuthHeader(
                    retryLastArg as FetcherOptions
                  );
                }
                return await value.apply(target, args);
              }
              throw err;
            }
          };
        }
        return value;
      },
    });
  };

  return {
    organization: wrapSection(baseApi.organization),
    project: wrapSection(baseApi.project),
    user: wrapSection(baseApi.user),
    oAuth: wrapSection(baseApi.oAuth, true), // do NOT inject auth for token endpoint
    dictionary: wrapSection(baseApi.dictionary),
    stripe: wrapSection(baseApi.stripe),
    ai: wrapSection(baseApi.ai),
    tag: wrapSection(baseApi.tag),
    search: wrapSection(baseApi.search),
    editor: wrapSection(baseApi.editor),
    newsletter: wrapSection(baseApi.newsletter),
  } as IntlayerAPI;
};

export type IntlayerAPIProxy = ReturnType<typeof getIntlayerAPIProxy>;
