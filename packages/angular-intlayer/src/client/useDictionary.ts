import { computed, inject, type Signal } from '@angular/core';
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
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';

/**
 * Angular hook that transforms a dictionary (or qualified dictionary group)
 * and returns its reactive content for the given locale or selector.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): Signal<
  DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >
> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  /** a *stable* reactive dictionary object */
  const content = computed(() => {
    const currentLocale = intlayer?.locale();

    if (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false') {
      // Layers the provider's locale and variant under the call-site argument.
      // This is also the seam the build-time optimize transform lands on, which
      // rewrites `useIntlayer('key', selector)` into `useDictionary(dict, …)`.
      return getDictionary(
        dictionary,
        resolveDictionaryArgument({
          localeOrSelector,
          contextLocale: currentLocale,
          contextVariant: intlayer?.variant?.(),
          dictionaryKey: dictionary.key,
        }) as A
      ) as any;
    }

    return getDictionary(
      dictionary,
      (localeOrSelector ?? currentLocale) as A
    ) as any;
  });

  return content; // all consumers keep full reactivity
};
