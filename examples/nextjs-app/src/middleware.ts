import type { NextRequest } from 'next/server';
import { intlayerMiddleware } from 'next-intlayer-middleware';

export const middleware = (request: NextRequest) => {
  console.log(
    'process.NEXT_PUBLIC_INTLAYER_LOCALES',
    process.env.NEXT_PUBLIC_INTLAYER_LOCALES
  );

  return intlayerMiddleware(request);
};

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
