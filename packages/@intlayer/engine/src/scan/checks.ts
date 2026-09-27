import { analyzeBundleContent } from './analyzeBundleContent';
import { classifyInternalLinks } from './detection/classifyInternalLinks';
import {
  getUrlLocale,
  type RoutingDetection,
} from './detection/detectRoutingStrategy';
import {
  getLanguageCode,
  isRightToLeftLocale,
  isSameLanguage,
  isValidLocaleCode,
  isValidOpenGraphLocale,
  normalizeLocaleCode,
  toOpenGraphLocale,
} from './detection/localeCode';
import { isAbsoluteUrl, normalizeUrl, parseUrl } from './detection/url';
import { fetchText, type ScanFetchOptions } from './fetchText';
import {
  type Anchor,
  extractHreflangs,
  extractHtmlLang,
  type HreflangLink,
} from './parseHtml';
import { isPathAllowedByRobots, parseRobots } from './robots';
import { collectSitemapEntries, getDefaultSitemapUrls } from './sitemap';
import type {
  BundleChunkInput,
  BundleContentAnalysis,
  ChunkAnalysis,
  ScanCheckStatus,
  ScanEvent,
} from './types';

/** Receives every check result as soon as it is produced. */
export type EmitScanEvent = (event: ScanEvent) => void;

/** Signals of the scanned page shared by the page-level checks. */
export type PageSignals = {
  targetUrl: string;
  langTag?: string;
  dirTag?: string;
  ogLocale?: string;
  /** `og:locale:alternate` values. */
  ogLocaleAlternates?: string[];
  /** Raw `href` of the canonical link (`''` when present but empty). */
  canonicalHref?: string;
  hreflangs: HreflangLink[];
  anchors: Anchor[];
  routing: RoutingDetection;
  /** Locale of the page: from its URL when possible, else `<html lang>`. */
  pageLocale?: string;
};

/** Maximum number of links listed in a check's details. */
const MAX_LISTED_LINKS = 30;
/** Maximum number of hreflang alternates fetched for the reciprocity check. */
const MAX_FETCHED_ALTERNATES = 8;
/** Statuses meaning the site refuses automated requests, not a broken page. */
const BOT_BLOCKING_STATUSES = new Set([401, 403, 429]);

/** Format a byte count as a human-readable size. */
export const formatSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${bytes} B`;
};

/** Build a URL-scoped check type (`url_htmlLang\https://…`). */
const urlCheckType = (checkName: string, targetUrl: string): string =>
  `${checkName}\\${targetUrl}`;

/** Emit an event whose details are attached to its own status. */
const emitCheck = (
  emit: EmitScanEvent,
  type: string,
  status: ScanCheckStatus,
  details?: unknown
): void =>
  emit({
    type,
    status,
    details: details === undefined ? undefined : { [status]: details },
  });

/** Render an anchor as an HTML line for the details popover. */
const formatAnchor = ({ href, text }: Anchor): string =>
  `<a href="${href}">${text.slice(0, 60) || 'Link'}</a>`;

/* ------------------------------------------------------------------------ */
/*                              <html> attributes                            */
/* ------------------------------------------------------------------------ */

/** `url_htmlLang`: `<html lang>` is present and a valid BCP 47 tag. */
export const checkHtmlLang = (
  { targetUrl, langTag }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_htmlLang', targetUrl);
  if (!langTag) {
    emitCheck(emit, type, 'error', 'Missing html lang attribute');
  } else if (!isValidLocaleCode(langTag)) {
    emitCheck(
      emit,
      type,
      'error',
      `"${langTag}" is not a valid BCP 47 language tag (expected e.g. "en" or "en-US")`
    );
  } else {
    emitCheck(emit, type, 'success', langTag);
  }
};

/**
 * `url_htmlDir`: the text direction matches the language. `dir` is only
 * required for right-to-left languages, `ltr` being the browser default.
 */
