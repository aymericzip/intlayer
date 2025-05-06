import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { computed, inject } from 'vue';
import { getDictionary } from '../getDictionary';
import { DeepTransformContent } from '../plugins';
import { computedProxy } from './computedProxy';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(() => locale ?? intlayer?.locale?.value);

  // one computed that fetches the raw dictionary
  const content = computed(() =>
    getDictionary<T, LocalesValues>(dictionary, localeTarget.value)
  ) as any;

  // wrap it with the proxy so every field is reactive
  return computedProxy(content) as any;
};
