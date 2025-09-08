import { createRouter as createTanstackRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const createRouter = () => {
  return createTanstackRouter({
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
  });
};

/**
 * TODO: Enable this if you want type safety for the router instance
 */
/* 
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
 */
