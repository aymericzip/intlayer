import { dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';
import tailwindcss from '@tailwindcss/vite';
import packageJson from '../package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    port: 8000,
  },

  plugins: [react(), intlayerPlugin(), tailwindcss()],

  build: {
    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.peerDependencies),
        ...Object.keys(packageJson.devDependencies),
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@intlayer/config/client',
        '@intlayer/config/built',
        'path',
        'url',
      ],
    },
  },
});
