import { loadDynamicDictionary } from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { derived, type Readable } from 'svelte/store';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook for handling dynamic dictionary loading
 * @param dictionaryPromise Locale-keyed dictionary loaders
 * @param locale Target locale (optional, defaults to the context locale)
 * @returns Reactive store with the loaded dictionary, `null` while loading
 */
export const useDictionaryAsync = async <const T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: LocalesValues
): Promise<Readable<T | null>> => {
  const context = getIntlayerContext();

  return derived<typeof intlayerStore, T | null>(
    intlayerStore,
    ($store, set) => {
      const targetLocale = locale ?? context?.locale ?? $store.locale;
      let isCancelled = false;

      loadDynamicDictionary(dictionaryPromise, targetLocale).then(
        (dictionary) => {
          if (!isCancelled) set(dictionary ?? null);
        },
        (error: unknown) => {
          if (isCancelled) return;

          console.error(
            `Failed to load dictionary for locale: ${String(targetLocale)}`,
            error
          );
          set(null);
        }
      );

      return () => {
        isCancelled = true;
      };
    },
    null
  );
};
