import type { LocalesValues } from '@intlayer/config/client';
import { DeepTransformContent, DictionaryKeys } from '@intlayer/core';
import { computed, ref } from 'vue';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { getIntlayer } from '../getIntlayer';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']> => {
  const currentLocale = ref<LocalesValues>();
  const localeTarget = computed(() => locale ?? currentLocale.value);

  return getIntlayer(key, localeTarget.value);
};
