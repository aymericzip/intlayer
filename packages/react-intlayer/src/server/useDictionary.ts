import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import {
  IntlayerServerContext,
  IntlayerServerVariantContext,
} from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that transform a dictionary (or qualified
 * dictionary group) and return the content
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the locale from the server context
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  fallbackLocale?: DeclaredLocales
) => {
  const contextLocale =
    getServerContext<LocalesValues>(IntlayerServerContext) ?? fallbackLocale;

  if (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false') {
    const contextVariant = getServerContext<ProviderVariant>(
      IntlayerServerVariantContext
    );

    return getDictionary<T, A>(
      dictionary,
      resolveDictionaryArgument({
        localeOrSelector,
        contextLocale,
        contextVariant,
        dictionaryKey: dictionary.key,
      }) as A
    );
  }

  const localeTarget = (localeOrSelector ?? contextLocale) as A;

  return getDictionary<T, A>(dictionary, localeTarget);
};
