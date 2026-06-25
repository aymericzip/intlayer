import { internationalization } from '@intlayer/config/built';
import type { DictionarySelector } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
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
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: MaybeRefOrGetter<A | null | undefined>
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  ExtractSelectorLocale<A>
> => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);

  // normalize provider locale
  const providerLocale = isRef(intlayer?.locale)
    ? intlayer.locale
    : ref(intlayer?.locale ?? internationalization.defaultLocale);

  // split the (possibly reactive) second argument into selector + locale
  const resolvedArg = computed<{
    selector: DictionarySelector | undefined;
    locale: LocalesValues | undefined;
  }>(() => {
    const value =
      localeOrSelector !== undefined ? toValue(localeOrSelector) : undefined;

    if (
      process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
      typeof value === 'object' &&
      value !== null
    ) {
      const selector = value as DictionarySelector;
      return { selector, locale: selector.locale };
    }

    return { selector: undefined, locale: value as LocalesValues | undefined };
  });

  // which locale to use (reactive)
  const localeTarget = computed<LocalesValues>(
    () => (resolvedArg.value.locale ?? providerLocale.value)!
  );

  // single reactive source for the entire content tree
  const source = shallowRef<any>({});

  watch(
    [
      () => toValue(key) as T,
      () => localeTarget.value,
      () => resolvedArg.value.selector,
    ],
    ([k, loc, selector]) => {
      source.value = selector
        ? getIntlayer(k, { ...selector, locale: loc } as A)
        : getIntlayer(k, loc as A);
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
