'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Input, type InputProps } from '../Input';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldInputProps = InputProps & {
  onSave?: (value: string) => void;
  onCancel?: () => void;
};

export const EditableFieldInput = forwardRef<
  HTMLInputElement,
  EditableFieldInputProps
>(({ onSave, onCancel, ...props }, ref) => {
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
  useImperativeHandle(ref, () => inputRef.current!);

  const value =
    inputRef.current?.value ??
    inputRef.current?.defaultValue ??
    (props.value as string) ??
    (props.defaultValue as string);

  return (
    <EditableFieldLayout
      value={value}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <Input ref={inputRef} {...props} />
    </EditableFieldLayout>
  );
});

EditableFieldInput.displayName = 'EditableFieldInput';
