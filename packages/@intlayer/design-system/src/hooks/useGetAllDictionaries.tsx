'use client';

/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import { Dictionary } from '@intlayer/core';
import localeDictionaries from '@intlayer/dictionaries-entry';
import merge from 'deepmerge';
import { useMemo } from 'react';
import { useGetDictionaries } from './intlayerAPIHooks';

type Args = Parameters<typeof useGetDictionaries>;

export const useGetAllDictionaries = (...props: Args) => {
  const { data: onlineDictionariesAPI, isLoading } = useGetDictionaries(
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
    [onlineDictionaries]
  );

  return {
    online: onlineDictionaries,
    locale: localeDictionaries,
    all: allDictionaries,
    isLoading,
  };
};
