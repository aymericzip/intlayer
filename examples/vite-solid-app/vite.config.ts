import { defineConfig } from 'vite';
import { intlayer, intlayerMiddleware } from 'vite-intlayer';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), intlayer(), intlayerMiddleware()],
});
