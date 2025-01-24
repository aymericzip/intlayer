import tailwindConfig, {
  tailwindPresetConfig,
} from '@intlayer/design-system/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [tailwindPresetConfig],
  content: [...tailwindConfig.content, './src/**/*.{js,ts,jsx,tsx,mdx}'],
};
export default config;
