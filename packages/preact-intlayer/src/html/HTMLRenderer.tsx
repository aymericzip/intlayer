import { getHTML } from '@intlayer/core/interpreter';
import { HTML_TAGS } from '@intlayer/core/transpiler';
import type { KeyPath } from '@intlayer/types';
import { Fragment, type FunctionComponent, h, type JSX } from 'preact';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useHTMLContext } from './HTMLProvider';
import type { HTMLComponents } from './types';

/**
 * Type for Preact HTML tag components.
 */
type HTMLTagComponent = (props: {
  children?: any;
  [key: string]: any;
}) => JSX.Element;

const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) =>
      h(tag as any, props, children);
  }

  return components;
};

export const defaultHTMLComponents = createDefaultHTMLComponents();

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
  { components }: RenderHTMLProps = {}
): JSX.Element => {
  const mergedComponents = {
    ...defaultHTMLComponents,
    ...components,
  };

  // Wrap all components to ensure they are rendered via Preact's h
  const wrappedComponents = Object.fromEntries(
    Object.entries(mergedComponents)
      .filter(([, Component]) => Component)
      .map(([key, Component]) => [
        key,
        (props: any) => h(Component as any, props),
      ])
  );

  return h(Fragment, null, getHTML(content, wrappedComponents));
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
  dictionaryKey,
  keyPath,
}) => {
  const render = useHTMLRenderer({ components: components });
  const content = children || html || '';

  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: dictionaryKey!,
    keyPath: keyPath!,
    children: content,
  });

  const contentToRender =
    dictionaryKey && keyPath && typeof editedContentContext === 'string'
      ? editedContentContext
      : content;

  return render(contentToRender);
};
