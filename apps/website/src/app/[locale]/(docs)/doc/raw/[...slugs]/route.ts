import { getDoc, getDocMetadataBySlug } from '@intlayer/docs';

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

    // Our docs metadata slugs start with 'doc', while the route omits it.
    const normalizedSlugs = [
      'doc',
      ...(Array.isArray(slugs) ? slugs : [slugs]),
    ];

    const matches = await getDocMetadataBySlug(
      normalizedSlugs,
      locale as any,
      true
    );

    if (!matches || matches.length === 0) {
      return new Response('Not found', { status: 404 });
    }

    const file = await getDoc(matches[0].docKey as any, locale as any);

    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control':
          'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
