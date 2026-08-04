import type {
  __DeclaredLocalesRegistry,
  __DictionaryRegistry,
  __EditorRegistry,
  __RequiredLocalesRegistry,
  __RoutingRegistry,
  __SchemaRegistry,
  __StrictModeRegistry,
} from 'intlayer';
import type { Locale } from './allLocales';
import type { StrictMode } from './config';
import type {
  Dictionary,
  DictionarySelector,
  DictionarySelectorForGroup,
  DictionaryVariantIdsOf,
  ProviderVariant as ProviderVariantBase,
  ResolveQualifiedDictionaryContent,
} from './dictionary';

export type SchemaKeys = keyof __SchemaRegistry extends never
  ? string
  : keyof __SchemaRegistry;

export type Schema<T extends SchemaKeys> = [string] extends [T]
  ? any
  : T extends keyof __SchemaRegistry
    ? __SchemaRegistry[T]
    : any;

export type DictionaryKeys = keyof __DictionaryRegistry extends never
  ? string
  : keyof __DictionaryRegistry;

// Dictionaries
export type DictionaryRegistry =
  __DictionaryRegistry[keyof __DictionaryRegistry] extends never
    ? Record<string, Dictionary>
    : __DictionaryRegistry;

export type DictionaryRegistryElement<T extends DictionaryKeys> = [
  string,
] extends [T]
  ? Dictionary
  : T extends keyof __DictionaryRegistry
    ? __DictionaryRegistry[T] extends Dictionary
      ? __DictionaryRegistry[T]
      : Dictionary
    : Dictionary;

export type DictionaryRegistryContent<T extends PropertyKey> = [T] extends [
  keyof __DictionaryRegistry,
]
  ? __DictionaryRegistry[T] extends { content: infer C }
    ? C
    : Dictionary['content']
  : Dictionary['content'];

/**
 * Computes the content type returned by `getIntlayer` / `useIntlayer` for the
 * dictionary key `T` given the second argument `Arg` (a locale string or a
 * `DictionarySelector`).
 *
 * For plain dictionaries this is the registry content; for qualified groups
 * (collections, variants) the selector shape drives the result
 * (single entry, array of entries, or null).
 */
export type DictionaryRegistryResult<T extends PropertyKey, Arg = undefined> = [
  T,
] extends [keyof __DictionaryRegistry]
  ? ResolveQualifiedDictionaryContent<__DictionaryRegistry[T], Arg>
  : Dictionary['content'];

/**
 * Extracts the effective locale from the second argument of
 * `getIntlayer` / `useIntlayer` (locale string or selector object).
 */
export type ExtractSelectorLocale<Arg> = Arg extends {
  locale: infer L extends LocalesValues;
}
  ? L
  : Arg extends LocalesValues
    ? Arg
    : DeclaredLocales;

/**
 * Every named variant declared anywhere in the project — the vocabulary of
 * variant names collected across the whole dictionary registry. `never` when the
 * project declares no variant at all.
 *
 * This is the domain a `variant` selector is checked against, rather than the
 * names of the single key being read: a key that declares no entry for the
 * selected variant falls back to its `default` entry at runtime, so one
 * session-wide variant can legitimately be passed to every key. Checking against
 * the project vocabulary keeps that legal while still catching a name that no
 * dictionary declares.
 *
 * Kept as a plain alias (the `never` fallback lives at the use site) so
 * TypeScript prints this name in error messages instead of expanding the
 * registry inline.
 */
export type DeclaredVariants = DictionaryVariantIdsOf<
  __DictionaryRegistry[keyof __DictionaryRegistry]
>;

/**
 * The selector accepted for a dictionary **key** `T`: its `variant` / `item` /
 * `id` are constrained to the coordinates that exist for that key, so an unknown
 * value is a compile-time error. Plain keys fall back to {@link DictionarySelector}.
 */
export type DictionarySelectorForKey<T extends PropertyKey> = [T] extends [
  keyof __DictionaryRegistry,
]
  ? DictionarySelectorForGroup<__DictionaryRegistry[T]>
  : DictionarySelector;

/**
 * The `variant` prop of a framework provider (`<IntlayerProvider variant>`),
 * narrowed to this project's declared dictionary keys — so the per-key map form
 * rejects a key no dictionary declares.
 *
 * That narrowing is also what keeps the per-key map safely distinguishable from
 * a structured variant value: on a provider a plain object is always read as
 * the map, and `variant={{ id: 'prod_abc' }}` is a compile error unless `id`
 * happens to be a dictionary key. Pin a structured variant globally by nesting
 * it under an entry instead: `variant={{ default: { id: 'prod_abc' } }}`.
 */
export type ProviderVariant = ProviderVariantBase<DictionaryKeys & string>;

export type { DictionarySelector, DictionarySelectorForGroup };

// Derived unions from registries

type NarrowStringKeys<T> = string extends keyof T
  ? never
  : Extract<keyof T, string>;

export type DeclaredLocales = [
  NarrowStringKeys<__DeclaredLocalesRegistry>,
] extends [never]
  ? Locale
  : NarrowStringKeys<__DeclaredLocalesRegistry>;

export type RequiredLocales = [
  NarrowStringKeys<__RequiredLocalesRegistry>,
] extends [never]
  ? never
  : NarrowStringKeys<__RequiredLocalesRegistry>;

/** Define MyType using the ValueOf utility type on Locales */
export type LocalesValues = DeclaredLocales | (string & {});

// Strict mode selection from registry (default 'loose')
type ResolvedStrictMode = __StrictModeRegistry extends { mode: infer M }
  ? M
  : 'inclusive';

// Config shape (type alias; interfaces can’t extend conditional types)
export type StrictModeLocaleMap<
  Content = unknown,
  Mode extends StrictMode = ResolvedStrictMode,
