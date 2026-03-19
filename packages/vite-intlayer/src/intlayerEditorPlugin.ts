import type { IntlayerConfig } from '@intlayer/types/config';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import type { Plugin } from 'vite';

/**
 * Vite plugin that injects `process.env.INTLAYER_EDITOR_ENABLED` as a
 * compile-time constant so bundlers can dead-code-eliminate all
 * `import('@intlayer/editor')` calls when the editor is disabled.
 *
 * Returning a partial config object from the `config` hook is the idiomatic
 * Vite approach — Vite deep-merges it automatically via `mergeConfig`.
 */
export const intlayerEditorPlugin = (
  intlayerConfig: IntlayerConfig
): Plugin => ({
  name: 'vite-intlayer-editor-plugin',
  config: () => ({
    define: {
      'process.env.INTLAYER_EDITOR_ENABLED': JSON.stringify(
        intlayerConfig.editor?.enabled === false ? 'false' : 'true'
      ),
    },
  }),
});