export const checkHtmlDir = (
  { targetUrl, langTag, dirTag }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_htmlDir', targetUrl);
  const direction = dirTag?.toLowerCase();

  if (!langTag) {
    emitCheck(
      emit,
      type,
      'warning',
      'Cannot verify the text direction: html lang is missing'
    );
    return;
  }

  const expectedDirection = isRightToLeftLocale(langTag) ? 'rtl' : 'ltr';

  if (
    direction === expectedDirection ||
    (!direction && expectedDirection === 'ltr')
  ) {
    emitCheck(emit, type, 'success', direction ?? 'ltr (browser default)');
    return;
  }

  emitCheck(
    emit,
    type,
    'error',
    direction
      ? `dir="${direction}" does not match the ${expectedDirection.toUpperCase()} language "${langTag}"`
      : `Missing dir="rtl" for the right-to-left language "${langTag}"`
  );
};

/**
 * `url_currentLocale`: the locale announced by `<html lang>`, the URL and the
 * self hreflang entry agree.
 */
export const checkLocaleConsistency = (
  { targetUrl, langTag, hreflangs, routing }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_currentLocale', targetUrl);
  const normalizedTargetUrl = normalizeUrl(targetUrl);
  const selfHreflang = hreflangs.find(
    ({ hreflang, href }) =>
      hreflang.toLowerCase() !== 'x-default' &&
      normalizeUrl(href, targetUrl) === normalizedTargetUrl
  )?.hreflang;

  const signals = {
    htmlLang: langTag,
    urlLocale: routing.urlLocale,
    selfHreflang,
  };
  const definedLocales = Object.values(signals).filter(
    (locale): locale is string => Boolean(locale)
  );

  if (definedLocales.length === 0) {
    emitCheck(emit, type, 'warning', 'No locale detected on the page');
    return;
  }

  const firstLocale = definedLocales[0];
  const isConsistent = definedLocales.every((locale) =>
    isSameLanguage(locale, firstLocale)
  );

  emitCheck(
    emit,
    type,
    isConsistent ? 'success' : 'error',
    isConsistent
      ? signals
      : {
          message:
            'The page announces different locales in html lang, its URL and its hreflang entry',
          ...signals,
        }
  );
};

/** Describe an invalid Open Graph locale, with the value to use instead. */
const formatInvalidOpenGraphLocale = (
  localeCode: string,
  langTag: string | undefined,
  property: string
): string => {
  const suggestion = toOpenGraphLocale(localeCode, langTag);
  return `${property} "${localeCode}" is not a valid Open Graph locale (expected language_TERRITORY${
    suggestion ? `, e.g. "${suggestion}"` : ''
  }): crawlers ignore it and fall back to en_US`;
};

/**
 * `url_ogLocale`: `og:locale` is set, uses the Open Graph `language_TERRITORY`
 * format (`en_GB`, not `en` nor `en-GB`) and matches `<html lang>`.
 * `og:locale:alternate` values must use the same format.
 */
export const checkOgLocale = (
  { targetUrl, ogLocale, ogLocaleAlternates = [], langTag }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_ogLocale', targetUrl);

  if (!ogLocale) {
    emitCheck(
      emit,
      type,
      'warning',
      'Missing <meta property="og:locale">: social previews default to en_US'
    );
    return;
  }

  if (!isValidOpenGraphLocale(ogLocale)) {
    emitCheck(
      emit,
      type,
      'error',
      formatInvalidOpenGraphLocale(ogLocale, langTag, 'og:locale')
    );
    return;
  }

  if (langTag && !isSameLanguage(ogLocale, langTag)) {
    emitCheck(
      emit,
      type,
      'warning',
      `og:locale "${ogLocale}" does not match html lang "${langTag}"`
    );
    return;
  }

  const invalidAlternates = ogLocaleAlternates.filter(
    (alternate) => !isValidOpenGraphLocale(alternate)
  );

  if (invalidAlternates.length > 0) {
    emitCheck(
      emit,
      type,
      'warning',
      invalidAlternates
        .map((alternate) =>
          formatInvalidOpenGraphLocale(
            alternate,
            undefined,
            'og:locale:alternate'
          )
        )
        .join('\n')
    );
    return;
  }

  emitCheck(emit, type, 'success', ogLocale);
};

