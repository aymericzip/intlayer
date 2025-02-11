import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';

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

  plugins: [react(), intlayerPlugin()],
});
