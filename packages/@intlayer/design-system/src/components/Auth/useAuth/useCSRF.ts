'use client';

import { getIntlayerAPI } from '@intlayer/api';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useAsync } from '../../../hooks/useAsync/useAsync';

export const useCSRF = (intlayerConfiguration?: IntlayerConfig) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? getConfiguration();
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
