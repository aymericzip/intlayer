import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

const options = getOptions({
  all: {
    unbundle: false, // Use to optimize tree shaking
    treeshake: false,
  },
});

export default defineConfig(options);
