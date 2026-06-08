'use client';

import { getOAuthAPI } from '@intlayer/api';
import { editor } from '@intlayer/config/built';
import { useConfiguration } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types/config';
import { useQuery } from '@tanstack/react-query';
import { defu } from 'defu';

export const useOAuth2 = (
  intlayerConfiguration?: Pick<IntlayerConfig, 'editor'>
) => {
  const configuration = useConfiguration();
  const config = defu(intlayerConfiguration, configuration, {
    editor,
  }) as IntlayerConfig;

  const intlayerAPI = getOAuthAPI(undefined, config);

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
