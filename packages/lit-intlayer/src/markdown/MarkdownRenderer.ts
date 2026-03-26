import { html, LitElement, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
 * Pass the result to `unsafeHTML()` in a Lit template.
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
    ) as string;
};

/**
 * `<intlayer-markdown-renderer>` — renders a markdown string as HTML.
 *
 * Renders into the light DOM (no shadow root) so that the host page's CSS
 * can style the generated markup.
 *
 * Uses the globally installed markdown renderer when available
 * (see `installIntlayerMarkdown`), or falls back to the default compiler.
 *
 * @example
 * ```html
 * <intlayer-markdown-renderer content="# Hello **World**">
 * </intlayer-markdown-renderer>
 * ```
 *
 * @example
 * ```ts
 * import { html } from 'lit';
 * import 'lit-intlayer/markdown'; // registers the element
 *
 * html`<intlayer-markdown-renderer .content=${myMarkdown}></intlayer-markdown-renderer>`
 * ```
 */
export class MarkdownRenderer extends LitElement {
  static override properties = {
    content: { type: String },
    forceBlock: { type: Boolean },
    forceInline: { type: Boolean },
    preserveFrontmatter: { type: Boolean },
    tagfilter: { type: Boolean },
    renderMarkdown: { attribute: false },
  };

  /** The markdown string to compile and render. */
  content = '';
  forceBlock?: boolean;
  forceInline?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
  /** Optional custom render function — overrides the global provider. */
  renderMarkdownFn?: RenderMarkdownFunction;

  /** Render into light DOM so host-page CSS can style the output. */
  override createRenderRoot() {
    return this;
  }

  override render() {
    if (!this.content) return nothing;

    let compiled: string;

    if (this.renderMarkdownFn) {
      compiled = this.renderMarkdownFn(
        this.content,
        {
          forceBlock: this.forceBlock,
          forceInline: this.forceInline,
          preserveFrontmatter: this.preserveFrontmatter,
          tagfilter: this.tagfilter,
        },
        undefined,
        undefined
      ) as string;
    } else {
      const renderer = useMarkdownRenderer({
        forceBlock: this.forceBlock,
        forceInline: this.forceInline,
        preserveFrontmatter: this.preserveFrontmatter,
        tagfilter: this.tagfilter,
      });
      compiled = renderer(this.content);
    }

    return html`${unsafeHTML(compiled)}`;
  }
}

if (!customElements.get('intlayer-markdown-renderer')) {
  customElements.define('intlayer-markdown-renderer', MarkdownRenderer);
}

declare global {
  interface HTMLElementTagNameMap {
    'intlayer-markdown-renderer': MarkdownRenderer;
  }
}
