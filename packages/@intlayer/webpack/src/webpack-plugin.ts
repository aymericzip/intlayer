import { buildAndWatchIntlayer } from '@intlayer/chokidar';
import { Compiler } from 'webpack';

// Watch mode or on time build
export class IntlayerPlugin {
  private isWatching = false; // Flag to ensure we only start the watcher once

  async apply(compiler: Compiler): Promise<void> {
    compiler.hooks.beforeCompile.tapPromise('IntlayerPlugin', async () => {
      if (!this.isWatching) {
        try {
          await buildAndWatchIntlayer();
          this.isWatching = true;
        } catch (error) {
          console.error('Error in IntlayerPlugin:', error);
        }
      }
    });
  }
}
