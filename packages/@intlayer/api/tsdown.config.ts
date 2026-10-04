import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

/**
 * intlayer-editor is resolved via tsconfig `paths`: its server types are
 * inlined into the emitted .d.ts so consumers of @intlayer/api do not need
 * it. Every other import stays a bare specifier (never resolved to a
 * `node_modules` path of the build machine).
 */
export default defineConfig(
  getOptions({
    types: {
      deps: {
        neverBundle: true,
        alwaysBundle: ['intlayer-editor'],
      },
      dts: {
        emitDtsOnly: true,
      },
    },
  })
);
