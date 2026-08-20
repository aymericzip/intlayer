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
  defaultLocale: infer D extends DeclaredLocales;
}
  ? D
  : DeclaredLocales;

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

/**
 * Drops a trailing slash, mirroring the normalization `getLocalizedUrl` applies
 * to the path it builds. The bare root keeps its slash.
 *
 * @example
 * type A = WithoutTrailingSlash<'/fr/'>;      // '/fr'
 * type B = WithoutTrailingSlash<'/fr/about'>; // '/fr/about'
 * type C = WithoutTrailingSlash<'/'>;         // '/'
 */
type WithoutTrailingSlash<Path extends string> = Path extends `${infer Head}/`
  ? Head extends ''
    ? '/'
    : Head
  : Path;

/**
 * Prepends a locale path prefix to a URL, leaving the origin of an absolute URL
 * untouched and never emitting a trailing slash.
 *
 * @example
 * type A = WithLocalePrefix<'/about', 'fr/'>;                    // '/fr/about'
 * type B = WithLocalePrefix<'/', 'fr/'>;                         // '/fr'
 * type C = WithLocalePrefix<'https://example.com/', 'fr/'>;      // 'https://example.com/fr'
 */
type WithLocalePrefix<
  Path extends string,
  Prefix extends string,
> = Prefix extends ''
  ? Path
  : Path extends `${infer Protocol}://${infer Host}/${infer Pathname}`
    ? `${Protocol}://${Host}${WithoutTrailingSlash<`/${Prefix}${Pathname}`>}`
    : Path extends `/${infer Rest}`
      ? WithoutTrailingSlash<`/${Prefix}${Rest}`>
      : Path;

/**
 * Computes the localized URL string type for a given path, locale, routing mode and default locale.
 * Mirrors the runtime behaviour: the existing locale segment is stripped from `Path` first, the
 * project's `routing.rewrite` rules are applied to the remaining pathname, then the new locale
 * prefix is prepended (identical to what `getLocalizedUrl` does internally).
 *
 * @example
 * // prefix-no-default, defaultLocale='en'
 * type A = LocalizedUrl<'/about', 'fr'>;      // '/fr/about'
 * type B = LocalizedUrl<'/about', 'en'>;      // '/about'
 * type C = LocalizedUrl<'/fr/about', 'en'>;   // '/about'  (existing prefix stripped)
 * type D = LocalizedUrl<'/fr/about', 'fr'>;   // '/fr/about'
 * type E = LocalizedUrl<'/', 'fr'>;           // '/fr'      (never a trailing slash)
 *
 * // prefix-all
 * type F = LocalizedUrl<'/about', 'en', 'prefix-all', 'en'>;  // '/en/about'
 *
 * // with rewrite: { '/about': { fr: '/a-propos' } }
 * type G = LocalizedUrl<'/about', 'fr'>;      // '/fr/a-propos'
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
    ? LocalizedUrlPath<PathWithoutLocale<Path, Locales>, L>
    : Mode extends 'search-params'
      ? string // search params too dynamic to type precisely
      : WithLocalePrefix<
          LocalizedUrlPath<PathWithoutLocale<Path, Locales>, L>,
          LocalePrefixSegment<L, Mode, Default>
        >;

/**
 * Extracts the pathname of an absolute URL, leaving a relative path untouched.
 * An absolute URL without a path resolves to the root, mirroring what the
 * `URL` parsing of the runtime reports.
 *
 * @example
 * type A = UrlPathname<'https://example.com/about'>; // '/about'
 * type B = UrlPathname<'https://example.com/'>;      // '/'
 * type C = UrlPathname<'https://example.com'>;       // '/'
 * type D = UrlPathname<'/about'>;                    // '/about'
 */
type UrlPathname<Url extends string> =
  Url extends `${string}://${string}/${infer Pathname}`
    ? `/${Pathname}`
    : Url extends `${string}://${string}`
      ? '/'
      : Url;

