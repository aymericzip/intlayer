'use client';

import { type FC, type Ref, useImperativeHandle, useMemo, useRef } from 'react';
import { Input, type InputProps } from '../Input';
import { EditableFieldLayout } from './EditableFieldLayout';

/**
 * Props for the EditableFieldInput component, extending standard Input props
 */
type EditableFieldInputProps = InputProps & {
  /** Callback function called when the user saves the edited value */
  onSave?: (value: string) => void;
  /** Callback function called when the user cancels the edit operation */
  onCancel?: () => void;
};

/**
 * EditableFieldInput Component
 *
 * An inline editable input field that displays as read-only text until clicked.
 * When activated, it shows an input field with save and cancel buttons.
 *
 * @example
 * ```tsx
 * <EditableFieldInput
 *   defaultValue="Edit me"
 *   placeholder="Click to edit..."
 *   onSave={(value) => console.log('Saved:', value)}
 *   onCancel={() => console.log('Cancelled')}
 * />
 * ```
 *
 * ## Features
 * - **Inline Editing**: Click to edit, displays as text when not editing
 * - **Save/Cancel Actions**: Built-in save and cancel buttons with callbacks
 * - **Keyboard Support**: Accessible keyboard navigation
 * - **Input Variants**: Supports all Input component variants and sizes
 * - **Auto-save on Click Away**: Saves automatically when clicking outside
 * - **Ref Forwarding**: Exposes the underlying input element reference
 *
 * ## Accessibility
 * - Uses semantic HTML with proper ARIA attributes
 * - Keyboard accessible with tab navigation
 * - Screen reader friendly with descriptive labels
 * - Focus management for edit mode transitions
 *
 * @param props - EditableFieldInputProps extending InputProps
 * @returns React functional component
 */
export const EditableFieldInput: FC<EditableFieldInputProps> = ({
  onSave,
  onCancel,
  ref,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    // Your save logic here
    onSave?.(inputRef.current?.value ?? '');
  };

  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.defaultValue ?? '';
    }
    onCancel?.();
  };

  // Expose the input ref to parent components
  useImperativeHandle(ref as Ref<HTMLElement>, () => inputRef.current!);

  const value = useMemo(
    () =>
      (props.value as string) ??
      inputRef.current?.value ??
      (props.defaultValue as string),

    [props.value, props.defaultValue, inputRef.current?.value]
  );

  return (
    <EditableFieldLayout
      value={value}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <Input ref={inputRef} {...props} />
    </EditableFieldLayout>
  );
};
