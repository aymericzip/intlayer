import type {
  Dictionary,
  DictionaryKeys,
  Locale,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { derived, type Readable, writable } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook for handling dynamic dictionary loading
 * @param dictionaryPromise Promise-based dictionary content
 * @param key Dictionary key for caching
 * @param locale Target locale (optional)
 * @returns Reactive store with loaded dictionary content
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  locale?: LocalesValues
): Readable<T | null> => {
  const context = getIntlayerContext();
  const dictionaryStore = writable<T | null>(null);

  // Create a derived store that loads the dictionary when locale changes
  return derived([intlayerStore], ([$store]) => {
    const targetLocale = locale ?? context?.locale ?? $store.locale;

    // Load dictionary for the target locale asynchronously
    const loadDictionary = async () => {
      try {
        const dictionaryLoader = dictionaryPromise[targetLocale as Locale];
        if (dictionaryLoader) {
          const loadedDictionary = await dictionaryLoader();
          dictionaryStore.set(loadedDictionary);
        } else {
          dictionaryStore.set(null);
        }
      } catch (error) {
        console.error(
          `Failed to load dictionary for key: ${String(key)}`,
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
