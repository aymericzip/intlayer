import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';
import { getLocalizedPages } from '@intlayer/engine/scan/detection';
import type { PageDetectionResult } from '../detector/types';
import { getMigrationDocLinks } from '../migration/getMigrationDocLinks';
import { createPageSearch } from '../navigation/pageSearch';
import type { SitemapPages } from '../navigation/useSitemapPages';
import { describeAuditScan } from '../scan/describeAuditScan';
import type { ActiveTabError } from './useActiveTabDetection';
import type { AuditScan } from './useAuditScan';

const DEFAULT_PAGE_LIMIT = 20;
const MAX_PAGE_LIMIT = 200;

type SearchSitePagesInput = { query?: string; limit?: number };
type OpenPageInput = { url: string };
type ScanWebsiteInput = { url?: string; refresh?: boolean };

type UseExtensionWebMCPToolsOptions = {
  tabUrl: string | null;
  detection: PageDetectionResult | null;
  /** Why the tab could not be inspected, if it could not. */
  detectionError: ActiveTabError | null;
  sitemap: SitemapPages;
  scan: AuditScan;
  /** Navigates the inspected tab. */
  navigateTab: (url: string) => void;
};

/** Resolves an absolute URL or a path of the inspected site to a web URL. */
const resolveWebUrl = (url: string, baseUrl: string | null): URL | null => {
  try {
    const target = new URL(url, baseUrl ?? undefined);

    return /^https?:$/.test(target.protocol) ? target : null;
  } catch {
    return null;
  }
};

/**
 * WebMCP tools of the extension popup: they expose the i18n inspection of the
 * active tab, its sitemap, tab navigation and the Intlayer audit to a browser
 * agent while the popup is open.
 */
export const useExtensionWebMCPTools = ({
  tabUrl,
  detection,
  detectionError,
  sitemap,
  scan,
  navigateTab,
}: UseExtensionWebMCPToolsOptions): AnyWebMCPTool[] => {
  const getInspectedPage: AnyWebMCPTool = {
    name: 'getInspectedPage',
    description:
      'Describe the internationalization of the website open in the active tab, as detected in the page: framework and i18n libraries, html lang / dir, detected locales, URL routing strategy, hreflang alternates, canonical and og:locale tags, locale cookies / storage entries, share of localized internal links, and Intlayer migration guides for the detected i18n library.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: () => {
      if (detectionError) {
        return `The active tab cannot be inspected (${detectionError.code})${detectionError.detail ? `: ${detectionError.detail}` : ''}.`;
      }

      if (!detection) return 'The active tab is still being analyzed.';

      return {
        ...detection,
        localizedPages: getLocalizedPages(detection.hreflangs, detection.url),
        migrationGuides: getMigrationDocLinks(detection.technologies),
      };
    },
  };

  const searchSitePages: AnyWebMCPTool = {
    name: 'searchSitePages',
    description:
      'Fuzzy-search the pages listed in the sitemap of the website open in the active tab, by path keywords. Without a query, returns the first pages of the sitemap. Open a result with `openPage`.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keywords matched against the page paths.',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: MAX_PAGE_LIMIT,
          description: `Maximum number of pages (default ${DEFAULT_PAGE_LIMIT}).`,
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: async ({ query = '', limit }: SearchSitePagesInput) => {
      if (!tabUrl) return 'No inspectable website is open in the active tab.';

      const sitemapUrls = await sitemap.loadSitemap();

      if (sitemapUrls.length === 0) {
        return `No sitemap page could be read for ${new URL(tabUrl).origin}.`;
      }

      const pageLimit = Math.min(
        Math.max(limit ?? DEFAULT_PAGE_LIMIT, 1),
        MAX_PAGE_LIMIT
      );

      return {
        total: sitemapUrls.length,
        pages: createPageSearch(sitemapUrls)(query, pageLimit),
      };
    },
  };

  const openPage: AnyWebMCPTool = {
    name: 'openPage',
    description:
      'Navigate the active tab to a web page, given an absolute URL or a path of the inspected website (for example a hreflang alternate or a sitemap page). The page is analyzed again once loaded.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description:
            'Absolute http(s) URL, or a path resolved against the current page.',
        },
      },
      required: ['url'],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
    execute: ({ url }: OpenPageInput) => {
      const target = resolveWebUrl(url, tabUrl);

      if (!target) return `"${url}" is not an http(s) URL.`;

      navigateTab(target.toString());

      return `Navigating the active tab to ${target.toString()}.`;
    },
  };

  const createWebsiteI18nScan: AnyWebMCPTool = {
    name: 'createWebsiteI18nScan',
    description:
      'Audit the internationalization and SEO of a page with the Intlayer scanner (defaults to the page open in the active tab): locales, hreflang, html lang / dir, canonical, localized links, sitemap and robots. Returns a score out of 100 and every check with its status and details. Takes up to a minute; the report also appears in the popup. A URL audited less than an hour ago is returned from cache (`cachedAt` is set); pass `refresh: true` to run a new audit.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description:
            'Public URL to audit (default: the page open in the active tab).',
        },
        refresh: {
          type: 'boolean',
          description:
            'Run a new audit instead of returning a result cached less than an hour ago.',
        },
      },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      untrustedContentHint: true,
      openWorldHint: true,
    },
    execute: async ({ url, refresh }: ScanWebsiteInput) => {
      const target = url ? resolveWebUrl(url, tabUrl) : null;
      const scannedUrl = target?.toString() ?? (url ? null : tabUrl);

      if (!scannedUrl) {
        return url
          ? `"${url}" is not an http(s) URL.`
          : 'No inspectable website is open in the active tab; pass a `url`.';
      }

      if (scan.isScanning) {
        return 'An audit is already running in the popup; wait for it to finish.';
      }

      const result = await scan.startScan(scannedUrl, { refresh });

      if (Object.keys(result.mergedData).length === 0) {
        return result.error
          ? `The audit of ${scannedUrl} failed: ${result.error}`
          : `The audit of ${scannedUrl} produced no result; the site may be unreachable.`;
      }

      return { url: scannedUrl, ...describeAuditScan(result) };
    },
  };

  const getI18nScanResults: AnyWebMCPTool = {
    name: 'getI18nScanResults',
    description:
      'Read the Intlayer audit report currently displayed in the popup, if any.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: () => {
      if (Object.keys(scan.mergedData).length === 0) {
        return scan.isScanning
          ? 'An audit is in progress; no report yet.'
          : 'No audit has been run yet. Use `createWebsiteI18nScan`.';
      }

      return describeAuditScan(scan);
    },
  };

  return [
    getInspectedPage,
    searchSitePages,
    openPage,
    createWebsiteI18nScan,
    getI18nScanResults,
  ];
};
