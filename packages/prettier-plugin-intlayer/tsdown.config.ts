import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

/**
 * Workspace sub-paths inlined into the bundle.
 *
 * `findMatchingCondition` proves an `enu()` reorder keeps the runtime
 * resolution; `@intlayer/config/extract` detects Intlayer nodes read as
 * strings, shared with `eslint-plugin-intlayer`. Inlining them (tree-shaken)
 * keeps the plugin free of runtime dependencies besides Prettier, and keeps
 * the checks aligned with the rest of this repository.
 */
const BUNDLED_SUBPATHS = [
  /^@intlayer\/core\/interpreter$/,
  /^@intlayer\/core\/transpiler$/,
  /^@intlayer\/config\/extract$/,
];

export default defineConfig(
  getOptions({
    all: {
      deps: {
        alwaysBundle: BUNDLED_SUBPATHS,
      },
    },
  }) as UserConfig[]
);
