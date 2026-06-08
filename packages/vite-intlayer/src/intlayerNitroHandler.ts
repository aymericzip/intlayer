import type { IncomingMessage, ServerResponse } from 'node:http';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { createIntlayerProxyHandler } from './intlayerProxyPlugin';

/**
 * Minimal duck-type for h3 v2's H3Event.
 *
 * We intentionally avoid importing from 'h3' to keep this file runtime-agnostic —
 * Nitro bundles h3 internally and provides the populated event at runtime. Using a
 * structural type here means the file compiles without h3 in devDependencies and
 * works with any h3 v2-compatible runtime (Bun, Deno, Node).
 */
type H3EventLike = {
  /**
   * pathname + search — a computed getter on H3Event:
   * `return this.url.pathname + this.url.search`
   */
  readonly path: string;
  /**
   * Full URL object — a **plain property** (not a getter) on H3Event, safe to
   * replace for internal URL rewrites. After assignment, `event.path` will
   * automatically reflect the new pathname + search via the getter.
   */
  url: URL;
  /**
   * Web Fetch API Headers — always populated in h3 v2 regardless of preset
   * (Node, Bun, Deno). Use `.get(name)` instead of bracket-access.
   */
  readonly headers: Headers;
  /**
   * Lazy response object — created on first access; its `headers` carry outgoing
   * response headers (e.g. Set-Cookie) that h3 merges into the HTTP response.
   */
  readonly res: {
    readonly headers: Headers;
  };
};

const intlayerConfig = getConfiguration();
const logger = getAppLogger(intlayerConfig);
logger(`Intlayer proxy ${colorize('enabled', ANSIColors.GREEN)}`, {
  level: 'info',
});

const nodeMiddleware = createIntlayerProxyHandler();

/**
 * Native h3 v2 event handler for Nitro production servers (TanStack Start, Nuxt, etc.).
 *
 * Unlike `fromNodeMiddleware` (h3 v1 API), this handler uses the Web Fetch API event
 * model exclusively and is therefore compatible with ALL Nitro presets — including Bun
 * and Deno — where `event.node` is `undefined` and `fromNodeMiddleware` crashes with
 * "undefined is not an object (evaluating 'event.node.req')".
 *
 * It bridges h3 v2 events to the Node.js-style `createIntlayerProxyHandler` middleware
 * via lightweight IncomingMessage / ServerResponse shims:
 *
 * - **Redirect** (301 / 5xx): builds a Web API `Response` and returns it — Nitro sends
 *   the correct HTTP response to the browser.
 * - **Rewrite** (`next()` + modified `req.url`): replaces `event.url` with the rewritten
 *   URL so `event.path` (a getter) returns the new pathname for downstream handlers and
 *   the Nitro router.
 * - **Pass-through** (`next()`, URL unchanged): returns `undefined` — Nitro proceeds to
 *   the next handler / route.
 */
export default async (event: H3EventLike): Promise<Response | void> =>
  new Promise<Response | void>((resolve) => {
    const initialPath = event.path;

    /**
     * Minimal IncomingMessage shim.
     *
     * Only the fields actually read by createIntlayerProxyHandler are populated:
     *   - url            : the current pathname + search, modified for rewrites
     *   - headers.cookie : locale cookie detection
     *   - headers.host   : domain-based locale routing
     *   - headers.accept-language : browser Accept-Language fallback
     *   - headers.x-forwarded-* : forwarded host/proto for reverse-proxy setups
     *
     * headers must be a mutable plain object because setLocaleInStorageServer
     * writes Set-Cookie back via req.headers[name] = value.
     */
    const fakeReq = {
      url: initialPath,
      method: 'GET',
      headers: {
        cookie: event.headers.get('cookie') ?? '',
        host: event.headers.get('host') ?? '',
        'accept-language': event.headers.get('accept-language') ?? '',
        'x-forwarded-host': event.headers.get('x-forwarded-host') ?? '',
        'x-forwarded-proto': event.headers.get('x-forwarded-proto') ?? '',
      } as Record<string, string>,
    } as unknown as IncomingMessage;

    let responseStatusCode = 200;
    const accumulatedHeaders: Record<string, string> = {};

    /**
     * Minimal ServerResponse shim.
     *
     * Implements only the methods that createIntlayerProxyHandler invokes:
     *   writeHead() — status + Location header for 301 redirects
     *   setHeader() — Set-Cookie written by setLocaleInStorageServer
     *   getHeader() — defensive read-back (not strictly required but safe)
     *   end()       — finalises the response; for redirects this returns a
     *                 Web API Response object that Nitro sends to the client
     */
    const fakeRes = {
      writeHead(
        statusCode: number,
        headersArg?: Record<string, string | string[] | number> | string
      ) {
        // Capture the status code and any headers supplied alongside writeHead.
        responseStatusCode = statusCode;
        if (headersArg && typeof headersArg === 'object') {
          for (const [key, value] of Object.entries(headersArg)) {
            accumulatedHeaders[key.toLowerCase()] = Array.isArray(value)
              ? (value[0] ?? '')
              : String(value);
          }
        }
        return fakeRes;
      },
      setHeader(name: string, value: string | number | string[]) {
        // Capture Set-Cookie and other outgoing headers.
        accumulatedHeaders[name.toLowerCase()] = Array.isArray(value)
          ? (value[0] ?? '')
          : String(value);
        return fakeRes;
      },
      getHeader(name: string) {
        return accumulatedHeaders[name.toLowerCase()];
      },
      getHeaders() {
        return { ...accumulatedHeaders };
      },
      end(body?: string | Buffer | null) {
        // Build a Web API Response from accumulated status + headers + body.
        // For 3xx redirects the body is intentionally null.
        const webHeaders = new Headers();
        for (const [key, value] of Object.entries(accumulatedHeaders)) {
          webHeaders.set(key, value);
        }
        const isRedirect =
          responseStatusCode >= 300 && responseStatusCode < 400;
        resolve(
          new Response(
            isRedirect ? null : typeof body === 'string' ? body : null,
            {
              status: responseStatusCode,
              headers: webHeaders,
            }
          )
        );
        return fakeRes;
      },
      headersSent: false,
    } as unknown as ServerResponse<IncomingMessage>;

    nodeMiddleware(fakeReq, fakeRes, () => {
      // Middleware called next() — either a URL rewrite or a true pass-through.
      const rewrittenPath = fakeReq.url as string;

      if (rewrittenPath !== initialPath) {
        // The middleware rewrote the URL (e.g. /about → /en/about for locale prefix).
        // Replace event.url so that event.path (the getter: url.pathname + url.search)
        // returns the new path and the Nitro router matches the correct route.
        //
        // event.url is a plain property on h3 v2's H3Event (not a getter), so direct
        // assignment is safe. We use event.url.origin as the base so relative paths
        // resolve correctly; for path-only requests origin defaults to http://localhost.
        try {
          event.url = new URL(rewrittenPath, event.url.origin);
        } catch {
          console.error(
            '[intlayer-proxy] URL rewrite failed — invalid path:',
            rewrittenPath
          );
        }
      }

      // Forward any Set-Cookie or custom headers set by setLocaleInStorageServer to
      // the h3 v2 response object so they are included in the outgoing HTTP response.
      // Accessing event.res lazily creates the H3EventResponse (no cost if empty).
      if (Object.keys(accumulatedHeaders).length > 0) {
        for (const [key, value] of Object.entries(accumulatedHeaders)) {
          event.res.headers.set(key, value);
        }
      }

      resolve(undefined);
    });
  });
