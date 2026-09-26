import { GREY, GREY_LIGHT } from '@intlayer/config/colors';
import { colorize, logger } from '@intlayer/config/logger';
import { mutateScore, type Score, toScorePercent } from './calculateScore';
import { getTechnologyGlobalNames } from './detection/detectTechnologies';
import { fetchText } from './fetchText';
import { byteLength, extractScriptUrls } from './parseHtml';
import { runScanChecks, type ScanPageInput } from './runScanChecks';
import type {
  BundleChunkInput,
  ScanEvent,
  ScanOptions,
  ScanResult,
} from './types';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (compatible; IntlayerScanBot/1.0; +https://intlayer.org)';
const DEFAULT_TIMEOUT_MS = 30_000;

/**
 * Log a recommendation to install `puppeteer` for a deeper scan. Mirrors the
 * style used by other optional-dependency hints across the CLI.
 */
const logDeepScanRecommendation = (): void => {
  logger([
    colorize('Recommended: Install', GREY),
    colorize('puppeteer', GREY_LIGHT),
    colorize(
      'package to enable a deeper scan (renders client-side content & lazy-loaded chunks). See documentation:',
      GREY
    ),
    colorize('https://intlayer.org/doc/concept/cli#scan', GREY_LIGHT),
  ]);
};

/** Outcome of a render-based deep scan. */
type DeepScanResult = Required<Omit<ScanPageInput, 'targetUrl'>>;

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
 * Render the page with a locally installed `puppeteer` to capture
 * client-rendered content, the accurate transfer size, and lazy-loaded chunks.
 *
 * `puppeteer` is imported dynamically through a non-literal specifier so it is
 * never bundled and stays an optional dependency: when it is absent the import
 * rejects and the caller falls back to the basic scan.
 *
 * @returns The deep-scan result, or `null` when `puppeteer` is unavailable.
 */
const runDeepScan = async (
  targetUrl: string,
  userAgent: string,
  timeoutMs: number
): Promise<DeepScanResult | null> => {
  const moduleName = 'puppeteer';
  // Optional dependency resolved at runtime — typed as `any` because it is not
  // a declared dependency of this package.
  let puppeteer: any;
  try {
    const mod: any = await import(moduleName);
    puppeteer = mod.default ?? mod;
  } catch {
    return null;
  }

  let browser: any;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    const origin = new URL(targetUrl).origin;
    const jsResponseMap = new Map<string, string>();
    const requestUrls: string[] = [];
    let totalPageSize = 0;
    const pendingResponses: Promise<void>[] = [];

    page.on('response', (response: any) => {
      pendingResponses.push(
        (async () => {
          try {
            requestUrls.push(response.url());
            if (response.status() !== 200) return;
            const buffer = await response.buffer();
            totalPageSize += buffer.length;

            const responseUrl: string = response.url();
            const contentType: string =
              response.headers()['content-type'] ?? '';
            const isJavaScript =
              contentType.includes('javascript') ||
              /\.(js|mjs|cjs)(\?|$)/.test(responseUrl);
            if (isJavaScript && responseUrl.startsWith(origin)) {
              jsResponseMap.set(responseUrl, buffer.toString('utf-8'));
            }
          } catch {
            /* response already consumed or aborted */
          }
        })()
      );
    });

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: timeoutMs,
    });
    await page
      .waitForNetworkIdle({ idleTime: 1000, timeout: 10_000 })
      .catch(() => {
        /* ok if it never fully idles */
      });
    await Promise.allSettled(pendingResponses);

    const html: string = await page.content();
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
    const cookies: { name: string }[] = await page.cookies().catch(() => []);

    return {
      html,
      totalPageSize,
      chunks,
      requestUrls,
      runtimeSignals: {
        globals,
        globalVersions,
        storageKeys: cookies.map(({ name }) => name),
      },
    };
  } finally {
    if (browser) await browser.close();
  }
};

/**
 * Fetch every eagerly-loaded script. Same-origin scripts keep their content so
 * their locale weight can be analyzed; third-party scripts only contribute to
 * the measured page size (their locale-like keys cause false positives).
 */
const fetchScripts = async (
  scriptUrls: string[],
  origin: string,
  userAgent: string
): Promise<{ chunks: BundleChunkInput[]; scriptBytes: number }> => {
  const chunks: BundleChunkInput[] = [];
  let scriptBytes = 0;

  await Promise.all(
    scriptUrls.map(async (scriptUrl) => {
      try {
        const response = await fetch(scriptUrl, {
          headers: { 'User-Agent': userAgent },
        });
        if (!response.ok) return;
        const content = await response.text();
        scriptBytes += byteLength(content);
        if (scriptUrl.startsWith(origin)) {
          chunks.push({ url: scriptUrl, isMainBundle: true, content });
        }
      } catch {
        /* ignore unreachable scripts */
      }
    })
  );

  return { chunks, scriptBytes };
};

/**
 * Scan a single web page for i18n/SEO health and bundle weight.
 *
 * In `deep` mode (default) the page is rendered with a locally installed
 * `puppeteer`; when `puppeteer` is missing the scan transparently falls back to
 * a `basic` fetch-based pass and logs a recommendation to install it.
 *
 * @param targetUrl - The absolute URL to scan.
 * @param options - {@link ScanOptions} controlling depth, timeout and UA.
 * @returns The {@link ScanResult} including score, page size and per-check events.
 */
export const scanWebsite = async (
  targetUrl: string,
  options: ScanOptions = {}
): Promise<ScanResult> => {
  const {
    deep = true,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    userAgent = DEFAULT_USER_AGENT,
  } = options;

  const origin = new URL(targetUrl).origin;
  const fetchOptions = { userAgent, timeoutMs };

  const deepResult = deep
    ? await runDeepScan(targetUrl, userAgent, timeoutMs)
    : null;

  let pageInput: Omit<ScanPageInput, 'targetUrl'>;

  if (deepResult) {
    pageInput = deepResult;
  } else {
    if (deep) logDeepScanRecommendation();
    const response = await fetchText(targetUrl, fetchOptions);
    if (!response?.ok) {
      throw new Error(
        `Failed to fetch ${targetUrl}${response ? ` (HTTP ${response.status})` : ''}`
      );
    }
    const scriptUrls = extractScriptUrls(response.text, response.finalUrl);
    const { chunks, scriptBytes } = await fetchScripts(
      scriptUrls,
      origin,
      userAgent
    );
    pageInput = {
      html: response.text,
      chunks,
      totalPageSize: byteLength(response.text) + scriptBytes,
    };
  }

  const events: ScanEvent[] = [];
  const checksResult = await runScanChecks(
    { targetUrl, ...pageInput },
    (event) => events.push(event),
    fetchOptions
  );

  const rawScore = events.reduce<Score>(
    (score, event) => mutateScore(score, event),
    { score: 0, totalScore: 0 }
  );

  return {
    url: targetUrl,
    mode: deepResult ? 'deep' : 'basic',
    totalPageSize: pageInput.totalPageSize,
    htmlSize: byteLength(pageInput.html),
    score: toScorePercent(rawScore),
    rawScore,
    events,
    ...checksResult,
  };
};
