import solidPlugin from '@solidjs/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Refresh wrappers interfere with partial 'solid-js' mocks.
  plugins: [solidPlugin({ refresh: false })],
  resolve: {
    dedupe: ['solid-js', '@solidjs/web'],
    // The testing library still imports the Solid 1 web entry point.
    alias: { 'solid-js/web': '@solidjs/web' },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    server: {
      deps: { inline: ['@solidjs/testing-library'] },
    },
  },
});
