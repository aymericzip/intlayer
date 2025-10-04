'use client';

import Markdown from 'markdown-to-jsx';
import { MarkdownProvider } from 'next-intlayer';
import type { FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    {children}
  </MarkdownProvider>
);
