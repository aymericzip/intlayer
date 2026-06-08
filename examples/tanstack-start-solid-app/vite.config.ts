import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import { localeFlatMap } from 'intlayer';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import solidPlugin from 'vite-plugin-solid';

export const pathList = ['', '/about', '/404'];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    devtools(), // this is the plugin that enables path aliases

    tailwindcss(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$',
      },
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerProxy(),
  ],
});
