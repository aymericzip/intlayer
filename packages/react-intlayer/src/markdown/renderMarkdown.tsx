import type { ReactNode } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

export const renderMarkdown = (markdown: string): ReactNode => (
  <MarkdownRenderer markdown={markdown} />
);
