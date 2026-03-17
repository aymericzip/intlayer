import { inject } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export const useCommunicator = () => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  if (!manager) return null;

  return {
    postMessage: (data: any) => manager.messenger.send(data.type, data.data),
    senderId: manager.messenger.senderId,
  };
};
