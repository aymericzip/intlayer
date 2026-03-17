import type { Component, ParentProps } from 'solid-js';
import { EditorProvider } from './contexts';

export const IntlayerEditorProvider: Component<ParentProps> = (props) => (
  <EditorProvider mode="client">{props.children}</EditorProvider>
);
