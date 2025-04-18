import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { intLayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    intLayerMiddlewarePlugin(),
    tailwindcss(),
  ],
});
