import type { DictionarySelector } from '@intlayer/types/dictionary';
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
import type { WithOnChange } from './useDictionary';

/**
 * Get the translated content for the given key and optionally subscribe to
 * locale changes via the chainable `.onChange()` method — mirroring the API
 * of `react-intlayer`'s `useIntlayer`.
 *
 * The second argument is either a locale or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `{ id: 'prod_abc', ...metaFields }` — meta record
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

  const isSelector =
    typeof localeOrSelector === 'object' && localeOrSelector !== null;
  const explicitLocale = isSelector
    ? (localeOrSelector as DictionarySelector).locale
    : (localeOrSelector as LocalesValues | undefined);

  const read = (locale: LocalesValues | undefined) =>
    isSelector
      ? getIntlayer(key, {
          ...(localeOrSelector as DictionarySelector),
          locale,
        } as A)
      : getIntlayer(key, locale as A);

  const content = read(explicitLocale ?? client.locale) as WithOnChange<any>;

  // A selector can resolve to null/array; only objects carry `.onChange`.
  if (content != null && typeof content === 'object') {
    content.onChange = (callback) => {
      client.subscribe((newLocale) => {
        callback(read(explicitLocale ?? newLocale));
      });
      return content;
    };
  }

  return content;
};
