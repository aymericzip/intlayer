'use client';

import { getIntlayerAPI } from '@intlayer/api';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useMemo } from 'react';
import { useAsync } from '../useAsync';
import type { Session } from './index';

export const useSession = (
  sessionProp?: Session | null,
  intlayerConfiguration?: IntlayerConfig
) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;
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
          const user = result.data.user as unknown as Session['user'];
          const organization = null;
          const project = null;

          const formattedSession: Session = {
            user,
            organization,
            project,
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
