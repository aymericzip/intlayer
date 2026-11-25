import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
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
 * Adds the chainable `.onChange()` to read content: on every locale change,
 * `readForLocale` resolves the content of the new locale and hands it to the
 * callback. Shared by `useDictionary`, `useIntlayer` and `useDictionaryDynamic`.
 */
export const attachOnChange = <Content>(
  content: Content,
  readForLocale: (
    locale: LocalesValues,
    callback: (content: unknown) => void
  ) => void
): WithOnChange<Content> => {
  // A selector can resolve to null/array; only objects carry `.onChange`.
  if (content != null && typeof content === 'object') {
    const contentWithOnChange = content as WithOnChange<Content>;

    contentWithOnChange.onChange = (callback) => {
      getIntlayerClient().subscribe((newLocale) =>
        readForLocale(newLocale, callback)
      );

      return contentWithOnChange;
    };
  }

  return content as WithOnChange<Content>;
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
  const A extends LocalesValues | DictionarySelectorForGroup<T> =
    DeclaredLocales,
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

  // Layers the client's locale and ambient variant under the call-site
  // argument. Resolved per read so a `setLocale` / `setVariant` is picked up.
  const read = (contextLocale: LocalesValues) =>
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? getDictionary(
          dictionary,
          resolveDictionaryArgument({
            localeOrSelector,
            contextLocale,
            contextVariant: client.variant,
            dictionaryKey: dictionary.key,
          }) as A
        )
      : getDictionary(dictionary, (localeOrSelector ?? contextLocale) as A);

  return attachOnChange(read(client.locale), (locale, callback) =>
    callback(read(locale))
  );
};
