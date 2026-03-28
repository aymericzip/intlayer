import { createRouter as createTanStackRouter } from '@tanstack/solid-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
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

declare module '@tanstack/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
