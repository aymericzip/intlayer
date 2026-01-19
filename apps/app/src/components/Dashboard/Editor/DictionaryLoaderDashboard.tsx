'use client';

import { useGetDictionaries } from '@intlayer/design-system/hooks';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { type FC, useEffect, useState } from 'react';

export const DictionaryLoaderDashboard: FC = () => {
  // Will receive the locale dictionaries from the client, and will add remote dictionaries to the list
  const { localeDictionaries, setLocaleDictionaries } = useDictionariesRecord();

  const { data, isFetching } = useGetDictionaries();

  useEffect(() => {
    // Wait for the locale dictionaries to be loaded for security
    if (Object.keys(localeDictionaries ?? {}).length === 0) return;
    if (!data) return;

    const dictionariesList: Record<LocalDictionaryId, Dictionary> =
      Object.fromEntries(
        data?.data?.map((dictionary: Dictionary) => [
          dictionary.localId,
          dictionary,
        ])
      );

    const mergedDictionaries: Record<LocalDictionaryId, Dictionary> =
      Object.fromEntries(
        Object.entries({
          ...dictionariesList,
          ...(localeDictionaries as Record<LocalDictionaryId, Dictionary>),
        }).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      );

    // Check if the merged dictionaries are different from the current locale dictionaries
    const isDifferent =
      JSON.stringify(mergedDictionaries) !== JSON.stringify(localeDictionaries);

    if (isDifferent) {
      setLocaleDictionaries(mergedDictionaries);
    }
  }, [data, isFetching, localeDictionaries]);

  return <></>;
};
