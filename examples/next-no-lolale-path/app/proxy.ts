import { intlayerProxy } from 'next-intlayer/proxy';

export const proxy = intlayerProxy;

export const config = {
  matcher:
    '/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)',
};
