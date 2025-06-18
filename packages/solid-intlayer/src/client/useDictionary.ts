import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { createMemo, useContext } from 'solid-js';
import { useChangedContent } from '../editor/contexts';
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
  const { changedContent } = useChangedContent();

  return createMemo(() => {
    const localeTarget = locale ?? context?.locale?.();

    if (changedContent?.[dictionary.key]) {
      // @ts-ignore fix instantiation is excessively deep and possibly infinite
      return getDictionary(changedContent?.[dictionary.key], localeTarget);
    }

    return getDictionary<T, LocalesValues>(dictionary, localeTarget);
  });
};
