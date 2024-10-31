'use client';

import { type FC, useState } from 'react';
import { Input, type InputProps } from '../Input';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldInputProps = Omit<InputProps, 'onChange' | 'disabled'> & {
  value: string | null | undefined;
  onChange: (value: string) => void;
  isDisabled?: boolean;
};

export const EditableFieldInput: FC<EditableFieldInputProps> = ({
  value = '',
  onChange,
  isDisabled,
  ...props
}) => {
  const [editingValue, setEditingValue] = useState(value ?? '');

  const handleSave = () => {
    onChange(editingValue);
  };

  const handleCancel = () => {
    setEditingValue(value ?? '');
  };

  return (
    <EditableFieldLayout
      value={editingValue}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <Input
        defaultValue={editingValue}
        onChange={(e) => setEditingValue(e.target.value)}
        {...props}
      />
    </EditableFieldLayout>
  );
};
