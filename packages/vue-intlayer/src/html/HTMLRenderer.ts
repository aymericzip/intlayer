import { getHTML } from '@intlayer/core/interpreter';
import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
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
  { components = {} }: RenderHTMLProps = {}
): VNodeChild => {
  // Wrap explicit user components to ensure they are rendered via Vue's h
  const userComponents = Object.fromEntries(
    Object.entries(components)
      .filter(([, Component]) => Component)
      .map(([key, Component]) => [
        key,
        (props: any) => h(Component as any, props, props?.children),
      ])
  );

  // Proxy handles standard HTML tags lazily without a hardcoded list
  const wrappedComponents = new Proxy(userComponents, {
    get(target, prop) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop];
      }
      // Fallback: Lazily generate a wrapper for standard lowercase HTML tags
      if (typeof prop === 'string' && /^[a-z][a-z0-9]*$/.test(prop)) {
        return (props: any) => h(prop, props, props?.children);
      }
      return undefined;
    },
  });

  return getHTML(content, wrappedComponents as any);
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
