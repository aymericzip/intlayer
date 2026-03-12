import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const options: UserConfig[] = getOptions({
  all: {
    platform: 'neutral',
    deps: {
      neverBundle: ['intlayer'],
    },
  },
  types: {
    dts: {
      oxc: true,
      emitDtsOnly: true,
    },
  },
});

export default defineConfig(options);
