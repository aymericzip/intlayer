import { packageBuildOptions } from '@utils/tsup-config';
import { defineConfig, type Options } from 'tsup';

const option: Options[] = (packageBuildOptions as Options[]).map((option) => ({
  ...option,
  loader: {
    '.md': 'copy',
    '.json': 'copy',
  },
}));

export default defineConfig(option);
