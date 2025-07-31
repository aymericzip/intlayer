'use client';

import type { SessionAPI } from '@intlayer/backend';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { getAuthAPI } from '../auth';
import { useAsync } from '../useAsync';

export const useSession = (
  sessionProp?: SessionAPI | null,
  intlayerConfiguration?: IntlayerConfig
) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;

  const {
    getSession,
    revalidate,
    data,
    setData: setSession,
    isFetched,
  } = useAsync(
    'getSession',
    async () => {
      const intlayerAPI = getAuthAPI(config);
      const result = await intlayerAPI.getSession();
      return result.data as unknown as SessionAPI;
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

  const session = data ?? (isFetched ? null : undefined);

  return {
    session,
    fetchSession: getSession,
    revalidateSession: revalidate,
    setSession,
  };
};
