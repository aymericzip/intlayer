import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useDictionaryAsync as useDictionaryAsyncBase } from 'react-intlayer/server';
import { getFallbackLocale } from './ambientLocale';

/**
 * On the server side, hook that transforms a dictionary and returns the content
 *
 * If the locale is not provided, it will use the locale from the server
 * context, falling back to the locale carried by the request.
 */
export const useDictionaryAsync = async <
  const T extends Dictionary,
  const L extends LocalesValues = DeclaredLocales,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: L
): ReturnType<typeof useDictionaryAsyncBase<T, L>> =>
  useDictionaryAsyncBase<T, L>(
    dictionaryPromise,
    locale,
    (await getFallbackLocale(locale)) as DeclaredLocales | undefined
  );
