import { intLayerMiddlewarePlugin, intlayerPlugin } from 'vite-intlayer';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
  },
});
