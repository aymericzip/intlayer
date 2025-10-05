import configuration from '@intlayer/config/built';

import {
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from 'solid-js';

// Simple UUID generator to replace the uuid dependency
const generateId = () => {
  return 'xxxx-xxxx-xxxx-yxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export type UseCrossPlatformStateProps = {
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
  senderId: string;
};

const { editor } = configuration;

const CommunicatorContext = createContext<UseCrossPlatformStateProps>({
  postMessage: () => null,
  allowedOrigins: [
    editor?.applicationURL,
    editor?.editorURL,
    editor?.cmsURL,
  ] as string[],
  senderId: '',
});

export type CommunicatorProviderProps = ParentProps<
  Omit<UseCrossPlatformStateProps, 'senderId'>
>;

export const CommunicatorProvider: Component<CommunicatorProviderProps> = (
  props
) => {
  // Create a stable, unique ID for the lifetime of this app/iframe instance.
  const senderId = generateId();

  const value = createMemo(() => ({
    postMessage: props.postMessage,
    allowedOrigins: props.allowedOrigins,
    senderId,
  }));

  return (
    <CommunicatorContext.Provider value={value()}>
      {props.children}
    </CommunicatorContext.Provider>
  );
};

export const useCommunicator = () => useContext(CommunicatorContext);
