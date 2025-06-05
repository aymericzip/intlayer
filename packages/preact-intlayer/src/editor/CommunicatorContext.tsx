'use client';

import configuration from '@intlayer/config/built';

import {
  createContext,
  type ComponentChildren,
  type FunctionComponent,
} from 'preact';
import { useContext, useMemo, useRef } from 'preact/hooks';
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

export type CommunicatorProviderProps = {
  children?: ComponentChildren;
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
};

export const CommunicatorProvider: FunctionComponent<
  CommunicatorProviderProps
> = ({ children, allowedOrigins, postMessage }) => {
  // Create a stable, unique ID for the lifetime of this app/iframe instance.
  const senderIdRef = useRef(uuid());

  const value = useMemo(
    () => ({ postMessage, allowedOrigins, senderId: senderIdRef.current }),
    [postMessage, allowedOrigins] // senderIdRef.current is stable
  );

  return (
    <CommunicatorContext.Provider value={value}>
      {children}
    </CommunicatorContext.Provider>
  );
};

export const useCommunicator = () => useContext(CommunicatorContext);
