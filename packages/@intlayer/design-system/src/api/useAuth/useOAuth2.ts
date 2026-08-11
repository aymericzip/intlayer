'use client';

import { getOAuthAPI } from '@intlayer/api';
import type { OAuth2Token } from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import { useConfiguration } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types/config';
import { useQuery } from '@tanstack/react-query';
import { defu } from 'defu';
import { useIsAuthFetchEnabled } from '../../providers/DeferredAuthProvider';

export type UseOAuth2Result = {
  /** The OAuth2 token: `undefined` while unfetched, `null` when none was issued. */
  oAuth2AccessToken: OAuth2Token | null | undefined;
};

/**
 * Fetches the OAuth2 client-credentials token for the configured editor client.
 *
 * The query stays disabled when no client credentials are configured, and — under
 * a `DeferredAuthProvider` — until the page has finished loading.
 */
export const useOAuth2 = (
  intlayerConfiguration?: Pick<IntlayerConfig, 'editor'>
): UseOAuth2Result => {
  const configuration = useConfiguration();
  const config = defu(intlayerConfiguration, configuration, {
    editor,
  }) as IntlayerConfig;

  const intlayerAPI = getOAuthAPI(undefined, config);
  const isAuthFetchEnabled = useIsAuthFetchEnabled();

  const { data } = useQuery({
    queryKey: ['oAuth2AccessToken'],
    queryFn: intlayerAPI.getOAuth2AccessToken,
    // Held back until after page load when a `DeferredAuthProvider` is mounted
    // (content sites); unconditional everywhere else (the CMS dashboard).
    enabled:
      !!(config.editor.clientId && config.editor.clientSecret) &&
      isAuthFetchEnabled,
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
