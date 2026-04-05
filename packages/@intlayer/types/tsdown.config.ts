import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const options: UserConfig[] = getOptions({
  all: {
    platform: 'neutral',
    deps: {
      neverBundle: ['intlayer'],
    },
    unbundle: false, // Set to false for locales object to be tree shaken
  },
  types: {
    dts: {
      oxc: true,
      emitDtsOnly: true,
    },
  },
});

export default defineConfig(options);
