import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { logger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import type { Compiler } from 'webpack';

// Watch mode or on time build
export class IntlayerPlugin {
  private isWatching = false; // Flag to ensure we only start the watcher after the first build
  private configuration;

  constructor(configuration: IntlayerConfig) {
    this.configuration = configuration;
  }

  async apply(compiler: Compiler): Promise<void> {
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
