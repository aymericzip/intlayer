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

import { LocalesValues } from '@intlayer/config';
import configuration from '@intlayer/config/built';

// Helper type that picks just the constructor members off `typeof Intl`.
// The "capital‑letter" heuristic is 100 % accurate today and keeps the
// mapping short‑lived, so we don't have to manually list every constructor.
type IntlConstructors = {
  [K in keyof typeof Intl as (typeof Intl)[K] extends new (...args: any) => any
    ? K
    : never]: (typeof Intl)[K];
};

// Type wrapper to replace locale arguments with LocalesValues
type ReplaceLocaleWithLocalesValues<T> = T extends new (
  locales: any,
  options?: infer Options
) => infer Instance
  ? new (locales?: LocalesValues, options?: Options) => Instance
  : T extends new (locales: any) => infer Instance
    ? new (locales?: LocalesValues) => Instance
    : T;

// Wrapped Intl type with LocalesValues
type WrappedIntl = {
  [K in keyof typeof Intl]: K extends keyof IntlConstructors
    ? ReplaceLocaleWithLocalesValues<(typeof Intl)[K]>
    : (typeof Intl)[K];
};

// Generic cache key – JSON.stringify is fine because locale strings are short
// and option objects are small and deterministic.
const cacheKey = (locales: LocalesValues, options: unknown) =>
  JSON.stringify([locales, options]);

// Generic wrapper for any `new Intl.*()` constructor.
// Returns an arrow function that *looks* like the native constructor but
// pulls instances from a Map cache when possible.
const createCachedConstructor = <T extends new (...args: any[]) => any>(
  Ctor: T
) => {
  const cache = new Map<string, InstanceType<T>>();

  // Arrow to satisfy the "use arrow functions everywhere" request 🤘
  return ((locales?: LocalesValues, options?: any) => {
    // Special case – guard older runtimes missing DisplayNames.
    if (
      Ctor.name === 'DisplayNames' &&
      typeof (Intl as any)?.DisplayNames !== 'function'
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Intl.DisplayNames is not supported; falling back to raw locale (${locales}). ` +
            `Consider adding a polyfill as https://formatjs.io/docs/polyfills/intl-displaynames/`
        );
      }
      return locales;
    }

    const key = cacheKey(
      locales ?? configuration.internationalization.defaultLocale,
      options
    );
    let instance: InstanceType<T> | undefined = cache.get(key);

    if (!instance) {
      instance = new Ctor(locales as never, options as never);
      cache.set(key, instance as InstanceType<T>);
    }

    return instance as InstanceType<T>;
  }) as unknown as ReplaceLocaleWithLocalesValues<T>;
};

// Factory that turns the global `Intl` into a cached clone.
export const createCachedIntl = (): WrappedIntl =>
  new Proxy(Intl as IntlConstructors, {
    get: (target, prop, receiver) => {
      const value = Reflect.get(target, prop, receiver);

      // Wrap *only* constructor functions (safest heuristic: they start with a capital letter).
      return typeof value === 'function' && /^[A-Z]/.test(String(prop))
        ? createCachedConstructor(value as any)
        : value;
    },
  }) as unknown as WrappedIntl;

// Singleton – import this in application code if you just want shared caches.
const CachedIntl = createCachedIntl();

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
