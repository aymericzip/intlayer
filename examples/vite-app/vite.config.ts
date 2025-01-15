import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { intlayerPlugin, intLayerMiddlewarePlugin } from 'vite-intlayer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
