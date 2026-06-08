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
    defaultPreloadStaleTime: 0,
    // Pages are prerendered (SSG): their loader data is fixed at build time and
    // embedded in the HTML. Treating it as permanently fresh stops the router
    // from revalidating on mount during hydration — that post-hydration refetch
    // is what surfaced the pending/loader flash. Content updates ship on the
    // next deploy/prerender, so there is nothing to revalidate at runtime.
    defaultStaleTime: Infinity,
    defaultNotFoundComponent: NotFoundComponent,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
