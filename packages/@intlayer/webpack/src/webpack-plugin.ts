import { prepareIntlayer } from '@intlayer/chokidar/build';
import {
  getNodeTypeDefineVars,
  getUsedNodeTypes,
} from '@intlayer/chokidar/utils';
import { watch } from '@intlayer/chokidar/watcher';
import { logger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
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

    const nodeTypeDefineVars = isBuild
      ? Object.fromEntries(
          Object.entries(
            getNodeTypeDefineVars(
              getUsedNodeTypes(getDictionaries(this.configuration))
            )
          ).map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)])
        )
      : {};

    new webpack.DefinePlugin({
      'process.env.INTLAYER_EDITOR_ENABLED': JSON.stringify(
        this.configuration.editor?.enabled === false ? 'false' : 'true'
      ),
      ...nodeTypeDefineVars,
    }).apply(compiler);

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
          logger(`Error in IntlayerPlugin: ${error}`, {
            level: 'error',
          });
        }
      }
    });
  }
}
