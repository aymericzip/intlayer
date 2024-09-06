import type { Config } from 'tailwindcss';
import defaultConfig from '@intlayer/design-system/tailwind-config';

const config: Config = {
  presets: [defaultConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/@intlayer/design-system/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [],
};
export default config;
