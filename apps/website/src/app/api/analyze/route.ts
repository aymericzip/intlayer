import { getIntlayerAPIProxy } from '@intlayer/api';
import { Locales } from 'intlayer';
import type { NextRequest } from 'next/server';
import puppeteer, { type Browser } from 'puppeteer';

// Helper function to save audit data
const saveAuditData = async (
  _req: NextRequest,
  url: string,
  summary: any,
  score: number,
  label: string
) => {
  try {
    const auditApiKey = process.env.AUDIT_API_KEY;

    if (!auditApiKey) {
      console.warn('AUDIT_API_KEY not configured, skipping audit save');
      return;
    }

    const api = getIntlayerAPIProxy(
      {
        headers: {
          'x-audit-api-key': auditApiKey,
        } as HeadersInit,
      },
      undefined
    );

    await api.audit.createAudit({
      url,
      summary,
      score,
      label,
    });
  } catch (error) {
    // Silently fail - don't break the analysis flow if saving fails
    console.error('Failed to save audit data:', error);
  }
};

const allLocales = Object.values(Locales.ALL_LOCALES).join('|');

// Normalize a href to absolute and return pathname for grouping
const normalizeHref = (href: string, baseUrl: string) => {
  try {
    const absolute = href.startsWith('http')
      ? new URL(href)
      : new URL(href, baseUrl);
    return {
      absoluteHref: absolute.href,
      pathname: absolute.pathname || '/',
    };
  } catch {
    return { absoluteHref: href, pathname: href };
  }
};

// Lightweight XML parser helpers for sitemaps
const parseSitemapXml = (xml: string) => {
  const isIndex = /<sitemapindex[\s\S]*?>/i.test(xml);
  const locMatches = Array.from(
    xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)
  ).map((m) => m[1].trim());
  const hasAlternate =
    /<xhtml:link[^>]+rel=["']alternate["'][^>]+hreflang=/i.test(xml);
  const hasXDefault = /hreflang=["']x-default["']/i.test(xml);
  return {
    isIndex,
    locs: locMatches,
    hasAlternate,
    hasXDefault,
  };
};

// Helper function to send SSE messages
const sendSSE = (
  controller: ReadableStreamDefaultController,
  data: unknown
) => {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  controller.enqueue(new TextEncoder().encode(message));
};

const wait = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 300));

// Helpers
// (legacy) URL-based locale detection removed per requirements

const deriveLocaleFromLangTag = (
  lang: string | null | undefined
): string | null => {
  if (!lang || lang === 'not found') return null;
  const code = String(lang).toLowerCase().replace('_', '-').split('-')[0];
  const re = new RegExp(`^(?:${allLocales})$`, 'i');
  return re.test(code) ? code : null;
};

