import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const dir = __dirname ? __dirname : dirname(fileURLToPath(import.meta.url));

const options: Options[] = getOptions({
  all: {
    outDir: `${dir}/dist`,
  },
});

export default defineConfig(options);
