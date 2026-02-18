import { getHTML } from '@intlayer/core/interpreter';
import { HTML_TAGS } from '@intlayer/core/transpiler';
import type { KeyPath } from '@intlayer/types';
import {
  type Component,
  createMemo,
  type JSX,
  type ValidComponent,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useHTMLContext } from './HTMLProvider';
import type { HTMLComponents } from './types';

type HTMLTagComponent = (props: {
  children?: JSX.Element;
  [key: string]: any;
}) => JSX.Element;

const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) => (
      <Dynamic component={tag as ValidComponent} {...props}>
        {children}
      </Dynamic>
    );
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

  return getHTML(content, mergedComponents);
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
  userComponents?: HTMLComponents<'permissive', {}>;
  dictionaryKey?: string;
  keyPath?: KeyPath[];
};

/**
 * Solid component that renders HTML-like content to JSX.
 */
export const HTMLRenderer: Component<HTMLRendererProps> = (props) => {
  const render = useHTMLRenderer({
    components: props.components || props.userComponents,
  });
  const content = () => props.children || props.html || '';

  const editedContentContext = createMemo(() =>
    useEditedContentRenderer({
      dictionaryKey: props.dictionaryKey!,
      keyPath: props.keyPath!,
      children: content(),
    })
  );

  const contentToRender = () =>
    props.dictionaryKey &&
    props.keyPath &&
    typeof editedContentContext() === 'string'
      ? (editedContentContext() as string)
      : content();

  return <>{render(contentToRender())}</>;
};
