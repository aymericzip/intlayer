import configuration from '@intlayer/config/built';
import {
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from 'solid-js';

export type UseCrossPlatformStateProps = {
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
  senderId: string;
};

const randomUUID = () => Math.random().toString(36).slice(2);

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
  const senderId = randomUUID();

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
