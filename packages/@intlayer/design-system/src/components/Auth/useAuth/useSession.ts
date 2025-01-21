'use client';

import { getIntlayerAPI } from '@intlayer/api';
import { getConfiguration, IntlayerConfig } from '@intlayer/config/client';
import { useMemo } from 'react';
import { useAsync } from '../../../hooks/useAsync';
import type { Session } from './index';

export const useSession = (
  sessionProp?: Session | null,
  intlayerConfiguration?: IntlayerConfig
) => {
  const config = intlayerConfiguration ?? getConfiguration();
  const intlayerAPI = getIntlayerAPI(undefined, config);

  const {
    getSession,
    revalidate,
    data,
    setData: setSession,
    isFetched,
  } = useAsync(
    'getSession',
    async () => {
      try {
        const result = await intlayerAPI.auth.getSession();

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
              (user && (project?.adminsIds ?? []).includes(user._id!)) ?? false,
          };

          return formattedSession;
        }
      } catch (_error) {
        console.error(_error);
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

  const session = useMemo(
    () => data ?? (isFetched ? null : undefined),
    [data, isFetched]
  );

  return {
    session,
    fetchSession: getSession,
    revalidateSession: revalidate,
    setSession,
  };
};
