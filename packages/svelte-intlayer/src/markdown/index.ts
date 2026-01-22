export * from './compiler';
export * from './context';
export { default as MarkdownMetadataRenderer } from './MarkdownMetadataRenderer.svelte';
export { default as MarkdownProvider } from './MarkdownProvider.svelte';
export { default as MarkdownRenderer } from './MarkdownRenderer.svelte';
export * from './runtime';

import { compileMarkdown } from './compiler';
import { getMarkdownContext, type RenderMarkdownOptions } from './context';

export type RenderMarkdownProps = RenderMarkdownOptions;

export const renderMarkdown = (
  content: string,
  options: RenderMarkdownProps = {}
) => {
  return compileMarkdown(content, options) as string;
};

export const useMarkdownRenderer = (options: RenderMarkdownProps = {}) => {
  const context = getMarkdownContext();
  return (content: string) => context.renderMarkdown(content, options);
};
