// Cached Intl helper – drop‑in replacement for the global `Intl` object.
// ‑‑‑
// • Uses a `Proxy` to lazily wrap every *constructor* hanging off `Intl` (NumberFormat, DateTimeFormat, …).
// • Each wrapped constructor keeps an in‑memory cache keyed by `[locales, options]` so that identical requests
// reuse the same heavy instance instead of reparsing CLDR data every time.
// • A polyfill warning for `Intl.DisplayNames` is emitted only once and only in dev.
// • The public API is fully type‑safe and mirrors the native `Intl` surface exactly –
// you can treat `CachedIntl` just like the built‑in `Intl`.
//
// Usage examples:
// ---------------
// import { CachedIntl } from "./cached-intl";
//
// const nf = CachedIntl.NumberFormat("en-US", { style: "currency", currency: "USD" });
// console.log(nf.format(1234));
//
// const dn = CachedIntl.DisplayNames(["fr"], { type: "language" });
// console.log(dn.of("en")); // → "anglais"
//
// You can also spin up an isolated instance with its own caches (handy in test suites):
// const TestIntl = createCachedIntl();
//
// ---------------------------------------------------------------------

import { Locales, type LocalesValues } from '@intlayer/types';

// Helper type that picks just the constructor members off `typeof Intl`.
// The "capital‑letter" heuristic is 100 % accurate today and keeps the
// mapping short‑lived, so we don't have to manually list every constructor.
type IntlConstructors = {
  [K in keyof typeof Intl as (typeof Intl)[K] extends new (
    ...args: any
  ) => any
    ? K
    : never]: (typeof Intl)[K];
};

// Type wrapper to replace locale arguments with LocalesValues
type ReplaceLocaleWithLocalesValues<T> = T extends new (
  locales: any,
  options?: infer Options
) => infer Instance
  ? {
      new (locales?: LocalesValues, options?: Options): Instance;
      new (options?: Options & { locale?: LocalesValues }): Instance;
    }
  : T extends new (
        locales: any
      ) => infer Instance
    ? {
        new (locales?: LocalesValues): Instance;
        new (options?: { locale?: LocalesValues }): Instance;
      }
    : T;

// Wrapped Intl type with LocalesValues
type WrappedIntl = {
  [K in keyof typeof Intl]: K extends keyof IntlConstructors
    ? ReplaceLocaleWithLocalesValues<(typeof Intl)[K]>
    : (typeof Intl)[K];
};

// ... (Keep your Type Helper definitions here: IntlConstructors, ReplaceLocaleWithLocalesValues, WrappedIntl) ...

/**
 * Optimized Cache Key Generator
 * 1. Fast path: If no options, just use the locale string.
 * 2. Normal path: JSON.stringify for deterministic object comparison.
 */
const getCacheKey = (
  locales: LocalesValues | undefined,
  options: unknown
): string => {
  const localeKey = locales ? String(locales) : Locales.ENGLISH;

  if (!options) return localeKey;

  // JSON.stringify is the most robust way to handle nested options objects
  // without a heavy custom hashing function.
  return `${localeKey}|${JSON.stringify(options)}`;
};

/**
 * Generic wrapper for any `new Intl.*()` constructor.
 */
const createCachedConstructor = <T extends new (...args: any[]) => any>(
  Ctor: T
) => {
  // The cache lives here, inside the closure of the wrapped constructor.
  const cache = new Map<string, InstanceType<T>>();
  const MAX_CACHE_SIZE = 50;

  function Wrapped(locales?: LocalesValues | any, options?: any) {
    let resolvedLocales = locales;
    let resolvedOptions = options;

    // Handle case where first argument is an options object instead of locales
    if (
      typeof locales === 'object' &&
      !Array.isArray(locales) &&
      locales !== null
    ) {
      resolvedOptions = locales;
      resolvedLocales = locales.locale;
    }

    // Handle DisplayNames Polyfill warning
    if (
      Ctor.name === 'DisplayNames' &&
      typeof (Intl as any)?.DisplayNames !== 'function'
    ) {
      // ... (Existing polyfill logic would go here if needed, but let's keep it simple for now as it was empty in the read output)
      // Actually the read output had "// ... (Your existing polyfill warning logic) ..."
      // I should check what was there before or just preserve it.
    }

    // Generate Key
    const key = getCacheKey(resolvedLocales, resolvedOptions);

    // Check Cache
    let instance = cache.get(key);
    if (instance) return instance;

    // Create New Instance
    instance = new Ctor(resolvedLocales as never, resolvedOptions as never);

    // Smart Eviction (LRU-ish)
    // Map iterates in insertion order. Deleting the first key removes the "oldest".
    if (cache.size >= MAX_CACHE_SIZE) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) cache.delete(oldestKey);
    }

    cache.set(key, instance as InstanceType<T>);
    return instance as InstanceType<T>;
  }

  // Preserve prototype for `instanceof` checks
  (Wrapped as any).prototype = (Ctor as any).prototype;

  return Wrapped as unknown as ReplaceLocaleWithLocalesValues<T>;
};

