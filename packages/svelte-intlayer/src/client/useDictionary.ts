import type { Dictionary, LocalesValues } from '@intlayer/types';
import { derived, type Readable } from 'svelte/store';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook that transforms a dictionary and returns reactive content
 * @param dictionary The dictionary to transform
 * @param locale The target locale (optional, uses context or store locale)
 * @returns Reactive store with transformed dictionary content
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): Readable<DeepTransformContent<T['content']>> => {
  const context = getIntlayerContext();

  // Create a derived store that reactively updates when locale changes
  return derived([intlayerStore], ([$store]) => {
    const targetLocale = locale ?? context?.locale ?? $store.locale;
    return getDictionary<T, LocalesValues>(dictionary, targetLocale);
  });
};
