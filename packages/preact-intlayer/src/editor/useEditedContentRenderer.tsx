'use client';

import type { Locales } from '@intlayer/config/client';
import { type Dictionary, getContent, type KeyPath } from '@intlayer/core';
import type { FC } from 'preact/compat';
import { useEditedContentActions } from './EditedContentContext';

type EditedContentRendererProps = {
  dictionaryKey: Dictionary['key'];
  keyPath: KeyPath[];
  children: string;
  locale?: Locales;
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

  if (typeof content === 'object') {
    const transformedEditedContent = getContent(content, props, props.locale);

    if (typeof transformedEditedContent !== 'string') {
      console.error(
        `Incorrect edited content format. Content type: ${typeof transformedEditedContent}. Expected string. Value ${JSON.stringify(transformedEditedContent)}`
      );

      return props.children;
    }

    return transformedEditedContent;
  }

  return content;
};
