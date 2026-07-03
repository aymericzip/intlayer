import type { Locale } from '@intlayer/types/allLocales';
import type { RoutingConfig } from '@intlayer/types/config';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * The locale → domain map configured under `routing.domains`
 * (e.g. `{ en: 'intlayer.org', zh: 'intlayer.cn' }`).
 */
export type LocaleDomainMap = RoutingConfig['domains'];

/**
 * Strips the protocol from a domain string and returns only the hostname.
 *
 * Example:
 *
 * ```ts
 * getDomainHostname('https://intlayer.cn') // 'intlayer.cn'
 * getDomainHostname('intlayer.cn')         // 'intlayer.cn'
 * ```
 *
 * @param domain - A domain value from `routing.domains`, with or without protocol.
 * @returns The bare hostname.
 */
export const getDomainHostname = (domain: string): string => {
  try {
    return /^https?:\/\//.test(domain) ? new URL(domain).hostname : domain;
  } catch {
    return domain;
  }
};

/**
 * Returns the absolute origin for a domain value, prepending `https://`
 * when no protocol is present.
 *
 * Example:
 *
 * ```ts
 * getDomainOrigin('intlayer.cn')        // 'https://intlayer.cn'
 * getDomainOrigin('http://intlayer.cn') // 'http://intlayer.cn'
 * ```
 *
 * @param domain - A domain value from `routing.domains`, with or without protocol.
 * @returns The origin usable as a URL base.
 */
export const getDomainOrigin = (domain: string): string =>
  /^https?:\/\//.test(domain) ? domain : `https://${domain}`;

/**
 * Returns the locale exclusively mapped to a given hostname via `routing.domains`,
 * or `undefined` when zero or more than one locale share that hostname.
 *
 * Example: with `domains = { zh: 'intlayer.cn', en: 'intlayer.org', fr: 'intlayer.org' }`
 *
 * ```ts
 * getLocaleFromDomain('intlayer.cn', domains)  // 'zh'
 * getLocaleFromDomain('intlayer.org', domains) // undefined (en and fr share it)
 * getLocaleFromDomain('example.com', domains)  // undefined (not mapped)
 * ```
 *
 * @param hostname - The bare hostname of the incoming request.
 * @param domains - The configured locale → domain map.
 * @returns The exclusively mapped locale, or `undefined`.
 */
export const getLocaleFromDomain = (
  hostname: string,
  domains: LocaleDomainMap
): Locale | undefined => {
  if (!domains) return undefined;

  const matchingLocales = Object.entries(domains).filter(
    ([, domain]) =>
      typeof domain === 'string' && getDomainHostname(domain) === hostname
  );

  return matchingLocales.length === 1
    ? (matchingLocales[0]?.[0] as Locale)
    : undefined;
};

/**
 * Checks whether a locale is the only locale mapped to its configured domain.
 * When true, the domain alone identifies the locale and no URL prefix is needed.
 * Hostnames are compared after protocol stripping, so
 * `{ en: 'https://intlayer.org', fr: 'intlayer.org' }` counts as a shared domain.
 *
 * @param locale - The locale to check.
 * @param domains - The configured locale → domain map.
 * @returns `true` when the locale has a domain shared with no other locale.
 */
export const isLocaleExclusiveOnDomain = (
  locale: LocalesValues,
  domains: LocaleDomainMap
): boolean => {
  const localeDomain = domains?.[locale];

  if (!localeDomain) return false;

  const localeHostname = getDomainHostname(localeDomain);

  const localesOnSameDomain = Object.values(domains).filter(
    (domain) =>
      typeof domain === 'string' && getDomainHostname(domain) === localeHostname
  ).length;

  return localesOnSameDomain === 1;
};
