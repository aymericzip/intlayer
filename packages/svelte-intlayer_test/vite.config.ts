import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ['@intlayer/config'], // don’t prebundle this package
  },
  ssr: {
    noExternal: ['@intlayer/config'], // make Vite compile it as ESM
  },
});
