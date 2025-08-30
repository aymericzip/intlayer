'use client';

/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import type { Dictionary } from '@intlayer/core';
import { useDictionariesRecord } from '@intlayer/editor-react';
import merge from 'deepmerge';
import { useMemo } from 'react';
import { useGetDictionaries } from './reactQuery';

type Args = Parameters<typeof useGetDictionaries>;

export const useGetAllDictionaries = (...props: Args) => {
  const { localeDictionaries } = useDictionariesRecord();
  const { data: onlineDictionariesAPI, isPending } = useGetDictionaries(
    ...props
  );

  const onlineDictionaries: Record<string, Dictionary> = useMemo(
    () =>
      (onlineDictionariesAPI?.data ?? []).reduce(
        (acc, dictionary) => {
          acc[dictionary.key] = dictionary;
          return acc;
        },
        {} as Record<string, Dictionary>
      ),
    [onlineDictionariesAPI]
  );

  const allDictionaries: Record<string, Dictionary> = useMemo(
    () => merge(onlineDictionaries ?? {}, localeDictionaries),
    [onlineDictionaries, localeDictionaries]
  );

  return {
    online: onlineDictionaries,
    locale: localeDictionaries,
    all: allDictionaries,
    isLoading: isPending,
  };
};
