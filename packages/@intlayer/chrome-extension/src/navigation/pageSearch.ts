import Fuse, { type IFuseOptions } from 'fuse.js';
import type { HreflangEntry } from '../detector/types';

/** A navigable page of the inspected site. */
export type SitePage = {
  url: string;
  /** `pathname + search + hash`, `/` for the root. */
  path: string;
};

/** A localized version of the inspected page, read from its hreflang tags. */
export type LocalizedPage = {
  hreflang: string;
  url: string;
  /** True when this alternate points to the page currently displayed. */
  isCurrent: boolean;
};

const X_DEFAULT = 'x-default';

const fuseOptions: IFuseOptions<SitePage> = {
  keys: [
    { name: 'path', weight: 0.8 },
    { name: 'url', weight: 0.2 },
  ],
  // URLs are long: match anywhere in the path, not only near its start.
  ignoreLocation: true,
  threshold: 0.3,
};

/** Returns the `pathname + search + hash` of a URL, or the raw value. */
export const getUrlPath = (url: string): string => {
  try {
    const { pathname, search, hash } = new URL(url);

    return `${pathname}${search}${hash}` || '/';
  } catch {
    return url;
  }
};

/** Compares two URLs, ignoring a trailing slash on the path. */
const isSameUrl = (firstUrl: string, secondUrl: string): boolean => {
  const normalize = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';

      return parsedUrl.href;
    } catch {
      return url;
    }
  };

  return normalize(firstUrl) === normalize(secondUrl);
};

/**
 * Builds a fuzzy search over the sitemap URLs. An empty query returns every
 * page; results are capped at `limit`.
 */
export const createPageSearch = (urls: string[]) => {
  const pages: SitePage[] = urls.map((url) => ({ url, path: getUrlPath(url) }));
  const fuse = new Fuse(pages, fuseOptions);

  return (query: string, limit: number): SitePage[] => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return pages.slice(0, limit);

    return fuse.search(trimmedQuery, { limit }).map((result) => result.item);
  };
};

/**
 * Turns the hreflang alternates of the current page into a navigable list:
 * deduped by URL, flagging the current page, `x-default` last.
 */
export const getLocalizedPages = (
  hreflangs: HreflangEntry[],
  currentUrl: string
): LocalizedPage[] => {
  const pagesByUrl = new Map<string, LocalizedPage>();

  for (const { hreflang, href } of hreflangs) {
    if (!hreflang || !href) continue;

    const existingPage = pagesByUrl.get(href);

    // Keep a real locale over `x-default` when both point to the same URL.
    if (existingPage && existingPage.hreflang !== X_DEFAULT) continue;

    pagesByUrl.set(href, {
      hreflang,
      url: href,
      isCurrent: isSameUrl(href, currentUrl),
    });
  }

  return Array.from(pagesByUrl.values()).sort(
    (firstPage, secondPage) =>
      Number(firstPage.hreflang === X_DEFAULT) -
      Number(secondPage.hreflang === X_DEFAULT)
  );
};