/* ------------------------------------------------------------------------ */
/*                         Canonical & hreflang tags                         */
/* ------------------------------------------------------------------------ */

/**
 * `url_hasCanonical`: a canonical link exists and does not point to another
 * locale version (which would de-index the current one).
 */
export const checkCanonical = (
  { targetUrl, canonicalHref, hreflangs, routing, pageLocale }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_hasCanonical', targetUrl);

  if (canonicalHref === undefined || canonicalHref === '') {
    emitCheck(emit, type, 'warning', 'Missing canonical link');
    return;
  }

  const canonicalUrl = normalizeUrl(canonicalHref, targetUrl);
  const otherLocaleAlternate = hreflangs.find(
    ({ hreflang, href }) =>
      hreflang.toLowerCase() !== 'x-default' &&
      normalizeUrl(href, targetUrl) === canonicalUrl &&
      !isSameLanguage(hreflang, pageLocale)
  );
  const canonicalLocale = getUrlLocale(canonicalUrl, routing);

  if (
    otherLocaleAlternate ||
    (canonicalLocale &&
      pageLocale &&
      !isSameLanguage(canonicalLocale, pageLocale))
  ) {
    emitCheck(emit, type, 'error', {
      message: `The canonical URL points to the "${otherLocaleAlternate?.hreflang ?? canonicalLocale}" version instead of this "${pageLocale}" page: search engines will drop this page from their index`,
      canonical: canonicalUrl,
    });
    return;
  }

  emitCheck(
    emit,
    type,
    'success',
    canonicalUrl === normalizeUrl(targetUrl)
      ? canonicalUrl
      : {
          message: 'Canonical points to another URL of the same locale',
          canonical: canonicalUrl,
        }
  );
};

/**
 * `url_hreflang`: hreflang tags exist, use valid codes and absolute URLs, have
 * no duplicates, and include a self reference.
 */
export const checkHreflang = (
  { targetUrl, hreflangs, canonicalHref }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_hreflang', targetUrl);

  if (hreflangs.length === 0) {
    emitCheck(emit, type, 'warning', 'No hreflang tags found');
    return;
  }

  const issues: string[] = [];

  const invalidCodes = hreflangs
    .map(({ hreflang }) => hreflang)
    .filter((hreflang) => !isValidLocaleCode(hreflang));
  if (invalidCodes.length > 0) {
    issues.push(`Invalid hreflang codes: ${invalidCodes.join(', ')}`);
  }

  const ukCodes = hreflangs
    .map(({ hreflang }) => hreflang)
    .filter((hreflang) => /-uk$/i.test(hreflang));
  if (ukCodes.length > 0) {
    issues.push(
      `"${ukCodes.join(', ')}": the United Kingdom region code is "GB" (e.g. en-GB)`
    );
  }

  // Search engines ignore alternates that are not fully qualified.
  const relativeHrefs = hreflangs.filter(({ href }) => !isAbsoluteUrl(href));
  if (relativeHrefs.length > 0) {
    issues.push(
      `hreflang URLs must be absolute (https://…), search engines ignore: ${relativeHrefs
        .map(({ hreflang, href }) => `${hreflang} → ${href}`)
        .join(', ')}`
    );
  }

  const urlsByCode = new Map<string, Set<string>>();
  for (const { hreflang, href } of hreflangs) {
    const code = normalizeLocaleCode(hreflang);
    const urls = urlsByCode.get(code) ?? new Set<string>();
    urls.add(normalizeUrl(href, targetUrl));
    urlsByCode.set(code, urls);
  }
  const conflictingCodes = [...urlsByCode.entries()]
    .filter(([, urls]) => urls.size > 1)
    .map(([code]) => code);
  if (conflictingCodes.length > 0) {
    issues.push(
      `Same hreflang declared with different URLs: ${conflictingCodes.join(', ')}`
    );
  }

  const selfUrls = new Set([normalizeUrl(targetUrl)]);
  if (canonicalHref) selfUrls.add(normalizeUrl(canonicalHref, targetUrl));
  const hasSelfReference = hreflangs.some(
    ({ hreflang, href }) =>
      hreflang.toLowerCase() !== 'x-default' &&
      selfUrls.has(normalizeUrl(href, targetUrl))
  );
  if (!hasSelfReference) {
    issues.push('No hreflang entry points to the page itself (self reference)');
  }

  const status: ScanCheckStatus =
    relativeHrefs.length > 0
      ? 'error'
      : issues.length > 0
        ? 'warning'
        : 'success';

  emitCheck(
    emit,
    type,
    status,
    issues.length > 0 ? { issues, hreflangs } : hreflangs
  );
};

