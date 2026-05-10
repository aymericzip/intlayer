import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import { nitro } from 'nitro/vite';
import { resolve } from 'path';
import { intlayer } from 'vite-intlayer';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  main: {
    plugins: [],
    build: {
      rollupOptions: {
        input: {
          index: resolve('src/election.ts'),
        },
        external: ['electron'],
      },
    },
  },
  preload: {
    plugins: [],
    build: {
      rollupOptions: {
        input: {
          index: resolve('src/preload/index.ts'),
        },
        external: ['electron'],
      },
    },
  },
  renderer: {
    root: resolve('.'),

    plugins: [
      nitro({
        preset: 'node',
        rollupConfig: {
          onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
            warn(warning);
          },
        },
      }),
      intlayer(),
      tailwindcss(),
      tanstackStart({
        router: {
          routeFileIgnorePattern:
            '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$',
        },
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      wasm(),
    ],
  },
});
