import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const [esm, , types] = getOptions({
  types: {
    dts: {
      generator: 'oxc',
      emitDtsOnly: true,
    },
  },
});

export default defineConfig([esm, types] as UserConfig[]);