> = RequiredLocales extends never
  ? Partial<Record<Locale, Content>>
  : Mode extends 'strict'
    ? Required<Record<RequiredLocales, Content>> &
        Partial<Record<DeclaredLocales, Content>>
    : Mode extends 'inclusive'
      ? Required<Record<RequiredLocales, Content>> &
          Partial<Record<Locale, Content>>
      : Partial<Record<Locale, Content>>; // Fallback, all locales are optional

// Editor registry
export type ResolvedEditor<Node, Editor> = __EditorRegistry extends {
  enabled: true;
}
  ? Editor
  : Node;

// ── Routing registry ──────────────────────────────────────────────────────────

type RoutingMode =
  | 'prefix-no-default'
  | 'prefix-all'
  | 'no-prefix'
  | 'search-params';

/** The routing mode resolved from the generated registry (falls back to 'prefix-no-default'). */
export type ResolvedRoutingMode = __RoutingRegistry extends {
  mode: infer M extends RoutingMode;
}
  ? M
  : 'prefix-no-default';

/** The default locale resolved from the generated registry (falls back to the full LocalesValues union). */
export type ResolvedDefaultLocale = __RoutingRegistry extends {
  defaultLocale: infer D extends LocalesValues;
}
  ? D
  : LocalesValues;

// ── Template-literal URL types ────────────────────────────────────────────────

/** Computes the locale path segment (e.g. `'fr/'`) for a given locale and routing mode. */
type LocalePrefixSegment<
  L extends string,
  Mode extends string,
  Default extends string,
> = Mode extends 'prefix-all'
  ? `${L}/`
  : Mode extends 'prefix-no-default'
    ? L extends Default
      ? ''
      : `${L}/`
    : ''; // no-prefix / search-params → no path prefix

/** Prepends a locale path prefix to a URL path (e.g. `'/about'` + `'fr/'` → `'/fr/about'`). */
type WithLocalePrefix<
  Path extends string,
  Prefix extends string,
> = Prefix extends ''
  ? Path
  : Path extends `/${infer Rest}`
    ? `/${Prefix}${Rest}`
    : Path;

/**
 * Computes the localized URL string type for a given path, locale, routing mode and default locale.
 * Mirrors the runtime behaviour: the existing locale segment is stripped from `Path` first, then
 * the new locale prefix is prepended (identical to what `getLocalizedUrl` does internally).
 *
 * @example
 * // prefix-no-default, defaultLocale='en'
 * type A = LocalizedUrl<'/about', 'fr'>;      // '/fr/about'
 * type B = LocalizedUrl<'/about', 'en'>;      // '/about'
 * type C = LocalizedUrl<'/fr/about', 'en'>;   // '/about'  (existing prefix stripped)
 * type D = LocalizedUrl<'/fr/about', 'fr'>;   // '/fr/about'
 *
 * // prefix-all
 * type E = LocalizedUrl<'/about', 'en', 'prefix-all', 'en'>;  // '/en/about'
 */
export type LocalizedUrl<
  Path extends string,
  L extends LocalesValues,
  Mode extends string = ResolvedRoutingMode,
  Default extends LocalesValues = ResolvedDefaultLocale,
  Locales extends string = DeclaredLocales & string,
> = [string] extends [Mode]
  ? string // mode is wide → can't narrow
  : Mode extends 'no-prefix'
    ? PathWithoutLocale<Path, Locales>
    : Mode extends 'search-params'
      ? string // search params too dynamic to type precisely
      : WithLocalePrefix<
          PathWithoutLocale<Path, Locales>,
          LocalePrefixSegment<L, Mode, Default>
        >;

/**
 * Extracts the language subtag from a locale string.
 *
 * @example
 * type A = GetLocaleLang<'en-GB'>; // 'en'
 * type B = GetLocaleLang<'fr'>;    // 'fr'
 */
export type GetLocaleLang<L extends string> =
  L extends `${infer Lang}-${string}` ? Lang : L;

/**
 * Removes the locale path segment from a URL (relative or absolute).
 *
 * @example
 * // relative
 * type A = PathWithoutLocale<'/fr/about', 'fr' | 'en'>; // '/about'
 * type B = PathWithoutLocale<'/about', 'fr' | 'en'>;    // '/about'
 * type C = PathWithoutLocale<'/fr', 'fr' | 'en'>;       // '/'
 * // absolute
 * type D = PathWithoutLocale<'https://example.com/fr/about', 'fr' | 'en'>;     // 'https://example.com/about'
 * type E = PathWithoutLocale<'https://sub.example.com/fr/about', 'fr' | 'en'>; // 'https://sub.example.com/about'
 * type F = PathWithoutLocale<'https://example.com/fr', 'fr' | 'en'>;           // 'https://example.com/'
 */
export type PathWithoutLocale<Path extends string, Locales extends string> =
  // Absolute URL: protocol://domain/locale/rest
  Path extends `${infer Protocol}://${infer Domain}/${infer Seg}/${infer Rest}`
    ? Seg extends Locales
      ? `${Protocol}://${Domain}/${Rest}`
      : Path
    : // Absolute URL: protocol://domain/locale  (no sub-path)
      Path extends `${infer Protocol}://${infer Domain}/${infer Seg}`
      ? Seg extends Locales
        ? `${Protocol}://${Domain}/`
        : Path
      : // Relative: /locale/rest
        Path extends `/${infer Seg}/${infer Rest}`
        ? Seg extends Locales
          ? `/${Rest}`
          : Path
        : // Relative: /locale  (bare)
          Path extends `/${infer Seg}`
          ? Seg extends Locales
            ? '/'
            : Path
          : Path;
