import { isSameKeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { ContentEditor } from '../../ContentEditor';
import { Container } from '../ItemLayout';
import type { NodeWrapperProps } from './index';

interface StringWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: string;
}

export const StringWrapper: FC<StringWrapperProps> = (props) => {
  const {
    keyPath,
    section,
    editedContent,
    onContentChange,
    onFocusKeyPath,
    focusedKeyPath = [],
  } = props;

  const editedContentValue = editedContent?.find((content) =>
    isSameKeyPath(content.keyPath, focusedKeyPath)
  )?.newValue;

  return (
    <Container
      $level={keyPath.length}
      onClick={(e) => {
        e.stopPropagation();
        onFocusKeyPath(keyPath);
      }}
    >
      <ContentEditor
        onContentChange={(newValue) => onContentChange({ keyPath, newValue })}
        isEditing={true}
      >
        {editedContentValue ?? section}
      </ContentEditor>
    </Container>
  );
};
