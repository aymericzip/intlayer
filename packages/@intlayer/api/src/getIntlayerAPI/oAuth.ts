import type {
  CliSessionTokenRoutes,
  CreateCliSessionTokenResult,
  cliSessionTokenContract,
  GetCliSessionMeResult,
} from '@intlayer/backend-contract/cliSessionToken';
import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  GetOAuth2TokenBody,
  GetOAuth2TokenResult,
  OAuth2Routes,
  oAuth2Contract,
} from '@intlayer/backend-contract/oAuth2';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

/** OAuth2 routes, checked against the backend contract. */
const oAuth2Group = {
  prefix: '/oauth2',
} as const satisfies Pick<typeof oAuth2Contract, 'prefix'>;
const oAuth2Endpoints = {
  getOAuth2AccessToken: { method: 'POST', path: '/token' },
  extendOAuth2Token: { method: 'POST', path: '/token/extend' },
} as const satisfies RouteEndpoints<OAuth2Routes>;

/** CLI session routes, checked against the backend contract. */
const cliSessionGroup = {
  prefix: '/api/cli-session',
} as const satisfies Pick<typeof cliSessionTokenContract, 'prefix'>;
const cliSessionEndpoints = {
  createCliSessionToken: { method: 'POST', path: '/' },
  getCliSessionMe: { method: 'GET', path: '/me' },
} as const satisfies RouteEndpoints<CliSessionTokenRoutes>;

export const getOAuthAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: Pick<IntlayerConfig, 'editor'>
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;
  const { clientId, clientSecret } = intlayerConfig?.editor ?? {};

  /**
   * Gets an oAuth2 accessToken via client_credentials grant
   */
  const getOAuth2AccessToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetOAuth2TokenResult>(
      buildRouteURL(
        backendURL,
        oAuth2Group,
        oAuth2Endpoints.getOAuth2AccessToken
      ),
      {},
      otherOptions,
      {
        method: oAuth2Endpoints.getOAuth2AccessToken.method,
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
      buildRouteURL(
        backendURL,
        cliSessionGroup,
        cliSessionEndpoints.createCliSessionToken
      ),
      authAPIOptions,
      otherOptions,
      { method: cliSessionEndpoints.createCliSessionToken.method }
    );

  /**
   * Verifies a CLI session token and returns the associated project context.
   * Useful for checking config consistency in the CLI.
   */
  const getCliSessionMe = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetCliSessionMeResult>(
      buildRouteURL(
        backendURL,
        cliSessionGroup,
        cliSessionEndpoints.getCliSessionMe
      ),
      authAPIOptions,
      otherOptions,
      { method: cliSessionEndpoints.getCliSessionMe.method }
    );

  return {
    getOAuth2AccessToken,
    createCliSessionToken,
    getCliSessionMe,
  };
};
