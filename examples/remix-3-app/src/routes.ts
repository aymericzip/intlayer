import { route } from 'remix/routes';

/**
 * Type-safe route definitions for the Remix 3 application.
 *
 * Routes are declared once, without a locale segment: the `intlayer()`
 * middleware serves `/fr/about` from `about` and exposes the locale through
 * the request context.
 */
export const routes = route({
  home: '/',
  about: '/about',
  apiGreeting: '/api/greeting',
});
