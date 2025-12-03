import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    intlayerProxy(),
    nitro(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    intlayer(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
