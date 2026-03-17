'use client';

import type { MessagePayload } from '@intlayer/editor';
import { useEditorStateManager } from './EditorStateContext';

export type UseCrossPlatformStateProps = {
  postMessage: (payload: MessagePayload) => void;
  allowedOrigins?: string[];
  senderId: string;
};

/**
 * Returns the communicator API backed by the shared EditorStateManager messenger.
 */
export const useCommunicator = (): UseCrossPlatformStateProps => {
  const manager = useEditorStateManager();

  return {
    postMessage: (payload: MessagePayload) =>
      manager?.messenger.send(payload.type, payload.data),
    senderId: manager?.messenger.senderId ?? '',
  };
};

// Re-export type for backward compatibility
export type { MessengerConfig } from '@intlayer/editor';
