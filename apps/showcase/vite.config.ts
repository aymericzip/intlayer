import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    devtools(),
    intlayerProxy(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    intlayer(),
    tailwindcss(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$',
      },
    }),
    viteReact(),
    wasm(),
  ],
  build: {
    rollupOptions: {
      external: ['wasi_snapshot_preview1', 'esbuild', 'env'],
    },
  },
});

export default config;
