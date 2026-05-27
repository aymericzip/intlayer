import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'astro/config';
import { intlayer } from 'astro-intlayer';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [intlayer(), react()],
  image: {
    domains: ['avatars.githubusercontent.com'],
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss({ base: __dirname })],
      },
    },
    optimizeDeps: {
      exclude: ['shiki'],
    },

    plugins: [
      {
        name: 'md-raw-transform',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.md') && !id.includes('/node_modules/')) {
            return {
              code: `export default ${JSON.stringify(code)};`,
              map: null,
            };
          }
        },
      },
    ],
    resolve: {
      dedupe: ['@tanstack/react-query'],
      alias: {
        '@layouts': resolve(__dirname, './src/layouts'),
        '@components': resolve(__dirname, './src/components'),
        '@structuredData': resolve(__dirname, './src/structuredData'),
        '@utils': resolve(__dirname, './src/utils'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@assets': resolve(__dirname, './src/assets'),
        '@': resolve(__dirname, './src'),
      },
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
