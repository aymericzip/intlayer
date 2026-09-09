import { route } from 'remix/routes';

/**
 * Type-safe route definitions for the Remix 3 application.
 * Defines both root-level routes and locale-prefixed routes.
 */
export const routes = route({
  home: '/',
  about: '/about',
  apiGreeting: '/api/greeting',
  localizedHome: '/:locale',
  localizedAbout: '/:locale/about',
  localizedApiGreeting: '/:locale/api/greeting',
});
