import type { LocalesValues } from '@intlayer/config/client';
import type { DeepTransformContent, Dictionary } from '@intlayer/core';
import { computed, inject } from 'vue';
import { getDictionary } from '../getDictionary';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(() => locale ?? intlayer?.locale.value);

  return computed(() =>
    getDictionary<T, LocalesValues>(dictionary, localeTarget.value)
  ) as any;
};