/** `url_hasXDefault`: an `x-default` hreflang is declared. */
export const checkXDefault = (
  { targetUrl, hreflangs }: PageSignals,
  emit: EmitScanEvent
): void => {
  const type = urlCheckType('url_hasXDefault', targetUrl);
  const xDefault = hreflangs.find(
    ({ hreflang }) => hreflang.toLowerCase() === 'x-default'
  );

  if (xDefault) {
    emitCheck(emit, type, 'success', xDefault.href);
  } else if (hreflangs.length === 0) {
    emitCheck(
      emit,
      type,
      'warning',
      'No hreflang tags, so no x-default either'
    );
  } else {
    emitCheck(emit, type, 'error', 'Missing x-default hreflang link');
  }
};

/** Outcome of fetching one hreflang alternate. */
type AlternateVerification = {
  url: string;
  hreflang: string;
  /** `broken`: 4xx/5xx; `unverifiable`: unreachable or blocking bots. */
  outcome: 'valid' | 'invalid' | 'broken' | 'unverifiable';
  issues: string[];
};

/** Fetch an alternate and check it forms a valid hreflang pair with the page. */
const verifyAlternate = async (
  alternateUrl: string,
  hreflang: string,
  selfUrls: Set<string>,
  fetchOptions: ScanFetchOptions
): Promise<AlternateVerification> => {
  const response = await fetchText(alternateUrl, fetchOptions);
  const verification = { url: alternateUrl, hreflang };

  if (!response || BOT_BLOCKING_STATUSES.has(response.status)) {
    return { ...verification, outcome: 'unverifiable', issues: [] };
  }
  if (!response.ok) {
    return {
      ...verification,
      outcome: 'broken',
      issues: [`HTTP ${response.status}`],
    };
  }

  const issues: string[] = [];
  if (response.redirected) issues.push(`redirects to ${response.finalUrl}`);

  const hasReturnLink = extractHreflangs(response.text).some(({ href }) =>
    selfUrls.has(normalizeUrl(href, response.finalUrl))
  );
  if (!hasReturnLink) issues.push('no hreflang link back to this page');

  const alternateLang = extractHtmlLang(response.text);
  if (alternateLang && !isSameLanguage(alternateLang, hreflang)) {
    issues.push(`html lang is "${alternateLang}"`);
  }

  return {
    ...verification,
    outcome: issues.length > 0 ? 'invalid' : 'valid',
    issues,
  };
};

/**
 * `url_hreflangReciprocal`: every alternate answers with a 200, is not
 * redirected, links back to this page and declares the expected language.
 * Search engines ignore hreflang pairs without a return link.
 */
