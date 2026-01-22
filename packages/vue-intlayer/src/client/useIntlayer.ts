import configuration from '@intlayer/config/built';
import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import {
  type ComputedRef,
  computed,
  inject,
  isRef,
  type MaybeRefOrGetter,
  ref,
  shallowRef,
  toValue,
  watch,
} from 'vue';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import {
  atPath,
  createIntlayerLeafProxy,
  isComponentLike,
  isIntlayerNode,
  isObjectLike,
  toComponent,
} from './useDictionary';

/**
 * Vue composable that picks one dictionary by its key and returns its reactive content.
 *
 * This hook provides deep reactivity, meaning your components will automatically
 * update when the locale changes.
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param locale - Optional reactive locale or getter to override the current context locale.
 * @returns A reactive proxy to the dictionary content.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIntlayer } from 'vue-intlayer';
 *
 * const content = useIntlayer('my-dictionary-key');
 * </script>
 *
 * <template>
 *   <div>{{ content.myField.value }}</div>
 * </template>
 * ```
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: MaybeRefOrGetter<LocalesValues | null | undefined>
): DeepTransformContent<DictionaryRegistryContent<T>> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  // normalize provider locale
  const providerLocale = isRef(intlayer?.locale)
    ? intlayer.locale
    : ref(intlayer?.locale ?? configuration.internationalization.defaultLocale);

  // which locale to use (reactive)
  const localeTarget = computed<LocalesValues>(() => {
    const explicit = locale !== undefined ? toValue(locale) : undefined;
    return (explicit ?? providerLocale.value)!;
  });

  // single reactive source for the entire content tree
  const source = shallowRef<any>({});

  watch(
    [() => toValue(key) as T, () => localeTarget.value],
    ([k, loc]) => {
      source.value = getIntlayer(k, loc);
    },
    { immediate: true, flush: 'sync' }
  );

  // Cache proxies to avoid redundant creation and potential infinite loops
  const proxyCache = new Map<string, any>();

  // create a deep, read-only reactive proxy
  const makeProxy = (path: (string | number)[]) => {
    const pathKey = path.join('.');
    if (proxyCache.has(pathKey)) return proxyCache.get(pathKey);

    const leafRef: ComputedRef<any> = computed(() =>
      atPath(source.value, path)
    );

    const handler: ProxyHandler<any> = {
      get(_t, prop: any, _r) {
        // Filter out internal Vue/TS properties to prevent infinite loop
        if (
          typeof prop === 'symbol' ||
          (typeof prop === 'string' &&
            (prop.startsWith('__') || prop.startsWith('$')))
        ) {
          if (prop === '__v_isRef') return true;
          if (prop === 'then') return undefined; // Avoid Promise-like traps
          return Reflect.get(_t, prop, _r);
        }

        if (prop === 'value') return leafRef.value ?? '';

        // Coerce the node to a component when asked
        if (prop === 'c' || prop === 'asComponent')
          return toComponent(() => leafRef.value);

        // Handy escape hatch to get the underlying computed
        if (prop === '$raw') return leafRef;

        // Primitive coercion in string contexts (e.g., `${node}`)
        if (prop === Symbol.toPrimitive) {
          return () => String(leafRef.value ?? '');
        }

        // Dive into children reactively
        const nextPath = path.concat(prop as any);
        const snapshot = atPath(source.value, nextPath);

        if (
          snapshot === undefined ||
          (isObjectLike(snapshot) && !isComponentLike(snapshot))
        ) {
          return makeProxy(nextPath); // nested proxy
        }

        // For IntlayerNode leaves, use special proxy for nice .value access
        if (isIntlayerNode(snapshot)) {
          return createIntlayerLeafProxy(
            computed(() => atPath(source.value, nextPath))
          );
        }

        // For other component-like things or primitives, return computed ref
        const subLeafRef = computed(() => atPath(source.value, nextPath));

        return new Proxy(subLeafRef, {
          get(target, subProp, receiver) {
            if (subProp === 'value') {
              return target.value ?? '';
            }
            if (subProp === '__v_isRef') return true;
            return Reflect.get(target, subProp, receiver);
          },
        });
      },

      // Make Object.keys(), for...in, v-for on object keys work
      ownKeys() {
        const v = atPath(source.value, path);
        return isObjectLike(v) ? Reflect.ownKeys(v) : [];
      },
      getOwnPropertyDescriptor() {
        return { enumerable: true, configurable: true };
      },
    };

    const proxy = new Proxy({}, handler);
    proxyCache.set(pathKey, proxy);
    return proxy;
  };

  return makeProxy([]);
};
