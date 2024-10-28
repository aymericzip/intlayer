'use client';

/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import localeDictionaries from '@intlayer/dictionaries-entry';
import { useMemo } from 'react';
import type { DictionaryContent } from '../components/DictionaryEditor';
import { useGetDictionaries } from './intlayerAPIHooks';

export const useGetAllDictionaries = () => {
  const { data: onlineDictionariesAPI, isLoading } = useGetDictionaries();

  const onlineDictionaries = onlineDictionariesAPI?.data?.reduce(
    (acc, dictionary) => {
      acc[dictionary.key] = dictionary;
      return acc;
    },
    {} as DictionaryContent
  );

  const allDictionaries = useMemo(
    () => ({ ...localeDictionaries, ...onlineDictionaries }),
    [onlineDictionaries]
  );

  return {
    online: onlineDictionaries,
    locale: localeDictionaries,
    all: allDictionaries,
    isLoading,
  };
};
