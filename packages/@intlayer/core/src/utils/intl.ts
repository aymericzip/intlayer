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

/**
 * Minimal `Intl.ListFormat` surface, declared locally so consumers do not need
 * the `ES2021.Intl` lib in their tsconfig.
 */
type ListFormatInstance = {
  format(list: Iterable<string>): string;
  formatToParts(
    list: Iterable<string>
  ): { type: 'element' | 'literal'; value: string }[];
};

/**
 * Minimal `Intl.Segmenter` surface, declared locally so consumers do not need
 * the `ES2022.Intl` lib in their tsconfig.
 */
type SegmenterInstance = {
  segment(input: string): Iterable<{ segment: string; index: number }>;
};

/**
 * Instance type produced by each `Intl` constructor this module can build.
 */
type IntlInstanceByName = {
  Collator: Intl.Collator;
  DateTimeFormat: Intl.DateTimeFormat;
  DisplayNames: Intl.DisplayNames;
  ListFormat: ListFormatInstance;
  Locale: Intl.Locale;
  NumberFormat: Intl.NumberFormat;
  PluralRules: Intl.PluralRules;
  RelativeTimeFormat: Intl.RelativeTimeFormat;
  Segmenter: SegmenterInstance;
};

/**
 * Names of the `Intl` constructors this module knows how to instantiate.
 */
export type IntlConstructorName = keyof IntlInstanceByName;

const alreadyWarnedConstructors = new Set<string>();

/**
 * Warns once per missing `Intl` constructor, in development only.
 */
const warnMissingIntlConstructor = (constructorName: string): void => {
  if (process.env.NODE_ENV === 'production') return;
  if (alreadyWarnedConstructors.has(constructorName)) return;

  alreadyWarnedConstructors.add(constructorName);

  console.warn(
    `[intlayer] \`Intl.${constructorName}\` is not available in this JavaScript engine. ` +
      `A degraded fallback is used instead. ` +
      `On React Native, load a polyfill (e.g. \`@formatjs/intl-${constructorName.toLowerCase()}/polyfill\`) before rendering your app.`
  );
};

/**
 * Minimal stand-ins used when the engine ships without the matching `Intl`
 * constructor. Hermes — the default React Native engine — omits
 * `DisplayNames`, `ListFormat` and `Segmenter` in release builds unless the
 * app opts into the full ICU build or loads a polyfill. Without these shims,
 * `new Intl.DisplayNames(...)` throws
 * `TypeError: undefined cannot be used as a constructor` and takes the whole
 * app down at render time.
 *
 * Each shim mirrors only the surface Intlayer relies on, and returns the
 * un-localized input so rendering degrades rather than crashing.
 */
const intlConstructorFallbacks: Partial<
  Record<IntlConstructorName, new (locale?: any, options?: any) => any>
> = {
  DisplayNames: class DisplayNamesFallback {
    /** Returns the requested code unchanged, since no CLDR data is available. */
    public of(code: string): string {
      return code;
    }
  },
  ListFormat: class ListFormatFallback {
    /** Joins the list with a comma, the most neutral separator available. */
    public format(list: Iterable<string>): string {
      return Array.from(list).join(', ');
    }

    /** Mirrors `Intl.ListFormat.prototype.formatToParts` shape. */
    public formatToParts(
      list: Iterable<string>
    ): { type: 'element' | 'literal'; value: string }[] {
      return Array.from(list).flatMap((value, index) =>
        index === 0
          ? [{ type: 'element' as const, value }]
          : [
              { type: 'literal' as const, value: ', ' },
              { type: 'element' as const, value },
            ]
      );
    }
  },
  Segmenter: class SegmenterFallback {
    /** Segments by code point, the closest approximation without ICU data. */
    public segment(input: string): { segment: string; index: number }[] {
      let index = 0;

      return Array.from(input).map((segment) => {
        const segmentStart = index;
        index += segment.length;

        return { segment, index: segmentStart };
      });
    }
  },
};

/**
 * Resolves an `Intl` constructor by name at call time, falling back to a
 * degraded shim when the engine does not provide it.
 *
 * Resolution is deliberately lazy: React Native apps install their polyfills
 * at startup, which may run after this module is first imported.
 */
