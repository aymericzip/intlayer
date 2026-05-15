'use client';

import { MarkdownProvider } from 'next-intlayer/markdown';
import type { FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider
    components={{
      p: (props) => <span className="hello" {...props} />,
    }}
  >
    {children}
  </MarkdownProvider>
);
