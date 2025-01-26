import { buildAndWatchIntlayer } from '@intlayer/chokidar';

// Watch mode or on time build
export class IntlayerPlugin {
  async apply(): Promise<void> {
    try {
      await buildAndWatchIntlayer();
    } catch (error) {
      console.error('Error in IntlayerPlugin:', error);
    }
  }
}
