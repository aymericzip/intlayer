// biome-ignore lint/style/useNodejsImportProtocol: <build failed without this>
import { dirname, relative } from 'path';
// biome-ignore lint/style/useNodejsImportProtocol: <build failed without this>
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory

const getTailwindConfig = () => {
  const originAbsolutePath = process.cwd();
  const localePath = __dirname;

  let relativePath = relative(originAbsolutePath, localePath);

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
