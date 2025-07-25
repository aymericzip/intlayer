import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary, LanguageContent } from '@intlayer/core';
import { derived, writable, type Readable } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook for handling dynamic dictionary loading
 * @param dictionaryPromise Promise-based dictionary content
 * @param key Dictionary key for caching
 * @param locale Target locale (optional)
 * @returns Reactive store with loaded dictionary content
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  locale?: LocalesValues
): Promise<Readable<T | null>> => {
  const context = getIntlayerContext();
  const dictionaryStore = writable<T | null>(null);

  // Create a derived store that loads the dictionary when locale changes
  return derived([intlayerStore], ([$store]) => {
    const targetLocale = locale ?? context?.locale ?? $store.locale;

    // Load dictionary for the target locale asynchronously
    const loadDictionary = async () => {
      try {
        const dictionaryLoader = dictionaryPromise[targetLocale];
        if (dictionaryLoader) {
          const loadedDictionary = await dictionaryLoader();
          dictionaryStore.set(loadedDictionary);
        } else {
          dictionaryStore.set(null);
        }
      } catch (error) {
        console.error(
          `Failed to load dictionary for key: ${String(targetLocale)}`,
          error
        );
        dictionaryStore.set(null);
      }
    };

    loadDictionary();

    // Return the current state, actual loading happens asynchronously
    return null;
  });
};
