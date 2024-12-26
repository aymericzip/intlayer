'use client';

import { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
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

  // Expose the text area ref to parent components
  useImperativeHandle(ref, () => textAreaRef.current!);

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

  const memoValue = useMemo(
    () =>
      textAreaRef.current?.value ??
      textAreaRef.current?.defaultValue ??
      (props.value as string) ??
      (props.defaultValue as string) ??
      '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      props.value,
      props.defaultValue,
      textAreaRef.current?.value,
      textAreaRef.current?.defaultValue,
    ]
  );

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
});

EditableFieldTextArea.displayName = 'EditableFieldTextArea';
