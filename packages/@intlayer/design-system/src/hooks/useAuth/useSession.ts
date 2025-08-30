'use client';

import type { SessionAPI } from '@intlayer/backend';
import defaultConfiguration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useConfiguration } from '@intlayer/editor-react';
import { useQuery } from '@tanstack/react-query';
import { getAuthAPI } from '../auth';
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
    gcTime: 0,
    enabled: !sessionProp,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
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
