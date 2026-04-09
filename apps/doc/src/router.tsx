import { Loader } from '@intlayer/design-system/loader';
import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { ErrorComponent } from './components/ErrorComponent';
import { NotFoundComponent } from './routes/{-$locale}/404';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: { queryClient: getQueryClient() },

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ErrorComponent,
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
