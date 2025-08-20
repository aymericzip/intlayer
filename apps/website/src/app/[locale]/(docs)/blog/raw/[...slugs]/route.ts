import { getBlog, getBlogMetadataBySlug } from '@intlayer/docs';

type RouteContext = {
  params: {
    locale: string;
    slugs: string[];
  };
};

export const dynamic = 'force-static';

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { locale, slugs } = context.params;

    // Blog metadata slugs start with 'blog', while the route omits it.
    const normalizedSlugs = [
      'blog',
      ...(Array.isArray(slugs) ? slugs : [slugs]),
    ];

    const matches = await getBlogMetadataBySlug(
      normalizedSlugs,
      locale as any,
      true
    );

    if (!matches || matches.length === 0) {
      return new Response('Not found', { status: 404 });
    }

    const file = await getBlog(matches[0].docKey as any, locale as any);

    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control':
          'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
        'X-Robots-Tag': 'all', // Ensure search engines can access
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
