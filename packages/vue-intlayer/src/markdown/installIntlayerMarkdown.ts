import {
  type App,
  type Component,
  inject,
  provide,
  type VNodeChild,
} from 'vue';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';

export const INTLAYER_MARKDOWN_SYMBOL = Symbol('intlayerMarkdown');

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
  wrapper?: Component | string;
};

export type RenderMarkdownFunction = (
  markdown: string,
  options?: MarkdownProviderOptions,
  components?: HTMLComponents<'permissive', {}>,
  wrapper?: Component | string
) => VNodeChild | Promise<VNodeChild>;

/**
 * Singleton instance
 */
let instance: IntlayerMarkdownProvider | null = null;

export type IntlayerMarkdownProvider = {
  components?: HTMLComponents<'permissive', {}>;
  renderMarkdown: RenderMarkdownFunction;
};

/**
 * Refined options for the Markdown plugin.
 */
export type MarkdownPluginOptions = MarkdownProviderOptions;

/**
 * Options for the installIntlayerMarkdown helper.
 */
export type IntlayerMarkdownPluginOptions = MarkdownPluginOptions & {
  /** Component overrides for HTML tags. */
  components?: HTMLComponents<'permissive', {}>;
  /** Wrapper element or component to be used when there are multiple children. */
  wrapper?: Component | string;
  /** Custom render function for markdown. */
  renderMarkdown?: RenderMarkdownFunction;
};

/**
 * Create and return a single IntlayerMarkdownProvider instance
 */
export const createIntlayerMarkdownClient = (
  renderMarkdown: RenderMarkdownFunction,
  components?: HTMLComponents<'permissive', {}>
): IntlayerMarkdownProvider => {
  if (instance) return instance;

  instance = {
    components,
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
      const internalOptions: any = {
        components,
        forceBlock,
        forceInline,
        wrapper,
        forceWrapper: !!wrapper,
        preserveFrontmatter,
        tagfilter,
      };

      renderMarkdown = (
        markdown,
        options,
        componentsOverride,
        wrapperOverride
      ) => {
        return compileMarkdown(markdown, {
          ...internalOptions,
          forceBlock: options?.forceBlock ?? internalOptions.forceBlock,
          forceInline: options?.forceInline ?? internalOptions.forceInline,
          preserveFrontmatter:
            options?.preserveFrontmatter ?? internalOptions.preserveFrontmatter,
          tagfilter: options?.tagfilter ?? internalOptions.tagfilter,
          wrapper: wrapperOverride || internalOptions.wrapper,
          forceWrapper: !!(wrapperOverride || internalOptions.wrapper),
          components: {
            ...internalOptions.components,
            ...(componentsOverride ?? {}),
          },
        }) as any;
      };
    }
  }

  // Wrap renderMarkdown to prevent recursion in custom renderers
  const wrappedRenderMarkdown: RenderMarkdownFunction = (
    markdown,
    options,
    componentsOverride,
    wrapperOverride
  ) => {
    const isCustom =
      typeof pluginOptions === 'function' ||
      (typeof pluginOptions === 'object' && pluginOptions?.renderMarkdown);

    if (isCustom) {
      return {
        setup() {
          provide(INTLAYER_MARKDOWN_SYMBOL, { renderMarkdown: undefined });
          return () =>
            renderMarkdown(
              markdown,
              options,
              componentsOverride,
              wrapperOverride
            );
        },
      } as any;
    }

    return renderMarkdown(
      markdown,
      options,
      componentsOverride,
      wrapperOverride
    );
  };

  const client = createIntlayerMarkdownClient(
    wrappedRenderMarkdown,
    providerComponents
  );

  app.provide(INTLAYER_MARKDOWN_SYMBOL, client);
};

export const useMarkdown = () => {
  const provider = inject<IntlayerMarkdownProvider>(INTLAYER_MARKDOWN_SYMBOL, {
    renderMarkdown: (markdown) => markdown,
  });

  if (!provider) {
    throw new Error('useMarkdown must be used within a MarkdownProvider');
  }

  return provider;
};
