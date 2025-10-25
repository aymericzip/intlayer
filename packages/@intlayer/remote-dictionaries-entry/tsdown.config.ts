import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const options: Options[] = getOptions({
  types: {
    dts: {
      oxc: true,
      emitDtsOnly: true,
    },
  },
});

export default defineConfig(options);
