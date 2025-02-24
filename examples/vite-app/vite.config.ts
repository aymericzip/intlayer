import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { intlayerPlugin, intLayerMiddlewarePlugin } from 'vite-intlayer';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    intLayerMiddlewarePlugin(),
    tailwindcss(),
  ],
});
