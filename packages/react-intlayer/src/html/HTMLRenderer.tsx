'use client';

import { getHTML, HTML_TAGS } from '@intlayer/core';
import { createElement, type FC, Fragment, type JSX } from 'react';
import type { HTMLComponents } from '../utils/HTMLComponentTypes';
import { useHTMLContext } from './HTMLProvider';

const createDefaultHTMLComponents = (): HTMLComponents<'permissive', {}> => {
  const components: HTMLComponents = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) =>
      createElement(tag, props as any, children);
  }

  return components as HTMLComponents<'permissive', {}>;
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

  // Wrap all components to ensure they are rendered via React.createElement
  const wrappedComponents = Object.fromEntries(
    Object.entries(mergedComponents)
      .filter(([, Component]) => Component)
      .map(([key, Component]) => [
        key,
        (props: any) => createElement(Component as any, props),
      ])
  );

  return <Fragment>{getHTML(content, wrappedComponents)}</Fragment>;
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
  children: string;
};

/**
 * React component that renders HTML-like content to JSX.
 *
 * This component uses the components from the `HTMLProvider` context
 * if available.
 */
export const HTMLRenderer: FC<HTMLRendererProps> = ({
  children = '',
  components,
}) => {
  const render = useHTMLRenderer({ components });

  return render(children);
};
