'use client';

import { getIntlayerAPI } from '@intlayer/api';
import type { IntlayerConfig } from '@intlayer/config/client';
import defaultConfiguration from '@intlayer/config/built';

import { useConfiguration } from '@intlayer/editor-react';
import { useAsync } from '../../../hooks/useAsync/useAsync';

export const useCSRF = (intlayerConfiguration?: IntlayerConfig) => {
  const contextConfiguration = useConfiguration();
  const config =
    intlayerConfiguration ?? contextConfiguration ?? defaultConfiguration;
  const intlayerAPI = getIntlayerAPI(undefined, config);

  const { data, isFetched: csrfTokenFetched } = useAsync(
    'getCSRFToken',
    intlayerAPI.auth.getCSRFToken,
    {
      cache: true,
      autoFetch: true,
    }
  );

  const csrfToken = data?.data?.csrf_token;

  return {
    csrfToken,
    csrfTokenFetched,
  };
};
