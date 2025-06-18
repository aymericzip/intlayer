import type { LocalesValues } from '@intlayer/config/client';
import type { DictionaryKeys } from '@intlayer/core';
import { createMemo, useContext } from 'solid-js';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { useChangedContent } from '../editor/contexts';
import { getDictionary } from '../getDictionary';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): (() => DeepTransformContent<
  IntlayerDictionaryTypesConnector[T]['content']
>) => {
  const context = useContext(IntlayerClientContext);
  const { changedContent } = useChangedContent();

  return createMemo(() => {
    const currentLocale = context?.locale();
    const localeTarget = locale ?? currentLocale;

    if (changedContent?.[key]) {
      // @ts-ignore fix instantiation is excessively deep and possibly infinite
      return getDictionary(changedContent?.[key], localeTarget);
    }

    return getIntlayer(key, localeTarget);
  });
};
