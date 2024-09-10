'use client';

import { intlayerAPI } from '@intlayer/core';
import { useEffect, useState, useCallback } from 'react';
import type { Session } from './useCSRF';

export const useSession = (sessionProp?: Session | null) => {
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = useCallback(async () => {
    if (sessionProp) {
      return;
    }

    try {
      const { data } = await intlayerAPI.auth.getSessionInformation();

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
    session: session ?? null,
    setSession,
    fetchSession,
  };
};