export const checkHreflangReciprocity = async (
  { targetUrl, hreflangs, canonicalHref }: PageSignals,
  fetchOptions: ScanFetchOptions,
  emit: EmitScanEvent
): Promise<void> => {
  const type = urlCheckType('url_hreflangReciprocal', targetUrl);
  const selfUrls = new Set([normalizeUrl(targetUrl)]);
  if (canonicalHref) selfUrls.add(normalizeUrl(canonicalHref, targetUrl));

  const alternatesByUrl = new Map<string, string>();
  for (const { hreflang, href } of hreflangs) {
    if (hreflang.toLowerCase() === 'x-default') continue;
    const absoluteUrl = parseUrl(href, targetUrl)?.href;
    if (!absoluteUrl || selfUrls.has(normalizeUrl(absoluteUrl))) continue;
    if (!alternatesByUrl.has(absoluteUrl)) {
      alternatesByUrl.set(absoluteUrl, hreflang);
    }
  }

  if (alternatesByUrl.size === 0) return;

  const verifications = await Promise.all(
    [...alternatesByUrl.entries()]
      .slice(0, MAX_FETCHED_ALTERNATES)
      .map(([alternateUrl, hreflang]) =>
        verifyAlternate(alternateUrl, hreflang, selfUrls, fetchOptions)
      )
  );

  const unverifiableUrls = verifications
    .filter(({ outcome }) => outcome === 'unverifiable')
    .map(({ url }) => url);
  const failingVerifications = verifications.filter(
    ({ outcome }) => outcome === 'broken' || outcome === 'invalid'
  );
  const verifiedCount = verifications.length - unverifiableUrls.length;

  if (verifiedCount === 0) {
    emitCheck(emit, type, 'warning', {
      message:
        'The alternates could not be verified: they are unreachable or block automated requests',
      urls: unverifiableUrls,
    });
    return;
  }

  if (failingVerifications.length === 0) {
    emitCheck(
      emit,
      type,
      'success',
      `${verifiedCount} alternates checked, all reciprocal`
    );
    return;
  }

  emitCheck(
    emit,
    type,
    failingVerifications.some(({ outcome }) => outcome === 'broken')
      ? 'error'
      : 'warning',
    {
      message: `${failingVerifications.length} of ${verifiedCount} checked hreflang alternates are not valid return pairs`,
      alternates: failingVerifications.map(
        ({ hreflang, url, issues }) =>
          `${hreflang} ${url}: ${issues.join(', ')}`
      ),
      unverifiableUrls,
    }
  );
};

/* ------------------------------------------------------------------------ */
/*                              Internal links                               */
/* ------------------------------------------------------------------------ */

/**
 * Link checks, interpreted through the detected routing strategy (so an
 * unprefixed link is correct on the default locale of a `prefix-no-default`
 * site, and `?lang=` links are understood on `search-params` sites):
 *
 * - `url_hasLocalizedLinks`: internal links keep the page locale
 * - `url_allAnchorsLocalized`: no internal link loses or switches the locale
 * - `url_hasLangSelector`: crawlable links to the other locale versions exist
 */
