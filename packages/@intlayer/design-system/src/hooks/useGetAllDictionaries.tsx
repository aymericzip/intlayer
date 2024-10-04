'use client';

import type { Dictionary } from '@intlayer/core';
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */
import localeDictionaries from '@intlayer/dictionaries-entry';
import { useEffect, useMemo, useState } from 'react';
import type { DictionaryContent } from '../components/DictionaryEditor';
import { useGetDictionaries } from './intlayerAPIHooks';

export const useGetAllDictionaries = () => {
  const { getDictionaries, isLoading } = useGetDictionaries();
  const [onlineDictionaries, setOnlineDictionaries] =
    useState<DictionaryContent>({});

  useEffect(() => {
    if (Object.keys(onlineDictionaries).length > 0) return;

    getDictionaries()
      .then((response) => {
        const dictionariesRecord = response.data?.reduce((acc, dictionary) => {
          acc[dictionary.key] = {
            ...dictionary.content,
            id: dictionary.key,
          } as Dictionary;
          return acc;
        }, {} as DictionaryContent);

        if (!dictionariesRecord) return;

        setOnlineDictionaries(dictionariesRecord);
      })
      .catch(() => console.error('Error loading dictionaries'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineDictionaries]);

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
