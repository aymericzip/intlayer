import { generateOgImage } from './generateOgImage';
import { THUMBNAIL_JPEG_BASE64 } from './ogAssets';
import type { OgImageParams } from './ogImagePath';

/**
 * Upper bounds for the user-controlled query parameters. `/api/og` is public,
 * so an uncapped title would let a caller drive both render cost and the size
 * of every cached entry.
 */
const MAX_TITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 200;
const MAX_LOCALE_LENGTH = 35;

/** Rendered images are ~400 KB each, so the cache is deliberately small. */
const MAX_CACHE_ENTRIES = 50;

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Cross-Origin-Resource-Policy': 'cross-origin',
};

/**
 * Cache the in-flight promise rather than the resolved buffer: concurrent
 * requests for the same card then share a single render instead of each
 * paying for one.
 */
const ogImageCache = new Map<string, Promise<ArrayBuffer>>();

let fallbackBuffer: ArrayBuffer | null = null;

const getFallbackBuffer = (): ArrayBuffer => {
  if (!fallbackBuffer) {
    const buffer = Buffer.from(THUMBNAIL_JPEG_BASE64, 'base64');
    fallbackBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;
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

const readOgImageParams = (request: Request): OgImageParams => {
  const url = new URL(request.url);
  return {
    title: readParam(url, 'title', MAX_TITLE_LENGTH),
    description: readParam(url, 'description', MAX_DESCRIPTION_LENGTH),
    locale: readParam(url, 'locale', MAX_LOCALE_LENGTH),
  };
};

const getOgBuffer = (params: OgImageParams): Promise<ArrayBuffer> => {
  const cacheKey = [params.title, params.description, params.locale]
    .map((value) => value ?? '')
    .join('::');
  const cached = ogImageCache.get(cacheKey);
  if (cached) return cached;

  const bufferPromise = generateOgImage(params)
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
  ...CORS_HEADERS,
});

/**
 * Renders the card for `request`, or the static thumbnail (short-lived cache)
 * when rendering fails, e.g. a fallback font could not be downloaded.
 */
const renderOgImage = async (
  request: Request,
  withBody: boolean
): Promise<Response> => {
  try {
    const buffer = await getOgBuffer(readOgImageParams(request));
    return new Response(withBody ? buffer : null, {
      status: 200,
      headers: getResponseHeaders(buffer),
    });
  } catch (error) {
    console.error(
      '[API /api/og] Error generating OG image, using fallback:',
      error
    );
    const buffer = getFallbackBuffer();
    return new Response(withBody ? buffer : null, {
      status: 200,
      headers: {
        ...getResponseHeaders(buffer),
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
};

type OgImageHandler = (context: { request: Request }) => Promise<Response>;

/** Server handlers for a TanStack Start `/api/og` file route. */
export const ogImageHandlers: Record<
  'OPTIONS' | 'HEAD' | 'GET',
  OgImageHandler
> = {
  OPTIONS: async () =>
    new Response(null, { status: 204, headers: CORS_HEADERS }),
  HEAD: ({ request }) => renderOgImage(request, false),
  GET: ({ request }) => renderOgImage(request, true),
};
