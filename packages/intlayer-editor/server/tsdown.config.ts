import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options: Options[] = getOptions({
  all: {
    outDir: `${__dirname}/dist`,
  },
});

export default defineConfig(options);
