import { defineConfig } from 'vite';
import { intLayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
