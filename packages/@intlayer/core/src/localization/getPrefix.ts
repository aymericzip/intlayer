import { internationalization, routing } from '@intlayer/config/built';
import {
  DEFAULT_LOCALE,
  LOCALES,
  ROUTING_MODE,
} from '@intlayer/config/defaultValues';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the build-time routing mode is known and is not a prefix-based
 * mode (neither 'prefix-all' nor 'prefix-no-default').
 */
const TREE_SHAKE_PREFIX_MODES =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-all' &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-no-default';

/**
 * True when no domain routing is configured at build time
 * (INTLAYER_ROUTING_DOMAINS === 'false').
 */
const TREE_SHAKE_DOMAINS = process.env['INTLAYER_ROUTING_DOMAINS'] === 'false';

import type { Locale } from '@intlayer/types/allLocales';
import type { RoutingConfig } from '@intlayer/types/config';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

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
export const resolveRoutingConfig = (options: RoutingOptions = {}) => ({
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
   * The complete base URL path with leading and trailing slashes.
   *
   * @example
   * // https://example.com/fr/about -> '/fr'
   * // https://example.com/about -> ''
   */
  prefix: string;
  /**
   * The locale identifier without slashes.
   *
   * @example
   * // https://example.com/fr/about -> 'fr'
   * // https://example.com/about -> undefined
   */
  localePrefix: Locale | undefined;
};

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
export const getPrefix = (
  locale: LocalesValues | undefined,
  options: RoutingOptions = {}
): GetPrefixResult => {
  const { defaultLocale, mode, locales, domains } =
    resolveRoutingConfig(options);

  if (TREE_SHAKE_PREFIX_MODES || !locale || !locales.includes(locale)) {
    return {
      prefix: '',
      localePrefix: undefined,
    };
  }

  // If this locale is the only one assigned to its domain, no URL prefix is needed
  // (the domain itself identifies the locale). Shared domains use normal prefix logic.
  if (!TREE_SHAKE_DOMAINS && domains) {
    const localeDomain = domains[locale as LocalesValues];

    if (localeDomain) {
      const localesOnSameDomain = Object.values(domains).filter(
        (domain) => domain === localeDomain
      ).length;

      if (localesOnSameDomain === 1) {
        return {
          prefix: '',
          localePrefix: undefined,
        };
      }
    }
  }

  // Handle prefix-based modes (prefix-all or prefix-no-default)
  const shouldPrefix =
    mode === 'prefix-all' ||
    (mode === 'prefix-no-default' && defaultLocale !== locale);

  if (shouldPrefix) {
    return {
      prefix: `${locale}/`,
      localePrefix: locale as Locale,
    };
  }

  return {
    prefix: '',
    localePrefix: undefined,
  };
};
