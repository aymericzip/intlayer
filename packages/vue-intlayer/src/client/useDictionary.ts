import type { LocalesValues } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import {
  computed,
  inject,
  isRef,
  reactive,
  ref,
  toRefs,
  toValue,
  watch,
  type ToRefs,
} from 'vue';
import { getDictionary } from '../getDictionary';
import { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, IntlayerProvider } from './installIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): ToRefs<DeepTransformContent<T['content']>> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  if (!intlayer)
    throw new Error('useIntlayer must be used under <IntlayerProvider>');

  // Normalize the provider locale so it’s a Ref either way
  const providerLocale = isRef(intlayer.locale)
    ? intlayer.locale
    : ref(intlayer.locale as any);

  // Decide which locale to use, and make it reactive
  const localeTarget = computed<LocalesValues>(() => {
    const explicit = locale !== undefined ? toValue(locale) : undefined;
    return (explicit ?? providerLocale.value)!;
  });

  // @ts-ignore
  const content = reactive({}) as DeepTransformContent<T['content']>;

  const patch = (next: Record<string, any>) => {
    // add/replace (force new identity)
    for (const key in next) {
      (content as any)[key] = next[key];
    }
    // remove stale
    for (const key in content as any) {
      if (!(key in next)) delete (content as any)[key];
    }
  };

  // Explicitly watch both key & locale. No dependency "branching" issues.
  watch(
    [() => toValue(dictionary) as T, () => localeTarget.value],
    ([k, l]) => {
      const next = getDictionary(k, l);
      patch(next as any);
    },
    { immediate: true, flush: 'sync' }
  );

  // Convert to refs to maintain reactivity when destructuring
  return toRefs(content);
};
