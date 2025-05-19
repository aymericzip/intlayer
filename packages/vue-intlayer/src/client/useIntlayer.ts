import type { LocalesValues } from '@intlayer/config/client';
import { DictionaryKeys } from '@intlayer/core';
import { computed, inject, reactive, watchEffect } from 'vue';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import { getIntlayer } from '../getIntlayer';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

/** tiny helper – the node exported by `renderIntlayerNode` now exposes this */
type UpdatableNode = {
  /** replace the node’s internal value & render fn without changing identity */
  __update: (next: unknown) => void;
};

export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  /** which locale should we use right now? */
  const localeTarget = computed(() => locale ?? intlayer.locale.value);

  /** a *stable* reactive dictionary object */
  const content = reactive({}) as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;

  /** whenever `key` or `locale` change, refresh the dictionary */
  watchEffect(() => {
    const next = getIntlayer(key, localeTarget.value);

    // add / update entries
    for (const prop in next) {
      if (prop in content) {
        // keep the existing node reference – just push the new data inside it
        (content[prop] as unknown as UpdatableNode).__update(next[prop]);
      } else {
        // brand-new entry
        content[prop] = next[prop];
      }
    }

    // remove stale entries
    for (const prop in content) {
      if (!(prop in next)) delete content[prop];
    }
  });

  return content; // all consumers keep full reactivity, *even after destructuring*
};
