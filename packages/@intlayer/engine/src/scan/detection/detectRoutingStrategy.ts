import { findMatchingLocale, looksLikeLocaleCode } from './localeCode';
import {
  getFirstPathSegment,
  normalizeHostname,
  normalizeUrl,
  parseUrl,
} from './url';

/**
 * How a website exposes its locales in URLs. Mirrors Intlayer's
 * `routing.mode` values, plus the domain-based strategies.
 *
 * - `prefix-all`: every locale is prefixed (`/en/about`, `/fr/about`)
 * - `prefix-no-default`: the default locale is not prefixed (`/about`, `/fr/about`)
 * - `search-params`: the locale is a query parameter (`/about?lang=fr`)
 * - `subdomain`: the locale is a subdomain (`fr.example.com`)
 * - `domain`: one domain per locale (`example.fr`, `example.de`)
 * - `no-prefix`: a single URL serves every locale (cookie / header based)
 * - `unknown`: not enough signals to decide
 */
export type RoutingStrategy =
  | 'prefix-all'
  | 'prefix-no-default'
  | 'search-params'
  | 'subdomain'
  | 'domain'
  | 'no-prefix'
  | 'unknown';

/** Result of {@link detectRoutingStrategy}. */
export type RoutingDetection = {
  strategy: RoutingStrategy;
  /**
   * `high` when inferred from the hreflang alternates, `low` when guessed from
   * the scanned URL alone.
   */
  confidence: 'high' | 'low';
  /** Locales known to the site (hreflang values, else the page `lang`). */
  locales: string[];
  /** Locale served without any marker (`prefix-no-default`, `search-params`…). */
  defaultLocale?: string;
  /** Query parameter carrying the locale, for `search-params`. */
  searchParamName?: string;
  /** Hostname → locale map, for `subdomain` / `domain`. */
  hostLocales?: Record<string, string>;
  /** Locale of the scanned page according to its URL alone. */
  urlLocale?: string;
  /** Human-readable explanation of the decision. */
  evidence: string;
};

/** Input of {@link detectRoutingStrategy}. */
export type RoutingDetectionInput = {
  /** Absolute URL of the scanned page. */
  pageUrl: string;
  /** Value of `<html lang>`, when present. */
  htmlLang?: string;
  /** `<link rel="alternate" hreflang>` entries of the page. */
  hreflangs: { hreflang: string; href: string }[];
};

type LocalizedUrl = { locale: string; url: URL };

/** Locale of a URL according to an already-detected routing strategy. */
export const getUrlLocale = (
  url: string,
  routing: RoutingDetection
): string | undefined => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return undefined;

  switch (routing.strategy) {
    case 'prefix-all':
    case 'prefix-no-default':
      return (
        findMatchingLocale(
          getFirstPathSegment(parsedUrl.pathname),
          routing.locales
        ) ??
        (routing.strategy === 'prefix-no-default'
          ? routing.defaultLocale
          : undefined)
      );
    case 'search-params':
      return (
        findMatchingLocale(
          parsedUrl.searchParams.get(routing.searchParamName ?? ''),
          routing.locales
        ) ?? routing.defaultLocale
      );
    case 'subdomain':
    case 'domain':
      return (
        routing.hostLocales?.[normalizeHostname(parsedUrl.hostname)] ??
        findMatchingLocale(parsedUrl.hostname.split('.')[0], routing.locales)
      );
    default:
      return undefined;
  }
};

/** Detect the strategy from at least two hreflang alternates. */
const detectFromAlternates = (
  localizedUrls: LocalizedUrl[],
  locales: string[],
  xDefaultUrl: string | undefined
): Omit<RoutingDetection, 'urlLocale' | 'locales'> => {
  const alternateCount = localizedUrls.length;
  const findDefaultLocale = (unmarked: LocalizedUrl[]): string | undefined =>
    unmarked.length === 1
      ? unmarked[0]?.locale
      : localizedUrls.find(
          ({ url }) =>
            xDefaultUrl && normalizeUrl(url.href) === normalizeUrl(xDefaultUrl)
        )?.locale;

  // One host per locale → subdomain or domain based routing.
  const hostnames = new Set(
    localizedUrls.map(({ url }) => normalizeHostname(url.hostname))
  );
  if (hostnames.size > 1) {
    const hostLocales = Object.fromEntries(
      localizedUrls.map(({ url, locale }) => [
        normalizeHostname(url.hostname),
        locale,
      ])
    );
    const subdomainPrefixed = localizedUrls.filter(
      ({ url, locale }) =>
        findMatchingLocale(url.hostname.split('.')[0], [locale]) !== undefined
    );
    // Most hosts must start with their locale: `www.example.de` is a domain.
    const isSubdomain = subdomainPrefixed.length * 2 >= localizedUrls.length;
    return {
      strategy: isSubdomain ? 'subdomain' : 'domain',
      confidence: 'high',
      hostLocales,
      defaultLocale: isSubdomain
        ? findDefaultLocale(
            localizedUrls.filter((entry) => !subdomainPrefixed.includes(entry))
          )
        : undefined,
      evidence: `hreflang alternates use ${hostnames.size} different hosts`,
    };
  }

  // A query parameter whose value is the locale on (almost) every alternate.
  const parameterMatchCount = new Map<string, number>();
  for (const { url, locale } of localizedUrls) {
    for (const [parameterName, parameterValue] of url.searchParams) {
      if (findMatchingLocale(parameterValue, [locale])) {
        parameterMatchCount.set(
          parameterName,
          (parameterMatchCount.get(parameterName) ?? 0) + 1
        );
      }
    }
  }
  const [searchParamName, searchParamCount] = [
    ...parameterMatchCount.entries(),
  ].sort((first, second) => second[1] - first[1])[0] ?? ['', 0];
  if (searchParamCount >= Math.max(alternateCount - 1, 1)) {
    return {
      strategy: 'search-params',
      confidence: 'high',
      searchParamName,
      defaultLocale: findDefaultLocale(
        localizedUrls.filter(
          ({ url }) => !url.searchParams.has(searchParamName)
        )
      ),
      evidence: `hreflang alternates carry the locale in the "?${searchParamName}=" parameter`,
    };
  }

  // A locale path prefix on every alternate, or on every one but the default.
  const unprefixed = localizedUrls.filter(
    ({ url, locale }) =>
      !findMatchingLocale(getFirstPathSegment(url.pathname), [locale])
  );
  if (unprefixed.length === 0) {
    return {
      strategy: 'prefix-all',
      confidence: 'high',
      defaultLocale: findDefaultLocale([]),
      evidence: 'every hreflang alternate starts with a locale segment',
    };
  }
  if (unprefixed.length === 1) {
    return {
      strategy: 'prefix-no-default',
      confidence: 'high',
      defaultLocale: unprefixed[0]?.locale,
      evidence: `every hreflang alternate but "${unprefixed[0]?.locale}" starts with a locale segment`,
    };
  }

  const distinctUrls = new Set(
    localizedUrls.map(({ url }) => normalizeUrl(url.href))
  );
  if (distinctUrls.size === 1) {
    return {
      strategy: 'no-prefix',
      confidence: 'high',
      evidence: `all ${locales.length} hreflang alternates point to the same URL`,
    };
  }

  return {
    strategy: 'unknown',
    confidence: 'high',
    evidence:
      'hreflang alternates use different URLs without a locale marker (localized slugs?)',
  };
};

