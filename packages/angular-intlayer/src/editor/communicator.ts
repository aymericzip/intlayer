import { getEditorStateManager } from './installIntlayerEditor';

export const useCommunicator = () => {
  const manager = getEditorStateManager();
  if (!manager) return null;
  return {
    postMessage: (data: any) => manager.messenger.send(data.type, data.data),
    senderId: manager.messenger.senderId,
  };
};
