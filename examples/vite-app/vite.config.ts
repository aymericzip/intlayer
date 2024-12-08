import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { intLayerPlugin, intLayerMiddlewarePlugin } from 'react-intlayer/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
