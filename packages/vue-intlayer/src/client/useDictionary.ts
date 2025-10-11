import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import {
  type ComputedRef,
  computed,
  inject,
  isRef,
  ref,
  toValue,
  watch,
} from 'vue';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import {
  atPath,
  isComponentLike,
  isObjectLike,
  toComponent,
} from './useIntlayer';

export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: LocalesValues
): DeepTransformContent<T['content']> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);
  if (!intlayer)
    throw new Error('useIntlayer must be used under <IntlayerProvider>');

  // normalize provider locale
  const providerLocale = isRef(intlayer.locale)
    ? intlayer.locale
    : ref(intlayer.locale as any);

  // which locale to use (reactive)
  const localeTarget = computed<LocalesValues>(() => {
    const explicit = locale !== undefined ? toValue(locale) : undefined;
    return (explicit ?? providerLocale.value)!;
  });

  // single reactive source for the entire content tree
  const source = ref<any>({});

  watch(
    [() => toValue(dictionary) as T, () => localeTarget.value],
    ([_key, locale]) => {
      source.value = getDictionary(dictionary, locale);
    },
    { immediate: true, flush: 'sync' }
  );

  // create a deep, read-only reactive proxy
  const makeProxy = (path: (string | number)[]) => {
    const leafRef: ComputedRef<any> = computed(() =>
      atPath(source.value, path)
    );

    const handler: ProxyHandler<any> = {
      get(_t, prop: any, _r) {
        // Make the proxy "ref-like" so templates unwrap {{proxy}} to its current value.
        if (prop === '__v_isRef') return true;
        if (prop === 'value') return leafRef.value;

        // Avoid Promise-like traps
        if (prop === 'then') return undefined;

        // Coerce the node to a component when asked
        if (prop === 'c' || prop === 'asComponent')
          return toComponent(() => leafRef.value);

        // Handy escape hatch to get the underlying computed
        if (prop === '$raw') return leafRef;

        // Primitive coercion in string contexts (e.g., `${node}`)
        if (prop === Symbol.toPrimitive) {
          return () => leafRef.value as any;
        }

        // Dive into children reactively
        const nextPath = path.concat(prop as any);
        const snapshot = atPath(source.value, nextPath);

        if (isObjectLike(snapshot) && !isComponentLike(snapshot)) {
          return makeProxy(nextPath); // nested proxy
        }
        // Leaf: return a computed ref (templates auto-unwrap)
        return computed(() => atPath(source.value, nextPath));
      },

      // Make Object.keys(), for...in, v-for on object keys work
      ownKeys() {
        const v = leafRef.value;
        return isObjectLike(v) ? Reflect.ownKeys(v) : [];
      },
      getOwnPropertyDescriptor() {
        return { enumerable: true, configurable: true };
      },
    };

    return new Proxy({}, handler);
  };

  return makeProxy([]) as unknown;
};
