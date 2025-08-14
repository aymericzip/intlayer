import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig, type Plugin } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const env = {
      command: configType === 'DEVELOPMENT' ? 'serve' : 'build',
      mode: configType === 'DEVELOPMENT' ? 'development' : 'production',
    } as const;

    const rawCustomConfig = defineConfig(async () => {
      const { default: tailwindcss } = await import('@tailwindcss/vite');

      return {
        plugins: [
          react({ jsxRuntime: 'automatic' }) as unknown as Plugin,
          tailwindcss(),
          intlayerPlugin(),
        ],
      };
    });
    return mergeConfig(config, rawCustomConfig(env));
  },
};

export default config;
