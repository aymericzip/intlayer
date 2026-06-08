import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

const options = getOptions({
  all: {
    unbundle: true,
  },
});

export default defineConfig(options);
