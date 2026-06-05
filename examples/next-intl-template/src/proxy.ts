import { proxy } from '@/i18n';

// Middleware runs before routes, handling locale detection and routing
// localeDetection: true uses Accept-Language header to auto-detect locale
export default proxy;

export const config = {
  // Skip API, Next internals and static assets
  // Regex: match all routes except those starting with api, _next, or containing a dot (files)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
