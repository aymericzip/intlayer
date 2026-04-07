import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { NotFoundComponent } from '#components/NotFoundComponent';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: {
      queryClient: getQueryClient(),
    },

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFoundComponent,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
