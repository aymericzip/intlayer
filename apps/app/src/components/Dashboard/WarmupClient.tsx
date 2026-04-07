'use client';

import {
  useGetDictionaries,
  useGetDictionariesKeys,
  useGetOrganizations,
  useGetProjects,
  useGetTags,
  useGetUsers,
  useQueryClient,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useEffect } from 'react';

// Mount once within dashboard to warm React Query cache on the client
export const WarmupClient: FC = () => {
  const queryClient = useQueryClient();

  // Ensure dashboard queries stay fresh across client navigations
  // to avoid isPending flashes and loaders between pages
  useEffect(() => {
    const defaults = {
      staleTime: 60 * 1000, // keep data fresh for 1 minute
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    } as const;

    queryClient.setQueryDefaults(['organizations'], defaults);
    queryClient.setQueryDefaults(['projects'], defaults);
    queryClient.setQueryDefaults(['tags'], defaults);
    queryClient.setQueryDefaults(['dictionaries'], defaults);
    queryClient.setQueryDefaults(['dictionariesKeys'], defaults);
    queryClient.setQueryDefaults(['users'], defaults);
  }, [queryClient]);

  // Unconditionally call hooks; their internal enable gating uses session state
  useGetOrganizations();
  useGetProjects();
  useGetTags();
  useGetDictionaries();
  useGetDictionariesKeys();
  useGetUsers();

  return null;
};
