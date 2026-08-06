import { solidStart } from '@solidjs/start/config';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
