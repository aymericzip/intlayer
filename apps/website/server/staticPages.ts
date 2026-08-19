/**
 * Nitro production middleware — serves TanStack Start's prerendered pages and
 * their pre-compressed variants straight from `.output/public`.
 *
 * ## Why this exists
 *
 * Nitro scans `.output/public` and inlines the resulting asset manifest into
 * `.output/server/index.mjs` *before* TanStack Start's prerender step runs.
 * Every HTML file the prerender writes afterwards is therefore present on disk
 * but absent from that manifest, so Nitro's static handler declines the request
 * and the SSR catch-all re-renders the page — loaders included — on every hit.
 * The whole prerender pass is built, shipped, and never read.
 *
 * Reading the payload straight off disk here restores the intended behaviour:
 * a prerendered route becomes a file read instead of a React render.
 *
 * ## Why it is registered as a Nitro module rather than `server/middleware/`
 *
 * Files under `server/middleware/` are scanned into `nitro.options.handlers`
 * before any module-provided handler, which would place this one *ahead* of the
 * Intlayer locale proxy. The proxy is what turns `/` into a 302 to `/fr` for a
 * French visitor, so serving the English `/index.html` ahead of it would strip
 * locale negotiation. Registering through `vite.config.ts` — after the plugin
 * that installs the proxy — keeps the proxy first and lets it answer redirects.
 *
 * ## Why the lookup uses the *original* request path
 *
 * The proxy rewrites `event.url` to the locale-internal path (`/` → `/en`), but
 * the prerender names its files after the public path (`/index.html`, and
 * `/ru/index.html` for a prefixed locale). `event.req.url` keeps that public
 * path, so it — not `event.path` — is what maps onto disk.
 *
 * ## Why it returns headers copied from `event.res.headers`
 *
 * Nitro runs route-rule middleware before app middleware, so by this point
 * `event.res.headers` already carries the CSP, HSTS and frame headers declared
 * in `vite.config.ts`. Returning a bare `new Response(body)` would discard all
 * of them; the response is built from a copy of those headers instead.
 *
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps this
 * file runtime-agnostic and resolves without h3 in devDependencies.
 */

import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

type H3EventLike = {
  readonly path: string;
  readonly req: {
    readonly method?: string;
    readonly url?: string;
    readonly headers: { get: (name: string) => string | null };
  };
  readonly res: { readonly headers: Headers };
};

/** Request methods that may be answered from a file on disk. */
const READABLE_METHODS = new Set(['GET', 'HEAD']);

/**
 * Path prefixes owned by the server rather than by the prerender output.
 * `/_serverFn/` carries server-function RPC calls and `/api/` the app's own
 * routes; neither may ever be shadowed by a file that happens to sit at the
 * same path.
 *
 * `/__tsr/` is deliberately *not* reserved. Nothing in TanStack Start answers
 * on that prefix at runtime — the RPC base is `/_serverFn/` — and the only
 * thing living under it is `/__tsr/staticServerFnCache/*.json`, written by
 * `staticFunctionMiddleware` during the prerender pass. Those files reach the
 * public directory after Nitro has baked its asset manifest, so this handler is
 * the only one that can serve them; reserving the prefix answered every static
 * server-function read with the SSR catch-all's 404, and the client middleware
 * parses that body as seroval regardless of status — throwing
 * "Seroval Error (step: 3)" out of the suspended component and into the page's
 * error boundary.
 */
const RESERVED_PATH_PREFIXES = ['/_serverFn/', '/api/'] as const;

/**
 * Content encodings this middleware can serve, ordered best-compression first.
 * Each maps to the filename suffix written by `scripts/compress-static.ts`.
 */
const CONTENT_ENCODINGS = [
  { token: 'br', suffix: '.br' },
  { token: 'gzip', suffix: '.gz' },
] as const;

type ContentEncoding = (typeof CONTENT_ENCODINGS)[number];

/** Media types keyed by file extension, for the responses this handler serves. */
const MEDIA_TYPES: Readonly<Record<string, string>> = {
  css: 'text/css; charset=utf-8',
  html: 'text/html; charset=utf-8',
  ico: 'image/x-icon',
  js: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  svg: 'image/svg+xml',
  txt: 'text/plain; charset=utf-8',
  xml: 'application/xml; charset=utf-8',
};

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

/**
 * Extracts the public pathname from the untouched incoming request URL.
 *
 * Falls back to `event.path` when `event.req.url` is unavailable, accepting the
 * locale-internal rewrite in that case rather than failing the lookup outright.
 */
const getPublicPathname = (event: H3EventLike): string | null => {
  const requestUrl = event.req.url;

  if (!requestUrl) return event.path.split('?')[0];

  try {
    return new URL(requestUrl, 'http://localhost').pathname;
  } catch {
    return null;
  }
};

