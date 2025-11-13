import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig, mergeConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  staticDirs: ['./static'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    config.server = {
      ...config.server,
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
    }));

    return mergeConfig(config, viteConfig(env));
  },
};

export default config;
