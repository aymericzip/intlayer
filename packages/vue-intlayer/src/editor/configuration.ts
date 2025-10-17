import configuration from '@intlayer/config/built';
import { MessageKey } from '@intlayer/editor';
import type { IntlayerConfig } from '@intlayer/types';
import { onMounted } from 'vue';
import { useCrossFrameState } from './useCrossFrameState';

export const useConfiguration = () => {
  const [pushedConfiguration, setConfiguration] =
    useCrossFrameState<IntlayerConfig>(MessageKey.INTLAYER_CONFIGURATION);

  onMounted(() => {
    if (!pushedConfiguration) return;
    setConfiguration(configuration);
  });
};
