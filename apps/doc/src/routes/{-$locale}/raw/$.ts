import type { DocMetadata } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';

async function findDocMetadata(
  slugs: string[],
  locale: string
): Promise<DocMetadata | undefined> {
  const { getDocMetadataBySlug, getDocMetadata, getDocsKeys } = await import(
    '@intlayer/docs'
  );
  const normalizedSlugs = ['doc', ...slugs];
  try {
    const matches = await getDocMetadataBySlug(
      normalizedSlugs,
      locale as any,
      true
    );
    if (matches && matches.length > 0) {
      return matches[0];
    }
  } catch {
    // fallback to key-based lookup
  }

  const pathFromSlugs = slugs.join('/');
  const potentialDocKey = `./docs/en/${pathFromSlugs}.md`;
  const docsKeys = getDocsKeys();

  if (docsKeys.includes(potentialDocKey as any)) {
    return await getDocMetadata(potentialDocKey as any, locale as any);
  }

  const lowerPotentialKey = potentialDocKey.toLowerCase();
  const matchedKey = docsKeys.find(
    (key) => key.toLowerCase() === lowerPotentialKey
  );
  if (matchedKey) {
    return await getDocMetadata(matchedKey as any, locale as any);
  }

  return undefined;
}

export const Route = createFileRoute('/{-$locale}/raw/$')({
  server: {
    handlers: {
      GET: async ({
        request,
        params,
      }: {
        request: Request;
        params: Record<string, string>;
      }) => {
        try {
          const locale = params.locale ?? defaultLocale;
          const splat = params._splat ?? '';
          const slugs = splat ? splat.split('/').filter(Boolean) : [];

          const fileMetadata = await findDocMetadata(slugs, locale);

          if (!fileMetadata) {
            return new Response('Not found', { status: 404 });
          }

          const { getDoc } = await import('@intlayer/docs');
          const file = await getDoc(fileMetadata.docKey as any, locale as any);

          const url = new URL(request.url);
          const format = (url.searchParams.get('format') || '').toLowerCase();
          const accept = request.headers.get('accept') || '';
          const baseHeaders: Record<string, string> = {
            'Cache-Control':
              'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
            'Access-Control-Allow-Origin': '*',
            'X-Robots-Tag': 'all',
            'X-Content-Type-Options': 'nosniff',
            'Content-Security-Policy': 'frame-ancestors *',
            Vary: 'Accept',
          };

          const wantsHtml =
            format === 'html' ||
            (format === '' && accept.includes('text/html'));
          const wantsText =
            format === 'txt' ||
            (format === '' &&
              (accept.includes('text/plain') || accept.includes('*/*')));

          if (wantsHtml) {
            const htmlContent = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${(fileMetadata as any).title || 'Documentation'}</title><meta name="robots" content="all"></head><body><pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.5; padding: 20px;">${file.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre></body></html>`;
            return new Response(htmlContent, {
              status: 200,
              headers: {
                ...baseHeaders,
                'Content-Type': 'text/html; charset=utf-8',
              },
            });
          }

          if (wantsText) {
            return new Response(file, {
              status: 200,
              headers: {
                ...baseHeaders,
                'Content-Type': 'text/plain; charset=utf-8',
              },
            });
          }

          return new Response(file, {
            status: 200,
            headers: {
              ...baseHeaders,
              'Content-Type': 'text/markdown; charset=utf-8',
            },
          });
        } catch (error) {
          return new Response(`Internal Server Error: ${String(error)}`, {
            status: 500,
          });
        }
      },
      HEAD: async ({
        request,
        params,
      }: {
        request: Request;
        params: Record<string, string>;
      }) => {
        try {
          const locale = params.locale ?? defaultLocale;
          const splat = params._splat ?? '';
          const slugs = splat ? splat.split('/').filter(Boolean) : [];
          const fileMetadata = await findDocMetadata(slugs, locale);

          if (!fileMetadata) {
            return new Response(null, { status: 404 });
          }

          const url = new URL(request.url);
          const format = (url.searchParams.get('format') || '').toLowerCase();
          const accept = request.headers.get('accept') || '';

          const contentType =
            format === 'html'
              ? 'text/html; charset=utf-8'
              : format === 'txt'
                ? 'text/plain; charset=utf-8'
                : accept.includes('text/html')
                  ? 'text/html; charset=utf-8'
                  : accept.includes('text/plain') || accept.includes('*/*')
                    ? 'text/plain; charset=utf-8'
                    : 'text/markdown; charset=utf-8';

          return new Response(null, {
            status: 200,
            headers: {
              'Cache-Control':
                'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': contentType,
              Vary: 'Accept',
            },
          });
        } catch {
          return new Response(null, { status: 500 });
        }
      },
      OPTIONS: async () => {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': '*',
          },
        });
      },
    },
  },
});
