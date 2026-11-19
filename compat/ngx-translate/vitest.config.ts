import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    typecheck: {
      // API parity with the upstream library — see @utils/compat-api-parity.
      enabled: true,
      include: ['src/**/*.test-d.ts'],
      tsconfig: './tsconfig.json',
      ignoreSourceErrors: true,
    },
  },
});
