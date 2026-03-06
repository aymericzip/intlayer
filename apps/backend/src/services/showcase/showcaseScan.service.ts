import { logger } from '@logger';
import { launchBrowser } from '@utils/puppeteer/launchBrowser';
import type { ShowcaseScanDetails } from '@/types/showcaseProject.types';

export interface ShowcaseScannedInfo {
  intlayerVersion?: string;
  libsUsed: string[];
  scanDetails: ShowcaseScanDetails;
}

export const scanShowcaseProject = async (
  url: string
): Promise<ShowcaseScannedInfo> => {
  logger.info(`Scanning ${url}...`);

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    const pageDetails = await page.evaluate(() => {
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

      const localizedPrefixes = [
        '/en',
        '/fr',
        '/es',
        '/de',
        '/it',
        '/ja',
        '/ko',
        '/pt',
        '/ru',
        '/zh',
      ];
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

      const scripts = Array.from(document.querySelectorAll('script')).map(
        (s) => s.innerText || s.src
      );

      return {
        lang,
        dir,
        hreflangs,
        canonical,
        hasLocalizedLinks,
        allAnchorsLocalized,
        scripts,
      };
    });

    let robotsAccessible = false;
    try {
      const robotsUrl = new URL('/robots.txt', url).toString();
      const robotsRes = await fetch(robotsUrl);
      robotsAccessible = robotsRes.ok;
    } catch {}

    let sitemapDiscoverable = false;
    let sitemapUrlCount = 0;
    try {
      const sitemapUrl = new URL('/sitemap.xml', url).toString();
      const sitemapRes = await fetch(sitemapUrl);
      if (sitemapRes.ok) {
        sitemapDiscoverable = true;
        const text = await sitemapRes.text();
        sitemapUrlCount = (text.match(/<loc>/g) || []).length;
      }
    } catch (_e) {}

    let intlayerVersion: string | undefined;
    const libsUsed: string[] = ['intlayer'];

    const versionRegex =
      /name\s*:\s*['"]Intlayer['"]\s*,\s*version\s*:\s*['"]([^'"]+)['"]/i;

    for (const scriptContent of pageDetails.scripts) {
      const match = scriptContent?.match(versionRegex);

      if (match?.[1]) {
        intlayerVersion = match[1];
        break;
      }
    }

    const htmlContent = await page.content();
    if (
      htmlContent.includes('react') ||
      pageDetails.scripts.some((s) => s.includes('react'))
    )
      libsUsed.push('react-intlayer');
    if (
      htmlContent.includes('vue') ||
      pageDetails.scripts.some((s) => s.includes('vue'))
    )
      libsUsed.push('vue-intlayer');

    let score = 50;
    if (pageDetails.lang) score += 10;
    if (pageDetails.canonical) score += 10;
    if (pageDetails.hreflangs.length > 0) score += 10;
    if (robotsAccessible) score += 10;
    if (sitemapDiscoverable) score += 10;

    return {
      intlayerVersion,
      libsUsed,
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
          disallowWithoutLocaleAlternates: true,
        },
        sitemapXml: {
          urlsDiscoveredCount: sitemapUrlCount,
          alternatesPresent: true,
          xDefaultPresent: true,
        },
      },
    };
  } finally {
    await browser.close();
  }
};

export const takeShowcaseScreenshot = async (url: string): Promise<Buffer> => {
  logger.info('[takeShowcaseScreenshot] Launching puppeteer...');

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 15000,
    });

    logger.info('[takeShowcaseScreenshot] Taking screenshot...');

    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 30,
    });

    return screenshotBuffer as Buffer;
  } finally {
    await browser.close();
  }
};
