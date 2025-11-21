import { MessageKey } from '@intlayer/editor';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types';
import { type App, inject, type Ref, readonly, ref, watch } from 'vue';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

/**
 * Singleton instance
 */
let instance: DictionariesRecordClient | null = null;

const INTLAYER_DICTIONARIES_RECORD_SYMBOL = Symbol(
  'intlayerDictionariesRecord'
);

export type DictionaryContent = Record<LocalDictionaryId, Dictionary>;

type DictionariesRecordClient = {
  localeDictionaries: Ref<DictionaryContent>;
  setLocaleDictionaries: (newValue: DictionaryContent) => void;
  setLocaleDictionary: (dictionary: Dictionary) => void;
};

export const createDictionaryRecordClient = () => {
  if (instance) return instance;

  const localeDictionaries = ref<DictionaryContent | undefined>(undefined);

  instance = {
    localeDictionaries: readonly(localeDictionaries) as Ref<DictionaryContent>,

    setLocaleDictionaries: (newValue) => {
      localeDictionaries.value = newValue ?? {};
    },

    setLocaleDictionary(dictionary) {
      localeDictionaries.value = {
        ...localeDictionaries.value,
        [dictionary.localId!]: dictionary,
      };
    },
  };

  return instance;
};

/**
 * Helper to install the provider into the app
 */
export const installDictionariesRecord = (app: App) => {
  const client = createDictionaryRecordClient();

  // Load dictionaries dynamically to do not impact the bundle, and send them to the editor
  import('@intlayer/unmerged-dictionaries-entry').then((mod) => {
    const unmergedDictionaries = mod.getUnmergedDictionaries();
    const dictionariesList = Object.fromEntries(
      Object.values(unmergedDictionaries)
        .flat()
        .map((dictionary) => [dictionary.localId, dictionary])
    );

    client.setLocaleDictionaries(dictionariesList);
  });

  app.provide(INTLAYER_DICTIONARIES_RECORD_SYMBOL, client);
};

export const useDictionariesRecord = createSharedComposable(() => {
  const client = inject<DictionariesRecordClient>(
    INTLAYER_DICTIONARIES_RECORD_SYMBOL
  );

  if (!client) {
    throw new Error('DictionariesRecord state not found');
  }

  const [_dictionariesRecord, setDictionariesRecord] =
    useCrossFrameState<DictionaryContent>(
      MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
      undefined
    );

  watch(
    client.localeDictionaries,
    (newValue) => {
      setDictionariesRecord(newValue); // its undefined but shouldnt
    },
    { immediate: true }
  );
});
