import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), intlayer(), intlayerProxy()],
});
