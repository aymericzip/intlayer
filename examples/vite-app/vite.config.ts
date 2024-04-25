import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { intLayerPlugin } from 'react-intlayer/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
