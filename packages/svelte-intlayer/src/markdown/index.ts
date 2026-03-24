export { compileMarkdown, type MarkdownCompilerOptions } from './compiler';
export {
  getMarkdownContext,
  type MarkdownContext,
  type RenderMarkdownOptions,
  setMarkdownContext,
  setMarkdownContext as setIntlayerMarkdown,
} from './context';
export { default as MarkdownMetadataRenderer } from './MarkdownMetadataRenderer.svelte';
export { default as MarkdownProvider } from './MarkdownProvider.svelte';
export { default as MarkdownRenderer } from './MarkdownRenderer.svelte';

export type RenderMarkdownProps = RenderMarkdownOptions;

export const renderMarkdown = compileMarkdown;

export const useMarkdownRenderer = (options: RenderMarkdownProps = {}) => {
  const context = getMarkdownContext();
  return (content: string) => context.renderMarkdown(content, options);
};
