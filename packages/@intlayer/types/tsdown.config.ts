import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const options: Options[] = getOptions({
  all: {
    platform: 'neutral',
  },
});

export default defineConfig(options);
