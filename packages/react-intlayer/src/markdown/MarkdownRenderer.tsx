'use client';

import { FC } from 'react';
import { useMarkdownContext } from './MarkdownProvider';
import { IntlayerNode, rendererIntlayerNode } from '../IntlayerNode';

export const MarkdownRenderer: FC<{ markdown: string }> = ({
  markdown,
}): IntlayerNode => {
  const { renderMarkdown } = useMarkdownContext();

  return rendererIntlayerNode({
    value: markdown,
    children: renderMarkdown(markdown),
  });
};
