import { getHTML } from '@intlayer/core/interpreter';
import type { KeyPath } from '@intlayer/types/keyPath';
import { Fragment, type FunctionComponent, h, type JSX } from 'preact';
import { useHTMLContext } from './HTMLProvider';
import type { HTMLComponents } from './types';

export type RenderHTMLProps = {
  /**
   * Component overrides for HTML tags.
   * Allows you to customize how specific HTML elements are rendered.
   */
  components?: HTMLComponents<'permissive', {}>;
};

/**
 * Renders HTML-like content to JSX with the provided components.
 *
 * This function does not use context from HTMLProvider. Use `useHTMLRenderer`
 * hook if you want to leverage provider context.
 */
export const renderHTML = (
  content: string,
  { components = {} }: RenderHTMLProps = {}
): JSX.Element => {
  // Wrap explicit user components to ensure they are rendered via Preact's h
  const userComponents = Object.fromEntries(
    Object.entries(components)
      .filter(([, Component]) => Component)
      .map(([key, Component]) => [
        key,
        (props: any) => h(Component as any, props),
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
        return (props: any) => h(prop, props);
      }
      return undefined;
    },
  });

  // Cast wrappedComponents to any to satisfy getHTML's dictionary typing
  return h(Fragment, null, getHTML(content, wrappedComponents as any));
};

/**
 * Hook that returns a function to render HTML content.
 *
 * This hook considers the configuration from the `HTMLProvider` context if available,
 * falling back to the provided components.
 */
export const useHTMLRenderer = ({ components }: RenderHTMLProps = {}) => {
  const context = useHTMLContext();

  return (content: string) => {
    return renderHTML(content, {
      components: {
        ...context?.components,
        ...components,
      },
    });
  };
};

export type HTMLRendererProps = RenderHTMLProps & {
  /**
   * The HTML content to render as a string.
   */
  children?: string;
  /**
   * Alias for children, used by the plugin.
   */
  html?: string;
  /**
   * Alias for components, used by the plugin.
   */
  components?: HTMLComponents<'permissive', {}>;
  dictionaryKey?: string;
  keyPath?: KeyPath[];
};

/**
 * Preact component that renders HTML-like content to JSX.
 */
export const HTMLRenderer: FunctionComponent<HTMLRendererProps> = ({
  children = '',
  html,
  components,
}) => {
  const render = useHTMLRenderer({ components });
  const content = children || html || '';

  return render(content);
};
