import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import { type Accessor, createMemo, useContext } from 'solid-js';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
): Accessor<DeepTransformContent<T['content'], L>> => {
  const context = useContext(IntlayerClientContext);

  return createMemo(() => {
    const localeTarget = locale ?? context?.locale?.();

    return getDictionary<T, L>(dictionary, localeTarget as L);
  });
};
