import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
