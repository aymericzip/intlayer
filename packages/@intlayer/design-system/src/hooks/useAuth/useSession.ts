'use client';

import type { SessionAPI } from '@intlayer/backend';
import defaultConfiguration from '@intlayer/config/built';
import { useConfiguration } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types';
import { useQuery } from '@tanstack/react-query';
import { getAuthAPI } from '../../libs/auth';
import { useQueryClient } from '../reactQuery';

export type UseSessionResult = {
  /** The current session: `undefined` while loading, `null` if fetched and no session, otherwise the session. */
  session: SessionAPI | null | undefined;
  /** Refetches the session and returns it (undefined while loading). */
  fetchSession: () => Promise<SessionAPI | null | undefined>;
  /** Alias of `fetchSession` for ergonomics. */
  revalidateSession: () => Promise<SessionAPI | null | undefined>;
  /** Manually set the session cache. */
  setSession: (nextSession: SessionAPI | null) => void;
};

export function useSession(
  sessionProp?: SessionAPI | null,
  intlayerConfiguration?: IntlayerConfig
): UseSessionResult {
  const configuration = useConfiguration();
  const config = intlayerConfiguration ?? configuration ?? defaultConfiguration;

  const queryClient = useQueryClient();

  // Keep TanStack generics internal so they don't leak into the d.ts
  const { data, isFetched, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const intlayerAPI = getAuthAPI(config);
      const result = await intlayerAPI.getSession();
      // Narrow to the public shape we want to expose
      return result.data as unknown as SessionAPI;
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !sessionProp,
  });

  const session = data ?? (isFetched ? null : undefined);

  const setSession = (nextSession: SessionAPI | null) => {
    queryClient.setQueryData(['session'], nextSession);
  };

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
}
