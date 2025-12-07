import configuration from '@intlayer/config/built';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import {
  type ComputedRef,
  computed,
  defineComponent,
  h,
  inject,
  isRef,
  type MaybeRefOrGetter,
  markRaw,
  ref,
  shallowRef,
  toValue,
  watch,
} from 'vue';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';

export const atPath = (obj: any, path: (string | number)[]) =>
  path.reduce((acc, k) => (acc == null ? undefined : acc[k as any]), obj);

export const isObjectLike = (v: any) => v != null && typeof v === 'object';
export const isComponentLike = (v: any) =>
  typeof v === 'function' ||
  (isObjectLike(v) && ('render' in v || 'setup' in v));

/** Check if value is an IntlayerNode */
export const isIntlayerNode = (v: any): boolean =>
  v != null &&
  typeof v === 'object' &&
  '__update' in v &&
  'render' in v &&
  'raw' in v;

/** Wrap a getter into a lightweight functional component */
export const toComponent = (getter: () => any) =>
  markRaw(
    defineComponent({
      name: 'IntlayerLeaf',
      setup() {
        return () => {
          const v = getter();
          if (v == null) return null;
          if (isComponentLike(v)) return h(v as any);
          // Render primitives/strings/arrays as text/children
          return Array.isArray(v) ? h('span', v as any) : v;
        };
      },
    })
  );

/**
 * Create a proxy for IntlayerNode leaves that:
 * - Is ref-like (__v_isRef) so Vue tracks reactivity and unwraps in templates
 * - .value returns the IntlayerNode (for Vue's component :is="..." and ref unwrapping)
 * - .raw returns the primitive string (for script access)
 * - Passes through other IntlayerNode properties (render, toString, etc.)
 */
export const createIntlayerLeafProxy = (leafRef: ComputedRef<any>) => {
  const handler: ProxyHandler<any> = {
    get(_t, prop: any) {
      const node = leafRef.value;

      // Make this ref-like so Vue auto-unwraps and tracks reactivity
      if (prop === '__v_isRef') return true;

      // .value returns the IntlayerNode for Vue's ref unwrapping (component :is="..." usage)
      if (prop === 'value') {
        return node;
      }

      // $raw returns the underlying computed ref
      if (prop === '$raw') {
        return leafRef;
      }

      // Prevent Vue from making this reactive
      if (prop === '__v_skip') return true;

      // Coerce to component
      if (prop === 'c' || prop === 'asComponent') {
        return toComponent(() => leafRef.value);
      }

      // Pass through to IntlayerNode (including .raw for primitive access)
      if (node == null) return undefined;
      const val = node[prop];
      return typeof val === 'function' ? val.bind(node) : val;
    },

    // Make Object.keys() work
    ownKeys() {
      const node = leafRef.value;
      return node != null && typeof node === 'object'
        ? Reflect.ownKeys(node)
        : [];
    },
    getOwnPropertyDescriptor() {
      return { enumerable: true, configurable: true };
    },
  };

  return new Proxy({}, handler);
};

export const useDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: MaybeRefOrGetter<T>,
  locale?: MaybeRefOrGetter<L>
) => {
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
    [() => toValue(dictionary) as T, () => localeTarget.value],
    ([newDictionary, locale]) => {
      source.value = getDictionary(newDictionary, locale);
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

        // For IntlayerNode leaves, use special proxy for nice .value access
        if (isIntlayerNode(snapshot)) {
          return createIntlayerLeafProxy(
            computed(() => atPath(source.value, nextPath))
          );
        }

        // For other component-like things or primitives, return computed ref
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

  return makeProxy([]) as unknown as DeepTransformContent<T['content'], L>;
};
