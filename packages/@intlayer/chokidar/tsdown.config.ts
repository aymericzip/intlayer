import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const options: Options[] = getOptions({
  all: {
    loader: {
      '.txt': 'text',
    },
  },
});

export default defineConfig(options);
