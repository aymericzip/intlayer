import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

/**
 * `@intlayer/core` sub-paths inlined into the bundle.
 *
 * Only `findMatchingCondition` is used, to prove an `enu()` reorder keeps the
 * runtime resolution. Inlining it (tree-shaken to a few hundred bytes) keeps
 * the plugin free of runtime dependencies besides Prettier, and keeps the
 * check aligned with the interpreter in this repository.
 */
const BUNDLED_SUBPATHS = [
  /^@intlayer\/core\/interpreter$/,
  /^@intlayer\/core\/transpiler$/,
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
