import type { DeclaredLocales, DictionaryKeys, LocalesValues } from '@intlayer/types/module_augmentation';
import { getIntlayer } from '../getIntlayer';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L,
  fallbackLocale?: DeclaredLocales
) => {
  const localeTarget =
    locale ??
    getServerContext<LocalesValues>(IntlayerServerContext) ??
    fallbackLocale;

  return getIntlayer<T, L>(key, localeTarget as L);
};
