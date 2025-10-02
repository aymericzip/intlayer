// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { astroIntlayer } from 'astro-intlayer';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), astroIntlayer()],
  },
});
