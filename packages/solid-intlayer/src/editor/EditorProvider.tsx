import type { Component, ParentProps } from 'solid-js';
import { useEditor } from './useEditor';

export const EditorProvider: Component<ParentProps> = ({ children }) => {
  useEditor();

  return children;
};
