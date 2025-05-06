import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { computed, inject } from 'vue';
import { getDictionary } from '../getDictionary';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  return computed(() =>
    getDictionary<T, LocalesValues>(
      dictionary,
      locale ?? intlayer?.locale.value
    )
  ) as any;
};
