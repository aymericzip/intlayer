import { MessageKey } from '@intlayer/editor';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { useCrossFrameState } from './useCrossFrameState';

export type DictionaryContent = Record<LocalDictionaryId, Dictionary>;

let loaded = false;

export const useDictionariesRecord = () => {
  const [dictionariesRecord, setDictionariesRecord] =
    useCrossFrameState<DictionaryContent>(
      MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
      {}
    );

  if (!loaded && typeof window !== 'undefined') {
    const unmergedDictionaries = getUnmergedDictionaries();
    const dictionariesList = Object.fromEntries(
      Object.values(unmergedDictionaries)
        .flat()
        .map((dictionary) => [dictionary.localId, dictionary])
    );

    setDictionariesRecord(dictionariesList);
    loaded = true;
  }

  return { dictionariesRecord };
};
