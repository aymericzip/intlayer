import type { NextRequest } from 'next/server';
import { intlayerMiddleware } from 'next-intlayer-middleware';

export const middleware = (request: NextRequest) => intlayerMiddleware(request);

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
