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
import { createContentProxy, type IntlayerLitProxy } from './IntlayerBinding';

/**
 * Returns the content for a raw dictionary (or qualified dictionary group),
 * wrapped in an {@link IntlayerLitProxy} so the caller can subscribe to locale
 * changes via a Lit `ReactiveController`.
 *
 * The second argument is either a locale or a selector object (`{ item }`,
 * `{ variant }`, optionally combined with `locale`).
 *
 * @param dictionary - The raw dictionary (or qualified group) object.
 * @param localeOrSelector - Optional locale or selector.
 * @returns An {@link IntlayerLitProxy} with an `.observe()` registration method.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelectorForGroup<T> =
    DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): IntlayerLitProxy<
  DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >
> =>
  // Layers the client's locale and ambient variant under the call-site argument
  createContentProxy(({ contextLocale, contextVariant }) => ({
    content:
      process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
        ? getDictionary(
            dictionary,
            resolveDictionaryArgument({
              localeOrSelector,
              contextLocale,
              contextVariant,
              dictionaryKey: dictionary.key,
            }) as A
          )
        : getDictionary(dictionary, (localeOrSelector ?? contextLocale) as A),
  }));
