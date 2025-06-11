import { computed, inject } from '@angular/core';
import type { LocalesValues } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import { getDictionary } from '../getDictionary';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_TOKEN, IntlayerProvider } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  const localeTarget = computed(() => locale ?? intlayer?.locale());

  /** a *stable* reactive dictionary object */
  const content = computed(() =>
    getDictionary<T, LocalesValues>(dictionary, localeTarget())
  );

  return content() as DeepTransformContent<T['content']>; // all consumers keep full reactivity
};
