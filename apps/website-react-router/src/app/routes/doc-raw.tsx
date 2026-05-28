import {
  type DocMetadata,
  getDoc,
  getDocMetadata,
  getDocMetadataBySlug,
  getDocsKeys,
} from '@intlayer/docs';
import { getLocaleFromPath } from 'intlayer';
import type { Route } from '../+types/root';

async function findDocMetadata(
  slugs: string | string[],
  locale: string
): Promise<DocMetadata | undefined> {
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];

  // 1. Try metadata slugs (normalized with 'doc' prefix)
  const normalizedSlugs = ['doc', ...slugsArray];
  try {
    const matches = await getDocMetadataBySlug(normalizedSlugs, locale, true);
    if (matches && matches.length > 0) {
      return matches[0];
    }
  } catch (error) {
    console.error('Error in getDocMetadataBySlug:', error);
  }

  // 2. Try filename match (exact)
  const pathFromSlugs = slugsArray.join('/');
  const potentialDocKey = `./docs/en/${pathFromSlugs}.md`;
  const docsKeys = getDocsKeys();

  if (docsKeys.includes(potentialDocKey as any)) {
    return await getDocMetadata(potentialDocKey as any, locale);
  }

  // 3. Try filename match (case-insensitive)
  const lowerPotentialKey = potentialDocKey.toLowerCase();
  const matchedKey = docsKeys.find(
    (key) => key.toLowerCase() === lowerPotentialKey
  );
  if (matchedKey) {
    return await getDocMetadata(matchedKey as any, locale);
  }

  return undefined;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    const locale = getLocaleFromPath(request.url);
    const slugsStr = params['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const fileMetadata = await findDocMetadata(slugs, locale);

    if (!fileMetadata) {
      const potentialDocKey = `./docs/en/${slugs.join('/')}.md`;
      const docsKeys = getDocsKeys();

      return new Response(
        `Not found.
Debug Info:
slugs: ${JSON.stringify(slugs)}
potentialDocKey: ${potentialDocKey}
docsKeys (first 10): ${JSON.stringify(docsKeys.slice(0, 10))}
Includes potentialKey? ${docsKeys.includes(potentialDocKey as any)}
Case-insensitive match? ${docsKeys.find((k) => k.toLowerCase() === potentialDocKey.toLowerCase())}
`,
        { status: 404 }
      );
    }

    const file = await getDoc(fileMetadata.docKey as any, locale);

    const url = new URL(request.url);
    const format = (url.searchParams.get('format') || '').toLowerCase();
    const accept = request.headers.get('accept') || '';
    const baseHeaders: Record<string, string> = {
      'Cache-Control':
        'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'all', // Ensure search engines can access
      'X-Content-Type-Options': 'nosniff',
      // Allow embedding by external tools (some bots render in iframes)
      'Content-Security-Policy': 'frame-ancestors *',
      Vary: 'Accept',
      'Content-Disposition': `inline; filename="${slugs[slugs.length - 1] || 'doc'}.md"`,
    };

    const method = request.method.toUpperCase();
    const isHead = method === 'HEAD';

    // Decide representation from explicit query first, then Accept header
    const wantsHtml =
      format === 'html' || (format === '' && accept.includes('text/html'));
    const wantsText =
      format === 'txt' ||
      (format === '' &&
        (accept.includes('text/plain') || accept.includes('*/*')));

    if (wantsHtml) {
      const htmlContent = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${
        (fileMetadata as any).title || 'Documentation'
      }</title><meta name="robots" content="all"></head><body><pre style="white-space: pre-wrap; font-family: monospace; line-height: 1.5; padding: 20px;">${file
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</pre></body></html>`;

      return new Response(isHead ? null : htmlContent, {
        status: 200,
        headers: {
          ...baseHeaders,
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    if (wantsText) {
      return new Response(isHead ? null : file, {
        status: 200,
        headers: {
          ...baseHeaders,
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    return new Response(isHead ? null : file, {
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
}

export async function action() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control':
        'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
    },
  });
}
