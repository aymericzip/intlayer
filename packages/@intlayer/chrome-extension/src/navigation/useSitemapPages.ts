import {
  extractUrlFromSitemap,
  type SitemapTextFetcher,
} from '@intlayer/design-system/browser';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { fetchTextInPage } from './fetchTextInPage';
import { createPageSearch, type SitePage } from './pageSearch';

export type SitemapStatus = 'idle' | 'loading' | 'loaded' | 'error';

export type SitemapPages = {
  status: SitemapStatus;
  /** Number of URLs listed by the sitemap. */
  pageCount: number;
  /** Starts reading the sitemap; no-op once loading or loaded. */
  loadSitemap: () => void;
  /** Fuzzy search over the sitemap URLs, capped at `limit`. */
  searchPages: (query: string, limit: number) => SitePage[];
};

/** Proxies every sitemap request through the inspected tab (same origin). */
const createTabTextFetcher =
  (tabId: number): SitemapTextFetcher =>
  async (url, timeoutInMilliseconds) => {
    try {
      const [injectionResult] = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'ISOLATED',
        func: fetchTextInPage,
        args: [url, timeoutInMilliseconds],
      });

      return typeof injectionResult?.result === 'string'
        ? injectionResult.result
        : null;
    } catch {
      return null;
    }
  };

const getOrigin = (url: string | null): string | null => {
  if (!url) return null;

  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
};

/**
 * Lazily reads the sitemap of the inspected site. The list is kept while the
 * tab navigates within the same origin, and dropped when the origin changes.
 */
export const useSitemapPages = (
  tabId: number | null,
  tabUrl: string | null
): SitemapPages => {
  const origin = getOrigin(tabUrl);
  const [status, setStatus] = useState<SitemapStatus>('idle');
  const [urls, setUrls] = useState<string[]>([]);
  const originRef = useRef(origin);

  useEffect(() => {
    originRef.current = origin;
    setStatus('idle');
    setUrls([]);
  }, [origin]);

  const loadSitemap = useCallback(() => {
    if (tabId === null || !tabUrl || status !== 'idle') return;

    const requestOrigin = originRef.current;
    // Drops the result when the tab moved to another origin meanwhile.
    const isStale = () => originRef.current !== requestOrigin;

    setStatus('loading');

    extractUrlFromSitemap(tabUrl, { fetchText: createTabTextFetcher(tabId) })
      .then((sitemapUrls) => {
        if (isStale()) return;
        setUrls(sitemapUrls);
        setStatus('loaded');
      })
      .catch(() => {
        if (!isStale()) setStatus('error');
      });
  }, [tabId, tabUrl, status]);

  const searchPages = useMemo(() => createPageSearch(urls), [urls]);

  return { status, pageCount: urls.length, loadSitemap, searchPages };
};
