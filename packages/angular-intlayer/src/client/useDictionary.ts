import { computed, inject, type Signal } from '@angular/core';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_TOKEN, type IntlayerProvider } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): Signal<DeepTransformContent<T['content']>> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN);

  const localeTarget = computed(() => locale ?? intlayer?.locale());

  /** a *stable* reactive dictionary object */
  const content = computed(
    () => getDictionary<T, LocalesValues>(dictionary, localeTarget()) as any
  );

  return content; // all consumers keep full reactivity
};
