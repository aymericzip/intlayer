import type { FC, PropsWithChildren } from 'react';
import { useEditor } from './useEditor';

export const EditorProvider: FC<PropsWithChildren> = ({ children }) => {
  useEditor();

  return children;
};
