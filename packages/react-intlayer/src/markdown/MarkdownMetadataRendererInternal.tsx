'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import { useEditorLocale } from '@intlayer/editor-react';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { FC, ReactNode } from 'react';
import { useEditedContentRenderer } from '../editor/useEditedContentRenderer';

type MarkdownMetadataRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  metadataKeyPath: KeyPath[];
};

export const MarkdownMetadataRendererInternal: FC<
  MarkdownMetadataRendererProps
> = ({ dictionaryKey, keyPath, children, metadataKeyPath }): ReactNode => {
  const editedContentContext = useEditedContentRenderer({
    dictionaryKey,
    keyPath,
    children,
  });
  const currentLocale = useEditorLocale();

  const metadata = getMarkdownMetadata(editedContentContext);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath,
    currentLocale
  );

  return metadataEl as ReactNode;
};
