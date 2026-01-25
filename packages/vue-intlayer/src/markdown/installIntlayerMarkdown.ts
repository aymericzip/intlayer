import { type App, inject, provide, type VNodeChild } from 'vue';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';

export const INTLAYER_MARKDOWN_SYMBOL = Symbol('intlayerMarkdown');

export type RenderMarkdownOptions = MarkdownPluginOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
};

export type RenderMarkdownFunction = (
  markdown: string,
  overrides?: HTMLComponents<'permissive', {}> | RenderMarkdownOptions
) => VNodeChild;

/**
 * Singleton instance
 */
let instance: IntlayerMarkdownProvider | null = null;

export type IntlayerMarkdownProvider = {
  renderMarkdown: RenderMarkdownFunction;
};

/**
 * Refined options for the Markdown plugin.
 */
export type MarkdownPluginOptions = {
  /**
   * Forces the compiler to always output content with a block-level wrapper.
   */
  forceBlock?: boolean;
  /**
   * Forces the compiler to always output content with an inline wrapper.
   */
  forceInline?: boolean;
  /**
   * Whether to preserve frontmatter in the markdown content.
   */
  preserveFrontmatter?: boolean;
  /**
   * Whether to use the GitHub Tag Filter.
   */
  tagfilter?: boolean;
};

/**
 * Options for the installIntlayerMarkdown helper.
 */
export type IntlayerMarkdownPluginOptions = MarkdownPluginOptions & {
  /**
   * Component overrides for HTML tags.
   */
  components?: HTMLComponents<'permissive', {}>;
  /**
   * Wrapper element or component to be used when there are multiple children.
   */
  wrapper?: any;
  /**
   * Custom render function for markdown.
   * If provided, it will overwrite all rules and default rendering.
   */
  renderMarkdown?: RenderMarkdownFunction;
};

/**
 * Create and return a single IntlayerMarkdownProvider instance
 */
export const createIntlayerMarkdownClient = (
  renderMarkdown: RenderMarkdownFunction
): IntlayerMarkdownProvider => {
  if (instance) return instance;

  instance = {
    renderMarkdown,
  };

  return instance;
};

/**
 * Helper to install the IntlayerMarkdown provider into the app
 */
export const installIntlayerMarkdown = (
  app: App<any>,
  pluginOptions?: IntlayerMarkdownPluginOptions | RenderMarkdownFunction
) => {
  let renderMarkdown: RenderMarkdownFunction;

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

    if (customRender) {
      renderMarkdown = customRender;
    } else {
      const internalOptions: any = {
        components,
        forceBlock,
        forceInline,
        wrapper,
        forceWrapper: !!wrapper,
        preserveFrontmatter,
        tagfilter,
      };

      renderMarkdown = (markdown, overrides) => {
        const isOptionsObject =
          overrides &&
          (typeof (overrides as RenderMarkdownOptions).components ===
            'object' ||
            typeof (overrides as RenderMarkdownOptions).wrapper ===
              'function' ||
            typeof (overrides as RenderMarkdownOptions).forceBlock ===
              'boolean' ||
            typeof (overrides as RenderMarkdownOptions).forceInline ===
              'boolean' ||
            typeof (overrides as RenderMarkdownOptions).preserveFrontmatter ===
              'boolean' ||
            typeof (overrides as RenderMarkdownOptions).tagfilter ===
              'boolean');

        const {
          components: overrideComponents,
          wrapper: localWrapper,
          forceBlock: localForceBlock,
          forceInline: localForceInline,
          preserveFrontmatter: localPreserveFrontmatter,
          tagfilter: localTagfilter,
          ...componentsFromRest
        } = (overrides ?? {}) as RenderMarkdownOptions;

        const localComponents = (overrideComponents ||
          componentsFromRest) as HTMLComponents<'permissive', {}>;

        return compileMarkdown(markdown, {
          ...internalOptions,
          forceBlock: localForceBlock ?? internalOptions.forceBlock,
          forceInline: localForceInline ?? internalOptions.forceInline,
          preserveFrontmatter:
            localPreserveFrontmatter ?? internalOptions.preserveFrontmatter,
          tagfilter: localTagfilter ?? internalOptions.tagfilter,
          wrapper: localWrapper || internalOptions.wrapper,
          forceWrapper: !!(localWrapper || internalOptions.wrapper),
          components: {
            ...internalOptions.components,
            ...localComponents,
          },
        }) as any;
      };
    }
  }

  // Wrap renderMarkdown to prevent recursion in custom renderers
  const wrappedRenderMarkdown: RenderMarkdownFunction = (
    markdown,
    overrides
  ) => {
    // If we are using the default renderer (internalOptions defined above), we don't need to wrap
    // But detecting if it's the default renderer is hard here as scopes differ.
    // However, the issue only happens if the user provides a CUSTOM render function that uses MarkdownRenderer component.

    // If pluginOptions was a function or had a customRender, we wrap it.
    const isCustom =
      typeof pluginOptions === 'function' ||
      (typeof pluginOptions === 'object' && pluginOptions?.renderMarkdown);

    if (isCustom) {
      // In Vue, we need to provide a new context.
      // Since we return a VNode, we can't easily wrap it in a provider unless we return a Component.
      // But renderMarkdown returns VNodeChild.
      // If we return a component, it works.

      return {
        setup() {
          provide(INTLAYER_MARKDOWN_SYMBOL, { renderMarkdown: undefined });
          return () => renderMarkdown(markdown, overrides);
        },
      } as any;
    }

    return renderMarkdown(markdown, overrides);
  };

  const client = createIntlayerMarkdownClient(wrappedRenderMarkdown);

  app.provide(INTLAYER_MARKDOWN_SYMBOL, client);
};

export const useMarkdown = () => {
  const renderMarkdown = inject<IntlayerMarkdownProvider>(
    INTLAYER_MARKDOWN_SYMBOL,
    {
      renderMarkdown: (markdown) => markdown,
    }
  );

  if (!renderMarkdown) {
    throw new Error('useMarkdown must be used within a MarkdownProvider');
  }

  return renderMarkdown;
};