/**
 * Computes the localized path string type for a given path, locale, routing
 * mode and default locale — the type-level counterpart of `getLocalizedPath`.
 *
 * It mirrors {@link LocalizedUrl}, except that the origin of an absolute input
 * is dropped instead of being kept, exactly as the runtime does.
 *
 * @example
 * // prefix-no-default, defaultLocale='en', rewrite: { '/about': { es: '/acerca-de' } }
 * type A = LocalizedPathname<'/about', 'es'>;                     // '/es/acerca-de'
 * type B = LocalizedPathname<'https://intlayer.org/about', 'es'>; // '/es/acerca-de'
 * type C = LocalizedPathname<'https://intlayer.org', 'en'>;       // '/'
 */
export type LocalizedPathname<
  Path extends string,
  L extends LocalesValues,
  Mode extends string = ResolvedRoutingMode,
  Default extends LocalesValues = ResolvedDefaultLocale,
  Locales extends string = DeclaredLocales & string,
> = LocalizedUrl<UrlPathname<Path>, L, Mode, Default, Locales>;

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

// ── Rewrite rules (URL localization) ──────────────────────────────────────────

/**
 * Shape of the rewrite rules carried by the generated module augmentation: a
 * canonical pattern mapped to its localized counterpart per locale, in the
 * normalized `url` form (route parameters written as `:param`, no locale
 * prefix).
 *
 * @example
 * { '/about': { en: '/about'; fr: '/a-propos' }; '/product/:id': { fr: '/produit/:id' } }
 */
export type RewriteRuleMap = Record<string, Record<string, string>>;

/**
 * The project's rewrite rules resolved from the generated registry. Falls back
 * to an empty map — every path then localizes to itself — when the project
 * declares no `routing.rewrite`, or when the types have not been generated yet.
 */
export type ResolvedRewriteRules = __RoutingRegistry extends {
  rewrite: infer Rules extends RewriteRuleMap;
}
  ? Rules
  : {};

/**
 * Whether a pattern uses a multi-segment or optional parameter (`:param*`,
 * `:param+`, `:param?`). Those match a variable number of segments, so the
 * resolver widens to `string` instead of guessing a shape.
 */
type HasVariadicParam<Pattern extends string> = Pattern extends
  | `${string}*${string}`
  | `${string}+${string}`
  | `${string}?${string}`
  ? true
  : false;

/** The literal portion of a pattern preceding its first route parameter, without the trailing slash. */
type PatternPrefix<Pattern extends string> =
  Pattern extends `${infer Head}:${string}`
    ? Head extends `${infer Trimmed}/`
      ? Trimmed
      : Head
    : Pattern;

/**
 * Captures the route parameter values of `Path` against `Pattern`, mirroring
 * the runtime regex: each `:param` consumes exactly one segment, and every
 * literal segment must match. Resolves to `never` when the path does not match.
 *
 * @example
 * type A = PatternParams<'/product/123', '/product/:id'>; // ['123']
 * type B = PatternParams<'/about', '/product/:id'>;       // never
 */
type PatternParams<
  Path extends string,
  Pattern extends string,
> = Pattern extends `${infer Head}:${infer AfterParam}`
  ? Path extends `${Head}${infer Tail}`
    ? ParamValue<Tail, AfterParam>
    : never
  : Path extends Pattern
    ? []
    : never;

/**
 * Consumes one parameter value from `Tail`, then keeps matching the remainder of
 * the pattern (`AfterParam`, which starts at the parameter name).
 */
type ParamValue<
  Tail extends string,
  AfterParam extends string,
> = AfterParam extends `${string}/${infer RestPattern}`
  ? // The parameter is followed by more pattern: it stops at the next slash.
    Tail extends `${infer Value}/${infer RestPath}`
    ? Value extends ''
      ? never
      : PatternParams<RestPath, RestPattern> extends infer Params
        ? [Params] extends [never]
          ? never
          : [Value, ...Extract<Params, string[]>]
        : never
    : never
  : // The parameter closes the pattern: it must consume exactly one segment.
    Tail extends '' | `${string}/${string}`
    ? never
    : [Tail];

