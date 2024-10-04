import defaultConfig, {
  intlayerTailwindContent,
} from '@intlayer/design-system/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [defaultConfig],
  content: [...intlayerTailwindContent, './src/**/*.{js,ts,jsx,tsx,mdx}'],
};
export default config;
