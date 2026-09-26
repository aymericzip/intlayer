import Fuse, { type IFuseOptions } from 'fuse.js';

/** A navigable page of the inspected site. */
export type SitePage = {
  url: string;
  /** `pathname + search + hash`, `/` for the root. */
  path: string;
};

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
