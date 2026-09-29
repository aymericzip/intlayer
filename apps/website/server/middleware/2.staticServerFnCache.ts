/**
 * Nitro production middleware — answers TanStack Start static server
 * function payload requests that have nothing on disk.
 *
 * Nitro scans `.output/public` and inlines the resulting asset manifest into
 * `.output/server/index.mjs` *before* TanStack Start's prerender step runs.
 * Every file the prerender writes afterwards — including the payloads that
 * `staticFunctionMiddleware` emits under `/__tsr/staticServerFnCache/` — is
 * therefore present on disk but absent from that manifest, so Nitro's static
 * handler declines the request and the SSR catch-all answers it with the HTML
 * shell (200, `text/html`, `lang="__tsr"`). The client half of
 * `staticFunctionMiddleware` then calls `response.json()` on that HTML and
 * throws `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`.
 *
 * Payloads that exist fall through to `server/staticPages.ts`, which serves
 * them with its precompressed `.br` / `.gz` variants, a stat-based ETag and
 * `must-revalidate`. Revalidation matters: filenames hash the function id and
 * its arguments, not the result, so one URL carries new content after every
 * deploy that changes it.
 *
 * Requests with nothing on disk are answered here — see `CACHE_MISS_BODY`. A
 * miss is the normal case whenever the prerender pass is disabled (which also
 * disables `staticPages`), and letting it fall through is what turns a plain
 * cache miss into a page-level crash.
 *
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps this
 * file runtime-agnostic and resolves without h3 in devDependencies.
 */

import { stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type H3EventLike = {
  readonly path: string;
  readonly req?: { readonly method?: string };
};

/**
 * Payload filenames are the SHA-1 of `${functionId}__${serializedArguments}`,
 * so matching the full hexadecimal digest both routes the request and rules
 * out any path traversal in the resolved filename.
 */
const STATIC_SERVER_FN_CACHE_PATTERN =
  /^\/__tsr\/staticServerFnCache\/[0-9a-f]{40}\.json$/;

const READABLE_METHODS = new Set(['GET', 'HEAD']);

/**
 * Body served for a payload that was never written — the seroval node for
 * `undefined`, which is `JSON.stringify(toJSON(undefined))`.
 *
 * The client half of `staticFunctionMiddleware` pipes every response through
 * `fetch(url).then((r) => r.json()).then((d) => fromJSON(d))`, checking neither
 * the status nor wrapping the chain in a `catch`, so an error-shaped 404 body
 * still reaches `fromJSON` — which rejects it with `Seroval Error (step: 3)`
 * straight out of the route loader and into the page's error boundary.
 * Answering with a payload it *can* deserialize makes a miss falsy, and falsy
 * is what makes it fall through to the real server-function RPC.
 *
 * Every navigation takes this path when the prerender pass is off
 * (`DISABLE_OPTIMIZATION=true`), which writes no payloads at all, as does any
 * argument combination a normal build did not prerender.
 *
 * Written literally rather than derived because `seroval` is a dependency of
 * `@tanstack/start-static-server-functions`, not of this app;
 * `server/staticServerFnCache.test.ts` asserts the literal against the very
 * copy that middleware deserializes with.
 */
const CACHE_MISS_BODY = '{"t":{"t":2,"s":1},"f":127,"m":[]}';

/**
 * A miss is only a miss for the deployment that answered it: the next build may
 * prerender the very same function and arguments under the same filename, so
 * the absence must not be cached the way a hit is.
 */
const MISS_CACHE_CONTROL = 'no-store';

/** A miss is a seroval node encoded as JSON, like a stored payload. */
const CONTENT_TYPE = 'application/json; charset=utf-8';

/**
 * Absolute path of the Nitro public directory (`.output/public`), derived from
 * the server entry exactly the way Nitro's own `readAsset` helper does.
 * `__nitro_main__` is assigned by the generated server bundle at startup.
 */
const getPublicDirectory = (): string => {
  const serverEntryUrl =
    (globalThis as { __nitro_main__?: string }).__nitro_main__ ??
    import.meta.url;

  return resolve(dirname(fileURLToPath(serverEntryUrl)), '../public');
};

/** Resolved once per process — the public directory never moves at runtime. */
const publicDirectory = getPublicDirectory();

export default async (event: H3EventLike): Promise<Response | undefined> => {
  const method = event.req?.method ?? 'GET';
  if (!READABLE_METHODS.has(method)) return;

  const pathname = event.path.split('?')[0];
  if (!STATIC_SERVER_FN_CACHE_PATTERN.test(pathname)) return;

  const isStoredPayload = await stat(resolve(publicDirectory, `.${pathname}`))
    .then((payloadStats) => payloadStats.isFile())
    .catch(() => false);

  // Served by `server/staticPages.ts`, registered after this middleware.
  if (isStoredPayload) return;

  // Answer misses with a deserializable payload rather than letting the
  // locale catch-all return the HTML shell, which surfaces as an opaque JSON
  // parse error. The 404 stays for anything reading the status; the body is
  // what the client middleware actually acts on.
  return new Response(method === 'HEAD' ? null : CACHE_MISS_BODY, {
    status: 404,
    headers: {
      'Content-Type': CONTENT_TYPE,
      'Cache-Control': MISS_CACHE_CONTROL,
    },
  });
};
