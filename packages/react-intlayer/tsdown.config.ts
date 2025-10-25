import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

const options = getOptions({
  all: {
    platform: 'neutral',
  },
});

export default defineConfig(options);
