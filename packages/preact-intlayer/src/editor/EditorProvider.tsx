import type { ComponentChild, FunctionComponent } from 'preact';
import { useEditor } from './useEditor';

export const EditorProvider: FunctionComponent<{
  children?: ComponentChild;
}> = ({ children }) => {
  useEditor();

  return children;
};
