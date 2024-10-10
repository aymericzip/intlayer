'use client';

import { useEffect, useState, useCallback } from 'react';
import { getIntlayerAPI } from '../../../libs/intlayer-api';
import type { Session } from './index';

export const useSession = (sessionProp?: Session | null) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const fetchSession = useCallback(() => {
    if (sessionProp) {
      return;
    }

    getIntlayerAPI()
      .auth.getSession()
      .then((response) => {
        if (!response.data) {
          return setSession(null);
        }

        const session: Session = {
          user: response.data.user,
          organization: response.data.organization,
          project: response.data.project,
        };

        setSession(session);
      })
      .catch((error) => {
        console.error('Error fetching session:', error);
        setSession(null);
      });
  }, [sessionProp]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession, sessionProp]);

  return {
    session,
    setSession,
    fetchSession,
  };
};
