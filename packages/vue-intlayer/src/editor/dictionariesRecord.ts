import type { Dictionary } from '@intlayer/core';
import dictionaries from '@intlayer/dictionaries-entry';
import { MessageKey } from '@intlayer/editor';
import {
  type App,
  type InjectionKey,
  inject,
  type Ref,
  readonly,
  ref,
  watch,
} from 'vue';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

/**
 * Singleton instance
 */
let instance: DictionariesRecordClient | null = null;

const INTLAYER_DICTIONARIES_RECORD_SYMBOL = Symbol(
  'intlayerDictionariesRecord'
);

export type DictionaryContent = Record<Dictionary['key'], Dictionary>;

type DictionariesRecordClient = {
  localeDictionaries: Ref<DictionaryContent>;
  setLocaleDictionaries: (newValue: DictionaryContent) => void;
  setLocaleDictionary: (d: Dictionary) => void;
};

const Key: InjectionKey<DictionariesRecordClient> =
  Symbol('DictionariesRecord');

export const createDictionaryRecordClient = () => {
  if (instance) return instance;

  const localeDictionaries = ref<DictionaryContent>(dictionaries);

  instance = {
    localeDictionaries: readonly(localeDictionaries) as Ref<DictionaryContent>,

    setLocaleDictionaries: (newValue) => {
      localeDictionaries.value = newValue ?? {};
    },

    setLocaleDictionary(dictionary) {
      localeDictionaries.value = {
        ...localeDictionaries.value,
        [dictionary.key]: dictionary,
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
