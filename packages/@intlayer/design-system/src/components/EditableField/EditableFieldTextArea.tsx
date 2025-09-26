'use client';

import { useImperativeHandle, useRef, type FC, type Ref } from 'react';
import { AutoSizedTextArea, type AutoSizedTextAreaProps } from '../TextArea';
import { EditableFieldLayout } from './EditableFieldLayout';

/**
 * Props for the EditableFieldTextArea component, extending AutoSizedTextAreaProps
 */
type EditableFieldTextAreaProps = AutoSizedTextAreaProps & {
  /** Callback function called when the user saves the edited value */
  onSave?: (value: string) => void;
  /** Callback function called when the user cancels the edit operation */
  onCancel?: () => void;
};

/**
 * EditableFieldTextArea Component
 *
 * An inline editable textarea field that displays as read-only text until clicked.
 * When activated, it shows an auto-sized textarea with save and cancel buttons.
 * Perfect for multiline text editing with automatic height adjustment.
 *
 * @example
 * ```tsx
 * <EditableFieldTextArea
 *   defaultValue="Multiline text content"
 *   placeholder="Click to edit..."
 *   maxRows={10}
 *   onSave={(value) => console.log('Saved:', value)}
 *   onCancel={() => console.log('Cancelled')}
 * />
 * ```
 *
 * ## Features
 * - **Inline Editing**: Click to edit, displays as formatted text when not editing
 * - **Auto-Sizing**: Automatically adjusts height to fit content
 * - **Save/Cancel Actions**: Built-in save and cancel buttons with callbacks
 * - **Multiline Support**: Preserves line breaks and formatting
 * - **Max Rows Control**: Configurable maximum height with scroll
 * - **Auto-save on Click Away**: Saves automatically when clicking outside
 * - **Ref Forwarding**: Exposes the underlying textarea element reference
 *
 * ## Accessibility
 * - Uses semantic HTML with proper ARIA attributes
 * - Keyboard accessible with tab navigation
 * - Screen reader friendly with descriptive labels
 * - Focus management for edit mode transitions
 * - Preserves whitespace and formatting for screen readers
 *
 * @param props - EditableFieldTextAreaProps extending AutoSizedTextAreaProps
 * @returns React functional component
 */
export const EditableFieldTextArea: FC<EditableFieldTextAreaProps> = ({
  onSave,
  onCancel,
  ref,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Expose the text area ref to parent components
  useImperativeHandle(ref as Ref<HTMLElement>, () => textAreaRef.current!);

  const handleSave = () => {
    // Your save logic here
    onSave?.(textAreaRef.current?.value ?? '');
  };

  const handleCancel = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textAreaRef.current.defaultValue ?? '';
    }
    onCancel?.();
  };

  const memoValue =
    (props.value as string) ??
    textAreaRef.current?.value ??
    (props.defaultValue as string) ??
    '';

  return (
    <EditableFieldLayout
      value={memoValue}
      onCancel={handleCancel}
      onSave={handleSave}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <AutoSizedTextArea
        className="leading-6"
        ref={textAreaRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        {...props}
      />
    </EditableFieldLayout>
  );
};
