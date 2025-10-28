'use client';

import type { IntlayerConfig } from '@intlayer/types';
import { type FC, useRef } from 'react';
import { EditorLayout } from './EditorLayout';
import { EditorProvider } from './EditorProvider';
import { IframeController } from './IframeController';

type EditorProps = {
  configuration?: IntlayerConfig;
  DictionariesLoader: FC;
};

export const Editor: FC<EditorProps> = ({
  configuration,
  DictionariesLoader,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <EditorProvider iframeRef={iframeRef} configuration={configuration}>
      <EditorLayout>
        <DictionariesLoader />
        <IframeController iframeRef={iframeRef} />
      </EditorLayout>
    </EditorProvider>
  );
};
