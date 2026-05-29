import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rawMarkdownPlugin = {
  name: 'raw-markdown-plugin',
  transform(code: string, id: string) {
    if (id.split('?')[0].endsWith('.md')) {
      return `export default ${JSON.stringify(code)};`;
    }
  },
};

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  ssr: {
    external: ['shiki'],
  },

  plugins: [
    rawMarkdownPlugin,
    intlayerProxy(), // Place it before the reactRouter plugin
    reactRouter(),
    tailwindcss(),
    intlayer(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
