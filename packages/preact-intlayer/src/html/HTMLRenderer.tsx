import { getHTML, HTML_TAGS } from '@intlayer/core';
import type { KeyPath } from '@intlayer/types';
import { h, type VNode } from 'preact';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useHTMLContext } from './HTMLProvider';

type HTMLTagComponent = (props: {
  children?: any;
  [key: string]: any;
}) => VNode;

const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) =>
      h(tag as any, props, children);
  }

  return components;
};

export const defaultHTMLComponents = createDefaultHTMLComponents();

type HTMLRendererProps = {
  dictionaryKey?: string;
  keyPath?: KeyPath[];
  html: string;
  userComponents?: Record<string, any>;
};

export const HTMLRenderer = ({
  dictionaryKey,
  keyPath,
  html,
  userComponents,
}: HTMLRendererProps): VNode => {
  const context = useHTMLContext();
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: dictionaryKey!,
    keyPath: keyPath!,
    children: html,
  });

  const contentToRender =
    dictionaryKey && keyPath && typeof editedContentContext === 'string'
      ? editedContentContext
      : html;

  const mergedComponents = {
    ...defaultHTMLComponents,
    ...context?.components,
    ...userComponents,
  };

  // Wrap all components to ensure they are rendered via Preact's h
  const wrappedComponents = Object.fromEntries(
    Object.entries(mergedComponents).map(([key, Component]) => [
      key,
      (props: any) => h(Component as any, props),
    ])
  );

  return getHTML(contentToRender, wrappedComponents);
};
