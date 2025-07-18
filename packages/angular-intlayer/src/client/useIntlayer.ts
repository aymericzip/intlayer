import { computed, inject } from '@angular/core';
import type { LocalesValues } from '@intlayer/config/client';
import { DictionaryKeys } from '@intlayer/core';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { getIntlayer } from '../getIntlayer';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_TOKEN, IntlayerProvider } from './installIntlayer';

/** guard utility — true only for objects generated by `renderIntlayerNode()` */
export const isUpdatableNode = (
  val: unknown
): val is { __update: (n: unknown) => void } =>
  !!val &&
  typeof val === 'object' &&
  typeof (val as any).__update === 'function';

export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_TOKEN)!;

  /** which locale should we use right now? */
  const localeTarget = computed(() => locale ?? intlayer.locale());

  /** a *stable* reactive dictionary object */
  const content = computed(() => getIntlayer(key, localeTarget()));

  return content() as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >; // all consumers keep full reactivity
};
