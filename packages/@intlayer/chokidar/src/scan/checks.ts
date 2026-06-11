import { ALL_LOCALES } from '@intlayer/types/allLocales';
import { analyzeBundleContent } from './analyzeBundleContent';
import {
  type Anchor,
  extractHreflangs,
  extractHtmlDir,
  extractHtmlLang,
  hasCanonical,
} from './parseHtml';
import type {
  BundleChunkInput,
  BundleContentAnalysis,
  ScanEvent,
} from './types';

/** Format a byte count as a human-readable size. */
export const formatSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${bytes} B`;
};

/**
 * Check the `<html>` element attributes (`lang`, `dir`) and the resulting
 * current-locale signal. Returns the detected language tag.
 */
export const checkHtmlAttributes = (
  html: string,
  targetUrl: string,
  events: ScanEvent[]
): { langTag: string | undefined } => {
  const langTag = extractHtmlLang(html);
  const dirTag = extractHtmlDir(html);

  events.push({
    type: `url_htmlLang\\${targetUrl}`,
    status: langTag ? 'success' : 'error',
    details: {
      success: langTag,
      error: langTag ? undefined : 'Missing html lang attribute',
    },
  });

  events.push({
    type: `url_currentLocale\\${targetUrl}`,
    status: langTag ? 'success' : 'warning',
    details: {
      success: langTag,
      warning: langTag ? undefined : 'No locale detected',
    },
  });

  events.push({
    type: `url_htmlDir\\${targetUrl}`,
    status: dirTag ? 'success' : 'warning',
    details: {
      success: dirTag,
      warning: dirTag ? undefined : 'Missing html dir attribute',
    },
  });

  return { langTag };
};

/** Check the presence of a canonical link. */
export const checkCanonical = (
  html: string,
  targetUrl: string,
  events: ScanEvent[]
): void => {
  const present = hasCanonical(html);
  events.push({
    type: `url_hasCanonical\\${targetUrl}`,
    status: present ? 'success' : 'warning',
    details: { warning: present ? undefined : 'Missing canonical link' },
  });
};

/**
 * Check the page's hreflang structure and collect discovered locales into
 * `localesSet`.
 */
export const checkLinguisticStructure = (
  html: string,
  targetUrl: string,
  localesSet: Set<string>,
  events: ScanEvent[]
): void => {
  const langTag = extractHtmlLang(html);
  if (langTag) localesSet.add(langTag);

  const hreflangs = extractHreflangs(html);
  for (const { hreflang } of hreflangs) {
    if (hreflang !== 'x-default') localesSet.add(hreflang);
  }

  const hasXDefault = hreflangs.some((h) => h.hreflang === 'x-default');

  events.push({
    type: `url_hreflang\\${targetUrl}`,
    status: hreflangs.length > 0 ? 'success' : 'warning',
    details: {
      success: hreflangs.length > 0 ? hreflangs : undefined,
      warning: hreflangs.length === 0 ? 'No hreflang tags found' : undefined,
    },
  });

  events.push({
    type: `url_hasXDefault\\${targetUrl}`,
    status: hasXDefault ? 'success' : 'error',
    details: {
      error: hasXDefault ? undefined : 'Missing x-default hreflang link',
    },
  });
};

const normalizeHost = (host: string): string =>
  host.startsWith('www.') ? host.slice(4) : host;

const localeValues = Object.values(ALL_LOCALES) as string[];

/**
 * Check whether internal links carry a locale segment, mirroring the hosted
 * audit's URL-structure analysis but operating on parsed anchors instead of a
 * live DOM.
 */
export const checkUrlStructure = (
  anchors: Anchor[],
  origin: string,
  targetUrl: string,
  events: ScanEvent[]
): void => {
  const targetHostname = normalizeHost(new URL(origin).hostname);

  let localizedCount = 0;
  let totalInternalCount = 0;
  const nonLocalizedLinks: string[] = [];

  for (const { href } of anchors) {
    if (!href || href.startsWith('#') || href.startsWith('javascript:'))
      continue;

    try {
      const url = new URL(href, origin);
      if (normalizeHost(url.hostname) !== targetHostname) continue;

      totalInternalCount++;
      const path = url.pathname.toLowerCase();
      const hostname = url.hostname.toLowerCase();

      const hasLocaleInPath = localeValues.some((locale) => {
        const l = locale.toLowerCase();
        return path === `/${l}` || path.includes(`/${l}/`);
      });
      const hasLocaleInSubdomain = localeValues.some((locale) => {
        const l = locale.toLowerCase();
        return hostname.startsWith(`${l}.`) || hostname.includes(`.${l}.`);
      });

      if (hasLocaleInPath || hasLocaleInSubdomain) {
        localizedCount++;
      } else {
        nonLocalizedLinks.push(href);
      }
    } catch {
      /* ignore malformed URLs */
    }
  }

  const hasLocalizedLinks = localizedCount > 0;
  const allAnchorsLocalized =
    totalInternalCount === 0 || localizedCount === totalInternalCount;

  events.push({
    type: `url_hasLocalizedLinks\\${targetUrl}`,
    status: hasLocalizedLinks ? 'success' : 'warning',
    details: {
      success: hasLocalizedLinks
        ? `${localizedCount} localized links found out of ${totalInternalCount} internal links`
        : undefined,
      warning: hasLocalizedLinks ? undefined : 'No localized links found',
    },
  });

  events.push({
    type: `url_allAnchorsLocalized\\${targetUrl}`,
    status: allAnchorsLocalized ? 'success' : 'warning',
    details: {
      warning: allAnchorsLocalized
        ? undefined
        : {
            message: 'Some internal links are not localized',
            links: nonLocalizedLinks,
          },
    },
  });
};

/**
 * Analyze the JavaScript bundles for unused locale content and emit the
 * corresponding event. Returns the analysis so callers can report on it.
 */
export const checkBundleContent = (
  chunks: BundleChunkInput[],
  html: string,
  currentLocale: string | undefined,
  targetUrl: string,
  totalPageSize: number,
  events: ScanEvent[]
): BundleContentAnalysis | undefined => {
  if (!currentLocale) {
    events.push({
      type: `url_unusedBundleContent\\${targetUrl}`,
      status: 'warning',
      details: {
        warning: 'Cannot analyse bundle content: page locale not detected',
      },
    });
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
    (max, c) => Math.max(max, c.unusedPercent),
    0
  );

  const status =
    mainBundleMaxUnused === 0
      ? 'success'
      : mainBundleMaxUnused <= 30
        ? 'warning'
        : 'error';

  events.push({
    type: `url_unusedBundleContent\\${targetUrl}`,
    status,
    details: { [status]: analysis },
  });

  return analysis;
};

/** Fetch and check `robots.txt`, emitting robots-related events. */
export const checkRobots = async (
  origin: string,
  discoveredLocales: Set<string>,
  userAgent: string,
  events: ScanEvent[]
): Promise<void> => {
  let robotsPresent = false;
  let noLocalizedUrlsForgotten = true;
  const errors: string[] = [];

  try {
    const response = await fetch(`${origin}/robots.txt`, {
      headers: { 'User-Agent': userAgent },
    });

    if (response.ok) {
      robotsPresent = true;
      const content = await response.text();

      if (content && discoveredLocales.size > 0) {
        const disallowedPaths = content
          .split('\n')
          .map((line) => line.trim().toLowerCase())
          .filter((line) => line.startsWith('disallow:'))
          .map((line) => line.slice('disallow:'.length).trim());

        for (const locale of discoveredLocales) {
          for (const path of disallowedPaths) {
            if (path === `/${locale}` || path === `/${locale}/`) {
              noLocalizedUrlsForgotten = false;
              errors.push(
                `Locale path "${locale}" appears to be blocked in robots.txt: ${path}`
              );
            }
          }
        }
      }
    }
  } catch (error) {
    errors.push(
      `Failed to fetch robots.txt: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  events.push({
    type: 'robots_robotsPresent',
    status: robotsPresent ? 'success' : 'warning',
    details: {
      warning: robotsPresent ? undefined : 'No robots.txt found',
      error: errors.length > 0 ? errors : undefined,
    },
  });

  if (robotsPresent) {
    events.push({
      type: 'robots_noLocalizedUrlsForgotten',
      status: noLocalizedUrlsForgotten ? 'success' : 'error',
      details: { error: noLocalizedUrlsForgotten ? undefined : errors },
    });
  }
};

