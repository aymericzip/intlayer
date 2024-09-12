'use client';

import type { Organization, Project, UserAPI } from '@intlayer/backend';
import {
  type PropsWithChildren,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { intlayerAPI } from '../../../libs/intlayer-api';

export type Session = {
  user: UserAPI | null;
  organization: Organization | null;
  project: Project | null;
};

export type AuthProviderProps = PropsWithChildren<{
  /**
   * auth session
   */
  session?: Session | null;
}>;

export const useCSRF = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const fetchCSRFToken = useCallback(async () => {
    if (csrfToken) {
      return;
    }

    try {
      const { data } = await intlayerAPI.auth.getCSRFToken();

      if (!data) {
        return setCsrfToken(null);
      }

      setCsrfToken(data.csrf_token);
    } catch (error) {
      console.error('Error fetching csrf token:', error);
    }
  }, [csrfToken]);

  useEffect(() => {
    fetchCSRFToken().catch((error) =>
      console.error('Error fetching csrf token:', error)
    );
  }, [fetchCSRFToken]);

  return {
    csrfToken: csrfToken ?? null,
    setCsrfToken,
  };
};
