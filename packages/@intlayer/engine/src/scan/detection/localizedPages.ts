import type { RoutingDetection } from './detectRoutingStrategy';
import { isSameLocale } from './localeCode';
import { normalizeUrl, parseUrl } from './url';

/** A localized version of a page, read from its hreflang tags. */
export type LocalizedPage = {
  hreflang: string;
  /** Absolute URL of the localized version. */
  url: string;
  /** True when this alternate points to the page currently inspected. */
  isCurrent: boolean;
};

const X_DEFAULT = 'x-default';

/**
 * Turns the hreflang alternates of a page into a navigable list: absolute,
 * deduped by URL (a real locale wins over `x-default`), flagging the current
 * page, `x-default` last.
 *
 * @param hreflangs - `<link rel="alternate" hreflang>` entries of the page.
 * @param currentUrl - Absolute URL of the page, used to resolve relative hrefs.
 */
export const getLocalizedPages = (
  hreflangs: { hreflang: string; href: string }[],
  currentUrl: string
): LocalizedPage[] => {
  const normalizedCurrentUrl = normalizeUrl(currentUrl);
  const pagesByUrl = new Map<string, LocalizedPage>();

  for (const { hreflang, href } of hreflangs) {
    const url = hreflang ? parseUrl(href, currentUrl)?.href : undefined;
    if (!url) continue;

    const existingPage = pagesByUrl.get(url);

    // Keep a real locale over `x-default` when both point to the same URL.
    if (existingPage && existingPage.hreflang !== X_DEFAULT) continue;

    pagesByUrl.set(url, {
      hreflang,
      url,
      isCurrent: normalizeUrl(url) === normalizedCurrentUrl,
    });
  }

  return Array.from(pagesByUrl.values()).sort(
    (firstPage, secondPage) =>
      Number(firstPage.hreflang === X_DEFAULT) -
      Number(secondPage.hreflang === X_DEFAULT)
  );
};

/** Input of {@link isBaseLocalePage}. */
export type BaseLocalePageInput = {
  pageUrl: string;
  hreflangs: { hreflang: string; href: string }[];
  routing: Pick<
    RoutingDetection,
    'strategy' | 'locales' | 'urlLocale' | 'defaultLocale'
  >;
};

/**
 * Whether the page is the base (unlocalized / default-locale entry) version of
 * a multilingual page: the `x-default` target, the root of a `prefix-all`
 * site, or the unmarked default-locale URL. i18n issues tend to hide on the
 * localized versions rather than on this one.
 */
export const isBaseLocalePage = ({
  pageUrl,
  hreflangs,
  routing,
}: BaseLocalePageInput): boolean => {
  if (routing.locales.length < 2) return false;

  const xDefaultHref = hreflangs.find(
    ({ hreflang }) => hreflang.toLowerCase() === X_DEFAULT
  )?.href;
  if (
    xDefaultHref &&
    normalizeUrl(xDefaultHref, pageUrl) === normalizeUrl(pageUrl)
  ) {
    return true;
  }

  if (routing.strategy === 'prefix-all') return !routing.urlLocale;

  const hasUnmarkedDefaultLocale =
    routing.strategy === 'prefix-no-default' ||
    routing.strategy === 'search-params' ||
    routing.strategy === 'subdomain';

  return (
    hasUnmarkedDefaultLocale &&
    isSameLocale(routing.urlLocale, routing.defaultLocale)
  );
};
