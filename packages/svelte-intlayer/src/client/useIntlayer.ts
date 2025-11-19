import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import { derived, type Readable } from 'svelte/store';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook that picks one dictionary by its key and returns reactive content
 * @param key The dictionary key to retrieve
 * @param locale The target locale (optional, uses context or store locale)
 * @returns Reactive store with transformed dictionary content
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): DeepTransformContent<DictionaryRegistryContent<T>> => {
  const context = getIntlayerContext();

  // Create a derived store that reactively updates when locale changes
  return derived([intlayerStore], ([$store]) => {
    const targetLocale = locale ?? context?.locale ?? $store.locale;
    return getIntlayer(key, targetLocale);
  });
};
