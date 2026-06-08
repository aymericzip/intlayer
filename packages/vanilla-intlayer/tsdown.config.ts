import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

const options = getOptions({
  all: {
    platform: 'neutral',
    unbundle: true,
  },
});

export default defineConfig(options);