/** Guess the strategy from the scanned URL when no alternates are declared. */
const detectFromPageUrl = (
  pageUrl: URL,
  htmlLang: string | undefined
): Omit<RoutingDetection, 'urlLocale' | 'locales'> => {
  const firstSegment = getFirstPathSegment(pageUrl.pathname);
  const pageLocales = htmlLang ? [htmlLang] : [];

  if (
    firstSegment &&
    (findMatchingLocale(firstSegment, pageLocales) ||
      (!htmlLang && looksLikeLocaleCode(firstSegment)))
  ) {
    return {
      strategy: 'prefix-all',
      confidence: 'low',
      evidence: `the page URL starts with the locale segment "/${firstSegment}"`,
    };
  }

  for (const [parameterName, parameterValue] of pageUrl.searchParams) {
    if (findMatchingLocale(parameterValue, pageLocales)) {
      return {
        strategy: 'search-params',
        confidence: 'low',
        searchParamName: parameterName,
        evidence: `the page URL carries the locale in "?${parameterName}="`,
      };
    }
  }

  if (findMatchingLocale(pageUrl.hostname.split('.')[0], pageLocales)) {
    return {
      strategy: 'subdomain',
      confidence: 'low',
      hostLocales: { [normalizeHostname(pageUrl.hostname)]: htmlLang ?? '' },
      evidence: 'the page hostname starts with the locale',
    };
  }

  return {
    strategy: htmlLang ? 'no-prefix' : 'unknown',
    confidence: 'low',
    evidence: htmlLang
      ? 'no hreflang alternates and no locale marker in the page URL'
      : 'no hreflang alternates, no lang attribute and no locale marker in the URL',
  };
};

/**
 * Detect how the site encodes the locale in its URLs (path prefix, query
 * parameter, subdomain, domain or nothing).
 *
 * The hreflang alternates are the most reliable signal: each one pairs a
 * locale with its URL, so the shared pattern reveals the strategy. Without
 * alternates the scanned URL alone is used, with `confidence: 'low'`.
 */
export const detectRoutingStrategy = ({
  pageUrl,
  htmlLang,
  hreflangs,
}: RoutingDetectionInput): RoutingDetection => {
  const parsedPageUrl = parseUrl(pageUrl);

  const localizedUrls: LocalizedUrl[] = [];
  for (const { hreflang, href } of hreflangs) {
    if (hreflang.toLowerCase() === 'x-default') continue;
    const url = parseUrl(href, pageUrl);
    if (url) localizedUrls.push({ locale: hreflang, url });
  }
  const xDefaultHref = hreflangs.find(
    ({ hreflang }) => hreflang.toLowerCase() === 'x-default'
  )?.href;
  const xDefaultUrl = xDefaultHref
    ? parseUrl(xDefaultHref, pageUrl)?.href
    : undefined;

  const locales = [...new Set(localizedUrls.map(({ locale }) => locale))];

  const detection: RoutingDetection =
    localizedUrls.length >= 2
      ? {
          ...detectFromAlternates(localizedUrls, locales, xDefaultUrl),
          locales,
        }
      : {
          ...(parsedPageUrl
            ? detectFromPageUrl(parsedPageUrl, htmlLang)
            : {
                strategy: 'unknown',
                confidence: 'low',
                evidence: 'invalid page URL',
              }),
          locales: htmlLang ? [htmlLang] : locales,
        };

  if (detection.strategy === 'prefix-all' && detection.locales.length === 0) {
    const firstSegment = parsedPageUrl
      ? getFirstPathSegment(parsedPageUrl.pathname)
      : undefined;
    if (firstSegment) detection.locales = [firstSegment];
  }

  return { ...detection, urlLocale: getUrlLocale(pageUrl, detection) };
};
