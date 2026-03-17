import { useEditorStateManager } from './EditorProvider';

export const useCommunicator = () => {
  const manager = useEditorStateManager();
  return {
    postMessage: (data: any) => manager?.messenger.send(data.type, data.data),
    senderId: manager?.messenger.senderId ?? '',
  };
};

// Backward-compat exports
export type CommunicatorProviderProps = {
  postMessage?: (data: any) => void;
  allowedOrigins?: string[];
};
