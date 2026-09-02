/* @vitest-environment node */

import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';

/**
 * Shape of the h3 event the middleware consumes, mirrored here so the tests can
 * build one without pulling in Nitro's runtime.
 */
type TestEvent = {
  path: string;
  req: { method?: string };
};

type StaticServerFnCacheHandler = (
  event: TestEvent
) => Promise<Response | void>;

type SerovalModule = {
  toJSON: (value: unknown) => unknown;
  fromJSON: (node: unknown, options: { plugins: [] }) => unknown;
};

/**
 * Loads `seroval` through `@tanstack/start-static-server-functions`, so the
 * assertions run against the exact copy whose `fromJSON` reads this
 * middleware's responses in the browser — not whatever version happens to be
 * reachable from this app.
 */
const importConsumerSeroval = async (): Promise<SerovalModule> => {
  const appRequire = createRequire(import.meta.url);
  const consumerRequire = createRequire(
    appRequire.resolve('@tanstack/start-static-server-functions/package.json')
  );

  return (await import(consumerRequire.resolve('seroval'))) as SerovalModule;
};

const CACHED_NAME = `${'a1b2c3d4e5'.repeat(4)}.json`;
const MISSING_NAME = `${'0f1e2d3c4b'.repeat(4)}.json`;

let handleStaticServerFnCache: StaticServerFnCacheHandler;
let seroval: SerovalModule;
/** A real `staticFunctionMiddleware` entry — the `{ result, context }` pair. */
let cachedJson: string;

const createEvent = (path: string, method = 'GET'): TestEvent => ({
  path,
  req: { method },
});

beforeAll(async () => {
  seroval = await importConsumerSeroval();
  cachedJson = JSON.stringify(
    seroval.toJSON({ result: 'cached', context: {} })
  );

  // The middleware derives `.output/public` from the Nitro server entry, so the
  // fixture mimics that layout and announces it the way the bundle does.
  const rootDirectory = await mkdtemp(join(tmpdir(), 'static-server-fn-'));
  const cacheDirectory = join(
    rootDirectory,
    'public',
    '__tsr',
    'staticServerFnCache'
  );

  await mkdir(cacheDirectory, { recursive: true });
  await mkdir(join(rootDirectory, 'server'), { recursive: true });
  await writeFile(join(cacheDirectory, CACHED_NAME), cachedJson);

  (globalThis as { __nitro_main__?: string }).__nitro_main__ = pathToFileURL(
    join(rootDirectory, 'server', 'index.mjs')
  ).href;

  handleStaticServerFnCache = (
    await import('./middleware/2.staticServerFnCache')
  ).default;
});

describe('staticServerFnCache middleware', () => {
  it('serves a prerendered payload verbatim', async () => {
    const response = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${CACHED_NAME}`)
    );

    expect(response?.status).toBe(200);
    expect(await response?.text()).toBe(cachedJson);
    expect(response?.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable'
    );
  });

  it('answers a miss with a body that deserializes to undefined', async () => {
    const response = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${MISSING_NAME}`)
    );

    expect(response?.status).toBe(404);
    expect(response?.headers.get('Content-Type')).toBe(
      'application/json; charset=utf-8'
    );

    // `staticFunctionMiddleware` deserializes the body whatever the status, so
    // a miss has to survive `fromJSON` and come out falsy — that is what makes
    // it fall back to the server-function RPC instead of throwing
    // `Seroval Error (step: 3)` into the page's error boundary.
    const body = (await response?.text()) as string;

    expect(seroval.fromJSON(JSON.parse(body), { plugins: [] })).toBeUndefined();
  });

  it('does not cache a miss, which a later build may turn into a hit', async () => {
    const response = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${MISSING_NAME}`)
    );

    expect(response?.headers.get('Cache-Control')).toBe('no-store');
  });

  it('omits the body for HEAD while keeping the status', async () => {
    const hit = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${CACHED_NAME}`, 'HEAD')
    );
    const miss = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${MISSING_NAME}`, 'HEAD')
    );

    expect(hit?.status).toBe(200);
    expect(await hit?.text()).toBe('');
    expect(miss?.status).toBe(404);
    expect(await miss?.text()).toBe('');
  });

  it('declines paths outside the payload namespace', async () => {
    const outsidePrefix = await handleStaticServerFnCache(
      createEvent('/doc/get-started')
    );
    const traversalAttempt = await handleStaticServerFnCache(
      createEvent('/__tsr/staticServerFnCache/../../etc/passwd')
    );
    const nonHexName = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${'z'.repeat(40)}.json`)
    );

    expect(outsidePrefix).toBeUndefined();
    expect(traversalAttempt).toBeUndefined();
    expect(nonHexName).toBeUndefined();
  });

  it('declines write methods', async () => {
    const response = await handleStaticServerFnCache(
      createEvent(`/__tsr/staticServerFnCache/${CACHED_NAME}`, 'POST')
    );

    expect(response).toBeUndefined();
  });
});
