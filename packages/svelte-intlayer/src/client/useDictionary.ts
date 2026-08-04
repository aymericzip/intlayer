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
} from '@intlayer/types/module_augmentation';
import { derived, type Readable } from 'svelte/store';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Svelte hook that transforms a dictionary (or qualified dictionary group) and
 * returns reactive content.
 *
 * @param dictionary The dictionary (or qualified group) to transform
 * @param localeOrSelector The target locale or selector (optional)
 * @returns Reactive store with transformed dictionary content
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | DeclaredLocales
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): Readable<
  DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >
> => {
  const context = getIntlayerContext();

  // Create a derived store that reactively updates when locale changes
  return derived([intlayerStore], ([$store]) => {
    const contextLocale = context?.locale ?? $store.locale;

    if (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false') {
      // Layers the provider's locale and variant under the call-site argument.
      // This is also the seam the build-time optimize transform lands on, which
      // rewrites `useIntlayer('key', selector)` into `useDictionary(dict, …)`.
      return getDictionary(
        dictionary,
        resolveDictionaryArgument({
          localeOrSelector,
          contextLocale,
          contextVariant: context?.variant,
          dictionaryKey: dictionary.key,
        }) as A
      );
    }

    return getDictionary(dictionary, (localeOrSelector ?? contextLocale) as A);
  });
};
