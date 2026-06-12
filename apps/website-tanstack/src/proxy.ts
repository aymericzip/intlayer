import { intlayerProxy, multipleProxies } from 'react-intlayer/proxy';
import { queryProxy } from '~/utils/queryProxy';

export const proxy = multipleProxies([intlayerProxy, queryProxy]);

// applies this middleware only to files in the app directory
export const config = {
  matcher:
    '/((?!api|static|assets|robots|sitemap|schema|sw|service-worker|manifest|.*\\..*|_next).*)',
};
