'use client';

import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { FC, ReactNode } from 'react';
import { useEditedContentSource } from '../editor/useEditedContentSource';
import type { HTMLComponents } from '../html/HTMLComponentTypes';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';
import { compileMarkdown } from './processor';

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
  const { dictionaryKey, keyPath, options, components } = props;
  const context = useMarkdownContext();
  // Live preview of the source edited in the visual editor
  const editedSource = useEditedContentSource(dictionaryKey, keyPath);
  const children = editedSource ?? props.children;

  if (context) {
    return context.renderMarkdown(children, options, {
      ...context.components,
      ...components,
    }) as ReactNode;
  }

  return compileMarkdown(children, { ...options, components });
};
