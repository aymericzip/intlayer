import { logger } from '@logger';
import { launchBrowser } from '@utils/puppeteer/launchBrowser';
import { load } from 'cheerio';
import type { Browser } from 'puppeteer';
import { checkBundleContent } from './checkers/bundleChecker';
import { checkLinguisticStructure } from './checkers/linguisticChecker';
import { checkMetadata } from './checkers/metadataChecker';
import {
  checkHtmlAttributes,
  extractPageMetadata,
} from './checkers/pageChecker';
import { checkRobots } from './checkers/robotsChecker';
import { checkSitemap } from './checkers/sitemapChecker';
import { checkUrlStructure } from './checkers/urlChecker';
import type { AuditEvent } from './types';

const gotoWithRetries = async (
  page: import('puppeteer').Page,
  url: string,
  attempts = 3
) => {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      const resp = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });

      if (!resp) {
        throw new Error(`Failed to get a response from ${url}`);
      }

      const status = resp.status();
      logger.info(`[gotoWithRetries] Status: ${status} for ${url}`);
      if (status >= 400) throw new Error(`HTTP ${status} on ${url}`);

      await page.waitForSelector('body', { timeout: 10000 });

      await page
        .waitForNetworkIdle({ idleTime: 1000, timeout: 10000 })
        .catch(() => {
          /* ok if it doesn't fully idle */
        });

      return resp;
    } catch (err) {
      lastErr = err;
      if (i < attempts) {
        await new Promise((r) => setTimeout(r, 500 * i));
        continue;
      }
      throw lastErr;
    }
  }
};

export const runSingleAudit = async (
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): Promise<{ events: AuditEvent[]; internalUrls: string[] }> => {
  let browser: Browser | undefined;
  const events: AuditEvent[] = [];

  const handleEvent = (event: AuditEvent) => {
    events.push(event);
    onEvent(event);
  };

  try {
    const origin = new URL(targetUrl).origin;
    const localesSet = new Set<string>();

    handleEvent({
      progress: 10,
      message: 'Checking domain and parsing root page...',
    });

    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setUserAgent({
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36',
      platform: 'Linux',
      userAgentMetadata: {
        brands: [{ brand: 'Google Chrome', version: '119' }],
        platform: 'Linux',
        mobile: false,
        platformVersion: '119',
        architecture: 'x86',
        model: 'Linux',
      },
    });

    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (
        type === 'image' ||
        type === 'media' ||
        type === 'font' ||
        type === 'websocket'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const jsResponseMap = new Map<string, string>(); // URL -> content
    let totalPageSize = 0;
    const pendingResponses: Promise<void>[] = [];

    page.on('response', (response) => {
      const responsePromise = (async () => {
        const responseUrl = response.url();
        if (response.status() !== 200) return;
        const contentType = response.headers()['content-type'] ?? '';
        const isJavaScript =
          contentType.includes('javascript') ||
          /\.(js|mjs|cjs)(\?|$)/.test(responseUrl);
        // Only scan same-origin scripts — third-party analytics/CDN scripts
        // (GTM, Intercom, etc.) contain locale-like keys that cause false positives.
        const isSameOrigin = responseUrl.startsWith(origin);

        try {
          const bodyBuffer = await response.buffer();
          totalPageSize += bodyBuffer.length;

          if (!isJavaScript || !isSameOrigin) return;
          jsResponseMap.set(responseUrl, bodyBuffer.toString('utf-8'));
        } catch {
          /* response already consumed or aborted */
        }
      })();
      pendingResponses.push(responsePromise);
    });

    await page.setViewport({ width: 1280, height: 800 });

    page.on('requestfailed', (request) =>
      logger.warn(
        `[requestfailed] ${request.url()} ${request.failure()?.errorText}`
      )
    );
    page.on('console', (message) =>
      logger.info(`[console] ${message.type()} ${message.text()}`)
    );
    page.on('pageerror', (error) => logger.error(`[pageerror] ${error}`));

    await gotoWithRetries(page, targetUrl);

    await Promise.allSettled(pendingResponses);

    const html = await page.content();
    logger.info(`[runSingleAudit] Page loaded. Content length: ${html.length}`);
    const cheerioApi = load(html);
    logger.info(
      `[runSingleAudit] Cheerio loaded. Body found: ${cheerioApi('body').length > 0}`
    );

    // Identify main bundle scripts — scripts that are eagerly loaded on initial page load.
    // Covers:
    //   <script src="...">              — classic and module entry points
    //   <link rel="modulepreload">      — Vite preloads critical chunks this way
    //   <link rel="preload" as="script"> — generic preload
    const mainBundleUrls = new Set<string>();
    const addMainUrl = (raw: string | undefined) => {
      if (!raw) return;
      try {
        mainBundleUrls.add(new URL(raw, targetUrl).href);
      } catch {
        /* ignore */
      }
    };
    cheerioApi('script[src]').each((_, el) =>
      addMainUrl(cheerioApi(el).attr('src'))
    );
    cheerioApi('link[rel="modulepreload"][href]').each((_, el) =>
      addMainUrl(cheerioApi(el).attr('href'))
    );
    cheerioApi('link[rel="preload"][as="script"][href]').each((_, el) =>
      addMainUrl(cheerioApi(el).attr('href'))
    );

    const bundleChunks = Array.from(jsResponseMap.entries()).map(
      ([url, content]) => ({
        url,
        isMainBundle: mainBundleUrls.has(url),
        content,
      })
    );

    await extractPageMetadata(cheerioApi, targetUrl, handleEvent);

    handleEvent({ progress: 15 });

    const { langTag } = await checkHtmlAttributes(
      cheerioApi,
      targetUrl,
      handleEvent
    );

    handleEvent({
      progress: 30,
      message: 'Analyzing linguistic structure...',
    });

    await checkLinguisticStructure(
      cheerioApi,
      targetUrl,
      localesSet,
      handleEvent
    );

    handleEvent({
      progress: 40,
      message: 'Analysing bundle content & leakage...',
    });

    checkBundleContent(
      bundleChunks,
      html,
      langTag,
      targetUrl,
      totalPageSize,
      handleEvent
    );

    handleEvent({
      progress: 50,
      message: 'Checking metadata structure...',
    });

    await checkMetadata(cheerioApi, targetUrl, handleEvent);

    handleEvent({
      progress: 60,
      message: 'Analyzing URL structure...',
    });

    const internalUrls = await checkUrlStructure(
      page,
      origin,
      targetUrl,
      handleEvent
    );

    handleEvent({
      progress: 70,
      message: 'Checking robots.txt...',
    });

    await checkRobots(origin, localesSet, handleEvent);

    handleEvent({
      progress: 80,
      message: 'Checking sitemap.xml...',
    });

    await checkSitemap(origin, localesSet, handleEvent);

    handleEvent({
      progress: 100,
      message: 'Audit completed',
    });

    return { events, internalUrls };
  } catch (err: unknown) {
    handleEvent({
      globalError: (err as Error).message,
    });
    throw err;
  } finally {
    if (browser) await browser.close();
  }
};
