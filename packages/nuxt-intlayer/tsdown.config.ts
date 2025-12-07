import { getOptions, isExternal } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const [esm, , types] = getOptions({
  all: {
    external: (id: string) => {
      // Nuxt virtual modules that are resolved at runtime
      if (id.startsWith('#')) return true;

      return isExternal(id);
    },
  },
});

export default defineConfig([esm, types] as UserConfig[]);
