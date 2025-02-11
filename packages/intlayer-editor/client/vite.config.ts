import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';
import packageJson from '../package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    port: 8000,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: path.resolve(__dirname, './tailwind.config.ts'), // Custom path
        }),
        autoprefixer(),
      ],
    },
  },

  build: {
    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.peerDependencies),
        ...Object.keys(packageJson.devDependencies),
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@intlayer/config/client',
        'path',
        'url',
      ],
    },
  },

  plugins: [react(), intlayerPlugin()],
});
