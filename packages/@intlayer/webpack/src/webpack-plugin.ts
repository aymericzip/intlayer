import { watch } from '@intlayer/chokidar';

// Watch mode or on time build
const persistent = process.env.NODE_ENV === 'development';

export class IntLayerPlugin {
  apply(): void {
    watch({ persistent });
  }
}
