import { watch } from '@intlayer/chokidar';

// Watch mode or on time build
export class IntLayerPlugin {
  apply(): void {
    watch();
  }
}
