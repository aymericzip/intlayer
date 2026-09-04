import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig, mergeConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

// Storybook 10 loads this config as native ESM, where `__dirname` is undefined.
const configDirectory = import.meta.dirname;

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-docs',
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

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer(), tailwindcss()],
      resolve: {
        alias: {
          '@components': resolve(configDirectory, '../src/components'),
          '@utils': resolve(configDirectory, '../src/utils'),
          '@libs': resolve(configDirectory, '../src/libs'),
          '@hooks': resolve(configDirectory, '../src/hooks'),
          '@api': resolve(configDirectory, '../src/api'),
          '@providers': resolve(configDirectory, '../src/providers'),
          '@': resolve(configDirectory, '../src'),
        },
      },
      build: {
        // Optional: avoid the sourcemap location spam
        sourcemap: false,

        // Optional: silence the “chunks > 500kB” warning
        chunkSizeWarningLimit: 1500,

        rolldownOptions: {
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
