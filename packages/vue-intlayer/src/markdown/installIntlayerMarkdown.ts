import type { Overrides } from '@intlayer/core';
import { type App, inject, provide, type VNodeChild } from 'vue';
import { compileMarkdown } from './compiler';

export const INTLAYER_MARKDOWN_SYMBOL = Symbol('intlayerMarkdown');

export type RenderMarkdownOptions = {
  components?: Overrides;
  wrapper?: any;
  options?: MarkdownPluginOptions;
};

export type RenderMarkdownFunction = (
  markdown: string,
  overrides?: Overrides | RenderMarkdownOptions
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
export type IntlayerMarkdownPluginOptions = {
  /**
   * Component overrides for HTML tags.
   */
  components?: Overrides;
  /**
   * Wrapper element or component to be used when there are multiple children.
   */
  wrapper?: any;
  /**
   * Markdown processor options.
   */
  options?: MarkdownPluginOptions;
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
      options = {},
      renderMarkdown: customRender,
    } = pluginOptions ?? {};

    if (customRender) {
      renderMarkdown = customRender;
    } else {
      const { forceBlock, preserveFrontmatter, tagfilter } = options;

      const internalOptions: any = {
        components,
        forceBlock,
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
            typeof (overrides as RenderMarkdownOptions).options === 'object');

        const localComponents = isOptionsObject
          ? (overrides as RenderMarkdownOptions).components
          : (overrides as Overrides);
        const localWrapper = isOptionsObject
          ? (overrides as RenderMarkdownOptions).wrapper
          : undefined;
        const localOptions = isOptionsObject
          ? (overrides as RenderMarkdownOptions).options
          : {};

        const mergedOptions = {
          ...options,
          ...localOptions,
        };

        return compileMarkdown(markdown, {
          ...internalOptions,
          ...mergedOptions,
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
