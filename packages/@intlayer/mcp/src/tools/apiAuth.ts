import { createHash } from 'node:crypto';
import { getIntlayerAPI } from '@intlayer/api';
import { editor } from '@intlayer/config/built';
import { getEditorClientSecret } from '@intlayer/config/secrets';
import {
  type McpClientCredentials,
  mcpRequestContext,
} from '../server/requestContext';

/** Options shared by the API-backed tool loaders. */
export type APIToolsOptions = {
  /**
   * Fall back to the project configuration / `INTLAYER_CLIENT_*` env vars when
   * a call carries no credentials. Only for a local (stdio) server: on a hosted
   * server it would let any caller act as the server's own access key.
   */
  allowEnvironmentCredentials?: boolean;
};

type CachedAccessToken = {
  accessToken: string;
  /** Epoch ms after which the token is refreshed. */
  refreshAt: number;
};

/** Tokens without expiry are still re-issued after this delay. */
const DEFAULT_TOKEN_LIFETIME_MS = 30 * 60 * 1000;
/** Refresh margin before the announced expiry. */
const TOKEN_REFRESH_MARGIN_MS = 60 * 1000;
/** Bounds memory on a long-running hosted server. */
const MAX_CACHED_TOKENS = 500;

const accessTokenCache = new Map<string, CachedAccessToken>();

/** Cache key bound to both id and secret, so a wrong secret never hits. */
const getCredentialsCacheKey = ({
  clientId,
  clientSecret,
}: McpClientCredentials): string =>
  createHash('sha256').update(`${clientId}:${clientSecret}`).digest('hex');

/**
 * Clears cached access tokens (tests, or after a credential rotation).
 */
export const clearAccessTokenCache = (): void => accessTokenCache.clear();

/**
 * Resolves the credentials of the current call: explicit tool arguments, then
 * the transport request context, then (local server only) the environment.
 *
 * @param explicitCredentials - Credentials passed as tool arguments.
 * @param options - Tool loader options.
 * @returns The credentials, or `undefined` when none are available.
 */
export const resolveCredentials = (
  explicitCredentials: Partial<McpClientCredentials>,
  options: APIToolsOptions
): McpClientCredentials | undefined => {
  if (explicitCredentials.clientId && explicitCredentials.clientSecret) {
    return {
      clientId: explicitCredentials.clientId,
      clientSecret: explicitCredentials.clientSecret,
    };
  }

  const contextCredentials = mcpRequestContext.getStore()?.credentials;

  if (contextCredentials) return contextCredentials;

  if (!options.allowEnvironmentCredentials) return undefined;

  const clientId = explicitCredentials.clientId ?? editor.clientId;
  const clientSecret =
    explicitCredentials.clientSecret ?? getEditorClientSecret();

  return clientId && clientSecret ? { clientId, clientSecret } : undefined;
};

/**
 * Exchanges access key credentials for an OAuth2 access token, reusing a
 * cached token until shortly before it expires.
 *
 * @param credentials - Access key credentials.
 * @returns The access token.
 */
export const getAccessToken = async (
  credentials: McpClientCredentials
): Promise<string> => {
  const cacheKey = getCredentialsCacheKey(credentials);
  const cachedToken = accessTokenCache.get(cacheKey);

  if (cachedToken && cachedToken.refreshAt > Date.now()) {
    return cachedToken.accessToken;
  }

  const tokenResult = await getIntlayerAPI(
    {},
    { editor: { ...editor, ...credentials } }
  ).oAuth.getOAuth2AccessToken();

  const accessToken = tokenResult?.data?.accessToken;

  if (!accessToken) {
    throw new Error(
      'Failed to obtain OAuth2 access token. Check your credentials.'
    );
  }

  const expiresAt = tokenResult.data?.accessTokenExpiresAt
    ? new Date(tokenResult.data.accessTokenExpiresAt).getTime()
    : Date.now() + DEFAULT_TOKEN_LIFETIME_MS;

  if (accessTokenCache.size >= MAX_CACHED_TOKENS) {
    const oldestKey = accessTokenCache.keys().next().value;
    if (oldestKey) accessTokenCache.delete(oldestKey);
  }

  accessTokenCache.set(cacheKey, {
    accessToken,
    refreshAt: expiresAt - TOKEN_REFRESH_MARGIN_MS,
  });

  return accessToken;
};

/**
 * Authenticated Intlayer API client for the current tool call.
 *
 * @param explicitCredentials - Credentials passed as tool arguments, if any.
 * @param options - Tool loader options.
 * @returns The API client, authenticated with a bearer token.
 */
export const getAuthenticatedAPI = async (
  explicitCredentials: Partial<McpClientCredentials>,
  options: APIToolsOptions
): Promise<ReturnType<typeof getIntlayerAPI>> => {
  const credentials = resolveCredentials(explicitCredentials, options);
  const contextAccessToken = mcpRequestContext.getStore()?.accessToken;

  const accessToken = credentials
    ? await getAccessToken(credentials)
    : contextAccessToken;

  if (!accessToken) {
    throw new Error(
      options.allowEnvironmentCredentials
        ? 'Intlayer credentials not found. Provide clientId/clientSecret or set INTLAYER_CLIENT_ID/INTLAYER_CLIENT_SECRET.'
        : 'Intlayer credentials not found. Send an `Authorization: Bearer <access token>` header, or the `x-intlayer-client-id` and `x-intlayer-client-secret` headers.'
    );
  }

  return getIntlayerAPI(
    { headers: { Authorization: `Bearer ${accessToken}` } },
    { editor }
  );
};
