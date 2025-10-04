'use client';

import { Check, X } from 'lucide-react';
import { type ChangeEventHandler, type FC, useState } from 'react';
import { cn } from '../../utils/cn';
import { InputVariant } from '../Input';
import {
  AutoSizedTextArea,
  type AutoSizedTextAreaProps,
} from '../TextArea/AutoSizeTextArea';

/** Props for the ContentEditor component */
export type ContentEditorProps = {
  /** The current content to display and edit */
  children: string;
  /** Callback function called when content is saved/validated */
  onContentChange: (content: string) => void;
  /** Whether the editor is currently in editing mode */
  isEditing?: boolean;
} & AutoSizedTextAreaProps;

/**
 * ContentEditor Component
 *
 * An inline editing component that allows users to edit text content with
 * validation and cancellation options. Built on top of AutoSizedTextArea
 * for flexible text editing experiences.
 *
 * ## Features
 * - **Inline Editing**: Edit content directly in place with visual feedback
 * - **Auto-sizing**: Textarea automatically adjusts to content size
 * - **Validation Controls**: Check and X buttons appear when content is modified
 * - **Keyboard Support**: Full keyboard navigation and accessibility
 * - **State Management**: Handles editing states and content validation
 *
 * ## Accessibility
 * - Proper ARIA labels for all interactive elements
 * - Keyboard navigation support (Tab, Enter, Escape)
 * - Screen reader announcements for state changes
 * - Focus management between edit and display modes
 *
 * @param children - The current content to display and edit
 * @param onContentChange - Callback when content is saved
 * @param isEditing - Whether editor is in editing mode
 * @param props - Additional AutoSizedTextArea props
 */
export const ContentEditor: FC<ContentEditorProps> = ({
  children,
  onContentChange,
  isEditing,
  ...props
}) => {
  const [newValue, setNewValue] = useState<string>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };

  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setNewValue(e.target.value ?? '');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleValid();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      role="group"
      aria-label="Content editor"
    >
      <AutoSizedTextArea
        className={cn(
          'break-word outline-hidden m-3 inline w-full bg-transparent',
          isEditing ? 'cursor-text' : 'cursor-pointer'
        )}
        onChange={handleOnContentChange}
        onKeyDown={handleKeyDown}
        key={resetIncrementor}
        variant={InputVariant.INVISIBLE}
        defaultValue={children}
        aria-label="Editable content"
        aria-describedby={isEdited ? 'content-editor-actions' : undefined}
        {...props}
      />
      {isEdited && (
        <div
          id="content-editor-actions"
          className="flex flex-row items-center justify-between gap-2"
          role="group"
          aria-label="Edit actions"
        >
          <Check
            className="cursor-pointer hover:scale-110 text-green-600"
            size={16}
            onClick={handleValid}
            role="button"
            tabIndex={0}
            aria-label="Save changes (Ctrl+Enter)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleValid();
              }
            }}
          />
          <X
            className="cursor-pointer hover:scale-110 text-red-600"
            size={16}
            onClick={handleCancel}
            role="button"
            tabIndex={0}
            aria-label="Cancel changes (Escape)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCancel();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
