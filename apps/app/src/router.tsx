import { Loader } from '@intlayer/design-system/loader';
import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { NotFoundComponent } from '#components/NotFoundComponent';
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
    /**
     * Route loaders only prime TanStack Query caches, which own their own
     * freshness, so re-running them on navigation buys nothing. The
     * `defaultPreloadStaleTime: 0` this replaces expired every preload the
     * moment it landed, so hovering a link fetched a loader result the click
     * then threw away — and returning to a page the router already had still
     * flashed the pending component.
     */
    defaultStaleTime: Infinity,
    defaultNotFoundComponent: NotFoundComponent,
    defaultPendingComponent: Loader,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
