import {
  type Component,
  defineComponent,
  type PropType,
  type VNodeChild,
} from 'vue';
import type { HTMLComponents } from '../html/types';
import type { MarkdownCompilerOptions, ParsedMarkdown } from './compiler';
import {
  type MarkdownPluginOptions,
  type RenderMarkdownFunction,
  useMarkdown,
} from './installIntlayerMarkdown';

/**
 * Props for rendering markdown content.
 *
 * @example
 * ```tsx
 * const props: RenderMarkdownProps = {
 *   components: {
 *     h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
 *     p: ({ children }) => <p className="text-gray-700">{children}</p>,
 *   },
 *   wrapper: ({ children }) => <article>{children}</article>,
 *   options: {
 *     forceBlock: true,
 *     preserveFrontmatter: false,
 *     tagfilter: true,
 *   },
 * };
 * ```
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
 *
 * @param content - The markdown string to render
 * @param props - Configuration options for rendering
 * @param props.components - Component overrides for HTML tags
 * @param props.wrapper - Wrapper component for multiple children
 * @returns Vue VNodes representing the rendered markdown
 *
 * @example
 * ```ts
 * import { renderMarkdown } from 'vue-intlayer/markdown';
 *
 * const markdown = '# Hello World\n\nThis is **bold** text.';
 * const vnodes = await renderMarkdown(markdown, {
 *   components: {
 *     h1: ({ children }) => h('h1', { class: 'title' }, children),
 *   },
 *   forceBlock: true,
 * });
 * ```
 */
export const renderMarkdown = async (
  content: string | ParsedMarkdown,
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
 *
 * @param props - Optional configuration that will override context values
 * @param props.components - Component overrides for HTML tags (overrides context)
 * @param props.wrapper - Wrapper component (overrides context)
 * @returns A function that takes markdown content and returns VNodes
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMarkdownRenderer } from 'vue-intlayer/markdown';
 *
 * const renderMarkdown = useMarkdownRenderer({
 *   components: {
 *     h1: (props) => h('h1', { class: 'custom' }, props.children),
 *   },
 * });
 * </script>
 *
 * <template>
 *   <component :is="renderMarkdown('# Hello\n\nThis is **markdown**')" />
 * </template>
 * ```
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
    return (content: string | ParsedMarkdown) => {
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
    return (content: string | ParsedMarkdown) =>
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

/**
 * Props for the MarkdownRenderer component.
 *
 * @example
 * ```vue
 * <script setup>
 * const props = {
 *   content: '# Hello World\n\nThis is **bold** text.',
 *   components: {
 *     h1: (props) => h('h1', { class: 'title' }, props.children),
 *   },
 *   forceBlock: true,
 * };
 * </script>
 * ```
 */
export type MarkdownRendererProps = RenderMarkdownProps & {
  /**
   * The markdown content to render as a string.
   */
  content?: string | ParsedMarkdown;
  /**
   * Custom render function for markdown.
   * If provided, it will overwrite context and default rendering.
   */
  renderMarkdown?: RenderMarkdownFunction;
};

/**
 * Vue component that renders markdown content to VNodes.
 *
 * This component uses the `renderMarkdown` function from the `intlayerMarkdown` plugin
 * if available. Otherwise, it falls back to the default compiler with provided components
 * and options. You can also provide a custom `renderMarkdown` function prop to override
 * all rendering behavior.
 *
 * @example
 * ```vue
 * <script setup>
 * import { MarkdownRenderer } from 'vue-intlayer/markdown';
 * </script>
 *
 * <template>
 *   <MarkdownRenderer
 *     content="# Hello World"
 *     :forceBlock="true"
 *   />
 * </template>
 * ```
 */
export const MarkdownRenderer = defineComponent({
  name: 'Markdown',
  props: {
    content: {
      type: [String, Object] as PropType<string | ParsedMarkdown>,
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
