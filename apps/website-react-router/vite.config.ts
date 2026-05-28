import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
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
  }
};

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src/app'),
      '@components': resolve(__dirname, 'src/components'),
      '@structuredData': resolve(__dirname, 'src/structuredData'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    rawMarkdownPlugin,
    intlayerProxy(), // Place it before the reactRouter plugin
    reactRouter(),
    tailwindcss(),
    intlayer(),
  ],
});

