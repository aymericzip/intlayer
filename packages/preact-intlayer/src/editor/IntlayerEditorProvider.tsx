import type { ComponentChildren, FunctionComponent } from 'preact';
import { EditorProvider } from './EditorProvider';

export const IntlayerEditorProvider: FunctionComponent<{
  children?: ComponentChildren;
}> = ({ children }) => (
  <EditorProvider mode="client">{children}</EditorProvider>
);
