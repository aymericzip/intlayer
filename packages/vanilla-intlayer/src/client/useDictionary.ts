import type {
  Dictionary,
  DictionarySelector,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';

export type WithOnChange<T> = T & {
  /**
   * Subscribe to locale changes. The callback receives the fresh content
   * whenever the active locale changes. Returns the content object itself
   * for convenient one-liner patterns:
   *
   * ```ts
   * const content = useDictionary(myDict).onChange((c) => {
   *   document.querySelector('p')!.textContent = String(c.greeting);
   * });
   * ```
   */
  onChange: (callback: (content: any) => void) => WithOnChange<T>;
};

/**
 * Get the content for a raw dictionary (or qualified dictionary group) and
 * optionally subscribe to locale changes via the chainable `.onChange()`
 * method — mirroring the API of `react-intlayer`.
 *
 * The second argument is either a locale or a selector object (`{ item }`,
 * `{ variant }`, optionally combined with `locale`).
 *
 * @param dictionary - The raw dictionary (or qualified group) object.
 * @param localeOrSelector - Optional locale or selector.
 * @returns The current content with an `.onChange()` method.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): WithOnChange<
  DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >
> => {
  const client = getIntlayerClient();

  const isSelector =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    typeof localeOrSelector === 'object' &&
    localeOrSelector !== null;
  const explicitLocale = isSelector
    ? (localeOrSelector as DictionarySelector).locale
    : (localeOrSelector as LocalesValues | undefined);

  const read = (locale: LocalesValues | undefined) =>
    isSelector
      ? getDictionary(dictionary, {
          ...(localeOrSelector as DictionarySelector),
          locale,
        } as A)
      : getDictionary(dictionary, locale as A);

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
