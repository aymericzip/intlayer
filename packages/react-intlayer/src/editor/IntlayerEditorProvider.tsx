'use client';

import { EditorProvider } from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';

/**
 * Wraps the application with the Intlayer editor provider in client mode.
 * All configuration (URLs, origins) is read from @intlayer/config/built.
 */
export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => (
  <EditorProvider mode="client">{children}</EditorProvider>
);
