import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';
import type { ZodMiniType } from 'zod/mini';
import type { AuditData, AuditStatus } from './Analyzer/Results/types';
import type { ScanSnapshot } from './useLocalizationScan';

type ScanWebsiteInput = { url: string };

type UseScannerWebMCPToolsOptions = {
  /** Validates and normalizes a URL the way the form does. */
  urlSchema: ZodMiniType<{ url: string }>;
  /** Runs a scan and resolves with its outcome. */
  scan: (url: string) => Promise<ScanSnapshot>;
  /** Outcome of the last scan, from a previous visit too. */
  snapshot: ScanSnapshot;
  isScanning: boolean;
};

type ScanCheck = {
  check: string;
  url?: string;
  status?: AuditStatus;
  details?: AuditData;
};

/**
 * Check keys carry the audited URL after a backslash
 * (`url_htmlLang\https://example.com`); domain-wide checks have none.
 */
const toScanCheck = (
  key: string,
  value: { status?: AuditStatus; data?: AuditData } | undefined
): ScanCheck => {
  const separatorIndex = key.indexOf('\\');
  const check = separatorIndex >= 0 ? key.slice(0, separatorIndex) : key;
  const url = separatorIndex >= 0 ? key.slice(separatorIndex + 1) : undefined;

  return { check, url, status: value?.status, details: value?.data };
};

/** A scan outcome in the shape an agent can reason about. */
const describeSnapshot = ({ score, domainData, mergedData }: ScanSnapshot) => {
  const checks = Object.entries(mergedData).map(([key, value]) =>
    toScanCheck(key, value)
  );
  const countByStatus = (status: AuditStatus) =>
    checks.filter((check) => check.status === status).length;

  return {
    score,
    site: domainData
      ? {
          title: domainData.title,
          description: domainData.description,
          defaultLocale: domainData.defaultLocale,
          discoveredLocales: domainData.discoveredLocales,
          discoveredUrls: domainData.discoveredUrls,
        }
      : undefined,
    summary: {
      total: checks.length,
      success: countByStatus('success'),
      warning: countByStatus('warning'),
      error: countByStatus('error'),
    },
    checks,
  };
};

/**
 * WebMCP tools of the i18n SEO scanner page: one that audits a website and
 * returns the report, one that reads the report already on screen.
 */
export const useScannerWebMCPTools = ({
  urlSchema,
  scan,
  snapshot,
  isScanning,
}: UseScannerWebMCPToolsOptions): AnyWebMCPTool[] => {
  const scanWebsite: AnyWebMCPTool = {
    name: 'createWebsiteI18nScan',
    description:
      'Audit the internationalization and SEO of a public website with the scanner on this page: locales, hreflang, html lang / dir, canonical, localized links, sitemap and robots. Returns a score out of 100 and every check with its status and details. Takes up to a minute; the report also appears on the page.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description:
            'Public URL of the page to audit, for example `https://example.com`.',
        },
      },
      required: ['url'],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      untrustedContentHint: true,
      openWorldHint: true,
    },
    execute: async ({ url }: ScanWebsiteInput) => {
      const parsed = urlSchema.safeParse({ url });

      if (!parsed.success) {
        return `Invalid URL: ${parsed.error.issues[0]?.message ?? url}`;
      }

      if (isScanning) {
        return 'A scan is already running on this page; wait for it to finish.';
      }

      const result = await scan(parsed.data.url);

      if (Object.keys(result.mergedData).length === 0) {
        return `The scan of ${parsed.data.url} produced no result; the site may be unreachable.`;
      }

      return { url: parsed.data.url, ...describeSnapshot(result) };
    },
  };

  const getScanResults: AnyWebMCPTool = {
    name: 'getI18nScanResults',
    description:
      'Read the i18n SEO scan report currently displayed on this page, if any.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: () => {
      if (Object.keys(snapshot.mergedData).length === 0) {
        return isScanning
          ? 'A scan is in progress; no report yet.'
          : 'No scan has been run on this page yet. Use `createWebsiteI18nScan`.';
      }

      return describeSnapshot(snapshot);
    },
  };

  return [scanWebsite, getScanResults];
};
