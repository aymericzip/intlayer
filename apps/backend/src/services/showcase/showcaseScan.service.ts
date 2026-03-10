import * as Locales from '@intlayer/types/locales';
import { logger } from '@logger';
import { launchBrowser } from '@utils/puppeteer/launchBrowser';
import type { ShowcaseScanDetails } from '@/types/showcaseProject.types';

export interface ShowcaseScannedInfo {
  /** Whether the intlayer bundle was detected in the page */
  hasIntlayer: boolean;
  /** Version of the core `intlayer` package if detectable from the bundle */
  intlayerVersion?: string;
  /** All detected intlayer-related packages and their versions (from bundle markers) */
  packageDetails: Record<string, string>;
  /** List of detected intlayer package names */
  libsUsed: string[];
  scanDetails: ShowcaseScanDetails;
  /** JPEG screenshot buffer taken on the same page load */
  screenshotBuffer: Buffer;
  /** Page title extracted from og:title or <title> */
  metaTitle?: string;
  /** Short description extracted from og:description or meta description */
  metaDescription?: string;
}

/**
 * Regex that matches any intlayer package name and its version from a minified bundle.
 */
const INTLAYER_BUNDLE_PKG_REGEX =
  /name\s*:\s*['"]([^'"]*intlayer[^'"]*)['"]\s*,\s*version\s*:\s*['"]([^'"]+)['"]/gi;

/**
 * The distinct bundle marker emitted by intlayer:
 *   { name: 'Intlayer', version: '...', doc: 'https://intlayer.org/docs' }
 * Matches the exact property order from buildConfigurationFields.ts.
 */
const INTLAYER_BUNDLE_MARKER =
  /name\s*:\s*['"]Intlayer['"]\s*,\s*version\s*:\s*['"][^'"]+['"]\s*,\s*doc\s*:\s*[`'"]https:\/\/intlayer\.org\/docs[`'"]/i;

/** Extract all intlayer packages from a script text blob. */
export const extractPackagesFromScript = (
  content: string
): Record<string, string> => {
  const result: Record<string, string> = {};
  const regex = new RegExp(INTLAYER_BUNDLE_PKG_REGEX.source, 'gi');
  for (const match of content.matchAll(regex)) {
    const name = match[1];
    const version = match[2].replace(/^[^0-9]*/, '') || match[2];
    result[name] = version;
  }
  return result;
};

const MAX_EXTERNAL_SCRIPTS = 20;
const MAX_SCRIPT_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Opens a single browser session, scans the page for Intlayer usage,
 * takes a screenshot, then closes the browser.
 * Combining both operations avoids launching Puppeteer twice.
 */
export const scanShowcaseProject = async (
  url: string
): Promise<ShowcaseScannedInfo> => {
  logger.info(`[scanShowcaseProject] Scanning ${url}...`);

  const browser = await launchBrowser({ pipe: false, dumpio: false });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('body', { timeout: 10000 });
    await page
      .waitForNetworkIdle({ idleTime: 1000, timeout: 10000 })
      .catch(() => {
        /* ok if the page never fully idles (SPAs, analytics, etc.) */
      });

    const allLocales = Object.values(Locales.ALL_LOCALES);

    // Page-level details (DOM evaluation)
    const pageDetails = await page.evaluate((locales) => {
      const html = document.documentElement;
      const lang = html.getAttribute('lang') || '';
      const dir = html.getAttribute('dir') || 'ltr';

      const hreflangs = Array.from(
        document.querySelectorAll('link[rel="alternate"][hreflang]')
      ).map((link) => link.getAttribute('hreflang') || '');

      const canonical =
        document.querySelector('link[rel="canonical"]')?.getAttribute('href') ||
        '';

      const links = Array.from(document.querySelectorAll('a[href]')).map(
        (a) => a.getAttribute('href') || ''
      );

      const localizedPrefixes = locales.map((el) => `/${el}`);
      const internalLinks = links.filter(
        (href) =>
          href.startsWith('/') || href.startsWith(window.location.origin)
      );
      const localizedLinks = internalLinks.filter((href) =>
        localizedPrefixes.some(
          (prefix) => href.startsWith(`${prefix}/`) || href === prefix
        )
      );
      const hasLocalizedLinks = localizedLinks.length > 0;
      const allAnchorsLocalized =
        internalLinks.length > 0 &&
        localizedLinks.length === internalLinks.length;

      const inlineScripts = Array.from(
        document.querySelectorAll('script:not([src])')
      )
        .map((script) => script.textContent || '')
        .filter(Boolean);

      const externalScriptUrls = Array.from(
        document.querySelectorAll('script[src]')
      )
        .map((script) => (script as HTMLScriptElement).src)
        .filter(Boolean);

      // Meta tag extraction
      const metaTitle =
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content') ||
        document.title ||
        '';
      const metaDescription =
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content') ||
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content') ||
        '';

      return {
        lang,
        dir,
        hreflangs,
        canonical,
        hasLocalizedLinks,
        allAnchorsLocalized,
        inlineScripts,
        externalScriptUrls,
        metaTitle,
        metaDescription,
      };
    }, allLocales);

    // Screenshot (same page, no extra navigation)
    logger.info(`[scanShowcaseProject] Taking screenshot of ${url}...`);
    const screenshotBuffer = (await page.screenshot({
      type: 'jpeg',
      quality: 30,
    })) as Buffer;

    await page.close();

    // robots.txt
    let robotsAccessible = false;
    try {
      const robotsRes = await fetch(new URL('/robots.txt', url).toString());
      robotsAccessible = robotsRes.ok;
    } catch {}

    // sitemap.xml
    let sitemapDiscoverable = false;
    let sitemapUrlCount = 0;
    try {
      const sitemapRes = await fetch(new URL('/sitemap.xml', url).toString());

      if (sitemapRes.ok) {
        sitemapDiscoverable = true;
        const text = await sitemapRes.text();
        sitemapUrlCount = (text.match(/<loc>/g) || []).length;
      }
    } catch {}

    // Intlayer bundle detection
    const packageDetails: Record<string, string> = {};
    let markerFoundInExternalScript = false;

    for (const script of pageDetails.inlineScripts) {
      Object.assign(packageDetails, extractPackagesFromScript(script));
    }

    if (
      !packageDetails.intlayer &&
      !Object.keys(packageDetails).some((k) => k.includes('intlayer'))
    ) {
      const scriptUrls = pageDetails.externalScriptUrls.slice(
        0,
        MAX_EXTERNAL_SCRIPTS
      );

      await Promise.allSettled(
        scriptUrls.map(async (src) => {
          try {
            const res = await fetch(src);

            if (!res.ok) return;
            const contentLength = Number(
              res.headers.get('content-length') || 0
            );

            if (contentLength > MAX_SCRIPT_BYTES) return;
            const text = await res.text();

            if (text.length > MAX_SCRIPT_BYTES) return;

            if (INTLAYER_BUNDLE_MARKER.test(text)) {
              markerFoundInExternalScript = true;
              Object.assign(packageDetails, extractPackagesFromScript(text));
            } else if (text.includes('intlayer')) {
              Object.assign(packageDetails, extractPackagesFromScript(text));
            }
          } catch {}
        })
      );
    }

    const hasIntlayer =
      Object.keys(packageDetails).some(
        (key) =>
          key.toLowerCase().includes('intlayer') &&
          !key.toLowerCase().includes('@intlayer')
      ) ||
      pageDetails.inlineScripts.some((script) =>
        INTLAYER_BUNDLE_MARKER.test(script)
      ) ||
      markerFoundInExternalScript;

    const libsUsed = Object.keys(packageDetails);
    const intlayerVersion = packageDetails.intlayer;

    // SEO score
    let score = 0;
    if (pageDetails.lang) score += 10;
    if (pageDetails.canonical) score += 10;
    if (pageDetails.hreflangs.length > 0) score += 20;
    if (pageDetails.hreflangs.includes('x-default')) score += 10;
    if (robotsAccessible) score += 10;
    if (sitemapDiscoverable) score += 10;
    if (pageDetails.hasLocalizedLinks) score += 20;
    if (pageDetails.allAnchorsLocalized) score += 10;

    return {
      hasIntlayer,
      intlayerVersion,
      packageDetails,
      libsUsed,
      screenshotBuffer,
      metaTitle: pageDetails.metaTitle || undefined,
      metaDescription: pageDetails.metaDescription || undefined,
      scanDetails: {
        score,
        langTag: pageDetails.lang,
        htmlDir: pageDetails.dir,
        hreflangs: pageDetails.hreflangs,
        hasXDefault: pageDetails.hreflangs.includes('x-default'),
        hasCanonical: !!pageDetails.canonical,
        hasLocalizedLinks: pageDetails.hasLocalizedLinks,
        allAnchorsLocalized: pageDetails.allAnchorsLocalized,
        robotsTxt: {
          accessible: robotsAccessible,
          disallowWithoutLocaleAlternates: robotsAccessible,
        },
        sitemapXml: {
          urlsDiscoveredCount: sitemapUrlCount,
          alternatesPresent: sitemapUrlCount > 0,
          xDefaultPresent: sitemapDiscoverable,
        },
      },
    };
  } finally {
    await browser.close().catch(() => {});
  }
};
