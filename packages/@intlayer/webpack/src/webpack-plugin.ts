import { prepareIntlayer } from '@intlayer/chokidar/build';
import { watch } from '@intlayer/chokidar/watcher';
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
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Compiler } from 'webpack';

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
        // (collections / variants / meta records)
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
      'process.env': '({})',
      ...env,
    }).apply(compiler);

    if (this.configuration.content.watch) {
      // Start watching (assuming watch is also async)
      await watch({ configuration: this.configuration });
    }

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
  }
}
