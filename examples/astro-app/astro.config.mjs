// @ts-check

import lit from '@astrojs/lit';
import preact from '@astrojs/preact';

import react from '@astrojs/react';
import solidJs from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';
import { intlayer } from 'astro-intlayer';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321', // Replace with your production URL
  integrations: [
    react({ include: ['./src/components/react/**'] }),
    svelte(),
    vue(),
    solidJs({ include: ['./src/components/solid/**'] }),
    lit(),
    preact({ include: ['./src/components/preact/**'] }),
    intlayer(),
  ],
});
