'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useAsync } from '../../../hooks/useAsync';
import { getIntlayerAPI } from '../../../libs/intlayer-api';
import type { Session } from './index';

export const useGetSession = () =>
  useAsync(
    'getSession',
    async () => {
      const result = await getIntlayerAPI().auth.getSession();

      if (result.data) {
        const formattedSession: Session = {
          user: result.data.user,
          organization: result.data.organization,
          project: result.data.project,
        };

        return formattedSession;
      }

      return null;
    },
    {
      cache: true,
    }
  );

export const useSession = (sessionProp?: Session | null) => {
  const {
    getSession,
    revalidate,
    data,
    setData: setSession,
    isFetched,
  } = useGetSession();

  const fetchSession = useCallback(async () => {
    if (sessionProp) {
      return;
    }

    return await getSession();
  }, [sessionProp]);

  const revalidateSession = revalidate;

  useEffect(() => {
    // Fetch session if sessionProp is not provided when the component is mounted
    fetchSession();
  }, [fetchSession]);

  const session = useMemo(
    () => data ?? (isFetched ? null : undefined),
    [data, isFetched]
  );

  return {
    session,
    fetchSession,
    revalidateSession,
    setSession,
  };
};
