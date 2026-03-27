import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/solid-start/plugin/vite';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    devtools(), // this is the plugin that enables path aliases

    tailwindcss(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$',
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerProxy(),
  ],
});
