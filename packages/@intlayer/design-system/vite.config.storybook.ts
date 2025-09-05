import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [react({ jsxRuntime: 'automatic' }), tailwindcss(), intlayer()],
}));
