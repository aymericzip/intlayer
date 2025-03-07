'use client';

import configuration from '@intlayer/config/built';

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type FC,
  type PropsWithChildren,
} from 'react';
import { v4 as uuid } from 'uuid'; // if you prefer a UUID library

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

export type CommunicatorProviderProps = PropsWithChildren<
  Omit<UseCrossPlatformStateProps, 'senderId'>
>;

export const CommunicatorProvider: FC<CommunicatorProviderProps> = ({
  children,
  allowedOrigins,
  postMessage,
}) => {
  // Create a stable, unique ID for the lifetime of this app/iframe instance.
  const senderIdRef = useRef(uuid());

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