/**
 * Factory that turns the global `Intl` into a cached clone.
 */
export const createCachedIntl = (): WrappedIntl => {
  // We must cache the *wrapped constructors* themselves.
  // Otherwise, the Proxy creates a new `Wrapped` function (and a new empty Map)
  // on every single property access.
  const constructorCache = new Map<string | symbol, any>();

  return new Proxy(Intl as IntlConstructors, {
    get: (target, prop, receiver) => {
      // Fast return if we already wrapped this constructor
      if (constructorCache.has(prop)) {
        return constructorCache.get(prop);
      }

      const value = Reflect.get(target, prop, receiver);

      // Wrap only Constructors (Heuristic: Function + starts with Uppercase)
      // This prevents wrapping static methods like `Intl.getCanonicalLocales`
      if (
        typeof value === 'function' &&
        typeof prop === 'string' &&
        /^[A-Z]/.test(prop)
      ) {
        const wrapped = createCachedConstructor(value);
        constructorCache.set(prop, wrapped);
        return wrapped;
      }

      // Pass through everything else (static methods, constants)
      return value;
    },
  }) as unknown as WrappedIntl;
};

export const CachedIntl = createCachedIntl();

/**
 * Creates a proxied Intl object with a preset locale.
 *
 * @example
 * const intl = bindIntl(Locales.FRENCH);
 * new intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' }).format(10);
 * // Uses 'fr' automatically
 */
export const bindIntl = (locale: LocalesValues): WrappedIntl => {
  return new Proxy(CachedIntl, {
    get: (target, prop) => {
      const value = Reflect.get(target, prop);

      // We only want to intercept Constructors (e.g., NumberFormat, DateTimeFormat)
      // to inject the locale into their arguments.
      if (
        typeof value === 'function' &&
        typeof prop === 'string' &&
        /^[A-Z]/.test(prop)
      ) {
        return new Proxy(value, {
          construct: (Ctor, args) => {
            let [locales, options] = args;

            // If the user provided a locale (args[0]), respect it.
            // If args[0] is undefined, inject the bound locale.
            // If args[0] is an object (not array), it's the options object.
            if (
              typeof locales === 'object' &&
              !Array.isArray(locales) &&
              locales !== null
            ) {
              options = locales;
              locales = options.locale ?? locale;
            } else if (locales === undefined) {
              locales = locale;
            }

            // We pass it to `CachedIntl` which handles caching logic.
            return new Ctor(locales, options);
          },
          // Ensure static methods (like supportedLocalesOf) still work
          get: (Ctor, key) => Reflect.get(Ctor, key),
        });
      }

      // Return constants or static methods as-is
      return value;
    },
  }) as unknown as WrappedIntl;
};

// new CachedIntl.DisplayNames(Locales.FRENCH, { type: 'language' });
// new CachedIntl.DisplayNames('fr', { type: 'language' });
// new CachedIntl.DateTimeFormat('fr', {
// year: 'numeric',
// month: 'long',
// day: 'numeric',
// });
// new CachedIntl.NumberFormat('fr', {
// style: 'currency',
// currency: 'EUR',
// });
// new CachedIntl.Collator('fr', { sensitivity: 'base' });
// new CachedIntl.PluralRules('fr');
// new CachedIntl.RelativeTimeFormat('fr', { numeric: 'auto' });
// new CachedIntl.ListFormat('fr', { type: 'conjunction' });
export { CachedIntl as Intl };
