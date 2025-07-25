import react from '@vitejs/plugin-react';
import { intlayerPlugin } from 'vite-intlayer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const testFiles = ['./**/*.test.{js,jsx,ts,tsx}'];

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      // jsxImportSource: 'react',
      // fastRefresh: false,
    }),
    intlayerPlugin(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    /*
    deps: {
      experimentalOptimizer: {
        enabled: true,
      },
    }, */
    coverage: {
      provider: 'v8',
      reporter: ['text', 'clover'],
      extension: ['js', 'jsx', 'ts', 'tsx'],
      all: true,
    },
    // To mimic Jest behaviour regarding mocks.
    // @link https://vitest.dev/config/#clearmocks
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    include: testFiles,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
