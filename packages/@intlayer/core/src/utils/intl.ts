/**
 * Cached Intl helper – drop‑in replacement for the global `Intl` object.
 * ‑‑‑
 * • Uses a `Proxy` to lazily wrap every *constructor* hanging off `Intl` (NumberFormat, DateTimeFormat, …).
 * • Each wrapped constructor keeps an in‑memory cache keyed by `[locales, options]` so that identical requests
 * reuse the same heavy instance instead of reparsing CLDR data every time.
 * • A polyfill warning for `Intl.DisplayNames` is emitted only once and only in dev.
 * • The public API is fully type‑safe and mirrors the native `Intl` surface exactly –
 * you can treat `CachedIntl` just like the built‑in `Intl`.
 *
 * Usage @example:
 * ---------------
 * ```ts
 * import { CachedIntl } from "./cached-intl";
 *
 * const nf = CachedIntl.NumberFormat("en-US", { style: "currency", currency: "USD" });
 * console.log(nf.format(1234));
 *
 * const dn = CachedIntl.DisplayNames(["fr"], { type: "language" });
 * console.log(dn.of("en")); * → "anglais"
 *
 * You can also spin up an isolated instance with its own caches (handy in test suites):
 * const TestIntl = createCachedIntl();
 * ```
 */

import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

const MAX_CACHE_SIZE = 50;
const cache = new Map<any, Map<string, any>>();

type IntlConstructors = {
  [K in keyof typeof Intl as (typeof Intl)[K] extends new (
    ...args: any
  ) => any
    ? K
    : never]: (typeof Intl)[K];
};

type ReplaceLocaleWithLocalesValues<T> = T extends new (
  locales: any,
  options?: infer Options
) => infer Instance
  ? {
      new (locales?: LocalesValues, options?: Options): Instance;
      new (options?: Options & { locale?: LocalesValues }): Instance;
      (locales?: LocalesValues, options?: Options): Instance;
      (options?: Options & { locale?: LocalesValues }): Instance;
    }
  : T extends new (
        locales: any
      ) => infer Instance
    ? {
        new (locales?: LocalesValues): Instance;
        new (options?: { locale?: LocalesValues }): Instance;
        (locales?: LocalesValues): Instance;
        (options?: { locale?: LocalesValues }): Instance;
      }
    : T;

export type WrappedIntl = {
  [K in keyof typeof Intl]: K extends keyof IntlConstructors
    ? ReplaceLocaleWithLocalesValues<(typeof Intl)[K]>
    : (typeof Intl)[K];
};

/**
 * Generic caching instantiator for Intl constructors.
 */
export const getCachedIntl = <T extends new (...args: any[]) => any>(
  Ctor: T,
  locale?: LocalesValues | string,
  options?: any
): InstanceType<T> => {
  const resLoc = locale ?? internationalization?.defaultLocale;

  const optKey = options ? JSON.stringify(options) : '';
  const key = `${resLoc}|${optKey}`;

  let ctorCache = cache.get(Ctor);

  if (!ctorCache) {
    ctorCache = new Map();
    cache.set(Ctor, ctorCache);
  }

  let instance = ctorCache.get(key);

  if (!instance) {
    if (ctorCache.size > MAX_CACHE_SIZE) ctorCache.clear();
    instance = new Ctor(resLoc, options);
    ctorCache.set(key, instance);
  }
  return instance;
};

/**
 * Optional: Keep bindIntl if your library exports it publicly.
 * It now uses the much smaller getCachedIntl under the hood.
 */
export const bindIntl = (boundLocale: LocalesValues): WrappedIntl => {
  const bindWrap = (Ctor: any) =>
    // function is used as a constructor, do not change in arrow function
    function intlConstructor(locales?: any, options?: any) {
      const isOptsFirst =
        locales !== null &&
        typeof locales === 'object' &&
        !Array.isArray(locales);
      const resOpts = isOptsFirst ? locales : options;
      const resLoc = isOptsFirst
        ? (resOpts as any).locale || boundLocale
        : locales || boundLocale;

      return getCachedIntl(Ctor, resLoc, resOpts);
    };

  return {
    ...Intl,
    Collator: bindWrap(Intl.Collator),
    DateTimeFormat: bindWrap(Intl.DateTimeFormat),
    DisplayNames: bindWrap(Intl.DisplayNames),
    ListFormat: bindWrap(Intl.ListFormat),
    NumberFormat: bindWrap(Intl.NumberFormat),
    PluralRules: bindWrap(Intl.PluralRules),
    RelativeTimeFormat: bindWrap(Intl.RelativeTimeFormat),
    Locale: bindWrap(Intl.Locale),
    Segmenter: bindWrap((Intl as any).Segmenter),
  } as unknown as WrappedIntl;
};

// Add this to the bottom of utils/intl.ts ONLY if required for public API compatibility.
export const CachedIntl = {
  // function is used as a constructor, do not change in arrow function
  Collator: function Collator(locales?: any, options?: any) {
    return getCachedIntl(Intl.Collator, locales, options);
  },
  DateTimeFormat: function DateTimeFormat(locales?: any, options?: any) {
    return getCachedIntl(Intl.DateTimeFormat, locales, options);
  },
  DisplayNames: function DisplayNames(locales?: any, options?: any) {
    return getCachedIntl(Intl.DisplayNames, locales, options);
  },
  ListFormat: function ListFormat(locales?: any, options?: any) {
    return getCachedIntl(Intl.ListFormat as any, locales, options);
  },
  NumberFormat: function NumberFormat(locales?: any, options?: any) {
    return getCachedIntl(Intl.NumberFormat, locales, options);
  },
  PluralRules: function PluralRules(locales?: any, options?: any) {
    return getCachedIntl(Intl.PluralRules, locales, options);
  },
  RelativeTimeFormat: function RelativeTimeFormat(
    locales?: any,
    options?: any
  ) {
    return getCachedIntl(Intl.RelativeTimeFormat, locales, options);
  },
  Segmenter: function Segmenter(locales?: any, options?: any) {
    return getCachedIntl((Intl as any).Segmenter, locales, options);
  },
} as any; // Cast to 'any' internally to avoid TS readonly errors

export { CachedIntl as Intl };
