import { type IntlayerNode, rendererIntlayerNode } from '../IntlayerNode';
import { MarkdownRenderer } from './MarkdownRenderer';

export const renderMarkdown = (markdown: string): IntlayerNode =>
  rendererIntlayerNode({
    value: markdown,
    children: <MarkdownRenderer markdown={markdown} />,
  });
