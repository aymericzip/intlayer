import { useMemo } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { getIntlayerAPI } from '../libs/intlayer-api';

export const useIntlayerAPI = () => {
  const { csrfToken, oAuth2AccessToken } = useAuth();

  const headers = useMemo(
    () =>
      oAuth2AccessToken?.accessToken
        ? {
            Bearer: `Bearer ${oAuth2AccessToken.accessToken}`,
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
      }),
    [body, headers]
  );
};
