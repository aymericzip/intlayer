import { FC, PropsWithChildren } from 'react';
import { getConfiguration } from '@intlayer/config/client';
import { EditorProvider } from '@intlayer/editor-react';

const {
  editor: { enabled },
} = getConfiguration();

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  if (enabled) {
    return <EditorProvider targetWindow={window}>{children}</EditorProvider>;
  }

  return children;
};
