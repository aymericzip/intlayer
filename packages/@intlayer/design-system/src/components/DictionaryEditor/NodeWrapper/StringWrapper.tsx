import { isSameKeyPath, type KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { cn } from '../../../utils/cn';
import { ContentEditor } from '../../ContentEditor';
import type { FieldContent } from '../../DictionaryFieldEditor';
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

  const level = keyPath.length;

  return (
    <button
      className={cn(
        'rounded-md p-2 transition',
        'hover:bg-card/30 dark:hover:bg-card-dark/30 [&:has(.section:hover)]:bg-transparent',
        level === 2 && 'hover:bg-card/30 dark:hover:bg-card-dark/30',
        level >= 3 && ''
      )}
      onClick={(e) => {
        e.stopPropagation();
        onFocusKeyPath(keyPath);
      }}
      {...props}
    >
      <ContentEditor
        onContentChange={(newValue) => onContentChange({ keyPath, newValue })}
        isEditing={true}
      >
        {editedContentValue ?? section}
      </ContentEditor>
    </button>
  );
};
