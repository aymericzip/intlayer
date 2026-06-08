'use client';

import type { UseQueryOptions } from '@tanstack/react-query';
import { useAiAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetDiscussions = (
  params?: Record<string, string | string[] | undefined>,
  options?: Partial<UseQueryOptions>
) => {
  const aiAPI = useAiAPI();

  return useAppQuery({
    queryKey: ['discussions', params],
    queryFn: ({ signal }) =>
      aiAPI.getDiscussions(params, { signal, cache: 'no-store' }),
    requireUser: true,
    ...options,
  });
};

export const useGetDiscussionsData = (
  params?: Record<string, string | string[] | undefined>,
  options?: Partial<UseQueryOptions>
) => {
  const aiAPI = useAiAPI();

  return useAppQuery({
    queryKey: ['discussions-data', params],
    queryFn: ({ signal }) =>
      aiAPI.getDiscussions(
        { includeMessages: 'false', ...(params ?? {}) } as any,
        { signal, cache: 'no-store' }
      ),
    requireUser: true,
    ...options,
  });
};