export const checkInternalLinks = (
  signals: PageSignals,
  emit: EmitScanEvent
): void => {
  const { targetUrl, routing, pageLocale } = signals;
  const {
    internalLinks,
    sameLocaleLinks,
    otherLocaleLinks,
    unlocalizedLinks,
    switcherLinks,
  } = classifyInternalLinks(signals);
  const listLinks = (links: Anchor[]): string[] =>
    links.slice(0, MAX_LISTED_LINKS).map(formatAnchor);

  const localizedLinksType = urlCheckType('url_hasLocalizedLinks', targetUrl);
  const isLocaleInUrl =
    routing.strategy !== 'no-prefix' && routing.strategy !== 'unknown';

  if (internalLinks.length === 0) {
    emitCheck(emit, localizedLinksType, 'warning', {
      message: 'No internal links found on the page',
      links: listLinks(switcherLinks),
    });
  } else if (!isLocaleInUrl || !pageLocale) {
    emitCheck(emit, localizedLinksType, 'warning', {
      message: `The locale is not reflected in the URLs (routing: ${routing.strategy}). Each locale needs its own crawlable URL to be indexed.`,
      links: listLinks(internalLinks),
    });
  } else if (sameLocaleLinks.length === 0) {
    emitCheck(emit, localizedLinksType, 'warning', {
      message: `None of the ${internalLinks.length} internal links points to the "${pageLocale}" version (routing: ${routing.strategy})`,
      links: listLinks(internalLinks),
    });
  } else {
    emitCheck(emit, localizedLinksType, 'success', {
      message: `${sameLocaleLinks.length} of ${internalLinks.length} internal links point to the "${pageLocale}" version (routing: ${routing.strategy})`,
      links: listLinks(sameLocaleLinks),
    });
  }

  if (isLocaleInUrl && pageLocale && internalLinks.length > 0) {
    const brokenLinks = [...otherLocaleLinks, ...unlocalizedLinks];
    emitCheck(
      emit,
      urlCheckType('url_allAnchorsLocalized', targetUrl),
      brokenLinks.length === 0 ? 'success' : 'warning',
      brokenLinks.length === 0
        ? `All ${internalLinks.length} internal links keep the "${pageLocale}" locale`
        : {
            message: `${brokenLinks.length} internal links leave the "${pageLocale}" locale (${otherLocaleLinks.length} to another locale, ${unlocalizedLinks.length} without locale)`,
            links: listLinks(brokenLinks),
          }
    );
  }

  if (routing.locales.length > 1) {
    emitCheck(
      emit,
      urlCheckType('url_hasLangSelector', targetUrl),
      switcherLinks.length > 0 ? 'success' : 'warning',
      switcherLinks.length > 0
        ? {
            message: `${switcherLinks.length} crawlable links to other locale versions`,
            links: listLinks(switcherLinks),
          }
        : 'No crawlable <a href> to the other locale versions: search engines only discover them through hreflang'
    );
  }
};

/* ------------------------------------------------------------------------ */
/*                              Bundle content                               */
/* ------------------------------------------------------------------------ */

const getFilename = (url: string): string =>
  url.split('/').pop()?.split('?')[0] ?? url;

const formatChunk = (chunk: ChunkAnalysis) => ({
  filename: getFilename(chunk.url),
  url: chunk.url,
  fileSize: formatSize(chunk.fileSize),
  totalLocaleSize: formatSize(chunk.totalLocaleSize),
  usedLocaleSize: formatSize(chunk.usedLocaleSize),
  unusedLocaleSize: formatSize(chunk.unusedLocaleSize),
  dictionariesFound: chunk.dictionariesFound,
  unusedPercent: `${chunk.unusedPercent}%`,
});

/** Human-readable version of a {@link BundleContentAnalysis}, for display. */
export const formatBundleAnalysis = (analysis: BundleContentAnalysis) => ({
  currentLocale: analysis.currentLocale,
  totalPageSize: formatSize(analysis.totalPageSize),
  renderedContentSize: formatSize(analysis.renderedContentSize),
  contentSize: formatSize(analysis.contentSize),
  totalLocaleSize: formatSize(analysis.totalLocaleSize),
  totalUnusedLocaleSize: formatSize(analysis.totalUnusedLocaleSize),
  unusedPercentOfLocale: `${analysis.unusedPercentOfLocale}%`,
  mainBundleChunks: analysis.mainBundleChunks.map(formatChunk),
  lazyBundleChunks: analysis.lazyBundleChunks.map(formatChunk),
});

/**
 * `url_unusedBundleContent`: share of other-locale translations shipped in the
 * eagerly loaded bundles. Returns the raw analysis for reporting.
 */
