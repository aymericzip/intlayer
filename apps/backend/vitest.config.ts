import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@webhooks': path.resolve(__dirname, 'src/webhooks'),
      '@middlewares': path.resolve(__dirname, 'src/middlewares'),
      '@logger': path.resolve(__dirname, 'src/logger/index'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@emails': path.resolve(__dirname, 'src/emails'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    include: ['src/**/*.test.{js,ts}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
