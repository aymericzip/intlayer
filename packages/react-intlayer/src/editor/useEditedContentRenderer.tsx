'use client';

import type { Locales } from '@intlayer/config/client';
import { getContent, type KeyPath } from '@intlayer/core';
import { useEditedContentActions } from '@intlayer/editor-react';
import type { FC } from 'react';
import { ContentSelectorRenderer } from './ContentSelectorWrapper';

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

      return (
        <ContentSelectorRenderer {...props} key={props.children}>
          {props.children}
        </ContentSelectorRenderer>
      );
    }

    return (
      <ContentSelectorRenderer {...props} key={props.children}>
        {transformedEditedContent}
      </ContentSelectorRenderer>
    );
  }

  return (
    <ContentSelectorRenderer {...props} key={props.children}>
      {content}
    </ContentSelectorRenderer>
  );
};
