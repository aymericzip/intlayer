import type { LocalesValues } from '@intlayer/config/client';
import { DictionaryKeys } from '@intlayer/core';
import { computed, ComputedRef, inject } from 'vue';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { getIntlayer } from '../getIntlayer';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): ComputedRef<
  DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']>
> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  return computed(() => getIntlayer(key, locale ?? intlayer?.locale?.value));
};
