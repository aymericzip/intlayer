import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options: UserConfig[] = getOptions({
  all: {
    outDir: `${__dirname}/dist`,
    entry: ['./src/**/*.ts'],
  },
});

export default defineConfig(options);
