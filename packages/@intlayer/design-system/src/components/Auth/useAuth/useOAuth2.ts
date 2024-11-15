'use client';

import { getConfiguration } from '@intlayer/config/client';
import { useAsync } from '../../../hooks/useAsync/useAsync';
import { intlayerAPI } from '../../../libs/intlayer-api';

export const useOAuth2 = (csrfToken: string | null | undefined) => {
  const { clientId, clientSecret } = getConfiguration().editor;

  const { data } = useAsync(
    'getOAuth2AccessToken',
    () =>
      intlayerAPI.auth.getOAuth2AccessToken({
        body: { csrf_token: csrfToken },
      }),
    {
      cache: true,
      autoFetch: true,
      enable: !!(clientId && clientSecret && csrfToken),
    }
  );

  const oAuth2AccessToken = data?.data;

  return {
    oAuth2AccessToken,
  };
};
