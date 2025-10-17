'use client';

import { getOAuthAPI } from '@intlayer/api';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useQuery } from '@tanstack/react-query';

export const useOAuth2 = (intlayerConfiguration?: IntlayerConfig) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;
  const intlayerAPI = getOAuthAPI(config);

  const { data } = useQuery({
    queryKey: ['oAuth2AccessToken'],
    queryFn: intlayerAPI.getOAuth2AccessToken,
    enabled: !!(config.editor.clientId && config.editor.clientSecret),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  const oAuth2AccessToken = data?.data;

  return {
    oAuth2AccessToken,
  };
};
