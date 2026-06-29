import { getOptions } from '@utils/tsdown-config';
import { defineConfig } from 'tsdown';

/**
 * @intlayer/backend and intlayer-editor are resolved via tsconfig `paths` during
 * compilation. Their types must be inlined (bundled) into the emitted .d.ts
 * files so that consumers of @intlayer/api do not need those heavy packages
 * installed. dts.noExternal forces rolldown-plugin-dts to bundle them inline
 * rather than keeping them as external import references.
 */
export default defineConfig(
  getOptions({
    types: {
      dts: {
        emitDtsOnly: true,
        respectExternal: true,
        noExternal: ['@intlayer/backend', 'intlayer-editor'],
      },
    },
  })
);
