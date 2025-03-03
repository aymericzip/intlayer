import { getIntlayerAPI, type FetcherOptions } from '@intlayer/api';
import { type IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useAuth } from '../components/Auth/useAuth';

type UseIntlayerAuthProps = {
  options?: FetcherOptions;
  intlayerConfiguration?: IntlayerConfig;
};

export const useIntlayerAuth = (props?: UseIntlayerAuthProps) => {
  const configuration = useConfiguration();
  const { csrfToken, oAuth2AccessToken } = useAuth();

  const headers = oAuth2AccessToken?.accessToken
    ? {
        Authorization: `Bearer ${oAuth2AccessToken.accessToken}`,
      }
    : undefined;

  const body = csrfToken ? { csrf_token: csrfToken } : undefined;

  console.log({ headers, body, oAuth2AccessToken });

  return getIntlayerAPI(
    {
      headers,
      body,
      ...(props?.options ?? {}),
    },
    props?.intlayerConfiguration ?? configuration
  );
};
