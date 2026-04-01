import { prepareIntlayer } from '@intlayer/chokidar/build';
import { watch } from '@intlayer/chokidar/watcher';
import { BLUE } from '@intlayer/config/colors';
import {
  formatNodeTypeToEnvVar,
  getConfigEnvVars,
} from '@intlayer/config/envVars';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import {
  getUnusedNodeTypes,
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

    let env: Record<string, string> = {};

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

        // Tree shacking based on unused node types
        ...formatNodeTypeToEnvVar(unusedNodeTypes),

        // Tree shacking based on config
        ...getConfigEnvVars(this.configuration),
      };
    }

    new webpack.DefinePlugin(env).apply(compiler);

    if (this.configuration.content.watch) {
      // Start watching (assuming watch is also async)
      watch({ configuration: this.configuration });
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
