import { getHTML } from '@intlayer/core/interpreter';
import { defineComponent, type PropType, type VNodeChild } from 'vue';
import { useHTML } from './installIntlayerHTML';
import type { HTMLComponents } from './types';

export type RenderHTMLProps = {
  /**
   * Component overrides for HTML tags.
   */
  components?: HTMLComponents<'permissive', {}>;
};

/**
 * Renders HTML-like content to VNodes with the provided components.
 */
export const renderHTML = (
  content: string,
  { components }: RenderHTMLProps = {}
): VNodeChild => {
  return getHTML(content, components as any);
};

/**
 * Hook that returns a function to render HTML content.
 */
export const useHTMLRenderer = ({ components }: RenderHTMLProps = {}) => {
  const context = useHTML();

  return (content: string) => {
    if (context) {
      return context.renderHTML(content, {
        components,
      });
    }

    return renderHTML(content, {
      components,
    });
  };
};

export const HTMLRenderer = defineComponent({
  name: 'HTMLRenderer',
  props: {
    content: {
      type: String,
      required: true,
    },
    components: {
      type: Object as PropType<HTMLComponents<'permissive', {}>>,
      default: undefined,
    },
  },
  setup(props) {
    const render = useHTMLRenderer({ components: props.components });

    return () => render(props.content);
  },
});
