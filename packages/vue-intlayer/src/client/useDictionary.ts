import type { LocalesValues } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import { computed, inject, reactive, watchEffect } from 'vue';
import { getDictionary } from '../getDictionary';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';
import { isUpdatableNode } from './useIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  const localeTarget = computed(() => locale ?? intlayer?.locale?.value);

  /** a *stable* reactive dictionary object */
  // @ts-expect-error - Fix Type instantiation is excessively deep and possibly infinite
  const content = reactive({}) as DeepTransformContent<T['content']>;

  /** whenever `key` or `locale` change, refresh the dictionary */
  watchEffect(() => {
    const next = getDictionary<T, LocalesValues>(
      dictionary,
      localeTarget.value
    );

    for (const prop in next) {
      const current = content[prop] as unknown;
      const incoming = next[prop];

      if (prop in content && isUpdatableNode(current)) {
        /** same entry -> patch in-place */
        current.__update(incoming as any);
      } else {
        /** new entry *or* not an IntlayerNode -> replace wholesale */
        content[prop] = incoming;
      }
    }

    // remove stale entries
    for (const prop in content) {
      if (!(prop in next)) delete content[prop];
    }
  });

  return content; // all consumers keep full reactivity, *even after destructuring*
};
