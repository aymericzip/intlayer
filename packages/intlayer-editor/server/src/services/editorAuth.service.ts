import { getIntlayerAPIProxy, getOAuthAPI } from '@intlayer/api';
import type { OrganizationAPI } from '@intlayer/backend-contract/organization';
import type { ProjectAPI } from '@intlayer/backend-contract/project';
import type { UserAPI } from '@intlayer/backend-contract/user';
import { login, readCliSessionToken } from '@intlayer/cli';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { GetConfigurationOptions } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';

/** Access-key credentials used for the client-credentials exchange. */
type EditorCredentials = {
  clientId: string;
  clientSecret: string;
};

/**
 * Identity the editor client uses to call the CMS, sent as a bearer token.
 *
 * - `session`: the user's short-lived `intlayer login` session token
 * - `accessKey`: an access token exchanged from the project access key
 */
export type EditorAuth = {
  accessToken: string;
  /** ISO date, `null` when the token never expires. */
  expiresAt: string | null;
  authType: 'session' | 'accessKey';
  user?: UserAPI | null;
  organization?: OrganizationAPI | null;
  project?: ProjectAPI | null;
};

/** Time after which an unanswered login is given up. */
const LOGIN_TIMEOUT_MS = 5 * 60 * 1000;

/** Margin before expiry under which a cached access token is renewed. */
const TOKEN_RENEWAL_MARGIN_MS = 60 * 1000;

/** Credentials picked during an editor-triggered login, kept for this run. */
let runtimeCredentials: EditorCredentials | null = null;

/** Access token exchanged from the access key, reused until it expires. */
let accessKeyAuthCache: (EditorAuth & { clientId: string }) | null = null;

/** Project bound to each CLI session token, resolved once per token. */
const sessionProjectCache = new Map<string, ProjectAPI | null>();

/** Aborts the login flow waiting for the browser callback, if any. */
let pendingLoginController: AbortController | null = null;

const isExpiringSoon = (expiresAt: string | null): boolean =>
  expiresAt !== null &&
  new Date(expiresAt).getTime() - TOKEN_RENEWAL_MARGIN_MS <= Date.now();

const getCredentials = (
  configuration: IntlayerConfig
): EditorCredentials | null => {
  if (runtimeCredentials) return runtimeCredentials;

  const { clientId, clientSecret } = configuration.editor;

  return clientId && clientSecret ? { clientId, clientSecret } : null;
};

/**
 * Resolves the `intlayer login` session token, shared with the CLI through
 * the temp directory. `null` when absent, expired, or rejected by the CMS.
 */
const resolveSessionAuth = async (
  configuration: IntlayerConfig
): Promise<EditorAuth | null> => {
  const sessionData = await readCliSessionToken(configuration);

  if (!sessionData) return null;

  if (!sessionProjectCache.has(sessionData.token)) {
    try {
      const result = await getIntlayerAPIProxy(
        undefined,
        configuration,
        sessionData.token
      ).oAuth.getCliSessionMe();

      sessionProjectCache.set(sessionData.token, result.data?.project ?? null);
    } catch {
      // Revoked or unreachable: fall back to the access key, if any
      return null;
    }
  }

  return {
    accessToken: sessionData.token,
    expiresAt: sessionData.expiresAt,
    authType: 'session',
    project: sessionProjectCache.get(sessionData.token),
  };
};

/**
 * Exchanges the access key for an access token. The client secret stays on
 * the server: only the resulting short-lived token reaches the browser.
 */
const resolveAccessKeyAuth = async (
  configuration: IntlayerConfig
): Promise<EditorAuth | null> => {
  const credentials = getCredentials(configuration);

  if (!credentials) return null;

  if (
    accessKeyAuthCache?.clientId === credentials.clientId &&
    !isExpiringSoon(accessKeyAuthCache.expiresAt)
  ) {
    const { clientId: _clientId, ...cachedAuth } = accessKeyAuthCache;
    return cachedAuth;
  }

  try {
    const result = await getOAuthAPI(undefined, {
      editor: { ...configuration.editor, ...credentials },
    }).getOAuth2AccessToken();

    const token = result.data;

    if (!token?.accessToken) return null;

    const accessKeyAuth: EditorAuth = {
      accessToken: token.accessToken,
      expiresAt: token.accessTokenExpiresAt
        ? new Date(token.accessTokenExpiresAt).toISOString()
        : null,
      authType: 'accessKey',
      user: token.user,
      organization: token.organization,
      project: token.project,
    };

    accessKeyAuthCache = { ...accessKeyAuth, clientId: credentials.clientId };

    return accessKeyAuth;
  } catch {
    accessKeyAuthCache = null;
    return null;
  }
};

/**
 * Resolves the CMS identity of the editor, in the same order as the CLI:
 * `intlayer login` session first, then the access key.
 */
export const resolveEditorAuth = async (
  configuration: IntlayerConfig
): Promise<EditorAuth | null> =>
  (await resolveSessionAuth(configuration)) ??
  (await resolveAccessKeyAuth(configuration));

/** Whether an editor-triggered login is waiting for the browser callback. */
export const isEditorLoginPending = (): boolean =>
  pendingLoginController !== null;

/**
 * Starts the `intlayer login` browser flow. A login still pending is dropped
 * first, so a closed login tab can be reopened. Resolves once the CMS has
 * called back (the session token being stored for both the editor and the
 * CLI), or when the login is dropped or times out.
 */
export const startEditorLogin = async (
  configuration: IntlayerConfig,
  configOptions?: GetConfigurationOptions
): Promise<void> => {
  pendingLoginController?.abort();

  const appLogger = getAppLogger(configuration);
  const loginController = new AbortController();
  const timeout = setTimeout(() => loginController.abort(), LOGIN_TIMEOUT_MS);

  pendingLoginController = loginController;

  await login({
    exitAfter: false,
    configOptions,
    signal: loginController.signal,
    onCredentials: (credentials) => {
      runtimeCredentials = credentials;
      accessKeyAuthCache = null;

      appLogger(
        'Access key loaded for this editor session. Insert it in your .env file to keep it:'
      );
      appLogger(
        `${colorize('INTLAYER_CLIENT_ID=', ANSIColors.GREY_LIGHT)}${colorize(credentials.clientId, ANSIColors.BLUE)}`
      );
      appLogger(
        `${colorize('INTLAYER_CLIENT_SECRET=', ANSIColors.GREY_LIGHT)}${colorize(credentials.clientSecret, ANSIColors.BLUE)}`
      );
    },
  }).finally(() => {
    clearTimeout(timeout);

    if (pendingLoginController === loginController) {
      pendingLoginController = null;
    }
  });
};
