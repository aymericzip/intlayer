'use client';

import { getIntlayerAPI } from '@intlayer/api';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';

import { useConfiguration } from '@intlayer/editor-react';
import { useAsync } from '../../../hooks/useAsync/useAsync';

export const useOAuth2 = (intlayerConfiguration?: IntlayerConfig) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;
  const intlayerAPI = getIntlayerAPI(undefined, config);

  const { data } = useAsync(
    'getOAuth2AccessToken',
    intlayerAPI.auth.getOAuth2AccessToken,
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
