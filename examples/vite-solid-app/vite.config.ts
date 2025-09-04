import { defineConfig } from 'vite';
import { intlayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), intlayerPlugin(), intlayerMiddlewarePlugin()],
});
