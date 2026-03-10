import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useLocale } from '../client/useLocale';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';
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
  const { dictionaryKey, keyPath, children, options, components } = props;
  const context = useMarkdownContext();
  const renderMarkdown = context?.renderMarkdown ?? ((md) => md);
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });

  const contentToRender =
    typeof editedContentContext === 'string' ? editedContentContext : children;

  return renderMarkdown(contentToRender, options, {
    ...(context?.components ?? {}),
    ...(components ?? {}),
  }) as ComponentChildren;
};

type MarkdownMetadataRendererProps = MarkdownRendererPluginProps & {
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRenderer: FunctionComponent<
  MarkdownMetadataRendererProps
> = ({
  dictionaryKey,
  keyPath,
  children,
  metadataKeyPath,
}): ComponentChildren => {
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });
  const { locale: currentLocale } = useLocale();

  const metadata = getMarkdownMetadata(editedContentContext as string);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath,
    currentLocale as any
  );

  return metadataEl as ComponentChildren;
};