const resolveIntlConstructor = (
  constructorName: IntlConstructorName
): (new (locale?: any, options?: any) => any) | undefined => {
  const nativeConstructor = (
    Intl as unknown as Record<string, new (...args: any[]) => any>
  )[constructorName];

  if (typeof nativeConstructor === 'function') return nativeConstructor;

  warnMissingIntlConstructor(constructorName);

  return intlConstructorFallbacks[constructorName];
};

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
 *
 * Prefer passing the constructor *name* (e.g. `'DisplayNames'`) rather than the
 * constructor itself: the name is resolved lazily against the global `Intl`, so
 * late-installed polyfills are picked up and missing constructors degrade to a
 * fallback instead of throwing.
 */
export function getCachedIntl<Name extends IntlConstructorName>(
  constructorName: Name,
  locale?: LocalesValues | string,
  options?: any
): IntlInstanceByName[Name];
export function getCachedIntl<T extends new (...args: any[]) => any>(
  Ctor: T,
  locale?: LocalesValues | string,
  options?: any
): InstanceType<T>;
export function getCachedIntl(
  intlConstructor: IntlConstructorName | (new (...args: any[]) => any),
  locale?: LocalesValues | string,
  options?: any
): any {
  const resLoc = locale ?? internationalization?.defaultLocale;

  const optKey = options ? JSON.stringify(options) : '';
  const key = `${resLoc}|${optKey}`;

  // Cache per name when available, so two constructors that are both missing
  // from the engine do not collide on a single `undefined` cache bucket.
  const cacheKey = intlConstructor;

  let ctorCache = cache.get(cacheKey);

  if (!ctorCache) {
    ctorCache = new Map();
    cache.set(cacheKey, ctorCache);
  }

  let instance = ctorCache.get(key);

  if (!instance) {
    const ResolvedConstructor =
      typeof intlConstructor === 'string'
        ? resolveIntlConstructor(intlConstructor)
        : intlConstructor;

    if (typeof ResolvedConstructor !== 'function') {
      throw new Error(
        `[intlayer] \`Intl.${String(intlConstructor)}\` is not available in this JavaScript engine and has no fallback. ` +
          `Load the matching polyfill before formatting.`
      );
    }

    if (ctorCache.size > MAX_CACHE_SIZE) ctorCache.clear();
    instance = new ResolvedConstructor(resLoc, options);
    ctorCache.set(key, instance);
  }
  return instance;
}

/**
 * Optional: Keep bindIntl if your library exports it publicly.
 * It now uses the much smaller getCachedIntl under the hood.
 */
export const bindIntl = (boundLocale: LocalesValues): WrappedIntl => {
  const bindWrap = (constructorName: IntlConstructorName) =>
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

      return getCachedIntl(constructorName, resLoc, resOpts);
    };

  return {
    ...Intl,
    Collator: bindWrap('Collator'),
    DateTimeFormat: bindWrap('DateTimeFormat'),
    DisplayNames: bindWrap('DisplayNames'),
    ListFormat: bindWrap('ListFormat'),
    NumberFormat: bindWrap('NumberFormat'),
    PluralRules: bindWrap('PluralRules'),
    RelativeTimeFormat: bindWrap('RelativeTimeFormat'),
    Locale: bindWrap('Locale'),
    Segmenter: bindWrap('Segmenter'),
  } as unknown as WrappedIntl;
};

// Add this to the bottom of utils/intl.ts ONLY if required for public API compatibility.
export const CachedIntl = {
  // function is used as a constructor, do not change in arrow function
  Collator: function Collator(locales?: any, options?: any) {
    return getCachedIntl('Collator', locales, options);
  },
  DateTimeFormat: function DateTimeFormat(locales?: any, options?: any) {
    return getCachedIntl('DateTimeFormat', locales, options);
  },
  DisplayNames: function DisplayNames(locales?: any, options?: any) {
    return getCachedIntl('DisplayNames', locales, options);
  },
  ListFormat: function ListFormat(locales?: any, options?: any) {
    return getCachedIntl('ListFormat', locales, options);
  },
  NumberFormat: function NumberFormat(locales?: any, options?: any) {
    return getCachedIntl('NumberFormat', locales, options);
  },
  PluralRules: function PluralRules(locales?: any, options?: any) {
    return getCachedIntl('PluralRules', locales, options);
  },
  RelativeTimeFormat: function RelativeTimeFormat(
    locales?: any,
    options?: any
  ) {
    return getCachedIntl('RelativeTimeFormat', locales, options);
  },
  Segmenter: function Segmenter(locales?: any, options?: any) {
    return getCachedIntl('Segmenter', locales, options);
  },
} as any; // Cast to 'any' internally to avoid TS readonly errors

export { CachedIntl as Intl };
