import { Loader } from '@intlayer/design-system/loader';
import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { NotFoundComponent } from '#components/NotFoundComponent';
import { routeTree } from './routeTree.gen';

export const queryClient = getQueryClient();

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: {
      queryClient,
    },

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
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
