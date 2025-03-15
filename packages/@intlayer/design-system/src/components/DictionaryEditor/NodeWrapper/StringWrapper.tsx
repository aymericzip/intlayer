import { getContentNodeByKeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { cn } from '../../../utils/cn';
import { EditableFieldTextArea } from '../../EditableField';
import type { NodeWrapperProps } from './index';

export type StringWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: string;
  editedContentValue?: string;
};

export const StringWrapper: FC<StringWrapperProps> = ({
  keyPath,
  section,
  editedContent,
  editedContentValue: editedContentValueProp,
  onContentChange,
  onFocusKeyPath,
  renderSection,
}) => {
  const editedContentValue =
    editedContentValueProp ?? getContentNodeByKeyPath(editedContent, keyPath);

  if (editedContentValue && typeof editedContentValue !== 'string') {
    return (
      <>
        Error loading section - Edited content Incoherence with the original
        content format
      </>
    );
  }

  const level = keyPath.length;

  const content = String(editedContentValue ?? section);

  return (
    <span
      role="button"
      tabIndex={0}
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
      {typeof renderSection === 'function' ? (
        renderSection(content)
      ) : (
        <EditableFieldTextArea
          aria-label="Editable field"
          defaultValue={content}
          onSave={(newValue) => onContentChange({ keyPath, newValue })}
          onCancel={() => null}
        />
      )}
    </span>
  );
};
