import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig, mergeConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  staticDirs: ['./static'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(baseConfig, { configType }) {
    baseConfig.server = {
      ...baseConfig.server,
      host: true,
      allowedHosts: ['storybook.intlayer.org', 'localhost', '127.0.0.1'],
    };

    const env = {
      command: configType === 'DEVELOPMENT' ? 'serve' : 'build',
      mode: configType === 'DEVELOPMENT' ? 'development' : 'production',
    } as const;

    const tailwindcss = (await import('@tailwindcss/vite')).default;
    const path = await import('node:path');

    const viteConfig = defineConfig(() => ({
      resolve: {
        alias: {
          '@components': path.resolve(process.cwd(), 'src/components'),
          '@utils': path.resolve(process.cwd(), 'src/utils'),
          '@hooks': path.resolve(process.cwd(), 'src/hooks'),
          '@libs': path.resolve(process.cwd(), 'src/libs'),
          '@providers': path.resolve(process.cwd(), 'src/providers'),
          '@': path.resolve(process.cwd(), 'src'),
        },
      },
      plugins: [intlayer(), tailwindcss()],
      build: {
        // Optional: avoid the sourcemap location spam
        sourcemap: false,

        // Optional: silence the “chunks > 500kB” warning
        chunkSizeWarningLimit: 1500,

        rollupOptions: {
          onwarn(warning, defaultHandler) {
            // Hide `"use client"` warnings
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;

            // Hide eval warning from Storybook runtime
            // if (warning.code === 'EVAL') return;

            // Hide sourcemap reporting noise (Vite 5+)
            // if (warning.code === 'SOURCEMAP_ERROR') return;

            // Let everything else through
            defaultHandler(warning);
          },
        },
      },
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
