'use client';

import { MarkdownProvider } from 'next-intlayer';
import type { FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider
    renderMarkdown={async (md) => {
      const { compileMarkdown } = await import('next-intlayer/markdown');
      return compileMarkdown(md);
    }}
  >
    {children}
  </MarkdownProvider>
);
