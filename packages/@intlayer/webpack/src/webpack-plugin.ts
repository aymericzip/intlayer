import { IntlayerEventListener } from '@intlayer/api';
import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { getConfiguration, logger } from '@intlayer/config';
import type { Compiler } from 'webpack';

// Watch mode or on time build
export class IntlayerPlugin {
  private isWatching = false; // Flag to ensure we only start the watcher after the first build
  private configuration = getConfiguration();
  private eventListener: IntlayerEventListener | undefined;

  async apply(compiler: Compiler): Promise<void> {
    if (this.configuration.content.watch) {
      // Start watching (assuming watch is also async)
      watch(this.configuration);
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
