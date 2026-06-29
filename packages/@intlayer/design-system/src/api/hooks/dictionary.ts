'use client';

import type {
  AddDictionaryBody,
  DeleteDictionaryParam,
  GetDictionariesParams,
  GetDictionaryParams,
  GetDictionaryQuery,
  PushDictionariesBody,
  UpdateDictionaryBody,
} from '@intlayer/backend';
import {
  type UseQueryOptions,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import { useDictionaryAPI } from '../useIntlayerAPI';
import { useAppQuery, useAuthEnable } from './utils';

export const useGetDictionaries = (
  filters?: GetDictionariesParams,
  options?: Partial<UseQueryOptions>
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
  options?: Partial<UseQueryOptions>
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
      if (lastPage.data.length === 0) return undefined;
      const currentPage = lastPage.page ?? 1;
      const totalPages = lastPage.total_pages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: options?.enabled === false ? false : enable,
    ...options,
  });
};

export const useGetDictionariesKeys = (options?: Partial<UseQueryOptions>) => {
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
  options?: Partial<UseQueryOptions>
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

export const usePushDictionaries = () => {
  const dictionaryAPI = useDictionaryAPI();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: PushDictionariesBody) =>
      dictionaryAPI.pushDictionaries(args.dictionaries),
    meta: {
      invalidateQueries: [
        ['dictionaries'],
        ['dictionary'],
        ['dictionariesKeys'],
      ],
    },
  });
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
