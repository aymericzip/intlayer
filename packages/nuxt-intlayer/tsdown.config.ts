import { builtinModules } from 'node:module';
import { getOptions, isExternal } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

export default defineConfig(
  getOptions({
    all: {
      external: (id: string) => {
        // Nuxt virtual modules that are resolved at runtime
        if (id.startsWith('#')) return true;

        return isExternal(id);
      },
    },
  })
);
