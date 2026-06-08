import { defineConfig } from 'vitest/config';

/** Stub every *.svelte import in tests so vite doesn't attempt to compile them. */
const svelteStubPlugin = {
  name: 'svelte-test-stub',
  enforce: 'pre' as const,
  load(id: string) {
    if (id.endsWith('.svelte')) {
      return 'export default function SvelteStub() {}; export {};';
    }
  },
};

export default defineConfig({
  plugins: [svelteStubPlugin],
  test: {
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
