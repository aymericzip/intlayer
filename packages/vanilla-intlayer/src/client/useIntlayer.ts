import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';
import { attachOnChange, type WithOnChange } from './useDictionary';

/**
 * Get the translated content for the given key and optionally subscribe to
 * locale changes via the chainable `.onChange()` method — mirroring the API
 * of `react-intlayer`'s `useIntlayer`.
 *
 * The second argument is either a locale or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `locale` composes with any selector and overrides the current locale
 *
 * The function returns the current content **directly** (same shape as
 * `getIntlayer(key)`), plus the `.onChange()` helper.
 *
 * @param key - Dictionary key registered in your intlayer content files.
 * @param localeOrSelector - Optional locale or selector.
 * @returns The current translated content with an `.onChange()` method.
 *
 * @example
 * ```ts
 * import { installIntlayer, useIntlayer } from 'vanilla-intlayer';
 *
 * installIntlayer();
 *
 * const content = useIntlayer('homepage');
 * const faq2 = useIntlayer('faq', { item: 2 });
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): WithOnChange<
  DeepTransformContent<DictionaryRegistryResult<T, A>, ExtractSelectorLocale<A>>
> => {
  const client = getIntlayerClient();

  // Layers the client's locale and ambient variant under the call-site
  // argument. Resolved per read so a `setLocale` / `setVariant` is picked up.
  const read = (contextLocale: LocalesValues) =>
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? getIntlayer(
          key,
          resolveDictionaryArgument({
            localeOrSelector,
            contextLocale,
            contextVariant: client.variant,
            dictionaryKey: key as string,
          }) as A
        )
      : getIntlayer(key, (localeOrSelector ?? contextLocale) as A);

  return attachOnChange(read(client.locale), (locale, callback) =>
    callback(read(locale))
  );
};
