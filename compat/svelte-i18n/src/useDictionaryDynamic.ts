import { getDictionary } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { derived } from 'svelte/store';
import { configDefaultLocale } from './configuration';
import { locale } from './locale';
import {
  createDictionaryStores,
  type DictionaryMessageStores,
} from './useDictionary';

/**
 * Per-locale lazy variant of `useDictionary`: only the active locale's
 * dictionary is fetched. Until it arrives, ids resolve to their `default`
 * message or the id itself.
 *
 * @param dictionaryLoaders - One loader per locale.
 * @param _dictionaryKey - Dictionary key, kept for the optimize-pass shape.
 * @param keyPrefix - Optional prefix applied to every id.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryLoaders: StrictModeLocaleMap<() => Promise<T>>,
  _dictionaryKey: K,
  keyPrefix?: string
): DictionaryMessageStores => {
  const loadedDictionaries = new Map<string, T>();

  const readContent = (targetLocale: string): unknown => {
    const loadedDictionary = loadedDictionaries.get(targetLocale);

    return loadedDictionary
      ? getDictionary(loadedDictionary, targetLocale as LocalesValues)
      : undefined;
  };

  const contentStore = derived(
    locale,
    ($locale, set) => {
      const targetLocale = $locale ?? configDefaultLocale;
      const publish = () => set({ locale: $locale, readContent });

      publish();

      if (loadedDictionaries.has(targetLocale)) return;

      const loader =
        dictionaryLoaders[targetLocale as keyof typeof dictionaryLoaders];
      if (!loader) return;

      let isCancelled = false;

      loader().then((loadedDictionary) => {
        loadedDictionaries.set(targetLocale, loadedDictionary);
        if (!isCancelled) publish();
      });

      return () => {
        isCancelled = true;
      };
    },
    { locale: configDefaultLocale as string | null | undefined, readContent }
  );

  return createDictionaryStores(contentStore, keyPrefix);
};
