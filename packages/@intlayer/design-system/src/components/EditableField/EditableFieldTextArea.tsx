'use client';

import { forwardRef, useRef, useImperativeHandle } from 'react';
import { AutoSizedTextArea, type AutoSizedTextAreaProps } from '../TextArea';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldTextAreaProps = AutoSizedTextAreaProps & {
  onSave?: (value: string) => void;
  onCancel?: () => void;
};

export const EditableFieldTextArea = forwardRef<
  HTMLTextAreaElement,
  EditableFieldTextAreaProps
>(({ onSave, onCancel, ...props }, ref) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  // Expose the text area ref to parent components
  useImperativeHandle(ref, () => textAreaRef.current!);

  const value =
    textAreaRef.current?.value ??
    textAreaRef.current?.defaultValue ??
    (props.value as string) ??
    (props.defaultValue as string);

  return (
    <EditableFieldLayout
      value={value}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <AutoSizedTextArea
        key={value}
        className="leading-6"
        ref={textAreaRef}
        {...props}
      />
    </EditableFieldLayout>
  );
});

EditableFieldTextArea.displayName = 'EditableFieldTextArea';
