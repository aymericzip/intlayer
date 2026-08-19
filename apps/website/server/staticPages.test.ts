/* @vitest-environment node */

import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { beforeAll, describe, expect, it } from 'vitest';

/**
 * Shape of the h3 event the middleware consumes, mirrored here so the tests
 * can build one without pulling in Nitro's runtime.
 */
type TestEvent = {
  path: string;
  req: {
    method?: string;
    url?: string;
    headers: { get: (name: string) => string | null };
  };
  res: { headers: Headers };
};

type StaticPagesHandler = (
  event: TestEvent
) => Promise<Response | undefined | void>;

const HOME_PAGE_HTML = `<!doctype html><title>home</title>${'padding'.repeat(300)}`;
const DOC_PAGE_HTML = `<!doctype html><title>doc</title>${'padding'.repeat(300)}`;

/** Stands in for a `staticFunctionMiddleware` cache entry, seroval payload included. */
const STATIC_CACHE_NAME = 'be79bcf7ed21a235f33aeca5c60cb2e2edeafa59.json';
const STATIC_CACHE_JSON = '{"t":{"t":2,"i":0,"a":[]}}';

let handleStaticPage: StaticPagesHandler;

/**
 * Builds a request event, defaulting to a GET that carries no conditional or
 * encoding preferences.
 */
const createEvent = ({
  url,
  path = new URL(url, 'http://localhost').pathname,
  method = 'GET',
  requestHeaders = {},
  responseHeaders = {},
}: {
  url: string;
  path?: string;
  method?: string;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
}): TestEvent => ({
  path,
  req: {
    method,
    url: `http://localhost${url}`,
    headers: {
      get: (name: string) => requestHeaders[name.toLowerCase()] ?? null,
    },
  },
  res: { headers: new Headers(responseHeaders) },
});

beforeAll(async () => {
  // The middleware derives `.output/public` from the Nitro server entry, so the
  // fixture mimics that layout and announces it the way the bundle does.
  const rootDirectory = await mkdtemp(join(tmpdir(), 'static-pages-'));
  const publicDirectory = join(rootDirectory, 'public');

  await mkdir(join(publicDirectory, 'doc', 'get-started'), { recursive: true });
  await mkdir(join(rootDirectory, 'server'), { recursive: true });
  await mkdir(join(publicDirectory, 'ru'), { recursive: true });
  await mkdir(join(publicDirectory, '__tsr', 'staticServerFnCache'), {
    recursive: true,
  });

  await writeFile(join(publicDirectory, 'index.html'), HOME_PAGE_HTML);
  await writeFile(
    join(publicDirectory, 'index.html.br'),
    brotliCompressSync(Buffer.from(HOME_PAGE_HTML))
  );
  await writeFile(
    join(publicDirectory, 'index.html.gz'),
    gzipSync(Buffer.from(HOME_PAGE_HTML))
  );
  await writeFile(
    join(publicDirectory, 'doc', 'get-started', 'index.html'),
    DOC_PAGE_HTML
  );
  await writeFile(join(publicDirectory, 'ru', 'index.html'), '<!doctype html>');
  await writeFile(join(publicDirectory, 'robots.txt'), 'User-agent: *');
  await writeFile(
    join(publicDirectory, '__tsr', 'staticServerFnCache', STATIC_CACHE_NAME),
    STATIC_CACHE_JSON
  );

  (globalThis as { __nitro_main__?: string }).__nitro_main__ = pathToFileURL(
    join(rootDirectory, 'server', 'index.mjs')
  ).href;

  handleStaticPage = (await import('./staticPages')).default;
});

