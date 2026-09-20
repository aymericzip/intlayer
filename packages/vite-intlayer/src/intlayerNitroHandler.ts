/**
 * The configuration as a plain JSON object.
 *
 * Bundlers alias `@intlayer/config/built` to the generated
 * `.intlayer/config/configuration.mjs`, which inlines the resolved
 * configuration at build time. Loading it through `@intlayer/config/node`
 * instead would transpile `intlayer.config.ts` with `esbuild` on every server
 * start, making the built server unable to boot without `node_modules` next to
 * it - which is exactly what a Nitro deployment output is.
 */
import * as builtConfiguration from '@intlayer/config/built';
import { getAppLogger } from '@intlayer/config/logger';
import { formatProxyEnabledMessage } from '@intlayer/core/localization';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createProxyHandler, isPrerenderProcess } from './intlayerProxyHandler';
import { runProxyOnWebRequest } from './intlayerWebProxyHandler';

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

const intlayerConfig = builtConfiguration as unknown as IntlayerConfig;
const logger = getAppLogger(intlayerConfig);
// A Nitro server is a production server, so the stored locale drives redirects
// here — hence the `false`. Announced once per server process, except while a
// build prerenders through this server: the build already announced the proxy
// (see `announceBuild` in `intlayerProxyPlugin`), and every request of that
// pass is a prerender request anyway.
if (!isPrerenderProcess()) {
  logger(formatProxyEnabledMessage(false), { level: 'info' });
}

const nodeMiddleware = createProxyHandler({ configuration: intlayerConfig });

/**
 * Native h3 v2 event handler for Nitro production servers (TanStack Start, Nuxt, etc.).
 *
 * Unlike `fromNodeMiddleware` (h3 v1 API), this handler uses the Web Fetch API event
 * model exclusively and is therefore compatible with ALL Nitro presets — including Bun
 * and Deno — where `event.node` is `undefined` and `fromNodeMiddleware` crashes with
 * "undefined is not an object (evaluating 'event.node.req')".
 *
 * It bridges h3 v2 events to the Node.js-style proxy middleware through
 * `runProxyOnWebRequest`:
 *
 * - **Redirect** (301 / 5xx): builds a Web API `Response` and returns it — Nitro sends
 *   the correct HTTP response to the browser.
 * - **Rewrite** (`next()` + modified `req.url`): replaces `event.url` with the rewritten
 *   URL so `event.path` (a getter) returns the new pathname for downstream handlers and
 *   the Nitro router.
 * - **Pass-through** (`next()`, URL unchanged): returns `undefined` — Nitro proceeds to
 *   the next handler / route.
 */
export default (event: H3EventLike): Response | undefined => {
  const outcome = runProxyOnWebRequest(nodeMiddleware, {
    url: event.url,
    headers: event.headers,
  });

  if (outcome.kind === 'response') return outcome.response;

  if (outcome.rewrittenPath) {
    // Replace event.url so that event.path (the getter: url.pathname +
    // url.search) returns the new path and the Nitro router matches the
    // correct route. event.url is a plain property on h3 v2's H3Event (not a
    // getter), so direct assignment is safe.
    try {
      event.url = new URL(outcome.rewrittenPath, event.url.origin);
    } catch {
      console.error(
        '[intlayer-proxy] URL rewrite failed — invalid path:',
        outcome.rewrittenPath
      );
    }
  }

  // Forward Set-Cookie / custom headers written by setLocaleInStorageServer to
  // the h3 v2 response. Accessing event.res lazily creates the H3EventResponse
  // (no cost if empty).
  for (const [name, value] of outcome.headers) {
    event.res.headers.append(name, value);
  }
};
