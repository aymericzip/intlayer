import { DestroyRef, inject } from '@angular/core';
import configuration from '@intlayer/config/built';
import { IntlayerConfig } from '@intlayer/config/client';
import { MessageKey } from '@intlayer/editor';
import { useCrossFrameState } from './useCrossFrameState';

export const useConfiguration = () => {
  const [pushedConfiguration, setConfiguration] =
    useCrossFrameState<IntlayerConfig>(MessageKey.INTLAYER_CONFIGURATION);

  // Use Angular's injection context instead of Vue's onMounted
  try {
    const destroyRef = inject(DestroyRef, { optional: true });

    if (destroyRef) {
      // Execute immediately since Angular doesn't have the same lifecycle hooks
      if (!pushedConfiguration()) {
        setConfiguration(configuration);
      }
    }
  } catch {
    console.warn(
      'useConfiguration called outside injection context; ' +
        'configuration may not be synchronized.'
    );
  }
};
