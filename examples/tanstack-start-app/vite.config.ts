import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { localeFlatMap } from 'intlayer';
import { nitro } from 'nitro/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';

export const pathList = ['', '/about', '/404'];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

const config = defineConfig({
  plugins: [
    intlayerProxy({}, { ignore: (req) => req.url?.startsWith('/api') }), // To redirect the user to his own locale. Should be placed before nitro

    nitro({ preset: 'bun' }),

    intlayer(),
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
    viteReact(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
});

export default config;
