import {
  useGetCIConfig,
  useGetDictionaries,
  useGetDictionariesKeys,
  useGetOrganizations,
  useGetProjects,
  useGetTags,
  useGetUsers,
} from '@intlayer/design-system/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

/**
 * Hook to warm up the cache with essential data
 */
export const useHotDataLoading = () => {
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
  useGetTags({
    page: 1,
    pageSize: 10,
    search: undefined,
  });
  useGetDictionaries({
    page: 1,
    pageSize: 20,
    search: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc',
    tags: '',
    location: undefined,
  });
  useGetDictionariesKeys();
  useGetUsers();
};
