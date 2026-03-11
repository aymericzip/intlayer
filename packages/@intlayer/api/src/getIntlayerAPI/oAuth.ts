import type {
  GetOAuth2TokenBody,
  GetOAuth2TokenResult,
} from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import { DefaultValues } from '@intlayer/config/client';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getOAuthAPI = (intlayerConfig?: IntlayerConfig) => {
  let backendURL =
    intlayerConfig?.editor?.backendURL ??
    configuration?.editor?.backendURL ??
    DefaultValues.Editor.BACKEND_URL;
  const { clientId, clientSecret } = intlayerConfig?.editor ?? {};

  if (!backendURL) {
    backendURL = DefaultValues.Editor.BACKEND_URL;
    console.error('Backend URL is not defined in the Intlayer configuration.');
  }

  /**
   * Gets an oAuth2 accessToken
   * @return The token information
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

  return {
    getOAuth2AccessToken,
  };
};
