import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const getTailwindConfig = () => {
  const originAbsolutePath = process.cwd();
  const localePath = __dirname;

  let relativePath = path.relative(originAbsolutePath, localePath);

  if (!relativePath) {
    relativePath = '.';
  }

  const config = {
    content: [
      `${relativePath}/components/**/*.{ts,tsx,jsx,mjx,js,cjs,cjx,mjs,mjx,svg}`,
    ],
  };

  return config;
};

const tailwindConfig = getTailwindConfig();
const tailwindPresetConfig = tailwindConfig;

export { tailwindPresetConfig };
export default tailwindConfig;
