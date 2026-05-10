import { getQueryClient } from '@intlayer/design-system/providers';
import { Loader } from '@intlayer/design-system/loader';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { NotFoundComponent } from '#components/NotFoundComponent';
import { routeTree } from '#/routeTree.electron.gen';

const queryClient = getQueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFoundComponent,
  defaultPendingComponent: Loader,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
