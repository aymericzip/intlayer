import { Loader } from '@intlayer/design-system/loader';
import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
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

  /**
   * Dehydrates the query cache into the SSR payload and rehydrates it before
   * the first client render. Without it, loaders such as the root's
   * `sessionQueryOptions` prime `['session']` on the server only, so the server
   * markup renders session-dependent UI (organization/project dropdowns) that
   * the first client render — reading an empty cache — omits, and hydration
   * fails.
   */
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    // `ReactQueryProvider` in `__root.tsx` already provides this same client,
    // along with the toast and invalidation wiring the integration lacks.
    wrapQueryClient: false,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
