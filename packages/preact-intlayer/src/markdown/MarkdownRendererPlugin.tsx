'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useLocale } from '../client/useLocale';
import type { HTMLComponents } from '../html/types';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';

type MarkdownRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  options?: MarkdownProviderOptions;
  components?: HTMLComponents<'permissive', {}>;
};

export const MarkdownRendererPlugin: FunctionComponent<
  MarkdownRendererPluginProps
> = (props): ComponentChildren => {
  const { children, options, components } = props;
  const context = useMarkdownContext();
  const renderMarkdown = context?.renderMarkdown ?? ((md) => md);

  return renderMarkdown(children, options, {
    ...(context?.components ?? {}),
    ...(components ?? {}),
  }) as ComponentChildren;
};

type MarkdownMetadataRendererProps = MarkdownRendererPluginProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: FunctionComponent<
  MarkdownMetadataRendererProps
> = ({ children, metadataKeyPath }): ComponentChildren => {
  const { locale: currentLocale } = useLocale();

  const metadata = getMarkdownMetadata(children);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath,
    currentLocale as any
  );

  return metadataEl as ComponentChildren;
};
