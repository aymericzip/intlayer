'use client';

import { EditorProvider, useCrossURLPathState } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren } from 'react';

const IntlayerEditorProviderEnabled: FC = () => {
  useCrossURLPathState(undefined, {
    receive: false,
    emit: true,
  });

  return <></>;
};

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => (
  <EditorProvider
    postMessage={(data) => window.parent?.postMessage(data, '*')}
    allowedOrigins={['*']}
  >
    <IntlayerEditorProviderEnabled />
    {children}
  </EditorProvider>
);
