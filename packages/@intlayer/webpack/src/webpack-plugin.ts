import { watch } from '@intlayer/chokidar';
import type { Compiler } from 'webpack';

export class IntLayerPlugin {
  apply(compiler: Compiler): void {
    compiler.hooks.environment.tap('IntLayerPlugin', () => {
      // Set up the watcher using chokidar

      watch({ persistent: process.env.NODE_ENV === 'development' });
    });
  }
}
