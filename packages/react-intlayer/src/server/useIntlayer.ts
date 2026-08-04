import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { getIntlayer } from '../getIntlayer';
import {
  IntlayerServerContext,
  IntlayerServerVariantContext,
} from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`).
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends
    | DeclaredLocales
    | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  fallbackLocale?: DeclaredLocales
) => {
  const contextLocale =
    getServerContext<LocalesValues>(IntlayerServerContext) ?? fallbackLocale;

  if (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false') {
    const contextVariant = getServerContext<ProviderVariant>(
      IntlayerServerVariantContext
    );

    return getIntlayer<T, A>(
      key,
      resolveDictionaryArgument({
        localeOrSelector,
        contextLocale,
        contextVariant,
        dictionaryKey: key as string,
      }) as A
    );
  }

  const localeTarget = (localeOrSelector ?? contextLocale) as A;

  return getIntlayer<T, A>(key, localeTarget);
};
