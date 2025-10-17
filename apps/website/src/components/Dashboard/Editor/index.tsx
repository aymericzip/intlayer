'use client';

import type { IntlayerConfig } from '@intlayer/types';
import { type FC, useRef } from 'react';
import { EditorLayout } from './EditorLayout';
import { EditorProvider } from './EditorProvider';
import { IframeController } from './IframeController';

type EditorProps = {
  configuration: IntlayerConfig;
};

export const Editor: FC<EditorProps> = ({ configuration }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <EditorProvider iframeRef={iframeRef} configuration={configuration}>
      <EditorLayout configuration={configuration}>
        <IframeController iframeRef={iframeRef} />
      </EditorLayout>
    </EditorProvider>
  );
};
