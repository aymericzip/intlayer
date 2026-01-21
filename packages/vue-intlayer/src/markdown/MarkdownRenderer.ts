import type { Overrides } from '@intlayer/core';
import { defineComponent, h, type PropType } from 'vue';
import { compileMarkdown, type MarkdownCompilerOptions } from './compiler';
import {
  type MarkdownPluginOptions,
  useMarkdown,
} from './installIntlayerMarkdown';

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
  },
  setup(props) {
    try {
      const { renderMarkdown } = useMarkdown();
      return () =>
        renderMarkdown(props.content, {
          components: props.components,
          wrapper: props.wrapper,
          options: props.options,
        });
    } catch {
      // Fallback if not wrapped in MarkdownProvider
      return () => {
        const { forceBlock, preserveFrontmatter, tagfilter } = props.options;

        const internalOptions: MarkdownCompilerOptions = {
          components: props.components,
          forceBlock,
          wrapper: props.wrapper,
          forceWrapper: !!props.wrapper,
          preserveFrontmatter,
          tagfilter,
        };

        return compileMarkdown(props.content, internalOptions);
      };
    }
  },
});
