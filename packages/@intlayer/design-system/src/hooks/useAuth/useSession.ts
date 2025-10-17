'use client';

import type { SessionAPI } from '@intlayer/backend';
import defaultConfiguration from '@intlayer/config/built';
import { useConfiguration } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types';
import { useQuery } from '@tanstack/react-query';
import { getAuthAPI } from '../../libs/auth';
import { useQueryClient } from '../reactQuery';

export const useSession = (
  sessionProp?: SessionAPI | null,
  intlayerConfiguration?: IntlayerConfig
) => {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;

  const queryClient = useQueryClient();

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const intlayerAPI = getAuthAPI(config);
      const result = await intlayerAPI.getSession();
      return result.data as unknown as SessionAPI;
    },
    staleTime: 0,
    // Give the cache a little breathing room across route transitions:
    gcTime: 5 * 60 * 1000, // e.g. 5 minutes
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !sessionProp,
  });

  const session = data ?? (isFetched ? null : undefined);

  const setSession = (nextSession: SessionAPI | null) =>
    queryClient.setQueryData(['session'], nextSession);

  const fetchSession = async (): Promise<SessionAPI | null | undefined> => {
    const res = await refetch();
    return res.data as SessionAPI | null | undefined;
  };

  const revalidateSession = fetchSession;

  return {
    session,
    fetchSession,
    revalidateSession,
    setSession,
  };
};
