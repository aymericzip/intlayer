import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
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
  const T extends Dictionary,
  const L extends LocalesValues = DeclaredLocales,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: L,
  fallbackLocale?: DeclaredLocales
) => {
  const localeTarget =
    locale ??
    getServerContext<LocalesValues>(IntlayerServerContext) ??
    fallbackLocale ??
    resolveInterpreterLocale();

  const dictionary = await (dictionaryPromise as any)[localeTarget]?.();

  return useDictionary<T, L>(dictionary, localeTarget as L);
};
