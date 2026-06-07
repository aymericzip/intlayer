import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { loadDocRaw } from '~/serverFunctions/docs';

const RAW_HEADERS: Record<string, string> = {
  'Cache-Control':
    'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
  'Access-Control-Allow-Origin': '*',
  'X-Robots-Tag': 'all',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': 'frame-ancestors *',
  Vary: 'Accept',
};

export const Route = createFileRoute('/{-$locale}/doc/$.md')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          const locale = (params.locale as string) ?? defaultLocale;
          const slugsStr = (params as any)['*'] || '';
          const slugs = slugsStr ? slugsStr.split('/') : [];

          const result = await loadDocRaw({ data: { locale, slugs } });

          if (!result) {
            return new Response(
              `Not found.\nDebug: slugs=${JSON.stringify(slugs)}`,
              { status: 404 }
            );
          }

          const { metadata, file } = result;
          const filename = slugs[slugs.length - 1] || 'doc';

          const url = new URL(request.url);
          const format = (url.searchParams.get('format') || '').toLowerCase();
          const accept = request.headers.get('accept') || '';

          const baseHeaders: Record<string, string> = {
            ...RAW_HEADERS,
            'Content-Disposition': `inline; filename="${filename}.md"`,
          };

          const wantsHtml =
            format === 'html' ||
            (format === '' && accept.includes('text/html'));

          if (wantsHtml) {
            const htmlContent = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${
              (metadata as any).title || 'Documentation'
            }</title><meta name="robots" content="all"></head><body><pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.5; padding: 20px;">${file
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')}</pre></body></html>`;

            return new Response(htmlContent, {
              status: 200,
              headers: {
                ...baseHeaders,
                'Content-Type': 'text/html; charset=utf-8',
              },
            });
          }

          const wantsText =
            format === 'txt' ||
            (format === '' && accept.includes('text/plain'));

          return new Response(file, {
            status: 200,
            headers: {
              ...baseHeaders,
              'Content-Type': wantsText
                ? 'text/plain; charset=utf-8'
                : 'text/markdown; charset=utf-8',
            },
          });
        } catch (error) {
          return new Response(`Internal Server Error: ${String(error)}`, {
            status: 500,
          });
        }
      },
      HEAD: async ({ params }) => {
        try {
          const locale = (params.locale as string) ?? defaultLocale;
          const slugsStr = (params as any)['*'] || '';
          const slugs = slugsStr ? slugsStr.split('/') : [];
          const result = await loadDocRaw({ data: { locale, slugs } });

          if (!result) return new Response(null, { status: 404 });

          const filename = slugs[slugs.length - 1] || 'doc';
          return new Response(null, {
            status: 200,
            headers: {
              ...RAW_HEADERS,
              'Content-Disposition': `inline; filename="${filename}.md"`,
              'Content-Type': 'text/markdown; charset=utf-8',
            },
          });
        } catch {
          return new Response(null, { status: 404 });
        }
      },
    },
  },
});
