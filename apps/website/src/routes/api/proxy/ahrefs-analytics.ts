import { createFileRoute } from '@tanstack/react-router';

const UPSTREAM_URL = 'https://analytics.ahrefs.com/analytics.js';

/** Server-side cache: refresh at most once per 24 h to avoid upstream rate-limiting. */
const SERVER_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
/**
 * Client/CDN cache: 1 year — the TTL Lighthouse's "efficient cache lifetimes"
 * audit requires before it stops counting the response as wasted bytes.
 *
 * A returning visitor therefore keeps its copy of `analytics.js` until the
 * entry is evicted. That is safe because the upstream script is a stable
 * beacon loader, and `stale-while-revalidate` still lets the browser refresh it
 * in the background once the year is up rather than blocking on a fetch. New
 * visitors always get a copy no more than {@link SERVER_CACHE_TTL_MS} old.
 */
const CLIENT_CACHE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

let cachedScript: string | null = null;
let cacheExpiresAt = 0;

const fetchScript = async (): Promise<string> => {
  const now = Date.now();
  if (cachedScript !== null && now < cacheExpiresAt) return cachedScript;

  const response = await fetch(UPSTREAM_URL);
  if (!response.ok) {
    throw new Error(
      `Upstream analytics fetch failed: ${response.status} ${response.statusText}`
    );
  }

  cachedScript = await response.text();
  cacheExpiresAt = now + SERVER_CACHE_TTL_MS;
  return cachedScript;
};

export const Route = createFileRoute('/api/proxy/ahrefs-analytics')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const script = await fetchScript();
          return new Response(script, {
            headers: {
              'Content-Type': 'application/javascript; charset=utf-8',
              'Cache-Control': `public, max-age=${CLIENT_CACHE_MAX_AGE_SECONDS}, stale-while-revalidate=86400`,
            },
          });
        } catch {
          return new Response('/* analytics unavailable */', {
            status: 502,
            headers: {
              'Content-Type': 'application/javascript; charset=utf-8',
            },
          });
        }
      },
    },
  },
});
