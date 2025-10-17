import { effect, type Injector, type Signal, signal } from '@angular/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { MessageKey } from '@intlayer/editor';
import type { Dictionary } from '@intlayer/types';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameState } from './useCrossFrameState';

/**
 * Singleton instance
 */
let instance: DictionariesRecordClient | null = null;

export type DictionaryContent = Record<Dictionary['key'], Dictionary>;

type DictionariesRecordClient = {
  localeDictionaries: Signal<DictionaryContent>;
  setLocaleDictionaries: (newValue: DictionaryContent) => void;
  setLocaleDictionary: (d: Dictionary) => void;
};

export const createDictionaryRecordClient = () => {
  if (instance) return instance;

  const dictionaries = getDictionaries();
  const localeDictionariesSignal = signal<DictionaryContent>(dictionaries);

  instance = {
    localeDictionaries: localeDictionariesSignal.asReadonly(),

    setLocaleDictionaries: (newValue) => {
      localeDictionariesSignal.set(newValue ?? {});
    },

    setLocaleDictionary(dictionary) {
      const current = localeDictionariesSignal();
      localeDictionariesSignal.set({
        ...current,
        [dictionary.key]: dictionary,
      });
    },
  };

  return instance;
};

/**
 * Helper to install the provider into the injector
 */
export const installDictionariesRecord = (_injector: Injector) => {
  const _client = createDictionaryRecordClient();

  // Angular doesn't have a direct equivalent to Vue's app.provide
  // The client is stored as a singleton and accessed via createDictionaryRecordClient
};

export const useDictionariesRecord = createSharedComposable(() => {
  const client = createDictionaryRecordClient();

  if (!client) {
    throw new Error('DictionariesRecord state not found');
  }

  const [_dictionariesRecord, setDictionariesRecord] =
    useCrossFrameState<DictionaryContent>(
      MessageKey.INTLAYER_LOCALE_DICTIONARIES_CHANGED,
      undefined
    );

  // Use Angular effects instead of Vue watchers
  effect(() => {
    const newValue = client.localeDictionaries();
    setDictionariesRecord(newValue); // its undefined but shouldnt
  });
});
