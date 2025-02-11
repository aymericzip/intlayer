'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';

export type UseCrossPlatformStateProps = {
  postMessage: typeof window.postMessage;
  allowedOrigins?: string[];
};

const { editor } = getConfiguration();

const CommunicatorContext = createContext<UseCrossPlatformStateProps>({
  postMessage: () => null,
  allowedOrigins: [editor.applicationURL, editor.editorURL, editor.cmsURL],
});

export const CommunicatorProvider: FC<
  PropsWithChildren<UseCrossPlatformStateProps>
> = ({ children, ...props }) => (
  <CommunicatorContext value={props}>{children}</CommunicatorContext>
);

export const useCommunicator = () => useContext(CommunicatorContext);
