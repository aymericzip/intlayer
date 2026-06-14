import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getIntlayer } from '../getIntlayer';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, `{ id, ...meta }`, optionally with `locale`).
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  fallbackLocale?: DeclaredLocales
) => {
  const contextLocale =
    getServerContext<LocalesValues>(IntlayerServerContext) ?? fallbackLocale;

  if (typeof localeOrSelector === 'object' && localeOrSelector !== null) {
    return getIntlayer(key, {
      ...localeOrSelector,
      locale: localeOrSelector.locale ?? contextLocale,
    } as A);
  }

  const localeTarget = (localeOrSelector ?? contextLocale) as A;

  return getIntlayer<T, A>(key, localeTarget);
};
