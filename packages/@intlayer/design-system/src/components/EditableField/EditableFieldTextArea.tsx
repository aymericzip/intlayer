'use client';

import { type FC, useState } from 'react';
import { AutoSizedTextArea, type AutoSizedTextAreaProps } from '../TextArea';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldTextAreaProps = Omit<
  AutoSizedTextAreaProps,
  'onChange' | 'disabled'
> & {
  value: string | null | undefined;
  onChange: (value: string) => void;
  isDisabled?: boolean;
};

export const EditableFieldTextArea: FC<EditableFieldTextAreaProps> = ({
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
      <AutoSizedTextArea
        defaultValue={editingValue}
        onChange={(e) =>
          setEditingValue((e.target as unknown as { value: string }).value)
        }
        {...props}
      />
    </EditableFieldLayout>
  );
};
