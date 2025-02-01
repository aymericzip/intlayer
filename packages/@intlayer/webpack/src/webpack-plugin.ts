import { buildAndWatchIntlayer } from '@intlayer/chokidar';
import { Compiler } from 'webpack';

// Watch mode or on time build
export class IntlayerPlugin {
  async apply(compiler: Compiler): Promise<void> {
    compiler.hooks.beforeCompile.tapPromise('IntlayerPlugin', async () => {
      try {
        await buildAndWatchIntlayer();
      } catch (error) {
        console.error('Error in IntlayerPlugin:', error);
      }
    });
  }
}
