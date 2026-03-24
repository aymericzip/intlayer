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
) => string | Promise<string>;

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
 * Install the Intlayer Markdown provider for your vanilla JS application.
 *
 * @example
 * ```ts
 * import { installIntlayerMarkdown } from 'vanilla-intlayer/markdown';
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
        _componentsOverride,
        _wrapperOverride
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
 * Returns a fallback renderer that compiles with default options if no
 * provider has been installed.
 */
export const useMarkdown = (): IntlayerMarkdownProvider => {
  if (instance) return instance;

  return {
    renderMarkdown: (markdown) => compileMarkdown(markdown),
  };
};

/**
 * Asynchronously install a markdown renderer whose implementation is loaded
 * via a dynamic `import()`.
 *
 * Use this to keep the markdown compiler out of the initial bundle — the
 * loader is only called the first time this function is executed.
 *
 * The returned promise resolves once the provider is ready. Any calls to
 * `useMarkdown()` before the promise resolves will use the fallback
 * (raw-string) renderer.
 *
 * @param loader - A zero-argument async function that resolves to either a
 *   `RenderMarkdownFunction` or an `IntlayerMarkdownPluginOptions` object.
 *
 * @example
 * ```ts
 * // Load a custom markdown renderer (e.g. marked) only when needed
 * await installIntlayerMarkdownDynamic(async () => {
 *   const { marked } = await import('marked');
 *   return (markdown) => marked(markdown) as string;
 * });
 * ```
 */
export const installIntlayerMarkdownDynamic = async (
  loader: () => Promise<IntlayerMarkdownPluginOptions | RenderMarkdownFunction>
): Promise<IntlayerMarkdownProvider> => {
  if (instance) return instance;
  const pluginOptions = await loader();
  return installIntlayerMarkdown(pluginOptions);
};
