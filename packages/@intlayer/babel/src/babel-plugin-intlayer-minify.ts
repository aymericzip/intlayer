import type { NodePath, PluginObject, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import { renameIntlayerFieldAccesses } from './babel-plugin-intlayer-field-rename';
import { getSharedPruneContext } from './babel-plugin-intlayer-purge';
import type { PruneContext } from './babel-plugin-intlayer-usage-analyzer';
import { INTLAYER_USAGE_REGEX } from './transformers';

// ── Plugin options ────────────────────────────────────────────────────────────

/**
 * Pre-resolved options accepted by {@link intlayerMinifyBabelPlugin}.
 *
 * All values are resolved at babel.config.js load time (via
 * {@link getMinifyPluginOptions}) so the plugin does not read the intlayer
 * configuration file on every file transform.
 */
export type MinifyPluginOptions = {
  /**
   * Absolute path to the project root.  Used to look up the shared
   * {@link PruneContext} built by {@link intlayerPurgeBabelPlugin}.
   */
  baseDir: string;

  /**
   * When `true`, rewrite source-file property accesses to use the short
   * alphabetic aliases assigned during the minification pass
   * (e.g. `content.title` → `content.a`).  Mirrors `build.minify`.
   */
  minify: boolean;

  /**
   * Build optimisation toggle.  When explicitly `false`, the plugin is a
   * no-op.  Mirrors `build.optimize`.
   */
  optimize: boolean | undefined;

  /**
   * When `true` the plugin is a no-op.  Mirrors `editor.enabled`.
   */
  editorEnabled: boolean;
};

// ── Babel plugin ──────────────────────────────────────────────────────────────

/**
 * Babel plugin that rewrites component source files to use the short
 * alphabetic aliases assigned to dictionary content fields during the
 * minification pass (e.g. `content.title` → `content.a`).
 *
 * This plugin relies on the field-rename map built by
 * {@link intlayerPurgeBabelPlugin} during its `pre()` hook. Both plugins
 * share the same module-level {@link PruneContext} via
 * {@link getSharedPruneContext}, so **`intlayerPurgeBabelPlugin` must be
 * listed before this plugin** in `babel.config.js` so that its `pre()` runs
 * first and the shared context is populated before this plugin's
 * `Program.exit` visitor fires.
 *
 * All option values must be pre-resolved via {@link getMinifyPluginOptions}.
 *
 * @example
 * ```js
 * // babel.config.js
 * const {
 *   intlayerPurgeBabelPlugin,
 *   intlayerMinifyBabelPlugin,
 *   intlayerOptimizeBabelPlugin,
 *   getPurgePluginOptions,
 *   getMinifyPluginOptions,
 *   getOptimizePluginOptions,
 * } = require("@intlayer/babel");
 *
 * module.exports = {
 *   presets: ["next/babel"],
 *   plugins: [
 *     [intlayerPurgeBabelPlugin,    getPurgePluginOptions()],
 *     [intlayerMinifyBabelPlugin,   getMinifyPluginOptions()],
 *     [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
 *   ],
 * };
 * ```
 *
 * @remarks
 * - This plugin is a no-op when `minify` is `false`, `optimize` is `false`,
 *   or `editorEnabled` is `true`.
 * - Source-code renames must run **before** {@link intlayerOptimizeBabelPlugin}
 *   because the optimize pass replaces `useIntlayer` calls with
 *   `useDictionary`, erasing the dictionary-key information needed to look up
 *   the rename map.
 */
export const intlayerMinifyBabelPlugin = (babel: {
  types: typeof BabelTypes;
}): PluginObject => ({
  name: 'intlayer-minify',

  visitor: {
    Program: {
      exit(programPath: NodePath<BabelTypes.Program>, state: PluginPass): void {
        const { baseDir, minify, optimize, editorEnabled } =
          state.opts as MinifyPluginOptions;

        if (!minify || optimize === false || editorEnabled) return;
        if (!INTLAYER_USAGE_REGEX.test(state.file.code)) return;

        const pruneContext: PruneContext | null =
          getSharedPruneContext(baseDir);
        if (!pruneContext) return;

        renameIntlayerFieldAccesses(babel.types, programPath, pruneContext);
      },
    },
  },
});
