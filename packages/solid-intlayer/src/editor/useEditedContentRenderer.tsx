import { getContent } from '@intlayer/core';
import type { KeyPath, Locales } from '@intlayer/types';
import type { Component } from 'solid-js';
import { useEditedContentActions } from './contexts';

type EditedContentRendererProps = {
  dictionaryKey: string;
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

export const EditedContentRenderer: Component<EditedContentRendererProps> = (
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
