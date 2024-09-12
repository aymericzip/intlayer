'use client';

import { useEffect, useState, useCallback } from 'react';
import { getIntlayerAPI } from '../../../libs/intlayer-api';
import type { Session } from './useCSRF';

export const useSession = (sessionProp?: Session | null) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const fetchSession = useCallback(async () => {
    if (sessionProp) {
      return;
    }

    try {
      const { data } = await getIntlayerAPI().auth.getSession();

      if (!data) {
        return setSession(null);
      }

      const session: Session = {
        user: data.user,
        organization: null,
        project: null,
      };

      setSession(session);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }, [sessionProp]);

  useEffect(() => {
    fetchSession().catch((error) =>
      console.error('Error fetching session:', error)
    );
  }, [fetchSession, sessionProp]);

  return {
    session,
    setSession,
    fetchSession,
  };
};
