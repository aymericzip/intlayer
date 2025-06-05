import type { LocalesValues } from '@intlayer/config/client';
import type { DictionaryKeys } from '@intlayer/core';
import { derived, writable, type Readable } from 'svelte/store';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { DeepTransformContent } from '../plugins';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook for asynchronous dictionary loading by key
 * @param key The dictionary key to retrieve
 * @param locale Target locale (optional)
 * @returns Reactive store with loaded dictionary content
 */
export const useIntlayerAsync = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): Readable<DeepTransformContent<
  IntlayerDictionaryTypesConnector[T]['content']
> | null> => {
  const context = getIntlayerContext();
  const contentStore = writable<DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  > | null>(null);

  // Create a derived store that loads the dictionary when locale changes
  return derived([intlayerStore], ([$store]) => {
    const targetLocale = locale ?? context?.locale ?? $store.locale;

    // Load dictionary asynchronously
    const loadDictionary = async () => {
      try {
        // This would typically use getIntlayerAsync from core
        // For now, we'll simulate async loading
        const { getIntlayerAsync } = await import('@intlayer/core');
        const content = await getIntlayerAsync(key, targetLocale);
        contentStore.set(content);
      } catch (error) {
        console.error(
          `Failed to load async dictionary for key: ${String(key)}`,
          error
        );
        contentStore.set(null);
      }
    };

    loadDictionary();

    // Return the current state, actual loading happens asynchronously
    return null;
  });
};
