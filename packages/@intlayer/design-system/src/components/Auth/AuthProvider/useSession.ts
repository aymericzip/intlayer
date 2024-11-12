'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useAsync } from '../../../hooks/useAsync';
import { getIntlayerAPI } from '../../../libs/intlayer-api';
import type { Session } from './index';

export const useSession = (sessionProp?: Session | null) => {
  const useGetSession = () =>
    useAsync(
      'getSession',
      async () => {
        try {
          const result = await getIntlayerAPI().auth.getSession();

          if (result.data) {
            const { user, organization, project } = result.data;

            const formattedSession: Session = {
              user,
              organization,
              isOrganizationAdmin:
                (user && (organization?.adminsIds ?? []).includes(user._id!)) ??
                false,
              project,
              isProjectAdmin:
                (user && (project?.adminsIds ?? []).includes(user._id!)) ??
                false,
            };

            console.log('session', formattedSession);
            return formattedSession;
          }
        } catch (_error) {
          // Failed to fetch session
        }

        return null;
      },
      {
        cache: true,
        store: true,
        autoFetch: true,
        enable: !sessionProp,
        invalidateQueries: [
          'getOrganizations',
          'getProjects',
          'getUsers',
          'getDictionaries',
        ],
      }
    );

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
