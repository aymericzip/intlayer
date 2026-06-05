import type { IncomingMessage, ServerResponse } from 'node:http';
import { createIntlayerProxyHandler } from 'vite-intlayer';

/**
 * Minimal duck-type for h3 v2's H3Event (same pattern as vite-intlayer's
 * intlayerNitroHandler). We avoid importing from 'h3' so this file compiles
 * without h3 in devDependencies and works with all Nitro presets.
 */
type H3EventLike = {
  readonly path: string;
  url: URL;
  readonly headers: Headers;
  readonly res: { readonly headers: Headers };
};

const nodeMiddleware = createIntlayerProxyHandler();

/**
 * Native h3 v2 event handler for Nitro-powered Nuxt servers.
 *
 * Registered automatically by `nuxt-intlayer` via `addServerHandler` so locale
 * detection, redirects, and rewrites run in both dev and production.
 *
 * Bridges the Web Fetch API event model (h3 v2) to the Node.js-style
 * `createIntlayerProxyHandler` middleware via IncomingMessage / ServerResponse shims.
 * Compatible with ALL Nitro presets — Node, Bun, Deno — where `event.node` may be
 * undefined and `fromNodeMiddleware` (h3 v1 API) would crash.
 *
 * If you need custom Intlayer config or an `ignore` predicate, bypass
 * auto-registration and add your own handler in `server/middleware/intlayerProxy.ts`:
 *
 * @example
 * ```ts
 * // server/middleware/intlayerProxy.ts
 * import type { H3Event } from 'h3';
 * import { createIntlayerProxyHandler } from 'vite-intlayer';
 *
 * const nodeMiddleware = createIntlayerProxyHandler(myConfig, {
 *   ignore: (req) => req.url?.startsWith('/api'),
 * });
 *
 * export default async (event: H3Event): Promise<Response | void> => {
 *   // ... same shim pattern as this file
 * };
 * ```
 */
export default async (event: H3EventLike): Promise<Response | void> =>
  new Promise<Response | void>((resolve) => {
    const initialPath = event.path;

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

    const fakeRes = {
      writeHead(
        statusCode: number,
        headersArg?: Record<string, string | string[] | number> | string
      ) {
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
        const webHeaders = new Headers();
        for (const [key, value] of Object.entries(accumulatedHeaders)) {
          webHeaders.set(key, value);
        }
        const isRedirect =
          responseStatusCode >= 300 && responseStatusCode < 400;
        resolve(
          new Response(
            isRedirect ? null : typeof body === 'string' ? body : null,
            { status: responseStatusCode, headers: webHeaders }
          )
        );
        return fakeRes;
      },
      headersSent: false,
    } as unknown as ServerResponse<IncomingMessage>;

    nodeMiddleware(fakeReq, fakeRes, () => {
      const rewrittenPath = fakeReq.url as string;

      if (rewrittenPath !== initialPath) {
        // Rewrite: update event.url so event.path reflects the new path for the router.
        try {
          event.url = new URL(rewrittenPath, event.url.origin);
        } catch {
          console.error(
            '[intlayer-proxy] URL rewrite failed — invalid path:',
            rewrittenPath
          );
        }
      }

      // Forward Set-Cookie and any other headers to the h3 v2 response.
      if (Object.keys(accumulatedHeaders).length > 0) {
        for (const [key, value] of Object.entries(accumulatedHeaders)) {
          event.res.headers.set(key, value);
        }
      }

      resolve(undefined);
    });
  });
