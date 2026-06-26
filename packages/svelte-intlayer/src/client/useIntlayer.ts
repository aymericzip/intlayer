import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
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
 * The second argument is either a locale or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `locale` composes with any selector and overrides the context locale
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param localeOrSelector - Optional locale or selector.
 * @returns A readable store with the transformed dictionary content.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useIntlayer } from 'svelte-intlayer';
 *   const content = useIntlayer('my-dictionary-key');
 *   const faq2 = useIntlayer('faq', { item: 2 });
 * </script>
 *
 * <div>{$content.myField.value}</div>
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): Readable<
  DeepTransformContent<DictionaryRegistryResult<T, A>, ExtractSelectorLocale<A>>
> => {
  const context = getIntlayerContext();

  const isSelector =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    typeof localeOrSelector === 'object' &&
    localeOrSelector !== null;

  // Create a derived store that reactively updates when locale changes
  return derived([intlayerStore], ([$store]) => {
    const contextLocale = context?.locale ?? $store.locale;

    if (isSelector) {
      return getIntlayer(key, {
        ...localeOrSelector,
        locale: localeOrSelector.locale ?? contextLocale,
      } as A);
    }

    return getIntlayer(key, (localeOrSelector ?? contextLocale) as A);
  });
};
