'use client';

import { getHTML } from '@intlayer/core/interpreter';
import type { Locale } from '@intlayer/types/allLocales';
import type { KeyPath } from '@intlayer/types/keyPath';
import { createElement, type FC, type ReactNode } from 'react';
import { useHTMLContext } from './HTMLProvider';
import { defaultHTMLComponents } from './HTMLRenderer';
import type { ReactComponentProps } from './types';

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
  const { html, userComponents } = props;
  const context = useHTMLContext();
  const globalComponents = context?.components || {};

  const mergedComponents = {
    ...defaultHTMLComponents,
    ...globalComponents,
    ...userComponents,
  };

  // Wrap all components to ensure they are rendered via React.createElement
  // This is important because it allows React to handle the component's lifecycle,
  // hooks, and Babel-injected variables correctly.
  const wrappedComponents = Object.fromEntries(
    Object.entries(mergedComponents)
      .filter(([, Component]) => Component)
      .map(([key, Component]) => [
        key,
        (props: ReactComponentProps) => createElement(Component, props),
      ])
  );

  return getHTML(html, wrappedComponents);
};