/** Fetch and check `sitemap.xml`, emitting sitemap-related events. */
export const checkSitemap = async (
  origin: string,
  discoveredLocales: Set<string>,
  userAgent: string,
  events: ScanEvent[]
): Promise<void> => {
  let sitemapPresent = false;
  let hasXDefault = false;
  let hasAlternates = false;
  let noLocalizedUrlsForgotten = true;
  const errors: string[] = [];

  try {
    const response = await fetch(`${origin}/sitemap.xml`, {
      headers: { 'User-Agent': userAgent },
    });

    if (response.ok) {
      sitemapPresent = true;
      const content = await response.text();

      const hreflangMatches = content.match(/hreflang\s*=\s*"([^"]+)"/gi) ?? [];
      const hreflangs = hreflangMatches.map((m) =>
        m.replace(/hreflang\s*=\s*"/i, '').replace(/"$/, '')
      );
      hasAlternates = hreflangs.length > 0;
      hasXDefault = hreflangs.includes('x-default');

      if (discoveredLocales.size > 0) {
        const urlBlocks = content.match(/<url\b[\s\S]*?<\/url>/gi) ?? [];
        const allFoundLocales = new Set<string>();
        let anyUrlMissingLocale = false;

        for (const block of urlBlocks) {
          const localesInUrl = new Set<string>();

          for (const hreflang of block.match(/hreflang\s*=\s*"([^"]+)"/gi) ??
            []) {
            const value = hreflang
              .replace(/hreflang\s*=\s*"/i, '')
              .replace(/"$/, '');
            if (value !== 'x-default') {
              localesInUrl.add(value);
              allFoundLocales.add(value);
            }
          }

          const loc = block.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim();
          if (loc) {
            try {
              const firstSegment = new URL(loc).pathname
                .split('/')
                .filter(Boolean)[0];
              if (firstSegment && discoveredLocales.has(firstSegment)) {
                localesInUrl.add(firstSegment);
                allFoundLocales.add(firstSegment);
              }
            } catch {
              /* invalid loc URL, skip */
            }
          }

          const missing = [...discoveredLocales].filter(
            (locale) => !localesInUrl.has(locale)
          );
          if (missing.length > 0 && missing.length < discoveredLocales.size) {
            anyUrlMissingLocale = true;
          }
        }

        const completelyMissing = [...discoveredLocales].filter(
          (locale) => !allFoundLocales.has(locale)
        );
        if (anyUrlMissingLocale || completelyMissing.length > 0) {
          noLocalizedUrlsForgotten = false;
          if (completelyMissing.length > 0) {
            errors.push(
              `The following locales are completely missing from the sitemap: ${completelyMissing.join(', ')}`
            );
          }
        }
      }
    }
  } catch (error) {
    errors.push(
      `Failed to fetch sitemap.xml: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  events.push({
    type: 'sitemap_sitemapPresent',
    status: sitemapPresent ? 'success' : 'warning',
    details: {
      warning: sitemapPresent ? undefined : 'No sitemap.xml found',
      error: errors.length > 0 ? errors : undefined,
    },
  });

  if (sitemapPresent) {
    events.push({
      type: 'sitemap_noLocalizedUrlsForgotten',
      status: noLocalizedUrlsForgotten ? 'success' : 'warning',
      details: { warning: noLocalizedUrlsForgotten ? undefined : errors },
    });

    events.push({
      type: 'sitemap_hasXDefault',
      status: hasXDefault ? 'success' : 'warning',
      details: {
        warning: hasXDefault ? undefined : 'No x-default hreflang in sitemap',
      },
    });

    events.push({
      type: 'sitemap_hasAlternates',
      status: hasAlternates ? 'success' : 'warning',
      details: {
        warning: hasAlternates
          ? undefined
          : 'No alternate language links found in sitemap',
      },
    });
  }
};
