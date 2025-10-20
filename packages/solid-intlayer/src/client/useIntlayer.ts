import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import { createMemo, useContext } from 'solid-js';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
): (() => DeepTransformContent<DictionaryRegistryContent<T>>) => {
  const context = useContext(IntlayerClientContext);

  // @ts-ignore Type instantiation is excessively deep and possibly infinite
  return createMemo(() => {
    const currentLocale = context?.locale();
    const localeTarget = locale ?? currentLocale;

    return getIntlayer<T, L>(key, localeTarget as L);
  });
};
