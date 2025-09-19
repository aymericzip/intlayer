'use client';

import { Check, X } from 'lucide-react';
import {
  type ChangeEventHandler,
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { useUser } from '../../hooks/useUser';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { type AutoSizedTextAreaProps, AutoCompleteTextarea } from '../TextArea';

/** Props for the ContentEditorTextArea component */
export type ContentEditorTextAreaProps = {
  /** The current content to display and edit */
  children: string;
  /** Callback function called when content is saved/validated */
  onContentChange: (content: string) => void;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Optional validation function to check content validity */
  validate?: (content: string) => boolean;
  /** Additional buttons to display alongside edit actions */
  additionalButtons?: ReactNode;
} & Omit<AutoSizedTextAreaProps, 'children'>;

/**
 * ContentEditorTextArea Component
 *
 * An inline editing component for multi-line text with autocomplete functionality,
 * user authentication integration, and validation support. This component combines
 * the auto-sizing textarea with smart autocomplete features.
 *
 * ## Features
 * - **Auto-sizing Textarea**: Automatically adjusts height to content
 * - **Autocomplete Integration**: Smart text completion when user is authenticated
 * - **Validation Support**: Optional content validation with visual feedback
 * - **Action Buttons**: Built-in save/cancel with support for additional buttons
 * - **Keyboard Shortcuts**: Enter to save, Escape to cancel
 * - **User Authentication**: Autocomplete features activate based on auth status
 * - **Accessibility**: Full ARIA support and keyboard navigation
 *
 * ## Accessibility
 * - Proper ARIA labels and descriptions for all controls
 * - Keyboard navigation (Tab, Enter, Escape)
 * - Screen reader support for validation states and user auth status
 * - Focus management and visual indicators
 *
 * @param children - Current textarea content
 * @param onContentChange - Callback when content is saved
 * @param disabled - Whether the editor is disabled
 * @param validate - Optional validation function
 * @param additionalButtons - Extra buttons to display
 * @param props - Additional AutoSizedTextArea component props
 */
export const ContentEditorTextArea: FC<ContentEditorTextAreaProps> = ({
  children,
  onContentChange,
  disabled,
  validate,
  additionalButtons,
  ...props
}) => {
  const { isAuthenticated } = useUser();
  const [newValue, setNewValue] = useState<string>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the textarea on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };

  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setNewValue(e.currentTarget.value ?? '');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !disabled && isValid) {
      e.preventDefault();
      handleValid();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  useEffect(() => {
    setNewValue(children);
    // Force textarea to reset when children changes externally
    setResetIncrementor((prev) => prev + 1);
  }, [children]);

  const isValid = validate?.(newValue) ?? true;

  return (
    <div
      className="flex size-full flex-col items-center justify-between gap-2"
      key={children}
      role="group"
      aria-label="Content editor textarea"
    >
      <AutoCompleteTextarea
        onChange={handleOnContentChange}
        onKeyDown={handleKeyDown}
        key={resetIncrementor}
        variant="invisible"
        className="size-full"
        defaultValue={children}
        isActive={isAuthenticated}
        disabled={disabled}
        aria-label="Editable textarea content"
        aria-describedby={
          isEdited || additionalButtons
            ? 'content-editor-textarea-actions'
            : undefined
        }
        aria-invalid={!isValid}
        {...props}
      />
      {(isEdited || additionalButtons) && (
        <div
          id="content-editor-textarea-actions"
          className="flex w-full items-center justify-end gap-2"
          role="group"
          aria-label="Edit actions"
        >
          {isEdited && (
            <>
              <Button
                Icon={Check}
                label={`Save changes${!isValid ? ' (invalid content)' : ''}`}
                variant={ButtonVariant.HOVERABLE}
                color={ButtonColor.TEXT}
                size={ButtonSize.ICON_SM}
                className="cursor-pointer hover:scale-110"
                disabled={disabled || !isValid}
                onClick={handleValid}
                aria-describedby={
                  !isValid ? 'textarea-validation-error' : undefined
                }
              />
              <Button
                Icon={X}
                label="Cancel changes"
                variant={ButtonVariant.HOVERABLE}
                size={ButtonSize.ICON_SM}
                color={ButtonColor.TEXT}
                className="cursor-pointer hover:scale-110"
                onClick={handleCancel}
                disabled={disabled}
              />
            </>
          )}
          {additionalButtons}
        </div>
      )}
    </div>
  );
};
