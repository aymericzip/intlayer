import { MessageKey, mergeIframeClick } from '@intlayer/editor';
import { getEditorStateManager } from './communicator';
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
