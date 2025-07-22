'use client';

import { getIntlayerAPI } from '@intlayer/api';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
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
      const result = await intlayerAPI.auth.getSession();
      return result.data as unknown as Session;
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
