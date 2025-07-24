'use client';

import { getAuthAPI } from '@intlayer/api';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useAsync } from '../useAsync/useAsync';

export const useOAuth2 = (intlayerConfiguration?: IntlayerConfig) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;
  const intlayerAPI = getAuthAPI(config);

  const { data } = useAsync(
    'getOAuth2AccessToken',
    intlayerAPI.getOAuth2AccessToken,
    {
      cache: true,
      autoFetch: true,
      enable: !!(config.editor.clientId && config.editor.clientSecret),
    }
  );

  const oAuth2AccessToken = data?.data;

  return {
    oAuth2AccessToken,
  };
};