/**
 * Substitutes captured parameter values into a localized pattern, left to right.
 *
 * @example
 * type A = FillPattern<'/produit/:id', ['123']>; // '/produit/123'
 */
type FillPattern<
  Pattern extends string,
  Params extends readonly string[],
> = Pattern extends `${infer Head}:${infer AfterParam}`
  ? Params extends readonly [
      infer Value extends string,
      ...infer RestParams extends readonly string[],
    ]
    ? AfterParam extends `${string}/${infer RestPattern}`
      ? `${Head}${Value}/${FillPattern<RestPattern, RestParams>}`
      : `${Head}${Value}`
    : Pattern
  : Pattern;

/** Resolves `Path` against a single rewrite rule, or `never` when the rule does not apply. */
type ResolveRewriteRule<
  Path extends string,
  Canonical extends string,
  Localized,
  L extends string,
> = L extends keyof Localized
  ? Extract<Localized[L], string> extends infer Target extends string
    ? true extends HasVariadicParam<Canonical> | HasVariadicParam<Target>
      ? // Variadic patterns are matched loosely: only paths that could plausibly
        // reach this rule are widened, so a single such rule does not erase the
        // narrowing of every other path.
        Path extends `${PatternPrefix<Canonical>}${string}`
        ? string
        : never
      : PatternParams<Path, Canonical> extends infer Params
        ? [Params] extends [never]
          ? never
          : FillPattern<Target, Extract<Params, string[]>>
        : never
    : never
  : never;

/** Union of the localized paths every declared rule can produce for `Path`. */
type ResolveRewriteRules<
  Path extends string,
  L extends string,
  Rules extends RewriteRuleMap,
> = {
  [Canonical in keyof Rules & string]: ResolveRewriteRule<
    Path,
    Canonical,
    Rules[Canonical],
    L
  >;
}[keyof Rules & string];

/**
 * Computes the localized path of a canonical path for a locale, by applying the
 * project's `routing.rewrite` rules — the type-level counterpart of
 * `getLocalizedPath`. A path no rule matches keeps its exact literal type.
 *
 * Note: when several rules match, the result is the union of their outputs
 * while the runtime picks the first declared one.
 *
 * @example
 * // rewrite: { '/about': { fr: '/a-propos' }, '/product/:id': { fr: '/produit/:id' } }
 * type A = LocalizedPath<'/about', 'fr'>;       // '/a-propos'
 * type B = LocalizedPath<'/product/123', 'fr'>; // '/produit/123'
 * type C = LocalizedPath<'/contact', 'fr'>;     // '/contact' (no rule)
 */
export type LocalizedPath<
  Path extends string,
  L extends LocalesValues = ResolvedDefaultLocale,
  Rules extends RewriteRuleMap = ResolvedRewriteRules,
> = string extends Path
  ? string
  : string extends L
    ? string
    : [keyof Rules] extends [never]
      ? Path
      : ResolveRewriteRules<Path, L & string, Rules> extends infer Localized
        ? [Localized] extends [never]
          ? Path
          : Extract<Localized, string>
        : never;

/**
 * Applies {@link LocalizedPath} to the pathname of a URL, leaving the origin of
 * an absolute URL untouched.
 *
 * @example
 * type A = LocalizedUrlPath<'https://example.com/about', 'fr'>; // 'https://example.com/a-propos'
 */
type LocalizedUrlPath<
  Url extends string,
  L extends LocalesValues,
> = Url extends `${infer Protocol}://${infer Host}/${infer Pathname}`
  ? `${Protocol}://${Host}${LocalizedPath<`/${Pathname}`, L>}`
  : LocalizedPath<Url, L>;
