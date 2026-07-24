import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { NotFoundComponent } from '~/components/NotFoundComponent';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const queryClient = getQueryClient();

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    // Preloaded loader data must stay fresh long enough to satisfy the
    // navigation it was preloaded for (framework default: 30s).
    // `defaultPreloadStaleTime: 0` marked every intent/viewport preload
    // stale by click time, so the loader re-ran and blocked the
    // transition — hover preloading was effectively disabled. 0 is only
    // appropriate when loaders delegate caching to an external store
    // (e.g. queryClient.ensureQueryData); these loaders call server
    // functions directly.
    defaultStaleTime: Infinity,
    // `defaultPendingMs: 0` entered the pending state on EVERY navigation
    // whose loader had not already resolved, and `defaultPendingMinMs`
    // (500ms framework default) then held that blank pending frame for at
    // least half a second — the "black screen flash" on each route
    // change. The framework default (1000ms) only shows pending UI for
    // genuinely slow loads.
    defaultNotFoundComponent: NotFoundComponent,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
