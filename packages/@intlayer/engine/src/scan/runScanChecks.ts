import {
  checkBundleContent,
  checkCanonical,
  checkHreflang,
  checkHreflangReciprocity,
  checkHtmlDir,
  checkHtmlLang,
  checkInternalLinks,
  checkLocaleConsistency,
  checkOgLocale,
  checkRobots,
  checkSitemap,
  checkXDefault,
  type EmitScanEvent,
  type PageSignals,
} from './checks';
import { detectRoutingStrategy } from './detection/detectRoutingStrategy';
import {
  detectTechnologies,
  type TechnologyDetectionInput,
} from './detection/detectTechnologies';
import { parseUrl } from './detection/url';
import type { ScanFetchOptions } from './fetchText';
import {
  extractAnchors,
  extractCanonicalHref,
  extractHreflangs,
  extractHtmlDir,
  extractHtmlLang,
  extractMetaDescription,
  extractOgImage,
  extractOgLocale,
  extractResourceUrls,
  extractTitle,
} from './parseHtml';
import type { BundleChunkInput, PageMetadata, ScanResult } from './types';

/** Page material gathered by the caller (fetch, puppeteer, browser…). */
export type ScanPageInput = {
  /** Absolute URL of the scanned page. */
  targetUrl: string;
  /** HTML of the page, rendered when possible. */
  html: string;
  /** Fetched JavaScript chunks. */
  chunks: BundleChunkInput[];
  /** Total transferred bytes measured for the page. */
  totalPageSize: number;
  /** Network request URLs observed while loading the page. */
  requestUrls?: string[];
  /** Live-page signals (globals, storage keys) for technology detection. */
  runtimeSignals?: Pick<
    TechnologyDetectionInput,
    'globals' | 'storageKeys' | 'globalVersions'
  >;
};

/** Page-level information available before the network-bound checks. */
export type ScanPageInfo = Pick<
  ScanResult,
  'metadata' | 'routing' | 'technologies' | 'locales'
>;

/** Options of {@link runScanChecks}. */
export type RunScanChecksOptions = ScanFetchOptions & {
  /** Called before each step, e.g. to stream a progress bar. */
  onProgress?: (progress: number, message: string) => void;
  /** Called once the page itself is analyzed (metadata, routing, stack). */
  onPageInfo?: (pageInfo: ScanPageInfo) => void;
};

/** Output of {@link runScanChecks}. */
export type ScanChecksResult = Pick<
  ScanResult,
  'metadata' | 'routing' | 'technologies' | 'locales' | 'bundle'
>;

/** Extract title, description and absolute preview image. */
const extractPageMetadata = (html: string, targetUrl: string): PageMetadata => {
  const ogImage = extractOgImage(html);
  return {
    title: extractTitle(html),
    description: extractMetaDescription(html),
    image: ogImage ? (parseUrl(ogImage, targetUrl)?.href ?? ogImage) : '',
  };
};

/**
 * Run every i18n/SEO check on an already loaded page. Single implementation
 * shared by the `intlayer scan` CLI and the hosted audit (`/api/scan`), which
 * only differ in how they load the page.
 *
 * @param input - The loaded page (HTML, chunks, size, runtime signals).
 * @param emit - Receives every check result as soon as it is produced.
 * @param options - Network options and progress callbacks.
 */
export const runScanChecks = async (
  {
    targetUrl,
    html,
    chunks,
    totalPageSize,
    requestUrls = [],
    runtimeSignals,
  }: ScanPageInput,
  emit: EmitScanEvent,
  { onProgress, onPageInfo, ...fetchOptions }: RunScanChecksOptions
): Promise<ScanChecksResult> => {
  const origin = new URL(targetUrl).origin;

  onProgress?.(20, 'Analyzing html attributes and hreflang tags...');

  const langTag = extractHtmlLang(html);
  const hreflangs = extractHreflangs(html);
  const routing = detectRoutingStrategy({
    pageUrl: targetUrl,
    htmlLang: langTag,
    hreflangs,
  });
  const signals: PageSignals = {
    targetUrl,
    langTag,
    dirTag: extractHtmlDir(html),
    ogLocale: extractOgLocale(html),
    canonicalHref: extractCanonicalHref(html),
    hreflangs,
    anchors: extractAnchors(html),
    routing,
    pageLocale: routing.urlLocale ?? langTag,
  };

  const locales = [
    ...new Set([...(langTag ? [langTag] : []), ...routing.locales]),
  ];
  const pageInfo: ScanPageInfo = {
    metadata: extractPageMetadata(html, targetUrl),
    routing,
    locales,
    technologies: detectTechnologies({
      pageUrl: targetUrl,
      html,
      resourceUrls: [
        ...new Set([...extractResourceUrls(html, targetUrl), ...requestUrls]),
      ],
      scripts: chunks.map(({ content }) => content),
      ...runtimeSignals,
    }),
  };
  onPageInfo?.(pageInfo);

  checkHtmlLang(signals, emit);
  checkHtmlDir(signals, emit);
  checkLocaleConsistency(signals, emit);
  checkOgLocale(signals, emit);
  checkCanonical(signals, emit);
  checkHreflang(signals, emit);
  checkXDefault(signals, emit);

  onProgress?.(35, 'Checking hreflang alternates...');
  await checkHreflangReciprocity(signals, fetchOptions, emit);

  onProgress?.(50, 'Analysing bundle content & leakage...');
  const bundle = checkBundleContent(
    chunks,
    html,
    signals.pageLocale,
    targetUrl,
    totalPageSize,
    emit
  );

  onProgress?.(60, 'Analyzing internal links...');
  checkInternalLinks(signals, emit);

  onProgress?.(70, 'Checking robots.txt...');
  const localizedUrls = hreflangs.flatMap(
    ({ href }) => parseUrl(href, targetUrl)?.href ?? []
  );
  const declaredSitemapUrls = await checkRobots(
    origin,
    localizedUrls,
    fetchOptions,
    emit
  );

  onProgress?.(85, 'Checking sitemaps...');
  await checkSitemap(origin, declaredSitemapUrls, routing, fetchOptions, emit);

  return { ...pageInfo, bundle };
};
