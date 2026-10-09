'use client';

import type {
  AddDictionaryBody,
  DeleteDictionaryParam,
  GetDictionariesParams,
  GetDictionaryParams,
  GetDictionaryQuery,
  PushDictionariesBody,
  UpdateDictionaryBody,
} from '@intlayer/backend-contract/dictionary';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  type PushDictionariesProgressState,
  pushDictionariesInBatches,
} from '../pushDictionariesInBatches';
import { useDictionaryAPI } from '../useIntlayerAPI';
import { type AppQueryOptions, useAppQuery, useAuthEnable } from './utils';

export const useGetDictionaries = (
  filters?: GetDictionariesParams,
  options?: AppQueryOptions
) => {
  const dictionaryAPI = useDictionaryAPI();

  return useAppQuery({
    queryKey: ['dictionaries', filters],
    queryFn: ({ signal }) => dictionaryAPI.getDictionaries(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useInfiniteGetDictionaries = (
  filters?: Omit<GetDictionariesParams, 'page'>,
  options?: { enabled?: boolean }
) => {
  const dictionaryAPI = useDictionaryAPI();
  const { enable } = useAuthEnable({
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
  });

  return useInfiniteQuery({
    queryKey: ['dictionaries', 'infinite', filters],
    queryFn: async ({ pageParam = 1, signal }) => {
      const res = await dictionaryAPI.getDictionaries(
        { ...filters, page: pageParam },
        { signal }
      );
      return res;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.data?.length) return undefined;
      const currentPage = lastPage.page ?? 1;
      const totalPages = lastPage.total_pages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: options?.enabled === false ? false : enable,
  });
};

export const useGetDictionariesKeys = (options?: AppQueryOptions) => {
  const dictionaryAPI = useDictionaryAPI();

  return useAppQuery({
    queryKey: ['dictionariesKeys'],
    queryFn: () => dictionaryAPI.getDictionariesKeys(),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useGetDictionary = (
  dictionaryKey: GetDictionaryParams['dictionaryKey'],
  version?: GetDictionaryQuery['version'],
  options?: AppQueryOptions
) => {
  const dictionaryAPI = useDictionaryAPI();

  return useAppQuery({
    queryKey: ['dictionary', dictionaryKey],
    queryFn: ({ signal }) =>
      dictionaryAPI.getDictionary(dictionaryKey, version, {
        signal,
      }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useAddDictionary = () => {
  const dictionaryAPI = useDictionaryAPI();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: AddDictionaryBody) => dictionaryAPI.addDictionary(args),
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

/**
 * Pushes dictionaries in parallel batches, so large sets stay below the
 * request size limit. `progress` follows the push in flight, and keeps the
 * last state once it settles (`null` before the first push).
 */
export const usePushDictionaries = () => {
  const dictionaryAPI = useDictionaryAPI();
  const [progress, setProgress] =
    useState<PushDictionariesProgressState | null>(null);

  const mutation = useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: PushDictionariesBody) =>
      pushDictionariesInBatches(
        args.dictionaries,
        (batch) => dictionaryAPI.pushDictionaries(batch),
        { onProgress: setProgress }
      ),
    meta: {
      invalidateQueries: [
        ['dictionaries'],
        ['dictionary'],
        ['dictionariesKeys'],
      ],
    },
  });

  return { ...mutation, progress };
};

export const useUpdateDictionary = () => {
  const dictionaryAPI = useDictionaryAPI();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: UpdateDictionaryBody) =>
      dictionaryAPI.updateDictionary(args),
    meta: {
      invalidateQueries: [
        ['dictionaries'],
        ['dictionary'],
        ['dictionariesKeys'],
      ],
    },
  });
};

export const useDeleteDictionary = () => {
  const dictionaryAPI = useDictionaryAPI();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: DeleteDictionaryParam) =>
      dictionaryAPI.deleteDictionary(args.dictionaryId),
    meta: {
      invalidateQueries: [
        ['dictionaries'],
        ['dictionary'],
        ['dictionariesKeys'],
      ],
    },
  });
};
