import { internationalization, routing } from '@intlayer/config/built';
import {
  DEFAULT_LOCALE,
  LOCALES,
  ROUTING_MODE,
} from '@intlayer/config/defaultValues';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

import type { Locale } from '@intlayer/types/allLocales';
import type { RoutingConfig } from '@intlayer/types/config';
import type {
  DeclaredLocales,
  LocalesValues,
  ResolvedDefaultLocale,
  ResolvedRoutingMode,
} from '@intlayer/types/module_augmentation';
import { isLocaleExclusiveOnDomain } from './domainUtils';

/**
 * Shared routing options used across all URL localization functions.
 */
export type RoutingOptions = {
  locales?: LocalesValues[];
  defaultLocale?: LocalesValues;
  mode?: RoutingConfig['mode'];
  rewrite?: RoutingConfig['rewrite'];
  domains?: RoutingConfig['domains'];
  /**
   * The hostname of the page currently being rendered (e.g. `'intlayer.org'`).
   * When provided, `getLocalizedUrl` returns a relative URL for locales whose
   * configured domain matches `currentDomain`, and an absolute URL only when
   * the target locale lives on a different domain.
   *
   * When omitted the function tries to infer it from:
   *   1. The domain of an absolute input URL.
   *   2. `window.location.hostname` in browser environments.
   * Falls back to always generating absolute URLs when neither is available.
   */
  currentDomain?: string;
};

/**
 * Resolves routing configuration by merging provided options with configuration defaults.
 * Single source of truth for default routing config resolution across all localization functions.
 */
export const resolveRoutingConfig = (
  options: RoutingOptions = {}
): Omit<RoutingOptions, 'defaultLocale' | 'mode' | 'locales'> & {
  defaultLocale: LocalesValues;
  mode: RoutingConfig['mode'];
  locales: LocalesValues[];
} => ({
  defaultLocale: internationalization?.defaultLocale ?? DEFAULT_LOCALE,
  mode: routing?.mode ?? ROUTING_MODE,
  locales: internationalization?.locales ?? LOCALES,
  rewrite: routing?.rewrite,
  domains: routing?.domains,
  ...options,
});

export type GetPrefixOptions = {
  defaultLocale?: LocalesValues;
  mode?: RoutingConfig['mode'];
};

export type GetPrefixResult = {
  /**
   * The locale path segment appended to `/`, with a trailing slash (e.g. `'fr/'`).
   * Empty string when no prefix is needed.
   */
  prefix: string;
  /**
   * The bare locale identifier (e.g. `'fr'`), or `undefined` when no prefix is applied.
   */
  localePrefix: Locale | undefined;
};

/**
 * Narrowed return type for {@link getPrefix} that carries the locale literal through.
 *
 * Distributes over union locales — calling `getPrefix('fr')` in `prefix-no-default`
 * mode with `defaultLocale = 'en'` resolves to `{ prefix: 'fr/'; localePrefix: 'fr' }`.
 *
 * Note: domain-based routing and "locale not in locales" edge cases may return an
 * empty result at runtime regardless of what this type reports.
 */
export type GetPrefixResultNarrowed<
  L extends LocalesValues | undefined,
  Mode extends string = ResolvedRoutingMode,
  Default extends LocalesValues = ResolvedDefaultLocale,
> = L extends string
  ? [string] extends [L] // L is wide (string / LocalesValues) → distribute over declared locales
    ? GetPrefixResultNarrowed<DeclaredLocales, Mode, Default>
    : [string] extends [Mode]
      ? GetPrefixResult // mode is wide → fall back to generic result
      : Mode extends 'prefix-all'
        ? { prefix: `${L}/`; localePrefix: L }
        : Mode extends 'prefix-no-default'
          ? L extends Default
            ? { prefix: ''; localePrefix: undefined }
            : { prefix: `${L}/`; localePrefix: L }
          : { prefix: ''; localePrefix: undefined } // no-prefix / search-params
  : { prefix: ''; localePrefix: undefined }; // locale is undefined

/**
 * Determines the URL prefix for a given locale based on the routing mode configuration.
 *
 * Example:
 *
 * ```ts
 *  // prefix-no-default mode with default locale
 *  getPrefix('en', { defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns { prefix: '', localePrefix: undefined }
 *
 *  // prefix-no-default mode with non-default locale
 *  getPrefix('fr', { defaultLocale: 'en', mode: 'prefix-no-default' })
 *     // Returns { prefix: '/fr', localePrefix: 'fr' }
 *
 *  // prefix-all mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'prefix-all' })
 *     // Returns { prefix: '/en', localePrefix: locale }
 *
 *  // search-params mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'search-params' })
 *     // Returns { prefix: '', localePrefix: undefined }
 *
 *  // no-prefix mode
 *  getPrefix('en', { defaultLocale: 'en', mode: 'no-prefix' })
 *     // Returns { prefix: '', localePrefix: undefined }
 * ```
 *
 * @param locale - The locale to check for prefix. If not provided, uses configured default locale.
 * @param options - Configuration options
 * @param options.defaultLocale - The default locale. Defaults to configured default locale.
 * @param options.mode - URL routing mode for locale handling. Defaults to configured mode.
 * @returns An object containing pathPrefix, prefix, and localePrefix for the given locale.
 */
export const getPrefix = <const L extends LocalesValues | undefined>(
  locale: L,
  options: RoutingOptions = {}
): GetPrefixResultNarrowed<L> => {
  const { defaultLocale, mode, locales, domains } =
    resolveRoutingConfig(options);

  if (
    (process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'prefix-all' &&
      process.env.INTLAYER_ROUTING_MODE !== 'prefix-no-default') ||
    !locale ||
    !locales.includes(locale)
  ) {
    return {
      prefix: '',
      localePrefix: undefined,
    } as GetPrefixResultNarrowed<L>;
  }

  // If this locale is the only one assigned to its domain, no URL prefix is needed
  // (the domain itself identifies the locale). Shared domains use normal prefix logic.
  if (
    process.env.INTLAYER_ROUTING_DOMAINS !== 'false' &&
    isLocaleExclusiveOnDomain(locale as LocalesValues, domains)
  ) {
    return {
      prefix: '',
      localePrefix: undefined,
    } as GetPrefixResultNarrowed<L>;
  }

  // Handle prefix-based modes (prefix-all or prefix-no-default)
  const shouldPrefix =
    mode === 'prefix-all' ||
    (mode === 'prefix-no-default' && defaultLocale !== locale);

  if (shouldPrefix) {
    return {
      prefix: `${locale}/`,
      localePrefix: locale as Locale,
    } as GetPrefixResultNarrowed<L>;
  }

  return {
    prefix: '',
    localePrefix: undefined,
  } as GetPrefixResultNarrowed<L>;
};
