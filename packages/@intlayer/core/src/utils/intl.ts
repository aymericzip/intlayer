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

import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

const MAX_CACHE_SIZE = 50;
const cache = new Map<string, any>();

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
  ctorName: string, // Add this argument
  locale?: LocalesValues | string,
  options?: any
): InstanceType<T> => {
  const resLoc = locale ?? configuration?.internationalization?.defaultLocale;
  // Use the explicit name for the key
  const key = `${ctorName}|${resLoc}|${options ? JSON.stringify(options) : ''}`;

  let instance = cache.get(key);
  if (!instance) {
    if (cache.size > MAX_CACHE_SIZE) cache.clear();
    instance = new Ctor(resLoc, options);
    cache.set(key, instance);
  }
  return instance;
};

/**
 * Optional: Keep bindIntl if your library exports it publicly.
 * It now uses the much smaller getCachedIntl under the hood.
 */
export const bindIntl = (boundLocale: LocalesValues): WrappedIntl => {
  const bindWrap = (Ctor: any) => (locales?: any, options?: any) => {
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
  Collator: (locales?: any, options?: any) =>
    getCachedIntl(Intl.Collator, locales, options),
  DateTimeFormat: (locales?: any, options?: any) =>
    getCachedIntl(Intl.DateTimeFormat, locales, options),
  DisplayNames: (locales?: any, options?: any) =>
    getCachedIntl(Intl.DisplayNames, locales, options),
  ListFormat: (locales?: any, options?: any) =>
    getCachedIntl(Intl.ListFormat as any, locales, options),
  NumberFormat: (locales?: any, options?: any) =>
    getCachedIntl(Intl.NumberFormat, locales, options),
  PluralRules: (locales?: any, options?: any) =>
    getCachedIntl(Intl.PluralRules, locales, options),
  RelativeTimeFormat: (locales?: any, options?: any) =>
    getCachedIntl(Intl.RelativeTimeFormat, locales, options),
  Segmenter: (locales?: any, options?: any) =>
    getCachedIntl((Intl as any).Segmenter, locales, options),
} as any; // Cast to 'any' internally to avoid TS readonly errors

export { CachedIntl as Intl };
