import type { NodePath, PluginObject, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import { makeFieldRenameBabelPlugin } from './babel-plugin-intlayer-field-rename';
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
}): PluginObject => {
  /**
   * The field-rename `Program.exit` handler extracted from
   * {@link makeFieldRenameBabelPlugin}.  Resolved once per plugin-instance
   * (i.e. once per babel.config.js registration, not once per file).
   */
  let fieldRenameExitVisitor:
    | ((programPath: NodePath<BabelTypes.Program>) => void)
    | null = null;

  /** The `baseDir` for which the visitor was last resolved. */
  let resolvedBaseDir: string | null = null;

  return {
    name: 'intlayer-minify',

    pre(this: PluginPass & { opts: MinifyPluginOptions }) {
      const { baseDir, minify, optimize, editorEnabled } = this.opts;

      if (!minify || optimize === false || editorEnabled) return;

      // Re-resolve when the baseDir changes (edge case in monorepos where the
      // same process handles multiple workspaces with different configs).
      if (resolvedBaseDir === baseDir && fieldRenameExitVisitor !== null)
        return;

      const pruneContext: PruneContext | null = getSharedPruneContext(baseDir);
      if (
        !pruneContext ||
        pruneContext.dictionaryKeyToFieldRenameMap.size === 0
      )
        return;

      resolvedBaseDir = baseDir;

      // Instantiate makeFieldRenameBabelPlugin and extract its Program.exit
      // handler so we can invoke it from our own visitor.
      const fieldRenamePlugin = makeFieldRenameBabelPlugin(pruneContext)(babel);
      const programVisitor = fieldRenamePlugin.visitor.Program;

      if (
        programVisitor &&
        typeof programVisitor === 'object' &&
        'exit' in programVisitor &&
        typeof (
          programVisitor as {
            exit: (path: NodePath<BabelTypes.Program>) => void;
          }
        ).exit === 'function'
      ) {
        fieldRenameExitVisitor = (
          programVisitor as {
            exit: (path: NodePath<BabelTypes.Program>) => void;
          }
        ).exit;
      }
    },

    visitor: {
      Program: {
        exit(
          programPath: NodePath<BabelTypes.Program>,
          state: PluginPass
        ): void {
          if (!fieldRenameExitVisitor) return;
          if (!INTLAYER_USAGE_REGEX.test(state.file.code)) return;

          fieldRenameExitVisitor(programPath);
        },
      },
    },
  };
};
