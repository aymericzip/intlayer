'use client';

import type { FC } from 'react';
import { type IntlayerNode, rendererIntlayerNode } from '../IntlayerNode';
import { useMarkdownContext } from './MarkdownProvider';

export const MarkdownRenderer: FC<{ markdown: string }> = ({
  markdown,
}): IntlayerNode => {
  const { renderMarkdown } = useMarkdownContext();

  return rendererIntlayerNode({
    value: markdown,
    children: renderMarkdown(markdown),
  });
};
