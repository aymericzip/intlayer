'use client';

import { useEffect, useState, useCallback } from 'react';
import { intlayerAPI } from '../../../libs/intlayer-api';

export const useCSRF = () => {
  const [csrfToken, setCsrfToken] = useState<string | null | undefined>();
  const [csrfTokenFetched, setCsrfTokenFetched] = useState(false);

  const fetchCSRFToken = useCallback(async () => {
    if (csrfToken ?? csrfTokenFetched) {
      return;
    }

    try {
      setCsrfTokenFetched(true);

      const { data } = await intlayerAPI.auth.getCSRFToken();

      if (data?.csrf_token) {
        return setCsrfToken(data.csrf_token);
      }

      setCsrfToken(null);
    } catch (error) {
      setCsrfToken(null);

      console.error('Error fetching csrf token:', error);
    }
  }, [csrfToken]);

  useEffect(() => {
    fetchCSRFToken().catch((error) =>
      console.error('Error fetching csrf token:', error)
    );
  }, [fetchCSRFToken]);

  return {
    csrfToken,
    setCsrfToken,
    csrfTokenFetched,
    setCsrfTokenFetched,
  };
};
