import type { LocalesValues } from '@intlayer/config/client';
import { DeepTransformContent, DictionaryKeys } from '@intlayer/core';
import { computed, type ComputedRef, inject } from 'vue';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { INTLAYER_SYMBOL } from '../constants';
import { getIntlayer } from '../getIntlayer';
import { IntlayerProvider } from '../types/intlayer';

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

  const localeTarget = computed(() => locale ?? intlayer?.locale?.value);

  return computed(() => getIntlayer(key, localeTarget.value));
};
