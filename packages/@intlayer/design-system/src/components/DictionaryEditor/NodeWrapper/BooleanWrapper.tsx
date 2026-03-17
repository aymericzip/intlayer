'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { useEditorLocale } from '@intlayer/editor-react';
import { cn } from '@utils/cn';
import type { FC } from 'react';
import { SwitchSelector } from '../../SwitchSelector';
import type { NodeWrapperProps } from './index';

export type BooleanWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: boolean;
};

export const BooleanWrapper: FC<BooleanWrapperProps> = ({
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
    typeof editedContentValue !== 'boolean'
  ) {
    return (
      <>
        Error loading section - Edited content incoherence with the original
        content format
      </>
    );
  }

  const level = keyPath.length;
  const value = editedContentValue ?? section;

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
      <SwitchSelector
        value={value}
        onChange={(newValue) =>
          onContentChange({ keyPath, newValue: String(newValue) })
        }
      />
    </button>
  );
};
