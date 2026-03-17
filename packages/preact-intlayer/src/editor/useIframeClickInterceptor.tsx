import { mergeIframeClick } from '@intlayer/editor';
import { MessageKey } from '@intlayer/types/messageKey';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

export const useIframeClickInterceptor = () => {
  useCrossFrameMessageListener<undefined>(MessageKey.INTLAYER_IFRAME_CLICKED);
};

export const useIframeClickMerger = () => {
  useCrossFrameMessageListener<MessageEvent>(
    MessageKey.INTLAYER_IFRAME_CLICKED,
    mergeIframeClick
  );
};
