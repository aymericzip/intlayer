import {
  type BundleChunkInput,
  extractScriptUrls,
  getTechnologyGlobalNames,
  runScanChecks,
  type ScanEvent,
} from '@intlayer/engine/scan';
import { logger } from '@logger';
import { isPublicHttpUrl } from '@utils/isPublicUrl';
import { launchBrowser } from '@utils/puppeteer/launchBrowser';
import type { Browser, HTTPRequest, Page } from 'puppeteer';
import type { AuditData, AuditEvent } from './types';

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36';
const FETCH_TIMEOUT_MS = 15_000;

/** Resource types never needed by the audit. */
const SKIPPED_RESOURCE_TYPES = new Set(['image', 'media', 'font', 'websocket']);

const gotoWithRetries = async (page: Page, url: string, attempts = 3) => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });

      if (!response) {
        throw new Error(`Failed to get a response from ${url}`);
      }

      const status = response.status();
      logger.info(`[gotoWithRetries] Status: ${status} for ${url}`);
      if (status >= 400) throw new Error(`HTTP ${status} on ${url}`);

      await page.waitForSelector('body', { timeout: 10000 });

      await page
        .waitForNetworkIdle({ idleTime: 1000, timeout: 10000 })
        .catch(() => {
          /* ok if it doesn't fully idle */
        });

      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        continue;
      }
      throw lastError;
    }
  }
};

/** Map an engine {@link ScanEvent} to the SSE {@link AuditEvent} shape. */
const toAuditEvent = ({ type, status, details }: ScanEvent): AuditEvent => ({
  type: type as AuditEvent['type'],
  status,
  data: {
    successDetails: details?.success,
    warningsDetails: details?.warning,
    errorsDetails: details?.error,
  } as AuditData,
});

/**
 * Read, in the page context, which technology globals exist and the version
 * paths they expose. Serialized by puppeteer: must stay self-contained.
 */
const readRuntimeGlobals = (
  globalNames: string[],
  versionPaths: string[]
): { globals: string[]; globalVersions: Record<string, string> } => {
  const pageWindow = window as unknown as Record<string, unknown>;
  const globalVersions: Record<string, string> = {};
  for (const versionPath of versionPaths) {
    const value = versionPath
      .split('.')
      .reduce<unknown>(
        (current, key) =>
          current && typeof current === 'object'
            ? (current as Record<string, unknown>)[key]
            : undefined,
        pageWindow
      );
    if (typeof value === 'string') globalVersions[versionPath] = value;
  }
  return {
    globals: globalNames.filter((name) => pageWindow[name] !== undefined),
    globalVersions,
  };
};

/**
 * Block navigations (including redirects) to private addresses and skip the
 * heavy resources the audit does not need.
 */
const handleRequest = async (request: HTTPRequest): Promise<void> => {
  const requestUrl = request.url();
  const isSkipped =
    SKIPPED_RESOURCE_TYPES.has(request.resourceType()) ||
    !/^https?:/.test(requestUrl);
  const isBlockedNavigation =
    request.isNavigationRequest() && !(await isPublicHttpUrl(requestUrl));

  if (isBlockedNavigation) {
    logger.warn(`[runSingleAudit] Blocked navigation to ${requestUrl}`);
  }

  if (isSkipped || isBlockedNavigation) {
    await request.abort();
  } else {
    await request.continue();
  }
};

/**
 * Audit a single page: render it with puppeteer, then run the shared
 * `@intlayer/engine/scan` checks (the same ones as `intlayer scan`), streaming
 * every step through `onEvent`.
 */
export const runSingleAudit = async (
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): Promise<{ events: AuditEvent[] }> => {
  let browser: Browser | undefined;
  const events: AuditEvent[] = [];

  const handleEvent = (event: AuditEvent) => {
    events.push(event);
    onEvent(event);
  };

  try {
    const origin = new URL(targetUrl).origin;

    handleEvent({
      progress: 10,
      message: 'Checking domain and parsing root page...',
    });

    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setUserAgent({
      userAgent: USER_AGENT,
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
    await page.setViewport({ width: 1280, height: 800 });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      handleRequest(request).catch(() => {
        /* request already handled */
      });
    });

    const jsResponseMap = new Map<string, string>();
    const requestUrls: string[] = [];
    let totalPageSize = 0;
    const pendingResponses: Promise<void>[] = [];

    page.on('response', (response) => {
      const responsePromise = (async () => {
        const responseUrl = response.url();
        requestUrls.push(responseUrl);
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

    page.on('requestfailed', (request) =>
      logger.warn(
        `[requestfailed] ${request.url()} ${request.failure()?.errorText}`
      )
    );
    page.on('pageerror', (error) => logger.error(`[pageerror] ${error}`));

    await gotoWithRetries(page, targetUrl);
    await Promise.allSettled(pendingResponses);

    const html = await page.content();
    logger.info(`[runSingleAudit] Page loaded. Content length: ${html.length}`);

    const mainBundleUrls = new Set(extractScriptUrls(html, targetUrl));
    const chunks: BundleChunkInput[] = Array.from(jsResponseMap.entries()).map(
      ([url, content]) => ({
        url,
        isMainBundle: mainBundleUrls.has(url),
        content,
      })
    );

    const { globals: globalNames, versionGlobals } = getTechnologyGlobalNames();
    const { globals, globalVersions } = await page
      .evaluate(readRuntimeGlobals, globalNames, versionGlobals)
      .catch(() => ({ globals: [], globalVersions: {} }));
    const cookies = await page.cookies().catch(() => []);

    // The page is fully captured: free the browser before the network checks.
    await browser.close();
    browser = undefined;

    await runScanChecks(
      {
        targetUrl,
        html,
        chunks,
        totalPageSize,
        requestUrls,
        runtimeSignals: {
          globals,
          globalVersions,
          storageKeys: cookies.map(({ name }) => name),
        },
      },
      (event) => handleEvent(toAuditEvent(event)),
      {
        userAgent: USER_AGENT,
        timeoutMs: FETCH_TIMEOUT_MS,
        shouldFetchUrl: isPublicHttpUrl,
        onProgress: (progress, message) => handleEvent({ progress, message }),
        onPageInfo: ({ metadata, locales, routing, technologies }) =>
          handleEvent({
            domainData: {
              ...metadata,
              discoveredLocales: locales,
              routing,
              technologies,
            },
          }),
      }
    );

    handleEvent({ progress: 100, message: 'Audit completed' });

    return { events };
  } catch (error: unknown) {
    handleEvent({ globalError: (error as Error).message });
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};
