'use client';

import { type FC, useState } from 'react';
import { Input, type InputProps } from '../Input';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldInputProps = Omit<InputProps, 'onChange' | 'disabled'> & {
  defaultValue?: string | null | undefined;
  onChange: (value: string) => void;
  isDisabled?: boolean;
};

export const EditableFieldInput: FC<EditableFieldInputProps> = ({
  defaultValue = '',
  onChange,
  isDisabled,
  ...props
}) => {
  const [editingValue, setEditingValue] = useState(defaultValue ?? '');

  const handleSave = () => {
    onChange(editingValue);
  };

  const handleCancel = () => {
    setEditingValue(defaultValue ?? '');
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
