'use client';

import type { FC } from 'react';
import { useEditedContentActions } from '@intlayer/editor-react';
import type { KeyPath } from '@intlayer/core';

type EditedContentRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  children: string;
  renderChildren?: (children: any) => any;
};

export const useEditedContentRenderer = ({
  dictionaryKey,
  keyPath,
  children,
}: EditedContentRendererProps) => {
  const editedContentContext = useEditedContentActions();

  if (editedContentContext) {
    const editedValue = editedContentContext.getEditedContentValue(
      dictionaryKey,
      keyPath
    ) as string;

    const value = editedValue ?? children;

    return value;
  }

  return children;
};

export const EditedContentRenderer: FC<EditedContentRendererProps> = (
  props
) => {
  const content = useEditedContentRenderer(props);

  return content;
};