export const checkBundleContent = (
  chunks: BundleChunkInput[],
  html: string,
  currentLocale: string | undefined,
  targetUrl: string,
  totalPageSize: number,
  emit: EmitScanEvent
): BundleContentAnalysis | undefined => {
  const type = urlCheckType('url_unusedBundleContent', targetUrl);

  if (!currentLocale) {
    emitCheck(
      emit,
      type,
      'warning',
      'Cannot analyse bundle content: page locale not detected'
    );
    return undefined;
  }

  const analysis = analyzeBundleContent(
    chunks,
    html,
    currentLocale,
    totalPageSize
  );

  // Status is driven by the main bundle — lazy chunks with unused content are expected.
  const mainBundleMaxUnused = analysis.mainBundleChunks.reduce(
    (max, chunk) => Math.max(max, chunk.unusedPercent),
    0
  );

  const status: ScanCheckStatus =
    mainBundleMaxUnused === 0
      ? 'success'
      : mainBundleMaxUnused <= 30
        ? 'warning'
        : 'error';

  emitCheck(emit, type, status, formatBundleAnalysis(analysis));

  return analysis;
};

/* ------------------------------------------------------------------------ */
/*                            robots.txt & sitemap                           */
/* ------------------------------------------------------------------------ */

/**
 * Fetch `robots.txt` and check that neither the site nor its localized URLs
 * are blocked for Googlebot.
 *
 * - `robots_robotsPresent`
 * - `robots_noLocalizedUrlsForgotten`
 *
 * @param localizedUrls - URLs of every locale version (hreflang alternates).
 * @returns The sitemaps declared in `robots.txt`.
 */
export const checkRobots = async (
  origin: string,
  localizedUrls: string[],
  fetchOptions: ScanFetchOptions,
  emit: EmitScanEvent
): Promise<string[]> => {
  const response = await fetchText(`${origin}/robots.txt`, fetchOptions);

  if (!response?.ok) {
    emitCheck(
      emit,
      'robots_robotsPresent',
      'warning',
      response
        ? `No robots.txt found (HTTP ${response.status})`
        : 'robots.txt is unreachable'
    );
    return [];
  }

  const robots = parseRobots(response.text);
  emitCheck(emit, 'robots_robotsPresent', 'success', {
    disallow: robots.disallowedPaths,
    sitemaps: robots.sitemapUrls,
  });

  const blockedUrls = [origin, ...localizedUrls].filter((url) => {
    const parsedUrl = parseUrl(url);
    return (
      parsedUrl?.origin === origin &&
      !isPathAllowedByRobots(`${parsedUrl.pathname}${parsedUrl.search}`, robots)
    );
  });

  const isSiteBlocked = !isPathAllowedByRobots('/', robots);
  emitCheck(
    emit,
    'robots_noLocalizedUrlsForgotten',
    blockedUrls.length === 0 ? 'success' : 'error',
    blockedUrls.length === 0
      ? true
      : isSiteBlocked
        ? 'robots.txt blocks the whole site for Googlebot (Disallow: /)'
        : {
            message: 'Localized URLs blocked by robots.txt',
            urls: [...new Set(blockedUrls)],
          }
  );

  return robots.sitemapUrls;
};

/**
 * Read the sitemaps (declared in `robots.txt`, else the default locations,
 * following sitemap indexes) and check their locale coverage.
 *
 * - `sitemap_sitemapPresent`
 * - `sitemap_noLocalizedUrlsForgotten`: every locale is listed, and entries
 *   declaring alternates declare all of them
 * - `sitemap_hasAlternates` / `sitemap_hasXDefault`
 */
