'use client';

import { intlayerAPI } from '../../../../../api/src';
import { useAsync } from '../../../hooks/useAsync/useAsync';

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
