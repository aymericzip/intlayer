import { MessageKey } from '@intlayer/editor';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { useCrossFrameState } from './useCrossFrameState';

export type DictionaryContent = Record<LocalDictionaryId, Dictionary>;

export const useDictionariesRecord = () => {
  const [dictionariesRecord] = useCrossFrameState<DictionaryContent>(
    MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
    {}
  );

  return { dictionariesRecord };
};