export const checkSitemap = async (
  origin: string,
  declaredSitemapUrls: string[],
  routing: RoutingDetection,
  fetchOptions: ScanFetchOptions,
  emit: EmitScanEvent
): Promise<void> => {
  const { fetchedSitemapUrls, entries, isTruncated } =
    await collectSitemapEntries(
      declaredSitemapUrls.length > 0
        ? declaredSitemapUrls
        : getDefaultSitemapUrls(origin),
      fetchOptions
    );

  if (fetchedSitemapUrls.length === 0) {
    emitCheck(
      emit,
      'sitemap_sitemapPresent',
      'warning',
      declaredSitemapUrls.length > 0
        ? `Sitemaps declared in robots.txt are unreachable: ${declaredSitemapUrls.join(', ')}`
        : 'No sitemap found (robots.txt Sitemap directive, /sitemap.xml, /sitemap_index.xml)'
    );
    return;
  }

  emitCheck(emit, 'sitemap_sitemapPresent', 'success', {
    sitemaps: fetchedSitemapUrls,
    urlCount: entries.length,
    isTruncated,
  });

  const knownLocales = routing.locales;
  const foundLanguages = new Set<string>();
  const entriesWithoutSelfReference: string[] = [];
  const relativeAlternates: string[] = [];

  let partiallyTranslatedCount = 0;
  let hasAlternates = false;
  let hasXDefault = false;

  for (const { loc, alternates } of entries) {
    const locLocale = getUrlLocale(loc, routing);
    if (locLocale) foundLanguages.add(getLanguageCode(locLocale));
    if (alternates.length === 0) continue;

    hasAlternates = true;
    const entryLanguages = new Set<string>();
    for (const { hreflang, href } of alternates) {
      if (!isAbsoluteUrl(href)) {
        relativeAlternates.push(`${loc}: ${hreflang} → ${href}`);
      }
      if (hreflang.toLowerCase() === 'x-default') {
        hasXDefault = true;
        continue;
      }
      entryLanguages.add(getLanguageCode(hreflang));
      foundLanguages.add(getLanguageCode(hreflang));
    }

    // Google requires each <url> to list itself among its alternates.
    const normalizedLoc = normalizeUrl(loc);
    if (!alternates.some(({ href }) => normalizeUrl(href) === normalizedLoc)) {
      entriesWithoutSelfReference.push(loc);
    }
    if (entryLanguages.size < knownLocales.length) partiallyTranslatedCount++;
  }

  // Subdomain / domain sites usually serve one sitemap per host.
  const isSingleOriginRouting =
    routing.strategy !== 'subdomain' && routing.strategy !== 'domain';

  if (knownLocales.length > 1) {
    const missingLocales = isSingleOriginRouting
      ? knownLocales.filter(
          (locale) => !foundLanguages.has(getLanguageCode(locale))
        )
      : [];
    const issues = [
      ...(missingLocales.length > 0
        ? [`Locales missing from the sitemap: ${missingLocales.join(', ')}`]
        : []),
      ...entriesWithoutSelfReference
        .slice(0, MAX_LISTED_LINKS)
        .map((loc) => `${loc} is not listed among its own alternates`),
    ];
    emitCheck(
      emit,
      'sitemap_noLocalizedUrlsForgotten',
      issues.length === 0 ? 'success' : 'warning',
      issues.length === 0
        ? {
            message: `Every locale (${knownLocales.join(', ')}) is listed`,
            partiallyTranslatedUrlCount: partiallyTranslatedCount,
          }
        : issues
    );
  }

  if (!hasAlternates) {
    emitCheck(
      emit,
      'sitemap_hasAlternates',
      'warning',
      'No alternate language links found in the sitemap'
    );
  } else if (relativeAlternates.length > 0) {
    emitCheck(emit, 'sitemap_hasAlternates', 'error', {
      message: `${relativeAlternates.length} sitemap hreflang alternates are not absolute URLs (https://…): search engines ignore them`,
      alternates: relativeAlternates.slice(0, MAX_LISTED_LINKS),
    });
  } else {
    emitCheck(emit, 'sitemap_hasAlternates', 'success', true);
  }

  emitCheck(
    emit,
    'sitemap_hasXDefault',
    hasXDefault ? 'success' : 'warning',
    hasXDefault ? true : 'No x-default hreflang in the sitemap'
  );
};
