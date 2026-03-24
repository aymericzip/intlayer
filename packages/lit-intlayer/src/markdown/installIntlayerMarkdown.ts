import type { HTMLComponents } from '../html/types';
import { compileMarkdown, type MarkdownCompilerOptions } from './compiler';

export type MarkdownProviderOptions = {
  /** Forces the compiler to always output content with a block-level wrapper. */
  forceBlock?: boolean;
  /** Forces the compiler to always output content with an inline wrapper. */
  forceInline?: boolean;
  /** Whether to preserve frontmatter in the markdown content. */
  preserveFrontmatter?: boolean;
  /** Whether to use the GitHub Tag Filter. */
  tagfilter?: boolean;
};

export type RenderMarkdownOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: string;
};

export type RenderMarkdownFunction = (
  markdown: string,
  options?: MarkdownProviderOptions,
  components?: HTMLComponents<'permissive', {}>,
  wrapper?: string
) => string;

/**
 * Singleton instance
 */
let instance: IntlayerMarkdownProvider | null = null;

export type IntlayerMarkdownProvider = {
  components?: HTMLComponents<'permissive', {}>;
  renderMarkdown: RenderMarkdownFunction;
};

export type IntlayerMarkdownPluginOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: string;
  renderMarkdown?: RenderMarkdownFunction;
};

/**
 * Create and return a single IntlayerMarkdownProvider instance.
 */
export const createIntlayerMarkdownClient = (
  renderMarkdown: RenderMarkdownFunction,
  components?: HTMLComponents<'permissive', {}>
): IntlayerMarkdownProvider => {
  if (instance) return instance;

  instance = { components, renderMarkdown };
  return instance;
};

/**
 * Install the Intlayer Markdown provider for your Lit application.
 *
 * Call once at startup, before any elements that render markdown are connected.
 * The installed renderer is used by `<intlayer-markdown-renderer>` and
 * `useMarkdownRenderer()`.
 *
 * @example
 * ```ts
 * import { installIntlayerMarkdown } from 'lit-intlayer/markdown';
 *
 * installIntlayerMarkdown({ forceBlock: true });
 * ```
 */
export const installIntlayerMarkdown = (
  pluginOptions?: IntlayerMarkdownPluginOptions | RenderMarkdownFunction
): IntlayerMarkdownProvider => {
  let renderMarkdown: RenderMarkdownFunction;
  let providerComponents: HTMLComponents<'permissive', {}> | undefined;

  if (typeof pluginOptions === 'function') {
    renderMarkdown = pluginOptions;
  } else {
    const {
      components,
      wrapper,
      forceBlock,
      forceInline,
      preserveFrontmatter,
      tagfilter,
      renderMarkdown: customRender,
    } = pluginOptions ?? {};

    providerComponents = components;

    if (customRender) {
      renderMarkdown = customRender;
    } else {
      const internalOptions: MarkdownCompilerOptions = {
        forceBlock,
        forceInline,
        preserveFrontmatter,
        tagfilter,
      };

      renderMarkdown = (
        markdown,
        options,
        componentsOverride,
        wrapperOverride
      ) =>
        compileMarkdown(markdown, {
          ...internalOptions,
          forceBlock: options?.forceBlock ?? internalOptions.forceBlock,
          forceInline: options?.forceInline ?? internalOptions.forceInline,
          preserveFrontmatter:
            options?.preserveFrontmatter ?? internalOptions.preserveFrontmatter,
          tagfilter: options?.tagfilter ?? internalOptions.tagfilter,
        });
    }
  }

  return createIntlayerMarkdownClient(renderMarkdown, providerComponents);
};

/**
 * Access the installed IntlayerMarkdownProvider.
 * Returns a fallback renderer that outputs the raw markdown string if no
 * provider has been installed.
 */
export const useMarkdown = (): IntlayerMarkdownProvider => {
  if (instance) return instance;

  // Fallback: compile with default options
  return {
    renderMarkdown: (markdown) => compileMarkdown(markdown),
  };
};
