import { useMemo } from 'react';
import { getIntlayerAPI } from '../../../api/src';
import { FetcherOptions } from '../../../api/src/fetcher';
import { useAuth } from '../components/Auth/useAuth';

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
