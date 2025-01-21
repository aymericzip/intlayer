import { getIntlayerAPI, type FetcherOptions } from '@intlayer/api';
import { type IntlayerConfig } from '@intlayer/config/client';
import { useMemo } from 'react';
import { useAuth } from '../components/Auth/useAuth';

type UseIntlayerAuthProps = {
  options?: FetcherOptions;
  intlayerConfiguration?: IntlayerConfig;
};

export const useIntlayerAuth = (props?: UseIntlayerAuthProps) => {
  const { csrfToken, oAuth2AccessToken } = useAuth();

  const headers = useMemo(
    () =>
      oAuth2AccessToken?.accessToken
        ? {
            Authorization: `Bearer ${oAuth2AccessToken.accessToken}`,
          }
        : undefined,
    [oAuth2AccessToken?.accessToken]
  );

  const body = useMemo(
    () => (csrfToken ? { csrf_token: csrfToken } : undefined),
    [csrfToken]
  );

  return useMemo(
    () =>
      getIntlayerAPI(
        {
          headers,
          body,
          ...(props?.options ?? {}),
        },
        props?.intlayerConfiguration
      ),
    [body, headers]
  );
};
