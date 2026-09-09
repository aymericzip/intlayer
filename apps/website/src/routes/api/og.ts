import { createFileRoute } from '@tanstack/react-router';
import { generateOgImage } from '~/utils/generateOgImage';
import { THUMBNAIL_JPEG_BASE64 } from '~/utils/ogAssets';

/**
 * Upper bounds for the user-controlled query parameters. `/api/og` is public,
 * so an uncapped title would let a caller drive both render cost and the size
 * of every cached entry.
 */
const MAX_TITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 200;

/** Rendered images are ~400 KB each, so the cache is deliberately small. */
const MAX_CACHE_ENTRIES = 50;

/**
 * Cache the in-flight promise rather than the resolved buffer: concurrent
 * requests for the same title then share a single render instead of each
 * paying for one.
 */
const ogImageCache = new Map<string, Promise<ArrayBuffer>>();

let fallbackBuffer: ArrayBuffer | null = null;
const getFallbackBuffer = (): ArrayBuffer => {
  if (!fallbackBuffer) {
    const buf = Buffer.from(THUMBNAIL_JPEG_BASE64, 'base64');
    fallbackBuffer = buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    );
  }
  return fallbackBuffer;
};

/** Reads a query parameter, trimmed and clamped to `maxLength`. */
const readParam = (
  url: URL,
  key: string,
  maxLength: number
): string | undefined => {
  const value = url.searchParams.get(key)?.trim();
  return value ? value.slice(0, maxLength) : undefined;
};

const getOgBuffer = (
  title?: string,
  description?: string
): Promise<ArrayBuffer> => {
  const cacheKey = `${title ?? ''}::${description ?? ''}`;
  const cached = ogImageCache.get(cacheKey);
  if (cached) return cached;

  const bufferPromise = generateOgImage({ title, description })
    .arrayBuffer()
    // A failed render must not be cached, or the error is served forever.
    .catch((error: unknown) => {
      ogImageCache.delete(cacheKey);
      throw error;
    });

  if (ogImageCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = ogImageCache.keys().next().value;
    if (oldestKey) ogImageCache.delete(oldestKey);
  }
  ogImageCache.set(cacheKey, bufferPromise);
  return bufferPromise;
};

const getResponseHeaders = (buffer: ArrayBuffer): Record<string, string> => ({
  'Content-Type': 'image/png',
  'Content-Length': buffer.byteLength.toString(),
  'Cache-Control': 'public, max-age=31536000, immutable',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Cross-Origin-Resource-Policy': 'cross-origin',
});

export const Route = createFileRoute('/api/og')({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Cross-Origin-Resource-Policy': 'cross-origin',
          },
        }),
      HEAD: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const title = readParam(url, 'title', MAX_TITLE_LENGTH);
          const description = readParam(
            url,
            'description',
            MAX_DESCRIPTION_LENGTH
          );
          const buffer = await getOgBuffer(title, description);

          return new Response(null, {
            status: 200,
            headers: getResponseHeaders(buffer),
          });
        } catch (error) {
          console.error(
            '[API /api/og] Error generating OG image in HEAD, using fallback:',
            error
          );
          const buffer = getFallbackBuffer();
          return new Response(null, {
            status: 200,
            headers: {
              ...getResponseHeaders(buffer),
              'Content-Type': 'image/jpeg',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      },
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const title = readParam(url, 'title', MAX_TITLE_LENGTH);
          const description = readParam(
            url,
            'description',
            MAX_DESCRIPTION_LENGTH
          );
          const buffer = await getOgBuffer(title, description);

          return new Response(buffer, {
            status: 200,
            headers: getResponseHeaders(buffer),
          });
        } catch (error) {
          console.error(
            '[API /api/og] Error generating dynamic OG image, using fallback:',
            error
          );
          const buffer = getFallbackBuffer();
          return new Response(buffer, {
            status: 200,
            headers: {
              ...getResponseHeaders(buffer),
              'Content-Type': 'image/jpeg',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      },
    },
  },
});
