import type { BundleIntlayerOptions } from '@intlayer/config/bundle';

export const bundle = async (options: BundleIntlayerOptions): Promise<void> => {
  try {
    // Dynamic import for performance reason
    const { bundleIntlayer } = await import('@intlayer/config/bundle');
    await bundleIntlayer(options);
  } catch (error) {
    console.error('Failed to create bundle:', error);
    process.exit(1);
  }
};
