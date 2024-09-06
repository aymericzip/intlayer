import type { Config } from 'tailwindcss';
import defaultConfig, {
  intlayerTailwindContent,
} from '@intlayer/design-system/tailwind-config';

const config: Config = {
  presets: [defaultConfig],
  content: [...intlayerTailwindContent, './src/**/*.{js,ts,jsx,tsx,mdx}'],
};
export default config;
