import { dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    port: 8000,
  },

  build: {
    rollupOptions: {
      external: ['@intlayer/config/built', 'path', 'url', 'vm', 'fs'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },

  plugins: [react(), intlayerPlugin(), tailwindcss()],
});
