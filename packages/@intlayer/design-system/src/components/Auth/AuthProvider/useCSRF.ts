'use client';

import { useAsync } from '../../../hooks/useAsync/useAsync';
import { intlayerAPI } from '../../../libs/intlayer-api';

export const useCSRF = () => {
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
