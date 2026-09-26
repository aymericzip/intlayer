/** Options shared by every network request issued during a scan. */
export type ScanFetchOptions = {
  userAgent: string;
  timeoutMs: number;
  /**
   * Guard called before fetching any URL discovered on the scanned site
   * (hreflang alternates, sitemap children…). The hosted audit uses it to
   * block private / reserved addresses (SSRF). Defaults to allowing all.
   */
  shouldFetchUrl?: (url: string) => boolean | Promise<boolean>;
};

/** Response of {@link fetchText}. */
export type FetchTextResult = {
  status: number;
  ok: boolean;
  text: string;
  /** URL after redirects. */
  finalUrl: string;
  /** Whether at least one redirect was followed. */
  redirected: boolean;
};

const MAX_REDIRECTS = 5;

/**
 * Read a response body as text, gunzipping it when the payload itself is
 * gzip-compressed (e.g. `sitemap.xml.gz`, served without `Content-Encoding`).
 */
const readBodyAsText = async (response: Response): Promise<string> => {
  const bytes = new Uint8Array(await response.arrayBuffer());
  const isGzip = bytes[0] === 0x1f && bytes[1] === 0x8b;
  if (!isGzip) return new TextDecoder().decode(bytes);

  const decompressedStream = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream('gzip'));
  return new Response(decompressedStream).text();
};

/**
 * GET a URL as text with a timeout, returning `undefined` when the request is
 * blocked by {@link ScanFetchOptions.shouldFetchUrl} or fails at network level.
 * Redirects are followed manually so every hop goes through the guard.
 */
export const fetchText = async (
  url: string,
  { userAgent, timeoutMs, shouldFetchUrl }: ScanFetchOptions
): Promise<FetchTextResult | undefined> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let currentUrl = url;
    for (let redirectCount = 0; ; redirectCount++) {
      if (shouldFetchUrl && !(await shouldFetchUrl(currentUrl))) {
        return undefined;
      }
      const response = await fetch(currentUrl, {
        headers: {
          'User-Agent': userAgent,
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'manual',
        signal: controller.signal,
      });
      const location = response.headers.get('location');
      if (
        response.status >= 300 &&
        response.status < 400 &&
        location &&
        redirectCount < MAX_REDIRECTS
      ) {
        currentUrl = new URL(location, currentUrl).href;
        continue;
      }
      return {
        status: response.status,
        ok: response.ok,
        text: await readBodyAsText(response),
        finalUrl: currentUrl,
        redirected: redirectCount > 0,
      };
    }
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
  }
};
