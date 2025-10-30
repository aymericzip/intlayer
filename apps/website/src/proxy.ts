import { queryProxy } from '@utils/queryProxy';
import { intlayerProxy, multipleProxies } from 'next-intlayer/proxy';

export const proxy = multipleProxies([intlayerProxy, queryProxy]);

// Middleware can also be exported as a default:
// Example:
// export default multipleProxy([intlayerMiddleware, queryMiddleware]);

// applies this middleware only to files in the app directory
export const config = {
  matcher:
    '/((?!api|static|assets|robots|sitemap|schema|sw|service-worker|manifest|.*\\..*|_next).*)',
};
