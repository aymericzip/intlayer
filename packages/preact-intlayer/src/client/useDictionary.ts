import {
  getDictionarySelectorCacheKey,
  resolveDictionaryArgument,
} from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useContext, useMemo } from 'preact/hooks';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Preact hook that transforms a dictionary (or qualified dictionary group) and
 * returns the content.
 *
 * If the locale is not provided (directly or through the selector), it will use
 * the locale from the client context.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
) => {
  const { locale: currentLocale, variant: contextVariant } =
    useContext(IntlayerClientContext) ?? {};

  // Layers the provider's locale and variant under the call-site argument.
  // This is the seam the build-time optimize transform lands on: it rewrites
  // `useIntlayer('key', selector)` into `useDictionary(dict, selector)`, so an
  // ambient variant has to be applied here to survive the rewrite.
  const argument =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? resolveDictionaryArgument({
          localeOrSelector,
          contextLocale: currentLocale,
          contextVariant,
          dictionaryKey: dictionary.key,
        })
      : (localeOrSelector ?? currentLocale);

  // Stable identity of the resolved argument for memoization — a provider
  // variant is often a fresh object literal on every render, so the dependency
  // has to be its serialization, never its reference.
  const argumentIdentity =
    typeof argument === 'object' && argument !== null
      ? `${argument.locale ?? ''}|${getDictionarySelectorCacheKey(argument)}`
      : argument;

  return useMemo(
    () => getDictionary<T, A>(dictionary, argument as A),
    [dictionary.key, argumentIdentity]
  );
};
