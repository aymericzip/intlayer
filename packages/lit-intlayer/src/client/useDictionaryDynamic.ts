import { internationalization } from '@intlayer/config/built';
import {
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDynamicContentAsync,
} from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import type { ReactiveControllerHost } from 'lit';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerBinding, type IntlayerLitProxy } from './IntlayerBinding';
import { getIntlayerClient } from './installIntlayer';

/** Simple in-memory cache shared across all calls in the same page. */
const cache = new Map<string, Dictionary>();

const loadDictionary = async <T extends Dictionary>(
  cacheKey: string,
  loader: (() => Promise<T>) | undefined
): Promise<T | undefined> => {
  if (!loader) return undefined;
  if (cache.has(cacheKey)) return cache.get(cacheKey) as T;

  const dictionary = await loader();
  cache.set(cacheKey, dictionary);

  return dictionary;
};

/** Shared recursive proxy — safe placeholder for any nested property access while loading. */
const recursiveProxy: any = new Proxy(
  // Must be a regular function (not arrow) so Lit doesn't crash when it tries
  // `new value(...)` after misidentifying this as a directive constructor.
  () => {},
  {
    get: (_target, prop) => {
      // Return empty string for primitive coercion so Lit renders '' in text
      // and attribute positions during loading.
      if (prop === Symbol.toPrimitive) return () => '';
      if (prop === 'toString') return () => '';
      // Prevent Lit's Promise unwrapping from looping forever.
      if (prop === 'then') return undefined;
      // Lit detects directives via `_$litDirective$`, TemplateResults via
      // `_$litType$`, and other internals via `_$` prefix — return undefined
      // so the proxy is never misidentified as one of those.
      if (typeof prop === 'string' && prop.startsWith('_$')) return undefined;
      // Lit duck-types DOM Nodes by checking `value.nodeType !== undefined`.
      // Return undefined here or it will call insertBefore(proxy, …) and crash.
      if (prop === 'nodeType') return undefined;
      // Returning the proxy itself for Symbol.iterator makes Lit's isIterable()
      // check succeed, causing character-by-character iteration. Return undefined
      // so Lit falls through to _commitText(String(proxy)) → renders ''.
      if (prop === Symbol.iterator) return undefined;
      return recursiveProxy;
    },
    apply: () => recursiveProxy,
    construct: () => ({}),
  }
);

/**
 * Returns the translated content for a lazily-loaded dictionary, wrapped in an
 * {@link IntlayerLitProxy} so the caller can register a Lit `ReactiveController`
 * that keeps the element in sync with both the async bundle load and locale
 * changes.
 *
 * This is the babel-optimized counterpart of `useIntlayer` when
 * `importMode = 'dynamic'` — it accepts the locale-keyed loader map injected
 * by the build plugin, matching the same signature as `react-intlayer` and
 * other framework adapters.
 *
 * While loading, property accesses return safe empty-string placeholders via
 * a recursive proxy. Chain `.observe(this)` so Lit triggers `requestUpdate()`
 * once the bundle is ready and on every subsequent locale change.
 *
 * The `intlayerLitPlugin` Vite plugin automatically appends
 * `.observe(this)` at build / serve time, so manual chaining is usually
 * unnecessary.
 *
 * @param dictionaryPromise - Locale-keyed map of `() => Promise<Dictionary>` loaders.
 * @param key               - The dictionary key (used for cache namespacing).
 * @param locale            - Optional locale override.
 * @returns An {@link IntlayerLitProxy} proxy with an `.observe()` method.
 *
 * @example
 * ```ts
 * // Typically injected by the babel/SWC optimization plugin:
 * import _hash_dyn from '.intlayer/dynamic_dictionaries/app.mjs';
 * private content = useDictionaryDynamic(_hash_dyn, 'app').observe(this);
 * ```
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = LocalesValues,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
): IntlayerLitProxy<DeepTransformContent<T['content']>> => {
  const client = getIntlayerClient();

  const isQualified = isQualifiedDynamicLoaderMap(dictionaryPromise);
  const { locale: explicitLocale, selector } =
    parseDictionarySelector<LocalesValues>(localeOrSelector);

  const getActiveLocale = (): LocalesValues =>
    (explicitLocale ??
      client.locale ??
      internationalization.defaultLocale) as LocalesValues;

  /** Holds the most recently loaded content so the proxy can serve real values. */
  let loadedContent: unknown;

  /**
   * Functions registered by `.observe(host)` calls.
   * Called whenever content finishes loading (initial or locale switch).
   */
  const updateFns = new Set<() => void>();

  const notify = (): void => {
    for (const fn of updateFns) {
      fn();
    }
  };

  const loadForLocale = (currentLocale: LocalesValues): void => {
    if (isQualified) {
      resolveQualifiedDynamicContentAsync({
        loaderMap: dictionaryPromise,
        key: String(key),
        locale: currentLocale,
        selector,
        transform: (dict) => getDictionary(dict, currentLocale),
      }).then((resolved) => {
        loadedContent = resolved;
        notify();
      });
      return;
    }

    const cacheKey = `${String(key)}.${currentLocale}`;
    const loader = (dictionaryPromise as Record<string, () => Promise<T>>)[
      currentLocale
    ];

    loadDictionary<T>(cacheKey, loader).then((dict) => {
      if (!dict) return;

      loadedContent = getDictionary(dict, currentLocale);
      notify();
    });
  };

  // Kick off the initial load
  loadForLocale(getActiveLocale());

  // Subscribe to locale changes
  client.subscribe((newLocale) => {
    loadForLocale((explicitLocale ?? newLocale) as LocalesValues);
  });

  let observeFn: (
    host: ReactiveControllerHost
  ) => IntlayerLitProxy<DeepTransformContent<T['content']>>;

  const proxy = new Proxy({} as any, {
    get(_target, prop) {
      if (prop === 'observe') return observeFn;
      if (prop === Symbol.toPrimitive) return () => undefined;
      if (prop === 'toString') return () => '';
      if (prop === 'then') return undefined;
      // Once content is loaded, delegate to real content so subsequent Lit
      // renders (triggered by any reactive property change) show correct values.
      // A qualified selector can resolve to null (variant/meta miss).
      if (loadedContent != null)
        return (loadedContent as Record<string | symbol, unknown>)[prop];
      return recursiveProxy;
    },
  }) as IntlayerLitProxy<DeepTransformContent<T['content']>>;

  observeFn = (host) => {
    const update = () => host.requestUpdate();
    updateFns.add(update);

    new IntlayerBinding(
      host,
      // onConnect: if content is already cached, trigger an immediate update
      // so the element doesn't stay on the loading placeholder.
      () => {
        if (loadedContent != null) host.requestUpdate();
      },
      // onDisconnect: remove from the update set to prevent memory leaks.
      () => {
        updateFns.delete(update);
      }
    );

    return proxy;
  };

  return proxy;
};
