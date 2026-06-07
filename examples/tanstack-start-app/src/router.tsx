import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    context: {
      queryClient,
    },
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
    // Redirect too many times
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
};

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
