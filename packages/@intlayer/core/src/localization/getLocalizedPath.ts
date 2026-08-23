import { internationalization } from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type {
  LocalesValues,
  LocalizedPathname,
  ResolvedDefaultLocale,
} from '@intlayer/types/module_augmentation';
import { getPathWithoutLocale } from './getPathWithoutLocale';
import {
  getPrefix,
  type RoutingOptions,
  resolveRoutingConfig,
} from './getPrefix';
import {
  getCanonicalPath,
  getRewriteRules,
  resolveLocalizedPath,
} from './rewriteUtils';

/**
 * Localizes an application path for a locale: resolves the `routing.rewrite`
 * rules, then applies the locale representation of the routing mode — a path
 * prefix, a `locale` search parameter, or nothing at all.
 *
 * Any query string and hash of the input are preserved.
 *
 * This is the relative half of {@link getLocalizedUrl}, which builds on it to
 * add an origin and cross-domain routing. For a relative input both return the
 * same value; this one never returns an absolute URL — the origin of an
 * absolute input is dropped and only its path is localized.
 *
 * Use `resolveLocalizedPath` instead to apply the rewrite rules alone, without
 * any locale representation.
 *
 * @example
 * ```ts
 * // routing: { mode: 'prefix-no-default', rewrite: { '/about': { fr: '/a-propos' } } }
 * getLocalizedPath('/about', 'fr');       // '/fr/a-propos'
 * getLocalizedPath('/about', 'en');       // '/about'  (default locale, no prefix)
 * getLocalizedPath('/', 'fr');            // '/fr'
 * getLocalizedPath('/contact', 'fr');     // '/fr/contact' (no rewrite rule matches)
 * getLocalizedPath('https://intlayer.org/about', 'fr'); // '/fr/a-propos' (origin dropped)
 *
 * // routing: { domains: { zh: 'intlayer.cn' } } — zh is alone on that hostname
 * getLocalizedPath('/about', 'zh');       // '/about'  (the domain identifies the locale)
 *
 * // Manual rules, bypassing the configuration
 * getLocalizedPath('/contact', 'fr', {
 *   rewrite: { '/contact': { fr: '/contactez-nous' } },
 * });
 * // '/fr/contactez-nous'
 * ```
 *
 * @param canonicalPath - The internal application path (e.g. `/about`, `/product/123`).
 *   An absolute URL is accepted; only its path, query and hash are kept.
 * @param locale - The target locale. Defaults to the configured default locale.
 * @param options - Routing overrides (`locales`, `defaultLocale`, `mode`, `rewrite`,
 *   `domains`). Each one defaults to the project configuration. `domains` only
 *   suppresses the prefix of a locale served from its own domain — the origin
 *   itself is never emitted.
 * @returns The localized path for the target locale.
 */
export const getLocalizedPath = <
  const CanonicalPath extends string,
  const CurrentLocale extends LocalesValues = ResolvedDefaultLocale,
>(
  canonicalPath: CanonicalPath,
  locale: CurrentLocale = internationalization?.defaultLocale as CurrentLocale,
  options: RoutingOptions = {}
): LocalizedPathname<CanonicalPath, CurrentLocale> => {
  const { defaultLocale, mode, locales, rewrite, domains } =
    resolveRoutingConfig(options);

  const pathWithoutLocale = getPathWithoutLocale(canonicalPath, locales);
  const rewriteRules = getRewriteRules(rewrite, 'url');

  // Parsed against a dummy origin to split the path from its query and hash.
  // An absolute input parses on its own, and only its path is kept.
  const parsedPath = new URL(pathWithoutLocale, 'http://e.com');

  const translatedPathname = resolveLocalizedPath(
    getCanonicalPath(parsedPath.pathname, undefined, rewriteRules),
    locale as Locale,
    rewriteRules
  ).path;

  if (
    !(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'no-prefix'
    ) &&
    mode === 'no-prefix'
  ) {
    return `${translatedPathname}${parsedPath.search}${parsedPath.hash}` as LocalizedPathname<
      CanonicalPath,
      CurrentLocale
    >;
  }

  if (
    !(
      process.env.INTLAYER_ROUTING_MODE &&
      process.env.INTLAYER_ROUTING_MODE !== 'search-params'
    ) &&
    mode === 'search-params'
  ) {
    const searchParams = new URLSearchParams(parsedPath.search);

    searchParams.set('locale', locale.toString());

    const queryParams = searchParams.toString();

    return `${translatedPathname}${queryParams ? `?${queryParams}` : ''}${parsedPath.hash}` as LocalizedPathname<
      CanonicalPath,
      CurrentLocale
    >;
  }

  const { prefix } = getPrefix(locale, {
    defaultLocale,
    mode,
    locales,
    domains,
  });

  let localizedPath = `/${prefix}${translatedPathname}`.replace(/\/+/g, '/');

  if (localizedPath.length > 1 && localizedPath.endsWith('/')) {
    localizedPath = localizedPath.slice(0, -1);
  }

  return `${localizedPath}${parsedPath.search}${parsedPath.hash}` as LocalizedPathname<
    CanonicalPath,
    CurrentLocale
  >;
};
