export { intlayerMiddleware as middleware } from 'next-intlayer/middleware';

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
