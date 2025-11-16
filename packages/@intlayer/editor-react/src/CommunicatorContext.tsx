'use client';

import configuration from '@intlayer/config/built';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from 'react';

const randomUUID = () => Math.random().toString(36).slice(2);

export type UseCrossPlatformStateProps = {
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
  senderId: string;
};

const { editor } = configuration ?? {};

const CommunicatorContext = createContext<UseCrossPlatformStateProps>({
  postMessage: () => null,
  allowedOrigins: [
    editor?.applicationURL,
    editor?.editorURL,
    editor?.cmsURL,
  ] as string[],
  senderId: '',
});

export type CommunicatorProviderProps = PropsWithChildren<
  Omit<UseCrossPlatformStateProps, 'senderId'>
>;

export const CommunicatorProvider: FC<CommunicatorProviderProps> = ({
  children,
  allowedOrigins,
  postMessage,
}) => {
  // Create a stable, unique ID for the lifetime of this app/iframe instance.
  const senderIdRef = useRef(randomUUID());

  const value = useMemo(
    () => ({ postMessage, allowedOrigins, senderId: senderIdRef.current }),
    [postMessage, allowedOrigins, senderIdRef.current]
  );

  return (
    <CommunicatorContext.Provider value={value}>
      {children}
    </CommunicatorContext.Provider>
  );
};

export const useCommunicator = () => useContext(CommunicatorContext);
