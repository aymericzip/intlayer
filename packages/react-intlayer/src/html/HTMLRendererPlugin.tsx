'use client';

import { getHTML, HTML_TAGS } from '@intlayer/core';
import type { KeyPath, Locale } from '@intlayer/types';
import { createElement, type FC, type ReactNode } from 'react';
import { ContentSelectorRenderer } from '../editor';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
import { useHTMLContext } from './HTMLProvider';

type HTMLTagComponent = (props: {
  children?: ReactNode;
  [key: string]: any;
}) => ReactNode;

const createDefaultHTMLComponents = (): Record<string, HTMLTagComponent> => {
  const components: Record<string, HTMLTagComponent> = {};

  for (const tag of HTML_TAGS) {
    components[tag] = ({ children, ...props }) =>
      createElement(tag, props, children);
  }

  return components;
};

export const defaultHTMLComponents = createDefaultHTMLComponents();

type HTMLRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  html: string;
  locale?: Locale;
  userComponents?: Record<string, any>;
};

export const HTMLRendererPlugin: FC<HTMLRendererPluginProps> = (
  props
): ReactNode => {
  const { dictionaryKey, keyPath, html, userComponents } = props;
  const context = useHTMLContext();
  const globalComponents = context?.components || {};

  const editedContentContext = useEditedContentRenderer({
    dictionaryKey: dictionaryKey ?? '',
    keyPath: keyPath ?? [],
    children: html,
  });

  const contentToRender =
    typeof editedContentContext === 'string' ? editedContentContext : html;

  const mergedComponents = {
    ...defaultHTMLComponents,
    ...globalComponents,
    ...userComponents,
  };

  // Wrap all components to ensure they are rendered via React.createElement
  // This is important because it allows React to handle the component's lifecycle,
  // hooks, and Babel-injected variables correctly.
  const wrappedComponents = Object.fromEntries(
    Object.entries(mergedComponents).map(([key, Component]) => [
      key,
      (props: any) => createElement(Component, props),
    ])
  );

  return (
    <ContentSelectorRenderer {...props}>
      {getHTML(contentToRender, wrappedComponents)}
    </ContentSelectorRenderer>
  );
};
