import { useGetDictionaries } from '@intlayer/design-system/api';
import { useDictionariesRecord } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { type FC, useEffect } from 'react';

/**
 * Route-level dictionary loader: always active for all _content sub-routes.
 * Fetches remote dictionaries and merges them with any locale dictionaries
 * received from the editor iframe (via window.message broadcast).
 * When no editor is connected, locale dicts are empty and Manager A ends up
 * with remote dicts only.
 */
export const DictionaryLoaderRoute: FC = () => {
  const { localeDictionaries, setLocaleDictionaries } = useDictionariesRecord();
  const { data, isFetching } = useGetDictionaries();

  useEffect(() => {
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

    const isDifferent =
      JSON.stringify(mergedDictionaries) !== JSON.stringify(localeDictionaries);

    if (isDifferent) {
      setLocaleDictionaries(mergedDictionaries);
    }
  }, [data, isFetching, localeDictionaries]);

  return <></>;
};
