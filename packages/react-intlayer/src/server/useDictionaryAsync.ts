import { internationalization } from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionaryAsync = async <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: L,
  fallbackLocale?: DeclaredLocales
) => {
  const localeTarget =
    locale ??
    getServerContext<LocalesValues>(IntlayerServerContext) ??
    fallbackLocale ??
    internationalization.defaultLocale;

  const dictionary = await (dictionaryPromise as any)[localeTarget]?.();

  return useDictionary<T, L>(dictionary, localeTarget as L);
};
