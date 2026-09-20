/**
 * Web Fetch API bridge for the Intlayer proxy.
 *
 * The proxy itself is a Node-style middleware (`intlayerProxyHandler`). Runtimes
 * that only expose a `Request` (Astro middleware, h3 v2 events, Workers…) run it
 * through the lightweight `IncomingMessage` / `ServerResponse` shims below and
 * read the outcome back as plain data.
 *
 * Nothing here may import `@intlayer/config/node`: this module is bundled into
 * production servers.
 */

import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  createProxyHandler,
  type IntlayerProxyHandlerOptions,
  type NodeMiddleware,
} from './intlayerProxyHandler';

/**
 * Subset of a Web request the proxy needs.
 */
export type WebProxyRequest = {
  /** Absolute URL of the incoming request. */
  url: URL;
  /** Incoming request headers. */
  headers: Headers;
};

/**
 * Outcome of running the proxy on a request.
 *
 * - `response`: the proxy answered the request itself (a locale redirect, or a
 *   5xx when a redirect loop was detected). Send it as is.
 * - `next`: the request continues down the pipeline. `rewrittenPath` is set
 *   when the proxy changed the internal path (e.g. `/about` → `/en/about`), and
 *   `headers` carries the outgoing headers it produced (typically `Set-Cookie`
 *   persisting the resolved locale) to append to the final response.
 */
export type WebProxyOutcome =
  | { kind: 'response'; response: Response }
  | { kind: 'next'; rewrittenPath: string | undefined; headers: Headers };

/**
 * Header names the proxy reads from the incoming request.
 */
const FORWARDED_REQUEST_HEADERS = [
  'cookie',
  'host',
  'accept-language',
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-nitro-prerender',
] as const;

type NodeHeaderValue = string | number | readonly string[];

/**
 * Runs a Node-style proxy middleware against a Web request.
 *
 * The proxy answers synchronously, so no promise is involved. Only the fields
 * it actually touches are shimmed:
 * - `req.url` / `req.headers` (mutable plain object: `setLocaleInStorageServer`
 *   writes the locale header back through it)
 * - `res.writeHead` / `res.setHeader` / `res.getHeader` / `res.end` for
 *   redirects and cookies
 *
 * @param nodeMiddleware - The middleware returned by `createProxyHandler`.
 * @param request - The incoming Web request.
 * @returns The proxy outcome, see {@link WebProxyOutcome}.
 */
export const runProxyOnWebRequest = (
  nodeMiddleware: NodeMiddleware,
  request: WebProxyRequest
): WebProxyOutcome => {
  const initialPath = `${request.url.pathname}${request.url.search}`;

  const requestHeaders: Record<string, string> = {};
  for (const headerName of FORWARDED_REQUEST_HEADERS) {
    requestHeaders[headerName] = request.headers.get(headerName) ?? '';
  }

  const fakeRequest = {
    url: initialPath,
    method: 'GET',
    headers: requestHeaders,
  } as unknown as IncomingMessage;

  let outcome: WebProxyOutcome | undefined;
  let statusCode = 200;
  const responseHeaders = new Headers();

  const setHeader = (name: string, value: NodeHeaderValue) => {
    if (Array.isArray(value)) {
      // Several `Set-Cookie` values must stay separate headers.
      responseHeaders.delete(name);
      for (const item of value) responseHeaders.append(name, item);
      return;
    }
    responseHeaders.set(name, String(value));
  };

  const fakeResponse = {
    writeHead(status: number, headers?: Record<string, NodeHeaderValue>) {
      statusCode = status;
      if (headers && typeof headers === 'object') {
        for (const [name, value] of Object.entries(headers)) {
          setHeader(name, value);
        }
      }
      return fakeResponse;
    },
    setHeader(name: string, value: NodeHeaderValue) {
      setHeader(name, value);
      return fakeResponse;
    },
    getHeader(name: string) {
      if (name.toLowerCase() === 'set-cookie') {
        const cookies = responseHeaders.getSetCookie();
        return cookies.length > 0 ? cookies : undefined;
      }
      return responseHeaders.get(name) ?? undefined;
    },
    end(body?: string | Buffer | null) {
      const isRedirect = statusCode >= 300 && statusCode < 400;
      outcome = {
        kind: 'response',
        response: new Response(
          !isRedirect && typeof body === 'string' ? body : null,
          { status: statusCode, headers: responseHeaders }
        ),
      };
      return fakeResponse;
    },
  } as unknown as ServerResponse<IncomingMessage>;

  nodeMiddleware(fakeRequest, fakeResponse, () => {
    const currentPath = fakeRequest.url as string;
    outcome = {
      kind: 'next',
      rewrittenPath: currentPath === initialPath ? undefined : currentPath,
      headers: responseHeaders,
    };
  });

  // The proxy either ends the response or calls `next()` on every path.
  return (
    outcome ?? {
      kind: 'next',
      rewrittenPath: undefined,
      headers: responseHeaders,
    }
  );
};

/**
 * Handler running the Intlayer proxy on Web requests.
 */
export type IntlayerWebProxyHandler = (
  request: WebProxyRequest
) => WebProxyOutcome;

/**
 * Creates a proxy handler for runtimes that expose Web `Request`s rather than
 * Node's `IncomingMessage`.
 *
 * @param options - Same options as `createProxyHandler`; `configuration` must
 *   be the built configuration (`@intlayer/config/built`), never one loaded
 *   through `@intlayer/config/node`.
 *
 * @example
 * ```ts
 * const proxy = createIntlayerWebProxyHandler({ configuration });
 * const outcome = proxy({ url: new URL(request.url), headers: request.headers });
 * if (outcome.kind === 'response') return outcome.response;
 * ```
 */
export const createIntlayerWebProxyHandler = (
  options: IntlayerProxyHandlerOptions
): IntlayerWebProxyHandler => {
  const nodeMiddleware = createProxyHandler(options);

  return (request) => runProxyOnWebRequest(nodeMiddleware, request);
};
