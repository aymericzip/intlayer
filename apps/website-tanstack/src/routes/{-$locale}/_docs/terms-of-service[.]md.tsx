import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { loadLegalContent } from '~/serverFunctions/legal';

const RAW_HEADERS: Record<string, string> = {
  'Cache-Control':
    'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
  'Access-Control-Allow-Origin': '*',
  'X-Robots-Tag': 'all',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': 'frame-ancestors *',
  Vary: 'Accept',
  'Content-Disposition': 'inline; filename="terms-of-service.md"',
};

export const Route = createFileRoute('/{-$locale}/_docs/terms-of-service.md')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const { locale = defaultLocale } = params;
          const { file } = await loadLegalContent({
            data: { locale, docKey: './legal/en/terms_of_service.md' },
          });
          return new Response(file, {
            status: 200,
            headers: {
              ...RAW_HEADERS,
              'Content-Type': 'text/plain; charset=utf-8',
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
          const { locale = defaultLocale } = params;
          await loadLegalContent({
            data: { locale, docKey: './legal/en/terms_of_service.md' },
          });
          return new Response(null, {
            status: 200,
            headers: {
              ...RAW_HEADERS,
              'Content-Type': 'text/plain; charset=utf-8',
            },
          });
        } catch {
          return new Response(null, { status: 404 });
        }
      },
    },
  },
});
