import type { LocalesValues } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import { computed, inject, reactive, watchEffect } from 'vue';
import { getDictionary } from '../getDictionary';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

/** tiny helper – the node exported by `renderIntlayerNode` now exposes this */
type UpdatableNode = {
  /** replace the node’s internal value & render fn without changing identity */
  __update: (next: unknown) => void;
};

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(() => locale ?? intlayer?.locale?.value);

  /** a *stable* reactive dictionary object */
  const content = reactive({}) as DeepTransformContent<T['content']>;

  /** whenever `key` or `locale` change, refresh the dictionary */
  watchEffect(() => {
    const next = getDictionary<T, LocalesValues>(
      dictionary,
      localeTarget.value
    );

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
