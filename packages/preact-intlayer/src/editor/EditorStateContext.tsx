import type { EditorStateManager } from '@intlayer/editor';
import {
  type ComponentChildren,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext } from 'preact/hooks';

const EditorStateContext = createContext<EditorStateManager | null>(null);

export const EditorStateProvider: FunctionComponent<{
  manager: EditorStateManager;
  children?: ComponentChildren;
}> = ({ manager, children }) => (
  <EditorStateContext.Provider value={manager}>
    {children}
  </EditorStateContext.Provider>
);

export const useEditorStateManager = (): EditorStateManager => {
  const ctx = useContext(EditorStateContext);
  if (!ctx)
    throw new Error('useEditorStateManager: no EditorStateProvider found');
  return ctx;
};
