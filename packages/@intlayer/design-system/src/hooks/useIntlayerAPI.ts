import { useMemo } from 'react';
import { useAuth } from '../components/Auth/useAuth';
import { getIntlayerAPI } from '../libs/intlayer-api';
import { FetcherOptions } from '../libs/intlayer-api/fetcher';

export const useIntlayerAuth = (options?: FetcherOptions) => {
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
      getIntlayerAPI({
        headers,
        body,
        ...options,
      }),
    [body, headers]
  );
};