describe('staticPages middleware', () => {
  it('serves the prerendered page for the site root', async () => {
    const response = await handleStaticPage(createEvent({ url: '/' }));

    expect(response?.status).toBe(200);
    expect(await response?.text()).toBe(HOME_PAGE_HTML);
    expect(response?.headers.get('Content-Type')).toBe(
      'text/html; charset=utf-8'
    );
  });

  it('resolves an extensionless path to its index.html', async () => {
    const response = await handleStaticPage(
      createEvent({ url: '/doc/get-started' })
    );

    expect(await response?.text()).toBe(DOC_PAGE_HTML);
  });

  it('ignores a trailing slash', async () => {
    const response = await handleStaticPage(
      createEvent({ url: '/doc/get-started/' })
    );

    expect(await response?.text()).toBe(DOC_PAGE_HTML);
  });

  it('serves a file that carries its own extension', async () => {
    const response = await handleStaticPage(
      createEvent({ url: '/robots.txt' })
    );

    expect(await response?.text()).toBe('User-agent: *');
    expect(response?.headers.get('Content-Type')).toBe(
      'text/plain; charset=utf-8'
    );
  });

  it('looks up the original request path, not the locale-rewritten one', async () => {
    // The Intlayer proxy rewrites `/` to `/en`, for which nothing is prerendered.
    const response = await handleStaticPage(
      createEvent({ url: '/', path: '/en' })
    );

    expect(await response?.text()).toBe(HOME_PAGE_HTML);
  });

  it('falls through when the route was not prerendered', async () => {
    const response = await handleStaticPage(
      createEvent({ url: '/doc/not-prerendered' })
    );

    expect(response).toBeUndefined();
  });

  it.each(['/_serverFn/abc', '/api/health'])(
    'leaves %s to the server',
    async (url) => {
      expect(await handleStaticPage(createEvent({ url }))).toBeUndefined();
    }
  );

  it('serves the static server-function cache written by the prerender', async () => {
    // Nitro's asset manifest is baked before the prerender writes these files,
    // so its own static handler never learns about them — reaching them at all
    // depends on this middleware.
    const response = await handleStaticPage(
      createEvent({ url: `/__tsr/staticServerFnCache/${STATIC_CACHE_NAME}` })
    );

    expect(await response?.text()).toBe(STATIC_CACHE_JSON);
    expect(response?.headers.get('Content-Type')).toBe(
      'application/json; charset=utf-8'
    );
  });

  it('ignores non-readable methods', async () => {
    const response = await handleStaticPage(
      createEvent({ url: '/', method: 'POST' })
    );

    expect(response).toBeUndefined();
  });

  it('preserves the security headers set by the route rules', async () => {
    const response = await handleStaticPage(
      createEvent({
        url: '/',
        responseHeaders: {
          'Content-Security-Policy': "default-src 'self'",
          'Strict-Transport-Security': 'max-age=31536000',
        },
      })
    );

    expect(response?.headers.get('Content-Security-Policy')).toBe(
      "default-src 'self'"
    );
    expect(response?.headers.get('Strict-Transport-Security')).toBe(
      'max-age=31536000'
    );
  });

  it('keeps a Cache-Control set by the route rules', async () => {
    const response = await handleStaticPage(
      createEvent({
        url: '/',
        responseHeaders: { 'Cache-Control': 'public, max-age=31536000' },
      })
    );

    expect(response?.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000'
    );
  });

  it('serves the brotli variant when the client accepts it', async () => {
    const response = await handleStaticPage(
      createEvent({
        url: '/',
        requestHeaders: { 'accept-encoding': 'gzip, deflate, br, zstd' },
      })
    );

    expect(response?.headers.get('Content-Encoding')).toBe('br');
    expect(response?.headers.get('Vary')).toBe('Accept-Encoding');

    const body = Buffer.from(await response!.arrayBuffer());
    expect(body).toEqual(brotliCompressSync(Buffer.from(HOME_PAGE_HTML)));
  });

  it('falls back to gzip when brotli is not accepted', async () => {
    const response = await handleStaticPage(
      createEvent({
        url: '/',
        requestHeaders: { 'accept-encoding': 'gzip, deflate' },
      })
    );

    expect(response?.headers.get('Content-Encoding')).toBe('gzip');
  });

  it('serves the identity encoding when nothing is accepted', async () => {
    const response = await handleStaticPage(createEvent({ url: '/' }));

    expect(response?.headers.get('Content-Encoding')).toBeNull();
    expect(await response?.text()).toBe(HOME_PAGE_HTML);
  });

  it('serves the identity encoding when no variant exists on disk', async () => {
    const response = await handleStaticPage(
      createEvent({
        url: '/doc/get-started',
        requestHeaders: { 'accept-encoding': 'br, gzip' },
      })
    );

    expect(response?.headers.get('Content-Encoding')).toBeNull();
    expect(await response?.text()).toBe(DOC_PAGE_HTML);
  });

  it('answers a matching If-None-Match with 304 and no body', async () => {
    const first = await handleStaticPage(createEvent({ url: '/' }));
    const entityTag = first!.headers.get('ETag')!;

    const second = await handleStaticPage(
      createEvent({ url: '/', requestHeaders: { 'if-none-match': entityTag } })
    );

    expect(second?.status).toBe(304);
    expect(await second?.text()).toBe('');
  });

  it('varies the validator by content encoding', async () => {
    const identity = await handleStaticPage(createEvent({ url: '/' }));
    const brotli = await handleStaticPage(
      createEvent({ url: '/', requestHeaders: { 'accept-encoding': 'br' } })
    );

    expect(identity?.headers.get('ETag')).not.toBe(brotli?.headers.get('ETag'));
  });

  it('answers HEAD with headers but no body', async () => {
    const response = await handleStaticPage(
      createEvent({ url: '/', method: 'HEAD' })
    );

    expect(response?.status).toBe(200);
    expect(await response?.text()).toBe('');
    expect(response?.headers.get('Content-Type')).toBe(
      'text/html; charset=utf-8'
    );
  });

  it.each([
    '/../../etc/passwd',
    '/doc/%2e%2e%2f%2e%2e%2fetc%2fpasswd',
    '/%2e%2e/%2e%2e/package.json',
  ])('refuses to escape the public directory via %s', async (url) => {
    expect(await handleStaticPage(createEvent({ url }))).toBeUndefined();
  });

  it('serves a locale-prefixed prerendered page', async () => {
    const response = await handleStaticPage(createEvent({ url: '/ru' }));

    expect(await response?.text()).toBe('<!doctype html>');
  });
});
