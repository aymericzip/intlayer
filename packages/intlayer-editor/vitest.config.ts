import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const serverSourcePath = resolve(import.meta.dirname, 'server/src');

export default defineConfig({
  resolve: {
    // Mirrors the `paths` of `server/tsconfig.json`
    alias: {
      '@controllers': resolve(serverSourcePath, 'controllers'),
      '@services': resolve(serverSourcePath, 'services'),
      '@routes': resolve(serverSourcePath, 'routes'),
      '@utils': resolve(serverSourcePath, 'utils'),
      '@/': `${serverSourcePath}/`,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    include: ['{client,server}/src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
