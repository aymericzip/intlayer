import { queryMiddleware } from '@utils/queryMiddleware';
import {
  intlayerMiddleware,
  multipleMiddlewares,
} from 'next-intlayer/middleware';

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  queryMiddleware,
]);

// Middleware can also be exported as a default:
// Example:
// export default multipleMiddlewares([intlayerMiddleware, queryMiddleware]);

// applies this middleware only to files in the app directory
export const config = {
  matcher:
    '/((?!api|static|assets|robots|sitemap|schema|sw|service-worker|manifest|.*\\..*|_next).*)',
};
