import type { HTMLComponents } from '../html/types';
import { compileMarkdown, type MarkdownCompilerOptions } from './compiler';
import {
  type MarkdownProviderOptions,
  type RenderMarkdownFunction,
  useMarkdown,
} from './installIntlayerMarkdown';

export type RenderMarkdownProps = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: string;
};

/**
 * Renders markdown to an HTML string without using the global provider.
 *
 * @example
 * ```ts
 * import { renderMarkdown } from 'vanilla-intlayer/markdown';
 *
 * document.querySelector('#content').innerHTML = renderMarkdown('# Hello **World**');
 * ```
 */
export const renderMarkdown = (
  content: string,
  {
    forceBlock,
    forceInline,
    preserveFrontmatter,
    tagfilter,
  }: RenderMarkdownProps = {}
): string => {
  const options: MarkdownCompilerOptions = {
    forceBlock,
    forceInline,
    preserveFrontmatter,
    tagfilter,
  };
  return compileMarkdown(content, options);
};

/**
 * Returns a render function that uses the global provider's configuration
 * (installed via `installIntlayerMarkdown`), falling back to `compileMarkdown`.
 */
export const useMarkdownRenderer = (
  props: RenderMarkdownProps = {}
): ((content: string) => string) => {
  const provider = useMarkdown();

  return (content: string) =>
    provider.renderMarkdown(
      content,
      {
        forceBlock: props.forceBlock,
        forceInline: props.forceInline,
        preserveFrontmatter: props.preserveFrontmatter,
        tagfilter: props.tagfilter,
      },
      props.components,
      props.wrapper
    );
};
