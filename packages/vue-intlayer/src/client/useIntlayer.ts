import type { LocalesValues } from '@intlayer/config/client';
import type { DictionaryKeys } from '@intlayer/core';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import {
  computed,
  inject,
  isRef,
  type MaybeRefOrGetter,
  reactive,
  ref,
  type ToRefs,
  toRefs,
  toValue,
  watch,
} from 'vue';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';

export const isUpdatableNode = (
  val: unknown
): val is { __update: (n: unknown) => void } =>
  !!val &&
  typeof val === 'object' &&
  typeof (val as any).__update === 'function';

export const useIntlayer = <T extends DictionaryKeys>(
  key: MaybeRefOrGetter<T>,
  locale?: MaybeRefOrGetter<LocalesValues | null | undefined>
): ToRefs<
  DeepTransformContent<IntlayerDictionaryTypesConnector[T]['content']>
> => {
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

  const content = reactive({}) as DeepTransformContent<
    IntlayerDictionaryTypesConnector[T]['content']
  >;

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
    [() => toValue(key) as T, () => localeTarget.value],
    ([k, l]) => {
      const next = getIntlayer(k, l);
      patch(next as any);
    },
    { immediate: true, flush: 'sync' }
  );

  // Convert to refs to maintain reactivity when destructuring
  return toRefs(content);
};
