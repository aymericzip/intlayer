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

  const body = csrfToken ? { csrf_token: csrfToken } : undefined;

  return getIntlayerAPI(
    {
      ...(oAuth2AccessToken && {
        headers: {
          Authorization: `Bearer ${oAuth2AccessToken}`,
        },
      }),
      body,
      ...(props?.options ?? {}),
    },
    props?.intlayerConfiguration ?? configuration
  );
};
