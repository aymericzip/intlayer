'use client';

import { Check, X } from 'lucide-react';
import {
  type ChangeEventHandler,
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { type InputProps, Input, InputVariant } from '../Input';

/** Props for the ContentEditorInput component */
export type ContentEditorInputProps = {
  /** The current content to display and edit */
  children: InputProps['value'];
  /** Callback function called when content is saved/validated */
  onContentChange: (content: InputProps['value']) => void;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Optional validation function to check content validity */
  validate?: (content: InputProps['value']) => boolean;
  /** Additional buttons to display alongside edit actions */
  additionalButtons?: ReactNode;
} & Omit<InputProps, 'children'>;

/**
 * ContentEditorInput Component
 *
 * An inline editing component for single-line text input with validation,
 * cancel/save functionality, and support for additional action buttons.
 *
 * ## Features
 * - **Inline Input Editing**: Edit single-line content with immediate feedback
 * - **Validation Support**: Optional content validation with visual feedback
 * - **Action Buttons**: Built-in save/cancel with support for additional buttons
 * - **Keyboard Shortcuts**: Enter to save, Escape to cancel
 * - **Accessibility**: Full ARIA support and keyboard navigation
 * - **State Management**: Handles editing states and validation
 *
 * ## Accessibility
 * - Proper ARIA labels and descriptions for all controls
 * - Keyboard navigation (Tab, Enter, Escape)
 * - Screen reader support for validation states
 * - Focus management and visual indicators
 *
 * @param children - Current input value
 * @param onContentChange - Callback when content is saved
 * @param disabled - Whether the editor is disabled
 * @param validate - Optional validation function
 * @param additionalButtons - Extra buttons to display
 * @param props - Additional Input component props
 */
export const ContentEditorInput: FC<ContentEditorInputProps> = ({
  children,
  onContentChange,
  disabled,
  validate,
  additionalButtons,
  ...props
}) => {
  const [newValue, setNewValue] = useState<InputProps['value']>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };

  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled && isValid) {
      e.preventDefault();
      handleValid();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  useEffect(() => {
    setNewValue(children);
    // Force input to reset when children changes externally
    setResetIncrementor((prev) => prev + 1);
  }, [children]);

  const isValid = validate?.(newValue) ?? true;

  return (
    <div
      className="flex size-full flex-col items-center justify-between gap-2"
      key={String(children)}
      role="group"
      aria-label="Content editor input"
    >
      <Input
        onChange={handleOnContentChange}
        onKeyDown={handleKeyDown}
        key={resetIncrementor}
        aria-label="Editable input value"
        aria-describedby={
          isEdited || additionalButtons
            ? 'content-editor-input-actions'
            : undefined
        }
        aria-invalid={!isValid}
        variant={InputVariant.INVISIBLE}
        className="size-full"
        defaultValue={children}
        disabled={disabled}
        {...props}
      />
      {(isEdited || additionalButtons) && (
        <div
          id="content-editor-input-actions"
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
                aria-describedby={!isValid ? 'validation-error' : undefined}
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
