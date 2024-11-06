'use client';

import { type FC, useRef } from 'react';
import { Input, type InputProps } from '../Input';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldInputProps = InputProps & {
  onSave?: (value: string) => void;
  onCancel?: (value: string) => void;
};

export const EditableFieldInput: FC<EditableFieldInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.defaultValue ?? '';
    }

    props.onCancel?.(inputRef.current?.value ?? '');
  };

  return (
    <EditableFieldLayout
      value={
        inputRef.current?.value ??
        inputRef.current?.defaultValue ??
        (props.value as string) ??
        props.defaultValue
      }
      onCancel={handleCancel}
      onSave={() => props.onSave?.(inputRef.current?.value ?? '')}
    >
      <Input ref={inputRef} {...props} />
    </EditableFieldLayout>
  );
};
