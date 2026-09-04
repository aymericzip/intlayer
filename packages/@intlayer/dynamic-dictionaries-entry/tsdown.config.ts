import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const options: UserConfig[] = getOptions({
  types: {
    dts: {
      generator: 'oxc',
      emitDtsOnly: true,
    },
  },
});

export default defineConfig(options);
