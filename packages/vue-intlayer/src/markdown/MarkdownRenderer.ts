import type { Overrides } from '@intlayer/core';
import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { compileMarkdown, type MarkdownCompilerOptions } from './compiler';
import {
  type MarkdownPluginOptions,
  type RenderMarkdownFunction,
  useMarkdown,
} from './installIntlayerMarkdown';

/**
 * Props for rendering markdown content.
 */
export type RenderMarkdownProps = {
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
};

/**
 * Renders markdown content to VNodes with the provided components and options.
 *
 * This function does not use context from MarkdownProvider. Use `useMarkdownRenderer`
 * hook if you want to leverage provider context.
 */
export const renderMarkdown = (
  content: string,
  { components, wrapper, options = {} }: RenderMarkdownProps = {}
): VNodeChild => {
  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  const internalOptions: MarkdownCompilerOptions = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  return compileMarkdown(content, internalOptions) as VNodeChild;
};

/**
 * Hook that returns a function to render markdown content.
 *
 * This hook considers the configuration from the `MarkdownProvider` context if available,
 * falling back to the provided props or default behavior.
 */
export const useMarkdownRenderer = ({
  components,
  wrapper,
  options = {},
}: RenderMarkdownProps = {}) => {
  try {
    const { renderMarkdown } = useMarkdown();
    return (content: string) => {
      // If context is available, use it
      return renderMarkdown(content, { components, wrapper, options });
    };
  } catch {
    // Fallback if not wrapped in MarkdownProvider
    return (content: string) =>
      renderMarkdown(content, { components, wrapper, options });
  }
};

export type MarkdownRendererProps = RenderMarkdownProps & {
  content?: string;
  renderMarkdown?: RenderMarkdownFunction;
};

export const MarkdownRenderer = defineComponent({
  name: 'Markdown',
  props: {
    content: {
      type: String,
      default: '',
    },
    components: {
      type: Object as PropType<Overrides>,
      default: undefined,
    },
    wrapper: {
      type: [String, Object, Function] as PropType<any>,
      default: undefined,
    },
    options: {
      type: Object as PropType<MarkdownPluginOptions>,
      default: () => ({}),
    },
    renderMarkdown: {
      type: Function as PropType<RenderMarkdownFunction>,
      default: undefined,
    },
  },
  setup(props) {
    const { renderMarkdown: renderMarkdownProp } = props;

    if (renderMarkdownProp) {
      return () =>
        renderMarkdownProp(props.content, {
          components: props.components,
          wrapper: props.wrapper,
          options: props.options,
        });
    }

    try {
      const render = useMarkdownRenderer({
        components: props.components,
        wrapper: props.wrapper,
        options: props.options,
      });

      return () => render(props.content);
    } catch {
      // Should be handled by useMarkdownRenderer catch block but just in case
      return () =>
        renderMarkdown(props.content, {
          components: props.components,
          wrapper: props.wrapper,
          options: props.options,
        });
    }
  },
});
