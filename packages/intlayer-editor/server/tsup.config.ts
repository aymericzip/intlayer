import { packageBuildOptions } from '@utils/tsup-config';
import { dirname } from 'path';
import { defineConfig } from 'tsup';
import { fileURLToPath } from 'url';

const dir = __dirname ? __dirname : dirname(fileURLToPath(import.meta.url));

export default defineConfig(
  packageBuildOptions.map((options) => ({
    ...options,
    outDir: `${dir}/dist`,
  }))
);
