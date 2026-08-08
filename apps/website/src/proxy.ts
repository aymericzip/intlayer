import { markdownProxy } from '@utils/markdownProxy';
import { queryProxy } from '@utils/queryProxy';
import { intlayerProxy, multipleProxies } from 'next-intlayer/proxy';

// `markdownProxy` must run directly after `intlayerProxy` so it receives that
// proxy's response and can read the locale it resolved. `queryProxy` returns a
// fresh `NextResponse.next()` that drops the upstream rewrite header, so
// running it in between would hide the locale. It stays last because it only
// contributes request headers, never a rewrite, and therefore cannot clobber
// the one `markdownProxy` sets.
export const proxy = multipleProxies([
  intlayerProxy,
  markdownProxy,
  queryProxy,
]);

// applies this middleware only to files in the app directory
export const config = {
  matcher:
    '/((?!api|static|assets|robots|sitemap|schema|sw|service-worker|manifest|.*\\..*|_next).*)',
};
