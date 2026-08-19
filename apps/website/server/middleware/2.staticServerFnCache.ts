/**
 * Nitro production middleware — serves the TanStack Start static server
 * function payloads that Nitro's baked public-asset manifest does not know
 * about.
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
 * Reading the payload straight off disk here restores the intended behaviour.
 *
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps this
 * file runtime-agnostic and resolves without h3 in devDependencies.
 */

import { readFile } from 'node:fs/promises';
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

export default async (event: H3EventLike): Promise<Response | void> => {
  const method = event.req?.method ?? 'GET';
  if (!READABLE_METHODS.has(method)) return;

  const pathname = event.path.split('?')[0];
  if (!STATIC_SERVER_FN_CACHE_PATTERN.test(pathname)) return;

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    // Filenames are content-addressed (SHA-1 of function id + arguments).
    'Cache-Control': 'public, max-age=31536000, immutable',
  };

  try {
    const payload = await readFile(
      resolve(getPublicDirectory(), `.${pathname}`),
      'utf-8'
    );

    return new Response(method === 'HEAD' ? null : payload, { headers });
  } catch {
    // Answer misses as JSON 404s rather than letting the locale catch-all
    // return the HTML shell, which surfaces as an opaque JSON parse error.
    return new Response(
      method === 'HEAD'
        ? null
        : '{"error":"static server function payload not found"}',
      { status: 404, headers }
    );
  }
};
