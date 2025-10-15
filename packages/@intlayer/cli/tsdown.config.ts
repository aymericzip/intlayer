import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const options: Options[] = getOptions({
  all: {
    loader: {
      '.md': 'text', // treat .md as plain text (string)
    },
  },
});

export default defineConfig(options);
