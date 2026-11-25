import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  type ComputedRef,
  computed,
  defineComponent,
  h,
  hasInjectionContext,
  inject,
  type MaybeRefOrGetter,
  markRaw,
  type Ref,
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
  (typeof v === 'object' || typeof v === 'function') &&
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
        return node ?? '';
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
      if (node == null) {
        if (prop === Symbol.toPrimitive || prop === 'toString') {
          return () => '';
        }
        return undefined;
      }
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

/**
 * The provider installed by `installIntlayer`, when called where `inject` works
 * (a component setup, or `app.runWithContext`).
 */
export const injectIntlayerProvider = (): IntlayerProvider | undefined =>
  hasInjectionContext()
    ? inject<IntlayerProvider | undefined>(INTLAYER_SYMBOL, undefined)
    : undefined;

/**
 * Creates the deep, read-only proxy every Vue read returns over its content:
 * fields are ref-like (templates unwrap them), IntlayerNode leaves expose
 * `.value`, and a locale switch only replaces `source`. One proxy per path, so
 * repeated accesses share their computed refs.
 *
 * @param source - The single reactive source of the whole content tree.
 */
export const createContentProxy = (source: Ref<unknown>): any => {
  const proxyCache = new Map<string, any>();

  const makeProxy = (path: (string | number)[]): any => {
    const pathKey = path.join('\u0000');
    const cachedProxy = proxyCache.get(pathKey);

    if (cachedProxy) return cachedProxy;

    const leafRef: ComputedRef<any> = computed(() =>
      atPath(source.value, path)
    );

    const handler: ProxyHandler<any> = {
      get(_t, prop: any, _r) {
        // Internal Vue / TS properties (`__v_raw`, `__v_isReactive`, well-known
        // symbols, …) are never content fields. Diving into them would hand
        // back a fresh proxy, which Vue reads as "yes, I am reactive / here is
        // my raw target" and walks forever.
        if (
          typeof prop === 'symbol' ||
          (typeof prop === 'string' &&
            (prop.startsWith('__') || prop.startsWith('$')))
        ) {
          // Ref-like, so templates unwrap {{proxy}} to its current value.
          if (prop === '__v_isRef') return true;

          // Handy escape hatch to get the underlying computed
          if (prop === '$raw') return leafRef;

          // Primitive coercion in string contexts (e.g. `${node}`, and the
          // `String()` fallback of Vue's `toDisplayString`). Object-like
          // content — arrays, nested objects — has to coerce to a string here
          // too, or the conversion throws "Cannot convert object to primitive
          // value".
          if (prop === Symbol.toPrimitive) {
            return () => String(leafRef.value ?? '');
          }

          return Reflect.get(_t, prop, _r);
        }

        if (prop === 'value') return leafRef.value ?? '';

        // Avoid Promise-like traps
        if (prop === 'then') return undefined;

        // Coerce the node to a component when asked
        if (prop === 'c' || prop === 'asComponent')
          return toComponent(() => leafRef.value);

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

        if (typeof snapshot === 'function') {
          const parent = atPath(source.value, path);

          // Native prototype methods reached off array/string content
          // (Array.prototype.map, String.prototype.split, …) are not own
          // properties of the content node and must stay bound to their
          // receiver, or calling them throws "called on null or undefined".
          if (parent != null && !Object.hasOwn(parent, prop)) {
            return snapshot.bind(parent);
          }

          // Own dictionary-authored functions (enumeration/condition/gender/
          // insertion accessors) must stay callable. Forward to whatever
          // function currently lives at this path so locale/content changes
          // stay reactive.
          return (...args: any[]) => atPath(source.value, nextPath)?.(...args);
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
        const value = atPath(source.value, path);
        return isObjectLike(value) ? Reflect.ownKeys(value) : [];
      },
      // Mirrors the content's enumerability, so a collection's `length` is
      // never listed as an item
      getOwnPropertyDescriptor(_t, prop) {
        const value = atPath(source.value, path);
        const descriptor = isObjectLike(value)
          ? Reflect.getOwnPropertyDescriptor(value, prop)
          : undefined;

        return descriptor
          ? { enumerable: descriptor.enumerable, configurable: true }
          : undefined;
      },
    };

    const proxy = new Proxy({}, handler);
    proxyCache.set(pathKey, proxy);

    return proxy;
  };

  return makeProxy([]);
};

/**
 * Runs a read whenever its source, the call argument, the provider locale or
 * the provider variant changes, and returns the content proxy over it — the
 * one implementation behind `useDictionary` and `useIntlayer`.
 */
export const useResolvedContent = <Source>(params: {
  getSource: () => Source;
  getDictionaryKey: (source: Source) => string;
  readContent: (
    source: Source,
    argument: LocalesValues | DictionarySelector | undefined
  ) => unknown;
  localeOrSelector?: MaybeRefOrGetter<
    LocalesValues | DictionarySelector | null | undefined
  >;
}): any => {
  const intlayer = injectIntlayerProvider();

  // single reactive source for the entire content tree
  const source = shallowRef<unknown>({});

  watch(
    () => {
      const currentSource = params.getSource();
      const callArgument = toValue(params.localeOrSelector) ?? undefined;
      const contextLocale = toValue(intlayer?.locale);

      // Layers the provider's locale and ambient variant under the call-site
      // argument. Selectors disabled project-wide (build-time flag) ⇒ the
      // argument can only be a locale.
      const argument =
        process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
          ? resolveDictionaryArgument({
              localeOrSelector: callArgument,
              contextLocale,
              contextVariant: toValue(intlayer?.variant),
              dictionaryKey: params.getDictionaryKey(currentSource),
            })
          : ((callArgument as LocalesValues | undefined) ?? contextLocale);

      return [currentSource, argument] as const;
    },
    ([currentSource, argument]) => {
      source.value = params.readContent(currentSource, argument);
    },
    { immediate: true, flush: 'sync' }
  );

  return createContentProxy(source);
};

/**
 * Vue composable that transforms a dictionary (or qualified dictionary group)
 * and returns its reactive content.
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the provider locale. The same applies to the variant, which falls back
 * to the provider's ambient `variant`.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelectorForGroup<T> =
    DeclaredLocales,
>(
  dictionary: MaybeRefOrGetter<T>,
  localeOrSelector?: MaybeRefOrGetter<A | null | undefined>
) =>
  useResolvedContent({
    getSource: () => toValue(dictionary),
    getDictionaryKey: (currentDictionary) => currentDictionary.key,
    readContent: (currentDictionary, argument) =>
      getDictionary(currentDictionary, argument as A),
    localeOrSelector: localeOrSelector as MaybeRefOrGetter<
      LocalesValues | DictionarySelector | null | undefined
    >,
  }) as DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >;
