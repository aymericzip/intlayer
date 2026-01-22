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
 * Svelte hook that picks one dictionary by its key and returns its reactive content.
 *
 * It returns a readable store that reactively updates whenever the locale changes.
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param locale - Optional locale to override the current context locale.
 * @returns A readable store with the transformed dictionary content.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useIntlayer } from 'svelte-intlayer';
 *   const content = useIntlayer('my-dictionary-key');
 * </script>
 *
 * <div>{$content.myField.value}</div>
 * ```
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): Readable<DeepTransformContent<DictionaryRegistryContent<T>>> => {
  const context = getIntlayerContext();

  // Create a derived store that reactively updates when locale changes
  return derived([intlayerStore], ([$store]) => {
    const targetLocale = locale ?? context?.locale ?? $store.locale;
    return getIntlayer(key, targetLocale);
  });
};
