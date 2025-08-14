import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig, mergeConfig } from 'vite';
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

    const tailwindcss = (await import('@tailwindcss/vite')).default;

    const viteConfig = defineConfig(() => ({
      plugins: [tailwindcss(), intlayerPlugin()],
    }));

    return mergeConfig(config, viteConfig(env));
  },
};

export default config;
