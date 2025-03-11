'use client';

import type { FC, PropsWithChildren } from 'react';
import { MarkdownProvider } from 'next-intlayer';
import Markdown from 'markdown-to-jsx';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    {children}
  </MarkdownProvider>
);