/**
 * Maps a public pathname onto the candidate files that may satisfy it.
 *
 * `/doc/get-started` resolves to `/doc/get-started/index.html`, while
 * `/robots.txt` resolves to itself — both forms are tried, cheapest first.
 */
const getCandidateRelativePaths = (pathname: string): string[] => {
  const withoutTrailingSlash = pathname.replace(/\/+$/, '');

  if (withoutTrailingSlash === '') return ['index.html'];

  const normalized = withoutTrailingSlash.replace(/^\/+/, '');
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(normalized);

  return hasExtension ? [normalized] : [`${normalized}/index.html`];
};

/**
 * Resolves a candidate against the public directory, rejecting any path that
 * escapes it. Guards against `..` segments surviving URL decoding.
 */
const resolveWithinPublicDirectory = (relativePath: string): string | null => {
  let decodedPath: string;

  try {
    decodedPath = decodeURIComponent(relativePath);
  } catch {
    return null;
  }

  if (decodedPath.includes('\0')) return null;

  const absolutePath = resolve(publicDirectory, decodedPath);

  return absolutePath.startsWith(`${publicDirectory}${sep}`)
    ? absolutePath
    : null;
};

/**
 * Picks the best pre-compressed variant the client accepts and that exists on
 * disk, or `null` when the identity encoding should be served.
 */
const negotiateContentEncoding = async (
  absolutePath: string,
  acceptEncodingHeader: string | null
): Promise<{ encoding: ContentEncoding; size: number } | null> => {
  if (!acceptEncodingHeader) return null;

  const acceptedTokens = new Set(
    acceptEncodingHeader
      .split(',')
      .map((part) => part.split(';')[0].trim().toLowerCase())
  );

  for (const encoding of CONTENT_ENCODINGS) {
    if (!acceptedTokens.has(encoding.token)) continue;

    try {
      const stats = await stat(`${absolutePath}${encoding.suffix}`);
      if (stats.isFile()) return { encoding, size: stats.size };
    } catch {
      // Variant not generated for this file — try the next encoding.
    }
  }

  return null;
};

/** Returns the media type for a file path, defaulting to binary. */
const getMediaType = (absolutePath: string): string => {
  const extension = absolutePath.split('.').pop()?.toLowerCase() ?? '';

  return MEDIA_TYPES[extension] ?? 'application/octet-stream';
};

/**
 * Builds a validator that changes whenever the file's size, mtime or encoding
 * changes — enough for a static build whose files are rewritten wholesale.
 */
const buildEntityTag = (
  size: number,
  modifiedTimeMs: number,
  encodingToken: string
): string =>
  `"${size.toString(16)}-${Math.floor(modifiedTimeMs).toString(16)}-${encodingToken}"`;

export default async (event: H3EventLike): Promise<Response | void> => {
  const method = event.req.method ?? 'GET';
  if (!READABLE_METHODS.has(method)) return;

  const pathname = getPublicPathname(event);
  if (pathname === null) return;

  if (RESERVED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return;
  }

  for (const relativePath of getCandidateRelativePaths(pathname)) {
    const absolutePath = resolveWithinPublicDirectory(relativePath);
    if (!absolutePath) continue;

    let fileStats: Awaited<ReturnType<typeof stat>>;
    try {
      fileStats = await stat(absolutePath);
    } catch {
      continue; // Not prerendered — fall through to the SSR catch-all.
    }
    if (!fileStats.isFile()) continue;

    const negotiated = await negotiateContentEncoding(
      absolutePath,
      event.req.headers.get('accept-encoding')
    );

    const entityTag = buildEntityTag(
      negotiated?.size ?? fileStats.size,
      fileStats.mtimeMs,
      negotiated?.encoding.token ?? 'identity'
    );

    // Copy the headers the route rules already applied (CSP, HSTS, frame
    // options, per-route Cache-Control) so the static path stays as locked
    // down as the SSR path.
    const headers = new Headers(event.res.headers);
    headers.set('Content-Type', getMediaType(absolutePath));
    headers.set('ETag', entityTag);
    // Appended rather than assigned: the locale proxy may already vary the
    // response on Cookie / Accept-Language, and dropping that would let a CDN
    // hand one visitor's locale to everyone.
    headers.append('Vary', 'Accept-Encoding');
    if (!headers.has('Cache-Control')) {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }
    if (negotiated) headers.set('Content-Encoding', negotiated.encoding.token);

    if (event.req.headers.get('if-none-match') === entityTag) {
      return new Response(null, { status: 304, headers });
    }

    if (method === 'HEAD') return new Response(null, { headers });

    const body = await readFile(
      negotiated ? `${absolutePath}${negotiated.encoding.suffix}` : absolutePath
    );

    return new Response(body as unknown as BodyInit, { headers });
  }
};
