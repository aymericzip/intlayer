import { packageBuildOptions } from '@utils/tsup-config';
import { type Options, defineConfig } from 'tsup';

const option: Options[] = (packageBuildOptions as Options[]).map((option) => ({
  ...option,
  loader: {
    '.md': 'copy',
  },
}));

export default defineConfig(option);
