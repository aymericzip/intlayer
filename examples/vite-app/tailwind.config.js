import { tailwindConfig } from 'intlayer-editor/tailwind';

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [tailwindConfig],
  content: [...tailwindConfig.content, './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
