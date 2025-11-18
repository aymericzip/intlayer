import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    intlayer(),
    // intlayerProxy(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
