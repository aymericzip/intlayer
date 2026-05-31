import type {
  CreateCliSessionTokenResult,
  GetCliSessionMeResult,
  GetOAuth2TokenBody,
  GetOAuth2TokenResult,
} from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getOAuthAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: Pick<IntlayerConfig, 'editor'>
) => {
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;
  const { clientId, clientSecret } = intlayerConfig?.editor ?? {};

  /**
   * Gets an oAuth2 accessToken via client_credentials grant
   */
  const getOAuth2AccessToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetOAuth2TokenResult>(
      `${backendURL}/oauth2/token`,
      {},
      otherOptions,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          grant_type: 'client_credentials',
          client_id: clientId!,
          client_secret: clientSecret!,
        } satisfies GetOAuth2TokenBody,
      }
    );

  /**
   * Creates a short-lived (2h) CLI session token for the authenticated user.
   * Requires a valid browser session cookie.
   */
  const createCliSessionToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<CreateCliSessionTokenResult>(
      `${backendURL}/api/cli-session`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  /**
   * Verifies a CLI session token and returns the associated project context.
   * Useful for checking config consistency in the CLI.
   */
  const getCliSessionMe = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetCliSessionMeResult>(
      `${backendURL}/api/cli-session/me`,
      authAPIOptions,
      otherOptions
    );

  return {
    getOAuth2AccessToken,
    createCliSessionToken,
    getCliSessionMe,
  };
};