const parseRobotsTxt = (robotsTxt: string) => {
  const disallow = Array.from(
    robotsTxt.matchAll(/^\s*Disallow:\s*([^\s#]+)/gim)
  ).map((m) => m[1].trim());
  const allow = Array.from(robotsTxt.matchAll(/^\s*Allow:\s*([^\s#]+)/gim)).map(
    (m) => m[1].trim()
  );
  return { disallow, allow };
};

const parseAlternateLinksInSitemap = (xml: string) => {
  const altMatches = Array.from(
    xml.matchAll(
      /<xhtml:link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*\/>/gim
    )
  );
  const alternates = altMatches.map((m) => ({
    hreflang: m[1].toLowerCase(),
    href: m[2],
  }));
  const valid = alternates.every(
    (a) =>
      a.hreflang === 'x-default' ||
      new RegExp(`^(?:${allLocales})$`, 'i').test(a.hreflang)
  );
  const hasXDefault = alternates.some((a) => a.hreflang === 'x-default');
  return { alternates, valid, hasXDefault };
};

// Extract page metadata (title, description, ogImage)
const extractPageMetadata = ($: any, baseUrl: string) => {
  const title = $('title').text();
  const metaDescription = $("meta[name='description']").attr('content') || '';
  const ogImage =
    $("meta[property='og:image']").attr('content') ||
    $("meta[name='twitter:image']").attr('content') ||
    $("link[rel='icon']").attr('href') ||
    $("link[rel='shortcut icon']").attr('href') ||
    null;
  const absoluteOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : new URL(ogImage, baseUrl).href
    : null;

  return {
    title: title.slice(0, 80),
    metaDescription: metaDescription.slice(0, 100),
    ogImage: absoluteOgImage,
  };
};

// Analyze linguistic structure (lang tags, hreflangs, alternates)
const analyzeLinguisticStructure = (
  $: any,
  baseUrl: string,
  localesSet: Set<string>
) => {
  const langTag = $('html').attr('lang') || 'not found';
  const dirTag = $('html').attr('dir') || null;
  const $alternateLinks = $("link[rel='alternate'][hreflang]");
  const alternates: Record<string, string> = {};
  let hasXDefault = false;

  $alternateLinks.each((_: number, el: any) => {
    const hreflang = ($(el).attr('hreflang') || '').trim();
    const href = ($(el).attr('href') || '').trim();
    if (!hreflang || !href) return;
    if (hreflang.toLowerCase() === 'x-default') {
      hasXDefault = true;
    } else {
      localesSet.add(hreflang.toLowerCase());
    }
    const { absoluteHref } = normalizeHref(href, baseUrl);
    alternates[hreflang] = absoluteHref;
  });

  const hreflangDiversity = Object.keys(alternates).filter(
    (k) => k.toLowerCase() !== 'x-default'
  ).length;

  return {
    langTag,
    dirTag,
    htmlLangPresent: langTag !== 'not found',
    htmlDirPresent: Boolean(dirTag),
    currentLocale: deriveLocaleFromLangTag(langTag),
    hreflangs: $alternateLinks.length,
    hreflangDiversity,
    hasXDefault,
    alternates,
  };
};

// Analyze metadata (canonical, flag icons, robots meta, sitemap links)
const analyzeMetadata = ($: any) => {
  const textContent = $('body').text().replace(/\s+/g, ' ');
  const totalChars = textContent.length;
  const textToImageRatio = totalChars / Math.max($('img').length * 1000, 1);
  const hasCanonical = $("link[rel='canonical']").length > 0;
  const hasFlagIcons =
    $("img[src*='flag'], img[alt*='flag'], svg[aria-label*='flag']").length > 0;
  const hasRobotsMeta = $("meta[name='robots']").length > 0;
  const sitemapLinksInHead = $("link[rel='sitemap'][href]")
    .map((_: number, el: any) => ($(el).attr('href') || '').trim())
    .get()
    .filter(Boolean);

  return {
    textToImageRatio: textToImageRatio.toFixed(2),
    hasCanonical,
    hasFlagIcons,
    hasRobotsMeta,
    hasSitemapLinkInHead: sitemapLinksInHead.length > 0,
    sitemapLinkHrefs: sitemapLinksInHead,
  };
};

// Detect language selector on the page
const detectLanguageSelector = ($: any) => {
  const potentialSelectors = $(
    'nav, header, footer, div, ul, li, button, a, span'
  ).filter((_: number, el: any) => {
    const text = $(el).text().trim().toLowerCase();
    const matches = text.match(
      /\b(en|english|fr|français|es|español|de|deutsch|it|italiano|jp|ja|日本語)\b/g
    );
    return matches !== null && matches.length > 1;
  });

  if (potentialSelectors.length > 0) {
    return true;
  }

  // Proximity detection: at least 2 language codes visible on the page
  const allTextNodes = $('body *')
    .map((_: number, el: any) => $(el).text().trim())
    .get()
    .filter(Boolean);

  const languageTokens = allTextNodes.filter((t: string) =>
    new RegExp(`\\b(${allLocales})\\b`, 'i').test(t)
  );

  return languageTokens.length >= 2;
};

// Analyze URL structure and anchors
const analyzeUrlStructure = async (
  page: any,
  origin: string
): Promise<{
  urlStructureLocalized: boolean;
  hasLocalizedLinks: boolean;
  allAnchorsLocalized: boolean;
  anchorsAnalysis: {
    allLocalized: boolean;
    nonLocalizedUrls: string[];
    internalCount: number;
    localizedCount: number;
  };
  localizedLinksAnalysis: {
    hasLocalized: boolean;
    sampleLinks: string[];
    totalLinks: number;
  };
}> => {
  const urlStructureAnalysis = await page.evaluate((locales: string) => {
    const links = Array.from(document.querySelectorAll('a[href]')).map(
      (a) => a.getAttribute('href') || ''
    );
    const localizedLinks = links.filter((href) =>
      new RegExp(`^\\/(${locales})\\/`).test(href)
    );
    const sampleUrls = links.slice(0, 10).filter(Boolean);
    return {
      hasLocalized: localizedLinks.length > 0,
      sampleUrls,
      localizedCount: localizedLinks.length,
      totalCount: links.length,
    };
  }, allLocales);

  const localizedLinksAnalysis = await page.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    const hasLocalized = allLinks.some((a) =>
      /\/(fr|es|de|ja|it)\//.test(a.getAttribute('href') || '')
    );
    const sampleLinks = allLinks
      .slice(0, 10)
      .map((a) => a.getAttribute('href'))
      .filter(Boolean);
    return {
      hasLocalized,
      sampleLinks,
      totalLinks: allLinks.length,
    };
  });

  const anchorsAnalysis = await page.evaluate(
    (originStr: string, locales: string) => {
      const isInternal = (href: string) => {
        try {
          if (
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('#')
          )
            return false;
          if (href.startsWith('http'))
            return new URL(href).origin === originStr;
          return true;
        } catch {
          return false;
        }
      };
      const anchors = Array.from(
        document.querySelectorAll('a[href]')
      ) as HTMLAnchorElement[];
      const localizedRe = new RegExp(`^/(?:${locales})/`, 'i');
      let internalCount = 0;
      let localizedCount = 0;
      const nonLocalizedUrls: string[] = [];
      for (const a of anchors) {
        const href = a.getAttribute('href') || '';
        if (!isInternal(href)) continue;
        internalCount++;
        if (localizedRe.test(href)) {
          localizedCount++;
        } else {
          if (nonLocalizedUrls.length < 10) {
            nonLocalizedUrls.push(href);
          }
        }
      }
      if (internalCount === 0)
        return { allLocalized: false, nonLocalizedUrls: [] };
      return {
        allLocalized: localizedCount === internalCount,
        nonLocalizedUrls,
        internalCount,
        localizedCount,
      };
    },
    origin,
    allLocales
  );

  return {
    urlStructureLocalized: urlStructureAnalysis.hasLocalized,
    hasLocalizedLinks: localizedLinksAnalysis.hasLocalized,
    allAnchorsLocalized: anchorsAnalysis.allLocalized,
    anchorsAnalysis,
    localizedLinksAnalysis,
  };
};

// Fetch and process robots.txt
const fetchAndProcessRobotsTxt = async (
  origin: string,
  discoveredLocales: string[]
) => {
  let robotsTxt = '';
  try {
    const r = await fetch(`${origin}/robots.txt`);
    robotsTxt = r.ok ? await r.text() : '';
  } catch {
    robotsTxt = '';
  }

  const robotsHasLocales = /(\/(?:fr|es|de|ja|it)\/)/i.test(robotsTxt);
  const robotsParsed = parseRobotsTxt(robotsTxt);
  const disallowSet = new Set(robotsParsed.disallow);
  const robotsDisallowWithoutLocaleAlternates: string[] = [];

  for (const p of robotsParsed.disallow) {
    const hasAlt = discoveredLocales.some((loc: string) =>
      disallowSet.has(
        `/${loc}${p.startsWith('/') ? '' : '/'}${p.replace(/^\//, '')}`
      )
    );
    if (!hasAlt) robotsDisallowWithoutLocaleAlternates.push(p);
  }

  const sitemapUrlsFromRobots = Array.from(
    robotsTxt.matchAll(/^sitemap:\s*([^\s#]+)/gim)
  ).map((m: RegExpMatchArray) => m[1]);

  return {
    robotsTxt: robotsTxt.slice(0, 4000),
    robotsHasLocales,
    robotsDisallow: robotsParsed.disallow,
    robotsDisallowWithoutLocaleAlternates,
    sitemapUrlsFromRobots,
  };
};

// Fetch and process sitemaps recursively
const fetchAndProcessSitemaps = async (
  sitemapCandidates: string[]
): Promise<{
  sitemaps: string[];
  sitemapHasAlternate: boolean;
  sitemapHasXDefault: boolean;
  sitemapAlternateValid: boolean;
  sitemapUrls: string[];
}> => {
  const collectedSitemapUrls = new Set<string>();
  let sitemapHasAlternate = false;
  let sitemapHasXDefault = false;
  let sitemapAlternateValid = false;

  const fetchSitemapRecursive = async (
    sitemapUrl: string,
    depth = 0
  ): Promise<void> => {
    if (depth > 2) return;
    try {
      const res = await fetch(sitemapUrl);
      if (!res.ok) return;
      const xml = await res.text();
      const parsed = parseSitemapXml(xml);
      sitemapHasAlternate = sitemapHasAlternate || parsed.hasAlternate;
      sitemapHasXDefault = sitemapHasXDefault || parsed.hasXDefault;
      if (parsed.hasAlternate) {
        const altParsed = parseAlternateLinksInSitemap(xml);
        sitemapAlternateValid = sitemapAlternateValid || altParsed.valid;
        sitemapHasXDefault = sitemapHasXDefault || altParsed.hasXDefault;
      }
      if (parsed.isIndex) {
        for (const loc of parsed.locs) {
          await fetchSitemapRecursive(loc, depth + 1);
        }
      } else {
        for (const u of parsed.locs) {
          collectedSitemapUrls.add(u);
        }
      }
    } catch {
      // ignore
    }
  };

  for (const s of sitemapCandidates) {
    await fetchSitemapRecursive(s);
  }

  return {
    sitemaps: Array.from(sitemapCandidates),
    sitemapHasAlternate,
    sitemapHasXDefault,
    sitemapAlternateValid,
    sitemapUrls: Array.from(collectedSitemapUrls),
  };
};

// Process pages from sitemap
const processPagesFromSitemap = async (
  page: any,
  sitemapUrls: string[],
  localesSet: Set<string>,
  pagesMap: Map<string, { default: string; alternate: Record<string, string> }>,
  load: any
) => {
  const maxPagesToProcess = Math.min(50, sitemapUrls.length);
  for (let i = 0; i < maxPagesToProcess; i++) {
    const url = sitemapUrls[i];
    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      const content = await page.content();
      const $$ = load(content);
      const altMap: Record<string, string> = {};
      let xDefaultHref: string | null = null;
      $$("link[rel='alternate'][hreflang]").each((_: number, el: any) => {
        const hreflang = ($$(el).attr('hreflang') || '').trim();
        const href = ($$(el).attr('href') || '').trim();
        if (!hreflang || !href) return;
        const { absoluteHref } = normalizeHref(href, url);
        if (hreflang.toLowerCase() === 'x-default') {
          xDefaultHref = absoluteHref;
        } else {
          localesSet.add(hreflang.toLowerCase());
          altMap[hreflang] = absoluteHref;
        }
      });
      const defaultKey = xDefaultHref
        ? new URL(xDefaultHref).pathname || '/'
        : new URL(url).pathname || '/';
      const existing = pagesMap.get(defaultKey) || {
        default: defaultKey,
        alternate: {},
      };
      existing.alternate = { ...existing.alternate, ...altMap };
      pagesMap.set(defaultKey, existing);
    } catch {
      // ignore
    }
  }
};

// Detect errors based on analysis results
const detectErrors = (
  summary: any,
  linguisticData: ReturnType<typeof analyzeLinguisticStructure>,
  metadataData: ReturnType<typeof analyzeMetadata>,
  urlStructureData: Awaited<ReturnType<typeof analyzeUrlStructure>>,
  alternatesOnRoot: Record<string, string>
): Record<string, { message: string; details?: any }> => {
  const errors: Record<string, { message: string; details?: any }> = {};

  if (!linguisticData.htmlLangPresent) {
    errors.htmlLangPresent = {
      message: 'HTML lang attribute is missing',
      details: {
        currentValue: linguisticData.langTag,
        recommendation:
          'Add lang attribute to <html> tag (e.g., <html lang="en">)',
      },
    };
  }

  if (linguisticData.hreflangs === 0) {
    errors.hreflangs = {
      message: 'No hreflang alternates found in <head>',
      details: {
        recommendation:
          'Add <link rel="alternate" hreflang="..." href="..."> tags for different language versions',
      },
    };
  }

  if (linguisticData.hreflangDiversity <= 1) {
    errors.hreflangDiversity = {
      message: `Only ${linguisticData.hreflangDiversity} locale(s) found in hreflang tags`,
      details: {
        count: linguisticData.hreflangDiversity,
        presentLocales: Object.keys(alternatesOnRoot).filter(
          (k) => k.toLowerCase() !== 'x-default'
        ),
        recommendation:
          'Add alternates for multiple locales (at least 2-3 different language versions)',
      },
    };
  }

  if (!linguisticData.hasXDefault) {
    errors.hasXDefault = {
      message: 'Missing x-default hreflang tag',
      details: {
        presentAlternates: Object.keys(alternatesOnRoot),
        recommendation:
          'Add <link rel="alternate" hreflang="x-default" href="..."> to specify default language version',
      },
    };
  }

  if (!metadataData.hasCanonical) {
    errors.hasCanonical = {
      message: 'Missing canonical link in <head>',
      details: {
        recommendation:
          'Add <link rel="canonical" href="..."> to prevent duplicate content issues',
      },
    };
  }

  if (!metadataData.hasFlagIcons) {
    errors.hasFlagIcons = {
      message: 'No flag icons detected on the page',
      details: {
        recommendation:
          'Consider adding flag icons (<img> with "flag" in src/alt, or SVG with "flag" in aria-label) for better UX in language selection',
      },
    };
  }

  if (!summary.hasLangSelector) {
    errors.hasLangSelector = {
      message: 'No language selector detected on the page',
      details: {
        recommendation:
          'Add a visible language selector (dropdown, menu, or buttons with language names/codes) for better user experience',
      },
    };
  }

  if (!urlStructureData.urlStructureLocalized) {
    errors.urlStructureLocalized = {
      message: 'No locale prefixes found in URLs',
      details: {
        sampleUrls: urlStructureData.localizedLinksAnalysis.sampleLinks,
        totalLinks: urlStructureData.localizedLinksAnalysis.totalLinks,
        recommendation: 'Use locale prefixes in URLs (e.g., /en/, /fr/, /es/)',
      },
    };
  }

  if (!urlStructureData.hasLocalizedLinks) {
    errors.hasLocalizedLinks = {
      message: 'No localized links found on the page',
      details: {
        sampleLinks: urlStructureData.localizedLinksAnalysis.sampleLinks,
        totalLinks: urlStructureData.localizedLinksAnalysis.totalLinks,
        recommendation:
          'Ensure internal links include locale prefixes (e.g., /en/, /fr/, /es/)',
      },
    };
  }

  if (
    !urlStructureData.anchorsAnalysis.allLocalized &&
    urlStructureData.anchorsAnalysis.internalCount &&
    urlStructureData.anchorsAnalysis.localizedCount !== undefined
  ) {
    errors.allAnchorsLocalized = {
      message: `${urlStructureData.anchorsAnalysis.internalCount - urlStructureData.anchorsAnalysis.localizedCount} of ${urlStructureData.anchorsAnalysis.internalCount} internal links are not localized`,
      details: {
        nonLocalizedUrls: urlStructureData.anchorsAnalysis.nonLocalizedUrls,
        totalNonLocalized:
          urlStructureData.anchorsAnalysis.internalCount -
          urlStructureData.anchorsAnalysis.localizedCount,
        recommendation: 'Ensure all internal links use locale-specific URLs',
      },
    };
  }

  return errors;
};

// Calculate localization score
const calculateScore = (
  summary: any,
  isOnlyPage: boolean
): { score: number; label: string } => {
  const criteria = isOnlyPage
    ? [
        summary.htmlLangPresent,
        summary.hreflangs > 0,
        summary.hreflangDiversity > 1,
        Number(summary.textToImageRatio) > 0.5,
        summary.metaDescription.length > 0,
        summary.hasCanonical,
        summary.hasLangSelector,
        summary.hasFlagIcons,
        summary.urlStructureLocalized,
        summary.hasLocalizedLinks,
      ]
    : [
        summary.htmlLangPresent,
        summary.hreflangs > 0,
        summary.hreflangDiversity > 1,
        Number(summary.textToImageRatio) > 0.5,
        summary.metaDescription.length > 0,
        summary.hasCanonical,
        summary.hasLangSelector,
        summary.hasFlagIcons,
        summary.urlStructureLocalized,
        summary.sitemapHasAlternate,
        summary.robotsHasLocales,
        summary.hasLocalizedLinks,
        summary.localesCount > 1,
      ];

  const weightedScore =
    (criteria.filter(Boolean).length + (summary.hasLangSelector ? 1 : 0)) /
    (criteria.length + 1);

  const score = Math.round(weightedScore * 100);
  const label =
    score < 40
      ? '🌱 Local only'
      : score < 70
        ? '🌍 Ready to expand'
        : '🚀 Global-ready';

  return { score, label };
};

// Analyze a single page (for POST handler)
const analyzeSinglePage = async (
  page: any,
  url: string,
  load: any
): Promise<{
  summary: any;
  errors: Record<string, { message: string; details?: any }>;
}> => {
  const origin = new URL(url).origin;
  const localesSet = new Set<string>();
  const summary: any = {};
  const errors: Record<string, { message: string; details?: any }> = {};

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  const html = await page.content();
  const $ = load(html);

  // Extract metadata
  const pageMetadata = extractPageMetadata($, url);
  Object.assign(summary, pageMetadata);
  summary.domainAccessible = true;

  // Analyze linguistic structure
  const linguisticData = analyzeLinguisticStructure($, url, localesSet);
  const alternatesOnRoot = linguisticData.alternates;
  Object.assign(summary, {
    langTag: linguisticData.langTag,
    htmlLangPresent: linguisticData.htmlLangPresent,
    htmlDir: linguisticData.dirTag,
    htmlDirPresent: linguisticData.htmlDirPresent,
    currentLocale: linguisticData.currentLocale,
    hasRootXDefault: linguisticData.hasXDefault,
    hasXDefault: linguisticData.hasXDefault,
    hreflangs: linguisticData.hreflangs,
    hreflangDiversity: linguisticData.hreflangDiversity,
    locales: Array.from(localesSet),
    localesCount: localesSet.size,
  });

  // Analyze metadata
  const metadataData = analyzeMetadata($);
  Object.assign(summary, metadataData);

  // Detect language selector
  summary.hasLangSelector = detectLanguageSelector($);

  // Analyze URL structure
  const urlStructureData = await analyzeUrlStructure(page, origin);
  summary.urlStructureLocalized = urlStructureData.urlStructureLocalized;
  summary.hasLocalizedLinks = urlStructureData.hasLocalizedLinks;
  summary.allAnchorsLocalized = urlStructureData.allAnchorsLocalized;

  // Detect errors
  Object.assign(
    errors,
    detectErrors(
      summary,
      linguisticData,
      metadataData,
      urlStructureData,
      alternatesOnRoot
    )
  );

  // Build discovered URLs
  const discoveredSet = new Set<string>();
  for (const u of Object.values(alternatesOnRoot)) {
    discoveredSet.add(u);
  }
  summary.discoveredUrls = Array.from(discoveredSet);

  return { summary, errors };
};

// Format error message from exception
const formatErrorMessage = (err: unknown): string => {
  if (!(err instanceof Error)) {
    return 'Failed to fetch or analyze site.';
  }

  const errorString = err.message.toLowerCase();

  if (
    errorString.includes('err_name_not_resolved') ||
    errorString.includes('getaddrinfo') ||
    errorString.includes('enotfound')
  ) {
    return 'Domain name could not be resolved. Please check the URL and try again.';
  } else if (
    errorString.includes('timeout') ||
    errorString.includes('timed out')
  ) {
    return 'Request timed out. The site took too long to respond.';
  } else if (
    errorString.includes('refused') ||
    errorString.includes('econnrefused')
  ) {
    return 'Connection refused. The server is not accepting connections.';
  } else if (
    errorString.includes('certificate') ||
    errorString.includes('ssl') ||
    errorString.includes('tls')
  ) {
    return 'SSL/Certificate error. The site may have an invalid certificate.';
  } else if (
    errorString.includes('net::') ||
    errorString.includes('protocol error')
  ) {
    return `Network error: ${err.message}`;
  } else {
    return `Error: ${err.message}`;
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');
  const onlyPage =
    searchParams.get('onlyPage') === '1' ||
    searchParams.get('onlyPage') === 'true';

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate URL format
  try {
    const parsedUrl = new URL(targetUrl);
    if (!parsedUrl.protocol.startsWith('http')) {
      return new Response(
        JSON.stringify({ error: 'URL must use HTTP or HTTPS protocol' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create SSE stream
  const stream = new ReadableStream({
    async start(controller) {
      let browser: Browser | undefined;
      try {
        // Initialize summary object
        const summary: any = {};
        const errors: Record<string, { message: string; details?: any }> = {};
        const origin = new URL(targetUrl).origin;
        const localesSet = new Set<string>();
        const pagesMap = new Map<
          string,
          { default: string; alternate: Record<string, string> }
        >();
        // Base value of the array is the root
        pagesMap.set('/', { default: '/', alternate: {} });

        // Step 1: Fetching and parsing HTML
        sendSSE(controller, {
          type: 'progress',
          step: 0,
          progress: 10,
          message: 'Checking domain and parsing root page...',
        });

        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(targetUrl, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        const html = await page.content();
        const { load } = await import('cheerio');
        const $ = load(html);

        // Extract page metadata
        const pageMetadata = extractPageMetadata($, targetUrl);
        Object.assign(summary, pageMetadata);
        summary.domainAccessible = true;

        // Extract HTML lang and dir attributes early (simple attribute reads)
        const langTag = $('html').attr('lang') || 'not found';
        const dirTag = $('html').attr('dir') || null;
        const htmlLangPresent = langTag !== 'not found';
        const htmlDirPresent = Boolean(dirTag);
        const currentLocale = deriveLocaleFromLangTag(langTag);

        Object.assign(summary, {
          langTag,
          htmlLangPresent,
          htmlDir: dirTag,
          htmlDirPresent,
          currentLocale,
        });

        sendSSE(controller, {
          type: 'data',
          field: 'ogImage',
          value: pageMetadata.ogImage,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'title',
          value: pageMetadata.title,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'metaDescription',
          value: pageMetadata.metaDescription,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'domainAccessible',
          value: true,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'langTag',
          value: langTag,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'htmlLangPresent',
          value: htmlLangPresent,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'htmlDirPresent',
          value: htmlDirPresent,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'htmlDir',
          value: dirTag,
        });

        await wait();

        sendSSE(controller, {
          type: 'data',
          field: 'currentLocale',
          value: currentLocale,
        });

        // Step 2: Analyzing linguistic structure
        await wait();

        sendSSE(controller, {
          type: 'progress',
          step: 1,
          progress: 25,
          message: 'Analyzing root linguistic structure and alternates...',
        });

        const linguisticData = analyzeLinguisticStructure(
          $,
          targetUrl,
          localesSet
        );
        const alternatesOnRoot = linguisticData.alternates;
        Object.assign(summary, {
          langTag: linguisticData.langTag,
          htmlLangPresent: linguisticData.htmlLangPresent,
          htmlDir: linguisticData.dirTag,
          htmlDirPresent: linguisticData.htmlDirPresent,
          currentLocale: linguisticData.currentLocale,
          hreflangs: linguisticData.hreflangs,
          hreflangDiversity: linguisticData.hreflangDiversity,
          hasRootXDefault: linguisticData.hasXDefault,
          hasXDefault: linguisticData.hasXDefault,
          locales: Array.from(localesSet),
          localesCount: localesSet.size,
        });

        // Update root page alternates
        const rootEntry = pagesMap.get('/')!;
        rootEntry.alternate = { ...rootEntry.alternate, ...alternatesOnRoot };
        pagesMap.set('/', rootEntry);

        // langTag, htmlDirPresent, htmlDir, and currentLocale already sent earlier
        sendSSE(controller, {
          type: 'data',
          field: 'hreflangs',
          value: linguisticData.hreflangs,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'hasXDefault',
          value: linguisticData.hasXDefault,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'hreflangDiversity',
          value: linguisticData.hreflangDiversity,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'localesCount',
          value: summary.localesCount,
        });

        // Step 3: Checking metadata
        await wait();

        sendSSE(controller, {
          type: 'progress',
          step: 2,
          progress: 40,
          message: 'Checking metadata and content ratios...',
        });

        const metadataData = analyzeMetadata($);
        Object.assign(summary, metadataData);

        sendSSE(controller, {
          type: 'data',
          field: 'hasCanonical',
          value: metadataData.hasCanonical,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'hasFlagIcons',
          value: metadataData.hasFlagIcons,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'hasRobotsMeta',
          value: metadataData.hasRobotsMeta,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'hasSitemapLinkInHead',
          value: metadataData.hasSitemapLinkInHead,
        });

        // Step 4: Detecting language selector
        await wait();

        sendSSE(controller, {
          type: 'progress',
          step: 3,
          progress: 55,
          message: 'Detecting language selector...',
        });

        summary.hasLangSelector = detectLanguageSelector($);

        sendSSE(controller, {
          type: 'data',
          field: 'hasLangSelector',
          value: summary.hasLangSelector,
        });

        // Step 5: URL structure and optionally site-wide Robots/Sitemap
        await wait();

        sendSSE(controller, {
          type: 'progress',
          step: 4,
          progress: 70,
          message: 'Checking URL structures...',
        });

        const urlStructureData = await analyzeUrlStructure(page, origin);
        summary.urlStructureLocalized = urlStructureData.urlStructureLocalized;
        summary.hasLocalizedLinks = urlStructureData.hasLocalizedLinks;
        summary.allAnchorsLocalized = urlStructureData.allAnchorsLocalized;

        sendSSE(controller, {
          type: 'data',
          field: 'urlStructureLocalized',
          value: urlStructureData.urlStructureLocalized,
        });
        sendSSE(controller, {
          type: 'data',
          field: 'hasLocalizedLinks',
          value: urlStructureData.hasLocalizedLinks,
        });

        if (!onlyPage) {
          // Fetch and process robots.txt
          const discoveredLocales =
            summary.locales.length > 0
              ? summary.locales
              : Object.values(Locales.ALL_LOCALES).map((l: string) =>
                  l.toLowerCase()
                );
          const robotsData = await fetchAndProcessRobotsTxt(
            origin,
            discoveredLocales
          );
          Object.assign(summary, {
            robotsTxt: robotsData.robotsTxt,
            robotsHasLocales: robotsData.robotsHasLocales,
            robotsDisallow: robotsData.robotsDisallow,
            robotsDisallowWithoutLocaleAlternates:
              robotsData.robotsDisallowWithoutLocaleAlternates,
          });

          sendSSE(controller, {
            type: 'data',
            field: 'robotsHasLocales',
            value: robotsData.robotsHasLocales,
          });

          // Error detection: Robots.txt paths without locale alternates
          if (robotsData.robotsDisallowWithoutLocaleAlternates.length > 0) {
            errors.robotsDisallowWithoutLocaleAlternates = {
              message: `${robotsData.robotsDisallowWithoutLocaleAlternates.length} disallowed path(s) in robots.txt lack localized versions`,
              details: {
                pathsWithoutAlternates:
                  robotsData.robotsDisallowWithoutLocaleAlternates.slice(0, 10),
                totalCount:
                  robotsData.robotsDisallowWithoutLocaleAlternates.length,
                discoveredLocales,
                recommendation:
                  'Ensure disallowed paths have localized versions (e.g., if /admin is disallowed, also disallow /fr/admin, /es/admin, etc.)',
              },
            };
          }

          // Fetch and process sitemaps
          const sitemapCandidates = new Set<string>([
            ...robotsData.sitemapUrlsFromRobots,
            `${origin}/sitemap.xml`,
          ]);
          const sitemapData = await fetchAndProcessSitemaps(
            Array.from(sitemapCandidates)
          );
          Object.assign(summary, {
            sitemaps: sitemapData.sitemaps,
            sitemapHasAlternate: sitemapData.sitemapHasAlternate,
            sitemapHasXDefault: sitemapData.sitemapHasXDefault,
            sitemapAlternateValid: sitemapData.sitemapAlternateValid,
            sitemapUrls: sitemapData.sitemapUrls,
            sitemapUrlsCount: sitemapData.sitemapUrls.length,
          });

          sendSSE(controller, {
            type: 'data',
            field: 'sitemapHasAlternate',
            value: sitemapData.sitemapHasAlternate,
          });
          sendSSE(controller, {
            type: 'data',
            field: 'sitemapHasXDefault',
            value: sitemapData.sitemapHasXDefault,
          });
          sendSSE(controller, {
            type: 'data',
            field: 'sitemapAlternateValid',
            value: sitemapData.sitemapAlternateValid,
          });
          sendSSE(controller, {
            type: 'data',
            field: 'sitemapUrlsCount',
            value: sitemapData.sitemapUrls.length,
          });
        }

        // Detect errors
        const allErrors = detectErrors(
          summary,
          linguisticData,
          metadataData,
          urlStructureData,
          alternatesOnRoot
        );
        Object.assign(errors, allErrors);

        // Early exit if onlyPage requested
        if (onlyPage) {
          const { score, label } = calculateScore(summary, true);

          if (Object.keys(errors).length > 0) {
            sendSSE(controller, {
              type: 'data',
              field: 'errors',
              value: errors,
            });
          }

          sendSSE(controller, {
            type: 'complete',
            progress: 100,
            data: { success: true, score, label, summary, errors },
          });

          // Save audit data to database
          await saveAuditData(req, targetUrl, summary, score, label);

          controller.close();
          return;
        }

        // Process pages from sitemap (limited for performance)
        await wait();

        sendSSE(controller, {
          type: 'progress',
          step: 5,
          progress: 85,
          message: 'Processing pages from sitemap...',
        });

        if (summary.sitemapUrls && summary.sitemapUrls.length > 0) {
          await processPagesFromSitemap(
            page,
            summary.sitemapUrls as string[],
            localesSet,
            pagesMap,
            load
          );
        }

        summary.locales = Array.from(localesSet);
        summary.localesCount = summary.locales.length;
        summary.pages = Array.from(pagesMap.values());

        sendSSE(controller, {
          type: 'data',
          field: 'localesCount',
          value: summary.localesCount,
        });

        // Error detection: Check for missing hreflang alternates
        const pagesWithMissingAlternates: Array<{
          url: string;
          missingLocales: string[];
        }> = [];
        const allDiscoveredLocales = Array.from(localesSet);

        if (allDiscoveredLocales.length > 0) {
          for (const [pathname, pageData] of pagesMap.entries()) {
            const pageAlternates = Object.keys(pageData.alternate);
            const missingLocales = allDiscoveredLocales.filter(
              (locale) => !pageAlternates.includes(locale)
            );
            if (missingLocales.length > 0) {
              pagesWithMissingAlternates.push({
                url: new URL(pathname, origin).href,
                missingLocales,
              });
            }
          }

          if (pagesWithMissingAlternates.length > 0) {
            errors.missingAlternates = {
              message: `${pagesWithMissingAlternates.length} page(s) have missing hreflang alternates`,
              details: {
                pages: pagesWithMissingAlternates.slice(0, 10), // Limit to first 10
                totalCount: pagesWithMissingAlternates.length,
                expectedLocales: allDiscoveredLocales,
              },
            };
          }
        }

        // Build discovered URLs from sitemap and hreflang alternates
        const discoveredSet = new Set<string>(summary.sitemapUrls ?? []);
        for (const url of Object.values(alternatesOnRoot)) {
          discoveredSet.add(url);
        }
        for (const p of summary.pages as Array<{
          default: string;
          alternate: Record<string, string>;
        }>) {
          try {
            discoveredSet.add(new URL(p.default, origin).href);
          } catch {}
          for (const u of Object.values(p.alternate || {})) {
            discoveredSet.add(u);
          }
        }
        summary.discoveredUrls = Array.from(discoveredSet);

        // Step 6: Calculating localization score
        await wait();

        sendSSE(controller, {
          type: 'progress',
          step: 6,
          progress: 98,
          message: 'Calculating localization score...',
        });

        const { score, label } = calculateScore(summary, false);

        // Send errors if any
        if (Object.keys(errors).length > 0) {
          sendSSE(controller, {
            type: 'data',
            field: 'errors',
            value: errors,
          });
        }

        sendSSE(controller, {
          type: 'complete',
          progress: 100,
          data: {
            success: true,
            score,
            label,
            summary,
            errors,
          },
        });

        // Save audit data to database
        await saveAuditData(req, targetUrl, summary, score, label);

        controller.close();
      } catch (err: unknown) {
        console.error(err);
        const errorMessage = formatErrorMessage(err);
        sendSSE(controller, {
          type: 'error',
          error: errorMessage,
        });
        controller.close();
      } finally {
        if (browser) await browser.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};

export const POST = async (req: NextRequest) => {
  let payload: { urls?: string[] } = {};
  try {
    payload = (await req.json()) as any;
  } catch {
    // ignore
  }
  const urls = Array.isArray(payload.urls) ? payload.urls : [];
  if (!urls.length) {
    return new Response(JSON.stringify({ error: 'Missing urls[]' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate all URLs
  for (const url of urls) {
    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.protocol.startsWith('http')) {
        return new Response(
          JSON.stringify({
            error: `Invalid URL: ${url} - Must use HTTP or HTTPS protocol`,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch {
      return new Response(
        JSON.stringify({ error: `Invalid URL format: ${url}` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      let browser: Browser | undefined;
      const onAbort = () => {
        try {
          sendSSE(controller, { type: 'error', error: 'aborted' });
          controller.close();
        } catch {}
      };
      req.signal.addEventListener('abort', onAbort);
      try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const { load } = await import('cheerio');

        for (let idx = 0; idx < urls.length; idx++) {
          const url = urls[idx];
          const summary: any = {};
          const errors: Record<string, { message: string; details?: any }> = {};

          sendSSE(controller, {
            type: 'page-start',
            pageIndex: idx,
            url,
            message: 'Starting page analysis...',
          });

          try {
            sendSSE(controller, {
              type: 'page-progress',
              pageIndex: idx,
              url,
              progress: 10,
              message: 'Fetching page content...',
            });

            const { summary: pageSummary, errors: pageErrors } =
              await analyzeSinglePage(page, url, load);

            Object.assign(summary, pageSummary);
            Object.assign(errors, pageErrors);

            sendSSE(controller, {
              type: 'page-progress',
              pageIndex: idx,
              url,
              progress: 90,
              message: 'Calculating localization score...',
            });

            const { score, label } = calculateScore(summary, true);

            sendSSE(controller, {
              type: 'page-complete',
              pageIndex: idx,
              url,
              data: { success: true, score, label, summary, errors },
            });

            // Save audit data to database
            await saveAuditData(req, url, summary, score, label);
          } catch (err: unknown) {
            const errorMessage = formatErrorMessage(err);
            sendSSE(controller, {
              type: 'page-error',
              pageIndex: idx,
              url,
              error: errorMessage,
            });
          }
        }

        sendSSE(controller, {
          type: 'complete',
          progress: 100,
          data: { success: true },
        });
        controller.close();
      } catch {
        sendSSE(controller, {
          type: 'error',
          error: 'Failed to run batch analysis',
        });
        controller.close();
      } finally {
        if (browser) await browser.close();
        req.signal.removeEventListener('abort', onAbort);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
};
