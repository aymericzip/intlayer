'use client';

import { type FC, type Ref, useImperativeHandle, useMemo, useRef } from 'react';
import { Input, type InputProps } from '../Input';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldInputProps = InputProps & {
  onSave?: (value: string) => void;
  onCancel?: () => void;
};

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
