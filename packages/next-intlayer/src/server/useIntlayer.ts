import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useIntlayer as useIntlayerBase } from 'react-intlayer/server';
import { resolveFallbackLocale } from './ambientLocale';

/**
 * On the server side, hook picking one dictionary by its key and returning the
 * content for the given locale or selector (`{ item }`, `{ variant }`,
 * optionally combined with `locale`).
 *
 * If the locale is not provided, it will use the locale from the server
 * context, falling back to the locale carried by the request.
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): ReturnType<typeof useIntlayerBase<T, A>> =>
  useIntlayerBase<T, A>(
    key,
    localeOrSelector,
    resolveFallbackLocale(localeOrSelector) as DeclaredLocales | undefined
  );
