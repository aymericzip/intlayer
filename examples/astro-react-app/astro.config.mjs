// @ts-check

import react from '@astrojs/react';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { intlayer } from 'astro-intlayer';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), intlayer(), vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
