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
      enabled: true,
      include: ['src/**/*.test-d.ts'],
      // Only report errors raised by the type tests themselves — the package's
      // own sources are covered by `bun run typecheck`.
      ignoreSourceErrors: true,
    },
  },
});
