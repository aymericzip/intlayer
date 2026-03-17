'use client';

import type { EditorStateManager } from '@intlayer/editor';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'react';

const EditorStateContext = createContext<EditorStateManager | null>(null);

export const EditorStateProvider: FC<
  PropsWithChildren<{ manager: EditorStateManager }>
> = ({ children, manager }) => (
  <EditorStateContext.Provider value={manager}>
    {children}
  </EditorStateContext.Provider>
);

export const useEditorStateManager = (): EditorStateManager => {
  const ctx = useContext(EditorStateContext);
  if (!ctx) {
    throw new Error(
      'useEditorStateManager must be used within an EditorProvider'
    );
  }
  return ctx;
};
