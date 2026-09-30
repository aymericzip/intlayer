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
  /**
   * Starts reading the sitemap, once per origin. Resolves with its URLs, or
   * an empty list when the sitemap cannot be read.
   */
  loadSitemap: () => Promise<string[]>;
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
  const sitemapRequestRef = useRef<Promise<string[]> | null>(null);

  useEffect(() => {
    originRef.current = origin;
    sitemapRequestRef.current = null;
    setStatus('idle');
    setUrls([]);
  }, [origin]);

  const loadSitemap = useCallback((): Promise<string[]> => {
    if (tabId === null || !tabUrl) return Promise.resolve([]);
    if (sitemapRequestRef.current) return sitemapRequestRef.current;

    const requestOrigin = originRef.current;
    // Drops the result when the tab moved to another origin meanwhile.
    const isStale = () => originRef.current !== requestOrigin;

    setStatus('loading');

    const sitemapRequest = extractUrlFromSitemap(tabUrl, {
      fetchText: createTabTextFetcher(tabId),
    })
      .then((sitemapUrls) => {
        if (!isStale()) {
          setUrls(sitemapUrls);
          setStatus('loaded');
        }
        return sitemapUrls;
      })
      .catch(() => {
        if (!isStale()) setStatus('error');
        return [];
      });

    sitemapRequestRef.current = sitemapRequest;

    return sitemapRequest;
  }, [tabId, tabUrl]);

  const searchPages = useMemo(() => createPageSearch(urls), [urls]);

  return { status, pageCount: urls.length, loadSitemap, searchPages };
};
