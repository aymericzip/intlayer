import { intLayerMiddlewarePlugin, intlayerPlugin } from 'solid-intlayer';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
