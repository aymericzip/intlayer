import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';

export const Route = createFileRoute('/{-$locale}/frequent-questions/raw/$')({
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
          const { getFrequentQuestion, getFrequentQuestionMetadataBySlug } =
            await import('@intlayer/docs');
          const locale = params.locale ?? defaultLocale;
          const splat = params._splat ?? '';
          const slugs = splat ? splat.split('/').filter(Boolean) : [];
          const normalizedSlugs = ['frequent-question', ...slugs];

          const matches = await getFrequentQuestionMetadataBySlug(
            normalizedSlugs,
            locale,
            true
          );

          if (!matches || matches.length === 0) {
            return new Response('Not found', { status: 404 });
          }

          const file = await getFrequentQuestion(
            matches[0].docKey as any,
            locale
          );

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
            const htmlContent = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"><title>${(matches[0] as any).title || 'FAQ'}</title></head><body><pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.5; padding: 20px;">${file.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre></body></html>`;
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
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': '*',
          },
        }),
    },
  },
});
