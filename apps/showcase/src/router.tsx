import { getQueryClient } from '@intlayer/design-system/providers';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { ErrorComponent } from './components/ErrorComponent';
import { NotFoundComponent } from './routes/{-$locale}/404';
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
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    // Redirect to many times
    // rewrite: {
    //   input: ({ url }) => getPathWithoutLocale(url.toString()),
    //   output: ({ url }) => {
    //     const locale = getLocaleFromStorageClient({
    //       getSessionStorage: (key) => sessionStorage.getItem(key),
    //       getLocaleStorage: (key) => localStorage.getItem(key),
    //     });
    //     return getLocalizedUrl(url.toString(), locale ?? defaultLocale);
    //   },
    // },
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
