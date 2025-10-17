import type { Dictionary, LocalesValues } from '@intlayer/types';
import { createMemo, useContext } from 'solid-js';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
) => {
  const context = useContext(IntlayerClientContext);

  return createMemo(() => {
    const localeTarget = locale ?? context?.locale?.();

    return getDictionary<T, LocalesValues>(dictionary, localeTarget);
  });
};
