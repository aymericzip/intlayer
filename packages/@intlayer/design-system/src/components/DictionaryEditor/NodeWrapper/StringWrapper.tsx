import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { ContentEditor } from '../../ContentEditor';
import type { FieldContent } from '../../DictionaryFieldEditor';
import { StyledContainer } from '../ItemLayout';
import type { NodeWrapperProps } from './index';

interface StringWrapperProps extends Omit<NodeWrapperProps, 'section'> {
  section: string;
}

export const getEditedContentValue = (
  editedContent: FieldContent[] | undefined,
  keyPath: KeyPath[]
): string | undefined => {
  const result = editedContent?.find((content) =>
    isSameKeyPath(content.keyPath, keyPath)
  );

  return result?.newValue;
};

export const StringWrapper: FC<StringWrapperProps> = (props) => {
  const {
    keyPath,
    section,
    editedContent,
    onContentChange,
    onFocusKeyPath,
    focusedKeyPath = [],
  } = props;

  const editedContentValue = getEditedContentValue(
    editedContent,
    focusedKeyPath
  );

  return (
    <StyledContainer
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
    </StyledContainer>
  );
};
