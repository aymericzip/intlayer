'use client';

import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { FC, ReactNode } from 'react';
import type { HTMLComponents } from '../html/HTMLComponentTypes';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';
import { compiler } from './processor';

type MarkdownRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  options?: MarkdownProviderOptions;
  components?: HTMLComponents<'permissive', {}>;
};

export const MarkdownRendererPlugin: FC<MarkdownRendererPluginProps> = (
  props
): ReactNode => {
  const { children, options, components } = props;
  const context = useMarkdownContext();

  if (context) {
    return context.renderMarkdown(children, options, {
      ...context.components,
      ...components,
    }) as ReactNode;
  }

  return compiler(children, { ...options, components });
};
