import { watch } from '@intlayer/chokidar';

// Watch mode or on time build
export class IntlayerPlugin {
  apply(): void {
    watch();
  }
}
