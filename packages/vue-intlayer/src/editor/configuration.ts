import configuration from '@intlayer/config/built';
import { IntlayerConfig } from '@intlayer/config/client';
import { MessageKey } from '@intlayer/editor';
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
