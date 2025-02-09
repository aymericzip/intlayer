'use client';

import { getIntlayerAPI } from '@intlayer/api';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useAsync } from '../../../hooks/useAsync/useAsync';

export const useOAuth2 = (
  csrfToken: string | null | undefined,
  intlayerConfiguration?: IntlayerConfig
) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? getConfiguration();
  const intlayerAPI = getIntlayerAPI(undefined, config);

  const { data } = useAsync(
    'getOAuth2AccessToken',
    () =>
      intlayerAPI.auth.getOAuth2AccessToken({
        body: { csrf_token: csrfToken },
      }),
    {
      cache: true,
      autoFetch: true,
      enable: !!(
        config.editor.clientId &&
        config.editor.clientSecret &&
        csrfToken
      ),
    }
  );

  const oAuth2AccessToken = data?.data;

  return {
    oAuth2AccessToken,
  };
};
