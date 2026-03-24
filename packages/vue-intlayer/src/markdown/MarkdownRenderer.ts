import {
  type Component,
  defineComponent,
  type PropType,
  type VNodeChild,
} from 'vue';
import type { HTMLComponents } from '../html/types';
import type { MarkdownCompilerOptions } from './compiler';
import {
  type MarkdownPluginOptions,
  type RenderMarkdownFunction,
  useMarkdown,
} from './installIntlayerMarkdown';

/**
 * Props for rendering markdown content.
 */
export type RenderMarkdownProps = MarkdownPluginOptions & {
  /** Component overrides for HTML tags. */
  components?: HTMLComponents<'permissive', {}>;
  /** Wrapper element or component to be used when there are multiple children. */
  wrapper?: string | Component;
};

/**
 * Renders markdown content to VNodes with the provided components and options.
 *
 * This function does not use context from MarkdownProvider. Use `useMarkdownRenderer`
 * hook if you want to leverage provider context.
 */
export const renderMarkdown = async (
  content: string,
  {
    components,
    wrapper,
    forceBlock,
    forceInline,
    preserveFrontmatter,
    tagfilter,
  }: RenderMarkdownProps = {}
): Promise<VNodeChild> => {
  const internalOptions: MarkdownCompilerOptions = {
    components,
    forceBlock,
    forceInline,
    wrapper: wrapper as any,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  const { compileMarkdown } = await import('./compiler');

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
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
}: RenderMarkdownProps = {}) => {
  try {
    const {
      renderMarkdown: contextRenderMarkdown,
      components: contextComponents,
    } = useMarkdown();
    return (content: string) => {
      return contextRenderMarkdown(
        content,
        {
          forceBlock,
          forceInline,
          preserveFrontmatter,
          tagfilter,
        },
        {
          ...(contextComponents ?? {}),
          ...(components ?? {}),
        },
        wrapper
      );
    };
  } catch {
    // Fallback if not wrapped in MarkdownProvider
    return (content: string) =>
      renderMarkdown(content, {
        components,
        wrapper,
        forceBlock,
        forceInline,
        preserveFrontmatter,
        tagfilter,
      });
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
      type: Object as PropType<HTMLComponents<'permissive', {}>>,
      default: undefined,
    },
    wrapper: {
      type: [String, Object, Function] as PropType<string | Component>,
      default: undefined,
    },
    forceBlock: {
      type: Boolean,
      default: undefined,
    },
    forceInline: {
      type: Boolean,
      default: undefined,
    },
    preserveFrontmatter: {
      type: Boolean,
      default: undefined,
    },
    tagfilter: {
      type: Boolean,
      default: undefined,
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
        renderMarkdownProp(
          props.content,
          {
            forceBlock: props.forceBlock,
            forceInline: props.forceInline,
            preserveFrontmatter: props.preserveFrontmatter,
            tagfilter: props.tagfilter,
          },
          props.components,
          props.wrapper
        );
    }

    try {
      const render = useMarkdownRenderer({
        components: props.components,
        wrapper: props.wrapper,
        forceBlock: props.forceBlock,
        forceInline: props.forceInline,
        preserveFrontmatter: props.preserveFrontmatter,
        tagfilter: props.tagfilter,
      });

      return () => render(props.content);
    } catch {
      // Should be handled by useMarkdownRenderer catch block but just in case
      return () =>
        renderMarkdown(props.content, {
          components: props.components,
          wrapper: props.wrapper,
          forceBlock: props.forceBlock,
          forceInline: props.forceInline,
          preserveFrontmatter: props.preserveFrontmatter,
          tagfilter: props.tagfilter,
        });
    }
  },
});
