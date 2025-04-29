import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { computed, ref } from 'vue';
import { getDictionary } from '../getDictionary';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
) => {
  const currentLocale = ref<LocalesValues>();
  const localeTarget = computed(() => locale ?? currentLocale.value);

  return getDictionary<T, LocalesValues>(dictionary, localeTarget.value);
};
