import type { FC } from 'react';
import { cn } from '../../../utils/cn';
import { getDictionaryValueByKeyPath } from '../../../utils/dictionary';
import { ContentEditorTextArea } from '../../ContentEditor/ContentEditorTextArea';
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
  const editedContentValue = getDictionaryValueByKeyPath(
    editedContent,
    keyPath
  );

  if (editedContentValue && typeof editedContentValue !== 'string') {
    return <>Error loading section</>;
  }

  const level = keyPath.length;

  const content = editedContentValue ?? section;

  return (
    <button
      className={cn(
        'w-full rounded-md p-2 transition',
        'hover:bg-card/30 dark:hover:bg-card-dark/30 [&:has(.section:hover)]:bg-transparent',
        level === 2 && 'hover:bg-card/30 dark:hover:bg-card-dark/30',
        level >= 3 && ''
      )}
      onClick={(e) => {
        e.stopPropagation();
        onFocusKeyPath(keyPath);
      }}
    >
      <ContentEditorTextArea
        onContentChange={(newValue) => onContentChange({ keyPath, newValue })}
      >
        {`${content}`}
      </ContentEditorTextArea>
    </button>
  );
};
