import { EditableFieldInput } from '@components/EditableField';
import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { useEditorLocale } from '@intlayer/editor-react';
import { cn } from '@utils/cn';
import type { FC } from 'react';
import type { NodeWrapperProps } from './index';

export type NumberWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: number;
};

export const NumberWrapper: FC<NumberWrapperProps> = ({
  keyPath,
  section,
  editedContent,
  onContentChange,
  onFocusKeyPath,
}) => {
  const currentLocale = useEditorLocale();
  const editedContentValue = getContentNodeByKeyPath(
    editedContent,
    keyPath,
    currentLocale
  );

  if (
    editedContentValue !== undefined &&
    typeof editedContentValue !== 'number'
  ) {
    return (
      <>
        Error loading section - Edited content incoherence with the original
        content format
      </>
    );
  }

  const level = keyPath.length;
  const content = String(editedContentValue ?? section);

  return (
    <button
      type="button"
      className={cn(
        'w-full rounded-md p-2 text-left transition',
        'hover:bg-card/30 [&:has(.section:hover)]:bg-transparent',
        level === 2 && 'hover:bg-card/30',
        level >= 3 && ''
      )}
      onClick={(e) => {
        e.stopPropagation();
        onFocusKeyPath(keyPath);
      }}
    >
      <EditableFieldInput
        aria-label="Editable number field"
        type="number"
        defaultValue={content}
        onSave={(newValue) => onContentChange({ keyPath, newValue })}
        onCancel={() => null}
      />
    </button>
  );
};
