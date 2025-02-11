/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getContentNodeByKeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { cn } from '../../../utils/cn';
import { EditableFieldTextArea } from '../../EditableField';
import type { NodeWrapperProps } from './index';

type StringWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: string;
};

export const StringWrapper: FC<StringWrapperProps> = ({
  keyPath,
  section,
  editedContent,
  onContentChange,
  onFocusKeyPath,
}) => {
  const editedContentValue = getContentNodeByKeyPath(editedContent, keyPath);

  if (editedContentValue && typeof editedContentValue !== 'string') {
    return <>Error loading section</>;
  }

  const level = keyPath.length;

  const content = editedContentValue ?? section;

  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(
        'w-full rounded-md p-2 text-left transition',
        'hover:bg-card/30 dark:hover:bg-card-dark/30 [&:has(.section:hover)]:bg-transparent',
        level === 2 && 'hover:bg-card/30 dark:hover:bg-card-dark/30',
        level >= 3 && ''
      )}
      onClick={(e) => {
        e.stopPropagation();
        onFocusKeyPath(keyPath);
      }}
    >
      <EditableFieldTextArea
        defaultValue={String(content)}
        onSave={(newValue) => onContentChange({ keyPath, newValue })}
        onCancel={() => null}
      />
    </span>
  );
};
