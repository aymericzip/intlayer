import { BLUE } from '@intlayer/config/colors';
import {
  formatDictionarySelectorEnvVar,
  formatNodeTypeToEnvVar,
  getConfigEnvVars,
} from '@intlayer/config/envVars';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import {
  getHasDictionarySelector,
  getUnusedNodeTypesAsync,
} from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { prepareIntlayer } from '@intlayer/engine/build';
import { watch } from '@intlayer/engine/watcher';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Compiler } from 'webpack';

/**
 * Minimal structural view of a webpack `DefinePlugin` instance, limited to the
 * `definitions` record it exposes. Typed locally rather than imported because
 * `webpack.DefinePlugin` is reachable only through the `Compiler` instance at
 * runtime, and the host bundler may resolve its own webpack copy.
 */
type DefinePluginLike = {
  definitions?: Record<string, unknown>;
};

/**
 * Narrows an entry of `compiler.options.plugins` to a `DefinePlugin` instance.
 *
 * @param plugin - Any entry of the webpack `plugins` array (may be a function,
 *                 `undefined` or `false` when the host config uses conditional
 *                 plugin lists).
 */
const isDefinePlugin = (plugin: unknown): plugin is DefinePluginLike =>
  typeof plugin === 'object' &&
  plugin !== null &&
  plugin.constructor?.name === 'DefinePlugin';

/**
 * Checks whether the host bundler already replaces the whole `process.env`
 * expression through its own `DefinePlugin`.
 *
 * Create React App defines `process.env` as an object literal holding its
 * `REACT_APP_*` variables. Declaring a second, differently-valued `process.env`
 * makes webpack emit `Conflicting values for 'process.env'`, which CRA
 * escalates to a build failure whenever `process.env.CI` is set (the default on
 * CI servers). When the host already provides that replacement, every
 * `process.env.*` read resolves against its object literal instead of a bare
 * `process`, so the catch-all define is redundant and can be skipped.
 *
 * @param compiler - The webpack compiler the Intlayer plugin is applied to.
 */
const getHasHostProcessEnvDefine = (compiler: Compiler): boolean =>
  (compiler.options.plugins ?? []).some(
    (plugin) =>
      isDefinePlugin(plugin) && 'process.env' in (plugin.definitions ?? {})
  );

// Watch mode or on time build
export class IntlayerPlugin {
  private isWatching = false; // Flag to ensure we only start the watcher after the first build
  private configuration;

  constructor(configuration?: IntlayerConfig) {
    this.configuration = configuration ?? getConfiguration();
  }

  async apply(compiler: Compiler): Promise<void> {
    const { webpack } = compiler;

    const isBuild = compiler.options.mode !== 'development';

    const appLogger = getAppLogger(this.configuration);

    // Register the dictionary preparation tap *synchronously*, before any
    // `await` below. webpack does not await a plugin's async `apply`, so any
    // hook tapped after an `await` (e.g. after `watch()`) may register too late
    // — after `beforeCompile` has already fired — leaving the `.intlayer`
    // dictionaries entry unbuilt when module resolution starts and breaking the
    // build with `Can't resolve '@intlayer/dictionaries-entry'`. Tapping here
    // guarantees the entry is prepared before compilation begins.
    compiler.hooks.beforeCompile.tapPromise('IntlayerPlugin', async () => {
      if (!this.isWatching) {
        try {
          await prepareIntlayer(this.configuration);
          this.isWatching = true;
        } catch (error) {
          appLogger(`Error in IntlayerPlugin: ${error}`, {
            level: 'error',
          });
        }
      }
    });

    const wrapKey = (key: string) => `process.env.${key}`;
    const wrapValue = (value: string) => `"${value}"`;

    // Specific `process.env.<KEY>` defines. webpack's DefinePlugin replaces both
    // the dot- and bracket-notation reads of a defined key, and — crucially —
    // folds them at *parse* time, which lets it dead-code-eliminate the guarded
    // dynamic `import()` chunks (e.g. the HTML/markdown renderers) for unused
    // node types. The config flags are emitted in every mode so routing/editor
    // behaviour is correct in dev too; the dictionary scan (used to prune node
    // types) only runs for production builds.
    let env: Record<string, string> = {
      ...getConfigEnvVars(this.configuration, wrapKey, wrapValue),
    };

    if (isBuild) {
      const dictionaries = getDictionaries(this.configuration);

      if (Object.keys(dictionaries).length === 0) {
        appLogger('No dictionaries found. Please check your configuration.', {
          isVerbose: true,
        });
      }

      const unusedNodeTypes = await getUnusedNodeTypesAsync(dictionaries);

      if (unusedNodeTypes && unusedNodeTypes.length > 0) {
        appLogger(
          [
            'Filtering out plugins:',
            unusedNodeTypes.map((key) => colorize(key, BLUE)).join(', '),
          ],
          {
            isVerbose: true,
          }
        );
      }

      env = {
        ...env,

        // Tree shaking based on unused node types
        ...formatNodeTypeToEnvVar(unusedNodeTypes, wrapKey, wrapValue),

        // Tree shaking the dictionary selector logic
        // (collections / variants)
        ...formatDictionarySelectorEnvVar(
          getHasDictionarySelector(dictionaries),
          wrapKey,
          wrapValue
        ),
      };
    }

    new webpack.DefinePlugin({
      // Catch-all so that any `process.env.*` read NOT folded by the specific
      // keys below still resolves to `undefined` instead of dereferencing a
      // bare `process`, which is not defined in browser bundles (e.g. Angular)
      // and throws `process is not defined`. This covers in-use node types
      // (never emitted as "false"), the dictionary selector when present, and
      // every read in development where the dictionary scan is skipped. Specific
      // keys (below) and host bundler defines (e.g. `process.env.NODE_ENV`) take
      // precedence over this object, so chunk-level tree shaking is preserved.
      // Omitted when the host bundler already defines `process.env` itself, as
      // two conflicting values for the same key make webpack warn — and CRA
      // turns that warning into an error under `CI=true`.
      ...(getHasHostProcessEnvDefine(compiler)
        ? {}
        : { 'process.env': '({})' }),
      ...env,
    }).apply(compiler);

    // Only watch content declarations for the dev server. A production build is
    // a one-off compilation: starting a file watcher there serves no purpose and
    // keeps a live `fsevents`/chokidar stream open for the whole build.
    if (!isBuild && this.configuration.content.watch) {
      // Start watching (assuming watch is also async)
      await watch({ configuration: this.configuration });
    }
  }
}
