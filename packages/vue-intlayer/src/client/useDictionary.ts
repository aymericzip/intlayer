import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { computed, inject } from 'vue';
import { INTLAYER_SYMBOL } from '../constants';
import { getDictionary } from '../getDictionary';
import { IntlayerProvider } from '../types/intlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(() => locale ?? intlayer?.locale.value);

  return computed(() =>
    getDictionary<T, LocalesValues>(dictionary, localeTarget.value)
  );
};
