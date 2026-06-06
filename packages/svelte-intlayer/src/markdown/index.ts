import { compileMarkdown, type ParsedMarkdown } from './compiler';
import { getMarkdownContext, type RenderMarkdownOptions } from './context';

export {
  compileMarkdown,
  type ParsedMarkdown,
  parseMarkdown,
} from './compiler';
export {
  getMarkdownContext,
  type MarkdownContext,
  type MarkdownProviderOptions,
  type RenderMarkdownOptions,
  setMarkdownContext,
  setMarkdownContext as setIntlayerMarkdown,
} from './context';
export { default as MarkdownMetadataRenderer } from './MarkdownMetadataRenderer.svelte';
export { default as MarkdownProvider } from './MarkdownProvider.svelte';
export { default as MarkdownRenderer } from './MarkdownRenderer.svelte';

export type RenderMarkdownProps = RenderMarkdownOptions;

/**
 * Context-aware render function. Equivalent to `compileMarkdown` when called
 * outside a `<MarkdownProvider>`; delegates to the provider's render function
 * when one is active.
 */
export const renderMarkdown = compileMarkdown;

/**
 * Returns a render function bound to the current `<MarkdownProvider>` context.
 * The returned function forwards its call to whichever `renderMarkdown`
 * implementation was injected by the nearest provider.
 *
 * @param options - Default rendering options applied on every call.
 * @returns A function that accepts markdown content and returns an HTML string.
 *
 * @example
 * ```svelte
 * <script>
 *   const render = useMarkdownRenderer({ forceBlock: true });
 * </script>
 * <div>{@html render(markdownString)}</div>
 * ```
 */
export const useMarkdownRenderer = (options: RenderMarkdownOptions = {}) => {
  const context = getMarkdownContext();
  return (content: string | ParsedMarkdown) =>
    context.renderMarkdown(content, options);
};
